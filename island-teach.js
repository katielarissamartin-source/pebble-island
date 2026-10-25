/* Teach-first mini-lessons and reteach for every island. Claude-owned. Load after island-working.js. */
(function(){
"use strict";
if(typeof next!=="function"||typeof wrong!=="function"||typeof GEN==="undefined")return;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const strip=h=>String(h??"").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim();
const rd=()=>{try{return typeof round==="undefined"?null:round}catch(e){return null}};
const who=()=>{try{return typeof kid==="undefined"?null:kid}catch(e){return null}};
const readOn=()=>{try{return S.settings.jRead!==false}catch(e){return true}};
const calm=()=>{try{return S.settings.calm||matchMedia("(prefers-reduced-motion:reduce)").matches}catch(e){return false}};
const say=t=>{try{speak(strip(t),"soft")}catch(e){}};
const tap=()=>{try{SFX.tap()}catch(e){}};
const cnt=n=>{try{SFX.count(n)}catch(e){}};
const yay=()=>{try{SFX.good()}catch(e){}};
const mix=a=>{try{return shuffle(a)}catch(e){return a.slice()}};

const MASCOT={0:{ico:"🦄",name:"Sparkle",e:"🦄",n:"unicorn"},1:{ico:"🐢",name:"Shelly",e:"🦕",n:"dinosaur"}};
const pal=()=>MASCOT[who()]||{ico:"🪨",name:"Pip",e:"🐞",n:"ladybird"};

/* ---------- small visual helpers ---------- */
const pop=(h,i)=>`<span class="ite-pop" style="animation-delay:${(i||0)*.35}s">${h}</span>`;
const pops=a=>a.map(pop).join("");
const row=(n,e,start)=>Array.from({length:n},(_,i)=>pop(e,(start||0)+i)).join("");
const big=t=>`<div class="ite-big">${t}</div>`;
const line=(...a)=>`<div class="ite-line">${a.join("")}</div>`;
const fr=(k,n)=>{try{return frH(k,n)}catch(e){return k+"/"+n}};
const PIE=(n,k,s)=>{try{return pie(n,k,false,s||120)}catch(e){return""}};
const CLK=(h,m,s)=>{try{return clock(h,m,s||150)}catch(e){return""}};
const COIN=c=>{try{return coinH(c)}catch(e){return c+"c"}};
const SHP=(n,c)=>{try{return`<span class="ite-shp">${shp(n,c)}</span>`}catch(e){return n}};
const PV=(h,t,o)=>{try{return pvPic(h,t,o)}catch(e){return""}};
const ROD=()=>{try{return rod}catch(e){return"|"}};
const CUBE='<span class="cube"></span>';
const FLAT='<span class="flat" style="width:40px;height:40px;background-size:4px 4px"></span>';
const TALLY=n=>{try{return tally(n)}catch(e){return""}};
const SPIN=r=>{try{return spinner(r)}catch(e){return""}};
const GRAPH=c=>`<div class="ite-graph">${c.map(([e,nm,k])=>`<div><b>${nm}</b>${e.repeat(k)}</div>`).join("")}</div>`;
const frame=(a,b)=>{const cells=[];for(let i=0;i<10;i++)cells.push(`<i class="${i<a?"f1":i<a+b?"f2":""}"></i>`);return`<div class="ite-frame">${cells.join("")}</div>`};
const C=(s,v)=>({s,v:v||""});
const PK=(q,opts,show)=>({kind:"pick",q,show:show||"",opts:opts.map(([h,ok,why])=>({h,ok:!!ok,why:why||""}))});

/* ---------- lesson content: one object per world, keyed by level ---------- */
/* each level: P=>({watch:[C(text,visual)...], try:{...}})  P = child's theme {e,n,name} */
const TEACH={
words:{
 1:P=>({watch:[C("Every letter has a big shape and a small shape.",line(big("A a"),big("B b"),big("M m"))),C("Big M and small m are the same letter. They both say mmm.",big("M = m"))],
  try:PK("This is big D. Tap small d.",[["d",1],["b",0,"That is b. b has its tall stick first, then the round tummy. d has the round tummy first."],["p",0,"That is p. Its stick goes down low."]],big("D"))}),
 2:P=>({watch:[C("Every word starts with a sound.",big("🐱 c - a - t")),C("Say it slowly. Stretch the start. Sss-un. Sun starts with s.",big("☀️ s - u - n"))],
  try:PK("🐟 fish. What sound does fish start with?",[["f",1],["s",0,"Say ffff-ish. Your top teeth touch your lip. That is f."],["m",0,"m is mmm, with your lips shut. Say ffff-ish."]],big("🐟"))}),
 3:P=>({watch:[C("Words are made of sounds. Each sound has a letter.",big(pops(["🐷","p","i","g"]))),C("Say each sound, then blend them. b, e, d. Bed!",big("🛏️ b-e-d → bed"))],
  try:{kind:"spell",word:"cat",e:"🐱"}}),
 4:P=>({watch:[C("Some words look alike. Check every letter, from start to end.",line(big("cat"),big("cot"),big("cut"))),C("Only the middle letter is different. a, o, u.",big("c <u>a</u> t"))],
  try:PK("🐶 Which word says dog?",[["dog",1],["dig",0,"dig has i in the middle. dog has o."],["dot",0,"dot ends with t. dog ends with g."]],big("🐶"))}),
 5:P=>({watch:[C("Some sounds need two letters. sh, ee. sh-ee-p.",big("🐑 sh · ee · p")),C("Missing word? Read the sentence with each word in the gap. Which makes sense?",big("The dog can ___ .")),C("The dog can run makes sense. The dog can sun does not.",line(big("run ✅"),big("sun ❌")))],
  try:PK("A cat can ___ .",[["jump",1],["cup",0,"A cat can cup? That does not make sense."],["hot",0,"A cat can hot? That does not make sense."]],big("🐈"))}),
 6:P=>({watch:[C("Some words mean the same thing.",line(big("big = large"),big("fast = quick"))),C("Swap the word in. If the sentence still means the same, it is a match.",big("I am happy. → I am glad."))],
  try:PK("Which word means the same as begin?",[["start",1],["finish",0,"finish is the opposite of begin."],["jump",0,"jump is a different action."]])})
},
read:{
 1:P=>({watch:[C("Opposites are as different as can be.",line(big("hot 🔥"),big("cold 🧊"))),C("Up and down are opposites. Big and small are opposites.",line(big("up ⬆️ ⬇️ down"),big("big 🐘 🐭 small")))],
  try:PK("What is the opposite of day?",[["night",1],["sun",0,"The sun is out in the day. It is not the opposite."],["morning",0,"Morning is part of the day."]],big("☀️ ↔ ?"))}),
 2:P=>({watch:[C("Some words sound the same but are spelt in different ways.",line(big("two ✌️"),big("to ➡️"),big("too ➕"))),C("two is the number 2. to is going somewhere. too means also.",big("I have two dogs.")),C("blue is a colour. blew is what the wind did.",line(big("blue 🔵"),big("blew 🌬️")))],
  try:PK("I can ___ the ocean. 👀",[["see",1],["sea",0,"sea is the ocean itself. We need the looking word: see."],["si",0,"si is not a word."]])}),
 3:P=>({watch:[C("A small part at the start can change a word.",big("un + happy = unhappy")),C("un means not. re means again. dis means not.",line(big("un- not"),big("re- again"),big("dis- not"))),C("replay means play again. dislike means not like.",line(big("replay"),big("dislike")))],
  try:PK("Make tie mean tie again.",[["re-",1],["un-",0,"untie means undo it. We want again: re."],["dis-",0,"dis means not. We want again: re."]],big("___tie"))}),
 4:P=>({watch:[C("Words can tell us when something happens.",line(big("yesterday ⬅️"),big("now ⏺️"),big("tomorrow ➡️"))),C("Yesterday, add ed: walked. Right now: is walking. Tomorrow: will walk.",line(big("walked"),big("walking"),big("will walk")))],
  try:PK("Last night I ___ a cake.",[["baked",1],["bake",0,"Last night is in the past. Past words often end in ed."],["baking",0,"baking is for right now. Last night is the past."]])}),
 5:P=>({watch:[C("A sentence starts with a capital letter.",big("<b>T</b>he cat sat.")),C("Names get capitals too. Ivy, Melbourne, Sunday.",line(big("Ivy"),big("Melbourne"),big("Sunday"))),C("A sentence ends with a full stop, a question mark, or an exclamation mark.",big(". ? !"))],
  try:PK("Which one is written correctly?",[["Sam has a red bike.",1],["sam has a red bike.",0,"Sam is a name and starts the sentence. It needs a capital S."],["Sam has a red bike",0,"It needs a full stop at the end."]])}),
 6:P=>({watch:[C("Listen to the whole story first.",big("📖 👂")),C("Max had a blue kite. He flew it at the beach.",`<div class="ite-pass">Max had a blue kite. He flew it at the beach.</div>`),C("Where did he fly it? Find the words that answer: at the beach.",`<div class="ite-pass">He flew it <mark>at the beach</mark>.</div>`)],
  try:PK(`The ${P.n} ate a red apple in the park. What colour was the apple?`,[["red",1],["green",0,"Listen again: a red apple."],["blue",0,"Listen again: a red apple."]],`<div class="ite-pass">The ${P.n} ate a red apple in the park.</div>`)}),
 7:P=>({watch:[C("Writers leave clues. You are the detective.",big("🕵️")),C("Umbrella and raincoat are clues. I know we use them when it rains.",big("☂️ + 🧥 → 🌧️")),C("Clue plus what I know gives my answer.",big("clue + I know = answer"))],
  try:PK("Jo put on a big coat and a beanie. What is the weather like?",[["Cold",1],["Hot",0,"A big coat would make you too hot. The clues are coat and beanie."],["Windy and dry",0,"Look at the clues: coat and beanie. Those keep you warm."]],big("🧥 🧢"))}),
 8:P=>({watch:[C("Why did the author write it? To tell a story, to show how, or to convince you.",line(big("📚 story"),big("📝 how to"),big("📢 convince"))),C("A recipe shows how. An ad tries to convince you. That is called persuade.",line(big("recipe = instruct"),big("ad = persuade"))),C("A metaphor says one thing is another. The sun was a golden coin.",big("☀️ = 🪙"))],
  try:PK("A poster says: Buy Fizz Juice! It's the best! Why was it written?",[["To persuade",1],["To instruct",0,"Instructions tell you how to do something. This poster wants you to buy."],["To tell a story",0,"There is no story. It wants you to buy something."]],big("📢🧃"))})
},
think:{
 1:P=>({watch:[C("Look at what is the same. Then find the one that is different.",big(pops(["🍎","🍌","🍇","🚗"]))),C("Three are fruit. The car is not fruit. It does not belong.",big("🍎 🍌 🍇 | 🚗"))],
  try:PK("Which one doesn't belong?",[["⚽",1],["🐶",0,"The dog is an animal, like the others."],["🐱",0,"The cat is an animal, like the others."]],big("🐶 🐱 🐭 ⚽"))}),
 2:P=>({watch:[C("Things happen in order. First, next, last.",big(pops(["🥚","➡️","🐣","➡️","🐔"]))),C("First the egg. Next the chick hatches. Last it grows into a hen.",line(big("1st 🥚"),big("2nd 🐣"),big("3rd 🐔")))],
  try:{kind:"order",q:"Tap them in order. What happens first?",items:[["🌰","seed"],["🌱","sprout"],["🌻","flower"]]}}),
 3:P=>({watch:[C("Look for clues to work it out.",big("🕵️")),C("Yawning and rubbing eyes. Those are clues for tired.",big("🥱 + 👀 → tired"))],
  try:PK("Sam has a towel and goggles. Where is he going?",[["Swimming",1],["To bed",0,"Goggles are for water. The clues say swimming."],["To the shops",0,"Towel and goggles are clues for the water."]],big("🏊 🥽"))}),
 4:P=>({watch:[C("What will happen next? Think about what usually happens.",big("🤔")),C("Ice cream in the hot sun melts. That usually happens.",big("🍦 + ☀️ → 💧"))],
  try:PK("You drop a ball from up high. What will happen next?",[["It falls down",1],["It floats up",0,"Things fall down. Gravity pulls them."],["It turns blue",0,"Dropping does not change the colour."]],big("⚽ ⬇️"))}),
 5:P=>({watch:[C("Line them up to see the order.",big("📏")),C("Ben is taller than Ava. Ava is taller than Sam.",`<div class="ite-bars"><span style="height:120px">Ben</span><span style="height:90px">Ava</span><span style="height:60px">Sam</span></div>`),C("Ben is the tallest. Sam is the shortest. Ava is in the middle.",big("Ben > Ava > Sam"))],
  try:PK("Mia is older than Leo. Leo is older than Kai. Who is the oldest?",[["Mia",1],["Leo",0,"Leo is younger than Mia."],["Kai",0,"Kai is the youngest."]])}),
 6:P=>({watch:[C("A fact can be checked. It is true for everyone.",big("✅ A spider has 8 legs.")),C("An opinion is what someone thinks or feels.",big("💭 Spiders are scary.")),C("Words like best, yummy and boring are clues for an opinion.",big("best · yummy · boring"))],
  try:PK("Koalas live in Australia. Fact or opinion?",[["Fact",1],["Opinion",0,"We can check it in a book. It is a fact."]],big("🐨"))}),
 7:P=>({watch:[C("Clue words tell us how people feel.",big("frowned · smiled · shook")),C("Hands shaking and a fast heart are clues for nervous.",big("🤲 + 💓 → nervous"))],
  try:PK("Ella's hands shook as she walked on stage. How does Ella feel?",[["Nervous",1],["Sleepy",0,"Shaking hands are a clue for nervous, not sleepy."],["Bored",0,"Shaking hands are a clue for nervous."]],big("🎤"))}),
 8:P=>({watch:[C("Someone says something. Is it right? Test it!",big("🧪")),C("Tom says 5 plus 5 is 55. Check: 5 plus 5 is 10. So Tom is wrong.",big("5 + 5 = 10, not 55"))],
  try:PK("Zoe says a triangle has 4 sides. Is that right?",[["No, it has 3",1],["Yes",0,"Count the sides of a triangle: 1, 2, 3."]],SHP("triangle"))})
},
nums:{
 1:P=>({watch:[C("Touch each one. Say one number each time.",line(pop(P.e+"<small>1</small>",0),pop(P.e+"<small>2</small>",1),pop(P.e+"<small>3</small>",2))),C("The last number you say is how many. 1, 2, 3. There are 3.",big(P.e.repeat(3)+" = 3"))],
  try:{kind:"count",groups:[4],e:P.e,q:"Tap each one to count."}}),
 2:P=>({watch:[C("Count in a line, so you don't miss any.",big(row(7,P.e))),C("Touch each one as you count. 1, 2, 3, 4, 5, 6, 7. There are 7.",big("7"))],
  try:{kind:"count",groups:[8],e:P.e,q:"Tap each one to count."}}),
 3:P=>({watch:[C("Plus means put together.",line(big(row(3,P.e)),big("+"),big(row(2,P.e,3)))),C("Start at 3. Count on 2 more: 4, 5. That makes 5.",big("3 + 2 = 5"))],
  try:{kind:"count",groups:[2,3],e:P.e,q:"2 and 3 more. Tap them all to count."}}),
 4:P=>({watch:[C("Take away means some go away.",big(P.e.repeat(6))),C("6 take away 2. Two go away. Count what is left: 4.",big(P.e.repeat(4)+`<span style="opacity:.25">${P.e.repeat(2)}</span>`))],
  try:{kind:"away",n:7,k:3,e:P.e,q:"7 take away 3. Tap 3 to send them away."}}),
 5:P=>({watch:[C("Make a ten first! A ten frame holds 10.",frame(8,0)),C("8 plus 5. 8 needs 2 more to make 10.",frame(8,2)),C("5 is 2 and 3. So 10 and 3 more. That's 13.",line(frame(8,2),frame(0,3).replace(/f2/g,"f2")))],
  try:PK("9 + 4 = ?",[["13",1],["12",0,"9 needs 1 to make 10. 4 is 1 and 3. 10 and 3 more."],["14",0,"9 needs 1 to make 10. 4 is 1 and 3. 10 and 3 more."]],frame(9,1))}),
 6:P=>({watch:[C("Split numbers into tens and ones.",big("34 = 30 + 4")),C("34 plus 25. Tens: 30 plus 20 is 50. Ones: 4 plus 5 is 9. 50 and 9 is 59.",big("50 + 9 = 59")),C("Take away: 53 take away 28. Take 20 first: 33. Then take 8 more: 25.",big("53 − 20 = 33 → 33 − 8 = 25"))],
  try:PK("42 + 35 = ?",[["77",1],["67",0,"Check the tens: 40 plus 30 is 70."],["87",0,"Check the tens: 40 plus 30 is 70."]])}),
 7:P=>({watch:[C("Add hundreds, then tens, then ones.",big("236 + 152")),C("200 plus 100 is 300. 30 plus 50 is 80. 6 plus 2 is 8. That makes 388.",big("300 + 80 + 8 = 388")),C("If the ones make 10 or more, make a new ten. 7 plus 5 is 12: that's 1 ten and 2 ones.",big("127 + 245 = 300 + 60 + 12 = 372"))],
  try:PK("315 + 128 = ?",[["443",1],["433",0,"Ones: 5 plus 8 is 13. That's 1 ten and 3 ones. Don't forget the new ten."],["543",0,"Hundreds: 300 plus 100 is 400, not 500."]])}),
 8:P=>({watch:[C("Take away hundreds, then tens, then ones.",big("586 − 243")),C("586 take away 200 is 386. Take 40: 346. Take 3: 343.",big("386 → 346 → 343")),C("Not enough ones? Swap 1 ten for 10 ones. 52 take away 7: 4 tens and 12 ones. 12 take away 7 is 5. So 45.",big("52 − 7 = 45"))],
  try:PK("700 − 250 = ?",[["450",1],["550",0,"700 take away 200 is 500. Then take 50 more."],["500",0,"That only took away 200. Take 50 more."]])}),
 9:P=>({watch:[C("Equal groups have the same number in each.",line(big("🍪🍪🍪🍪"),big("🍪🍪🍪🍪"),big("🍪🍪🍪🍪"))),C("3 groups of 4. Count by 4s: 4, 8, 12. So 3 times 4 is 12.",big("3 × 4 = 12"))],
  try:{kind:"rows",r:4,c:5,e:"🍪",q:"4 bags of 5 cookies. Tap each row to count by 5s."}})
},
pv:{
 1:P=>({watch:[C("A long stick is 10 little cubes stuck together.",line(ROD(),big("= 10"))),C("Count the sticks by 10s: 10, 20, 30. Then the cubes by 1s: 31, 32, 33, 34.",PV(0,3,4)),C("3 tens and 4 ones is 34.",big("34"))],
  try:PK("What number is this?",[["25",1],["52",0,"Sticks are tens. There are 2 sticks, so 2 tens. Then 5 ones."],["7",0,"Each stick is ten, not one. Count 10, 20, then the cubes."]],PV(0,2,5))}),
 2:P=>({watch:[C("47 means 4 tens and 7 ones.",PV(0,4,7)),C("To make 47, tap plus 10 four times. Then plus 1 seven times.",big("10, 20, 30, 40 … 47"))],
  try:{kind:"build",target:34,parts:[[10,"+10","rod"],[1,"+1","cube"]],q:"Make 34. Tap tens and ones."}}),
 3:P=>({watch:[C("A flat is 10 sticks. That is 100.",line(FLAT,big("= 100"))),C("2 flats, 3 sticks and 5 cubes. 100, 200. 210, 220, 230. 231 … 235.",PV(2,3,5)),C("2 hundreds, 3 tens, 5 ones is 235.",big("235"))],
  try:PK("What number is this?",[["142",1],["241",0,"There is 1 flat, so 1 hundred. Then 4 tens and 2 ones."],["124",0,"Count the sticks: 4 tens. Then 2 ones."]],PV(1,4,2))}),
 4:P=>({watch:[C("To compare, look at the hundreds first.",big("452 · 381")),C("4 hundreds is more than 3 hundreds. So 452 is bigger.",big("452 > 381")),C("Same hundreds? Then look at the tens. 548 has 4 tens. 526 has 2 tens. 548 is bigger.",big("548 > 526"))],
  try:PK("Which number is bigger?",[["653",1],["635",0,"The hundreds are the same: 6. Look at the tens: 5 tens is more than 3 tens."]])}),
 5:P=>({watch:[C("Even numbers make pairs with none left over.",big("👫👫👫")),C("6 is even. 5 is odd, because one is left over.",big("👫👫🧍")),C("For big numbers, look at the last digit. 0, 2, 4, 6, 8 are even.",big("14 even · 17 odd"))],
  try:PK("Is 7 odd or even?",[["odd",1],["even",0,"Make pairs: 3 pairs and 1 left over. One left over means odd."]],big("👫👫👫🧍"))}),
 6:P=>({watch:[C("253 is 2 hundreds, 5 tens and 3 ones.",PV(2,5,3)),C("Tap plus 100 two times, plus 10 five times, and plus 1 three times.",big("200 + 50 + 3"))],
  try:{kind:"build",target:132,parts:[[100,"+100","flat"],[10,"+10","rod"],[1,"+1","cube"]],q:"Make 132. Tap hundreds, tens and ones."}}),
 7:P=>({watch:[C("27 is between 20 and 30.",`<div class="ite-nl"><span>20</span><b style="left:70%">27</b><span>30</span></div>`),C("Look at the ones digit: 7. 5 or more rounds up. So 27 rounds to 30.",big("27 → 30")),C("23 has 3 ones. Less than 5 rounds down. 23 rounds to 20.",big("23 → 20"))],
  try:PK("Round 38 to the nearest ten.",[["40",1],["30",0,"38 is only 2 away from 40, but 8 away from 30. 8 ones rounds up."],["38",0,"Rounding means picking the closest ten: 30 or 40."]])}),
 8:P=>({watch:[C("Each place has a value.",`<table class="ite-tab"><tr><th>Th</th><th>H</th><th>T</th><th>O</th></tr><tr><td>3</td><td>5</td><td>2</td><td>7</td></tr></table>`),C("The 3 is in the thousands place. It is worth 3000.",big("3 → 3000")),C("The 2 is in the tens place. It is worth 20.",big("2 → 20"))],
  try:PK("In 4618, what is the value of the 6?",[["600",1],["6",0,"The 6 is in the hundreds place. It is worth 6 hundreds."],["60",0,"60 would be the tens place. The 6 is in the hundreds place."]],`<table class="ite-tab"><tr><th>Th</th><th>H</th><th>T</th><th>O</th></tr><tr><td>4</td><td>6</td><td>1</td><td>8</td></tr></table>`)}),
 9:P=>({watch:[C("Find the place you round to. Then look at the digit just to its right.",big("2<u>4</u>73")),C("2473 to the nearest 100. The digit after the 4 is 7. 5 or more rounds up. 2500.",big("2473 → 2500")),C("5103 to the nearest 1000. The digit after the 5 is 1. Less than 5 rounds down. 5000.",big("5103 → 5000"))],
  try:PK("Round 3640 to the nearest 100.",[["3600",1],["3700",0,"Look at the tens digit: 4. Less than 5 rounds down."],["4000",0,"That is the nearest 1000. We want the nearest 100."]])})
},
times:{
 1:P=>({watch:[C("Skip counting jumps the same amount each time.",`<div class="ite-hops">${pops(["5","10","15","20"].map(x=>`<span>${x}</span>`))}</div>`),C("Jump by 10s: 10, 20, 30, 40.",`<div class="ite-hops">${["10","20","30","40"].map(x=>`<span>${x}</span>`).join("")}</div>`)],
  try:PK("Count by 10s. Which number is missing?",[["30",1],["25",0,"Jump by 10 each time. 20 and 10 more."],["21",0,"Jump by 10 each time, not 1."]],`<div class="ite-hops"><span>10</span><span>20</span><span class="q">?</span><span>40</span></div>`)}),
 2:P=>({watch:[C("Rows with the same number in each.",`<div class="ite-rows">${["⭐⭐⭐⭐⭐","⭐⭐⭐⭐⭐","⭐⭐⭐⭐⭐"].map((r,i)=>pop(`<div>${r}</div>`,i)).join("")}</div>`),C("3 rows of 5. Count by 5s: 5, 10, 15.",big("15"))],
  try:{kind:"rows",r:3,c:2,e:P.e,q:"3 rows of 2. Tap each row to count by 2s."}}),
 3:P=>({watch:[C("Times means groups of. 3 times 2 means 3 groups of 2.",line(big("✌️"),big("✌️"),big("✌️"))),C("Count by 2s: 2, 4, 6. So 3 times 2 is 6.",big("3 × 2 = 6"))],
  try:PK("4 × 5 = ?",[["20",1],["9",0,"9 is 4 plus 5. Times means 4 groups of 5. Count 5, 10, 15, 20."],["25",0,"That is 5 groups. We need 4 groups of 5."]],line(big("🖐️"),big("🖐️"),big("🖐️"),big("🖐️")))}),
 4:P=>({watch:[C("Count by 3s: 3, 6, 9, 12.",`<div class="ite-rows">${Array.from({length:4},(_,i)=>pop(`<div>🍓🍓🍓</div>`,i)).join("")}</div>`),C("4 rows of 3 is 12.",big("4 × 3 = 12"))],
  try:{kind:"rows",r:4,c:4,e:P.e,q:"4 rows of 4. Tap each row to count by 4s."}}),
 5:P=>({watch:[C("Turn it around! 3 times 4 is the same as 4 times 3.",line(`<div class="ite-rows"><div>🟦🟦🟦🟦</div><div>🟦🟦🟦🟦</div><div>🟦🟦🟦🟦</div></div>`,`<div class="ite-rows"><div>🟩🟩🟩</div><div>🟩🟩🟩</div><div>🟩🟩🟩</div><div>🟩🟩🟩</div></div>`)),C("Doubles help. 4 times 3 is double 2 times 3. 6 doubled is 12.",big("2 × 3 = 6 → 4 × 3 = 12"))],
  try:PK("4 × 4 = ?",[["16",1],["8",0,"8 is 4 plus 4. We need 4 groups of 4: 4, 8, 12, 16."],["12",0,"That is 3 groups of 4. One more 4."]])}),
 6:P=>({watch:[C("Use a fact you know.",big("🧠")),C("6 times 7. You know 5 times 7 is 35. Add one more 7: 42.",big("5 × 7 = 35 → 6 × 7 = 42")),C("9 times 8. 10 times 8 is 80. Take away one 8: 72.",big("10 × 8 = 80 → 9 × 8 = 72"))],
  try:PK("6 × 6 = ?",[["36",1],["30",0,"5 times 6 is 30. Add one more 6."],["12",0,"12 is 6 plus 6. Times means 6 groups of 6."]])}),
 7:P=>({watch:[C("8 times what is 56? Count by 8s until you get to 56.",`<div class="ite-hops">${["8","16","24","32","40","48","56"].map(x=>`<span>${x}</span>`).join("")}</div>`),C("That is 7 jumps. So 8 times 7 is 56.",big("8 × 7 = 56"))],
  try:PK("5 × ? = 35",[["7",1],["6",0,"5 times 6 is 30. One more jump of 5."],["30",0,"Count by 5s until 35. How many jumps?"]])}),
 8:P=>({watch:[C("Divide means share equally.",big("🍪".repeat(12))),C("12 shared onto 3 plates. Each plate gets 4.",line(big("🍽️🍪🍪🍪🍪"),big("🍽️🍪🍪🍪🍪"),big("🍽️🍪🍪🍪🍪"))),C("12 divided by 3 is 4, because 3 times 4 is 12.",big("12 ÷ 3 = 4"))],
  try:PK("20 ÷ 5 = ?",[["4",1],["15",0,"That is 20 take away 5. Think: 5 times what is 20?"],["5",0,"5 times 5 is 25. Too many. Think: 5 times what is 20?"]])}),
 9:P=>({watch:[C("Split the big number into tens and ones.",big("23 = 20 + 3")),C("23 times 4. 20 times 4 is 80. 3 times 4 is 12. 80 plus 12 is 92.",big("80 + 12 = 92"))],
  try:PK("14 × 3 = ?",[["42",1],["32",0,"10 times 3 is 30. 4 times 3 is 12. 30 plus 12."],["17",0,"17 is 14 plus 3. Times means 3 groups of 14."]])}),
 10:P=>({watch:[C("Share, then see what is left over.",big("🍬".repeat(13))),C("13 shared between 4. Each gets 3. That uses 12. 1 is left over.",line(big("🍬🍬🍬"),big("🍬🍬🍬"),big("🍬🍬🍬"),big("🍬🍬🍬"),big("+ 🍬"))),C("We write 3 r1. The r means remainder.",big("13 ÷ 4 = 3 r1"))],
  try:PK("11 ÷ 3 = ?",[["3 r2",1],["4",0,"3 times 4 is 12. That's too many. Try 3 each."],["3 r1",0,"3 times 3 is 9. 11 take away 9 leaves 2."]])})
},
frac:{
 1:P=>({watch:[C("A half is one of 2 equal parts.",PIE(2,1,140)),C("Both parts are the same size. Colour one part to show one half.",big(fr(1,2)))],
  try:{kind:"shade",n:2,k:1,q:"Tap to colour one half."}}),
 2:P=>({watch:[C("This pizza has 4 equal parts. Each part is a quarter.",PIE(4,1,140)),C("Three quarters is 3 of the 4 parts.",line(PIE(4,3,140),big(fr(3,4))))],
  try:{kind:"shade",n:4,k:3,q:"Tap to colour three quarters."}}),
 3:P=>({watch:[C("The bottom number tells how many parts in all.",line(PIE(3,2,140),big(fr(2,3)))),C("The top number tells how many parts are coloured. 2 of 3 parts. Two thirds.",big("2 coloured / 3 parts"))],
  try:PK("How much is coloured?",[[fr(1,4),1],[fr(1,3),0,"Count all the parts: 4. So the bottom number is 4."],[fr(3,4),0,"Only 1 part is coloured. So the top number is 1."]],PIE(4,1,140))}),
 4:P=>({watch:[C("Some pizzas have 3, 6 or 8 equal parts.",line(PIE(3,0,100),PIE(6,0,100),PIE(8,0,100))),C("Three eighths means colour 3 of the 8 parts.",line(PIE(8,3,140),big(fr(3,8))))],
  try:{kind:"shade",n:6,k:4,q:"Tap to colour four sixths."}}),
 5:P=>({watch:[C("Half of 6. Share 6 into 2 equal groups.",big("🍓".repeat(6))),C("3 in each group. Half of 6 is 3.",line(big("🍓🍓🍓"),big("🍓🍓🍓"))),C("A quarter of 8. Share into 4 groups. 2 in each.",line(big("🍪🍪"),big("🍪🍪"),big("🍪🍪"),big("🍪🍪")))],
  try:PK("What is one half of 10?",[["5",1],["2",0,"Share 10 into 2 equal groups. How many in one group?"],["10",0,"That is all of them. Half means share into 2 groups."]],big("🧁".repeat(10)))}),
 6:P=>({watch:[C("Different fractions can cover the same amount.",line(PIE(2,1,110),big("="),PIE(4,2,110))),C("One half and two quarters cover the same amount of pizza.",big(fr(1,2)+" = "+fr(2,4)))],
  try:PK("Which is the same amount as one half?",[[PIE(8,4,80)+fr(4,8),1],[PIE(4,1,80)+fr(1,4),0,"One quarter is less than half. Look at how much is coloured."],[PIE(8,3,80)+fr(3,8),0,"3 of 8 is a bit less than half. Half of 8 is 4."]],PIE(2,1,110))}),
 7:P=>({watch:[C("To make the same fraction, times the top and bottom by the same number.",big(fr(1,3)+" → × 2 → "+fr(2,6))),C("One third times 4 on top and bottom is 4 twelfths.",big(fr(1,3)+" = "+fr(4,12)))],
  try:PK("Which is the same as 1 over 4?",[[fr(2,8),1],[fr(2,4),0,"Only the top was doubled. Double the top and the bottom: 2 over 8."],[fr(1,8),0,"Only the bottom changed. Do the same to the top and the bottom."]])}),
 8:P=>({watch:[C("Same bottom number? Add the tops. Keep the bottom.",line(PIE(8,2,100),big("+"),PIE(8,3,100))),C("2 eighths plus 3 eighths is 5 eighths.",big(fr(2,8)+" + "+fr(3,8)+" = "+fr(5,8)))],
  try:PK("1 over 5 plus 2 over 5 = ?",[[fr(3,5),1],[fr(3,10),0,"Don't add the bottoms. The parts are still fifths."],[fr(2,5),0,"Add the tops: 1 plus 2."]])}),
 9:P=>({watch:[C("Tenths have one place after the dot. 3 tenths is 0.3.",big("3 tenths = 0.3")),C("Hundredths have two places. 45 hundredths is 0.45.",big("45 hundredths = 0.45")),C("7 hundredths is 0.07. The zero keeps the tenths place.",big("0.07"))],
  try:PK("What is 23 hundredths as a decimal?",[["0.23",1],["2.3",0,"Hundredths are two places after the dot: 0.23."],["0.023",0,"That is three places. Hundredths use two."]])})
},
shapes:{
 1:P=>({watch:[C("Shapes have names. Circle, square, triangle.",line(SHP("circle","#3d8fb0"),SHP("square","#4f9a6e"),SHP("triangle","#c8607a"))),C("A triangle has 3 sides. A square has 4 equal sides. A rectangle has 2 long and 2 short sides.",line(SHP("triangle","#c8607a"),SHP("square","#4f9a6e"),SHP("rectangle","#7a6fc2")))],
  try:PK("Find the triangle.",[[SHP("triangle","#c8607a"),1],[SHP("circle","#3d8fb0"),0,"That is a circle. It is round with no corners."],[SHP("square","#4f9a6e"),0,"That is a square. It has 4 sides. A triangle has 3."]])}),
 2:P=>({watch:[C("A pattern repeats.",line(SHP("circle","#3d8fb0"),SHP("star","#f2b544"),SHP("circle","#3d8fb0"),SHP("star","#f2b544"))),C("Say it out loud: circle, star, circle, star. Next comes circle!",line(SHP("circle","#3d8fb0"),SHP("star","#f2b544"),SHP("circle","#3d8fb0"),SHP("star","#f2b544"),SHP("circle","#3d8fb0")))],
  try:PK("What comes next?",[[SHP("heart","#c8607a"),1],[SHP("square","#4f9a6e"),0,"Say it: square, heart, square, heart, square… what comes after square?"]],line(SHP("square","#4f9a6e"),SHP("heart","#c8607a"),SHP("square","#4f9a6e"),SHP("heart","#c8607a"),SHP("square","#4f9a6e"),big("?")))}),
 3:P=>({watch:[C("Some patterns have 3 shapes in the part that repeats.",line(SHP("circle","#3d8fb0"),SHP("square","#4f9a6e"),SHP("star","#f2b544"),big("|"),SHP("circle","#3d8fb0"),SHP("square","#4f9a6e"),SHP("star","#f2b544"))),C("Find the part that repeats: circle, square, star. Then it starts again.",big("🔁"))],
  try:PK("What comes next?",[[SHP("triangle","#c8607a"),1],[SHP("heart","#c8607a"),0,"The repeating part is heart, star, triangle. After star comes triangle."],[SHP("star","#f2b544"),0,"The repeating part is heart, star, triangle. After star comes triangle."]],line(SHP("heart","#c8607a"),SHP("star","#f2b544"),SHP("triangle","#c8607a"),SHP("heart","#c8607a"),SHP("star","#f2b544"),big("?")))}),
 4:P=>({watch:[C("Touch each side as you count. Stop when you get back to the start.",SHP("pentagon","#7a6fc2")),C("A pentagon has 5 sides. A hexagon has 6. An octagon has 8.",line(SHP("pentagon","#7a6fc2"),SHP("hexagon","#3d8fb0"),SHP("octagon","#4f9a6e")))],
  try:PK("How many sides does a hexagon have?",[["6",1],["5",0,"Touch each side: 1, 2, 3, 4, 5, 6."],["8",0,"8 sides is an octagon. Count again."]],SHP("hexagon","#3d8fb0"))}),
 5:P=>({watch:[C("The number of sides gives the shape its name.",line(SHP("triangle","#c8607a"),big("3"))),C("Penta means 5. Hexa means 6. Octa means 8, like an octopus with 8 legs.",line(SHP("pentagon","#7a6fc2"),SHP("hexagon","#3d8fb0"),SHP("octagon","#4f9a6e"),big("🐙")))],
  try:PK("Which shape is a pentagon?",[[SHP("pentagon","#7a6fc2"),1],[SHP("hexagon","#3d8fb0"),0,"Count its sides: 6. That is a hexagon. Penta means 5."],[SHP("square","#4f9a6e"),0,"A square has 4 sides. Penta means 5."]])}),
 6:P=>({watch:[C("A mirror line splits a picture into two matching halves.",big("🦋")),C("Each square on the left has a twin on the right. Same distance from the line.",`<div class="ite-mir"><i class="on"></i><i></i><b></b><i></i><i class="on"></i></div>`)],
  try:{kind:"mirror",left:[[1,0],[0,1]],q:"Tap the squares on the right to copy the left, like a mirror."}})
},
time:{
 1:P=>({watch:[C("There are 7 days in a week.",`<div class="ite-days">${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(pop).join("")}</div>`),C("Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday. After means the next one. Before means the one just in front.",big("Tue → Wed"))],
  try:{kind:"order",q:"Tap the days in order.",items:[["📅","Tuesday"],["📅","Wednesday"],["📅","Thursday"],["📅","Friday"]]}}),
 2:P=>({watch:[C("The short hand shows the hour.",CLK(3,0)),C("The long hand points to 12. That means o'clock. It is 3 o'clock.",big("3 o'clock"))],
  try:{kind:"clock",h:5,m:0,step:30,q:"Set the clock to 5 o'clock."}}),
 3:P=>({watch:[C("When the long hand points to 6, it is half past.",CLK(4,30)),C("The short hand is half way between 4 and 5. It is half past 4.",big("half past 4"))],
  try:PK("What time is it?",[["half past 2",1],["2 o'clock",0,"The long hand is on 6, not 12. That is half past."],["half past 3",0,"The short hand has just gone past 2. So it is half past 2."]],CLK(2,30))}),
 4:P=>({watch:[C("Short hand for the hour. Long hand on 12 for o'clock, or on 6 for half past.",line(CLK(7,0,120),CLK(7,30,120))),C("Half past 7: long hand on 6. Short hand just past 7.",big("half past 7"))],
  try:{kind:"clock",h:7,m:30,step:30,q:"Set the clock to half past 7."}}),
 5:P=>({watch:[C("Long hand on 3 is quarter past.",line(CLK(9,15,130),big("quarter past 9"))),C("Long hand on 9 is quarter to the next hour.",line(CLK(9,45,130),big("quarter to 10")))],
  try:PK("What time is it?",[["quarter past 6",1],["quarter to 6",0,"Quarter to has the long hand on 9. Here it is on 3."],["quarter past 7",0,"The short hand has just passed 6, not 7."]],CLK(6,15))}),
 6:P=>({watch:[C("Each number on the clock is 5 minutes for the long hand.",CLK(3,20)),C("The long hand is on 4. Count by 5s: 5, 10, 15, 20. It is 3:20.",big("3:20"))],
  try:PK("What time is it?",[["8:35",1],["8:07",0,"Count by fives for each number: 7 numbers is 35."],["7:35",0,"The short hand has passed 8. So the hour is 8."]],CLK(8,35))}),
 7:P=>({watch:[C("Set the hour with the short hand. Then count by 5s for the long hand.",CLK(2,25)),C("25 past 2: long hand on 5. 5, 10, 15, 20, 25.",big("2:25"))],
  try:{kind:"clock",h:2,m:25,step:5,q:"Set the clock to 25 past 2."}}),
 8:P=>({watch:[C("Start time, then add how long it lasts.",big("⏰ + ⏳")),C("Starts at 3:30, lasts 30 minutes. Half an hour later is 4:00.",line(CLK(3,30,110),big("→"),CLK(4,0,110))),C("Starts at 2:00, lasts 45 minutes. It finishes at 2:45.",big("2:00 + 45 min = 2:45"))],
  try:PK("It starts at 5:00 and lasts 1 hour. When does it finish?",[["6:00",1],["5:30",0,"30 minutes is half an hour. 1 hour is a whole hour."],["5:01",0,"1 hour, not 1 minute. The short hand moves to the next number."]],CLK(5,0,130))})
},
money:{
 1:P=>({watch:[C("This is a 2 dollar coin. It is worth 2 dollars.",line(COIN(200),big("= $2"))),C("This is a 1 dollar coin. Even though it is bigger, it is worth less.",line(COIN(100),big("= $1"))),C("2 dollars, 2 dollars, 1 dollar. Count 2, 4, 5. That is 5 dollars.",line(COIN(200),COIN(200),COIN(100),big("$5")))],
  try:PK("How much money?",[["$4",1],["$3",0,"The $2 coin is worth 2. Count 2, then 3, 4."],["$5",0,"Count again: 2 for the $2 coin, then 3, 4."]],line(COIN(200),COIN(100),COIN(100)))}),
 2:P=>({watch:[C("Silver coins are cents.",line(COIN(10),COIN(20),COIN(50))),C("Start with the biggest. 50 cents, then 70, then 80. That is 80 cents.",line(COIN(50),COIN(20),COIN(10),big("80c")))],
  try:PK("How much money?",[["50c",1],["40c",0,"Count 20, 40, then 10 more."],["30c",0,"Count 20, 40, then 10 more."]],line(COIN(20),COIN(20),COIN(10)))}),
 3:P=>({watch:[C("Use 2 dollar coins first. Then a 1 dollar coin if you need it.",line(COIN(200),COIN(200),COIN(200),COIN(100))),C("2, 4, 6, 7. That makes 7 dollars.",big("$7"))],
  try:{kind:"build",target:500,parts:[[200,"","c200"],[100,"","c100"]],money:1,q:"Make $5. Tap the coins."}}),
 4:P=>({watch:[C("100 cents make 1 dollar.",big("100c = $1")),C("To make 90 cents: 50, then 70, then 90.",line(COIN(50),COIN(20),COIN(20),big("90c")))],
  try:{kind:"build",target:70,parts:[[50,"","c50"],[20,"","c20"],[10,"","c10"]],money:1,q:"Make 70c. Tap the coins."}}),
 5:P=>({watch:[C("If the price is the same as your money, or less, you can buy it.",big("💵 $5")),C("Juice is 3 dollars. Yes! A teddy is 8 dollars. Too much.",line(big("🧃 $3 ✅"),big("🧸 $8 ❌")))],
  try:PK("You have $10. What can you buy?",[["📕 $7",1],["🪁 $12",0,"12 is more than 10. Too much."],["⚽ $15",0,"15 is more than 10. Too much."]],big("$10"))}),
 6:P=>({watch:[C("Change is the money you get back.",big("🧸 $6 · pay $10")),C("Count up from 6 to 10: 7, 8, 9, 10. That is 4. The change is 4 dollars.",big("6 → 7, 8, 9, 10 = $4"))],
  try:PK("A toy costs $7. You pay $10. How much change?",[["$3",1],["$17",0,"Change is less than what you paid. Count up from 7 to 10."],["$4",0,"Count up from 7: 8, 9, 10. That is 3."]])}),
 7:P=>({watch:[C("Notes are 5, 10 and 20 dollars.",line(COIN(500),COIN(1000),COIN(2000))),C("Add the note first, then the coins. 10 dollars, 2 dollars, 50 cents. That is 12 dollars 50.",line(COIN(1000),COIN(200),COIN(50),big("$12.50")))],
  try:PK("How much altogether?",[["$8",1],["$7",0,"$5, then 7 with the $2, then 8 with the $1."],["$5.30",0,"The $2 and $1 coins are dollars, not cents."]],line(COIN(500),COIN(200),COIN(100)))})
},
data:{
 1:P=>({watch:[C("A picture graph. Each picture is one.",GRAPH([["🍎","apples",4],["🍌","bananas",2]])),C("Count along the row. 1, 2, 3, 4 apples.",big("🍎 = 4"))],
  try:PK("How many bananas?",[["3",1],["2",0,"Touch each banana and count again."],["4",0,"That is the apples row. Find the bananas."]],GRAPH([["🍎","apples",4],["🍌","bananas",3]]))}),
 2:P=>({watch:[C("The longest row is the most.",GRAPH([["🍓","berries",6],["🍇","grapes",2]])),C("The shortest row is the least. We picked the least grapes.",big("🍇 least"))],
  try:PK("Which fruit did we pick the most of?",[["🍊",1],["🍎",0,"Look for the longest row."],["🍌",0,"Look for the longest row."]],GRAPH([["🍎","apples",3],["🍊","oranges",6],["🍌","bananas",2]]))}),
 3:P=>({watch:[C("How many more? Line up the rows and look at the extra ones.",GRAPH([["🍎","apples",5],["🍌","bananas",3]])),C("5 apples and 3 bananas. 5 take away 3 is 2. 2 more apples.",big("5 − 3 = 2"))],
  try:PK("How many more apples than bananas?",[["3",1],["6",0,"6 is how many apples. Take away the bananas."],["9",0,"Don't add them. Take the small row from the big row."]],GRAPH([["🍎","apples",6],["🍌","bananas",3]]))}),
 4:P=>({watch:[C("All pink is certain. Most pink is likely.",line(SPIN(4),SPIN(3))),C("A little pink is unlikely. No pink is impossible.",line(SPIN(1),SPIN(0)))],
  try:PK("Landing on pink is…",[["likely",1],["certain",0,"Some is blue, so it might not land on pink."],["impossible",0,"There is lots of pink, so it can happen."]],SPIN(3))}),
 5:P=>({watch:[C("Each line is one. Four lines and one across makes a bundle of 5.",TALLY(5)),C("Count bundles by 5s, then the single lines. 5, 10, 11, 12.",line(TALLY(12),big("12")))],
  try:PK("How many tally marks?",[["8",1],["4",0,"The bundle is 5. Then count on 6, 7, 8."],["13",0,"The bundle is 5, not 10. 5, then 6, 7, 8."]],TALLY(8))})
},
sci:{
 1:P=>({watch:[C("Living things grow, need food and water, and make babies.",line(big("🌳 alive"),big("🐶 alive"),big("🧸 not alive"))),C("We have 5 senses: see, hear, smell, taste, touch.",big("👀 👂 👃 👅 ✋"))],
  try:PK("Which one is alive?",[["🐸 Frog",1],["🪨 Rock",0,"A rock does not grow or eat. It is not alive."],["🚗 Car",0,"A car does not grow or eat. It is not alive."]])}),
 2:P=>({watch:[C("Animals need food, water and air. Plants need water and sunlight.",line(big("🐨 🍃 💧"),big("🌱 ☀️ 💧"))),C("Living things change as they grow. A tadpole grows into a frog.",big("🥚 → 🐟 → 🐸")),C("Materials are chosen for a job. Glass is see-through. Rubber is waterproof.",line(big("🪟 glass"),big("🧥 waterproof")))],
  try:PK("Which material is best for a raincoat?",[["Plastic",1],["Paper",0,"Paper gets soggy in rain. A raincoat needs a waterproof material."],["Wool",0,"Wool soaks up water. A raincoat needs to keep water out."]],big("🌧️ 🧥"))}),
 3:P=>({watch:[C("A push moves something away. A pull brings it closer.",line(big("🛒 push"),big("🚪 pull"))),C("A bigger push makes things move faster.",big("⚽💨")),C("Heat can change things. Ice melts into water when it gets warm.",big("🧊 → 💧"))],
  try:PK("Opening a drawer is a…",[["Pull",1],["Push",0,"You bring the drawer towards you. That is a pull."]],big("🗄️"))}),
 4:P=>({watch:[C("Solids keep their shape. Liquids flow and take the shape of their container.",line(big("🧱 solid"),big("🥛 liquid"))),C("Day and night happen because Earth spins.",big("🌍🔄☀️")),C("Scientists sort living things into groups. Spiders have 8 legs. Insects have 6.",line(big("🕷️ 8 legs"),big("🐝 6 legs")))],
  try:PK("Which one is a liquid?",[["🍯 Honey",1],["🪵 Wood",0,"Wood keeps its shape. It is a solid."],["🧊 Ice",0,"Ice keeps its shape. It is a solid. Melted, it becomes a liquid."]])}),
 5:P=>({watch:[C("A food chain shows who eats what. It starts with a plant.",big("🌿 → 🐛 → 🐦")),C("Plants make their own food. They are producers. Animals are consumers.",line(big("🌿 producer"),big("🐦 consumer"))),C("Gravity pulls things down to Earth. Magnets pick up some metals, like iron.",line(big("🍎⬇️"),big("🧲📎")))],
  try:PK("In a food chain, what usually comes first?",[["A plant",1],["A hawk",0,"A hawk eats other animals. Food chains start with a plant."],["A rock",0,"A rock is not living. Food chains start with a plant."]])}),
 6:P=>({watch:[C("An adaptation helps a living thing survive where it lives.",big("🐪 desert · 🐧 ice")),C("Light travels in straight lines. A shadow forms when something blocks the light.",big("🔦 → ✋ → 🌑")),C("The Sun is at the centre of our solar system. Earth goes around it.",big("☀️ 🌍"))],
  try:PK("What makes a shadow?",[["Something blocking light",1],["Water",0,"A shadow is a dark shape where light is blocked."],["Wind",0,"A shadow is a dark shape where light is blocked."]],big("🔦✋"))}),
 7:P=>({watch:[C("Plants use sunlight to make sugar for food. This is photosynthesis.",big("☀️ + 🌿 → 🍬")),C("Earth goes around the Sun in about 365 days. Earth is tilted, so we have seasons.",big("🌍 ↻ ☀️ = 1 year")),C("Electricity needs a closed loop to flow. That is a circuit.",big("🔋 ➰ 💡"))],
  try:PK("What does a complete circuit need?",[["A closed loop",1],["A gap",0,"A gap stops the electricity. It needs a closed loop."],["Water",0,"Water and electricity are not safe together. It needs a closed loop of wire."]],big("🔋💡"))}),
 8:P=>({watch:[C("A fair test changes one thing only. Everything else stays the same.",big("🧪 change 1 thing")),C("A prediction is a guess based on what you know.",big("🤔 → 🔮")),C("Repeat an experiment to check the results.",big("🔁 🔁 🔁"))],
  try:PK("Testing which ball bounces highest. What must stay the same?",[["The height you drop them from",1],["The type of ball",0,"The ball is the thing we are changing. Everything else stays the same."],["Nothing",0,"In a fair test, everything else stays the same."]],big("⚽ 🏀 🎾"))})
},
geo:{
 1:P=>({watch:[C("Places have special jobs. We borrow books at the library. We play at the park.",line(big("📚 library"),big("🛝 park"))),C("A map shows places from above. North is usually at the top.",big("🗺️ ⬆️ N"))],
  try:PK("Where can you borrow books?",[["Library",1],["Beach",0,"The beach has sand and water. Books are at the library."],["Bedroom",0,"You sleep in your bedroom. You borrow books at the library."]],big("📚"))}),
 2:P=>({watch:[C("We live in Australia. The capital city is Canberra.",big("🇦🇺 Canberra")),C("Natural features are made by nature. Built features are made by people.",line(big("🏞️ river: natural"),big("🌉 bridge: built"))),C("The Sun rises in the east.",big("🌅 east"))],
  try:PK("Which is a natural feature?",[["Mountain",1],["Road",0,"People build roads. A mountain is made by nature."],["House",0,"People build houses. A mountain is made by nature."]],big("⛰️"))}),
 3:P=>({watch:[C("There are 7 continents and 5 oceans.",big("🌏 7 continents")),C("Australia has states. Melbourne is in Victoria. Tasmania is an island state.",big("🗺️ VIC · TAS")),C("A compass shows north, south, east and west. The equator goes around the middle of Earth.",big("🧭 N S E W"))],
  try:PK("What does a compass show?",[["Directions",1],["The time",0,"A clock shows the time. A compass shows directions."],["The weather",0,"A compass shows directions: north, south, east and west."]],big("🧭"))}),
 4:P=>({watch:[C("Aboriginal and Torres Strait Islander Peoples are the first peoples of Australia. Country is the land, water and sky that they care for.",big("🌏")),C("The top of Australia is tropical. It is hot and wet.",big("🌴 tropical")),C("A map scale shows how far things really are.",big("📏 1 cm = 1 km"))],
  try:PK("Which of these is a renewable resource?",[["Sunlight",1],["Coal",0,"Coal takes millions of years to form. When it's used up, it's gone."],["Oil",0,"Oil takes millions of years to form. When it's used up, it's gone."]],big("☀️"))}),
 5:P=>({watch:[C("The Pacific is the largest ocean. Kenya is in Africa.",big("🌊 Pacific")),C("Sustainable means using things so they last for the future.",big("♻️")),C("A grid reference uses a letter and a number to find a square on a map.",`<table class="ite-tab"><tr><th></th><th>1</th><th>2</th></tr><tr><th>A</th><td></td><td>⭐</td></tr><tr><th>B</th><td></td><td></td></tr></table>`)],
  try:PK("The star is in which square?",[["A2",1],["B2",0,"Look across from A. The star is in row A."],["A1",0,"Look down from 2. The star is in column 2."]],`<table class="ite-tab"><tr><th></th><th>1</th><th>2</th></tr><tr><th>A</th><td></td><td>⭐</td></tr><tr><th>B</th><td></td><td></td></tr></table>`)}),
 6:P=>({watch:[C("Natural disasters include floods, fires, cyclones and droughts.",big("🌊 🔥 🌀")),C("Papua New Guinea is Australia's nearest neighbour to the north.",big("🇵🇬 ⬆️ 🇦🇺")),C("Population means the number of people living in a place.",big("👥"))],
  try:PK("What is a population?",[["The number of people living in a place",1],["A type of map",0,"Population is about people: how many live there."],["A weather report",0,"Population is about people: how many live there."]],big("👥"))}),
 7:P=>({watch:[C("Urban places are cities and towns. Rural places are farms and countryside.",line(big("🏙️ urban"),big("🌾 rural"))),C("Latitude lines go around Earth. The equator is 0 degrees.",big("🌐 0° equator")),C("On a contour map, lines close together show a steep slope.",big("⛰️ ≡"))],
  try:PK("What does an urban area have more of?",[["Buildings and people",1],["Farms and paddocks",0,"Farms are rural. Urban means city."],["Trees and bush",0,"Urban means city, with lots of buildings."]],big("🏙️"))}),
 8:P=>({watch:[C("Places are connected. What happens in one place can change another.",big("🌏 ↔ 🌏")),C("A drought far away can change food prices here.",big("🌾☀️ → 🛒💲")),C("A primary source is data you collect yourself, like your own survey.",big("📋✏️"))],
  try:PK("Which is a primary source of geographic data?",[["Your own survey of a park",1],["A textbook",0,"A textbook is made by someone else later. That is secondary."],["A website summary",0,"A summary is made by someone else. That is secondary."]],big("📋"))})
},
hist:{
 1:P=>({watch:[C("The past is things that happened before today.",big("⏪")),C("We grow from a baby, to a child, to a grown-up.",big(pops(["👶","🧒","🧑","🧓"]))),C("Your grandparent is your mum or dad's mum or dad.",big("👵 👴"))],
  try:PK("Which is old: a candle or a light bulb?",[["Candle",1],["Light bulb",0,"Light bulbs came later. People used candles long ago."]],big("🕯️ 💡"))}),
 2:P=>({watch:[C("Long ago, life was different. People used horses and washboards.",line(big("🐎 long ago"),big("🚗 today"))),C("An artefact is an object from the past.",big("🏺")),C("First Nations peoples have lived in Australia for more than 60,000 years.",big("60,000+ years"))],
  try:PK("What is an artefact?",[["An object from the past",1],["A new toy",0,"Artefacts are old objects that tell us about the past."],["A type of food",0,"Artefacts are old objects that tell us about the past."]],big("🏺"))}),
 3:P=>({watch:[C("A timeline shows events in order. Oldest first.",`<div class="ite-hops"><span>1900</span><span>1950</span><span>2000</span></div>`),C("A decade is 10 years. A century is 100 years.",line(big("10 = decade"),big("100 = century"))),C("A primary source was made at the time, like a letter or a photo.",big("✉️ 📸"))],
  try:PK("What is a decade?",[["10 years",1],["100 years",0,"100 years is a century. A decade is 10."],["1 year",0,"A decade is 10 years."]])}),
 4:P=>({watch:[C("The First Fleet arrived at Sydney Cove in 1788.",big("⛵ 1788")),C("Colonisation changed life for First Nations peoples. They lost land, and many lost their lives.",big("🌏")),C("Historians use more than one source to check facts.",big("📜 + 📜"))],
  try:PK("When did the First Fleet arrive at Sydney Cove?",[["1788",1],["1901",0,"1901 is Federation. The First Fleet came earlier, in 1788."],["1066",0,"That is much too early. It was 1788."]],big("⛵"))}),
 5:P=>({watch:[C("In 1901 the colonies joined to make one country. This is Federation.",big("🇦🇺 1901")),C("Democracy means people vote to choose leaders.",big("🗳️")),C("The 1967 referendum meant First Nations peoples were counted in the census.",big("1967 ✅"))],
  try:PK("What is democracy?",[["People vote to choose leaders",1],["A king chooses everything",0,"In a democracy, people vote."],["Nobody makes rules",0,"In a democracy, people vote to choose leaders who make rules."]],big("🗳️"))}),
 6:P=>({watch:[C("After World War Two, many migrants came to Australia for work and a safer life.",big("🚢")),C("Multicultural means many cultures living together.",big("🌏🤝")),C("In 2008, the Prime Minister said sorry to the Stolen Generations.",big("2008 · Sorry"))],
  try:PK("What does multicultural mean?",[["Many cultures living together",1],["One culture only",0,"Multi means many."],["A type of food",0,"Multi means many. Many cultures living together."]],big("🌏🤝"))}),
 7:P=>({watch:[C("Ancient Egyptians built the pyramids and wrote with hieroglyphs.",big("🔺 𓂀")),C("The Romans were famous for roads and a big empire. China built the Great Wall.",line(big("🏛️ Rome"),big("🧱 China"))),C("BCE years count down to year 1. CE counts up.",big("BCE ⬅️ 1 ➡️ CE"))],
  try:PK("Which ancient people built the pyramids?",[["Egyptians",1],["Vikings",0,"Vikings were sailors from the north. The pyramids are in Egypt."],["Romans",0,"The Romans built roads. The pyramids are in Egypt."]],big("🔺"))}),
 8:P=>({watch:[C("A primary source comes from the time. A secondary source is made later.",line(big("📔 primary"),big("📘 secondary"))),C("Every source has a perspective, a point of view.",big("👀")),C("Cause and effect: why something happened, and what happened because of it.",big("cause ➡️ effect"))],
  try:PK("A soldier's diary from 1915 is…",[["A primary source",1],["A secondary source",0,"It was written at the time by someone who was there. That is primary."]],big("📔"))})
},
feel:{
 1:P=>({watch:[C("Feelings are messages from our body.",big("💛")),C("We feel happy when good things happen. We feel sad when we lose something.",line(big("😊 happy"),big("😢 sad"))),C("All feelings are okay.",big("😊 😢 😠 😨 😌"))],
  try:PK("Nan gives you a big hug. How might you feel?",[["😊 happy",1],["😠 angry",0,"Most people feel happy and loved after a hug from Nan."],["😨 scared",0,"Most people feel happy and loved after a hug from Nan."]])}),
 2:P=>({watch:[C("Look at the eyes and the mouth.",big("👀 👄")),C("Mouth open and eyebrows up is surprised. Eyebrows down is angry.",line(big("😮 surprised"),big("😠 angry"))),C("Tears and a down mouth is sad.",big("😢 sad"))],
  try:PK("How is this person feeling?",[["sad",1],["happy",0,"Look at the tears and the mouth. They show sad."],["excited",0,"Look at the tears and the mouth. They show sad."]],big("😢"))}),
 3:P=>({watch:[C("Big feelings can be helped.",big("💛")),C("Angry? Take 5 big, slow breaths.",big("🌬️ 1 2 3 4 5")),C("Overwhelmed? Find a quiet spot, or put on headphones.",big("🎧 🤫"))],
  try:{kind:"breathe",q:"Let's try a slow breath. Tap the bubble 5 times, slowly."}}),
 4:P=>({watch:[C("We can help others when they feel sad.",big("🤝")),C("Ask: are you okay? Sit with them. Ask them to play.",line(big("❓ okay?"),big("🪑 sit"),big("⚽ play")))],
  try:PK("Your friend fell over and is crying. What could you do?",[["Ask if they are okay",1],["Laugh",0,"Laughing could hurt their feelings. We can ask if they are okay."],["Walk away",0,"They might need help. We can ask if they are okay."]])})
}
};

/* ---------- reteach: built from the question itself, without giving the answer ---------- */
const N=s=>(String(s).match(/\d+/g)||[]).map(Number);
const SH_TIP={circle:"A circle is round. It has no corners.",square:"A square has 4 sides, all the same length.",triangle:"A triangle has 3 sides and 3 corners.",star:"A star has 5 points.",heart:"A heart has two bumps at the top and a point at the bottom.",rectangle:"A rectangle has 2 long sides and 2 short sides.",pentagon:"A pentagon has 5 sides.",hexagon:"A hexagon has 6 sides.",octagon:"An octagon has 8 sides."};
const LET_TIP={a:"Small a is round, with a little stick on its side.",b:"Small b has a tall stick, then a round tummy.",c:"Small c is round with a gap, like a bitten cookie.",d:"Small d has a round tummy first, then a tall stick.",m:"Small m has two humps.",s:"Small s is curvy, like a wiggly road.",t:"Small t is a stick with a line across it."};
function splitAdd(a,b){const out=[];const H=x=>Math.floor(x/100)*100,T=x=>Math.floor(x%100/10)*10,O=x=>x%10;
 if(a>=100||b>=100)out.push(`Hundreds: ${H(a)} + ${H(b)} = ${H(a)+H(b)}.`);
 out.push(`Tens: ${T(a)} + ${T(b)} = ${T(a)+T(b)}.`,`Ones: ${O(a)} + ${O(b)} = ${O(a)+O(b)}.`);
 if(O(a)+O(b)>9)out.push("More than 9 ones? Make a new ten.");
 out.push("Now put them together.");return out}
function splitSub(a,b){const big=b>=100?Math.floor(b/100)*100:Math.floor(b/10)*10,rest=b-big;
 const out=[`Take away ${big} first: ${a} − ${big} = ${a-big}.`];
 out.push(rest?`Now take away ${rest} more. Tens first, then ones.`:"That's all of it. Check your answer.");return out}
const RT={
 words:(q,L)=>{const s=strip(q.say);
  if(q.type==="spell"&&q.word){const out=[`Say ${q.word} slowly, one sound at a time.`,"Tap a letter for the first sound. Then the next sound."];if(/sh|ee|oo|ck|ch/.test(q.word))out.push("Some sounds use two letters, like sh, ee or oo.");return{lines:out,show:q.stage||""}}
  if(L===1&&q.ans)return{lines:[`Big ${q.ans.toUpperCase()} and its small letter make the same sound.`,LET_TIP[q.ans]||"Look at the shape carefully."],show:big(q.ans.toUpperCase())};
  let m=s.match(/^(\w+)\. What sound/);if(m)return{lines:[`Say ${m[1]} slowly.`,"Stretch the very first sound.","Which letter makes that sound?"],show:q.stage||""};
  if(/Which picture/.test(s))return{lines:["Say each sound in the word.","Blend the sounds together.","Which picture is that word?"]};
  if(/Which word says/.test(s))return{lines:["Look at every letter, from start to end.","The words look alike. Find the letter that is different."]};
  if(/Which word fits/.test(s))return{lines:["Read the sentence with each word in the gap.","Which one makes sense?"]};
  m=s.match(/same as (\w+)/);if(m)return{lines:["Same meaning means you can swap the words.",`Try each word instead of ${m[1]}. Does it still mean the same?`]};
  return null},
 read:(q,L)=>{const T={1:["Opposites are as different as can be.","Think: what is the very different word?"],2:["These words sound the same but mean different things.","Read the sentence. Which spelling has the right meaning?"],3:["un means not. re means again. dis means not.","Which part gives the meaning we need?"],4:["Look for a time clue: yesterday, now, tomorrow.","Past words often end in ed. Now words often end in ing."],5:["A sentence starts with a capital letter.","Names need capitals too.","It ends with . ? or !"],6:["Listen to the story again.","Find the words that answer the question."],7:["Find the clue words.","Clue plus what you know gives the answer."],8:["Read it again slowly.","Think about why it was written, or what the words really mean."]};
  return{lines:T[L]||T[8]}},
 think:(q,L)=>{const T={1:["Look at what most of them have in common.","Which one is different?"],2:["What happens first? What happens last?","Put the rest in between."],3:["Find the clues.","What do the clues tell you?"],4:["Think about what usually happens.","Which is most likely?"],5:["Line them up from most to least.","Then find the one the question asks for."],6:["Can you check it? Then it's a fact.","Is it what someone thinks or feels? Then it's an opinion."],7:["Find the clue words in the story.","What do they tell you?"],8:["Test the claim yourself.","Is it true? If not, what is right?"]};
  return{lines:T[L]||T[8]}},
 nums:(q,L)=>{const s=strip(q.say);let m;
  if(/Tap each one to count/.test(s))return{lines:["Touch each one, one at a time.","Say one number for each touch.","The last number you say is how many."]};
  if(m=s.match(/(\d+) and (\d+) more/)){const[a,b]=[+m[1],+m[2]];return{lines:[`Start at ${a}.`,`Count on ${b} more. Use your fingers.`,"Where did you stop?"],show:line(big(P().e.repeat(a)),big("+"),big(P().e.repeat(b)))}}
  if(m=s.match(/(\d+) take away (\d+)/)){const[a,b]=[+m[1],+m[2]];if(a<=20)return{lines:[`Start with ${a}.`,`Cover ${b} of them.`,"Count the ones that are left."],show:big(P().e.repeat(a-b)+`<span style="opacity:.25">${P().e.repeat(b)}</span>`)};return{lines:splitSub(a,b)}}
  if(m=s.match(/(\d+) plus (\d+)/)){const[a,b]=[+m[1],+m[2]];
   if(a<20&&b<20){const hi=Math.max(a,b),lo=Math.min(a,b);if(hi<10&&hi+lo>10){const need=10-hi;return{lines:["Make a ten first.",`${hi} needs ${need} to make 10.`,`${lo} is ${need} and ${lo-need}.`,`So it's 10 and ${lo-need} more.`],show:frame(hi,need)}}return{lines:[`Start at ${hi}.`,`Count on ${lo} more.`]}}
   return{lines:splitAdd(a,b)}}
  if(m=s.match(/(\d+) \w+(?: \w+)? of \w+ with (\d+) in each/)){const[n,k]=[+m[1],+m[2]];return{lines:[`There are ${n} equal groups of ${k}.`,`That's ${n} × ${k}.`,k<=10?`Count by ${k}s, ${n} times.`:`Split ${k} into 10 and ${k-10}. Do ${n} × 10, then ${n} × ${k-10}, then add.`]}}
  return null},
 pv:(q,L)=>{const s=strip(q.say);let m;
  if(/long stick is ten/.test(s))return{lines:["Count the sticks by 10s.","Then count on the cubes by 1s."]};
  if(/Flats are one hundred/.test(s))return{lines:["Count the flats by 100s.","Then the sticks by 10s.","Then the cubes by 1s."]};
  if(q.type==="build"&&q.target){const t=q.target,h=Math.floor(t/100),te=Math.floor(t%100/10),o=t%10;return{lines:[`${t} is ${h?h+" hundreds, ":""}${te} tens and ${o} ones.`,"Tap the big ones first. Then the small ones."]}}
  if(/bigger|smaller/.test(s))return{lines:["Look at the hundreds first.","If they are the same, look at the tens.","Then the ones."]};
  if(m=s.match(/Is (\d+) odd or even/))return{lines:["Make pairs.","One left over means odd. None left over means even.","Even numbers end in 0, 2, 4, 6 or 8."]};
  if(m=s.match(/Round (\d+) to the nearest ten/)){const n=+m[1],lo=Math.floor(n/10)*10;return{lines:[`${n} is between ${lo} and ${lo+10}.`,`Look at the ones digit: ${n%10}.`,"0 to 4 rounds down. 5 to 9 rounds up."]}}
  if(m=s.match(/value of the (\w+) digit/))return{lines:["Say the places: thousands, hundreds, tens, ones.",`Find the ${m[1]} digit.`,"Add a zero for each place to its right."]};
  if(m=s.match(/Round (\d+) to the nearest (\d+)/)){const pl={"10":"tens","100":"hundreds","1000":"thousands"}[m[2]]||"";return{lines:[`Find the ${pl} digit.`,"Look at the digit just to its right.","5 or more rounds up. Less than 5 rounds down."]}}
  return null},
 times:(q,L)=>{const s=strip(q.say);let m;
  if(m=s.match(/Count by (\d+)s/))return{lines:[`We jump by ${m[1]} each time.`,`Find the number before the gap. Add ${m[1]}.`]};
  if(m=s.match(/(\d+) rows of (\d+)/))return{lines:[`Each row has ${m[2]}.`,`Tap the rows and count by ${m[2]}s.`]};
  if(m=s.match(/(\d+) times what equals (\d+)/))return{lines:[`Count by ${m[1]}s until you reach ${m[2]}.`,"Count how many jumps."]};
  if(m=s.match(/What is (\d+) times (\d+)/)){const[b,a]=[+m[1],+m[2]];if(b>10){const t=Math.floor(b/10)*10,o=b%10;return{lines:[`Split ${b} into ${t} and ${o}.`,`${t} × ${a} = ${t*a}.`,`${o} × ${a} = ${o*a}.`,"Now add them together."]}}
   return{lines:[`${b} × ${a} means ${b} groups of ${a}.`,`Count by ${a}s, ${b} times. Or use a fact you know.`]}}
  if(m=s.match(/(\d+) divided by (\d+)/))return{lines:[`Share ${m[1]} into ${m[2]} equal groups.`,`Think: ${m[2]} × what = ${m[1]}?`]};
  if(m=s.match(/(\d+) lollies are shared between (\d+)/))return{lines:[`Think: ${m[2]} × what gets close to ${m[1]}, without going over?`,"That is how many each kid gets.","Any left over is the remainder."]};
  return null},
 frac:(q,L)=>{const s=strip(q.say);let m;
  if(q.type==="shade")return{lines:[`The pizza has ${q.n} equal pieces.`,`We need ${q.k} of them.`,`Tap ${q.k} pieces, no more.`]};
  if(/coloured/.test(s))return{lines:["Count all the pieces. That's the bottom number.","Count the coloured pieces. That's the top number."]};
  if(m=s.match(/one (half|quarter) of (\d+)/))return{lines:[`Share ${m[2]} into ${m[1]==="half"?2:4} equal groups.`,"Count how many in one group."]};
  if(/same amount as/.test(s))return{lines:["Look at how much pizza is coloured.","Find the one that covers the same amount."]};
  if(/same as \d+ over/.test(s))return{lines:["Times the top and the bottom by the same number.","Try × 2, × 3, × 4."]};
  if(m=s.match(/(\d+) over (\d+) plus (\d+) over (\d+)/))return{lines:[`The bottom numbers are the same: ${m[2]}.`,`Add the tops: ${m[1]} + ${m[3]}.`,"Keep the bottom number."]};
  if(/tenths|hundredths/.test(s))return{lines:["Tenths use 1 place after the dot.","Hundredths use 2 places after the dot.","Put a zero in front of the dot."]};
  return null},
 shapes:(q,L)=>{if(q.type==="mirror")return{lines:["Look at one row at a time.","The square next to the line copies the square next to the line.","The far square copies the far square."]};
  if(L===1&&q.ans)return{lines:["Look at the sides and corners.",SH_TIP[q.ans]||""]};
  if(L===2||L===3)return{lines:["Say the pattern out loud.","Find the part that repeats.","What comes after the last one?"]};
  if(L===4)return{lines:["Put your finger on one corner.","Touch each side as you count, until you are back."]};
  if(q.ans)return{lines:["Count the sides of each shape.",SH_TIP[q.ans]||""]};return null},
 time:(q,L)=>{const s=strip(q.say);
  if(/day comes/.test(s))return{lines:["Say the days in order: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.","After means the next one. Before means the one just in front."]};
  if(q.type==="setclock")return{lines:["The short hand is the hour.",q.tm===0?"For o'clock, the long hand points to 12.":q.tm===30?"For half past, the long hand points to 6.":"Each number is 5 minutes for the long hand. Count by 5s."]};
  if(/starts at/.test(s))return{lines:["Start at the starting time.","15 minutes is a quarter of the way around. 30 is half. 60 is a whole hour.","Past 60 minutes? Go to the next hour."]};
  const T={2:["The short hand shows the hour.","The long hand on 12 means o'clock."],3:["The long hand on 6 means half past.","The short hand has just gone past the hour."],5:["The long hand on 3 is quarter past.","The long hand on 9 is quarter to the next hour."],6:["The short hand shows the hour it has passed.","Count by 5s for each number on the long hand."]};
  return{lines:T[L]||T[6]}},
 money:(q,L)=>{const s=strip(q.say);
  if(q.type==="build")return{lines:["Use the biggest coins first.",`Stop before you go over ${(()=>{try{return money(q.target)}catch(e){return q.target}})()}.`,"Too many? Start again."]};
  const T={1:["A $2 coin is worth 2. A $1 coin is worth 1.","Count the $2 coins by 2s. Then add the $1s."],2:["Start with the biggest coin.","Count on with the smaller coins."],5:["Look at each price.","You can buy it if it costs the same as your money, or less."],6:["Count up from the price to $10.","How many dollars did you count?"],7:["Add the notes first.","Then add the coins."]};
  return{lines:T[L]||T[2]}},
 data:(q,L)=>{const T={1:["Find the right row.","Touch each picture and count."],2:["The longest row is the most.","The shortest row is the least."],3:["Count both rows.","Take the small number away from the big number."],4:["Look at how much of the spinner is pink.","All pink: certain. More than half: likely. A little: unlikely. None: impossible."],5:["Each bundle is 5. Count bundles by 5s.","Then count on the single lines."]};return{lines:T[L]||T[1]}},
 feel:(q,L)=>({lines:["All feelings are okay.","Think: how would your body feel?","Which choice is kind and safe?"]})
};
function P(){return pal()}

/* ---------- state ---------- */
function seenMap(){try{S.islandTeach=S.islandTeach||{};const k=who();return S.islandTeach[k]=S.islandTeach[k]||{}}catch(e){return{}}}
function capLevel(w,l){l=Math.max(1,Number(l)||1);if(w==="hist"&&window.PEBBLE_AGE_GUARD){try{l=Math.min(l,window.PEBBLE_AGE_GUARD.histCap(who()))}catch(e){}}
 const t=TEACH[w];if(!t)return l;while(l>1&&!t[l])l--;return l}
function lessonFor(w,l){const t=TEACH[w];if(!t)return null;const L=capLevel(w,l);const f=t[L];if(!f)return null;try{return f(pal())}catch(e){return null}}
function curLevel(r){try{return r.qLevel||prog(r.w).lvl}catch(e){return 1}}

/* ---------- styles ---------- */
const css=document.createElement("style");
css.textContent=`
.ite-ov{position:fixed;inset:0;z-index:45;background:rgba(20,38,44,.55);display:flex;align-items:center;justify-content:center;padding:12px}
.ite-box{--bg2:#eef7f9;background:#fffaf0;color:#14262c;border-radius:26px;border:3px solid #2f7d4f;box-shadow:0 10px 0 rgba(0,0,0,.18);width:min(760px,100%);max-height:calc(100vh - 24px);overflow:auto;padding:16px 18px 18px;display:grid;gap:12px;font-family:var(--display,Lexend,system-ui);text-align:center}
.ite-head{display:flex;align-items:center;gap:10px;justify-content:space-between}
.ite-head .ite-who{display:flex;align-items:center;gap:8px;font-weight:800;font-size:1.15rem}
.ite-head .ite-who span{font-size:2.2rem;line-height:1}
.ite-steps{display:flex;gap:6px;justify-content:center;flex-wrap:wrap}
.ite-steps b{padding:6px 12px;border-radius:999px;background:#e7efe9;color:#33515a;font-size:.95rem}
.ite-steps b.on{background:#2f7d4f;color:#fff}
.ite-text{font-size:clamp(1.25rem,3vw,1.6rem);line-height:1.45;font-weight:700;margin:0}
.ite-vis{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center;min-height:90px;color:#14262c}
.ite-big{font-size:clamp(1.6rem,4.6vw,2.5rem);font-weight:800;line-height:1.3;color:#14262c}
.ite-big small{font-size:.5em;display:block}
.ite-line{display:flex;flex-wrap:wrap;gap:14px;justify-content:center;align-items:center}
.ite-pop{display:inline-block;animation:itePop .45s both}
@keyframes itePop{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:none}}
.ite-calm .ite-pop{animation:none}
.ite-btn{min-height:60px;min-width:60px;padding:10px 20px;border-radius:18px;border:0;background:#2f7d4f;color:#fff;font:800 1.2rem var(--display,Lexend,system-ui);cursor:pointer;box-shadow:0 5px 0 #1f5a37}
.ite-btn.ghost{background:#fff;color:#1f5a37;border:3px solid #2f7d4f;box-shadow:none}
.ite-btn:disabled{opacity:.45}
.ite-btn:focus-visible,.ite-opt:focus-visible,.ite-t:focus-visible{outline:4px solid #1e86a3;outline-offset:3px}
.ite-nav{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.ite-say{min-width:60px;min-height:60px;border-radius:50%;border:3px solid #2f7d4f;background:#fff;font-size:1.6rem;cursor:pointer}
.ite-opts{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
.ite-opt{min-height:64px;min-width:96px;padding:10px 18px;border-radius:18px;border:3px solid #9cc7b0;background:#fff;color:#14262c;font:800 clamp(1.15rem,3vw,1.5rem) var(--display,Lexend,system-ui);cursor:pointer;display:inline-flex;flex-direction:column;align-items:center;gap:4px}
.ite-opt.yes{background:#dff3e6;border-color:#2f7d4f}
.ite-opt.no{opacity:.4}
.ite-fb{min-height:1.6em;font-size:1.15rem;font-weight:700;color:#5c3a00}
.ite-fb.ok{color:#1f5a37}
.ite-t{min-width:64px;min-height:64px;border-radius:16px;border:3px solid #9cc7b0;background:#fff;font-size:2rem;cursor:pointer;position:relative;color:#14262c}
.ite-t.done{background:#dff3e6;border-color:#2f7d4f}
.ite-t.gone{opacity:.2}
.ite-t i{position:absolute;right:4px;bottom:0;font:800 .9rem Lexend,system-ui;font-style:normal}
.ite-shp{display:inline-block;width:64px}
.ite-opt .ite-shp{width:72px}
.ite-frame{display:grid;grid-template-columns:repeat(5,34px);gap:4px;padding:6px;background:#fff;border:3px solid #9a6a2c;border-radius:10px}
.ite-frame i{width:34px;height:34px;border-radius:50%;background:#f1ece0}
.ite-frame i.f1{background:#3d8fb0}.ite-frame i.f2{background:#e2953a}
.ite-graph{display:grid;gap:6px;text-align:left;font-size:1.8rem}.ite-graph b{display:inline-block;width:6.5em;font-size:1rem}
.ite-hops{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}.ite-hops span{min-width:56px;padding:10px;border-radius:14px;background:#e7f2f6;font-weight:800;font-size:1.4rem}.ite-hops span.q{background:#ffe9b8}
.ite-rows{display:grid;gap:6px}.ite-rows div{font-size:1.8rem}
.ite-row{min-height:60px;border-radius:14px;border:3px solid #9cc7b0;background:#fff;font-size:1.8rem;cursor:pointer;padding:4px 14px;color:#14262c}
.ite-row.done{background:#dff3e6;border-color:#2f7d4f}
.ite-row.done::after{content:attr(data-total);font:800 1.2rem Lexend,system-ui;margin-left:10px}
.ite-bars{display:flex;gap:14px;align-items:flex-end;justify-content:center}.ite-bars span{width:70px;background:#7a6fc2;color:#fff;border-radius:10px 10px 0 0;font-weight:800;padding-top:6px}
.ite-nl{position:relative;display:flex;justify-content:space-between;width:min(420px,90%);border-top:4px solid #14262c;padding-top:6px;font-weight:800;font-size:1.3rem;margin:24px auto 0}
.ite-nl b{position:absolute;top:-38px;transform:translateX(-50%);background:#ffe9b8;border-radius:10px;padding:2px 8px}
.ite-tab{border-collapse:collapse;font-size:1.5rem;font-weight:800}.ite-tab th,.ite-tab td{border:2px solid #9cc7b0;padding:8px 14px;min-width:44px;height:44px}
.ite-pass{background:#fff;border-radius:16px;padding:10px 14px;font-size:1.25rem;line-height:1.5;max-width:560px;text-align:left}
.ite-pass mark{background:#ffe9b8}
.ite-days{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}.ite-days span{padding:10px;border-radius:12px;background:#e7f2f6;font-weight:800}
.ite-mir{display:grid;grid-template-columns:repeat(2,52px) 6px repeat(2,52px);gap:4px}.ite-mir i,.ite-mir button{width:52px;height:52px;border-radius:8px;background:#f1ece0;border:2px solid #c9bfa8}.ite-mir .on{background:#3d8fb0}.ite-mir b{background:#c8607a;border-radius:3px}
.ite-mir button{cursor:pointer}
.ite-pie path{cursor:pointer}
.ite-tot{font-weight:800;font-size:1.4rem}
.ite-bubble{width:140px;height:140px;border-radius:50%;border:0;background:radial-gradient(circle at 35% 35%,#fff,#a8dcef);font-size:1.4rem;font-weight:800;color:#14262c;cursor:pointer;transition:transform 1.2s ease}
.ite-calm .ite-bubble{transition:none}
.ite-bubble.big{transform:scale(1.25)}
.ite-show{min-height:56px;padding:8px 16px;border-radius:999px;border:3px solid #2f7d4f;background:#fffaf0;color:#1f5a37;font:800 1.05rem var(--display,Lexend,system-ui);cursor:pointer;margin-left:auto;white-space:nowrap}
.ite-re{margin-top:10px;width:100%;min-height:58px;border-radius:16px;border:3px solid #d9a52b;background:#fff6dc;color:#5c3a00;font:800 1.15rem var(--display,Lexend,system-ui);cursor:pointer}
.ite-lines{list-style:none;padding:0;margin:0;display:grid;gap:8px;text-align:left;font-size:clamp(1.15rem,2.8vw,1.4rem);font-weight:700;line-height:1.4}
.ite-lines li{background:#fff;border-radius:14px;padding:8px 12px;border-left:6px solid #d9a52b}
@media(max-width:520px){.ite-box{padding:12px}.ite-show{font-size:.95rem;padding:6px 10px}}
`;
document.head.appendChild(css);

/* ---------- overlay ---------- */
let OV=null;
function closeOv(){if(OV){OV.remove();OV=null;setTimeout(addShow,0)}}
function shell(title){closeOv();const o=document.createElement("div");o.className="ite-ov"+(calm()?" ite-calm":"");o.setAttribute("role","dialog");o.setAttribute("aria-modal","true");
 const m=pal();o.innerHTML=`<div class="ite-box"><div class="ite-head"><div class="ite-who"><span aria-hidden="true">${m.ico}</span>${esc(title.replace("{m}",m.name))}</div><button class="ite-say" type="button" aria-label="Hear it again">🔊</button></div><div class="ite-steps"></div><div class="ite-body"></div></div>`;
 document.body.appendChild(o);OV=o;return o}
function steps(o,i){o.querySelector(".ite-steps").innerHTML=["👀 Watch me","🤝 Try it with me","⭐ Your turn"].map((t,j)=>`<b class="${j===i?"on":""}">${t}</b>`).join("")}

function openLesson(w,l,mode,onDone){
 const les=lessonFor(w,l);if(!les){onDone&&onDone();return false}
 const o=shell("{m} shows you how");const body=o.querySelector(".ite-body");let sayNow="";
 o.querySelector(".ite-say").onclick=()=>{tap();say(sayNow)};
 const speakIt=t=>{sayNow=t;if(readOn())setTimeout(()=>{if(OV===o)say(t)},mode==="auto"?550:150)};
 const finish=()=>{tap();closeOv();onDone&&onDone()};
 let i=0;
 function watch(){steps(o,0);const c=les.watch[i];
  body.innerHTML=`<p class="ite-text">${esc(c.s)}</p><div class="ite-vis">${c.v}</div><div class="ite-nav">${i>0?'<button class="ite-btn ghost" id="ite-back" type="button">← Back</button>':""}<button class="ite-btn" id="ite-fwd" type="button">${i<les.watch.length-1?"Next →":"Let's try →"}</button></div>`;
  speakIt(c.s);
  const b=body.querySelector("#ite-back");if(b)b.onclick=()=>{tap();i--;watch()};
  body.querySelector("#ite-fwd").onclick=()=>{tap();if(i<les.watch.length-1){i++;watch()}else tryIt()}}
 function tryIt(){steps(o,1);body.innerHTML=`<p class="ite-text" id="ite-q"></p><div class="ite-vis" id="ite-area"></div><div class="ite-fb" id="ite-fb"></div><div class="ite-nav"><button class="ite-btn ghost" id="ite-again" type="button">↺ Watch again</button><button class="ite-btn" id="ite-go" type="button" disabled>${mode==="auto"?"My turn →":"Back to my question →"}</button></div>`;
  body.querySelector("#ite-again").onclick=()=>{tap();i=0;watch()};
  const go=body.querySelector("#ite-go");go.onclick=()=>{steps(o,2);finish()};
  const t=les.try;body.querySelector("#ite-q").textContent=t.q||"";speakIt(t.q||"");
  runTry(t,body.querySelector("#ite-area"),body.querySelector("#ite-fb"),msg=>{const fb=body.querySelector("#ite-fb");fb.className="ite-fb ok";fb.textContent="🎉 "+msg;yay();go.disabled=false;go.focus();sayNow=msg+" Now it's your turn!";if(readOn())say(sayNow)},m=>{sayNow=m;say(m)})}
 watch();return true}

/* ---------- interactive "try it with me" engines ---------- */
function runTry(t,area,fb,done,hint){
 const nudge=m=>{fb.className="ite-fb";fb.textContent=m;hint(m)};
 const k=t.kind;
 if(k==="pick"){area.innerHTML=(t.show?`<div class="ite-vis" style="width:100%">${t.show}</div>`:"")+`<div class="ite-opts">${mix(t.opts.map((o,j)=>j)).map(j=>`<button class="ite-opt" type="button" data-j="${j}">${t.opts[j].h}</button>`).join("")}</div>`;
  area.querySelectorAll("[data-j]").forEach(b=>b.onclick=()=>{const o=t.opts[+b.dataset.j];if(b.classList.contains("no"))return;
   if(o.ok){b.classList.add("yes");area.querySelectorAll("[data-j]").forEach(x=>x.disabled=true);done(pick(["Yes! You got it.","That's it!","Great thinking!"]))}
   else{b.classList.add("no");tap();nudge(o.why||"Not that one. Look again.")}});return}
 if(k==="count"){let n=0;const tot=t.groups.reduce((a,b)=>a+b,0);
  area.innerHTML=t.groups.map(g=>`<div class="ite-line">${Array.from({length:g},()=>`<button class="ite-t" type="button">${t.e}</button>`).join("")}</div>`).join('<span class="ite-big">+</span>');
  area.querySelectorAll(".ite-t").forEach(b=>b.onclick=()=>{if(b.classList.contains("done"))return;n++;b.classList.add("done");b.insertAdjacentHTML("beforeend",`<i>${n}</i>`);cnt(n);say(String(n));
   if(n===tot)setTimeout(()=>done(t.groups.length>1?`${t.groups.join(" and ")} more makes ${tot}!`:`There are ${tot}!`),500)});return}
 if(k==="away"){let gone=0;area.innerHTML=`<div class="ite-line">${Array.from({length:t.n},()=>`<button class="ite-t" type="button">${t.e}</button>`).join("")}</div>`;
  area.querySelectorAll(".ite-t").forEach(b=>b.onclick=()=>{if(b.classList.contains("gone")||gone>=t.k)return;gone++;b.classList.add("gone");cnt(gone);say(`${gone} gone`);
   if(gone===t.k)setTimeout(()=>done(`${t.n} take away ${t.k} leaves ${t.n-t.k}. Count them!`),500)});return}
 if(k==="build"){let tot=0;const isM=!!t.money;const fmt=v=>isM?(v?(()=>{try{return money(v)}catch(e){return v+"c"}})():"0c"):String(v);
  const H={rod:ROD(),cube:CUBE,flat:FLAT};const ph=p=>H[p[2]]||COIN(p[0]);
  area.innerHTML=`<div class="ite-tot">Target: ${fmt(t.target)} · Now: <span id="ite-tot">${fmt(0)}</span></div><div class="ite-line" id="ite-bin" style="min-height:70px;width:100%"></div><div class="ite-line">${t.parts.map((p,j)=>`<button class="ite-opt" type="button" data-p="${j}">${ph(p)}${p[1]?`<span>${p[1]}</span>`:""}</button>`).join("")}</div>`;
  const upd=()=>{area.querySelector("#ite-tot").textContent=fmt(tot)};let fin=false;
  area.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{if(fin)return;const p=t.parts[+b.dataset.p];tot+=p[0];area.querySelector("#ite-bin").insertAdjacentHTML("beforeend",ph(p));upd();cnt(tot/p[0]);
   if(tot===t.target){fin=true;done(`You made ${fmt(tot)}!`)}
   else if(tot>t.target){nudge(`That's ${fmt(tot)}. Too many! Let's start again. Big ones first.`);setTimeout(()=>{tot=0;area.querySelector("#ite-bin").innerHTML="";upd()},900)}});return}
 if(k==="shade"){let on=new Set(),fin=false;let svg="";try{svg=pie(t.n,0,true,200)}catch(e){}
  area.innerHTML=`<div class="ite-pie">${svg}</div><div class="ite-tot" id="ite-tot">0 of ${t.n}</div>`;
  const paint=()=>{area.querySelectorAll("[data-part]").forEach(p=>p.setAttribute("fill",on.has(+p.dataset.part)?"#e2953a":"#f6e3b8"));area.querySelector("#ite-tot").textContent=`${on.size} of ${t.n}`};
  area.querySelectorAll("[data-part]").forEach(p=>p.addEventListener("click",()=>{if(fin)return;const j=+p.dataset.part;on.has(j)?on.delete(j):on.add(j);paint();cnt(on.size);
   if(on.size===t.k){fin=true;let w="";try{w=frSay(t.k,t.n)}catch(e){w=t.k+" of "+t.n}done(`${t.k} of ${t.n} parts. That's ${w}!`)}
   else if(on.size>t.k)nudge(`That's ${on.size}. We only need ${t.k}. Tap one to take it away.`)}));return}
 if(k==="clock"){let h=12,m=0,fin=false;const D=(a,b)=>{try{return dig(a,b)}catch(e){return a+":"+String(b).padStart(2,"0")}};
  area.innerHTML=`<div id="ite-clk"></div><div class="ite-nav"><button class="ite-btn ghost" type="button" data-c="h-">Hour −</button><button class="ite-btn ghost" type="button" data-c="h+">Hour +</button><button class="ite-btn ghost" type="button" data-c="m-">Min −${t.step}</button><button class="ite-btn ghost" type="button" data-c="m+">Min +${t.step}</button></div><button class="ite-btn" type="button" id="ite-chk">Check ✓</button>`;
  const draw=()=>{area.querySelector("#ite-clk").innerHTML=CLK(h,m,190)+`<div class="ite-tot">${D(h,m)}</div>`};draw();
  const nh2=x=>((x-1+12)%12)+1;
  area.querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>{if(fin)return;tap();const c=b.dataset.c;if(c==="h+")h=nh2(h+1);if(c==="h-")h=nh2(h-1);if(c==="m+"){m+=t.step;if(m>=60){m-=60;h=nh2(h+1)}}if(c==="m-"){m-=t.step;if(m<0){m+=60;h=nh2(h-1)}}draw()});
  area.querySelector("#ite-chk").onclick=()=>{if(fin)return;if(h===t.h&&m===t.m){fin=true;done(`Yes! The clock says ${D(h,m)}.`)}else nudge(h!==t.h?`Check the short hand. It shows the hour: ${t.h}.`:`The hour is right! Now move the long hand for the minutes.`)};return}
 if(k==="spell"){let pos=0;const extra=["m","s","o"].filter(c=>!t.word.includes(c)).slice(0,2);const tiles=mix([...t.word,...extra]);
  area.innerHTML=`<div class="ite-big">${t.e}</div><div class="ite-line" id="ite-sl">${[...t.word].map(()=>`<span class="ite-t" style="cursor:default">&nbsp;</span>`).join("")}</div><div class="ite-line">${tiles.map((c,j)=>`<button class="ite-t" type="button" data-l="${j}">${c}</button>`).join("")}</div>`;
  const slots=area.querySelectorAll("#ite-sl span");
  area.querySelectorAll("[data-l]").forEach(b=>b.onclick=()=>{if(b.disabled)return;const c=tiles[+b.dataset.l];
   if(c===t.word[pos]){slots[pos].textContent=c;slots[pos].classList.add("done");b.disabled=true;b.classList.add("gone");cnt(pos);say(c);pos++;if(pos===t.word.length)setTimeout(()=>done(`${[...t.word].join(", ")}. ${t.word}!`),400)}
   else nudge(`Listen for the next sound in ${t.word}. Say it slowly.`)});return}
 if(k==="rows"){let tot=0,dn=0;area.innerHTML=`<div class="ite-rows" style="display:grid;gap:8px">${Array.from({length:t.r},(_,j)=>`<button class="ite-row" type="button" data-r="${j}">${t.e.repeat(t.c)}</button>`).join("")}</div>`;
  area.querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>{if(b.classList.contains("done"))return;tot+=t.c;dn++;b.classList.add("done");b.dataset.total=tot;cnt(dn);say(String(tot));
   if(dn===t.r)setTimeout(()=>done(`${t.r} rows of ${t.c} is ${tot}!`),500)});return}
 if(k==="order"){let pos=0;const items=mix(t.items.map((x,j)=>j));
  area.innerHTML=`<div class="ite-line">${items.map(j=>`<button class="ite-opt" type="button" data-o="${j}"><span style="font-size:1.8rem">${t.items[j][0]}</span><small>${esc(t.items[j][1])}</small></button>`).join("")}</div>`;
  area.querySelectorAll("[data-o]").forEach(b=>b.onclick=()=>{const j=+b.dataset.o;if(b.disabled)return;
   if(j===pos){b.disabled=true;b.classList.add("yes");b.insertAdjacentHTML("afterbegin",`<b>${pos+1}</b>`);cnt(pos);say(t.items[j][1]);pos++;if(pos===t.items.length)setTimeout(()=>done("All in order!"),400)}
   else nudge(pos===0?"Which one comes first?":`What comes after ${t.items[pos-1][1]}?`)});return}
 if(k==="mirror"){const L=t.left,half=L[0].length;const st=L.map(r=>r.map(()=>0));let fin=false;
  area.innerHTML=`<div class="ite-mir" style="grid-template-columns:repeat(${half},52px) 6px repeat(${half},52px)">${L.map((r,ri)=>r.map(v=>`<i class="${v?"on":""}"></i>`).join("")+"<b></b>"+r.map((_,ci)=>`<button type="button" data-m="${ri}-${ci}" aria-label="square"></button>`).join("")).join("")}</div>`;
  area.querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{if(fin)return;const[ri,ci]=b.dataset.m.split("-").map(Number);st[ri][ci]^=1;b.classList.toggle("on",!!st[ri][ci]);cnt(ri*2+ci);
   if(st[ri][ci]&&!L[ri][half-1-ci])nudge("Check the twin on the other side of the line.");
   if(st.every((r,a)=>r.every((v,c)=>!!v===!!L[a][half-1-c]))){fin=true;done("Both sides match!")}});return}
 if(k==="breathe"){let n=0,busy=false;area.innerHTML=`<button class="ite-bubble" type="button">Breathe in</button><div class="ite-tot" id="ite-bn">0 of 5</div>`;
  const b=area.querySelector(".ite-bubble");b.onclick=()=>{if(busy||n>=5)return;busy=true;n++;b.classList.add("big");b.textContent="In…";say("Breathe in");
   setTimeout(()=>{b.classList.remove("big");b.textContent="Out…";say("and out")},calm()?900:1600);
   setTimeout(()=>{busy=false;b.textContent=n<5?"Breathe in":"🌈";area.querySelector("#ite-bn").textContent=`${n} of 5`;if(n===5)done("Five slow breaths. Calm body!")},calm()?1800:3200)};return}
 done("Great!");
}

