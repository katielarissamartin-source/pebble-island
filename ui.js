const STICKERS=["🦄","🐙","🦖","🚀","🌈","🐳","🦋","🍩","🎸","🏆","🐧","🦕","🍉","⚡","🐝","🎨","🦒","🛸","🐲","🍕","🦜","🌟","🐬","🚒","🎈","🦩","🐯","🧁","🏝️","🎢"];
function awardSticker(){const own=S.stickers[kid]||(S.stickers[kid]=[]);const left=STICKERS.filter(s=>!own.includes(s));const s=left.length?pick(left):pick(STICKERS);if(!own.includes(s))own.push(s);save();return s}

const ROUND=5;let round=null;let combo=0;

function render(){
  document.body.classList.toggle("calm",S.settings.calm);
  if(kid===null)return home();
  if(round)return play();
  map();
}
function home(){
  round=null;applySkin("island");
  $("#app").innerHTML=`<div class="top"><h1>Pebble Island</h1><button class="pill" id="pc">Grown-ups</button></div>
  <p class="lede" style="font-size:1.3rem">Who's exploring today?</p>
  <div class="who">${S.kids.map((k,i)=>`<button class="kid" data-k="${i}"><span class="face">${k.face}</span><b>${k.name}</b><span>${(S.stickers[i]||[]).length} stickers · Tap to start</span></button>`).join("")}</div>`;
  $$("[data-k]").forEach(b=>b.onclick=()=>{SFX.good();kid=+b.dataset.k;checkSkins();newSkins=[];applySkin(skinState().on);const r=b.getBoundingClientRect();confetti(r.left+r.width/2,r.top+r.height/2,40);const t=`Hi ${S.kids[kid].name}! Yay, you're here! Where shall we explore today?`;pip("happy",`Hi ${S.kids[kid].name}!`);speak(t,"happy");render()});
  $("#pc").onclick=()=>{SFX.tap();parent()};
}
function map(){
  const k=S.kids[kid];
  $("#app").innerHTML=`<div class="top"><button class="pill" id="back">${k.face} ${k.name}</button><div class="mapbar"><button class="pill" id="skn">🎨 Skins</button><button class="pill" id="stk">🎁 Stickers ${(S.stickers[kid]||[]).length}</button><span class="pill"><span class="star">★</span> ${stars()}</span></div></div>
  <h2>Where shall we go?</h2>
  <div class="map">${WORLDS.map((w,i)=>{const p=w.max?prog(w.id):null;return`<button class="world ${w.cls||""}" data-w="${w.id}" style="animation-delay:${i*.05}s${w.bg?`;background:${w.bg}`:""}"><span class="ico" style="animation-delay:-${i}s">${w.ico}</span><span><b>${w.name}</b><small>${w.sub}</small>${w.max>1?`<span class="lvl">${[...Array(w.max)].map((_,j)=>`<i class="${j<p.lvl?"on":""}"></i>`).join("")}</span>`:""}</span></button>`}).join("")}</div>`;
  $("#back").onclick=()=>{SFX.tap();kid=null;render()};
  $("#stk").onclick=()=>{SFX.tap();stickerBook()};$("#skn").onclick=()=>{SFX.tap();skinsScreen()};
  $$("[data-w]").forEach(b=>b.onclick=()=>{SFX.tap();const id=b.dataset.w;round={home:id,mix:id==="mix",w:id,n:0,first:0};combo=0;next()});
}
function next(){
  if(round.mix){const pool=WORLDS.filter(w=>w.max);round.w=pick(pool).id}
  const p=prog(round.w);round.q=GEN[round.w](p.lvl);round.tries=0;round.counted=0;round.whyDone=false;round.whyStage=false;render();
  const tag=round.mix?`${WORLDS.find(w=>w.id===round.w).name}! `:"";
  setTimeout(()=>speak((round.n===0?`Let's go, ${NAME()}! `:OPENER())+tag+round.q.say),300)}
