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
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--soft:#b9ced3;--ink:#f1f7f6}}
.lede,.stat,.kid span,.msg{color:var(--soft)}
.world{text-shadow:0 1px 2px rgba(0,0,0,.35)}
.world small{opacity:1}
.world .lvl i{background:rgba(255,255,255,.45);outline:1.5px solid rgba(255,255,255,.7)}
.world.mix{background:linear-gradient(135deg,#8f2741,#9a5a10 50%,#4b3f9a)!important}
.msg.try{color:#8a4d00}.msg.good{color:#1f6b3d}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .msg.try{color:#ffc56b}:root:not([data-theme="light"]) .msg.good{color:#7fe0a3}}
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
