(function(){
if(typeof S==="undefined"||!window.PEBBLE_QCAA_LESSONS||!window.PEBBLE_ADAPTIVE||!document.getElementById("app"))return;
const B=window.PEBBLE_QCAA_LESSONS,A=window.PEBBLE_ADAPTIVE;
const DAY=864e5;
const css=`.hub .tag{display:inline-block;padding:2px 8px;border-radius:6px;font-size:12px;background:#eef0f3;color:#1d2433;white-space:nowrap}
.hub .tag.strong{background:#dff3e8;color:#14532d}.hub .tag.growing,.hub .tag.learning{background:#e2eefc;color:#1e3a8a}.hub .tag.practice,.hub .tag.review{background:#fdf0d5;color:#7a4a00}.hub .tag.new{background:#eef0f3;color:#5b6576}
.hub .srcline{color:#5b6576;font-size:13px;margin:4px 0 0}.hub .sub{color:#5b6576;font-size:14px;margin:0 0 12px}
.hub .scroll{overflow-x:auto}.hub select{font:inherit;padding:6px;border-radius:8px}
.hub h4{margin:18px 0 6px}.hub .chips{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}
.hub .chip{min-height:44px;padding:8px 14px;border-radius:999px;border:2px solid #cfd6df;background:#fff;color:#1d2433;font:inherit;font-size:15px;cursor:pointer}.hub .chip.on{background:#206889;border-color:#206889;color:#fff}.hub .chip.dim{opacity:.5}
.hub .llist{display:grid;gap:8px}.hub .lrow{display:flex;gap:12px;flex-wrap:wrap;padding:10px 12px;border:1px solid #e1e5ea;border-radius:12px;background:#fff}.hub .lrow .lt{flex:1 1 220px;display:grid;gap:2px}.hub .lrow .ls{flex:1 1 220px;display:grid;gap:4px;justify-items:start}.hub small{color:#5b6576}
.hub .lgrid th,.hub .lgrid td{text-align:center;padding:6px}.hub .lgrid th:first-child{text-align:left}.hub .gcell{min-width:60px;min-height:44px;border:3px solid transparent;cursor:pointer;font:inherit}.hub .gcell.now{border-color:#1d2433}.hub .gx{color:#8b94a3}
.hub .lset{display:grid;gap:10px;margin-top:16px;padding-top:12px;border-top:1px solid #e1e5ea}`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

const AREAS={English:["words","read","think"],Mathematics:["nums","pv","times","frac","shapes","time","money","data"],Science:["sci"],"HASS (History & Geography)":["geo","hist"],"Health & PE (wellbeing)":["feel"]};
const LESSON_AREA={english:"English",maths:"Mathematics",science:"Science",hass:"HASS (History & Geography)",technologies:"Technologies"};
const OFFLINE=["The Arts","Technologies","Languages","Science","HASS (History & Geography)"];
const IDEAS={English:"Read a picture book together daily; ask 'what happened first, next, last?' and 'how do you know?'",Mathematics:"Use real objects: coins at the shop, measuring cups when baking, clocks at transitions.",Science:"Nature walk: collect leaves, sort by shape/colour, predict what floats or sinks.","HASS (History & Geography)":"Draw a map of your street; talk about family history with photos.","The Arts":"Use the art print-offs; music & dance breaks; build with blocks and describe it.",Technologies:"Follow a recipe as an 'algorithm'; Block Builder planning: draw it first, then build.",Languages:"Learn 5 words in a language a family member speaks, e.g. greetings.","Health & PE (wellbeing)":"Movement breaks every 15 min; name feelings using the Feelings island."};
const EXPLAIN={overview:"A summary of the last 7 days and what is most worth focusing on.",sessions:"Island sessions (gaps of more than 10 minutes start a new one) and each lesson practised in the Learning Path or Curiosity Lab.",learning:"Each island's level, accuracy and what your child is working on now.",lessons:"Maths, English, Science, HASS and Tech lessons: progress for every year at a glance, then a list you can filter by subject and year.",skills:"Curriculum skills earned by passing island levels, plus every lesson practised.",next:"What to focus on next, most urgent first, including lesson reviews that are due.",plan:"Learning areas covered this week, plus a suggested Monday to Friday plan that includes subjects the app doesn't cover.",chat:"Messages between Ivy and Hayden.",report:"A one-page summary you can print or save as a PDF: pick the period, see what is going well and what needs a hand."};
const TABS=[["overview","Overview"],["learning","Islands"],["lessons","Lessons"],["sessions","Sessions"],["next","Next steps"],["skills","Skills earned"],["plan","Home-ed plan"],["chat","Chat log"],["report","Report"]];
const NICE={maths:"Mathematics",english:"English",science:"Science",hass:"Our World (HASS)",technologies:"Tech & Design"};
const yrLabel=y=>+y===0?"Prep":"Year "+y;
const fmt=ms=>{const m=Math.round(ms/60000);return m<60?m+" min":(m/60).toFixed(1)+" h"};
const day=d=>new Date(d).toLocaleDateString("en-AU",{weekday:"short",day:"numeric",month:"short"});
const clock=d=>new Date(d).toLocaleTimeString("en-AU",{hour:"numeric",minute:"2-digit"});
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const num=v=>+v||0;
const ageOf=k=>num((S.kids[k]||{}).age)||7;
const defPathYear=k=>{const a=ageOf(k);return a>=10?5:a>=9?4:a>=8?3:a>=7?2:a>=6?1:0};
const defLabYear=k=>ageOf(k)>=9?5:2;

let tab="overview",who=0,M=null,EV=[],INFO={};

function rankOf(p){return[num(p.best),num(p.lvl),num(p.stars)]}
function beats(a,b){for(let i=0;i<3;i++){if(a[i]!==b[i])return a[i]>b[i]}return false}
function mergeSources(srcs){
  const m={progress:{},cp:{},prof:{},coins:{},pathYear:{},labYear:{},faces:{}};
  srcs.forEach(s=>{
    Object.keys(s.progress||{}).forEach(k=>{const dst=m.progress[k]=m.progress[k]||{};
      Object.keys(s.progress[k]||{}).forEach(w=>{const p=s.progress[k][w];if(!p||typeof p!=="object")return;if(!dst[w]||beats(rankOf(p),rankOf(dst[w])))dst[w]=p})});
    Object.keys(s.curriculumProgress||{}).forEach(k=>{const dst=m.cp[k]=m.cp[k]||{};
      Object.keys(s.curriculumProgress[k]||{}).forEach(key=>{const r=s.curriculumProgress[k][key]||{},o=dst[key];
        dst[key]=o?{...o,...r,done:!!(o.done||r.done),tries:Math.max(num(o.tries),num(r.tries))}:{...r}})});
    const pr=(s.curriculumAdaptive&&s.curriculumAdaptive.profiles)||{};
    Object.keys(pr).forEach(k=>{const dst=m.prof[k]=m.prof[k]||{};
      Object.keys(pr[k]||{}).forEach(key=>{const r=pr[k][key],o=dst[key];
        if(!r)return;if(!o||num(r.sessions)>num(o.sessions)||(num(r.sessions)===num(o.sessions)&&num(r.lastAt)>num(o.lastAt)))dst[key]=r})});
    const fc=(s.journey&&s.journey.faces)||{};
    Object.keys(fc).forEach(k=>{const dst=m.faces[k]=m.faces[k]||{};
      Object.keys(fc[k]||{}).forEach(key=>{const r=fc[k][key]||{},o=dst[key];
        dst[key]=o?{got:Math.max(num(o.got),num(r.got)),nearly:Math.max(num(o.nearly),num(r.nearly)),again:Math.max(num(o.again),num(r.again)),last:Math.max(num(o.last),num(r.last))}:{got:num(r.got),nearly:num(r.nearly),again:num(r.again),last:num(r.last)}})});
    Object.keys(s.coins||{}).forEach(k=>{m.coins[k]=Math.max(num(m.coins[k]),num(s.coins[k]))});
    Object.keys(s.pathwayYear||{}).forEach(k=>{if(m.pathYear[k]===undefined)m.pathYear[k]=s.pathwayYear[k]});
    Object.keys(s.curriculumYear||{}).forEach(k=>{if(m.labYear[k]===undefined)m.labYear[k]=s.curriculumYear[k]});
  });
  return m}

async function load(){
  let ev=(S.log||[]).slice(),srcs=[S],info={where:"this tablet",backups:0,newest:null,note:""};
  if(S.family&&window.PI){
    try{
      await PIflush();
      const since=new Date(Date.now()-120*DAY).toISOString();
      const rows=await PI.rpc("pi_events",{p_key:S.family,p_since:since});
      if(Array.isArray(rows)){
        const keyOf=e=>[e.kid,e.kind,e.world,e.level,+new Date(e.at)].join("|");
        const seen=new Set(ev.map(keyOf));const newest={};
        rows.forEach(r=>{
          if(r.kind==="backup"){if(r.data&&r.data.state){const d=r.device||"tablet";if(!newest[d]||+new Date(r.at)>+new Date(newest[d].at))newest[d]=r}return}
          const e={kid:r.kid,kind:r.kind,world:r.world,level:r.level,ok:r.ok,ms:r.ms,data:r.data,device:r.device,at:r.at};
          const k=keyOf(e);if(!seen.has(k)){seen.add(k);ev.push(e)}});
        const list=Object.values(newest).sort((a,b)=>+new Date(b.at)-+new Date(a.at));
        srcs=[S].concat(list.map(r=>r.data.state));
        info.backups=list.length;info.newest=list.length?list[0].at:null;info.where="all family tablets";
        if(!rows.length)info.note="Nothing from other tablets is in the cloud yet."}
    }catch(e){info.where="this tablet (cloud offline)"}
  }else info.note="No family code on this tablet, so only this tablet's data is shown.";
  ev.sort((a,b)=>+new Date(a.at)-+new Date(b.at));
  return{ev,m:mergeSources(srcs),info}}

function sessions(k){const a=EV.filter(e=>e.kid===k&&e.kind==="answer");const out=[];let cur=null;
  a.forEach(e=>{const t=+new Date(e.at);if(!cur||t-cur.end>10*60000){cur={start:t,end:t,n:0,ok:0,worlds:new Set()};out.push(cur)}cur.end=t;cur.n++;if(e.ok)cur.ok++;cur.worlds.add(e.world)});
  out.forEach(s=>s.dur=Math.max(60000,s.end-s.start+30000));return out}
function islandStats(k){const a=EV.filter(e=>e.kid===k&&e.kind==="answer");const by={};
  a.forEach(e=>{const b=by[e.world]=by[e.world]||{n:0,ok:0,recent:[],ms:0,ch:0,chok:0,rv:0,rvok:0};b.n++;if(e.ok)b.ok++;b.ms+=e.ms||0;b.recent.push(e.ok?1:0);const tg=e.data&&e.data.tag;if(tg==="challenge"){b.ch++;if(e.ok)b.chok++}if(tg==="review"){b.rv++;if(e.ok)b.rvok++}});
  Object.values(by).forEach(b=>{b.recent=b.recent.slice(-20)});return by}
function acquired(k){const p=M.progress[k]||{};const out=[];
  WORLDS.filter(w=>w.max>1&&CURR[w.id]).forEach(w=>{const best=Math.max(num((p[w.id]||{}).best),num((p[w.id]||{}).lvl||1)-1);
    for(let l=1;l<=best;l++){const r=CURR[w.id][l-1];if(!r)continue;const lu=EV.find(e=>e.kid===k&&e.world===w.id&&(e.kind==="levelup"&&e.level===l+1||e.kind==="placement"&&e.data&&e.data.passed>=l));out.push({w,l,act:r[0],code:r[1],skill:r[2],at:lu?lu.at:null})}});return out}
function islandNext(k){const p=M.progress[k]||{};const by=islandStats(k);const out=[];
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

function lessons(k){const prof=M.prof[k]||{},cp=M.cp[k]||{};const rows=[];
  Object.keys(B).forEach(y=>Object.keys(B[y]).forEach(area=>(B[y][area]||[]).forEach(les=>{
    const key=A.lessonKey(y,area,les.id),pr=cp[key]||{};let s=prof[key]||null;
    if(!s&&pr.done)s={stage:0,sessions:0,credited:0,firstTry:0,questions:0,nextDue:0,lastAt:null,history:[],legacy:true};
    const status=s?A.status(s):{kind:"new",label:"New"};
    rows.push({y:+y,area,les,key,s,pr,status,due:!!(s&&A.due(s)),touched:!!(s&&(s.sessions||s.legacy)),done:!!pr.done||!!(s&&s.sessions)})})));
  return rows}
const pathArea=a=>a==="maths"||a==="english";
const pathYear=k=>M.pathYear[k]!==undefined?+M.pathYear[k]:defPathYear(k);
const labYear=k=>M.labYear[k]!==undefined?+M.labYear[k]:defLabYear(k);
function lessonSessions(k){const out=[];
  lessons(k).forEach(r=>{if(!r.s)return;(r.s.history||[]).forEach(h=>out.push({at:h.at,r,n:num(h.attempted),ok:num(h.first)}))});
  return out.sort((a,b)=>b.at-a.at)}
const mins=r=>num(r.les.estimatedMinutes)||10;
function lessonNext(k){const rows=lessons(k);const py=pathYear(k),ly=labYear(k);
  const mine=rows.filter(r=>pathArea(r.area)?r.y===py:r.y===ly);const out=[];
  mine.filter(r=>r.due).forEach(r=>out.push({r,note:"Review due. A short practice now keeps it from fading.",pri:0}));
  mine.filter(r=>!r.touched).forEach(r=>out.push({r,note:"Not started yet.",pri:2}));
  mine.filter(r=>r.touched&&!r.due&&r.status.kind!=="strong").forEach(r=>out.push({r,note:"Building. "+A.dueText(r.s)+".",pri:1}));
  return out.sort((a,b)=>a.pri-b.pri)}

function feelings(k){const f=M.faces[k]||{};const by={};lessons(k).forEach(r=>{by[r.key]=r});
  return Object.entries(f).map(([key,e])=>({r:by[key],e,tot:num(e.got)+num(e.nearly)+num(e.again)})).filter(x=>x.r&&(num(x.e.again)||num(x.e.nearly)))
    .sort((a,b)=>num(b.e.again)-num(a.e.again)||num(b.e.nearly)-num(a.e.nearly)||num(b.e.last)-num(a.e.last))}
function feelSection(k){const rows=feelings(k);
  return `<div class="hc"><h3>Asked to see again</h3><p class="sub">After the practice questions, ${esc(S.kids[k].name)} taps how a lesson feels: Got it, Nearly or Show me again. Lessons with Show me again or Nearly are listed first. This is how it felt, not a score.</p>${rows.length?`<div class="scroll"><table><tr><th>Lesson</th><th>Show me again</th><th>Nearly</th><th>Got it</th><th>Last</th></tr>${rows.slice(0,15).map(x=>`<tr><td><b>${esc(x.r.les.icon||"")} ${esc(x.r.les.title)}</b><br><small>${esc(NICE[x.r.area]||x.r.area)} · ${yrLabel(x.r.y)} · ${esc(x.r.les.code||"")}</small></td><td>${num(x.e.again)}</td><td>${num(x.e.nearly)}</td><td>${num(x.e.got)}</td><td>${x.e.last?day(x.e.last):""}</td></tr>`).join("")}</table></div><p>Lessons asked for again more than once are good ones to do together, with real objects or a printable.</p>`:`<p class="sub">Nothing yet. This fills in as lessons are done.</p>`}</div>`}
function coverage(k){const by=islandStats(k);const since=Date.now()-7*DAY;
  const wk=EV.filter(e=>e.kid===k&&e.kind==="answer"&&+new Date(e.at)>since);
  const ls=lessonSessions(k).filter(x=>x.at>since);
  const rows=Object.entries(AREAS).map(([a,ws])=>({a,n:wk.filter(e=>ws.includes(e.world)).length+ls.filter(x=>LESSON_AREA[x.r.area]===a).reduce((t,x)=>t+x.n,0),
    total:ws.reduce((s,w)=>s+((by[w]||{}).n||0),0)+lessonSessions(k).filter(x=>LESSON_AREA[x.r.area]===a).reduce((t,x)=>t+x.n,0)}));
  const tech=ls.filter(x=>x.r.area==="technologies").reduce((t,x)=>t+x.n,0),techAll=lessonSessions(k).filter(x=>x.r.area==="technologies").reduce((t,x)=>t+x.n,0);
  rows.push({a:"Technologies (Curiosity Lab)",n:tech,total:techAll});return rows}

const tag=r=>`<span class="tag ${r.due?"review":r.touched?r.status.kind:"new"}">${r.due?"Review due":r.touched?esc(r.status.label):"Not started"}</span>`;
const SUBJ=[["all","All subjects"],["maths","Maths"],["english","English"],["science","Science"],["hass","HASS"],["technologies","Tech"]];
const ORDER=["maths","english","science","hass","technologies"];
const YEARS=[0,1,2,3,4,5,6];
let lf={subj:"all",yr:"now"},rng=30;
const nowYear=(k,area)=>pathArea(area)?pathYear(k):labYear(k);
const NOTE_Y="";

function lessonList(rows){
  return rows.length?`<div class="llist">${rows.map(r=>`<div class="lrow"><div class="lt"><b>${esc(r.les.icon||"")} ${esc(r.les.title)}</b><small>${esc(NICE[r.area]||r.area)} · ${yrLabel(r.y)} · ${esc(r.les.code||"")}</small></div><div class="ls">${tag(r)}<small>${r.s&&r.s.sessions?`Practised ${num(r.s.sessions)}×${r.s.lastAt?`, last ${day(r.s.lastAt)}`:""}. ${esc(A.dueText(r.s))}.`:r.touched?"Completed in an earlier version of the app.":"No practice yet."}</small></div></div>`).join("")}</div>`:`<p class="sub">Nothing to show.</p>`}

function lessonsSection(k){
  const all=lessons(k),py=pathYear(k),ly=labYear(k),nm=esc(S.kids[k].name);
  const grp=rows=>({n:rows.length,strong:rows.filter(r=>r.touched&&r.status.kind==="strong").length,due:rows.filter(r=>r.due).length,started:rows.filter(r=>r.touched).length});
  const pc=grp(all.filter(r=>pathArea(r.area)&&r.y===py)),lc=grp(all.filter(r=>!pathArea(r.area)&&r.y===ly));
  const dueTxt=g=>g.due?`, ${g.due} review${g.due===1?"":"s"} due`:"";
  const summary=`<p class="sub"><b>${nm}</b> is on <b>${yrLabel(py)} Maths and English</b>: ${pc.started} of ${pc.n} lessons started, ${pc.strong} strong${dueTxt(pc)}. <b>Year ${ly} Science, HASS and Tech</b>: ${lc.started} of ${lc.n} started, ${lc.strong} strong${dueTxt(lc)}.</p>`;
  const cell=(a,y)=>{const rs=all.filter(r=>r.area===a&&r.y===y);
    if(!rs.length)return`<td class="gx" title="No lessons built for this year yet">–</td>`;
    const st=rs.filter(r=>r.touched&&r.status.kind==="strong").length,du=rs.some(r=>r.due),tc=rs.some(r=>r.touched);
    const cls=du?"review":st===rs.length?"strong":tc?"growing":"new";
    return`<td><button class="gcell tag ${cls}${nowYear(k,a)===y?" now":""}" data-cell="${a}|${y}" aria-label="${esc(NICE[a])} ${yrLabel(y)}: ${st} of ${rs.length} strong${du?", review due":""}">${st}/${rs.length}${du?" ↻":""}</button></td>`};
  const grid=`<div class="scroll"><table class="lgrid"><tr><th></th>${YEARS.map(y=>`<th>${yrLabel(y)}</th>`).join("")}</tr>${ORDER.map(a=>`<tr><th>${esc(NICE[a])}</th>${YEARS.map(y=>cell(a,y)).join("")}</tr>`).join("")}</table></div>
    <p class="sub">Each box is lessons strong out of lessons available. A dash means the app has no lessons for that subject and year yet. ${NOTE_Y} The box with a dark outline is the year ${nm} sees now. ↻ means a review is due. Tap a box to list its lessons.</p>`;
  const yrOf=r=>lf.yr==="all"||(lf.yr==="now"?r.y===nowYear(k,r.area):r.y===+lf.yr);
  const rows=all.filter(r=>(lf.subj==="all"||r.area===lf.subj)&&yrOf(r)).sort((a,b)=>ORDER.indexOf(a.area)-ORDER.indexOf(b.area)||a.y-b.y);
  const emptyMsg=lf.subj!=="all"&&lf.yr!=="now"&&lf.yr!=="all"?`The app has no ${NICE[lf.subj]} lessons for ${yrLabel(+lf.yr)} yet.${pathArea(lf.subj)?"":" "+NOTE_Y}`:"No lessons match.";
  const chip=(g,v,l,on,dim)=>`<button class="chip${on?" on":""}${dim?" dim":""}" data-${g}="${v}" aria-pressed="${on}">${l}</button>`;
  const subjChips=SUBJ.map(([v,l])=>chip("fs",v,l,lf.subj===v)).join("");
  const yrChips=[["now","Current year"]].concat(YEARS.map(y=>[String(y),yrLabel(y)]),[["all","All years"]]).map(([v,l])=>chip("fy",v,l,String(lf.yr)===v,v!=="now"&&v!=="all"&&!all.some(r=>(lf.subj==="all"||r.area===lf.subj)&&r.y===+v))).join("");
  const yopt=(list,cur)=>(list.includes(cur)?list:list.concat(cur).sort((a,b)=>a-b)).map(y=>`<option value="${y}" ${y===cur?"selected":""}>${yrLabel(y)}</option>`).join("");
  const settings=`<div class="noprint lset"><label>Maths and English year for ${nm}: <select id="pathyr">${yopt(YEARS,py)}</select></label><label>Science, HASS and Tech year for ${nm}: <select id="labyr">${yopt(YEARS,ly)}</select></label><small>This changes what ${nm} sees on this tablet. To change it on a kid's own tablet, open this hub on that tablet.</small></div>`;
  return`<div class="hc" id="labsec"><h3>Lessons</h3>${summary}<h4>Progress by subject and year</h4>${grid}<h4>Lesson list</h4><div class="chips">${subjChips}</div><div class="chips">${yrChips}</div><div id="llist">${rows.length?lessonList(rows):`<p class="sub">${emptyMsg}</p>`}</div>${settings}</div>`}

function rangeStats(k,days){const since=days?Date.now()-days*DAY:0;const s=sessions(k).filter(x=>x.start>since),l=lessonSessions(k).filter(x=>x.at>since);
  const tot=s.reduce((a,x)=>a+x.dur,0)+l.reduce((a,x)=>a+mins(x.r)*60000,0),ans=s.reduce((a,x)=>a+x.n,0)+l.reduce((a,x)=>a+x.n,0),ok=s.reduce((a,x)=>a+x.ok,0)+l.reduce((a,x)=>a+x.ok,0);
  return{since,s,l,tot,ans,ok,pct:ans?Math.round(ok/ans*100):null}}

function view(){
  const k=who,K=S.kids[k],ss=sessions(k),by=islandStats(k),acq=acquired(k),ns=islandNext(k),all=lessons(k),ls=lessonSessions(k);
  const t7=Date.now()-7*DAY;const wk=ss.filter(s=>s.start>t7),lwk=ls.filter(x=>x.at>t7);
  const islandTime=wk.reduce((a,s)=>a+s.dur,0),lessonTime=lwk.reduce((a,x)=>a+mins(x.r)*60000,0),tot=islandTime+lessonTime;
  const ans=wk.reduce((a,s)=>a+s.n,0)+lwk.reduce((a,x)=>a+x.n,0),ok=wk.reduce((a,s)=>a+s.ok,0)+lwk.reduce((a,x)=>a+x.ok,0);
  const dueAll=all.filter(r=>r.due).length,lessonDone=all.filter(r=>r.done).length;
  const lnext=lessonNext(k);
  let body="";
  if(tab==="overview"){
    const days=[...Array(7)].map((_,i)=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-6+i);const t=+d;
      return{d,m:ss.filter(s=>s.start>=t&&s.start<t+DAY).reduce((a,s)=>a+s.dur,0)+ls.filter(x=>x.at>=t&&x.at<t+DAY).reduce((a,x)=>a+mins(x.r)*60000,0)}});
    const mx=Math.max(1,...days.map(x=>x.m));
    const top=ns.filter(n=>n.pri<=1).slice(0,2).map(n=>`<li><b>${esc(n.w.name)}</b>: ${esc(n.note)}</li>`).concat(lnext.filter(n=>n.pri===0).slice(0,2).map(n=>`<li><b>${esc(n.r.les.title)}</b> (${esc(NICE[n.r.area]||n.r.area)}): ${esc(n.note)}</li>`));
    body=`<div class="hc"><h3>${esc(K.face)} ${esc(K.name)}: last 7 days</h3><div class="kpi"><div><b>${fmt(tot)}</b>learning time</div><div><b>${wk.length}</b>island sessions</div><div><b>${lwk.length}</b>lessons practised</div><div><b>${ans}</b>questions</div><div><b>${ans?Math.round(ok/ans*100):0}%</b>right first try</div><div><b>${acq.length+lessonDone}</b>skills and lessons gained</div><div><b>${dueAll}</b>reviews due</div><div><b>${num(M.coins[k])}</b>coins</div></div></div>
    <div class="hc"><h3>Daily minutes</h3>${days.map(x=>`<div style="display:flex;gap:8px;align-items:center;margin:4px 0"><span style="width:110px">${day(x.d)}</span><div class="bar" style="flex:1"><i style="width:${x.m/mx*100}%"></i></div><span style="width:60px">${Math.round(x.m/60000)}m</span></div>`).join("")}<p class="srcline">Island time is measured. Lesson time uses each lesson's estimated length.</p></div>
    <div class="hc"><h3>Top priorities</h3><ul>${top.join("")||"<li>Nothing urgent. Keep up short daily sessions.</li>"}</ul></div>`}
  if(tab==="sessions")body=`<div class="hc"><h3>Island sessions</h3><div class="scroll"><table><tr><th>When</th><th>Length</th><th>Questions</th><th>First-try</th><th>Islands</th></tr>${ss.slice(-40).reverse().map(s=>`<tr><td>${day(s.start)} ${clock(s.start)}</td><td>${fmt(s.dur)}</td><td>${s.n}</td><td>${Math.round(s.ok/s.n*100)}%</td><td>${[...s.worlds].map(w=>esc((WORLDS.find(x=>x.id===w)||{}).name||w)).join(", ")}</td></tr>`).join("")||"<tr><td colspan=5>No island sessions yet.</td></tr>"}</table></div></div>
   <div class="hc"><h3>Lesson sessions</h3><div class="scroll"><table><tr><th>When</th><th>Lesson</th><th>Subject</th><th>Year</th><th>First-try</th></tr>${ls.slice(0,40).map(x=>`<tr><td>${day(x.at)} ${clock(x.at)}</td><td>${esc(x.r.les.title)}</td><td>${esc(NICE[x.r.area]||x.r.area)}</td><td>${yrLabel(x.r.y)}</td><td>${x.n?x.ok+" / "+x.n:"—"}</td></tr>`).join("")||"<tr><td colspan=5>No lesson sessions yet.</td></tr>"}</table></div></div>`;
  if(tab==="learning")body=`<div class="hc"><h3>Islands and levels</h3><div class="scroll"><table><tr><th>Island</th><th>Level</th><th>Now working on</th><th>Accuracy (last 20)</th><th>Avg time</th><th>Challenge</th></tr>${WORLDS.filter(w=>w.max>1).map(w=>{const p=(M.progress[k]||{})[w.id]||{};const b=by[w.id];const r=CURR[w.id]&&CURR[w.id][(p.lvl||1)-1];const acc=b&&b.recent.length?Math.round(b.recent.reduce((x,y)=>x+y,0)/b.recent.length*100):null;
    return`<tr><td>${esc(w.name)}</td><td>${p.placed?(p.lvl||1)+" / "+w.max:"not checked"}</td><td>${r?esc(r[0])+` <small>(${esc(r[1])})</small>`:""}</td><td>${acc===null?"—":`<div class="bar"><i style="width:${acc}%"></i></div>${acc}%`}</td><td>${b?Math.round(b.ms/b.n/1000)+"s":"—"}</td><td>${b&&b.ch?b.chok+"/"+b.ch:"—"}</td></tr>`}).join("")}</table></div>
    <p class="noprint explain">The app checks each island's starting level, moves up after a run of first-try answers, mixes in a harder challenge and a review question every round, and drops back after repeated misses.</p></div>`;
  if(tab==="lessons")body=lessonsSection(k);
  if(tab==="skills"){const done=all.filter(r=>r.done);
    body=`<div class="hc"><h3>Island skills (Australian Curriculum v9)</h3><div class="scroll"><table><tr><th>Island</th><th>Skill</th><th>AC9 code</th><th>Thinking skill</th><th>Achieved</th></tr>${acq.map(a=>`<tr><td>${esc(a.w.name)}</td><td>${esc(a.act)}</td><td>${esc(a.code)}</td><td>${esc(a.skill)}</td><td>${a.at?day(a.at):"✓"}</td></tr>`).join("")||"<tr><td colspan=5>None yet: they appear as levels are passed.</td></tr>"}</table></div></div>
    <div class="hc"><h3>Lessons practised (Learning Path and Curiosity Lab)</h3>${lessonList(done)}</div>`}
  if(tab==="next"){body=feelSection(who)+`<div class="hc"><h3>Islands</h3><div class="scroll"><table><tr><th>Island</th><th>Next target</th><th>Advice</th></tr>${ns.map(n=>`<tr><td>${esc(n.w.name)}</td><td>${n.r?esc(n.r[0])+` <small>${esc(n.r[1])}</small>`:""}</td><td>${esc(n.note)}</td></tr>`).join("")}</table></div><p>Printable sheets for each subject are in the Pebble Island Printables PDF.</p></div>
    <div class="hc"><h3>Lessons: ${yrLabel(pathYear(k))} Maths and English, Year ${labYear(k)} Lab</h3><div class="scroll"><table><tr><th>Lesson</th><th>Subject</th><th>AC9 code</th><th>Advice</th></tr>${lnext.map(n=>`<tr><td>${esc(n.r.les.icon||"")} ${esc(n.r.les.title)}</td><td>${esc(NICE[n.r.area]||n.r.area)}</td><td>${esc(n.r.les.code||"")}</td><td>${esc(n.note)}</td></tr>`).join("")||"<tr><td colspan=4>All lessons at this level are strong.</td></tr>"}</table></div></div>`}
  if(tab==="plan"){const cov=coverage(k);const pr=ns.filter(n=>n.pri<=1).slice(0,5);const dn=["Mon","Tue","Wed","Thu","Fri"];const dueFirst=lnext.filter(n=>n.pri===0);
    body=`<div class="hc"><h3>This week's coverage</h3><div class="scroll"><table><tr><th>Learning area</th><th>Questions this week</th><th>All time</th></tr>${cov.map(c=>`<tr><td>${esc(c.a)}</td><td>${c.n}</td><td>${c.total}</td></tr>`).join("")}<tr><td>The Arts</td><td colspan=2><i>Offline: see ideas below</i></td></tr><tr><td>Languages</td><td colspan=2><i>Offline: see ideas below</i></td></tr></table></div></div>
    <div class="hc"><h3>Suggested week (${esc(K.name)})</h3><p>${k===1?"Short bursts (10–15 min) with movement breaks between. Fast pace is on.":"Gentle sessions of 10 min, read-aloud on, celebrate effort."}</p><div class="scroll"><table><tr><th>Day</th><th>App (15–20 min)</th><th>Offline</th></tr>${dn.map((d,i)=>{const n=pr[i%Math.max(1,pr.length)];const lr=dueFirst[i];const a=OFFLINE[i];const app=lr?`Review: ${lr.r.les.title}`:n?n.w.name+": "+(n.r?n.r[0]:""):"Mixed island";return`<tr><td>${d}</td><td>${esc(app)}</td><td><b>${esc(a)}</b>: ${esc(IDEAS[a])}</td></tr>`}).join("")}</table></div></div>
    <div class="hc"><h3>Ideas by learning area</h3><ul>${Object.entries(IDEAS).map(([a,t])=>`<li><b>${esc(a)}</b>: ${esc(t)}</li>`).join("")}</ul><p><small>The app covers English, Maths, Science, History, Geography, part of Health and Year 2 and 5 Technologies. Hands-on offline work still helps in every area. Keep a simple journal or photos of offline work for any home-education registration review. Check your state's requirements.</small></p></div>`}
  if(tab==="chat")body=`<div class="hc"><h3>Chat between Ivy and Hayden</h3><div id="hchat">Loading…</div></div>`;
  if(tab==="report"){const p=M.progress[k]||{};const R=rangeStats(k,rng);const rl=rng?`last ${rng} days`:"all time";
    const lim=a=>a.slice(0,8).map(t=>`<li>${esc(t)}</li>`).join("")+(a.length>8?`<li>…and ${a.length-8} more</li>`:"")||"<li>Nothing yet.</li>";
    const good=[],help=[];
    WORLDS.filter(w=>w.max>1).forEach(w=>{const b=by[w.id];if(!b||b.recent.length<5)return;const a=b.recent.reduce((x,y)=>x+y,0)/b.recent.length,q=p[w.id]||{};
      const t=`${w.name}: ${Math.round(a*100)}% right first try recently (level ${q.lvl||1} of ${w.max})`;if(a>=.8)good.push(t);else if(a<.6)help.push(t)});
    all.filter(r=>r.touched&&!r.due&&r.status.kind==="strong").forEach(r=>good.push(`${r.les.title} (${NICE[r.area]||r.area}, ${yrLabel(r.y)}) is strong`));
    all.filter(r=>r.due).forEach(r=>help.push(`${r.les.title} (${NICE[r.area]||r.area}, ${yrLabel(r.y)}): review due`));
    const subj=ORDER.map(a=>{const y=nowYear(k,a),rs=all.filter(r=>r.area===a&&r.y===y);return`<li>${esc(NICE[a])}, ${yrLabel(y)}: ${rs.filter(r=>r.touched&&r.status.kind==="strong").length} of ${rs.length} lessons strong, ${rs.filter(r=>r.touched).length} started</li>`}).join("");
    const isl=WORLDS.filter(w=>w.max>1&&(p[w.id]||{}).placed).map(w=>{const q=p[w.id],r=CURR[w.id]&&CURR[w.id][(q.lvl||1)-1];return`<li>${esc(w.name)}: level ${q.lvl||1} of ${w.max}${r?`, working on ${esc(r[0])} (${esc(r[1])})`:""}</li>`}).join("")||"<li>No island check-ups done yet.</li>";
    const skl=acq.filter(a=>!rng||(a.at&&+new Date(a.at)>R.since));
    const rchip=(v,l)=>`<button class="chip${rng===v?" on":""}" data-rng="${v}" aria-pressed="${rng===v}">${l}</button>`;
    body=`<div class="hc" id="rep"><div class="noprint"><div class="chips">${rchip(7,"Last 7 days")}${rchip(30,"Last 30 days")}${rchip(0,"All time")}</div></div>
    <h2>Learning report: ${esc(K.name)}</h2><p class="sub">${esc(new Date().toLocaleDateString("en-AU",{day:"numeric",month:"long",year:"numeric"}))} · covering ${rl} · data from ${esc(INFO.where)}</p>
    <h3>At a glance</h3><p>${R.ans?`${fmt(R.tot)} of learning across ${R.s.length} island session${R.s.length===1?"":"s"} and ${R.l.length} lesson session${R.l.length===1?"":"s"}. ${R.ans} questions answered, ${R.pct}% right first try.`:`No learning recorded in this period.`}</p>
    <h3>Going well</h3><ul>${lim(good)}</ul>
    <h3>Needs a hand</h3><ul>${lim(help)}</ul>
    <h3>Where ${esc(K.name)} is now</h3><ul>${subj}</ul><ul>${isl}</ul>
    <h3>Island skills achieved ${rng?`(${rl})`:"(so far)"}</h3><ul>${lim(skl.map(a=>`${a.act} (${a.code})`))}</ul>
    <h3>Parent notes</h3><div contenteditable="true" style="min-height:80px;border:1px dashed #889;border-radius:10px;padding:8px">Tap to add notes…</div>
    <div class="noprint" style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap"><button class="big" id="prt">🖨️ Print / save PDF</button><button class="big ghost" id="cpy">📋 Copy text</button></div></div>`}
  const srcline=`Data: ${esc(INFO.where)}${INFO.backups?` · merged with the latest backup from ${INFO.backups} tablet${INFO.backups===1?"":"s"} (newest ${day(INFO.newest)} ${clock(INFO.newest)})`:""}${INFO.note?` · ${esc(INFO.note)}`:""}`;
  document.body.classList.add("adult");
  $("#app").innerHTML=`<div class="hub" data-tidy="1"><div class="top noprint"><button class="pill" id="hback">← Home</button><button class="pill" id="hrefresh">Refresh</button><button class="pill" id="hpw">Change password</button></div><h2>Audrey's Hub</h2><p class="srcline noprint">${srcline}</p>
   <div class="tabs kids noprint">${S.kids.map((x,i)=>`<button data-who="${i}" class="${i===who?"on":""}">${esc(x.face)} ${esc(x.name)}</button>`).join("")}</div>
   <div class="tabs noprint">${TABS.map(([t,n])=>`<button data-tab="${t}" class="${t===tab?"on":""}">${n}</button>`).join("")}</div><p class="explain noprint">${EXPLAIN[tab]}</p>${body}${tab==="lessons"?"":'<div id="labsec" hidden></div>'}</div>`;
  $("#hback").onclick=()=>{try{typeof SFX!=="undefined"&&SFX.tap()}catch(e){}kid=null;render()};
  $("#hpw").onclick=()=>window.PEBBLE_HUB_PW.change();
  $("#hrefresh").onclick=async()=>{$("#hrefresh").textContent="Refreshing…";const d=await load();EV=d.ev;M=d.m;INFO=d.info;view()};
  $$("[data-who]").forEach(b=>b.onclick=()=>{who=+b.dataset.who;view()});$$("[data-tab]").forEach(b=>b.onclick=()=>{tab=b.dataset.tab;view()});
  if($("#prt"))$("#prt").onclick=()=>{try{print()}catch(e){}};
  if($("#cpy"))$("#cpy").onclick=()=>{const t=($("#rep")||$(".hub .hc")).innerText;navigator.clipboard&&navigator.clipboard.writeText(t).then(()=>$("#cpy").textContent="✓ Copied")};
  const sel=$("#labyr");if(sel)sel.onchange=e=>{S.curriculumYear=S.curriculumYear||{};S.curriculumYear[k]=+e.target.value;M.labYear[k]=+e.target.value;save();view()};
  const psel=$("#pathyr");if(psel)psel.onchange=e=>{S.pathwayYear=S.pathwayYear||{};S.pathwayYear[k]=+e.target.value;M.pathYear[k]=+e.target.value;save();view()};
  $$("[data-fs]").forEach(b=>b.onclick=()=>{lf.subj=b.dataset.fs;view()});$$("[data-fy]").forEach(b=>b.onclick=()=>{lf.yr=b.dataset.fy;view()});
  $$("[data-rng]").forEach(b=>b.onclick=()=>{rng=+b.dataset.rng;view()});
  $$("[data-cell]").forEach(b=>b.onclick=()=>{const c=b.dataset.cell.split("|");lf.subj=c[0];lf.yr=c[1];view();const el=$("#llist");try{el&&el.scrollIntoView({block:"center"})}catch(e){}});
  if(tab==="chat"){(async()=>{let ms=[];if(S.family){try{ms=(await PI.rpc("pi_messages",{p_key:S.family,p_after:0})).reverse().map(m=>({from:m.from_kid,t:m.body,at:m.created_at}))}catch(e){}}else ms=(S.chat||[]).map(m=>({from:m.from,t:m.t||m.text,at:m.at}));
    const el=$("#hchat");if(el)el.innerHTML=ms.length?`<table>${ms.slice(-100).map(m=>`<tr><td>${m.at?day(m.at)+" "+clock(m.at):""}</td><td>${esc((S.kids[m.from]||{}).name||"?")}</td><td>${esc(m.t||"")}</td></tr>`).join("")}</table>`:"No messages yet."})()}}

async function pwHash(v){v="pi-hub:"+v.trim();try{const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(v));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}catch(e){let h=5381;for(const c of v)h=(h*33^c.charCodeAt(0))>>>0;return"d"+h.toString(16)}}
function hubSet(){S.settings=S.settings||{};return S.settings}
function pwSetup(next,msg){
  $("#app").innerHTML=`<div class="pwgate"><h2>Choose a hub password</h2><p>${msg||"Pick a new password for Audrey's Hub on this tablet. At least 6 letters or numbers."}</p><input id="pw1" type="password" autocomplete="new-password" aria-label="New password" placeholder="New password"><input id="pw2" type="password" autocomplete="new-password" aria-label="Type it again" placeholder="Type it again" style="margin-top:8px"><div class="err" id="pwerr"></div><div class="row"><button class="ghost" id="pwx">Back</button><button id="pwok">Save</button></div></div>`;
  const ok=async()=>{const a=$("#pw1").value.trim(),b=$("#pw2").value.trim();
    if(a.length<6){$("#pwerr").textContent="Use at least 6 letters or numbers.";return}
    if(a.toLowerCase()==="password"){$("#pwerr").textContent="Pick something other than \"password\".";return}
    if(a!==b){$("#pwerr").textContent="Those don't match. Try again.";$("#pw2").value="";return}
    hubSet().hubHash=await pwHash(a);save();next()};
  $("#pwok").onclick=ok;$("#pw2").onkeydown=e=>{if(e.key==="Enter")ok()};$("#pwx").onclick=()=>{document.body.classList.remove("adult");render()};setTimeout(()=>$("#pw1")&&$("#pw1").focus(),50)}
