(function(){
const st=S.settings;
const css=document.createElement("style");css.textContent=`
#app .world.curr-card{background:linear-gradient(140deg,#174f67,#27697d)!important}
#app .world.mix{background:linear-gradient(140deg,#a33c2a,#6e2a5e)!important}
#app .world.curr-card b,#app .world.curr-card small,#app .world.mix b,#app .world.mix span{color:#fff!important;text-shadow:0 1px 2px rgba(0,0,0,.35)!important}
#toasts{top:auto!important;bottom:18px!important}
@keyframes tin{from{transform:translateY(30px) scale(.9);opacity:0}}@keyframes tout{to{transform:translateY(30px);opacity:0}}
body[data-skin="blocks"] #app h1,body[data-skin="blocks"] #app h2,body[data-skin="blocks"] #app .curr-shell h1{font-family:var(--display,"Lexend"),system-ui,sans-serif!important;letter-spacing:0!important;text-transform:none!important}
.bubble{max-width:min(240px,45vw)}
#app [data-year]{display:none!important}
body.calmfx *{animation:none!important;transition:none!important}body.calmfx .deco,body.calmfx #fx,body.calmfx .cloud{display:none!important}
body.bigtext #app{font-size:1.15em}body.bigtext #app .opt,body.bigtext #app .lede{font-size:1.15em}
body.dysfont #app,body.dysfont #app *{font-family:"Lexend","Atkinson Hyperlegible",system-ui,sans-serif!important;letter-spacing:.02em}`;
document.head.appendChild(css);
const fl=document.createElement("link");fl.rel="stylesheet";fl.href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Lexend:wght@400;600;800&display=swap";document.head.appendChild(fl);
const applyBody=()=>{document.body.classList.toggle("calmfx",!!st.calmfx);document.body.classList.toggle("bigtext",!!st.bigtext);document.body.classList.toggle("dysfont",!!st.dysfont)};applyBody();
const _conf=confetti;confetti=function(){if(st.calmfx)return;return _conf.apply(this,arguments)};

const labelMenu=()=>{const d=(S.daily||{})[kid];const bb=$("#badgebtn"),sp=$("#streakpill");
  if(bb)bb.textContent=`🏅 Badges · ${(S.ach&&S.ach[kid]||[]).length}`;
  if(sp&&d){const n=(d.streak||0)+(d.played?1:0);sp.textContent=`🔥 Streak · ${n} day${n===1?"":"s"}`}};
const _map=map;map=function(){_map();labelMenu();setTimeout(labelMenu,50)};

const yearOf=k=>((S.curriculumYear||{})[k])||((S.kids[k].age||7)>=9?5:2);
function labRows(k){const prog=(S.curriculumProgress||{})[k]||{};const L=window.PEBBLE_QCAA_LESSONS||{};const rows=[];
  Object.keys(L).forEach(y=>Object.keys(L[y]).forEach(area=>(L[y][area]||[]).forEach(les=>{const r=prog[`${y}-${area}-${les.id}`];rows.push({y,area,les,r})})));return rows}
function labHtml(k){const rows=labRows(k);const done=rows.filter(x=>x.r&&x.r.done);const yr=yearOf(k);const mine=rows.filter(x=>+x.y===yr);
  const nice={science:"Science",hass:"Our World (HASS)",technologies:"Tech & Design"};
  return `<div class="hc"><h3>Curiosity Lab (QCAA lessons)</h3><p>Working at <b>Year ${yr}</b> · ${done.length} lesson${done.length===1?"":"s"} completed · ${mine.filter(x=>!x.r||!x.r.done).length} still to explore at this level.</p>
   <table><tr><th>Lesson</th><th>Subject</th><th>AC9 code</th><th>Status</th><th>Attempts</th></tr>${mine.map(x=>`<tr><td>${x.les.icon||""} ${x.les.title}</td><td>${nice[x.area]||x.area}</td><td>${x.les.code||""}</td><td>${x.r&&x.r.done?"✓ Completed":"Not yet"}</td><td>${x.r&&x.r.tries||0}</td></tr>`).join("")}</table>
   <p class="noprint" style="margin-top:12px"><label>Lab level for ${S.kids[k].name}: <select id="labyr" style="font:inherit;padding:6px;border-radius:8px">${[2,5].map(y=>`<option value="${y}" ${y===yr?"selected":""}>Year ${y}</option>`).join("")}</select></label> <small>(only grown-ups can change this)</small></p></div>`}
new MutationObserver(()=>{const hub=document.querySelector(".hub");if(!hub)return;const on=hub.querySelector("[data-tab].on");const who=hub.querySelector("[data-who].on");if(!on||!who)return;const k=+who.dataset.who;const t=on.dataset.tab;
  if(!["skills","learning","report"].includes(t)||hub.querySelector("#labsec"))return;
  const wrap=document.createElement("div");wrap.id="labsec";wrap.innerHTML=labHtml(k);hub.appendChild(wrap);
  const sel=wrap.querySelector("#labyr");if(sel)sel.onchange=e=>{S.curriculumYear=S.curriculumYear||{};S.curriculumYear[k]=+e.target.value;save();wrap.innerHTML=labHtml(k)}}).observe(document.getElementById("app"),{childList:true,subtree:true});

function exportBackup(){const data={app:"pebble-island",v:1,at:new Date().toISOString(),state:S};const blob=new Blob([JSON.stringify(data)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`pebble-island-backup-${new Date().toLocaleDateString("en-CA")}.json`;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);
  st.lastBackup=Date.now();save();window.toast&&toast("💾","Backup saved","Keep the file somewhere safe, like Google Drive","")}
function importBackup(file){const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(d.app!=="pebble-island"||!d.state||!d.state.kids)throw 0;
  if(!confirmBox(`Restore the backup from ${new Date(d.at).toLocaleString("en-AU")}? This replaces everything on this tablet.`))return;
  Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,d.state);save();location.reload()}catch(e){window.toast&&toast("⚠️","That file isn't a Pebble Island backup","","")}};r.readAsText(file)}
