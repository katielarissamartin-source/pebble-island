;
/* core.js */
const $=s=>document.querySelector(s);
{const st=document.createElement("style");st.textContent=`.skins{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px}
.skin{border-radius:28px;padding:18px;min-height:150px;display:flex;flex-direction:column;gap:6px;align-items:flex-start;text-align:left;border:4px solid transparent;box-shadow:0 6px 0 rgba(0,0,0,.15)}
.skin.on{border-color:var(--good)}.skin.locked{filter:grayscale(.85);opacity:.6}
.skin b{font-family:var(--display);font-size:1.2rem}.skin small{font-size:.95rem;opacity:.85}
.sk-deco{font-size:2.2rem;letter-spacing:.1em}
.unlock{display:grid;gap:10px;justify-items:center;background:var(--bg2);border-radius:24px;padding:16px;width:min(100%,420px)}
.slot.ord{width:120px;height:120px;flex-direction:column;font-size:2.4rem;display:flex;align-items:center;justify-content:center}
.slot.ord small{font-size:.9rem;color:var(--soft)}
.tile.ord{width:120px;height:120px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:2.6rem}
.tile.ord small{font-size:.85rem;font-weight:700}
.currsec{display:grid;gap:10px}.currwrap{overflow-x:auto;background:var(--panel);border:2px solid var(--line);border-radius:18px}
.curr{border-collapse:collapse;width:100%;min-width:640px;font-size:.95rem;user-select:text}
.curr th,.curr td{text-align:left;padding:9px 12px;border-bottom:1px solid var(--line);vertical-align:top}
.curr th{font-family:var(--display);font-size:.8rem;letter-spacing:.05em;text-transform:uppercase;color:var(--soft)}
`;document.head.appendChild(st)}
const $$=s=>document.querySelectorAll(s);
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));

const DEFAULT={kids:[{name:"Ivy",face:"🦊",age:7,pace:"steady"},{name:"Hayden",face:"🐢",age:10,pace:"fast"}],settings:{voice:true,sfx:true,calm:false},progress:{},stickers:{}};
let S;try{S=JSON.parse(localStorage.getItem("pebble"))||structuredClone(DEFAULT)}catch(e){S=structuredClone(DEFAULT)}
if(S.kids[0].name==="Little one")S.kids[0].name="Ivy";
if(S.kids[1].name==="Big one")S.kids[1].name="Hayden";
S.kids.forEach(k=>{if(!k.pace)k.pace=k.age>=9?"fast":"steady"});
if(S.settings.sfx===undefined)S.settings.sfx=true;
if(!S.stickers)S.stickers={};if(!S.skins)S.skins={};if(!S.think)S.think={};
const save=()=>{try{localStorage.setItem("pebble",JSON.stringify(S))}catch(e){}};
let kid=null;

const WORLDS=[
 {id:"words",name:"Sound Cove",ico:"🔤",bg:"#3a7f9e",sub:"Letters, sounds, spelling",max:6},
 {id:"read",name:"Story Lagoon",ico:"📖",bg:"#2f6d94",sub:"Opposites, word parts, reading",max:6},
 {id:"think",name:"Thinking Lighthouse",ico:"🗼",bg:"#4a5a8c",sub:"Clues, logic, how do you know?",max:8},
 {id:"nums",name:"Number Forest",ico:"🌳",bg:"#3f8a5f",sub:"Counting, adding, groups",max:6},
 {id:"pv",name:"Bundle Bay",ico:"🪵",bg:"#9a6a2c",sub:"Tens, hundreds, odd and even",max:7},
 {id:"times",name:"Times Treehouse",ico:"🐒",bg:"#2e7f7b",sub:"Skip counting, times tables",max:7},
 {id:"frac",name:"Pizza Bakery",ico:"🍕",bg:"#c0566f",sub:"Halves, quarters, fractions",max:6},
 {id:"shapes",name:"Pattern Cliffs",ico:"🔷",bg:"#a4567a",sub:"Shapes, patterns, symmetry",max:6},
 {id:"time",name:"Clock Tower",ico:"🕰️",bg:"#5a63a8",sub:"Days, clocks, how long",max:8},
 {id:"money",name:"Market Stall",ico:"🛒",bg:"#3e8f75",sub:"Coins, notes, change",max:7},
 {id:"data",name:"Graph Garden",ico:"📊",bg:"#6b8a2e",sub:"Graphs, tallies, chance",max:5},
 {id:"feel",name:"Feelings Hut",ico:"💛",bg:"#b97f1f",sub:"Feelings and what to do",max:4},
 {id:"mix",name:"Surprise Volcano",ico:"🌋",cls:"mix",sub:"A bit of everything!",max:0}
];
function prog(w){const k=S.progress[kid]||(S.progress[kid]={});
  if(!k[w]){const age=S.kids[kid].age;k[w]={lvl:age>=9?2:1,streak:0,miss:0,stars:0}}return k[w]}
const stars=()=>Object.values(S.progress[kid]||{}).reduce((t,p)=>t+(p.stars||0),0);

let VOICE=null;
function chooseVoice(){if(!window.speechSynthesis)return;const vs=speechSynthesis.getVoices().filter(v=>/^en/i.test(v.lang));if(!vs.length)return;
  const pref=[/karen/i,/catherine/i,/google uk english female/i,/serena/i,/samantha/i,/moira/i,/natural/i,/female/i];
  const score=v=>{let s=0;if(/en[-_]AU/i.test(v.lang))s+=6;else if(/en[-_](GB|IE|NZ)/i.test(v.lang))s+=4;else if(/en[-_]US/i.test(v.lang))s+=2;
    pref.forEach((r,i)=>{if(r.test(v.name))s+=10-i});if(/enhanced|premium|neural/i.test(v.name))s+=5;if(/compact|novelty|whisper|bad|bells|zarvox|trinoids/i.test(v.name))s-=20;return s};
  VOICE=vs.sort((a,b)=>score(b)-score(a))[0]}
if(window.speechSynthesis){chooseVoice();speechSynthesis.onvoiceschanged=chooseVoice}
const NAME=()=>kid===null?"":S.kids[kid].name;
const PRAISE=()=>pick(["Woohoo! You got it!",`Yes, ${NAME()}! Superstar!`,"Boom! Nailed it!","High five!","Look at you go!","Amazing work!",`Brilliant, ${NAME()}!`,"You're on fire!","Ka-pow! Correct!","That's it! Awesome!"]);
const NUDGE=()=>pick(["Ooh, so close! Have another go.","Nearly! You've got this.","Good try! Let's pick another one.","Hmm, not that one. Try again, you're doing great!","Oops! That's okay, try another."]);
const OPENER=()=>pick(["Ooh, here's a fun one! ","Ready? ","Okay detective! ","Let's see... ","Here we go! ","",""]);
function speak(t,mood){if(!S.settings.voice||!window.speechSynthesis)return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);
  if(VOICE){u.voice=VOICE;u.lang=VOICE.lang}else u.lang="en-AU";
  u.rate=mood==="happy"?1.12:mood==="soft"?1.0:1.06;u.pitch=mood==="happy"?1.45:mood==="soft"?1.2:1.3;
  const b=$("#say");if(b){b.classList.add("talking");u.onend=u.onerror=()=>b.classList.remove("talking")}
  speechSynthesis.speak(u)}catch(e){}}

let AC=null;
function tone(notes){if(!S.settings.sfx)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const t0=AC.currentTime;
  notes.forEach(([f,d,at,type])=>{const o=AC.createOscillator(),g=AC.createGain();o.type=type||"sine";o.frequency.value=f;
    g.gain.setValueAtTime(0,t0+at);g.gain.linearRampToValueAtTime(.18,t0+at+.02);g.gain.exponentialRampToValueAtTime(.001,t0+at+d);
    o.connect(g).connect(AC.destination);o.start(t0+at);o.stop(t0+at+d+.05)})}catch(e){}}
const SFX={
  tap:()=>tone([[660,.12,0,"triangle"]]),
  good:()=>tone([[523,.18,0],[659,.18,.09],[784,.3,.18]]),
  oops:()=>tone([[300,.2,0,"triangle"],[260,.25,.12,"triangle"]]),
  count:n=>tone([[392*Math.pow(1.06,n%24),.15,0,"triangle"]]),
  pop:()=>tone([[900+Math.random()*500,.08,0,"square"]]),
  win:()=>tone([[523,.15,0],[659,.15,.12],[784,.15,.24],[1047,.45,.36]])
};
const buzz=ms=>{try{navigator.vibrate&&navigator.vibrate(ms)}catch(e){}};

const fx=$("#fx"),ctx=fx.getContext("2d");let parts=[];let raf=0;
function sizeFx(){fx.width=innerWidth*devicePixelRatio;fx.height=innerHeight*devicePixelRatio}
addEventListener("resize",sizeFx);sizeFx();
const still=()=>S.settings.calm||matchMedia("(prefers-reduced-motion:reduce)").matches;
function confetti(x,y,n=70){if(still())return;
  const cols=["#f2b544","#c8607a","#3d8fb0","#4f9a6e","#7a6fc2","#ffffff"];const d=devicePixelRatio;
  for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,s=4+Math.random()*9;
    parts.push({x:x*d,y:y*d,vx:Math.cos(a)*s*d,vy:(Math.sin(a)*s-7)*d,r:(4+Math.random()*6)*d,c:pick(cols),rot:Math.random()*6,vr:(Math.random()-.5)*.4,life:90+Math.random()*40,shape:Math.random()<.3?"star":"rect"})}
  if(!raf)loop()}
function loop(){ctx.clearRect(0,0,fx.width,fx.height);parts=parts.filter(p=>p.life-->0);
  parts.forEach(p=>{p.vy+=.35*devicePixelRatio;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.rot+=p.vr;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.globalAlpha=Math.min(1,p.life/30);ctx.fillStyle=p.c;
    if(p.shape==="star"){ctx.beginPath();for(let i=0;i<10;i++){const r=i%2?p.r*.45:p.r;ctx.lineTo(Math.cos(i*Math.PI/5)*r,Math.sin(i*Math.PI/5)*r)}ctx.fill()}else ctx.fillRect(-p.r/2,-p.r/3,p.r,p.r*.66);ctx.restore()});
  raf=parts.length?requestAnimationFrame(loop):(ctx.clearRect(0,0,fx.width,fx.height),0)}

let bubT;
function pip(mood,text){const m=$("#mascot");m.classList.remove("happy","oops");void m.offsetWidth;if(mood)m.classList.add(mood);
  $("#mouth").setAttribute("d",mood==="oops"?"M52 82 Q62 76 72 82":"M50 78 Q62 88 74 78");
  if(text){const b=$("#bubble");b.textContent=text;b.classList.add("show");clearTimeout(bubT);bubT=setTimeout(()=>b.classList.remove("show"),2200)}}
$("#mascot").onclick=()=>{SFX.tap();const t=pick(["Hi! I'm Pip!","You're doing great!","Boop! That tickles!","Let's learn together!","I love rocks. I am a rock!","Wheee!"]);pip("happy",t);speak(t,"happy")};

const SPEAK_ICON='<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>';

function numOpts(a,lo=0,hi=9999){const s=new Set([a]);let g=0;while(s.size<3&&g++<60){const n=a+rnd(-3,3);if(n>=lo&&n<=hi)s.add(n)}let k=1;while(s.size<3)s.add(a+10*k++);return shuffle([...s]).map(x=>({v:x,h:x}))}
const txtOpts=(a,others)=>shuffle([a,...others]).map(x=>({v:x,h:x,txt:1}));


;
/* content.js */
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


;
/* ui.js */
const STICKERS=["🦄","🐙","🦖","🚀","🌈","🐳","🦋","🍩","🎸","🏆","🐧","🦕","🍉","⚡","🐝","🎨","🦒","🛸","🐲","🍕","🦜","🌟","🐬","🚒","🎈","🦩","🐯","🧁","🏝️","🎢"];
function awardSticker(){const own=S.stickers[kid]||(S.stickers[kid]=[]);const left=STICKERS.filter(s=>!own.includes(s));const s=left.length?pick(left):pick(STICKERS);if(!own.includes(s))own.push(s);save();return s}

const ROUND=5;let round=null;let combo=0;

function render(){
  document.body.classList.toggle("calm",S.settings.calm);
  if(kid===null)return home();
  if(round)return play();
  map();
}
function home(){
  round=null;applySkin("island");
  $("#app").innerHTML=`<div class="top"><h1>Pebble Island</h1><button class="pill" id="pc">Grown-ups</button></div>
  <p class="lede" style="font-size:1.3rem">Who's exploring today?</p>
  <div class="who">${S.kids.map((k,i)=>`<button class="kid" data-k="${i}"><span class="face">${k.face}</span><b>${k.name}</b><span>${(S.stickers[i]||[]).length} stickers · Tap to start</span></button>`).join("")}</div>`;
  $$("[data-k]").forEach(b=>b.onclick=()=>{SFX.good();kid=+b.dataset.k;checkSkins();newSkins=[];applySkin(skinState().on);const r=b.getBoundingClientRect();confetti(r.left+r.width/2,r.top+r.height/2,40);const t=`Hi ${S.kids[kid].name}! Yay, you're here! Where shall we explore today?`;pip("happy",`Hi ${S.kids[kid].name}!`);speak(t,"happy");render()});
  $("#pc").onclick=()=>{SFX.tap();parent()};
}
function map(){
  const k=S.kids[kid];
  $("#app").innerHTML=`<div class="top"><button class="pill" id="back">${k.face} ${k.name}</button><div class="mapbar"><button class="pill" id="skn">🎨 Skins</button><button class="pill" id="stk">🎁 Stickers ${(S.stickers[kid]||[]).length}</button><span class="pill"><span class="star">★</span> ${stars()}</span></div></div>
  <h2>Where shall we go?</h2>
  <div class="map">${WORLDS.map((w,i)=>{const p=w.max?prog(w.id):null;return`<button class="world ${w.cls||""}" data-w="${w.id}" style="animation-delay:${i*.05}s${w.bg?`;background:${w.bg}`:""}"><span class="ico" style="animation-delay:-${i}s">${w.ico}</span><span><b>${w.name}</b><small>${w.sub}</small>${w.max>1?`<span class="lvl">${[...Array(w.max)].map((_,j)=>`<i class="${j<p.lvl?"on":""}"></i>`).join("")}</span>`:""}</span></button>`}).join("")}</div>`;
  $("#back").onclick=()=>{SFX.tap();kid=null;render()};
  $("#stk").onclick=()=>{SFX.tap();stickerBook()};$("#skn").onclick=()=>{SFX.tap();skinsScreen()};
  $$("[data-w]").forEach(b=>b.onclick=()=>{SFX.tap();const id=b.dataset.w;round={home:id,mix:id==="mix",w:id,n:0,first:0};combo=0;next()});
}
function next(){
  if(round.mix){const pool=WORLDS.filter(w=>w.max);round.w=pick(pool).id}
  const p=prog(round.w);round.q=GEN[round.w](p.lvl);round.tries=0;round.counted=0;round.whyDone=false;round.whyStage=false;render();
  const tag=round.mix?`${WORLDS.find(w=>w.id===round.w).name}! `:"";
  setTimeout(()=>speak((round.n===0?`Let's go, ${NAME()}! `:OPENER())+tag+round.q.say),300)}
