(function(){
"use strict";
if(typeof correct!=="function"||typeof next!=="function")return;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const strip=h=>String(h??"").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim();
const rd=()=>{try{return typeof round==="undefined"?null:round}catch(e){return null}};
const readOn=()=>{try{return S.settings.jRead!==false}catch(e){return true}};
const say=t=>{try{speak(t,"soft")}catch(e){}};
const fmtMoney=c=>{try{return money(c)}catch(e){return c+"c"}};

const TIPS={
 words:["Say each sound slowly. Then blend the sounds together.","Listen for the first sound. Then the middle. Then the end."],
 read:["Opposites mean very different things, like hot and cold.","Small word parts can change what a word means."],
 think:["Look for clues. Ask yourself: how do I know?","Rule out the answers that can't be right."],
 nums:["Adding puts groups together. Taking away makes a group smaller.","Start with the bigger number and count on."],
 pv:["10 ones make 1 ten. 10 tens make 1 hundred.","Each place is worth 10 times the place to its right."],
 times:["Times means equal groups. Skip count to find the total.","Dividing means sharing into equal groups."],
 frac:["A fraction is equal parts of one whole.","The bottom number says how many equal parts."],
 shapes:["Count the sides and the corners.","Look for the part that repeats."],
 time:["The short hand shows the hour. The long hand shows the minutes.","There are 60 minutes in 1 hour."],
 money:["100 cents make 1 dollar.","Use the biggest coins first, then add smaller ones."],
 data:["Count each group carefully.","The tallest bar or longest row is the most."],
 sci:["Scientists look closely, then explain what they see.","Living things need food, water and air."],
 geo:["A map shows places from above.","North, south, east and west help us find our way."],
 hist:["History is what happened before now.","Clues from the past tell us how people lived."],
 feel:["All feelings are okay. We can choose what to do next.","Naming a feeling helps it feel smaller."]
};

function sentences(t){return String(t||"").match(/[^.!?]+[.!?]?/g)?.map(s=>s.trim()).filter(Boolean)||[]}

function steps(q,w){
 const t=q.type||"opts";
 if(t==="build"&&q.parts&&q.target){
  const vals=q.parts.map(p=>p[0]).filter(v=>v>0).sort((a,b)=>b-a);let left=q.target;const used=[];
  vals.forEach(v=>{while(left>=v){used.push(v);left-=v}});
  if(!left&&used.length){const f=v=>q.unit==="money"?fmtMoney(v):String(v);
   return["We need "+f(q.target)+".","Start with the biggest: "+used.map(f).join(" + ")+".","That makes "+f(q.target)+"."]}
 }
 if(t==="shade"&&q.n){let fr="";try{fr=frSay(q.k,q.n)}catch(e){fr=q.k+" out of "+q.n}
  return["The whole has "+q.n+" equal parts.","We shade "+q.k+" of them.",q.k+" out of "+q.n+" is "+fr+"."]}
 if(t==="spell"&&q.word){const w2=[...q.word];return["Say it slowly: "+w2.join(" - ")+".","Put the sounds together: "+q.word+"."]}
 if(t==="setclock"&&q.th!==undefined){let d=q.th+":"+String(q.tm).padStart(2,"0");try{d=dig(q.th,q.tm)}catch(e){}
  return["The short hand points to the hour: "+q.th+".","The long hand shows the minutes: "+q.tm+".","So the time is "+d+"."]}
 if(t==="mirror")return["Each square on one side has a twin on the other side.","The twin is the same distance from the mirror line."];
 if(q.teach){const s=sentences(q.teach);if(s.length)return s.length===1?s.concat(["So the answer is "+strip(q.ans)+"."]):s}
 const W=window.PEBBLE_JOURNEY_WORK;
 if(W&&q.ans!==undefined){const prompt=strip(q.q)||strip(q.say);
  if(W.findSum(prompt)||/\d\s*[+\-−–×x*÷\/]\s*\d/.test(prompt)){
   try{const r=W.workSteps({prompt,choices:[String(strip(q.ans))],correct:0,explain:"",hint:""});if(r&&r.st&&r.st.length>1)return r.st}catch(e){}
  }
 }
 if(w==="feel"||q.ans===undefined)return null;
 const txt=(strip(q.q)+" "+strip(q.say||"")),an=Number(strip(q.ans));
 let g=txt.match(/(\d+)\s+(?:rows|groups|bags|lots|boxes|piles|plates)\s+of\s+(\d+)/i)||txt.match(/(\d+)\s+\w+(?:\s+\w+)?\s+with\s+(\d+)\s+in each/i)||txt.match(/(\d+)\s+\w+,\s*(\d+)\s+in each/i);
 if(g){const A=+g[1],B=+g[2];if(A*B===an){const out=[A+" groups of "+B+"."];if(A<=10)out.push("Count by "+B+": "+Array.from({length:A},(_,i)=>B*(i+1)).join(", ")+".");out.push(A+" × "+B+" = "+an+".");return out}}
 if(/how many/i.test(txt)&&Number.isInteger(an)&&an>0&&an<=20)return["Touch each one as you count.","Count: "+Array.from({length:an},(_,i)=>i+1).join(", ")+".","There are "+an+"."];
 const ans=strip(q.ans),qq=strip(q.q)||strip(q.say||""),tip=(TIPS[w]||[])[0];
 if(!ans)return null;
 const out=[];if(qq)out.push("The question: "+qq);if(tip)out.push("Think: "+tip);out.push("The answer is "+ans+".");
 return out.length>=2?out:null;
}

const css=document.createElement("style");
css.textContent=[
".iw-learn{display:flex;gap:10px;align-items:flex-start;margin:6px auto 10px;max-width:760px}",
".iw-learn>span{font-size:2rem;line-height:1}",
".iw-learn>div{flex:1;border-radius:16px;background:#eaf7ee;border:2px solid #2f7d4f;padding:10px 14px;font-size:1.05rem;line-height:1.4;color:#14262c}",
".iw-work{width:100%;box-sizing:border-box;margin-top:10px;border-radius:16px;background:#fff6dc;border:2px solid #d9a52b;padding:12px 14px;color:#14262c;font-size:1.05rem;line-height:1.45;text-align:left}",
".iw-work ol{margin:6px 0 0;padding-left:1.4em}.iw-work li{margin:4px 0}.iw-work li:last-child{font-weight:800}",
".iw-next{margin-top:10px;min-height:52px;width:100%;border-radius:14px;border:0;background:#2f7d4f;color:#fff;font:800 1.1rem var(--display);cursor:pointer;box-shadow:0 4px 0 #1f5a37}",
".iw-next:focus-visible{outline:4px solid #1e86a3;outline-offset:3px}"
].join("\n");
document.head.appendChild(css);

function addLearn(){
 const r=rd(),app=document.getElementById("app");if(!r||!r.q||!r.w||!app)return;
 const row=app.querySelector(".qrow");if(!row||app.querySelector(".iw-learn"))return;
 const list=TIPS[r.w];if(!list)return;
 const tip=list[(r.n||0)%list.length];
 const d=document.createElement("div");d.className="iw-learn";
 d.innerHTML='<span aria-hidden="true">\u{1F422}</span><div><b>Learn:</b> '+esc(tip)+'</div>';
 row.parentNode.insertBefore(d,row);
}
try{new MutationObserver(addLearn).observe(document.getElementById("app"),{childList:true,subtree:true})}catch(e){}

const _next=next;
next=function(){const r=rd();if(r&&r.iwHold){r.iwPending=true;return}return _next.apply(this,arguments)};

const _correct=correct;
correct=function(x,y,s){
 const r=rd(),q=r&&r.q,w=r&&r.w,st=q?steps(q,w):null;
 _correct(x,y,s);
 if(!st||st.length<2)return;
 const r2=rd();if(!r2)return;
 const m=document.getElementById("msg");const host=m?m.parentNode:document.querySelector("#app .card");if(!host)return;
 r2.iwHold=true;r2.iwPending=false;
 const box=document.createElement("div");box.className="iw-work";
 box.innerHTML='<b>Here is the working out:</b><ol>'+st.map(a=>"<li>"+esc(a)+"</li>").join("")+'</ol>';
 const btn=document.createElement("button");btn.type="button";btn.className="iw-next";btn.textContent="Next →";
 btn.onclick=()=>{try{SFX.tap()}catch(e){}const r3=rd();if(!r3)return;r3.iwHold=false;btn.disabled=true;btn.textContent="…";if(r3.iwPending){r3.iwPending=false;_next()}};
 box.appendChild(btn);host.appendChild(box);
 if(readOn())setTimeout(()=>{const r3=rd();if(r3&&r3.q===q)say(st.join(" "))},1600);
};

window.PEBBLE_ISLAND_WORK={steps,TIPS};
})();
