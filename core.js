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