function play(){
  if(round.n>=ROUND)return done();
  const q=round.q;const pct=round.n/ROUND*100;let body="";const t=q.type||"opts";
  if(t==="spell")body=`<div class="left"><div class="stage">${q.stage}</div><div class="slots">${[...q.word].map(()=>`<div class="slot"></div>`).join("")}</div></div>
      <div class="left"><div class="tiles">${q.tiles.map((c,i)=>`<button class="tile" data-t="${i}" style="animation-delay:${i*.05}s">${c}</button>`).join("")}</div><div class="msg" id="msg"></div></div>`;
  else if(t==="order")body=`<div class="left"><div class="slots">${q.seq.map((_,i)=>`<div class="slot ord"><small>${["1st","2nd","3rd","4th"][i]}</small></div>`).join("")}</div></div>
      <div class="left"><div class="tiles">${q.items.map(([e,l],i)=>`<button class="tile ord" data-lab="${l}" style="animation-delay:${i*.05}s"><span>${e}</span><small>${l}</small></button>`).join("")}</div><div class="msg" id="msg"></div></div>`;
  else if(t==="build")body=`<div class="left"><span class="target">Target: ${q.unit==="money"?money(q.target):q.target}</span><div class="pv" id="bin" style="min-height:120px"></div><div class="total" id="tot">${q.unit==="money"?"0c":"0"}</div></div>
      <div class="left"><div class="btnrow">${q.parts.map(([v,l,h],i)=>`<button class="addbtn" data-add="${i}">${h}${l?`<span>${l}</span>`:""}</button>`).join("")}</div><button class="addbtn reset" id="clr">↺ Start again</button><div class="msg" id="msg"></div></div>`;
  else if(t==="shade")body=`<div class="left"><div class="stage">${q.stage}</div></div><div class="left"><div class="total" id="tot">0 of ${q.n}</div><button class="addbtn reset" id="clr">↺ Start again</button><div class="msg" id="msg"></div></div>`;
  else if(t==="mirror")body=`<div class="left"><div class="grid" style="grid-template-columns:repeat(${q.half*2},52px)">${q.left.map((row,r)=>[...row.map((on,c)=>`<div class="cell fixed ${on?"on":""}"></div>`),...row.map((_,c)=>`<button class="cell ${c===0?"mid":""}" data-m="${r}-${c}" aria-label="square"></button>`)].join("")).join("")}</div></div><div class="left"><p class="lede">The middle is the mirror line.</p><div class="msg" id="msg"></div></div>`;
  else if(t==="setclock")body=`<div class="left"><div class="clockset" id="cs"></div></div><div class="left"><div class="btnrow"><button class="addbtn" id="hm">Hour −</button><button class="addbtn" id="hp">Hour +</button></div><div class="btnrow"><button class="addbtn" id="mm">Min −${q.step}</button><button class="addbtn" id="mp">Min +${q.step}</button></div><button class="big" id="chk">Check ✓</button><div class="msg" id="msg"></div></div>`;
  else body=`<div class="left">${q.stage?`<div class="stage">${q.stage}</div>`:""}</div>
      <div class="left"><div class="opts ${q.opts.some(o=>o.txt)?"":"grid2"}">${q.opts.map((o,i)=>`<button class="opt ${o.txt?"txt":""}" data-i="${i}">${o.h}</button>`).join("")}</div><div class="msg" id="msg"></div></div>`;
  const wname=round.mix?`🌋 ${WORLDS.find(w=>w.id===round.w).name}`:"";
  $("#app").innerHTML=`<div class="top"><button class="pill" id="home">← Map</button>
    <div class="progress"><div class="track"><i style="width:${pct}%"></i></div><span class="boat">⛵</span></div><span class="combo" id="combo">${combo>=2?`🔥×${combo}`:""}</span></div>
  ${wname?`<p class="lede" style="text-align:center;margin:-8px 0">${wname}</p>`:""}
  <div class="qrow"><button class="say" id="say" aria-label="Hear it again">${SPEAK_ICON}</button><span class="q">${q.q}</span></div>
  <div class="card ${q.stage||t!=="opts"?"split":""}">${body}</div>`;
  $("#home").onclick=()=>{SFX.tap();round=null;window.speechSynthesis&&speechSynthesis.cancel();render()};
  $("#say").onclick=()=>speak(q.say);
  $$("[data-tap]").forEach(el=>el.onclick=()=>{if(el.classList.contains("counted"))return;round.counted++;el.classList.add("counted");el.insertAdjacentHTML("beforeend",`<span class="n">${round.counted}</span>`);SFX.count(round.counted);speak(String(round.counted));buzz(10)});
  let rowTotal=0;$$("[data-row]").forEach(r=>r.onclick=()=>{if(r.classList.contains("lit"))return;rowTotal+=q.rows;r.classList.add("lit");r.dataset.total=rowTotal;SFX.count(rowTotal/q.rows);speak(String(rowTotal));buzz(10)});
  const sp=$(".spinbtn");if(sp)sp.onclick=()=>{SFX.tap();const g=sp.querySelector(".spin");g.style.transition="transform 1.6s cubic-bezier(.2,.8,.3,1)";g.style.transformOrigin="50px 50px";g.style.transform=`rotate(${(+(g.dataset.r||0))+720+rnd(0,359)}deg)`;g.dataset.r=(+(g.dataset.r||0))+1080};
  const centre=el=>{const r=(el||$(".card")).getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]};
  if(t==="spell"){let pos=0;const slots=$$(".slot");
    $$(".tile").forEach(tl=>tl.onclick=()=>{const c=q.tiles[+tl.dataset.t];
      if(c===q.word[pos]){slots[pos].textContent=c;slots[pos].classList.add("fill");tl.classList.add("used");SFX.count(pos);speak(c);pos++;if(pos===q.word.length)correct(...centre($(".slots")),q.word)}
      else{tl.classList.remove("no");void tl.offsetWidth;tl.classList.add("no");wrong("Ooh, not that one. Which letter comes next?")}})}
  else if(t==="order")orderTask(q);
  else if(t==="build"){let tot=0,done=false;const fmt=v=>q.unit==="money"?(v?money(v):"0c"):v;
    const upd=()=>{$("#tot").textContent=fmt(tot)};
    $$("[data-add]").forEach(b=>b.onclick=()=>{if(done)return;const[v,,h]=q.parts[+b.dataset.add];tot+=v;$("#bin").insertAdjacentHTML("beforeend",h);upd();SFX.count(tot/q.parts[q.parts.length-1][0]);buzz(8);
      if(tot===q.target){done=true;speak(q.unit==="money"?sayMoney(tot):String(tot));correct(...centre($("#bin")))}
      else if(tot>q.target){wrong(`Whoops, that's ${q.unit==="money"?sayMoney(tot):tot}. Too many! Let's start again.`);setTimeout(()=>{tot=0;$("#bin").innerHTML="";upd()},900)}
      else speak(q.unit==="money"?sayMoney(tot):String(tot))});
    $("#clr").onclick=()=>{SFX.tap();tot=0;$("#bin").innerHTML="";upd()}}
  else if(t==="shade"){let on=new Set(),done=false;const paint=()=>{$$("[data-part]").forEach(p=>p.setAttribute("fill",on.has(+p.dataset.part)?"#e2953a":"#f6e3b8"));$("#tot").textContent=`${on.size} of ${q.n}`};
    $$("[data-part]").forEach(p=>p.onclick=()=>{if(done)return;const i=+p.dataset.part;on.has(i)?on.delete(i):on.add(i);paint();SFX.count(on.size);buzz(8);
      if(on.size===q.k){done=true;correct(...centre($(".pie")),`${frSay(q.k,q.n)}`)}
      else if(on.size>q.k){wrong(`That's ${on.size} pieces. We only need ${q.k}. Tap one to take it away.`)}});
    $("#clr").onclick=()=>{SFX.tap();on.clear();paint()}}
  else if(t==="mirror"){const st=q.left.map(r=>r.map(()=>false));let done=false;
    $$("[data-m]").forEach(c=>c.onclick=()=>{if(done)return;const[r,cc]=c.dataset.m.split("-").map(Number);st[r][cc]=!st[r][cc];c.classList.toggle("on",st[r][cc]);SFX.count(r*3+cc);buzz(8);
      if(st[r][cc]&&!q.left[r][q.half-1-cc]){pip("oops","Check the mirror!")}
      if(st.every((row,ri)=>row.every((v,ci)=>v===q.left[ri][q.half-1-ci]))){done=true;correct(...centre($(".grid")))}})}
  else if(t==="setclock"){let h=12,m=0;const draw=()=>{$("#cs").innerHTML=clock(h,m,220)+`<div class="total">${dig(h,m)}</div>`};draw();
    const mv=(dh,dm)=>{SFX.tap();m+=dm;while(m>=60){m-=60;h++}while(m<0){m+=60;h--}h=nh(h+dh);draw()};
    $("#hp").onclick=()=>mv(1,0);$("#hm").onclick=()=>mv(-1,0);$("#mp").onclick=()=>mv(0,q.step);$("#mm").onclick=()=>mv(0,-q.step);
    $("#chk").onclick=()=>{if(h===q.th&&m===q.tm){$("#chk").disabled=true;correct(...centre($("#cs")))}else wrong(h!==q.th?"Nearly! Check the short hand, that's the hour.":"Nearly! Check the long hand, that's the minutes.")}}
  else $$(".opt").forEach(b=>b.onclick=()=>answer(b,q.opts[+b.dataset.i]));
}
function miss(){const p=prog(round.w);p.streak=0;p.miss++;if(p.miss>=3&&p.lvl>1){p.lvl--;p.miss=0}save()}
function wrong(line){SFX.oops();buzz(30);combo=0;const c=$("#combo");if(c)c.textContent="";pip("oops","So close!");if(round.tries++===0)miss();
  const m=$("#msg");if(m){m.className="msg try";m.textContent="So close! Try again."}speak(line||NUDGE(),"soft")}
function correct(x,y,sayExtra){
  const p=prog(round.w);const praise=PRAISE();
  const m=$("#msg");if(m){m.className="msg good";m.textContent=praise}
  if(round.tries===0){combo++;round.first++;p.streak++;p.miss=0}
  const c=$("#combo");if(c&&combo>=2){c.textContent=`🔥×${combo}`;c.classList.remove("pop");void c.offsetWidth;c.classList.add("pop")}
  SFX.good();buzz(20);confetti(x,y,combo>=3?110:70);pip("happy",combo>=3?`${combo} in a row! 🔥`:praise);
  speak(`${sayExtra?sayExtra+"! ":""}${praise}${combo===3?" Three in a row!":combo===5?" Five in a row! Unstoppable!":""}`,"happy");
  const w=WORLDS.find(v=>v.id===round.w);const need=S.kids[kid].pace==="fast"?3:4;
  if(p.streak>=need&&p.lvl<w.max){p.lvl++;p.best=Math.max(p.best||0,p.lvl);p.streak=0;checkSkins();setTimeout(()=>{pip("happy","Level up! 🚀");speak(`Whoa! Level up, ${NAME()}! You're getting so clever!`,"happy")},1100)}
  round.n++;save();setTimeout(()=>{if(round)next()},S.settings.calm?2400:2000);
}
function answer(b,o){
  const q=round.q,ok=String(o.v)===String(q.ans)||(q.anyOk&&round.w==="feel");
  if(ok&&q.why&&!round.whyDone){b.classList.add("yes");$$(".opt").forEach(x=>x.style.pointerEvents="none");SFX.good();pip("happy","Yes! Now… why?");round.whyDone=true;setTimeout(()=>askWhy(q),700);return}
  if(ok){b.classList.add("yes");$$(".opt").forEach(x=>x.style.pointerEvents="none");const r=b.getBoundingClientRect();
    correct(r.left+r.width/2,r.top+r.height/2,round.w==="feel"&&o.v!==q.ans?`${o.v} makes sense too`:q.after||"")}
  else{b.classList.add("gone");wrong(q.kind==="cope"?"Hmm, that might make things harder. What else could you try?":"")}
}
function done(){
  const hw=round.home;const p=prog(round.w);const earned=Math.max(1,round.first);p.stars+=earned;const stk=awardSticker();save();
  $("#app").innerHTML=`<div class="card done" style="margin-top:4vh"><div class="reward">${Array.from({length:Math.min(earned,5)},(_,i)=>`<span style="animation-delay:${i*.15}s">⭐</span>`).join("")}</div>
  <h2>Round done! ${earned} star${earned>1?"s":""}</h2><p class="lede">New sticker!</p><div class="newsticker">${stk}</div>${newSkins.length?`<div class="unlock"><b>🎨 New skin unlocked!</b>${newSkins.map(sk=>`<button class="skin" data-wear="${sk.id}" style="background:${sk.vars.bg||"#bfe3ec"};color:${sk.vars.ink||"#1f3b44"}"><span class="sk-deco">${[...sk.deco].slice(0,3).join("")}</span><b>${sk.name}</b><small>Tap to wear it</small></button>`).join("")}</div>`:""}
  <div class="rowbtns"><button class="big" id="bub">🫧 Bubble break</button><button class="big" id="again">Play again</button><button class="big ghost" id="map">Map</button></div></div>`;
  SFX.win();setTimeout(()=>confetti(innerWidth/2,innerHeight/3,140),150);pip("happy","Woohoo!");
  speak(`Woohoo! Amazing job, ${NAME()}! You got ${earned} star${earned>1?"s":""} and a new sticker!${newSkins.length?` And you unlocked the ${newSkins.map(x=>x.name).join(" and ")} skin!`:""} Want a bubble break?`,"happy");
  $$("[data-wear]").forEach(b=>b.onclick=()=>{const st=skinState();st.on=b.dataset.wear;save();applySkin(st.on);SFX.win();confetti(innerWidth/2,innerHeight/2,80);b.querySelector("small").textContent="Wearing now"});newSkins=[];
  round=null;
  $("#bub").onclick=()=>{SFX.tap();bubbles(hw)};
  $("#again").onclick=()=>{SFX.tap();round={home:hw,mix:hw==="mix",w:hw,n:0,first:0};combo=0;next()};
  $("#map").onclick=()=>{SFX.tap();render()};
}
function bubbles(hw){
  let popped=0,left=20,alive=true;
  $("#app").innerHTML=`<div class="top"><button class="pill" id="home">← Map</button><span class="pill">🫧 <b id="bp">0</b> popped</span><span class="pill">⏱ <b id="bt">20</b></span></div><div class="bubbles" id="field"></div>`;
  speak("Bubble break! Pop as many bubbles as you can!","happy");
  const field=$("#field");
  const spawn=()=>{if(!alive)return;const b=document.createElement("button");const s=rnd(60,110);b.className="bub";b.style.cssText=`width:${s}px;height:${s}px;left:${rnd(0,Math.max(0,field.clientWidth-s))}px;bottom:-${s}px;animation-duration:${rnd(45,80)/10}s`;b.setAttribute("aria-label","bubble");
    b.onclick=()=>{if(b.classList.contains("popped"))return;b.classList.add("popped");popped++;$("#bp").textContent=popped;SFX.pop();buzz(8);setTimeout(()=>b.remove(),260)};
    b.addEventListener("animationend",e=>{if(e.animationName==="floatup")b.remove()});field.appendChild(b)};
  const sp=setInterval(spawn,still()?900:450);
  const tm=setInterval(()=>{left--;const e=$("#bt");if(e)e.textContent=left;if(left<=0){finish()}},1000);
  function finish(){alive=false;clearInterval(sp);clearInterval(tm);if(!$("#field"))return;SFX.win();confetti(innerWidth/2,innerHeight/3,100);speak(`Pop pop pop! You popped ${popped} bubbles! Ready for more?`,"happy");
    $("#app").innerHTML=`<div class="card done" style="margin-top:6vh"><div class="reward">🫧</div><h2>${popped} bubbles popped!</h2><div class="rowbtns"><button class="big" id="again">Keep learning</button><button class="big ghost" id="map">Map</button></div></div>`;
    $("#again").onclick=()=>{SFX.tap();round={home:hw,mix:hw==="mix",w:hw,n:0,first:0};combo=0;next()};$("#map").onclick=()=>{SFX.tap();render()}}
  $("#home").onclick=()=>{alive=false;clearInterval(sp);clearInterval(tm);SFX.tap();render()};
}
function stickerBook(){
  const own=S.stickers[kid]||[];
  $("#app").innerHTML=`<div class="top"><button class="pill" id="back">← Map</button><span class="pill">🎁 ${own.length} of ${STICKERS.length}</span></div><h2>${NAME()}'s sticker book</h2><p class="lede">Finish a round to win a new sticker.</p>
  <div class="stickers">${STICKERS.map(s=>`<button class="sticker ${own.includes(s)?"":"locked"}" data-s="${s}">${own.includes(s)?s:"?"}</button>`).join("")}</div>`;
  speak(`You have ${own.length} stickers! Tap one!`,"happy");
  $$("[data-s]").forEach(b=>b.onclick=()=>{if(b.classList.contains("locked")){SFX.oops();return}SFX.pop();b.style.animation="none";void b.offsetWidth;b.style.animation="win .5s";const r=b.getBoundingClientRect();confetti(r.left+r.width/2,r.top+r.height/2,25)});
  $("#back").onclick=()=>{SFX.tap();render()};
}
function parent(){
  const faces=["🦊","🐢","🦖","🐙","🦄","🐼","🐝","🦁","🐸","🦋"];
  $("#app").innerHTML=`<div class="top"><h1>Grown-ups</h1><button class="pill" id="back">Done</button></div>
  <p class="lede">Levels move on their own. Steady pace: 4 right first-try moves up. Fast pace: 3 right moves up. 3 misses moves down. Progress saves on this device only. Tip: Share → Add to Home Screen so it opens full-screen.</p>
  <div class="parent">
  ${S.kids.map((k,i)=>`<div class="prow"><span style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><button class="pill" data-f="${i}">${k.face}</button><input type="text" id="n${i}" value="${k.name.replace(/"/g,"&quot;")}" aria-label="Name"><button class="switch" data-pace="${i}" aria-pressed="${k.pace==="fast"}">${k.pace==="fast"?"Fast pace":"Steady pace"}</button></span>
    <span class="stat">${WORLDS.filter(w=>w.max).map(w=>{const p=(S.progress[i]||{})[w.id];return`${w.name.split(" ")[0]} ${p?"L"+p.lvl:"–"}`}).join(" · ")}</span></div>`).join("")}
  <div class="prow"><span>Read everything aloud</span><button class="switch" id="voice" aria-pressed="${S.settings.voice}">${S.settings.voice?"On":"Off"}</button></div>
  <div class="prow"><span>Sound effects</span><button class="switch" id="sfx" aria-pressed="${S.settings.sfx}">${S.settings.sfx?"On":"Off"}</button></div>
  <div class="prow"><span>Calm mode (no animations, slower)</span><button class="switch" id="calm" aria-pressed="${S.settings.calm}">${S.settings.calm?"On":"Off"}</button></div>
  <div class="prow"><span>Voice: ${VOICE?VOICE.name:"device default"}</span><button class="switch" id="test">Test voice</button></div>
  <div class="prow"><span>Curriculum map: every level, its AC9 code and thinking skill</span><button class="switch" id="curr">Open</button></div>
  <div class="prow"><span>Reset all progress and stickers</span><button class="switch" id="reset">Reset</button></div></div>`;
  S.kids.forEach((k,i)=>{$("#n"+i).oninput=e=>{k.name=e.target.value.slice(0,20)||"Explorer";save()}});
  $$("[data-f]").forEach(b=>b.onclick=()=>{const k=S.kids[+b.dataset.f];k.face=faces[(faces.indexOf(k.face)+1)%faces.length];save();parent()});
  $$("[data-pace]").forEach(b=>b.onclick=()=>{const k=S.kids[+b.dataset.pace];k.pace=k.pace==="fast"?"steady":"fast";save();parent()});
  ["voice","sfx","calm"].forEach(id=>$("#"+id).onclick=()=>{S.settings[id]=!S.settings[id];save();document.body.classList.toggle("calm",S.settings.calm);parent()});
  $("#curr").onclick=()=>{SFX.tap();curriculumScreen()};
  $("#test").onclick=()=>speak(`Hi ${S.kids[0].name} and ${S.kids[1].name}! Let's go exploring.`,"happy");
  let armed=false;$("#reset").onclick=e=>{if(!armed){armed=true;e.target.textContent="Tap again to confirm";return}S.progress={};S.stickers={};S.skins={};S.think={};save();parent()};
  $("#back").onclick=()=>{kid=null;render()};
}
function askWhy(q){round.whyStage=true;const w=q.why;const opts=txtOpts(w.a,w.o);
  $(".q").textContent=w.q;speak(`Yes! ${w.q}`,"happy");
  const box=$(".opts");box.classList.remove("grid2");box.innerHTML=opts.map((o,i)=>`<button class="opt txt" data-w="${i}">🤔 ${o.h}</button>`).join("");
  $$("[data-w]").forEach(b=>b.onclick=()=>{const o=opts[+b.dataset.w];
    if(o.v===w.a){b.classList.add("yes");$$("[data-w]").forEach(x=>x.style.pointerEvents="none");if(round.tries===0){S.think[kid]=(S.think[kid]||0)+1;checkSkins()}const r=b.getBoundingClientRect();correct(r.left+r.width/2,r.top+r.height/2,"Great thinking")}
    else{b.classList.add("gone");wrong("Hmm, does that really explain it? Try another reason.")}})}