function play(){
  if(round.n>=ROUND)return done();
  const q=round.q;const pct=round.n/ROUND*100;let body="";const t=q.type||"opts";
  if(t==="spell")body=`<div class="left"><div class="stage">${q.stage}</div><div class="slots">${[...q.word].map(()=>`<div class="slot"></div>`).join("")}</div></div>
      <div class="left"><div class="tiles">${q.tiles.map((c,i)=>`<button class="tile" data-t="${i}" style="animation-delay:${i*.05}s">${c}</button>`).join("")}</div><div class="msg" id="msg"></div></div>`;
  else if(t==="order")body=`<div class="left"><div class="slots">${q.seq.map((_,i)=>`<div class="slot ord"><small>${["1st","2nd","3rd","4th"][i]}</small></div>`).join("")}</div></div>
      <div class="left"><div class="tiles">${q.items.map(([e,l],i)=>`<button class="tile ord" data-lab="${l}" style="animation-delay:${i*.05}s"><span>${e}</span><small>${l}</small></button>`).join("")}</div><div class="msg" id="msg"></div></div>`;
  else if(t==="build")body=`<div class="left"><span class="target">Target: ${q.unit==="money"?money(q.target):q.target}</span><div class="pv" id="bin" style="min-height:120px"></div><div class="total" id="tot">${q.unit==="money"?"0c":"0"}</div></div>
      <div class="left"><div class="btnrow">${q.parts.map(([v,l,h],i)=>`<button class="addbtn" data-add="${i}">${h}${l?`<span>${l}</span>`:""}</button>`).join("")}</div><button class="addbtn reset" id="clr">↺ Start again</button><div class="msg" id="msg"></div></div>`;
  else if(t==="shade")body=`<div class="left"><div class="stage">${q.stage}</div></div><div class="left"><div class="total" id="tot">0 of ${q.n}</div><button class="addbtn reset" id="clr">↺ Start again</button><div class="msg" id="msg"></div></div>`;
  else if(t==="mirror")body=`<div class="left"><div class="grid" style="grid-template-columns:repeat(${q.half*2},52px)">${q.left.map((row,r)=>[...row.map((on,c)=>`<div class="cell fixed ${on?"on":""}"></div>`),...row.map((_,c)=>`<button class="cell ${c===0?"mid":""}" data-m="${r}-${c}" aria-label="square"></button>`)].join("")).join("")}</div></div><div class="left"><p class="lede">The middle is the mirror line.</p><div class="msg" id="msg"></div></div>`;
  else if(t==="setclock")body=`<div class="left"><div class="clockset" id="cs"></div></div><div class="left"><div class="btnrow"><button class="addbtn" id="hm">Hour −</button><button class="addbtn" id="hp">Hour +</button></div><div class="btnrow"><button class="addbtn" id="mm">Min −${q.step}</button><button class="addbtn" id="mp">Min +${q.step}</button></div><button class="big" id="chk">Check ✓</button><div class="msg" id="msg"></div></div>`;
  else body=`<div class="left">${q.stage?`<div class="stage">${q.stage}</div>`:""}</div>
      <div class="left"><div class="opts ${q.opts.some(o=>o.txt)?"":"grid2"}">${q.opts.map((o,i)=>`<button class="opt ${o.txt?"txt":""}" data-i="${i}">${o.h}</button>`).join("")}</div><div class="msg" id="msg"></div></div>`;
  const wname=round.mix?`🌋 ${WORLDS.find(w=>w.id===round.w).name}`:"";
  $("#app").innerHTML=`<div class="top"><button class="pill" id="home">← Map</button>
    <div class="progress"><div class="track"><i style="width:${pct}%"></i></div><span class="boat">⛵</span></div><span class="combo" id="combo">${combo>=2?`🔥×${combo}`:""}</span></div>
  ${wname?`<p class="lede" style="text-align:center;margin:-8px 0">${wname}</p>`:""}
  <div class="qrow"><button class="say" id="say" aria-label="Hear it again">${SPEAK_ICON}</button><span class="q">${q.q}</span></div>
  <div class="card ${q.stage||t!=="opts"?"split":""}">${body}</div>`;
  $("#home").onclick=()=>{SFX.tap();round=null;window.speechSynthesis&&speechSynthesis.cancel();render()};
  $("#say").onclick=()=>speak(q.say);
  $$("[data-tap]").forEach(el=>el.onclick=()=>{if(el.classList.contains("counted"))return;round.counted++;el.classList.add("counted");el.insertAdjacentHTML("beforeend",`<span class="n">${round.counted}</span>`);SFX.count(round.counted);speak(String(round.counted));buzz(10)});
  let rowTotal=0;$$("[data-row]").forEach(r=>r.onclick=()=>{if(r.classList.contains("lit"))return;rowTotal+=q.rows;r.classList.add("lit");r.dataset.total=rowTotal;SFX.count(rowTotal/q.rows);speak(String(rowTotal));buzz(10)});
  const sp=$(".spinbtn");if(sp)sp.onclick=()=>{SFX.tap();const g=sp.querySelector(".spin");g.style.transition="transform 1.6s cubic-bezier(.2,.8,.3,1)";g.style.transformOrigin="50px 50px";g.style.transform=`rotate(${(+(g.dataset.r||0))+720+rnd(0,359)}deg)`;g.dataset.r=(+(g.dataset.r||0))+1080};
  const centre=el=>{const r=(el||$(".card")).getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]};
  if(t==="spell"){let pos=0;const slots=$$(".slot");
    $$(".tile").forEach(tl=>tl.onclick=()=>{const c=q.tiles[+tl.dataset.t];
      if(c===q.word[pos]){slots[pos].textContent=c;slots[pos].classList.add("fill");tl.classList.add("used");SFX.count(pos);speak(c);pos++;if(pos===q.word.length)correct(...centre($(".slots")),q.word)}
      else{tl.classList.remove("no");void tl.offsetWidth;tl.classList.add("no");wrong("Ooh, not that one. Which letter comes next?")}})}
  else if(t==="order")orderTask(q);
  else if(t==="build"){let tot=0,done=false;const fmt=v=>q.unit==="money"?(v?money(v):"0c"):v;
    const upd=()=>{$("#tot").textContent=fmt(tot)};
    $$("[data-add]").forEach(b=>b.onclick=()=>{if(done)return;const[v,,h]=q.parts[+b.dataset.add];tot+=v;$("#bin").insertAdjacentHTML("beforeend",h);upd();SFX.count(tot/q.parts[q.parts.length-1][0]);buzz(8);
      if(tot===q.target){done=true;speak(q.unit==="money"?sayMoney(tot):String(tot));correct(...centre($("#bin")))}
      else if(tot>q.target){wrong(`Whoops, that's ${q.unit==="money"?sayMoney(tot):tot}. Too many! Let's start again.`);setTimeout(()=>{tot=0;$("#bin").innerHTML="";upd()},900)}
      else speak(q.unit==="money"?sayMoney(tot):String(tot))});
    $("#clr").onclick=()=>{SFX.tap();tot=0;$("#bin").innerHTML="";upd()}}
  else if(t==="shade"){let on=new Set(),done=false;const paint=()=>{$$("[data-part]").forEach(p=>p.setAttribute("fill",on.has(+p.dataset.part)?"#e2953a":"#f6e3b8"));$("#tot").textContent=`${on.size} of ${q.n}`};
    $$("[data-part]").forEach(p=>p.onclick=()=>{if(done)return;const i=+p.dataset.part;on.has(i)?on.delete(i):on.add(i);paint();SFX.count(on.size);buzz(8);
      if(on.size===q.k){done=true;correct(...centre($(".pie")),`${frSay(q.k,q.n)}`)}
      else if(on.size>q.k){wrong(`That's ${on.size} pieces. We only need ${q.k}. Tap one to take it away.`)}});
    $("#clr").onclick=()=>{SFX.tap();on.clear();paint()}}
  else if(t==="mirror"){const st=q.left.map(r=>r.map(()=>false));let done=false;
    $$("[data-m]").forEach(c=>c.onclick=()=>{if(done)return;const[r,cc]=c.dataset.m.split("-").map(Number);st[r][cc]=!st[r][cc];c.classList.toggle("on",st[r][cc]);SFX.count(r*3+cc);buzz(8);
      if(st[r][cc]&&!q.left[r][q.half-1-cc]){pip("oops","Check the mirror!")}
      if(st.every((row,ri)=>row.every((v,ci)=>v===q.left[ri][q.half-1-ci]))){done=true;correct(...centre($(".grid")))}})}
  else if(t==="setclock"){let h=12,m=0;const draw=()=>{$("#cs").innerHTML=clock(h,m,220)+`<div class="total">${dig(h,m)}</div>`};draw();
    const mv=(dh,dm)=>{SFX.tap();m+=dm;while(m>=60){m-=60;h++}while(m<0){m+=60;h--}h=nh(h+dh);draw()};
    $("#hp").onclick=()=>mv(1,0);$("#hm").onclick=()=>mv(-1,0);$("#mp").onclick=()=>mv(0,q.step);$("#mm").onclick=()=>mv(0,-q.step);
    $("#chk").onclick=()=>{if(h===q.th&&m===q.tm){$("#chk").disabled=true;correct(...centre($("#cs")))}else wrong(h!==q.th?"Nearly! Check the short hand, that's the hour.":"Nearly! Check the long hand, that's the minutes.")}}
  else $$(".opt").forEach(b=>b.onclick=()=>answer(b,q.opts[+b.dataset.i]));
}
function miss(){const p=prog(round.w);p.streak=0;p.miss++;if(p.miss>=3&&p.lvl>1){p.lvl--;p.miss=0}save()}
function wrong(line){SFX.oops();buzz(30);combo=0;const c=$("#combo");if(c)c.textContent="";pip("oops","So close!");if(round.tries++===0)miss();
  const m=$("#msg");if(m){m.className="msg try";m.textContent="So close! Try again."}speak(line||NUDGE(),"soft")}
