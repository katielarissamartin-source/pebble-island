(function(){
"use strict";
if(!document.getElementById("app"))return;
const app=()=>document.getElementById("app");
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const who=()=>{try{return typeof kid==="undefined"?null:kid}catch(e){return null}};
const sfx=n=>{try{SFX[n]()}catch(e){}};
const readOn=()=>{try{return S.settings.jRead!==false}catch(e){return true}};
const say=(t,m)=>{if(readOn())try{speak(t,m||"soft")}catch(e){}};
const store=()=>{try{save()}catch(e){}};
const boom=(x,y,n)=>{try{confetti(x??innerWidth/2,y??innerHeight/3,n||80)}catch(e){}};
const P=a=>a[Math.floor(Math.random()*a.length)];
const coins=k=>(S.coins&&S.coins[k])||0;
const spend=(k,p)=>{if(coins(k)<p){sfx("oops");say("You need "+(p-coins(k))+" more coins. Keep learning!");return false}S.coins[k]=coins(k)-p;store();sfx("win");return true};
const uni=k=>k===0,dino=k=>k===1;
const side=k=>dino(k)?1:0;

const ALBUMS={0:[
 ["Mermaid Lagoon","🧜‍♀️",["🧜‍♀️","🐚","🐠","🐡","🦀","🌊","🐬","🪸","🫧","🐋","🦭","🏝️"]],
 ["Fairy Garden","🧚",["🧚","🌸","🌼","🌻","🍄","🐞","🦋","🌷","🪻","🌺","🐝","🌿"]],
 ["Sweet Treats","🧁",["🧁","🍰","🍩","🍪","🍦","🍬","🍫","🥞","🍓","🍒","🧃","🎂"]],
 ["Star Castle","🏰",["🏰","👑","💎","🪄","🔮","⭐","🌙","✨","🌟","🛡️","🗝️","🎆"]],
 ["Rainbow Pets","🐇",["🐇","🐱","🐶","🐹","🦄","🐴","🦢","🦩","🦚","🐥","🐼","🦔"]],
 ["Dance and Music","🎀",["🎀","🩰","🎵","🎶","🎤","🎹","🥁","🎻","🪇","💃","🎠","🎡"]],
 ["Dragon Valley","🐉",["🐉","🐲","🔥","🌋","🥚","🏔️","🌈","☁️","⚡","❄️","🌪️","🪺"]],
 ["Space Dream","🚀",["🚀","🪐","🌍","☄️","🛸","👩‍🚀","🌌","🔭","🌕","🌠","🛰️","👽"]]
],1:[
 ["Jurassic Jungle","🦖",["🦖","🦕","🥚","🦴","🌴","🌿","🦎","🐊","🪺","🍃","🪶","🐢"]],
 ["Volcano Island","🌋",["🌋","🔥","🪨","💥","☄️","🌫️","🏝️","⛰️","💎","🌡️","⚡","🌊"]],
 ["Block Builders","🧱",["🧱","🟩","🟫","🟦","🟥","🟨","🪵","⛏️","🪓","🏠","🔨","🪜"]],
 ["Ice Age","🦣",["🦣","🐻‍❄️","🐧","❄️","🧊","⛄","🏔️","🦭","🐺","🦌","🌨️","🛷"]],
 ["Deep Ocean","🦈",["🦈","🐙","🦑","🐳","🐋","🐡","🐠","🦀","🦞","🪼","⚓","🤿"]],
 ["Knights and Forts","🛡️",["🛡️","🗡️","🏹","🏰","👑","🐎","🗺️","💰","🔑","🪙","⚔️","🧭"]],
 ["Robot Lab","🤖",["🤖","⚙️","🔋","💡","🔧","🛠️","🧲","📡","🛰️","🖥️","🔬","🧪"]],
 ["Space Explorers","🚀",["🚀","🪐","🌍","☄️","🛸","👨‍🚀","🌌","🔭","🌕","🌠","🌑","👾"]]
]};

function st(k){
 S.rp=S.rp||{};const r=S.rp[k]=S.rp[k]||{xp:0,lvl:1,seenCoins:null,albums:{},shiny:{},pet:{food:6,joy:6,at:Date.now(),wear:"",fed:0},world:{grid:[],inv:{}},streakGot:[],doneAlbums:[]};
 r.pet=r.pet||{food:6,joy:6,at:Date.now(),wear:"",fed:0};r.world=r.world||{grid:[],inv:{}};r.albums=r.albums||{};r.shiny=r.shiny||{};r.streakGot=r.streakGot||[];r.doneAlbums=r.doneAlbums||[];
 return r;
}
const need=l=>30+l*20;
const TITLES={0:["Sparkle Sprout","Glitter Pal","Rainbow Rider","Star Skipper","Moon Dancer","Crystal Keeper","Cloud Princess","Wish Weaver","Magic Mage","Rainbow Royal","Legend of Light"],1:["Pebble Digger","Egg Finder","Raptor Runner","Block Builder","Fossil Hunter","Volcano Ranger","Dino Tamer","Diamond Miner","Thunder Lizard","Dino Captain","Legend of the Lost Valley"]};
const title=(k,l)=>{const t=TITLES[side(k)];return l<=t.length?t[l-1]:t[t.length-1]+" "+(l-t.length+1)};

function gainXP(k,n){
 if(n<=0)return;const r=st(k);r.xp+=n;let lv=false;
 while(r.xp>=need(r.lvl)){r.xp-=need(r.lvl);r.lvl++;lv=true}
 store();
 if(lv&&who()===k)setTimeout(()=>levelUp(k),400);
}
function levelUp(k){
 const r=st(k),got=album(k,1,null,true);
 try{toast("🎉","Level "+r.lvl+": "+title(k,r.lvl),"New album sticker"+(r.lvl%3===0?" and a new world item":"")+"!","quest")}catch(e){}
 sfx("win");boom(null,null,120);say("Level up! You are now a "+title(k,r.lvl)+"!","happy");
}
setInterval(()=>{try{const k=who();if(k===null||!S.coins)return;const r=st(k),c=coins(k);if(r.seenCoins===null){r.seenCoins=c;return}if(c>r.seenCoins)gainXP(k,c-r.seenCoins);r.seenCoins=c}catch(e){}},1500);

function album(k,n,why,quiet){
 const r=st(k),list=ALBUMS[side(k)],got=[];
 for(let j=0;j<n;j++){
  const opts=[];list.forEach((a,ai)=>a[2].forEach((e,i)=>{const id=ai+"-"+i;if(!r.albums[id])opts.push(id)}));
  const id=opts.length?P(opts):P(list.map((a,ai)=>ai+"-"+Math.floor(Math.random()*12)));
  const shiny=Math.random()<.12||(!opts.length);
  r.albums[id]=(r.albums[id]||0)+1;if(shiny)r.shiny[id]=1;got.push({id,shiny});
  const ai=+id.split("-")[0];
  if(r.doneAlbums.indexOf(ai)<0&&list[ai][2].every((e,i)=>r.albums[ai+"-"+i])){r.doneAlbums.push(ai);S.coins[k]=coins(k)+50;setTimeout(()=>{try{toast("🏆","Album complete: "+list[ai][0],"+50 coins and a golden world item!","quest")}catch(e){}sfx("win")},1200)}
 }
 store();
 if(!quiet&&why&&who()===k){const e=got.map(g=>list[+g.id.split("-")[0]][2][+g.id.split("-")[1]]+(g.shiny?"✨":"")).join(" ");try{toast(got[0]?list[+got[0].id.split("-")[0]][2][+got[0].id.split("-")[1]]:"🎁",why,"New sticker"+(n>1?"s":"")+": "+e,"quest")}catch(x){}}
 return got;
}

try{const _aw=awardSticker;awardSticker=function(){const out=_aw.apply(this,arguments);try{const k=who();if(k!==null){const r=st(k);if(Math.random()<.5||r.lvl>=3)album(k,1,null,true)}}catch(e){}return out}}catch(e){}

const FOODS={0:[["🍓","Strawberry",3],["🧁","Cupcake",5],["🌈","Rainbow cake",9]],1:[["🥬","Leaves",3],["🍉","Melon",5],["🐟","Fish",9]],2:[["🍎","Apple",3],["🍪","Biscuit",5],["🥕","Carrot",4]]};
const WEARS={0:[["🎀",1],["🌸",2],["👑",4],["⭐",6],["🦋",8],["💎",10]],1:[["🧢",1],["🌿",2],["⛑️",4],["🕶️",6],["🎒",8],["👑",10]],2:[["🎀",1],["🧢",2],["👑",5]]};
const STAGES=["Egg","Baby","Little","Big","Super","Legend"];
const stage=l=>l<2?0:l<4?1:l<6?2:l<9?3:l<13?4:5;
const petIco=k=>uni(k)?"🦄":dino(k)?"🐢":"🐣";
const petName=k=>uni(k)?"Sparkle":dino(k)?"Shelly":"Pebble";
const PW=[0,120,160,200,235,265];
function petArt(k,sg){
 const w=PW[sg],sp=sg>=4,lg=sg===5,g='<defs><radialGradient id="rpgl"><stop offset="0" stop-color="#fff7b0"/><stop offset="1" stop-color="#fff7b0" stop-opacity="0"/></radialGradient></defs>'+(lg?'<ellipse cx="100" cy="90" rx="98" ry="80" fill="url(#rpgl)"/>':'')+(sg>=3?'<text x="18" y="40" font-size="16">✨</text><text x="168" y="30" font-size="14">✨</text>':'');
 let b;
 if(uni(k)){const mane=sg>=3?'#b06cf0':'#f39ad2',tail=sg>=3?'<path d="M48 92 q-30 6 -30 40 q14 -12 22 -10 q-8 14 0 26 q10 -26 18 -40" fill="#7ac8f5"/>':'';
 b=(sp?'<path d="M95 78 q-10 -50 -55 -46 q20 18 18 40 z" fill="#fff" stroke="#e0b8f0" stroke-width="3"/><path d="M95 78 q-4 -36 -34 -38" fill="none" stroke="#e0b8f0" stroke-width="2"/>':'')
 +'<path d="M50 90 q-28 4 -28 34 q12 -8 20 -6 q-6 12 2 22 q8 -24 16 -36" fill="'+mane+'"/>'+tail
 +'<rect x="62" y="110" width="12" height="44" rx="6" fill="#fff" stroke="#e7c9e6" stroke-width="3"/><rect x="82" y="112" width="12" height="42" rx="6" fill="#f7eef7" stroke="#e7c9e6" stroke-width="3"/><rect x="112" y="112" width="12" height="42" rx="6" fill="#f7eef7" stroke="#e7c9e6" stroke-width="3"/><rect x="130" y="110" width="12" height="44" rx="6" fill="#fff" stroke="#e7c9e6" stroke-width="3"/>'
 +'<rect x="60" y="148" width="16" height="9" rx="3" fill="#c79be8"/><rect x="128" y="148" width="16" height="9" rx="3" fill="#c79be8"/><rect x="80" y="148" width="16" height="9" rx="3" fill="#c79be8"/><rect x="110" y="148" width="16" height="9" rx="3" fill="#c79be8"/>'
 +'<ellipse cx="100" cy="104" rx="50" ry="28" fill="#fff" stroke="#e7c9e6" stroke-width="3"/>'
 +'<path d="M128 96 q8 -30 22 -44 l20 14 q-12 16 -18 42 z" fill="#fff" stroke="#e7c9e6" stroke-width="3"/>'
 +'<ellipse cx="164" cy="58" rx="22" ry="16" fill="#fff" stroke="#e7c9e6" stroke-width="3"/><ellipse cx="181" cy="64" rx="7" ry="6" fill="#ffd6ea"/>'
 +'<path d="M156 44 l6 -32 l8 30 z" fill="#ffd23f" stroke="#e0a800" stroke-width="2"/><path d="M158 34 l9 -3 M159 25 l7 -2" stroke="#e0a800" stroke-width="2"/>'
 +'<path d="M150 46 l-4 -12 l12 8 z" fill="#ffd6ea"/>'
 +'<path d="M152 44 q-18 6 -20 26 q-2 14 -10 26 q14 -4 20 -16 q-6 18 -2 30 q10 -18 14 -40 q4 -14 8 -24" fill="'+mane+'"/>'
 +'<circle cx="168" cy="54" r="4" fill="#2b2140"/><circle cx="169.5" cy="52.5" r="1.4" fill="#fff"/><path d="M172 66 q4 3 8 1" stroke="#c0628f" stroke-width="2" fill="none"/>'
 +(lg?'<path d="M60 86 l4 -8 l4 8 l-4 8 z M100 80 l3 -6 l3 6 l-3 6 z" fill="#fff36b"/>':'');}
 else{const sh=sg>=4?'#3d9a5b':'#56b06d',pt=sg>=3?'#2f7a47':'#3f8f57';
 b='<path d="M44 120 q-16 4 -20 12 q12 2 22 -4 z" fill="#8fd18c" stroke="#4e8f4f" stroke-width="3"/>'
 +'<rect x="56" y="118" width="22" height="34" rx="11" fill="#8fd18c" stroke="#4e8f4f" stroke-width="3"/><rect x="126" y="118" width="22" height="34" rx="11" fill="#8fd18c" stroke="#4e8f4f" stroke-width="3"/>'
 +'<path d="M150 112 q22 -6 30 -26 q10 -4 16 6 q2 18 -14 26 q-14 8 -28 6 z" fill="#8fd18c" stroke="#4e8f4f" stroke-width="3"/>'
 +'<circle cx="184" cy="92" r="4.5" fill="#1d2b22"/><circle cx="185.5" cy="90.5" r="1.5" fill="#fff"/><path d="M186 104 q5 2 9 -2" stroke="#2f5f30" stroke-width="2" fill="none"/>'
 +'<path d="M36 124 q4 -74 66 -76 q62 2 66 76 z" fill="'+sh+'" stroke="#2c6a3e" stroke-width="4"/>'
 +'<path d="M102 56 l18 18 l-6 26 h-24 l-6 -26 z" fill="'+pt+'"/><path d="M60 84 l20 -6 l6 22 l-20 14 l-14 -8 z M144 84 l-20 -6 l-6 22 l20 14 l14 -8 z" fill="'+pt+'"/>'
 +'<path d="M32 124 h140 q4 6 -2 10 h-136 q-6 -4 -2 -10 z" fill="#d9c27a" stroke="#a78f45" stroke-width="3"/>'
 +(sp?'<circle cx="102" cy="78" r="6" fill="#7ee0ff" stroke="#fff" stroke-width="2"/><circle cx="68" cy="96" r="4" fill="#ffd23f"/><circle cx="136" cy="96" r="4" fill="#ffd23f"/>':'')
 +(lg?'<path d="M168 82 l4 -12 l5 8 l5 -10 l4 10 l5 -8 l2 14 z" fill="#ffd23f" stroke="#e0a800" stroke-width="2"/>':'');}
 return '<svg viewBox="0 0 200 160" width="'+w+'" height="'+Math.round(w*.8)+'" style="display:block;overflow:visible">'+g+b+'</svg>';
}
function decay(r){const p=r.pet,h=(Date.now()-(p.at||Date.now()))/36e5;if(h>3){const d=Math.floor(h/3);p.food=Math.max(2,p.food-d);p.joy=Math.max(2,p.joy-d);p.at=Date.now()}}

const css=document.createElement("style");
css.textContent=`
.rp-root{max-width:720px;width:100%;margin:0 auto 110px;display:grid;gap:14px;background:rgba(255,255,255,.97);border-radius:24px;padding:16px 18px 24px;box-shadow:0 6px 24px rgba(0,0,0,.25);color:#14262c}
.rp-root *{box-sizing:border-box}
.rp-root h1,.rp-root h2{margin:4px 0 0;color:#14262c!important;-webkit-text-fill-color:#14262c!important;font-family:var(--display)}
.rp-root h1{font-size:clamp(1.5rem,5vw,2rem)}.rp-root h2{font-size:1.25rem}
.rp-p{margin:0;font-size:1.1rem;line-height:1.45}
.rp-back{justify-self:start;border:0;background:none;color:#125877;font:800 1.05rem var(--display);cursor:pointer;padding:6px 0}
.rp-btn{min-height:60px;border-radius:18px;border:3px solid #125877;background:#fff;color:#14262c;font:800 1.1rem var(--display);cursor:pointer;padding:8px 12px;box-shadow:0 4px 0 #0c3d52}
.rp-btn.on{background:#125877;color:#fff}.rp-btn.poor{opacity:.55}
.rp-row{display:flex;gap:8px;flex-wrap:wrap}.rp-row .rp-btn{flex:1 1 120px}
.rp-coins{justify-self:end;font:800 1.05rem var(--display);background:#fff6dc;border-radius:999px;padding:4px 12px;margin-top:-40px}
.rp-albums{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
.rp-alb{border-radius:18px;border:3px solid #c9dbe2;background:#f6fbfd;padding:10px;text-align:center;cursor:pointer;font:800 1rem var(--display);color:#14262c}
.rp-alb.done{border-color:#d9a52b;background:#fff6dc}.rp-alb span{display:block;font-size:2.4rem}
.rp-grid{display:grid;gap:10px;grid-template-columns:repeat(4,1fr)}
.rp-stk{aspect-ratio:1;border-radius:18px;border:3px dashed #c9dbe2;background:#f6fbfd;font-size:2.6rem;display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative}
.rp-stk.have{border-style:solid;border-color:#7cc8e8;background:#fff}
.rp-stk.shiny{border-color:#f2b544;background:radial-gradient(circle,#fff8d6,#ffe9a8);animation:rpglow 2.4s ease-in-out infinite}
.rp-stk.shiny::after{content:"✨";position:absolute;top:2px;right:6px;font-size:1rem}
.rp-stk small{position:absolute;bottom:3px;left:6px;font:800 .75rem var(--display);color:#33515a}
@keyframes rpglow{0%,100%{box-shadow:0 0 0 rgba(242,181,68,.0)}50%{box-shadow:0 0 18px rgba(242,181,68,.8)}}
.rp-wig{animation:rpwig .6s}@keyframes rpwig{0%,100%{transform:rotate(0)}25%{transform:rotate(-12deg) scale(1.15)}75%{transform:rotate(12deg) scale(1.15)}}
.rp-pet{position:relative;height:300px;border-radius:22px;background:linear-gradient(#cfeefa,#f2fbff 70%,#bfe3a0 70%);display:flex;align-items:flex-end;justify-content:center;overflow:hidden}
.rp-pet.u{background:linear-gradient(#f9dcf0,#fff3fb 70%,#d9c8f5 70%)}
.rp-pb{position:relative;margin-bottom:22px;cursor:pointer;line-height:1;transition:transform .3s}
.rp-pb .w{position:absolute;left:50%;top:-.25em;font-size:2.4rem!important;transform:translateX(-50%);font-size:.42em}
.rp-pb.jump{animation:rpjump .7s}.rp-pb.spin{animation:rpspin .8s}.rp-pb.dance{animation:rpdance 1s}
@keyframes rpjump{0%,100%{transform:translateY(0)}40%{transform:translateY(-70px)}}
@keyframes rpspin{to{transform:rotate(360deg)}}
@keyframes rpdance{0%,100%{transform:translateX(0)}20%{transform:translateX(-24px) rotate(-10deg)}40%{transform:translateX(24px) rotate(10deg)}60%{transform:translateX(-24px) rotate(-10deg)}80%{transform:translateX(24px) rotate(10deg)}}
.rp-bob{animation:rpbob 3s ease-in-out infinite}@keyframes rpbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.rp-meters{display:grid;gap:6px}.rp-m{display:flex;gap:8px;align-items:center;font:800 1rem var(--display)}.rp-m i{flex:1;height:14px;border-radius:7px;background:#e3edf1;overflow:hidden}.rp-m i b{display:block;height:100%;background:#2f7d4f}
.rp-scene{display:grid;grid-template-columns:repeat(8,1fr);gap:3px;padding:8px;border-radius:20px;background:linear-gradient(#bfe4f2 0 45%,#8ccf6a 45%)}
.rp-scene.u{background:linear-gradient(#f9d5ec 0 45%,#c8e7b4 45%)}
.rp-cell{aspect-ratio:1;border-radius:10px;border:2px dashed rgba(255,255,255,.55);background:rgba(255,255,255,.12);font-size:clamp(1.3rem,5.5vw,2.2rem);display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0}
.rp-cell.f{border-style:solid;border-color:transparent;background:transparent}
.rp-items{display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(96px,1fr))}
.rp-it{border-radius:16px;border:3px solid #c9dbe2;background:#fff;padding:6px;text-align:center;cursor:pointer;font:800 .9rem var(--display);color:#14262c}
.rp-it span{display:block;font-size:2rem}.rp-it.sel{border-color:#125877;background:#e3f2f8}.rp-it.lock{opacity:.45}
.rp-lv{border-radius:20px;background:linear-gradient(135deg,#125877,#2f7d4f);color:#fff;padding:12px 16px;display:grid;gap:6px}
.rp-lv b{font:800 1.2rem var(--display);color:#fff}.rp-lv .bar{height:14px;border-radius:7px;background:rgba(255,255,255,.3);overflow:hidden}.rp-lv .bar i{display:block;height:100%;background:#f2b544}
.rp-lv small{font-size:.95rem;color:#e6f3f7}
.rp-hub{display:grid;gap:10px;grid-template-columns:repeat(2,1fr)}
.rp-hub button{min-height:96px;border-radius:20px;border:3px solid #125877;background:#fff;color:#14262c;font:800 1.1rem var(--display);cursor:pointer;box-shadow:0 4px 0 #0c3d52;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px}
.rp-hub button span{font-size:2.2rem;line-height:1}
.rp-hub button.boss{border-color:#6b3fa0;box-shadow:0 4px 0 #4b2a73}
`;
document.head.appendChild(css);

function frame(inner,k){app().innerHTML='<main class="rp-root"><button type="button" class="rp-back" id="rp-back">← Back</button><span class="rp-coins">🪙 '+coins(k)+'</span>'+inner+'</main>';document.getElementById("rp-back").onclick=()=>{sfx("tap");home()};try{scrollTo(0,0)}catch(e){}}
function home(){if(window.PEBBLE_TODAY)PEBBLE_TODAY.show();else if(typeof render==="function")render()}
const prep=()=>{const k=who();if(k===null||!S.kids||!S.kids[k])return null;try{round=null}catch(e){}document.body.classList.remove("adult");return k};

function albums(){
 const k=prep();if(k===null)return;const r=st(k),list=ALBUMS[side(k)];
 const tot=list.length*12,have=Object.keys(r.albums).length,sh=Object.keys(r.shiny).length;
 frame('<h1>📚 My albums</h1><p class="rp-p">'+have+' of '+tot+' stickers · '+sh+' shiny ✨</p><p class="rp-p">Win album stickers by levelling up, Brain Boost, boss challenges and finishing rounds.</p><div class="rp-albums">'+list.map((a,ai)=>{const n=a[2].filter((e,i)=>r.albums[ai+"-"+i]).length;return'<button type="button" class="rp-alb '+(n===12?"done":"")+'" data-a="'+ai+'"><span>'+a[1]+'</span>'+esc(a[0])+'<br>'+n+'/12'+(n===12?" 🏆":"")+'</button>'}).join("")+'</div>',k);
 say("Your albums. You have "+have+" stickers.");
 app().querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>{sfx("tap");albumPage(+b.dataset.a)});
}
function albumPage(ai){
 const k=who(),r=st(k),a=ALBUMS[side(k)][ai];
 frame('<h1>'+a[1]+' '+esc(a[0])+'</h1><div class="rp-grid">'+a[2].map((e,i)=>{const id=ai+"-"+i,n=r.albums[id];return'<button type="button" class="rp-stk '+(n?"have":"")+(r.shiny[id]?" shiny":"")+'" data-i="'+i+'">'+(n?e+(n>1?'<small>×'+n+'</small>':''):'?')+'</button>'}).join("")+'</div>',k);
 document.getElementById("rp-back").onclick=()=>{sfx("tap");albums()};
 say(a[0]);
 app().querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>{if(!b.classList.contains("have")){sfx("oops");return}sfx("pop");b.classList.remove("rp-wig");void b.offsetWidth;b.classList.add("rp-wig");const q=b.getBoundingClientRect();boom(q.left+q.width/2,q.top+q.height/2,b.classList.contains("shiny")?40:16)});
}

