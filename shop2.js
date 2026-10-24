(function(){
const IVY=[["🦄","Unicorn"],["🧚","Fairy"],["👸","Princess"],["🏰","Castle"],["🧜‍♀️","Mermaid"],["🐉","Friendly Dragon"],["🌈","Rainbow"],["🪄","Magic Wand"],["🔮","Crystal Ball"],["👑","Crown"],["💎","Jewel"],["🦋","Butterfly"],["🌸","Blossom"],["🎀","Bow"],["💖","Sparkle Heart"],["🌙","Moon"],["⭐","Wishing Star"],["☁️","Cloud Puff"],["🫧","Bubbles"],["🐇","Bunny"],["🦢","Swan"],["🦩","Flamingo"],["🕊️","Dove"],["🐬","Dolphin"],["🦚","Peacock"],["🎠","Carousel"],["🧁","Cupcake"],["🍭","Lollipop"],["🍓","Strawberry"],["🌷","Tulip"],["🪞","Magic Mirror"],["🧸","Teddy"],["🐈","Kitten"],["🌺","Hibiscus"]];
const HAY=[["🦖","T-Rex"],["🦕","Long-neck"],["🐊","Croc"],["🦎","Lizard"],["🥚","Dino Egg"],["🦴","Fossil"],["🌋","Volcano"],["☄️","Meteor"],["🐉","Dragon"],["🦣","Mammoth"],["⛏️","Pickaxe"],["🧱","Brick Block"],["💎","Diamond"],["🪨","Stone Block"],["🌲","Pine"],["🟩","Grass Block"],["🟫","Dirt Block"],["🟦","Water Block"],["🟥","Redstone"],["🟨","Gold Block"],["🪓","Axe"],["🗡️","Sword"],["🛡️","Shield"],["🏹","Bow"],["🪵","Log"],["🔥","Torch"],["🧨","Blast Block"],["⚒️","Anvil"],["🏰","Fortress"],["🗺️","Treasure Map"],["🧭","Compass"],["🐺","Wolf"],["🐷","Pig"],["🐑","Sheep"]];
const TIERS={0:[["","Common","#fff"],["✨","Rare","#ffe08a"],["🌈","Legendary","linear-gradient(135deg,#ffb3d9,#c6a8ff,#9ee7ff)"]],1:[["","Stone","#e7e2d6"],["✨","Gold","#ffd75e"],["💠","Diamond","linear-gradient(135deg,#7fe7ff,#3fb7e0)"]]};
const set=k=>{const base=k===0?IVY:HAY;const out=[];for(let t=0;t<3;t++)base.forEach((b,i)=>{if(out.length<100)out.push({id:`${k}-${t}-${i}`,e:b[0],n:(t?TIERS[k][t][1]+" ":"")+b[1],t})});return out};
const SETS={0:set(0),1:set(1)};
const byId=id=>{const k=+id.split("-")[0];return(SETS[k]||[]).find(s=>s.id===id)};
const own=()=>S.stickers[kid]||(S.stickers[kid]=[]);
const html=s=>{if(typeof s==="string"&&!byId(s))return`<span class="stk">${s}</span>`;const x=typeof s==="string"?byId(s):s;const tr=TIERS[kid===1?1:0][x.t];return`<span class="stk t${x.t}" style="background:${tr[2]}">${x.e}${tr[0]?`<i>${tr[0]}</i>`:""}</span>`};
function draw(n=1){const k=kid===1?1:0;const all=SETS[k];const got=own();const res=[];
  for(let j=0;j<n;j++){const r=Math.random();const tier=r<.62?0:r<.92?1:2;let pool=all.filter(s=>s.t===tier&&!got.includes(s.id));if(!pool.length)pool=all.filter(s=>!got.includes(s.id));
    if(!pool.length){res.push(pick(all));continue}const s=pick(pool);got.push(s.id);res.push(s)}save();return res}
awardSticker=function(){const s=draw(1)[0];return html(s)+`<small class="stkname">${s.n}</small>`};
stickerBook=function(){const k=kid===1?1:0;const all=SETS[k];const got=own();const n=all.filter(s=>got.includes(s.id)).length;const old=got.filter(x=>!byId(x));
  const tabs=[0,1,2];let tier=+(stickerBook.tier||0);
  const grid=()=>all.filter(s=>s.t===tier).map(s=>got.includes(s.id)?`<button class="sticker have" data-s="${s.id}" title="${s.n}">${html(s)}<small>${s.n}</small></button>`:`<button class="sticker locked" data-s="${s.id}">?</button>`).join("");
  $("#app").innerHTML=`<div class="top"><button class="pill" id="back">← Map</button><span class="pill">🎁 ${n} of ${all.length}</span><button class="pill" id="toshop">🛍️ Sticker packs</button></div>
   <h2>${NAME()}'s ${k?"Dino & Block":"Magic & Unicorn"} sticker book</h2><div class="bar" style="height:14px;border-radius:7px;background:rgba(0,0,0,.12);overflow:hidden;max-width:520px"><i style="display:block;height:100%;width:${n}%;background:var(--good,#3d8f2f)"></i></div>
   <div class="tierbar">${tabs.map(t=>`<button class="pill ${t===tier?"on":""}" data-tier="${t}">${TIERS[k][t][0]||"⬜"} ${TIERS[k][t][1]} (${all.filter(s=>s.t===t&&got.includes(s.id)).length}/${all.filter(s=>s.t===t).length})</button>`).join("")}</div>
   <div class="stickers big">${grid()}</div>${old.length?`<h3>Earlier stickers</h3><div class="stickers">${old.map(s=>`<button class="sticker have">${s}</button>`).join("")}</div>`:""}`;
  speak(`You have ${n} out of ${all.length} stickers!`,"happy");
  $$("[data-tier]").forEach(b=>b.onclick=()=>{SFX.tap();stickerBook.tier=+b.dataset.tier;stickerBook()});
  $$("[data-s]").forEach(b=>b.onclick=()=>{if(b.classList.contains("locked")){SFX.oops();return}const s=byId(b.dataset.s);SFX.pop();speak(s?s.n:"");const r=b.getBoundingClientRect();confetti(r.left+r.width/2,r.top+r.height/2,25)});
  $("#back").onclick=()=>{SFX.tap();render()};$("#toshop").onclick=()=>{SFX.tap();shop2()}};

const PETS={0:[["unipet","Baby Unicorn","🦄",40],["fairypet","Pocket Fairy","🧚",50],["dragonpet","Tiny Dragon","🐉",70],["bunnypet","Moon Bunny","🐇",30],["swanpet","Sky Swan","🦢",45]],1:[["rexpet","Baby T-Rex","🦖",40],["wolfpet","Loyal Wolf","🐺",50],["piggypet","Block Pig","🐷",30],["eggpet","Mystery Egg","🥚",25],["dragonpet","Cave Dragon","🐉",80]]};
const HATS={0:[["tiara","Tiara","👑",35],["bow","Big Bow","🎀",20],["wand","Wand","🪄",30]],1:[["helmet","Miner Helmet","⛑️",25],["crown","Gold Crown","👑",40],["sword","Sword","🗡️",30]]};
const BOOSTS=[["double","Double Coins","✖️2",30,"Next round pays double coins"],["shield","Power Strike","⚔️",25,"Boss battles: the boss starts with less health"],["hint","Hint Token","💡",15,"Remove one wrong answer, once"]];
if(!S.inv)S.inv={};if(!S.goal)S.goal={};if(!S.equip)S.equip={};
const inv=()=>S.inv[kid]||(S.inv[kid]={});const ownedL=()=>S.owned[kid]||(S.owned[kid]=[]);const coins=()=>S.coins[kid]||0;
const spend=p=>{if(coins()<p){SFX.oops();speak(`You need ${p-coins()} more coins. Keep learning!`,"soft");return false}S.coins[kid]=coins()-p;save();SFX.win();return true};
function showPet(){let el=document.getElementById("pet");const eq=kid!==null&&S.equip[kid]||{};
  if(!eq.pet){if(el)el.remove();}else{if(!el){el=document.createElement("div");el.id="pet";document.body.appendChild(el)}el.textContent=eq.pet}
  const h=document.getElementById("hat");if(h&&eq.hat)h.textContent=eq.hat}
const _render=render;render=function(){_render();showPet()};
let origShop=null;window.shop2=function shop2(){if(!origShop)return;origShop();const box=$(".shop");if(!box)return;const k=kid===1?1:0;
  const card=(id,ic,name,price,desc,got,btn)=>`<button class="item ${got?"got":coins()<price?"poor":""}" data-x="${id}" data-price="${price}"><span class="ic">${ic}</span><b>${name}</b><small>${desc}</small><span class="price">${btn||(got?"✓ Yours":"🪙 "+price)}</span></button>`;
  const g=S.goal[kid];const goalHtml=g?`<div class="goalbox"><b>🎯 Saving for: ${g.ic} ${g.name}</b><div class="bar" style="height:16px;border-radius:8px;background:rgba(0,0,0,.12);overflow:hidden;margin:6px 0"><i style="display:block;height:100%;width:${Math.min(100,coins()/g.price*100)}%;background:var(--good,#3d8f2f)"></i></div><small>${Math.min(coins(),g.price)} of ${g.price} coins${coins()>=g.price?" · You can buy it now!":""}</small> <button class="pill" id="cleargoal">Change goal</button></div>`:`<div class="goalbox"><b>🎯 Pick a goal!</b> <small>Tap the ⭐ on anything to save up for it.</small></div>`;
  const eq=S.equip[kid]||{};const I=inv();
  box.insertAdjacentHTML("afterbegin",goalHtml+`
   <section><h2>🎁 Sticker packs</h2><div class="shelf">${card("pack:1","🎁","Single sticker",8,"1 random sticker",false)}${card("pack:3","🎁🎁🎁","Sticker pack",20,"3 random stickers, maybe a rare!",false)}${card("pack:6","🧰","Mega pack",36,"6 stickers, best value",false)}</div></section>
   <section><h2>${k?"🦖 Pets":"🦄 Pets"}</h2><p class="lede">Your pet follows you around the island.</p><div class="shelf">${PETS[k].map(([id,n,ic,p])=>{const got=ownedL().includes("pet:"+id);return card("pet:"+id,ic,n,p,got?(eq.pet===ic?"Following you":"Tap to bring along"):"A pet friend",got,got?(eq.pet===ic?"★ With you":"Choose"):null)}).join("")}</div></section>
   <section><h2>🎩 Pip's outfits</h2><div class="shelf">${HATS[k].map(([id,n,ic,p])=>{const got=ownedL().includes("hat:"+id);return card("hat:"+id,ic,n,p,"Dress up Pip",got,got?(eq.hat===ic?"★ Wearing":"Wear"):null)}).join("")}</div></section>
   <section><h2>⚡ Power-ups</h2><div class="shelf">${BOOSTS.map(([id,n,ic,p,d])=>card("boost:"+id,ic,n,p,d+(I[id]?` · You have ${I[id]}`:""),false)).join("")}</div></section>`);
  $$(".shop [data-buy]").forEach(b=>{const o=b.onclick;b.onclick=e=>{o&&o(e);if($(".shop"))shop2()}});
  $$(".shop [data-buy], .shop [data-x]").forEach(b=>{b.insertAdjacentHTML("beforeend",`<span class="goalstar" title="Save for this">⭐</span>`)});
  $$(".goalstar").forEach(st=>st.onclick=e=>{e.stopPropagation();const b=st.parentElement;S.goal[kid]={name:b.querySelector("b").textContent,ic:b.querySelector(".ic").textContent||"🎯",price:+b.dataset.price};save();SFX.good();speak(`Great goal! Save up for ${S.goal[kid].name}.`,"happy");shop2()});
  const cg=$("#cleargoal");if(cg)cg.onclick=()=>{delete S.goal[kid];save();shop2()};
  $$("[data-x]").forEach(b=>b.onclick=()=>{const id=b.dataset.x,p=+b.dataset.price;const [type,key]=id.split(":");
    if(type==="pack"){if(!spend(p))return;const got=draw(+key);showPack(got);return}
    if(type==="pet"||type==="hat"){const list=(type==="pet"?PETS:HATS)[k];const it=list.find(x=>x[0]===key);
      if(!ownedL().includes(id)){if(!spend(p))return;ownedL().push(id)}
      const e=S.equip[kid]=S.equip[kid]||{};e[type]=e[type]===it[2]?null:it[2];save();SFX.good();speak(e[type]?`${it[1]}! ${type==="pet"?"Your new friend is following you.":"Pip looks great!"}`:"Okay, put away.","happy");shop2();showPet();return}
    if(type==="boost"){if(!spend(p))return;I[key]=(I[key]||0)+1;save();speak("Power-up saved! It works automatically.","happy");shop2()}});
  if(g&&coins()>=g.price)pip("happy","You can afford your goal! 🎯")};
function showPack(list){const o=document.createElement("div");o.className="brk";o.innerHTML=`<div><h2>🎁 You got…</h2><div class="packrow">${list.map((s,i)=>`<div class="packcard" style="animation-delay:${i*.35}s">${html(s)}<small>${s.n}</small></div>`).join("")}</div><button class="big" id="pk">Awesome!</button></div>`;document.body.appendChild(o);
  list.forEach((s,i)=>setTimeout(()=>{SFX.count(i);if(s.t===2){confetti(innerWidth/2,innerHeight/2,120);speak(`Wow! A ${s.n}!`,"happy")}},i*350+200));
  o.querySelector("#pk").onclick=()=>{o.remove();shop2()}}
const _correct=correct;correct=function(x,y,s){const before=S.coins[kid]||0;_correct(x,y,s);const I=kid!==null&&S.inv[kid];if(I&&round&&round.double){const add=(S.coins[kid]||0)-before;if(add>0){S.coins[kid]+=add;save()}}};
const _next=next;next=function(){if(round&&round.n===0&&!round.boostsSet&&kid!==null){round.boostsSet=1;const I=inv();
    if(I.double>0){I.double--;round.double=1;setTimeout(()=>pip("happy","✖️2 Double coins this round!"),600)}
    if(I.shield>0&&round.boss){I.shield--;round.boss.hp=Math.max(1,round.boss.hp-1);setTimeout(()=>pip("happy","⚔️ Power Strike! Boss starts weaker"),900)}save()}
  _next();
  const I=kid!==null&&inv();if(I&&I.hint>0&&round&&round.q&&round.q.opts&&round.q.opts.length>2){setTimeout(()=>{const box=$(".opts");if(!box||$("#hintbtn"))return;box.insertAdjacentHTML("beforebegin",`<button class="pill" id="hintbtn" style="margin:6px 0">💡 Use hint (${I.hint})</button>`);
    $("#hintbtn").onclick=()=>{const q=round.q;const btns=$$(".opt");const wrongI=q.opts.map((o,i)=>[o,i]).filter(([o])=>String(o.v)!==String(q.ans)).map(x=>x[1]);const i=pick(wrongI);if(btns[i]){btns[i].classList.add("gone");btns[i].style.pointerEvents="none"}I.hint--;save();$("#hintbtn").remove();SFX.pop()}},450)}};
const _map=map;map=function(){_map();const sb=$("#shopbtn");if(sb){origShop=()=>{const o=sb.__o||sb.onclick;sb.__o=o;o()};sb.__o=sb.onclick;sb.onclick=()=>{SFX.tap();shop2()}}const g=S.goal[kid];const top=$(".top");if(g&&top&&!$("#goalpill")){top.insertAdjacentHTML("beforeend",`<span class="pill" id="goalpill">🎯 ${g.ic} ${Math.min(S.coins[kid]||0,g.price)}/${g.price}</span>`)}};
const css=document.createElement("style");css.textContent=`.stk{display:inline-grid;place-items:center;position:relative;width:1.6em;height:1.6em;border-radius:22%;box-shadow:inset 0 0 0 3px rgba(0,0,0,.08)}.stk i{position:absolute;right:-.25em;top:-.25em;font-size:.45em;font-style:normal}
.stk.t2{box-shadow:0 0 0 3px #fff,0 0 18px 4px rgba(255,200,255,.9);animation:shine 2.4s infinite}@keyframes shine{50%{filter:brightness(1.18)}}
.stickers.big .sticker{font-size:2.6rem;display:grid;gap:2px;padding:6px}.sticker small{font-size:.75rem;font-weight:800;line-height:1.1;color:#14262c}.sticker.locked{color:#33515a;font-weight:800}
.tierbar{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}.tierbar .on{outline:3px solid #14262c}
.newsticker .stk{font-size:4rem}.stkname{display:block;font-weight:800;margin-top:4px}
.goalbox{background:var(--panel,#fff);color:#14262c;border:3px solid var(--line,#ccc);border-radius:18px;padding:12px 14px;margin:8px 0 14px}
.item{position:relative}.goalstar{position:absolute;top:6px;right:8px;font-size:1.2rem;opacity:.75}
.packrow{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin:16px 0}.packcard{background:#fff;color:#14262c;border-radius:20px;padding:14px;font-size:3.6rem;display:grid;gap:4px;min-width:130px;animation:flipin .5s both}.packcard small{font-size:1rem;font-weight:800}
.brk h2{color:#fff!important}@keyframes flipin{from{transform:rotateY(90deg) scale(.6);opacity:0}to{transform:none;opacity:1}}
#pet{position:fixed;right:118px;bottom:26px;font-size:46px;z-index:6;animation:petbob 1.6s ease-in-out infinite;pointer-events:none}@keyframes petbob{50%{transform:translateY(-10px) rotate(-6deg)}}
`;document.head.appendChild(css);
})();
