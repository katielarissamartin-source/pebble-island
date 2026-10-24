(function(){
if(!S.adaptV){S.adaptV=1;const ps=S.progress[1]||{};Object.values(ps).forEach(p=>{p.placed=false});save()}
if(!S.rt)S.rt={};
let qT=0;
const W=id=>WORLDS.find(w=>w.id===id);
const med=a=>{const s=[...a].sort((x,y)=>x-y);return s.length?s[Math.floor(s.length/2)]:6000};
function R(p,w){if(p.r===undefined)p.r=p.lvl;p.r=Math.min(Math.max(p.r,p.lvl-.5),p.lvl+.99);p.hist=p.hist||[];return p}
function apply(p,w,why){const max=W(w).max;p.r=Math.max(1,Math.min(max+.99,p.r));let nl=p.r>=p.lvl+1?Math.floor(p.r):p.r<p.lvl-.45?p.lvl-1:p.lvl;nl=Math.max(1,Math.min(max,nl));if(nl<p.lvl)p.r=nl+.5;
  if(nl>p.lvl){const jump=nl-p.lvl;p.lvl=nl;p.best=Math.max(p.best||0,nl);p.streak=0;checkSkins();
    setTimeout(()=>{pip("happy",jump>1?`Too easy! Skipping ${jump} levels 🚀`:"Level up! 🚀");speak(jump>1?`Whoa, that was too easy for you! Skipping ahead ${jump} levels!`:`Level up, ${NAME()}!`,"happy")},900);
    window.logEv&&logEv("levelup",{world:w,level:nl,data:{why,jump}})}
  else if(nl<p.lvl){p.lvl=nl;window.logEv&&logEv("leveldown",{world:w,level:nl,data:{why}})}
  save()}
function record(ok,firstTry){if(!round||round.place||round.mix&&!round.w)return;const w=round.w,p=R(prog(w),w);if(!W(w).max)return;
  const ms=Date.now()-qT;const k=kid;const rts=S.rt[k]=(S.rt[k]||[]);const m=med(rts);const fast=ms<m*.8,slow=ms>m*1.6;
  const L=round.qLevel||p.lvl;const above=L>p.lvl;
  if(firstTry&&ok){rts.push(ms);if(rts.length>30)rts.shift()}
  if(ok&&!firstTry)return;
  p.hist.push(ok?(fast?2:1):0);if(p.hist.length>8)p.hist.shift();
  let d=0,why="";
  if(ok){d=fast?.4:slow?.15:.25;if(above)d+=.25;why=fast?"fast-correct":"correct"}
  else{const guess=ms<m*.4;if(guess){d=0;why="guess"}else{d=above?-.05:-.3;why="wrong"}}
  p.r+=d;
  const h=p.hist.slice(-5);if(h.length===5&&h.every(x=>x===2)){p.r+=1;p.hist=[];why="bored-skip"}
  const h6=p.hist.slice(-6);if(h6.length===6&&h6.filter(x=>x===0).length>=4){p.r-=.6;p.hist=[];why="struggling"}
  apply(p,w,why)}
const _next=next;next=function(){_next();qT=Date.now();
  if(!round||round.place||!round.q||round.tag||round.mix)return;const w=round.w,p=R(prog(w),w);const max=W(w).max;if(!max)return;
  const frac=p.r-p.lvl;if(p.lvl<max&&Math.random()<Math.min(.5,frac)){round.q=GEN[w](p.lvl+1);round.qLevel=p.lvl+1;round.tag="stretch";render()}};
const _correct=correct;correct=function(x,y,s){if(!round)return _correct(x,y,s);const first=round.tries===0;const p=prog(round.w);
  record(true,first);if(!round.place)p.streak=-99;_correct(x,y,s);if(p.streak<0)p.streak=0;save()};
const _wrong=wrong;wrong=function(line){if(round&&!round.whyStage&&round.tries===0)record(false,true);_wrong(line)};
const _miss=miss;miss=function(){};
window.adaptInfo=(k,w)=>{const p=(S.progress[k]||{})[w];return p?{lvl:p.lvl,r:+(p.r||p.lvl).toFixed(2)}:null};
})();
