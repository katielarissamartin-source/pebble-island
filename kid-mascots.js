/* Per-child mascots: a unicorn for Ivy (kid 0) and a turtle for Hayden (kid 1).
   Everyone else keeps the pebble. Keeps the #mouth path so pip(mood,text) still works,
   and keeps the #hat span so outfits still show. */
(function(){
const m=document.getElementById("mascot");if(!m)return;
const SHADOW='<ellipse cx="60" cy="108" rx="34" ry="7" fill="rgba(0,0,0,.15)"/>';
const FACE='<circle cx="48" cy="62" r="8" fill="#1f3b44"/><circle cx="76" cy="62" r="8" fill="#1f3b44"/><circle cx="51" cy="59" r="2.5" fill="#fff"/><circle cx="79" cy="59" r="2.5" fill="#fff"/><path id="mouth" d="M50 78 Q62 88 74 78" stroke="#1f3b44" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="38" cy="76" r="5" fill="#f0a0a8" opacity=".75"/><circle cx="86" cy="76" r="5" fill="#f0a0a8" opacity=".75"/>';
const HEAD='<path d="M20 72 C14 40 38 18 64 20 C92 22 108 46 100 74 C94 96 74 102 58 102 C38 102 24 92 20 72Z"';
const SVG={
  pebble:null,
  unicorn:'<svg viewBox="0 0 120 120">'+SHADOW+
    '<path d="M26 48 C10 52 8 80 20 92 C14 74 20 62 30 60Z" fill="#c79be8"/><path d="M22 34 C6 40 6 62 14 74 C12 58 18 46 30 44Z" fill="#f4a6cf"/>'+
    '<path d="M30 34 L36 8 L52 26Z" fill="#fdf6ff"/><path d="M90 34 L84 8 L68 26Z" fill="#fdf6ff"/><path d="M35 28 L38 16 L45 26Z" fill="#f4a6cf"/><path d="M85 28 L82 16 L75 26Z" fill="#f4a6cf"/>'+
    HEAD+' fill="#fdf6ff"/><path d="M30 60 C32 42 46 30 62 30" stroke="#ffffff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".9"/>'+
    '<path d="M60 3 L52 30 L68 30Z" fill="#f7cf4f"/><path d="M56 17 L65 13 M54 24 L67 20" stroke="#e9a925" stroke-width="2.5" stroke-linecap="round"/>'+
    '<path d="M46 30 C50 22 60 22 66 30 C62 34 52 36 46 30Z" fill="#f4a6cf"/>'+
    FACE+
    '<path d="M98 30 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z" fill="#f7cf4f"/></svg>',
  turtle:'<svg viewBox="0 0 120 120">'+SHADOW+
    '<ellipse cx="30" cy="100" rx="12" ry="8" fill="#6bb36b"/><ellipse cx="90" cy="100" rx="12" ry="8" fill="#6bb36b"/>'+
    '<path d="M10 66 C10 14 110 14 110 66 C110 74 100 78 60 78 C20 78 10 74 10 66Z" fill="#3f8f5a"/>'+
    '<path d="M60 18 L60 40 M32 34 L46 46 M88 34 L74 46 M22 58 L44 54 M98 58 L76 54" stroke="#2c6b42" stroke-width="3.5" stroke-linecap="round" fill="none"/>'+
    '<path d="M46 46 L60 40 L74 46 L70 58 L50 58Z" fill="#56a875" stroke="#2c6b42" stroke-width="3"/>'+
    '<ellipse cx="60" cy="74" rx="40" ry="30" fill="#9bd47d"/>'+
    '<path d="M30 62 C34 50 44 44 54 44" stroke="#c4ecaa" stroke-width="6" fill="none" stroke-linecap="round"/>'+
    FACE+'</svg>'
};
const WHO={0:{kind:"unicorn",name:"Sparkle",label:"Sparkle the unicorn",lines:["Hi! I'm Sparkle!","You're doing magical work!","Boop! That tickles my horn!","Let's learn together!","I love rainbows!","Sparkle sparkle!"]},
           1:{kind:"turtle",name:"Shelly",label:"Shelly the turtle",lines:["Hi! I'm Shelly!","Slow and steady wins!","Boop! That tickles my shell!","Let's learn together!","I love building blocks!","Nice work, mate!"]}};
let svg0=m.querySelector("svg"),pebble=svg0?svg0.outerHTML:"",orig=m.onclick,shown;
SVG.pebble=pebble;
function swap(kind){
  const cur=m.querySelector("svg");if(!cur||!SVG[kind])return;
  const t=document.createElement("div");t.innerHTML=SVG[kind];
  const n=t.firstChild;cur.replaceWith(n);
}
function who(){try{return typeof kid==="undefined"?null:kid}catch(e){return null}}
function names(root,name){
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const hits=[];
  while(w.nextNode()){const n=w.currentNode;if(/\bPip\b/.test(n.nodeValue))hits.push(n)}
  hits.forEach(n=>{n.nodeValue=n.nodeValue.replace(/\bPip\b/g,name)});
}
function apply(){
  const k=who(),info=WHO[k];
  if(info){names(document.getElementById("app")||document.body,info.name)}
  const key=info?info.kind:"pebble";
  if(key===shown)return;shown=key;
  swap(key);
  m.setAttribute("aria-label",info?info.label:"Pip the pebble");
  m.onclick=info?function(){try{SFX.tap()}catch(e){}const t=pick(info.lines);pip("happy",t);try{speak(t,"happy")}catch(e){}}:orig;
}
window.PEBBLE_MASCOT_APPLY=apply;
apply();
["pointerdown","click","touchstart"].forEach(e=>document.addEventListener(e,apply,true));
try{new MutationObserver(apply).observe(document.getElementById("app")||document.body,{childList:true,subtree:true})}catch(e){}
})();