const confirmBox=m=>window.confirm(m);
const _parent=parent;parent=function(){_parent();const box=$(".parent");if(!box)return;
  const add=(html)=>{const r=document.createElement("div");r.className="prow";r.innerHTML=html;box.appendChild(r);return r};
  const days=st.lastBackup?Math.floor((Date.now()-st.lastBackup)/864e5):null;
  add(`<span><b>Backup</b>: everything (levels, coins, stickers, Curiosity Lab) lives on this tablet only. Save a backup file so nothing is lost if the browser is cleared. ${days===null?"<b>No backup yet.</b>":`Last backup ${days===0?"today":days+" day(s) ago"}.`}</span><span style="display:flex;gap:6px;flex-wrap:wrap"><button class="switch" id="bkup">💾 Save backup</button><button class="switch" id="rest">📂 Restore</button><input type="file" id="restf" accept="application/json,.json" hidden></span>`);
  add(`<span>Calm visuals (turns off confetti, floating decorations and animations)</span><button class="switch" id="cfx">${st.calmfx?"On":"Off"}</button>`);
  add(`<span>Bigger text</span><button class="switch" id="btx">${st.bigtext?"On":"Off"}</button>`);
  add(`<span>Easy-read font (Lexend, designed for reading fluency)</span><button class="switch" id="dys">${st.dysfont?"On":"Off"}</button>`);
  $("#bkup").onclick=exportBackup;$("#rest").onclick=()=>$("#restf").click();$("#restf").onchange=e=>e.target.files[0]&&importBackup(e.target.files[0]);
  [["cfx","calmfx"],["btx","bigtext"],["dys","dysfont"]].forEach(([id,k])=>$("#"+id).onclick=e=>{st[k]=!st[k];save();applyBody();e.target.textContent=st[k]?"On":"Off"})};
