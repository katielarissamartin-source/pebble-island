(function(){
"use strict";
window.PEBBLE_TEACH=window.PEBBLE_TEACH||{};
window.PEBBLE_TEACH_KIT={
 add(prefix,map){Object.keys(map).forEach(id=>{window.PEBBLE_TEACH[prefix+"."+id]={show:map[id]}})},
 L:(pic,say,line)=>({type:"look",pic,say,line}),
 R:(say,parts,pic)=>({type:"tapReveal",say,parts,pic}),
 S:(say,bins,items,pic)=>({type:"sort",say,bins,items,pic}),
 P:(say,opts,right,why,pic)=>({type:"pick",say,pic,why,options:opts.map(([label,w],k)=>({label,why:w,right:k===right,big:[...String(label)].length<=3}))}),
 B:(say,target,pieces,answer,o)=>Object.assign({type:"build",say,target,pieces:pieces.map(([icon,label,value])=>({icon,label,value})),answer},o||{}),
 H:(say,text,hits,hint,pic)=>({type:"highlight",say,text,hits,hint,pic}),
 HS:(say,sentences,hits,hint,pic)=>({type:"highlight",say,sentences,hits,hint,pic})
};
const J=window.PEBBLE_JOURNEY;
if(!J||!J.hooks||J.hooks.showMe)return;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const calm=()=>{try{return document.body.classList.contains("calm")||(typeof S!=="undefined"&&S.settings&&S.settings.calm)}catch(e){return false}};
const norm=w=>String(w).toLowerCase().replace(/[^a-z0-9'’]/g,"");
const THEME={0:{mark:"🦄",yay:["Sparkly!","You did it!","Magic!"]},1:{mark:"🦖",yay:["Roar-some!","You did it!","Nice building!"]}};

const css=document.createElement("style");
css.textContent=[
".pt-pic{font-size:3.6rem;line-height:1.2;text-align:center;word-break:break-word}",
".pt-pic svg{max-width:100%;height:auto}",
".pt-line{font:700 1.2rem/1.45 var(--display);text-align:center}",
".pt-row{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;width:100%}",
".pt-tap{min-height:56px;min-width:56px;padding:10px 16px;border-radius:14px;border:2px solid #648795;background:var(--panel)!important;color:var(--ink)!important;font:750 1.15rem var(--display);cursor:pointer;touch-action:manipulation}",
".pt-tap.sel{border-color:#125877;box-shadow:0 0 0 4px color-mix(in srgb,#125877 30%,transparent)}",
".pt-tap.ok{background:#e0f4e5!important;border-color:#2b8554!important;color:#1d5433!important}",
".pt-tap.no{background:#fff2e6!important;border-color:#c9884f!important}",
".pt-tap:disabled{cursor:default;opacity:1}",
".pt-tap:focus-visible{outline:4px solid #1e86a3;outline-offset:3px}",
".pt-bins{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;width:100%}",
".pt-bin{min-height:140px;border:3px dashed #648795;border-radius:18px;padding:10px;background:var(--bg2);display:flex;flex-direction:column;gap:8px;align-items:center;cursor:pointer;color:var(--ink);font:800 1.1rem var(--display)}",
".pt-bin.ready{border-style:solid;border-color:#125877}",
".pt-bin .pt-in{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}",
".pt-bin .pt-in span{padding:6px 10px;border-radius:10px;background:#e0f4e5;color:#1d5433;font:700 1rem var(--display)}",
".pt-steps{list-style:none;margin:0;padding:0;display:grid;gap:10px;width:100%}",
".pt-steps li{border-left:5px solid #327a9c;border-radius:0 12px 12px 0;padding:12px 16px;background:var(--bg2);font:700 1.2rem/1.4 var(--display);text-align:left}",
".pt-steps li.wait{color:transparent;border-left-color:var(--line);background:repeating-linear-gradient(90deg,var(--bg2) 0 12px,transparent 12px 18px)}",
".pt-sent{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;width:100%}",
".pt-sent.lines{flex-direction:column}",
".pt-sent .pt-tap{font-size:1.25rem}",
".pt-sent.lines .pt-tap{text-align:left;width:100%}",
".pt-total{font:800 1.6rem var(--display);text-align:center}",
".pt-tray{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;min-height:56px;width:100%;padding:8px;border:2px dashed var(--line);border-radius:14px;font-size:1.8rem;line-height:1.1}",
".pt-fb{border:2px solid var(--line);border-radius:15px;padding:12px 16px;background:var(--bg2);font:700 1.1rem/1.4 var(--display);width:100%;text-align:center}",
".pt-fb.ok{border-color:#2b8554}",
".pt-fb:empty{display:none}",
"@keyframes ptPop{from{transform:scale(.85)}to{transform:none}}",
".pt-pop{animation:ptPop .25s ease}",
"body.calm .pt-pop{animation:none}",
"@media(prefers-reduced-motion:reduce){.pt-pop{animation:none}}"
].join("\n");
document.head.appendChild(css);

function teachKey(k){const p=String(k||"").split("-");return p[0]+"."+p[1]+"."+p.slice(2).join("-")}

function hook(ctx){
 const T=window.PEBBLE_TEACH[teachKey(ctx.key)];
 const steps=T&&Array.isArray(T.show)?T.show.filter(s=>s&&RENDER[s.type]):[];
 if(!steps.length)return false;
 const th=THEME[ctx.kid]||{mark:"👀",yay:["You did it!","Great work!","Nice!"]};
 const yay=()=>th.yay[Math.floor(Math.random()*th.yay.length)];
 const speak=t=>{if(ctx.readOn())ctx.say(t)};
 function show(i){
  const s=steps[i],last=i===steps.length-1;
  const pic=s.svg?'<div class="pt-pic" aria-hidden="true">'+s.svg+'</div>':s.pic?'<div class="pt-pic" aria-hidden="true">'+esc(s.pic)+'</div>':"";
  const root=ctx.mount('<section class="pj-panel pj-center pt-step"><span class="pj-eyebrow">'+th.mark+' Show me · '+(i+1)+' of '+steps.length+'</span>'+pic+
   '<h1 class="pj-text" data-pj-focus>'+esc(s.say)+'</h1><div class="pt-body" style="width:100%;display:grid;gap:12px;justify-items:center"></div>'+
   '<div class="pt-fb" role="status" aria-live="polite"></div>'+
   '<div class="pj-actions"><button type="button" class="pj-btn" id="pt-hear">🔊 Read to me</button><button type="button" class="pj-btn" id="pt-back">← Back</button>'+
   (s.type!=="look"?'<button type="button" class="pj-btn" id="pt-help">🤝 Help me</button>':'')+
   '<button type="button" class="pj-btn primary" id="pt-next"'+(s.type==="look"?'':' hidden')+'>'+(last?"Let's explore →":"Next →")+'</button></div></section>');
  const q=sel=>root.querySelector(sel);
  const body=q(".pt-body"),fbEl=q(".pt-fb"),next=q("#pt-next"),help=q("#pt-help");
  let finished=s.type==="look",helped=false;
  const api={
   fb(t,ok){fbEl.textContent=t||"";fbEl.className="pt-fb"+(ok?" ok":"");if(t)speak(t)},
   done(t){if(finished)return;finished=true;try{window.logEv&&ctx.kid!=null&&logEv("showme_step",{kid:ctx.kid,world:ctx.key,level:i+1,ok:!helped})}catch(e){}ctx.sfx("good");api.fb((t||s.done||yay()),true);if(help)help.hidden=true;next.hidden=false;try{next.focus({preventScroll:true})}catch(e){}},
   pop(el){if(!calm()&&el){el.classList.remove("pt-pop");void el.offsetWidth;el.classList.add("pt-pop")}},
   tap:()=>ctx.sfx("tap"),speak
  };
  const r=RENDER[s.type](s,body,api)||{};
  q("#pt-hear").onclick=()=>ctx.say([s.say].concat(r.extra?[r.extra()]:[]).concat(fbEl.textContent?[fbEl.textContent]:[]).join(" "));
  q("#pt-back").onclick=()=>i?show(i-1):ctx.back();
  if(help)help.onclick=()=>{helped=true;try{window.logEv&&ctx.kid!=null&&logEv("showme_help",{kid:ctx.kid,world:ctx.key,level:i+1})}catch(e){}if(r.solve)r.solve();api.done(s.done||"Here is how it works.")};
  next.onclick=()=>last?ctx.done():show(i+1);
  speak(s.say);
 }
 show(0);
 return true;
}

const RENDER={
 look(s,body){if(s.line)body.innerHTML='<p class="pt-line">'+esc(s.line)+'</p>';return{extra:()=>s.line||""}},

 tapReveal(s,body,api){
  const parts=s.parts||[];let shown=0;
  body.innerHTML='<ol class="pt-steps">'+parts.map(()=>'<li class="wait" aria-hidden="true">.</li>').join("")+'</ol><button type="button" class="pt-tap" id="pt-rev">👆 Tap to see the next part</button>';
  const lis=body.querySelectorAll("li"),btn=body.querySelector("#pt-rev");
  const step=()=>{if(shown>=parts.length)return;const li=lis[shown];li.className="";li.removeAttribute("aria-hidden");li.textContent=parts[shown];api.pop(li);api.tap();api.speak(parts[shown]);shown++;if(shown>=parts.length){btn.hidden=true;api.done()}};
  btn.onclick=step;
  return{solve:()=>{while(shown<parts.length)step()},extra:()=>parts.slice(0,shown).join(" ")};
 },

 sort(s,body,api){
  const bins=s.bins||[],items=(s.items||[]).map(([t,b],k)=>({t,b,k,placed:false}));
  const order=items.slice().sort(()=>Math.random()-.5);
  body.innerHTML='<p class="pj-sub">Tap a card. Then tap its basket.</p><div class="pt-row pt-items">'+order.map(it=>'<button type="button" class="pt-tap" data-i="'+it.k+'">'+esc(it.t)+'</button>').join("")+'</div>'+
   '<div class="pt-bins">'+bins.map((b,k)=>'<div class="pt-bin" role="button" tabindex="0" data-b="'+k+'" aria-label="Basket: '+esc(b)+'"><span>🧺 '+esc(b)+'</span><div class="pt-in"></div></div>').join("")+'</div>';
  let cur=null;
  const btns=[...body.querySelectorAll("[data-i]")],byK=k=>btns.find(b=>+b.dataset.i===k),binEls=[...body.querySelectorAll("[data-b]")];
  const place=it=>{it.placed=true;const b=binEls[it.b];const sp=document.createElement("span");sp.textContent=it.t;b.querySelector(".pt-in").appendChild(sp);api.pop(sp);const bt=byK(it.k);bt.hidden=true};
  const ready=on=>binEls.forEach(b=>b.classList.toggle("ready",on));
  btns.forEach(bt=>bt.onclick=()=>{const it=items[+bt.dataset.i];if(it.placed)return;btns.forEach(x=>x.classList.remove("sel","no"));bt.classList.add("sel");cur=it;ready(true);api.tap();api.speak(it.t)});
  const drop=k=>{
   if(!cur){api.fb("Tap a card first.");return}
   if(cur.b===k){place(cur);api.fb(cur.why||(cur.t+" goes in "+bins[k]+". Yes!"),true);ctx_sfx(api);cur=null;ready(false);if(items.every(x=>x.placed))api.done()}
   else{byK(cur.k).classList.add("no");api.fb("Hmm. Is "+cur.t+" really "+bins[k]+"? Try another basket.")}
  };
  binEls.forEach(b=>{b.onclick=()=>drop(+b.dataset.b);b.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();drop(+b.dataset.b)}}});
  return{solve:()=>items.forEach(it=>{if(!it.placed)place(it)})};
 },

 pick(s,body,api){
  const opts=s.options||[];
  body.innerHTML='<div class="pt-row">'+opts.map((o,k)=>'<button type="button" class="pt-tap" data-o="'+k+'" style="min-width:120px;font-size:'+(o.big?"2.4rem":"1.2rem")+'">'+esc(o.label)+'</button>').join("")+'</div>';
  const btns=[...body.querySelectorAll("[data-o]")];
  const good=opts.findIndex(o=>o.right);
  const reveal=k=>{btns.forEach(b=>b.disabled=true);btns[good].classList.add("ok");if(k!==good&&k>=0)btns[k].classList.add("no")};
  btns.forEach(b=>b.onclick=()=>{const k=+b.dataset.o,o=opts[k];reveal(k);api.done(((o.why||(o.right?"Yes!":"Not this one."))+(s.why?" "+s.why:"")).trim())});
  return{solve:()=>reveal(-1)};
 },

 build(s,body,api){
  const target=s.target,pieces=s.pieces||[],fmt=s.total||"{n}";
  let total=0,stack=[];
  const label=n=>fmt.replace("{n}",s.money?money(n):String(n));
  body.innerHTML='<p class="pt-total" aria-live="polite">'+esc(label(0))+' <small>/ '+esc(label(target))+'</small></p><div class="pt-tray"></div>'+
   '<div class="pt-row">'+pieces.map((p,k)=>'<button type="button" class="pt-tap" data-p="'+k+'"><span aria-hidden="true">'+esc(p.icon)+'</span> '+esc(p.label)+'</button>').join("")+'<button type="button" class="pt-tap" id="pt-undo">↩️ Undo</button></div>';
  const tray=body.querySelector(".pt-tray"),tot=body.querySelector(".pt-total");
  const draw=()=>{tray.innerHTML=stack.map(k=>'<span>'+esc(pieces[k].icon)+'</span>').join("");tot.innerHTML=esc(label(total))+' <small>/ '+esc(label(target))+'</small>'};
  const add=k=>{stack.push(k);total+=pieces[k].value;draw();api.pop(tray.lastChild);api.tap();
   if(total===target)api.done(s.done||("You made "+label(target)+"!"));
   else if(total>target)api.fb("Oops, that is more than "+label(target)+". Tap undo.");
   else api.fb("");};
  body.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{if(total!==target)add(+b.dataset.p)});
  body.querySelector("#pt-undo").onclick=()=>{if(!stack.length||total===target)return;total-=pieces[stack.pop()].value;draw();api.fb("")};
  return{solve:()=>{stack=[];total=0;(s.answer||[]).forEach(k=>{stack.push(k);total+=pieces[k].value});draw()},extra:()=>label(total)};
 },

 highlight(s,body,api){
  const lines=!!s.sentences,chunks=lines?s.sentences:String(s.text||"").split(/\s+/).filter(Boolean);
  const hit=k=>lines?(s.hits||[]).includes(k):(s.hits||[]).map(norm).includes(norm(chunks[k]));
  const need=chunks.map((_,k)=>k).filter(hit);
  const got=new Set();
  body.innerHTML='<div class="pt-sent'+(lines?" lines":"")+'">'+chunks.map((w,k)=>'<button type="button" class="pt-tap" data-w="'+k+'">'+esc(w)+'</button>').join("")+'</div>'+(need.length>1?'<p class="pj-sub">Find '+need.length+'.</p>':'');
  const btns=[...body.querySelectorAll("[data-w]")];
  btns.forEach(b=>b.onclick=()=>{const k=+b.dataset.w;if(got.has(k))return;
   if(hit(k)){got.add(k);b.classList.add("ok");b.disabled=true;api.pop(b);api.tap();
    if(got.size===need.length)api.done();else api.fb((s.why&&s.why[k])||"Yes! Find "+(need.length-got.size)+" more.",true)}
   else{b.classList.add("no");api.fb((s.nope&&s.nope[k])||s.hint||"Not that one. Look again.");setTimeout(()=>b.classList.remove("no"),900)}});
  return{solve:()=>need.forEach(k=>{got.add(k);btns[k].classList.add("ok");btns[k].disabled=true})};
 }
};
function ctx_sfx(){try{if(typeof SFX!=="undefined"&&SFX.pop)SFX.pop()}catch(e){}}
function money(n){return n>=100?"$"+(n/100).toFixed(n%100?2:0):n+"c"}

J.hooks.showMe=hook;
J.teachKey=teachKey;
})();
