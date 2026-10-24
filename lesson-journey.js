(function(){
"use strict";
if(window.PEBBLE_JOURNEY)return;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const app=()=>document.getElementById("app");
const settings=()=>(typeof S!=="undefined"&&S.settings)||{};
const readOn=()=>settings().jRead!==false;
const breakOn=()=>settings().jBreaks!==false;
const say=t=>{try{if(typeof speak==="function")speak(t,"soft")}catch(e){}};
const sfx=n=>{try{if(typeof SFX!=="undefined"&&SFX[n])SFX[n]()}catch(e){}};
const mascot=t=>{try{if(typeof pip==="function")pip("happy",t)}catch(e){}};

const STAGES=[["📖","Learn"],["🔍","Explore"],["✏️","Practise"],["✅","Check"],["🎉","Celebrate"]];
const LEARN=0,EXPLORE=1,PRACTISE=2,CHECK=3,CELEBRATE=4;

const css=document.createElement("style");
css.textContent=[
".pj-root{max-width:760px;width:100%;margin:0 auto;display:grid;gap:16px;line-height:1.55}",
".pj-root *{box-sizing:border-box}",
".pj-root h1{margin:0;background:none!important;-webkit-text-fill-color:currentColor!important;color:var(--ink)!important;letter-spacing:0}",
".pj-top{display:grid;gap:12px}",
".pj-top>.pj-btn{justify-self:start}",
".pj-road{max-width:760px;width:100%;margin:0 auto;list-style:none;padding:0;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:2px;position:relative}",
".pj-road li{display:grid;justify-items:center;gap:4px;position:relative;font:700 .78rem var(--display);color:var(--ink);text-align:center}",
".pj-road li:not(:first-child)::before{content:'';position:absolute;top:19px;right:calc(50% + 21px);width:calc(100% - 42px);height:4px;border-radius:2px;background:var(--line)}",
".pj-road li.done:not(:first-child)::before,.pj-road li.on:not(:first-child)::before{background:#4e8a63}",
".pj-road b{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;font-size:1.25rem;border:3px solid var(--line);background:var(--panel);font-weight:400}",
".pj-road li.on b{border-color:#125877;background:#125877;box-shadow:0 0 0 4px color-mix(in srgb,#125877 25%,transparent)}",
".pj-road li.done b{border-color:#4e8a63;background:#e0f4e5}",
".pj-road li.on span{text-decoration:underline;text-underline-offset:3px}",
".pj-panel{background:var(--panel);border:2px solid var(--line);border-radius:23px;padding:clamp(18px,4vw,30px);display:grid;gap:14px;box-shadow:0 5px 0 color-mix(in srgb,var(--line) 75%,transparent)}",
".pj-center{text-align:center;justify-items:center}",
".pj-eyebrow{font:800 .78rem var(--display);text-transform:uppercase;letter-spacing:.07em;color:var(--ink)}",
".pj-emoji{font-size:3.4rem;line-height:1}.pj-emoji.big{font-size:4.2rem}",
".pj-text{font:700 clamp(1.35rem,4.6vw,1.95rem)/1.5 var(--display)}",
".pj-q{font:700 clamp(1.25rem,4.2vw,1.7rem)/1.45 var(--display)}",
".pj-sub{font-size:1.05rem;color:var(--ink)}",
".pj-steplist{list-style:none;margin:0;padding:0;display:grid;gap:10px;width:100%;text-align:left}",
".pj-steplist li{border-left:5px solid #327a9c;border-radius:0 12px 12px 0;padding:12px 16px;background:var(--bg2);color:var(--ink);font:700 1.15rem/1.45 var(--display);animation:pjIn .35s ease}",
".pj-steplist li.wait{border-left-color:var(--line);color:transparent;background:repeating-linear-gradient(90deg,var(--bg2) 0 12px,transparent 12px 18px);animation:none}",
"@keyframes pjIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}",
"@media(prefers-reduced-motion:reduce){.pj-steplist li{animation:none}}",
".pj-away{border:2px dashed #4e8a63;border-radius:18px;padding:16px;background:var(--bg2);text-align:left;width:100%;font-size:1.1rem}",
".pj-dots{display:flex;gap:8px;justify-content:center}",
".pj-dots i{width:12px;height:12px;border-radius:50%;background:var(--line)}.pj-dots i.on{background:#125877}",
".pj-actions,.pj-tools{display:flex;gap:10px;flex-wrap:wrap;align-items:center}",
".pj-center .pj-actions{justify-content:center}",
".pj-btn{min-height:56px;border-radius:14px;border:2px solid #648795;padding:10px 20px;background:var(--panel)!important;color:var(--ink)!important;font:750 1rem var(--display);cursor:pointer}",
".pj-btn.primary{background:#125877!important;border-color:#125877!important;color:#fff!important}",
".pj-btn:focus-visible,.pj-answer:focus-visible,.pj-face:focus-visible{outline:4px solid #1e86a3;outline-offset:3px}",
".pj-progress{height:10px;background:#b9d4db;border-radius:999px;overflow:hidden}.pj-progress>i{display:block;height:100%;background:#246a89;border-radius:999px}",
".pj-answers{display:grid;gap:10px}",
".pj-answer{min-height:68px;width:100%;padding:14px 16px;background:var(--panel)!important;border:2px solid #74939a;border-radius:15px;text-align:left;color:var(--ink)!important;font:700 1.12rem var(--display);cursor:pointer}",
".pj-answer:disabled{opacity:1;cursor:default}",
".pj-answer.wrong{background:#fff2e6!important;border-color:#c9884f;color:#6f3a12!important}",
".pj-answer.right{background:#e0f4e5!important;border-color:#2b8554;color:#1d5433!important}",
".pj-hintbox,.pj-feedback{border:2px solid var(--line);border-radius:15px;padding:14px 16px;background:var(--bg2);color:var(--ink);font-size:1.05rem}",
".pj-feedback.right{border-color:#2b8554}",
".pj-faces{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;width:100%}",
".pj-face{min-height:130px;display:grid;gap:6px;place-content:center;border:2px solid #74939a;border-radius:18px;background:var(--panel)!important;color:var(--ink)!important;font:700 1rem var(--display);cursor:pointer;padding:10px}",
".pj-face span{font-size:2.8rem;line-height:1}",
".pj-finish-top{max-width:760px;width:100%;margin:0 auto 16px;display:grid;gap:12px}",
".pj-cele{display:flex;gap:14px;align-items:center;border:2px solid #4e8a63;border-radius:20px;padding:14px 16px;background:#e0f4e5;color:#1d5433;font:700 1.05rem var(--display)}",
".pj-cele>span{font-size:2.4rem;line-height:1}",
".pj-cele .stk{font-size:1.8rem;vertical-align:middle;margin:0 4px}",
".pj-cele small.stkname{font-size:.9rem}",
"@media(max-width:420px){.pj-faces{gap:8px}.pj-face{font-size:.9rem;min-height:116px}.pj-road li{font-size:.68rem}.pj-road b{width:34px;height:34px;font-size:1.05rem}.pj-road li:not(:first-child)::before{top:16px;right:calc(50% + 18px);width:calc(100% - 36px)}}"
].join("\n");
document.head.appendChild(css);

function road(stage,skipped){
 return '<ol class="pj-road" aria-label="Lesson steps">'+STAGES.map(([ic,name],i)=>{
  const st=i===stage?"on":i<stage?"done":"";
  const label=name+(i===stage?", now":i<stage?(skipped.includes(i)?", skipped":", done"):"");
  return '<li'+(st?' class="'+st+'"':'')+(i===stage?' aria-current="step"':'')+' aria-label="'+label+'"><b aria-hidden="true">'+(i<stage?"✓":ic)+'</b><span aria-hidden="true">'+name+'</span></li>';
 }).join("")+'</ol>';
}

function sentences(t){
 t=String(t||"").trim().replace(/(\d)\.(\d)/g,"$1\u0001$2");
 return (t.match(/[^.!?]+(?:[.!?]+["')\]]*|$)\s*/g)||[t]).map(x=>x.trim().replace(/\u0001/g,".")).filter(Boolean);
}

function learnCards(L){
 let s=sentences(L.teach);
 if(s.length>3){const size=Math.ceil(s.length/3),g=[];for(let i=0;i<s.length;i+=size)g.push(s.slice(i,i+size).join(" "));s=g}
 return s.map(text=>({text}));
}

function exploreSteps(ex){
 let s=sentences(ex);
 if(s.length===1){
  const parts=s[0].split(/(?<=[:;])\s+|,\s+(?=(?:then|so|and then|next)\b)/i).map(x=>x.trim()).filter(Boolean);
  if(parts.length>1)s=parts;
 }
 if(s.length>4){const size=Math.ceil(s.length/4),g=[];for(let i=0;i<s.length;i+=size)g.push(s.slice(i,i+size).join(" "));s=g}
 return s;
}

function mount(c,html,stage){
 app().innerHTML='<main class="pj-root" aria-label="Lesson">'+
  '<div class="pj-top"><button type="button" class="pj-btn" id="pj-back">← '+esc(c.o.backLabel||"Back")+'</button>'+road(stage,c.skipped)+'</div>'+html+'</main>';
 document.getElementById("pj-back").onclick=()=>{try{if(window.speechSynthesis)speechSynthesis.cancel()}catch(e){}c.o.onBack()};
 const h=app().querySelector("[data-pj-focus]");if(h){h.tabIndex=-1;h.focus({preventScroll:true})}
 try{window.scrollTo(0,0)}catch(e){}
}
const $id=id=>document.getElementById(id);

function learn(c,i,replay){
 const card=c.cards[i],last=i===c.cards.length-1;
 const next=!last?"Next →":replay?"Start my turn →":"Let's explore →";
 mount(c,'<section class="pj-panel pj-center"><div class="pj-emoji" aria-hidden="true">'+esc(c.L.icon)+'</div>'+
  (card.title?'<span class="pj-eyebrow">'+esc(card.title)+'</span>':'')+
  '<h1 class="pj-text" data-pj-focus>'+esc(card.text)+'</h1>'+
  (c.cards.length>1?'<div class="pj-dots" role="img" aria-label="Card '+(i+1)+' of '+c.cards.length+'">'+c.cards.map((_,k)=>'<i'+(k===i?' class="on"':'')+'></i>').join("")+'</div>':'')+
  '<div class="pj-actions"><button type="button" class="pj-btn" id="pj-hear">🔊 Read to me</button>'+(i>0?'<button type="button" class="pj-btn" id="pj-prev">← Back</button>':'')+'<button type="button" class="pj-btn primary" id="pj-next">'+next+'</button></div></section>',LEARN);
 $id("pj-hear").onclick=()=>say(card.text);
 if(i>0)$id("pj-prev").onclick=()=>learn(c,i-1,replay);
 $id("pj-next").onclick=()=>{if(!last)learn(c,i+1,replay);else if(replay)turn(c);else explore(c,0)};
 if(readOn())setTimeout(()=>say(card.text),200);
}

function explore(c,shown){
 const steps=c.ex;
 if(!steps.length)return away(c);
 const all=shown>=steps.length;
 const list='<ol class="pj-steplist">'+steps.map((t,k)=>k<shown?'<li>'+esc(t)+'</li>':'<li class="wait" aria-hidden="true">.</li>').join("")+'</ol>';
 const btn=!shown?"👆 Show me":!all?"👆 Next step":"Keep going →";
 mount(c,'<section class="pj-panel pj-center"><div class="pj-emoji" aria-hidden="true">🔍</div><span class="pj-eyebrow">Explore an example</span>'+
  '<h1 class="pj-text" data-pj-focus>'+(all?"That is how it works!":!shown?"Let's look at one together.":"What comes next?")+'</h1>'+list+
  '<div class="pj-actions">'+(shown?'<button type="button" class="pj-btn" id="pj-hear">🔊 Read to me</button>':'')+'<button type="button" class="pj-btn primary" id="pj-next">'+btn+'</button></div></section>',EXPLORE);
 const h=$id("pj-hear");if(h)h.onclick=()=>say(steps.slice(0,shown).join(" "));
 $id("pj-next").onclick=()=>{if(all)return away(c);sfx("pop");explore(c,shown+1)};
 if(shown&&readOn())setTimeout(()=>say(steps[shown-1]),200);
}

function away(c){
 const t=String(c.L.tryIt||"").trim();
 const line=["Nice exploring!","You've got the idea!","Great thinking!"][Math.floor(Math.random()*3)];
 const nextLabel=c.tog.length?"Let's practise →":"Check what I know →";
 mount(c,'<section class="pj-panel pj-center"><div class="pj-emoji big" aria-hidden="true">🌟</div><h1 class="pj-text" data-pj-focus>'+line+'</h1>'+
  (t?'<div class="pj-away"><span class="pj-eyebrow">Try this away from the screen</span><p style="margin:6px 0 0">'+esc(t)+'</p></div><p class="pj-sub">You can do it now or later with a grown-up.</p>':'<p class="pj-sub">'+(c.tog.length?"Next we practise together. You can ask for a hint.":"Next you show what you know.")+'</p>')+
  '<div class="pj-actions">'+(t?'<button type="button" class="pj-btn" id="pj-hear">🔊 Read to me</button>':'')+(breakOn()?'<button type="button" class="pj-btn" id="pj-wiggle">⚡ I need a wiggle</button>':'')+'<button type="button" class="pj-btn primary" id="pj-go">'+nextLabel+'</button></div></section>',EXPLORE);
 mascot(line);
 const h=$id("pj-hear");if(h)h.onclick=()=>say(t);
 const go=()=>c.tog.length?practise(c):check(c);
 $id("pj-go").onclick=go;
 const w=$id("pj-wiggle");if(w)w.onclick=()=>{if(typeof brainBreak==="function")brainBreak(()=>away(c));else go()};
}

function practise(c){ask(c,c.tog,0,"practise",[],()=>check(c))}

function check(c){
 mount(c,'<section class="pj-panel pj-center"><span class="pj-eyebrow">Check</span><h1 class="pj-text" data-pj-focus>How does it feel?</h1><div class="pj-faces"><button type="button" class="pj-face" data-f="got"><span aria-hidden="true">😀</span>Got it</button><button type="button" class="pj-face" data-f="nearly"><span aria-hidden="true">🙂</span>Nearly</button><button type="button" class="pj-face" data-f="again"><span aria-hidden="true">🤔</span>Show me again</button></div></section>',CHECK);
 app().querySelectorAll("[data-f]").forEach(b=>b.onclick=()=>{
  const f=b.dataset.f;log(c,f);
  if(f==="again")learn(c,0,true);else turn(c);
 });
}

function journeyStore(){S.journey=S.journey||{};S.journey.faces=S.journey.faces||{};S.journey.stk=S.journey.stk||{};return S.journey}

function log(c,f){
 try{
  const j=journeyStore(),m=j.faces[kid]||(j.faces[kid]={});
  const e=m[c.o.key]||(m[c.o.key]={got:0,nearly:0,again:0});e[f]++;e.last=Date.now();save();
 }catch(err){}
}

function turn(c){ask(c,c.own,0,"turn",[],res=>afterTurn(c,res))}

function afterTurn(c,res){
 const missed=res.filter(r=>!r.first);
 if(!missed.length)return finish(c,res);
 const id=missed[0].id;
 mount(c,'<section class="pj-panel pj-center"><h1 class="pj-text" data-pj-focus>Want one more go at a tricky one?</h1><p class="pj-sub">It will not change your stars.</p><div class="pj-actions"><button type="button" class="pj-btn" id="pj-skip">No thanks</button><button type="button" class="pj-btn primary" id="pj-retry">Yes, one more go</button></div></section>',CHECK);
 $id("pj-skip").onclick=()=>finish(c,res);
 $id("pj-retry").onclick=()=>ask(c,[{id,q:c.A.shuffleAnswer(c.L.questions[id])}],0,"retry",[],()=>finish(c,res));
}

function sticker(c){
 try{
  if(typeof awardSticker!=="function")return "";
  const j=journeyStore(),m=j.stk[kid]||(j.stk[kid]={}),today=new Date().toDateString();
  if(m[c.o.key]===today)return "";
  const html=awardSticker();m[c.o.key]=today;save();return html;
 }catch(e){return ""}
}

function finish(c,res){
 const stk=sticker(c);
 c.o.onFinish({ids:c.own.map(t=>t.id),firstTry:res.filter(r=>r.first).length,misses:res.reduce((n,r)=>n+r.wrong,0)});
 try{
  const root=app();if(!root)return;
  root.insertAdjacentHTML("afterbegin",'<div class="pj-finish-top">'+road(CELEBRATE,c.skipped)+
   '<div class="pj-cele" role="status"><span aria-hidden="true">🎉</span><div>You did all five steps!'+(stk?'<br>New sticker: '+stk:'')+'</div></div></div>');
  sfx("win");
  if(typeof confetti==="function")confetti(window.innerWidth/2,120,40);
 }catch(e){}
}

function ask(c,tasks,i,mode,results,done){
 if(i>=tasks.length)return done(results);
 const t=tasks[i],q=t.q,total=tasks.length,hints=mode!=="turn";
 const label=mode==="practise"?"Practise together":mode==="retry"?"One more go":"Your turn";
 let wrong=0,answered=false;
 mount(c,'<div class="pj-progress" role="progressbar" aria-label="Questions" aria-valuemin="0" aria-valuemax="'+total+'" aria-valuenow="'+i+'"><i style="width:'+Math.round(100*i/total)+'%"></i></div>'+
  '<section class="pj-panel"><span class="pj-eyebrow">'+label+(total>1?' · '+(i+1)+' of '+total:'')+'</span><h1 class="pj-q" data-pj-focus>'+esc(q.prompt)+'</h1>'+
  '<div class="pj-tools"><button type="button" class="pj-btn" id="pj-hear">🔊 Read to me</button>'+(hints?'<button type="button" class="pj-btn" id="pj-hint">💡 Show me a hint</button>':'')+'</div>'+
  '<div class="pj-hintbox" id="pj-hintbox" hidden></div>'+
  '<div class="pj-answers">'+q.choices.map((ch,k)=>'<button type="button" class="pj-answer" data-k="'+k+'">'+esc(ch)+'</button>').join("")+'</div>'+
  '<div class="pj-feedback" id="pj-fb" role="status" aria-live="polite" hidden></div>'+
  '<div class="pj-actions"><button type="button" class="pj-btn primary" id="pj-next" hidden></button></div></section>',mode==="practise"?PRACTISE:CHECK);
 const btns=[...app().querySelectorAll(".pj-answer")],fb=$id("pj-fb"),nextBtn=$id("pj-next"),hb=$id("pj-hintbox");
 const showHint=()=>{hb.hidden=false;hb.textContent="Hint: "+q.hint};
 $id("pj-hear").onclick=()=>say(q.prompt+" "+q.choices.join(". "));
 if(hints)$id("pj-hint").onclick=showHint;
 const end=()=>{
  answered=true;results.push({id:t.id,first:wrong===0,wrong});
  btns.forEach(b=>b.disabled=true);
  nextBtn.hidden=false;nextBtn.textContent=i+1>=total?"Keep going →":"Next question →";
  nextBtn.onclick=()=>ask(c,tasks,i+1,mode,results,done);nextBtn.focus();
 };
 btns.forEach(b=>b.onclick=()=>{
  if(answered||b.disabled)return;
  const k=Number(b.dataset.k);fb.hidden=false;
  if(k===q.correct){
   b.classList.add("right");fb.className="pj-feedback right";
   fb.innerHTML="<strong>"+(wrong?"You worked it out!":"Yes!")+"</strong> "+esc(q.explain);
   sfx("good");end();
  }else{
   wrong++;b.classList.add("wrong");b.disabled=true;fb.className="pj-feedback";
   if(wrong>=2||btns.filter(x=>!x.disabled).length<=1){
    btns[q.correct].classList.add("right");
    fb.innerHTML="<strong>Good try.</strong> The answer is <b>"+esc(q.choices[q.correct])+"</b>. "+esc(q.explain);end();
   }else{
    fb.innerHTML="<strong>Not quite. Have another go.</strong>";
    if(hints)showHint();
   }
  }
 });
 if(readOn())setTimeout(()=>say(q.prompt),200);
}

function run(o){
 const L=o.lesson,A=o.A,n=L.questions.length;
 const order=A.shuffledIndices(o.st,n,n);
 const ownCount=n>=5?3:Math.min(2,n);
 const skip=!!o.returning&&o.st.stage>=1;
 const mk=ids=>ids.map(id=>({id,q:A.shuffleAnswer(L.questions[id])}));
 const tog=skip?[]:mk(order.slice(ownCount,ownCount+2));
 const c={o,L,A,own:mk(order.slice(0,ownCount)),tog,
  skipped:tog.length?[]:[PRACTISE],
  ex:exploreSteps(L.example),
  cards:o.returning?[{title:"Remember this?",text:L.teach}]:learnCards(L)};
 learn(c,0,false);
}

window.PEBBLE_JOURNEY={run,version:2,stages:STAGES.map(s=>s[1])};

if(typeof parent==="function"){
 const _parent=parent;
 parent=function(){
  _parent();
  const box=document.querySelector(".parent");if(!box||box.querySelector("#jrn-read"))return;
  const st=settings();
  const add=html=>{const r=document.createElement("div");r.className="prow";r.innerHTML=html;box.appendChild(r)};
  add('<span>Lessons: read each lesson card aloud automatically</span><button class="switch" id="jrn-read">'+(st.jRead!==false?"On":"Off")+'</button>');
  add('<span>Lessons: offer an "I need a wiggle" movement break after exploring</span><button class="switch" id="jrn-break">'+(st.jBreaks!==false?"On":"Off")+'</button>');
  [["jrn-read","jRead"],["jrn-break","jBreaks"]].forEach(([id,k])=>document.getElementById(id).onclick=e=>{st[k]=st[k]===false;save();e.target.textContent=st[k]!==false?"On":"Off"});
 };
}
})();