const _home=home;home=function(){_home();const days=st.lastBackup?(Date.now()-st.lastBackup)/864e5:999;const any=Object.keys(S.progress||{}).length;
  if(any&&days>7&&!document.querySelector("#bknag")){const top=$(".top");top&&top.insertAdjacentHTML("afterend",`<p class="lede" id="bknag" style="background:#fff3d6;color:#5c3a00;border-radius:12px;padding:8px 12px;font-size:1rem">💾 Grown-ups: it's been a while since a backup. Open Grown-ups → Save backup.</p>`)}};
})();
(function(){
const st=S.settings;
const snap=()=>{const c={...S};delete c.log;return c};
const sig=()=>{try{return JSON.stringify(snap()).length+":"+JSON.stringify(S.progress||{}).length+":"+JSON.stringify(S.curriculumProgress||{}).length+":"+JSON.stringify(S.coins||{})}catch(e){return ""}};
let busy=false;
async function cloudBackup(manual){if(!S.family||!window.PI||busy)return false;const s=sig();if(!manual&&s===st.cloudSig&&Date.now()-(st.cloudAt||0)<864e5)return false;busy=true;
  try{await PI.rpc("pi_log",{p_key:S.family,p_events:[{cid:"bk-"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),kid:0,kind:"backup",data:{v:1,state:snap()},device:S.device||"tablet",at:new Date().toISOString()}]});
    st.cloudSig=s;st.cloudAt=Date.now();save();if(manual&&window.toast)toast("☁️","Saved to the cloud","Everything is backed up","");return true}
  catch(e){if(manual&&window.toast)toast("⚠️","Couldn't reach the cloud","Check the internet and try again","");return false}finally{busy=false}}
async function cloudList(){const rows=await PI.rpc("pi_events",{p_key:S.family,p_since:new Date(Date.now()-120*864e5).toISOString()});return rows.filter(r=>r.kind==="backup"&&r.data&&r.data.state).reverse()}
setInterval(()=>{if(!document.hidden&&Date.now()-(st.cloudAt||0)>30*60000)cloudBackup(false)},5*60000);
document.addEventListener("visibilitychange",()=>{if(document.hidden&&Date.now()-(st.cloudAt||0)>5*60000)cloudBackup(false)});
setTimeout(()=>cloudBackup(false),15000);
const _parent=parent;parent=function(){_parent();const box=$(".parent");if(!box)return;const r=document.createElement("div");r.className="prow";
  const when=st.cloudAt?new Date(st.cloudAt).toLocaleString("en-AU",{weekday:"short",hour:"numeric",minute:"2-digit"}):"never";
  r.innerHTML=S.family?`<span><b>☁️ Cloud backup</b>: saves automatically to the family cloud (every 30 minutes while playing, and when the app is closed). Last cloud backup: <b>${when}</b>.</span><span style="display:flex;gap:6px;flex-wrap:wrap"><button class="switch" id="cbk">☁️ Back up now</button><button class="switch" id="crs">☁️ Restore from cloud</button></span><div id="clist" style="width:100%"></div>`
   :`<span><b>☁️ Cloud backup</b> is off. Enter the family code at the top of this page to turn on automatic backup to the cloud.</span>`;
  box.appendChild(r);if(!S.family)return;
  $("#cbk").onclick=async e=>{e.target.textContent="Saving…";const ok=await cloudBackup(true);e.target.textContent=ok?"✓ Saved":"☁️ Back up now"};
  $("#crs").onclick=async()=>{const el=$("#clist");el.textContent="Loading backups…";try{const list=(await cloudList()).slice(0,10);
    el.innerHTML=list.length?list.map((b,i)=>`<div style="display:flex;justify-content:space-between;gap:8px;align-items:center;padding:6px 0;border-top:1px solid var(--line)"><span>${new Date(b.at).toLocaleString("en-AU",{weekday:"short",day:"numeric",month:"short",hour:"numeric",minute:"2-digit"})} · ${b.device||"tablet"} · ${(b.data.state.kids||[]).map(k=>k.name).join(" & ")}</span><button class="switch" data-ci="${i}">Restore</button></div>`).join(""):"No cloud backups yet.";
    $$("[data-ci]").forEach(btn=>btn.onclick=()=>{const b=list[+btn.dataset.ci];if(!window.confirm(`Restore the cloud backup from ${new Date(b.at).toLocaleString("en-AU")}? This replaces everything on this tablet.`))return;
      const keep={family:S.family,device:S.device,log:S.log,synced:S.synced};Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,b.data.state,keep);S.settings.cloudSig="";save();location.reload()})}
    catch(e){el.textContent="Couldn't reach the cloud. Check the internet."}}};