function correct(x,y,sayExtra){
  const p=prog(round.w);const praise=PRAISE();
  const m=$("#msg");if(m){m.className="msg good";m.textContent=praise}
  if(round.tries===0){combo++;round.first++;p.streak++;p.miss=0}
  const c=$("#combo");if(c&&combo>=2){c.textContent=`🔥×${combo}`;c.classList.remove("pop");void c.offsetWidth;c.classList.add("pop")}
  SFX.good();buzz(20);confetti(x,y,combo>=3?110:70);pip("happy",combo>=3?`${combo} in a row! 🔥`:praise);
  speak(`${sayExtra?sayExtra+"! ":""}${praise}${combo===3?" Three in a row!":combo===5?" Five in a row! Unstoppable!":""}`,"happy");
  const w=WORLDS.find(v=>v.id===round.w);const need=S.kids[kid].pace==="fast"?3:4;
  if(p.streak>=need&&p.lvl<w.max){p.lvl++;p.best=Math.max(p.best||0,p.lvl);p.streak=0;checkSkins();setTimeout(()=>{pip("happy","Level up! 🚀");speak(`Whoa! Level up, ${NAME()}! You're getting so clever!`,"happy")},1100)}
  round.n++;save();setTimeout(()=>{if(round)next()},S.settings.calm?2400:2000);
}
function answer(b,o){
  const q=round.q,ok=String(o.v)===String(q.ans)||(q.anyOk&&round.w==="feel");
  if(ok&&q.why&&!round.whyDone){b.classList.add("yes");$$(".opt").forEach(x=>x.style.pointerEvents="none");SFX.good();pip("happy","Yes! Now… why?");round.whyDone=true;setTimeout(()=>askWhy(q),700);return}
  if(ok){b.classList.add("yes");$$(".opt").forEach(x=>x.style.pointerEvents="none");const r=b.getBoundingClientRect();
    correct(r.left+r.width/2,r.top+r.height/2,round.w==="feel"&&o.v!==q.ans?`${o.v} makes sense too`:q.after||"")}
  else{b.classList.add("gone");wrong(q.kind==="cope"?"Hmm, that might make things harder. What else could you try?":"")}
}
function done(){
  const hw=round.home;const p=prog(round.w);const earned=Math.max(1,round.first);p.stars+=earned;const stk=awardSticker();save();
  $("#app").innerHTML=`<div class="card done" style="margin-top:4vh"><div class="reward">${Array.from({length:Math.min(earned,5)},(_,i)=>`<span style="animation-delay:${i*.15}s">⭐</span>`).join("")}</div>
  <h2>Round done! ${earned} star${earned>1?"s":""}</h2><p class="lede">New sticker!</p><div class="newsticker">${stk}</div>${newSkins.length?`<div class="unlock"><b>🎨 New skin unlocked!</b>${newSkins.map(sk=>`<button class="skin" data-wear="${sk.id}" style="background:${sk.vars.bg||"#bfe3ec"};color:${sk.vars.ink||"#1f3b44"}"><span class="sk-deco">${[...sk.deco].slice(0,3).join("")}</span><b>${sk.name}</b><small>Tap to wear it</small></button>`).join("")}</div>`:""}
  <div class="rowbtns"><button class="big" id="bub">🫧 Bubble break</button><button class="big" id="again">Play again</button><button class="big ghost" id="map">Map</button></div></div>`;
  SFX.win();setTimeout(()=>confetti(innerWidth/2,innerHeight/3,140),150);pip("happy","Woohoo!");
  speak(`Woohoo! Amazing job, ${NAME()}! You got ${earned} star${earned>1?"s":""} and a new sticker!${newSkins.length?` And you unlocked the ${newSkins.map(x=>x.name).join(" and ")} skin!`:""} Want a bubble break?`,"happy");
  $$("[data-wear]").forEach(b=>b.onclick=()=>{const st=skinState();st.on=b.dataset.wear;save();applySkin(st.on);SFX.win();confetti(innerWidth/2,innerHeight/2,80);b.querySelector("small").textContent="Wearing now"});newSkins=[];
  round=null;
  $("#bub").onclick=()=>{SFX.tap();bubbles(hw)};
  $("#again").onclick=()=>{SFX.tap();round={home:hw,mix:hw==="mix",w:hw,n:0,first:0};combo=0;next()};
  $("#map").onclick=()=>{SFX.tap();render()};
}
function bubbles(hw){
  let popped=0,left=20,alive=true;
  $("#app").innerHTML=`<div class="top"><button class="pill" id="home">← Map</button><span class="pill">🫧 <b id="bp">0</b> popped</span><span class="pill">⏱ <b id="bt">20</b></span></div><div class="bubbles" id="field"></div>`;
  speak("Bubble break! Pop as many bubbles as you can!","happy");
  const field=$("#field");
  const spawn=()=>{if(!alive)return;const b=document.createElement("button");const s=rnd(60,110);b.className="bub";b.style.cssText=`width:${s}px;height:${s}px;left:${rnd(0,Math.max(0,field.clientWidth-s))}px;bottom:-${s}px;animation-duration:${rnd(45,80)/10}s`;b.setAttribute("aria-label","bubble");
    b.onclick=()=>{if(b.classList.contains("popped"))return;b.classList.add("popped");popped++;$("#bp").textContent=popped;SFX.pop();buzz(8);setTimeout(()=>b.remove(),260)};
    b.addEventListener("animationend",e=>{if(e.animationName==="floatup")b.remove()});field.appendChild(b)};
  const sp=setInterval(spawn,still()?900:450);
  const tm=setInterval(()=>{left--;const e=$("#bt");if(e)e.textContent=left;if(left<=0){finish()}},1000);
  function finish(){alive=false;clearInterval(sp);clearInterval(tm);if(!$("#field"))return;SFX.win();confetti(innerWidth/2,innerHeight/3,100);speak(`Pop pop pop! You popped ${popped} bubbles! Ready for more?`,"happy");
    $("#app").innerHTML=`<div class="card done" style="margin-top:6vh"><div class="reward">🫧</div><h2>${popped} bubbles popped!</h2><div class="rowbtns"><button class="big" id="again">Keep learning</button><button class="big ghost" id="map">Map</button></div></div>`;
    $("#again").onclick=()=>{SFX.tap();round={home:hw,mix:hw==="mix",w:hw,n:0,first:0};combo=0;next()};$("#map").onclick=()=>{SFX.tap();render()}}
  $("#home").onclick=()=>{alive=false;clearInterval(sp);clearInterval(tm);SFX.tap();render()};
}
function stickerBook(){
  const own=S.stickers[kid]||[];
  $("#app").innerHTML=`<div class="top"><button class="pill" id="back">← Map</button><span class="pill">🎁 ${own.length} of ${STICKERS.length}</span></div><h2>${NAME()}'s sticker book</h2><p class="lede">Finish a round to win a new sticker.</p>
  <div class="stickers">${STICKERS.map(s=>`<button class="sticker ${own.includes(s)?"":"locked"}" data-s="${s}">${own.includes(s)?s:"?"}</button>`).join("")}</div>`;
  speak(`You have ${own.length} stickers! Tap one!`,"happy");
  $$("[data-s]").forEach(b=>b.onclick=()=>{if(b.classList.contains("locked")){SFX.oops();return}SFX.pop();b.style.animation="none";void b.offsetWidth;b.style.animation="win .5s";const r=b.getBoundingClientRect();confetti(r.left+r.width/2,r.top+r.height/2,25)});
  $("#back").onclick=()=>{SFX.tap();render()};
}
function parent(){
  const faces=["🦊","🐢","🦖","🐙","🦄","🐼","🐝","🦁","🐸","🦋"];
  $("#app").innerHTML=`<div class="top"><h1>Grown-ups</h1><button class="pill" id="back">Done</button></div>
  <p class="lede">Levels move on their own. Steady pace: 4 right first-try moves up. Fast pace: 3 right moves up. 3 misses moves down. Progress saves on this device only. Tip: Share → Add to Home Screen so it opens full-screen.</p>
  <div class="parent">
  ${S.kids.map((k,i)=>`<div class="prow"><span style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><button class="pill" data-f="${i}">${k.face}</button><input type="text" id="n${i}" value="${k.name.replace(/"/g,"&quot;")}" aria-label="Name"><button class="switch" data-pace="${i}" aria-pressed="${k.pace==="fast"}">${k.pace==="fast"?"Fast pace":"Steady pace"}</button></span>
    <span class="stat">${WORLDS.filter(w=>w.max).map(w=>{const p=(S.progress[i]||{})[w.id];return`${w.name.split(" ")[0]} ${p?"L"+p.lvl:"–"}`}).join(" · ")}</span></div>`).join("")}
  <div class="prow"><span>Read everything aloud</span><button class="switch" id="voice" aria-pressed="${S.settings.voice}">${S.settings.voice?"On":"Off"}</button></div>
  <div class="prow"><span>Sound effects</span><button class="switch" id="sfx" aria-pressed="${S.settings.sfx}">${S.settings.sfx?"On":"Off"}</button></div>
  <div class="prow"><span>Calm mode (no animations, slower)</span><button class="switch" id="calm" aria-pressed="${S.settings.calm}">${S.settings.calm?"On":"Off"}</button></div>
  <div class="prow"><span>Voice: ${VOICE?VOICE.name:"device default"}</span><button class="switch" id="test">Test voice</button></div>
  <div class="prow"><span>Curriculum map: every level, its AC9 code and thinking skill</span><button class="switch" id="curr">Open</button></div>
  <div class="prow"><span>Reset all progress and stickers</span><button class="switch" id="reset">Reset</button></div></div>`;
  S.kids.forEach((k,i)=>{$("#n"+i).oninput=e=>{k.name=e.target.value.slice(0,20)||"Explorer";save()}});
  $$("[data-f]").forEach(b=>b.onclick=()=>{const k=S.kids[+b.dataset.f];k.face=faces[(faces.indexOf(k.face)+1)%faces.length];save();parent()});
  $$("[data-pace]").forEach(b=>b.onclick=()=>{const k=S.kids[+b.dataset.pace];k.pace=k.pace==="fast"?"steady":"fast";save();parent()});
  ["voice","sfx","calm"].forEach(id=>$("#"+id).onclick=()=>{S.settings[id]=!S.settings[id];save();document.body.classList.toggle("calm",S.settings.calm);parent()});
  $("#curr").onclick=()=>{SFX.tap();curriculumScreen()};
  $("#test").onclick=()=>speak(`Hi ${S.kids[0].name} and ${S.kids[1].name}! Let's go exploring.`,"happy");
  let armed=false;$("#reset").onclick=e=>{if(!armed){armed=true;e.target.textContent="Tap again to confirm";return}S.progress={};S.stickers={};S.skins={};S.think={};save();parent()};
  $("#back").onclick=()=>{kid=null;render()};
}
function askWhy(q){round.whyStage=true;const w=q.why;const opts=txtOpts(w.a,w.o);
  $(".q").textContent=w.q;speak(`Yes! ${w.q}`,"happy");
  const box=$(".opts");box.classList.remove("grid2");box.innerHTML=opts.map((o,i)=>`<button class="opt txt" data-w="${i}">🤔 ${o.h}</button>`).join("");
  $$("[data-w]").forEach(b=>b.onclick=()=>{const o=opts[+b.dataset.w];
    if(o.v===w.a){b.classList.add("yes");$$("[data-w]").forEach(x=>x.style.pointerEvents="none");if(round.tries===0){S.think[kid]=(S.think[kid]||0)+1;checkSkins()}const r=b.getBoundingClientRect();correct(r.left+r.width/2,r.top+r.height/2,"Great thinking")}
    else{b.classList.add("gone");wrong("Hmm, does that really explain it? Try another reason.")}})}
