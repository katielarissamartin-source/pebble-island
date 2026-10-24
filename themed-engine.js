/* Themed lessons: swaps lesson words per child so every lesson screen shows interest-based content.
   Themes live in window.PEBBLE_THEMES[kidIndex]["year.area.id"] (see theme-ivy.js, theme-hayden.js).
   Lesson ids, codes and progress keys never change, so progress and reviews carry over.
   When no child is chosen (grown-up views), the standard lessons show. */
(function(){
const B=window.PEBBLE_QCAA_LESSONS;if(!B)return;
const FIELDS=["title","icon","goal","teach","example","tryIt","questions"];
const orig=new Map();let last;
const okQ=q=>q&&typeof q.prompt==="string"&&Array.isArray(q.choices)&&q.choices.length>=2&&Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.choices.length;
function each(fn){for(const y in B)for(const a in B[y])for(const l of B[y][a])fn(l,y+"."+a+"."+l.id)}
function who(){try{return typeof kid==="undefined"?null:kid}catch(e){return null}}
function apply(force){
  const k=who();if(!force&&k===last)return;const prev=last;last=k;
  const th=(window.PEBBLE_THEMES||{})[k]||{};
  each((l,key)=>{
    if(!orig.has(l)){const o={};FIELDS.forEach(f=>o[f]=l[f]);orig.set(l,o)}
    const o=orig.get(l),t=th[key];
    FIELDS.forEach(f=>{if(o[f]!==undefined)l[f]=o[f]});
    if(!t)return;
    FIELDS.forEach(f=>{
      if(t[f]===undefined||t[f]===null||t[f]==="")return;
      if(f==="questions"){const qs=t.questions.filter(okQ);if(qs.length>=3)l.questions=qs}
      else l[f]=t[f]});
  });
  /* A child was just chosen: redraw once so text already on screen (e.g. the suggested lesson) uses the themed words. */
  if(prev!==undefined&&k!==null&&typeof render==="function")queueMicrotask(()=>{try{render()}catch(e){}});
}
window.PEBBLE_THEME_APPLY=apply;
apply(true);
["pointerdown","click","touchstart","keydown"].forEach(e=>document.addEventListener(e,()=>apply(),true));
try{new MutationObserver(()=>apply()).observe(document.body,{childList:true,subtree:true})}catch(e){}
})();
