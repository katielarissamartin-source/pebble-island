(function(){
"use strict";
if(typeof S==="undefined"||window.PEBBLE_FAIR)return;
const DAY=86400000,REPEAT_DAYS=7,ISLAND_CAP=40,BOOST_CAP=40,GAME_PLAYS=3,SEEN_MAX=600;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const today=()=>{const d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()};
const store=()=>{try{save()}catch(e){}};
const say=t=>{try{if(typeof speak==="function")speak(t,"soft")}catch(e){}};
const settings=()=>S.settings||(S.settings={});
const replayOn=()=>settings().fpReplay===true;

function fs(k){
 S.fair=S.fair||{};const f=S.fair[k]||(S.fair[k]={day:"",island:0,boost:0,games:0,seen:{}});
 if(!f.seen)f.seen={};
 if(f.day!==today()){f.day=today();f.island=0;f.boost=0;f.games=0}
 return f;
}
function pruneSeen(f){
 const now=Date.now(),keys=Object.keys(f.seen);
 keys.forEach(k=>{if(now-f.seen[k]>REPEAT_DAYS*DAY)delete f.seen[k]});
 const left=Object.keys(f.seen);
 if(left.length>SEEN_MAX)left.sort((a,b)=>f.seen[a]-f.seen[b]).slice(0,left.length-SEEN_MAX).forEach(k=>delete f.seen[k]);
}
function hash(s){let h=5381;s=String(s);for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return(h>>>0).toString(36)}

let ctx=null,flagged=null;
function budget(k,src,gain){
 const f=fs(k);
 if(src==="island"){const ok=Math.max(0,Math.min(gain,ISLAND_CAP-f.island));f.island+=ok;return ok}
 if(src==="boost"){const ok=Math.max(0,Math.min(gain,BOOST_CAP-f.boost));f.boost+=ok;return ok}
 if(src==="game"){if(f.games>=GAME_PLAYS)return 0;f.games++;return gain}
 return gain;
}
function sourceOf(){
 if(ctx)return ctx;
 if(flagged){const s=flagged;flagged=null;return{src:s,allow:true}}
 let st="";try{st=new Error().stack||""}catch(e){}
 if(/winScreen/.test(st))return{src:"game",allow:true};
 return null;
}
let blockedNote=null;
function install(){
 if(!S.coins||S.coins.__fair)return;
 const raw=S.coins;
 S.coins=new Proxy(raw,{
  get(t,p){return p==="__fair"?true:t[p]},
  set(t,p,v){
   const k=+p,old=t[p]||0;
   if(!Number.isInteger(k)||typeof v!=="number"||v<=old){t[p]=v;return true}
   const c=sourceOf();
   if(!c){t[p]=v;return true}
   const gain=c.allow?budget(k,c.src,v-old):0;
   if(gain<v-old)blockedNote=c.src;
   t[p]=old+gain;return true;
  }
 });
}
install();setInterval(install,2000);

function note(){
 const why=blockedNote;blockedNote=null;if(!why||kid===null)return;
 const f=fs(kid);
 const msg=why==="island"&&f.island<ISLAND_CAP?"You already know that one! New questions earn coins.":
  why==="game"?"Games give coins 3 times a day. You can still play for fun!":
  "That's all the coins for today. Keep learning, more tomorrow!";
 showToast(msg);
}
let lastToast={t:"",at:0};
function showToast(msg){
 if(lastToast.t===msg&&Date.now()-lastToast.at<60000)return;lastToast={t:msg,at:Date.now()};
 const el=document.createElement("div");el.className="fp-toast";el.setAttribute("role","status");el.textContent="🐢 "+msg;
 document.body.appendChild(el);setTimeout(()=>el.remove(),4200);
}
const css=document.createElement("style");
css.textContent=".fp-toast{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#fff;color:#1d3b47;border:2px solid #3d8fb0;border-radius:16px;padding:10px 16px;font:700 1.05rem system-ui,sans-serif;z-index:9999;max-width:90vw;box-shadow:0 4px 14px rgba(0,0,0,.15)}"+
".fp-gate{max-width:560px;margin:24px auto;background:#fff;color:#1d3b47;border-radius:20px;padding:24px;text-align:center}.fp-gate h1{font-size:1.6rem;margin:8px 0}.fp-gate p{font-size:1.15rem;line-height:1.5}.fp-gate .fp-big{font-size:3rem}.fp-gate button{display:block;width:100%;margin:10px 0;padding:14px;font:800 1.15rem system-ui,sans-serif;border-radius:14px;border:2px solid #3d8fb0;background:#eaf5f9;color:#1d3b47}.fp-gate button.primary{background:#3d8fb0;color:#fff}";
document.head.appendChild(css);

let roundPaid=0;
if(typeof correct==="function"){
 const _c=correct;
 correct=function(x,y,s){
  if(kid===null||!round||!round.q)return _c.apply(this,arguments);
  const f=fs(kid);pruneSeen(f);
  const key=hash((round.w||"")+"|"+(round.q.say||round.q.q||JSON.stringify(round.q).slice(0,300)));
  const fresh=!f.seen[key];
  const before=S.coins[kid]||0;
  ctx={src:"island",allow:fresh};
  try{return _c.apply(this,arguments)}finally{
   ctx=null;
   f.seen[key]=Date.now();
   roundPaid+=(S.coins[kid]||0)-before;store();note();
  }
 };
}
if(typeof next==="function"){
 const _n=next;
 next=function(){if(round&&round.n===0)roundPaid=0;return _n.apply(this,arguments)};
}
if(typeof done==="function"){
 const _d=done;
 done=function(){
  if(kid===null)return _d.apply(this,arguments);
  const paid=roundPaid>0;roundPaid=0;
  ctx={src:"island",allow:paid};window.PEBBLE_FAIR.quiet=!paid;
  try{return _d.apply(this,arguments)}finally{
   ctx=null;window.PEBBLE_FAIR.quiet=false;store();
   if(!paid){const t=document.querySelector(".card.done .target");if(t&&/round bonus/.test(t.textContent))t.textContent="You knew all of these! Try a new island or level for coins."}
   note();
  }
 };
}

function lessonLocked(st){
 if(replayOn()||!st||!st.sessions)return null;
 const h=st.history&&st.history[st.history.length-1];
 if(!h||!h.high)return null;
 const due=Number(st.nextDue);
 if(!Number.isFinite(due)||due<=Date.now())return null;
 return due;
}
function dayWord(due){
 const d=new Date(due),days=Math.ceil((due-Date.now())/DAY);
 if(days<=1)return"tomorrow";
 if(days<7)return"on "+d.toLocaleDateString("en-AU",{weekday:"long"});
 return"in "+Math.round(days/7)+" week"+(days>=14?"s":"");
}
function wrapJourney(){
 const J=window.PEBBLE_JOURNEY;if(!J||J.__fair)return;
 const _run=J.run;
 J.run=function(o){
  const due=o&&lessonLocked(o.st);
  if(!due)return _run.apply(this,arguments);
  const app=document.getElementById("app");if(!app)return _run.apply(this,arguments);
  const L=o.lesson||{},when=dayWord(due);
  app.innerHTML='<div class="fp-gate" role="region" aria-label="Lesson already learned"><div class="fp-big" aria-hidden="true">🌟</div><h1>You already know this one!</h1><p>'+esc((L.icon||"")+" "+(L.title||"This lesson"))+'</p><p>It comes back '+esc(when)+' to check it stuck.</p><p>Pick a new lesson to grow your brain.</p><button type="button" class="primary" id="fp-back">Find a new lesson →</button></div>';
  say("You already know this one! It comes back "+when+". Pick a new lesson.");
  document.getElementById("fp-back").onclick=()=>{try{o.onBack&&o.onBack()}catch(e){}};
 };
 J.__fair=true;
}
wrapJourney();setTimeout(wrapJourney,0);

if(typeof parent==="function"){
 const _p=parent;
 parent=function(){
  _p.apply(this,arguments);
  const box=document.querySelector(".parent");if(!box||box.querySelector("#fp-replay"))return;
  const r=document.createElement("div");r.className="prow";
  r.innerHTML='<span>Lessons: let children redo lessons they already passed before the review day (no extra rewards)</span><button class="switch" id="fp-replay">'+(replayOn()?"On":"Off")+'</button>';
  box.appendChild(r);
  document.getElementById("fp-replay").onclick=e=>{settings().fpReplay=!replayOn();store();e.target.textContent=replayOn()?"On":"Off"};
 };
}

window.PEBBLE_FAIR={
 version:1,quiet:false,
 src:s=>{flagged=s},
 after:()=>note(),
 locked:lessonLocked,
 today:k=>{const f=fs(k);return{island:f.island,islandCap:ISLAND_CAP,boost:f.boost,boostCap:BOOST_CAP,games:f.games,gamePlays:GAME_PLAYS}}
};
})();
