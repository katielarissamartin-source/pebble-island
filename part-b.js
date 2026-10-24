;
/* a11y.js */
(function(){const s=document.createElement("style");s.textContent='@media (prefers-color-scheme:dark){html[style*="--bg:"]:root:not([data-theme="light"]):not(#x){--ink:#14262c;--soft:#33515a;color-scheme:light}html[style*="--bg:"]:root:not([data-theme="light"]):not(#x) .msg.try{color:#9a4a00}html[style*="--bg:"]:root:not([data-theme="light"]):not(#x) .msg.good{color:#1f6b3a}}.pill{color:#14262c;font-weight:700}';document.head.appendChild(s)})();

;
/* adapt.js */
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

;
/* lb1.js */
(function(){
const B=(q,a,w,e,t)=>({q,a,w,e,t});
window.LB=window.LB||{};
const SCI=[
[B("Which one is alive?","Tree",["Rock","Spoon","Cloud"],"🌳🪨🥄","Living things grow, need food and water, and make new living things."),
 B("Which one is not alive?","Teddy bear",["Dog","Flower","Bird"],"🧸🐶🌸","A teddy doesn't eat, breathe or grow, so it isn't alive."),
 B("What do plants need to grow?","Water and sunlight",["Ice cream","Toys","Shoes"],"🌱💧☀️","Plants make their food using sunlight, and they drink water through their roots."),
 B("Which sense do you use to smell a flower?","Nose",["Ears","Elbows","Knees"],"👃🌸","We smell with our nose, see with our eyes, hear with our ears, taste with our tongue and feel with our skin."),
 B("Which sense tells you music is playing?","Hearing",["Smell","Taste","Touch"],"🎵👂","Our ears pick up sounds, so hearing tells us about music."),
 B("Which animal has feathers?","Bird",["Fish","Dog","Frog"],"🐦🪶","Only birds have feathers. Fish have scales and dogs have fur."),
 B("Which animal lives in the sea?","Octopus",["Cow","Kangaroo","Horse"],"🐙🌊","An octopus lives in the ocean. Cows, kangaroos and horses live on land."),
 B("What is the weather when you see a rainbow?","Sun and rain together",["Snow only","Night time","Very windy"],"🌈☀️🌧️","Rainbows happen when sunlight shines through raindrops.")],
[B("What does a baby frog start life as?","Tadpole",["Puppy","Chick","Kitten"],"🐸💧","Frogs hatch from eggs as tadpoles, then grow legs and lose their tail."),
 B("What does a caterpillar turn into?","Butterfly",["Bird","Spider","Bee"],"🐛➡️🦋","A caterpillar makes a chrysalis, then comes out as a butterfly. This is a life cycle."),
 B("What do all animals need to stay alive?","Food, water and air",["Toys and books","Shoes and hats","Music"],"🐨🍃💧","All animals need food, water, air and shelter to survive."),
 B("Where does a koala get its food?","Gum leaves",["Fish","Grass seeds","Insects"],"🐨🌿","Koalas eat eucalyptus (gum) leaves, and get most of their water from them too."),
 B("Why do we see the Sun move across the sky?","The Earth is spinning",["The Sun is walking","Clouds push it","It is falling"],"🌍☀️","The Earth spins once a day. That makes the Sun look like it moves across the sky."),
 B("Which season is the hottest in Australia?","Summer",["Winter","Autumn","Spring"],"☀️🏖️","In Australia summer is December, January and February, and it's the hottest season."),
 B("Which material is best for a raincoat?","Plastic",["Paper","Cotton wool","Bread"],"🧥🌧️","Plastic is waterproof, so rain runs off it instead of soaking in."),
 B("Which material is see-through?","Glass",["Wood","Brick","Metal"],"🪟","Glass is transparent, so light passes through and we can see through it.")],
[B("Is a push or a pull used to open a drawer?","Pull",["Push","Neither","Spin"],"🗄️","You pull a drawer towards you to open it. Pushes move things away from you."),
 B("What makes a ball roll faster?","A bigger push",["A smaller push","Painting it","Talking to it"],"⚽💨","A bigger force (push) makes things move faster."),
 B("Which is a stage in a chicken's life cycle?","Egg",["Tadpole","Seed","Cocoon"],"🥚🐣🐔","Chickens hatch from eggs, grow into chicks, then become adult chickens."),
 B("What do seeds need to start growing?","Water and warmth",["Darkness and ice","Salt","Plastic"],"🌰💧","Seeds need water and warmth to germinate (start growing)."),
 B("Where does rain come from?","Clouds",["Trees","The ground","The Moon"],"☁️🌧️","Water evaporates, forms clouds, and falls back down as rain. That's the water cycle."),
 B("Which one is a living thing that makes its own food?","Plant",["Dog","Mushroom","Human"],"🌿☀️","Plants use sunlight to make their own food. Animals have to eat."),
 B("What happens to ice when it gets warm?","It melts into water",["It gets harder","It turns to wood","Nothing"],"🧊➡️💧","Heat makes ice melt. Ice is solid water; when it melts it becomes liquid."),
 B("Which animal is a mammal?","Kangaroo",["Crocodile","Emu","Goanna"],"🦘","Mammals have fur or hair and feed their babies milk. Kangaroos do both.")],
[B("Which one is a solid?","Rock",["Milk","Water","Juice"],"🪨","Solids keep their shape. Liquids flow and take the shape of their container."),
 B("Which one is a liquid?","Honey",["Spoon","Ice cube","Brick"],"🍯","Honey flows and takes the shape of its jar, so it's a liquid, even though it's slow."),
 B("What causes day and night?","Earth spinning on its axis",["The Sun turning off","The Moon blocking the Sun","Clouds"],"🌍🌗","The Earth spins once every 24 hours. The side facing the Sun has day; the other side has night."),
 B("What does heat do to most materials?","Makes them expand",["Makes them disappear","Turns them blue","Makes them heavier"],"🔥","When things heat up their particles move more and spread out, so they expand."),
 B("Which group is a spider in?","Arachnids (8 legs)",["Insects (6 legs)","Mammals","Birds"],"🕷️","Spiders have 8 legs, so they're arachnids. Insects have 6 legs."),
 B("Which is a fossil fuel?","Coal",["Sunlight","Wind","Water"],"⛏️","Coal formed from ancient plants over millions of years. Burning it releases carbon dioxide."),
 B("Why do we sort living things into groups?","To find what they have in common",["To make them grow","To name colours","To count legs only"],"🔬","Scientists classify living things by shared features to understand them."),
 B("Which material lets heat pass through easily?","Metal",["Wood","Wool","Plastic"],"🍳","Metal is a good conductor of heat, which is why pans are metal. Wood and wool are insulators.")],
[B("What is a food chain?","Who eats who",["A list of shops","A cooking recipe","A type of plant"],"🌿➡️🐛➡️🐦","A food chain shows how energy passes from plants to the animals that eat them."),
 B("In a food chain, what usually comes first?","A plant",["A lion","A hawk","A shark"],"🌱","Plants are producers. They make energy from sunlight, and every food chain starts with them."),
 B("What is erosion?","Wind or water wearing land away",["Plants growing","Rocks getting hotter","Volcanoes erupting"],"🌊🪨","Erosion is when wind, water or ice slowly wear away rock and soil."),
 B("Which force pulls things down to Earth?","Gravity",["Magnetism","Friction","Wind"],"🍎⬇️","Gravity pulls everything towards the Earth. That's why a dropped apple falls."),
 B("Which force slows a bike when you brake?","Friction",["Gravity","Magnetism","Light"],"🚲","Friction happens when surfaces rub together. Brakes use friction to slow the wheel."),
 B("What will a magnet pick up?","Iron nails",["Wooden blocks","Plastic cups","Paper"],"🧲📎","Magnets attract some metals like iron and steel, but not wood, plastic or paper."),
 B("What is a decomposer?","Something that breaks down dead things",["A top predator","A type of rock","A cloud"],"🍄🍂","Fungi, worms and bacteria break down dead plants and animals and return nutrients to the soil."),
 B("Which change can be reversed?","Melting chocolate",["Burning wood","Baking a cake","Cooking an egg"],"🍫","Melted chocolate can set solid again. Burning and cooking make new materials, so they can't be reversed.")],
[B("Why do some desert animals come out at night?","It is cooler",["They are scared of rain","There is more snow","Grass glows"],"🦎🌙","This is an adaptation: being active at night helps animals avoid the desert heat."),
 B("What is an adaptation?","A feature that helps a living thing survive",["A kind of rock","A weather report","A type of food"],"🐪","Adaptations are features or behaviours, like a camel's hump or a frog's sticky tongue, that help survival."),
 B("How does light travel?","In straight lines",["In circles","Only around corners","It doesn't move"],"🔦","Light travels in straight lines. When something blocks it, a shadow forms."),
 B("What makes a shadow?","Something blocking light",["Water in the air","Loud sounds","Magnets"],"🌳🌑","Light can't pass through solid objects, so they leave a dark shape, a shadow, behind them."),
 B("Which planet do we live on?","Earth",["Mars","Jupiter","Venus"],"🌍","Earth is the third planet from the Sun."),
 B("What is at the centre of our solar system?","The Sun",["The Earth","The Moon","Saturn"],"☀️🪐","All the planets orbit the Sun, which is a star."),
 B("What is the gas we breathe out?","Carbon dioxide",["Oxygen","Helium","Steam"],"😮‍💨","We breathe in oxygen and breathe out carbon dioxide. Plants use the carbon dioxide."),
 B("What happens to water when it boils?","It turns into steam (gas)",["It freezes","It turns to sand","It gets heavier"],"♨️","At 100°C water changes from a liquid to a gas called water vapour.")],
[B("What do plants make in photosynthesis?","Sugar and oxygen",["Salt and smoke","Rocks","Plastic"],"🌿☀️","Plants use sunlight, water and carbon dioxide to make sugar (food) and release oxygen."),
 B("How long does Earth take to orbit the Sun?","About 365 days",["One day","One week","One month"],"🌍🔄☀️","One trip around the Sun is one year: about 365 and a quarter days."),
 B("Why do we have seasons?","Earth is tilted",["The Sun gets closer then further","The Moon changes","Clouds move"],"🌍↗️","Earth's tilt means each half gets more direct sunlight for part of the year, giving summer."),
 B("Which is an example of electricity making light?","A torch",["A kite","A sandcastle","A pinecone"],"🔦⚡","In a torch, the battery sends electricity through a circuit to make light."),
 B("What does a complete circuit need?","A closed loop",["A gap in the wire","Only a light bulb","Water"],"🔋💡","Electricity only flows when the path is a complete loop with no gaps."),
 B("What happens when you mix salt into water?","It dissolves",["It turns to ice","It floats as cubes","It explodes"],"🧂💧","The salt breaks up into tiny bits too small to see, mixed through the water. That's dissolving."),
 B("What protects Earth from some of the Sun's harmful rays?","The atmosphere",["The Moon","Oceans","Mountains"],"🌍","The layer of air around Earth, including the ozone layer, blocks much of the Sun's UV."),
 B("Why does a volcano erupt?","Melted rock pushes up from inside Earth",["It's too windy","Rain fills it","Animals dig it"],"🌋","Magma (melted rock) builds up pressure underground and forces its way out.")],
[B("A scientist changes one thing and keeps everything else the same. Why?","It's a fair test",["To be quicker","To make it messy","To get a prize"],"⚖️","Changing only one variable means you know that change caused the result."),
 B("You test which ball bounces highest. What must stay the same?","The height you drop them from",["The ball type","The colour of your shirt","Nothing"],"🏀📏","In a fair test you change one thing (the ball) and keep the drop height the same."),
 B("What is a prediction?","A guess based on what you know",["The final answer","A measurement","A tool"],"🤔","Scientists predict what will happen and why, then test it."),
 B("Which unit measures temperature?","Degrees Celsius",["Metres","Kilograms","Litres"],"🌡️","Australia measures temperature in degrees Celsius (°C). Water freezes at 0°C."),
 B("Plants in a dark cupboard went yellow. What's the best conclusion?","Plants need light to stay healthy",["Cupboards are bad","Plants hate wood","Yellow is a nice colour"],"🌱🌑","The plants missing light changed, so light affects plant health."),
 B("Why repeat an experiment several times?","To check results are reliable",["To waste time","To change the answer","Because it's fun only"],"🔁","Repeating shows whether you get the same result, so your results can be trusted."),
 B("What is a habitat?","Where a living thing naturally lives",["A kind of food","A pet's name","A science tool"],"🏞️","A habitat gives an animal what it needs: food, water, shelter and space."),
 B("Which animal is an Australian marsupial?","Wombat",["Lion","Zebra","Tiger"],"🦘","Marsupials, like wombats, kangaroos and koalas, carry their young in a pouch.")]];
const GEO=[
[B("Where do you sleep at home?","Bedroom",["Kitchen","Garage","Garden"],"🛏️🏠","Places in a home have different jobs. We sleep in the bedroom."),
 B("Which place has lots of sand and water?","Beach",["Desert","City","Forest"],"🏖️","A beach is where land meets the sea, with sand and waves."),
 B("What would you see in a city?","Tall buildings",["Only cows","Icebergs","Camels"],"🏙️","Cities have lots of people, roads and tall buildings."),
 B("Where can you borrow books?","Library",["Bakery","Pool","Bank"],"📚","A library is a special place in the community where we borrow books."),
 B("Which is a special place to play outside?","Park",["Fridge","Car boot","Cupboard"],"🛝🌳","Parks are shared places in our community where we can play."),
 B("What is the land like in a desert?","Dry and sandy",["Snowy","Wet and green","Underwater"],"🏜️","Deserts get very little rain, so they're dry."),
 B("What shows us where things are?","A map",["A spoon","A clock","A song"],"🗺️","A map is a drawing of a place from above that shows where things are."),
 B("Which way does a map usually point at the top?","North",["South","Left","Down"],"🧭⬆️","Most maps have north at the top.")],
[B("What country do we live in?","Australia",["England","America","Japan"],"🇦🇺","Australia is a country and a continent, and it's surrounded by ocean."),
 B("What is Australia's capital city?","Canberra",["Sydney","Melbourne","Perth"],"🏛️","Canberra is the capital, where Parliament meets. Sydney is the biggest city."),
 B("Which is a natural feature?","River",["Bridge","School","Road"],"🏞️","Natural features are made by nature: rivers, mountains, beaches. People made bridges and roads."),
 B("Which is a built feature?","Bridge",["Mountain","Lake","Ocean"],"🌉","Built features are made by people."),
 B("What is weather like in winter?","Cold",["Very hot","Always sunny","Snowy beaches everywhere"],"🧥❄️","Winter is the coldest season. In Australia it's June, July and August."),
 B("What do we call a map symbol that shows water?","Blue colour",["Red colour","A star","A smiley face"],"🗺️💧","Maps use a key: blue usually means water, green means parks or forest."),
 B("Which way does the Sun rise?","East",["West","North","South"],"🌅","The Sun rises in the east and sets in the west."),
 B("Why should we put rubbish in the bin?","To keep places clean for animals and people",["Bins are fun","To fill bins up","So it rains"],"🗑️🐢","Litter can hurt animals and makes places dirty. Caring for places is our job.")],
[B("How many continents are there?","7",["5","3","10"],"🌏","The 7 continents are Africa, Antarctica, Asia, Australia, Europe, North America and South America."),
 B("Which ocean is to the west of Australia?","Indian Ocean",["Pacific Ocean","Arctic Ocean","Atlantic Ocean"],"🌊🇦🇺","The Indian Ocean is west of Australia; the Pacific Ocean is east."),
 B("Which is the coldest continent?","Antarctica",["Africa","Australia","Asia"],"🧊🐧","Antarctica is covered in ice and is the coldest place on Earth."),
 B("What is the line around the middle of the Earth called?","The equator",["The border","The horizon","The coast"],"🌍","The equator divides Earth into north and south halves. It's hot near the equator."),
 B("Which state is Melbourne in?","Victoria",["Queensland","Tasmania","New South Wales"],"🗺️","Melbourne is the capital city of Victoria."),
 B("Which is the biggest state in Australia?","Western Australia",["Tasmania","Victoria","ACT"],"🗺️","Western Australia is the largest state, about a third of the country."),
 B("Which place is an island state?","Tasmania",["Queensland","Victoria","South Australia"],"🏝️","Tasmania is an island south of Victoria, across Bass Strait."),
 B("What does a compass show?","Directions",["Time","Temperature","Weight"],"🧭","A compass needle points north, so you can find north, south, east and west.")],
[B("Who were the first people to live in Australia?","Aboriginal and Torres Strait Islander peoples",["Explorers from England","Vikings","The Romans"],"🪃","Aboriginal and Torres Strait Islander peoples have lived here for more than 60,000 years, with many different Countries and languages."),
 B("What is Country, for First Nations peoples?","Land, waters and sky they belong to and care for",["Only a map","A city","A sport"],"🏞️","Country means the land, waters, sky and all living things, with deep connection and responsibility."),
 B("Which is the longest river in Australia?","Murray River",["Yarra River","Thames","Nile"],"🏞️","The Murray flows about 2,500 km through NSW, Victoria and South Australia."),
 B("What is a climate zone near the top of Australia?","Tropical",["Polar","Snowy","Arctic"],"🌴","Northern Australia is tropical: hot all year, with a wet and a dry season."),
 B("Uluru is in which part of Australia?","Northern Territory",["Tasmania","Victoria","ACT"],"🪨","Uluru is a huge sandstone rock in the Northern Territory, sacred to the Anangu people."),
 B("Which of these is a renewable resource?","Sunlight",["Coal","Oil","Gas"],"☀️","Renewable resources don't run out: sun, wind and water."),
 B("Why do people live near rivers?","Fresh water for drinking and farming",["Rivers are noisy","To catch the bus","Rivers are warm"],"🏞️🌾","Rivers give water for drinking, crops and animals, so towns grew beside them."),
 B("On a map, what does a scale show?","Real distance",["Colours","Weather","People"],"📏🗺️","A scale tells you how far the real distance is, e.g. 1 cm = 1 km.")],
[B("Which continent is Kenya in?","Africa",["Asia","Europe","South America"],"🌍🦒","Kenya is in East Africa, famous for its savanna wildlife."),
 B("What is a rainforest like?","Hot, wet and full of plants",["Dry and sandy","Icy","Bare rock"],"🌳🌧️","Rainforests get lots of rain and have more kinds of plants and animals than anywhere else."),
 B("Why are forests important?","They make oxygen and give animals homes",["They make plastic","They stop the Sun","They make roads"],"🌲🦜","Forests clean the air, hold soil together and are habitats for animals."),
 B("Which is the largest ocean?","Pacific Ocean",["Indian Ocean","Atlantic Ocean","Southern Ocean"],"🌊","The Pacific is the biggest and deepest ocean on Earth."),
 B("What is the main language in Indonesia?","Indonesian",["French","Spanish","English"],"🇮🇩","Indonesia is our close northern neighbour. Its national language is Indonesian (Bahasa Indonesia)."),
 B("What does 'sustainable' mean?","Using things so they last for the future",["Using everything up fast","Throwing things away","Buying more"],"♻️","Sustainable means meeting our needs without harming the future: reduce, reuse, recycle."),
 B("What is a grid reference on a map?","A letter and number that find a square",["A weather symbol","A road name","A picture"],"🗺️🔢","Grid references, like B3, help you find exact places on a map."),
 B("Which line runs north–south on a globe?","Longitude lines",["The equator","Latitude lines","Coastlines"],"🌐","Lines of longitude run from the North Pole to the South Pole.")],
[B("Which country is Australia's nearest neighbour to the north?","Papua New Guinea",["New Zealand","Canada","Brazil"],"🗺️","Papua New Guinea is only about 150 km from Cape York across the Torres Strait."),
 B("What causes a bushfire to spread fast?","Hot, dry and windy weather",["Cold rain","Snow","Calm fog"],"🔥🌬️","Heat dries out plants, and wind pushes flames, so fires spread quickly."),
 B("What is the Great Barrier Reef?","The world's largest coral reef system",["A mountain range","A desert","A river"],"🐠🪸","It stretches over 2,300 km off Queensland and is home to thousands of species."),
 B("Why is the Great Barrier Reef at risk?","Warming oceans bleach coral",["Too many koalas","Sand storms","Earthquakes"],"🌡️🪸","When water gets too warm, coral loses its colour and food source. This is coral bleaching."),
 B("Which continent has the most people?","Asia",["Australia","Antarctica","South America"],"🌏","Asia has over half the world's people, including China and India."),
 B("What is a population?","The number of people living in a place",["The size of a country","A type of map","A kind of weather"],"👨‍👩‍👧‍👦","Population counts people. Australia has about 27 million people."),
 B("What is a natural disaster?","Flood, fire, cyclone or drought",["A broken toy","A traffic jam","A holiday"],"🌀","Natural disasters are extreme natural events that can harm people and places."),
 B("Why do cities often grow on coasts?","Ports for trade and good water",["To avoid people","The ground is softer","For snow"],"⚓","Most Australians live near the coast, where ports, trade and rainfall made towns grow.")],
[B("Which line of latitude is at 0°?","The equator",["The Tropic of Capricorn","The Prime Meridian","The Arctic Circle"],"🌍","Latitude 0° is the equator. The Tropic of Capricorn (about 23° south) crosses Australia."),
 B("Which country is part of South-East Asia?","Vietnam",["Egypt","Peru","Norway"],"🇻🇳","South-East Asia includes Vietnam, Thailand, Indonesia, Malaysia and more."),
 B("Why do we need to manage water carefully in Australia?","It is the driest inhabited continent",["It always floods","Water is free forever","Rain falls every day"],"💧🏜️","Australia has low and variable rainfall, so water is precious."),
 B("What is a 'tourist destination'?","A place people travel to visit",["A train timetable","A type of food","A school"],"🧳","Places like Uluru or the Gold Coast attract visitors and bring money to the area."),
 B("What does an urban area have more of?","Buildings and people",["Farms","Forests","Open plains"],"🏙️","Urban means city or town. Rural means countryside."),
 B("Which is a way to reduce waste?","Reuse containers",["Buy more plastic","Throw out food","Leave lights on"],"♻️","Reduce, reuse, recycle cuts the amount of rubbish going to landfill."),
 B("On a contour map, lines close together show…","A steep slope",["Flat land","A river","A city"],"⛰️","Contour lines join places of equal height. Close lines mean it gets higher quickly."),
 B("Which country has the most people in the world?","India",["Australia","Fiji","Iceland"],"🇮🇳","India and China each have over 1.4 billion people.")],
[B("Climate change is mostly caused by…","Burning fossil fuels",["Volcanoes only","The Moon","Too many trees"],"🏭🌡️","Burning coal, oil and gas releases greenhouse gases that trap heat."),
 B("What's one way communities adapt to floods?","Building homes on stilts",["Removing all trees","Building in river beds","Ignoring warnings"],"🏠🌊","Raised homes, levees and early warnings help reduce flood damage."),
 B("Which organisation helps countries work together?","The United Nations",["The local council","A football club","The post office"],"🇺🇳","The UN has 193 member countries working on peace, health and development."),
 B("What is 'interconnection' in geography?","How places and people affect each other",["A road map","A phone line","A border wall"],"🔗🌏","Trade, travel and the environment link places together across the world."),
 B("Why might a farmer in Victoria care about a drought in Queensland?","Food prices and supply change across the country",["They don't","Drought spreads like a cold","Queensland owns the rain"],"🌾","Places are connected through trade, so one region's problems affect others."),
 B("Which is a primary source of geographic data?","Your own survey of a park",["A cartoon","A made-up story","A video game"],"📋","Primary data is collected yourself: observations, surveys, photos, measurements."),
 B("Antarctica is protected by a treaty for…","Peace and science",["Mining","Building cities","Farming"],"🧊🔬","The Antarctic Treaty keeps it for peaceful scientific research."),
 B("What makes a place 'liveable'?","Safe, clean, with services like schools and transport",["Only having shops","Being very hot","Having no parks"],"🏘️","Liveability depends on safety, health care, education, transport and environment.")]];
LB.sci=SCI;LB.geo=GEO;
})();

