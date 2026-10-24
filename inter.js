(function(){
const O=(say,items,t)=>({say,items,t});
const ORD={
sci:{1:[O("Put the day in order, from morning to night.",[["🌅","Sunrise"],["☀️","Midday"],["🌇","Sunset"],["🌙","Night"]],"The Sun rises in the morning, is high at midday, and sets before night.")],
 2:[O("Put the frog's life cycle in order.",[["🥚","Eggs"],["🐟","Tadpole"],["🦵","Froglet"],["🐸","Frog"]],"Frogs start as eggs, hatch into tadpoles, grow legs (froglet), then become frogs."),
    O("Put the butterfly's life cycle in order.",[["🥚","Egg"],["🐛","Caterpillar"],["🫘","Chrysalis"],["🦋","Butterfly"]],"Egg → caterpillar → chrysalis → butterfly.")],
 3:[O("Put the plant's life cycle in order.",[["🌰","Seed"],["🌱","Sprout"],["🌿","Plant"],["🌸","Flower"]],"A seed sprouts, grows into a plant, then flowers and makes new seeds."),
    O("Put the water cycle in order.",[["🌊","Water in the sea"],["♨️","Evaporates"],["☁️","Clouds form"],["🌧️","Rain falls"]],"Water evaporates, forms clouds, then falls as rain and flows back to the sea.")],
 4:[O("Order from solid, to liquid, to gas.",[["🧊","Ice"],["💧","Water"],["♨️","Steam"]],"Heating ice melts it into water; heating water turns it into steam.")],
 5:[O("Build the food chain, starting with the producer.",[["🌿","Grass"],["🦗","Grasshopper"],["🐸","Frog"],["🦅","Eagle"]],"Energy flows from the plant to each animal that eats the one before."),
    O("Build the ocean food chain.",[["🦠","Plankton"],["🐟","Small fish"],["🐠","Big fish"],["🦈","Shark"]],"Tiny plankton are eaten by small fish, which are eaten by bigger fish and sharks.")],
 6:[O("Order the planets from closest to the Sun.",[["🔴","Mercury"],["🟡","Venus"],["🌍","Earth"],["🟠","Mars"]],"Mercury, Venus, Earth, Mars: the four rocky inner planets.")],
 7:[O("Order the steps of a fair test.",[["🤔","Predict"],["🧪","Test"],["📏","Measure"],["📝","Conclude"]],"Predict, test (change one thing), measure the result, then conclude.")],
 8:[O("Order the steps of a science investigation.",[["❓","Ask a question"],["🤔","Predict"],["🧪","Investigate"],["📊","Share results"]],"Scientists question, predict, investigate, then communicate what they found.")]},
geo:{1:[O("Order from smallest to biggest.",[["🛏️","My room"],["🏠","My house"],["🏘️","My street"],["🏙️","My town"]],"Places nest inside each other, from small to big.")],
 3:[O("Order from smallest to biggest.",[["🏘️","Suburb"],["🏙️","City"],["🗺️","State"],["🇦🇺","Country"]],"A suburb is part of a city, a city is in a state, and states make up Australia.")],
 4:[O("Order these states from biggest to smallest.",[["🦘","Western Australia"],["🐊","Queensland"],["🐨","New South Wales"],["🍎","Tasmania"]],"WA is largest, then Queensland, then NSW. Tasmania is much smaller.")],
 5:[O("Order these continents from biggest to smallest.",[["🌏","Asia"],["🦁","Africa"],["🐧","Antarctica"],["🦘","Australia"]],"Asia is the biggest continent; Australia is the smallest.")],
 6:[O("Order these oceans from biggest to smallest.",[["🌊","Pacific"],["🐋","Atlantic"],["🐠","Indian"],["🧊","Arctic"]],"Pacific is biggest, then Atlantic, Indian, Southern, and the Arctic is smallest.")]},
hist:{1:[O("Put a person's life in order.",[["👶","Baby"],["🧒","Child"],["🧑","Adult"],["👵","Older person"]],"People grow from babies to children to adults to older people.")],
 2:[O("Order from oldest to newest.",[["🕯️","Candle"],["🪔","Oil lamp"],["💡","Light bulb"],["🔦","LED torch"]],"Light changed over time: candles, lamps, then electric bulbs and LEDs.")],
 3:[O("Order from oldest to newest.",[["🐎","Horse and cart"],["🚂","Steam train"],["🚗","Car"],["✈️","Plane"]],"Horses first, steam trains in the 1800s, then cars and planes in the 1900s.")],
 4:[O("Put these events in time order.",[["🪃","First Nations live here (60,000+ yrs)"],["⛵","Cook maps east coast (1770)"],["🚢","First Fleet (1788)"],["⛏️","Gold rush (1850s)"]],"First Nations peoples for tens of thousands of years, then 1770, 1788 and the 1850s.")],
 5:[O("Put these events in time order.",[["🚢","First Fleet (1788)"],["⛏️","Gold rush (1851)"],["🇦🇺","Federation (1901)"],["🗳️","1967 referendum"]],"1788 → 1851 → 1901 → 1967.")],
 6:[O("Put these events in time order.",[["🇦🇺","Federation (1901)"],["🌺","Gallipoli (1915)"],["⚡","Snowy Scheme starts (1949)"],["⚖️","Mabo decision (1992)"]],"1901 → 1915 → 1949 → 1992."),
    O("Put these events in time order.",[["🗳️","1967 referendum"],["⚖️","Mabo (1992)"],["🏅","Sydney Olympics (2000)"],["🤝","National Apology (2008)"]],"1967 → 1992 → 2000 → 2008.")],
 7:[O("Order these civilisations from oldest to newest.",[["🎨","Aboriginal rock art"],["🔺","Egyptian pyramids"],["🏛️","Roman Empire"],["⚓","Vikings"]],"Aboriginal rock art is tens of thousands of years old; pyramids about 4,500; Rome about 2,000; Vikings about 1,200.")]}};
const SORT={
sci:{1:[{say:"Is it living or non-living?",bins:[["🌱","Living"],["🪨","Non-living"]],items:[["🐶","Dog",0],["🌳","Tree",0],["🐝","Bee",0],["🧸","Teddy",1],["🚗","Car",1],["🪨","Rock",1]],t:"Living things grow, eat or make food, and reproduce."}],
 3:[{say:"Push or pull?",bins:[["👐","Push"],["🫳","Pull"]],items:[["🛒","Trolley",0],["🚪","Close a door",0],["🗄️","Open a drawer",1],["🪁","Fly a kite on a string",1],["⚽","Kick a ball",0],["🎣","Reel in a fish",1]],t:"A push moves things away from you; a pull moves them towards you."}],
 4:[{say:"Solid or liquid?",bins:[["🧱","Solid"],["💧","Liquid"]],items:[["🪨","Rock",0],["🥛","Milk",1],["🧊","Ice",0],["🍯","Honey",1],["🥄","Spoon",0],["🧃","Juice",1]],t:"Solids keep their shape. Liquids flow and take the shape of their container."},
    {say:"Insect (6 legs) or not an insect?",bins:[["🐜","Insect"],["🕷️","Not an insect"]],items:[["🐝","Bee",0],["🐞","Ladybird",0],["🐜","Ant",0],["🕷️","Spider",1],["🐛","Worm",1],["🦂","Scorpion",1]],t:"Insects have 6 legs and 3 body parts. Spiders and scorpions have 8 legs."}],
 5:[{say:"Will a magnet pick it up?",bins:[["🧲","Magnetic"],["🚫","Not magnetic"]],items:[["📎","Paper clip",0],["🔩","Steel bolt",0],["🪙","Iron nail",0],["🪵","Wood",1],["🥤","Plastic cup",1],["🧻","Paper",1]],t:"Magnets attract iron and steel, not wood, plastic or paper."},
    {say:"Producer or consumer?",bins:[["🌿","Producer"],["🦊","Consumer"]],items:[["🌳","Tree",0],["🌾","Grass",0],["🌻","Sunflower",0],["🐨","Koala",1],["🦅","Eagle",1],["🐄","Cow",1]],t:"Producers (plants) make their own food. Consumers eat other living things."}],
 6:[{say:"Reversible or irreversible change?",bins:[["🔁","Can be reversed"],["🔥","Can't be reversed"]],items:[["🧊","Freezing water",0],["🍫","Melting chocolate",0],["🧂","Dissolving salt",0],["🍳","Cooking an egg",1],["🪵","Burning wood",1],["🎂","Baking a cake",1]],t:"Melting, freezing and dissolving can be undone. Cooking and burning make new substances."}]},
geo:{2:[{say:"Natural or built feature?",bins:[["🏞️","Natural"],["🏗️","Built"]],items:[["⛰️","Mountain",0],["🌊","Ocean",0],["🌳","Forest",0],["🌉","Bridge",1],["🏫","School",1],["🛣️","Road",1]],t:"Natural features are made by nature. Built features are made by people."}],
 5:[{say:"Renewable or non-renewable?",bins:[["♻️","Renewable"],["⛽","Non-renewable"]],items:[["☀️","Sunlight",0],["💨","Wind",0],["💧","Water",0],["⛏️","Coal",1],["🛢️","Oil",1],["🔥","Natural gas",1]],t:"Renewable resources replace themselves. Fossil fuels take millions of years to form."}],
 7:[{say:"Urban or rural?",bins:[["🏙️","Urban"],["🌾","Rural"]],items:[["🚇","Train station",0],["🏢","Apartments",0],["🛍️","Shopping centre",0],["🐄","Dairy farm",1],["🌾","Wheat fields",1],["🐑","Sheep station",1]],t:"Urban areas are cities and towns. Rural areas are countryside and farms."}]},
hist:{2:[{say:"Long ago or today?",bins:[["🕰️","Long ago"],["📱","Today"]],items:[["🕯️","Candle light",0],["🐎","Horse and cart",0],["✉️","Letter by ship",0],["📱","Smartphone",1],["🚗","Electric car",1],["💻","Laptop",1]],t:"Comparing past and present shows how daily life has changed."}],
 8:[{say:"Primary or secondary source?",bins:[["📔","Primary"],["📘","Secondary"]],items:[["📔","A soldier's diary",0],["📸","A photo from 1901",0],["✉️","A convict's letter",0],["📘","A 2020 textbook",1],["🎬","A modern documentary",1],["🌐","A website summary",1]],t:"Primary sources come from the time. Secondary sources are made later about it."}]}};
const pickLvl=(bank,l)=>{for(let x=l;x>=1;x--)if(bank[x])return{x,arr:bank[x]};return null};
const orderQ=(o)=>({type:"order",seq:o.items.map(x=>x[1]),items:shuffle(o.items),say:o.say+" Tap them in order.",q:o.say,teach:o.t});
const sortQ=(s)=>{const items=shuffle(s.items).slice(0,5);return{type:"sort",bins:s.bins,items,say:s.say+" Sort each one.",q:s.say,teach:s.t,ans:"sorted",opts:[]}};
["sci","geo","hist"].forEach(id=>{const o=GEN[id];GEN[id]=l=>{const r=Math.random();
  const ob=ORD[id]&&ORD[id][l],sb=SORT[id]&&pickLvl(SORT[id],l);
  if(ob&&r<.25)return orderQ(pick(ob));
  if(sb&&sb.x>=l-1&&r>.72)return sortQ(pick(sb.arr));
  return o(l)}});
const css=document.createElement("style");css.textContent=`.sortbox{display:grid;gap:14px;justify-items:center;width:100%}
.sortitem{font-size:clamp(2.4rem,7vw,4rem);background:#fff;border-radius:22px;padding:14px 26px;box-shadow:0 6px 0 rgba(0,0,0,.15);text-align:center;color:#14262c;min-width:220px}
.sortitem small{display:block;font-size:clamp(1.1rem,2.6vw,1.5rem);font-weight:800}
.bins{display:grid;grid-template-columns:1fr 1fr;gap:14px;width:100%}
.bin{font:inherit;font-size:clamp(1.2rem,3vw,1.7rem);font-weight:800;padding:18px 10px;border-radius:20px;border:4px dashed rgba(0,0,0,.25);background:var(--panel,#fff);color:#14262c;min-height:120px}
.bin span{display:block;font-size:2.4rem}.bin .got{display:block;font-size:1.6rem;min-height:2rem}
.sortprog{font-weight:800;opacity:.8}`;document.head.appendChild(css);
const _play=play;play=function(){const q=round&&round.q;if(!q||q.type!=="sort"||round.n>=ROUND)return _play();
  const pct=round.n/ROUND*100;_play.call(null);
  const anchor=$(".opts")||$(".tiles")||$(".stage");if(!anchor)return;
  const panel=anchor.closest(".left")?anchor.closest(".left").parentElement:null;if(!panel)return;
  panel.innerHTML=`<div class="sortbox"><div class="sortprog" id="sp"></div><div class="sortitem" id="si"></div><div class="bins">${q.bins.map((b,i)=>`<button class="bin" data-bin="${i}"><span>${b[0]}</span>${b[1]}<i class="got" id="got${i}"></i></button>`).join("")}</div><div class="msg" id="msg"></div></div>`;
  let i=0;const show=()=>{const it=q.items[i];$("#si").innerHTML=`${it[0]}<small>${it[1]}</small>`;$("#sp").textContent=`${i+1} of ${q.items.length}`;speak(it[1])};
  show();
  $$("[data-bin]").forEach(b=>b.onclick=()=>{const it=q.items[i];if(!it)return;const bi=+b.dataset.bin;
    if(bi===it[2]){SFX.count(i);$("#got"+bi).textContent+=it[0];i++;if(i>=q.items.length){const r=b.getBoundingClientRect();correct(r.left+r.width/2,r.top,"All sorted")}else setTimeout(show,250)}
    else{b.classList.remove("shake");void b.offsetWidth;b.classList.add("shake");wrong(`Hmm, is ${it[1]} really ${q.bins[bi][1].toLowerCase()}?`)}})};
const _render=render;
})();