function pet(){
 const k=prep();if(k===null)return;const r=st(k);decay(r);store();
 const sg=stage(r.lvl),sz=[3.2,3.8,4.6,5.6,6.4,7.2][sg],side_=uni(k)?0:dino(k)?1:2;
 const ico=sg===0?"🥚":(uni(k)||dino(k))?petArt(k,sg):petIco(k),nm=petName(k);
 const nextAt=[2,4,6,9,13][sg];
 const wears=WEARS[side_].filter(w=>w[1]<=r.lvl);
 const m=(l,v,c)=>'<div class="rp-m">'+l+'<i><b style="width:'+v*10+'%;background:'+c+'"></b></i></div>';
 frame('<h1>'+(sg===0?"🥚 "+nm+"'s egg":petIco(k)+" "+nm)+'</h1><p class="rp-p">'+STAGES[sg]+' '+(sg===0?"egg":nm)+(nextAt?' · grows at level '+nextAt:' · fully grown!')+'</p><div class="rp-pet '+(uni(k)?"u":"")+'"><div class="rp-pb rp-bob" id="rp-pb" style="font-size:'+sz+'rem">'+ico+(r.pet.wear&&sg>0?'<span class="w">'+r.pet.wear+'</span>':'')+'</div></div><div class="rp-meters">'+m("😋",r.pet.food,"#e08a2e")+m("😊",r.pet.joy,"#d96fb4")+'</div><h2>Feed '+esc(nm)+'</h2><div class="rp-row">'+FOODS[side_].map(f=>'<button type="button" class="rp-btn '+(coins(k)<f[2]?"poor":"")+'" data-f="'+f[0]+'" data-p="'+f[2]+'">'+f[0]+' '+esc(f[1])+' · 🪙'+f[2]+'</button>').join("")+'</div><h2>Play</h2><div class="rp-row"><button type="button" class="rp-btn" data-t="jump">⬆️ Jump</button><button type="button" class="rp-btn" data-t="spin">🌀 Spin</button><button type="button" class="rp-btn" data-t="dance">💃 Dance</button></div><h2>Dress up</h2><div class="rp-row">'+WEARS[side_].map(w=>'<button type="button" class="rp-btn '+(r.pet.wear===w[0]?"on":"")+(w[1]>r.lvl?" poor":"")+'" data-w="'+w[0]+'" data-l="'+w[1]+'">'+w[0]+(w[1]>r.lvl?' 🔒 L'+w[1]:'')+'</button>').join("")+'<button type="button" class="rp-btn" data-w="">None</button></div>',k);
 say(sg===0?"Your egg is waiting to hatch. Learn to help it grow!":nm+" is happy to see you!","happy");
 const pb=document.getElementById("rp-pb");
 const trick=t=>{if(sg===0){pb.classList.remove("jump");void pb.offsetWidth;pb.classList.add("jump");sfx("pop");return}pb.classList.remove("rp-bob","jump","spin","dance");void pb.offsetWidth;pb.classList.add(t);sfx("good");r.pet.joy=Math.min(10,r.pet.joy+1);store();setTimeout(()=>{pb.classList.remove(t);pb.classList.add("rp-bob")},1000);const q=pb.getBoundingClientRect();boom(q.left+q.width/2,q.top,20)};
 pb.onclick=()=>trick(P(["jump","spin","dance"]));
 app().querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>{trick(b.dataset.t);if(sg>0){const m_=app().querySelectorAll(".rp-m b")[1];if(m_)m_.style.width=r.pet.joy*10+"%"}});
 app().querySelectorAll("[data-f]").forEach(b=>b.onclick=()=>{if(r.pet.food>=10){say(nm+" is full!");sfx("oops");return}if(!spend(k,+b.dataset.p))return;r.pet.food=Math.min(10,r.pet.food+(+b.dataset.p>6?4:2));r.pet.fed++;store();say("Yum! "+nm+" loves it.","happy");pet()});
 app().querySelectorAll("[data-w]").forEach(b=>b.onclick=()=>{const l=+(b.dataset.l||0);if(l>r.lvl){sfx("oops");say("Unlocks at level "+l+".");return}if(sg===0&&b.dataset.w){say("Wait until the egg hatches!");return}sfx("tap");r.pet.wear=b.dataset.w;store();pet()});
}

