(function(){
const css=`.hub{max-width:1000px;margin:0 auto;padding:12px;color:#14262c}.hub .hc{background:#fff;border-radius:18px;padding:16px;margin:12px 0;box-shadow:0 2px 10px #0002}
.hub h3{margin:0 0 8px}.hub table{width:100%;border-collapse:collapse;font-size:15px}.hub td,.hub th{padding:6px;border-bottom:1px solid #dde;text-align:left}
.hub .tabs{display:flex;gap:6px;flex-wrap:wrap}.hub .tabs button{font:inherit;padding:10px 14px;border-radius:12px;border:2px solid #14262c;background:#fff;color:#14262c}.hub .tabs button.on{background:#14262c;color:#fff}
.hub .kpi{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px}.hub .kpi div{background:#eef6f7;border-radius:12px;padding:10px}.hub .kpi b{display:block;font-size:26px}
.hub .bar{height:12px;background:#dde;border-radius:6px;overflow:hidden}.hub .bar i{display:block;height:100%;background:#1f7a5a}
.hub .chips span{display:inline-block;background:#eef6f7;border-radius:10px;padding:4px 8px;margin:2px;font-size:14px}
@media print{.hub .tabs,.hub .noprint,#mascot,#bubble,.scene{display:none!important}.hub .hc{box-shadow:none;break-inside:avoid}body{background:#fff!important}}`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
const AREAS={English:["words","read","think"],Mathematics:["nums","pv","times","frac","shapes","time","money","data"],Science:["sci"],"HASS (History & Geography)":["geo","hist"],"Health & PE (wellbeing)":["feel"]};
const OFFLINE=["The Arts","Technologies","Languages","Science","HASS (History & Geography)"];
const IDEAS={English:"Read a picture book together daily; ask 'what happened first, next, last?' and 'how do you know?'",Mathematics:"Use real objects: coins at the shop, measuring cups when baking, clocks at transitions.",Science:"Nature walk: collect leaves, sort by shape/colour, predict what floats or sinks.","HASS (History & Geography)":"Draw a map of your street; talk about family history with photos.","The Arts":"Use the art print-offs; music & dance breaks; build with blocks and describe it.",Technologies:"Follow a recipe as an 'algorithm'; Block Builder planning: draw it first, then build.",Languages:"Learn 5 words in a language a family member speaks, e.g. greetings.","Health & PE (wellbeing)":"Movement breaks every 15 min; name feelings using the Feelings island."};
const fmt=ms=>{const m=Math.round(ms/60000);return m<60?m+" min":(m/60).toFixed(1)+" h"};
const day=d=>new Date(d).toLocaleDateString("en-AU",{weekday:"short",day:"numeric",month:"short"});
let tab="overview",who=0,data=null;
async function load(){let ev=(S.log||[]).slice();let src="this tablet";
  if(S.family&&window.PI){try{await PIflush();const since=new Date(Date.now()-90*864e5).toISOString();const rows=await PI.rpc("pi_events",{p_key:S.family,p_since:since});
    if(Array.isArray(rows)&&rows.length){const seen=new Set(ev.map(e=>e.cid));rows.forEach(r=>{const c=r.client_id||r.cid;if(!seen.has(c)){seen.add(c);ev.push({cid:c,kid:r.kid,kind:r.kind,world:r.world,level:r.level,ok:r.ok,ms:r.ms,data:r.data,device:r.device,at:r.at})}});src="all family tablets"}}catch(e){src="this tablet (cloud offline)"}}
  ev.sort((a,b)=>a.at<b.at?-1:1);return{ev,src}}
function sessions(ev,k){const a=ev.filter(e=>e.kid===k&&e.kind==="answer");const out=[];let cur=null;
  a.forEach(e=>{const t=+new Date(e.at);if(!cur||t-cur.end>10*60000){cur={start:t,end:t,n:0,ok:0,worlds:new Set()};out.push(cur)}cur.end=t;cur.n++;if(e.ok)cur.ok++;cur.worlds.add(e.world)});
  out.forEach(s=>s.dur=Math.max(60000,s.end-s.start+30000));return out}
function stats(ev,k){const a=ev.filter(e=>e.kid===k&&e.kind==="answer");const by={};
  a.forEach(e=>{const b=by[e.world]=by[e.world]||{n:0,ok:0,recent:[],ms:0,ch:0,chok:0,rv:0,rvok:0};b.n++;if(e.ok)b.ok++;b.ms+=e.ms||0;b.recent.push(e.ok?1:0);const tg=e.data&&e.data.tag;if(tg==="challenge"){b.ch++;if(e.ok)b.chok++}if(tg==="review"){b.rv++;if(e.ok)b.rvok++}});
  Object.values(by).forEach(b=>{b.recent=b.recent.slice(-20)});return by}
function acquired(ev,k){const p=S.progress[k]||{};const out=[];
  WORLDS.filter(w=>w.max>1&&CURR[w.id]).forEach(w=>{const best=Math.max((p[w.id]||{}).best||0,((p[w.id]||{}).lvl||1)-1);
    for(let l=1;l<=best;l++){const r=CURR[w.id][l-1];if(!r)continue;const lu=ev.find(e=>e.kid===k&&e.world===w.id&&(e.kind==="levelup"&&e.level===l+1||e.kind==="placement"&&e.data&&e.data.passed>=l));out.push({w,l,act:r[0],code:r[1],skill:r[2],at:lu?lu.at:null})}});return out}
function nextSteps(ev,k){const p=S.progress[k]||{};const by=stats(ev,k);const out=[];
  WORLDS.filter(w=>w.max>1&&CURR[w.id]).forEach(w=>{const pp=p[w.id]||{};const L=pp.lvl||1;const r=CURR[w.id][L-1];const b=by[w.id];
    const acc=b&&b.recent.length?b.recent.reduce((x,y)=>x+y,0)/b.recent.length:null;
    let note,pri;
    if(!pp.placed){note="Not started yet. Do the 2-minute check-up to find the starting level.";pri=2}
    else if(acc!==null&&acc<.6){note=`Finding this tricky (${Math.round(acc*100)}% recently). Practise offline with hands-on materials and the matching printable, then return.`;pri=0}
    else if(L>=w.max&&acc>=.8){note="Island mastered. Extend with real-world tasks and open questions.";pri=3}
    else{note=`Working on it${acc!==null?` (${Math.round(acc*100)}% recently)`:""}. Keep short daily sessions.`;pri=1}
    if(b&&b.ch>=3&&b.chok/b.ch>=.75&&L<w.max)note+=" Nailing challenge questions: ready to move up soon.";
    if(b&&b.rv>=3&&b.rvok/b.rv<.6)note+=" Review questions slipping: revisit the previous level.";
    out.push({w,L,r,note,pri})});return out.sort((a,b)=>a.pri-b.pri)}
function coverage(ev,k){const by=stats(ev,k);const since=Date.now()-7*864e5;const wk=ev.filter(e=>e.kid===k&&e.kind==="answer"&&+new Date(e.at)>since);
  return Object.entries(AREAS).map(([a,ws])=>({a,n:wk.filter(e=>ws.includes(e.world)).length,total:ws.reduce((s,w)=>s+((by[w]||{}).n||0),0)}))}
function view(){const {ev,src}=data;const k=who;const K=S.kids[k];const ss=sessions(ev,k);const by=stats(ev,k);const acq=acquired(ev,k);const ns=nextSteps(ev,k);
  const wk=ss.filter(s=>s.start>Date.now()-7*864e5);const tot=wk.reduce((a,s)=>a+s.dur,0);const ans=wk.reduce((a,s)=>a+s.n,0);const ok=wk.reduce((a,s)=>a+s.ok,0);
  const tabs=[["overview","📊 Overview"],["sessions","⏱️ Sessions"],["learning","📚 Learning"],["skills","🏅 Capabilities"],["next","➡️ Next steps"],["plan","🗓️ Home-ed plan"],["chat","💬 Chat log"],["report","🖨️ Report"]];
  let body="";
  if(tab==="overview"){const days=[...Array(7)].map((_,i)=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-6+i);const t=+d;return{d,m:ss.filter(s=>s.start>=t&&s.start<t+864e5).reduce((a,s)=>a+s.dur,0)}});const mx=Math.max(1,...days.map(x=>x.m));
    body=`<div class="hc"><h3>${K.face} ${K.name}: last 7 days</h3><div class="kpi"><div><b>${fmt(tot)}</b>learning time</div><div><b>${wk.length}</b>sessions</div><div><b>${ans}</b>questions</div><div><b>${ans?Math.round(ok/ans*100):0}%</b>right first try</div><div><b>${acq.length}</b>curriculum skills gained</div><div><b>${S.coins&&S.coins[k]||0}</b>coins</div></div></div>
    <div class="hc"><h3>Daily minutes</h3>${days.map(x=>`<div style="display:flex;gap:8px;align-items:center;margin:4px 0"><span style="width:110px">${day(x.d)}</span><div class="bar" style="flex:1"><i style="width:${x.m/mx*100}%"></i></div><span style="width:60px">${Math.round(x.m/60000)}m</span></div>`).join("")}</div>
    <div class="hc"><h3>Top priorities</h3><ul>${ns.slice(0,3).map(n=>`<li><b>${n.w.name}</b>: ${n.note}</li>`).join("")}</ul></div>`}
  if(tab==="sessions")body=`<div class="hc"><h3>Sessions</h3><p>A session = play with no more than a 10 minute gap.</p><table><tr><th>When</th><th>Length</th><th>Questions</th><th>First-try</th><th>Islands</th></tr>${ss.slice(-40).reverse().map(s=>`<tr><td>${day(s.start)} ${new Date(s.start).toLocaleTimeString("en-AU",{hour:"numeric",minute:"2-digit"})}</td><td>${fmt(s.dur)}</td><td>${s.n}</td><td>${Math.round(s.ok/s.n*100)}%</td><td>${[...s.worlds].map(w=>(WORLDS.find(x=>x.id===w)||{}).name||w).join(", ")}</td></tr>`).join("")||"<tr><td colspan=5>No sessions yet.</td></tr>"}</table></div>`;
  if(tab==="learning")body=`<div class="hc"><h3>Islands and levels</h3><table><tr><th>Island</th><th>Level</th><th>Now working on</th><th>Accuracy (last 20)</th><th>Avg time</th><th>Challenge ⭐</th></tr>${WORLDS.filter(w=>w.max>1).map(w=>{const p=(S.progress[k]||{})[w.id]||{};const b=by[w.id];const r=CURR[w.id]&&CURR[w.id][(p.lvl||1)-1];const acc=b&&b.recent.length?Math.round(b.recent.reduce((x,y)=>x+y,0)/b.recent.length*100):null;
    return`<tr><td>${w.name}</td><td>${p.placed?(p.lvl||1)+" / "+w.max:"not checked"}</td><td>${r?r[0]+` <small>(${r[1]})</small>`:""}</td><td>${acc===null?"—":`<div class="bar"><i style="width:${acc}%"></i></div>${acc}%`}</td><td>${b?Math.round(b.ms/b.n/1000)+"s":"—"}</td><td>${b&&b.ch?b.chok+"/"+b.ch:"—"}</td></tr>`}).join("")}</table>
    <p class="noprint">The app checks each island's starting level, moves up after a run of first-try answers, mixes in a harder ⭐ challenge and a 🔁 review question every round, and drops back after repeated misses.</p></div>`;
  if(tab==="skills")body=`<div class="hc"><h3>Acquired capabilities (Australian Curriculum v9)</h3><table><tr><th>Island</th><th>Skill</th><th>AC9 code</th><th>Thinking skill</th><th>Achieved</th></tr>${acq.map(a=>`<tr><td>${a.w.name}</td><td>${a.act}</td><td>${a.code}</td><td>${a.skill}</td><td>${a.at?day(a.at):"✓"}</td></tr>`).join("")||"<tr><td colspan=5>None yet: they appear as levels are passed.</td></tr>"}</table></div>`;
  if(tab==="next")body=`<div class="hc"><h3>Next steps</h3><table><tr><th>Island</th><th>Next target</th><th>Advice</th></tr>${ns.map(n=>`<tr><td>${n.w.name}</td><td>${n.r?n.r[0]+` <small>${n.r[1]}</small>`:""}</td><td>${n.note}</td></tr>`).join("")}</table><p>Printable sheets for each subject are in the Pebble Island Printables PDF.</p></div>`;
  if(tab==="plan"){const cov=coverage(ev,k);const pr=ns.filter(n=>n.pri<=1).slice(0,5);const dn=["Mon","Tue","Wed","Thu","Fri"];
    body=`<div class="hc"><h3>This week's coverage</h3><table><tr><th>Learning area</th><th>Questions this week</th><th>All time</th></tr>${cov.map(c=>`<tr><td>${c.a}</td><td>${c.n}</td><td>${c.total}</td></tr>`).join("")}${OFFLINE.filter(a=>!AREAS[a]).map(a=>`<tr><td>${a}</td><td colspan=2><i>Offline: see ideas below</i></td></tr>`).join("")}</table></div>
    <div class="hc"><h3>Suggested week (${K.name})</h3><p>${k===1?"Short bursts (10–15 min) with movement breaks between. Fast pace is on.":"Gentle sessions of 10 min, read-aloud on, celebrate effort."}</p><table><tr><th>Day</th><th>App (15–20 min)</th><th>Offline</th></tr>${dn.map((d,i)=>{const n=pr[i%Math.max(1,pr.length)];const a=OFFLINE[i];return`<tr><td>${d}</td><td>${n?n.w.name+": "+(n.r?n.r[0]:""):"Mixed island"}</td><td><b>${a}</b>: ${IDEAS[a]}</td></tr>`}).join("")}</table></div>
    <div class="hc"><h3>Ideas by learning area</h3><ul>${Object.entries(IDEAS).map(([a,t])=>`<li><b>${a}</b>: ${t}</li>`).join("")}</ul><p><small>The app covers English, Maths, Science, History, Geography and part of Health. Science and HASS still benefit from hands-on offline work. Keep a simple journal or photos of offline work for any home-education registration review. Check your state's requirements.</small></p></div>`}
  if(tab==="chat"){body=`<div class="hc"><h3>Chat between Ivy and Hayden</h3><div id="hchat">Loading…</div></div>`}
  if(tab==="report"){const p=S.progress[k]||{};body=`<div class="hc"><h2>Learning report: ${K.name}</h2><p>Generated ${new Date().toLocaleDateString("en-AU",{day:"numeric",month:"long",year:"numeric"})} · data from ${src}</p>
    <p><b>Last 7 days:</b> ${fmt(tot)} over ${wk.length} sessions, ${ans} questions, ${ans?Math.round(ok/ans*100):0}% right first try.</p>
    <h3>Current levels</h3><ul>${WORLDS.filter(w=>w.max>1).map(w=>{const q=p[w.id]||{};const r=CURR[w.id]&&CURR[w.id][(q.lvl||1)-1];return`<li>${w.name}: level ${q.lvl||1}/${w.max}${r?`, working on ${r[0]} (${r[1]})`:""}</li>`}).join("")}</ul>
    <h3>Capabilities achieved</h3><ul>${acq.map(a=>`<li>${a.act} (${a.code})</li>`).join("")||"<li>None yet</li>"}</ul>
    <h3>Next steps</h3><ul>${ns.slice(0,6).map(n=>`<li>${n.w.name}: ${n.note}</li>`).join("")}</ul>
    <h3>Parent notes</h3><div contenteditable="true" style="min-height:80px;border:1px dashed #889;border-radius:10px;padding:8px">Tap to add notes…</div>
    <div class="noprint" style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap"><button class="big" id="prt">🖨️ Print / save PDF</button><button class="big ghost" id="cpy">📋 Copy text</button></div></div>`}
  $("#app").innerHTML=`<div class="hub"><div class="top noprint"><button class="pill" id="hback">← Home</button><span class="pill">Data: ${src}</span></div><h2>👩 Audrey's Hub</h2>
   <div class="tabs noprint">${S.kids.map((x,i)=>`<button data-who="${i}" class="${i===who?"on":""}">${x.face} ${x.name}</button>`).join("")}</div>
   <div class="tabs noprint" style="margin-top:8px">${tabs.map(([t,n])=>`<button data-tab="${t}" class="${t===tab?"on":""}">${n}</button>`).join("")}</div>${body}</div>`;
  $("#hback").onclick=()=>{SFX.tap();kid=null;render()};
  $$("[data-who]").forEach(b=>b.onclick=()=>{who=+b.dataset.who;view()});$$("[data-tab]").forEach(b=>b.onclick=()=>{tab=b.dataset.tab;view()});
  if($("#prt"))$("#prt").onclick=()=>{try{print()}catch(e){}};
  if($("#cpy"))$("#cpy").onclick=()=>{const t=$(".hub .hc").innerText;navigator.clipboard&&navigator.clipboard.writeText(t).then(()=>$("#cpy").textContent="✓ Copied")};
  if(tab==="chat"){(async()=>{let ms=[];if(S.family){try{ms=(await PI.rpc("pi_messages",{p_key:S.family,p_after:0})).reverse().map(m=>({from:m.from_kid,t:m.body,at:m.created_at}))}catch(e){}}else ms=(S.chat||[]).map(m=>({from:m.from,t:m.t||m.text,at:m.at}));
    const el=$("#hchat");if(el)el.innerHTML=ms.length?`<table>${ms.slice(-100).map(m=>`<tr><td>${m.at?day(m.at)+" "+new Date(m.at).toLocaleTimeString("en-AU",{hour:"numeric",minute:"2-digit"}):""}</td><td>${(S.kids[m.from]||{}).name||"?"}</td><td>${String(m.t||"").replace(/</g,"&lt;")}</td></tr>`).join("")}</table>`:"No messages yet."})()}}
window.openHub=function(){const a=3+Math.floor(Math.random()*6),b=4+Math.floor(Math.random()*6);
  $("#app").innerHTML=`<div class="card done" style="margin-top:6vh"><div class="reward">🔒</div><h2>Grown-ups only</h2><p class="lede">What is ${a} × ${b}?</p><div class="chatin"><input id="gate" type="number" inputmode="numeric" aria-label="Answer"><button class="big" id="gok">Open</button></div><div class="rowbtns"><button class="big ghost" id="gx">Back</button></div></div>`;
  $("#gx").onclick=()=>render();const go=async()=>{if(+$("#gate").value!==a*b){$("#gate").value="";SFX.oops();return}$("#app").innerHTML=`<div class="card done"><h2>Loading Audrey's Hub…</h2></div>`;data=await load();view()};
  $("#gok").onclick=go;$("#gate").onkeydown=e=>{if(e.key==="Enter")go()};$("#gate").focus()};
})();