function ups(k){const ps=S.progress[k]||{};const start=S.kids[k].age>=9?2:1;return Object.values(ps).reduce((t,p)=>t+Math.max(0,Math.max(p.best||0,p.lvl)-start),0)}
function mastered(k){const ps=S.progress[k]||{};return WORLDS.some(w=>w.max>1&&ps[w.id]&&Math.max(ps[w.id].best||0,ps[w.id].lvl)>=w.max)}
function skinOK(sk,k){if(!sk.need&&!sk.special)return true;if(sk.special==="master")return mastered(k);if(sk.special==="think")return (S.think[k]||0)>=10;return ups(k)>=sk.need}
function skinRule(sk,k){if(sk.rule&&sk.special==="think")return`${sk.rule} (${Math.min(10,S.think[k]||0)}/10)`;if(sk.rule)return sk.rule;return`Earn ${sk.need} level-up${sk.need>1?"s":""} (${Math.min(sk.need,ups(k))}/${sk.need})`}
let newSkins=[];
function skinState(){return S.skins[kid]||(S.skins[kid]={own:["island"],on:"island"})}
function checkSkins(){if(kid===null)return;const st=skinState();SKINS.forEach(sk=>{if(!st.own.includes(sk.id)&&skinOK(sk,kid)){st.own.push(sk.id);newSkins.push(sk);setTimeout(()=>pip("happy",`New skin: ${sk.name}!`),1600)}});save()}
const BASEVARS={};
function applySkin(id){const root=document.documentElement;const sk=SKINS.find(x=>x.id===id)||SKINS[0];
  Object.keys(BASEVARS).forEach(k=>root.style.removeProperty("--"+k));
  Object.entries(sk.vars).forEach(([k,v])=>{BASEVARS[k]=1;root.style.setProperty("--"+k,v)});
  if(sk.vars.panel)root.style.colorScheme="dark";else root.style.colorScheme="";
  let deco=$("#deco");if(!deco){deco=document.createElement("div");deco.id="deco";$(".scene").appendChild(deco)}
  $$(".cloud").forEach(c=>c.style.display=id==="island"?"":"none");
  deco.innerHTML=id==="island"?"":Array.from({length:9},(_,i)=>{const e=[...sk.deco][i%[...sk.deco].length];return`<span style="position:absolute;left:${rnd(2,92)}%;top:${rnd(4,70)}%;font-size:${rnd(26,52)}px;opacity:.55;animation:bob ${rnd(30,60)/10}s ease-in-out infinite;animation-delay:-${rnd(0,30)/10}s">${e}</span>`}).join("");
  let hat=$("#hat");if(!hat){hat=document.createElement("span");hat.id="hat";hat.style.cssText="position:absolute;left:50%;top:-20px;transform:translateX(-30%);font-size:40px;pointer-events:none";$("#mascot").style.position="fixed";$("#mascot").appendChild(hat)}
  hat.textContent=sk.hat}
