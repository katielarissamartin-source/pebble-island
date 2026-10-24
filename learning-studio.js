(function(){
"use strict";
const B=window.PEBBLE_QCAA_LESSONS,A=window.PEBBLE_ADAPTIVE;
if(!B||!A||!document.getElementById("app"))return;
const TITLE="Pebble Learning Path",NAMES={maths:"Mathematics",english:"English"},SYMBOLS={maths:"🔢",english:"📖"},YRS=[0,1,2,3,4,5,6];
const LABEL=y=>Number(y)===0?"Prep":"Year "+y,app=()=>document.getElementById("app");
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const route={page:"dashboard",area:null,index:0,kid:0,year:2};
let unlocked=false,step=0,asked=[],firstTry=0,misses=0,lesson=null,corrected=0;
const getYear=(k=kid)=>{S.pathwayYear=S.pathwayYear||{};return S.pathwayYear[k]??((S.kids[k]?.age||7)>=11?6:(S.kids[k]?.age||7)>=10?5:(S.kids[k]?.age||7)>=9?4:(S.kids[k]?.age||7)>=8?3:(S.kids[k]?.age||7)>=7?2:(S.kids[k]?.age||7)>=6?1:0)};
const setYear=(y)=>{S.pathwayYear[kid]=Number(y);save()};
const data=(y=getYear())=>({[y]:{english:B[y]?.english||[],maths:B[y]?.maths||[]}});
const lessons=(y,area)=>B[y]?.[area]||[];
const record=(y,area,l,k=kid)=>A.state(S,k,y,area,l.id);
const summaries=(k=kid,y=getYear(k))=>A.stats(S,k,y,data(y));
const recommendation=(k=kid,y=getYear(k),area)=>A.recommend(S,k,y,data(y),Date.now(),area);
const status=(s)=>A.due(s)?{kind:"review",label:"Review due"}:A.status(s);
const tag=(s)=>{const v=status(s);return'<span class="studio-tag" data-kind="'+v.kind+'">'+esc(v.label)+'</span>'};
const niceDate=t=>t?new Date(t).toLocaleDateString("en-AU",{day:"numeric",month:"short",year:"numeric"}):"Not started";
const due=s=>A.dueText(s);
const name=(k=kid)=>S.kids[k]?.name||"Learner "+(k+1);
const assignment=(k=kid)=>S.pathwayAssignments?.[k]||null;
const source=(y,area)=>"https://www.qcaa.qld.edu.au/downloads/aciqv9/"+(area==="maths"?"mathematics/curriculum/ac9_maths_":"english/curriculum/ac9_english_")+(y===0?"prep":"yr"+y)+"_as_cd_alignment.pdf";
const iconGood="✓";
const styles=document.createElement("style");
styles.textContent=[
".studio-root{max-width:1010px;width:100%;margin:0 auto;display:grid;gap:17px;line-height:1.55}",
".studio-root *{box-sizing:border-box}",
".studio-root h1,.studio-root h2,.studio-root h3{background:none!important;-webkit-text-fill-color:currentColor!important;color:var(--ink)!important;letter-spacing:-.015em}",
".studio-root h1{font-size:clamp(1.8rem,5vw,2.45rem)}.studio-root h2{font-size:clamp(1.25rem,3.5vw,1.65rem)}.studio-root h3{font-size:1.1rem}",
".studio-root p{margin:0}.studio-root button{line-height:1.35}.studio-root :is(button,a,input,select,textarea):focus-visible{outline:4px solid #1e86a3;outline-offset:3px}",
".studio-bar{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}",
".studio-bar .studio-link{min-height:49px}",
".studio-hero,.studio-panel{background:var(--panel);border:2px solid var(--line);border-radius:23px;padding:clamp(16px,3.5vw,26px);display:grid;gap:11px;box-shadow:0 5px 0 color-mix(in srgb,var(--line) 75%,transparent)}",
".studio-hero{background:linear-gradient(120deg,color-mix(in srgb,var(--panel) 85%,#9be8f2),var(--panel))}",
".studio-eyebrow{font:800 .75rem var(--display);text-transform:uppercase;letter-spacing:.07em;color:var(--ink)}",
".studio-sub{font-size:1rem;color:var(--ink);opacity:.95;max-width:68ch}",
".studio-note{font-size:.84rem;color:var(--ink);opacity:.88;line-height:1.5}",
".studio-row{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}",
".studio-buttons{display:flex;gap:10px;align-items:center;flex-wrap:wrap}",
".studio-button{min-height:48px;border-radius:13px;border:2px solid #648795;padding:10px 17px;background:var(--panel)!important;color:var(--ink)!important;font:750 .9rem var(--display)}",
".studio-button.primary{background:#125877!important;border-color:#125877!important;color:#fff!important;min-height:53px}",
".studio-button[disabled]{opacity:.6;cursor:not-allowed}",
".studio-year{display:flex;gap:7px;flex-wrap:wrap}",
".studio-year button[aria-pressed=true],.studio-year button.active{background:#125877!important;border-color:#125877!important;color:#fff!important}",
".studio-number-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}",
".studio-number{padding:13px 10px;background:var(--panel);border:2px solid var(--line);border-radius:16px;display:grid;gap:4px;text-align:center}",
".studio-number strong{font:800 clamp(1.2rem,4vw,1.85rem) var(--display);color:var(--ink)}",
".studio-number span{font:700 .8rem var(--body);color:var(--ink)}",
".studio-callout{border:2px solid #317e99;border-radius:22px;padding:clamp(16px,3vw,25px);background:var(--panel);display:grid;gap:11px}",
".studio-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,265px),1fr));gap:13px}",
".studio-card{background:var(--panel)!important;border:2px solid var(--line);border-radius:19px;min-height:135px;padding:18px;display:grid;gap:7px;text-align:left;align-content:start;color:var(--ink)!important}",
".studio-card:hover,.studio-card:focus-visible{border-color:#277e9d}",
".studio-card h3{font:800 1.08rem var(--display);margin:0}",
".studio-card .studio-emoji{font-size:2rem;line-height:1.1}",
".studio-card .studio-note{max-width:55ch}",
".studio-card[data-complete=true]{border-color:#4e8a63}",
".studio-tag{font:750 .75rem var(--display);padding:5px 11px;border:2px solid var(--line);border-radius:999px;display:inline-flex;align-items:center;width:fit-content;background:var(--panel);color:var(--ink)}",
".studio-tag[data-kind=review]{background:#fff2da;color:#654116;border-color:#b48b3b}",
".studio-tag[data-kind=strong]{background:#e1f5e7;color:#225237;border-color:#3d8856}",
".studio-tag[data-kind=growing]{background:#e1edff;color:#244977;border-color:#4582c3}",
".studio-tag[data-kind=learning]{background:#eff2f5;color:#274454;border-color:#77919d}",
".studio-tag[data-kind=practice]{background:#fff0e5;color:#773d26;border-color:#bd7955}",
".studio-grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}",
".studio-answer{min-height:62px;width:100%;padding:15px;background:var(--panel)!important;border:2px solid #74939a;border-radius:15px;text-align:left;color:var(--ink)!important;font:750 1rem var(--display)}",
".studio-answer:disabled{opacity:1;cursor:default}",
".studio-answer.wrong{background:#ffebdf!important;border-color:#b5693f;color:#6f3217!important}",
".studio-answer.right{background:#e0f4e5!important;border-color:#2b8554;color:#1d5433!important}",
".studio-answer-list{display:grid;gap:10px}",
".studio-feedback{border:2px solid var(--line);padding:15px;border-radius:15px;background:var(--panel);color:var(--ink);line-height:1.55}",
".studio-feedback[hidden]{display:none!important}",
".studio-progress{height:10px;background:#b9d4db;border-radius:999px;overflow:hidden}",
".studio-progress>i{display:block;background:#246a89;height:100%;border-radius:999px}",
".studio-example{border-left:5px solid #327a9c;border-radius:0 12px 12px 0;padding:14px 16px;background:var(--bg2);color:var(--ink);line-height:1.5}",
".studio-example strong{display:block;margin-bottom:4px}",
".studio-lab{font-size:1.07rem;line-height:1.68}",
".studio-table-wrap{overflow:auto;max-width:100%;border-radius:14px;border:1px solid var(--line)}",
".studio-table{border-collapse:collapse;width:100%;min-width:590px;font-size:.85rem}",
".studio-table th,.studio-table td{padding:11px;border-bottom:1px solid var(--line);vertical-align:top;text-align:left}",
".studio-table th{font:800 .84rem var(--display)}",
".studio-select,.studio-field{font:700 .95rem var(--body);width:100%;max-width:550px;min-height:48px;border:2px solid var(--line);border-radius:11px;padding:9px 12px;color:var(--ink);background:var(--panel)}",
".studio-field[type=number]{max-width:180px}",
".studio-question{border:2px solid var(--line);border-radius:18px;padding:19px;display:grid;gap:11px;background:var(--panel)}",
".studio-details{border:2px solid var(--line);padding:16px;border-radius:16px;background:var(--panel);line-height:1.5}",
".studio-details summary{cursor:pointer;font-weight:800}",
".studio-details a{color:var(--ink);overflow-wrap:anywhere;text-decoration:underline}",
".studio-softbox{background:var(--bg2);border:2px solid var(--line);border-radius:15px;padding:14px}",
".studio-offer{border:2px solid var(--line);border-radius:18px;background:var(--panel);padding:19px;display:grid;gap:8px}",
".studio-offer strong{font:800 1.1rem var(--display)}",
".studio-offer b{font:800 1.5rem var(--display)}",
".studio-label{font-weight:800;font-size:.92rem}",
".studio-checkbox{display:flex;align-items:flex-start;gap:9px;font-size:.95rem}",
".studio-checkbox input{width:22px;height:22px;flex:none;accent-color:#145b78}",
".studio-root .studio-button:focus-visible,.studio-root .studio-card:focus-visible{outline-color:#177c9f}",
".studio-high-contrast{--panel:#fff;--ink:#102328;--bg2:#edf8fc;--line:#173e4b;color-scheme:light}",
".studio-large-text{font-size:1.12em}.studio-large-text .studio-note{font-size:1rem}",
".studio-low-motion *{animation:none!important;transition:none!important;scroll-behavior:auto!important}",
".studio-banner{border:2px solid #699db0;border-radius:15px;padding:12px 15px;background:var(--panel);font-size:.93rem;line-height:1.4}",
".studio-banner strong{font-weight:800}",
".studio-hr{height:1px;background:var(--line);border:0;margin:4px 0}",
".studio-parentnav{display:flex;gap:8px;flex-wrap:wrap}",
".studio-parentnav button[aria-current=page]{background:#125877!important;color:#fff!important;border-color:#125877!important}",
".studio-card.queen{background:linear-gradient(140deg,#165d76,#27768a)!important;color:#fff!important;border-color:#b1e8e4!important;min-height:160px}",
".studio-card.queen :is(strong,small,span){color:#fff!important}",
".studio-entry{font:800 .95rem var(--display);border:2px solid #4a7d92;border-radius:15px;padding:12px 16px;background:var(--panel)!important;color:var(--ink)!important}",
"@media(max-width:480px){.studio-grid2{grid-template-columns:1fr}.studio-card{padding:15px}.studio-root{gap:12px}.studio-button{padding:10px 12px}.studio-hero,.studio-panel{padding:17px}.studio-number{padding:10px 6px}.studio-number span{font-size:.75rem}}",
"@media(max-width:335px){.studio-number-grid{grid-template-columns:1fr 1fr}.studio-bar{align-items:flex-start}}",
"@media print{body .scene,body .mascot,body .bubble,.studio-bar,.studio-parentnav,.studio-buttons,.studio-button,.studio-hero,.studio-entry{display:none!important}body{background:#fff;color:#000}.studio-root{max-width:none;font-size:12pt}.studio-panel,.studio-details{break-inside:avoid;box-shadow:none!important}table{page-break-inside:auto}.studio-table{min-width:0}}"
].join("\n");
document.head.appendChild(styles);
function config(){S.pathwaySettings=S.pathwaySettings||{};return S.pathwaySettings;}
function useConfig(){
 const root=app().querySelector(".studio-root");if(!root)return;
 const c=config();
 root.classList.toggle("studio-high-contrast",!!c.contrast);
 root.classList.toggle("studio-large-text",!!c.largeText);
 root.classList.toggle("studio-low-motion",!!c.lowMotion);
}
function screen(content){
 app().innerHTML='<main class="studio-root" aria-label="Pebble learning path">'+content+'</main>';
 useConfig();document.title=TITLE+" | Pebble Island";
 const focus=app().querySelector("[data-studio-heading]");
 if(focus){focus.tabIndex=-1;focus.focus({preventScroll:true})}
}
function bar(back="Map",callback=goMap){
 const aid="studio-back";
 setTimeout(()=>{const b=document.getElementById(aid);if(b)b.onclick=callback},0);
 return '<div class="studio-bar"><button type="button" class="studio-button" id="'+aid+'">← '+esc(back)+'</button><span class="studio-note">'+esc(name())+' · '+LABEL(getYear())+'</span></div>';
}
function goMap(){route.page="map";unlocked=false;lesson=null;round=null;document.title="Pebble Island | Learn and Play";render()}
function overviewStats(s){return '<div class="studio-number-grid"><div class="studio-number"><strong>'+s.explored+' / '+s.total+'</strong><span>Topics explored</span></div><div class="studio-number"><strong>'+s.due+'</strong><span>Reviews ready</span></div><div class="studio-number"><strong>'+s.strong+'</strong><span>Strong skills</span></div></div>'}
function showDashboard(){
 if(window.PEBBLE_TODAY)return window.PEBBLE_TODAY.show();
 route.page="dashboard";const year=getYear(),stats=summaries(),next=recommendation(),assigned=assignment();
 const chips=YRS.map(y=>'<button type="button" class="studio-button" data-studio-year="'+y+'" aria-pressed="'+(year===y)+'">'+LABEL(y)+'</button>').join("");
 const topics=["english","maths"].map(a=>{const list=lessons(year,a),count=list.filter(l=>record(year,a,l).sessions||record(year,a,l).legacy).length,d=list.filter(l=>A.due(record(year,a,l))).length;
 return '<button class="studio-card" type="button" data-studio-area="'+a+'"><span class="studio-emoji" aria-hidden="true">'+SYMBOLS[a]+'</span><h3>'+NAMES[a]+'</h3><span class="studio-note">'+(a==="english"?"Reading, phonics and writing":"Number sense and problem solving")+'</span><span class="studio-note">'+count+' of '+list.length+' explored · '+d+' reviews ready</span></button>'}).join("");
 const focus=next?'<section class="studio-callout"><span class="studio-eyebrow">Recommended next · '+(next.mode==="review"?"Spaced review":next.mode==="new"?"New skill":"Extra practice")+'</span><h2>'+esc(next.lesson.icon+" "+next.lesson.title)+'</h2><p class="studio-sub">'+esc(next.reason)+'</p><div class="studio-row">'+tag(record(year,next.area,next.lesson))+'<span class="studio-note">'+NAMES[next.area]+'</span></div><div class="studio-buttons"><button type="button" class="studio-button primary" id="studio-recommended">Let us learn →</button></div></section>':"";
 const task=assigned&&assigned.year===year&&lessons(year,assigned.area).some(l=>l.id===assigned.id)?'<div class="studio-banner"><strong>From your teacher:</strong> '+esc(lessons(year,assigned.area).find(l=>l.id===assigned.id).title)+' <button class="studio-entry" id="studio-task" type="button">Open lesson →</button></div>':"";
 screen(bar()+'<header class="studio-hero"><span class="studio-eyebrow">Australian Curriculum v9.0 · Developing core pathway</span><h1 data-studio-heading>My Learning Path</h1><p class="studio-sub">Little lessons that adapt as you learn. Explore a new idea, think it through, and come back for helpful reviews.</p><div class="studio-year" aria-label="Choose learning level">'+chips+'</div></header>'+task+focus+overviewStats(stats)+'<h2>Curriculum lessons</h2><p class="studio-sub">Guided lessons mapped to curriculum content descriptions. The full year-level program is still being developed; island games provide additional practice.</p><div class="studio-cards">'+topics+'</div><div class="studio-panel"><strong>Learning takes time.</strong><p class="studio-sub">There is no speed score and no penalty for needing help. Our strong-skill labels grow after correct answers on different days.</p><div class="studio-buttons"><button type="button" class="studio-button" id="studio-adult">For grown-ups</button><button type="button" class="studio-button" id="studio-access">Reading & display options</button><button type="button" class="studio-button" id="studio-discover">Science & discovery</button><button type="button" class="studio-button" id="studio-extra">Extra practice islands</button></div></div>');
 app().querySelectorAll("[data-studio-year]").forEach(b=>b.onclick=()=>{setYear(Number(b.dataset.studioYear));showDashboard()});
 app().querySelectorAll("[data-studio-area]").forEach(b=>b.onclick=()=>showSubject(b.dataset.studioArea));
 const n=document.getElementById("studio-recommended");if(n&&next)n.onclick=()=>start(next.area,next.index);
 const t=document.getElementById("studio-task");if(t&&assigned)t.onclick=()=>start(assigned.area,lessons(year,assigned.area).findIndex(l=>l.id===assigned.id));
 document.getElementById("studio-adult").onclick=showAdultGate;
 document.getElementById("studio-extra").onclick=goMap;
 document.getElementById("studio-access").onclick=()=>showSettings(false);
 document.getElementById("studio-discover").onclick=()=>{round=null;render();const cur=document.querySelector(".curr-card");if(cur)cur.click()};
}
function showSubject(a){
 route.page="subject";route.area=a;const year=getYear(),next=recommendation(kid,year,a),list=lessons(year,a);
 const suggest=next?'<div class="studio-callout"><strong>Suggested: '+esc(next.lesson.title)+'</strong><p>'+esc(next.reason)+'</p><button id="studio-subject-next" type="button" class="studio-button primary">Start suggested lesson →</button></div>':"";
 const cards=list.map((l,i)=>{const s=record(year,a,l),isDone=!!s.sessions||!!s.legacy;
 return '<button type="button" class="studio-card" data-studio-lesson="'+i+'" data-complete="'+isDone+'"><span class="studio-emoji" aria-hidden="true">'+esc(l.icon)+'</span><h3>'+esc(l.title)+'</h3><span class="studio-note">'+esc(l.goal)+'</span>'+tag(s)+'<span class="studio-note">'+esc(due(s))+'</span></button>'}).join("");
 screen(bar("Today",showDashboard)+'<header class="studio-hero"><span class="studio-eyebrow">'+LABEL(year)+' · '+NAMES[a]+'</span><h1 data-studio-heading>'+NAMES[a]+' pathway</h1><p class="studio-sub">Follow the recommended order or choose a topic. Practising on later days helps the learning stick.</p></header>'+suggest+'<div class="studio-cards">'+cards+'</div>');
 app().querySelectorAll("[data-studio-lesson]").forEach(b=>b.onclick=()=>start(a,Number(b.dataset.studioLesson)));
 const n=document.getElementById("studio-subject-next");if(n&&next)n.onclick=()=>start(a,next.index);
}
function start(a,i){
 const year=getYear();if(!lessons(year,a)[i])return showSubject(a);
 route.page="teach";route.area=a;route.index=i;lesson=lessons(year,a)[i];step=0;asked=[];firstTry=0;misses=0;
 const st=record(year,a,lesson);
 window.PEBBLE_JOURNEY.run({lesson,st,A,key:A.lessonKey(year,a,lesson.id),returning:st.sessions>0||!!st.legacy,backLabel:"Topics",onBack:()=>showSubject(a),onFinish:r=>{asked=r.ids;firstTry=r.firstTry;misses=r.misses;finish()}});
}
function finish(){
 route.page="finish";const y=getYear(),a=route.area,key=A.lessonKey(y,a,lesson.id);
 S.curriculumProgress=S.curriculumProgress||{};const p=S.curriculumProgress[kid]||(S.curriculumProgress[kid]={}),old=p[key]||{},first=!old.done;
 const rs=A.recordSession(S,kid,y,a,lesson.id,{questions:asked.length,firstTry,misses,questionIds:asked});
 p[key]={...old,done:true,tries:(old.tries||0)+1,lastMistakes:misses};
 if(first){S.progress[kid]=S.progress[kid]||{};const progress=S.progress[kid].curriculum||(S.progress[kid].curriculum={stars:0});progress.stars=(progress.stars||0)+1}
 save();
 if(window.PEBBLE_WORLD?.noteLesson)window.PEBBLE_WORLD.noteLesson({child:kid,area:a,year:y,title:lesson.title,newStar:first});
 const next=recommendation();
 const title=rs.high?(rs.creditAllowed?"Great independent thinking!":"Good practice. Come back again another day."):"You kept going, and that is how learning grows. We will practise this again soon.";
 const follow='<button type="button" class="studio-button primary" id="studio-follow">Follow my learning path →</button><button type="button" class="studio-button" id="studio-island">🏝️ Return to island</button>';
 screen(bar("Topics",()=>showSubject(a))+'<div class="studio-panel"><span class="studio-eyebrow">All done</span><h1 data-studio-heading>'+esc(lesson.icon+" "+lesson.title)+'</h1><p class="studio-lab">'+title+'</p><p class="studio-note">You worked on: '+esc(lesson.goal)+'</p>'+tag(rs.state)+'<div class="studio-grid2"><div class="studio-number"><strong>'+esc(due(rs.state))+'</strong><span>Next review</span></div></div><p class="studio-note">'+(first?"A new lesson star has been earned.":"Your previously earned stars are kept.")+'</p><div class="studio-example"><strong>Try this away from the screen</strong>'+esc(lesson.tryIt)+'</div><div class="studio-buttons">'+follow+'<button type="button" class="studio-button" id="studio-again">Practise again</button><button type="button" class="studio-button" id="studio-other">Choose a topic</button></div></div>');
 document.getElementById("studio-follow").onclick=()=>next?start(next.area,next.index):showDashboard();
 document.getElementById("studio-island").onclick=goMap;
 document.getElementById("studio-again").onclick=()=>start(a,route.index);
 document.getElementById("studio-other").onclick=()=>showSubject(a);
 if(typeof SFX!=="undefined")SFX.win();
}
function showSettings(fromAdult=false){
 route.page="settings";const c=config();
 const checkbox=(key,label,sub)=>'<label class="studio-checkbox"><input type="checkbox" data-studio-setting="'+key+'" '+(c[key]?"checked":"")+'><span><strong>'+esc(label)+'</strong><span class="studio-note" style="display:block">'+esc(sub)+'</span></span></label>';
 screen(bar(fromAdult?"Grown-ups":"Learning path",fromAdult?()=>showParent("overview"):showDashboard)+'<header class="studio-hero"><h1 data-studio-heading>Reading & display options</h1><p class="studio-sub">Choose the learning display that works best for this device.</p></header><div class="studio-panel">'+checkbox("contrast","Higher contrast","Uses clear borders and dark text on light cards.")+'<hr class="studio-hr">'+checkbox("largeText","Larger lesson text","Increases reading size in the Learning Path.")+'<hr class="studio-hr">'+checkbox("lowMotion","Reduce animations","Turns off Learning Path animations and transitions.")+'</div><div class="studio-banner">Read-aloud buttons are available inside lessons. Device accessibility settings, including reduced motion, are also respected.</div>');
 app().querySelectorAll("[data-studio-setting]").forEach(b=>b.onchange=()=>{c[b.dataset.studioSetting]=b.checked;save();useConfig()});
}
function showAdultGate(){
 route.page="adult-gate";if(unlocked)return showParent("overview");
 screen(bar("Today",showDashboard)+'<header class="studio-hero"><span class="studio-eyebrow">For parents and educators</span><h1 data-studio-heading>Grown-up area</h1><p class="studio-sub">Reports, data controls, pilot plans and classroom experiments live here, away from the children’s learning screens.</p></header><div class="studio-panel"><label class="studio-label" for="studio-verify">Quick grown-up check: what is 18 + 7?</label><input type="number" inputmode="numeric" class="studio-field" id="studio-verify" aria-describedby="studio-lock-note"><p id="studio-lock-note" class="studio-note">This check prevents accidental opening; it is not a secure account login. Children who can solve it may enter. Do not use shared devices for confidential records.</p><button class="studio-button primary" id="studio-unlock">Open grown-up area</button><div class="studio-feedback" role="status" id="studio-verify-feedback" hidden></div></div>');
 document.getElementById("studio-unlock").onclick=()=>{if(Number(document.getElementById("studio-verify").value)===25){unlocked=true;showParent("overview")}else{const f=document.getElementById("studio-verify-feedback");f.hidden=false;f.textContent="That answer does not match. Please try again."}};
 document.getElementById("studio-verify").onkeydown=e=>{if(e.key==="Enter")document.getElementById("studio-unlock").click()};
}
function reportRows(k,y){return ["english","maths"].flatMap(a=>lessons(y,a).map(l=>{const s=record(y,a,l,k);return{student:name(k),year:LABEL(y),area:NAMES[a],title:l.title,code:l.code,status:status(s).label,sessions:s.sessions,accuracy:s.questions?Math.round(100*s.firstTry/s.questions):null,firstTry:s.firstTry,attempted:s.questions,lastPractised:niceDate(s.lastAt),nextReview:due(s)}}))}
function allStats(){
 const p=S.kids.map((v,k)=>({kid:k,name:name(k),levels:YRS.map(y=>({y,stat:summaries(k,y)}))}));
 return p;
}
function parentNav(tab){
 const options=[["overview","Overview"],["reports","Learning reports"],["curriculum","Curriculum coverage"],["school","School pilot"],["plans","Pilot pricing"],["privacy","Privacy & settings"]];
 return '<nav class="studio-parentnav" aria-label="Grown-up area sections">'+options.map(([id,label])=>'<button type="button" class="studio-button" data-studio-tab="'+id+'" '+(tab===id?'aria-current="page"':"")+'>'+label+'</button>').join("")+'</nav>';
}
function showParent(tab="overview"){
 if(!unlocked)return showAdultGate();
 route.page="parent";route.tab=tab;
 const head=bar("Island map",goMap)+'<header class="studio-hero"><span class="studio-eyebrow">Pebble Island · Family and school pilot</span><h1 data-studio-heading>Grown-up dashboard</h1><p class="studio-sub">Learning records and curriculum coverage for this device. Short quizzes are not official grades, accredited assessments or proof that a year-level curriculum is complete.</p></header>'+parentNav(tab);
 screen(head+'<div class="studio-panel" id="studio-parent-content"></div>');
 app().querySelectorAll("[data-studio-tab]").forEach(b=>b.onclick=()=>showParent(b.dataset.studioTab));
 if(tab==="reports")renderReports();else if(tab==="curriculum")renderCurriculumAudit();else if(tab==="school")renderSchool();else if(tab==="plans")renderPlans();else if(tab==="privacy")renderPrivacy();else renderOverview();
}
const panel=()=>document.getElementById("studio-parent-content");
function renderCurriculumAudit(){const a=window.PEBBLE_CURRICULUM_AUDIT;panel().innerHTML=a?a.render():"<p>Curriculum audit unavailable. Reload while online.</p>";}
function renderOverview(){
 const cards=S.kids.map((v,k)=>{const y=getYear(k),s=summaries(k,y),all=YRS.map(yy=>summaries(k,yy)).reduce((acc,x)=>({studied:acc.studied+x.explored,strong:acc.strong+x.strong,due:acc.due+x.due}),{studied:0,strong:0,due:0});
 return '<article class="studio-offer"><strong>'+esc(name(k))+'</strong><span class="studio-note">Current pathway: '+LABEL(y)+'</span><div class="studio-grid2"><div class="studio-number"><strong>'+s.explored+'/'+s.total+'</strong><span>Topics explored at selected level</span></div><div class="studio-number"><strong>'+all.due+'</strong><span>Reviews due across levels</span></div></div><span class="studio-note">Strong skills (all levels): '+all.strong+' · Topics explored: '+all.studied+'</span><button type="button" class="studio-button" data-studio-report="'+k+'">View learning report</button></article>'}).join("");
 panel().innerHTML='<h2>Family learning summary</h2><p class="studio-sub">See what each child has explored and which topics may need another practice session. Progress is stored in this browser.</p><div class="studio-cards">'+cards+'</div><div class="studio-banner"><strong>What the labels mean:</strong> New = not tried; Learning = first independent success; Growing = more evidence; Strong = successful reviews over multiple days; Review due = scheduled practice. We do not use time pressure to measure ability.</div><div class="studio-buttons"><button type="button" class="studio-button" id="studio-overview-report">Detailed reports</button><button type="button" class="studio-button" id="studio-overview-print">Print overview</button></div>';
 panel().querySelectorAll("[data-studio-report]").forEach(b=>b.onclick=()=>{route.reportKid=Number(b.dataset.studioReport);showParent("reports")});
 document.getElementById("studio-overview-report").onclick=()=>showParent("reports");
 document.getElementById("studio-overview-print").onclick=()=>window.print();
}
function csvEscape(v){const s=String(v??"");return /[",\n\r]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s}
function download(file,body,type="text/csv;charset=utf-8"){
 const blob=new Blob([body],{type}),url=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=url;a.download=file;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function renderReports(){
 const k=Number.isInteger(route.reportKid)?route.reportKid:0,y=Number.isInteger(route.reportYear)?route.reportYear:getYear(k);
 const rows=reportRows(k,y);
 const select='<div class="studio-grid2"><label><span class="studio-label">Learner</span><select id="studio-report-kid" class="studio-select">'+S.kids.map((v,i)=>'<option value="'+i+'" '+(k===i?"selected":"")+'>'+esc(name(i))+'</option>').join("")+'</select></label><label><span class="studio-label">Year level</span><select id="studio-report-year" class="studio-select">'+YRS.map(v=>'<option value="'+v+'" '+(y===v?"selected":"")+'>'+LABEL(v)+'</option>').join("")+'</select></label></div>';
 const table='<div class="studio-table-wrap"><table class="studio-table"><caption>Curriculum-linked practice evidence for '+esc(name(k))+' · '+LABEL(y)+'</caption><thead><tr><th scope="col">Skill</th><th scope="col">Area / code</th><th scope="col">Estimate</th><th scope="col">First try</th><th scope="col">Review</th></tr></thead><tbody>'+rows.map(r=>'<tr><th scope="row">'+esc(r.title)+'</th><td>'+esc(r.area)+'<div class="studio-note">'+esc(r.code)+'</div></td><td>'+esc(r.status)+'<div class="studio-note">'+r.sessions+' session(s)</div></td><td>'+(r.accuracy===null?"No data":r.accuracy+"%")+'</td><td>'+esc(r.nextReview)+'</td></tr>').join("")+'</tbody></table></div>';
 const kids=allStats();
 panel().innerHTML='<h2>Learning report</h2><p class="studio-sub">These are short practice sessions, not standardised exams. A completed task does not automatically mean a skill is mastered. Consider discussing difficult topics with a teacher.</p>'+select+overviewStats(summaries(k,y))+table+'<div class="studio-buttons"><button type="button" id="studio-report-csv" class="studio-button primary">Export CSV</button><button type="button" id="studio-report-print" class="studio-button">Print this report</button><button type="button" id="studio-report-json" class="studio-button">Back up learning data (JSON)</button></div><div class="studio-details"><strong>Curriculum source</strong><p><a href="'+source(y,"maths")+'" target="_blank" rel="noopener noreferrer">QCAA Mathematics · '+LABEL(y)+'</a> · <a href="'+source(y,"english")+'" target="_blank" rel="noopener noreferrer">QCAA English · '+LABEL(y)+'</a></p><p class="studio-note">Original practice content; curriculum codes are working mappings awaiting external teacher review. This is not a full curriculum or government endorsement. © State of Queensland (QCAA) 2023; curriculum source attribution and licence exceptions apply.</p></div>';
 document.getElementById("studio-report-kid").onchange=e=>{route.reportKid=Number(e.target.value);renderReports()};
 document.getElementById("studio-report-year").onchange=e=>{route.reportYear=Number(e.target.value);renderReports()};
 document.getElementById("studio-report-print").onclick=()=>window.print();
 document.getElementById("studio-report-csv").onclick=()=>{const keys=["student","year","area","title","code","status","sessions","accuracy","firstTry","attempted","lastPractised","nextReview"];download("pebble-learning-"+k+"-"+y+".csv",[keys.join(","),...rows.map(r=>keys.map(key=>csvEscape(r[key])).join(","))].join("\r\n"))};
 document.getElementById("studio-report-json").onclick=()=>{
  const extract={exportedAt:new Date().toISOString(),version:1,notice:"Local learning records only. Protect this file.",learners:S.kids.map((v,i)=>({index:i,name:name(i)})),curriculumProgress:S.curriculumProgress||{},adaptive:S.curriculumAdaptive||{},pathwayYear:S.pathwayYear||{},pathwayAssignments:S.pathwayAssignments||{}};
  download("pebble-learning-backup.json",JSON.stringify(extract,null,2),"application/json");
 };
}
function renderSchool(){
 const assignments=S.pathwayAssignments||(S.pathwayAssignments={}),k=Number.isInteger(route.schoolKid)?route.schoolKid:0,y=Number.isInteger(route.schoolYear)?route.schoolYear:getYear(k);
 const cats=["english","maths"],candidate=cats.flatMap(a=>lessons(y,a).map(l=>({area:a,lesson:l}))),assigned=assignments[k];
 const opts=candidate.map(({area,lesson})=>'<option value="'+esc(area+"::"+lesson.id)+'">'+esc(NAMES[area]+" — "+lesson.title)+'</option>').join("");
 const children=S.kids.map((v,i)=>'<tr><th scope="row">'+esc(name(i))+'</th><td>'+LABEL(getYear(i))+'</td><td>'+YRS.map(z=>summaries(i,z).explored).reduce((a,b)=>a+b,0)+'</td><td>'+YRS.map(z=>summaries(i,z).due).reduce((a,b)=>a+b,0)+'</td></tr>').join("");
 panel().innerHTML='<h2>Classroom pilot · Same-device preview</h2><p class="studio-sub">Explore what a teacher view could look like using the child profiles already on this device. This is <strong>not</strong> a shared classroom account, school deployment or an approved Queensland education service.</p><div class="studio-table-wrap"><table class="studio-table"><caption>Local practice profiles</caption><thead><tr><th>Learner</th><th>Selected level</th><th>Topics explored</th><th>Reviews ready</th></tr></thead><tbody>'+children+'</tbody></table></div><div class="studio-softbox"><h3>Set a local practice task</h3><div class="studio-grid2"><label><span class="studio-label">Learner</span><select id="studio-school-kid" class="studio-select">'+S.kids.map((v,i)=>'<option value="'+i+'" '+(k===i?"selected":"")+'>'+esc(name(i))+'</option>').join("")+'</select></label><label><span class="studio-label">Year</span><select id="studio-school-year" class="studio-select">'+YRS.map(z=>'<option value="'+z+'" '+(y===z?"selected":"")+'>'+LABEL(z)+'</option>').join("")+'</select></label></div><label><span class="studio-label">Lesson</span><select id="studio-school-lesson" class="studio-select">'+opts+'</select></label><div class="studio-buttons"><button type="button" class="studio-button primary" id="studio-assign">Assign on this device</button><button type="button" class="studio-button" id="studio-remove-assignment">Remove assignment</button></div><p class="studio-note">Current assignment: '+(assigned?esc((lessons(assigned.year,assigned.area).find(l=>l.id===assigned.id)||{}).title||"Unknown topic")+" · "+LABEL(assigned.year):"None")+'</p></div><div class="studio-banner">Before a school launch: independently review lesson alignment, deploy secure school accounts, access controls, data retention, consent and Queensland procurement requirements. No student data is sent to a teacher or school from this view.</div>';
 document.getElementById("studio-school-kid").onchange=e=>{route.schoolKid=Number(e.target.value);renderSchool()};
 document.getElementById("studio-school-year").onchange=e=>{route.schoolYear=Number(e.target.value);renderSchool()};
 document.getElementById("studio-assign").onclick=()=>{const [area,id]=document.getElementById("studio-school-lesson").value.split("::");if(!lessons(y,area).some(l=>l.id===id))return;assignments[k]={year:y,area,id,at:Date.now()};save();renderSchool()};
 document.getElementById("studio-remove-assignment").onclick=()=>{delete assignments[k];save();renderSchool()};
}
function renderPlans(){
 const offers=[
 ["Starter","Free","Core learning practice, read-aloud controls, accessible interface and basic progress","Prototype access; no advertising"],
 ["Pebble Plus","A$8.99/month","Proposed A$79 annual option: adaptive pathways, full library, parent reports and future sync","Concept only; subscription payments are not enabled"],
 ["School pilot","A$149/year","Proposed pricing for a small pilot classroom, after school security and approval work","Concept only; no school licences are being sold"]
 ];
 const blocks=offers.map(([title,price,desc,note])=>'<article class="studio-offer"><strong>'+esc(title)+'</strong><b>'+esc(price)+'</b><p>'+esc(desc)+'</p><span class="studio-note">'+esc(note)+'</span></article>').join("");
 S.pathwayPilot=S.pathwayPilot||{};const p=S.pathwayPilot;
 panel().innerHTML='<h2>Family & school offer concepts</h2><p class="studio-sub">Pricing is for market testing only. All prototype learning pathways remain accessible without payment. No checkout, billing details or subscription account exists.</p><div class="studio-cards">'+blocks+'</div><hr class="studio-hr"><h3>Private parent feedback</h3><p class="studio-sub">Would a complete, reviewed literacy and numeracy learning platform be useful to your family?</p><label><span class="studio-label">How useful?</span><select class="studio-select" id="studio-survey-value"><option value="unsure">Not sure yet</option><option value="very">Very useful</option><option value="somewhat">Somewhat useful</option><option value="not">Not useful for us</option></select></label><label><span class="studio-label">Price you would consider (monthly)</span><select class="studio-select" id="studio-survey-price"><option value="0">Free only</option><option value="6.99">A$6.99</option><option value="8.99">A$8.99</option><option value="12.99">A$12.99</option></select></label><div class="studio-buttons"><button id="studio-survey-save" type="button" class="studio-button primary">Save feedback on this device</button><button id="studio-survey-export" type="button" class="studio-button">Export feedback JSON</button></div><div class="studio-feedback" id="studio-survey-feedback" role="status" hidden></div><div class="studio-banner">Local feedback does not create a waitlist or contact the developer. Export it if you want to share it. A commercial launch will require a secure backend, payment provider, terms, customer support and privacy review.</div>';
 document.getElementById("studio-survey-value").value=p.value||"unsure";
 document.getElementById("studio-survey-price").value=p.price||"0";
 document.getElementById("studio-survey-save").onclick=()=>{p.value=document.getElementById("studio-survey-value").value;p.price=document.getElementById("studio-survey-price").value;p.at=new Date().toISOString();save();const f=document.getElementById("studio-survey-feedback");f.hidden=false;f.textContent="Saved locally on this device. No details were submitted online."};
 document.getElementById("studio-survey-export").onclick=()=>download("pebble-pilot-feedback.json",JSON.stringify({savedAt:p.at||null,usefulness:p.value||null,monthlyPrice:p.price||null},null,2),"application/json");
}
function renderPrivacy(){
 const c=config();
 panel().innerHTML='<h2>Privacy, access and data controls</h2><p class="studio-sub">Learning Path adaptive progress, practice history, assignments and pilot feedback are saved on this browser/device. They do not synchronise to another device. This app does not currently offer paid subscriptions or a managed school account.</p><div class="studio-softbox"><strong>How learning data is used</strong><p>Correct answers and practice dates influence review timing and recommendations. No location, health data or school identifiers are requested by the Learning Path. Web hosting may process routine requests, and the existing game has its own local profile data.</p></div><div class="studio-buttons"><button type="button" class="studio-button" id="studio-privacy-settings">Display & accessibility</button><a class="studio-button" style="text-decoration:none;display:inline-flex;align-items:center" href="/privacy.html" target="_blank" rel="noopener noreferrer">Read privacy information ↗</a><a class="studio-button" style="text-decoration:none;display:inline-flex;align-items:center" href="/terms.html" target="_blank" rel="noopener noreferrer">Read service terms ↗</a></div><hr class="studio-hr"><h3>Remove a child’s learning records from this device</h3><p class="studio-sub">Deletes curriculum learning progress, reviews and any local assignment for the selected child. Other Pebble Island game progress remains untouched. Back up first if needed.</p><label><span class="studio-label">Choose learner</span><select class="studio-select" id="studio-delete-kid">'+S.kids.map((v,k)=>'<option value="'+k+'">'+esc(name(k))+'</option>').join("")+'</select></label><label><span class="studio-label">Type DELETE to confirm</span><input class="studio-field" id="studio-delete-confirm" type="text" autocomplete="off" spellcheck="false" placeholder="DELETE"></label><button type="button" class="studio-button" id="studio-delete-action">Delete this child’s curriculum progress</button><div id="studio-delete-feedback" class="studio-feedback" role="status" hidden></div><div class="studio-banner"><strong>Account-security limitation:</strong> the grown-up check is only a basic barrier to accidental entry, not authentication. A cloud-backed service would need verified adult accounts, access policies and professional security testing.</div>';
 document.getElementById("studio-privacy-settings").onclick=()=>showSettings(true);
 document.getElementById("studio-delete-action").onclick=()=>{
  const k=Number(document.getElementById("studio-delete-kid").value),word=document.getElementById("studio-delete-confirm").value.trim(),fb=document.getElementById("studio-delete-feedback");
  fb.hidden=false;
  if(word!=="DELETE"){fb.textContent="Type DELETE exactly to enable this action.";return}
  if(!confirm("Remove "+name(k)+"'s curriculum progress and adaptive reviews from this browser? This cannot be undone.")){fb.textContent="Nothing was deleted.";return}
  if(S.curriculumProgress)delete S.curriculumProgress[k];
  if(S.curriculumAdaptive?.profiles)delete S.curriculumAdaptive.profiles[k];
  if(S.progress?.[k])delete S.progress[k].curriculum;
  if(S.pathwayAssignments)delete S.pathwayAssignments[k];
  if(S.pathwayYear)delete S.pathwayYear[k];
  save();fb.textContent="Curriculum progress for "+name(k)+" was cleared from this device.";document.getElementById("studio-delete-confirm").value="";
 };
}
function addIsland(){
 const mapEl=document.querySelector("#app .map");if(!mapEl||mapEl.querySelector("[data-learning-path]")||kid===null)return;
 const b=document.createElement("button");b.type="button";b.className="world studio-card queen";b.dataset.learningPath="true";
 const y=getYear(),s=summaries(),next=recommendation();
 b.innerHTML='<span class="studio-emoji" aria-hidden="true">📚</span><span><strong style="font:800 1.4rem var(--display);display:block;color:#fff">My Learning Path</strong><small style="display:block;color:#fff">English & maths · '+LABEL(y)+' · '+s.due+' reviews ready</small></span>';
 b.onclick=()=>{round=null;unlocked=false;showDashboard()};
 mapEl.prepend(b);
 const intro=document.querySelector("#app .dashboard-copy");
 if(intro&&!intro.querySelector("[data-grownup]")){
  const adult=document.createElement("button");adult.type="button";adult.className="studio-entry";adult.dataset.grownup="true";adult.textContent="Grown-ups: progress and reports";
  adult.onclick=()=>{round=null;showAdultGate()};intro.appendChild(adult);
 }
 const tab=document.querySelector(".island-filters");
 const sync=()=>{
  const current=tab?.querySelector("[aria-pressed=true]")?.dataset.cat||"all";
  b.hidden=!(current==="all"||current==="reading"||current==="maths");
 };
 if(tab)tab.addEventListener("click",()=>queueMicrotask(sync));sync();
}
const previousMap=map;map=function(){previousMap();addIsland()};
window.PEBBLE_STUDIO={showDashboard,showSubject,showAdultGate,showParent,start,reportRows,version:1};
})();
