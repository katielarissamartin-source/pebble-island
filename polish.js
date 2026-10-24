(function(){
const st=S.settings;if(st.music===undefined)st.music=false;if(st.limit===undefined)st.limit=0;
if(!S.daily)S.daily={};if(!S.ach)S.ach={};if(!S.stats)S.stats={};
const today=()=>new Date().toLocaleDateString("en-CA");
const K=()=>kid;const D=()=>{let d=S.daily[kid]||{};if(d.day!==today()){const y=new Date(Date.now()-864e5).toLocaleDateString("en-CA");const streak=d.day===y&&d.played?(d.streak||0)+1:0;d=S.daily[kid]={day:today(),streak,played:false,q:newQuests(),mins:0,isl:[]};save()}return d};
const streakNow=d=>d.streak+(d.played?1:0);
const ST=()=>S.stats[kid]=S.stats[kid]||{answers:0,first:0,rounds:0,bosses:0,islands:{}};
function newQuests(){const pool=[["first10","Get 10 right first try",10,"first"],["rounds2","Finish 2 rounds",2,"rounds"],["boss1","Beat a boss",1,"boss"],["islands3","Play 3 different islands",3,"islands"],["review1","Do a Memory Mountain round",1,"review"],["sci1","Finish a Science, Map or Time Cave round",1,"hass"]];return shuffle(pool).slice(0,3).map(([id,t,goal,type])=>({id,t,goal,type,n:0,claimed:false}))}

/* toasts */
const box=document.createElement("div");box.id="toasts";document.body.appendChild(box);
function toast(ic,title,sub,kind){const t=document.createElement("div");t.className="toast "+(kind||"");t.innerHTML=`<span class="ti">${ic}</span><div><b>${title}</b>${sub?`<small>${sub}</small>`:""}</div>`;box.appendChild(t);
  setTimeout(()=>t.classList.add("out"),3600);setTimeout(()=>t.remove(),4200);t.onclick=()=>t.remove()}
window.toast=toast;

/* sounds */
Object.assign(SFX,{
  coin:()=>tone([[1319,.08,0,"square"],[1760,.16,.07,"square"]]),
  levelup:()=>tone([[392,.12,0],[523,.12,.1],[659,.12,.2],[784,.12,.3],[1047,.5,.4],[1319,.6,.4,"triangle"]]),
  quest:()=>tone([[784,.1,0,"triangle"],[988,.1,.1,"triangle"],[1175,.35,.2,"triangle"]]),
  ach:()=>tone([[523,.2,0],[784,.2,0],[659,.2,.18],[1047,.2,.18],[1319,.7,.36],[784,.7,.36]]),
  whoosh:()=>{if(!st.sfx)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const n=AC.createBufferSource(),b=AC.createBuffer(1,AC.sampleRate*.35,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length)*.25;n.buffer=b;const f=AC.createBiquadFilter();f.type="bandpass";f.frequency.setValueAtTime(400,AC.currentTime);f.frequency.exponentialRampToValueAtTime(2400,AC.currentTime+.3);n.connect(f).connect(AC.destination);n.start()}catch(e){}}});
let mus=null;
function music(on){if(mus){clearInterval(mus.t);try{mus.g.gain.linearRampToValueAtTime(0,AC.currentTime+.4)}catch(e){}mus=null}
  if(!on)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const g=AC.createGain();g.gain.value=.035;g.connect(AC.destination);
  const prog=[[262,330,392],[220,262,330],[175,220,262],[196,247,294]];let i=0;
  const play=()=>{const ch=prog[i++%4];ch.forEach((f,j)=>{[0,.5,1,1.5].forEach(at=>{const o=AC.createOscillator(),e=AC.createGain();o.type="triangle";o.frequency.value=f*(j===2&&at>=1?2:1);const t=AC.currentTime+at+j*.12;e.gain.setValueAtTime(0,t);e.gain.linearRampToValueAtTime(1,t+.03);e.gain.exponentialRampToValueAtTime(.001,t+.45);o.connect(e).connect(g);o.start(t);o.stop(t+.5)})})};
  play();mus={g,t:setInterval(play,2000)}}catch(e){}}
document.addEventListener("pointerdown",function once(){if(st.music)music(true);document.removeEventListener("pointerdown",once)},{once:true});
document.addEventListener("visibilitychange",()=>{if(document.hidden)music(false);else if(st.music&&kid!==null)music(true)});

