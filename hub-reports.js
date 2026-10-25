/* Audrey's Hub: Progress dashboard and Queensland home-education report builder. Claude-owned. Load after hub-plus.js. */
(function(){
"use strict";
const X=window.PEBBLE_HUB_EXT,H=window.PEBBLE_HUB_API;
if(!X||!H||typeof S==="undefined")return;
const DAY=864e5,esc=H.esc,yrLabel=H.yrLabel;
const num=v=>+v||0;
const AC=["English","Mathematics","Science","HASS","The Arts","Technologies","HPE","Languages"];
const AC_LONG={HASS:"Humanities and Social Sciences (HASS)",HPE:"Health and Physical Education (HPE)"};
const COL={English:"#2f6fb0",Mathematics:"#c2571a",Science:"#2a8a5a",HASS:"#8a5aa8",Technologies:"#9a7a10",HPE:"#b0456b"};
const ISL={words:"English",read:"English",think:"English",nums:"Mathematics",pv:"Mathematics",times:"Mathematics",frac:"Mathematics",shapes:"Mathematics",time:"Mathematics",money:"Mathematics",data:"Mathematics",sci:"Science",geo:"HASS",hist:"HASS",feel:"HPE"};
const LES={english:"English",maths:"Mathematics",science:"Science",hass:"HASS",technologies:"Technologies"};
const BB={maths:"Mathematics",english:"English"};
const FORM_URL="https://ppr.qed.qld.gov.au/attachment/reporting-for-registration-for-home-education.docx";
const PAGE_URL="https://education.qld.gov.au/schools-and-educators/other-education/Pages/reporting.aspx";
const QHE_EMAIL="homeeducation@qed.qld.gov.au";
const dfmt=t=>new Date(t).toLocaleDateString("en-AU",{day:"numeric",month:"short",year:"numeric"});
const dshort=t=>new Date(t).toLocaleDateString("en-AU",{day:"numeric",month:"short"});
const iso=t=>{const d=new Date(t);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
const dayStart=t=>{const d=new Date(t);d.setHours(0,0,0,0);return+d};
const parseISO=s=>{const m=/^(\d{4})-(\d\d)-(\d\d)$/.exec(s||"");return m?+new Date(+m[1],+m[2]-1,+m[3]):null};
const addMonths=(t,n)=>{const d=new Date(t);d.setMonth(d.getMonth()+n);return+d};
const pct=(ok,n)=>n?Math.round(ok/n*100):null;
const hrs=ms=>{const m=Math.round(ms/60000);return m<60?m+" min":(m/60).toFixed(1)+" h"};
const nm=k=>(S.kids[k]||{}).name||"Child";

const css=`.hub .hrx .kpi div small{display:block;color:#5b6576;font-size:12px}
.hub .hrx svg{width:100%;height:auto;display:block}.hub .hrx .lg{display:flex;flex-wrap:wrap;gap:10px;font-size:13px;margin:6px 0}.hub .hrx .lg i{display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:4px;vertical-align:-1px}
.hub .hrx .ab{display:grid;grid-template-columns:minmax(90px,150px) 1fr 52px;gap:8px;align-items:center;margin:6px 0}
.hub .hrx textarea,.hub .hrx input[type=text],.hub .hrx input[type=date],.hub .hrx select{font:inherit;font-size:16px;width:100%;box-sizing:border-box;padding:8px;border:1px solid #b9c2cc;border-radius:10px;background:#fff;color:#14262c}
.hub .hrx textarea{min-height:96px;resize:vertical}.hub .hrx label.f{display:grid;gap:4px;margin:10px 0;font-weight:600}.hub .hrx label.f small{font-weight:400}
.hub .hrx .grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}
.hub .hrx .banner,.hub .qbanner{background:#fff4d6;border:2px solid #e0b44a;color:#4a3300;border-radius:14px;padding:12px 14px;margin:10px 0}
.hub .qbanner.due{background:#fde3e1;border-color:#d06055;color:#5a1610}
.hub .hrx .card2{border:1px solid #d5dbe2;border-radius:12px;padding:10px 12px;margin:8px 0}
.hub .hrx .applabel{display:inline-block;background:#e2eefc;color:#1e3a8a;border-radius:6px;padding:2px 8px;font-size:12px;font-weight:700}
.hub .hrx .thumbs img{max-width:160px;max-height:160px;border-radius:8px;border:1px solid #ccd}
.hub .hrx .btns{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}.hub .hrx .btns button,.hub .hrx .btn{min-height:44px;padding:8px 14px;border-radius:12px;border:2px solid #14262c;background:#fff;color:#14262c;font:inherit;cursor:pointer}
.hub .hrx .btns button.pri{background:#14262c;color:#fff}.hub .hrx .warn{color:#7a2a00}
.hub .hrx .radios{display:flex;flex-wrap:wrap;gap:8px}.hub .hrx .radios label{display:flex;gap:6px;align-items:center;min-height:44px;padding:4px 12px;border:1px solid #b9c2cc;border-radius:10px}
@media (max-width:480px){.hub .hrx .ab{grid-template-columns:90px 1fr 44px}.hub table{font-size:13px}}
@media (prefers-color-scheme:dark){.hub .hc.hrx{background:#18222b;color:#e6edf2}.hub .hrx td,.hub .hrx th{border-color:#34424f}.hub .hrx .kpi div{background:#22303b}.hub .hrx small,.hub .hrx .sub,.hub .hrx .kpi div small{color:#a9b6c2}
.hub .hrx textarea,.hub .hrx input[type=text],.hub .hrx input[type=date],.hub .hrx select{background:#0f171e;color:#e6edf2;border-color:#3f4f5c}.hub .hrx .card2{border-color:#3f4f5c}
.hub .hrx .btns button,.hub .hrx .btn{background:#22303b;color:#e6edf2;border-color:#9fb0bf}.hub .hrx .btns button.pri{background:#e6edf2;color:#14262c}.hub .hrx .chip{background:#22303b;color:#e6edf2}.hub .hrx .chip.on{background:#4aa3c9;color:#0b1a22}
.hub .hrx svg text{fill:#c9d4dd}.hub .hrx svg .ax{stroke:#3f4f5c}.hub .hrx .warn{color:#ffb38a}}
#qldprint{display:none}
@media print{body.qld-printing>*:not(#qldprint){display:none!important}body.qld-printing #qldprint{display:block;color:#000;background:#fff;font:11pt/1.4 Calibri,Arial,sans-serif}
#qldprint h1{font-size:20pt}#qldprint h2{font-size:15pt;break-before:page}#qldprint h2.nb{break-before:auto}#qldprint h3{font-size:12pt;break-after:avoid}
#qldprint table{border-collapse:collapse;width:100%;margin:6px 0;break-inside:avoid}#qldprint td,#qldprint th{border:1px solid #777;padding:3px 5px;font-size:9.5pt;text-align:left;vertical-align:top}#qldprint th{background:#eee}
#qldprint img{max-width:100%;max-height:9cm}#qldprint .note{font-style:italic;color:#333}#qldprint p{white-space:pre-wrap;margin:4px 0}}`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

/* ---------- topic lookup ---------- */
let LMAP=null,LMAPK=null;
function lessonMap(k){if(LMAPK===k&&LMAP)return LMAP;LMAP={};try{H.lessons(k).forEach(r=>{LMAP[r.key]=r})}catch(e){}LMAPK=k;return LMAP}
function codes(s){return(String(s||"").match(/AC9[A-Z0-9]+/g)||[]).filter((v,i,a)=>a.indexOf(v)===i)}
function islandTopic(w,l){const row=typeof CURR!=="undefined"&&CURR[w]&&CURR[w][Math.max(0,num(l||1)-1)];const W=(typeof WORLDS!=="undefined"&&WORLDS.find(x=>x.id===w))||{name:w};
  return{key:"isl:"+w+":"+num(l||1),area:ISL[w]||null,title:row?row[0]:W.name,place:W.name+" level "+num(l||1),codes:row?codes(row[1]):[],yearHint:row?row[1]:""}}
function lessonTopic(k,key){const r=lessonMap(k)[key];if(!r)return null;return{key:"les:"+key,area:LES[r.area]||null,title:r.les.title,place:yrLabel(r.y)+" lesson",codes:codes(r.les.code),r}}
function boostTopic(id,L){const SK=window.PEBBLE_BOOST&&PEBBLE_BOOST.SK;const s=SK&&SK[id];return{key:"bb:"+id+":"+num(L),area:s?BB[s.area]:null,title:(s?s.name:id)+" (level "+num(L)+")",place:"Brain Boost",codes:[]}}

/* ---------- records ---------- */
function records(k){
  const {EV,M}=H.state();const out=[];
  EV.forEach(e=>{if(e.kid!==k)return;const at=+new Date(e.at);
    if(e.kind==="answer"&&ISL[e.world]){out.push({at,n:1,ok:e.ok?1:0,src:"Island",t:islandTopic(e.world,e.level),ms:num(e.ms)})}
    else if(e.kind==="boost"){out.push({at,n:1,ok:e.ok?1:0,src:"Brain Boost",t:boostTopic(e.world,e.level),ms:num(e.ms)})}});
  H.lessons(k).forEach(r=>{if(!r.s)return;const t=lessonTopic(k,r.key);if(!t)return;(r.s.history||[]).forEach(h=>{if(!h.at)return;out.push({at:+h.at,n:num(h.attempted),ok:num(h.first),src:"Lesson",t,lessonMs:H.mins(r)*60000})})});
  const bl=(S.boost&&S.boost[k]&&S.boost[k].log)||[];const firstB=Math.min(...out.filter(x=>x.src==="Brain Boost").map(x=>x.at),Infinity);
  bl.forEach(l=>{if(l.at&&l.at<firstB)out.push({at:+l.at,n:num(l.n),ok:num(l.ok),src:"Brain Boost",t:{key:"bb:mixed",area:null,title:"Brain Boost (mixed maths and English)",place:"Brain Boost",codes:[]}})});
  return out.sort((a,b)=>a.at-b.at)}
function helpEvents(k,from,to){const {EV}=H.state();return EV.filter(e=>e.kid===k&&["teach","reteach","showme_help","showme_step","face"].includes(e.kind)).map(e=>({...e,t:+new Date(e.at)})).filter(e=>e.t>=from&&e.t<=to)}

function stats(k,from,to){
  const all=records(k),R=all.filter(r=>r.at>=from&&r.at<=to);
  const sess=[];let cur=null;
  R.forEach(r=>{if(!cur||r.at-cur.end>10*60000){cur={start:r.at,end:r.at,extra:0};sess.push(cur)}cur.end=Math.max(cur.end,r.at);if(r.lessonMs)cur.extra+=r.lessonMs});
  const ms=sess.reduce((a,s)=>a+Math.max(60000,s.end-s.start+30000)+s.extra,0);
  const days=new Set(R.map(r=>dayStart(r.at)));
  const allDays=new Set(all.map(r=>dayStart(r.at)));let streak=0;let d=dayStart(Date.now());if(!allDays.has(d))d-=DAY;while(allDays.has(d)){streak++;d=dayStart(d-DAY/2)}
  const areas={};
  R.forEach(r=>{const a=r.t.area;if(!a||!r.n)return;const A=areas[a]=areas[a]||{n:0,ok:0,topics:{},lessons:new Set(),srcs:new Set(),first:r.at,last:r.at};
    A.n+=r.n;A.ok+=r.ok;A.srcs.add(r.src);A.last=r.at;if(r.src==="Lesson")A.lessons.add(r.t.key);
    const T=A.topics[r.t.key]=A.topics[r.t.key]||{t:r.t,n:0,ok:0,days:{}};T.n+=r.n;T.ok+=r.ok;const dd=dayStart(r.at);const D=T.days[dd]=T.days[dd]||{at:r.at,n:0,ok:0};D.n+=r.n;D.ok+=r.ok});
  Object.values(areas).forEach(A=>Object.values(A.topics).forEach(T=>{const ds=Object.keys(T.days).sort((a,b)=>a-b);T.first=T.days[ds[0]];T.latest=T.days[ds[ds.length-1]];T.sessions=ds.length}));
  const {EV}=H.state();
  const lvl=EV.filter(e=>e.kid===k&&e.kind==="levelup"&&+new Date(e.at)>=from&&+new Date(e.at)<=to);
  lvl.forEach(e=>{const a=ISL[e.world];if(a&&areas[a])areas[a].levelups=(areas[a].levelups||0)+1});
  const strong=H.lessons(k).filter(r=>r.touched&&r.status&&r.status.kind==="strong");
  strong.forEach(r=>{const a=LES[r.area];if(a&&areas[a]&&areas[a].lessons.has("les:"+r.key))areas[a].strong=(areas[a].strong||0)+1});
  const n=R.reduce((a,r)=>a+r.n,0),ok=R.reduce((a,r)=>a+r.ok,0);
  return{R,sess,ms,days:days.size,streak,areas,n,ok,from,to}}

function helpTopics(k,P){
  const {M}=H.state();const by={};const get=t=>by[t.key]=by[t.key]||{t,show:0,auto:0,re:0,help:0,again:0,nearly:0,miss:0,n:0};
  helpEvents(k,P.from,P.to).forEach(e=>{
    if(e.kind==="teach"){const g=get(islandTopic(e.world,e.level));if(e.data&&e.data.mode==="auto")g.auto++;else g.show++}
    else if(e.kind==="reteach")get(islandTopic(e.world,e.level)).re++;
    else if(e.kind==="showme_help"){const t=lessonTopic(k,e.world);if(t)get(t).help++}
    else if(e.kind==="face"){const t=lessonTopic(k,e.world);const f=e.data&&e.data.f;if(t&&f==="again")get(t).again++;if(t&&f==="nearly")get(t).nearly++}});
  if(P.all){Object.entries(M.faces[k]||{}).forEach(([key,f])=>{const t=lessonTopic(k,key);if(!t)return;const g=get(t);g.again=Math.max(g.again,num(f.again));g.nearly=Math.max(g.nearly,num(f.nearly))})}
  P.st.R.forEach(r=>{if(!r.t.area||!r.n)return;const g=get(r.t);g.n+=r.n;g.miss+=r.n-r.ok});
  return Object.values(by).map(g=>({...g,score:g.show*2+g.re*2+g.help*2+g.again*3+g.nearly+g.miss*.5})).filter(g=>g.show+g.re+g.help+g.again+g.nearly+g.miss>0).sort((a,b)=>b.score-a.score)}

/* ---------- periods ---------- */
const UI={rng:"30",cf:"",ct:"",sec:"setup"};
function period(){const now=Date.now();let from=0,to=now,label="All time",all=false;
  if(UI.rng==="7"){from=dayStart(now-6*DAY);label="Last 7 days"}else if(UI.rng==="30"){from=dayStart(now-29*DAY);label="Last 30 days"}
  else if(UI.rng==="term"){from=dayStart(now-69*DAY);label="Last 10 weeks (about one term)"}
  else if(UI.rng==="custom"){from=parseISO(UI.cf)||dayStart(now-29*DAY);to=(parseISO(UI.ct)||dayStart(now))+DAY-1;label=dfmt(from)+" to "+dfmt(to)}
  else all=true;
  return{from,to,label,all}}

/* ---------- charts ---------- */
function barSVG(items,unit){const W=640,Hh=180,pad=28,bw=(W-pad*2)/Math.max(1,items.length);const mx=Math.max(1,...items.map(i=>i.v));
  const lbEvery=Math.ceil(items.length/10);
  return`<svg viewBox="0 0 ${W} ${Hh+30}" role="img" aria-label="Chart of ${esc(unit)}"><line class="ax" x1="${pad}" y1="${Hh}" x2="${W-pad}" y2="${Hh}" stroke="#ccd"/>${items.map((it,i)=>{const h=it.v/mx*(Hh-20);return`<rect x="${pad+i*bw+2}" y="${Hh-h}" width="${Math.max(2,bw-4)}" height="${h}" rx="3" fill="#2a7f9e"><title>${esc(it.l)}: ${it.v} ${esc(unit)}</title></rect>${i%lbEvery===0?`<text x="${pad+i*bw+bw/2}" y="${Hh+16}" font-size="11" text-anchor="middle" fill="#5b6576">${esc(it.s)}</text>`:""}`}).join("")}<text x="${pad}" y="12" font-size="11" fill="#5b6576">max ${mx} ${esc(unit)}</text></svg>`}
function lineSVG(series,buckets){const W=640,Hh=180,pad=30;const n=buckets.length;const x=i=>pad+(n<=1?0:i*(W-pad*2)/(n-1));const y=v=>Hh-v/100*(Hh-20);
  const grid=[0,50,100].map(v=>`<line class="ax" x1="${pad}" x2="${W-pad}" y1="${y(v)}" y2="${y(v)}" stroke="#e1e5ea"/><text x="2" y="${y(v)+4}" font-size="11" fill="#5b6576">${v}%</text>`).join("");
  const lb=Math.ceil(n/8);
  return`<svg viewBox="0 0 ${W} ${Hh+30}" role="img" aria-label="First-try accuracy by week and learning area">${grid}${buckets.map((b,i)=>i%lb===0?`<text x="${x(i)}" y="${Hh+16}" font-size="11" text-anchor="middle" fill="#5b6576">${esc(b.s)}</text>`:"").join("")}${series.map(s=>{const pts=s.v.map((v,i)=>v==null?null:[x(i),y(v)]).filter(Boolean);return`<polyline fill="none" stroke="${s.c}" stroke-width="3" points="${pts.map(p=>p.join(",")).join(" ")}"/>${pts.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="${s.c}"/>`).join("")}`}).join("")}</svg>
  <div class="lg">${series.map(s=>`<span><i style="background:${s.c}"></i>${esc(s.a)}</span>`).join("")}</div>`}
function buckets(P,st){const from=P.all?(st.R.length?dayStart(st.R[0].at):dayStart(Date.now()-29*DAY)):P.from;const span=(P.to-from)/DAY;const step=span<=45?DAY:7*DAY;const out=[];
  for(let t=from;t<=P.to;t+=step)out.push({a:t,b:t+step,s:dshort(t)});return out}

/* ---------- Progress tab ---------- */
function rangeChips(){const c=(v,l)=>`<button class="chip${UI.rng===v?" on":""}" data-hr-rng="${v}" aria-pressed="${UI.rng===v}">${l}</button>`;
  return`<div class="chips">${c("7","7 days")}${c("30","30 days")}${c("term","Term (10 weeks)")}${c("custom","Custom")}${c("all","All time")}</div>${UI.rng==="custom"?`<div class="grid2"><label class="f">From<input type="date" id="hr-cf" value="${esc(UI.cf||iso(Date.now()-29*DAY))}"></label><label class="f">To<input type="date" id="hr-ct" value="${esc(UI.ct||iso(Date.now()))}"></label></div>`:""}`}
function areaYear(k,a){if(a==="Mathematics"||a==="English")return yrLabel(H.pathYear(k));if(a==="Science"||a==="HASS"||a==="Technologies")return yrLabel(H.labYear(k));return"—"}
function progressTab(k){
  const P=period(),st=stats(k,P.from,P.to);P.st=st;const name=esc(nm(k));
  const bk=buckets(P,st);
  const bars=bk.map(b=>{const m=st.sess.filter(s=>s.start>=b.a&&s.start<b.b).reduce((a,s)=>a+Math.max(60000,s.end-s.start+30000)+s.extra,0);return{l:dfmt(b.a),s:b.s,v:Math.round(m/60000)}});
  const ar=Object.keys(st.areas).sort((a,b)=>AC.indexOf(a)-AC.indexOf(b));
  const series=ar.map(a=>({a,c:COL[a]||"#555",v:bk.map(b=>{let n=0,ok=0;st.R.forEach(r=>{if(r.t.area===a&&r.at>=b.a&&r.at<b.b){n+=r.n;ok+=r.ok}});return n>=3?pct(ok,n):null})}));
  const help=helpTopics(k,P).slice(0,10);
  const areaRows=ar.map(a=>{const A=st.areas[a];return`<tr><td><b>${esc(a)}</b></td><td>${A.n}</td><td>${pct(A.ok,A.n)}%</td><td>${A.lessons.size}</td><td>${num(A.strong)} lessons strong${A.levelups?`, ${A.levelups} island level${A.levelups===1?"":"s"} passed`:""}</td><td>${esc(areaYear(k,a))}</td></tr>`}).join("");
  const trendRows=[];ar.forEach(a=>Object.values(st.areas[a].topics).filter(T=>T.n>=3).sort((x,y)=>y.n-x.n).slice(0,6).forEach(T=>trendRows.push(`<tr><td>${esc(a)}</td><td>${esc(T.t.title)}<br><small>${esc(T.t.place)}</small></td><td>${dshort(T.first.at)}: ${pct(T.first.ok,T.first.n)}% <small>(${T.first.n})</small></td><td>${T.sessions>1?`${dshort(T.latest.at)}: ${pct(T.latest.ok,T.latest.n)}% <small>(${T.latest.n})</small>`:"—"}</td><td>${T.n}</td></tr>`)));
  return`<div class="hc hrx"><h3>${name}: ${esc(P.label)}</h3>${rangeChips()}
  <div class="kpi"><div><b>${st.sess.length}</b>sessions</div><div><b>${st.days}</b>active days</div><div><b>${st.streak}</b>day streak<small>days in a row, up to today</small></div><div><b>${hrs(st.ms)}</b>time in app<small>approximate</small></div><div><b>${st.n}</b>questions answered</div><div><b>${st.n?pct(st.ok,st.n)+"%":"—"}</b>right first try</div></div>
  <p class="sub">Time in app is estimated from answer times (gaps over 10 minutes start a new session) plus each lesson's set length. It is not the same as teaching time.</p></div>
  <div class="hc hrx"><h3>Minutes in the app (${bk.length&&bk[1]&&bk[1].a-bk[0].a>DAY?"by week":"by day"})</h3>${st.R.length?barSVG(bars,"min"):`<p class="sub">No activity in this period.</p>`}</div>
  <div class="hc hrx"><h3>By learning area</h3>${ar.length?`${ar.map(a=>{const A=st.areas[a],p=pct(A.ok,A.n);return`<div class="ab"><span>${esc(a)}</span><div class="bar"><i style="width:${p}%;background:${COL[a]||"#1f7a5a"}"></i></div><b>${p}%</b></div>`}).join("")}<p class="sub">Bars show first-try accuracy.</p><div class="scroll"><table><tr><th>Area</th><th>Questions</th><th>First try</th><th>Lessons done</th><th>Mastery</th><th>App year setting</th></tr>${areaRows}</table></div><p class="sub">"App year setting" is the year of content the app shows ${name}. It is not a judgement of ${name}'s level.</p>`:`<p class="sub">Nothing recorded in this period.</p>`}</div>
  <div class="hc hrx"><h3>First-try accuracy over time</h3>${series.length?lineSVG(series,bk):`<p class="sub">Nothing to chart yet.</p>`}<p class="sub">A point needs at least 3 questions in that ${bk.length&&bk[1]&&bk[1].a-bk[0].a>DAY?"week":"day"}. Harder topics later in the year can lower accuracy even when ${name} is learning.</p></div>
  <div class="hc hrx"><h3>Topic trends: first and latest</h3>${trendRows.length?`<div class="scroll"><table><tr><th>Area</th><th>Topic</th><th>First</th><th>Latest</th><th>Questions</th></tr>${trendRows.join("")}</table></div><p class="sub">Each shows the first and latest day ${name} practised that topic in this period: first-try accuracy and (number of questions).</p>`:`<p class="sub">Topics show here once practised on at least 3 questions.</p>`}</div>
  <div class="hc hrx"><h3>Where ${name} needed help</h3>${help.length?`<div class="scroll"><table><tr><th>Topic</th><th>Show me how</th><th>Let me show you</th><th>Help me</th><th>Show me again</th><th>Missed first try</th></tr>${help.map(g=>`<tr><td><b>${esc(g.t.title)}</b><br><small>${esc(g.t.area||"")} · ${esc(g.t.place)}</small></td><td>${g.show}${g.auto?` <small>(+${g.auto} auto)</small>`:""}</td><td>${g.re}</td><td>${g.help}</td><td>${g.again}${g.nearly?` <small>(${g.nearly} nearly)</small>`:""}</td><td>${g.miss}${g.n?` <small>of ${g.n}</small>`:""}</td></tr>`).join("")}</table></div><p class="sub">Top topics to revisit away from the screen, with real objects or a printable. "Auto" means the app opened the lesson itself the first time.</p>`:`<p class="sub">No help taps or misses in this period.</p>`}</div>`}

/* ---------- report state ---------- */
function RS(k){S.qldReport=S.qldReport||{};const r=S.qldReport[k]=S.qldReport[k]||{};r.f=r.f||{};r.lvl=r.lvl||{};r.samples=r.samples||[];r.chk=r.chk||{};return r}
let saveT=null;const saveSoon=()=>{clearTimeout(saveT);saveT=setTimeout(()=>{try{save()}catch(e){}},400)};
function windowInfo(k){const r=RS(k);const a=parseISO(r.anniv);if(!a)return null;const now=dayStart(Date.now());let next=a;while(next<now)next=addMonths(next,12);
  const open=addMonths(next,-3),due=addMonths(next,-2);const prev=addMonths(next,-12);
  return{next,open,due,prev,state:now<open?"before":now<=due?"open":"late",daysToDue:Math.round((due-now)/DAY),daysToOpen:Math.round((open-now)/DAY)}}
function reportPeriod(k){const r=RS(k),w=windowInfo(k);const from=parseISO(r.from)||(w?w.prev:dayStart(Date.now()-365*DAY));const to=(parseISO(r.to)||dayStart(Date.now()))+DAY-1;return{from,to,label:dfmt(from)+" to "+dfmt(to)}}
X.banners.push(k=>{const out=[];S.kids.forEach((K,i)=>{const w=windowInfo(i);if(!w)return;const n=esc(RS(i).legal||K.name);
  if(w.state==="open")out.push(`<div class="qbanner noprint"><b>Queensland report for ${n} is due by ${dfmt(w.due)}</b> (${w.daysToDue} day${w.daysToDue===1?"":"s"}). <button class="chip" data-hubtab="qld" data-hr-who="${i}">Open Department report</button></div>`);
  else if(w.state==="late")out.push(`<div class="qbanner due noprint"><b>The report date for ${n} (${dfmt(w.due)}) has passed.</b> Check your QHE letter or contact Queensland Home Education.</div>`);
  else if(w.daysToOpen<=21)out.push(`<div class="qbanner noprint">Reporting for ${n} opens ${dfmt(w.open)}.</div>`)});return out.join("")});

/* ---------- report model ---------- */
const YIR=[["y1","General impressions of the year"],["y2","Did you achieve the program goals?"],["y3","Changes to the program, and why?"],["y4","Highlights and lowlights"],["y5","Area of most success"],["y6","Other relevant information"]];
const APP_AREAS=["English","Mathematics","Science","HASS","Technologies","HPE"];
function progressSentence(k,A){const ts=Object.values(A.topics).filter(T=>T.first.n>=3);if(!ts.length)return"";const name=nm(k);
  const early=ts.slice().sort((a,b)=>a.first.at-b.first.at)[0];const late=ts.slice().sort((a,b)=>b.latest.at-a.latest.at)[0];
  const lat=late.latest.n>=3?late.latest:late.first;
  if(early===late&&early.sessions<2)return`On ${dfmt(early.first.at)}, ${name} answered ${pct(early.first.ok,early.first.n)}% of ${early.t.title} questions right first try (${early.first.n} questions).`;
  return`On ${dfmt(early.first.at)}, ${name} answered ${pct(early.first.ok,early.first.n)}% of ${early.t.title} questions right first try; on ${dfmt(lat.at)}, ${pct(lat.ok,lat.n)}% of ${late.t.title}${early===late?" questions":""}.`}
function drafts(k,st){const name=nm(k),ar=Object.keys(st.areas);const D={};
  const best=ar.filter(a=>st.areas[a].n>=20).sort((a,b)=>st.areas[b].ok/st.areas[b].n-st.areas[a].ok/st.areas[a].n)[0];
  let up=null;ar.forEach(a=>Object.values(st.areas[a].topics).forEach(T=>{if(T.sessions>1&&T.first.n>=3&&T.latest.n>=3){const g=T.latest.ok/T.latest.n-T.first.ok/T.first.n;if(!up||g>up.g)up={g,T}}}));
  const help=helpTopics(k,{from:st.from,to:st.to,st})[0];
  const lessonsDone=ar.reduce((a,x)=>a+st.areas[x].lessons.size,0),lv=ar.reduce((a,x)=>a+num(st.areas[x].levelups),0);
  D.y1=`App records: ${name} used Pebble Island on ${st.days} days in this period (about ${hrs(st.ms)} in the app). ${name} answered ${st.n} questions; ${st.n?pct(st.ok,st.n):0}% were right first try.\n[Add your impressions of the year, including learning away from the app.]`;
  D.y2=`[List this year's program goals and say whether each was met.]\nApp records: ${lessonsDone} lessons practised and ${lv} island levels passed.`;
  D.y3="[Describe any changes to the program and why.]";
  D.y4=(up?`Highlight from app records: ${up.T.t.title} went from ${pct(up.T.first.ok,up.T.first.n)}% (${dfmt(up.T.first.at)}) to ${pct(up.T.latest.ok,up.T.latest.n)}% (${dfmt(up.T.latest.at)}) right first try.\n`:"")+(help?`Needed most help with: ${help.t.title}.\n`:"")+"[Add highlights and lowlights from the whole year.]";
  D.y5=(best?`App records: highest first-try accuracy in ${best} (${pct(st.areas[best].ok,st.areas[best].n)}% of ${st.areas[best].n} questions).\n`:"")+"[Add the area you saw most success in.]";
  D.y6="";
  APP_AREAS.forEach(a=>{const A=st.areas[a];D["prog_"+a]=A?progressSentence(k,A)+"\n[Add what you observed between the work samples.]":"";
    D["appr_"+a]=A?`Short sessions on Pebble Island with read-aloud, worked examples ("Show me how") and step-by-step help when a question was missed.\n[Add the approaches you used at home.]`:""});
  return D}
function nextTopics(k,a){const y=a==="Mathematics"||a==="English"?H.pathYear(k)+1:H.labYear(k)+1;const code={Mathematics:"maths",English:"english",Science:"science",HASS:"hass",Technologies:"technologies"}[a];
  if(!code)return{y,list:[]};const B=window.PEBBLE_QCAA_LESSONS||{};const yy=B[y]?y:B[y-1]?y-1:null;return{y:yy==null?y:yy,list:yy==null?[]:(B[yy][code]||[]).slice(0,6).map(l=>l.title+(l.code?" ("+l.code+")":""))}}
function programDrafts(k){const D={},name=nm(k),r=RS(k);
  D.goals=`Short term: [goals for the next term].\nLong term: [goals for the year].`;
  D.learner=`Background and needs: [about ${name}].\nLearning style: [how ${name} learns best].\nTeaching strategies: short focused sessions, hands-on materials, read-aloud, worked examples, then independent practice.`;
  D.env="[Where and when learning happens at home; materials available.]";D.social="[Groups, sport, clubs, co-op days, family and friends.]";
  AC.forEach(a=>{const t=nextTopics(k,a),app=APP_AREAS.includes(a)&&a!=="HPE";
    D["t_"+a]=app?`Topics: ${t.list.join("; ")||"[topics]"}\nStrategies: [how you will teach these].`:"[Topics and teaching strategies.]";
    D["l_"+a]=app?"Activities: Pebble Island lessons and islands, plus [offline activities].\nSkills: [skills to develop].":"[Activities and skills.]";
    D["r_"+a]=app?"Pebble Island app (tablet); [books, materials, websites].":a==="HPE"?"Pebble Island Feelings Hut (wellbeing only); [sport, outdoor play].":"[Resources.]";
    D["m_"+a]=app?"Pebble Island hub records (first-try accuracy, lessons completed), dated work samples, parent observation.":"[How you will monitor progress.]"});return D}
const fv=(k,key,D)=>{const f=RS(k).f;return f[key]!==undefined?f[key]:(D[key]||"")};

function model(k,imgs){
  const r=RS(k),P=reportPeriod(k),st=stats(k,P.from,P.to),D=drafts(k,st),PD=programDrafts(k),name=r.legal||nm(k);
  const covered=APP_AREAS.filter(a=>st.areas[a]);const out=[];
  const p=(x,o)=>String(x||"").split("\n").forEach(l=>out.push({t:"p",x:l,...(o||{})}));
  out.push({t:"h1",x:"Home education report"});
  out.push({t:"tbl",head:["",""],noHead:true,rows:[["Child",name],["Year level",r.year||"[year level]"],["Reporting period",P.label],["Generated",dfmt(Date.now())]]});
  p(`Prepared from Pebble Island records. The app covers ${covered.length?covered.join(", "):"no areas yet in this period"} only (HPE: wellbeing questions only). The parent adds all other learning. App figures are records of questions answered in the app, not a measure of instruction time or a judgement of year level.`,{i:1});
  p("Submit with the approved form “Reporting for registration for home education”, signed by the parent. Attach files rather than links.",{i:1});
  out.push({t:"h2",x:"Year in review"});
  YIR.forEach(([id,q])=>{out.push({t:"h3",x:q});p(fv(k,id,D)||" ")});
  out.push({t:"h2",x:"Learning areas"});
  AC.forEach((a,ai)=>{const A=st.areas[a];out.push({t:"h3",x:AC_LONG[a]||a});
    if(A){const ts=Object.values(A.topics).sort((x,y)=>y.n-x.n).slice(0,15);
      p(`Topics covered in the app: ${ts.map(T=>T.t.title+(T.t.codes.length?" ("+T.t.codes.join(", ")+")":"")).join("; ")}.`);
      out.push({t:"tbl",head:["Topic","AC v9","First (date, first try)","Latest (date, first try)","Days practised","Questions"],rows:ts.map(T=>[T.t.title,T.t.codes.join(", "),`${dfmt(T.first.at)}: ${pct(T.first.ok,T.first.n)}% of ${T.first.n}`,T.sessions>1?`${dfmt(T.latest.at)}: ${pct(T.latest.ok,T.latest.n)}% of ${T.latest.n}`:"—",String(T.sessions),String(T.n)])});
      p(`Totals: ${A.n} questions, ${pct(A.ok,A.n)}% right first try, ${A.lessons.size} lessons practised${A.levelups?`, ${A.levelups} island levels passed`:""}.`)}
    else p(a==="HPE"||a==="The Arts"||a==="Languages"||!st.areas[a]?"[Parent: describe learning in this area. Not covered by the app in this period.]":"");
    out.push({t:"p",x:"Progress observed",b:1});p(fv(k,"prog_"+a,D)||"[Parent to complete.]");
    out.push({t:"p",x:"Approaches used to support",b:1});p(fv(k,"appr_"+a,D)||"[Parent to complete.]");
    const lv=r.lvl[a];out.push({t:"p",x:"Level of samples compared with age equivalence (parent's judgement): "+(lv?({above:"Above",at:"At",below:"Below"})[lv]:"[not chosen]")});
    const n=fv(k,"note_"+a,{});if(n)p(n)});
  out.push({t:"h2",x:"Work samples"});
  const sm=r.samples.slice().sort((a,b)=>AC.indexOf(a.area)-AC.indexOf(b.area)||String(a.concept).localeCompare(String(b.concept))||a.n-b.n);
  if(!sm.length)p("[No work samples added yet.]");
  sm.forEach(s=>{out.push({t:"h3",x:`${s.area}: ${s.concept||"sample"} (sample ${s.n||1}, ${s.date?dfmt(parseISO(s.date)):"undated"})`});
    if(imgs&&imgs[s.id])out.push({t:"img",id:s.id,src:imgs[s.id],w:s.w,h:s.h});
    out.push({t:"tbl",noHead:true,head:["",""],rows:[["Approaches used to support",s.appr||""],["Progress observed between samples",s.prog||""],["Level (above, at or below age equivalence)",s.lvl?({above:"Above",at:"At",below:"Below"})[s.lvl]:""],["Other information",s.other||""]]})});
  out.push({t:"h3",x:"Supporting app records"});p("These are Pebble Island records, not the child's own composition. They support the work samples above.",{i:1});
  covered.forEach(a=>{const ts=Object.values(st.areas[a].topics).filter(T=>T.sessions>1&&T.first.n>=3).sort((x,y)=>(y.latest.at-y.first.at)-(x.latest.at-x.first.at));const T=ts[0];if(!T)return;
    out.push({t:"tbl",noHead:true,head:["",""],rows:[["App record",`${a}: ${T.t.title}${T.t.codes.length?" ("+T.t.codes.join(", ")+")":""}`],["First",`${dfmt(T.first.at)}: ${T.first.ok} of ${T.first.n} right first try (${pct(T.first.ok,T.first.n)}%)`],["Latest",`${dfmt(T.latest.at)}: ${T.latest.ok} of ${T.latest.n} right first try (${pct(T.latest.ok,T.latest.n)}%)`]]})});
  out.push({t:"h2",x:"Summary of the educational program for next year"});
  [["goals","Goals"],["learner","Overview of the learner"],["env","Home learning environment"],["social","Social opportunities"]].forEach(([id,h])=>{out.push({t:"h3",x:h});p(fv(k,"p_"+id,{["p_"+id]:PD[id]}))});
  AC.forEach(a=>{out.push({t:"h3",x:AC_LONG[a]||a});out.push({t:"tbl",noHead:true,head:["",""],rows:[["Teaching (topics, strategies)",fv(k,"p_t_"+a,{["p_t_"+a]:PD["t_"+a]})],["Learning (activities, skills)",fv(k,"p_l_"+a,{["p_l_"+a]:PD["l_"+a]})],["Resources",fv(k,"p_r_"+a,{["p_r_"+a]:PD["r_"+a]})],["Monitoring and progress",fv(k,"p_m_"+a,{["p_m_"+a]:PD["m_"+a]})]]})});
  out.push({t:"h2",x:"Checklist"});
  CHK.forEach(([id,t])=>p((r.chk[id]?"☑ ":"☐ ")+t));
  p("Approved form: "+FORM_URL);p("Reporting information: "+PAGE_URL);
  return{blocks:out,name,P,st}}
const CHK=[["samples","Work samples for English, Maths and one other area are enclosed (two each, dated)"],["annot","Each work sample is annotated"],["program","Summary of the educational program for next year is enclosed"],["form","The approved form is completed and the declaration is signed"],["files","Evidence is attached as files, not cloud links"]];

/* ---------- image store ---------- */
let dbp=null;
function db(){if(!dbp)dbp=new Promise((res,rej)=>{const q=indexedDB.open("pebble-hub-samples",1);q.onupgradeneeded=()=>q.result.createObjectStore("img");q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error)});return dbp}
async function idb(mode,fn){const d=await db();return new Promise((res,rej)=>{const tx=d.transaction("img",mode);const r=fn(tx.objectStore("img"));tx.oncomplete=()=>res(r&&r.result);tx.onerror=()=>rej(tx.error)})}
const putImg=(id,blob)=>idb("readwrite",s=>s.put(blob,id)),getImg=id=>idb("readonly",s=>s.get(id)).catch(()=>null),delImg=id=>idb("readwrite",s=>s.delete(id));
async function downscale(file){let bmp;try{bmp=await createImageBitmap(file)}catch(e){bmp=await new Promise((res,rej)=>{const im=new Image();im.onload=()=>res(im);im.onerror=rej;im.src=URL.createObjectURL(file)})}
  const w0=bmp.width,h0=bmp.height,s=Math.min(1,1600/Math.max(w0,h0));const w=Math.round(w0*s),h=Math.round(h0*s);
  const c=document.createElement("canvas");c.width=w;c.height=h;const x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,w,h);x.drawImage(bmp,0,0,w,h);
  const blob=await new Promise(r=>c.toBlob(r,"image/jpeg",.85));return{blob,w,h}}
const URLS={};async function imgURL(id){if(URLS[id])return URLS[id];const b=await getImg(id);if(!b)return null;return URLS[id]=URL.createObjectURL(b)}

/* ---------- DOCX ---------- */
const CRC=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
function crc32(u){let c=0xFFFFFFFF;for(let i=0;i<u.length;i++)c=CRC[(c^u[i])&255]^(c>>>8);return(c^0xFFFFFFFF)>>>0}
function zip(files){const enc=new TextEncoder(),parts=[],cd=[];let off=0;const d=new Date();const dt=((d.getFullYear()-1980)<<9)|((d.getMonth()+1)<<5)|d.getDate(),tm=(d.getHours()<<11)|(d.getMinutes()<<5)|(d.getSeconds()>>1);
  files.forEach(f=>{const name=enc.encode(f.name),data=typeof f.data==="string"?enc.encode(f.data):f.data,crc=crc32(data);
    const h=new DataView(new ArrayBuffer(30));h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x0800,true);h.setUint16(8,0,true);h.setUint16(10,tm,true);h.setUint16(12,dt,true);h.setUint32(14,crc,true);h.setUint32(18,data.length,true);h.setUint32(22,data.length,true);h.setUint16(26,name.length,true);h.setUint16(28,0,true);
    parts.push(new Uint8Array(h.buffer),name,data);
    const c=new DataView(new ArrayBuffer(46));c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x0800,true);c.setUint16(10,0,true);c.setUint16(12,tm,true);c.setUint16(14,dt,true);c.setUint32(16,crc,true);c.setUint32(20,data.length,true);c.setUint32(24,data.length,true);c.setUint16(28,name.length,true);c.setUint32(42,off,true);
    cd.push(new Uint8Array(c.buffer),name);off+=30+name.length+data.length});
  const cdSize=cd.reduce((a,x)=>a+x.length,0);const e=new DataView(new ArrayBuffer(22));e.setUint32(0,0x06054b50,true);e.setUint16(8,files.length,true);e.setUint16(10,files.length,true);e.setUint32(12,cdSize,true);e.setUint32(16,off,true);
  return new Blob(parts.concat(cd,[new Uint8Array(e.buffer)]),{type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"})}
const xe=s=>String(s==null?"":s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const run=(t,o)=>`<w:r>${o&&(o.b||o.i)?`<w:rPr>${o.b?"<w:b/>":""}${o.i?"<w:i/>":""}</w:rPr>`:""}<w:t xml:space="preserve">${xe(t)}</w:t></w:r>`;
const para=(t,o)=>`<w:p>${o&&o.style?`<w:pPr><w:pStyle w:val="${o.style}"/></w:pPr>`:""}${run(t,o)}</w:p>`;
async function buildDocx(k){
  const r=RS(k),imgs={},media=[];
  for(const s of r.samples){const b=await getImg(s.id);if(b)imgs[s.id]=b}
  const M=model(k,imgs);let rid=10,pid=1;const rels=[];
  const body=M.blocks.map(b=>{
    if(b.t==="h1")return para(b.x,{style:"Title"});if(b.t==="h2")return para(b.x,{style:"Heading1"});if(b.t==="h3")return para(b.x,{style:"Heading2"});
    if(b.t==="p")return para(b.x,{b:b.b,i:b.i});
    if(b.t==="tbl"){const cols=b.head.length;const cell=(t,h)=>`<w:tc><w:tcPr><w:tcW w:w="${Math.floor(5000/cols)}" w:type="pct"/>${h?'<w:shd w:val="clear" w:color="auto" w:fill="E8EEF2"/>':""}</w:tcPr>${String(t||"").split("\n").map(l=>para(l,{b:h})).join("")||"<w:p/>"}</w:tc>`;
      const brd=["top","left","bottom","right","insideH","insideV"].map(s=>`<w:${s} w:val="single" w:sz="4" w:space="0" w:color="999999"/>`).join("");
      return`<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblBorders>${brd}</w:tblBorders><w:tblCellMar><w:left w:w="80" w:type="dxa"/><w:right w:w="80" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>${b.head.map(()=>`<w:gridCol w:w="${Math.floor(9600/cols)}"/>`).join("")}</w:tblGrid>${b.noHead?"":`<w:tr>${b.head.map(h=>cell(h,1)).join("")}</w:tr>`}${b.rows.map(row=>`<w:tr>${row.map((c,i)=>cell(c,b.noHead&&i===0)).join("")}</w:tr>`).join("")}</w:tbl><w:p/>`}
    if(b.t==="img"){const id="rIdImg"+(rid++),n=pid++,fn="image"+n+".jpeg";media.push({name:"word/media/"+fn,blob:b.src});rels.push(`<Relationship Id="${id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${fn}"/>`);
      let cx=5486400,cy=Math.round(cx*(b.h||3)/(b.w||4));if(cy>4572000){cx=Math.round(cx*4572000/cy);cy=4572000}
      return`<w:p><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${cx}" cy="${cy}"/><wp:docPr id="${n}" name="Work sample ${n}"/><wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="${n}" name="${fn}"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${id}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`}
    return""}).join("");
  const doc=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><w:body>${body}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr></w:body></w:document>`;
  const sty=(id,name,sz,extra)=>`<w:style w:type="paragraph" w:styleId="${id}"><w:name w:val="${name}"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="240" w:after="80"/>${extra||""}</w:pPr><w:rPr><w:b/><w:color w:val="1F3A4D"/><w:sz w:val="${sz}"/></w:rPr></w:style>`;
  const styles=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Calibri" w:cs="Calibri"/><w:sz w:val="22"/><w:lang w:val="en-AU"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="80" w:line="264" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>${sty("Title","Title",40)}${sty("Heading1","heading 1",30,'<w:outlineLvl w:val="0"/>')}${sty("Heading2","heading 2",24,'<w:outlineLvl w:val="1"/>')}</w:styles>`;
  const ct=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="jpeg" ContentType="image/jpeg"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`;
  const rootRels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`;
  const docRels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>${rels.join("")}</Relationships>`;
  const core=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>Home education report</dc:title><dcterms:created xsi:type="dcterms:W3CDTF">${new Date().toISOString().replace(/\.\d+Z$/,"Z")}</dcterms:created></cp:coreProperties>`;
  const files=[{name:"[Content_Types].xml",data:ct},{name:"_rels/.rels",data:rootRels},{name:"word/document.xml",data:doc},{name:"word/styles.xml",data:styles},{name:"word/_rels/document.xml.rels",data:docRels},{name:"docProps/core.xml",data:core}];
  for(const m of media)files.push({name:m.name,data:new Uint8Array(await m.blob.arrayBuffer())});
  return zip(files)}

/* ---------- other exports ---------- */
const safe=s=>String(s||"").trim().replace(/[^A-Za-z0-9]+/g,"-").replace(/^-|-$/g,"")||"x";
const childFile=k=>safe(RS(k).legal||nm(k));
function download(blob,name){const u=URL.createObjectURL(blob);const a=document.createElement("a");a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000)}
const sampleName=(k,s)=>`${s.date||iso(Date.now())}_${childFile(k)}_${safe(s.area)}_${safe(s.concept)}_${s.n||1}.jpg`;
function csv(k){const P=reportPeriod(k),st=stats(k,P.from,P.to);const q=v=>{v=String(v==null?"":v);return/[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v};
  const rows=[["date","time","child","learning_area","source","topic","where","ac_v9_codes","questions","right_first_try"]];
  st.R.forEach(r=>{const d=new Date(r.at);rows.push([iso(r.at),d.toTimeString().slice(0,5),RS(k).legal||nm(k),r.t.area||"",r.src,r.t.title,r.t.place,r.t.codes.join(" "),r.n,r.ok])});
  helpEvents(k,P.from,P.to).filter(e=>e.kind!=="showme_step").forEach(e=>{const t=e.kind==="teach"||e.kind==="reteach"?islandTopic(e.world,e.level):lessonTopic(k,e.world)||{title:e.world,place:"",area:"",codes:[]};
    const lab={teach:e.data&&e.data.mode==="auto"?"help: lesson shown automatically":"help: Show me how",reteach:"help: Let me show you",showme_help:"help: Help me",face:"feeling: "+(e.data&&e.data.f)}[e.kind];
    const d=new Date(e.t);rows.push([iso(e.t),d.toTimeString().slice(0,5),RS(k).legal||nm(k),t.area||"",lab,t.title,t.place,(t.codes||[]).join(" "),"",""])});
  rows.sort((a,b)=>a===rows[0]?-1:b===rows[0]?1:(a[0]+a[1]).localeCompare(b[0]+b[1]));
  return new Blob(["﻿"+rows.map(r=>r.map(q).join(",")).join("\r\n")],{type:"text/csv"})}
async function printReport(k){
  const r=RS(k),imgs={};for(const s of r.samples){const u=await imgURL(s.id);if(u)imgs[s.id]=u}
  const M=model(k,imgs);let el=document.getElementById("qldprint");if(el)el.remove();el=document.createElement("div");el.id="qldprint";let first=true;
  el.innerHTML=M.blocks.map(b=>{if(b.t==="h1")return`<h1>${esc(b.x)}</h1>`;if(b.t==="h2"){const c=first?' class="nb"':"";first=false;return`<h2${c}>${esc(b.x)}</h2>`}if(b.t==="h3")return`<h3>${esc(b.x)}</h3>`;
    if(b.t==="p")return`<p class="${b.i?"note":""}">${b.b?"<b>":""}${esc(b.x)}${b.b?"</b>":""}</p>`;
    if(b.t==="tbl")return`<table>${b.noHead?"":`<tr>${b.head.map(h=>`<th>${esc(h)}</th>`).join("")}</tr>`}${b.rows.map(row=>`<tr>${row.map((c,i)=>b.noHead&&i===0?`<th>${esc(c)}</th>`:`<td>${esc(c).replace(/\n/g,"<br>")}</td>`).join("")}</tr>`).join("")}</table>`;
    if(b.t==="img")return`<p><img src="${b.src}" alt="Work sample"></p>`;return""}).join("");
  document.body.appendChild(el);document.body.classList.add("qld-printing");
  const done=()=>{document.body.classList.remove("qld-printing");removeEventListener("afterprint",done)};addEventListener("afterprint",done);
  await new Promise(res=>setTimeout(res,300));try{print()}catch(e){}setTimeout(done,1500)}
async function shareAll(k,msg){
  const r=RS(k),files=[];const dn=`${iso(Date.now())}_${childFile(k)}_QLD_home_education_report.docx`;
  files.push(new File([await buildDocx(k)],dn,{type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"}));
  for(const s of r.samples){const b=await getImg(s.id);if(b)files.push(new File([b],sampleName(k,s),{type:"image/jpeg"}))}
  const subject=`Home education report: ${r.legal||nm(k)}`;
  if(navigator.canShare&&navigator.canShare({files})){try{await navigator.share({files,title:subject,text:"Report files from Pebble Island. Attach the signed approved form too."});msg("Shared. Pick Mail to send them to yourself.");return}catch(e){if(e&&e.name==="AbortError"){msg("Sharing cancelled.");return}}}
  files.forEach((f,i)=>setTimeout(()=>download(f,f.name),i*400));
  const body=`Report files for ${r.legal||nm(k)} were saved to this device's downloads.\n\nAttach them to this email: the report (.docx or PDF), the work-sample photos and the signed approved form.\n\nThis link cannot attach files. Add them yourself.`;
  msg(`This device can't share files directly, so the files were downloaded. <a href="mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}">Open an email to yourself</a> and attach them. Email links cannot attach files.`)}

/* ---------- report tab UI ---------- */
const SECS=[["setup","Settings"],["review","Year in review"],["areas","Learning areas"],["samples","Work samples"],["program","Next year"],["finish","Checklist and export"]];
const ta=(k,key,label,D,help)=>`<label class="f">${esc(label)}${help?`<small>${esc(help)}</small>`:""}<textarea data-qf="${esc(key)}">${esc(fv(k,key,D))}</textarea>${D[key]&&RS(k).f[key]!==undefined?`<button class="btn" type="button" data-qreset="${esc(key)}">Reset to app draft</button>`:""}</label>`;
const lvlRadios=(name,cur,attr)=>`<div class="radios" role="radiogroup">${[["above","Above"],["at","At"],["below","Below"]].map(([v,l])=>`<label><input type="radio" name="${name}" value="${v}" ${attr} ${cur===v?"checked":""}> ${l}</label>`).join("")}<label><input type="radio" name="${name}" value="" ${attr} ${!cur?"checked":""}> Not chosen</label></div>`;
const YEARS=["Prep","Year 1","Year 2","Year 3","Year 4","Year 5","Year 6","Year 7","Year 8","Year 9","Year 10","Year 11","Year 12"];
function reportTab(k){
  const r=RS(k),w=windowInfo(k),P=reportPeriod(k),name=esc(r.legal||nm(k));
  const chips=`<div class="chips">${SECS.map(([v,l])=>`<button class="chip${UI.sec===v?" on":""}" data-qsec="${v}" aria-pressed="${UI.sec===v}">${l}</button>`).join("")}</div>`;
  let body="";
  if(UI.sec==="setup"){
    body=`<h4>Child</h4><div class="grid2"><label class="f">Legal name<small>As registered with Queensland Home Education.</small><input type="text" data-qs="legal" value="${esc(r.legal||"")}" autocomplete="off"></label>
    <label class="f">Year level<select data-qs="year"><option value="">Choose</option>${YEARS.map(y=>`<option ${r.year===y?"selected":""}>${y}</option>`).join("")}</select></label>
    <label class="f">Registration anniversary<small>The date on your registration letter.</small><input type="date" data-qs="anniv" value="${esc(r.anniv||"")}"></label></div>
    ${w?`<div class="banner"><b>Reporting window:</b> opens ${dfmt(w.open)}, report due ${dfmt(w.due)}, anniversary ${dfmt(w.next)}. ${w.state==="open"?`<b>Open now: ${w.daysToDue} days left.</b>`:w.state==="late"?`<b class="warn">The due date has passed. Contact QHE.</b>`:`Opens in ${w.daysToOpen} days.`} QHE does not give extensions. Check these dates against your QHE letter.</div>`:`<p class="sub">Add the anniversary date to see the reporting window.</p>`}
    <h4>Reporting period</h4><div class="grid2"><label class="f">From<input type="date" data-qs="from" value="${esc(r.from||iso(P.from))}"></label><label class="f">To<input type="date" data-qs="to" value="${esc(r.to||iso(P.to))}"></label></div><p class="sub">Default: from the last anniversary to today.</p>
    <h4>Privacy</h4><p class="sub">Everything here is made on this tablet. Nothing is sent anywhere unless you share or email it. Notes and settings go into this tablet's normal family backup. Photos of work stay on this tablet only. The report includes only the legal name, year level and learning records. QHE may share a report with the child's other parent and with the QCAA.</p>`}
  if(UI.sec==="review"){const st=stats(k,P.from,P.to),D=drafts(k,st);
    body=`<p class="sub">Each box starts with a draft from the app's records. Text in [square brackets] is for you to replace. Your changes save on this tablet as you type.</p>${YIR.map(([id,q])=>ta(k,id,q,D)).join("")}`}
  if(UI.sec==="areas"){const st=stats(k,P.from,P.to),D=drafts(k,st);
    body=`<p class="sub">All eight learning areas are listed. Areas the app doesn't cover are for you to fill in.</p>`+AC.map(a=>{const A=st.areas[a];
      const ts=A?Object.values(A.topics).sort((x,y)=>y.n-x.n).slice(0,8):[];
      return`<div class="card2"><h3>${esc(AC_LONG[a]||a)}</h3>${A?`<p class="sub">${A.n} questions, ${pct(A.ok,A.n)}% right first try, ${A.lessons.size} lessons practised. App year setting: ${esc(areaYear(k,a))}.</p><div class="scroll"><table><tr><th>Topic</th><th>AC v9</th><th>First</th><th>Latest</th><th>Days</th></tr>${ts.map(T=>`<tr><td>${esc(T.t.title)}</td><td><small>${esc(T.t.codes.join(", "))}</small></td><td>${dshort(T.first.at)}: ${pct(T.first.ok,T.first.n)}%</td><td>${T.sessions>1?dshort(T.latest.at)+": "+pct(T.latest.ok,T.latest.n)+"%":"—"}</td><td>${T.sessions}</td></tr>`).join("")}</table></div>`:`<p class="sub">Not covered by the app in this period.</p>`}
      ${ta(k,"prog_"+a,"Progress observed",D)}${ta(k,"appr_"+a,"Approaches used to support",D)}
      <div class="f"><b>Level of the samples compared with age equivalence</b><small>Your judgement. The app does not choose this.</small>${lvlRadios("lv_"+a,r.lvl[a],`data-qlvl="${a}"`)}</div>${ta(k,"note_"+a,"Other information",{})}</div>`}).join("")}
  if(UI.sec==="samples"){const P2=reportPeriod(k),st=stats(k,P2.from,P2.to);
    const need=["English","Mathematics",r.other||"Science"];
    const pairs=need.map(a=>{const ss=r.samples.filter(s=>s.area===a);const n1=ss.some(s=>+s.n===1),n2=ss.some(s=>+s.n===2);return`<li><b>${esc(a)}</b>: sample 1 (simpler) ${n1?"✓":"needed"}, sample 2 (harder, same concept) ${n2?"✓":"needed"}</li>`}).join("");
    body=`<p class="sub">QHE looks for two dated samples each for English (${name}'s own writing), Maths (with working shown) and one other area. Same concept, simpler then harder. Photos of practical work are weaker evidence.</p>
    <label class="f">Third learning area for samples<select data-qs="other">${AC.filter(a=>a!=="English"&&a!=="Mathematics").map(a=>`<option ${(r.other||"Science")===a?"selected":""}>${a}</option>`).join("")}</select></label><ul>${pairs}</ul>
    <div class="card2"><h4>Add a work sample</h4><label class="f">Photo<input type="file" id="qs-file" accept="image/*" capture="environment"></label>
    <div class="grid2"><label class="f">Date of the work<input type="date" id="qs-date" value="${iso(Date.now())}"></label><label class="f">Learning area<select id="qs-area">${AC.map(a=>`<option>${a}</option>`).join("")}</select></label><label class="f">Concept<input type="text" id="qs-concept" placeholder="e.g. 2-digit addition"></label><label class="f">Sample<select id="qs-n"><option value="1">1 (simpler)</option><option value="2">2 (harder)</option></select></label></div>
    <div class="btns"><button class="pri" id="qs-add" type="button">Add sample</button></div><p class="sub" id="qs-msg"></p></div>
    ${r.samples.map(s=>`<div class="card2" data-sid="${esc(s.id)}"><div class="thumbs"><img alt="Work sample" data-img="${esc(s.id)}"></div><p><b>${esc(s.area)}: ${esc(s.concept)}</b> · sample ${esc(s.n)} · ${esc(s.date)}</p>
      <label class="f">Approaches used to support<textarea data-qsm="appr">${esc(s.appr||"")}</textarea></label><label class="f">Progress observed between the samples<textarea data-qsm="prog">${esc(s.prog||"")}</textarea></label>
      <div class="f"><b>Level: above, at or below age equivalence</b><small>Your judgement.</small>${lvlRadios("slv_"+s.id,s.lvl,'data-qsm="lvl"')}</div><label class="f">Other information<textarea data-qsm="other">${esc(s.other||"")}</textarea></label>
      <div class="btns"><button type="button" data-qdl="${esc(s.id)}">Save photo (JPG)</button><button type="button" data-qdel="${esc(s.id)}">Remove</button></div></div>`).join("")}
    <h4>App records you can add as supporting evidence</h4><p class="sub">These are Pebble Island records, not ${name}'s own work. They go in the report after the work samples.</p>
    ${Object.keys(st.areas).map(a=>{const T=Object.values(st.areas[a].topics).filter(T=>T.sessions>1&&T.first.n>=3).sort((x,y)=>(y.latest.at-y.first.at)-(x.latest.at-x.first.at))[0];return T?`<div class="card2"><span class="applabel">App record</span> <b>${esc(a)}: ${esc(T.t.title)}</b><br>${dfmt(T.first.at)}: ${T.first.ok} of ${T.first.n} right first try (${pct(T.first.ok,T.first.n)}%)<br>${dfmt(T.latest.at)}: ${T.latest.ok} of ${T.latest.n} right first try (${pct(T.latest.ok,T.latest.n)}%)</div>`:""}).join("")||`<p class="sub">None yet.</p>`}`}
  if(UI.sec==="program"){const PD=programDrafts(k);const D={};Object.keys(PD).forEach(x=>D["p_"+x]=PD[x]);
    body=`<p class="sub">A draft summary of next year's program in the QHE shape. Topics for app areas come from the next year of Pebble Island lessons. Edit everything.</p>${ta(k,"p_goals","Goals (short and long term)",D)}${ta(k,"p_learner","Overview of the learner (background and needs, learning style, teaching strategies)",D)}${ta(k,"p_env","Home learning environment",D)}${ta(k,"p_social","Social opportunities",D)}
    ${AC.map(a=>`<div class="card2"><h3>${esc(AC_LONG[a]||a)}</h3>${ta(k,"p_t_"+a,"Teaching (topics, strategies)",D)}${ta(k,"p_l_"+a,"Learning (activities, skills)",D)}${ta(k,"p_r_"+a,"Resources",D)}${ta(k,"p_m_"+a,"Monitoring and progress",D)}</div>`).join("")}`}
  if(UI.sec==="finish"){
    body=`<h4>Before you send</h4>${CHK.map(([id,t])=>`<label class="f" style="display:flex;gap:10px;align-items:center;font-weight:400"><input type="checkbox" data-qchk="${id}" ${r.chk[id]?"checked":""} style="width:24px;height:24px"> ${esc(t)}</label>`).join("")}
    <p>Download the <a href="${FORM_URL}" target="_blank" rel="noopener">approved form (Word)</a>, fill it in and sign it. Read the <a href="${PAGE_URL}" target="_blank" rel="noopener">Queensland reporting page</a>. Send using the link QHE gave you for ${name}, or email <a href="mailto:${QHE_EMAIL}">${QHE_EMAIL}</a>. QHE cannot open cloud links, so attach files.</p>
    <p class="sub">This report is a draft for you to check and finish. The app can't tell you whether it meets QHE requirements.</p>
    <h4>Export</h4><div class="btns"><button class="pri" type="button" id="qx-docx">Word document (.docx)</button><button type="button" id="qx-print">Print / Save as PDF</button><button type="button" id="qx-jpg">Work-sample photos (JPG)</button><button type="button" id="qx-csv">Raw data (CSV)</button><button type="button" id="qx-share">Send to me</button></div><p class="sub" id="qx-msg" role="status"></p>`}
  return`<div class="hc hrx"><h3>Department report: ${name}</h3><p class="sub">For Queensland Home Education annual reporting. Period: ${esc(P.label)}.</p>${chips}${body}</div>`}

function bindReport(k){
  const r=RS(k);
  $$("[data-qsec]").forEach(b=>b.onclick=()=>{UI.sec=b.dataset.qsec;H.view()});
  $$("[data-qs]").forEach(el=>{const ev=el.tagName==="SELECT"||el.type==="date"?"change":"input";el.addEventListener(ev,()=>{r[el.dataset.qs]=el.value;saveSoon();if(ev==="change"){try{save()}catch(e){}H.view()}})});
  $$("[data-qf]").forEach(el=>el.addEventListener("input",()=>{r.f[el.dataset.qf]=el.value;saveSoon()}));
  $$("[data-qreset]").forEach(b=>b.onclick=()=>{delete r.f[b.dataset.qreset];try{save()}catch(e){}H.view()});
  $$("[data-qlvl]").forEach(el=>el.addEventListener("change",()=>{r.lvl[el.dataset.qlvl]=el.value;saveSoon()}));
  $$("[data-qchk]").forEach(el=>el.addEventListener("change",()=>{r.chk[el.dataset.qchk]=el.checked;saveSoon()}));
  $$("[data-sid]").forEach(card=>{const s=r.samples.find(x=>x.id===card.dataset.sid);if(!s)return;
    card.querySelectorAll("[data-qsm]").forEach(el=>el.addEventListener(el.type==="radio"?"change":"input",()=>{s[el.dataset.qsm]=el.value;saveSoon()}))});
  $$("img[data-img]").forEach(async im=>{const u=await imgURL(im.dataset.img);if(u)im.src=u;else im.replaceWith(Object.assign(document.createElement("small"),{textContent:"Photo is on another tablet."}))});
  $$("[data-qdl]").forEach(b=>b.onclick=async()=>{const s=r.samples.find(x=>x.id===b.dataset.qdl),bl=await getImg(s.id);if(bl)download(bl,sampleName(k,s))});
  $$("[data-qdel]").forEach(b=>b.onclick=async()=>{if(!confirm("Remove this sample?"))return;const id=b.dataset.qdel;r.samples=r.samples.filter(x=>x.id!==id);try{await delImg(id)}catch(e){}save();H.view()});
  const add=$("#qs-add");if(add)add.onclick=async()=>{const f=$("#qs-file").files[0],m=$("#qs-msg");if(!f){m.textContent="Take or choose a photo first.";return}
    add.disabled=true;m.textContent="Saving…";try{const {blob,w,h}=await downscale(f);const id="ws"+Date.now().toString(36)+Math.random().toString(36).slice(2,6);await putImg(id,blob);
      r.samples.push({id,date:$("#qs-date").value,area:$("#qs-area").value,concept:$("#qs-concept").value.trim(),n:+$("#qs-n").value,w,h});save();H.view()}catch(e){m.textContent="Couldn't save the photo: "+(e&&e.message||e);add.disabled=false}};
  const msg=h=>{const m=$("#qx-msg");if(m)m.innerHTML=h};
  const on=(id,fn)=>{const b=$(id);if(b)b.onclick=async()=>{b.disabled=true;try{await fn()}catch(e){msg("Something went wrong: "+esc(e&&e.message||e))}b.disabled=false}};
  on("#qx-docx",async()=>{download(await buildDocx(k),`${iso(Date.now())}_${childFile(k)}_QLD_home_education_report.docx`);msg("Word document saved. Open it to check and finish it.")});
  on("#qx-print",()=>printReport(k));
  on("#qx-jpg",async()=>{let n=0;for(const s of r.samples){const b=await getImg(s.id);if(b){setTimeout(()=>download(b,sampleName(k,s)),n*400);n++}}msg(n?`${n} photo${n===1?"":"s"} saved.`:"No photos on this tablet yet.")});
  on("#qx-csv",()=>{download(csv(k),`${iso(Date.now())}_${childFile(k)}_learning_data.csv`);msg("CSV saved.")});
  on("#qx-share",()=>shareAll(k,msg))}

function bindProgress(){
  $$("[data-hr-rng]").forEach(b=>b.onclick=()=>{UI.rng=b.dataset.hrRng;H.view()});
  const cf=$("#hr-cf"),ct=$("#hr-ct");if(cf)cf.onchange=()=>{UI.cf=cf.value;H.view()};if(ct)ct.onchange=()=>{UI.ct=ct.value;H.view()}}

X.tabs.push({id:"progress",label:"Progress",at:1,explain:"Numbers for the chosen period: time in the app, each learning area, trends and where help was needed.",render:progressTab,bind:bindProgress});
X.tabs.push({id:"qld",label:"Department report",explain:"Build the Queensland Home Education annual report: drafts from app records that you edit, work samples and exports.",render:reportTab,bind:bindReport});
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-hr-who]");if(b){try{const s=H.state();if(s.who!==+b.dataset.hrWho){window.PEBBLE_HUB_API._setWho&&PEBBLE_HUB_API._setWho(+b.dataset.hrWho)}}catch(err){}}},true);
window.PEBBLE_HUB_REPORTS={stats,records,helpTopics,buildDocx,csv,model,RS,windowInfo};
})();