function ups(k){const ps=S.progress[k]||{};const start=S.kids[k].age>=9?2:1;return Object.values(ps).reduce((t,p)=>t+Math.max(0,Math.max(p.best||0,p.lvl)-start),0)}
function mastered(k){const ps=S.progress[k]||{};return WORLDS.some(w=>w.max>1&&ps[w.id]&&Math.max(ps[w.id].best||0,ps[w.id].lvl)>=w.max)}
function skinOK(sk,k){if(!sk.need&&!sk.special)return true;if(sk.special==="master")return mastered(k);if(sk.special==="think")return (S.think[k]||0)>=10;return ups(k)>=sk.need}
function skinRule(sk,k){if(sk.rule&&sk.special==="think")return`${sk.rule} (${Math.min(10,S.think[k]||0)}/10)`;if(sk.rule)return sk.rule;return`Earn ${sk.need} level-up${sk.need>1?"s":""} (${Math.min(sk.need,ups(k))}/${sk.need})`}
let newSkins=[];
function skinState(){return S.skins[kid]||(S.skins[kid]={own:["island"],on:"island"})}
function checkSkins(){if(kid===null)return;const st=skinState();SKINS.forEach(sk=>{if(!st.own.includes(sk.id)&&skinOK(sk,kid)){st.own.push(sk.id);newSkins.push(sk);setTimeout(()=>pip("happy",`New skin: ${sk.name}!`),1600)}});save()}
const BASEVARS={};
function applySkin(id){const root=document.documentElement;const sk=SKINS.find(x=>x.id===id)||SKINS[0];
  Object.keys(BASEVARS).forEach(k=>root.style.removeProperty("--"+k));
  Object.entries(sk.vars).forEach(([k,v])=>{BASEVARS[k]=1;root.style.setProperty("--"+k,v)});
  if(sk.vars.panel)root.style.colorScheme="dark";else root.style.colorScheme="";
  let deco=$("#deco");if(!deco){deco=document.createElement("div");deco.id="deco";$(".scene").appendChild(deco)}
  $$(".cloud").forEach(c=>c.style.display=id==="island"?"":"none");
  deco.innerHTML=id==="island"?"":Array.from({length:9},(_,i)=>{const e=[...sk.deco][i%[...sk.deco].length];return`<span style="position:absolute;left:${rnd(2,92)}%;top:${rnd(4,70)}%;font-size:${rnd(26,52)}px;opacity:.55;animation:bob ${rnd(30,60)/10}s ease-in-out infinite;animation-delay:-${rnd(0,30)/10}s">${e}</span>`}).join("");
  let hat=$("#hat");if(!hat){hat=document.createElement("span");hat.id="hat";hat.style.cssText="position:absolute;left:50%;top:-20px;transform:translateX(-30%);font-size:40px;pointer-events:none";$("#mascot").style.position="fixed";$("#mascot").appendChild(hat)}
  hat.textContent=sk.hat}
function skinsScreen(){const st=skinState();
  $("#app").innerHTML=`<div class="top"><button class="pill" id="back">← Map</button><span class="pill">🎨 ${st.own.length} of ${SKINS.length}</span></div>
  <h2>${NAME()}'s skins</h2><p class="lede">Skins unlock when you level up. Level-ups only happen when you get answers right first try, so every skin shows real learning.</p>
  <div class="skins">${SKINS.map(sk=>{const own=st.own.includes(sk.id);return`<button class="skin ${own?"":"locked"} ${st.on===sk.id?"on":""}" data-skin="${sk.id}" style="background:${sk.vars.bg||"#bfe3ec"};color:${sk.vars.ink||"#1f3b44"}"><span class="sk-deco">${own?[...sk.deco].slice(0,3).join(""):"🔒"}</span><b>${sk.name}</b><small>${own?(st.on===sk.id?"Wearing now":"Tap to wear"):skinRule(sk,kid)}</small></button>`}).join("")}</div>`;
  speak(`You have ${st.own.length} skins! Tap one to try it on.`,"happy");
  $$("[data-skin]").forEach(b=>b.onclick=()=>{const id=b.dataset.skin;if(!st.own.includes(id)){SFX.oops();speak(skinRule(SKINS.find(x=>x.id===id),kid),"soft");return}st.on=id;save();applySkin(id);SFX.win();const r=b.getBoundingClientRect();confetti(r.left+r.width/2,r.top+r.height/2,60);skinsScreen()});
  $("#back").onclick=()=>{SFX.tap();render()}}
function orderTask(q){let pos=0;const slots=$$(".slot");
  $$(".tile").forEach(tl=>tl.onclick=()=>{const lab=tl.dataset.lab;
    if(lab===q.seq[pos]){slots[pos].innerHTML=tl.innerHTML;slots[pos].classList.add("fill");tl.classList.add("used");SFX.count(pos);speak(lab);pos++;
      if(pos===q.seq.length){const r=$(".slots").getBoundingClientRect();correct(r.left+r.width/2,r.top+r.height/2,"Perfect order")}}
    else{tl.classList.remove("no");void tl.offsetWidth;tl.classList.add("no");wrong(pos===0?"Hmm, does that happen first? What comes at the very start?":"Not yet. What happens straight after?")}})}
