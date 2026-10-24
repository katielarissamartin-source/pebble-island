(function(){
"use strict";
const B=window.PEBBLE_QCAA_LESSONS,A=window.PEBBLE_ADAPTIVE;
if(!B||!A)return;
const names={science:"Science",hass:"Our World",technologies:"Tech & Design"};
const icons={science:"🔬",hass:"🗺️",technologies:"💻"};
const sources={
 science:{2:"https://www.qcaa.qld.edu.au/downloads/aciqv9/science/curriculum/ac9_science_yr2_as_cd_alignment.pdf",5:"https://www.qcaa.qld.edu.au/downloads/aciqv9/science/curriculum/ac9_science_yr5_as_cd_alignment.pdf"},
 hass:{2:"https://www.qcaa.qld.edu.au/downloads/aciqv9/humanities-and-social-sciences/curriculum/ac9_hass_yr2_as_cd_alignment.pdf",5:"https://www.qcaa.qld.edu.au/downloads/aciqv9/humanities-and-social-sciences/curriculum/ac9_hass_yr5_as_cd_alignment.pdf"},
 technologies:{2:"https://www.qcaa.qld.edu.au/downloads/aciqv9/technologies/curriculum/ac9_tech_yr1-2_as_cd_alignment.pdf",5:"https://www.qcaa.qld.edu.au/downloads/aciqv9/technologies/curriculum/ac9_tech_yr5-6_as_cd_alignment.pdf"}};
const style=document.createElement("style");
style.textContent=[
".curr-focus{display:grid;gap:13px;border-radius:23px;padding:clamp(18px,4vw,28px);background:var(--panel);border:3px solid #42869b}",
".curr-focus h2{color:var(--ink)!important;-webkit-text-fill-color:currentColor!important;background:none!important;font:800 clamp(1.35rem,4vw,1.95rem)/1.25 var(--display)}",
".curr-focus p{margin:0;line-height:1.5}",
".curr-path-metrics{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}",
".curr-metric{border:2px solid var(--line);border-radius:15px;background:var(--panel);padding:13px 10px;text-align:center;display:grid;gap:4px}",
".curr-metric strong{font:800 clamp(1.25rem,3vw,1.8rem) var(--display);color:var(--ink)}",
".curr-metric span{font:700 .82rem var(--body);color:var(--ink)}",
".curr-level{display:inline-block;border-radius:999px;border:2px solid var(--line);padding:4px 11px;font:700 .78rem var(--display);background:var(--panel);color:var(--ink);width:fit-content}",
".curr-level[data-kind=strong]{border-color:#328252;background:#e2f5e7;color:#20583a}",
".curr-level[data-kind=review]{border-color:#975620;background:#fff0da;color:#743e17}",
".curr-level[data-kind=practice]{border-color:#9b6534;background:#fff1db;color:#704521}",
".curr-level[data-kind=growing]{border-color:#437bb9;background:#e8f1ff;color:#244d7b}",
".curr-level[data-kind=learning]{border-color:#688094;background:#eff4f9;color:#284e64}",
".curr-level[data-kind=new]{border-color:#71828d}",
".curr-lesson .curr-level{margin-top:auto}",
".curr-lesson .curr-mini{font-size:.83rem;line-height:1.4;opacity:.92;color:var(--ink)}",
".curr-session-meter{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}",
".curr-session-meter .curr-label{opacity:1}",
".curr-feedback[hidden]{display:none!important}",
".curr-feedback strong{font:800 1.06rem var(--display)}",
".curr-feedback span{line-height:1.55}",
".curr-result-score{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}",
".curr-result-score>div{border:2px solid var(--line);border-radius:15px;padding:16px;display:grid;gap:6px}",
".curr-result-score strong{font:800 1.35rem var(--display)}",
".curr-result-score span{font-size:.9rem}",
".curr-insight-wrap{overflow:auto;max-width:100%}",
".curr-insights{border-collapse:collapse;width:100%;min-width:520px;font-size:.9rem}",
".curr-insights th,.curr-insights td{padding:11px 10px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}",
".curr-insights th{font-weight:800}",
".curr-insights caption{caption-side:top;text-align:left;padding:6px 0 12px}",
".curr-insights .curr-level{font-size:.7rem;white-space:nowrap}",
".curr-suggestion{border:2px solid var(--line);padding:14px;border-radius:14px;background:var(--panel);display:grid;gap:7px}",
".curr-map-shortcut{margin-top:9px;border:2px solid var(--line);border-radius:12px;padding:8px 12px;background:var(--sky)!important;color:var(--ink)!important;font:700 .84rem var(--display);text-align:left}",
".curr-map-shortcut:hover,.curr-map-shortcut:focus-visible{border-color:#266a82}",
".curr-adaptive-note{line-height:1.45;font-size:.95rem;color:var(--ink)}",
".curr-quiz-status{font-size:.9rem;color:var(--ink)}",
".curr-title{color:var(--ink)!important;-webkit-text-fill-color:currentColor!important;background:none!important}",
"@media(max-width:430px){.curr-focus{padding:17px}.curr-result-score{grid-template-columns:1fr}.curr-metric{padding:9px 5px}.curr-metric span{font-size:.75rem}}"
].join("\n");
document.head.appendChild(style);
let section="home",area=null,lesson=null,step=0,deck=[],spare=null,extra=false,asked=[],independent=0,misses=0,wrongThis=0;
const app=()=>document.getElementById("app");
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const yr=()=>{S.curriculumYear=S.curriculumYear||{};return S.curriculumYear[kid]||((S.kids[kid].age||7)>=9?5:2)};
const entries=a=>B[yr()][a];
const st=(a,l)=>A.state(S,kid,yr(),a,l.id);
const rec=a=>A.recommend(S,kid,yr(),B,Date.now(),a);
const progress=()=>A.stats(S,kid,yr(),B);
const stateTag=(a,l)=>{
 const s=st(a,l),obj=A.due(s)?{kind:"review",label:"Review due"}:A.status(s);
 return '<span class="curr-level" data-kind="'+obj.kind+'">'+esc(obj.label)+'</span>';
};
const completed=(a,l)=>!!S.curriculumProgress?.[kid]?.[A.lessonKey(yr(),a,l.id)]?.done;
const screen=s=>{app().innerHTML='<div class="curr-shell">'+s+'</div>';const back=app().querySelector("[data-adapt-back]");if(back)back.onclick=backTo;};
const header=(title,parent)=>'<div class="curr-top"><button class="curr-secondary" type="button" data-adapt-back>← '+esc(parent)+'</button><span class="pill">📘 Year '+yr()+'</span></div><div class="curr-head"><span class="curr-label">Queensland curriculum · Personal learning</span><h1 class="curr-title">'+esc(title)+'</h1></div>';
const bell=()=>{if(window.speechSynthesis)window.speechSynthesis.cancel()};
function backTo(){bell();if(section==="home")goMap();else if(section==="area")showHome();else showArea(area);}
function goMap(){section="home";area=null;lesson=null;round=null;render();}
function statsHTML(){
 const s=progress();
 return '<div class="curr-path-metrics" aria-label="Personal learning progress"><div class="curr-metric"><strong>'+s.explored+' / '+s.total+'</strong><span>Explored</span></div><div class="curr-metric"><strong>'+s.due+'</strong><span>Review ready</span></div><div class="curr-metric"><strong>'+s.strong+'</strong><span>Strong skills</span></div></div>';
}
function showHome(){
 section="home";area=null;lesson=null;
 const next=rec(),row=progress(),categories=Object.keys(names);
 const recommended=next?'<section class="curr-focus" aria-labelledby="adaptive-next"><span class="curr-label">Your next best step · '+(next.mode==="review"?"Quick review":next.mode==="new"?"Discover":"Optional practice")+'</span><h2 id="adaptive-next">'+esc(next.lesson.icon+" "+next.lesson.title)+'</h2><p>'+esc(next.reason)+'</p><div class="curr-session-meter">'+stateTag(next.area,next.lesson)+'<span class="curr-meta">'+esc(names[next.area])+' · '+esc(next.lesson.code)+'</span></div><button class="curr-primary" type="button" id="adapt-next">Start my next lesson →</button></section>':"";
 const topics=categories.map(a=>'<button type="button" data-adapt-area="'+a+'" class="curr-course"><span class="em" aria-hidden="true">'+icons[a]+'</span><strong>'+esc(names[a])+'</strong><span>'+esc(a==="science"?"How the world works":a==="hass"?"History, places and community":"Coding, design and online safety")+'</span><small class="curr-mini">'+entries(a).filter(l=>completed(a,l)).length+' of 4 explored · '+entries(a).filter(l=>A.due(st(a,l))).length+' reviews due</small></button>').join("");
 const insight='<details class="curr-guide"><summary>Learning insights (grown-ups)</summary><p>The app tracks answers without hints, revisits skills on later days, and suggests topics to practise. The labels are estimates from a small number of questions, not formal assessments. Speed is not scored.</p><div class="curr-insight-wrap"><table class="curr-insights"><caption>Year '+yr()+' evidence for this child, stored on this device</caption><thead><tr><th scope="col">Topic</th><th scope="col">Progress</th><th scope="col">First-try accuracy</th><th scope="col">Review</th></tr></thead><tbody>'+categories.flatMap(a=>entries(a).map(l=>{const x=st(a,l),accuracy=x.questions?Math.round(100*x.firstTry/x.questions)+"%":"Not yet measured";return'<tr><th scope="row">'+esc(l.title)+'</th><td>'+stateTag(a,l)+'<div class="curr-meta">'+x.sessions+' session'+(x.sessions===1?"":"s")+'</div></td><td>'+accuracy+'</td><td>'+esc(A.dueText(x))+'</td></tr>'})).join("")+'</tbody></table></div></details>';
 const sourcesHTML='<details class="curr-guide"><summary>Queensland curriculum links (grown-ups)</summary><p>These are supplementary lessons, not a full curriculum or a QCAA endorsement. Curriculum codes refer to the learning area and year level.</p><ul>'+categories.map(a=>'<li><a href="'+sources[a][yr()]+'" target="_blank" rel="noopener noreferrer">'+esc(names[a])+' — QCAA alignment document</a></li>').join("")+'</ul></details>';
 screen('<div class="curr-top"><button id="adapt-map" type="button" class="curr-secondary">← Island map</button><span class="pill">'+esc(S.kids[kid].name)+' · Year '+yr()+'</span></div><div class="curr-head"><span class="curr-label">Curiosity Lab · My learning path</span><h1 class="curr-title">Discover. Practise. Remember.</h1><p>We will suggest a new lesson or a helpful review. Take your time. No timers, no penalties for asking for help.</p><div class="curr-controls" aria-label="Choose school year"><span class="curr-meta">Learning level:</span>'+[0,1,2,3,4,5,6].map(function(y){return '<button type="button" data-adapt-year="'+y+'" aria-pressed="'+(yr()===y)+'">'+(y?'Year '+y:'Prep')+'</button>'}).join('')+'</div></div>'+recommended+statsHTML()+'<h2 class="curr-title" style="font-size:1.3rem">Choose a subject</h2><div class="curr-course-grid">'+topics+'</div>'+insight+sourcesHTML);
 document.getElementById("adapt-map").onclick=goMap;
 const btn=document.getElementById("adapt-next");if(btn&&next)btn.onclick=()=>start(next.area,next.index);
 app().querySelectorAll("[data-adapt-year]").forEach(b=>b.onclick=()=>{S.curriculumYear[kid]=Number(b.dataset.adaptYear);save();showHome()});
 app().querySelectorAll("[data-adapt-area]").forEach(b=>b.onclick=()=>showArea(b.dataset.adaptArea));
}
function showArea(a){
 section="area";area=a;lesson=null;
 const next=rec(a);
 const suggest=next?'<div class="curr-suggestion"><strong>Suggested: '+esc(next.lesson.title)+'</strong><p class="curr-adaptive-note">'+esc(next.reason)+'</p><button type="button" class="curr-secondary" id="adapt-subject-next">Try this next →</button></div>':"";
 screen(header(names[a],"My learning path")+'<p class="curr-sub">Pick any lesson. Strong skills grow through correct answers and reviews on different days.</p>'+suggest+'<div class="curr-lessons">'+entries(a).map((l,i)=>'<button type="button" data-adapt-lesson="'+i+'" class="curr-lesson '+(completed(a,l)?"complete":"")+'"><span class="em" aria-hidden="true">'+l.icon+'</span><strong>'+esc(l.title)+'</strong><span>'+esc(l.goal)+'</span>'+stateTag(a,l)+'<small class="curr-mini">'+esc(A.dueText(st(a,l)))+' · '+esc(l.code)+'</small></button>').join("")+'</div>');
 app().querySelectorAll("[data-adapt-lesson]").forEach(b=>b.onclick=()=>start(a,Number(b.dataset.adaptLesson)));
 const btn=document.getElementById("adapt-subject-next");if(btn&&next)btn.onclick=()=>start(a,next.index);
}
function start(a,i){
 area=a;lesson=entries(a)[i];section="teach";step=0;deck=[];spare=null;extra=false;asked=[];independent=0;misses=0;wrongThis=0;
 const indexes=A.shuffledIndices(st(a,lesson),lesson.questions.length,3);
 const questions=indexes.map(n=>({id:n,q:A.shuffleAnswer(lesson.questions[n])}));
 deck=questions.slice(0,2);spare=questions[2]||null;
 showTeach();
}
function showTeach(){
 section="teach";
 const was=st(area,lesson),review=was.sessions>0||was.legacy;
 screen(header(lesson.icon+" "+lesson.title,"Lessons")+'<div class="curr-head"><span class="curr-label">'+(review?"Remember this?":"Let us learn")+' · '+esc(lesson.code)+'</span><h2 class="curr-title">'+esc(lesson.goal)+'</h2><p class="curr-adaptive-note">'+(review?"Here is a quick reminder before your review.":"Read the idea, see an example, then try two questions.")+'</p><p class="curr-teach">'+esc(lesson.teach)+'</p><div class="curr-example"><b>See an example</b>'+esc(lesson.example)+'</div><div class="curr-actions"><button type="button" class="curr-secondary" id="adapt-read">🔊 Read aloud</button><button type="button" class="curr-primary" id="adapt-try">'+(review?"Start review →":"Let us try it →")+'</button></div></div>');
 document.getElementById("adapt-read").onclick=()=>{if(typeof speak==="function")speak(lesson.teach+" "+lesson.example,"soft")};
 document.getElementById("adapt-try").onclick=showQuestion;
}
function showQuestion(){
 if(step>=deck.length){finish();return}
 section="question";wrongThis=0;
 const task=deck[step],q=task.q;
 if(!asked.includes(task.id))asked.push(task.id);
 screen(header(lesson.icon+" "+lesson.title,"Lessons")+'<div class="curr-progress" role="progressbar" aria-label="Questions completed" aria-valuemin="0" aria-valuemax="'+deck.length+'" aria-valuenow="'+step+'"><span style="width:'+Math.round(step/deck.length*100)+'%"></span></div><div class="curr-head"><div class="curr-session-meter"><span class="curr-label">'+(extra&&step===2?"A little more practice":"Think it through")+'</span><span class="curr-quiz-status">Question '+(step+1)+' of '+deck.length+'</span></div><h2 class="curr-title">'+esc(q.prompt)+'</h2><div class="curr-answers">'+q.choices.map((s,i)=>'<button type="button" class="curr-answer" data-adapt-answer="'+i+'">'+esc(s)+'</button>').join("")+'</div><div class="curr-feedback" id="adapt-feedback" role="status" aria-live="polite" aria-atomic="true" hidden></div><div class="curr-actions"><button type="button" class="curr-secondary" id="adapt-hear">🔊 Hear question</button><button type="button" class="curr-primary" id="adapt-forward" hidden>Next question →</button></div></div>');
 document.getElementById("adapt-hear").onclick=()=>{if(typeof speak==="function")speak(q.prompt+" "+q.choices.join(". "),"soft")};
 const forward=document.getElementById("adapt-forward"),fb=document.getElementById("adapt-feedback"),buttons=[...app().querySelectorAll("[data-adapt-answer]")];
 forward.onclick=()=>{if(step===1&&misses>0&&spare&&!extra){deck.push(spare);extra=true}step++;showQuestion()};
 const forwardLabel=()=>{forward.hidden=false;forward.textContent=step===1&&misses>0&&spare&&!extra?"One more practice question →":step===deck.length-1?"See my progress →":"Next question →"};
 let answered=false;
 buttons.forEach(btn=>btn.onclick=()=>{
  if(answered||btn.disabled)return;
  const chosen=Number(btn.dataset.adaptAnswer),correct=chosen===q.correct;
  fb.hidden=false;
  if(correct){
   answered=true;if(wrongThis===0)independent++;
   btn.classList.add("correct");buttons.forEach(b=>b.disabled=true);fb.dataset.result="correct";
   fb.innerHTML='<strong>'+(wrongThis===0?"Correct without a hint!":"You worked it out!")+'</strong><span>'+esc(q.explain)+'</span>';
   if(typeof SFX!=="undefined")SFX.good();forwardLabel();
  }else{
   wrongThis++;misses++;btn.classList.add("incorrect");btn.disabled=true;fb.dataset.result="incorrect";
   if(typeof SFX!=="undefined")SFX.oops();
   if(wrongThis>=2||buttons.filter(b=>!b.disabled).length<=1){
    answered=true;buttons.forEach((b,i)=>{b.disabled=true;if(i===q.correct)b.classList.add("correct")});
    fb.innerHTML='<strong>Let us work through this together.</strong><span>The answer is <b>'+esc(q.choices[q.correct])+'</b>. '+esc(q.explain)+'</span>';
    forwardLabel();
   }else fb.innerHTML='<strong>Have another go.</strong><span>'+esc(q.hint)+'</span>';
  }
 });
}
function finish(){
 section="finish";
 const key=A.lessonKey(yr(),area,lesson.id);
 S.curriculumProgress=S.curriculumProgress||{};const progress=S.curriculumProgress[kid]||(S.curriculumProgress[kid]={});
 const old=progress[key]||{},first=!old.done;
 const result=A.recordSession(S,kid,yr(),area,lesson.id,{questions:asked.length,firstTry:independent,misses,questionIds:asked});
 progress[key]={...old,done:true,tries:(old.tries||0)+1,lastMistakes:misses};
 if(first){S.progress[kid]=S.progress[kid]||{};const p=S.progress[kid].curriculum||(S.progress[kid].curriculum={stars:0});p.stars=(p.stars||0)+1}
 save();
 const next=rec(),s=result.state;
 const comment=result.high?(result.creditAllowed?"Nice! Those answers were yours without hints.":"Great practice. We will check what sticks another day."):"Good effort. A helpful review is coming back soon.";
 const statusText=A.dueText(s);
 screen(header("Your learning progress","Lessons")+'<div class="curr-head"><span class="curr-label">Practice complete · '+esc(lesson.code)+'</span><h2 class="curr-title">'+esc(lesson.icon+" "+lesson.title)+'</h2><p class="curr-teach">'+esc(comment)+'</p>'+stateTag(area,lesson)+'<div class="curr-result-score"><div><strong>'+independent+' / '+asked.length+'</strong><span>Correct without hints</span></div><div><strong>'+esc(statusText)+'</strong><span>Next review</span></div></div><p class="curr-meta">'+(first?"⭐ Your first lesson star is earned.":"✓ Your earlier stars stay saved.")+' '+misses+' incorrect choice'+(misses===1?"":"s")+'.</p><div class="curr-example"><b>Try this away from the screen</b>'+esc(lesson.tryIt)+'</div><div class="curr-actions"><button type="button" class="curr-primary" id="adapt-follow">Follow my learning path →</button><button type="button" class="curr-secondary" id="adapt-repeat">Practise this again</button><button type="button" class="curr-secondary" id="adapt-other">Other lessons</button></div></div>');
 document.getElementById("adapt-follow").onclick=()=>next?start(next.area,next.index):showHome();
 document.getElementById("adapt-repeat").onclick=()=>start(area,entries(area).findIndex(l=>l.id===lesson.id));
 document.getElementById("adapt-other").onclick=()=>showArea(area);
 if(typeof SFX!=="undefined")SFX.win();
}
const oldMap=map;
map=function(){
 oldMap();
 if(kid===null)return;
 const card=document.querySelector(".curr-card[data-qcaa]");if(!card)return;
 const stats=progress(),next=rec();
 const line=card.querySelector("small");if(line)line.textContent=stats.due>0?stats.due+" helpful review(s) ready":"My personalised learning path";
 card.onclick=()=>{round=null;showHome()};
 const intro=document.querySelector("#app .dashboard-copy");
 if(intro&&next&&!intro.querySelector(".curr-map-shortcut")){
  const button=document.createElement("button");button.type="button";button.className="curr-map-shortcut";
  button.textContent="📘 Suggested: "+next.lesson.title+(next.mode==="review"?" · Review":"");
  button.onclick=()=>{round=null;start(next.area,next.index)};
  intro.appendChild(button);
 }
};
window.PEBBLE_ADAPTIVE_UI={showHome,showArea,start,version:1};
})();
