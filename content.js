const PICS=[["cat","🐱"],["dog","🐶"],["sun","☀️"],["bus","🚌"],["pig","🐷"],["hat","🎩"],["fish","🐟"],["bed","🛏️"],["cup","🥤"],["fox","🦊"],["bee","🐝"],["egg","🥚"],["moon","🌙"],["tree","🌳"],["frog","🐸"],["star","⭐"],["ship","🚢"],["duck","🦆"],["cake","🎂"],["book","📚"],["shell","🐚"],["sheep","🐑"],["crab","🦀"],["snail","🐌"]];
const LOOKALIKE={cat:["cot","cut","cap"],dog:["dig","dot","bog"],sun:["son","run","sum"],bus:["bat","bun","but"],pig:["peg","big","pin"],hat:["hit","hot","bat"],fish:["dish","wish","fist"],bed:["bad","bud","red"],cup:["cap","pup","cub"],fox:["box","fix","fog"],bee:["see","bed","tee"],egg:["leg","beg","peg"],moon:["moan","noon","mood"],tree:["three","free","trip"],frog:["from","fog","flag"],star:["stir","scar","stay"],ship:["shop","chip","sip"],duck:["dock","luck","deck"],cake:["lake","cane","cape"],book:["look","hook","boot"],shell:["shall","spell","smell"],sheep:["sleep","sheet","shop"],crab:["crib","grab","cram"],snail:["snake","nail","sail"]};
const SENT=[["The dog can","run",["sun","red"]],["I sit on a","chair",["cheese","jump"]],["Fish live in the","sea",["sky","bed"]],["The sun is","hot",["hat","sad"]],["I eat with a","spoon",["moon","tree"]],["A bird can","fly",["fish","cup"]],["We read a","book",["look","shoe"]],["Put on your","shoes",["shells","soup"]]];
function q_spell(maxLen){const pool=PICS.filter(([w])=>w.length<=maxLen);const[w,e]=pick(pool);
  const extra=shuffle("abcdefghilmnoprstu".split("").filter(c=>!w.includes(c))).slice(0,2);
  return{type:"spell",word:w,say:`Spell ${w}. Tap the letters in order.`,q:"Spell the word",stage:`<span class="pic">${e}</span>`,tiles:shuffle([...w,...extra])}}
function q_words(l){
  if(l>=3&&Math.random()<.45)return q_spell(l===3?3:l===4?4:5);
  if(l===1){const L=pick("abcdmst".split(""));const o=shuffle([L,...shuffle("abcdefghmnoprst".replace(L,"").split("")).slice(0,2)]);
    return{say:`Find the letter ${L.toUpperCase()}.`,q:"Find this letter",stage:`<span class="word">${L.toUpperCase()}</span>`,opts:o.map(x=>({v:x,h:x})),ans:L}}
  if(l===2){const[w,e]=pick(PICS);const L=w[0];const o=shuffle([L,...shuffle("bcdfhmpst".replace(L,"").split("")).slice(0,2)]);
    return{say:`${w}. What sound does ${w} start with?`,q:"What sound does it start with?",stage:`<span class="pic">${e}</span>`,opts:o.map(x=>({v:x,h:x})),ans:L}}
  if(l===3){const set=shuffle(PICS).slice(0,3);const[w]=set[0];
    return{say:"Which picture is this word?",q:"Which picture is this word?",stage:`<span class="word">${w}</span>`,opts:shuffle(set).map(([a,e])=>({v:a,h:e})),ans:w}}
  if(l===4){const[w,e]=pick(PICS);return{say:`Which word says ${w}?`,q:"Which word matches?",stage:`<span class="pic">${e}</span>`,opts:txtOpts(w,shuffle(LOOKALIKE[w]).slice(0,2)),ans:w}}
  if(l===5){const[s,a,d]=pick(SENT);return{say:`${s}, blank. Which word fits?`,q:"Which word fits?",stage:`<span class="word" style="font-size:.6em;letter-spacing:.03em">${s} ___</span>`,opts:txtOpts(a,d),ans:a}}
  const pairs=[["happy","glad",["sad","hungry"]],["big","large",["tiny","fast"]],["fast","quick",["slow","loud"]],["small","little",["huge","tall"]],["shout","yell",["whisper","sleep"]],["begin","start",["finish","jump"]],["scared","afraid",["brave","sleepy"]],["shut","close",["open","eat"]]];
  const[w,a,d]=pick(pairs);return{say:`Which word means the same as ${w}?`,q:"Which word means the same?",stage:`<span class="word" style="font-size:.7em">${w}</span>`,opts:txtOpts(a,d),ans:a}
}

const OPP=[["hot","cold",["warm","sunny"]],["up","down",["over","top"]],["happy","sad",["glad","funny"]],["big","small",["huge","tall"]],["fast","slow",["quick","fun"]],["open","closed",["wide","door"]],["day","night",["sun","morning"]],["full","empty",["fat","heavy"]],["loud","quiet",["noisy","shout"]],["wet","dry",["rain","cold"]],["first","last",["one","best"]],["easy","hard",["simple","fun"]]];
const HOMO=[["I have ___ dogs.","two",["to","too"]],["We are going ___ the park.","to",["two","too"]],["Can I come ___?","too",["two","to"]],["The cat licked ___ paw.","its",["it's","it"]],["___ coming to my party.","They're",["There","Their"]],["Put the box over ___.","there",["their","they're"]],["I ___ a big dog.","saw",["sore","sor"]],["The wind ___ hard.","blew",["blue","bloo"]],["My shirt is ___.","blue",["blew","bloo"]],["I can ___ the ocean.","see",["sea","si"]]];
const PREF=[["un","happy","not happy"],["un","lock","the opposite of lock"],["re","paint","paint again"],["re","play","play again"],["un","tidy","not tidy"],["dis","like","not like"],["re","build","build again"],["un","safe","not safe"]];
const TENSE=[["Yesterday I ___ to the park.","walked",["walk","walking"]],["Right now she is ___.","jumping",["jumped","jumps"]],["Last night we ___ a movie.","watched",["watch","watching"]],["Tomorrow I will ___ my bike.","ride",["rode","riding"]],["Every day he ___ his teeth.","brushes",["brushed","brushing"]],["Last week they ___ a cake.","baked",["bake","baking"]]];
const PUNCT=[["My dog is called Max.",["my dog is called max.","My dog is called max"]],["We went to Melbourne on Sunday.",["we went to melbourne on sunday.","We went to melbourne on Sunday"]],["Where is my hat?",["where is my hat?","Where is my hat."]],["Wow, that is amazing!",["wow, that is amazing","Wow that is amazing?"]],["Ivy and Hayden like pizza.",["ivy and hayden like pizza.","Ivy and hayden like pizza"]]];
const PASS=[
 {t:"Milo the puppy found a red ball in the garden. He ran to show Sam. Sam threw the ball and Milo chased it.",q:"What colour was the ball?",a:"red",o:["blue","green"]},
 {t:"Zara packed her bag for the beach. She took a hat, a towel and a bucket. She was so excited to build a sandcastle.",q:"What did Zara want to build?",a:"a sandcastle",o:["a cubby house","a snowman"]},
 {t:"It was raining, so Leo stayed inside. He built a big tower with blocks. Then his sister knocked it over by mistake.",q:"Why did Leo stay inside?",a:"It was raining",o:["He was sick","It was night"]},
 {t:"The koala slept in the gum tree all day. At night it woke up and ate leaves. Koalas sleep for a very long time.",q:"When did the koala eat?",a:"At night",o:["In the morning","At lunch"]},
 {t:"Mia lost her tooth at school. She put it under her pillow. In the morning she found a shiny gold coin.",q:"Where did Mia put her tooth?",a:"Under her pillow",o:["In her bag","On the table"]},
 {t:"Ben's kite got stuck in a tree. He felt grumpy. His dad got a ladder and helped him get it down. Ben smiled again.",q:"How did Ben feel when the kite got stuck?",a:"Grumpy",o:["Excited","Sleepy"]}];
