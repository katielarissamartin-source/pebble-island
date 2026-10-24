(function(){
const BANK=window.LB;
const fit=s=>s.length>48?`<span style="font-size:clamp(1.1rem,2.6vw,1.6rem);line-height:1.35;font-weight:700;max-width:640px;text-align:left">${s}</span>`:"";
const recent={};
function fromBank(id,l){const lv=BANK[id][Math.min(l,BANK[id].length)-1];const key=id+l;recent[key]=recent[key]||[];
  let it,g=0;do{it=pick(lv)}while(recent[key].includes(it.q)&&g++<20);recent[key].push(it.q);if(recent[key].length>Math.min(5,lv.length-2))recent[key].shift();
  const n=(kid!==null&&S.kids[kid].age>=9||l>=4)?3:2;
  return{say:it.q,q:it.q.length>48?"":it.q,stage:(it.q.length>48?fit(it.q)+"<br>":"")+`<span>${it.e}</span>`,opts:txtOpts(it.a,shuffle(it.w).slice(0,n)),ans:it.a,teach:it.t}}
WORLDS.splice(WORLDS.findIndex(w=>w.id==="feel"),0,
 {id:"sci",name:"Science Station",ico:"🔬",bg:"#2b6f8f",sub:"Living things, Earth, forces, materials",max:8},
 {id:"geo",name:"Map Island",ico:"🗺️",bg:"#3b7d4f",sub:"Places, maps, Australia, the world",max:8},
 {id:"hist",name:"Time Cave",ico:"🏺",bg:"#8a5a34",sub:"The past, First Nations, Australian history",max:8});
WORLDS.splice(WORLDS.findIndex(w=>w.id==="mix"),0,{id:"review",name:"Memory Mountain",ico:"🏔️",bg:"#5b5f97",sub:"Daily review: keeps what you learned",max:0,cls:"review"});
GEN.sci=l=>fromBank("sci",l);GEN.geo=l=>fromBank("geo",l);GEN.hist=l=>fromBank("hist",l);
const Y=["F","Y1","Y2","Y3","Y4","Y5","Y6","Y6+"];
CURR.sci=["Living vs non-living, senses (AC9SFU01)","Needs and life cycles, materials (AC9S1U01, AC9S1U04)","Push and pull, water cycle (AC9S2U03, AC9S2U02)","Solids and liquids, day and night (AC9S3U04, AC9S3U02)","Food chains, forces, erosion (AC9S4U01, AC9S4U03)","Adaptations, light, solar system (AC9S5U01, AC9S5U03)","Photosynthesis, seasons, circuits (AC9S6U01, AC9S6U03)","Fair testing and inquiry skills (AC9S6I02)"].map((a,i)=>[a.split(" (")[0],`${Y[i]} Science: ${a.match(/\((.*)\)/)[1]}`,"Science inquiry: explaining with evidence"]);
CURR.geo=["Places and features close to home","Australia, natural vs built features","Continents, oceans, states","Country/Place, climate zones, scale","World regions, sustainability, grid references","Neighbours, natural hazards, population","Latitude, Asia region, urban and rural","Global interconnections and inquiry"].map((a,i)=>[a,`${Y[i]} HASS – Geography`,"Comparing places and explaining patterns"]);
CURR.hist=["Personal and family histories","Past and present daily life","Timelines, sources, local history","Exploration, colonisation, First Nations perspectives","Federation and democracy","Migration, rights and recognition","Ancient civilisations","Sources, perspectives, cause and effect"].map((a,i)=>[a,`${Y[i]} HASS – History`,"Using sources and perspectives"]);
const ext=(id,max,fn,rows)=>{const o=GEN[id];GEN[id]=l=>l<=WORLDS.find(w=>w.id===id).baseMax?o(l):fn(l);const w=WORLDS.find(x=>x.id===id);w.baseMax=w.max;w.max=max;rows.forEach(r=>CURR[id].push(r))};
const word=t=>`<span class="word" style="font-size:clamp(2rem,6vw,3.6rem)">${t}</span>`;
const N=(a,say,q,hi)=>({say,q,stage:word(q.replace(" = ?","")),opts:numOpts(a,0,hi||99999),ans:a});
ext("nums",9,l=>{
  if(l===7){const a=rnd(120,560),b=rnd(110,399);return Object.assign(N(a+b,`What is ${a} plus ${b}?`,`${a} + ${b} = ?`),{teach:`Add the hundreds, then the tens, then the ones: ${a} + ${b} = ${a+b}.`})}
  if(l===8){const a=rnd(300,900),b=rnd(115,a-50);return Object.assign(N(a-b,`What is ${a} take away ${b}?`,`${a} − ${b} = ?`),{teach:`Take away hundreds, then tens, then ones. If you can't, swap a ten for ten ones. ${a} − ${b} = ${a-b}.`})}
  const n=rnd(3,9),k=rnd(4,12),it=pick(["packets of stickers","boxes of pencils","bags of apples","teams of players"]);
  return{say:`There are ${n} ${it} with ${k} in each. How many altogether?`,q:`${n} ${it}, ${k} in each`,stage:word(`${n} × ${k}`),opts:numOpts(n*k,0,200),ans:n*k,teach:`Equal groups means multiply: ${n} × ${k} = ${n*k}.`}},
 [["3-digit adding","Y3 Maths: AC9M3N04","Strategies for adding"],["3-digit take-away","Y3–4 Maths: AC9M3N04, AC9M4N06","Regrouping"],["Multiplication word problems","Y3–4 Maths: AC9M3N06, AC9M4N07","Turning words into maths"]]);
ext("times",10,l=>{
  if(l===8){const a=rnd(2,10),b=rnd(2,10);return{say:`What is ${a*b} divided by ${a}?`,q:`${a*b} ÷ ${a} = ?`,stage:word(`${a*b} ÷ ${a}`),opts:numOpts(b,1,12),ans:b,teach:`Think: ${a} times what makes ${a*b}? ${a} × ${b} = ${a*b}, so the answer is ${b}.`}}
  if(l===9){const a=rnd(12,49),b=rnd(3,9);return{say:`What is ${a} times ${b}?`,q:`${a} × ${b} = ?`,stage:word(`${a} × ${b}`),opts:numOpts(a*b,0,500),ans:a*b,teach:`Split it: ${Math.floor(a/10)*10} × ${b} = ${Math.floor(a/10)*10*b}, plus ${a%10} × ${b} = ${(a%10)*b}. Total ${a*b}.`}}
  const per=rnd(3,9),n=rnd(3,9),tot=per*n,r=rnd(0,1)?rnd(1,per-1):0;
  return{say:`${tot+r} lollies are shared between ${per} kids equally. How many does each kid get${r?", and how many are left over?":"?"}`,q:`${tot+r} shared by ${per}`,stage:word(`${tot+r} ÷ ${per}`),opts:txtOpts(r?`${n} r${r}`:`${n}`,r?[`${n+1} r${r}`,`${n} r${r+1>=per?0:r+1}`].filter(x=>x!==`${n} r${r}`).concat([`${n-1} r${r}`]).slice(0,2):[`${n+1}`,`${n-1}`]),ans:r?`${n} r${r}`:`${n}`,teach:`${per} × ${n} = ${tot}${r?`, with ${r} left over`:""}.`}},
 [["Division facts","Y3–4 Maths: AC9M3N06","Inverse thinking"],["2-digit × 1-digit","Y4 Maths: AC9M4N07","Splitting numbers"],["Sharing with remainders","Y4–5 Maths: AC9M5N08","Interpreting remainders"]]);
ext("pv",9,l=>{
  if(l===8){const n=rnd(1000,9999),pos=pick([["thousands",1000],["hundreds",100],["tens",10]]);const d=Math.floor(n/pos[1])%10;return{say:`In ${n}, what is the value of the ${pos[0]} digit?`,q:`${n}: ${pos[0]} digit worth?`,stage:word(n),opts:numOpts(d*pos[1],0,9000).map(o=>o),ans:d*pos[1],teach:`The ${pos[0]} digit is ${d}, so it's worth ${d} × ${pos[1]} = ${d*pos[1]}.`}}
  const n=rnd(1100,9899),to=pick([10,100,1000]),a=Math.round(n/to)*to;let o=[a,a+to,a-to].filter(x=>x>=0);return{say:`Round ${n} to the nearest ${to}.`,q:`Round ${n} to nearest ${to}`,stage:word(n),opts:shuffle(o).map(x=>({v:x,h:x})),ans:a,teach:`Look at the digit to the right of the ${to}s place. 5 or more rounds up. ${n} → ${a}.`}},
 [["4-digit place value","Y4 Maths: AC9M4N01","Reading big numbers"],["Rounding","Y4 Maths: AC9M4N05","Estimating"]]);
ext("frac",9,l=>{
  if(l===7){const d=pick([2,3,4,5]),n=rnd(1,d-1),k=rnd(2,4);return{say:`Which fraction is the same as ${n} over ${d}?`,q:`${n}/${d} = ?`,stage:word(`${n}/${d}`),opts:txtOpts(`${n*k}/${d*k}`,shuffle([`${n*k}/${d}`,`${n}/${d*k}`,`${n+k}/${d+k}`]).slice(0,2)),ans:`${n*k}/${d*k}`,teach:`Multiply the top and bottom by the same number: ${n}×${k} / ${d}×${k} = ${n*k}/${d*k}.`}}
  if(l===8){const d=pick([5,6,8,10]),a=rnd(1,d-2),b=rnd(1,d-a-1);return{say:`What is ${a} over ${d} plus ${b} over ${d}?`,q:`${a}/${d} + ${b}/${d} = ?`,stage:word(`${a}/${d} + ${b}/${d}`),opts:txtOpts(`${a+b}/${d}`,[`${a+b}/${d*2}`,`${a*b}/${d}`].filter(x=>x!==`${a+b}/${d}`)),ans:`${a+b}/${d}`,teach:`Same bottom number: just add the tops. ${a} + ${b} = ${a+b}, so ${a+b}/${d}.`}}
  const t=rnd(1,9),h=rnd(1,99);if(Math.random()<.5)return{say:`What is ${t} tenths as a decimal?`,q:`${t}/10 = ?`,stage:word(`${t}/10`),opts:txtOpts(`0.${t}`,[`${t}.0`,`0.0${t}`]),ans:`0.${t}`,teach:`Tenths go in the first place after the decimal point: 0.${t}.`};
  const v=(h/100).toFixed(2);return{say:`What is ${h} hundredths as a decimal?`,q:`${h}/100 = ?`,stage:word(`${h}/100`),opts:txtOpts(v,[(h/10).toFixed(1),`0.${h}0`].filter(x=>x!==v)),ans:v,teach:`Hundredths use two places after the point: ${h}/100 = ${v}.`}},
 [["Equivalent fractions","Y4 Maths: AC9M4N03","Seeing the same amount differently"],["Adding fractions","Y5 Maths: AC9M5N05","Same-size parts"],["Tenths and hundredths as decimals","Y4–5 Maths: AC9M4N02, AC9M5N03","Linking fractions and decimals"]]);
ext("read",8,l=>fromBank("readx",l-6+(l===8?Math.round(Math.random()):0)),[["Inference from clues","Y3–4 English: AC9E3LY05, AC9E4LY05","Inferring with evidence"],["Author's purpose, fact vs opinion, figurative language","Y4–5 English: AC9E5LY02, AC9E5LA08","Critical reading"]]);
if(!S.seenW)S.seenW={};
const touch=()=>{if(kid===null||!round||!round.w)return;const k=S.seenW[kid]=S.seenW[kid]||{};k[round.w]=Date.now()};
function chooseReview(){const ps=S.progress[kid]||{};const ids=WORLDS.filter(w=>w.max>1&&ps[w.id]&&ps[w.id].placed).map(w=>w.id);if(!ids.length)return pick(WORLDS.filter(w=>w.max).map(w=>w.id));
  const seen=S.seenW[kid]||{};const now=Date.now();const wts=ids.map(id=>{const days=(now-(seen[id]||now-864e5*3))/864e5;const h=ps[id].hist||[];const acc=h.length?h.filter(x=>x>0).length/h.length:.7;return Math.max(.2,days+.5)*(1.6-acc)});
  let r=Math.random()*wts.reduce((a,b)=>a+b,0);for(let i=0;i<ids.length;i++){r-=wts[i];if(r<=0)return ids[i]}return ids[0]}
const _next=next;next=function(){
  if(round&&round.home==="review"&&!round.place){const w=chooseReview();const p=prog(w);const L=Math.max(1,p.lvl-(Math.random()<.5?1:0));
    round.w=w;round.mix=false;round.q=GEN[w](L);round.qLevel=L;round.tag="review";round.tries=0;round.counted=0;round.whyDone=false;round.whyStage=false;render();
    const nm=WORLDS.find(x=>x.id===w).name;setTimeout(()=>round&&round.q&&speak(`${round.n===0?`Memory Mountain! Let's see what you remember. `:""}${nm}! ${round.q.say}`),300);return}
  _next()};
const _wrong=wrong;wrong=function(line){const q=round&&round.q;_wrong(line);
  if(q&&q.teach&&round&&!round.whyStage){const m=$("#msg");setTimeout(()=>{const mm=$("#msg");if(mm&&round&&round.q===q){mm.className="msg teach";mm.textContent="💡 "+q.teach}},50);setTimeout(()=>{if(round&&round.q===q)speak(q.teach,"soft")},1200)}};
const _correct=correct;correct=function(x,y,s){touch();const q=round&&round.q;if(q&&q.teach&&round.tries>0)s=(s?s+". ":"")+q.teach;_correct(x,y,s)};
const _map=map;map=function(){_map();const b=$('[data-w="review"]');if(b){const d=Object.keys((S.seenW||{})[kid]||{}).length;b.insertAdjacentHTML("beforeend",`<span style="font-size:15px;opacity:.9">${d?"Mix of everything you've learned":"Play other islands first"}</span>`)}};
const css=document.createElement("style");css.textContent=`.world.review{background:#5b5f97}.msg.teach{color:#5c3a00!important;background:#fff3d6;border-radius:12px;padding:8px 12px;font-weight:700}`;document.head.appendChild(css);
})();