window.PIbackup=cloudBackup;
})();
(function(){
const st=S.settings;
const css=document.createElement("style");css.textContent=`
html,body{overscroll-behavior:none}img,svg,.stage,.opt,.world{-webkit-touch-callout:none}
#app>*{animation:scrIn .22s ease-out both}@keyframes scrIn{from{opacity:0;transform:translateY(8px)}}
body.calmfx #app>*{animation:none}
#tabbar{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(10px + env(safe-area-inset-bottom,0px));z-index:40;display:flex;gap:4px;background:var(--panel,#fff);border:1px solid var(--line,#cfe0db);border-radius:22px;padding:6px;box-shadow:0 10px 30px rgba(13,41,53,.18);max-width:calc(100vw - 150px)}
#tabbar button{display:grid;place-items:center;gap:2px;min-width:70px;min-height:58px;padding:6px 10px;border-radius:16px;font:700 .8rem var(--display,"Lexend"),system-ui;color:var(--ink,#1f3b44)}
#tabbar button span{font-size:1.5rem;line-height:1}
#tabbar button.on{background:var(--sea,#206889);color:#fff}
#tabbar button:active{transform:scale(.94)}
body.has-tabbar .app{padding-bottom:120px!important}
body.has-tabbar #toasts{bottom:96px!important}
#netpill{position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:70;background:#5c3a00;color:#fff;border-radius:999px;padding:8px 16px;font:700 .9rem var(--display,"Lexend"),system-ui;box-shadow:0 6px 18px rgba(0,0,0,.2)}
#leavebox{position:fixed;inset:0;z-index:80;background:rgba(20,38,44,.55);display:grid;place-items:center;padding:20px}
#leavebox>div{background:var(--panel,#fff);color:var(--ink,#14262c);border-radius:24px;padding:24px;max-width:420px;text-align:center;display:grid;gap:14px;box-shadow:0 20px 50px rgba(0,0,0,.3)}
#leavebox .rowbtns{gap:10px}#leavebox .big.ghost{background:#fff!important;color:#1f3b44!important;border:2px solid #cfe0db!important}
#app .world.studio-card{background:linear-gradient(140deg,#5b3a8c,#7a4fae)!important}#app .world.studio-card *{color:#fff!important;opacity:1!important;text-shadow:0 1px 2px rgba(0,0,0,.3)!important}
@media (max-width:680px){#tabbar{max-width:calc(100vw - 96px);left:12px;transform:none}#tabbar button{min-width:52px;padding:6px 6px;font-size:.7rem}}`;
document.head.appendChild(css);

const inRound=()=>!!(round&&round.q&&$("#app .opts, #app .tiles, #app .slots, #app .bins, #app .clockset, #app .btnrow, #app .grid"));
const isAdult=()=>document.body.classList.contains("adult")||!!$(".hub")||!!$(".pwgate");
const backBtn=()=>$("#app #back, #app #xback, #app #qb, #app #bb, #app #cb, #app #hback, #app #adapt-map, #app #studio-back, #app #skback, #app #home, #app [id$='back']");
const goMap=()=>{round=null;if(kid===null){render();return}render()};

/* Back button / history */
let depth=0,lastKey="",guard=false;
const keyOf=()=>{const a=$("#app");if(!a)return"";if(inRound())return"round";if(kid===null)return"home";const h=a.querySelector("h1,h2");return (a.firstElementChild&&a.firstElementChild.className||"")+"|"+(h?h.textContent.slice(0,30):"")};
history.replaceState({pi:0},"");
new MutationObserver(()=>{if(guard)return;const k=keyOf();if(!k||k===lastKey)return;
  if(k==="home"){lastKey=k;return}
  if(lastKey&&lastKey!=="round"||k==="round"){history.pushState({pi:++depth},"")}lastKey=k;updateBar()}).observe(document.getElementById("app"),{childList:true});
addEventListener("popstate",()=>{guard=true;setTimeout(()=>guard=false,300);
  if($("#leavebox")){$("#leavebox").remove();return}
  if(inRound()){history.pushState({pi:++depth},"");askLeave();return}
  if(kid===null&&!isAdult()){return}
  const b=backBtn();if(b){b.click()}else if(isAdult()){document.body.classList.remove("adult");kid=null;render()}else goMap();
  lastKey=keyOf();updateBar()});
function askLeave(){if($("#leavebox"))return;const d=document.createElement("div");d.id="leavebox";
  d.innerHTML=`<div><div style="font-size:2.6rem">🏝️</div><h2 style="margin:0">Leave this round?</h2><p class="lede" style="margin:0">You'll keep your coins and stickers so far.</p><div class="rowbtns"><button class="big ghost" id="lvno">Keep playing</button><button class="big" id="lvyes">Back to map</button></div></div>`;
  document.body.appendChild(d);speak("Do you want to leave this round?","soft");
  $("#lvno").onclick=()=>d.remove();$("#lvyes").onclick=()=>{d.remove();goMap()}}

/* Bottom tab bar */
const TABS=[["map","🏝️","Islands"],["learn","📚","Learn"],["quests","📜","Quests"],["stickers","🎁","Stickers"],["shop","🛍️","Shop"]];
const bar=document.createElement("nav");bar.id="tabbar";bar.setAttribute("aria-label","Main");
bar.innerHTML=TABS.map(([id,ic,n])=>`<button data-tab2="${id}" aria-label="${n}"><span>${ic}</span>${n}</button>`).join("");document.body.appendChild(bar);
const fromMap=(sel,fn)=>{if(fn){round=null;fn();return}const go=()=>{const b=$(sel);if(b)b.click()};if($(sel)){go();return}round=null;render();setTimeout(go,80)};
const ACTIONS={map:()=>{round=null;render()},
  learn:()=>{if(window.PEBBLE_STUDIO&&PEBBLE_STUDIO.showDashboard){round=null;PEBBLE_STUDIO.showDashboard()}else fromMap(".studio-card, .curr-card")},
  quests:()=>fromMap("#questbtn"),stickers:()=>{round=null;stickerBook()},shop:()=>fromMap("#shopbtn",window.shop2)};
let current="map";
bar.addEventListener("click",e=>{const b=e.target.closest("[data-tab2]");if(!b)return;SFX.tap();buzz&&buzz(10);current=b.dataset.tab2;ACTIONS[current]();updateBar()});
function updateBar(){const show=kid!==null&&!inRound()&&!isAdult()&&!$(".brk");bar.style.display=show?"flex":"none";document.body.classList.toggle("has-tabbar",show);
  const a=$("#app");if(!a)return;let cur="";if(a.querySelector(".map"))cur="map";else if(a.querySelector(".qlist"))cur="quests";else if(a.querySelector(".stickers"))cur="stickers";else if(a.querySelector(".shop"))cur="shop";else if(a.querySelector("[class*=studio]"))cur="learn";
  bar.querySelectorAll("[data-tab2]").forEach(x=>x.classList.toggle("on",x.dataset.tab2===cur))}
new MutationObserver(updateBar).observe(document.getElementById("app"),{childList:true,subtree:false});
setInterval(updateBar,1500);updateBar();

/* Offline / online */
const net=()=>{let p=$("#netpill");if(navigator.onLine){if(p){p.textContent="✅ Back online";setTimeout(()=>p&&p.remove(),2000)}return}
  if(!p){p=document.createElement("div");p.id="netpill";document.body.appendChild(p)}p.textContent="📴 Offline: learning still works, progress saves on this tablet"};
addEventListener("online",net);addEventListener("offline",net);if(!navigator.onLine)net();

/* Keep the screen awake while learning */
let lock=null;const wake=async()=>{try{if(kid!==null&&!document.hidden&&"wakeLock" in navigator&&!lock){lock=await navigator.wakeLock.request("screen");lock.addEventListener("release",()=>lock=null)}}catch(e){}};
document.addEventListener("visibilitychange",wake);setInterval(wake,10000);

/* Install as an app */
let deferred=null;addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferred=e});
const standalone=()=>matchMedia("(display-mode: standalone)").matches||navigator.standalone;
const _parent=parent;parent=function(){_parent();const box=$(".parent");if(!box)return;const r=document.createElement("div");r.className="prow";
  r.innerHTML=`<span><b>📲 Install as an app</b>: puts Pebble Island on the home screen, opens full screen with no browser bars, and works offline. ${standalone()?"<b>Already installed ✓</b>":""}</span><span style="display:flex;gap:6px;flex-wrap:wrap">${deferred&&!standalone()?`<button class="switch" id="instbtn">📲 Install</button>`:""}<button class="switch" id="fsbtn">⛶ Full screen</button></span>${!deferred&&!standalone()?`<small style="width:100%;color:var(--soft)">On Android Chrome: tap ⋮ then “Add to Home screen”. On iPad Safari: tap Share then “Add to Home Screen”.</small>`:""}`;
  box.appendChild(r);const ib=$("#instbtn");if(ib)ib.onclick=async()=>{deferred.prompt();await deferred.userChoice;deferred=null;parent()};
  $("#fsbtn").onclick=()=>{const d=document.documentElement;(document.fullscreenElement?document.exitFullscreen():d.requestFullscreen&&d.requestFullscreen({navigationUI:"hide"})).catch(()=>{})}};

/* New version available */
if("serviceWorker" in navigator){let had=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener("controllerchange",()=>{if(!had){had=true;return}if(window.toast)toast("✨","Pebble Island just updated","New things to discover","quest")})}
})();