function skinsScreen(){const st=skinState();
  $("#app").innerHTML=`<div class="top"><button class="pill" id="back">← Map</button><span class="pill">🎨 ${st.own.length} of ${SKINS.length}</span></div>
  <h2>${NAME()}'s skins</h2><p class="lede">Skins unlock when you level up. Level-ups only happen when you get answers right first try, so every skin shows real learning.</p>
  <div class="skins">${SKINS.map(sk=>{const own=st.own.includes(sk.id);return`<button class="skin ${own?"":"locked"} ${st.on===sk.id?"on":""}" data-skin="${sk.id}" style="background:${sk.vars.bg||"#bfe3ec"};color:${sk.vars.ink||"#1f3b44"}"><span class="sk-deco">${own?[...sk.deco].slice(0,3).join(""):"🔒"}</span><b>${sk.name}</b><small>${own?(st.on===sk.id?"Wearing now":"Tap to wear"):skinRule(sk,kid)}</small></button>`}).join("")}</div>`;
  speak(`You have ${st.own.length} skins! Tap one to try it on.`,"happy");
  $$("[data-skin]").forEach(b=>b.onclick=()=>{const id=b.dataset.skin;if(!st.own.includes(id)){SFX.oops();speak(skinRule(SKINS.find(x=>x.id===id),kid),"soft");return}st.on=id;save();applySkin(id);SFX.win();const r=b.getBoundingClientRect();confetti(r.left+r.width/2,r.top+r.height/2,60);skinsScreen()});
  $("#back").onclick=()=>{SFX.tap();render()}}
