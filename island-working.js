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

const NUMW=["zero","one","two","three","four","five","six","seven","eight","nine","ten"];
const FRW={2:"half",3:"third",4:"quarter",6:"sixth",8:"eighth"};
const frName=(k,n)=>(NUMW[k]||k)+" "+(k>1?(n===2?"halves":FRW[n]+"s"):FRW[n]);
const SHAPE_SAY={circle:"A circle is round. It has no corners.",square:"A square has 4 sides. They are all the same length.",triangle:"A triangle has 3 sides and 3 corners.",star:"A star has 5 points.",heart:"A heart is the shape we draw for love.",rectangle:"A rectangle has 4 sides. 2 are long and 2 are short.",pentagon:"A pentagon has 5 sides.",hexagon:"A hexagon has 6 sides.",octagon:"An octagon has 8 sides."};
const DAYW=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const cnt=(s,re)=>(String(s||"").match(re)||[]).length;
const upTo=(step,end)=>{const a=[];for(let v=step;v<=end&&a.length<12;v+=step)a.push(v);return a};

function teachLookup(q){
 const T=window.PEBBLE_IW_TEACH;if(!T)return null;
 const say=strip(q.say),a=strip(q.ans);
 const st=T[say+"|"+a]||T[say]||T[strip(q.q)];
 return Array.isArray(st)&&st.length>=2?st.slice():null;
}