function q_read(l){
  if(l===1){const[w,a,d]=pick(OPP);return{say:`What is the opposite of ${w}?`,q:"What's the opposite?",stage:`<span class="word" style="font-size:.7em">${w}</span>`,opts:txtOpts(a,d),ans:a}}
  if(l===2){const[s,a,d]=pick(HOMO);return{say:`${s.replace("___","blank")} Which spelling is right?`,q:"Which spelling fits?",stage:`<span class="passage">${s}</span>`,opts:txtOpts(a,d),ans:a}}
  if(l===3){const[p,root,mean]=pick(PREF);const others=["un","re","dis"].filter(x=>x!==p);return{type:"opts",say:`Which word part makes ${root} mean ${mean}?`,q:`Make it mean “${mean}”`,stage:`<span class="word" style="font-size:.6em">___${root}</span>`,opts:shuffle([p,...others]).map(x=>({v:x,h:x+"-",txt:1})),ans:p,after:p+root}}
  if(l===4){const[s,a,d]=pick(TENSE);return{say:`${s.replace("___","blank")} Which word fits?`,q:"Which word fits?",stage:`<span class="passage">${s}</span>`,opts:txtOpts(a,d),ans:a}}
  if(l===5){const[a,d]=pick(PUNCT);return{say:"Which sentence has the capital letters and full stop in the right places?",q:"Which one is written correctly?",stage:"",opts:txtOpts(a,d),ans:a}}
  const p=pick(PASS);return{say:`Listen. ${p.t} ${p.q}`,q:p.q,stage:`<div class="passage">${p.t}</div>`,opts:txtOpts(p.a,p.o),ans:p.a}
}

const objs=(n,e,tap)=>`<div class="group">${Array.from({length:n},()=>tap?`<button class="tap" data-tap>${e}</button>`:`<span class="tap">${e}</span>`).join("")}</div>`;
function q_nums(l){
  const e=pick(["🍎","⭐","🐞","🍓","🐟","🌸","🦕","🚗"]);
  if(l<=2){const n=l===1?rnd(1,5):rnd(5,10);return{say:"Tap each one to count. How many?",q:"Tap to count. How many?",stage:objs(n,e,1),opts:numOpts(n,1,12),ans:n}}
  if(l===3){const a=rnd(1,5),b=rnd(1,4);return{say:`${a} and ${b} more. How many altogether? Tap them to count.`,q:`${a} + ${b} = ?`,stage:objs(a,e,1)+'<span class="op">+</span>'+objs(b,e,1),opts:numOpts(a+b),ans:a+b}}
  if(l===4){const a=rnd(4,9),b=rnd(1,a-1);return{say:`${a} take away ${b}. How many are left?`,q:`${a} − ${b} = ?`,stage:objs(a-b,e,1)+`<div class="group" style="opacity:.3">${e.repeat(b)}</div>`,opts:numOpts(a-b),ans:a-b}}
  if(l===5){const a=rnd(6,12),b=rnd(3,9);return{say:`What is ${a} plus ${b}?`,q:`${a} + ${b} = ?`,stage:`<span class="word">${a} + ${b}</span>`,opts:numOpts(a+b,0,30),ans:a+b}}
  if(Math.random()<.5){const a=rnd(20,60),b=rnd(10,30);return{say:`What is ${a} plus ${b}?`,q:`${a} + ${b} = ?`,stage:`<span class="word">${a} + ${b}</span>`,opts:numOpts(a+b),ans:a+b}}
  const a=rnd(40,90),b=rnd(10,35);return{say:`What is ${a} take away ${b}?`,q:`${a} − ${b} = ?`,stage:`<span class="word">${a} − ${b}</span>`,opts:numOpts(a-b),ans:a-b}
}

const rod='<span class="rod">'+"<i></i>".repeat(10)+"</span>";
const pvPic=(h,t,o)=>`<div class="pv">${'<span class="flat"></span>'.repeat(h)}${rod.repeat(t)}<span>${'<span class="cube"></span>'.repeat(o)}</span></div>`;
function q_pv(l){
  if(l===1){const t=rnd(1,5),o=rnd(0,9),n=t*10+o;return{say:`Each long stick is ten. Each little cube is one. What number is it?`,q:"Tens and ones. What number?",stage:pvPic(0,t,o),opts:shuffle([n,o*10+t===n?n+10:o*10+t,n+1]).map(x=>({v:x,h:x})),ans:n}}
  if(l===2){const n=rnd(12,59);return{type:"build",say:`Make ${n}. Tap tens and ones.`,q:`Make ${n}`,target:n,parts:[[10,"+10",rod],[1,"+1",'<span class="cube"></span>']],unit:""}}
  if(l===3){const h=rnd(1,3),t=rnd(0,5),o=rnd(0,9),n=h*100+t*10+o;return{say:"Flats are one hundred. Sticks are ten. Cubes are one. What number?",q:"Hundreds, tens and ones",stage:pvPic(h,t,o),opts:shuffle([n,n+10>999?n-10:n+10,h*100+o*10+t===n?n+100:h*100+o*10+t]).map(x=>({v:x,h:x})),ans:n}}
  if(l===4){let a=rnd(100,899),b=a+pick([-1,1])*rnd(1,90);const big=Math.random()<.5;const ans=big?Math.max(a,b):Math.min(a,b);return{say:`Which number is ${big?"bigger":"smaller"}?`,q:`Which is ${big?"bigger":"smaller"}?`,stage:"",opts:shuffle([a,b]).map(x=>({v:x,h:x})),ans,why:Math.random()<.5?{q:"How do you know?",a:Math.floor(a/100)!==Math.floor(b/100)?"I compared the hundreds first":"The hundreds match, so I compared the tens and ones",o:["It looks longer","I picked the first one"]}:null}}
  if(l===5){const n=rnd(3,24);const pairs=Math.floor(n/2),odd=n%2;const ans=odd?"odd":"even";
    return{say:`Is ${n} odd or even? Even numbers can make pairs with none left over.`,q:`Is ${n} odd or even?`,stage:n<=12?`<div class="group" style="max-width:220px">${"👫".repeat(pairs)}${odd?"🧍":""}</div>`:`<span class="word">${n}</span>`,opts:[{v:"odd",h:"odd",txt:1},{v:"even",h:"even",txt:1}],ans,why:{q:"How do you know?",a:odd?"There is one left over when you make pairs":"It makes pairs with none left over",o:["It's a big number","It has a nice shape"]}}}
  if(l===6){const n=rnd(112,399);return{type:"build",say:`Make ${n}. Tap hundreds, tens and ones.`,q:`Make ${n}`,target:n,parts:[[100,"+100",'<span class="flat" style="width:40px;height:40px;background-size:4px 4px"></span>'],[10,"+10",rod],[1,"+1",'<span class="cube"></span>']],unit:""}}
  const n=rnd(11,98);if(n%10===5||n%10===0){return q_pv(7)}const ans=Math.round(n/10)*10;return{say:`Round ${n} to the nearest ten.`,q:`${n} rounded to the nearest 10`,stage:`<span class="word">${n}</span>`,opts:shuffle([ans,ans===Math.floor(n/10)*10?ans+10:ans-10,n]).map(x=>({v:x,h:x})),ans}
}

