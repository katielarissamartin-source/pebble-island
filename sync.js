(function(){
const SB="https://sxrvuqfkdajwalgjkidw.supabase.co/rest/v1/rpc/";
const AK="sb_publishable_Qv-NOZMwDF-cUlJhkSVIJw_QdlQvnTT";
if(!S.log)S.log=[];if(S.synced===undefined)S.synced=0;if(!S.family)S.family="";if(!S.device)S.device="";
const rpc=async(fn,body)=>{const r=await fetch(SB+fn,{method:"POST",headers:{apikey:AK,"Content-Type":"application/json"},body:JSON.stringify(body)});if(!r.ok)throw new Error(await r.text());return r.json()};
window.PI={rpc,online:()=>!!S.family};
const cid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
function logEv(kind,o={}){if(kid===null&&o.kid===undefined)return;const e={cid:cid(),kid:o.kid??kid,kind,world:o.world??null,level:o.level??null,ok:o.ok??null,ms:o.ms??null,data:o.data??null,device:S.device||null,at:new Date().toISOString()};
  S.log.push(e);if(S.log.length>6000){const cut=S.log.length-6000;S.log.splice(0,cut);S.synced=Math.max(0,S.synced-cut)}save();if(S.family&&S.log.length-S.synced>=10)flush()}
window.logEv=logEv;
let flushing=false;
async function flush(){if(!S.family||flushing||S.synced>=S.log.length)return;flushing=true;
  try{while(S.synced<S.log.length){const batch=S.log.slice(S.synced,S.synced+400);await rpc("pi_log",{p_key:S.family,p_events:batch});S.synced+=batch.length;save()}}catch(e){}finally{flushing=false}}
window.PIflush=flush;
setInterval(flush,20000);addEventListener("visibilitychange",()=>{if(document.hidden)flush()});

const qstart={t:0};
const _next=next;
next=function(){
  if(round&&round.place&&round.place.finished){return placeResult()}
  if(round&&round.place){const pl=round.place;const w=round.w;
    round.q=GEN[w](pl.L);round.qLevel=pl.L;round.tag="check";round.tries=0;round.counted=0;round.whyDone=false;round.whyStage=false;qstart.t=Date.now();render();
    setTimeout(()=>round&&speak((pl.asked===0?`Quick check-up, ${NAME()}! Let's see what you already know. `:"")+round.q.say),300);return}
  if(round&&!round.mix){const p=prog(round.w);const w=WORLDS.find(x=>x.id===round.w);
    if(!p.placed&&w.max>1){return startPlacement(round.w)}
    const n=round.n;let L=p.lvl,tag="";
    if(n===2&&p.lvl<w.max){L=p.lvl+1;tag="challenge"}else if(n===4&&p.lvl>1&&Math.random()<.6){L=p.lvl-1;tag="review"}
    round.q=GEN[round.w](L);round.qLevel=L;round.tag=tag;round.tries=0;round.counted=0;round.whyDone=false;round.whyStage=false;qstart.t=Date.now();render();
    if(tag==="challenge")setTimeout(()=>pip("happy","⭐ Challenge question!"),200);
    if(tag==="review")setTimeout(()=>pip("happy","🔁 Remember this one?"),200);
    setTimeout(()=>round&&round.q&&speak((n===0?`Let's go, ${NAME()}! `:tag==="challenge"?"Ooh, a challenge question! ":tag==="review"?"Let's see if you remember this one. ":OPENER())+round.q.say),300);return}
  _next();round.qLevel=prog(round.w).lvl;round.tag="";qstart.t=Date.now()};

function startPlacement(w){const p=prog(w);const W=WORLDS.find(x=>x.id===w);const start=Math.min(W.max,S.kids[kid].age>=9?2:1);
  round.place={L:start,start,asked:0,okAt:0,passed:0,lvlAsked:0,finished:false,log:[]};
  $("#app").innerHTML=`<div class="card done" style="margin-top:6vh"><div class="reward">🔍</div><h2>Quick check-up!</h2><p class="lede">A few questions so ${W.name} starts at just the right level for you. No pressure, just do your best!</p><div class="rowbtns"><button class="big" id="go">Let's go!</button></div></div>`;
  speak(`Before we start ${W.name}, let's do a quick check-up so it's just right for you!`,"happy");
  $("#go").onclick=()=>{SFX.tap();next()}}
function placeStep(ok){const pl=round.place;const W=WORLDS.find(x=>x.id===round.w);pl.asked++;pl.lvlAsked++;pl.log.push([pl.L,ok]);
  if(ok)pl.okAt++;
  if(pl.lvlAsked>=2||!ok){
    if(pl.okAt===2){pl.passed=pl.L;if(pl.L>=W.max)pl.finished=true;else{pl.L++;pl.lvlAsked=0;pl.okAt=0}}
    else if(!ok){if(pl.passed===0&&pl.L>1&&pl.L===pl.start&&!pl.down){pl.down=true;pl.L--;pl.lvlAsked=0;pl.okAt=0}else pl.finished=true}
  }
  if(pl.asked>=12)pl.finished=true}
function placeResult(){const pl=round.place;const w=round.w;const W=WORLDS.find(x=>x.id===w);const p=prog(w);
  const lvl=pl.passed?Math.min(W.max,pl.passed+(pl.passed>=W.max?0:1)):1;p.lvl=lvl;p.best=Math.max(p.best||0,pl.passed||0);p.placed=true;p.streak=0;p.miss=0;save();
  logEv("placement",{world:w,level:lvl,data:{passed:pl.passed,answers:pl.log}});
  const target=(typeof CURR!=="undefined"&&CURR[w]&&CURR[w][lvl-1])?CURR[w][lvl-1][0]:"";
  round=null;SFX.win();confetti(innerWidth/2,innerHeight/3,100);
  $("#app").innerHTML=`<div class="card done" style="margin-top:6vh"><div class="reward">🎯</div><h2>Check-up done!</h2><p class="lede">You're starting ${W.name} at level ${lvl} of ${W.max}${target?`: ${target}`:""}.</p><div class="rowbtns"><button class="big" id="go">Start playing</button><button class="big ghost" id="map">Map</button></div></div>`;
  speak(`Great job! You're starting at level ${lvl}. Let's play!`,"happy");
  $("#go").onclick=()=>{SFX.tap();round={home:w,mix:false,w,n:0,first:0};combo=0;next()};$("#map").onclick=()=>{SFX.tap();render()}}
window.retest=(k,w)=>{const ps=S.progress[k]||{};if(ps[w]){ps[w].placed=false;save()}};

const _corr=correct;
correct=function(x,y,s){
  const ok=round.tries===0;const w=round.w;const L=round.qLevel;const ms=Date.now()-qstart.t;const tag=round.tag||"";
  logEv("answer",{world:w,level:L,ok,ms,data:tag?{tag}:null});
  if(round.place){const p=prog(w);const keep={lvl:p.lvl,streak:p.streak,miss:p.miss,best:p.best};placeStep(ok);_corr(x,y,s);Object.assign(p,keep);round.n=Math.max(0,round.n-1);save();return}
  const p=prog(w);const before=p.lvl;
  if(tag==="challenge"&&ok)p.streak++;
  _corr(x,y,s);
  if(p.lvl>before)logEv("levelup",{world:w,level:p.lvl})};
const _miss=miss;miss=function(){const p=prog(round.w);const before=p.lvl;if(round.place)return;if(round.tag==="challenge"){return}_miss();if(p.lvl<before)logEv("leveldown",{world:round.w,level:p.lvl})};
const _done=done;done=function(){const w=round.w,first=round.first;_done();logEv("round",{world:w,data:{first}});flush()};

const _home=home;home=function(){_home();const top=$(".top");if(top&&!$("#hubbtn"))top.insertAdjacentHTML("beforeend",`<button class="pill" id="hubbtn">👩 Audrey's Hub</button>`);const b=$("#hubbtn");if(b)b.onclick=()=>{SFX.tap();typeof openHub==="function"&&openHub()};
  $$("[data-k]").forEach(btn=>{const o=btn.onclick;btn.onclick=e=>{const k=+btn.dataset.k;logEv("session",{kid:k});o&&o(e)}})};

let poll=0,cloudMsgs=[],lastId=0;
async function pull(){if(!S.family)return;try{const rows=await rpc("pi_messages",{p_key:S.family,p_after:lastId});if(rows.length){rows.reverse().forEach(r=>{if(!cloudMsgs.some(m=>m.id===r.id))cloudMsgs.push(r)});lastId=Math.max(lastId,...rows.map(r=>r.id));cloudMsgs.sort((a,b)=>a.id-b.id);return true}}catch(e){}return false}
const cloudChat=function(){
  const other=kid===0?1:0;const them=S.kids[other];
  $("#app").innerHTML=`<div class="top"><button class="pill" id="xback">← Map</button><span class="pill" id="net">🟢 Connected</span></div><h2>💬 Chat with ${them.face} ${them.name}</h2><p class="lede">Tap a message to hear it. ${them.name} sees these on their own tablet.</p>
   <div class="chatlog" id="log"><p class="lede">Loading messages…</p></div>
   <div class="quick">${["Hi! 👋","Want to play?","I got a new skin!","I levelled up! 🚀","Good job!","I miss you","Love you 💖","That's funny 😂","See you soon!"].map(q=>`<button class="qbtn" data-q="${q}">${q}</button>`).join("")}</div>
   <div class="quick">${["😀","😂","🥰","😎","🤩","😮","😢","👍","🦄","⛏️","🌈","💎"].map(e=>`<button class="qbtn emo" data-q="${e}">${e}</button>`).join("")}</div>
   <div class="chatin"><input id="cin" type="text" maxlength="140" placeholder="Type a message…" aria-label="Message"><button class="big" id="csend">Send</button></div>`;
  const draw=()=>{const log=$("#log");if(!log)return;const ms=cloudMsgs.slice(-80);
    log.innerHTML=ms.map((m,i)=>{const mine=m.from_kid===kid;const onlyEmo=/^\p{Extended_Pictographic}+$/u.test(m.body.replace(/\s/g,""));return`<button class="cmsg ${mine?"me":"them"} ${onlyEmo?"big":""}" data-say="${i}"><small>${mine?"You":S.kids[m.from_kid].name} · ${new Date(m.created_at).toLocaleTimeString([], {hour:"numeric",minute:"2-digit"})}</small>${m.body.replace(/</g,"&lt;")}</button>`}).join("")||`<p class="lede">No messages yet. Say hi to ${them.name}!</p>`;
    log.scrollTop=log.scrollHeight;$$("[data-say]").forEach(b=>b.onclick=()=>{const m=ms[+b.dataset.say];speak(`${m.from_kid===kid?"You said":S.kids[m.from_kid].name+" said"}: ${m.body}`)});S.seen[kid]=Date.now();S.seenId=S.seenId||{};S.seenId[kid]=lastId;save()};
  const stop=()=>{clearInterval(poll);poll=0};
  $("#xback").onclick=()=>{stop();SFX.tap();render()};
  const send=async t=>{t=t.trim().slice(0,140);if(!t)return;SFX.pop();speak(t,"happy");try{await rpc("pi_send",{p_key:S.family,p_from:kid,p_body:t});await pull();draw()}catch(e){$("#net").textContent="🔴 Not sent, check internet";SFX.oops()}};
  $$("[data-q]").forEach(b=>b.onclick=()=>send(b.dataset.q));
  $("#csend").onclick=()=>{send($("#cin").value);$("#cin").value=""};$("#cin").onkeydown=e=>{if(e.key==="Enter"){send(e.target.value);e.target.value=""}};
  pull().then(draw);stop();poll=setInterval(async()=>{if(!$("#log")){stop();return}const n=await pull();if(n){draw();SFX.count(3)}},4000);
  speak(`Chat with ${them.name}!`,"happy")};
const _map=map;map=function(){_map();const cb=$("#chatbtn");if(cb){const o=cb.onclick;cb.onclick=e=>{if(S.family){SFX.tap();cloudChat()}else o&&o(e)}}if(!S.family)return;const myLast=(S.seenId||{})[kid]||0;
  pull().then(()=>{const u=cloudMsgs.filter(m=>m.to_kid===kid&&m.id>myLast).length;const b=$("#chatbtn");if(b&&u&&!b.querySelector(".dot")){b.insertAdjacentHTML("beforeend",`<span class="dot">${u}</span>`);pip("happy",`${u} new message${u>1?"s":""}!`)}})};

const _parent=parent;parent=function(){_parent();const box=$(".parent");if(!box)return;
  box.insertAdjacentHTML("afterbegin",`<div class="prow"><span style="display:grid;gap:6px">${S.family?`🟢 Connected to family cloud${S.device?` as “${S.device}”`:""}`:"Connect this tablet to the family cloud (for chat between tablets and Audrey's reports)"}
   <span style="display:flex;gap:8px;flex-wrap:wrap"><input type="text" id="famkey" placeholder="Family code e.g. PEBBLE-XXXX-XXXX-XXXX" value="${S.family}" style="width:300px"><input type="text" id="devname" placeholder="Tablet name e.g. Ivy's iPad" value="${S.device}" style="width:200px"></span></span><button class="switch" id="famgo">${S.family?"Update":"Connect"}</button></div>`);
  $("#famgo").onclick=async()=>{const k=$("#famkey").value.trim().toUpperCase();const d=$("#devname").value.trim().slice(0,40);const btn=$("#famgo");btn.textContent="Checking…";
    try{const ok=k?await rpc("pi_check",{p_key:k}):false;if(k&&!ok){btn.textContent="Code not found";return}S.family=k;S.device=d;save();await flush();parent()}catch(e){btn.textContent="No internet?"}};
  const sec=document.createElement("div");sec.className="prow";sec.innerHTML=`<span>Re-run the check-up for an island (finds the right starting level again)</span><span style="display:flex;gap:6px;flex-wrap:wrap">${S.kids.map((k,i)=>`<select id="rt${i}" aria-label="Island for ${k.name}" style="font:inherit;padding:8px;border-radius:10px">${WORLDS.filter(w=>w.max>1).map(w=>`<option value="${w.id}">${w.name}</option>`).join("")}</select><button class="switch" data-rt="${i}">${k.name}</button>`).join("")}</span>`;
  box.appendChild(sec);$$("[data-rt]").forEach(b=>b.onclick=()=>{const i=+b.dataset.rt;retest(i,$("#rt"+i).value);b.textContent="✓ Next visit";})};
if(S.family)flush();
render();
})();