function rules(q,w){
 const say=strip(q.say),qq=strip(q.q),a=strip(q.ans),stg=String(q.stage||"");let m;
 if(q.type==="order"&&Array.isArray(q.seq)&&q.seq.length>=2){
  const s=q.seq;
  return s.map((x,i)=>(i===s.length-1?"Last":i===0?"First":s.length===4&&i===2?"Then":"Next")+": "+x+".");
 }
 if(q.ans===undefined)return null;
 // Sound Cove
 if((m=say.match(/^Find the letter ([A-Z])\.$/))&&a.toUpperCase()===m[1])return["The big letter is "+m[1]+".","Big "+m[1]+" and small "+a+" are the same letter.","So the answer is "+a+"."];
 if((m=say.match(/^(\w+)\. What sound does \1 start with\?$/))&&m[1][0]===a)return["Say the word slowly: "+m[1]+".","Listen to the very start.",m[1]+" starts with the letter "+a+"."];
 if(say==="Which picture is this word?"&&/^[a-z]+$/.test(a))return["Read the letters: "+[...a].join(", ")+".","Put them together: "+a+".","Find the picture of the "+a+"."];
 if((m=say.match(/^Which word says (\w+)\?$/))&&m[1]===a)return["The picture is a "+a+".","Say it slowly. Listen for each sound.","Find the word with "+[...a].join(", ")+".","That word is "+a+"."];
 if((m=say.match(/^(.+), blank\. Which word fits\?$/)))return["Read it with each word.",m[1]+" "+a+". That makes sense.","So the word is "+a+"."];
 if((m=say.match(/^Which word means the same as (\w+)\?$/)))return["Think about what "+m[1]+" means.",a+" means the same as "+m[1]+".","So the answer is "+a+"."];
 // Story Lagoon
 if((m=say.match(/^What is the opposite of (\w+)\?$/)))return["Opposites mean very different things.","The opposite of "+m[1]+" is "+a+".","So the answer is "+a+"."];
 if((m=say.match(/^Which word part makes (\w+) mean (.+)\?$/))&&q.after){const mean={un:"not",dis:"not",re:"again"}[a];
  if(mean)return[a+" means "+mean+".",a+" + "+m[1]+" = "+q.after+".",q.after+" means "+m[2]+"."]}
 // Thinking Lighthouse logic
 if((m=say.match(/^(\w+) is (\w+)er than (\w+)\. \3 is \2er than (\w+)\. (Who is .+\?)$/))){
  const[,A,base,B,C]=m;const er=base+"er";
  return[A+" is "+er+" than "+B+".",B+" is "+er+" than "+C+".","So the order is "+A+", then "+B+", then "+C+".",qq.replace(/^Who is /,"").replace(/\?$/,"")==="in the middle"?B+" is in the middle.":(a===A?A+" is first. So "+A+" is the "+qq.match(/the (\w+)\?/)[1]+".":C+" is last. So "+C+" is the "+qq.match(/the (\w+)\?/)[1]+".")];
 }
 // Bundle Bay
 if(/^Each long stick is ten/.test(say)&&/^\d+$/.test(a)){const n=+a,t=Math.floor(n/10),o=n%10;
  return["Count the sticks by tens: "+upTo(10,t*10).join(", ")+".","Count the cubes: "+o+".",t+" tens and "+o+" ones make "+n+"."]}
 if(/^Flats are one hundred/.test(say)&&/^\d+$/.test(a)){const n=+a,h=Math.floor(n/100),t=Math.floor(n/10)%10,o=n%10;
  return["Count the flats: "+h+" hundred"+(h>1?"s":"")+".","Count the sticks: "+t+" ten"+(t===1?"":"s")+".","Count the cubes: "+o+" one"+(o===1?"":"s")+".",h+" hundreds, "+t+" tens and "+o+" ones make "+n+"."]}
 if((m=say.match(/^Which number is (bigger|smaller)\?$/))&&Array.isArray(q.opts)&&q.opts.length===2){
  const[x,y]=q.opts.map(o=>+o.v);const n=+a,other=x===n?y:x;
  const H=v=>Math.floor(v/100),Tn=v=>Math.floor(v/10)%10,On=v=>v%10;
  let s;if(H(n)!==H(other))s=["Look at the hundreds first.",n+" has "+H(n)+" hundreds. "+other+" has "+H(other)+" hundreds."];
  else if(Tn(n)!==Tn(other))s=["The hundreds are the same.","Look at the tens. "+n+" has "+Tn(n)+" tens. "+other+" has "+Tn(other)+" tens."];
  else s=["The hundreds and tens are the same.","Look at the ones. "+n+" has "+On(n)+". "+other+" has "+On(other)+"."];
  s.push("So "+n+" is "+m[1]+".");return s}
 if((m=say.match(/^Is (\d+) odd or even\?/))&&(a==="odd"||a==="even")){const n=+m[1],p=Math.floor(n/2);
  if((n%2?"odd":"even")===a)return["Make pairs with "+n+".",p+" pairs"+(n%2?" and 1 left over.":", none left over."),"So "+n+" is "+a+"."]}
 if((m=say.match(/^Round (\d+) to the nearest ten\.$/))){const n=+m[1],lo=Math.floor(n/10)*10,d=n%10;
  if(Math.round(n/10)*10===+a&&d!==5)return[n+" is between "+lo+" and "+(lo+10)+".","The ones digit is "+d+". "+(d>5?"That is more than 5, so round up.":"That is less than 5, so round down."),"So "+n+" rounds to "+a+"."]}
 // Times Treehouse
 if((m=say.match(/^Count by (\d+)s\. Which number is missing\?$/))){const s=+m[1];const nums=(stg.match(/class="hop[^"]*">([^<]+)</g)||[]).map(x=>x.replace(/.*>/,"").replace("<",""));
  if(nums.length){const filled=nums.map(x=>x==="?"?a:x);let ok=true;for(let i=1;i<filled.length;i++)if(+filled[i]-+filled[i-1]!==s)ok=false;
   if(ok)return["Each jump adds "+s+".","Count: "+filled.join(", ")+".","The missing number is "+a+"."]}}
 if((m=say.match(/^(\d+) times what equals (\d+)\?$/))){const A=+m[1],P=+m[2],b=+a;if(A*b===P&&b<=12)return["Count by "+A+"s up to "+P+".",upTo(A,P).join(", ")+".","That is "+b+" jumps. So "+A+" × "+b+" = "+P+"."]}
 // Pizza Bakery
 if(say==="How much of the pizza is coloured?"&&(m=a.match(/^(\d)\/(\d)$/))){const k=cnt(stg,/fill="#e2953a"/g),n=cnt(stg,/<path /g);
  if(k===+m[1]&&n===+m[2])return["The pizza has "+n+" equal parts.",k+" part"+(k>1?"s are":" is")+" coloured.",k+" out of "+n+" is "+a+"."]}
 if((m=say.match(/^What is one (half|quarter) of (\d+)\?/))){const d=m[1]==="half"?2:4,tot=+m[2];if(tot/d===+a)return["Share "+tot+" into "+d+" equal groups.","Each group gets "+a+".","So one "+m[1]+" of "+tot+" is "+a+"."]}
 if((m=say.match(/^Which one is the same amount as (.+)\?$/))&&(m=qq.match(/(\d)\s+(\d)/))){const A=+m[1],B=+m[2],[C,D]=a.split("/").map(Number),k=D/B;
  if(Number.isInteger(k)&&A*k===C)return[frName(A,B)+" of the pizza is coloured.","Cut each piece into "+k+" smaller pieces.","Now "+C+" out of "+D+" pieces are coloured.","So "+a+" is the same amount."]}
 // Pattern Cliffs
 if((m=say.match(/^(?:Find the|Which shape is a) (\w+)\.?\??$/))&&m[1]===a&&SHAPE_SAY[a])return[SHAPE_SAY[a],"Look for that shape.","So that one is the "+a+"."];
 if(say==="What comes next in the pattern?"){const seq=(stg.match(/aria-label="(\w+)"/g)||[]).map(x=>x.slice(12,-1));const base=[...new Set(seq)];
  if(seq.length&&base[seq.length%base.length]===a&&seq.every((x,i)=>x===base[i%base.length]))return["Say the pattern: "+seq.join(", ")+".","The part that repeats is "+base.join(", ")+".","So next comes "+a+"."]}
 // Clock Tower
 if((m=say.match(/^What day comes (after|before) (\w+)\?$/))){const i=DAYW.indexOf(m[2]),j=i+(m[1]==="after"?1:-1);
  if(DAYW[j]===a){const lo=Math.max(0,Math.min(i,j)-1),seg=DAYW.slice(lo,Math.max(i,j)+2);return["Say the days in order.",seg.join(", ")+".","So "+(m[1]==="after"?"after "+m[2]+" comes "+a:"before "+m[2]+" comes "+a)+"."]}}
 if(say==="What time does the clock show?"||/^What time does the clock show\? Count by fives/.test(say)){
  if(/^\d+$/.test(a))return["The long hand points to 12. That means o'clock.","The short hand points to "+a+".","So it is "+a+" o'clock."];
  if((m=a.match(/^half past (\d+)$/)))return["The long hand points to 6. That is half past.","The short hand is just past "+m[1]+".","So it is half past "+m[1]+"."];
  if((m=a.match(/^quarter past (\d+)$/)))return["The long hand points to 3. That is quarter past.","The short hand is just past "+m[1]+".","So it is quarter past "+m[1]+"."];
  if((m=a.match(/^quarter to (\d+)$/)))return["The long hand points to 9. That is quarter to.","The short hand is nearly at "+m[1]+".","So it is quarter to "+m[1]+"."];
  if((m=a.match(/^(\d+):(\d\d)$/))){const mm=+m[2];if(mm%5===0&&mm>0)return["The long hand points to "+mm/5+".","Count by 5s: "+upTo(5,mm).join(", ")+". That is "+mm+" minutes.","The short hand is past "+m[1]+".","So it is "+a+"."]}
 }
 if((m=qq.match(/starts (\d+):(\d\d), lasts (\d+) (minutes|hour)/))&&(m2=a.match(/^(\d+):(\d\d)$/))){
  const h=+m[1],sm=+m[2],dur=m[4]==="hour"?60:+m[3],tot=sm+dur,eh=((h-1+Math.floor(tot/60))%12)+1,em=tot%60;
  if(eh===+m2[1]&&em===+m2[2])return["It starts at "+m[1]+":"+m[2]+".","Add "+(dur===60?"1 hour":dur+" minutes")+".","It finishes at "+a+"."]}
 // Market Stall
 if(/^Gold coins! How many dollars/.test(say)){const two=cnt(stg,/class="coin gold big"/g),one=cnt(stg,/class="coin gold\s*"/g);
  if(two*200+one*100===+a){const run=[];let t=0;for(let i=0;i<two;i++){t+=2;run.push(t)}for(let i=0;i<one;i++){t+=1;run.push(t)}
   return[two?"Each $2 coin is 2 dollars.":"Each $1 coin is 1 dollar.","Count: "+run.join(", ")+".","That is "+fmtMoney(+a)+"."]}}
 if((m=say.match(/^You have (\d+) dollars\. Which one can you buy\?$/))&&Array.isArray(q.opts)){const o=q.opts.find(x=>x.v===q.ans);const pm=o&&String(o.h).match(/\$(\d+)/);
  if(pm&&+pm[1]<=+m[1])return["You have $"+m[1]+".","The "+a+" costs $"+pm[1]+". That is "+(+pm[1]===+m[1]?"the same as":"less than")+" $"+m[1]+".","The others cost more than $"+m[1]+".","So you can buy the "+a+"."]}
 if((m=say.match(/^A toy costs (\d+) dollars\. You pay with a 10 dollar note/))){const c=+m[1],ch=10-c;
  if(ch*100===+a)return["Count up from $"+c+" to $10.",upTo(1,10).filter(v=>v>c).join(", ")+". That is "+ch+" dollar"+(ch>1?"s":"")+".","So the change is "+fmtMoney(+a)+"."]}
 if(say==="How much money altogether?"){const vals=[];stg.replace(/class="note n(\d+)"|class="coin (gold|silver)( big)?\s*">([^<]+)</g,(x,n,g,b,lab)=>{if(n)vals.push(+n*100);else{const v=lab.endsWith("c")?parseInt(lab):parseFloat(lab.replace("$",""))*100;vals.push(v)}return x});
  if(vals.length&&vals.reduce((s,v)=>s+v,0)===+a){let t=0;const run=vals.map(v=>fmtMoney(t+=v));return["Start with the biggest: "+fmtMoney(vals[0])+".","Add each one: "+run.join(", ")+".","Altogether it is "+fmtMoney(+a)+"."]}}
 if(say==="How much money is this?"){const vals=(stg.match(/>(\d+)c</g)||[]).map(x=>parseInt(x.slice(1)));
  if(vals.length&&vals.reduce((s,v)=>s+v,0)===+a){let t=0;return["Count the coins.",vals.map(v=>(t+=v)+"c").join(", ")+".","That is "+fmtMoney(+a)+"."]}}
 // Graph Garden
 if((m=say.match(/^Which fruit did we pick the (most|least) of\?$/))){const rows=[...stg.matchAll(/<div><b>(\w+)<\/b>([^<]*)<\/div>/g)].map(r=>[r[1],[...r[2]].length]);
  if(rows.length){const sorted=[...rows].sort((x,y)=>m[1]==="most"?y[1]-x[1]:x[1]-y[1]);if(sorted[0][0]===a&&sorted[0][1]!==sorted[1][1])
   return["Count each row.",rows.map(r=>r[0]+": "+r[1]).join(". ")+".",a+" has the "+m[1]+"."]}}
 if(q.spin){const pink=cnt(stg,/fill="#c8607a"/g),n=cnt(stg,/<path /g);const exp={0:"impossible",[n]:"certain"}[pink]||(pink*2>n?"likely":pink*2<n?"unlikely":"");
  if(n&&exp===a)return[pink+" out of "+n+" parts "+(pink===1?"is":"are")+" pink.",pink===0?"There is no pink at all.":pink===n?"Every part is pink.":pink*2>n?"Most of it is pink.":"Only a little is pink.","So landing on pink is "+a+"."]}
 return null;
}
let m2;

function steps(q,w){
 if(w==="feel")return null;
 const tl=teachLookup(q);if(tl)return tl;
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
 if(q.teach){const s=sentences(q.teach),A=strip(q.ans);if(s.length){if(A&&!s.join(" ").toLowerCase().includes(A.toLowerCase()))s.push("So the answer is "+A+".");return s.length===1?s.concat(["So the answer is "+A+"."]):s}}
 const W=window.PEBBLE_JOURNEY_WORK;
 if(W&&q.ans!==undefined){const prompt=strip(q.q)||strip(q.say);
  if(W.findSum(prompt)||/\d\s*[+\-−–×x*÷\/]\s*\d/.test(prompt)){
   try{const r=W.workSteps({prompt,choices:[String(strip(q.ans))],correct:0,explain:"",hint:""});if(r&&r.st&&r.st.length>1)return r.st}catch(e){}
  }
 }
 try{const rs=rules(q,w);if(rs)return rs}catch(e){}
 if(q.ans===undefined)return null;
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
 d.innerHTML='<span aria-hidden="true">'+(typeof kid!=="undefined"&&kid===0?"\u{1F984}":"\u{1F422}")+'</span><div><b>Learn:</b> '+esc(tip)+'</div>';
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
