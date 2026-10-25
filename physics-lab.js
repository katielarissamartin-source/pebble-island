(function(){
"use strict";
if(!document.getElementById("app"))return;
const app=()=>document.getElementById("app");
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const who=()=>{try{return typeof kid==="undefined"?null:kid}catch(e){return null}};
const tap=()=>{try{SFX.tap()}catch(e){}};
const good=()=>{try{SFX.good()}catch(e){}};
const win=()=>{try{SFX.win()}catch(e){}};
const calm=()=>{try{return still()}catch(e){return false}};
const readOn=()=>{try{return S.settings.jRead!==false}catch(e){return true}};
const say=t=>{if(readOn())try{speak(t,"soft")}catch(e){}};
const store=()=>{try{save()}catch(e){}};
const age=k=>(S.kids[k]&&S.kids[k].age)||7;
const eligible=k=>k===1||age(k)>=9;
const dino=k=>k===1;

function theme(k){
 return dino(k)?{
  name:"Dino Physics Lab",ico:"🦖",big:"big stone block",small:"small stone block",light:"feather",roller:"dino egg",goal:"nest",
  intro:"Help the dinosaurs test how things move."
 }:{
  name:"Physics Lab",ico:"🧪",big:"big ball",small:"small ball",light:"leaf",roller:"ball",goal:"basket",
  intro:"Let's test how things move."
 };
}

function rounds(t){
 return[
  {lesson:"gravity4",kind:"drop2",a:"big",b:"small",
   q:"Drop a "+t.big+" and a "+t.small+". Which lands first?",
   opts:["The big one","The small one","Same time"],ans:2,
   why:"They land together. Gravity pulls them down at the same speed."},
  {lesson:"gravity4",kind:"drop2",a:"small",b:"light",
   q:"Drop a "+t.small+" and a "+t.light+". Which lands first?",
   opts:["The "+t.small,"The "+t.light,"Same time"],ans:0,
   why:"The "+t.light+" is slower. Air pushes up on it. That push is called air resistance."},
  {lesson:"friction4",kind:"floors",
   q:"The "+t.roller+" rolls onto three floors. Which floor lets it go furthest?",
   opts:["Ice","Wood","Grass"],ans:0,
   why:"Ice is smooth. Smooth means less friction, so it goes further."},
  {lesson:"friction4",kind:"heights",
   q:"Low ramp or high ramp. Which sends the "+t.roller+" further?",
   opts:["Low ramp","High ramp","Same"],ans:1,
   why:"The high ramp. Gravity speeds it up for longer, so it goes faster."},
  {lesson:"friction4",kind:"push",
   q:"A small push or a big push. Which makes the block slide further?",
   opts:["Small push","Big push","Same"],ans:1,
   why:"The big push. A bigger force makes it move faster and further."},
  {lesson:"gravity4",kind:"throw",
   q:"Throw the "+t.small+" up high. What happens?",
   opts:["It floats","It comes back down","It keeps going up"],ans:1,
   why:"It comes back down. Gravity always pulls it toward the ground."}
 ];
}

const css=document.createElement("style");
css.textContent=[
".pl-root{max-width:720px;width:100%;margin:0 auto;display:grid;gap:14px;padding-bottom:110px;color:#14262c}",
".pl-root *{box-sizing:border-box}",
".pl-root h1{margin:6px 0 0;font:800 clamp(1.5rem,5vw,2rem)/1.2 var(--display);color:#14262c!important;background:none!important;-webkit-text-fill-color:currentColor!important}",
".pl-q{margin:0;font:800 clamp(1.2rem,4vw,1.5rem)/1.35 var(--display)}",
".pl-p{margin:0;font-size:1.15rem;line-height:1.45}",
".pl-cv{width:100%;height:auto;display:block;border-radius:20px;border:3px solid #125877;background:#dff1f7}",
".pl-opts{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}",
".pl-btn{min-height:64px;border-radius:18px;border:3px solid #125877!important;background:#fff!important;color:#14262c!important;font:800 1.15rem var(--display);cursor:pointer;padding:10px 14px;box-shadow:0 4px 0 #0c3d52}",
".pl-btn.on{background:#125877!important;color:#fff!important}",
".pl-btn.pl-go{background:#2f7d4f!important;border-color:#1f5a37!important;color:#fff!important;box-shadow:0 4px 0 #1f5a37}",
".pl-btn:disabled{opacity:.55;cursor:default}",
".pl-btn:focus-visible{outline:4px solid #1e86a3;outline-offset:3px}",
".pl-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}",
".pl-row .pl-btn{flex:1 1 90px;min-height:56px}",
".pl-lab{font:800 .95rem var(--display);text-transform:uppercase;letter-spacing:.05em;min-width:70px}",
".pl-why{border-radius:18px;background:#fff6dc;border:2px solid #d9a52b;padding:14px 16px;font-size:1.15rem;line-height:1.45}",
".pl-dots{display:flex;gap:6px}.pl-dots i{width:14px;height:14px;border-radius:50%;background:#c9dbe2}.pl-dots i.d{background:#125877}",
".pl-back{justify-self:start;border:0;background:none;color:#125877;font:800 1.05rem var(--display);cursor:pointer;padding:6px 0}"
].join("\n");
document.head.appendChild(css);

let cv=null,cx=null,W=0,H=0,anim=0;
function canvas(){
 cv=app().querySelector(".pl-cv");cx=cv.getContext("2d");
 const d=window.devicePixelRatio||1,w=Math.min(680,cv.parentElement.clientWidth||680);
 W=w;H=Math.round(w*.58);cv.width=W*d;cv.height=H*d;cv.style.height=H+"px";cx.setTransform(d,0,0,d,0,0);
}
const GY=()=>H*.82;
function sky(){
 const g=cx.createLinearGradient(0,0,0,H);g.addColorStop(0,"#bfe4f2");g.addColorStop(1,"#eaf6fa");
 cx.fillStyle=g;cx.fillRect(0,0,W,H);
 cx.fillStyle="#7bb661";cx.fillRect(0,GY(),W,H-GY());
 cx.fillStyle="#5e9a48";cx.fillRect(0,GY(),W,4);
}
function block(x,y,s,col){
 cx.fillStyle=col||"#8a8f96";cx.fillRect(x-s/2,y-s,s,s);
 cx.fillStyle="rgba(255,255,255,.25)";cx.fillRect(x-s/2,y-s,s,s/6);
 cx.fillStyle="rgba(0,0,0,.18)";cx.fillRect(x-s/2,y-s/6,s,s/6);
 const p=s/4;cx.fillStyle="rgba(0,0,0,.12)";cx.fillRect(x-s/2+p,y-s+p*1.5,p,p);cx.fillRect(x+p*.4,y-s+p*2.3,p,p);
}
function ball(x,y,r,col){
 cx.fillStyle=col||"#d9534f";cx.beginPath();cx.arc(x,y-r,r,0,7);cx.fill();
 cx.fillStyle="rgba(255,255,255,.4)";cx.beginPath();cx.arc(x-r*.35,y-r*1.35,r*.3,0,7);cx.fill();
}
function egg(x,y,r){
 cx.fillStyle="#f3ecd6";cx.beginPath();cx.ellipse(x,y-r*1.15,r*.85,r*1.15,0,0,7);cx.fill();
 cx.strokeStyle="#bfae7d";cx.lineWidth=2;cx.stroke();
 cx.fillStyle="#7fae6a";[[-.3,-1.5],[.35,-1],[-.1,-.6]].forEach(([a,b])=>{cx.beginPath();cx.arc(x+a*r,y+b*r,r*.16,0,7);cx.fill()});
}
function leaf(x,y,s,rot){
 cx.save();cx.translate(x,y-s/2);cx.rotate(rot||0);
 cx.fillStyle="#4f9a6e";cx.beginPath();cx.ellipse(0,0,s*.55,s*.22,0,0,7);cx.fill();
 cx.strokeStyle="#2f6b48";cx.lineWidth=2;cx.beginPath();cx.moveTo(-s*.55,0);cx.lineTo(s*.55,0);cx.stroke();cx.restore();
}
function feather(x,y,s,rot){
 cx.save();cx.translate(x,y-s/2);cx.rotate(rot||0);
 cx.fillStyle="#e2b34a";cx.beginPath();cx.ellipse(0,0,s*.6,s*.2,0,0,7);cx.fill();
 cx.strokeStyle="#8a6a22";cx.lineWidth=2;cx.beginPath();cx.moveTo(-s*.7,0);cx.lineTo(s*.6,0);cx.stroke();cx.restore();
}
function thing(k,which,x,y,rot){
 const s=W*.08;
 if(which==="big")return dino(k)?block(x,y,s*1.4):ball(x,y,s*.7);
 if(which==="small")return dino(k)?block(x,y,s*.7):ball(x,y,s*.35);
 if(which==="light")return dino(k)?feather(x,y,s,rot):leaf(x,y,s,rot);
 if(which==="roller")return dino(k)?egg(x,y,s*.32):ball(x,y,s*.3,"#e08a2e");
}
function goal(k,x){
 const y=GY(),w=W*.1;
 if(dino(k)){cx.fillStyle="#8a5a2b";cx.beginPath();cx.ellipse(x,y-4,w*.6,w*.22,0,0,7);cx.fill();cx.fillStyle="#b07a40";cx.beginPath();cx.ellipse(x,y-8,w*.45,w*.12,0,0,7);cx.fill()}
 else{cx.strokeStyle="#7a5230";cx.lineWidth=4;cx.beginPath();cx.moveTo(x-w*.5,y-w*.45);cx.lineTo(x-w*.4,y);cx.lineTo(x+w*.4,y);cx.lineTo(x+w*.5,y-w*.45);cx.stroke()}
}
function label(t,x,y){cx.fillStyle="#14262c";cx.font="800 "+Math.round(W*.035)+"px system-ui,sans-serif";cx.textAlign="center";cx.fillText(t,x,y)}

const FLOORS={Ice:{mu:.3,col:"#7cc8e8"},Wood:{mu:.6,col:"#c89a62"},Grass:{mu:1.2,col:"#5e9a48"}};
const HEIGHTS={Low:1,Middle:2,High:3};
const dist=(h,mu)=>1.2*h/mu;
const RX=()=>W*.05,RW=()=>W*.2,UNIT=()=>(W*.72)/12;
function ramp(h,floor,y0){
 const gy=y0===undefined?GY():y0,top=gy-h*H*.12;
 cx.fillStyle="#9c7a52";cx.beginPath();cx.moveTo(RX(),gy);cx.lineTo(RX(),top);cx.lineTo(RX()+RW(),gy);cx.closePath();cx.fill();
 if(floor){cx.fillStyle=FLOORS[floor].col;cx.fillRect(RX()+RW(),gy-8,W-RX()-RW(),8)}
 return top;
}
function rollPos(h,d,u,gy){
 const top=gy-h*H*.12,split=.35;
 if(u<split){const s=Math.pow(u/split,2);return[RX()+RW()*s,top+(gy-top)*s]}
 const v=(u-split)/(1-split),p=d*(1-Math.pow(1-v,2));return[RX()+RW()+p*UNIT(),gy];
}
function play(ms,draw,done){
 cancelAnimationFrame(anim);
 const len=calm()?ms*.6:ms,t0=performance.now();
 const step=now=>{const u=Math.min(1,(now-t0)/len);draw(u);if(u<1)anim=requestAnimationFrame(step);else if(done)done()};
 anim=requestAnimationFrame(step);
}

function scene(k,r,u){
 sky();const gy=GY();
 if(r.kind==="drop2"){
  const top=H*.12,fall=gy-top,xa=W*.33,xb=W*.67;
  const ya=top+fall*Math.min(1,u*u);
  let yb,rot=0;
  if(r.b==="light"){yb=top+fall*Math.min(1,u*.42);rot=Math.sin(u*12)*.5}else yb=ya;
  thing(k,r.a,xa,ya);thing(k,r.b,xb+(r.b==="light"?Math.sin(u*9)*W*.03:0),yb,rot);
 }else if(r.kind==="floors"){
  const rows=["Ice","Wood","Grass"],lane=H*.26;
  rows.forEach((f,i)=>{const y=H*.3+i*lane;ramp(1.2,f,y);const [x,yy]=rollPos(1.2,Math.min(11.5,dist(1.4,FLOORS[f].mu)),u,y);thing(k,"roller",x,yy);cx.textAlign="left";label(f,W*.92,y-10)});
 }else if(r.kind==="heights"){
  const y1=H*.45,y2=H*.9;
  ramp(1,"Wood",y1);ramp(2.4,"Wood",y2);
  let p=rollPos(1,dist(1,.6),u,y1);thing(k,"roller",p[0],p[1]);
  p=rollPos(2.4,dist(2.4,.6),u,y2);thing(k,"roller",p[0],p[1]);
  label("Low",W*.9,y1-12);label("High",W*.9,y2-12);
 }else if(r.kind==="push"){
  const y1=H*.45,y2=H*.9,x0=W*.1,ease=v=>1-Math.pow(1-v,2);
  cx.fillStyle="#c89a62";cx.fillRect(0,y1-6,W,6);
  block(x0+W*.2*ease(u),y1,W*.08,"#a0784a");block(x0+W*.7*ease(u),y2,W*.08,"#a0784a");
  label("Small push",W*.85,y1-14);label("Big push",W*.85,y2-14);
 }else if(r.kind==="throw"){
  const top=H*.12,h=gy-top,v=u<.5?1-Math.pow(1-u*2,2):1-Math.pow((u-.5)*2,2);
  thing(k,"small",W*.5,gy-h*v);
 }
}

let K=null,T=null,R=[],ix=0,res=null;
function frame(inner){
 app().innerHTML='<main class="pl-root" aria-label="'+esc(T.name)+'"><button type="button" class="pl-back" id="pl-back">← Back</button>'+inner+'</main>';
 document.getElementById("pl-back").onclick=()=>{tap();cancelAnimationFrame(anim);home()};
 try{window.scrollTo(0,0)}catch(e){}
}
function home(){if(window.PEBBLE_TODAY)window.PEBBLE_TODAY.show();else if(typeof render==="function")render()}

function start(){
 const k=who();if(k===null||!S.kids||!S.kids[k])return;
 try{round=null}catch(e){}
 document.body.classList.remove("adult");
 K=k;T=theme(k);R=rounds(T);ix=0;res={gravity4:{q:0,ok:0},friction4:{q:0,ok:0}};
 frame('<h1>'+T.ico+' '+esc(T.name)+'</h1><p class="pl-p">'+esc(T.intro)+'</p><p class="pl-p">First you guess. Then we test it.</p><canvas class="pl-cv" aria-hidden="true"></canvas><button type="button" class="pl-btn pl-go" id="pl-start">Let\'s go →</button>');
 canvas();scene(K,R[0],0);say(T.intro+" First you guess. Then we test it.");
 document.getElementById("pl-start").onclick=()=>{tap();ask()};
}

function dots(){return'<div class="pl-dots" aria-label="Test '+(ix+1)+' of '+R.length+'">'+R.map((_,i)=>'<i class="'+(i<=ix?"d":"")+'"></i>').join("")+'</div>'}
function ask(){
 const r=R[ix];
 frame(dots()+'<p class="pl-q">'+esc(r.q)+'</p><canvas class="pl-cv" aria-hidden="true"></canvas><div class="pl-opts">'+r.opts.map((o,i)=>'<button type="button" class="pl-btn" data-o="'+i+'">'+esc(o)+'</button>').join("")+'</div>');
 canvas();scene(K,r,0);say(r.q);
 app().querySelectorAll("[data-o]").forEach(b=>b.onclick=()=>{tap();test(+b.dataset.o,b)});
}
function test(pick,btn){
 const r=R[ix],right=pick===r.ans;
 res[r.lesson].q++;if(right)res[r.lesson].ok++;
 app().querySelectorAll("[data-o]").forEach(b=>b.disabled=true);btn.classList.add("on");
 play(r.kind==="throw"?2200:r.kind==="drop2"&&r.b==="light"?2600:1800,u=>scene(K,r,u),()=>{
  if(right)good();
  const msg=(right?"You guessed it! ":"Now we know! ")+r.why;
  const box=document.createElement("div");box.className="pl-why";box.textContent=msg;
  const nx=document.createElement("button");nx.type="button";nx.className="pl-btn pl-go";nx.textContent=ix<R.length-1?"Next test →":"Try the challenge →";
  nx.onclick=()=>{tap();ix++;if(ix<R.length)ask();else{record();challenge()}};
  const m=app().querySelector(".pl-root");m.appendChild(box);m.appendChild(nx);say(msg);
  try{nx.focus({preventScroll:true})}catch(e){}
 });
}

function record(){
 const A=window.PEBBLE_ADAPTIVE;
 Object.keys(res).forEach(id=>{const x=res[id];if(!x.q||!A)return;
  try{A.recordSession(S,K,4,"science",id,{questions:x.q,firstTry:x.ok,misses:x.q-x.ok,questionIds:[]})}catch(e){}});
 S.physicsLab=S.physicsLab||{};const p=S.physicsLab[K]=S.physicsLab[K]||{plays:0,goals:0,lastAt:0};
 p.plays++;p.lastAt=Date.now();store();
}

const TARGETS=[[3,"Grass"],[4,"Wood"],[8,"Ice"],[2,"Wood"],[6,"Wood"],[12,"Ice"],[2,"Grass"],[4,"Ice"]];
let ch=null;
function challenge(){
 const p=(S.physicsLab&&S.physicsLab[K])||{goals:0};
 ch={h:"Low",f:"Wood",n:0,t:TARGETS[(p.goals||0)%TARGETS.length][0],busy:false};
 const opt=(grp,keys)=>'<div class="pl-row"><span class="pl-lab">'+grp+'</span>'+keys.map(x=>'<button type="button" class="pl-btn" data-'+grp.toLowerCase()+'="'+x+'">'+x+'</button>').join("")+'</div>';
 frame('<h1>Get the '+esc(T.roller)+' in the '+esc(T.goal)+'</h1><p class="pl-p">Pick a ramp and a floor. Then tap Roll.</p><canvas class="pl-cv" aria-hidden="true"></canvas>'+opt("Ramp",Object.keys(HEIGHTS))+opt("Floor",Object.keys(FLOORS))+'<button type="button" class="pl-btn pl-go" id="pl-roll">Roll!</button><p class="pl-p" id="pl-msg" aria-live="polite"></p>');
 canvas();say("Get the "+T.roller+" in the "+T.goal+". Pick a ramp and a floor. Then tap Roll.");
 const sync=()=>{app().querySelectorAll("[data-ramp]").forEach(b=>b.classList.toggle("on",b.dataset.ramp===ch.h));app().querySelectorAll("[data-floor]").forEach(b=>b.classList.toggle("on",b.dataset.floor===ch.f));drawCh(0,false)};
 app().querySelectorAll("[data-ramp]").forEach(b=>b.onclick=()=>{if(ch.busy)return;tap();ch.h=b.dataset.ramp;sync()});
 app().querySelectorAll("[data-floor]").forEach(b=>b.onclick=()=>{if(ch.busy)return;tap();ch.f=b.dataset.floor;sync()});
 document.getElementById("pl-roll").onclick=roll;sync();
}
function drawCh(u,moving){
 sky();const h=HEIGHTS[ch.h],d=Math.min(12,dist(h,FLOORS[ch.f].mu));
 ramp(h,ch.f);goal(K,RX()+RW()+ch.t*UNIT());
 const [x,y]=moving?rollPos(h,d,u,GY()):rollPos(h,d,0,GY());thing(K,"roller",x,y);
}
function roll(){
 if(ch.busy)return;tap();ch.busy=true;
 const h=HEIGHTS[ch.h],d=Math.min(12,dist(h,FLOORS[ch.f].mu)),msg=document.getElementById("pl-msg");msg.textContent="";
 play(1000+d*120,u=>drawCh(u,true),()=>{
  ch.busy=false;const off=d-ch.t;let t;
  if(Math.abs(off)<.6){
   win();ch.n++;const p=S.physicsLab[K];p.goals=(p.goals||0)+1;store();
   t=ch.n>=3?"Three in a row! You are a real scientist.":"In the "+T.goal+"! Here is a new one.";
   msg.textContent=t;say(t);
   if(ch.n>=3){const b=document.getElementById("pl-roll");b.textContent="All done →";b.onclick=()=>{tap();home()};return}
   ch.t=TARGETS[p.goals%TARGETS.length][0];setTimeout(()=>drawCh(0,false),900);
  }else{
   t=off<0?"Not far enough. Try a higher ramp or a smoother floor.":"Too far! Try a lower ramp or a rougher floor.";
   msg.textContent=t;say(t);
  }
 });
}

function addCard(){
 const k=who(),root=app().querySelector(".td-root");
 if(!root||k===null||!eligible(k)||root.querySelector("#pl-card"))return;
 const t=theme(k),b=document.createElement("button");
 b.type="button";b.className="td-big td-island";b.id="pl-card";
 b.innerHTML='<span class="td-eye">Science game</span><span class="td-row"><span class="td-ic" aria-hidden="true">'+t.ico+'</span><span>'+esc(t.name)+'</span></span><span class="td-go">Play →</span>';
 b.onclick=()=>{tap();start()};
 const after=root.querySelector("#td-island")||root.querySelector("#td-lesson");
 if(after)after.after(b);else root.querySelector(".td-sub").after(b);
}
try{new MutationObserver(addCard).observe(app(),{childList:true,subtree:true})}catch(e){}
addCard();

window.PEBBLE_PHYSICS={start,theme,rounds,dist};
})();
