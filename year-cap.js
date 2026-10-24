(function(){
"use strict";
if(typeof WORLDS==="undefined"||typeof CURR==="undefined")return;
const who=()=>{try{return typeof kid==="undefined"?null:kid}catch(e){return null}};
function kidYear(k){
 const y=(S.pathwayYear||{})[k];if(y!==undefined&&y!==null&&y!=="")return +y;
 const a=(S.kids[k]&&S.kids[k].age)||7;return a>=11?6:a>=10?5:a>=9?4:a>=8?3:a>=7?2:a>=6?1:0;
}
function levelYear(s){
 s=String(s||"");const ys=[];
 for(const m of s.matchAll(/AC9(?:HS|TD[EI]?|M|E|S|H|P)(F|\d{1,2})/g))ys.push(m[1]==="F"?0:+m[1]);
 for(const m of s.matchAll(/\((F|\d)(?:\s*[–-]\s*(?:F|\d))?\)/g))ys.push(m[1]==="F"?0:+m[1]);
 for(const m of s.matchAll(/\b(F|\d)\s*[–-]\s*\d\b/g))ys.push(m[1]==="F"?0:+m[1]);
 const lead=s.match(/^(?:Y(\d)|F)\b/);if(lead)ys.push(lead[1]?+lead[1]:0);
 return ys.length?Math.min(...ys):null;
}
const YEARS={};
Object.keys(CURR).forEach(id=>{let last=0;YEARS[id]=(CURR[id]||[]).map(r=>{const y=levelYear(r&&r[1]);if(y!==null)last=y;return last})});
function cap(id,base,k){
 const ys=YEARS[id];if(!ys||!ys.length||!base)return base;
 const yr=kidYear(k);let n=0;
 for(let i=0;i<Math.min(base,ys.length);i++){if(ys[i]>yr)break;n++}
 if(base>ys.length&&n===ys.length)n=base;
 return n;
}
WORLDS.forEach(w=>{
 const base=w.max;
 Object.defineProperty(w,"max",{configurable:true,enumerable:true,get(){const k=who();return k===null||!S.kids||!S.kids[k]?base:cap(w.id,base,k)},set(v){}});
 w.baseMax=base;
});
if(typeof prog==="function"){
 const _prog=prog;
 prog=function(id){const p=_prog(id);const w=WORLDS.find(x=>x.id===id);if(w&&w.max>0&&p.lvl>w.max){p.lvl=w.max;if(p.r!==undefined)p.r=Math.min(p.r,w.max+.5)}return p};
}
const css=document.createElement("style");css.textContent=".yc-hide{display:none!important}";document.head.appendChild(css);
function hideIslands(){
 const k=who(),a=document.getElementById("app");if(!a)return;
 a.querySelectorAll("[data-w]").forEach(b=>{const w=WORLDS.find(x=>x.id===b.dataset.w);if(!w)return;b.classList.toggle("yc-hide",k!==null&&w.baseMax>0&&w.max===0)});
}
try{new MutationObserver(hideIslands).observe(document.getElementById("app")||document.body,{childList:true,subtree:true})}catch(e){}
window.PEBBLE_YEAR_CAP={kidYear,cap,YEARS};
})();