const TT=[[2,5,10],[2,5,10],[2,5,10],[3,4],[3,4,2,5,10],[2,3,4,5,6,7,8,9,10],[2,3,4,5,6,7,8,9,10]];
const arr=(r,c,e)=>`<div class="arr">${Array.from({length:r},(_,i)=>`<button class="row" data-row="${i}">${e.repeat(c)}</button>`).join("")}</div>`;
function ttOpts(a,b){const ans=a*b,s=new Set([ans]);[a*(b+1),a*(b-1),a+b,(a+1)*b,ans+a,ans-b,ans+2].forEach(x=>{if(s.size<3&&x>0&&x!==ans)s.add(x)});return shuffle([...s]).map(x=>({v:x,h:x}))}
function q_times(l){
  const a=pick(TT[l-1]),b=rnd(l<=3?1:2,l<=3?5:10),e=pick(["🍌","🥥","🐒","🍉","🦜","🌺","🍍"]);
  if(l===1){const s=pick([2,5,10]);const start=rnd(0,3);const seq=Array.from({length:5},(_,i)=>(start+i+1)*s);const gap=rnd(1,4);const ans=seq[gap];
    return{say:`Count by ${s}s. Which number is missing?`,q:`Count by ${s}s`,stage:`<div class="hops">${seq.map((n,i)=>`<span class="hop ${i===gap?"miss":""}">${i===gap?"?":n}</span>`).join("")}</div>`,opts:shuffle([ans,ans+s,ans>s?ans-s:ans+2*s]).map(x=>({v:x,h:x})),ans}}
  if(l===2||l===4)return{say:`${b} rows of ${a}. Tap each row to count by ${a}s. How many altogether?`,q:`${b} rows of ${a}`,stage:arr(b,a,e),opts:ttOpts(a,b),ans:a*b,rows:a};
  if(l===7&&Math.random()<.5)return{say:`${a} times what equals ${a*b}?`,q:`${a} × ? = ${a*b}`,stage:`<span class="word">${a} × ? = ${a*b}</span>`,opts:shuffle([b,b+1,b-1]).map(x=>({v:x,h:x})),ans:b};
  const showArr=(l===3||l===5)&&Math.random()<.5;
  return{say:`What is ${b} times ${a}?`,q:`${b} × ${a} = ?`,stage:showArr?arr(b,a,e):`<span class="word">${b} × ${a}</span>`,opts:ttOpts(a,b),ans:a*b,rows:a};
}

const FW={2:"half",3:"third",4:"quarter",6:"sixth",8:"eighth"};
const NUMW=["zero","one","two","three","four","five","six","seven","eight"];
const frSay=(k,n)=>`${NUMW[k]} ${FW[n]}${k>1?(n===2?"ves":"s"):""}`.replace("halfs","halves");
const frH=(k,n)=>`<span class="fr"><b>${k}</b><i>${n}</i></span>`;
function pie(n,shaded=0,inter=false,size=230){const r=46,cx=50,cy=50;let s="";
  if(n===1)return"";
  for(let i=0;i<n;i++){const a0=i/n*2*Math.PI-Math.PI/2,a1=(i+1)/n*2*Math.PI-Math.PI/2;const x0=cx+r*Math.cos(a0),y0=cy+r*Math.sin(a0),x1=cx+r*Math.cos(a1),y1=cy+r*Math.sin(a1);
    s+=`<path ${inter?`data-part="${i}"`:""} d="M${cx} ${cy} L${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 ${n<=1?1:0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}Z" fill="${i<shaded?"#e2953a":"#f6e3b8"}" stroke="#9a6a2c" stroke-width="1.5"/>`}
  return`<svg class="pie" viewBox="0 0 100 100" style="width:min(${size}px,60vw)">${s}</svg>`}
function q_frac(l){
  if(l===1)return{type:"shade",n:2,k:1,say:"Tap to colour one half of the pizza.",q:"Colour one half",stage:pie(2,0,true)};
  if(l===2){const k=pick([1,1,2,3]);return{type:"shade",n:4,k,say:`Tap to colour ${frSay(k,4)} of the pizza.`,q:`Colour ${frSay(k,4)}`,stage:pie(4,0,true)}}
  if(l===3){const n=pick([2,3,4]),k=rnd(1,n-1);const ans=`${k}/${n}`;const pool=["1/2","1/3","2/3","1/4","3/4","2/4"].filter(x=>x!==ans);
    return{say:"How much of the pizza is coloured?",q:"How much is coloured?",stage:pie(n,k),opts:shuffle([ans,...shuffle(pool).slice(0,2)]).map(x=>({v:x,h:frH(...x.split("/"))})),ans}}
  if(l===4){const n=pick([3,6,8]),k=rnd(1,n-1);return{type:"shade",n,k,say:`Tap to colour ${frSay(k,n)}.`,q:`Colour ${frH(k,n)}`,stage:pie(n,0,true)}}
  if(l===5){const d=pick([2,4]),per=rnd(1,4),tot=d*per;const e=pick(["🍓","🍪","🧁","🍬"]);return{say:`What is one ${FW[d]} of ${tot}? Tap to count if you like.`,q:`${frH(1,d)} of ${tot}`,stage:objs(tot,e,1),opts:numOpts(per,1,20),ans:per}}
  const eq=pick([[[1,2],[2,4]],[[1,2],[4,8]],[[1,4],[2,8]],[[1,3],[2,6]],[[3,4],[6,8]]]);const[[a,b],[c,d]]=eq;const wrong=shuffle([[1,3],[3,4],[1,4],[2,3],[3,8]].filter(([x,y])=>x/y!==a/b)).slice(0,2);
  return{say:`Which one is the same amount as ${frSay(a,b)}?`,q:`Same as ${frH(a,b)}?`,stage:pie(b,a,false,150),opts:shuffle([[c,d],...wrong]).map(([x,y])=>({v:`${x}/${y}`,h:`<span style="display:grid;justify-items:center;gap:4px">${pie(y,x,false,90)}${frH(x,y)}</span>`})),ans:`${c}/${d}`,why:{q:"How do you know they're the same?",a:"They cover the same amount of pizza",o:["They have the same top number","The bottom number is bigger"]}}
}

