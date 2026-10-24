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