async function hubOpen(){
  $("#app").innerHTML=`<div class="pwgate"><h2>Loading Audrey's Hub…</h2><p>Collecting progress from every tablet.</p></div>`;
  try{const d=await load();EV=d.ev;M=d.m;INFO=d.info;who=Math.min(who,S.kids.length-1);view()}
  catch(e){$("#app").innerHTML=`<div class="pwgate"><h2>The hub couldn't load</h2><p>${esc(e&&e.message||e)}</p><div class="row"><button id="pwback">Back</button></div></div>`;$("#pwback").onclick=()=>{kid=null;render()}}}
window.PEBBLE_HUB_PW={change:()=>pwSetup(hubOpen,"Pick a new password for Audrey's Hub on this tablet.")};
window.openHub=function(){document.body.classList.add("adult");
  const has=!!hubSet().hubHash;
  $("#app").innerHTML=`<div class="pwgate"><h2>Audrey's Hub</h2><p>Enter the password to see learning reports.</p><input id="pw" type="password" autocomplete="off" aria-label="Password" placeholder="Password"><div class="err" id="pwerr"></div><div class="row"><button class="ghost" id="pwx">Back</button><button id="pwok">Open</button></div>${has?`<p style="margin-top:14px"><button class="ghost" id="pwforgot">Forgot password?</button></p>`:""}</div>`;
  const go=async()=>{const v=$("#pw").value,h=hubSet().hubHash;
    const good=h?(await pwHash(v))===h:v.trim().toLowerCase()==="password";
    if(!good){$("#pwerr").textContent="That's not right. Try again.";$("#pw").value="";return}
    if(!h){pwSetup(hubOpen);return}
    hubOpen()};
  $("#pwok").onclick=go;$("#pw").onkeydown=e=>{if(e.key==="Enter")go()};$("#pwx").onclick=()=>{document.body.classList.remove("adult");render()};
  const f=$("#pwforgot");if(f)f.onclick=()=>{
    if(!S.family){$("#pwerr").textContent="Restore a backup from Grown-ups, or ask KT to reset it.";return}
    $("#app").innerHTML=`<div class="pwgate"><h2>Reset the hub password</h2><p>Type this tablet's family code to choose a new password.</p><input id="fc" type="password" autocomplete="off" aria-label="Family code" placeholder="Family code"><div class="err" id="pwerr"></div><div class="row"><button class="ghost" id="pwx">Back</button><button id="pwok">Next</button></div></div>`;
    const n=()=>{if($("#fc").value.trim()!==String(S.family).trim()){$("#pwerr").textContent="That's not the family code.";return}pwSetup(hubOpen)};
    $("#pwok").onclick=n;$("#fc").onkeydown=e=>{if(e.key==="Enter")n()};$("#pwx").onclick=()=>window.openHub()};
  setTimeout(()=>$("#pw")&&$("#pw").focus(),50)};
})();