/* achievements */
const ACH=[["first","First steps","Answer your first question","🌱",s=>s.answers>=1],["fifty","Half century","50 right first try","🎯",s=>s.first>=50],["hundred","Century!","100 right first try","💯",s=>s.first>=100],["fivehundred","Brain champion","500 right first try","🧠",s=>s.first>=500],
 ["boss1","Boss beater","Beat your first boss","👾",s=>s.bosses>=1],["boss10","Boss legend","Beat 10 bosses","🏆",s=>s.bosses>=10],["explorer","Explorer","Play 8 different islands","🧭",s=>Object.keys(s.islands).length>=8],["allisl","World traveller","Play every island","🌏",s=>Object.keys(s.islands).length>=WORLDS.filter(w=>w.max).length],
 ["streak3","On fire","3-day streak","🔥",(s,d)=>streakNow(d)>=3],["streak7","Super streak","7-day streak","⚡",(s,d)=>streakNow(d)>=7],["rounds25","Busy learner","Finish 25 rounds","📚",s=>s.rounds>=25],["quests10","Quest hero","Finish 10 daily quests","🗝️",s=>(s.quests||0)>=10]];
function checkAch(){if(kid===null)return;const a=S.ach[kid]=S.ach[kid]||[];const s=ST(),d=D();ACH.forEach(([id,n,desc,ic,f])=>{if(!a.includes(id)&&f(s,d)){a.push(id);save();setTimeout(()=>{SFX.ach();toast(ic,"Achievement: "+n,desc,"gold");confetti(innerWidth/2,80,90);speak(`Achievement unlocked! ${n}!`,"happy");S.coins[kid]=(S.coins[kid]||0)+15;save()},700)}})}

/* quest progress */
function bump(type,n=1){if(kid===null)return;const d=D();d.played=true;d.q.forEach(q=>{if(q.type!==type||q.claimed)return;q.n=Math.min(q.goal,q.n+n);if(q.n>=q.goal&&!q.done){q.done=true;setTimeout(()=>{SFX.quest();toast("📜","Quest complete!",q.t+" · tap the map to claim","quest")},500)}});save()}
const _correct=correct;correct=function(x,y,s){const first=round&&round.tries===0;const w=round&&round.w;_correct(x,y,s);if(kid===null)return;const t=ST();t.answers++;if(first){t.first++;bump("first");setTimeout(SFX.coin,250)}if(w){if(!t.islands[w]){t.islands[w]=1}}save();checkAch()};
const _done=done;done=function(){const r=round;const w=r&&r.w,h=r&&r.home,b=r&&r.boss;_done();if(kid===null)return;const t=ST();t.rounds++;bump("rounds");
  const d=D();d.isl=d.isl||[];if(w&&!d.isl.includes(w)){d.isl.push(w);bump("islands")}if(h==="review")bump("review");if(["sci","geo","hist"].includes(w))bump("hass");if(b&&b.hp<=0){t.bosses++;bump("boss")}save();checkAch()};

/* map extras: streak, quests, calm corner, settings */
const _map=map;map=function(){_map();if(kid===null)return;const d=D();const top=$(".top");
  if(top&&!$("#streakpill"))top.insertAdjacentHTML("beforeend",`<span class="pill" id="streakpill" title="Days in a row">🔥 ${streakNow(d)}</span><button class="pill" id="calmbtn">🫧 Calm</button><button class="pill" id="questbtn">📜 Quests${d.q.some(q=>q.done&&!q.claimed)?' <span class="dot">!</span>':""}</button><button class="pill" id="badgebtn">🏅 ${(S.ach[kid]||[]).length}</button>`);
  $("#calmbtn").onclick=()=>{SFX.tap();calm()};$("#questbtn").onclick=()=>{SFX.tap();quests()};$("#badgebtn").onclick=()=>{SFX.tap();badges()};
  if(!d.greeted){d.greeted=true;save();const s=d.streak;setTimeout(()=>{toast("👋",`Welcome back, ${NAME()}!`,s?`🔥 ${s}-day streak, keep it going!`:"3 new quests are waiting for you","");SFX.whoosh()},800)}
  if(st.music)music(true)};