const SHAPES={circle:'<circle cx="40" cy="40" r="32"/>',square:'<rect x="10" y="10" width="60" height="60" rx="4"/>',triangle:'<polygon points="40,8 74,70 6,70"/>',star:'<polygon points="40,6 49,30 75,30 54,46 62,72 40,56 18,72 26,46 5,30 31,30"/>',heart:'<path d="M40 70 C10 48 4 30 18 18 C28 10 38 16 40 24 C42 16 52 10 62 18 C76 30 70 48 40 70Z"/>',rectangle:'<rect x="4" y="22" width="72" height="36" rx="4"/>',hexagon:'<polygon points="22,8 58,8 76,40 58,72 22,72 4,40"/>',pentagon:'<polygon points="40,6 76,32 62,74 18,74 4,32"/>',octagon:'<polygon points="26,6 54,6 74,26 74,54 54,74 26,74 6,54 6,26"/>'};
const SIDES={triangle:3,square:4,rectangle:4,pentagon:5,hexagon:6,octagon:8};
const SCOL=["#3d8fb0","#4f9a6e","#c8607a","#f2b544","#7a6fc2"];
const shp=(n,c)=>`<svg viewBox="0 0 80 80" aria-label="${n}"><g fill="${c||SCOL[0]}">${SHAPES[n]}</g></svg>`;
function q_shapes(l){
  if(l===1){const names=shuffle(["circle","square","triangle","star","heart","rectangle"]).slice(0,3);const a=names[0];
    return{say:`Find the ${a}.`,q:`Find the ${a}`,stage:"",opts:shuffle(names).map((x,i)=>({v:x,h:shp(x,SCOL[i])})),ans:a}}
  if(l===2||l===3){const base=shuffle(["circle","square","triangle","star","heart"]).slice(0,l===2?2:3);
    const seq=[];for(let i=0;i<(l===2?5:6);i++)seq.push(base[i%base.length]);const a=base[seq.length%base.length];
    return{say:"What comes next in the pattern?",q:"What comes next?",stage:seq.map(x=>`<span style="width:54px;display:inline-block">${shp(x,SCOL[base.indexOf(x)])}</span>`).join("")+'<span class="op">?</span>',
      opts:shuffle(base.length<3?[...base,"rectangle"]:base).map(x=>({v:x,h:shp(x,SCOL[Math.max(0,base.indexOf(x))])})),ans:a}}
  if(l===4){const a=pick(Object.keys(SIDES));return{say:`How many sides does a ${a} have? Tap each side if you like.`,q:"How many sides?",stage:`<span style="width:150px;display:inline-block">${shp(a)}</span>`,opts:numOpts(SIDES[a],3,9),ans:SIDES[a]}}
  if(l===5){const a=pick(["square","triangle","pentagon","hexagon","octagon","rectangle"]);const others=shuffle(Object.keys(SIDES).filter(x=>x!==a&&SIDES[x]!==SIDES[a])).slice(0,2);
    return{say:`Which shape is a ${a}?`,q:`Which is a ${a}?`,stage:"",opts:shuffle([a,...others]).map((x,i)=>({v:x,h:shp(x,SCOL[i+1])})),ans:a}}
  const rows=4,half=3;const left=Array.from({length:rows},()=>Array.from({length:half},()=>Math.random()<.45));if(!left.flat().some(Boolean))left[0][0]=true;
  return{type:"mirror",rows,half,left,say:"Make it symmetrical! Tap the squares on the right to copy the left side like a mirror.",q:"Mirror the picture"}
}

const DAYS=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
function clock(h,m,size=170){const ha=((h%12)+m/60)*30,ma=m*6;return`<svg viewBox="0 0 100 100" style="width:${size}px;max-width:60vw"><circle cx="50" cy="50" r="46" fill="var(--bg2)" stroke="currentColor" stroke-width="4"/>${[...Array(60)].map((_,i)=>i%5?`<line x1="${50+42*Math.sin(i*6*Math.PI/180)}" y1="${50-42*Math.cos(i*6*Math.PI/180)}" x2="${50+44*Math.sin(i*6*Math.PI/180)}" y2="${50-44*Math.cos(i*6*Math.PI/180)}" stroke="currentColor" stroke-width=".6" opacity=".5"/>`:"").join("")}${[...Array(12)].map((_,i)=>{const a=i*30*Math.PI/180;return`<text x="${50+35*Math.sin(a)}" y="${54-35*Math.cos(a)}" font-size="11" font-weight="700" text-anchor="middle" fill="currentColor" font-family="Lexend">${i||12}</text>`}).join("")}<line x1="50" y1="50" x2="${50+22*Math.sin(ha*Math.PI/180)}" y2="${50-22*Math.cos(ha*Math.PI/180)}" stroke="#c8607a" stroke-width="6" stroke-linecap="round"/><line x1="50" y1="50" x2="${50+34*Math.sin(ma*Math.PI/180)}" y2="${50-34*Math.cos(ma*Math.PI/180)}" stroke="#3d8fb0" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="50" r="4" fill="currentColor"/></svg>`}
const nh=h=>((h-1+12)%12)+1;
function tWords(h,m){if(m===0)return`${h} o'clock`;if(m===30)return`half past ${h}`;if(m===15)return`quarter past ${h}`;if(m===45)return`quarter to ${nh(h+1)}`;if(m<30)return`${m} past ${h}`;return`${60-m} to ${nh(h+1)}`}
const dig=(h,m)=>`${h}:${String(m).padStart(2,"0")}`;
function q_time(l){
  if(l===1){const i=rnd(0,5);const before=Math.random()<.4&&i>0;return before?{say:`What day comes before ${DAYS[i]}?`,q:`Before ${DAYS[i]} comes…`,stage:"",opts:txtOpts(DAYS[i-1],[DAYS[(i+2)%7],DAYS[(i+4)%7]]),ans:DAYS[i-1]}:{say:`What day comes after ${DAYS[i]}?`,q:`After ${DAYS[i]} comes…`,stage:"",opts:txtOpts(DAYS[i+1],[DAYS[(i+3)%7],DAYS[(i+5)%7]]),ans:DAYS[i+1]}}
  const h=rnd(1,12);
  if(l===2){return{say:"What time does the clock show?",q:"What time is it?",stage:clock(h,0),opts:shuffle([h,nh(h+1),nh(h+5)]).map(x=>({v:x,h:`${x} o'clock`,txt:1})),ans:h}}
  if(l===3){const a=`half past ${h}`;return{say:"What time does the clock show?",q:"What time is it?",stage:clock(h,30),opts:txtOpts(a,[`${h} o'clock`,`half past ${nh(h+1)}`]),ans:a}}
  if(l===4){const m=pick([0,30]);return{type:"setclock",th:h,tm:m,step:30,say:`Set the clock to ${tWords(h,m)}.`,q:`Set the clock to ${tWords(h,m)}`}}
  if(l===5){const m=pick([15,45]);const a=tWords(h,m);return{say:"What time does the clock show?",q:"What time is it?",stage:clock(h,m),opts:txtOpts(a,[tWords(h,m===15?45:15),tWords(nh(h+1),m)]),ans:a}}
  if(l===6){const m=pick([5,10,20,25,35,40,50,55]);const a=dig(h,m);return{say:"What time does the clock show? Count by fives on the big hand.",q:"What time is it?",stage:clock(h,m),opts:shuffle([a,dig(h,(m+30)%60||5),dig(nh(h+1),m)]).map(x=>({v:x,h:x})),ans:a}}
  if(l===7){const m=pick([5,10,15,20,25,35,40,45,50,55]);return{type:"setclock",th:h,tm:m,step:5,say:`Set the clock to ${tWords(h,m)}.`,q:`Set the clock to ${dig(h,m)}`}}
  const act=pick([["Swimming","🏊"],["The movie","🎬"],["Soccer","⚽"],["Baking","🧁"]]);const dur=pick([30,60,15,45]);const sm=pick([0,30]);const em=(sm+dur)%60,eh=nh(h+Math.floor((sm+dur)/60));const a=dig(eh,em);
  const durW=dur===60?"1 hour":`${dur} minutes`;
  return{say:`${act[0]} starts at ${tWords(h,sm)} and lasts ${durW}. What time does it finish?`,q:`${act[1]} starts ${dig(h,sm)}, lasts ${durW}. Finishes at?`,stage:clock(h,sm,140),opts:shuffle([a,dig(nh(eh+1),em),dig(h,(sm+15)%60===em?(sm+20)%60:(sm+15)%60)]).map(x=>({v:x,h:x})),ans:a}
}

