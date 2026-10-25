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
const boom=(n)=>{try{confetti(innerWidth/2,innerHeight/3,n||80)}catch(e){}};
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const P=a=>a[Math.floor(Math.random()*a.length)];
const mix=a=>a.map(x=>[Math.random(),x]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
const age=k=>(S.kids[k]&&S.kids[k].age)||7;
const uni=k=>k===0,dino=k=>k===1;

function numOpts(ans,spread,min){
 const set=new Set([ans]);let guard=0;
 while(set.size<3&&guard++<60){const d=R(1,spread)*(Math.random()<.5?-1:1);const v=ans+d;if(v>=(min??0))set.add(v)}
 while(set.size<3)set.add(ans+set.size);
 return mix([...set]).map(String);
}
const pack=(q,sayq,ans,opts,work,pic)=>({q,say:sayq||q,ans:String(ans),opts:opts.map(String),work,pic:pic||""});
const dots=(n,cls)=>'<span class="bb-dots">'+Array.from({length:n},()=>'<i class="'+(cls||"")+'"></i>').join("")+'</span>';
const icon=k=>uni(k)?"🦄":dino(k)?"🦖":"⭐";

const SK={
 add:{name:"Adding",area:"maths",ico:"➕",lv:[0,1,1,2,2,3,4,5],gen(L,k){
  const r=[[1,4,1,4,5],[1,9,1,9,10],[2,15,1,9,20],[11,89,1,9,0],[11,59,11,39,0],[15,79,15,49,0],[101,599,101,399,0],[1001,5999,1001,3999,0]][L-1];
  let a,b,g=0;do{a=R(r[0],r[1]);b=R(r[2],r[3]);g++}while(g<50&&((r[4]&&a+b>r[4])||(L===5&&(a%10)+(b%10)>9)||(L===6&&(a%10)+(b%10)<10)));
  const s=a+b,w=a<=10&&b<=10?["Start at "+a+".","Count on "+b+".",a+" + "+b+" = "+s+"."]:["Add the ones: "+(a%10)+" + "+(b%10)+" = "+((a%10)+(b%10))+".","Add the rest.",a+" + "+b+" = "+s+"."];
  return pack(a+" + "+b+" = ?",a+" plus "+b,s,numOpts(s,L<3?3:L<5?10:L<7?20:100),w,s<=10?dots(a,"a")+'<b class="bb-plus">+</b>'+dots(b,"b"):"");
 }},
 sub:{name:"Taking away",area:"maths",ico:"➖",lv:[0,1,1,2,2,3,4,5],gen(L,k){
  const r=[[2,5],[3,10],[11,20],[21,99],[30,99],[30,99],[201,999],[2001,9999]][L-1];
  let a=R(r[0],r[1]),b,g=0;
  do{b=L<3?R(1,a-1):L===3?R(1,a-10>0?9:a-1):L<6?R(1,L===4?9:a-10):R(11,a-1);g++}while(g<50&&(b<1||b>=a||(L===5&&(a%10)<(b%10))||(L===6&&(a%10)>=(b%10))));
  if(b<1||b>=a)b=1;const d=a-b;
  return pack(a+" − "+b+" = ?",a+" take away "+b,d,numOpts(d,L<3?3:L<6?10:100),a<=10?["Start with "+a+".","Take away "+b+".",d+" are left."]:["Take the ones: "+(a%10)+" − "+(b%10)+(a%10<b%10?" (swap a ten for 10 ones first)":"")+".","Take the rest.",a+" − "+b+" = "+d+"."],a<=10?dots(d,"a")+dots(b,"x"):"");
 }},
 times:{name:"Times tables",area:"maths",ico:"✖️",lv:[2,2,3,4,4,5,6],gen(L,k){
  const T=[[2,10],[5,2,10],[3,4],[6,7,8,9],[11,12,6,7,8,9],null,null][L-1];
  let a,b;if(L===6){a=R(12,49);b=R(2,9)}else if(L===7){a=R(11,25);b=R(11,19)}else{a=P(T);b=R(1,L<3?10:12)}
  const s=a*b;
  return pack(b+" × "+a+" = ?",b+" times "+a,s,numOpts(s,L<5?a:Math.max(10,a)),L<6?[b+" groups of "+a+".","Count by "+a+": "+Array.from({length:Math.min(b,6)},(_,i)=>(i+1)*a).join(", ")+(b>6?" …":"")+".",b+" × "+a+" = "+s+"."]:["Split it up: "+b+" × "+(a-a%10)+" = "+b*(a-a%10)+".",b+" × "+(a%10)+" = "+b*(a%10)+".","Add them: "+s+"."],a*b<=20&&L<3?Array.from({length:b},()=>dots(a,"a")).join(" "):"");
 }},
 div:{name:"Sharing",area:"maths",ico:"➗",lv:[2,3,4,5,6],gen(L,k){
  if(L===1){const n=R(1,6),t=n*2;return pack("Share "+t+" between 2. How many each?","Share "+t+" between 2. How many each?",n,numOpts(n,2,1),["Give one each, again and again.","Each gets "+n+".",n+" + "+n+" = "+t+"."],dots(t,"a"))}
  const d=L===2?P([2,5,10]):R(2,L<4?10:9),q=L<5?R(2,L<3?10:12):R(12,99),r=L>=4?R(1,d-1):0,n=d*q+r;
  const ans=r?q+" r "+r:q;
  const opts=r?mix([ans,(q+1)+" r "+r,q+" r "+((r%(d-1||1))+1===r?r+1:(r%(d-1||1))+1)]):numOpts(q,3,1);
  return pack(n+" ÷ "+d+" = ?",n+" divided by "+d,ans,[...new Set(opts.map(String))].length===3?opts:numOpts(q,3,1).map((x,i)=>i===0&&r?ans:x),[d+" × "+q+" = "+d*q+".",r?r+" left over.":"Nothing left over.","So "+n+" ÷ "+d+" = "+ans+"."]);
 }},
 pv:{name:"Place value",area:"maths",ico:"🔢",lv:[1,2,3,4,5,6],gen(L,k){
  if(L<=2){const t=R(1,L===1?4:9),o=R(0,9),n=t*10+o;return P([0,1])?pack("How many tens in "+n+"?","How many tens in "+n,t,numOpts(t,2,0),[n+" = "+t+" tens and "+o+" ones.","So "+t+" tens."]):pack(t+" tens and "+o+" ones is…?",t+" tens and "+o+" ones",n,numOpts(n,10,1),[t+" tens = "+t*10+".",t*10+" + "+o+" = "+n+"."])}
  if(L<=4){const n=L===3?R(101,999):R(1001,9999),s=String(n),pos=(()=>{const c=[...s].map((d,i)=>d!=="0"?i:-1).filter(i=>i>=0);return P(c)})(),names=["thousands","hundreds","tens","ones"].slice(4-s.length),dg=+s[pos],val=dg*Math.pow(10,s.length-1-pos);
   return pack("What is the "+dg+" worth in "+n.toLocaleString("en-AU")+"?","What is the "+dg+" worth in "+n,val,mix([val,val*10,val>=10?val/10:val+1].filter((v,i,a)=>a.indexOf(v)===i).concat([val+2]).slice(0,3)),["The "+dg+" is in the "+names[pos]+" place.","So it is worth "+val+"."])}
  const t=L===5?R(1,99)/10:R(101,999)/100,str=t.toFixed(L===5?1:2),dg=str.slice(-1);
  return pack("What is the last digit worth in "+str+"?","What is the last digit worth in "+str,(L===5?dg+" tenths":dg+" hundredths"),mix([L===5?dg+" tenths":dg+" hundredths",dg+" ones",L===5?dg+" hundredths":dg+" tenths"]),["After the point: tenths, then hundredths.","The last digit is in the "+(L===5?"tenths":"hundredths")+" place."]);
 }},
 frac:{name:"Fractions",area:"maths",ico:"🍕",lv:[1,2,3,4,5,6],gen(L,k){
  if(L<=2){const parts=L===1?2:P([2,4]),sh=R(1,parts-1)||1,ok=L===1?true:Math.random()<.6;const show=ok?sh:sh;const name=parts===2?"half":"quarter";
   const pic='<span class="bb-pie">'+Array.from({length:parts},(_,i)=>'<i class="'+(i<show?"on":"")+'" style="--a:'+(360/parts*i)+'deg;--s:'+(360/parts)+'deg"></i>').join("")+'</span>';
   const ans=show+"/"+parts,o=mix([ans,(show===1?2:1)+"/"+parts,show+"/"+(parts===2?4:2)]);
   return pack("What part is coloured?","What part of the shape is coloured?",ans,o,["The shape has "+parts+" equal parts.",show+" "+(show>1?"are":"is")+" coloured.","So "+ans+"."],pic)}
  if(L===3){const d=P([2,3,4,5]),n=d*R(2,6);return pack("What is 1/"+d+" of "+n+"?","What is one "+["","","half","third","quarter","fifth"][d]+" of "+n,n/d,numOpts(n/d,3,1),["Share "+n+" into "+d+" equal groups.",n+" ÷ "+d+" = "+n/d+"."])}
  if(L===4){const d=P([2,3,4,5]),m=R(2,4),n=R(1,d-1);return pack(n+"/"+d+" = ?/"+(d*m),n+" over "+d+" equals what over "+d*m,n*m,numOpts(n*m,2,1),["The bottom went × "+m+".","Do the same to the top: "+n+" × "+m+" = "+n*m+"."])}
  if(L===5){const d=P([5,6,8,10]),a=R(1,d-2),b=R(1,d-a-1);return pack(a+"/"+d+" + "+b+"/"+d+" = ?",a+" "+d+"ths plus "+b+" "+d+"ths",(a+b)+"/"+d,mix([(a+b)+"/"+d,(a+b)+"/"+(2*d),(a+b+1)+"/"+d]),["Same bottom number, so add the tops.",a+" + "+b+" = "+(a+b)+".","Keep the bottom: "+(a+b)+"/"+d+"."])}
  const p=P([10,25,50,20]),n=P([40,60,80,120,200,300]);return pack(p+"% of "+n+" = ?",p+" percent of "+n,n*p/100,numOpts(n*p/100,10,1),[p+"% means "+p+" out of 100.",n+" ÷ 100 × "+p+" = "+n*p/100+"."]);
 }},
 skip:{name:"Number patterns",area:"maths",ico:"🔁",lv:[0,1,2,3,5],gen(L,k){
  const step=L===1?1:L===2?P([2,5,10]):L===3?P([3,4,-2,-5]):L===4?P([25,50,100]):0;
  if(L===5){const a=R(2,9),b=R(1,a-1);let s=R(1,20);const seq=[s];for(let i=0;i<4;i++){s+=i%2?-b:a;seq.push(s)}const ans=seq.pop();return pack(seq.join(", ")+", ?","What comes next? "+seq.join(", "),ans,numOpts(ans,4,0),["The rule: + "+a+", then − "+b+".",seq[seq.length-1]+" + "+a+" = "+ans+"."])}
  let s=step<0?R(30,60):step>=25?R(0,4)*step:R(0,step===1?10:20);const seq=[s,s+step,s+2*step,s+3*step],ans=s+4*step;
  return pack(seq.join(", ")+", ?","What comes next? "+seq.join(", "),ans,numOpts(ans,Math.abs(step)||2,0),["Each number is "+(step>0?step+" more":(-step)+" less")+".",seq[3]+(step>0?" + "+step:" − "+(-step))+" = "+ans+"."]);
 }},
 time:{name:"Telling time",area:"maths",ico:"🕒",lv:[1,1,2,3,4],gen(L,k){
  const h=R(1,12),m=L===1?0:L===2?30:L===3?P([0,15,30,45]):R(1,11)*5;
  const f=(h,m)=>m===0?h+" o'clock":m===30?"half past "+h:m===15?"quarter past "+h:m===45?"quarter to "+(h%12+1):h+":"+String(m).padStart(2,"0");
  let pic="";try{pic='<span class="bb-clock">'+clock(h,m,150)+'</span>'}catch(e){}
  if(L===5){const add=P([15,20,30,45]),t=h*60+m+add,h2=(Math.floor(t/60)-1)%12+1,m2=t%60;return pack("It is "+f(h,m)+". What time is it in "+add+" minutes?","It is "+f(h,m)+". What time will it be in "+add+" minutes?",f(h2,m2),mix([f(h2,m2),f(h2,(m2+15)%60),f(h%12+1,m)]).filter((v,i,a)=>a.indexOf(v)===i).concat(["Not sure"]).slice(0,3),["Start at "+f(h,m)+".","Add "+add+" minutes.","It is "+f(h2,m2)+"."],pic)}
  const ans=f(h,m),o=mix([ans,f(h%12+1,m),f(h,(m+(L<3?30:15))%60)]).filter((v,i,a)=>a.indexOf(v)===i);while(o.length<3)o.push(f(R(1,12),m));
  return pack("What time is it?","What time does the clock show?",ans,o,["The short hand points to the hour.","The long hand shows the minutes.","It is "+ans+"."],pic);
 }},
 spell:{name:"Spelling",area:"english",ico:"🔤",lv:[0,1,1,2,2,3,4,5],gen(L,k){
  const W=[
   [["cat","🐱"],["dog","🐶"],["sun","☀️"],["pig","🐷"],["bus","🚌"],["hat","🎩"],["bed","🛏️"],["cup","🥤"],["fox","🦊"],["web","🕸️"],["map","🗺️"],["pen","🖊️"]],
   [["frog","🐸"],["crab","🦀"],["drum","🥁"],["star","⭐"],["tent","⛺"],["milk","🥛"],["nest","🪺"],["flag","🚩"],["hand","✋"],["lamp","💡"]],
   [["ship","🚢"],["fish","🐟"],["chip","🍟"],["shell","🐚"],["thumb","👍"],["moth","🦋"],["chick","🐥"],["sheep","🐑"],["bath","🛁"],["shop","🏪"]],
   [["cake","🎂"],["kite","🪁"],["bone","🦴"],["tree","🌳"],["boat","⛵"],["rain","🌧️"],["queen","👸"],["snake","🐍"],["slide","🛝"],["train","🚂"]],
   [["night","🌙"],["light","💡"],["horse","🐴"],["mouse","🐭"],["cloud","☁️"],["clown","🤡"],["candle","🕯️"],["purple","💜"],["apple","🍎"],["table","🪑"]],
   [["because","❓"],["friend","🤝"],["people","👨‍👩‍👧"],["school","🏫"],["write","✍️"],["laugh","😂"],["enough","✋"],["beautiful","🌸"],["island","🏝️"],["castle","🏰"]],
   [["running","🏃"],["happily","😊"],["hopping","🐇"],["careful","⚠️"],["biggest","🐘"],["stopped","🛑"],["babies","👶"],["swimming","🏊"],["hiked","🥾"],["family","👪"]],
   [["mysterious","🔮"],["dinosaur","🦖"],["volcano","🌋"],["necessary","✅"],["separate","↔️"],["environment","🌏"],["unicorn","🦄"],["temperature","🌡️"],["adventure","🗺️"],["rhythm","🥁"]]
  ][L-1];
  const [w,e]=P(W);
  const mutate=s=>{const vow="aeiou";const ops=[
   ()=>s.replace(/[aeiou]/,c=>P(vow.replace(c,"").split(""))),
   ()=>s.length>3?s.slice(0,-2)+s.slice(-1)+s.slice(-2,-1):s+"e",
   ()=>s.replace(/(.)\1/,"$1")!==s?s.replace(/(.)\1/,"$1"):s.replace(/([^aeiou])/,"$1$1"),
   ()=>s.replace("sh","s").replace("ch","c").replace("th","f").replace("igh","i").replace("ou","ow"),
   ()=>s.endsWith("e")?s.slice(0,-1):s+"e",
   ()=>s.replace("c","k").replace("y","ee").replace("ph","f")];
   let t=s,g=0;while((t===s)&&g++<20)t=P(ops)();return t};
  const set=new Set([w]);let g=0;while(set.size<3&&g++<40)set.add(mutate(w));while(set.size<3)set.add(w+"s".repeat(set.size));
  if(L===1){const i=w.search(/[aeiou]/),blank=w.slice(0,i)+"_"+w.slice(i+1);return pack("Which letter is missing? "+blank,"Which letter is missing in "+w+"?",w[i],mix([w[i],...P([["a","o"],["e","i"],["u","a"],["i","o"]]).filter(x=>x!==w[i])].slice(0,3)),["Say it slowly: "+w.split("").join("-")+".","The middle sound is "+w[i]+".","So it is "+w+"."],'<span class="bb-pic">'+e+'</span>')}
  return pack("Which is the right spelling?","Which spells "+w+"?",w,mix([...set]),["Say it slowly: "+w+".","Look at each letter: "+w.split("").join(" ")+".","The right one is "+w+"."],'<span class="bb-pic">'+e+'</span>');
 }},
 words:{name:"Word meaning",area:"english",ico:"📖",lv:[0,1,2,3,4,5],gen(L,k){
  const sets=[
   [["big","small"],["hot","cold"],["up","down"],["happy","sad"],["fast","slow"],["day","night"]],
   [["full","empty"],["loud","quiet"],["open","closed"],["wet","dry"],["first","last"],["light","heavy"]],
   [["huge","enormous"],["tiny","little"],["quick","fast"],["shout","yell"],["glad","happy"],["scared","afraid"]],
   [["brave","courageous"],["sparkle","glitter"],["gloomy","dull"],["giggle","laugh"],["ancient","very old"],["exhausted","very tired"]],
   [["generous","giving"],["curious","wanting to know"],["fragile","easy to break"],["vast","very big"],["timid","shy"],["hasty","in a hurry"]],
   [["reluctant","not keen"],["abundant","plenty"],["meticulous","very careful"],["resilient","bounces back"],["peculiar","strange"],["serene","calm"]]
  ][L-1];
  const [a,b]=P(sets),others=mix(sets.filter(x=>x[0]!==a)).slice(0,2).map(x=>x[1]),opp=L<=2;
  return pack(opp?"What is the opposite of “"+a+"”?":"What does “"+a+"” mean?",opp?"What is the opposite of "+a+"?":"What does "+a+" mean?",b,mix([b,...others]),opp?["“"+a+"” and “"+b+"” mean very different things.","So the opposite is "+b+"."]:["“"+a+"” means “"+b+"”.","Try it: the "+(dino(k)?"dino":"unicorn")+" was "+a+"."]);
 }}
};
const KEYS=Object.keys(SK);

function yearOf(k){try{const y=S.pathwayYear&&S.pathwayYear[k];if(y!==undefined&&y!==null&&y!=="")return+y}catch(e){}const a=age(k);return Math.max(0,Math.min(6,a-5))}
function model(k){
 S.boost=S.boost||{};const m=S.boost[k]=S.boost[k]||{skills:{},sessions:0,lastBoss:0,log:[]};
 const y=yearOf(k);
 KEYS.forEach(id=>{if(!m.skills[id]){const lv=SK[id].lv;let L=1;for(let i=0;i<lv.length;i++)if(lv[i]<=y-1)L=i+1;m.skills[id]={L,p:.35,n:0,ok:0,run:0,last:0}}});
 return m;
}
const yr=(id,L)=>SK[id].lv[Math.min(L,SK[id].lv.length)-1];

function chooseSkill(m,avoid){
 const now=Date.now();let tot=0;const w=KEYS.map(id=>{const s=m.skills[id];const stale=Math.min(3,1+(now-(s.last||0))/36e5/4);const v=(id===avoid?.15:1)*(1.25-Math.abs(s.p-.55))*stale;tot+=v;return v});
 let r=Math.random()*tot;for(let i=0;i<KEYS.length;i++){r-=w[i];if(r<=0)return KEYS[i]}return KEYS[0];
}

function update(m,id,right,secs,fast){
 const s=m.skills[id],G=.33,SL=.1,T=.18;
 const post=right?s.p*(1-SL)/(s.p*(1-SL)+(1-s.p)*G):s.p*SL/(s.p*SL+(1-s.p)*(1-G));
 s.p=Math.min(.99,post+(1-post)*T*(right?1:.3));s.n++;s.last=Date.now();
 if(right){s.ok++;s.run=Math.max(0,s.run)+1}else s.run=Math.min(0,s.run)-1;
 const max=SK[id].lv.length;let ev=null;
 const quick=right&&secs<fast;
 if(s.L<max&&((s.p>=.9&&s.n>=4)||(s.run>=3&&quick&&s.n<=4)||s.run>=5)){s.L++;s.p=.35;s.n=0;s.ok=0;s.run=0;ev="up"}
 else if(s.L>1&&s.run<=-3&&s.p<.3){s.L--;s.p=.6;s.n=0;s.ok=0;s.run=0;ev="down"}
 return ev;
}

function estYear(m,area){const ys=KEYS.filter(id=>SK[id].area===area).map(id=>yr(id,m.skills[id].L)).sort((a,b)=>a-b);return ys[Math.floor(ys.length/2)]}

const css=document.createElement("style");
css.textContent=`
.bb-root{max-width:720px;width:100%;margin:0 auto 110px;display:grid;gap:14px;background:rgba(255,255,255,.97);border-radius:24px;padding:16px 18px 24px;box-shadow:0 6px 24px rgba(0,0,0,.25);color:#14262c}
.bb-root *{box-sizing:border-box}
.bb-root h1,.bb-root h2{margin:4px 0 0;color:#14262c!important;-webkit-text-fill-color:#14262c!important;font-family:var(--display)}
.bb-root h1{font-size:clamp(1.5rem,5vw,2rem)}
.bb-q{margin:0;font:800 clamp(1.4rem,5vw,1.9rem)/1.3 var(--display);text-align:center}
.bb-p{margin:0;font-size:1.15rem;line-height:1.45}
.bb-show{min-height:90px;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:10px;padding:10px;border-radius:18px;background:#eef7fb}
.bb-dots{display:inline-flex;flex-wrap:wrap;gap:5px;max-width:170px;justify-content:center}.bb-dots i{width:22px;height:22px;border-radius:50%;background:#3d8fb0}.bb-dots i.b{background:#e08a2e}.bb-dots i.x{background:#c9dbe2;position:relative}.bb-dots i.x::after{content:"";position:absolute;left:-2px;right:-2px;top:9px;height:4px;background:#d9534f;transform:rotate(-35deg)}
.bb-plus{font-size:1.8rem}
.bb-pic{font-size:4.2rem;line-height:1}
.bb-clock{--bg2:#fff;color:#14262c}
.bb-pie{position:relative;width:120px;height:120px;border-radius:50%;background:#fff;border:4px solid #125877;overflow:hidden;display:block}
.bb-pie i{position:absolute;inset:0;background:conic-gradient(from var(--a),#e9eef0 0 var(--s),transparent var(--s));border-right:0}
.bb-pie i.on{background:conic-gradient(from var(--a),#f2b544 0 var(--s),transparent var(--s))}
.bb-pie::after{content:"";position:absolute;inset:0;background:repeating-conic-gradient(transparent 0 calc(var(--n,90deg) - 2deg),#125877 0 var(--n,90deg))}
.bb-opts{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
.bb-btn{min-height:68px;border-radius:18px;border:3px solid #125877;background:#fff;color:#14262c;font:800 1.35rem var(--display);cursor:pointer;padding:10px 14px;box-shadow:0 4px 0 #0c3d52}
.bb-btn.good{background:#2f7d4f;border-color:#1f5a37;color:#fff}.bb-btn.bad{background:#fbe3e1;border-color:#c0504d}
.bb-btn:disabled{cursor:default}
.bb-go{background:#2f7d4f;border-color:#1f5a37;color:#fff;box-shadow:0 4px 0 #1f5a37}
.bb-boss{background:#6b3fa0;border-color:#4b2a73;color:#fff;box-shadow:0 4px 0 #4b2a73}
.bb-back{justify-self:start;border:0;background:none;color:#125877;font:800 1.05rem var(--display);cursor:pointer;padding:6px 0}
.bb-why{border-radius:18px;background:#fff6dc;border:2px solid #d9a52b;padding:12px 16px;font-size:1.1rem;line-height:1.45}.bb-why ol{margin:6px 0 0;padding-left:1.4em}
.bb-bar{display:flex;gap:6px;justify-content:center}.bb-bar i{width:16px;height:16px;border-radius:50%;background:#c9dbe2}.bb-bar i.ok{background:#2f7d4f}.bb-bar i.no{background:#e0a33a}.bb-bar i.now{outline:3px solid #125877}
.bb-skills{display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
.bb-sk{border-radius:14px;background:#eef7fb;padding:8px 10px;font-size:.95rem}.bb-sk b{display:block;font-size:1rem}
.bb-meter{height:8px;border-radius:4px;background:#c9dbe2;overflow:hidden;margin-top:4px}.bb-meter i{display:block;height:100%;background:#2f7d4f}
.bb-up{animation:bbup .7s ease}@keyframes bbup{0%{transform:scale(.6)}60%{transform:scale(1.15)}100%{transform:scale(1)}}
`;
document.head.appendChild(css);

let K=null,M=null,Q=[],ix=0,res=[],boss=false,t0=0,lives=3,lastSkill=null,ups=[];
function frame(inner){app().innerHTML='<main class="bb-root"><button type="button" class="bb-back" id="bb-back">← Back</button>'+inner+'</main>';document.getElementById("bb-back").onclick=()=>{sfx("tap");home()};try{scrollTo(0,0)}catch(e){}}
function home(){if(window.PEBBLE_TODAY)PEBBLE_TODAY.show();else if(typeof render==="function")render()}
const bossReady=m=>Date.now()-(m.lastBoss||0)>6*864e5;

function intro(){
 const k=who();if(k===null||!S.kids||!S.kids[k])return;
 try{round=null}catch(e){}document.body.classList.remove("adult");
 K=k;M=model(k);
 const sk=KEYS.map(id=>{const s=M.skills[id];return'<div class="bb-sk"><b>'+SK[id].ico+' '+esc(SK[id].name)+'</b>Level '+s.L+' of '+SK[id].lv.length+'<div class="bb-meter"><i style="width:'+Math.round(s.p*100)+'%"></i></div></div>'}).join("");
 frame('<h1>'+icon(k)+' Brain Boost</h1><p class="bb-p">Questions that grow with you. Get them right and they get harder.</p><button type="button" class="bb-btn bb-go" id="bb-start">Start 10 questions →</button>'+(bossReady(M)?'<button type="button" class="bb-btn bb-boss" id="bb-boss">⚔️ Weekly boss challenge</button>':'')+'<h2>My levels</h2><div class="bb-skills">'+sk+'</div>');
 say("Brain Boost! Questions that grow with you.","happy");
 document.getElementById("bb-start").onclick=()=>{sfx("tap");begin(false)};
 const b=document.getElementById("bb-boss");if(b)b.onclick=()=>{sfx("tap");begin(true)};
}

function begin(isBoss){
 boss=isBoss;ix=0;res=[];lives=3;ups=[];Q=[];lastSkill=null;
 ask();
}
function makeQ(){
 const id=chooseSkill(M,lastSkill);lastSkill=id;const s=M.skills[id];
 const L=boss?Math.min(SK[id].lv.length,s.L+1):s.L;
 let q=null;for(let i=0;i<5&&!q;i++){try{const x=SK[id].gen(L,K);if(x&&x.opts.length>=2&&x.opts.indexOf(x.ans)>=0&&new Set(x.opts).size===x.opts.length)q=x}catch(e){}}
 if(!q){const a=R(1,9),b=R(1,9);q=pack(a+" + "+b+" = ?",a+" plus "+b,a+b,numOpts(a+b,3),[a+" + "+b+" = "+(a+b)+"."])}
 q.id=id;q.L=L;return q;
}
function ask(){
 const q=makeQ();Q[ix]=q;t0=Date.now();
 const bar='<div class="bb-bar">'+Array.from({length:10},(_,i)=>'<i class="'+(i<res.length?(res[i]?"ok":"no"):"")+(i===ix?" now":"")+'"></i>').join("")+'</div>';
 frame((boss?'<p class="bb-p" style="text-align:center"><b>⚔️ Boss challenge</b> · '+"❤️".repeat(lives)+'</p>':'')+bar+'<p class="bb-p" style="text-align:center">'+SK[q.id].ico+' '+esc(SK[q.id].name)+'</p><p class="bb-q">'+esc(q.q)+'</p>'+(q.pic?'<div class="bb-show">'+q.pic+'</div>':'')+'<div class="bb-opts">'+q.opts.map((o,i)=>'<button type="button" class="bb-btn" data-o="'+i+'">'+esc(o)+'</button>').join("")+'</div>');
 if(q.pic.indexOf("bb-pie")>=0){const p=app().querySelector(".bb-pie");const parts=p.children.length;p.style.setProperty("--n",(360/parts)+"deg")}
 say(q.say);
 app().querySelectorAll("[data-o]").forEach(b=>b.onclick=()=>answer(b,q));
}
function answer(btn,q){
 const right=btn.textContent===q.ans,secs=(Date.now()-t0)/1000;
 app().querySelectorAll("[data-o]").forEach(b=>{b.disabled=true;if(b.textContent===q.ans)b.classList.add("good")});
 if(!right)btn.classList.add("bad");
 res.push(right);
 try{window.logEv&&logEv("boost",{kid:K,world:q.id,level:q.L,ok:right,ms:Math.round(secs*1000)})}catch(e){}
 const ev=update(M,q.id,right,secs,age(K)<9?9:7);
 if(ev==="up")ups.push(q.id);
 if(right){sfx("good");try{window.PEBBLE_FAIR&&PEBBLE_FAIR.src("boost");addCoins(boss?3:2);window.PEBBLE_FAIR&&PEBBLE_FAIR.after()}catch(e){}}
 else if(boss)lives--;
 const box=document.createElement("div");box.className="bb-why";
 box.innerHTML=(right?"<b>"+P(["Yes!","Brilliant!","You got it!","Nice one!"])+"</b>":"<b>Now we know!</b> The answer is "+esc(q.ans)+".")+(ev==="up"?' <b class="bb-up" style="display:inline-block">⬆️ Level up in '+esc(SK[q.id].name)+'!</b>':"")+(right?"":"<ol>"+q.work.map(w=>"<li>"+esc(w)+"</li>").join("")+"</ol>");
 const nx=document.createElement("button");nx.type="button";nx.className="bb-btn bb-go";
 const over=ix>=9||(boss&&lives<=0);nx.textContent=over?"See my results →":"Next →";
 nx.onclick=()=>{sfx("tap");if(over)finish();else{ix++;ask()}};
 const m=app().querySelector(".bb-root");m.appendChild(box);m.appendChild(nx);
 if(ev==="up"){sfx("win");boom(60)}
 say(right?(ev==="up"?"Level up!":"Yes!"):"Now we know. The answer is "+q.ans+". "+q.work.join(" "));
 store();
}
function finish(){
 const ok=res.filter(Boolean).length,won=boss&&lives>0&&ok>=7;
 M.sessions++;if(boss)M.lastBoss=Date.now();
 const before=yearOf(K),mY=estYear(M,"maths"),eY=estYear(M,"english"),ready=Math.min(mY,eY);
 let moved=false;
 if(ready>before&&ready<=6){S.pathwayYear=S.pathwayYear||{};S.pathwayYear[K]=ready;moved=true}
 M.log.unshift({at:Date.now(),ok,n:res.length,boss,ups:ups.slice(),year:moved?ready:null});M.log=M.log.slice(0,40);
 try{if(window.PEBBLE_REWARDS){PEBBLE_REWARDS.album(K,boss?(won?3:1):1,boss&&won?"Boss reward":"Brain Boost reward")}}catch(e){}
 if(won)try{addCoins(20)}catch(e){}
 store();
 const upTxt=ups.length?'<p class="bb-p">⬆️ Levelled up: '+ups.map(id=>esc(SK[id].name)).filter((v,i,a)=>a.indexOf(v)===i).join(", ")+'</p>':"";
 frame('<h1>'+(boss?(won?"⚔️ Boss beaten!":"⚔️ Good try!"):"🧠 Boost done!")+'</h1><p class="bb-q">'+ok+' out of '+res.length+'</p>'+upTxt+(moved?'<p class="bb-why"><b>🎉 Wow!</b> You are ready for Year '+(ready===0?"Prep":ready)+' lessons now.</p>':'')+(won?'<p class="bb-p">+20 bonus coins and 3 new album stickers!</p>':'<p class="bb-p">You won a new album sticker!</p>')+'<button type="button" class="bb-btn bb-go" id="bb-again">Play again</button><button type="button" class="bb-btn" id="bb-home">Done</button>');
 sfx("win");boom(110);say((boss&&won?"Boss beaten! ":"")+"You got "+ok+" out of "+res.length+"."+(moved?" You are ready for harder lessons!":""),"happy");
 document.getElementById("bb-again").onclick=()=>{sfx("tap");intro()};
 document.getElementById("bb-home").onclick=()=>{sfx("tap");home()};
}

try{const _parent=parent;parent=function(){_parent.apply(this,arguments);try{const box=document.querySelector(".parent");if(!box||!S.boost)return;
 const rows=Object.keys(S.boost).filter(k=>S.kids[k]).map(k=>{const m=S.boost[k],l=m.log[0];return'<div class="prow"><span><b>🧠 Brain Boost: '+esc(S.kids[k].name)+'</b>: '+KEYS.map(id=>SK[id].name+" L"+m.skills[id].L+"/"+SK[id].lv.length+" (Y"+(yr(id,m.skills[id].L)||"P")+")").join(" · ")+(l?' · last: '+l.ok+'/'+l.n+' on '+new Date(l.at).toLocaleDateString("en-AU"):"")+'</span></div>'}).join("");
 box.insertAdjacentHTML("beforeend",rows)}catch(e){}}}catch(e){}

window.PEBBLE_BOOST={start:intro,SK,model,update,estYear,makeQ:(k)=>{K=k;M=model(k);return makeQ()}};
})();