function quests(){const d=D();$("#app").innerHTML=`<div class="top"><button class="pill" id="qb">← Map</button></div><h2>📜 Today's quests</h2><p class="lede">New quests every day. Finish them for bonus coins!</p>
  <div class="qlist">${d.q.map((q,i)=>`<div class="qcard ${q.claimed?"claimed":q.done?"ready":""}"><b>${q.t}</b><div class="qbar"><i style="width:${q.n/q.goal*100}%"></i></div><small>${q.n} / ${q.goal}</small>${q.done&&!q.claimed?`<button class="big" data-claim="${i}">Claim 🪙 10</button>`:q.claimed?"<span>✓ Claimed</span>":""}</div>`).join("")}</div>`;
  speak("Here are today's quests!","happy");$("#qb").onclick=()=>{SFX.tap();render()};
  $$("[data-claim]").forEach(b=>b.onclick=()=>{const q=d.q[+b.dataset.claim];q.claimed=true;S.coins[kid]=(S.coins[kid]||0)+10;const t=ST();t.quests=(t.quests||0)+1;save();SFX.coin();SFX.quest();const r=b.getBoundingClientRect();confetti(r.left+r.width/2,r.top,70);checkAch();quests()})}
function badges(){const a=S.ach[kid]||[];$("#app").innerHTML=`<div class="top"><button class="pill" id="bb">← Map</button><span class="pill">🏅 ${a.length} of ${ACH.length}</span></div><h2>🏅 Achievements</h2>
  <div class="achs">${ACH.map(([id,n,desc,ic])=>`<div class="ach ${a.includes(id)?"got":""}"><span>${a.includes(id)?ic:"🔒"}</span><b>${n}</b><small>${desc}</small></div>`).join("")}</div>`;$("#bb").onclick=()=>{SFX.tap();render()}}
function calm(){music(false);const steps=[["Breathe in…",4000,"grow"],["Hold…",2000,"hold"],["Breathe out…",5000,"shrink"]];let i=0,c=0,alive=true;
  $("#app").innerHTML=`<div class="calm"><div class="top"><button class="pill" id="cb">← Done</button></div><h2>🫧 Calm corner</h2><div class="breath" id="br"></div><p class="lede" id="bt">Get comfy…</p><p><small>5 slow breaths. Tap Done any time.</small></p></div>`;
  speak("Let's take some slow breaths together.","soft");const br=$("#br"),bt=$("#bt");
  const go=()=>{if(!alive||!$("#br"))return;if(c>=5){bt.textContent="Great job. You're calm and ready!";speak("Great job. You're calm and ready.","soft");return}const s=steps[i];bt.textContent=s[0];br.className="breath "+s[2];br.style.transitionDuration=s[1]+"ms";if(i===0)tone([[220,3.8,0,"sine"]]);if(i===2)tone([[165,4.8,0,"sine"]]);i++;if(i>=3){i=0;c++}setTimeout(go,s[1])};
  setTimeout(go,1200);$("#cb").onclick=()=>{alive=false;SFX.tap();render()}}

/* screen time */
let lastTick=Date.now();
setInterval(()=>{if(kid===null||document.hidden){lastTick=Date.now();return}const d=D();d.mins=(d.mins||0)+(Date.now()-lastTick)/60000;lastTick=Date.now();save();
  if(st.limit&&d.mins>=st.limit&&!d.limitShown){d.limitShown=true;save();timeUp()}
  else if(st.limit&&d.mins>=st.limit-5&&!d.warn5){d.warn5=true;save();toast("⏰","5 minutes left today","Finish your round, then time for a break","");speak("Five minutes left today. Let's finish strong!","soft")}},20000);
function timeUp(){music(false);$("#app").innerHTML=`<div class="card done" style="margin-top:8vh"><div class="reward">🌙</div><h2>That's learning time done for today!</h2><p class="lede">Amazing work, ${NAME()}. Your brain grew today. Come back tomorrow to keep your 🔥 streak.</p><div class="rowbtns"><button class="big" id="tu">OK!</button></div></div>`;speak(`That's learning time done for today. Amazing work, ${NAME()}!`,"happy");$("#tu").onclick=()=>{kid=null;render()}}
const _next=next;next=function(){if(kid!==null&&st.limit){const d=D();if(d.mins>=st.limit+2)return timeUp()}_next()};