const money=c=>c>=100?`$${(c/100).toFixed(c%100?2:0)}`:`${c}c`;
const coinH=c=>c>=500?`<span class="note n${c/100}">$${c/100}</span>`:`<span class="coin ${c>=100?"gold":"silver"} ${c===50||c===200?"big":""}">${money(c)}</span>`;
const sayMoney=c=>c>=100?(c%100?`${Math.floor(c/100)} dollars ${c%100}`:`${c/100} dollars`):`${c} cents`;
function q_money(l){
  if(l===1){const a=rnd(1,3),b=rnd(0,3);const t=a*2+b;return{say:"Gold coins! How many dollars altogether? Tap them to count.",q:"How much money?",stage:`<div class="group">${Array.from({length:a},()=>`<button class="tap" data-tap>${coinH(200)}</button>`).join("")}${Array.from({length:b},()=>`<button class="tap" data-tap>${coinH(100)}</button>`).join("")}</div>`,opts:numOpts(t*100,100,2000).map(o=>({v:o.v,h:money(o.v)})),ans:t*100}}
  if(l===2){const cs=Array.from({length:rnd(2,4)},()=>pick([10,20,50]));const t=cs.reduce((a,b)=>a+b,0);const o=shuffle([t,t+10,t>=20?t-10:t+20]);return{say:"How much money is this?",q:"How much money?",stage:`<div class="group">${cs.map(coinH).join("")}</div>`,opts:o.map(x=>({v:x,h:money(x)})),ans:t}}
  if(l===3){const t=rnd(3,9)*100;return{type:"build",say:`Make ${sayMoney(t)}. Tap the coins.`,q:`Make ${money(t)}`,target:t,parts:[[200,"",coinH(200)],[100,"",coinH(100)]],unit:"money"}}
  if(l===4){const t=rnd(4,19)*10;return{type:"build",say:`Make ${sayMoney(t)}. Tap the coins.`,q:`Make ${money(t)}`,target:t,parts:[[50,"",coinH(50)],[20,"",coinH(20)],[10,"",coinH(10)]],unit:"money"}}
  if(l===5){const have=pick([5,10]);const items=[["🧃","juice"],["🍦","ice cream"],["🧸","teddy"],["🪁","kite"],["⚽","ball"],["📕","book"]];const it=shuffle(items).slice(0,3);const pr=[rnd(1,have),have+rnd(1,6),have+rnd(2,9)];
    return{say:`You have ${have} dollars. Which one can you buy?`,q:`You have $${have}. What can you buy?`,stage:`<span class="note n${have}">$${have}</span>`,opts:shuffle(it.map(([e,n],i)=>({v:n,h:`<span style="line-height:1.1">${e}<br><small style="font-size:.5em">$${pr[i]}</small></span>`}))),ans:it[0][1],why:{q:"How do you know you can buy it?",a:`It costs less than $${have}`,o:["It's the cheapest looking","I like it best"]}}}
  if(l===6){const cost=rnd(2,9),paid=10;const a=(paid-cost)*100;return{say:`A toy costs ${cost} dollars. You pay with a 10 dollar note. How much change do you get?`,q:`Costs $${cost}. You pay $10. Change?`,stage:`<span class="pic">🧸</span><span class="note n10">$10</span>`,opts:numOpts(a/100,0,10).map(o=>({v:o.v*100,h:"$"+o.v})),ans:a}}
  const cs=[pick([500,1000,2000]),...Array.from({length:rnd(1,3)},()=>pick([200,100,50]))];const t=cs.reduce((a,b)=>a+b,0);
  return{say:"How much money altogether?",q:"How much altogether?",stage:`<div class="group" style="max-width:420px">${cs.map(coinH).join("")}</div>`,opts:shuffle([t,t+100,t-50]).map(x=>({v:x,h:money(x)})),ans:t}
}

const FRUIT=[["🍎","apples"],["🍌","bananas"],["🍓","berries"],["🍇","grapes"],["🍊","oranges"]];
function graph(cats){return`<div class="graph">${cats.map(([e,n,c])=>`<div><b>${n}</b>${e.repeat(c)}</div>`).join("")}</div>`}
function tally(n){let s="";for(let i=0;i<Math.floor(n/5);i++)s+='<svg viewBox="0 0 50 40" width="56" height="44"><g stroke="currentColor" stroke-width="4" stroke-linecap="round"><line x1="6" y1="4" x2="6" y2="36"/><line x1="16" y1="4" x2="16" y2="36"/><line x1="26" y1="4" x2="26" y2="36"/><line x1="36" y1="4" x2="36" y2="36"/><line x1="0" y1="32" x2="44" y2="8"/></g></svg>';
  const r=n%5;if(r)s+=`<svg viewBox="0 0 ${r*10+4} 40" width="${r*11+6}" height="44"><g stroke="currentColor" stroke-width="4" stroke-linecap="round">${Array.from({length:r},(_,i)=>`<line x1="${6+i*10}" y1="4" x2="${6+i*10}" y2="36"/>`).join("")}</g></svg>`;return`<div class="tally">${s}</div>`}
function spinner(red,n=4){let s="";for(let i=0;i<n;i++){const a0=i/n*2*Math.PI,a1=(i+1)/n*2*Math.PI;s+=`<path d="M50 50 L${50+45*Math.sin(a0)} ${50-45*Math.cos(a0)} A45 45 0 0 1 ${50+45*Math.sin(a1)} ${50-45*Math.cos(a1)}Z" fill="${i<red?"#c8607a":"#3d8fb0"}" stroke="#fff" stroke-width="2"/>`}
  return`<svg viewBox="0 0 100 100" style="width:170px"><g class="spin">${s}</g><polygon points="50,2 44,14 56,14" fill="currentColor"/><circle cx="50" cy="50" r="5" fill="#fff"/></svg>`}
function q_data(l){
  const cnt=shuffle([1,2,3,4,5,6,7,8]);const cats=shuffle(FRUIT).slice(0,3).map(([e,n],i)=>[e,n,cnt[i]]);
  if(l===1){const c=pick(cats);return{say:`The graph shows fruit we picked. How many ${c[1]}? Tap to count.`,q:`How many ${c[1]}?`,stage:`<div class="graph">${cats.map(([e,n,k])=>`<div><b>${n}</b>${Array.from({length:k},()=>`<button class="tap" data-tap style="min-width:44px;min-height:44px;font-size:1.8rem">${e}</button>`).join("")}</div>`).join("")}</div>`,opts:numOpts(c[2],1,9),ans:c[2]}}
  if(l===2){const most=Math.random()<.6;const c=[...cats].sort((a,b)=>most?b[2]-a[2]:a[2]-b[2])[0];return{say:`Which fruit did we pick the ${most?"most":"least"} of?`,q:`Which has the ${most?"most":"least"}?`,stage:graph(cats),opts:shuffle(cats.map(([e,n])=>({v:n,h:e}))),ans:c[1]}}
  if(l===3){const[a,b]=[...cats].sort((x,y)=>y[2]-x[2]);const d=a[2]-b[2];return{say:`How many more ${a[1]} than ${b[1]}?`,q:`How many more ${a[0]} than ${b[0]}?`,stage:graph(cats),opts:numOpts(d,0,9),ans:d}}
  if(l===4){const red=pick([0,1,3,4]);const ans={0:"impossible",1:"unlikely",3:"likely",4:"certain"}[red];return{type:"opts",spin:true,say:"Will the spinner land on pink? Is it certain, likely, unlikely, or impossible? Tap the spinner to spin it!",q:"Landing on pink is…",stage:`<button class="spinbtn" aria-label="Spin">${spinner(red)}</button>`,opts:["certain","likely","unlikely","impossible"].map(x=>({v:x,h:x,txt:1})),ans}}
  const n=rnd(3,18);return{say:"Tally marks! Each bundle is five. How many?",q:"How many tally marks?",stage:tally(n),opts:numOpts(n,1,25),ans:n}
}

