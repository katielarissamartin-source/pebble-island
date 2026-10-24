/* Pebble Island Living Overworld — native browser APIs, no engine dependency */
(function(){
"use strict";
if(typeof map!=="function" || !document.getElementById("app"))return;

const ZONES=[
 {id:"math",name:"Math Mountain",icon:"⛰️",x:67,y:25,subject:"maths",description:"Climb to the number peaks. Every puzzle is a little step upward."},
 {id:"reading",name:"Reading Reef",icon:"📚",x:79,y:59,subject:"english",description:"Stories, sounds and word mysteries live in this sunny treehouse."},
 {id:"cave",name:"Curiosity Cave",icon:"🔮",x:28,y:38,description:"Follow the glowing crystals to Science, Our World and Tech & Design."},
 {id:"treasure",name:"Treasure Beach",icon:"🧰",x:27,y:74,description:"A cosy place to see the stickers and treasures you've collected."},
 {id:"home",name:"Home Cove",icon:"🏡",x:50,y:82,description:"Your friendly starting place. Your next learning adventure is ready."}
];
const Z=Object.fromEntries(ZONES.map(z=>[z.id,z]));
const anchor=(z)=>{if(window.innerWidth<=360&&z.id==="treasure")return{x:17,y:70};if(window.innerWidth<=360&&z.id==="home")return{x:60,y:86};if(window.innerWidth<=600&&z.id==="treasure")return{x:21,y:72};if(window.innerWidth<=600&&z.id==="home")return{x:55,y:84};return z};
const fallback=(z)=>{const p=anchor(z);return{x:Math.min(92,Math.max(8,p.x+(p.x>=72?-12:11))),y:Math.min(88,p.y+8)}};
const escapeHtml=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safeId=k=>Number.isInteger(k)&&k>=0?k:0;
const getLevel=k=>{
 const val=Number(S.pathwayYear?.[k]);
 if([0,1,2,3,4,5].includes(val))return val;
 const age=Number(S.kids[k]?.age||7);
 return age>=10?5:age>=9?4:age>=8?3:age>=7?2:age>=6?1:0;
};
function getAdaptive(k,area){
 const y=getLevel(k),bank=window.PEBBLE_QCAA_LESSONS?.[y],A=window.PEBBLE_ADAPTIVE;
 if(!bank||!A?.recommend)return null;
 try{
  const d={[y]:{english:bank.english||[],maths:bank.maths||[]}};
  return A.recommend(S,k,y,d,Date.now(),area);
 }catch(e){return null}
}
const doneCount=(k,area)=>{
 const y=getLevel(k),p=S.curriculumProgress?.[k]||{},list=window.PEBBLE_QCAA_LESSONS?.[y]?.[area]||[];
 return list.filter(lesson=>p[y+"-"+area+"-"+lesson.id]?.done).length;
};
function getExplorer(k){
 S.islandWorld=S.islandWorld||{};
 const state=S.islandWorld[k]||(S.islandWorld[k]={visited:[],pos:{x:58,y:84}});
 if(!Array.isArray(state.visited))state.visited=[];
 if(!state.pos||!Number.isFinite(state.pos.x)||!Number.isFinite(state.pos.y))state.pos={x:58,y:84};
 return state;
}
const calmMode=()=>!!(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches||S.settings?.calmfx||S.settings?.calm);
const artwork=()=>S.settings?.calmfx||S.settings?.calm||window.matchMedia?.("(prefers-reduced-motion: reduce)").matches?"/island-scene-still.svg":"/island-scene.svg";
let activeTrip=null,serial=0;
let pendingLesson=null;
function noteLesson(result){
 if(!result||!Number.isInteger(result.child)||!["maths","english"].includes(result.area))return;
 pendingLesson={child:result.child,area:result.area,title:String(result.title||"your lesson").slice(0,90),newStar:!!result.newStar};
}

function renderWorld(){
 const app=document.getElementById("app"),mapList=app?.querySelector(".map"),nav=app?.querySelector(".top");
 if(!app||!mapList||!nav||kid===null||app.querySelector(".pi-world"))return;
 const k=safeId(kid),explorer=getExplorer(k),next=getAdaptive(k);
 const suggested=next?.area==="maths"?"math":next?.area==="english"?"reading":"math";
 const progress=doneCount(k,"maths")+doneCount(k,"english");
 const celebration=pendingLesson?.child===k?pendingLesson:null;
 if(celebration)pendingLesson=null;
 const section=document.createElement("section");section.className="pi-world";section.setAttribute("aria-label","Living Pebble Island");
 const kidFace=escapeHtml(S.kids[k]?.face||"🐢");
 const childName=escapeHtml(S.kids[k]?.name||"Explorer");
 section.innerHTML=`
 <header class="pi-world-head">
   <div class="pi-world-headcopy">
    <span class="pi-eyebrow">Your living island · Explore at your own pace</span>
    <h1>Welcome to Pebble Island, ${childName}!</h1>
    <p>Tap a place to travel there. Each visit opens a little adventure.</p>
   </div>
   <button class="pi-head-action" id="pi-next-adventure" type="button" aria-label="Travel to the next recommended learning adventure">🌟 My next adventure <span aria-hidden="true">→</span></button>
 </header>
 ${celebration?`<div class="pi-world-achievement" role="status"><span class="pi-achievement-star" aria-hidden="true">★</span><span><strong>${celebration.newStar?"New lesson star earned!":"Good practice completed!"}</strong><small>${escapeHtml(celebration.title)} · ${celebration.area==="maths"?"Math Mountain":"Reading Reef"}</small></span></div>`:""}
 <div class="pi-scene" role="group" aria-label="Animated island map. Tap a named destination to travel.">
  <img class="pi-map-art" src="${artwork()}" alt="" aria-hidden="true" draggable="false" decoding="async" fetchpriority="high">
  <div class="pi-stage-shimmer" aria-hidden="true"></div>
  ${ZONES.map(z=>`<button type="button" class="pi-landmark ${z.id===suggested?"is-recommended":""}" data-zone="${z.id}" data-visited="${explorer.visited.includes(z.id)}" data-progress="${z.subject?doneCount(k,z.subject)>0:false}" style="--px:${anchor(z).x}%;--py:${anchor(z).y}%;" aria-label="Travel to ${z.name}${z.subject?", "+doneCount(k,z.subject)+" lessons explored":""}">
   <span class="pi-landmark-emoji" aria-hidden="true">${z.icon}</span><span class="pi-landmark-label">${z.name}</span>
  </button>`).join("")}
  <div class="pi-pathway-avatar" aria-hidden="true"><span class="pi-avatar-shape"><span class="pi-avatar-face">${kidFace}</span></span></div>
  <span id="pi-route-status" class="pi-route-status" aria-live="polite" aria-atomic="true" hidden></span>
  <div class="pi-stage-frame" aria-hidden="true"><span>🌿 A little world just for you</span><span>🌊 Touch a destination and explore</span></div>
 </div>
 <section class="pi-zone-dialog" id="pi-zone-dialog" aria-label="Arrived at island destination" hidden></section>
 <div class="pi-guide-row"><p>🌟 ${progress} lesson${progress===1?"":"s"} explored in this year's English and Maths pathways</p>
  <button class="pi-explore-button" id="pi-all-islands" type="button" aria-expanded="false" aria-controls="pi-classic-islands">🗺️ See all the islands</button>
 </div>
 `;
 nav.insertAdjacentElement("afterend",section);
 const details=document.createElement("details");details.className="pi-original-islands";details.id="pi-classic-islands";
 const summary=document.createElement("summary");summary.textContent="🧭 All learning islands · Games and activities";
 details.append(summary);
 const intro=app.querySelector(".dashboard-intro");
 const title=app.querySelector(".island-title");
 const filters=app.querySelector(".island-filters");
 for(const node of [intro,title,filters,mapList])if(node)details.append(node);
 section.insertAdjacentElement("afterend",details);
 const avatar=section.querySelector(".pi-pathway-avatar");
 const stage=section.querySelector(".pi-scene");
 const status=section.querySelector("#pi-route-status");
 const panel=section.querySelector("#pi-zone-dialog");
 let pos={...explorer.pos};
 function pixels(p){
  const w=stage.clientWidth,h=stage.clientHeight;
  const x=(p.x/100)*w-avatar.offsetWidth/2;
  const y=(p.y/100)*h-avatar.offsetHeight*.64;
  return "translate3d("+x.toFixed(1)+"px,"+y.toFixed(1)+"px,0)";
 }
 function place(p){avatar.style.transform=pixels(p);pos={...p}}
 function ready(z,token){
  if(token!==serial||!stage.isConnected)return;
  place(fallback(z));
  avatar.classList.remove("is-walking");
  avatar.classList.add("is-arrived");
  setTimeout(()=>{if(avatar.isConnected)avatar.classList.remove("is-arrived")},720);
  activeTrip=null;
  stage.querySelectorAll(".pi-landmark").forEach(btn=>{btn.disabled=false;btn.classList.toggle("is-target",btn.dataset.zone===z.id)});
  const oldVisits=explorer.visited.includes(z.id);
  if(!oldVisits){explorer.visited.push(z.id);const btn=stage.querySelector('[data-zone="'+z.id+'"]');if(btn)btn.dataset.visited="true"}
  explorer.pos={...pos};
  save();
  status.hidden=true;
  showArrival(z,!oldVisits);
 }
 function navigate(id){
  const z=Z[id];
  if(!z||!avatar.isConnected)return;
  serial++;
  if(activeTrip?.cancel)activeTrip.cancel();
  const token=serial;
  panel.hidden=true;
  stage.querySelectorAll(".pi-landmark").forEach(btn=>{btn.disabled=true;btn.classList.toggle("is-target",btn.dataset.zone===id)});
  status.hidden=false;status.textContent="Travelling to "+z.name+"…";
  if(typeof SFX!=="undefined"&&SFX.tap)try{SFX.tap()}catch(e){}
  const end=fallback(z);
  if(calmMode()||typeof avatar.animate!=="function"){
   ready(z,token);
   return;
  }
  avatar.classList.remove("is-arrived");avatar.classList.add("is-walking");
  avatar.style.willChange="transform";
  const hub={x:51,y:59};
  const frames=[
   {transform:pixels(pos),offset:0},
   {transform:pixels({x:(pos.x+hub.x)/2,y:(pos.y+hub.y)/2-2}),offset:.24},
   {transform:pixels(hub),offset:.48},
   {transform:pixels({x:(hub.x+end.x)/2,y:(hub.y+end.y)/2-3}),offset:.73},
   {transform:pixels(end),offset:1}
  ];
  const t=avatar.animate(frames,{duration:1050,easing:"ease-in-out",fill:"forwards"});
  activeTrip=t;
  t.onfinish=()=>{
   if(serial!==token||!avatar.isConnected)return;
   avatar.style.willChange="auto";
   place(end);
   t.cancel();
   ready(z,token);
  };
 }
 function showArrival(z,newVisit){
  const rec=z.subject?getAdaptive(k,z.subject):null;
  const nextLabel=rec?.lesson?.title||null;
  const count=z.subject?doneCount(k,z.subject):null;
  let actionTitle="Start exploring →";
  if(z.subject)actionTitle=nextLabel?"Learn: "+nextLabel+" →":"See "+(z.subject==="maths"?"Maths":"English")+" lessons →";
  else if(z.id==="cave")actionTitle="Explore Curiosity Lab →";
  else if(z.id==="treasure")actionTitle="Open my treasures →";
  else if(z.id==="home")actionTitle="Open my learning path →";
  const sub=z.subject?" "+count+" lesson"+(count===1?"":"s")+" explored in "+(z.subject==="maths"?"Maths":"English")+".":"";
  panel.innerHTML=`
   <div class="pi-zone-dialog-head"><span class="pi-zone-dialog-mark" aria-hidden="true">${z.icon}</span>
    <div><span class="pi-eyebrow">${newVisit?"New place discovered!":"You've arrived"}</span><h2 id="pi-dialog-heading" tabindex="-1">${escapeHtml(z.name)}</h2></div>
   </div>
   <p>${escapeHtml(z.description)}${escapeHtml(sub)}</p>
   <div class="pi-zone-dialog-actions">
     <button class="pi-action pi-action-primary" id="pi-enter-zone" type="button">${escapeHtml(actionTitle)}</button>
     <button class="pi-action" id="pi-stay" type="button">Stay on the island</button>
   </div>
  `;
  panel.hidden=false;
  const launch=()=>{
   if(z.subject&&window.PEBBLE_STUDIO){
    if(rec&&Number.isInteger(rec.index))window.PEBBLE_STUDIO.start(z.subject,rec.index);
    else window.PEBBLE_STUDIO.showSubject(z.subject);
   }else if(z.id==="home"&&window.PEBBLE_STUDIO){
    window.PEBBLE_STUDIO.showDashboard();
   }else if(z.id==="cave"){
    if(window.PEBBLE_ADAPTIVE_UI?.showHome)window.PEBBLE_ADAPTIVE_UI.showHome();
    else{details.open=true;details.querySelector(".curr-card")?.click()}
   }else if(z.id==="treasure"){
    if(typeof stickerBook==="function")stickerBook();
    else{details.open=true;details.querySelector("#stk")?.click()}
   }
  };
  panel.querySelector("#pi-enter-zone").onclick=launch;
  panel.querySelector("#pi-stay").onclick=()=>{
   panel.hidden=true;
   stage.querySelectorAll(".pi-landmark").forEach(btn=>btn.classList.remove("is-target"));
   stage.scrollIntoView({block:"nearest",behavior:calmMode()?"instant":"smooth"});
  };
  // Bring the next action into view on smaller tablets without a distracting full-screen modal.
  if(panel.getBoundingClientRect().bottom>innerHeight-24)
   panel.scrollIntoView({block:"nearest",behavior:calmMode()?"instant":"smooth"});
  panel.querySelector("#pi-dialog-heading")?.focus({preventScroll:true});
 }
 requestAnimationFrame(()=>{if(stage.isConnected)place(pos)});
 section.querySelectorAll(".pi-landmark").forEach(btn=>btn.addEventListener("click",()=>navigate(btn.dataset.zone)));
 const top=section.querySelector("#pi-next-adventure");top.onclick=()=>navigate(suggested);
 const more=section.querySelector("#pi-all-islands");
 function openAll(){details.open=true;more.setAttribute("aria-expanded","true");details.scrollIntoView({block:"start",behavior:calmMode()?"instant":"smooth"})}
 more.onclick=openAll;
 details.addEventListener("toggle",()=>more.setAttribute("aria-expanded",String(details.open)));
}
const oldMap=map;
map=function(){oldMap();renderWorld()};
window.PEBBLE_WORLD={noteLesson,zones:ZONES.map(z=>({id:z.id,name:z.name,x:z.x,y:z.y})),version:2,show:()=>{
 if(kid===null)return;
 round=null;
 render()
}};
})();