;
/* lb2.js */
(function(){
const B=(q,a,w,e,t)=>({q,a,w,e,t});
window.LB=window.LB||{};
const HIST=[
[B("Which picture shows a baby?","👶",["👵","🧑","👴"],"👶👵🧑","People grow and change: baby, child, adult, older person."),
 B("Who is your grandparent?","Your parent's mum or dad",["Your sister","Your friend","Your teacher"],"👵👴","Grandparents are your mum's or dad's parents. They can tell stories about the past."),
 B("What did people use before phones to send messages?","Letters",["Video games","Tablets","Robots"],"✉️","Long ago people wrote letters and posted them. They took days to arrive."),
 B("Which happened first: breakfast or dinner?","Breakfast",["Dinner","Same time","Neither"],"🥣🍝","Putting things in time order is called sequencing."),
 B("What is a birthday?","The day you were born, every year",["A holiday at school","A type of cake","A new month"],"🎂","Birthdays remember an important day: the day you were born."),
 B("Which is old: a candle or a light bulb?","Candle",["Light bulb","Both brand new","Neither"],"🕯️💡","Before electricity, people used candles and lamps for light."),
 B("What do we call things that happened before today?","The past",["The future","The present","Tomorrow"],"⏪","The past is what already happened. The future hasn't happened yet."),
 B("Which shows a family?","People who care for each other",["A pile of rocks","A bus timetable","A shop"],"👨‍👩‍👧","Families can look different, but they care for each other.")],
[B("How did children get to school long ago?","Walked or rode a horse",["Flew a plane","Took a rocket","Used a scooter app"],"🐎","Before cars were common, many kids walked or rode horses to school."),
 B("What did people use to wash clothes long ago?","A washboard and tub",["A washing machine","A dishwasher","A microwave"],"🧺","Washing by hand took hours. Machines changed daily life."),
 B("What is an artefact?","An object from the past",["A cartoon","A future invention","A song"],"🏺","Artefacts, like old tools, coins or toys, tell us how people lived."),
 B("Which toy is older?","Wooden spinning top",["Video game","Tablet","Drone"],"🪀","Long ago toys were made of wood, tin and cloth."),
 B("Why do families keep old photos?","To remember people and the past",["To sell them","To throw them away","For drawing on"],"🖼️","Photos are sources that help us learn about our family history."),
 B("What happens on Anzac Day?","We remember people who served in wars",["We eat birthday cake","School starts","We go to the beach"],"🌺","On 25 April Australians remember soldiers, especially from Gallipoli in 1915."),
 B("How long have First Nations peoples lived in Australia?","More than 60,000 years",["100 years","10 years","1,000 years"],"🪃","Aboriginal and Torres Strait Islander cultures are among the oldest living cultures in the world."),
 B("Which is a way to learn about the past?","Ask an older person",["Guess","Watch the future","Close your eyes"],"👵💬","Talking to older people (oral history) teaches us what life was like.")],
[B("What is a timeline?","Events shown in order of time",["A washing line","A map","A list of foods"],"📅","Timelines put events in order from earliest to latest."),
 B("Which came first?","Horse and cart",["Car","Train","Plane"],"🐎🚃","Horse and cart came before trains, cars and planes."),
 B("What is a decade?","10 years",["100 years","1 year","1,000 years"],"🔟","A decade is 10 years; a century is 100 years."),
 B("What is a century?","100 years",["10 years","1,000 years","50 years"],"💯","A century is 100 years. The 1900s were the 20th century."),
 B("Why do some places have Aboriginal names?","They are the original names given by First Nations peoples",["Someone guessed","They're made up","From a cartoon"],"🗺️","Many places, like Canberra, Wagga Wagga and Uluru, use names from Aboriginal languages."),
 B("Why do we celebrate NAIDOC Week?","To celebrate First Nations history and culture",["To eat chocolate","To mark summer","To start school"],"🖤💛❤️","NAIDOC Week celebrates Aboriginal and Torres Strait Islander peoples' history, culture and achievements."),
 B("Which is a primary source?","A letter written at the time",["A cartoon made today","A guess","A movie trailer"],"✉️","Primary sources come from the time: letters, diaries, photos, objects."),
 B("How did people cool food before fridges?","Ice boxes and cool cellars",["Freezers","Air conditioners","Microwaves"],"🧊📦","Ice was delivered to homes and kept in ice boxes.")],
[B("Who sailed the Endeavour to the east coast of Australia in 1770?","James Cook",["Captain Hook","Abel Tasman","Ned Kelly"],"⛵","Cook mapped the east coast in 1770, but the land was already home to First Nations peoples."),
 B("When did the First Fleet arrive at Sydney Cove?","1788",["1066","1901","2000"],"⛵","On 26 January 1788 the First Fleet arrived with convicts, starting British colonisation."),
 B("Who were convicts?","People sent to Australia as punishment",["Gold miners","Explorers","Teachers"],"⛓️","Britain transported about 160,000 convicts to Australia between 1788 and 1868."),
 B("How did colonisation affect First Nations peoples?","They lost land and many lives",["Nothing changed","They got more land","They all moved overseas"],"🪃","Colonisation took land, spread disease and caused violence. This history is important to understand."),
 B("Which Dutch explorer mapped parts of Australia before Cook?","Abel Tasman",["Columbus","Marco Polo","Neil Armstrong"],"🧭","Tasman sailed in 1642. Tasmania is named after him."),
 B("What did the Macassans trade with Aboriginal people in the north?","Trepang (sea cucumbers)",["Gold","Cars","Phones"],"⛵","Macassan sailors from Indonesia traded in northern Australia for hundreds of years before 1788."),
 B("Why do historians use more than one source?","To check facts and see different views",["To be slow","Because one is boring","To copy"],"📚","Different sources can disagree, so comparing them gives a fuller picture."),
 B("What was the gold rush?","Many people came to dig for gold",["A running race","A new coin","A storm"],"⛏️✨","Gold was found in the 1850s, and Victoria's population boomed.")],
[B("What happened at Federation in 1901?","The colonies joined to form Australia",["Gold was found","The First Fleet arrived","Australia became a state of the USA"],"🇦🇺","On 1 January 1901 six colonies united as the Commonwealth of Australia."),
 B("Who was Australia's first Prime Minister?","Edmund Barton",["James Cook","Ned Kelly","Don Bradman"],"🏛️","Edmund Barton led Australia's first federal government in 1901."),
 B("Which was a big change for women in 1902?","Many women won the right to vote federally",["Women became kings","Women had to stop working","Nothing"],"🗳️","Australia was one of the first countries to let women vote, but most First Nations people were excluded until 1962."),
 B("Who was the bushranger who wore armour?","Ned Kelly",["Captain Cook","Banjo Paterson","Mary MacKillop"],"🛡️","Ned Kelly's gang wore home-made armour in their last stand in 1880."),
 B("What is democracy?","People vote to choose leaders",["One person decides everything","No rules","Only kids vote"],"🗳️","In a democracy citizens elect representatives and laws are made in parliament."),
 B("What did the 1967 referendum do?","Counted First Nations people in the census and let the Commonwealth make laws for them",["Started the gold rush","Made Canberra","Ended school"],"✅","Over 90% of Australians voted yes, a key step for First Nations rights."),
 B("Who was Mary MacKillop?","A nun who set up schools for poor children",["A gold miner","A pilot","A bushranger"],"🏫","She is Australia's first saint and founded schools in rural areas."),
 B("What did Banjo Paterson write?","Waltzing Matilda",["Harry Potter","The Hobbit","Peppa Pig"],"🎶","Paterson wrote famous bush poems, including Waltzing Matilda and The Man from Snowy River.")],
[B("Why did many migrants come to Australia after World War II?","For work and a safer life",["To join the gold rush","To be convicts","To explore space"],"🚢","Millions came from Europe and later Asia, making Australia multicultural."),
 B("What was the Snowy Mountains Scheme?","A huge hydro-electric project built by migrants",["A ski resort","A war","A gold mine"],"⚡🏔️","Built from 1949 to 1974, it made electricity and water for farms, with workers from over 30 countries."),
 B("What did Prime Minister Kevin Rudd say in 2008?","Sorry to the Stolen Generations",["Hello to the Olympics","Goodbye to Canberra","Thanks to sport"],"🤝","The National Apology acknowledged First Nations children taken from their families."),
 B("Who were the Stolen Generations?","First Nations children removed from their families",["Lost pets","Gold miners","Explorers"],"💔","From the 1900s to the 1970s, governments removed many children. The effects are still felt."),
 B("What is the Mabo decision (1992)?","Recognised First Nations land rights (native title)",["Started Federation","Ended a war","Built the Opera House"],"⚖️","Eddie Mabo's case overturned 'terra nullius', the false idea that the land belonged to no one."),
 B("When did Australia celebrate its first Olympic Games as host?","1956 in Melbourne",["1788 in Sydney","1901 in Perth","2050 in Hobart"],"🏅","Melbourne hosted in 1956 and Sydney in 2000. Brisbane will host in 2032."),
 B("What does 'multicultural' mean?","Many cultures living together",["One culture only","No culture","A type of food"],"🌏","Nearly half of Australians were born overseas or have a parent who was."),
 B("Why do we study history?","To understand how the past shapes today",["To memorise dates only","Because it's finished","To predict lotto"],"🔍","History helps explain why things are the way they are, and how to do better.")],
[B("Which ancient people built the pyramids?","Ancient Egyptians",["Romans","Vikings","Aztecs"],"🔺","The Great Pyramid of Giza was built about 4,500 years ago as a tomb for a pharaoh."),
 B("Who were the Romans famous for?","Roads, aqueducts and a huge empire",["Inventing the internet","Building the Opera House","Space travel"],"🏛️","The Roman Empire lasted centuries and built roads and aqueducts we can still see."),
 B("What writing did the ancient Egyptians use?","Hieroglyphs",["Emoji","English","Morse code"],"📜","Hieroglyphs were pictures and symbols for sounds and ideas."),
 B("Who were the Vikings?","Seafaring people from Scandinavia",["Roman soldiers","Australian explorers","Egyptian kings"],"⚓","Vikings from Norway, Sweden and Denmark sailed, traded and raided around 800–1050 CE."),
 B("Which invention let books be printed quickly in the 1400s?","The printing press",["The phone","The light bulb","The car"],"📜","Gutenberg's printing press spread knowledge across Europe."),
 B("Which country built the Great Wall?","China",["Egypt","Italy","Peru"],"🧱","The Great Wall was built over centuries to protect against invasions."),
 B("What does BCE mean?","Before Common Era (before year 1)",["Big Cool Event","Before Cars Existed","British Colony Era"],"📅","Years BCE count down to year 1. CE counts up from year 1."),
 B("Which is the oldest?","Aboriginal rock art",["The pyramids","The Roman Colosseum","The Opera House"],"🎨","Some Aboriginal rock art is tens of thousands of years old, older than the pyramids.")],
[B("Two sources disagree about an event. What should a historian do?","Check who made each source and why",["Pick the shortest one","Ignore both","Pick the newest"],"🕵️","Every source has a perspective. Asking who made it and why helps judge reliability."),
 B("A soldier's diary from 1915 is…","A primary source",["A secondary source","Fiction","A map"],"📔","It was written at the time by someone who was there."),
 B("A textbook written in 2020 about 1915 is…","A secondary source",["A primary source","An artefact","A diary"],"📘","Secondary sources are made later, using primary sources."),
 B("What is a 'perspective'?","A point of view",["A picture frame","A timeline","A date"],"👀","People experience the same event differently. Historians look for many perspectives."),
 B("What is 'cause and effect'?","Why something happened and what happened because of it",["A type of map","A count of years","A list of names"],"➡️","Example: the gold rush (cause) led to fast-growing towns (effect)."),
 B("What is 'continuity' in history?","Things that stay the same over time",["Things that change fast","A future event","A guess"],"🔁","Some things last for centuries, like family, celebrations, and caring for Country."),
 B("Why might a 1900 newspaper ignore women's views?","Women had less voice in public life then",["Women didn't exist","Paper was too small","It was illegal to print"],"📰","Asking whose voices are missing is a key history skill."),
 B("Which question is best for historical inquiry?","Why did the gold rush change Victoria?",["What's my favourite colour?","How tall am I?","Is it lunchtime?"],"❓","Good inquiry questions ask why and how, and can be answered with evidence.")]];
const READ=[
[B("Read: \"Mia grabbed her umbrella and raincoat before leaving.\" What was the weather probably like?","Rainy",["Sunny and hot","Snowing on the beach","Windless and dry"],"☂️","Clues: umbrella + raincoat → she expected rain. That's inferring."),
 B("Read: \"Tom yawned, rubbed his eyes and put down his book.\" How did Tom feel?","Tired",["Excited","Hungry","Angry"],"🥱","Yawning and rubbing eyes are clues that he was tired."),
 B("Read: \"The crowd roared as Sam crossed the line first.\" What happened?","Sam won a race",["Sam lost his shoes","It started raining","Sam fell asleep"],"🏃🏁","Crossing the line first + crowd roaring → he won."),
 B("Read: \"Leila's cheeks went red and she looked at the floor.\" How might she feel?","Embarrassed",["Proud","Sleepy","Bored"],"😳","Red cheeks and looking down are clues for embarrassment."),
 B("Read: \"The dog's tail wagged when it heard the keys.\" Why?","Someone it loves was coming home",["It was sad","It was cold","It wanted a bath"],"🐕🔑","Keys mean someone arriving; a wagging tail means happy."),
 B("What is the main idea? \"Bees collect nectar. They make honey. They pollinate flowers.\"","Bees do important jobs",["Flowers are red","Honey is sticky","Bees sleep a lot"],"🐝","The main idea is what all the sentences are about.")],
[B("Which word means very big?","Enormous",["Tiny","Narrow","Quiet"],"🐘","Enormous, huge and gigantic all mean very big."),
 B("In \"The sun was a golden coin in the sky\", what is the writer doing?","Comparing the sun to a coin",["Saying the sun is money","Talking about shopping","Counting"],"☀️🪙","This is a metaphor: describing one thing as another to paint a picture."),
 B("Why does an author write a recipe?","To instruct",["To entertain with a story","To persuade","To scare"],"📝","Recipes tell you how to do something: procedural text."),
 B("Why does an author write an advertisement?","To persuade",["To instruct","To tell history","To describe a dream"],"📢","Ads try to convince you to buy or do something."),
 B("Read: \"Despite the storm, the team kept training.\" What does 'despite' mean?","Even though there was",["Because of","After","Without"],"⛈️","'Despite' shows they trained even though the storm happened."),
 B("Read: \"Ava checked the map again, then sighed. They'd walked in a circle.\" What's the problem?","They were lost",["They were early","They found treasure","They were tired of maps"],"🗺️","Walking in a circle + checking the map → they're lost.")],
[B("Which is a fact?","Australia has six states",["Australia is the best place ever","Summer is the most fun","Cats are nicer than dogs"],"✅","A fact can be checked and proved. An opinion is what someone thinks."),
 B("Which is an opinion?","Pizza is the yummiest food",["Pizza comes from Italy","Pizza is often round","Pizza has a crust"],"💭","'Yummiest' is a personal feeling, so it's an opinion."),
 B("Read: \"Jake said 'Great, just great' when his ice cream fell.\" What does he mean?","He's annoyed",["He's happy","He wants more","He's surprised it's great"],"🍦","This is sarcasm: words that say the opposite of what's meant."),
 B("What does 'the narrator' mean?","The person telling the story",["The main villain","The illustrator","The reader"],"🗣️","First-person narrators say 'I'; third-person narrators say 'he/she/they'."),
 B("Read: \"The old house creaked. A door slammed upstairs.\" What mood is the writer creating?","Spooky",["Cheerful","Sleepy","Funny"],"🏚️","Word choices like creaked and slammed build a tense, spooky mood."),
 B("What is a summary?","The main points in a few words",["Every detail","A new ending","A list of words"],"📋","Summarising means picking the key ideas and leaving out small details.")]];
LB.hist=HIST;LB.readx=READ;
})();