const FEEL=[["Your friend gave you their last biscuit.","happy"],["Your tower fell down after you worked hard on it.","frustrated"],["It's dark and you heard a loud bang.","scared"],["Your best friend moved away.","sad"],["Someone took your toy without asking.","angry"],["Tomorrow is your birthday!","excited"],["Everyone is talking loudly at once.","overwhelmed"],["You finished a hard puzzle by yourself.","proud"],["You're lying in a warm bath.","calm"],["You have to go somewhere new.","nervous"]];
const FACES={happy:"😊",sad:"😢",angry:"😠",scared:"😨",excited:"🤩",frustrated:"😤",overwhelmed:"😵‍💫",proud:"🥹",calm:"😌",nervous:"😬",surprised:"😮",tired:"🥱"};
const COPE=[["angry","Take 5 big slow breaths",["Throw something","Yell at someone"]],["overwhelmed","Go somewhere quiet or put on headphones",["Keep going and ignore it","Run around the room"]],["sad","Tell someone you trust how you feel",["Hide it and say nothing","Break your toy"]],["frustrated","Take a break, then try again",["Give up forever","Rip it up"]],["nervous","Ask a grown-up what will happen",["Pretend you're sick","Run away"]],["scared","Find a grown-up and hold their hand",["Scream and hide alone","Keep it a secret"]]];
const OTHERS=[["Your friend is crying.","Ask if they are okay",["Laugh at them","Walk away"]],["A new kid has no one to play with.","Ask them to join in",["Ignore them","Tell them to go away"]],["Your friend's sandcastle got knocked over.","Help them build it again",["Say it was bad anyway","Knock over more"]],["Your brother or sister is scared of the storm.","Sit with them",["Make scary noises","Tell them they're silly"]]];
function q_feel(l){
  if(l===1){const[s,f]=pick(FEEL);const o=shuffle([f,...shuffle(Object.keys(FACES).filter(x=>x!==f)).slice(0,2)]);
    return{say:`${s} How might you feel?`,q:"How might you feel?",stage:`<span class="passage">${s}</span>`,opts:o.map(x=>({v:x,h:`<span style="line-height:1.1">${FACES[x]}<br><small style="font-size:.45em">${x}</small></span>`})),ans:f,anyOk:f==="nervous"||f==="overwhelmed"}}
  if(l===2){const f=pick(Object.keys(FACES));const o=shuffle([f,...shuffle(Object.keys(FACES).filter(x=>x!==f)).slice(0,2)]);
    return{say:"Look at the face. How is this person feeling?",q:"How are they feeling?",stage:`<span class="pic" style="font-size:2.5em">${FACES[f]}</span>`,opts:o.map(x=>({v:x,h:x,txt:1})),ans:f}}
  if(l===3){const[f,a,d]=pick(COPE);return{say:`When you feel ${f}, what could help?`,q:`Feeling ${f} ${FACES[f]}. What could help?`,stage:"",opts:txtOpts(a,d),ans:a,kind:"cope"}}
  const[s,a,d]=pick(OTHERS);return{say:`${s} What could you do?`,q:"What could you do?",stage:`<span class="passage">${s}</span>`,opts:txtOpts(a,d),ans:a,kind:"cope"}
}

const ODD=[
 [["🍎","🍌","🍇","🚗"],"🚗","It's not a fruit",["It's the biggest","It has wheels so it's fast"]],
 [["🐶","🐱","🐟","🐮"],"🐟","It lives in water",["It's the smallest","It's orange"]],
 [["✏️","🖍️","🖊️","🍕"],"🍕","You can't draw with it",["It's round","It's yummy"]],
 [["🚗","🚌","✈️","🚲"],"✈️","It flies in the sky",["It's the fastest","It's white"]],
 [["2","4","7","8"],"7","It's odd, the others are even",["It's the biggest","It's a lucky number"]],
 [["🔺","🟥","🔵","🟪"],"🔵","It has no corners",["It's blue","It's the smallest"]],
 [["☀️","🌧️","❄️","🍔"],"🍔","It's not weather",["It's brown","You can hold it"]],
 [["10","20","35","40"],"35","It doesn't end in 0",["It's the biggest","It has a 3"]],
 [["🐝","🦋","🐞","🐘"],"🐘","It's not a bug",["It's grey","It's the loudest"]],
 [["🥕","🥦","🌽","🍦"],"🍦","It's not a vegetable",["It's cold","It's white"]]];
const SEQ=[
 [["🥚","egg"],["🐣","chick"],["🐔","hen"]],
 [["🌰","seed"],["🌱","sprout"],["🌳","tree"]],
 [["🧊","ice"],["💧","water"],["☁️","steam"]],
 [["🥣","mix"],["🔥","bake"],["🎂","eat"]],
 [["🛏️","wake up"],["🪥","brush teeth"],["🎒","pack bag"],["🏫","school"]],
 [["🧦","socks"],["👟","shoes"],["🚪","go outside"]],
 [["🌑","night"],["🌅","sunrise"],["☀️","day"],["🌇","sunset"]],
 [["🐛","caterpillar"],["🫘","cocoon"],["🦋","butterfly"]]];
const INFER=[
 {c:"Sam has an umbrella and wet boots.",q:"What is the weather like?",a:"Rainy",o:["Sunny","Snowy"],w:"The umbrella and wet boots",wo:["Sam likes boots","It is Monday"]},
 {c:"Lily is yawning and rubbing her eyes.",q:"How does Lily feel?",a:"Tired",o:["Excited","Angry"],w:"She is yawning and rubbing her eyes",wo:["She has eyes","She is a girl"]},
 {c:"There are candles, balloons and a big cake.",q:"What is happening?",a:"A birthday party",o:["A swimming lesson","A storm"],w:"Cakes and balloons are for parties",wo:["Candles are hot","Balloons are round"]},
 {c:"Jack's plate is empty and he is smiling.",q:"Did Jack like his dinner?",a:"Yes",o:["No","He didn't eat"],w:"He ate it all and he's smiling",wo:["Plates are round","He is at home"]},
 {c:"The dog is wagging its tail and jumping up.",q:"How does the dog feel?",a:"Happy",o:["Scared","Sleepy"],w:"Dogs wag their tails when they're happy",wo:["Dogs have tails","It is a dog"]},
 {c:"Everyone is wearing coats, beanies and gloves.",q:"What is the weather like?",a:"Cold",o:["Hot","Sunny"],w:"People wear coats when it's cold",wo:["Beanies are soft","Gloves have fingers"]},
 {c:"The milk smells funny and is lumpy.",q:"What has happened to the milk?",a:"It has gone off",o:["It is fresh","It is chocolate"],w:"Funny smells and lumps mean it's old",wo:["Milk is white","Milk comes from cows"]}];
const PRED=[
 {c:"Mia leaves her ice cream in the hot sun.",a:"It will melt",o:["It will grow","It will freeze"],w:"The sun is hot and ice cream melts",wo:["Ice cream is yummy","Mia likes the sun"]},
 {c:"The block tower is very tall and wobbly.",a:"It might fall over",o:["It will turn into a tree","It will get smaller"],w:"Tall wobbly towers aren't steady",wo:["Blocks are colourful","Towers are fun"]},
 {c:"Dark grey clouds are filling the sky.",a:"It will rain",o:["It will rain lollies","It will get sunnier"],w:"Dark clouds usually bring rain",wo:["Clouds are fluffy","The sky is big"]},
 {c:"Tom forgot to water his plant for two weeks.",a:"The plant will droop",o:["It will grow faster","It will flower"],w:"Plants need water to live",wo:["Plants are green","Tom is busy"]},
 {c:"Zoe drops a glass on the hard floor.",a:"It might break",o:["It will bounce like a ball","It will turn into water"],w:"Glass is fragile and floors are hard",wo:["Glass is see-through","Zoe is clumsy"]},
 {c:"Leo hasn't eaten anything since breakfast and it's dinnertime.",a:"He will be very hungry",o:["He will be full","He will fall asleep at once"],w:"He hasn't eaten for a long time",wo:["Dinner is at night","Leo likes food"]}];