const ITEMS={0:[["🌸","Flower",2,1],["🌷","Tulip",2,1],["🌳","Tree",4,1],["🍄","Toadstool",4,1],["🐇","Bunny",8,2],["🦋","Butterfly",6,2],["☁️","Cloud",5,2],["⭐","Star lamp",8,3],["🌈","Rainbow",14,3],["🧚","Fairy",16,4],["⛲","Fountain",24,5],["🦄","Unicorn",22,5],["🎠","Carousel",30,6],["💎","Crystal",20,6],["🐉","Friendly dragon",40,8],["🏰","Castle",50,9],["👑","Golden crown",0,99]],1:[["🌿","Fern",2,1],["🌴","Palm",4,1],["🪨","Rock",2,1],["🟩","Grass block",1,1],["🟦","Water block",1,2],["🧱","Brick",2,2],["🥚","Dino nest",6,2],["🦴","Fossil",8,3],["🔥","Torch",6,3],["🐊","Croc",14,4],["🦕","Long-neck",22,5],["🏠","Hut",18,5],["🦖","T-Rex",26,6],["🦣","Mammoth",30,7],["🌋","Volcano",40,8],["🏰","Fortress",50,9],["🏆","Golden trophy",0,99]]};
let sel=null;
function world(){
 const k=prep();if(k===null)return;const r=st(k),W=r.world,s=side(k);
 if(W.grid.length!==48)W.grid=Array(48).fill("");
 const gold=ITEMS[s][ITEMS[s].length-1];if(r.doneAlbums.length&&!W.inv[gold[0]+"_got"]){W.inv[gold[0]]=(W.inv[gold[0]]||0)+r.doneAlbums.length;W.inv[gold[0]+"_got"]=1}
 const items=ITEMS[s].filter(it=>it[3]<99||W.inv[it[0]]);
 frame('<h1>'+(uni(k)?"🏰 My Rainbow Kingdom":dino(k)?"🌋 My Dino Valley":"🏝️ My Island")+'</h1><p class="rp-p">Buy things, then tap a square to place them. Tap a placed thing to put it back.</p><div class="rp-scene '+(uni(k)?"u":"")+'">'+W.grid.map((e,i)=>'<button type="button" class="rp-cell '+(e?"f rp-bob":"")+'" style="animation-delay:'+(i%5)*.4+'s" data-c="'+i+'">'+e+'</button>').join("")+'</div><h2>My things</h2><div class="rp-items">'+items.map(it=>{const n=W.inv[it[0]]||0,lock=it[3]>r.lvl&&it[3]<99;return'<button type="button" class="rp-it '+(sel===it[0]?"sel":"")+(lock?" lock":"")+'" data-e="'+it[0]+'"><span>'+it[0]+'</span>'+esc(it[1])+'<br>'+(lock?'🔒 Level '+it[3]:(n?'Have '+n:'')+(it[2]?' · 🪙'+it[2]:''))+'</button>'}).join("")+'</div>',k);
 say("Build your world! Pick something, then tap a square.","happy");
 app().querySelectorAll("[data-e]").forEach(b=>b.onclick=()=>{const it=ITEMS[s].find(x=>x[0]===b.dataset.e);if(it[3]>r.lvl&&it[3]<99){sfx("oops");say("That unlocks at level "+it[3]+".");return}
  if(!(W.inv[it[0]]>0)){if(!it[2]||!spend(k,it[2]))return;W.inv[it[0]]=(W.inv[it[0]]||0)+1;store();say("You got a "+it[1]+"!")}else sfx("tap");sel=it[0];world()});
 app().querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>{const i=+b.dataset.c;
  if(W.grid[i]){W.inv[W.grid[i]]=(W.inv[W.grid[i]]||0)+1;W.grid[i]="";sfx("tap");store();world();return}
  if(!sel||!(W.inv[sel]>0)){sfx("oops");say("Pick something first.");return}
  W.grid[i]=sel;W.inv[sel]--;if(!W.inv[sel])sel=null;sfx("pop");store();world();const q=app().querySelector('[data-c="'+i+'"]');if(q){const x=q.getBoundingClientRect();boom(x.left+x.width/2,x.top+x.height/2,14)}});
}

