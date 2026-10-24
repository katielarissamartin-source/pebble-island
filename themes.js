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