const FACTOP=[["Dogs have four legs.","fact"],["Dogs are the best pets.","opinion"],["Melbourne is in Australia.","fact"],["Pizza is the yummiest food.","opinion"],["Ice is cold.","fact"],["Maths is boring.","opinion"],["A week has seven days.","fact"],["Blue is the prettiest colour.","opinion"],["Koalas eat gum leaves.","fact"],["Winter is the worst season.","opinion"]];
const INFPASS=[
 {t:"Ava looked out the window and frowned. She put on her raincoat instead of her sunhat.",q:"What was the weather like?",a:"Rainy",o:["Hot and sunny","Snowy"],w:"She chose a raincoat",wo:["She looked out the window","She has a sunhat"]},
 {t:"Noah's tummy rumbled loudly. He kept looking at the clock. Lunch was in ten minutes.",q:"How was Noah feeling?",a:"Hungry",o:["Sleepy","Scared"],w:"His tummy rumbled",wo:["There is a clock","His name is Noah"]},
 {t:"Grace practised her song every day for a month. At the concert she sang without one mistake.",q:"Why did Grace sing so well?",a:"She practised a lot",o:["She was lucky","The song was short"],w:"Every day for a month",wo:["At the concert","She has a song"]},
 {t:"Ruby hugged her old teddy and wouldn't let go. Her family was moving to a new house tomorrow.",q:"How might Ruby feel about moving?",a:"Worried",o:["Bored","Angry at her teddy"],w:"She was holding her teddy tight",wo:["The teddy is old","Houses have doors"]},
 {t:"Oscar tiptoed past his baby sister's room and shut the door very slowly.",q:"Why did Oscar tiptoe?",a:"So he didn't wake the baby",o:["His feet were sore","He was playing a game"],w:"He passed the baby's room quietly",wo:["Doors can shut","He has a sister"]}];
const MISTAKE=[
 {c:"Tom says 6 + 6 = 66.",a:"No, it's 12",o:["Yes, he's right","No, it's 10"],w:"He put the digits together instead of adding",wo:["6 is a big number","He was too slow"]},
 {c:"Lily says a square has 3 sides.",a:"No, it has 4",o:["Yes, she's right","No, it has 5"],w:"A square has 4 equal sides and 4 corners",wo:["Squares are blue","Triangles are pointy"]},
 {c:"Max says ½ is smaller than ¼ because 2 is smaller than 4.",a:"No, ½ is bigger",o:["Yes, he's right","They are the same"],w:"Fewer pieces means each piece is bigger",wo:["2 is an even number","Pizza is round"]},
 {c:"Ella says 40 is an odd number.",a:"No, it's even",o:["Yes, she's right","It's neither"],w:"It ends in 0, so it makes pairs with none left",wo:["40 is big","4 is a nice number"]},
 {c:"Ben says 3 × 4 is 7.",a:"No, it's 12",o:["Yes, he's right","No, it's 34"],w:"He added instead of multiplying",wo:["He forgot the 4","7 is a lucky number"]},
 {c:"Jess says Monday comes after Tuesday.",a:"No, it comes before",o:["Yes, she's right","They're the same day"],w:"The week goes Monday, then Tuesday",wo:["Mondays are boring","Tuesday starts with T"]}];
const NAMES=["Zoe","Max","Ben","Ava","Leo","Mia","Sam","Kai"];
function q_think(l){
  if(l===1){const[items,odd,w,wo]=pick(ODD);return{say:"Which one doesn't belong? Look carefully!",q:"Which one doesn't belong?",stage:"",opts:shuffle(items).map(x=>({v:x,h:x})),ans:odd,why:{q:"Why doesn't it belong?",a:w,o:wo}}}
  if(l===2){const s=pick(SEQ);return{type:"order",seq:s.map(x=>x[1]),items:shuffle(s),say:"Put these in the right order. What happens first? Tap them in order.",q:"What happens first, next, last?"}}
  if(l===3){const p=pick(INFER);return{say:`${p.c} ${p.q}`,q:p.q,stage:`<span class="passage">${p.c}</span>`,opts:txtOpts(p.a,p.o),ans:p.a,why:{q:"How do you know?",a:p.w,o:p.wo}}}
  if(l===4){const p=pick(PRED);return{say:`${p.c} What will probably happen next?`,q:"What will happen next?",stage:`<span class="passage">${p.c}</span>`,opts:txtOpts(p.a,p.o),ans:p.a,why:{q:"Why do you think so?",a:p.w,o:p.wo}}}
  if(l===5){const[a,b,c]=shuffle(NAMES).slice(0,3);const kind=pick([["taller","tallest","shortest"],["faster","fastest","slowest"],["older","oldest","youngest"]]);const askTop=Math.random()<.5;const mid=Math.random()<.25;
    const ans=mid?b:askTop?a:c;const qq=mid?"Who is in the middle?":`Who is the ${askTop?kind[1]:kind[2]}?`;const st=`${a} is ${kind[0]} than ${b}. ${b} is ${kind[0]} than ${c}.`;
    return{say:`${st} ${qq}`,q:qq,stage:`<span class="passage">${st}</span>`,opts:txtOpts(ans,[a,b,c].filter(x=>x!==ans)),ans,why:mid?null:{q:"How did you work it out?",a:askTop?`${a} is ${kind[0]} than ${b}, and ${b} is ${kind[0]} than ${c}`:`${c} is the only one nobody beats`,o:askTop?[`${a}'s name comes first`,"I guessed"]:[`${c}'s name is last`,"I guessed"]}}}
  if(l===6){const[s,a]=pick(FACTOP);return{say:`${s} Is that a fact or an opinion?`,q:"Fact or opinion?",stage:`<span class="passage">${s}</span>`,opts:[{v:"fact",h:"Fact",txt:1},{v:"opinion",h:"Opinion",txt:1}],ans:a,why:a==="fact"?{q:"How do you know it's a fact?",a:"You can check that it's true",o:["Lots of people like it","It sounds nice"]}:{q:"How do you know it's an opinion?",a:"It's what someone thinks or feels",o:["You can measure it","It's in a book"]}}}
  if(l===7){const p=pick(INFPASS);return{say:`Listen. ${p.t} ${p.q}`,q:p.q,stage:`<div class="passage">${p.t}</div>`,opts:txtOpts(p.a,p.o),ans:p.a,why:{q:"Which clue helped you?",a:p.w,o:p.wo}}}
  const p=pick(MISTAKE);return{say:`${p.c} Is that right?`,q:"Is that right?",stage:`<span class="passage">${p.c}</span>`,opts:txtOpts(p.a,p.o),ans:p.a,why:{q:"What went wrong?",a:p.w,o:p.wo}}
}

