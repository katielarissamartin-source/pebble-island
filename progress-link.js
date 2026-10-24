(function(){
"use strict";
const B=window.PEBBLE_QCAA_LESSONS;if(!B)return;
const ISLANDS={sci:{area:"science",lab:"Science"},geo:{area:"hass",lab:"Our World"},hist:{area:"hass",lab:"Our World"}};
const AREA_ISLANDS={science:[["sci","🔬","Science Station"]],hass:[["geo","🗺️","Map Island"],["hist","🏺","Time Cave"]]};
const who=()=>{try{return typeof kid==="undefined"?null:kid}catch(e){return null}};
const labYear=k=>{const y=S.curriculumYear&&S.curriculumYear[k];if(y!==undefined&&y!==null)return +y;const a=(S.kids[k]||{}).age||7;return a>=9?5:2};
function labCount(k,area){
 const y=labYear(k),list=(B[y]&&B[y][area])||[],done=(S.curriculumProgress||{})[k]||{};
 return{done:list.filter(l=>done[[y,area,l.id].join("-")]&&done[[y,area,l.id].join("-")].done).length,total:list.length};
}
function islandLevel(k,w){const p=((S.progress||{})[k]||{})[w];return p&&p.placed?(p.lvl||1):null}

const css=document.createElement("style");
css.textContent=".pl-card{display:flex;flex-wrap:wrap;gap:10px;align-items:center;border:2px solid var(--line,#cfdde0);border-radius:16px;padding:12px 14px;margin:0 0 14px;background:var(--panel,#fff);color:var(--ink,#14262c);font-weight:700}.pl-card span{flex:1 1 180px}.pl-card button{min-height:48px;border-radius:12px;border:2px solid #125877;background:#125877;color:#fff;font:inherit;padding:8px 14px;cursor:pointer}.pl-lab{display:block;font-size:.8em;opacity:.9;margin-top:2px}";
document.head.appendChild(css);

function openIsland(id){
 try{if(typeof render==="function")render();const b=document.querySelector('[data-w="'+id+'"]');if(b)b.click()}catch(e){}
}

function decorate(){
 const k=who();if(k===null||!S||!S.kids||!S.kids[k])return;
 const app=document.getElementById("app");if(!app)return;
 Object.entries(ISLANDS).forEach(([w,info])=>{
  const b=app.querySelector('[data-w="'+w+'"]');if(!b||b.querySelector(".pl-lab"))return;
  const c=labCount(k,info.area);if(!c.total)return;
  const sm=b.querySelector("small");if(!sm)return;
  sm.insertAdjacentHTML("afterend",'<span class="pl-lab">📚 '+info.lab+' lessons: '+c.done+' of '+c.total+'</span>');
 });
 const list=app.querySelector(".curr-lessons");
 if(list&&!app.querySelector(".pl-card")){
  const title=(app.querySelector("h1")||{}).textContent||"";
  const area=/science/i.test(title)?"science":/our world/i.test(title)?"hass":null;
  if(!area)return;
  const isl=AREA_ISLANDS[area].map(([w,ic,name])=>{const l=islandLevel(k,w);return{w,ic,name,l}});
  const c=labCount(k,area);
  const card=document.createElement("div");card.className="pl-card";
  card.innerHTML='<span>📚 Lessons done: '+c.done+' of '+c.total+'<br>'+isl.map(x=>x.ic+' '+x.name+': '+(x.l?'level '+x.l:'not started')).join('<br>')+'</span>'+isl.map(x=>'<button type="button" data-pl="'+x.w+'">'+x.ic+' Play '+x.name+'</button>').join("");
  list.parentNode.insertBefore(card,list);
  card.querySelectorAll("[data-pl]").forEach(btn=>btn.onclick=()=>openIsland(btn.dataset.pl));
 }
}
window.PEBBLE_PROGRESS_LINK={labCount,islandLevel,decorate};
try{new MutationObserver(decorate).observe(document.getElementById("app")||document.body,{childList:true,subtree:true})}catch(e){}
decorate();
})();