/* ---------- reteach card ---------- */
function openReteach(w,q,L){
 let r=null;try{r=RT[w]?RT[w](q,L):null}catch(e){r=null}
 const les=lessonFor(w,L);
 if(!r||!r.lines||!r.lines.filter(Boolean).length){if(!les)return;r={lines:[les.watch[0].s],show:les.watch[0].v}}
 const lines=r.lines.filter(Boolean);
 const o=shell("Let me show you");o.querySelector(".ite-steps").remove();const body=o.querySelector(".ite-body");
 body.innerHTML=`${r.show?`<div class="ite-vis">${r.show}</div>`:""}<ol class="ite-lines">${lines.map((l,i)=>`<li${i?' hidden':''}>${esc(l)}</li>`).join("")}</ol><div class="ite-nav">${les?'<button class="ite-btn ghost" id="ite-lesson" type="button">👀 Show me the lesson</button>':""}<button class="ite-btn" id="ite-more" type="button">${lines.length>1?"Next →":"I'll try again →"}</button></div>`;
 const lis=[...body.querySelectorAll("li")];let i=0;const t=()=>lis.slice(0,i+1).map(x=>x.textContent).join(" ");
 o.querySelector(".ite-say").onclick=()=>{tap();say(t())};
 if(readOn())setTimeout(()=>{if(OV===o)say(lis[0].textContent)},350);
 const more=body.querySelector("#ite-more");
 more.onclick=()=>{tap();if(i<lis.length-1){i++;lis[i].hidden=false;if(readOn())say(lis[i].textContent);if(i===lis.length-1)more.textContent="I'll try again →"}else{closeOv();say("You can do it. Have another go.")}};
 const lb=body.querySelector("#ite-lesson");if(lb)lb.onclick=()=>{tap();openLesson(w,L,"show",()=>{try{say(q.say)}catch(e){}})};
}