const CURR={
 words:[["Letter names","Phonics, letter–sound knowledge (F)","Noticing"],["First sounds","Phonological awareness (F–1)","Listening closely"],["Read a word, match a picture","Decoding CVC words (F–1)","Checking"],["Pick the right spelling","Phonic knowledge, look-alike words (1)","Comparing"],["Missing word","Reading for meaning, AC9E1LY05","Using context"],["Same-meaning words","Synonyms, AC9E4LA11","Comparing meanings"]],
 read:[["Opposites","Antonyms, AC9E4LA11","Comparing meanings"],["Homophones","AC9E4LY11 homophones in context","Using context"],["Prefixes","AC9E4LY09 prefixes","Breaking words into parts"],["Tense","AC9E4LA09 past, present, future","Reasoning about time"],["Capitals and full stops","AC9E4LA12 punctuation","Checking and correcting"],["Short story questions","AC9E2LY05 / AC9E3LY05 comprehension","Recalling detail"]],
 think:[["Odd one out + why","AC9MFA01 sorting, Critical & Creative Thinking: Analysing","Classifying and justifying"],["Put events in order","AC9MFM02 sequence; AC9E1LY05","Sequencing cause and effect"],["Read the clues + how do you know","AC9E2LY05 inferring","Inference with evidence"],["Predict what happens + why","AC9E3LY05 predicting","Prediction with reasons"],["Logic: tallest, fastest, middle","Maths reasoning proficiency","Deductive reasoning"],["Fact or opinion + why","AC9E4LY05 evaluating texts","Evaluating claims"],["Story inference + which clue","AC9E4LY05 inferred meaning","Finding evidence in text"],["Spot the mistake + what went wrong","Maths reasoning proficiency","Checking someone else's thinking"]],
 nums:[["Tap to count to 5","AC9MFN02 subitise","Counting one-to-one"],["Count to 10","AC9MFN01","Counting one-to-one"],["Add with objects","AC9MFN05, AC9M1N04","Joining groups"],["Take away with objects","AC9M1N04","Separating groups"],["Add to 21","AC9M2A02 facts to 20","Mental strategies"],["2-digit add and subtract","AC9M2N04","Mental strategies"]],
 pv:[["Tens and ones","AC9M1N02 partition tens and ones","Seeing structure"],["Build a number","AC9M1N02","Making and checking"],["Hundreds, tens, ones","AC9M2N01, AC9M2N02","Seeing structure"],["Bigger or smaller + why","AC9M2N01 order numbers","Comparing by place value"],["Odd or even + why","AC9M4N02","Explaining with pairs"],["Build a 3-digit number","AC9M2N02 regrouping","Making and checking"],["Rounding to 10","AC9M4N07","Estimating"]],
 times:[["Skip count 2s, 5s, 10s","AC9M1A01","Spotting patterns"],["Arrays of 2s, 5s, 10s","AC9M1N06, AC9M2N05","Seeing groups"],["2s, 5s, 10s facts","AC9M2A03","Recall"],["Arrays of 3s, 4s","AC9M3A03","Seeing groups"],["3s, 4s, 5s, 10s facts","AC9M3A03","Recall"],["Facts to 10 × 10","AC9M4A02","Recall"],["Missing factor","AC9M4A01 unknowns","Working backwards"]],
 frac:[["Colour one half","AC9M2N03","Equal parts"],["Colour quarters","AC9M2N03","Equal parts"],["Name the fraction","AC9M2N03","Matching symbol to amount"],["Thirds, sixths, eighths","AC9M3N02 unit fractions","Equal parts"],["Half or quarter of a group","AC9M2N03","Sharing equally"],["Same amount + why","AC9M4N03 equivalent fractions","Comparing amounts"]],
 shapes:[["Name shapes","AC9MFSP01","Noticing features"],["AB patterns","AC9MFA01","Spotting patterns"],["ABC patterns","AC9M1A02","Spotting patterns"],["Count sides","AC9M2SP01","Noticing features"],["Pick the shape by name","AC9M2SP01 classify","Classifying"],["Mirror symmetry","AC9M4SP03","Spatial reasoning"]],
 time:[["Days of the week","AC9MFM02","Sequencing"],["O'clock","AC9M1M03, AC9M2M04","Reading tools"],["Half past","AC9M2M04","Reading tools"],["Set the clock (o'clock, half)","AC9M2M04","Making and checking"],["Quarter past/to","AC9M2M04 quarter hour","Reading tools"],["5-minute times","AC9M3M04","Reading tools"],["Set the clock to 5 minutes","AC9M3M04","Making and checking"],["How long, finish time","AC9M4M03 duration","Planning ahead"]],
 money:[["Count $1 and $2","AC9M1N05","Counting by value"],["Count cents","AC9M3M06","Counting by value"],["Make a dollar amount","AC9M3M06","Making and checking"],["Make a cents amount","AC9M3M06","Making and checking"],["Can you afford it? + why","AC9M4N08 financial","Comparing costs"],["Change from $10","AC9M3N06, AC9M4N08","Working backwards"],["Notes and coins","AC9M3M06","Counting by value"]],
 data:[["Read a picture graph","AC9M1ST02","Reading data"],["Most and least","AC9M2ST02","Comparing data"],["How many more","AC9M3ST02","Comparing data"],["Chance: certain to impossible","AC9M3P01","Predicting likelihood"],["Tally marks","AC9M3ST01","Recording data"]],
 feel:[["How might you feel?","HPE Personal and social, F–2","Perspective taking"],["Read a face","HPE Personal and social, F–2","Reading social cues"],["What could help? (coping)","HPE Personal and social, 3–4","Choosing strategies"],["Helping others","HPE Personal and social, 3–4","Empathy and problem solving"]]};

const SKINS=[
 {id:"island",name:"Sunny Island",rule:"Starter skin",deco:"☁️☁️🌤️",hat:"",vars:{}},
 {id:"sea",name:"Under the Sea",need:1,deco:"🐠🫧🐙🐚🫧",hat:"🤿",vars:{bg:"#7fc8e0",bg2:"#d4f0f6",sea:"#1f6f9a",sky:"#cdeaf3"}},
 {id:"jungle",name:"Jungle",need:3,deco:"🌴🦜🍃🐒🌺",hat:"🌺",vars:{bg:"#a8d8a0",bg2:"#e8f5dd",sea:"#2f7d4a",sky:"#dcefd0",line:"#c6dfb8"}},
 {id:"candy",name:"Candy Land",need:6,deco:"🍭🍬🧁🍩🍓",hat:"🎀",vars:{bg:"#f7c6dc",bg2:"#fdeef4",sea:"#c4568a",sky:"#fbe0ec",line:"#f1cfe0"}},
 {id:"arctic",name:"Arctic",need:10,deco:"❄️🐧⛄❄️🐻‍❄️",hat:"🧣",vars:{bg:"#d3eaf6",bg2:"#f4fbff",sea:"#4f94bf",sky:"#e3f2fa",line:"#d3e4ee"}},
 {id:"space",name:"Outer Space",need:15,deco:"⭐🪐🌙☄️✨",hat:"🛸",vars:{bg:"#141a3d",bg2:"#262d60",panel:"#1f2652",ink:"#eef1ff",soft:"#aab3e6",sea:"#8a7cf0",sky:"#2e3675",line:"#3b4382",good:"#5cc183"}},
 {id:"volcano",name:"Volcano Night",need:22,deco:"🌋🔥✨🔥",hat:"🔥",vars:{bg:"#2a1414",bg2:"#3d1d1a",panel:"#331a18",ink:"#fff0e8",soft:"#e5b9a8",sea:"#e2603a",sky:"#4a2420",line:"#5a2c26",good:"#5cc183"}},
 {id:"dino",name:"Dino Valley",special:"master",rule:"Reach the top level of any island",deco:"🦖🦕🥚🌿",hat:"🦴",vars:{bg:"#c9d98f",bg2:"#eef3d6",sea:"#6b8a2e",sky:"#e4ecc4",line:"#d4dfb0"}},
 {id:"thinker",name:"Thinking Cap",special:"think",rule:"Explain your thinking 10 times",deco:"💡🧠🔍❓💡",hat:"🎓",vars:{bg:"#c9c3ef",bg2:"#efedfb",sea:"#5b4fc4",sky:"#e2def8",line:"#d6d1f2"}}];

const GEN={think:q_think,words:q_words,read:q_read,nums:q_nums,pv:q_pv,times:q_times,frac:q_frac,shapes:q_shapes,time:q_time,money:q_money,data:q_data,feel:q_feel};

