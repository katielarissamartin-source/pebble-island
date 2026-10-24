(function(){
"use strict";
const B=window.PEBBLE_QCAA_LESSONS;
if(!B||!document.getElementById("app"))return;
const source={
science:{2:"https://www.qcaa.qld.edu.au/downloads/aciqv9/science/curriculum/ac9_science_yr2_as_cd_alignment.pdf",5:"https://www.qcaa.qld.edu.au/downloads/aciqv9/science/curriculum/ac9_science_yr5_as_cd_alignment.pdf"},
hass:{2:"https://www.qcaa.qld.edu.au/downloads/aciqv9/humanities-and-social-sciences/curriculum/ac9_hass_yr2_as_cd_alignment.pdf",5:"https://www.qcaa.qld.edu.au/downloads/aciqv9/humanities-and-social-sciences/curriculum/ac9_hass_yr5_as_cd_alignment.pdf"},
technologies:{2:"https://www.qcaa.qld.edu.au/downloads/aciqv9/technologies/curriculum/ac9_tech_yr1-2_as_cd_alignment.pdf",5:"https://www.qcaa.qld.edu.au/downloads/aciqv9/technologies/curriculum/ac9_tech_yr5-6_as_cd_alignment.pdf"}};
const styles=document.createElement("style");
styles.textContent=`
.curr-card{background:linear-gradient(140deg,#174f67,#27697d)!important;border:3px solid #a7e2e3!important;position:relative}
.curr-card b,.curr-card small{color:#fff!important;text-shadow:none!important}
.curr-shell{max-width:910px;margin:0 auto;width:100%;display:grid;gap:18px}
.curr-top{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.curr-label{font:700 .8rem var(--display);letter-spacing:.06em;text-transform:uppercase;color:var(--ink);opacity:.86}
.curr-head{background:var(--panel);border:2px solid var(--line);border-radius:24px;padding:clamp(18px,3vw,28px);display:grid;gap:8px}
.curr-head h1,.curr-head h2{font-size:clamp(1.5rem,5vw,2.35rem);color:var(--ink);background:none!important;-webkit-text-fill-color:currentColor!important}
.curr-head p,.curr-sub{font-size:1rem;color:var(--ink);line-height:1.6;margin:0}
.curr-meta{color:var(--ink);opacity:.85;font-size:.83rem}
.curr-controls{display:flex;gap:9px;align-items:center;flex-wrap:wrap}
.curr-controls button{font:700 .92rem var(--display);min-height:48px;border-radius:13px;background:var(--panel);border:2px solid #71949f;color:var(--ink);padding:8px 15px}
.curr-controls button[aria-pressed=true]{background:#185875;color:#fff;border-color:#185875}
.curr-course-grid,.curr-lessons{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:13px}
.curr-course,.curr-lesson{min-height:145px;background:var(--panel);border:2px solid var(--line);border-radius:22px;display:flex;flex-direction:column;text-align:left;align-items:flex-start;gap:9px;padding:19px;color:var(--ink)!important}
.curr-course strong,.curr-lesson strong{font:700 1.18rem var(--display)}
.curr-course span,.curr-lesson span{font-size:.94rem;line-height:1.4}
.curr-course .em,.curr-lesson .em{font-size:2rem}
.curr-course:hover,.curr-lesson:hover{border-color:#24718b}
.curr-lesson small{font-size:.83rem;color:var(--ink);opacity:.85}
.curr-lesson.complete{border-color:#2c7a55;background:color-mix(in srgb,var(--panel) 88%,#79d1a0)}
.curr-primary{border-radius:16px;min-height:56px;padding:12px 20px;font:700 1rem var(--display);background:#185875!important;color:#fff!important;text-align:center}
.curr-primary:disabled{opacity:.55;cursor:not-allowed}
.curr-secondary{border:2px solid #60828d!important;background:var(--panel)!important;color:var(--ink)!important;border-radius:16px;min-height:50px;padding:10px 17px;font:700 .94rem var(--display)}
.curr-actions{display:flex;gap:12px;flex-wrap:wrap}
.curr-teach{font-size:clamp(1.08rem,2.4vw,1.3rem)!important}
.curr-example{border-left:5px solid #2a7894;background:var(--bg2);padding:17px 19px;border-radius:0 15px 15px 0;line-height:1.55;color:var(--ink)}
.curr-example b{display:block;font:700 .86rem var(--display);margin-bottom:5px}
.curr-answers{display:grid;gap:10px}
.curr-answer{width:100%;border:2px solid #7b9ca5;border-radius:17px;padding:16px 18px;text-align:left;background:var(--panel)!important;color:var(--ink)!important;min-height:66px;font:700 1.05rem var(--display)}
.curr-answer:disabled{cursor:default;opacity:.78}
.curr-answer.correct{border-color:#287448;background:#e2f4e8!important;color:#1b5634!important}
.curr-answer.incorrect{border-color:#a44b32;background:#fff1e8!important;color:#7a2c1a!important}
.curr-feedback{border:2px solid var(--line);border-radius:18px;background:var(--panel);padding:18px;display:grid;gap:7px;line-height:1.5;color:var(--ink)}
.curr-feedback[data-result="correct"]{border-color:#287448}
.curr-feedback[data-result="incorrect"]{border-color:#ad6744}
.curr-progress{height:12px;border-radius:999px;background:#c6dce0;overflow:hidden}
.curr-progress span{display:block;height:100%;background:#246b86;transition:width .2s}
.curr-guide{background:var(--panel);border:2px solid var(--line);border-radius:19px;padding:18px;line-height:1.55}
.curr-guide summary{cursor:pointer;font-weight:700}
.curr-guide a{color:var(--ink);font-weight:700;text-decoration:underline;overflow-wrap:anywhere}
.curr-guide li{margin:6px 0}
@media(max-width:480px){.curr-actions>*{flex:1}.curr-course-grid,.curr-lessons{grid-template-columns:1fr 1fr}.curr-course,.curr-lesson{padding:12px;min-height:125px;border-radius:16px}.curr-course strong,.curr-lesson strong{font-size:1rem}}
@media(max-width:360px){.curr-course-grid,.curr-lessons{grid-template-columns:1fr}}
`;
document.head.appendChild(styles);
let area=null,active=null,step=0,mistakes=0,passed=0;
const app=()=>document.getElementById("app");
const safe=v=>String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const year=()=>{if(!S.curriculumYear)S.curriculumYear={};return S.curriculumYear[kid]||((S.kids[kid].age||7)>=9?5:2)};
const record=()=>{if(!S.curriculumProgress)S.curriculumProgress={};if(!S.curriculumProgress[kid])S.curriculumProgress[kid]={};return S.curriculumProgress[kid]};
const token=(a,l)=>year()+"-"+a+"-"+l.id;
const completed=(a,l)=>!!record()[token(a,l)]?.done;
const list=(a)=>B[year()][a];
const totalDone=()=>Object.keys(record()).filter(k=>k.startsWith(year()+"-")&&record()[k].done).length;
const layout=(contents)=>{app().innerHTML='<div class="curr-shell">'+contents+'</div>';const back=app().querySelector("[data-back]");if(back)back.onclick=()=>{if(window.speechSynthesis)speechSynthesis.cancel();active?(active=null,course(area)):home();};};
const top=(title,back="Map")=>'<div class="curr-top"><button class="curr-secondary" data-back type="button">← '+safe(back)+'</button><span class="pill">📘 Year '+year()+' · '+totalDone()+'/12 learned</span></div><div class="curr-head"><span class="curr-label">Queensland curriculum · AC v9.0</span><h1>'+safe(title)+'</h1></div>';
function syncFilters(){
 const mapEl=document.querySelector("#app .map"),card=mapEl?.querySelector("[data-qcaa]");
 if(!card)return;
 const cat=document.querySelector(".filter-tab[aria-pressed=true]")?.dataset.cat||"all";
 card.hidden=!(cat==="all"||cat==="discover");
}
function addMapCard(){
 const mapEl=document.querySelector("#app .map");if(!mapEl||mapEl.querySelector("[data-qcaa]"))return;
 const b=document.createElement("button");b.type="button";b.className="world curr-card";b.dataset.qcaa="true";b.innerHTML='<span class="ico" aria-hidden="true">🔬</span><span><b>Curiosity Lab</b><small>24 new curriculum-linked lessons across two year levels</small></span>';
 b.onclick=()=>{area=null;active=null;round=null;home()};
 mapEl.prepend(b);
 const filters=document.querySelector(".island-filters");if(filters)filters.addEventListener("click",()=>queueMicrotask(syncFilters));
 syncFilters();
}
const oldMap=map;
map=function(){oldMap();addMapCard()};
function home(){
 area=null;active=null;
 const courses=[["science","🔬","Science Lab","Discover how the world works"],["hass","🗺️","Our World","Places, history and community"],["technologies","💻","Tech & Design","Digital thinking and useful inventions"]];
 layout('<div class="curr-top"><button type="button" class="curr-secondary" id="qmap">← Island map</button><span class="pill">⭐ '+totalDone()+' / 12 lessons</span></div><div class="curr-head"><span class="curr-label">New adventures · Queensland curriculum</span><h1>Curiosity Lab</h1><p>Learn something, see an example, then solve two little challenges. Every completed lesson earns a star.</p><div class="curr-controls" aria-label="Select school year"><span class="curr-meta">Learning level:</span>'+[0,1,2,3,4,5,6].map(function(y){return '<button data-year="'+y+'" aria-pressed="'+(year()===y)+'">'+(y?'Year '+y:'Prep')+'</button>'}).join('')+'</div></div><div class="curr-course-grid">'+courses.map(([id,ico,n,sub])=>'<button type="button" class="curr-course" data-area="'+id+'"><span class="em" aria-hidden="true">'+ico+'</span><strong>'+n+'</strong><span>'+sub+'</span><small class="curr-meta">'+list(id).filter(l=>completed(id,l)).length+' of 4 lessons completed</small></button>').join("")+'</div><details class="curr-guide"><summary>For grown-ups: curriculum alignment and sources</summary><p>Original practice activities inspired by Queensland’s Australian Curriculum v9.0. This is supplementary practice, not a full curriculum or a formal assessment.</p><p><strong>Alignment is tied to content descriptions</strong>, not an endorsement by QCAA.</p><ul>'+courses.map(([id,,n])=>'<li><a href="'+source[id][year()]+'" target="_blank" rel="noopener noreferrer">'+n+': QCAA source</a></li>').join("")+'</ul><p>© State of Queensland (QCAA) 2023. <a href="https://www.qcaa.qld.edu.au/copyright" target="_blank" rel="noopener noreferrer">QCAA copyright and attribution</a>.</p></details>');
 document.getElementById("qmap").onclick=()=>{round=null;render()};
 app().querySelectorAll("[data-year]").forEach(b=>b.onclick=()=>{S.curriculumYear[kid]=Number(b.dataset.year);save();home()});
 app().querySelectorAll("[data-area]").forEach(b=>b.onclick=()=>course(b.dataset.area));
}
function course(a){
 area=a;active=null;
 const names={science:"Science Lab",hass:"Our World",technologies:"Tech & Design"};
 layout(top(names[a],"Curiosity Lab")+'<p class="curr-sub">Pick a mini-lesson. A lesson includes a simple explanation and two questions you can retry.</p><div class="curr-lessons">'+list(a).map((l,i)=>'<button type="button" class="curr-lesson '+(completed(a,l)?"complete":"")+'" data-lesson="'+i+'"><span class="em" aria-hidden="true">'+l.icon+'</span><strong>'+safe(l.title)+'</strong><span>'+safe(l.goal)+'</span><small>'+safe(l.code)+' · '+(completed(a,l)?"✓ Learned":"Ready to learn")+'</small></button>').join("")+'</div>');
 app().querySelectorAll("[data-lesson]").forEach(b=>b.onclick=()=>start(a,Number(b.dataset.lesson)));
}
function start(a,i){
 area=a;active=list(a)[i];step=0;mistakes=0;passed=0;
 teach();
}
function teach(){
 const l=active;
 layout(top(l.icon+" "+l.title,"Lessons")+'<div class="curr-head"><span class="curr-label">First, learn · '+safe(l.code)+'</span><h2>'+safe(l.goal)+'</h2><p class="curr-teach">'+safe(l.teach)+'</p><div class="curr-example"><b>See an example</b>'+safe(l.example)+'</div><div class="curr-actions"><button class="curr-secondary" id="qhear">🔊 Read aloud</button><button class="curr-primary" id="qstart">I am ready to try →</button></div></div>');
 document.getElementById("qhear").onclick=()=>{if(typeof speak==="function")speak(l.teach+" "+l.example,"soft")};
 document.getElementById("qstart").onclick=()=>question();
}
function question(){
 const q=active.questions[step];if(!q)return finish();
 layout(top(active.icon+" "+active.title,"Lessons")+'<div class="curr-progress" role="progressbar" aria-label="Lesson questions completed" aria-valuenow="'+step+'" aria-valuemin="0" aria-valuemax="'+active.questions.length+'"><span style="width:'+(100*step/active.questions.length)+'%"></span></div><div class="curr-head"><span class="curr-label">Your turn · Question '+(step+1)+' of '+active.questions.length+'</span><h2>'+safe(q.prompt)+'</h2><div class="curr-answers">'+q.choices.map((s,i)=>'<button type="button" class="curr-answer" data-answer="'+i+'">'+safe(s)+'</button>').join("")+'</div><div id="qfeedback" class="curr-feedback" role="status" aria-live="polite" hidden></div><div class="curr-actions"><button class="curr-secondary" id="qhear">🔊 Hear question</button><button class="curr-primary" id="qnext" hidden>'+(step+1===active.questions.length?"Finish lesson ✓":"Next question →")+'</button></div></div>');
 document.getElementById("qhear").onclick=()=>{if(typeof speak==="function")speak(q.prompt+" "+q.choices.join(". "),"soft")};
 document.getElementById("qnext").onclick=()=>{step++;question()};
 let answered=false;
 app().querySelectorAll("[data-answer]").forEach(btn=>btn.onclick=()=>{
   if(answered||btn.disabled)return;
   const i=Number(btn.dataset.answer),ok=i===q.correct,fb=document.getElementById("qfeedback");
   fb.hidden=false;fb.dataset.result=ok?"correct":"incorrect";
   if(ok){answered=true;passed++;btn.classList.add("correct");app().querySelectorAll("[data-answer]").forEach(b=>b.disabled=true);
     fb.innerHTML="<strong>That's right!</strong><span>"+safe(q.explain)+"</span>";document.getElementById("qnext").hidden=false;
     if(typeof SFX!=="undefined")SFX.good();
   }else{mistakes++;btn.classList.add("incorrect");btn.disabled=true;fb.innerHTML="<strong>Have another try.</strong><span>"+safe(q.hint)+"</span>";
     if(typeof SFX!=="undefined")SFX.oops();
   }
 });
}
function finish(){
 const l=active,key=token(area,l),progress=record(),first=!progress[key]?.done;
 progress[key]={done:true,tries:(progress[key]?.tries||0)+1,lastMistakes:mistakes};
 if(first){S.progress[kid]=S.progress[kid]||{};S.progress[kid].curriculum=S.progress[kid].curriculum||{stars:0};S.progress[kid].curriculum.stars++;}save();
 layout(top("Nice learning!","Lessons")+'<div class="curr-head"><span class="curr-label">Lesson complete</span><h2>'+safe(l.icon+" "+l.title)+'</h2><p class="curr-teach">'+(first?"⭐ You earned a new learning star.":"✓ You revised a lesson you have learned.")+'</p><div class="curr-example"><b>Try this away from the screen</b>'+safe(l.tryIt)+'</div><p class="curr-meta">Practised: '+safe(l.code)+' · '+mistakes+' incorrect attempt'+(mistakes===1?"":"s")+' · Your progress is saved on this device.</p><div class="curr-actions"><button class="curr-primary" id="qmore">Choose another lesson</button><button class="curr-secondary" id="qrepeat">Practise again</button></div></div>');
 document.getElementById("qmore").onclick=()=>course(area);
 document.getElementById("qrepeat").onclick=()=>start(area,list(area).findIndex(v=>v.id===l.id));
 if(typeof SFX!=="undefined")SFX.win();
}
if(typeof render==="function")render();
})();
