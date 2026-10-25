(function(){
"use strict";
if(!document.getElementById("app"))return;
const app=()=>document.getElementById("app");
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const who=()=>{try{return typeof kid==="undefined"?null:kid}catch(e){return null}};
const tap=()=>{try{SFX.tap()}catch(e){}};
const good=()=>{try{SFX.good()}catch(e){}};
const win=()=>{try{SFX.win()}catch(e){}};
const calm=()=>{try{return still()}catch(e){return false}};
const readOn=()=>{try{return S.settings.jRead!==false}catch(e){return true}};
const say=t=>{if(readOn())try{speak(t,"soft")}catch(e){}};
const store=()=>{try{save()}catch(e){}};
const age=k=>(S.kids[k]&&S.kids[k].age)||7;
const dino=k=>k===1;
const young=k=>k===0||(k!==1&&age(k)<9);
const uni=k=>k===0;
const lessonYear=k=>young(k)?(age(k)<=5?0:2):4;

function theme(k){
 if(young(k))return uni(k)?{
  young:true,name:"Sparkle's Magic Lab",ico:"🦄",small:"star gem",roller:"turtle",goal:"magic basket",
  intro:"Help Sparkle test how things move."
 }:{
  young:true,name:"Push and Pull Lab",ico:"🧪",small:"ball",roller:"turtle",goal:"basket",
  intro:"Let's test how things move."
 };
 return dino(k)?{
  name:"Dino Physics Lab",ico:"🦖",big:"big stone block",small:"small stone block",light:"feather",roller:"turtle",goal:"nest",
  intro:"Help the dinosaurs test how things move."
 }:{
  name:"Physics Lab",ico:"🧪",big:"big ball",small:"small ball",light:"leaf",roller:"turtle",goal:"basket",
  intro:"Let's test how things move."
 };
}

function rounds(t,k){
 if(t.young){const L=lessonYear(k)===0?"push0":"forces",F=uni(k)?"unicorns":"friends";return pick6(k,[
  {id:"ypush",lesson:L,kind:"push",
   q:"A small push or a big push. Which goes further?",
   opts:["Small push","Big push"],ans:1,
   why:"The big push. A big push makes it go further."},
  {id:"ypull",lesson:L,kind:"pull",
   q:"The rope moves the cart. Is it a push or a pull?",
   opts:["Push","Pull"],ans:1,
   why:"A pull. A pull brings things closer."},
  {id:"ysquash",lesson:L,kind:"squash",
   q:"Push down on the play dough. What happens?",
   opts:["It goes flat","It gets bigger","Nothing"],ans:0,
   why:"It goes flat. A push can change the shape."},
  {id:"yfloors",lesson:L,kind:"floors",
   q:"Which floor lets the "+t.roller+" roll furthest?",
   opts:["Ice","Wood","Grass"],ans:0,
   why:"Ice. It is smooth, so the "+t.roller+" goes far."},
  {id:"ystops",work:["Grass is bumpy: lots of friction.","Ice is smooth: a little friction.","Bumpy slows it fast.","So grass stops it first."],lesson:L,kind:"floors",
   q:"Which floor stops the "+t.roller+" first?",
   opts:["Ice","Grass"],ans:1,
   why:"Grass. It is bumpy, so the "+t.roller+" slows down fast."},
  {id:"ythrow",lesson:L,kind:"throw",
   q:"Throw the "+t.small+" up. What happens?",
   opts:["It floats","It comes down"],ans:1,
   why:"It comes down. Gravity pulls it down."},
  {id:"ymass",learn:"Heavy things are harder to push.",work:["Same push on both boxes.","The light box is easy to push.","So the light box goes further."],lesson:L,kind:"pushmass",
   q:"Same push. A heavy box and a light box. Which goes further?",
   opts:["Heavy box","Light box"],ans:1,
   why:"The light box. Light things are easier to push."},
  {id:"ymagnet",learn:"A magnet pulls some metal things.",work:["The nail is metal.","The magnet pulls it.","Wood is not metal, so it stays."],lesson:L,kind:"magnet",
   q:"The magnet is near a nail and a wood block. Which one moves?",
   opts:["The nail","The wood"],ans:0,
   why:"The nail. A magnet pulls some metal things."},
  {id:"yramp",work:["A low hill is a short way down: slow.","A high hill is a long way down: fast.","Fast goes further. High hill wins."],lesson:L,kind:"heights",
   q:"Low hill or high hill. Which makes the "+t.roller+" go further?",
   opts:["Low hill","High hill"],ans:1,
   why:"The high hill. It goes faster, so it goes further."},
  {id:"ytug",learn:"A bigger pull wins.",work:["One pulls left.","Two pull right.","Two is more than one.","So the rope goes right."],lesson:L,kind:"tug",l:1,r:2,
   q:"One "+(uni(k)?"unicorn":"friend")+" pulls left. Two pull right. Which way does the rope go?",
   opts:["Left","Right","It stays still"],ans:1,
   why:"Right. Two pulling is a bigger pull."}
 ])}
 const pool=[
  {id:"drop",lesson:"gravity4",kind:"drop2",a:"big",b:"small",
   q:"Drop a "+t.big+" and a "+t.small+". Which lands first?",
   opts:["The big one","The small one","Same time"],ans:2,
   why:"They land together. Gravity pulls them down at the same speed."},
  {id:"air",lesson:"gravity4",kind:"drop2",a:"small",b:"light",
   q:"Drop a "+t.small+" and a "+t.light+". Which lands first?",
   opts:["The "+t.small,"The "+t.light,"Same time"],ans:0,
   why:"The "+t.light+" is slower. Air pushes up on it. That push is called air resistance."},
  {id:"chute",learn:"Air pushes back on falling things. A wide parachute catches lots of air.",work:["Gravity pulls both down.","The big parachute catches more air.","More air pushing up means it falls slower.","So the big parachute lands last."],lesson:"gravity4",kind:"chute",
   q:"Two "+t.roller+"s fall with parachutes. Which lands last?",
   opts:["Big parachute","Small parachute","Same time"],ans:0,
   why:"The big parachute. It catches more air, so air resistance slows it more."},
  {id:"floors",lesson:"friction4",kind:"floors",
   q:"The "+t.roller+" rolls onto three floors. Which floor lets it go furthest?",
   opts:["Ice","Wood","Grass"],ans:0,
   why:"Ice is smooth. Smooth means less friction, so it goes further."},
  {id:"stops",work:["Grass is very rough: lots of friction.","Wood is a bit rough: some friction.","Ice is smooth: a little friction.","More friction slows it faster. Grass stops it first."],lesson:"friction4",kind:"floors",
   q:"Which floor stops the "+t.roller+" soonest?",
   opts:["Ice","Wood","Grass"],ans:2,
   why:"Grass is rough. More friction slows it down quickly."},
  {id:"ramp",lesson:"friction4",kind:"heights",
   q:"Low ramp or high ramp. Which sends the "+t.roller+" further?",
   opts:["Low ramp","High ramp","Same"],ans:1,
   why:"The high ramp. Gravity speeds it up for longer, so it goes faster."},
  {id:"push",lesson:"friction4",kind:"push",
   q:"A small push or a big push. Which makes the block slide further?",
   opts:["Small push","Big push","Same"],ans:1,
   why:"The big push. A bigger force makes it move faster and further."},
  {id:"mass",learn:"Heavy things are harder to move than light things.",work:["Both blocks get the same push.","The heavy block is hard to move.","The light block is easy to move.","So the light block slides further."],lesson:"friction4",kind:"pushmass",
   q:"The same push hits a heavy block and a light block. Which slides further?",
   opts:["Heavy block","Light block","Same"],ans:1,
   why:"The light block. The same push moves a light thing more than a heavy thing."},
  {id:"magnet",learn:"A magnet can pull some metals, like iron. It works without touching.",work:["The nail is made of iron.","The magnet pulls iron.","Wood is not a metal.","So only the nail moves."],lesson:"gravity4",kind:"magnet",
   q:"A magnet is near an iron nail and a wood block. Which one moves?",
   opts:["The iron nail","The wood block","Both"],ans:0,
   why:"The iron nail. Magnets pull some metals, like iron. They pull without touching."},
  {id:"tug",learn:"Two pulls the same size cancel out. They are balanced.",work:["Three pull left.","Three pull right.","The pulls are the same size.","So the rope stays still."],lesson:"friction4",kind:"tug",
   q:"Three dinos pull each end of a rope. What happens?",
   opts:["It goes left","It goes right","It stays still"],ans:2,
   why:"It stays still. Both pulls are the same size. These are called balanced forces."},
  {id:"tug2",learn:"When one pull is bigger, things move that way.",work:["Two pull left.","Four pull right.","Four is more than two.","So the rope goes right."],lesson:"friction4",kind:"tug",l:2,r:4,
   q:"Two dinos pull left. Four dinos pull right. What happens?",
   opts:["It goes left","It goes right","It stays still"],ans:1,
   why:"It goes right. The bigger pull wins. These are unbalanced forces."},
  {id:"throw",lesson:"gravity4",kind:"throw",
   q:"Throw the "+t.small+" up high. What happens?",
   opts:["It floats","It comes back down","It keeps going up"],ans:1,
   why:"It comes back down. Gravity always pulls it toward the ground."}
 ];
 if(!dino(k))pool.forEach(r=>{r.q=r.q.replace(/dinos/g,"kids")});
 return pick6(k,pool);
}
function pick6(k,pool){
 const p=(S.physicsLab&&S.physicsLab[k])||{},seen=p.seen||[];
 const fresh=pool.filter(r=>seen.indexOf(r.id)<0),old=pool.filter(r=>seen.indexOf(r.id)>=0);
 const mix=a=>a.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
 return mix(fresh).concat(mix(old)).slice(0,6);
}

const css=document.createElement("style");
css.textContent=[
".pl-root{max-width:720px;width:100%;margin:0 auto;display:grid;gap:14px;padding-bottom:110px;color:#14262c}",
".pl-root *{box-sizing:border-box}",
".pl-root,.td-root,.pj-root,.studio-root{background:rgba(255,255,255,.96)!important;border-radius:24px;padding:16px 18px 24px!important;margin-bottom:110px!important;box-shadow:0 6px 24px rgba(0,0,0,.25);color:#14262c!important;--ink:#14262c;--soft:#33515a}",
".pj-root>p,.pj-root>h1,.pj-root>h2,.studio-root>p,.studio-root>h1,.studio-root>h2,.pl-root p,.pl-root h1,.td-root h1,.td-root h2,.td-root p,.td-root>span,.td-root .td-sub{color:#14262c!important;-webkit-text-fill-color:#14262c!important;opacity:1!important}",
".pl-root h1{margin:6px 0 0;font:800 clamp(1.5rem,5vw,2rem)/1.2 var(--display);color:#14262c!important;background:none!important;-webkit-text-fill-color:currentColor!important}",
".pl-q{margin:0;font:800 clamp(1.2rem,4vw,1.5rem)/1.35 var(--display)}",
".pl-p{margin:0;font-size:1.15rem;line-height:1.45}",
".pl-cv{width:100%;height:auto;display:block;border-radius:20px;border:3px solid #125877;background:#dff1f7}",
".pl-opts{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}",
".pl-btn{min-height:64px;border-radius:18px;border:3px solid #125877!important;background:#fff!important;color:#14262c!important;font:800 1.15rem var(--display);cursor:pointer;padding:10px 14px;box-shadow:0 4px 0 #0c3d52}",
".pl-btn.on{background:#125877!important;color:#fff!important}",
".pl-btn.pl-go{background:#2f7d4f!important;border-color:#1f5a37!important;color:#fff!important;box-shadow:0 4px 0 #1f5a37}",
".pl-btn:disabled{opacity:.55;cursor:default}",
".pl-btn:focus-visible{outline:4px solid #1e86a3;outline-offset:3px}",
".pl-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}",
".pl-row .pl-btn{flex:1 1 90px;min-height:56px}",
".pl-lab{font:800 .95rem var(--display);text-transform:uppercase;letter-spacing:.05em;min-width:70px}",
".pl-why{border-radius:18px;background:#fff6dc;border:2px solid #d9a52b;padding:14px 16px;font-size:1.15rem;line-height:1.45}",
".pl-dots{display:flex;gap:6px}.pl-dots i{width:14px;height:14px;border-radius:50%;background:#c9dbe2}.pl-dots i.d{background:#125877}",
".pl-guide{display:flex;gap:12px;align-items:flex-start}.pl-guide>span{font-size:2.6rem;line-height:1}.pl-guide>div{position:relative;flex:1;border-radius:18px;background:#eaf7ee;border:2px solid #2f7d4f;padding:12px 14px;font-size:1.15rem;line-height:1.45}",
".pl-work{margin:8px 0 0;padding-left:1.4em;font-size:1.1rem;line-height:1.5}.pl-work li{margin:4px 0}.pl-work li:last-child{font-weight:800}",
".pl-back{justify-self:start;border:0;background:none;color:#125877;font:800 1.05rem var(--display);cursor:pointer;padding:6px 0}"
].join("\n");
document.head.appendChild(css);

let cv=null,cx=null,W=0,H=0,anim=0;
function canvas(){
 cv=app().querySelector(".pl-cv");cx=cv.getContext("2d");
 const d=window.devicePixelRatio||1,w=Math.min(680,cv.parentElement.clientWidth||680);
 W=w;H=Math.round(w*.58);cv.width=W*d;cv.height=H*d;cv.style.height=H+"px";cx.setTransform(d,0,0,d,0,0);
}
const GY=()=>H*.82;
function sky(){
 const g=cx.createLinearGradient(0,0,0,H);g.addColorStop(0,"#bfe4f2");g.addColorStop(1,"#eaf6fa");
 cx.fillStyle=g;cx.fillRect(0,0,W,H);
 cx.fillStyle="#7bb661";cx.fillRect(0,GY(),W,H-GY());
 cx.fillStyle="#5e9a48";cx.fillRect(0,GY(),W,4);
}
function block(x,y,s,col){
 cx.fillStyle=col||"#8a8f96";cx.fillRect(x-s/2,y-s,s,s);
 cx.fillStyle="rgba(255,255,255,.25)";cx.fillRect(x-s/2,y-s,s,s/6);
 cx.fillStyle="rgba(0,0,0,.18)";cx.fillRect(x-s/2,y-s/6,s,s/6);
 const p=s/4;cx.fillStyle="rgba(0,0,0,.12)";cx.fillRect(x-s/2+p,y-s+p*1.5,p,p);cx.fillRect(x+p*.4,y-s+p*2.3,p,p);
}
function ball(x,y,r,col){
 cx.fillStyle=col||"#d9534f";cx.beginPath();cx.arc(x,y-r,r,0,7);cx.fill();
 cx.fillStyle="rgba(255,255,255,.4)";cx.beginPath();cx.arc(x-r*.35,y-r*1.35,r*.3,0,7);cx.fill();
}
function egg(x,y,r){
 cx.fillStyle="#f3ecd6";cx.beginPath();cx.ellipse(x,y-r*1.15,r*.85,r*1.15,0,0,7);cx.fill();
 cx.strokeStyle="#bfae7d";cx.lineWidth=2;cx.stroke();
 cx.fillStyle="#7fae6a";[[-.3,-1.5],[.35,-1],[-.1,-.6]].forEach(([a,b])=>{cx.beginPath();cx.arc(x+a*r,y+b*r,r*.16,0,7);cx.fill()});
}
function leaf(x,y,s,rot){
 cx.save();cx.translate(x,y-s/2);cx.rotate(rot||0);
 cx.fillStyle="#4f9a6e";cx.beginPath();cx.ellipse(0,0,s*.55,s*.22,0,0,7);cx.fill();
 cx.strokeStyle="#2f6b48";cx.lineWidth=2;cx.beginPath();cx.moveTo(-s*.55,0);cx.lineTo(s*.55,0);cx.stroke();cx.restore();
}
function feather(x,y,s,rot){
 cx.save();cx.translate(x,y-s/2);cx.rotate(rot||0);
 cx.fillStyle="#e2b34a";cx.beginPath();cx.ellipse(0,0,s*.6,s*.2,0,0,7);cx.fill();
 cx.strokeStyle="#8a6a22";cx.lineWidth=2;cx.beginPath();cx.moveTo(-s*.7,0);cx.lineTo(s*.6,0);cx.stroke();cx.restore();
}
function gem(x,y,r){
 cx.fillStyle="#d96fb4";cx.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.5:r;cx.lineTo(x+Math.cos(a)*rr,y-r+Math.sin(a)*rr)}cx.closePath();cx.fill();
 cx.fillStyle="rgba(255,255,255,.6)";cx.beginPath();cx.arc(x-r*.2,y-r*1.2,r*.18,0,7);cx.fill();
}
function turtle(x,y,s){cx.font=Math.round(s)+"px system-ui,\"Apple Color Emoji\",\"Segoe UI Emoji\",sans-serif";cx.textAlign="center";cx.textBaseline="alphabetic";cx.fillText("\u{1F422}",x,y-2)}
function thing(k,which,x,y,rot){
 const s=W*.08;
 if(which==="roller")return turtle(x,y,s*.95);
 if(young(k)&&(which==="small"||which==="roller"))return uni(k)?gem(x,y,s*.4):ball(x,y,s*.35,"#e08a2e");
 if(which==="big")return dino(k)?block(x,y,s*1.4):ball(x,y,s*.7);
 if(which==="small")return dino(k)?block(x,y,s*.7):ball(x,y,s*.35);
 if(which==="light")return dino(k)?feather(x,y,s,rot):leaf(x,y,s,rot);
 if(which==="roller")return dino(k)?egg(x,y,s*.32):ball(x,y,s*.3,"#e08a2e");
}
function goal(k,x){
 const y=GY(),w=W*.1;
 if(uni(k)){cx.strokeStyle="#9b59b6";cx.lineWidth=4;cx.beginPath();cx.moveTo(x-w*.5,y-w*.45);cx.lineTo(x-w*.4,y);cx.lineTo(x+w*.4,y);cx.lineTo(x+w*.5,y-w*.45);cx.stroke();cx.fillStyle="#f2b544";cx.font=Math.round(w*.4)+"px system-ui";cx.textAlign="center";cx.fillText("✨",x,y-w*.55);return}
 if(dino(k)){cx.fillStyle="#8a5a2b";cx.beginPath();cx.ellipse(x,y-4,w*.6,w*.22,0,0,7);cx.fill();cx.fillStyle="#b07a40";cx.beginPath();cx.ellipse(x,y-8,w*.45,w*.12,0,0,7);cx.fill()}
 else{cx.strokeStyle="#7a5230";cx.lineWidth=4;cx.beginPath();cx.moveTo(x-w*.5,y-w*.45);cx.lineTo(x-w*.4,y);cx.lineTo(x+w*.4,y);cx.lineTo(x+w*.5,y-w*.45);cx.stroke()}
}
function label(t,x,y){cx.fillStyle="#14262c";cx.font="800 "+Math.round(W*.035)+"px system-ui,sans-serif";cx.textAlign="center";cx.fillText(t,x,y)}

const FMUL={Ice:4,Wood:2,Grass:1};
const FLOORS={Ice:{mu:.3,col:"#7cc8e8"},Wood:{mu:.6,col:"#c89a62"},Grass:{mu:1.2,col:"#5e9a48"}};
const HEIGHTS={Low:1,Middle:2,High:3};
const dist=(h,mu)=>1.2*h/mu;
const RX=()=>W*.05,RW=()=>W*.2,UNIT=()=>(W*.72)/12;
function ramp(h,floor,y0){
 const gy=y0===undefined?GY():y0,top=gy-h*H*.12;
 cx.fillStyle="#9c7a52";cx.beginPath();cx.moveTo(RX(),gy);cx.lineTo(RX(),top);cx.lineTo(RX()+RW(),gy);cx.closePath();cx.fill();
 if(floor){cx.fillStyle=FLOORS[floor].col;cx.fillRect(RX()+RW(),gy-8,W-RX()-RW(),8)}
 return top;
}
function rollPos(h,d,u,gy){
 const top=gy-h*H*.12,split=.35;
 if(u<split){const s=Math.pow(u/split,2);return[RX()+RW()*s,top+(gy-top)*s]}
 const v=(u-split)/(1-split),p=d*(1-Math.pow(1-v,2));return[RX()+RW()+p*UNIT(),gy];
}
function play(ms,draw,done){
 cancelAnimationFrame(anim);
 const len=calm()?ms*.6:ms,t0=performance.now();
 const step=now=>{const u=Math.min(1,(now-t0)/len);draw(u);if(u<1)anim=requestAnimationFrame(step);else if(done)done()};
 anim=requestAnimationFrame(step);
}

function scene(k,r,u){
 sky();const gy=GY();
 if(r.kind==="drop2"){
  const top=H*.12,fall=gy-top,xa=W*.33,xb=W*.67;
  const ya=top+fall*Math.min(1,u*u);
  let yb,rot=0;
  if(r.b==="light"){yb=top+fall*Math.min(1,u*.42);rot=Math.sin(u*12)*.5}else yb=ya;
  thing(k,r.a,xa,ya);thing(k,r.b,xb+(r.b==="light"?Math.sin(u*9)*W*.03:0),yb,rot);
 }else if(r.kind==="floors"){
  const rows=["Ice","Wood","Grass"],lane=H*.26;
  rows.forEach((f,i)=>{const y=H*.3+i*lane;ramp(1.2,f,y);const [x,yy]=rollPos(1.2,Math.min(11.5,dist(1.4,FLOORS[f].mu)),u,y);thing(k,"roller",x,yy);cx.textAlign="left";label(f,W*.92,y-10)});
 }else if(r.kind==="heights"){
  const y1=H*.45,y2=H*.9;
  ramp(1,"Wood",y1);ramp(2.4,"Wood",y2);
  let p=rollPos(1,dist(1,.6),u,y1);thing(k,"roller",p[0],p[1]);
  p=rollPos(2.4,dist(2.4,.6),u,y2);thing(k,"roller",p[0],p[1]);
  label("Low",W*.9,y1-12);label("High",W*.9,y2-12);
 }else if(r.kind==="push"){
  const y1=H*.45,y2=H*.9,x0=W*.1,ease=v=>1-Math.pow(1-v,2);
  cx.fillStyle="#c89a62";cx.fillRect(0,y1-6,W,6);
  block(x0+W*.2*ease(u),y1,W*.08,"#a0784a");block(x0+W*.7*ease(u),y2,W*.08,"#a0784a");
  label("Small push",W*.85,y1-14);label("Big push",W*.85,y2-14);
 }else if(r.kind==="pull"){
  const y=H*.7,x=W*.75-W*.45*(1-Math.pow(1-u,2));
  cx.fillStyle="#c89a62";cx.fillRect(0,y,W,5);
  cx.strokeStyle="#7a5230";cx.lineWidth=3;cx.beginPath();cx.moveTo(W*.12,y-W*.05);cx.lineTo(x-W*.07,y-W*.05);cx.stroke();
  cx.fillStyle="#f2b544";cx.fillRect(W*.08,y-W*.12,W*.04,W*.12);
  cx.fillStyle=uni(k)?"#c98fe0":"#3d8fb0";cx.fillRect(x-W*.07,y-W*.11,W*.14,W*.08);
  cx.fillStyle="#333";[x-W*.045,x+W*.045].forEach(a=>{cx.beginPath();cx.arc(a,y-W*.025,W*.022,0,7);cx.fill()});
 }else if(r.kind==="squash"){
  const y=GY(),d=Math.min(1,u*1.4),hb=W*.12*(1-d*.65),wb=W*.12*(1+d*.9);
  cx.fillStyle=uni(k)?"#f4a6cf":"#e9a35a";cx.beginPath();cx.ellipse(W*.5,y-hb/2,wb/2,hb/2,0,0,7);cx.fill();
  block(W*.5,y-hb-2,W*.12,"#a0784a");
 }else if(r.kind==="pushmass"){
  const y1=H*.45,y2=H*.9,x0=W*.12,e=1-Math.pow(1-u,2);
  cx.fillStyle="#c89a62";cx.fillRect(0,y1-6,W,6);
  block(x0+W*.22*e,y1,W*.13,"#6d7178");block(x0+W*.62*e,y2,W*.07,"#a0784a");
  label("Heavy",W*.85,y1-14);label("Light",W*.85,y2-14);
 }else if(r.kind==="magnet"){
  const y=GY(),mx=W*.2,e=Math.min(1,u*1.3),nx=W*.5-(W*.5-mx-W*.08)*e*e;
  cx.fillStyle="#d9534f";cx.fillRect(mx-W*.06,y-W*.14,W*.05,W*.14);cx.fillRect(mx-W*.06,y-W*.14,W*.11,W*.04);cx.fillRect(mx-W*.06,y-W*.04,W*.11,W*.04);
  cx.fillStyle="#eee";cx.fillRect(mx+W*.02,y-W*.14,W*.03,W*.04);cx.fillRect(mx+W*.02,y-W*.04,W*.03,W*.04);
  cx.fillStyle="#6d7178";cx.fillRect(nx,y-W*.1,W*.1,W*.02);
  block(W*.78,y,W*.09,"#b07a40");
  label("Nail",W*.55,y-W*.13);label("Wood",W*.78,y-W*.12);
 }else if(r.kind==="chute"){
  const top=H*.2,fall=gy-top,ya=top+fall*Math.min(1,u*.55),yb=top+fall*Math.min(1,u*1.05);
  [[W*.33,ya,W*.2],[W*.67,yb,W*.09]].forEach(([x,y,c])=>{
   cx.fillStyle=dino(k)?"#e2b34a":"#d96fb4";cx.beginPath();cx.arc(x,y-W*.12,c/2,Math.PI,0);cx.fill();
   cx.strokeStyle="#555";cx.lineWidth=1.5;cx.beginPath();cx.moveTo(x-c/2,y-W*.12);cx.lineTo(x,y-W*.03);cx.lineTo(x+c/2,y-W*.12);cx.stroke();
   thing(k,"roller",x,y);
  });
  label("Big",W*.33,H*.1);label("Small",W*.67,H*.1);
 }else if(r.kind==="tug"){
  tugDraw(k,r.l||3,r.r||3,u);
 }else if(r.kind==="throw"){
  const top=H*.12,h=gy-top,v=u<.5?1-Math.pow(1-u*2,2):1-Math.pow((u-.5)*2,2);
  thing(k,"small",W*.5,gy-h*v);
 }
}

function dinoFig(k,x,y,s,face){
 cx.fillStyle=dino(k)?"#5fae4e":uni(k)?"#f4a6cf":"#e08a2e";cx.fillRect(x-s/2,y-s,s,s);
 if(uni(k)){cx.fillStyle="#f2b544";cx.beginPath();const hx=face>0?x+s*.55:x-s*.55;cx.moveTo(hx-s*.08,y-s*1.35);cx.lineTo(hx+s*.08,y-s*1.35);cx.lineTo(hx+face*s*.05,y-s*1.75);cx.fill();cx.fillStyle="#f4a6cf"}
 cx.fillRect(face>0?x+s*.2:x-s*.75,y-s*1.35,s*.55,s*.45);
 cx.fillStyle="#14262c";cx.beginPath();cx.arc(x+face*s*.6,y-s*1.15,s*.07,0,7);cx.fill();
}
function tugDraw(k,l,r,u){
 sky();const y=GY(),net=r-l,shift=net*W*.035*(1-Math.pow(1-u,2))+(net?0:Math.sin(u*20)*2);
 cx.strokeStyle="#7a5230";cx.lineWidth=4;cx.beginPath();cx.moveTo(W*.05+shift,y-W*.05);cx.lineTo(W*.95+shift,y-W*.05);cx.stroke();
 cx.fillStyle="#d9534f";cx.fillRect(W*.5-3+shift,y-W*.09,6,W*.08);
 cx.fillStyle="#fff";cx.fillRect(W*.5-1,y-W*.11,2,W*.11);
 const s=W*.05;
 for(let i=0;i<l;i++)dinoFig(k,W*.42-i*W*.065+shift,y,s,-1);
 for(let i=0;i<r;i++)dinoFig(k,W*.58+i*W*.065+shift,y,s,1);
}
function guide(t){return'<div class="pl-guide"><span aria-hidden="true">\u{1F422}</span><div>'+t+'</div></div>'}
function steps(a){return'<ol class="pl-work">'+a.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ol>'}
function learnFact(r){
 if(r.learn)return r.learn;
 if(r.kind==="drop2")return r.b==="light"?"Air pushes back on things as they fall. Wide, light things feel it most.":"Gravity is a pull. It pulls everything down to the ground.";
 return{floors:"Friction is a rubbing force. It slows things down. Rough floors rub more.",heights:"Gravity pulls the turtle down the ramp. It speeds up all the way down.",push:"A push is a force. A force makes things start to move.",pull:"A push moves things away. A pull brings things closer.",squash:"Forces can move things. They can also change their shape.",throw:"Gravity pulls on things all the time, even when they fly up."}[r.kind]||"";
}
function working(r){
 if(r.work)return r.work;
 if(r.kind==="drop2")return r.b==="light"?["Gravity pulls both down.","Air pushes up on the wide "+T.light+".","The "+T.small+" is small, so air hardly slows it.","So the "+T.small+" lands first."]:["Gravity pulls both blocks down.","They are the same shape, so air pushes the same.","So they fall at the same speed and land together."];
 return{floors:["Ice is smooth: a little friction.","Wood is a bit rough: some friction.","Grass is very rough: lots of friction.","Less friction means it goes further. Ice wins."],
  heights:["Low ramp: a short way down, so a slow speed.","High ramp: a long way down, so a fast speed.","Faster at the bottom means it goes further."],
  push:["Small push = small force = slow start.","Big push = big force = fast start.","A fast start slides further."],
  pull:["The rope pulls on the cart.","The cart moves toward the post.","Toward means closer, so it is a pull."],
  squash:["We push down on the dough.","The dough can't go down any more.","So it spreads out and goes flat."],
  throw:["Your throw pushes it up.","Gravity keeps pulling it down.","It slows, stops, then falls back down."]}[r.kind]||[];
}
let K=null,T=null,R=[],ix=0,res=null;
function frame(inner){
 app().innerHTML='<main class="pl-root" aria-label="'+esc(T.name)+'"><button type="button" class="pl-back" id="pl-back">← Back</button>'+inner+'</main>';
 document.getElementById("pl-back").onclick=()=>{tap();cancelAnimationFrame(anim);home()};
 try{window.scrollTo(0,0)}catch(e){}
}
function home(){if(window.PEBBLE_TODAY)window.PEBBLE_TODAY.show();else if(typeof render==="function")render()}

function start(){
 const k=who();if(k===null||!S.kids||!S.kids[k])return;
 try{round=null}catch(e){}
 document.body.classList.remove("adult");
 K=k;T=theme(k);R=rounds(T,k);ix=0;res={};R.forEach(r=>res[r.lesson]={q:0,ok:0});
 frame('<h1>'+T.ico+' '+esc(T.name)+'</h1><p class="pl-p">'+esc(T.intro)+'</p><p class="pl-p">First you guess. Then we test it.</p><canvas class="pl-cv" aria-hidden="true"></canvas><button type="button" class="pl-btn pl-go" id="pl-start">Let\'s go →</button>');
 canvas();scene(K,R[0],0);say(T.intro+" First you guess. Then we test it.");
 document.getElementById("pl-start").onclick=()=>{tap();ask()};
}

function dots(){return'<div class="pl-dots" aria-label="Test '+(ix+1)+' of '+R.length+'">'+R.map((_,i)=>'<i class="'+(i<=ix?"d":"")+'"></i>').join("")+'</div>'}
function ask(){
 const r=R[ix];
 frame(dots()+guide('<b>Learn:</b> '+esc(learnFact(r)))+'<p class="pl-q">'+esc(r.q)+'</p><canvas class="pl-cv" aria-hidden="true"></canvas><div class="pl-opts">'+r.opts.map((o,i)=>'<button type="button" class="pl-btn" data-o="'+i+'">'+esc(o)+'</button>').join("")+'</div>');
 canvas();scene(K,r,0);say(learnFact(r)+" "+r.q);
 app().querySelectorAll("[data-o]").forEach(b=>b.onclick=()=>{tap();test(+b.dataset.o,b)});
}
function test(pick,btn){
 const r=R[ix],right=pick===r.ans;
 res[r.lesson].q++;if(right)res[r.lesson].ok++;
 app().querySelectorAll("[data-o]").forEach(b=>b.disabled=true);btn.classList.add("on");
 play(r.kind==="throw"?2200:r.kind==="drop2"&&r.b==="light"?2600:1800,u=>scene(K,r,u),()=>{
  if(right)good();
  const msg=(right?"You guessed it! ":"Now we know! ")+r.why;
  const box=document.createElement("div");box.className="pl-why";box.innerHTML="<b>"+esc(right?"You guessed it!":"Now we know!")+"</b> Here is the working out:"+steps(working(r));
  const nx=document.createElement("button");nx.type="button";nx.className="pl-btn pl-go";nx.textContent=ix<R.length-1?"Next test →":"Try the challenge →";
  nx.onclick=()=>{tap();ix++;if(ix<R.length)ask();else{record();challenge()}};
  const m=app().querySelector(".pl-root");m.appendChild(box);m.appendChild(nx);say((right?"You guessed it! ":"Now we know! ")+working(r).join(" "));
  try{nx.focus({preventScroll:true})}catch(e){}
 });
}

function record(){
 const A=window.PEBBLE_ADAPTIVE;
 Object.keys(res).forEach(id=>{const x=res[id];if(!x.q||!A)return;
  try{A.recordSession(S,K,lessonYear(K),"science",id,{questions:x.q,firstTry:x.ok,misses:x.q-x.ok,questionIds:[]})}catch(e){}});
 S.physicsLab=S.physicsLab||{};const p=S.physicsLab[K]=S.physicsLab[K]||{plays:0,goals:0,lastAt:0};
 p.plays++;p.lastAt=Date.now();p.seen=(p.seen||[]).concat(R.map(r=>r.id).filter(Boolean)).slice(-8);store();
}

const TARGETS=[1,2,3,4,6,8,12];
const nextT=last=>{let t;do{t=TARGETS[Math.floor(Math.random()*TARGETS.length)]}while(t===last);return t};
let ch=null;
const PUSHES={Small:3,Medium:6,Big:9};
function challenge(){
 if(T.young)return challengeYoung();
 const p=(S.physicsLab&&S.physicsLab[K])||{goals:0};
 ch={h:"Low",f:"Wood",n:0,t:nextT(0),busy:false};
 const opt=(grp,keys,lab)=>'<div class="pl-row"><span class="pl-lab">'+grp+'</span>'+keys.map(x=>'<button type="button" class="pl-btn" data-'+grp.toLowerCase()+'="'+x+'">'+esc(lab(x))+'</button>').join("")+'</div>';
 frame('<h1>Get the '+esc(T.roller)+' in the '+esc(T.goal)+'</h1>'+guide('<b>Learn:</b> Distance = ramp number × floor number. Ice is slippery, so it is ×4. Grass is rough, so it is ×1.')+'<p class="pl-p">Pick a ramp and a floor. Then tap Roll.</p><canvas class="pl-cv" aria-hidden="true"></canvas>'+opt("Ramp",Object.keys(HEIGHTS),x=>x+" "+HEIGHTS[x])+opt("Floor",Object.keys(FLOORS),x=>x+" ×"+FMUL[x])+'<button type="button" class="pl-btn pl-go" id="pl-roll">Roll!</button><p class="pl-p" id="pl-msg" aria-live="polite"></p><div id="pl-work"></div>');
 canvas();say("Get the "+T.roller+" in the "+T.goal+". Pick a ramp and a floor. Then tap Roll.");
 const sync=()=>{app().querySelectorAll("[data-ramp]").forEach(b=>b.classList.toggle("on",b.dataset.ramp===ch.h));app().querySelectorAll("[data-floor]").forEach(b=>b.classList.toggle("on",b.dataset.floor===ch.f));drawCh(0,false)};
 app().querySelectorAll("[data-ramp]").forEach(b=>b.onclick=()=>{if(ch.busy)return;tap();ch.h=b.dataset.ramp;sync()});
 app().querySelectorAll("[data-floor]").forEach(b=>b.onclick=()=>{if(ch.busy)return;tap();ch.f=b.dataset.floor;sync()});
 document.getElementById("pl-roll").onclick=roll;sync();
}
function ruler(x0){cx.fillStyle="#14262c";cx.font="700 "+Math.round(W*.025)+"px system-ui,sans-serif";cx.textAlign="center";for(let i=0;i<=12;i++){const x=x0+i*UNIT();cx.fillRect(x-1,GY()+6,2,i%2?6:10);if(i%2===0||i<=4)cx.fillText(String(i),x,GY()+10+W*.03)}}
function drawCh(u,moving){
 sky();ruler(RX()+RW());const h=HEIGHTS[ch.h],d=h*FMUL[ch.f];
 ramp(h,ch.f);goal(K,RX()+RW()+ch.t*UNIT());
 const [x,y]=moving?rollPos(h,d,u,GY()):rollPos(h,d,0,GY());thing(K,"roller",x,y);
}
function roll(){
 if(ch.busy)return;tap();ch.busy=true;
 const h=HEIGHTS[ch.h],d=h*FMUL[ch.f],msg=document.getElementById("pl-msg");msg.textContent="";
 play(1000+d*120,u=>drawCh(u,true),()=>{
  ch.busy=false;const off=d-ch.t;let t;
  const wk=[ch.h+" ramp = "+h+".",ch.f+" floor = ×"+FMUL[ch.f]+".",h+" × "+FMUL[ch.f]+" = "+d+" steps.","The "+T.goal+" is at "+ch.t+" steps.",d===ch.t?d+" is the same as "+ch.t+". In!":d+" is "+(d<ch.t?"less":"more")+" than "+ch.t+"."];
  document.getElementById("pl-work").innerHTML=steps(wk);
  if(Math.abs(off)<.6){
   win();ch.n++;const p=S.physicsLab[K];p.goals=(p.goals||0)+1;store();
   t=ch.n>=3?"Three in the "+T.goal+"! Now try a tug of war.":"In the "+T.goal+"! Here is a new one.";
   msg.textContent=t;say(t);
   if(ch.n>=3){const b=document.getElementById("pl-roll");b.textContent="Next: Tug of war →";b.onclick=()=>{tap();tugGame()};return}
   ch.t=nextT(ch.t);setTimeout(()=>drawCh(0,false),900);
  }else{
   t=off<0?"Not far enough. Try a higher ramp or a smoother floor.":"Too far! Try a lower ramp or a rougher floor.";
   msg.textContent=t;say(wk.join(" ")+" "+t);
  }
 });
}

let tg=null;
const TUGS=[["Make the rope stay still.",0],["Make the rope go right.",1],["Make the rope go left.",-1]];
function tugGame(){
 const order=[0,1,2].map(i=>[Math.random(),i]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
 tg={order,i:0,r:3,busy:false};tugRound();
}
function tugRound(){
 tg.l=T.young?1+Math.floor(Math.random()*3):2+Math.floor(Math.random()*3);tg.r=3;
 const task=TUGS[tg.order[tg.i]],who_=dino(K)?"dinos":uni(K)?"unicorns":"kids";
 const one=tg.l===1?who_.replace(/s$/,"")+" pulls":who_+" pull";
 frame('<h1>Tug of war</h1><p class="pl-q">'+esc(tg.l+" "+one+" left. "+task[0])+'</p><p class="pl-p">How many '+who_+' pull right?</p><canvas class="pl-cv" aria-hidden="true"></canvas><div class="pl-row"><span class="pl-lab">Right</span>'+(T.young?[1,2,3,4]:[1,2,3,4,5,6]).map(n=>'<button type="button" class="pl-btn" data-n="'+n+'">'+n+'</button>').join("")+'</div><button type="button" class="pl-btn pl-go" id="pl-pull">Pull!</button><p class="pl-p" id="pl-msg" aria-live="polite"></p>');
 canvas();say(tg.l+" "+one+" left. "+task[0]+" How many pull right?");
 const sync=()=>{app().querySelectorAll("[data-n]").forEach(b=>b.classList.toggle("on",+b.dataset.n===tg.r));tugDraw(K,tg.l,tg.r,0)};
 app().querySelectorAll("[data-n]").forEach(b=>b.onclick=()=>{if(tg.busy)return;tap();tg.r=+b.dataset.n;sync()});
 sync();
 document.getElementById("pl-pull").onclick=()=>{
  if(tg.busy)return;tap();tg.busy=true;const msg=document.getElementById("pl-msg");msg.textContent="";
  play(1600,u=>tugDraw(K,tg.l,tg.r,u),()=>{
   tg.busy=false;const net=Math.sign(tg.r-tg.l),ok=net===task[1];let t;
   if(ok){win();tg.i++;
    t=task[1]===0?"Balanced! Same pull on both sides, so it stays still.":"Yes! The bigger team wins. The forces are unbalanced.";
    msg.textContent=t;say(t);const b=document.getElementById("pl-pull");
    if(tg.i>=3){b.textContent="All done →";b.onclick=()=>{tap();home()}}else{b.textContent="Next →";b.onclick=()=>{tap();tugRound()}}
   }else{
    t=net===0?"It stayed still. The teams are the same size.":net>0?"It went right. The right team is bigger.":"It went left. The left team is bigger.";
    msg.textContent=t+" Try again.";say(t+" Try again.");
   }
  });
 };
}

let cy=null;
function challengeYoung(){
 const p=(S.physicsLab&&S.physicsLab[K])||{goals:0},tgs=[3,6,9];
 cy={p:"Small",n:0,t:tgs[Math.floor(Math.random()*3)],busy:false};
 frame('<h1>Get the '+esc(T.roller)+' in the '+esc(T.goal)+'</h1>'+guide('<b>Learn:</b> A bigger push makes it go further. Count the steps on the ruler.')+'<p class="pl-p">Pick a push. Then tap Roll.</p><canvas class="pl-cv" aria-hidden="true"></canvas><div class="pl-row"><span class="pl-lab">Push</span>'+Object.keys(PUSHES).map(x=>'<button type="button" class="pl-btn" data-push="'+x+'">'+x+' '+PUSHES[x]+'</button>').join("")+'</div><button type="button" class="pl-btn pl-go" id="pl-roll">Roll!</button><p class="pl-p" id="pl-msg" aria-live="polite"></p><div id="pl-work"></div>');
 canvas();say("Get the "+T.roller+" in the "+T.goal+". Pick a push. Then tap Roll.");
 const draw=u=>{sky();ruler(W*.1);cx.fillStyle="#c89a62";cx.fillRect(0,GY()-8,W,8);goal(K,W*.1+cy.t*UNIT());const d=u===null?0:PUSHES[cy.p]*(1-Math.pow(1-u,2));thing(K,"roller",W*.1+d*UNIT(),GY()-8)};
 const sync=()=>{app().querySelectorAll("[data-push]").forEach(b=>b.classList.toggle("on",b.dataset.push===cy.p));draw(null)};
 app().querySelectorAll("[data-push]").forEach(b=>b.onclick=()=>{if(cy.busy)return;tap();cy.p=b.dataset.push;sync()});
 sync();
 document.getElementById("pl-roll").onclick=()=>{
  if(cy.busy)return;tap();cy.busy=true;const msg=document.getElementById("pl-msg");msg.textContent="";
  play(1400+PUSHES[cy.p]*90,draw,()=>{
   cy.busy=false;const d=PUSHES[cy.p];let t;
   document.getElementById("pl-work").innerHTML=steps([cy.p+" push = "+d+" steps.","The "+T.goal+" is at "+cy.t+" steps.",d===cy.t?d+" is the same as "+cy.t+". In!":d+" is "+(d<cy.t?"less":"more")+" than "+cy.t+"."]);
   if(d===cy.t){win();cy.n++;const q=S.physicsLab[K];q.goals=(q.goals||0)+1;store();
    t=cy.n>=3?"Three! Now try a tug of war.":"In the "+T.goal+"! Here is a new one.";msg.textContent=t;say(t);
    if(cy.n>=3){const b=document.getElementById("pl-roll");b.textContent="Next: Tug of war →";b.onclick=()=>{tap();tugGame()};return}
    {const o=tgs.filter(x=>x!==cy.t);cy.t=o[Math.floor(Math.random()*o.length)]}setTimeout(()=>draw(null),900);
   }else{t=d<cy.t?"Not far enough. Try a bigger push.":"Too far! Try a smaller push.";msg.textContent=t;say(cy.p+" push is "+d+" steps. "+t)}
  });
 };
}

function addCard(){
 const k=who(),root=app().querySelector(".td-root");
 if(!root||k===null||root.querySelector("#pl-card"))return;
 const t=theme(k),b=document.createElement("button");
 b.type="button";b.className="td-big td-island";b.id="pl-card";
 b.innerHTML='<span class="td-eye">Science game</span><span class="td-row"><span class="td-ic" aria-hidden="true">'+t.ico+'</span><span>'+esc(t.name)+'</span></span><span class="td-go">Play →</span>';
 b.onclick=()=>{tap();start()};
 const after=root.querySelector("#td-island")||root.querySelector("#td-lesson");
 if(after)after.after(b);else root.querySelector(".td-sub").after(b);
}
try{new MutationObserver(addCard).observe(app(),{childList:true,subtree:true})}catch(e){}
addCard();

window.PEBBLE_PHYSICS={start,theme,rounds,dist};
})();
