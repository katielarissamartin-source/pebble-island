(function(root){
"use strict";
const DAY=86400000,INTERVALS=[1,3,7,14,30],KEY_VERSION=1;
const clip=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
const lessonKey=(year,area,id)=>[year,area,id].join("-");
function profile(S,kid){
 if(!S.curriculumAdaptive||S.curriculumAdaptive.version!==KEY_VERSION){
  const prev=S.curriculumAdaptive?.profiles||{};
  S.curriculumAdaptive={version:KEY_VERSION,profiles:prev};
 }
 return S.curriculumAdaptive.profiles[kid]||(S.curriculumAdaptive.profiles[kid]={});
}
function state(S,kid,year,area,id){
 const p=profile(S,kid),key=lessonKey(year,area,id);
 if(!p[key]){
  const old=S.curriculumProgress?.[kid]?.[key];
  // Previous completions remain earned, but a single old quiz cannot establish lasting mastery.
  p[key]={stage:0,sessions:0,credited:0,firstTry:0,questions:0,hints:0,
   nextDue:old?.done?0:null,lastAt:null,lastCreditAt:null,history:[],
   questionUse:{},recent:[],legacy:!!old?.done};
 }
 return p[key];
}
function status(s,now=Date.now()){
 if(!s.sessions&&!s.legacy)return{kind:"new",label:"New",help:"Ready to learn"};
 if(s.sessions&&s.stage>=3&&s.credited>=3)return{kind:"strong",label:"Strong",help:"Keep it strong with spaced reviews"};
 if(s.sessions&&s.stage>=2)return{kind:"growing",label:"Growing",help:"Confidence is building"};
 if(s.sessions&&s.stage===1)return{kind:"learning",label:"Learning",help:"Time and practice make it stick"};
 return{kind:"practice",label:"Practise",help:s.legacy&&!s.sessions?"A previous lesson is ready to review":"We'll revisit this together"};
}
function due(s,now=Date.now()){return(s.sessions>0||s.legacy)&&s.nextDue!==null&&s.nextDue<=now}
function stats(S,kid,year,bank,now=Date.now()){
 const out={total:0,new:0,explored:0,due:0,strong:0,learning:0,practice:0,firstTry:0,answered:0};
 for(const [area,lessons]of Object.entries(bank[year]||{}))for(const l of lessons){
  const s=state(S,kid,year,area,l.id);out.total++;
  if(!s.sessions&&!s.legacy)out.new++;else out.explored++;
  if(due(s,now))out.due++;
  const kind=status(s,now).kind;
  if(kind==="strong")out.strong++;
  if(kind==="learning"||kind==="growing")out.learning++;
  if(kind==="practice")out.practice++;
  out.firstTry+=s.firstTry;out.answered+=s.questions;
 }
 return out;
}
function recommend(S,kid,year,bank,now=Date.now(),onlyArea){
 const areas=Object.keys(bank[year]||{}).filter(a=>!onlyArea||a===onlyArea);
 const rows=[];
 for(const a of areas)for(let i=0;i<(bank[year][a]||[]).length;i++){
  const l=bank[year][a][i],s=state(S,kid,year,a,l.id);
  rows.push({area:a,lesson:l,index:i,state:s,isDue:due(s,now),isNew:!s.sessions&&!s.legacy});
 }
 const ready=rows.filter(r=>r.isDue).sort((a,b)=>(a.state.stage-b.state.stage)||((a.state.nextDue??0)-(b.state.nextDue??0))||(a.index-b.index));
 if(ready.length)return{...ready[0],reason:"Review time: practise a skill before it fades.",mode:"review"};
 const fresh=rows.filter(r=>r.isNew);
 if(fresh.length){
  const touched=Object.fromEntries(areas.map(a=>[a,rows.filter(r=>r.area===a&&!r.isNew).length]));
  fresh.sort((a,b)=>(touched[a.area]-touched[b.area])||(a.index-b.index));
  return{...fresh[0],reason:"Let's discover something new.",mode:"new"};
 }
 if(!rows.length)return null;
 rows.sort((a,b)=>(a.state.nextDue??Infinity)-(b.state.nextDue??Infinity));
 return{...rows[0],reason:"You're up to date. You can practise more, or come back when a review is due.",mode:"optional"};
}
function shuffledIndices(s,bankLength,amount,random=Math.random){
 const ids=Array.from({length:bankLength},(_,i)=>i);
 // Shuffle ties without choosing already practised items ahead of unseen ones.
 ids.sort((a,b)=>{
  const ua=s.questionUse[a]||0,ub=s.questionUse[b]||0;
  const ra=s.recent.includes(a)?1:0,rb=s.recent.includes(b)?1:0;
  return(ua+ra*2)-(ub+rb*2);
 });
 // Rotate equally-used items so repetition does not rely on fixed answer order.
 const groups=[];
 ids.forEach(id=>{
  const key=(s.questionUse[id]||0)+(s.recent.includes(id)?2:0);
  let group=groups.find(g=>g.key===key);if(!group)groups.push(group={key,items:[]});
  group.items.push({id,tie:random()});
 });
 return groups.sort((a,b)=>a.key-b.key).flatMap(g=>g.items.sort((a,b)=>a.tie-b.tie).map(x=>x.id)).slice(0,clip(amount,0,bankLength));
}
function shuffleAnswer(q,random=Math.random){
 const choices=q.choices.map((label,i)=>({label,correct:i===q.correct,sort:random()})).sort((a,b)=>a.sort-b.sort);
 return{prompt:q.prompt,choices:choices.map(c=>c.label),correct:choices.findIndex(c=>c.correct),explain:q.explain,hint:q.hint};
}
function recordSession(S,kid,year,area,id,event,now=Date.now()){
 const s=state(S,kid,year,area,id);
 const attempted=Math.max(1,Number(event.questions)||1);
 const first=clip(Number(event.firstTry)||0,0,attempted);
 const misses=Math.max(0,Number(event.misses)||0);
 const ratio=first/attempted;
 const previousStage=s.stage;
 const high=ratio>=.8,medium=ratio>=.5;
 const creditAllowed=high&&(!s.lastCreditAt||now-s.lastCreditAt>=20*3600000);
 if(high&&creditAllowed){s.stage=clip(s.stage+1,0,5);s.credited++;s.lastCreditAt=now;}
 else if(!medium){s.stage=Math.max(0,s.stage-1);}
 else if(!high){s.stage=Math.min(s.stage,2);}
 s.sessions++;s.firstTry+=first;s.questions+=attempted;s.hints+=misses;s.lastAt=now;
 let days=1;
 if(high){
  days=INTERVALS[Math.max(0,s.stage-1)]||30;
  if(!creditAllowed&&Number.isFinite(s.nextDue)&&s.nextDue>now){
   // Practising again immediately cannot push a scheduled review further away.
   s.nextDue=s.nextDue;
  }else s.nextDue=now+days*DAY;
 }else s.nextDue=now+DAY;
 const seen=Array.isArray(event.questionIds)?event.questionIds.filter(Number.isInteger):[];
 seen.forEach(i=>s.questionUse[i]=(s.questionUse[i]||0)+1);
 s.recent=seen.slice(-3);
 s.history.push({at:now,attempted,first,misses,stage:s.stage,high,credited:!!creditAllowed});
 s.history=s.history.slice(-24);
 return{state:s,score:ratio,high,creditAllowed,oldStage:previousStage,status:status(s,now),nextDue:s.nextDue};
}
function dueText(s,now=Date.now()){
 if(!s.sessions&&!s.legacy)return"Not started";
 if(due(s,now))return"Ready to review";
 const d=Math.ceil((s.nextDue-now)/DAY);
 return d<=1?"Review tomorrow":"Review in "+d+" days";
}
root.PEBBLE_ADAPTIVE={version:KEY_VERSION,day:DAY,state,status,due,stats,recommend,shuffledIndices,shuffleAnswer,recordSession,dueText,lessonKey};
})(typeof window==="undefined"?globalThis:window);