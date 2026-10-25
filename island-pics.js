/* Per-child counting pictures for island questions. Claude-owned. Load after part-a.js, part-b.js and island-subjects.js. */
(function(){
"use strict";
let G=null;try{G=GEN}catch(e){}
if(!G)return;
const who=()=>{try{return typeof kid==="undefined"?null:kid}catch(e){return null}};
const any=a=>a[Math.floor(Math.random()*a.length)];
const POOL={
 0:["🦄","🧚","🌈","👑","🏰","🦋","⭐","🌸"],
 1:["🦕","🦖","🥚","🦴","🧱","⛏️","🌋"]
};
const NEUTRAL=["🍎","⭐","🐞","🍓","🐟","🌸","🚗"];
/* pictures the base generators pick for pure counting; none of them is ever named in the question */
const SRC={
 nums:["🍎","⭐","🐞","🍓","🐟","🌸","🦕","🚗"],
 times:["🍌","🥥","🐒","🍉","🦜","🌺","🍍"],
 frac:["🍓","🍪","🧁","🍬"]
};
function swap(stage,from){
 const k=who();
 const p=POOL[k]||(from.includes("🦕")?NEUTRAL:null);
 if(!p)return stage;
 let out=stage;
 const e=any(p);
 for(const f of from){if(out.includes(f))out=out.split(f).join(e)}
 return out;
}
Object.keys(SRC).forEach(id=>{
 const orig=G[id];if(typeof orig!=="function")return;
 G[id]=function(l){
  const q=orig.apply(this,arguments);
  try{
   if(q&&typeof q.stage==="string"&&/data-tap|data-row/.test(q.stage)&&!/class="graph"/.test(q.stage))q.stage=swap(q.stage,SRC[id]);
  }catch(e){}
  return q;
 };
});
window.PEBBLE_ISLAND_PICS={POOL};
})();