;
/* learn3.js */
(function(){
const BANK=window.LB;
const fit=s=>s.length>48?`<span style="font-size:clamp(1.1rem,2.6vw,1.6rem);line-height:1.35;font-weight:700;max-width:640px;text-align:left">${s}</span>`:"";
const recent={};
function fromBank(id,l){const lv=BANK[id][Math.min(l,BANK[id].length)-1];const key=id+l;recent[key]=recent[key]||[];
  let it,g=0;do{it=pick(lv)}while(recent[key].includes(it.q)&&g++<20);recent[key].push(it.q);if(recent[key].length>Math.min(5,lv.length-2))recent[key].shift();
  const n=(kid!==null&&S.kids[kid].age>=9||l>=4)?3:2;
  return{say:it.q,q:it.q.length>48?"":it.q,stage:(it.q.length>48?fit(it.q)+"<br>":"")+`<span>${it.e}</span>`,opts:txtOpts(it.a,shuffle(it.w).slice(0,n)),ans:it.a,teach:it.t}}
WORLDS.splice(WORLDS.findIndex(w=>w.id==="feel"),0,
 {id:"sci",name:"Science Station",ico:"🔬",bg:"#2b6f8f",sub:"Living things, Earth, forces, materials",max:8},
 {id:"geo",name:"Map Island",ico:"🗺️",bg:"#3b7d4f",sub:"Places, maps, Australia, the world",max:8},
 {id:"hist",name:"Time Cave",ico:"🏺",bg:"#8a5a34",sub:"The past, First Nations, Australian history",max:8});
WORLDS.splice(WORLDS.findIndex(w=>w.id==="mix"),0,{id:"review",name:"Memory Mountain",ico:"🏔️",bg:"#5b5f97",sub:"Daily review: keeps what you learned",max:0,cls:"review"});
GEN.sci=l=>fromBank("sci",l);GEN.geo=l=>fromBank("geo",l);GEN.hist=l=>fromBank("hist",l);
const Y=["F","Y1","Y2","Y3","Y4","Y5","Y6","Y6+"];
CURR.sci=["Living vs non-living, senses (AC9SFU01)","Needs and life cycles, materials (AC9S1U01, AC9S1U04)","Push and pull, water cycle (AC9S2U03, AC9S2U02)","Solids and liquids, day and night (AC9S3U04, AC9S3U02)","Food chains, forces, erosion (AC9S4U01, AC9S4U03)","Adaptations, light, solar system (AC9S5U01, AC9S5U03)","Photosynthesis, seasons, circuits (AC9S6U01, AC9S6U03)","Fair testing and inquiry skills (AC9S6I02)"].map((a,i)=>[a.split(" (")[0],`${Y[i]} Science: ${a.match(/\((.*)\)/)[1]}`,"Science inquiry: explaining with evidence"]);
CURR.geo=["Places and features close to home","Australia, natural vs built features","Continents, oceans, states","Country/Place, climate zones, scale","World regions, sustainability, grid references","Neighbours, natural hazards, population","Latitude, Asia region, urban and rural","Global interconnections and inquiry"].map((a,i)=>[a,`${Y[i]} HASS – Geography`,"Comparing places and explaining patterns"]);
CURR.hist=["Personal and family histories","Past and present daily life","Timelines, sources, local history","Exploration, colonisation, First Nations perspectives","Federation and democracy","Migration, rights and recognition","Ancient civilisations","Sources, perspectives, cause and effect"].map((a,i)=>[a,`${Y[i]} HASS – History`,"Using sources and perspectives"]);
const ext=(id,max,fn,rows)=>{const o=GEN[id];GEN[id]=l=>l<=WORLDS.find(w=>w.id===id).baseMax?o(l):fn(l);const w=WORLDS.find(x=>x.id===id);w.baseMax=w.max;w.max=max;rows.forEach(r=>CURR[id].push(r))};
const word=t=>`<span class="word" style="font-size:clamp(2rem,6vw,3.6rem)">${t}</span>`;
const N=(a,say,q,hi)=>({say,q,stage:word(q.replace(" = ?","")),opts:numOpts(a,0,hi||99999),ans:a});
ext("nums",9,l=>{
  if(l===7){const a=rnd(120,560),b=rnd(110,399);return Object.assign(N(a+b,`What is ${a} plus ${b}?`,`${a} + ${b} = ?`),{teach:`Add the hundreds, then the tens, then the ones: ${a} + ${b} = ${a+b}.`})}
  if(l===8){const a=rnd(300,900),b=rnd(115,a-50);return Object.assign(N(a-b,`What is ${a} take away ${b}?`,`${a} − ${b} = ?`),{teach:`Take away hundreds, then tens, then ones. If you can't, swap a ten for ten ones. ${a} − ${b} = ${a-b}.`})}
  const n=rnd(3,9),k=rnd(4,12),it=pick(["packets of stickers","boxes of pencils","bags of apples","teams of players"]);
  return{say:`There are ${n} ${it} with ${k} in each. How many altogether?`,q:`${n} ${it}, ${k} in each`,stage:word(`${n} × ${k}`),opts:numOpts(n*k,0,200),ans:n*k,teach:`Equal groups means multiply: ${n} × ${k} = ${n*k}.`}},
 [["3-digit adding","Y3 Maths: AC9M3N04","Strategies for adding"],["3-digit take-away","Y3–4 Maths: AC9M3N04, AC9M4N06","Regrouping"],["Multiplication word problems","Y3–4 Maths: AC9M3N06, AC9M4N07","Turning words into maths"]]);
ext("times",10,l=>{
  if(l===8){const a=rnd(2,10),b=rnd(2,10);return{say:`What is ${a*b} divided by ${a}?`,q:`${a*b} ÷ ${a} = ?`,stage:word(`${a*b} ÷ ${a}`),opts:numOpts(b,1,12),ans:b,teach:`Think: ${a} times what makes ${a*b}? ${a} × ${b} = ${a*b}, so the answer is ${b}.`}}
  if(l===9){const a=rnd(12,49),b=rnd(3,9);return{say:`What is ${a} times ${b}?`,q:`${a} × ${b} = ?`,stage:word(`${a} × ${b}`),opts:numOpts(a*b,0,500),ans:a*b,teach:`Split it: ${Math.floor(a/10)*10} × ${b} = ${Math.floor(a/10)*10*b}, plus ${a%10} × ${b} = ${(a%10)*b}. Total ${a*b}.`}}
  const per=rnd(3,9),n=rnd(3,9),tot=per*n,r=rnd(0,1)?rnd(1,per-1):0;
  return{say:`${tot+r} lollies are shared between ${per} kids equally. How many does each kid get${r?", and how many are left over?":"?"}`,q:`${tot+r} shared by ${per}`,stage:word(`${tot+r} ÷ ${per}`),opts:txtOpts(r?`${n} r${r}`:`${n}`,r?[`${n+1} r${r}`,`${n} r${r+1>=per?0:r+1}`].filter(x=>x!==`${n} r${r}`).concat([`${n-1} r${r}`]).slice(0,2):[`${n+1}`,`${n-1}`]),ans:r?`${n} r${r}`:`${n}`,teach:`${per} × ${n} = ${tot}${r?`, with ${r} left over`:""}.`}},
 [["Division facts","Y3–4 Maths: AC9M3N06","Inverse thinking"],["2-digit × 1-digit","Y4 Maths: AC9M4N07","Splitting numbers"],["Sharing with remainders","Y4–5 Maths: AC9M5N08","Interpreting remainders"]]);
ext("pv",9,l=>{
  if(l===8){const n=rnd(1000,9999),pos=pick([["thousands",1000],["hundreds",100],["tens",10]]);const d=Math.floor(n/pos[1])%10;return{say:`In ${n}, what is the value of the ${pos[0]} digit?`,q:`${n}: ${pos[0]} digit worth?`,stage:word(n),opts:numOpts(d*pos[1],0,9000).map(o=>o),ans:d*pos[1],teach:`The ${pos[0]} digit is ${d}, so it's worth ${d} × ${pos[1]} = ${d*pos[1]}.`}}
  const n=rnd(1100,9899),to=pick([10,100,1000]),a=Math.round(n/to)*to;let o=[a,a+to,a-to].filter(x=>x>=0);return{say:`Round ${n} to the nearest ${to}.`,q:`Round ${n} to nearest ${to}`,stage:word(n),opts:shuffle(o).map(x=>({v:x,h:x})),ans:a,teach:`Look at the digit to the right of the ${to}s place. 5 or more rounds up. ${n} → ${a}.`}},
 [["4-digit place value","Y4 Maths: AC9M4N01","Reading big numbers"],["Rounding","Y4 Maths: AC9M4N05","Estimating"]]);
ext("frac",9,l=>{
  if(l===7){const d=pick([2,3,4,5]),n=rnd(1,d-1),k=rnd(2,4);return{say:`Which fraction is the same as ${n} over ${d}?`,q:`${n}/${d} = ?`,stage:word(`${n}/${d}`),opts:txtOpts(`${n*k}/${d*k}`,shuffle([`${n*k}/${d}`,`${n}/${d*k}`,`${n+k}/${d+k}`]).slice(0,2)),ans:`${n*k}/${d*k}`,teach:`Multiply the top and bottom by the same number: ${n}×${k} / ${d}×${k} = ${n*k}/${d*k}.`}}
  if(l===8){const d=pick([5,6,8,10]),a=rnd(1,d-2),b=rnd(1,d-a-1);return{say:`What is ${a} over ${d} plus ${b} over ${d}?`,q:`${a}/${d} + ${b}/${d} = ?`,stage:word(`${a}/${d} + ${b}/${d}`),opts:txtOpts(`${a+b}/${d}`,[`${a+b}/${d*2}`,`${a*b}/${d}`].filter(x=>x!==`${a+b}/${d}`)),ans:`${a+b}/${d}`,teach:`Same bottom number: just add the tops. ${a} + ${b} = ${a+b}, so ${a+b}/${d}.`}}
  const t=rnd(1,9),h=rnd(1,99);if(Math.random()<.5)return{say:`What is ${t} tenths as a decimal?`,q:`${t}/10 = ?`,stage:word(`${t}/10`),opts:txtOpts(`0.${t}`,[`${t}.0`,`0.0${t}`]),ans:`0.${t}`,teach:`Tenths go in the first place after the decimal point: 0.${t}.`};
  const v=(h/100).toFixed(2);return{say:`What is ${h} hundredths as a decimal?`,q:`${h}/100 = ?`,stage:word(`${h}/100`),opts:txtOpts(v,[(h/10).toFixed(1),`0.${h}0`].filter(x=>x!==v)),ans:v,teach:`Hundredths use two places after the point: ${h}/100 = ${v}.`}},
 [["Equivalent fractions","Y4 Maths: AC9M4N03","Seeing the same amount differently"],["Adding fractions","Y5 Maths: AC9M5N05","Same-size parts"],["Tenths and hundredths as decimals","Y4–5 Maths: AC9M4N02, AC9M5N03","Linking fractions and decimals"]]);
ext("read",8,l=>fromBank("readx",l-6+(l===8?Math.round(Math.random()):0)),[["Inference from clues","Y3–4 English: AC9E3LY05, AC9E4LY05","Inferring with evidence"],["Author's purpose, fact vs opinion, figurative language","Y4–5 English: AC9E5LY02, AC9E5LA08","Critical reading"]]);
if(!S.seenW)S.seenW={};
const touch=()=>{if(kid===null||!round||!round.w)return;const k=S.seenW[kid]=S.seenW[kid]||{};k[round.w]=Date.now()};
function chooseReview(){const ps=S.progress[kid]||{};const ids=WORLDS.filter(w=>w.max>1&&ps[w.id]&&ps[w.id].placed).map(w=>w.id);if(!ids.length)return pick(WORLDS.filter(w=>w.max).map(w=>w.id));
  const seen=S.seenW[kid]||{};const now=Date.now();const wts=ids.map(id=>{const days=(now-(seen[id]||now-864e5*3))/864e5;const h=ps[id].hist||[];const acc=h.length?h.filter(x=>x>0).length/h.length:.7;return Math.max(.2,days+.5)*(1.6-acc)});
  let r=Math.random()*wts.reduce((a,b)=>a+b,0);for(let i=0;i<ids.length;i++){r-=wts[i];if(r<=0)return ids[i]}return ids[0]}
const _next=next;next=function(){
  if(round&&round.home==="review"&&!round.place){const w=chooseReview();const p=prog(w);const L=Math.max(1,p.lvl-(Math.random()<.5?1:0));
    round.w=w;round.mix=false;round.q=GEN[w](L);round.qLevel=L;round.tag="review";round.tries=0;round.counted=0;round.whyDone=false;round.whyStage=false;render();
    const nm=WORLDS.find(x=>x.id===w).name;setTimeout(()=>round&&round.q&&speak(`${round.n===0?`Memory Mountain! Let's see what you remember. `:""}${nm}! ${round.q.say}`),300);return}
  _next()};
const _wrong=wrong;wrong=function(line){const q=round&&round.q;_wrong(line);
  if(q&&q.teach&&round&&!round.whyStage){const m=$("#msg");setTimeout(()=>{const mm=$("#msg");if(mm&&round&&round.q===q){mm.className="msg teach";mm.textContent="💡 "+q.teach}},50);setTimeout(()=>{if(round&&round.q===q)speak(q.teach,"soft")},1200)}};
const _correct=correct;correct=function(x,y,s){touch();const q=round&&round.q;if(q&&q.teach&&round.tries>0)s=(s?s+". ":"")+q.teach;_correct(x,y,s)};
const _map=map;map=function(){_map();const b=$('[data-w="review"]');if(b){const d=Object.keys((S.seenW||{})[kid]||{}).length;b.insertAdjacentHTML("beforeend",`<span style="font-size:15px;opacity:.9">${d?"Mix of everything you've learned":"Play other islands first"}</span>`)}};
const css=document.createElement("style");css.textContent=`.world.review{background:#5b5f97}.msg.teach{color:#5c3a00!important;background:#fff3d6;border-radius:12px;padding:8px 12px;font-weight:700}`;document.head.appendChild(css);
})();

;
/* inter.js */
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

;
/* codes.js */
(function(){const set=(id,i,code)=>{if(CURR[id]&&CURR[id][i])CURR[id][i][1]=code};
const sci=["F–Y1 Science: AC9SFU01, AC9SFI02","Y1 Science: AC9S1U01, AC9S1U02, AC9SFU03","Y1–3 Science: AC9S1U03, AC9S3U01, AC9S4U02","Y3 Science: AC9S3U04, AC9S3U03, AC9S6U02","Y4–6 Science: AC9S4U01, AC9S4U03, AC9S5U02, AC9S6U04","Y5 Science: AC9S5U01, AC9S5U03, AC9S5U04, AC9S2U01","Y6 Science: AC9S6U01, AC9S6U02, AC9S6U03, AC9S6U04","Y5–6 Science inquiry: AC9S5I02, AC9S6I02, AC9S6I05"];
sci.forEach((c,i)=>set("sci",i,c));
set("nums",6,"Y3 Maths: AC9M3N03");set("nums",7,"Y3–4 Maths: AC9M3N03, AC9M4N06");set("nums",8,"Y3–4 Maths: AC9M3N06, AC9M4N08");
set("times",7,"Y3 Maths: AC9M3N04");set("times",8,"Y4–5 Maths: AC9M4N06, AC9M5N06");set("times",9,"Y5 Maths: AC9M5N07");
set("pv",7,"Y3 Maths: AC9M3N01");set("pv",8,"Y4 Maths: AC9M4N07");
set("frac",6,"Y4 Maths: AC9M4N03");set("frac",7,"Y5 Maths: AC9M5N05");set("frac",8,"Y4 Maths: AC9M4N01, AC9M4N03");
set("read",6,"Y3–5 English: AC9E3LY05, AC9E4LY05, AC9E5LY05");set("read",7,"Y4–5 English: AC9E4LA02, AC9E5LY03, AC9E5LE04");
})();

;
/* shop2.js */
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

;
/* polish.js */
(function(){
const st=S.settings;if(st.music===undefined)st.music=false;if(st.limit===undefined)st.limit=0;
if(!S.daily)S.daily={};if(!S.ach)S.ach={};if(!S.stats)S.stats={};
const today=()=>new Date().toLocaleDateString("en-CA");
const K=()=>kid;const D=()=>{let d=S.daily[kid]||{};if(d.day!==today()){const y=new Date(Date.now()-864e5).toLocaleDateString("en-CA");const streak=d.day===y&&d.played?(d.streak||0)+1:0;d=S.daily[kid]={day:today(),streak,played:false,q:newQuests(),mins:0,isl:[]};save()}return d};
const streakNow=d=>d.streak+(d.played?1:0);
const ST=()=>S.stats[kid]=S.stats[kid]||{answers:0,first:0,rounds:0,bosses:0,islands:{}};
function newQuests(){const pool=[["first10","Get 10 right first try",10,"first"],["rounds2","Finish 2 rounds",2,"rounds"],["boss1","Beat a boss",1,"boss"],["islands3","Play 3 different islands",3,"islands"],["review1","Do a Memory Mountain round",1,"review"],["sci1","Finish a Science, Map or Time Cave round",1,"hass"]];return shuffle(pool).slice(0,3).map(([id,t,goal,type])=>({id,t,goal,type,n:0,claimed:false}))}

/* toasts */
const box=document.createElement("div");box.id="toasts";document.body.appendChild(box);
function toast(ic,title,sub,kind){const t=document.createElement("div");t.className="toast "+(kind||"");t.innerHTML=`<span class="ti">${ic}</span><div><b>${title}</b>${sub?`<small>${sub}</small>`:""}</div>`;box.appendChild(t);
  setTimeout(()=>t.classList.add("out"),3600);setTimeout(()=>t.remove(),4200);t.onclick=()=>t.remove()}
window.toast=toast;

/* sounds */
Object.assign(SFX,{
  coin:()=>tone([[1319,.08,0,"square"],[1760,.16,.07,"square"]]),
  levelup:()=>tone([[392,.12,0],[523,.12,.1],[659,.12,.2],[784,.12,.3],[1047,.5,.4],[1319,.6,.4,"triangle"]]),
  quest:()=>tone([[784,.1,0,"triangle"],[988,.1,.1,"triangle"],[1175,.35,.2,"triangle"]]),
  ach:()=>tone([[523,.2,0],[784,.2,0],[659,.2,.18],[1047,.2,.18],[1319,.7,.36],[784,.7,.36]]),
  whoosh:()=>{if(!st.sfx)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const n=AC.createBufferSource(),b=AC.createBuffer(1,AC.sampleRate*.35,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length)*.25;n.buffer=b;const f=AC.createBiquadFilter();f.type="bandpass";f.frequency.setValueAtTime(400,AC.currentTime);f.frequency.exponentialRampToValueAtTime(2400,AC.currentTime+.3);n.connect(f).connect(AC.destination);n.start()}catch(e){}}});
let mus=null;
function music(on){if(mus){clearInterval(mus.t);try{mus.g.gain.linearRampToValueAtTime(0,AC.currentTime+.4)}catch(e){}mus=null}
  if(!on)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const g=AC.createGain();g.gain.value=.035;g.connect(AC.destination);
  const prog=[[262,330,392],[220,262,330],[175,220,262],[196,247,294]];let i=0;
  const play=()=>{const ch=prog[i++%4];ch.forEach((f,j)=>{[0,.5,1,1.5].forEach(at=>{const o=AC.createOscillator(),e=AC.createGain();o.type="triangle";o.frequency.value=f*(j===2&&at>=1?2:1);const t=AC.currentTime+at+j*.12;e.gain.setValueAtTime(0,t);e.gain.linearRampToValueAtTime(1,t+.03);e.gain.exponentialRampToValueAtTime(.001,t+.45);o.connect(e).connect(g);o.start(t);o.stop(t+.5)})})};
  play();mus={g,t:setInterval(play,2000)}}catch(e){}}
document.addEventListener("pointerdown",function once(){if(st.music)music(true);document.removeEventListener("pointerdown",once)},{once:true});
document.addEventListener("visibilitychange",()=>{if(document.hidden)music(false);else if(st.music&&kid!==null)music(true)});

/* achievements */
const ACH=[["first","First steps","Answer your first question","🌱",s=>s.answers>=1],["fifty","Half century","50 right first try","🎯",s=>s.first>=50],["hundred","Century!","100 right first try","💯",s=>s.first>=100],["fivehundred","Brain champion","500 right first try","🧠",s=>s.first>=500],
 ["boss1","Boss beater","Beat your first boss","👾",s=>s.bosses>=1],["boss10","Boss legend","Beat 10 bosses","🏆",s=>s.bosses>=10],["explorer","Explorer","Play 8 different islands","🧭",s=>Object.keys(s.islands).length>=8],["allisl","World traveller","Play every island","🌏",s=>Object.keys(s.islands).length>=WORLDS.filter(w=>w.max).length],
 ["streak3","On fire","3-day streak","🔥",(s,d)=>streakNow(d)>=3],["streak7","Super streak","7-day streak","⚡",(s,d)=>streakNow(d)>=7],["rounds25","Busy learner","Finish 25 rounds","📚",s=>s.rounds>=25],["quests10","Quest hero","Finish 10 daily quests","🗝️",s=>(s.quests||0)>=10]];
function checkAch(){if(kid===null)return;const a=S.ach[kid]=S.ach[kid]||[];const s=ST(),d=D();ACH.forEach(([id,n,desc,ic,f])=>{if(!a.includes(id)&&f(s,d)){a.push(id);save();setTimeout(()=>{SFX.ach();toast(ic,"Achievement: "+n,desc,"gold");confetti(innerWidth/2,80,90);speak(`Achievement unlocked! ${n}!`,"happy");S.coins[kid]=(S.coins[kid]||0)+15;save()},700)}})}

/* quest progress */
function bump(type,n=1){if(kid===null)return;const d=D();d.played=true;d.q.forEach(q=>{if(q.type!==type||q.claimed)return;q.n=Math.min(q.goal,q.n+n);if(q.n>=q.goal&&!q.done){q.done=true;setTimeout(()=>{SFX.quest();toast("📜","Quest complete!",q.t+" · tap the map to claim","quest")},500)}});save()}
const _correct=correct;correct=function(x,y,s){const first=round&&round.tries===0;const w=round&&round.w;_correct(x,y,s);if(kid===null)return;const t=ST();t.answers++;if(first){t.first++;bump("first");setTimeout(SFX.coin,250)}if(w){if(!t.islands[w]){t.islands[w]=1}}save();checkAch()};
const _done=done;done=function(){const r=round;const w=r&&r.w,h=r&&r.home,b=r&&r.boss;_done();if(kid===null)return;const t=ST();t.rounds++;bump("rounds");
  const d=D();d.isl=d.isl||[];if(w&&!d.isl.includes(w)){d.isl.push(w);bump("islands")}if(h==="review")bump("review");if(["sci","geo","hist"].includes(w))bump("hass");if(b&&b.hp<=0){t.bosses++;bump("boss")}save();checkAch()};

/* map extras: streak, quests, calm corner, settings */
const _map=map;map=function(){_map();if(kid===null)return;const d=D();const top=$(".top");
  if(top&&!$("#streakpill"))top.insertAdjacentHTML("beforeend",`<span class="pill" id="streakpill" title="Days in a row">🔥 ${streakNow(d)}</span><button class="pill" id="calmbtn">🫧 Calm</button><button class="pill" id="questbtn">📜 Quests${d.q.some(q=>q.done&&!q.claimed)?' <span class="dot">!</span>':""}</button><button class="pill" id="badgebtn">🏅 ${(S.ach[kid]||[]).length}</button>`);
  $("#calmbtn").onclick=()=>{SFX.tap();calm()};$("#questbtn").onclick=()=>{SFX.tap();quests()};$("#badgebtn").onclick=()=>{SFX.tap();badges()};
  if(!d.greeted){d.greeted=true;save();const s=d.streak;setTimeout(()=>{toast("👋",`Welcome back, ${NAME()}!`,s?`🔥 ${s}-day streak, keep it going!`:"3 new quests are waiting for you","");SFX.whoosh()},800)}
  if(st.music)music(true)};
function quests(){const d=D();$("#app").innerHTML=`<div class="top"><button class="pill" id="qb">← Map</button></div><h2>📜 Today's quests</h2><p class="lede">New quests every day. Finish them for bonus coins!</p>
  <div class="qlist">${d.q.map((q,i)=>`<div class="qcard ${q.claimed?"claimed":q.done?"ready":""}"><b>${q.t}</b><div class="qbar"><i style="width:${q.n/q.goal*100}%"></i></div><small>${q.n} / ${q.goal}</small>${q.done&&!q.claimed?`<button class="big" data-claim="${i}">Claim 🪙 10</button>`:q.claimed?"<span>✓ Claimed</span>":""}</div>`).join("")}</div>`;
  speak("Here are today's quests!","happy");$("#qb").onclick=()=>{SFX.tap();render()};
  $$("[data-claim]").forEach(b=>b.onclick=()=>{const q=d.q[+b.dataset.claim];q.claimed=true;S.coins[kid]=(S.coins[kid]||0)+10;const t=ST();t.quests=(t.quests||0)+1;save();SFX.coin();SFX.quest();const r=b.getBoundingClientRect();confetti(r.left+r.width/2,r.top,70);checkAch();quests()})}
function badges(){const a=S.ach[kid]||[];$("#app").innerHTML=`<div class="top"><button class="pill" id="bb">← Map</button><span class="pill">🏅 ${a.length} of ${ACH.length}</span></div><h2>🏅 Achievements</h2>
  <div class="achs">${ACH.map(([id,n,desc,ic])=>`<div class="ach ${a.includes(id)?"got":""}"><span>${a.includes(id)?ic:"🔒"}</span><b>${n}</b><small>${desc}</small></div>`).join("")}</div>`;$("#bb").onclick=()=>{SFX.tap();render()}}
function calm(){music(false);const steps=[["Breathe in…",4000,"grow"],["Hold…",2000,"hold"],["Breathe out…",5000,"shrink"]];let i=0,c=0,alive=true;
  $("#app").innerHTML=`<div class="calm"><div class="top"><button class="pill" id="cb">← Done</button></div><h2>🫧 Calm corner</h2><div class="breath" id="br"></div><p class="lede" id="bt">Get comfy…</p><p><small>5 slow breaths. Tap Done any time.</small></p></div>`;
  speak("Let's take some slow breaths together.","soft");const br=$("#br"),bt=$("#bt");
  const go=()=>{if(!alive||!$("#br"))return;if(c>=5){bt.textContent="Great job. You're calm and ready!";speak("Great job. You're calm and ready.","soft");return}const s=steps[i];bt.textContent=s[0];br.className="breath "+s[2];br.style.transitionDuration=s[1]+"ms";if(i===0)tone([[220,3.8,0,"sine"]]);if(i===2)tone([[165,4.8,0,"sine"]]);i++;if(i>=3){i=0;c++}setTimeout(go,s[1])};
  setTimeout(go,1200);$("#cb").onclick=()=>{alive=false;SFX.tap();render()}}

/* screen time */
let lastTick=Date.now();
setInterval(()=>{if(kid===null||document.hidden){lastTick=Date.now();return}const d=D();d.mins=(d.mins||0)+(Date.now()-lastTick)/60000;lastTick=Date.now();save();
  if(st.limit&&d.mins>=st.limit&&!d.limitShown){d.limitShown=true;save();timeUp()}
  else if(st.limit&&d.mins>=st.limit-5&&!d.warn5){d.warn5=true;save();toast("⏰","5 minutes left today","Finish your round, then time for a break","");speak("Five minutes left today. Let's finish strong!","soft")}},20000);
function timeUp(){music(false);$("#app").innerHTML=`<div class="card done" style="margin-top:8vh"><div class="reward">🌙</div><h2>That's learning time done for today!</h2><p class="lede">Amazing work, ${NAME()}. Your brain grew today. Come back tomorrow to keep your 🔥 streak.</p><div class="rowbtns"><button class="big" id="tu">OK!</button></div></div>`;speak(`That's learning time done for today. Amazing work, ${NAME()}!`,"happy");$("#tu").onclick=()=>{kid=null;render()}}
const _next=next;next=function(){if(kid!==null&&st.limit){const d=D();if(d.mins>=st.limit+2)return timeUp()}_next()};

/* grown-ups settings */
const _parent=parent;parent=function(){_parent();const boxp=$(".parent");if(!boxp)return;const row=document.createElement("div");row.className="prow";
  row.innerHTML=`<span>Daily learning time limit (shows a friendly "done for today" screen, with a 5-minute warning)</span><select id="lim" style="font:inherit;padding:8px;border-radius:10px">${[0,15,20,30,45,60].map(m=>`<option value="${m}" ${st.limit===m?"selected":""}>${m?m+" min":"No limit"}</option>`).join("")}</select>`;boxp.appendChild(row);
  const r2=document.createElement("div");r2.className="prow";r2.innerHTML=`<span>Background music (gentle, low volume)</span><button class="switch" id="mus">${st.music?"On":"Off"}</button>`;boxp.appendChild(r2);
  const r3=document.createElement("div");r3.className="prow";r3.innerHTML=`<span>Today: ${S.kids.map((k,i)=>`${k.name} ${Math.round(((S.daily[i]||{}).day===today()?(S.daily[i].mins||0):0))} min`).join(" · ")}</span>`;boxp.appendChild(r3);
  $("#lim").onchange=e=>{st.limit=+e.target.value;save()};$("#mus").onclick=e=>{st.music=!st.music;save();e.target.textContent=st.music?"On":"Off"}};
/* home screen install */
try{const ic="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="#7cc6f2"/><ellipse cx="50" cy="60" rx="34" ry="28" fill="#8fb8b0"/><circle cx="40" cy="56" r="5" fill="#14262c"/><circle cx="60" cy="56" r="5" fill="#14262c"/></svg>');
  const m={name:"Pebble Island",short_name:"Pebble",start_url:location.href.split("#")[0],display:"standalone",background_color:"#7cc6f2",theme_color:"#7cc6f2",icons:[{src:ic,sizes:"any",type:"image/svg+xml"}]};
  const l=document.createElement("link");l.rel="manifest";l.href="data:application/manifest+json,"+encodeURIComponent(JSON.stringify(m));document.head.appendChild(l);
  [["theme-color","#7cc6f2"],["apple-mobile-web-app-capable","yes"],["mobile-web-app-capable","yes"]].forEach(([n,c])=>{const x=document.createElement("meta");x.name=n;x.content=c;document.head.appendChild(x)});
  const ai=document.createElement("link");ai.rel="apple-touch-icon";ai.href=ic;document.head.appendChild(ai)}catch(e){}

const css=document.createElement("style");css.textContent=`#toasts{position:fixed;top:12px;left:50%;transform:translateX(-50%);z-index:60;display:grid;gap:8px;width:min(92vw,440px);pointer-events:none}
.toast{pointer-events:auto;display:flex;gap:12px;align-items:center;background:#fff;color:#14262c;border-radius:18px;padding:12px 16px;box-shadow:0 8px 28px rgba(0,0,0,.25);animation:tin .45s cubic-bezier(.2,1.4,.4,1) both;font-weight:600}
.toast .ti{font-size:2rem}.toast b{display:block;font-size:1.05rem}.toast small{display:block;font-size:.9rem;color:#33515a}.toast.gold{background:linear-gradient(135deg,#fff6cf,#ffe08a)}.toast.quest{background:linear-gradient(135deg,#e6fff0,#bff0d4)}
.toast.out{animation:tout .5s forwards}@keyframes tin{from{transform:translateY(-30px) scale(.9);opacity:0}}@keyframes tout{to{transform:translateY(-30px);opacity:0}}
.qlist{display:grid;gap:14px;max-width:640px}.qcard{background:var(--panel,#fff);color:#14262c;border:3px solid var(--line,#ddd);border-radius:20px;padding:16px;display:grid;gap:8px}.qcard.ready{border-color:#3d8f2f;box-shadow:0 0 0 4px #bff0d4}.qcard.claimed{opacity:.6}
.qbar{height:14px;border-radius:7px;background:rgba(0,0,0,.1);overflow:hidden}.qbar i{display:block;height:100%;background:#3d8f2f;transition:width .5s}
.achs{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}.ach{background:var(--panel,#fff);color:#14262c;border:3px solid var(--line,#ddd);border-radius:18px;padding:14px;text-align:center;display:grid;gap:4px;opacity:.55}.ach.got{opacity:1;border-color:#e0b04a;background:linear-gradient(160deg,#fffdf2,#fff3c4)}.ach span{font-size:2.6rem}.ach small{color:#33515a}
.calm{text-align:center}.calm h2,.calm p{position:relative;z-index:2}#bt{font-size:2rem;font-weight:800;color:#14262c}.breath{position:relative;z-index:1;width:140px;height:140px;margin:110px auto 120px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#e6fbff,#7fd3e8 60%,#4aa8c4);box-shadow:0 0 40px rgba(127,211,232,.8);transition:transform ease-in-out}.breath.grow{transform:scale(1.9)}.breath.hold{transform:scale(1.9)}.breath.shrink{transform:scale(1)}
#streakpill{font-weight:800}`;document.head.appendChild(css);
})();

;
/* voice.js */
(function(){
const st=S.settings;
const rank=v=>{let s=0;const n=v.name;
  if(/natural|neural|online/i.test(n))s+=40;if(/enhanced|premium/i.test(n))s+=30;if(/google/i.test(n))s+=18;if(/samsung|sfx/i.test(n))s+=12;
  if(/en[-_]AU/i.test(v.lang))s+=10;else if(/en[-_](GB|NZ|IE)/i.test(v.lang))s+=7;else if(/en[-_]US/i.test(v.lang))s+=4;
  if(/natasha|karen|catherine|libby|sonia|serena|samantha|female|jenny|aria/i.test(n))s+=6;
  if(/compact|novelty|whisper|bells|zarvox|trinoids|albert|bad news|bahh|boing|bubbles|cellos|jester|organ|superstar|wobble|grandma|grandpa|rocko|shelley|flo|eddy|reed|sandy/i.test(n))s-=60;
  if(v.localService===false)s+=3;return s};
const list=()=>window.speechSynthesis?speechSynthesis.getVoices().filter(v=>/^en/i.test(v.lang)).sort((a,b)=>rank(b)-rank(a)):[];
function pickV(){const vs=list();if(!vs.length)return;VOICE=(st.voiceName&&vs.find(v=>v.name===st.voiceName))||vs[0]}
if(window.speechSynthesis){pickV();speechSynthesis.addEventListener&&speechSynthesis.addEventListener("voiceschanged",pickV);setTimeout(pickV,800)}
const calmText=t=>String(t)
  .replace(/\p{Extended_Pictographic}|️|‍/gu,"")
  .replace(/\b(Woohoo|Boom|Ka-pow|Whoa|Wheee|Ooh|Yay|Boop)!?\s*/gi,"")
  .replace(/!+/g,".").replace(/\.\s*\./g,".").replace(/\s+/g," ").trim();

speak=function(t,mood){if(!st.voice||!window.speechSynthesis)return;try{speechSynthesis.cancel();
  const text=calmText(t);if(!text)return;
  const parts=text.match(/[^.?]+[.?]?/g)||[text];
  const r=(st.voiceRate||.92)*(mood==="soft"?.94:1),p=mood==="happy"?1.06:1.0;
  parts.forEach((s,i)=>{const u=new SpeechSynthesisUtterance(s.trim());if(VOICE){u.voice=VOICE;u.lang=VOICE.lang}else u.lang="en-AU";u.rate=r;u.pitch=p;u.volume=.95;
    const b=$("#say");if(b&&i===0)b.classList.add("talking");if(b&&i===parts.length-1)u.onend=u.onerror=()=>b.classList.remove("talking");speechSynthesis.speak(u)})}catch(e){}};
const _parent=parent;parent=function(){_parent();const box=$(".parent");if(!box)return;const vs=list();
  const row=document.createElement("div");row.className="prow";
  row.innerHTML=`<span>Reading voice (best ones are listed first: “Natural”, “Enhanced” or Google voices sound most human)</span><span style="display:flex;gap:6px;flex-wrap:wrap"><select id="vsel" style="font:inherit;padding:8px;border-radius:10px;max-width:280px">${vs.slice(0,25).map(v=>`<option value="${v.name}" ${VOICE&&VOICE.name===v.name?"selected":""}>${v.name.replace(/Microsoft |Google /,"")} (${v.lang})</option>`).join("")||"<option>Default</option>"}</select>
   <select id="vrate" style="font:inherit;padding:8px;border-radius:10px">${[[.8,"Slow"],[.92,"Calm"],[1,"Normal"],[1.1,"Quick"]].map(([v,n])=>`<option value="${v}" ${(st.voiceRate||.92)===v?"selected":""}>${n}</option>`).join("")}</select><button class="switch" id="vtest">▶ Try</button></span>`;
  box.appendChild(row);
  $("#vsel").onchange=e=>{st.voiceName=e.target.value;save();pickV()};$("#vrate").onchange=e=>{st.voiceRate=+e.target.value;save()};
  $("#vtest").onclick=()=>speak("Hi there. Let's learn something new together. You're doing a great job.","soft")};
})();

;
/* upgrade.js */
(function enhance(){
  "use strict";
  let selectedArea="all";
  const category={reading:["words","read","think"],maths:["nums","pv","times","frac","shapes","time","money","data"],discover:["sci","geo","hist","feel"],games:["mix","review"]};
  const group=id=>Object.keys(category).find(k=>category[k].includes(id))||"discover";
  const baseMap=map;
  map=function(){
    baseMap();
    const app=document.getElementById("app"),list=app.querySelector(".map");
    if(!list||kid===null)return;
    const cards=[...list.querySelectorAll(".world[data-w]")];
    const last=(S.lastWorld||{})[kid];
    const nextCard=cards.find(b=>b.dataset.w===last)||cards.find(b=>b.dataset.w==="words")||cards[0];
    if(nextCard){
      const w=WORLDS.find(x=>x.id===nextCard.dataset.w);
      const intro=document.createElement("section");intro.className="dashboard-intro";
      const copy=document.createElement("div");copy.className="dashboard-copy";
      const eyebrow=document.createElement("p");eyebrow.className="eyebrow";eyebrow.textContent="PEBBLE ISLAND";
      const headline=document.createElement("h2");headline.textContent="Ready to explore, "+S.kids[kid].name+"?";
      const detail=document.createElement("p");detail.textContent="Learn something new, then make time to play.";
      copy.append(eyebrow,headline,detail);
      const start=document.createElement("button");start.className="big continue-btn";start.type="button";
      const primary=document.createElement("span");primary.textContent=last?"Continue learning":"Start exploring";
      const sub=document.createElement("small");sub.textContent=w?w.ico+" "+w.name:"";
      start.append(primary,sub);
      start.onclick=()=>nextCard.click();
      intro.append(copy,start);
      const top=app.querySelector(".top");if(top)top.insertAdjacentElement("afterend",intro);
    }
    const h=list.previousElementSibling;
    if(h&&h.tagName==="H2"){h.textContent="Choose an island";h.classList.add("island-title")}
    const filters=document.createElement("nav");filters.className="island-filters";filters.setAttribute("aria-label","Learning island categories");
    const choices=[["all","All islands"],["reading","Reading"],["maths","Maths"],["discover","Discover"],["games","Games"]];
    function filter(val){
      selectedArea=val;
      cards.forEach(b=>b.hidden=val!=="all"&&group(b.dataset.w)!==val);
      filters.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.cat===val)));
    }
    choices.forEach(([id,label])=>{
      if(id!=="all"&&!cards.some(c=>group(c.dataset.w)===id))return;
      const btn=document.createElement("button");btn.type="button";btn.className="filter-tab";btn.dataset.cat=id;btn.textContent=label;btn.setAttribute("aria-pressed","false");btn.onclick=()=>filter(id);filters.append(btn);
    });
    list.before(filters);filter(selectedArea);
    const top=app.querySelector(".top"),bar=app.querySelector(".mapbar");
    if(top&&bar){
      top.classList.add("map-top");bar.classList.add("compact-stats");
      const wrap=document.createElement("div");wrap.className="more-wrap";
      const button=document.createElement("button");button.className="pill more-toggle";button.type="button";button.textContent="Menu";button.setAttribute("aria-expanded","false");
      const menu=document.createElement("div");menu.className="more-menu";menu.hidden=true;
      ["skn","stk","shopbtn","buildbtn","gamebtn","chatbtn","calmbtn","questbtn","badgebtn","streakpill","goalpill"].forEach(id=>{
        const el=document.getElementById(id);if(el)menu.append(el);
      });
      button.onclick=()=>{menu.hidden=!menu.hidden;button.setAttribute("aria-expanded",String(!menu.hidden))};
      menu.addEventListener("click",e=>{if(e.target.closest("button")){menu.hidden=true;button.setAttribute("aria-expanded","false")}});
      wrap.addEventListener("keydown",e=>{if(e.key==="Escape"){menu.hidden=true;button.setAttribute("aria-expanded","false");button.focus()}});
      wrap.append(button,menu);top.append(wrap);
    }
  };
  const baseHome=home;
  home=function(){
    baseHome();const lead=document.querySelector("#app .lede");
    if(lead){lead.textContent="Choose your explorer to start learning and playing.";lead.classList.add("home-intro")}
  };
  const basePlay=play;
  play=function(){
    basePlay();const msg=document.getElementById("msg");
    if(msg){msg.setAttribute("role","status");msg.setAttribute("aria-live","polite");msg.setAttribute("aria-atomic","true")}
  };
  document.addEventListener("click",e=>{
    const world=e.target.closest(".world[data-w]");
    if(world&&kid!==null){
      S.lastWorld=S.lastWorld||{};
      S.lastWorld[kid]=world.dataset.w;
      save();
    }
  },{passive:true});
  if(typeof confetti==="function"){
    const original=confetti;
    confetti=function(x,y,n){if(!document.hidden)original(x,y,Math.min(n||70,36))};
  }
  if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("/sw.js").catch(()=>{}),{once:true});
  if(typeof render==="function")render();
})();