function orderTask(q){let pos=0;const slots=$$(".slot");
  $$(".tile").forEach(tl=>tl.onclick=()=>{const lab=tl.dataset.lab;
    if(lab===q.seq[pos]){slots[pos].innerHTML=tl.innerHTML;slots[pos].classList.add("fill");tl.classList.add("used");SFX.count(pos);speak(lab);pos++;
      if(pos===q.seq.length){const r=$(".slots").getBoundingClientRect();correct(r.left+r.width/2,r.top+r.height/2,"Perfect order")}}
    else{tl.classList.remove("no");void tl.offsetWidth;tl.classList.add("no");wrong(pos===0?"Hmm, does that happen first? What comes at the very start?":"Not yet. What happens straight after?")}})}
function curriculumScreen(){
  $("#app").innerHTML=`<div class="top"><h1>Curriculum map</h1><button class="pill" id="back">Back</button></div>
  <p class="lede">Every level is matched to an Australian Curriculum v9 content description and a thinking skill. Questions marked “+ why” ask the child to explain their answer before it counts.</p>
  ${WORLDS.filter(w=>CURR[w.id]).map(w=>`<section class="currsec"><h2>${w.ico} ${w.name}</h2><div class="currwrap"><table class="curr"><tr><th>Lvl</th><th>Activity</th><th>Curriculum</th><th>Thinking skill</th></tr>${CURR[w.id].map((r,i)=>`<tr><td>${i+1}</td><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</table></div></section>`).join("")}`;
  $("#back").onclick=()=>parent()}

render();
