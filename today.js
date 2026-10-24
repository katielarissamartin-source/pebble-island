(function(){
"use strict";
const A=window.PEBBLE_ADAPTIVE,B=window.PEBBLE_QCAA_LESSONS;
if(!A||!B||!document.getElementById("app"))return;
const app=()=>document.getElementById("app");
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const SUBJ=[["maths","🔢","Maths"],["english","📖","English"],["science","🔬","Science"],["hass","🌏","Our World"],["technologies","💡","Tech"]];
const DAY=86400000;
const isPath=a=>a==="maths"||a==="english";
const who=()=>{try{return typeof kid==="undefined"?null:kid}catch(e){return null}};
const age=k=>(S.kids[k]&&S.kids[k].age)||7;
function pathYear(k){const y=(S.pathwayYear||{})[k];if(y!==undefined&&y!==null)return +y;const a=age(k);return a>=11?6:a>=10?5:a>=9?4:a>=8?3:a>=7?2:a>=6?1:0}
function labYear(k){const y=(S.curriculumYear||{})[k];if(y)return +y;const a=age(k);return a>=11?6:a>=9?5:2}
const yearOf=(k,a)=>isPath(a)?pathYear(k):labYear(k);
const startOfDay=()=>{const d=new Date();d.setHours(0,0,0,0);return +d};

function pickLesson(k){
 const now=Date.now(),t0=startOfDay(),dayN=Math.floor(t0/DAY),recs=[];
 SUBJ.forEach(([a],i)=>{
  const y=yearOf(k,a),list=(B[y]&&B[y][a])||[];if(!list.length)return;
  let r=null;try{r=A.recommend(S,k,y,B,now,a)}catch(e){}
  if(!r||!r.lesson)return;
  let doneToday=0;try{doneToday=list.filter(l=>{const s=A.state(S,k,y,a,l.id);return s&&Number(s.lastAt)>=t0}).length}catch(e){}
  recs.push({...r,area:a,year:y,order:(i+dayN)%SUBJ.length,doneToday});
 });
 const rank=r=>r.mode==="review"?0:r.mode==="new"?1:2;
 recs.sort((x,y)=>(x.doneToday-y.doneToday)||(rank(x)-rank(y))||(x.order-y.order));
 return recs[0]||null;
}

function pickIsland(k){
 let list=[];try{list=(typeof WORLDS!=="undefined"?WORLDS:[]).filter(w=>w.max>1)}catch(e){}
 if(!list.length)return null;
 const p=(S.progress||{})[k]||{},dayN=Math.floor(startOfDay()/DAY);
 const open=list.filter(w=>{const q=p[w.id];return !q||!q.placed||(q.lvl||1)<w.max});
 const pool=open.length?open:list;
 return pool[(dayN+k*3)%pool.length];
}

function openIsland(id){
 try{round=null;render();const b=document.querySelector('[data-w="'+id+'"]');if(b)b.click()}catch(e){}
}
function openSubject(a){
 if(isPath(a)&&window.PEBBLE_STUDIO)PEBBLE_STUDIO.showSubject(a);
 else if(window.PEBBLE_ADAPTIVE_UI)PEBBLE_ADAPTIVE_UI.showArea(a);
}
function startLesson(r){
 if(isPath(r.area)&&window.PEBBLE_STUDIO)PEBBLE_STUDIO.start(r.area,r.index);
 else if(window.PEBBLE_ADAPTIVE_UI)PEBBLE_ADAPTIVE_UI.start(r.area,r.index);
}

const css=document.createElement("style");
css.textContent=[
".td-root{max-width:720px;width:100%;margin:0 auto;display:grid;gap:14px;padding-bottom:110px;color:#14262c}",
".td-root *{box-sizing:border-box}",
".td-root h1.td-hi{margin:6px 0 0;font:800 clamp(1.8rem,6vw,2.4rem)/1.2 var(--display);background:none!important;-webkit-text-fill-color:currentColor!important;color:#14262c!important}",
".td-sub{margin:0;font-size:1.15rem;color:#14262c}",
".td-big{display:grid;gap:10px;justify-items:start;text-align:left;width:100%;border-radius:22px;padding:18px 20px;border:3px solid #125877!important;background:#fff!important;color:#14262c!important;cursor:pointer;box-shadow:0 5px 0 #0c3d52}",
".td-big.td-lesson{background:#125877!important;color:#fff!important}",
".td-eye{font:800 .85rem var(--display);text-transform:uppercase;letter-spacing:.06em}",
".td-row{display:flex;gap:12px;align-items:center;font:800 clamp(1.3rem,4.5vw,1.7rem)/1.25 var(--display)}",
".td-ic{font-size:2.6rem;line-height:1}",
".td-go{font:800 1.05rem var(--display);padding:10px 18px;border-radius:14px;background:#fff;color:#125877}",
".td-island .td-go{background:#125877;color:#fff}",
".td-root h2.td-h2{margin:10px 0 0;font:800 1.15rem var(--display);color:#14262c!important;background:none!important;-webkit-text-fill-color:currentColor!important}",
".td-subj{display:grid;grid-template-columns:repeat(auto-fill,minmax(118px,1fr));gap:10px}",
".td-tile{min-height:96px;display:grid;place-items:center;gap:4px;border-radius:18px;border:2px solid #648795!important;background:#fff!important;color:#14262c!important;font:800 1.05rem var(--display);cursor:pointer;padding:10px}",
".td-tile span{font-size:2.1rem;line-height:1}",
".td-big:focus-visible,.td-tile:focus-visible{outline:4px solid #1e86a3;outline-offset:3px}"
].join("\n");
document.head.appendChild(css);

function show(){
 const k=who();
 if(k===null||!S.kids||!S.kids[k]){if(typeof render==="function")render();return}
 try{round=null}catch(e){}
 document.body.classList.remove("adult");
 const r=pickLesson(k),w=pickIsland(k),subj=r?SUBJ.find(s=>s[0]===r.area):null;
 app().innerHTML='<main class="studio-today td-root" aria-label="Today">'+
  '<h1 class="td-hi" data-td-focus>Hi '+esc(S.kids[k].name)+'!</h1><p class="td-sub">What shall we do today?</p>'+
  (r?'<button type="button" class="td-big td-lesson" id="td-lesson"><span class="td-eye">'+(r.mode==="review"?"Remember this?":"Today\'s lesson")+' · '+esc(subj[2])+'</span><span class="td-row"><span class="td-ic" aria-hidden="true">'+esc(r.lesson.icon)+'</span><span>'+esc(r.lesson.title)+'</span></span><span class="td-go">Start →</span></button>':'')+
  (w?'<button type="button" class="td-big td-island" id="td-island"><span class="td-eye">Island game</span><span class="td-row"><span class="td-ic" aria-hidden="true">'+esc(w.ico)+'</span><span>'+esc(w.name)+'</span></span><span class="td-go">Play →</span></button>':'')+
  '<h2 class="td-h2">Or pick a subject</h2><div class="td-subj">'+SUBJ.map(([a,ic,n])=>'<button type="button" class="td-tile" data-td-area="'+a+'"><span aria-hidden="true">'+ic+'</span>'+n+'</button>').join("")+'</div></main>';
 const tap=()=>{try{SFX.tap()}catch(e){}};
 const l=document.getElementById("td-lesson");if(l)l.onclick=()=>{tap();startLesson(r)};
 const i=document.getElementById("td-island");if(i)i.onclick=()=>{tap();openIsland(w.id)};
 app().querySelectorAll("[data-td-area]").forEach(b=>b.onclick=()=>{tap();openSubject(b.dataset.tdArea)});
 const h=app().querySelector("[data-td-focus]");if(h){h.tabIndex=-1;try{h.focus({preventScroll:true})}catch(e){}}
 try{window.scrollTo(0,0)}catch(e){}
}

function doneThisYear(k){
 let n=0;SUBJ.forEach(([a])=>{const y=yearOf(k,a);((B[y]&&B[y][a])||[]).forEach(l=>{try{const s=A.state(S,k,y,a,l.id);if(s&&(s.sessions||s.legacy))n++}catch(e){}})});return n;
}
const mapCss=document.createElement("style");
mapCss.textContent='#pi-classic-islands>summary{pointer-events:none;cursor:default;list-style:none}#pi-classic-islands>summary::-webkit-details-marker{display:none}#pi-classic-islands>summary::marker{content:""}#pi-classic-islands>summary::after,#pi-classic-islands>summary::before{display:none!important}#pi-all-islands{display:none!important}.curr-card[data-qcaa]{display:none!important}';
document.head.appendChild(mapCss);
function decorateMap(){
 const k=who(),a=app();if(k===null||!a||!a.querySelector(".map"))return;
 const d=a.querySelector("#pi-classic-islands");
 if(d){if(!d.open)d.open=true;if(!d.dataset.td){d.dataset.td="1";d.addEventListener("toggle",()=>{if(!d.open)d.open=true});const sm=d.querySelector("summary");if(sm){sm.textContent="🧭 All the islands";sm.tabIndex=-1}}}
 const lp=a.querySelector("[data-learning-path]");
 if(lp&&!lp.dataset.td){lp.dataset.td="1";
  lp.innerHTML='<span class="studio-emoji" aria-hidden="true">📚</span><span><strong style="font:800 1.4rem var(--display);display:block;color:#fff">Lessons</strong><small style="display:block;color:#fff">Maths, English, Science, Our World and Tech</small></span>';
  lp.onclick=()=>{try{SFX.tap()}catch(e){}show()}}
 const g=a.querySelector(".pi-guide-row p");
 if(g&&!g.dataset.td){g.dataset.td="1";const n=doneThisYear(k);g.textContent="🌟 "+n+" lesson"+(n===1?"":"s")+" done this year"}
 const sc=a.querySelector(".curr-map-shortcut");
 if(sc&&!sc.dataset.td){sc.dataset.td="1";const r=pickLesson(k);
  if(r){sc.textContent="📚 Today's lesson: "+r.lesson.title;sc.onclick=()=>{try{round=null}catch(e){}startLesson(r)}}else sc.remove()}
}
try{new MutationObserver(decorateMap).observe(app(),{childList:true,subtree:true})}catch(e){}

window.PEBBLE_TODAY={show,pickLesson,pickIsland,decorateMap};
if(window.PEBBLE_STUDIO)window.PEBBLE_STUDIO.showDashboard=show;
if(window.PEBBLE_ADAPTIVE_UI)window.PEBBLE_ADAPTIVE_UI.showHome=show;

function hookTab(){
 const bar=document.getElementById("tabbar");if(!bar||bar.dataset.td)return;bar.dataset.td="1";
 const b=bar.querySelector('[data-tab2="learn"]');if(b){b.innerHTML='<span>☀️</span>Today';b.setAttribute("aria-label","Today")}
 bar.addEventListener("click",e=>{if(!e.target.closest('[data-tab2="learn"]'))return;e.stopImmediatePropagation();try{SFX.tap()}catch(_){}show()},true);
}
hookTab();document.addEventListener("DOMContentLoaded",hookTab);

document.addEventListener("click",e=>{
 if(!e.target.closest(".kid[data-k]"))return;
 setTimeout(()=>{const a=app();if(who()!==null&&a&&a.querySelector(".map"))show()},0);
});
})();