/* grown-ups settings */
const _parent=parent;parent=function(){_parent();const boxp=$(".parent");if(!boxp)return;const row=document.createElement("div");row.className="prow";
  row.innerHTML=`<span>Daily learning time limit (shows a friendly "done for today" screen, with a 5-minute warning)</span><select id="lim" style="font:inherit;padding:8px;border-radius:10px">${[0,15,20,30,45,60].map(m=>`<option value="${m}" ${st.limit===m?"selected":""}>${m?m+" min":"No limit"}</option>`).join("")}</select>`;boxp.appendChild(row);
  const r2=document.createElement("div");r2.className="prow";r2.innerHTML=`<span>Background music (gentle, low volume)</span><button class="switch" id="mus">${st.music?"On":"Off"}</button>`;boxp.appendChild(r2);
  const r3=document.createElement("div");r3.className="prow";r3.innerHTML=`<span>Today: ${S.kids.map((k,i)=>`${k.name} ${Math.round(((S.daily[i]||{}).day===today()?(S.daily[i].mins||0):0))} min`).join(" · ")}</span>`;boxp.appendChild(r3);
  $("#lim").onchange=e=>{st.limit=+e.target.value;save()};$("#mus").onclick=e=>{st.music=!st.music;save();e.target.textContent=st.music?"On":"Off"}};
/* home screen install */
try{const ic="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="#7cc6f2"/><ellipse cx="50" cy="60" rx="34" ry="28" fill="#8fb8b0"/><circle cx="40" cy="56" r="5" fill="#14262c"/><circle cx="60" cy="56" r="5" fill="#14262c"/></svg>');
  const m={name:"Pebble Island",short_name:"Pebble",start_url:location.href.split("#")[0],display:"standalone",background_color:"#7cc6f2",theme_color:"#7cc6f2",icons:[{src:ic,sizes:"any",type:"image/svg+xml"}]};
  const l=document.createElement("link");l.rel="manifest";l.href="data:application/manifest+json,"+encodeURIComponent(JSON.stringify(m));document.head.appendChild(l);
  [["theme-color","#7cc6f2"],["apple-mobile-web-app-capable","yes"],["mobile-web-app-capable","yes"]].forEach(([n,c])=>{const x=document.createElement("meta");x.name=n;x.content=c;document.head.appendChild(x)});
  const ai=document.createElement("link");ai.rel="apple-touch-icon";ai.href=ic;document.head.appendChild(ai)}catch(e){}

const css=document.createElement("style");css.textContent=`#toasts{position:fixed;top:12px;left:50%;transform:translateX(-50%);z-index:60;display:grid;gap:8px;width:min(92vw,440px);pointer-events:none}
.toast{pointer-events:auto;display:flex;gap:12px;align-items:center;background:#fff;color:#14262c;border-radius:18px;padding:12px 16px;box-shadow:0 8px 28px rgba(0,0,0,.25);animation:tin .45s cubic-bezier(.2,1.4,.4,1) both;font-weight:600}
.toast .ti{font-size:2rem}.toast b{display:block;font-size:1.05rem}.toast small{display:block;font-size:.9rem;color:#33515a}.toast.gold{background:linear-gradient(135deg,#fff6cf,#ffe08a)}.toast.quest{background:linear-gradient(135deg,#e6fff0,#bff0d4)}
.toast.out{animation:tout .5s forwards}@keyframes tin{from{transform:translateY(-30px) scale(.9);opacity:0}}@keyframes tout{to{transform:translateY(-30px);opacity:0}}
.qlist{display:grid;gap:14px;max-width:640px}.qcard{background:var(--panel,#fff);color:#14262c;border:3px solid var(--line,#ddd);border-radius:20px;padding:16px;display:grid;gap:8px}.qcard.ready{border-color:#3d8f2f;box-shadow:0 0 0 4px #bff0d4}.qcard.claimed{opacity:.6}
.qbar{height:14px;border-radius:7px;background:rgba(0,0,0,.1);overflow:hidden}.qbar i{display:block;height:100%;background:#3d8f2f;transition:width .5s}
.achs{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}.ach{background:var(--panel,#fff);color:#14262c;border:3px solid var(--line,#ddd);border-radius:18px;padding:14px;text-align:center;display:grid;gap:4px;opacity:.55}.ach.got{opacity:1;border-color:#e0b04a;background:linear-gradient(160deg,#fffdf2,#fff3c4)}.ach span{font-size:2.6rem}.ach small{color:#33515a}
.calm{text-align:center}.calm h2,.calm p{position:relative;z-index:2}#bt{font-size:2rem;font-weight:800;color:#14262c}.breath{position:relative;z-index:1;width:140px;height:140px;margin:110px auto 120px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#e6fbff,#7fd3e8 60%,#4aa8c4);box-shadow:0 0 40px rgba(127,211,232,.8);transition:transform ease-in-out}.breath.grow{transform:scale(1.9)}.breath.hold{transform:scale(1.9)}.breath.shrink{transform:scale(1)}
#streakpill{font-weight:800}`;document.head.appendChild(css);
})();