function curriculumScreen(){
  $("#app").innerHTML=`<div class="top"><h1>Curriculum map</h1><button class="pill" id="back">Back</button></div>
  <p class="lede">Every level is matched to an Australian Curriculum v9 content description and a thinking skill. Questions marked “+ why” ask the child to explain their answer before it counts.</p>
  ${WORLDS.filter(w=>CURR[w.id]).map(w=>`<section class="currsec"><h2>${w.ico} ${w.name}</h2><div class="currwrap"><table class="curr"><tr><th>Lvl</th><th>Activity</th><th>Curriculum</th><th>Thinking skill</th></tr>${CURR[w.id].map((r,i)=>`<tr><td>${i+1}</td><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</table></div></section>`).join("")}`;
  $("#back").onclick=()=>parent()}

render();

;
/* themes.js */
SKINS.push(
 {id:"unicorn",name:"Unicorn Meadow",rule:"Ivy's own theme",owner:0,deco:"🦄🌈✨💖⭐🦄🌸",hat:"🦄",vars:{bg:"#f5c9ec",bg2:"#fdf0fb",sea:"#a35fd0",sky:"#f3dcf7",line:"#efd0ef",sun:"#f7b3d8",berry:"#d05fa6"}},
 {id:"blocks",name:"Block Island",rule:"Hayden's own theme",owner:1,deco:"🧱💎⛏️🌲🟩🟫🪨🌲",hat:"⛏️",vars:{bg:"#7cc6f2",bg2:"#e3f2d6",sea:"#3d8f2f",sky:"#d4ecc0",line:"#7a5a36",panel:"#fbf7ee",sun:"#e0b04a",berry:"#8a5a2b",good:"#3d8f2f"}});
const THEME=["unicorn","blocks"];
{const l=document.createElement("link");l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap";document.head.appendChild(l);
 const st=document.createElement("style");st.textContent=`
body[data-skin=unicorn]{background:linear-gradient(180deg,#f5c9ec 0%,#e7d3fb 45%,#fdf0fb 80%)}
body[data-skin=unicorn] .world{border-radius:40px;background-image:linear-gradient(135deg,rgba(255,255,255,.18),rgba(255,255,255,0))!important}
body[data-skin=unicorn] .world::after{background:radial-gradient(circle,rgba(255,255,255,.5),rgba(255,255,255,0) 70%)}
body[data-skin=unicorn] .track i{background:linear-gradient(90deg,#ff8fb1,#ffd36e,#8fe3a8,#7cc7ff,#c59bff)}
body[data-skin=unicorn] h1,body[data-skin=unicorn] h2{background:linear-gradient(90deg,#d05fa6,#a35fd0,#5f8fd0);-webkit-background-clip:text;background-clip:text;color:transparent}
body[data-skin=unicorn] .opt.yes{background:linear-gradient(135deg,#ff8fb1,#c59bff);border-color:#c59bff}
body[data-skin=blocks]{background:linear-gradient(180deg,#7cc6f2 0%,#a9dbf7 55%,#e3f2d6 55.1%,#e3f2d6 100%)}
body[data-skin=blocks] h1,body[data-skin=blocks] h2,body[data-skin=blocks] .q,body[data-skin=blocks] .pill,body[data-skin=blocks] .big,body[data-skin=blocks] .world b{font-family:"Silkscreen","Lexend",monospace;letter-spacing:.02em}
body[data-skin=blocks] .card,body[data-skin=blocks] .opt,body[data-skin=blocks] .pill,body[data-skin=blocks] .big,body[data-skin=blocks] .tile,body[data-skin=blocks] .slot,body[data-skin=blocks] .addbtn,body[data-skin=blocks] .say,body[data-skin=blocks] .group,body[data-skin=blocks] .passage,body[data-skin=blocks] .row,body[data-skin=blocks] .cell,body[data-skin=blocks] .sticker,body[data-skin=blocks] .skin,body[data-skin=blocks] .track,body[data-skin=blocks] .track i,body[data-skin=blocks] .hop{border-radius:4px!important}
body[data-skin=blocks] .card{border:6px solid #7a5a36;box-shadow:0 10px 0 #5a4026}
body[data-skin=blocks] .opt,body[data-skin=blocks] .addbtn{border-color:#7a5a36;box-shadow:0 6px 0 #5a4026}
body[data-skin=blocks] .world{border-radius:4px;border-top:22px solid #5fb043;box-shadow:inset 0 0 0 4px rgba(0,0,0,.15),0 8px 0 rgba(0,0,0,.25);background-image:linear-gradient(45deg,rgba(0,0,0,.06) 25%,transparent 25%,transparent 75%,rgba(0,0,0,.06) 75%),linear-gradient(45deg,rgba(0,0,0,.06) 25%,transparent 25%,transparent 75%,rgba(0,0,0,.06) 75%)!important;background-size:24px 24px!important;background-position:0 0,12px 12px!important}
body[data-skin=blocks] .world::after{display:none}
body[data-skin=blocks] .track i{background:repeating-linear-gradient(90deg,#5fb043 0 14px,#4a9634 14px 28px)}
body[data-skin=blocks] .waves svg path{fill:#8b6a43}
body[data-skin=blocks] #deco span{filter:drop-shadow(3px 3px 0 rgba(0,0,0,.2))}
.kid.th-unicorn{background:linear-gradient(160deg,#fbd3f0,#e2d4fb 60%,#d4ecfb);border-color:#efc3ea}
.kid.th-unicorn b{color:#a3488a}
.kid.th-blocks{border-radius:6px;background:linear-gradient(180deg,#5fb043 0 26px,#8b6a43 26px);color:#fff;border:6px solid #5a4026;box-shadow:0 8px 0 #3e2c1a}
.kid.th-blocks b{font-family:"Silkscreen",monospace;color:#fff;text-shadow:3px 3px 0 #3e2c1a}
.kid.th-blocks span{color:#f3e6cf}
.kid .badge{font-size:2.2rem;letter-spacing:.2em}
`;document.head.appendChild(st)}
if(S.kids[0].face==="🦊")S.kids[0].face="🦄";if(S.kids[1].face==="🐢")S.kids[1].face="⛏️";
skinState=function(){const st=S.skins[kid]||(S.skins[kid]={own:["island"],on:"island"});const th=THEME[kid];if(th&&!st.own.includes(th)){st.own.unshift(th);st.on=th;save()}return st};
const _skinOK=skinOK;skinOK=function(sk,k){if(sk.owner!==undefined)return false;return _skinOK(sk,k)};
const _apply=applySkin;applySkin=function(id){const sk=SKINS.find(x=>x.id===id)||SKINS[0];document.body.dataset.skin=sk.id;_apply(id)};
const _home=home;home=function(){_home();$$("[data-k]").forEach((b,i)=>{b.classList.add("th-"+(THEME[i]||""));b.insertAdjacentHTML("afterbegin",`<span class="badge">${i===0?"🌈✨":"🧱💎"}</span>`)})};
skinsScreen=function(){
  const st=skinState();const list=SKINS.filter(sk=>sk.owner===undefined||sk.owner===kid);
  const card=sk=>{const own=st.own.includes(sk.id);return`<button class="skin ${own?"":"locked"} ${st.on===sk.id?"on":""}" data-skin="${sk.id}" style="background:${sk.vars.bg||"#bfe3ec"};color:${sk.vars.ink||"#1f3b44"};animation:none"><span class="sk-deco">${own?[...sk.deco].slice(0,3).join(""):"🔒"}</span><b>${sk.name}</b><small>${own?(st.on===sk.id?"Wearing now":"Tap to wear"):skinRule(sk,kid)}</small></button>`};
  $("#app").innerHTML=`<div class="top"><button class="pill" id="skback">← Back to map</button><span class="pill">🎨 ${st.own.length} of ${list.length}</span></div>
  <h2>${NAME()}'s skins</h2><p class="lede">Skins unlock when you level up. Level-ups only happen when you get answers right first try.</p>
  <div class="skins" id="skgrid">${list.map(card).join("")}</div>`;
  $("#skback").onclick=()=>{SFX.tap();window.speechSynthesis&&speechSynthesis.cancel();render()};
  speak(`Pick a skin, ${NAME()}!`,"happy");
  $("#skgrid").onclick=e=>{const b=e.target.closest("[data-skin]");if(!b)return;const id=b.dataset.skin;const sk=SKINS.find(x=>x.id===id);
    if(!st.own.includes(id)){SFX.oops();speak(skinRule(sk,kid),"soft");return}
    if(st.on===id)return;st.on=id;save();applySkin(id);SFX.win();
    $$("#skgrid [data-skin]").forEach(x=>{const on=x.dataset.skin===id;x.classList.toggle("on",on);const sm=x.querySelector("small");if(st.own.includes(x.dataset.skin))sm.textContent=on?"Wearing now":"Tap to wear"});
    const r=b.getBoundingClientRect();confetti(r.left+r.width/2,r.top+r.height/2,40)}};
if(kid===null)render();

;
/* extras.js */
(function(){
if(!S.coins)S.coins={};if(!S.owned)S.owned={};if(!S.builds)S.builds={};if(!S.chat)S.chat=[];if(!S.seen)S.seen={};
if(S.settings.clear===undefined)S.settings.clear=false;
const coins=()=>S.coins[kid]||0;
const addCoins=n=>{S.coins[kid]=coins()+n;save();const p=$("#coinpill");if(p){p.textContent=`🪙 ${coins()}`;p.classList.remove("pop");void p.offsetWidth;p.classList.add("pop")}};
const owned=()=>S.owned[kid]||(S.owned[kid]=[]);
const has=id=>owned().includes(id);

const WB={words:"#1f5f7a",read:"#1e4f73",think:"#36457a",nums:"#2b6b45",pv:"#7a4f1c",times:"#1f625f",frac:"#a3324f",shapes:"#823d63",time:"#434b94",money:"#2a6d58",data:"#4e6a1c",feel:"#8a5a0e"};
WORLDS.forEach(w=>{if(WB[w.id])w.bg=WB[w.id]});
SKINS.forEach(sk=>{if(Object.keys(sk.vars).length&&!sk.vars.panel){sk.vars.soft="#33515a";sk.vars.ink=sk.vars.ink||"#14262c"}});

const css=`
:root{--soft:#33515a;--ink:#14262c}

.lede,.stat,.kid span,.msg{color:var(--soft)}
.world{text-shadow:0 1px 2px rgba(0,0,0,.35)}
.world small{opacity:1}
.world .lvl i{background:rgba(255,255,255,.45);outline:1.5px solid rgba(255,255,255,.7)}
.world.mix{background:linear-gradient(135deg,#8f2741,#9a5a10 50%,#4b3f9a)!important}
.msg.try{color:#8a4d00}.msg.good{color:#1f6b3d}

body[data-skin=unicorn] h1,body[data-skin=unicorn] h2{background:none!important;color:#5b2275!important;-webkit-background-clip:border-box!important}
body[data-skin=blocks] .q,body[data-skin=blocks] .pill,body[data-skin=blocks] .big,body[data-skin=blocks] .world b{font-family:var(--display)!important}
.bubble{color:var(--ink)}
.opt,.tile,.addbtn{color:var(--ink)}
body[data-skin=blocks] h2{font-family:var(--display)!important;font-weight:800}
#deco{opacity:.55}
.slot.ord small{color:var(--ink);font-weight:700}
body.clear{--ink:#000;--soft:#1a1a1a}
body.clear .q,body.clear .opt,body.clear .passage{font-weight:800}
body.clear .q{font-size:clamp(1.6rem,3.6vw,2.3rem)}
body.clear .world{text-shadow:0 2px 3px rgba(0,0,0,.6)}
body.clear #deco{opacity:.35}
#coinpill.pop{animation:win .45s}
.coinfly{position:fixed;font-size:2rem;pointer-events:none;z-index:30;transition:transform .8s cubic-bezier(.3,-.3,.6,1),opacity .8s}
.shop{display:grid;gap:22px}
.shelf{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:14px}
.item{border-radius:24px;padding:16px;min-height:150px;display:flex;flex-direction:column;gap:6px;align-items:flex-start;text-align:left;background:var(--panel);border:3px solid var(--line);box-shadow:0 6px 0 var(--line);color:var(--ink)}
.item .ic{font-size:2.6rem}.item b{font-family:var(--display);font-size:1.1rem}
.item .price{font-family:var(--display);font-weight:800;background:var(--sky);border-radius:999px;padding:4px 12px}
.item.got .price{background:#cdebd6;color:#14532d}
.item.poor{opacity:.6}
.bgrid{display:grid;gap:2px;background:#9fc9de;padding:6px;border-radius:10px;touch-action:none;max-width:100%;overflow:auto}
.bcell{width:38px;height:38px;border-radius:3px;background:rgba(255,255,255,.35);padding:0}
.palette{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.pbtn{width:64px;height:64px;border-radius:10px;border:4px solid transparent;box-shadow:0 4px 0 rgba(0,0,0,.2);position:relative;font-size:1.4rem}
.pbtn.sel{border-color:#14262c;transform:translateY(-3px)}
.pbtn.lock::after{content:"🔒";position:absolute;inset:0;display:grid;place-items:center;background:rgba(0,0,0,.45);border-radius:6px}
.b-grass{background:linear-gradient(#5fb043 0 30%,#8b6a43 30%)}.b-dirt{background:#8b6a43}.b-stone{background:repeating-linear-gradient(45deg,#8d9499 0 6px,#7a8186 6px 12px)}
.b-wood{background:repeating-linear-gradient(90deg,#a0703c 0 8px,#8a5d2e 8px 10px)}.b-leaf{background:radial-gradient(circle at 30% 30%,#6cc04a 20%,#3f8f2b 60%)}
.b-water{background:linear-gradient(#5ab0e8,#2f7fc1)}.b-sand{background:#e8d38f}.b-brick{background:repeating-linear-gradient(0deg,#b4533c 0 9px,#e0d3c3 9px 11px)}
.b-glass{background:linear-gradient(135deg,rgba(220,240,255,.9),rgba(160,210,240,.6));outline:2px solid #9ccbe6}
.b-gem{background:radial-gradient(circle,#7ff2e8 15%,#2ab3b0 60%)}.b-gold{background:linear-gradient(135deg,#ffe27a,#d9a21b)}
.b-lava{background:radial-gradient(circle at 40% 40%,#ffcb3d 10%,#f05a1a 50%,#a3220c)}.b-rainbow{background:linear-gradient(135deg,#ff6b6b,#ffd93d,#6bcB77,#4d96ff,#a66cff)}
.b-snow{background:#f4f8fb;outline:1px solid #cfdde6}.b-flower{background:radial-gradient(circle,#ffd93d 15%,#ff7eb6 16% 35%,#5fb043 36%)}
.games{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px}
.mem{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;max-width:520px;width:100%}
.mcard{aspect-ratio:1;border-radius:16px;background:var(--sea);color:#fff;font-family:var(--display);font-weight:800;font-size:clamp(1.3rem,4vw,2.2rem);box-shadow:0 5px 0 rgba(0,0,0,.2)}
.mcard.open{background:var(--panel);color:var(--ink);border:3px solid var(--line)}
.mcard.done{background:#cdebd6;color:#14532d;border:3px solid #3a9a5f}
.field{position:relative;width:100%;height:min(58vh,520px);border-radius:28px;background:var(--bg2);border:4px solid var(--line);overflow:hidden}
.hopn{position:absolute;width:72px;height:72px;border-radius:50%;background:var(--sun);color:#3b2a06;font-family:var(--display);font-weight:800;font-size:1.5rem;box-shadow:0 5px 0 rgba(0,0,0,.2)}
.hopn.done{background:#3a9a5f;color:#fff}
.holes{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:460px;width:100%}
.hole{aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 50% 70%,#5a4026,#8b6a43);display:grid;place-items:center;font-family:var(--display);font-weight:800;font-size:2rem;color:#fff}
.hole .pop{animation:rise .2s both;background:var(--panel);color:var(--ink);border-radius:50%;width:78%;height:78%;display:grid;place-items:center;box-shadow:0 4px 0 rgba(0,0,0,.25)}
.chatlog{display:flex;flex-direction:column;gap:10px;max-height:46vh;overflow-y:auto;padding:10px;background:var(--bg2);border-radius:24px;border:3px solid var(--line)}
.cmsg{max-width:78%;padding:10px 16px;border-radius:22px;font-family:var(--display);font-weight:600;font-size:1.25rem;line-height:1.35;text-align:left;color:var(--ink);background:var(--panel);border:2px solid var(--line)}
.cmsg.me{align-self:flex-end;background:#d9ecfb;border-color:#a9cdee;color:#0f2a3d;border-bottom-right-radius:6px}
.cmsg.them{align-self:flex-start;background:#fbe3ef;border-color:#efb6cf;color:#3d0f24;border-bottom-left-radius:6px}
.cmsg small{display:block;font-size:.8rem;font-weight:400;opacity:.8}
.cmsg.big{font-size:2.6rem;padding:6px 14px}
.quick{display:flex;flex-wrap:wrap;gap:8px}
.qbtn{min-height:56px;padding:0 16px;border-radius:999px;background:var(--panel);border:3px solid var(--line);font-family:var(--display);font-weight:700;font-size:1.05rem;color:var(--ink);box-shadow:0 4px 0 var(--line)}
.qbtn.emo{font-size:1.8rem;padding:0 10px}
.chatin{display:flex;gap:10px}
.chatin input{flex:1;min-width:0;font:inherit;font-size:1.2rem;padding:12px 16px;border-radius:18px;border:3px solid var(--line);background:var(--panel);color:var(--ink);user-select:text;-webkit-user-select:text}
.dot{display:inline-block;min-width:22px;height:22px;border-radius:11px;background:#c0392b;color:#fff;font-size:.8rem;font-weight:800;text-align:center;line-height:22px;margin-left:4px}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
document.body.classList.toggle("clear",S.settings.clear);

SKINS.push(
 {id:"rainbow",name:"Rainbow Road",price:40,deco:"🌈⭐🌈✨",hat:"🌈",vars:{bg:"#ffd6e0",bg2:"#fff7e6",sea:"#7a3fb0",sky:"#ffe9c7",line:"#f3cfa8",soft:"#4a3b52",ink:"#1d1424"}},
 {id:"ocean",name:"Ocean Night",price:60,deco:"🐋🌊🌙🐚",hat:"🐳",vars:{bg:"#0f2c4a",bg2:"#173c5f",panel:"#14324f",ink:"#eef6ff",soft:"#b8cfe6",sea:"#4fc3f7",sky:"#1d4a73",line:"#2a5a86",good:"#5cc183"}},
 {id:"lava",name:"Lava Blocks",price:80,deco:"🌋🟧🟥🔥",hat:"🪨",vars:{bg:"#3a1c14",bg2:"#4b241a",panel:"#3a1f17",ink:"#fff2e8",soft:"#f0c6b2",sea:"#ff7a3d",sky:"#5a2c20",line:"#6e3626",good:"#5cc183"}},
 {id:"candyfloss",name:"Cotton Candy",price:50,deco:"🍭☁️💗🍬",hat:"🍬",vars:{bg:"#e9d4ff",bg2:"#fdf2ff",sea:"#8a3fc4",sky:"#f1e2ff",line:"#e2cdf5",soft:"#4a3b5c",ink:"#1d1428"}},
 {id:"robot",name:"Robot Lab",price:70,deco:"🤖⚙️🔩💡",hat:"🤖",vars:{bg:"#cfd8dc",bg2:"#eef2f4",sea:"#37617a",sky:"#dfe7eb",line:"#b9c6cc",soft:"#36474f",ink:"#11191d"}});
const _ok=skinOK;skinOK=function(sk,k){if(sk.price)return false;return _ok(sk,k)};
const _ss=skinState;skinState=function(){const st=_ss();SKINS.filter(sk=>sk.price&&has("skin:"+sk.id)&&!st.own.includes(sk.id)).forEach(sk=>st.own.push(sk.id));return st};
const _rule=skinRule;skinRule=function(sk,k){return sk.price?`Buy it in the shop for 🪙 ${sk.price}`:_rule(sk,k)};

const BLOCKS=[["grass",0],["dirt",0],["stone",0],["wood",0],["leaf",0],["water",0],["sand",0],["brick",15],["glass",20],["snow",15],["flower",20],["gem",35],["gold",40],["lava",45],["rainbow",60]];
const GAMES=[["hop","Number Hop","🐸","Tap the numbers in order, fast!",0],["bubbles","Bubble Pop","🫧","Pop as many bubbles as you can",0],["memory","Memory Match","🃏","Find the matching pairs",30],["whack","Pop-up Numbers","🕳️","Tap the right numbers before they hide",40]];

const _correct=correct;correct=function(x,y,s){const first=round&&round.tries===0;const n=first?3:1;_correct(x,y,s);addCoins(n);flyCoin(x,y,n)};
function flyCoin(x,y,n){if(still())return;const p=$("#coinpill");const el=document.createElement("div");el.className="coinfly";el.textContent=`+${n}🪙`;el.style.left=x+"px";el.style.top=y+"px";document.body.appendChild(el);
  requestAnimationFrame(()=>{const r=p?p.getBoundingClientRect():{left:innerWidth-80,top:20};el.style.transform=`translate(${r.left-x}px,${r.top-y}px) scale(.6)`;el.style.opacity="0"});setTimeout(()=>el.remove(),900)}
const _done=done;done=function(){_done();addCoins(5);const card=$(".card.done");if(card){card.insertAdjacentHTML("afterbegin",`<p class="target">🪙 +5 round bonus · ${coins()} coins</p>`)}};

const unread=k=>S.chat.filter(m=>m.to===k&&m.t>(S.seen[k]||0)).length;
const _map=map;map=function(){_map();const bar=$(".mapbar");if(!bar)return;
  const u=unread(kid);
  bar.insertAdjacentHTML("afterbegin",`<span class="pill" id="coinpill">🪙 ${coins()}</span><button class="pill" id="shopbtn">🛍️ Shop</button><button class="pill" id="buildbtn">🧱 Build</button><button class="pill" id="gamebtn">🎮 Games</button><button class="pill" id="chatbtn">💬 Chat${u?`<span class="dot">${u}</span>`:""}</button>`);
  $("#shopbtn").onclick=()=>{SFX.tap();shop()};$("#buildbtn").onclick=()=>{SFX.tap();build()};$("#gamebtn").onclick=()=>{SFX.tap();games()};$("#chatbtn").onclick=()=>{SFX.tap();chat()};
  if(u)setTimeout(()=>{pip("happy",`${u} new message${u>1?"s":""}!`)},900)};
const topbar=t=>`<div class="top"><button class="pill" id="xback">← Map</button><span class="pill" id="coinpill">🪙 ${coins()}</span></div>${t?`<h2>${t}</h2>`:""}`;
const bindBack=()=>{$("#xback").onclick=()=>{SFX.tap();window.speechSynthesis&&speechSynthesis.cancel();render()}};

function shop(){
  const it=(id,ic,name,price,desc,style)=>{const got=has(id)||price===0;return`<button class="item ${got?"got":coins()<price?"poor":""}" data-buy="${id}" data-price="${price}" ${style?`style="${style}"`:""}><span class="ic">${ic}</span><b>${name}</b><small>${desc}</small><span class="price">${got?"✓ Yours":"🪙 "+price}</span></button>`};
  $("#app").innerHTML=topbar("Coin Shop")+`<p class="lede">Earn coins by answering questions: 3 for first try, 1 for getting there, 5 for finishing a round.</p>
  <div class="shop"><section><h2>🎨 Skins</h2><div class="shelf">${SKINS.filter(s=>s.price).map(s=>it("skin:"+s.id,[...s.deco].slice(0,2).join(""),s.name,s.price,"A new look for your island",`background:${s.vars.bg};color:${s.vars.ink}`)).join("")}</div></section>
  <section><h2>🧱 Building blocks</h2><div class="shelf">${BLOCKS.filter(b=>b[1]).map(([b,p])=>it("block:"+b,`<span class="pbtn b-${b}" style="display:inline-block;width:44px;height:44px"></span>`,b[0].toUpperCase()+b.slice(1)+" block",p,"For Block Builder")).join("")}</div></section>
  <section><h2>🎮 Mini-games</h2><div class="shelf">${GAMES.filter(g=>g[4]).map(([id,n,ic,d,p])=>it("game:"+id,ic,n,p,d)).join("")}</div></section></div>`;
  bindBack();speak(`Welcome to the shop! You have ${coins()} coins.`,"happy");
  $$("[data-buy]").forEach(b=>b.onclick=()=>{const id=b.dataset.buy,p=+b.dataset.price;if(has(id)){SFX.tap();return}
    if(coins()<p){SFX.oops();speak(`You need ${p-coins()} more coins. Keep answering questions!`,"soft");return}
    S.coins[kid]=coins()-p;owned().push(id);save();SFX.win();const r=b.getBoundingClientRect();confetti(r.left+r.width/2,r.top+r.height/2,60);
    if(id.startsWith("skin:")){const sid=id.slice(5);const st=skinState();st.on=sid;save();applySkin(sid);speak("Woohoo! You bought a new skin. You're wearing it now!","happy")}else speak("Woohoo! It's yours!","happy");shop()});
}

function build(){
  const COLS=12,ROWS=9;const key=kid;let g=S.builds[key];if(!g||g.length!==ROWS*COLS){g=Array(ROWS*COLS).fill("");for(let c=0;c<COLS;c++){g[(ROWS-1)*COLS+c]="dirt";g[(ROWS-2)*COLS+c]="grass"}S.builds[key]=g;save()}
  let sel="grass";const free=b=>BLOCKS.find(x=>x[0]===b)[1]===0||has("block:"+b);
  $("#app").innerHTML=topbar("Block Builder")+`<p class="lede">Tap a block, then tap the grid to build. Buy more blocks in the shop.</p>
   <div class="card" style="justify-items:center"><div class="bgrid" id="bg" style="grid-template-columns:repeat(${COLS},38px)">${g.map((b,i)=>`<button class="bcell ${b?"b-"+b:""}" data-c="${i}" aria-label="cell"></button>`).join("")}</div>
   <div class="palette">${BLOCKS.map(([b])=>`<button class="pbtn b-${b} ${free(b)?"":"lock"} ${b===sel?"sel":""}" data-b="${b}" aria-label="${b}"></button>`).join("")}<button class="pbtn" data-b="" style="background:var(--panel)" aria-label="eraser">🧽</button></div>
   <p class="stat" id="bcount"></p><button class="addbtn reset" id="bclear">↺ Clear sky</button></div>`;
  bindBack();
  const count=()=>{const n={};g.forEach(b=>{if(b)n[b]=(n[b]||0)+1});const tot=Object.values(n).reduce((a,b)=>a+b,0);$("#bcount").textContent=`You've used ${tot} blocks`+(n.gem?` · ${n.gem} gems`:"")};count();
  $$("[data-b]").forEach(p=>p.onclick=()=>{const b=p.dataset.b;if(b&&!free(b)){SFX.oops();speak("That block is locked. Buy it in the shop!","soft");return}sel=b;$$("[data-b]").forEach(x=>x.classList.toggle("sel",x===p));SFX.tap()});
  let painting=false;const paint=el=>{if(!el||!el.dataset||el.dataset.c===undefined)return;const i=+el.dataset.c;if(g[i]===sel)return;g[i]=sel;el.className="bcell"+(sel?" b-"+sel:"");SFX.count(i%12);save();count()};
  const grid=$("#bg");
  grid.addEventListener("pointerdown",e=>{painting=true;paint(e.target);grid.setPointerCapture&&grid.setPointerCapture(e.pointerId)});
  grid.addEventListener("pointermove",e=>{if(painting)paint(document.elementFromPoint(e.clientX,e.clientY))});
  addEventListener("pointerup",()=>painting=false);
  $("#bclear").onclick=()=>{for(let i=0;i<(ROWS-2)*COLS;i++)g[i]="";save();build()};
  speak("Block Builder! What will you make?","happy");
}

function games(){
  $("#app").innerHTML=topbar("Mini-games")+`<div class="games">${GAMES.map(([id,n,ic,d,p])=>{const ok=p===0||has("game:"+id);return`<button class="item ${ok?"got":""}" data-g="${id}"><span class="ic">${ic}</span><b>${n}</b><small>${d}</small><span class="price">${ok?"Play ▶":"🔒 🪙 "+p+" in the shop"}</span></button>`}).join("")}</div>`;
  bindBack();
  $$("[data-g]").forEach(b=>b.onclick=()=>{const id=b.dataset.g;const gm=GAMES.find(x=>x[0]===id);if(gm[4]&&!has("game:"+id)){SFX.oops();speak(`Buy ${gm[1]} in the shop for ${gm[4]} coins.`,"soft");return}SFX.tap();
    if(id==="bubbles")bubbles("mix");if(id==="hop")hop();if(id==="memory")memory();if(id==="whack")whack()});
}
const winScreen=(title,earn)=>{addCoins(earn);SFX.win();confetti(innerWidth/2,innerHeight/3,120);speak(`${title} You earned ${earn} coins!`,"happy");
  $("#app").innerHTML=`<div class="card done" style="margin-top:6vh"><div class="reward">🪙</div><h2>${title}</h2><p class="target">+${earn} coins · ${coins()} total</p><div class="rowbtns"><button class="big" id="more">More games</button><button class="big ghost" id="map">Map</button></div></div>`;
  $("#more").onclick=()=>{SFX.tap();games()};$("#map").onclick=()=>{SFX.tap();render()}};
const _bub=bubbles;bubbles=function(hw){_bub(hw)};

function hop(){
  const big=S.kids[kid].age>=9;const step=big?pick([2,5,10]):1;const nums=Array.from({length:10},(_,i)=>(i+1)*step);let next=0,t0=Date.now();
  $("#app").innerHTML=topbar("")+`<h2>${big?`Count by ${step}s!`:"Tap 1 to 10 in order!"}</h2><div class="field" id="hf"></div>`;bindBack();
  speak(big?`Tap the numbers counting by ${step}s!`:"Tap the numbers from one to ten!","happy");
  const f=$("#hf");const W=f.clientWidth,H=f.clientHeight;const placed=[];
  shuffle(nums).forEach(n=>{let x,y,tries=0;do{x=rnd(8,Math.max(10,W-80));y=rnd(8,Math.max(10,H-80));tries++}while(tries<60&&placed.some(([a,b])=>Math.hypot(a-x,b-y)<84));placed.push([x,y]);
    const b=document.createElement("button");b.className="hopn";b.textContent=n;b.style.left=x+"px";b.style.top=y+"px";
    b.onclick=()=>{if(n===nums[next]){b.classList.add("done");SFX.count(next);speak(String(n));next++;buzz(8);if(next===nums.length){const s=Math.round((Date.now()-t0)/1000);setTimeout(()=>winScreen(`Done in ${s} seconds!`,s<20?8:5),500)}}else{SFX.oops();b.animate([{transform:"translateX(-8px)"},{transform:"translateX(8px)"},{transform:"none"}],{duration:300})}};f.appendChild(b)});
}
function memory(){
  const big=S.kids[kid].age>=9;let pairs;
  if(big){const fs=shuffle([[3,4],[2,6],[5,5],[4,4],[3,7],[6,2],[9,2],[3,3]]).slice(0,6);pairs=fs.map(([a,b])=>[`${a}×${b}`,String(a*b)])}
  else pairs=shuffle(["🦄","🌈","🐱","🍓","⭐","🐸","🍩","🚀"]).slice(0,6).map(e=>[e,e]);
  const cards=shuffle(pairs.flatMap((p,i)=>[{v:p[0],k:i},{v:p[1],k:i}]));let open=[],found=0,moves=0,lock=false;
  $("#app").innerHTML=topbar("")+`<h2>Memory Match</h2><p class="lede">${big?"Match each times fact with its answer.":"Find the matching pairs."}</p><div class="card"><div class="mem">${cards.map((c,i)=>`<button class="mcard" data-m="${i}">?</button>`).join("")}</div></div>`;bindBack();
  speak(big?"Match each times fact with its answer!":"Find the matching pairs!","happy");
  $$("[data-m]").forEach(b=>b.onclick=()=>{if(lock)return;const i=+b.dataset.m;if(b.classList.contains("open")||b.classList.contains("done"))return;b.classList.add("open");b.textContent=cards[i].v;SFX.tap();open.push([i,b]);
    if(open.length===2){moves++;const[[i1,b1],[i2,b2]]=open;open=[];if(cards[i1].k===cards[i2].k){b1.classList.add("done");b2.classList.add("done");SFX.good();found++;if(found===pairs.length)setTimeout(()=>winScreen(`All pairs in ${moves} goes!`,moves<=9?10:6),600)}
      else{lock=true;setTimeout(()=>{[b1,b2].forEach(x=>{x.classList.remove("open");x.textContent="?"});lock=false},900)}}});
}
function whack(){
  const big=S.kids[kid].age>=9;const rule=big?pick([["even numbers",n=>n%2===0,()=>rnd(1,30)],["multiples of 5",n=>n%5===0,()=>pick([5,10,15,20,25,30,3,7,12,18,22,8])],["multiples of 3",n=>n%3===0,()=>rnd(1,30)]]):["stars",n=>n==="⭐",()=>pick(["⭐","⭐","🍎","🐸","⭐","🌙"])];
  let score=0,time=30,alive=true;
  $("#app").innerHTML=topbar("")+`<h2>Tap the ${rule[0]}!</h2><div class="top"><span class="pill">✅ <b id="ws">0</b></span><span class="pill">⏱ <b id="wt">30</b></span></div><div class="card"><div class="holes">${Array.from({length:9},(_,i)=>`<div class="hole" data-h="${i}"></div>`).join("")}</div></div>`;
  $("#xback").onclick=()=>{alive=false;clearInterval(a);clearInterval(b);SFX.tap();render()};
  speak(`Tap the ${rule[0]} before they hide!`,"happy");
  const holes=[...$$("[data-h]")];
  const a=setInterval(()=>{if(!alive)return;const h=pick(holes);if(h.firstChild)return;const v=rule[2]();const p=document.createElement("button");p.className="pop";p.textContent=v;h.appendChild(p);
    p.onclick=()=>{if(rule[1](v)){score++;SFX.good();buzz(8)}else{score=Math.max(0,score-1);SFX.oops()}$("#ws").textContent=score;p.remove()};setTimeout(()=>p.remove(),big?1100:1500)},still()?1100:700);
  const b=setInterval(()=>{time--;const e=$("#wt");if(e)e.textContent=time;if(time<=0){alive=false;clearInterval(a);clearInterval(b);if($("#ws"))winScreen(`You got ${score}!`,Math.max(2,Math.ceil(score/2)))}},1000);
}

const QUICK=["Hi! 👋","Want to play?","I got a new skin!","I levelled up! 🚀","Good job!","I miss you","Love you 💖","That's funny 😂","See you soon!"];
const EMO=["😀","😂","🥰","😎","🤩","😮","😢","👍","🦄","⛏️","🌈","💎"];
function chat(){
  const other=kid===0?1:0;const me=S.kids[kid],them=S.kids[other];S.seen[kid]=Date.now();save();
  const draw=()=>{const log=$("#log");log.innerHTML=S.chat.slice(-60).map((m,i)=>{const mine=m.from===kid;const onlyEmo=/^\p{Extended_Pictographic}+$/u.test(m.text.replace(/\s/g,""));return`<button class="cmsg ${mine?"me":"them"} ${onlyEmo?"big":""}" data-say="${S.chat.length-Math.min(60,S.chat.length)+i}"><small>${mine?"You":S.kids[m.from].name}</small>${m.text.replace(/</g,"&lt;")}</button>`}).join("")||`<p class="lede">No messages yet. Say hi to ${them.name}!</p>`;log.scrollTop=log.scrollHeight;
    $$("[data-say]").forEach(b=>b.onclick=()=>{const m=S.chat[+b.dataset.say];speak(`${m.from===kid?"You said":S.kids[m.from].name+" said"}: ${m.text}`)})};
  const send=t=>{t=t.trim().slice(0,140);if(!t)return;S.chat.push({from:kid,to:other,text:t,t:Date.now()});save();SFX.pop();draw();speak(t,"happy")};
  $("#app").innerHTML=topbar(`💬 Chat with ${them.face} ${them.name}`)+`<p class="lede">Tap a message to hear it. Messages stay on this tablet for ${them.name} to read.</p>
   <div class="chatlog" id="log"></div>
   <div class="quick">${QUICK.map(q=>`<button class="qbtn" data-q="${q}">${q}</button>`).join("")}</div>
   <div class="quick">${EMO.map(e=>`<button class="qbtn emo" data-q="${e}">${e}</button>`).join("")}</div>
   <div class="chatin"><input id="cin" type="text" maxlength="140" placeholder="Type a message…" aria-label="Message"><button class="big" id="csend">Send</button></div>`;
  bindBack();draw();speak(`Chat with ${them.name}!`,"happy");
  $$("[data-q]").forEach(b=>b.onclick=()=>send(b.dataset.q));
  $("#csend").onclick=()=>{send($("#cin").value);$("#cin").value=""};
  $("#cin").onkeydown=e=>{if(e.key==="Enter"){send(e.target.value);e.target.value=""}};
}

const _parent=parent;parent=function(){_parent();const box=$(".parent");if(!box)return;
  box.insertAdjacentHTML("afterbegin",`<div class="prow"><span>Extra-clear text (bolder, bigger, black)</span><button class="switch" id="clear" aria-pressed="${S.settings.clear}">${S.settings.clear?"On":"Off"}</button></div>
  <div class="prow"><span>Coins: ${S.kids.map((k,i)=>`${k.name} 🪙 ${S.coins[i]||0}`).join(" · ")}</span><button class="switch" id="clearchat">Clear chat</button></div>`);
  $("#clear").onclick=()=>{S.settings.clear=!S.settings.clear;save();document.body.classList.toggle("clear",S.settings.clear);parent()};
  let arm=false;$("#clearchat").onclick=e=>{if(!arm){arm=true;e.target.textContent="Tap again to confirm";return}S.chat=[];save();parent()}};
render();
})();

;
/* sync.js */
(function(){
const SB="https://sxrvuqfkdajwalgjkidw.supabase.co/rest/v1/rpc/";
const AK="sb_publishable_Qv-NOZMwDF-cUlJhkSVIJw_QdlQvnTT";
if(!S.log)S.log=[];if(S.synced===undefined)S.synced=0;if(!S.family)S.family="";if(!S.device)S.device="";
const rpc=async(fn,body)=>{const r=await fetch(SB+fn,{method:"POST",headers:{apikey:AK,"Content-Type":"application/json"},body:JSON.stringify(body)});if(!r.ok)throw new Error(await r.text());return r.json()};
window.PI={rpc,online:()=>!!S.family};
const cid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
function logEv(kind,o={}){if(kid===null&&o.kid===undefined)return;const e={cid:cid(),kid:o.kid??kid,kind,world:o.world??null,level:o.level??null,ok:o.ok??null,ms:o.ms??null,data:o.data??null,device:S.device||null,at:new Date().toISOString()};
  S.log.push(e);if(S.log.length>6000){const cut=S.log.length-6000;S.log.splice(0,cut);S.synced=Math.max(0,S.synced-cut)}save();if(S.family&&S.log.length-S.synced>=10)flush()}
window.logEv=logEv;
let flushing=false;
async function flush(){if(!S.family||flushing||S.synced>=S.log.length)return;flushing=true;
  try{while(S.synced<S.log.length){const batch=S.log.slice(S.synced,S.synced+400);await rpc("pi_log",{p_key:S.family,p_events:batch});S.synced+=batch.length;save()}}catch(e){}finally{flushing=false}}
window.PIflush=flush;
setInterval(flush,20000);addEventListener("visibilitychange",()=>{if(document.hidden)flush()});

const qstart={t:0};
const _next=next;
next=function(){
  if(round&&round.place&&round.place.finished){return placeResult()}
  if(round&&round.place){const pl=round.place;const w=round.w;
    round.q=GEN[w](pl.L);round.qLevel=pl.L;round.tag="check";round.tries=0;round.counted=0;round.whyDone=false;round.whyStage=false;qstart.t=Date.now();render();
    setTimeout(()=>round&&speak((pl.asked===0?`Quick check-up, ${NAME()}! Let's see what you already know. `:"")+round.q.say),300);return}
  if(round&&!round.mix){const p=prog(round.w);const w=WORLDS.find(x=>x.id===round.w);
    if(!p.placed&&w.max>1){return startPlacement(round.w)}
    const n=round.n;let L=p.lvl,tag="";
    if(n===2&&p.lvl<w.max){L=p.lvl+1;tag="challenge"}else if(n===4&&p.lvl>1&&Math.random()<.6){L=p.lvl-1;tag="review"}
    round.q=GEN[round.w](L);round.qLevel=L;round.tag=tag;round.tries=0;round.counted=0;round.whyDone=false;round.whyStage=false;qstart.t=Date.now();render();
    if(tag==="challenge")setTimeout(()=>pip("happy","⭐ Challenge question!"),200);
    if(tag==="review")setTimeout(()=>pip("happy","🔁 Remember this one?"),200);
    setTimeout(()=>round&&round.q&&speak((n===0?`Let's go, ${NAME()}! `:tag==="challenge"?"Ooh, a challenge question! ":tag==="review"?"Let's see if you remember this one. ":OPENER())+round.q.say),300);return}
  _next();round.qLevel=prog(round.w).lvl;round.tag="";qstart.t=Date.now()};

function startPlacement(w){const p=prog(w);const W=WORLDS.find(x=>x.id===w);const start=Math.min(W.max,S.kids[kid].age>=9?2:1);
  round.place={L:start,start,asked:0,okAt:0,passed:0,lvlAsked:0,finished:false,log:[]};
  $("#app").innerHTML=`<div class="card done" style="margin-top:6vh"><div class="reward">🔍</div><h2>Quick check-up!</h2><p class="lede">A few questions so ${W.name} starts at just the right level for you. No pressure, just do your best!</p><div class="rowbtns"><button class="big" id="go">Let's go!</button></div></div>`;
  speak(`Before we start ${W.name}, let's do a quick check-up so it's just right for you!`,"happy");
  $("#go").onclick=()=>{SFX.tap();next()}}
function placeStep(ok){const pl=round.place;const W=WORLDS.find(x=>x.id===round.w);pl.asked++;pl.lvlAsked++;pl.log.push([pl.L,ok]);
  if(ok)pl.okAt++;
  if(pl.lvlAsked>=2||!ok){
    if(pl.okAt===2){pl.passed=pl.L;if(pl.L>=W.max)pl.finished=true;else{pl.L++;pl.lvlAsked=0;pl.okAt=0}}
    else if(!ok){if(pl.passed===0&&pl.L>1&&pl.L===pl.start&&!pl.down){pl.down=true;pl.L--;pl.lvlAsked=0;pl.okAt=0}else pl.finished=true}
  }
  if(pl.asked>=12)pl.finished=true}
function placeResult(){const pl=round.place;const w=round.w;const W=WORLDS.find(x=>x.id===w);const p=prog(w);
  const lvl=pl.passed?Math.min(W.max,pl.passed+(pl.passed>=W.max?0:1)):1;p.lvl=lvl;p.best=Math.max(p.best||0,pl.passed||0);p.placed=true;p.streak=0;p.miss=0;save();
  logEv("placement",{world:w,level:lvl,data:{passed:pl.passed,answers:pl.log}});
  const target=(typeof CURR!=="undefined"&&CURR[w]&&CURR[w][lvl-1])?CURR[w][lvl-1][0]:"";
  round=null;SFX.win();confetti(innerWidth/2,innerHeight/3,100);
  $("#app").innerHTML=`<div class="card done" style="margin-top:6vh"><div class="reward">🎯</div><h2>Check-up done!</h2><p class="lede">You're starting ${W.name} at level ${lvl} of ${W.max}${target?`: ${target}`:""}.</p><div class="rowbtns"><button class="big" id="go">Start playing</button><button class="big ghost" id="map">Map</button></div></div>`;
  speak(`Great job! You're starting at level ${lvl}. Let's play!`,"happy");
  $("#go").onclick=()=>{SFX.tap();round={home:w,mix:false,w,n:0,first:0};combo=0;next()};$("#map").onclick=()=>{SFX.tap();render()}}
window.retest=(k,w)=>{const ps=S.progress[k]||{};if(ps[w]){ps[w].placed=false;save()}};

const _corr=correct;
correct=function(x,y,s){
  const ok=round.tries===0;const w=round.w;const L=round.qLevel;const ms=Date.now()-qstart.t;const tag=round.tag||"";
  logEv("answer",{world:w,level:L,ok,ms,data:tag?{tag}:null});
  if(round.place){const p=prog(w);const keep={lvl:p.lvl,streak:p.streak,miss:p.miss,best:p.best};placeStep(ok);_corr(x,y,s);Object.assign(p,keep);round.n=Math.max(0,round.n-1);save();return}
  const p=prog(w);const before=p.lvl;
  if(tag==="challenge"&&ok)p.streak++;
  _corr(x,y,s);
  if(p.lvl>before)logEv("levelup",{world:w,level:p.lvl})};
const _miss=miss;miss=function(){const p=prog(round.w);const before=p.lvl;if(round.place)return;if(round.tag==="challenge"){return}_miss();if(p.lvl<before)logEv("leveldown",{world:round.w,level:p.lvl})};
const _done=done;done=function(){const w=round.w,first=round.first;_done();logEv("round",{world:w,data:{first}});flush()};

const _home=home;home=function(){_home();const top=$(".top");if(top&&!$("#hubbtn"))top.insertAdjacentHTML("beforeend",`<button class="pill" id="hubbtn">👩 Audrey's Hub</button>`);const b=$("#hubbtn");if(b)b.onclick=()=>{SFX.tap();typeof openHub==="function"&&openHub()};
  $$("[data-k]").forEach(btn=>{const o=btn.onclick;btn.onclick=e=>{const k=+btn.dataset.k;logEv("session",{kid:k});o&&o(e)}})};

let poll=0,cloudMsgs=[],lastId=0;
async function pull(){if(!S.family)return;try{const rows=await rpc("pi_messages",{p_key:S.family,p_after:lastId});if(rows.length){rows.reverse().forEach(r=>{if(!cloudMsgs.some(m=>m.id===r.id))cloudMsgs.push(r)});lastId=Math.max(lastId,...rows.map(r=>r.id));cloudMsgs.sort((a,b)=>a.id-b.id);return true}}catch(e){}return false}
const cloudChat=function(){
  const other=kid===0?1:0;const them=S.kids[other];
  $("#app").innerHTML=`<div class="top"><button class="pill" id="xback">← Map</button><span class="pill" id="net">🟢 Connected</span></div><h2>💬 Chat with ${them.face} ${them.name}</h2><p class="lede">Tap a message to hear it. ${them.name} sees these on their own tablet.</p>
   <div class="chatlog" id="log"><p class="lede">Loading messages…</p></div>
   <div class="quick">${["Hi! 👋","Want to play?","I got a new skin!","I levelled up! 🚀","Good job!","I miss you","Love you 💖","That's funny 😂","See you soon!"].map(q=>`<button class="qbtn" data-q="${q}">${q}</button>`).join("")}</div>
   <div class="quick">${["😀","😂","🥰","😎","🤩","😮","😢","👍","🦄","⛏️","🌈","💎"].map(e=>`<button class="qbtn emo" data-q="${e}">${e}</button>`).join("")}</div>
   <div class="chatin"><input id="cin" type="text" maxlength="140" placeholder="Type a message…" aria-label="Message"><button class="big" id="csend">Send</button></div>`;
  const draw=()=>{const log=$("#log");if(!log)return;const ms=cloudMsgs.slice(-80);
    log.innerHTML=ms.map((m,i)=>{const mine=m.from_kid===kid;const onlyEmo=/^\p{Extended_Pictographic}+$/u.test(m.body.replace(/\s/g,""));return`<button class="cmsg ${mine?"me":"them"} ${onlyEmo?"big":""}" data-say="${i}"><small>${mine?"You":S.kids[m.from_kid].name} · ${new Date(m.created_at).toLocaleTimeString([], {hour:"numeric",minute:"2-digit"})}</small>${m.body.replace(/</g,"&lt;")}</button>`}).join("")||`<p class="lede">No messages yet. Say hi to ${them.name}!</p>`;
    log.scrollTop=log.scrollHeight;$$("[data-say]").forEach(b=>b.onclick=()=>{const m=ms[+b.dataset.say];speak(`${m.from_kid===kid?"You said":S.kids[m.from_kid].name+" said"}: ${m.body}`)});S.seen[kid]=Date.now();S.seenId=S.seenId||{};S.seenId[kid]=lastId;save()};
  const stop=()=>{clearInterval(poll);poll=0};
  $("#xback").onclick=()=>{stop();SFX.tap();render()};
  const send=async t=>{t=t.trim().slice(0,140);if(!t)return;SFX.pop();speak(t,"happy");try{await rpc("pi_send",{p_key:S.family,p_from:kid,p_body:t});await pull();draw()}catch(e){$("#net").textContent="🔴 Not sent, check internet";SFX.oops()}};
  $$("[data-q]").forEach(b=>b.onclick=()=>send(b.dataset.q));
  $("#csend").onclick=()=>{send($("#cin").value);$("#cin").value=""};$("#cin").onkeydown=e=>{if(e.key==="Enter"){send(e.target.value);e.target.value=""}};
  pull().then(draw);stop();poll=setInterval(async()=>{if(!$("#log")){stop();return}const n=await pull();if(n){draw();SFX.count(3)}},4000);
  speak(`Chat with ${them.name}!`,"happy")};
const _map=map;map=function(){_map();const cb=$("#chatbtn");if(cb){const o=cb.onclick;cb.onclick=e=>{if(S.family){SFX.tap();cloudChat()}else o&&o(e)}}if(!S.family)return;const myLast=(S.seenId||{})[kid]||0;
  pull().then(()=>{const u=cloudMsgs.filter(m=>m.to_kid===kid&&m.id>myLast).length;const b=$("#chatbtn");if(b&&u&&!b.querySelector(".dot")){b.insertAdjacentHTML("beforeend",`<span class="dot">${u}</span>`);pip("happy",`${u} new message${u>1?"s":""}!`)}})};

const _parent=parent;parent=function(){_parent();const box=$(".parent");if(!box)return;
  box.insertAdjacentHTML("afterbegin",`<div class="prow"><span style="display:grid;gap:6px">${S.family?`🟢 Connected to family cloud${S.device?` as “${S.device}”`:""}`:"Connect this tablet to the family cloud (for chat between tablets and Audrey's reports)"}
   <span style="display:flex;gap:8px;flex-wrap:wrap"><input type="text" id="famkey" placeholder="Family code e.g. PEBBLE-XXXX-XXXX-XXXX" value="${S.family}" style="width:300px"><input type="text" id="devname" placeholder="Tablet name e.g. Ivy's iPad" value="${S.device}" style="width:200px"></span></span><button class="switch" id="famgo">${S.family?"Update":"Connect"}</button></div>`);
  $("#famgo").onclick=async()=>{const k=$("#famkey").value.trim().toUpperCase();const d=$("#devname").value.trim().slice(0,40);const btn=$("#famgo");btn.textContent="Checking…";
    try{const ok=k?await rpc("pi_check",{p_key:k}):false;if(k&&!ok){btn.textContent="Code not found";return}S.family=k;S.device=d;save();await flush();parent()}catch(e){btn.textContent="No internet?"}};
  const sec=document.createElement("div");sec.className="prow";sec.innerHTML=`<span>Re-run the check-up for an island (finds the right starting level again)</span><span style="display:flex;gap:6px;flex-wrap:wrap">${S.kids.map((k,i)=>`<select id="rt${i}" aria-label="Island for ${k.name}" style="font:inherit;padding:8px;border-radius:10px">${WORLDS.filter(w=>w.max>1).map(w=>`<option value="${w.id}">${w.name}</option>`).join("")}</select><button class="switch" data-rt="${i}">${k.name}</button>`).join("")}</span>`;
  box.appendChild(sec);$$("[data-rt]").forEach(b=>b.onclick=()=>{const i=+b.dataset.rt;retest(i,$("#rt"+i).value);b.textContent="✓ Next visit";})};
if(S.family)flush();
render();
})();

;
/* audrey.js */
(function(){
const css=`.hub{max-width:1000px;margin:0 auto;padding:12px;color:#14262c}.hub .hc{background:#fff;border-radius:18px;padding:16px;margin:12px 0;box-shadow:0 2px 10px #0002}
.hub h3{margin:0 0 8px}.hub table{width:100%;border-collapse:collapse;font-size:15px}.hub td,.hub th{padding:6px;border-bottom:1px solid #dde;text-align:left}
.hub .tabs{display:flex;gap:6px;flex-wrap:wrap}.hub .tabs button{font:inherit;padding:10px 14px;border-radius:12px;border:2px solid #14262c;background:#fff;color:#14262c}.hub .tabs button.on{background:#14262c;color:#fff}
.hub .kpi{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px}.hub .kpi div{background:#eef6f7;border-radius:12px;padding:10px}.hub .kpi b{display:block;font-size:26px}
.hub .bar{height:12px;background:#dde;border-radius:6px;overflow:hidden}.hub .bar i{display:block;height:100%;background:#1f7a5a}
.hub .chips span{display:inline-block;background:#eef6f7;border-radius:10px;padding:4px 8px;margin:2px;font-size:14px}
@media print{.hub .tabs,.hub .noprint,#mascot,#bubble,.scene{display:none!important}.hub .hc{box-shadow:none;break-inside:avoid}body{background:#fff!important}}`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
const AREAS={English:["words","read","think"],Mathematics:["nums","pv","times","frac","shapes","time","money","data"],Science:["sci"],"HASS (History & Geography)":["geo","hist"],"Health & PE (wellbeing)":["feel"]};
const OFFLINE=["The Arts","Technologies","Languages","Science","HASS (History & Geography)"];
const IDEAS={English:"Read a picture book together daily; ask 'what happened first, next, last?' and 'how do you know?'",Mathematics:"Use real objects: coins at the shop, measuring cups when baking, clocks at transitions.",Science:"Nature walk: collect leaves, sort by shape/colour, predict what floats or sinks.","HASS (History & Geography)":"Draw a map of your street; talk about family history with photos.","The Arts":"Use the art print-offs; music & dance breaks; build with blocks and describe it.",Technologies:"Follow a recipe as an 'algorithm'; Block Builder planning: draw it first, then build.",Languages:"Learn 5 words in a language a family member speaks, e.g. greetings.","Health & PE (wellbeing)":"Movement breaks every 15 min; name feelings using the Feelings island."};
const fmt=ms=>{const m=Math.round(ms/60000);return m<60?m+" min":(m/60).toFixed(1)+" h"};
const day=d=>new Date(d).toLocaleDateString("en-AU",{weekday:"short",day:"numeric",month:"short"});
let tab="overview",who=0,data=null;
async function load(){let ev=(S.log||[]).slice();let src="this tablet";
  if(S.family&&window.PI){try{await PIflush();const since=new Date(Date.now()-90*864e5).toISOString();const rows=await PI.rpc("pi_events",{p_key:S.family,p_since:since});
    if(Array.isArray(rows)&&rows.length){const seen=new Set(ev.map(e=>e.cid));rows.forEach(r=>{const c=r.client_id||r.cid;if(!seen.has(c)){seen.add(c);ev.push({cid:c,kid:r.kid,kind:r.kind,world:r.world,level:r.level,ok:r.ok,ms:r.ms,data:r.data,device:r.device,at:r.at})}});src="all family tablets"}}catch(e){src="this tablet (cloud offline)"}}
  ev.sort((a,b)=>a.at<b.at?-1:1);return{ev,src}}
function sessions(ev,k){const a=ev.filter(e=>e.kid===k&&e.kind==="answer");const out=[];let cur=null;
  a.forEach(e=>{const t=+new Date(e.at);if(!cur||t-cur.end>10*60000){cur={start:t,end:t,n:0,ok:0,worlds:new Set()};out.push(cur)}cur.end=t;cur.n++;if(e.ok)cur.ok++;cur.worlds.add(e.world)});
  out.forEach(s=>s.dur=Math.max(60000,s.end-s.start+30000));return out}
function stats(ev,k){const a=ev.filter(e=>e.kid===k&&e.kind==="answer");const by={};
  a.forEach(e=>{const b=by[e.world]=by[e.world]||{n:0,ok:0,recent:[],ms:0,ch:0,chok:0,rv:0,rvok:0};b.n++;if(e.ok)b.ok++;b.ms+=e.ms||0;b.recent.push(e.ok?1:0);const tg=e.data&&e.data.tag;if(tg==="challenge"){b.ch++;if(e.ok)b.chok++}if(tg==="review"){b.rv++;if(e.ok)b.rvok++}});
  Object.values(by).forEach(b=>{b.recent=b.recent.slice(-20)});return by}
function acquired(ev,k){const p=S.progress[k]||{};const out=[];
  WORLDS.filter(w=>w.max>1&&CURR[w.id]).forEach(w=>{const best=Math.max((p[w.id]||{}).best||0,((p[w.id]||{}).lvl||1)-1);
    for(let l=1;l<=best;l++){const r=CURR[w.id][l-1];if(!r)continue;const lu=ev.find(e=>e.kid===k&&e.world===w.id&&(e.kind==="levelup"&&e.level===l+1||e.kind==="placement"&&e.data&&e.data.passed>=l));out.push({w,l,act:r[0],code:r[1],skill:r[2],at:lu?lu.at:null})}});return out}
function nextSteps(ev,k){const p=S.progress[k]||{};const by=stats(ev,k);const out=[];
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
function coverage(ev,k){const by=stats(ev,k);const since=Date.now()-7*864e5;const wk=ev.filter(e=>e.kid===k&&e.kind==="answer"&&+new Date(e.at)>since);
  return Object.entries(AREAS).map(([a,ws])=>({a,n:wk.filter(e=>ws.includes(e.world)).length,total:ws.reduce((s,w)=>s+((by[w]||{}).n||0),0)}))}
function view(){const {ev,src}=data;const k=who;const K=S.kids[k];const ss=sessions(ev,k);const by=stats(ev,k);const acq=acquired(ev,k);const ns=nextSteps(ev,k);
  const wk=ss.filter(s=>s.start>Date.now()-7*864e5);const tot=wk.reduce((a,s)=>a+s.dur,0);const ans=wk.reduce((a,s)=>a+s.n,0);const ok=wk.reduce((a,s)=>a+s.ok,0);
  const tabs=[["overview","📊 Overview"],["sessions","⏱️ Sessions"],["learning","📚 Learning"],["skills","🏅 Capabilities"],["next","➡️ Next steps"],["plan","🗓️ Home-ed plan"],["chat","💬 Chat log"],["report","🖨️ Report"]];
  let body="";
  if(tab==="overview"){const days=[...Array(7)].map((_,i)=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-6+i);const t=+d;return{d,m:ss.filter(s=>s.start>=t&&s.start<t+864e5).reduce((a,s)=>a+s.dur,0)}});const mx=Math.max(1,...days.map(x=>x.m));
    body=`<div class="hc"><h3>${K.face} ${K.name}: last 7 days</h3><div class="kpi"><div><b>${fmt(tot)}</b>learning time</div><div><b>${wk.length}</b>sessions</div><div><b>${ans}</b>questions</div><div><b>${ans?Math.round(ok/ans*100):0}%</b>right first try</div><div><b>${acq.length}</b>curriculum skills gained</div><div><b>${S.coins&&S.coins[k]||0}</b>coins</div></div></div>
    <div class="hc"><h3>Daily minutes</h3>${days.map(x=>`<div style="display:flex;gap:8px;align-items:center;margin:4px 0"><span style="width:110px">${day(x.d)}</span><div class="bar" style="flex:1"><i style="width:${x.m/mx*100}%"></i></div><span style="width:60px">${Math.round(x.m/60000)}m</span></div>`).join("")}</div>
    <div class="hc"><h3>Top priorities</h3><ul>${ns.slice(0,3).map(n=>`<li><b>${n.w.name}</b>: ${n.note}</li>`).join("")}</ul></div>`}
  if(tab==="sessions")body=`<div class="hc"><h3>Sessions</h3><p>A session = play with no more than a 10 minute gap.</p><table><tr><th>When</th><th>Length</th><th>Questions</th><th>First-try</th><th>Islands</th></tr>${ss.slice(-40).reverse().map(s=>`<tr><td>${day(s.start)} ${new Date(s.start).toLocaleTimeString("en-AU",{hour:"numeric",minute:"2-digit"})}</td><td>${fmt(s.dur)}</td><td>${s.n}</td><td>${Math.round(s.ok/s.n*100)}%</td><td>${[...s.worlds].map(w=>(WORLDS.find(x=>x.id===w)||{}).name||w).join(", ")}</td></tr>`).join("")||"<tr><td colspan=5>No sessions yet.</td></tr>"}</table></div>`;
  if(tab==="learning")body=`<div class="hc"><h3>Islands and levels</h3><table><tr><th>Island</th><th>Level</th><th>Now working on</th><th>Accuracy (last 20)</th><th>Avg time</th><th>Challenge ⭐</th></tr>${WORLDS.filter(w=>w.max>1).map(w=>{const p=(S.progress[k]||{})[w.id]||{};const b=by[w.id];const r=CURR[w.id]&&CURR[w.id][(p.lvl||1)-1];const acc=b&&b.recent.length?Math.round(b.recent.reduce((x,y)=>x+y,0)/b.recent.length*100):null;
    return`<tr><td>${w.name}</td><td>${p.placed?(p.lvl||1)+" / "+w.max:"not checked"}</td><td>${r?r[0]+` <small>(${r[1]})</small>`:""}</td><td>${acc===null?"—":`<div class="bar"><i style="width:${acc}%"></i></div>${acc}%`}</td><td>${b?Math.round(b.ms/b.n/1000)+"s":"—"}</td><td>${b&&b.ch?b.chok+"/"+b.ch:"—"}</td></tr>`}).join("")}</table>
    <p class="noprint">The app checks each island's starting level, moves up after a run of first-try answers, mixes in a harder ⭐ challenge and a 🔁 review question every round, and drops back after repeated misses.</p></div>`;
  if(tab==="skills")body=`<div class="hc"><h3>Acquired capabilities (Australian Curriculum v9)</h3><table><tr><th>Island</th><th>Skill</th><th>AC9 code</th><th>Thinking skill</th><th>Achieved</th></tr>${acq.map(a=>`<tr><td>${a.w.name}</td><td>${a.act}</td><td>${a.code}</td><td>${a.skill}</td><td>${a.at?day(a.at):"✓"}</td></tr>`).join("")||"<tr><td colspan=5>None yet: they appear as levels are passed.</td></tr>"}</table></div>`;
  if(tab==="next")body=`<div class="hc"><h3>Next steps</h3><table><tr><th>Island</th><th>Next target</th><th>Advice</th></tr>${ns.map(n=>`<tr><td>${n.w.name}</td><td>${n.r?n.r[0]+` <small>${n.r[1]}</small>`:""}</td><td>${n.note}</td></tr>`).join("")}</table><p>Printable sheets for each subject are in the Pebble Island Printables PDF.</p></div>`;
  if(tab==="plan"){const cov=coverage(ev,k);const pr=ns.filter(n=>n.pri<=1).slice(0,5);const dn=["Mon","Tue","Wed","Thu","Fri"];
    body=`<div class="hc"><h3>This week's coverage</h3><table><tr><th>Learning area</th><th>Questions this week</th><th>All time</th></tr>${cov.map(c=>`<tr><td>${c.a}</td><td>${c.n}</td><td>${c.total}</td></tr>`).join("")}${OFFLINE.filter(a=>!AREAS[a]).map(a=>`<tr><td>${a}</td><td colspan=2><i>Offline: see ideas below</i></td></tr>`).join("")}</table></div>
    <div class="hc"><h3>Suggested week (${K.name})</h3><p>${k===1?"Short bursts (10–15 min) with movement breaks between. Fast pace is on.":"Gentle sessions of 10 min, read-aloud on, celebrate effort."}</p><table><tr><th>Day</th><th>App (15–20 min)</th><th>Offline</th></tr>${dn.map((d,i)=>{const n=pr[i%Math.max(1,pr.length)];const a=OFFLINE[i];return`<tr><td>${d}</td><td>${n?n.w.name+": "+(n.r?n.r[0]:""):"Mixed island"}</td><td><b>${a}</b>: ${IDEAS[a]}</td></tr>`}).join("")}</table></div>
    <div class="hc"><h3>Ideas by learning area</h3><ul>${Object.entries(IDEAS).map(([a,t])=>`<li><b>${a}</b>: ${t}</li>`).join("")}</ul><p><small>The app covers English, Maths, Science, History, Geography and part of Health. Science and HASS still benefit from hands-on offline work. Keep a simple journal or photos of offline work for any home-education registration review. Check your state's requirements.</small></p></div>`}
  if(tab==="chat"){body=`<div class="hc"><h3>Chat between Ivy and Hayden</h3><div id="hchat">Loading…</div></div>`}
  if(tab==="report"){const p=S.progress[k]||{};body=`<div class="hc"><h2>Learning report: ${K.name}</h2><p>Generated ${new Date().toLocaleDateString("en-AU",{day:"numeric",month:"long",year:"numeric"})} · data from ${src}</p>
    <p><b>Last 7 days:</b> ${fmt(tot)} over ${wk.length} sessions, ${ans} questions, ${ans?Math.round(ok/ans*100):0}% right first try.</p>
    <h3>Current levels</h3><ul>${WORLDS.filter(w=>w.max>1).map(w=>{const q=p[w.id]||{};const r=CURR[w.id]&&CURR[w.id][(q.lvl||1)-1];return`<li>${w.name}: level ${q.lvl||1}/${w.max}${r?`, working on ${r[0]} (${r[1]})`:""}</li>`}).join("")}</ul>
    <h3>Capabilities achieved</h3><ul>${acq.map(a=>`<li>${a.act} (${a.code})</li>`).join("")||"<li>None yet</li>"}</ul>
    <h3>Next steps</h3><ul>${ns.slice(0,6).map(n=>`<li>${n.w.name}: ${n.note}</li>`).join("")}</ul>
    <h3>Parent notes</h3><div contenteditable="true" style="min-height:80px;border:1px dashed #889;border-radius:10px;padding:8px">Tap to add notes…</div>
    <div class="noprint" style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap"><button class="big" id="prt">🖨️ Print / save PDF</button><button class="big ghost" id="cpy">📋 Copy text</button></div></div>`}
  $("#app").innerHTML=`<div class="hub"><div class="top noprint"><button class="pill" id="hback">← Home</button><span class="pill">Data: ${src}</span></div><h2>👩 Audrey's Hub</h2>
   <div class="tabs noprint">${S.kids.map((x,i)=>`<button data-who="${i}" class="${i===who?"on":""}">${x.face} ${x.name}</button>`).join("")}</div>
   <div class="tabs noprint" style="margin-top:8px">${tabs.map(([t,n])=>`<button data-tab="${t}" class="${t===tab?"on":""}">${n}</button>`).join("")}</div>${body}</div>`;
  $("#hback").onclick=()=>{SFX.tap();kid=null;render()};
  $$("[data-who]").forEach(b=>b.onclick=()=>{who=+b.dataset.who;view()});$$("[data-tab]").forEach(b=>b.onclick=()=>{tab=b.dataset.tab;view()});
  if($("#prt"))$("#prt").onclick=()=>{try{print()}catch(e){}};
  if($("#cpy"))$("#cpy").onclick=()=>{const t=$(".hub .hc").innerText;navigator.clipboard&&navigator.clipboard.writeText(t).then(()=>$("#cpy").textContent="✓ Copied")};
  if(tab==="chat"){(async()=>{let ms=[];if(S.family){try{ms=(await PI.rpc("pi_messages",{p_key:S.family,p_after:0})).reverse().map(m=>({from:m.from_kid,t:m.body,at:m.created_at}))}catch(e){}}else ms=(S.chat||[]).map(m=>({from:m.from,t:m.t||m.text,at:m.at}));
    const el=$("#hchat");if(el)el.innerHTML=ms.length?`<table>${ms.slice(-100).map(m=>`<tr><td>${m.at?day(m.at)+" "+new Date(m.at).toLocaleTimeString("en-AU",{hour:"numeric",minute:"2-digit"}):""}</td><td>${(S.kids[m.from]||{}).name||"?"}</td><td>${String(m.t||"").replace(/</g,"&lt;")}</td></tr>`).join("")}</table>`:"No messages yet."})()}}
window.openHub=function(){const a=3+Math.floor(Math.random()*6),b=4+Math.floor(Math.random()*6);
  $("#app").innerHTML=`<div class="card done" style="margin-top:6vh"><div class="reward">🔒</div><h2>Grown-ups only</h2><p class="lede">What is ${a} × ${b}?</p><div class="chatin"><input id="gate" type="number" inputmode="numeric" aria-label="Answer"><button class="big" id="gok">Open</button></div><div class="rowbtns"><button class="big ghost" id="gx">Back</button></div></div>`;
  $("#gx").onclick=()=>render();const go=async()=>{if(+$("#gate").value!==a*b){$("#gate").value="";SFX.oops();return}$("#app").innerHTML=`<div class="card done"><h2>Loading Audrey's Hub…</h2></div>`;data=await load();view()};
  $("#gok").onclick=go;$("#gate").onkeydown=e=>{if(e.key==="Enter")go()};$("#gate").focus()};
})();

;
/* hotfix.js */
(function(){const s=document.createElement("style");s.textContent=".world .lvl i.on{background:#fff!important;outline-color:#fff}#chatbtn{display:none!important}";document.head.appendChild(s)})();

;
/* hub2.js */
(function(){
const css=`body.adult{background:#f6f7f9!important}
body.adult .scene,body.adult #mascot,body.adult #bubble,body.adult .deco,body.adult #fx{display:none!important}
body.adult #app{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif!important;color:#1d2433}
.hub{max-width:960px;padding:24px 16px 48px;color:#1d2433;font-family:inherit}
.hub *{font-family:inherit!important;animation:none!important}
.hub h2{font-size:26px;font-weight:650;margin:8px 0 4px;letter-spacing:-.01em}
.hub h3{font-size:17px;font-weight:600;margin:0 0 12px}
.hub .hc{border-radius:10px;box-shadow:none;border:1px solid #e3e6ea;padding:20px;margin:16px 0}
.hub .top .pill{font-size:14px;padding:8px 14px;border-radius:8px;box-shadow:none;border:1px solid #d5d9df;background:#fff;color:#1d2433}
.hub .tabs{gap:0;border-bottom:1px solid #e3e6ea}
.hub .tabs button{border:0;border-bottom:2px solid transparent;border-radius:0;background:none;color:#5b6576;font-size:15px;padding:10px 14px;font-weight:500}
.hub .tabs button.on{background:none;color:#1d2433;border-bottom-color:#1d2433}
.hub .tabs.kids{border:0;gap:8px;margin:12px 0 4px}
.hub .tabs.kids button{border:1px solid #d5d9df;border-radius:8px;padding:8px 16px}
.hub .tabs.kids button.on{background:#1d2433;color:#fff;border-color:#1d2433}
.hub table{font-size:14px}.hub th{color:#5b6576;font-weight:600;font-size:13px;text-transform:uppercase;letter-spacing:.03em}
.hub td,.hub th{padding:10px 8px;border-bottom:1px solid #eef0f3;vertical-align:top}
.hub .kpi div{background:#f6f7f9;border-radius:8px;padding:14px;color:#5b6576;font-size:13px}.hub .kpi b{color:#1d2433;font-size:24px;font-weight:650;margin-bottom:2px}
.hub .bar{height:8px;background:#eef0f3}.hub .bar i{background:#2f6f5e}
.hub .explain{color:#5b6576;font-size:14px;margin:12px 0 0;line-height:1.5}
.hub .big{font-size:15px;padding:10px 18px;border-radius:8px;box-shadow:none}
.pwgate{max-width:380px;margin:12vh auto;background:#fff;border:1px solid #e3e6ea;border-radius:12px;padding:28px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#1d2433}
.pwgate h2{font-size:22px;margin:0 0 6px}.pwgate p{color:#5b6576;margin:0 0 16px;font-size:15px}
.pwgate input{width:100%;box-sizing:border-box;font-size:17px;padding:12px;border:1px solid #c9ced6;border-radius:8px;margin-bottom:12px}
.pwgate .err{color:#b42318;font-size:14px;min-height:20px}
.pwgate .row{display:flex;gap:8px}.pwgate button{flex:1;font-size:16px;padding:12px;border-radius:8px;border:1px solid #1d2433;background:#1d2433;color:#fff}
.pwgate button.ghost{background:#fff;color:#1d2433;border-color:#c9ced6}`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
const EXPLAIN={overview:"A quick summary of the last 7 days and the three things most worth focusing on.",sessions:"Each block of play, with time and accuracy. Gaps of more than 10 minutes start a new session.",learning:"Current level on each island, what they're working on (with its curriculum code) and how accurate they've been on their last 20 answers.",skills:"Curriculum outcomes they've demonstrated by passing a level.",next:"What to focus on next for each island, most urgent first.",plan:"Which learning areas were covered this week, plus a suggested Monday–Friday plan including subjects the app doesn't cover.",chat:"Messages between Ivy and Hayden.",report:"A summary you can print or save as a PDF for your records."};
const strip=t=>t.replace(/^[^\p{L}\p{N}]+/u,"").trim();
function tidy(){const h=document.querySelector(".hub");if(!h||h.dataset.tidy)return;h.dataset.tidy=1;document.body.classList.add("adult");
  const t=h.querySelectorAll(".tabs");if(t[0])t[0].classList.add("kids");
  h.querySelectorAll(".tabs:not(.kids) button").forEach(b=>b.textContent=strip(b.textContent));
  const h2=h.querySelector(":scope > h2");if(h2)h2.textContent="Audrey's Hub";
  const on=h.querySelector("[data-tab].on");if(on&&t[1])t[1].insertAdjacentHTML("afterend",`<p class="explain">${EXPLAIN[on.dataset.tab]||""}</p>`);
  const kp=h.querySelector("#hchat");if(kp&&!S.family){}
}
new MutationObserver(()=>{if(document.querySelector(".hub"))tidy();else document.body.classList.remove("adult")}).observe(document.getElementById("app"),{childList:true});
const orig=window.openHub;
window.openHub=function(){document.body.classList.add("adult");
  $("#app").innerHTML=`<div class="pwgate"><h2>Audrey's Hub</h2><p>Enter the password to see learning reports.</p><input id="pw" type="password" autocomplete="off" aria-label="Password" placeholder="Password"><div class="err" id="pwerr"></div><div class="row"><button class="ghost" id="pwx">Back</button><button id="pwok">Open</button></div></div>`;
  const go=()=>{if($("#pw").value.trim().toLowerCase()!=="password"){$("#pwerr").textContent="That's not right. Try again.";$("#pw").value="";return}
    orig();const m=($("#app").innerText.match(/(\d+) × (\d+)/));if(m){$("#gate").value=(+m[1])*(+m[2]);$("#gok").click()}};
  $("#pwok").onclick=go;$("#pw").onkeydown=e=>{if(e.key==="Enter")go()};$("#pwx").onclick=()=>{document.body.classList.remove("adult");render()};setTimeout(()=>$("#pw")&&$("#pw").focus(),50)};
})();

;
/* nosnail.js */
(function(){const sw={"snail":["train","🚂"],"shell":["shirt","👕"]};PICS.forEach(p=>{if(sw[p[0]]){const n=sw[p[0]];p[0]=n[0];p[1]=n[1]}});
delete LOOKALIKE.snail;delete LOOKALIKE.shell;LOOKALIKE.train=["rain","trail","tram"];LOOKALIKE.shirt=["short","skirt","shift"];
SKINS.forEach(k=>{if(k.deco)k.deco=k.deco.replace(/\u{1F40C}/gu,"").replace(/\u{1F41A}/gu,"\u{1F42C}")});})();

;
/* focus.js */
(function(){
if(!S.focus)S.focus={1:true};
const on=()=>kid!==null&&!!S.focus[kid];
const css=`.opts.locked .opt{opacity:.45;filter:grayscale(.4)}
.thinkbar{height:10px;border-radius:6px;background:rgba(0,0,0,.12);overflow:hidden;margin:6px 0 10px}.thinkbar i{display:block;height:100%;width:0;background:#f5b700;transition:width linear}
.thinklab{font-weight:700;font-size:15px;opacity:.85}
.boss{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.9);color:#14262c;border-radius:16px;padding:8px 14px;margin:6px 0;box-shadow:0 2px 8px #0002}
.boss .bf{font-size:40px;transition:transform .15s}.boss .bf.hit{transform:scale(.7) rotate(-12deg)}.boss .bf.heal{transform:scale(1.25)}
.boss .hp{flex:1}.boss .hp b{font-size:14px}.boss .hpbar{height:14px;border-radius:7px;background:#eee;overflow:hidden;margin-top:4px}.boss .hpbar i{display:block;height:100%;background:#d23b3b;transition:width .3s}
.boss .hearts{font-size:22px;letter-spacing:2px}
.opt.reveal{outline:4px solid #1f7a5a;background:#dff3ea!important;color:#14262c!important}
.shake{animation:shk .3s}@keyframes shk{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
.brk{position:fixed;inset:0;z-index:50;background:rgba(20,38,44,.92);color:#fff;display:grid;place-items:center;text-align:center;padding:24px}
.brk h2{font-size:34px;margin:0 0 8px}.brk .big{margin-top:16px}.brk .cnt{font-size:64px;font-weight:800}`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
const BOSSES=["👾","🐲","🤖","🦖","🧟","👹","🐙","🦂"];
let unlockAt=0,fastMiss=0,sessStart=Date.now(),lastBreak=Date.now(),lockT=0;

function bossUI(){const r=round;if(!r||!r.boss)return;let el=$("#boss");
  if(!el){const anchor=$(".opts")||$(".tiles")||$(".btnrow")||$(".stage");const host=anchor&&anchor.closest(".left")?anchor.closest(".left").parentElement:null;if(!host)return;
    host.insertAdjacentHTML("beforebegin",`<div class="boss" id="boss"><span class="bf" id="bf">${r.boss.face}</span><div class="hp"><b>${r.boss.name}</b><div class="hpbar"><i id="bhp"></i></div></div><span class="hearts" id="bh"></span></div>`);el=$("#boss")}
  $("#bhp").style.width=Math.max(0,r.boss.hp/r.boss.max*100)+"%";$("#bh").textContent="❤️".repeat(r.boss.hearts)+"🤍".repeat(3-r.boss.hearts)}
function lock(){const box=$(".opts");if(!box||round.whyStage||box.dataset.lk)return;box.dataset.lk=1;
  const len=(round.q&&round.q.say||"").length;let ms=Math.min(4500,1300+len*28);if(fastMiss>=2)ms+=2500;
  box.classList.add("locked");box.insertAdjacentHTML("beforebegin",`<div class="thinklab" id="tl">🧠 Read it… think…</div><div class="thinkbar" id="tb"><i></i></div>`);
  const bar=$("#tb i");requestAnimationFrame(()=>{bar.style.transition=`width ${ms}ms linear`;bar.style.width="100%"});
  unlockAt=Date.now()+ms;clearTimeout(lockT);lockT=setTimeout(()=>{box.classList.remove("locked");const l=$("#tl");if(l)l.textContent="⚡ Go!";SFX.tap()},ms)}
new MutationObserver(()=>{if(!on()||!round||round.place&&false)return;if($(".opts")&&!round.whyStage)lock();bossUI()}).observe($("#app"),{childList:true,subtree:false});

const _next=next;next=function(){
  if(on()&&round&&!round.place&&!round.boss&&round.n===0){const i=Math.floor(Math.random()*BOSSES.length);round.boss={face:BOSSES[i],name:["Glitch","Blaze","Bolt","Rex","Zombo","Grumble","Inky","Stinger"][i],hp:4,max:4,hearts:3}}
  if(on()&&Date.now()-lastBreak>10*60000&&round&&round.n>0)return brainBreak(()=>_next());
  _next()};
const _answer=answer;answer=function(b,o){
  if(!on())return _answer(b,o);
  if(Date.now()<unlockAt&&!round.whyStage){b.classList.remove("shake");void b.offsetWidth;b.classList.add("shake");pip("happy","Read it first! 👀");return}
  const quick=Date.now()-unlockAt<900;const q=round.q;const ok=String(o.v)===String(q.ans)||(q.anyOk&&round.w==="feel");
  if(!ok&&quick&&!round.whyStage){fastMiss++;window.logEv&&logEv("guess",{world:round.w,level:round.qLevel})}
  if(ok)fastMiss=Math.max(0,fastMiss-1);
  _answer(b,o)};
const _wrong=wrong;wrong=function(line){
  if(!on()||!round)return _wrong(line);
  const r=round;if(r.boss){if(r.tries===0){r.boss.hearts=Math.max(0,r.boss.hearts-1);const f=$("#bf");if(f){f.classList.add("heal");setTimeout(()=>f.classList.remove("heal"),300)}}bossUI()}
  if(fastMiss>=2){line="Whoa, slow down! Read it with me, then choose.";fastMiss=2}
  if(r.tries>=1&&!r.whyStage&&$(".opts")){
    r.tries++;SFX.oops();combo=0;const q=r.q;const i=q.opts.findIndex(o=>String(o.v)===String(q.ans));const btns=$$(".opt");
    btns.forEach(x=>x.style.pointerEvents="none");if(btns[i])btns[i].classList.add("reveal");
    const ans=String(q.ans);const m=$("#msg");if(m){m.className="msg try";m.textContent=`It's ${ans}. Remember that one!`}
    speak(`The answer is ${ans}. Let's remember that one.`,"soft");
    window.logEv&&logEv("answer",{world:r.w,level:r.qLevel,ok:false,data:{revealed:true}});
    r.n++;save();setTimeout(()=>{if(round)next()},3200);return}
  _wrong(line)};
const _correct=correct;correct=function(x,y,s){
  if(on()&&round&&round.boss&&round.tries===0){round.boss.hp--;const f=$("#bf");if(f){f.classList.add("hit");setTimeout(()=>f.classList.remove("hit"),200)}bossUI();
    if(round.boss.hp===0&&!round.boss.dead){round.boss.dead=true;setTimeout(()=>{pip("happy",`${round&&round.boss?round.boss.name:"Boss"} defeated! 💥`);SFX.win&&SFX.win()},600)}}
  _correct(x,y,s)};
const _done=done;done=function(){const b=round&&round.boss;_done();
  if(on()&&b){const won=b.hp<=0;if(won){S.coins[kid]=(S.coins[kid]||0)+10;save()}
    const card=$(".card.done");if(card)card.insertAdjacentHTML("afterbegin",`<div class="boss" style="justify-content:center"><span class="bf">${won?"💥":b.face}</span><b>${won?`You beat ${b.name}! +10 🪙`:`${b.name} got away! Get 4 right first try to win.`}</b></div>`);
    window.logEv&&logEv("boss",{world:"",ok:won})}};
function brainBreak(then){lastBreak=Date.now();const moves=["10 star jumps","5 frog jumps","spin around 3 times","touch your toes 10 times","20 seconds of running on the spot","stretch up high like a tree"];const mv=moves[Math.floor(Math.random()*moves.length)];
  document.body.insertAdjacentHTML("beforeend",`<div class="brk" id="brk"><div><h2>⚡ Brain break!</h2><p style="font-size:22px">Do ${mv}!</p><div class="cnt" id="bc">20</div><button class="big" id="bgo" disabled>Wait…</button></div></div>`);
  speak(`Brain break! Do ${mv}!`,"happy");let n=20;const t=setInterval(()=>{n--;const c=$("#bc");if(c)c.textContent=n;if(n<=0){clearInterval(t);const g=$("#bgo");g.disabled=false;g.textContent="I'm ready! ▶"}},1000);
  $("#bgo").onclick=()=>{$("#brk").remove();then()}}
const _parent=parent;parent=function(){_parent();const box=$(".parent");if(!box)return;const row=document.createElement("div");row.className="prow";
  row.innerHTML=`<span>Focus mode: think timer before answering, no guessing through every option (wrong twice shows the answer), boss battles and brain breaks every 10 min</span><span style="display:flex;gap:6px">${S.kids.map((k,i)=>`<button class="switch" data-fo="${i}">${k.name}: ${S.focus[i]?"On":"Off"}</button>`).join("")}</span>`;
  box.appendChild(row);$$("[data-fo]").forEach(b=>b.onclick=()=>{const i=+b.dataset.fo;S.focus[i]=!S.focus[i];save();b.textContent=`${S.kids[i].name}: ${S.focus[i]?"On":"Off"}`})};
})();