/* ---------- hooks ---------- */
const teachable=w=>!!TEACH[w];
const _next=next;
next=function(){
 const r=rd();
 if(!r||r.iwHold||r.place||r.mix||r.home==="review"||who()===null||!teachable(r.w)||r.n>=ROUND)return _next.apply(this,arguments);
 let p,W;try{p=prog(r.w);W=WORLDS.find(x=>x.id===r.w)}catch(e){return _next.apply(this,arguments)}
 if(W&&W.max>1&&!p.placed)return _next.apply(this,arguments);
 const L=capLevel(r.w,p.lvl),key=r.w+":"+L,seen=seenMap();
 const res=_next.apply(this,arguments);
 if(!seen[key]&&lessonFor(r.w,L)){seen[key]=Date.now();try{save()}catch(e){}
  const q=rd()&&rd().q;try{speechSynthesis.cancel()}catch(e){}
  openLesson(r.w,L,"auto",()=>{const r2=rd();if(r2&&r2.q===q&&q)setTimeout(()=>say(q.say),200)})}
 return res};

const _wrong=wrong;
wrong=function(line){
 const r=rd(),first=r&&r.tries===0&&!r.whyStage&&!r.place;
 const out=_wrong.apply(this,arguments);
 const r2=rd();
 if(first&&r2&&r2.q&&!r2.iteRe&&(RT[r2.w]||TEACH[r2.w])){r2.iteRe=r2.q;
  const q=r2.q,w=r2.w,L=capLevel(w,curLevel(r2));
  setTimeout(()=>{const r3=rd();if(!r3||r3.q!==q)return;const app=document.getElementById("app");const host=(app&&app.querySelector("#msg"))?app.querySelector("#msg").parentNode:app&&app.querySelector(".card");
   if(!host||host.querySelector(".ite-re"))return;const b=document.createElement("button");b.type="button";b.className="ite-re";b.textContent=`${pal().ico} Let me show you`;
   b.onclick=()=>{tap();openReteach(w,q,L)};host.appendChild(b)},120)}
 return out};

function addShow(){
 const r=rd(),app=document.getElementById("app");if(!r||!r.q||!app||r.place)return;
 const rowEl=app.querySelector(".qrow");if(!rowEl||rowEl.querySelector(".ite-show")||!teachable(r.w))return;
 const b=document.createElement("button");b.type="button";b.className="ite-show";b.innerHTML=`${pal().ico} Show me how`;
 b.onclick=()=>{tap();const r2=rd();if(!r2||!r2.q)return;const q=r2.q;try{speechSynthesis.cancel()}catch(e){}openLesson(r2.w,curLevel(r2),"show",()=>{const r3=rd();if(r3&&r3.q===q)say(q.say)})};
 rowEl.appendChild(b)}
try{new MutationObserver(addShow).observe(document.getElementById("app"),{childList:true,subtree:true})}catch(e){}
document.addEventListener("click",e=>{const t=e.target&&e.target.closest&&e.target.closest("#home");if(t)closeOv()},true);

window.PEBBLE_ISLAND_TEACH={TEACH,RT,openLesson,openReteach,lessonFor};
})();