const MILES=[3,5,7,14,21,30];
function streaks(k){try{const d=S.daily&&S.daily[k];const s=d&&d.streak||0;const r=st(k);MILES.forEach(m=>{if(s>=m&&r.streakGot.indexOf(m)<0){r.streakGot.push(m);S.coins[k]=coins(k)+m*3;store();setTimeout(()=>{try{toast("🔥",m+" days in a row!","+"+(m*3)+" coins and 2 album stickers","quest")}catch(e){}album(k,2,null,true);sfx("win")},800)}})}catch(e){}}

function strip(){
 const k=who(),root=app().querySelector(".td-root");
 if(!root||k===null||root.querySelector("#rp-strip"))return;
 const r=st(k),sg=stage(r.lvl);streaks(k);
 const bossOk=(()=>{try{const m=S.boost&&S.boost[k];return!m||Date.now()-(m.lastBoss||0)>6*864e5}catch(e){return false}})();
 const d=document.createElement("div");d.id="rp-strip";d.style.display="grid";d.style.gap="10px";
 d.innerHTML='<div class="rp-lv"><b>⭐ Level '+r.lvl+': '+esc(title(k,r.lvl))+'</b><div class="bar"><i style="width:'+Math.round(r.xp/need(r.lvl)*100)+'%"></i></div><small>'+(need(r.lvl)-r.xp)+' more coins to level '+(r.lvl+1)+'</small></div><div class="rp-hub"><button type="button" id="rp-boost" class="'+(bossOk?"boss":"")+'"><span>🧠</span>Brain Boost'+(bossOk?' ⚔️':'')+'</button><button type="button" id="rp-pet"><span>'+(sg===0?"🥚":petIco(k))+'</span>'+esc(petName(k))+'</button><button type="button" id="rp-world"><span>'+(uni(k)?"🏰":dino(k)?"🌋":"🏝️")+'</span>My world</button><button type="button" id="rp-alb"><span>📚</span>Albums</button></div>';
 const after=root.querySelector("#pl-card")||root.querySelector("#td-island")||root.querySelector("#td-lesson")||root.querySelector(".td-sub");
 if(after)after.after(d);else root.appendChild(d);
 d.querySelector("#rp-boost").onclick=()=>{sfx("tap");if(window.PEBBLE_BOOST)PEBBLE_BOOST.start()};
 d.querySelector("#rp-pet").onclick=()=>{sfx("tap");pet()};
 d.querySelector("#rp-world").onclick=()=>{sfx("tap");world()};
 d.querySelector("#rp-alb").onclick=()=>{sfx("tap");albums()};
}
try{new MutationObserver(strip).observe(app(),{childList:true,subtree:true})}catch(e){}
strip();

try{const _sb=stickerBook;stickerBook=function(){_sb.apply(this,arguments);try{const top=app().querySelector(".top");if(top&&!top.querySelector("#rp-toalb")){const b=document.createElement("button");b.className="pill";b.id="rp-toalb";b.textContent="📚 More albums";b.onclick=()=>{sfx("tap");albums()};top.appendChild(b)}}catch(e){}}}catch(e){}

window.PEBBLE_REWARDS={album,albums,pet,world,gainXP,st,title,ALBUMS};
})();
