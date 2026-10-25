(function(){
const K=window.PEBBLE_TEACH_KIT;if(!K)return;
const {L,R,S,P,B,H,HS}=K;

K.add("5.maths",{
 percentage:[
  L("💯","Percent means out of 100.","50% is 50 out of 100. That is one half."),
  B("Fill 25% of a 100 grid. Tap rows of 10.",25,[["🟩","10 squares",10],["🟡","1 square",1]],[0,0,1,1,1,1,1],{total:"{n}%",done:"25 out of 100 is 25%. That is one quarter!"}),
  P("What is 25% of 80?",[["20","Yes! 25% is a quarter. 80 ÷ 4 = 20."],["25","25% is not always 25. It is a quarter of the amount."],["40","40 is half of 80. That is 50%."]],0)
 ],
 fractions:[
  L("¼ + ²⁄₄","Same bottom number? Add the top numbers."),
  R("1/4 + 2/4.",["The bottoms match: quarters.","Add the tops: 1 + 2 = 3.","So 1/4 + 2/4 = 3/4."]),
  R("1/2 + 1/4. The bottoms do not match.",["Change 1/2 into quarters: 1/2 = 2/4.","Now 2/4 + 1/4.","2 + 1 = 3. So 3/4."]),
  P("What is 3/8 − 1/8?",[["2/8 = 1/4","Yes! 3 − 1 = 2 eighths. 2/8 is the same as 1/4."],["2/0","Keep the bottom number the same."],["4/8","That adds. We need to take away."]],0)
 ],
 multiply:[
  L("24 × 3","Split the big number into tens and ones."),
  R("24 × 3.",["24 = 20 + 4","20 × 3 = 60","4 × 3 = 12","60 + 12 = 72"]),
  B("Now 23 × 4. Build 20 × 4, then 3 × 4.",92,[["🟦","20 × 4 = 80",80],["🟩","3 × 4 = 12",12],["🟡","1",1]],[0,1],{done:"80 + 12 = 92!"})
 ],
 estimates:[
  L("≈","Round first to check your answer."),
  R("48 × 6. Estimate.",["48 is close to 50.","50 × 6 = 300.","So the answer is about 300."]),
  P("Someone says 99 × 4 = 40. Is that right?",[["It is much too small","Yes! 100 × 4 is 400. So 40 is way off."],["It is about right","Round 99 to 100. 100 × 4 = 400."]],0)
 ],
 bignumbers:[
  L("352 140","Place value goes up in tens."),
  R("Read 352 140 by place.",["3 hundred thousands","5 ten thousands = 50 000","2 thousands","1 hundred, 4 tens, 0 ones"]),
  H("Round 4 762 to the nearest hundred. Tap the digit you look at.","4 7 6 2",["6"],"Look at the digit just right of the hundreds."),
  P("6 is 5 or more. So 4 762 rounds to...",[["4 800","Yes! Round the 7 hundreds up to 8."],["4 700","6 is 5 or more, so we round up."]],0)
 ],
 decimals:[
  L("0.5 = ½","The first digit after the point is tenths."),
  S("Which place?",["Tenths","Hundredths"],[["the 6 in 4.62",0],["the 7 in 0.7",0],["the 2 in 4.62",1],["the 7 in 0.07",1]]),
  P("Which is larger?",[["0.7","Yes! 7 tenths is more than 7 hundredths."],["0.07","That is only 7 hundredths."]],0)
 ],
 division:[
  L("84 ÷ 4","Division is sharing equally."),
  R("84 ÷ 4. Split 84 into tens and ones.",["80 ÷ 4 = 20","4 ÷ 4 = 1","20 + 1 = 21","Check: 21 × 4 = 84"]),
  R("17 ÷ 5.",["5 goes into 17 three times: 15.","17 − 15 = 2 left over.","So 3 remainder 2."])
 ],
 factors:[
  L("1 × 12 · 2 × 6 · 3 × 4","Factors multiply to make a number."),
  H("Tap all the factors of 12.","1 2 3 4 5 6 7 12",["1","2","3","4","6","12"],"Does it fit into 12 with nothing left?"),
  S("Prime or not prime?",["Prime (only 2 factors)","Not prime"],[["7",0],["11",0],["12",1],["21",1]])
 ],
 areaperimeter:[
  L("⬜⬜⬜⬜⬜⬜","Perimeter goes around. Area fills the inside."),
  R("A 6 by 4 rectangle.",["Perimeter: 6 + 4 + 6 + 4 = 20","Area: 6 × 4 = 24 squares"]),
  B("Fill a 10 by 3 rectangle. Tap a row of 10.",30,[["🟦","row of 10",10]],[0,0,0],{total:"{n} squares",done:"3 rows of 10. Area = 30!"})
 ],
 angles:[
  L("📐","A right angle is 90°. Like the corner of a book."),
  S("Sort the angles.",["Acute (less than 90°)","Right (90°)","Obtuse (90° to 180°)"],[["50°",0],["30°",0],["90°",1],["120°",2],["150°",2]]),
  P("A straight line is how many degrees?",[["180°","Yes! Two right angles."],["90°","That is a right angle."]],0)
 ],
 time24:[
  L("🕒 15:00","After noon, add 12."),
  R("3 pm in 24-hour time.",["3 pm is after noon.","3 + 12 = 15.","So 15:00."]),
  B("How long from 9:15 to 10:00? Add minutes.",45,[["⏱️","15 min",15],["⏱️","5 min",5]],[0,0,0],{total:"{n} minutes",done:"9:15 to 10:00 is 45 minutes!"})
 ],
 coordinates:[
  L("➡️ then ⬆️","First number goes across. Second goes up."),
  R("Find (3, 2).",["Start at (0, 0).","Go 3 across.","Go 2 up.","You are at (3, 2)!"]),
  P("From (1, 1) to (1, 4). How many steps up?",[["3","Yes! 4 − 1 = 3."],["4","Start at 1, not 0."],["5","Count again: 2, 3, 4."]],0)
 ]
});

K.add("5.english",{
 perspective:[
  L("👁️","Who is telling the story? I and me means first person."),
  H("Tap the first-person words.","I rushed to hide the letter from my sister.",["I","my"],"Look for I, me or my."),
  S("First person or third person?",["First person","Third person"],[["I opened the door.",0],["We ran home.",0],["She was afraid.",1],["He thought it was safe.",1]])
 ],
 imagery:[
  L("🌬️💬","Similes, metaphors and personification paint pictures."),
  H("Tap the word that makes this a simile.","As quiet as a mouse",["as"],"Similes use like or as."),
  S("Which type?",["Simile","Metaphor","Personification"],[["as quiet as a mouse",0],["ran like the wind",0],["the classroom was a zoo",1],["the trees danced",2],["the wind whispered",2]])
 ],
 evidence:[
  L("🗣️➕📊","A strong argument gives a reason and evidence."),
  S("Opinion only, or evidence?",["Opinion only","Evidence"],[["More shade is good.",0],["Trees are the best.",0],["Shade keeps people cool on hot days.",1],["The survey found most students walk.",1]]),
  P("Best source for an official storm warning?",[["The Bureau of Meteorology","Yes! It is the official source."],["A friend's guess","Check an official source."]],0)
 ],
 structure:[
  L("¶","The first sentence of a paragraph shows its main idea."),
  S("What does the linking word do?",["Adds a point","Shows a contrast"],[["Furthermore,",0],["Also,",0],["Another reason is",0],["However,",1],["On the other hand,",1]]),
  HS("Tap the best opening sentence for a paragraph on recycling.",["I had toast today.","Recycling can reduce rubbish sent to landfill.","Bins are green."],[1],"Which one tells the main idea?")
 ],
 complex:[
  L("🧩 + because","A complex sentence has a main idea and an extra idea."),
  H("Tap the joining word.","We stayed inside because it was raining.",["because"],"Look for because, although, when, if or while."),
  S("Main idea or extra idea? (extra cannot stand alone)",["Main idea","Extra idea"],[["she kept reading",0],["we stayed inside",0],["although it was late",1],["because it was raining",1]])
 ],
 apostrophes:[
  L("do not ➡️ don't","An apostrophe can show missing letters or belonging."),
  S("Missing letters or belonging?",["Missing letters","Belonging"],[["don't",0],["can't",0],["it's",0],["the dog's ball",1],["Mia's hat",1]]),
  P("Which is a plural, with no apostrophe?",[["dogs","Yes! Just add s."],["dog's","That shows belonging."]],0)
 ],
 prefixsuffix:[
  L("un + happy · care + ful","Prefixes go at the start. Suffixes go at the end."),
  R("Build words.",["un + happy = unhappy (not happy)","re + do = redo (do again)","care + ful = careful (full of care)","fear + less = fearless (without fear)"]),
  S("Prefix or suffix?",["Prefix","Suffix"],[["un-",0],["re-",0],["-ful",1],["-less",1]])
 ],
 synonyms:[
  L("big ≈ huge · hot ↔ cold","Synonyms mean the same. Antonyms are opposites."),
  S("For 'happy': synonym or antonym?",["Synonym","Antonym"],[["glad",0],["cheerful",0],["sad",1],["upset",1]]),
  P("What does a thesaurus list?",[["Words with similar meanings","Yes!"],["Maps","That is an atlas."]],0)
 ],
 storystructure:[
  L("📖","Orientation, complication, resolution."),
  S("Which part of the story?",["Orientation","Complication","Resolution"],[["A boy lives by the sea.",0],["One day he gets lost.",1],["He finds his way home.",2]]),
  P("What is a theme?",[["The big idea","Yes! Like being brave."],["The first page","The theme runs through the whole story."]],0)
 ],
 factopinion:[
  L("✅ 💭","A fact can be checked. An opinion is what someone thinks."),
  H("Tap the opinion words.","Pizza is the best food and maths is boring",["best","boring"],"Words like best, worst and boring show feelings."),
  S("Fact or opinion?",["Fact","Opinion"],[["Water boils at 100°C.",0],["Dinosaurs lived long ago.",0],["Blue is the prettiest colour.",1],["Pizza is the best.",1]])
 ],
 speech:[
  L("\" \"","Quotation marks go around the exact words someone says."),
  H("Tap the words Mia says.","\"I am hungry,\" said Mia.",["\"I","am","hungry,\""],"Which words are inside the marks?"),
  P("Which is correct?",[["\"Come here,\" said Mum.","Yes! The comma is inside the quote."],["Come here, \"said Mum.\"","The marks go around the spoken words."]],0)
 ],
 homophones:[
  L("there · their · they're","Homophones sound the same but mean different things."),
  S("Which meaning?",["they're = they are","their = belongs to them","there = a place"],[["___ going to the park",0],["___ dog is cute",1],["Put it over ___",2]]),
  P("It is ___ big.",[["too","Yes! Too means very or also."],["two","Two is the number 2."],["to","To shows direction."]],0)
 ]
});

K.add("5.science",{
 adapt:[
  L("🦔","An adaptation helps a living thing survive."),
  S("Body feature or behaviour?",["Body feature","Behaviour"],[["echidna spines",0],["long snout",0],["mangrove roots",0],["waxy leaves",0],["active at night",1]]),
  P("How do an echidna's spines help it?",[["Protect it from predators","Yes!"],["Help it swim","Spines are for protection."]],0)
 ],
 erosion:[
  L("⛰️➡️🏖️","Weathering breaks. Erosion carries. Deposition drops."),
  R("A stream after rain.",["Weathering: rock cracks into bits.","Erosion: water carries soil away.","Deposition: water slows and drops it."]),
  S("Which one?",["Weathering","Erosion","Deposition"],[["rock cracks but stays",0],["river carries sand",1],["sand settles in a dune",2]])
 ],
 light:[
  L("🔦➡️","Light travels in straight lines."),
  S("What happens to the light?",["Blocked (shadow)","Reflected (bounces)","Refracted (bends)"],[["opaque wall",0],["mirror",1],["straw in water",2]]),
  P("Why does a straw look bent in water?",[["Light changes direction","Yes! It refracts between water and air."],["The straw breaks","The straw is fine. Light bends."]],0)
 ],
 particles:[
  L("🧊💧♨️","Matter is made of tiny particles."),
  R("Particles in each state.",["Solid: packed, wiggle in place.","Liquid: close, slide past each other.","Gas: far apart, move freely."]),
  S("Solid, liquid or gas?",["Solid","Liquid","Gas"],[["ice",0],["water",1],["water vapour",2]])
 ],
 foodchain:[
  L("🌾➡️🐇➡️🦊","Arrows point to the eater."),
  S("What is each one?",["Producer","Herbivore","Carnivore"],[["grass",0],["rabbit",1],["fox",2]]),
  P("What do the arrows show?",[["Energy going to the eater","Yes!"],["Who is biggest","Arrows show energy flow."]],0)
 ],
 statechange:[
  L("🧊➡️💧➡️♨️","Heating and cooling change state."),
  S("Name the change.",["Melting","Freezing","Evaporating","Condensing"],[["ice to water",0],["water to ice",1],["water to vapour",2],["steam to drops on a window",3]])
 ],
 mixtures:[
  L("🪨🏖️","We separate mixtures by their properties."),
  S("Which tool?",["Sieve","Magnet","Filter"],[["sand and pebbles",0],["iron and sand",1],["sand and water",2]]),
  P("Salty water evaporates. What is left?",[["Salt","Yes! The water goes. Salt stays."],["Sand","There was no sand."]],0)
 ],
 solarsystem:[
  L("☀️🪐","The Sun is a star at the centre. Eight planets orbit it."),
  R("Out from the Sun.",["Mercury","Venus","Earth: third","Mars","Jupiter, Saturn, Uranus","Neptune: farthest"]),
  S("Day or year?",["One spin (day)","One orbit (year)"],[["Earth spins once",0],["Earth goes around the Sun",1]])
 ],
 fossils:[
  L("🦴🪨","A fossil is the remains or marks of a living thing from long ago."),
  R("How a fossil forms.",["A dinosaur dies.","Mud or sand buries it.","Over millions of years, minerals replace bone.","The bone becomes stone."]),
  P("What can a fossil footprint show?",[["How a dinosaur walked","Yes!"],["What it ate for lunch","A footprint shows walking."]],0)
 ],
 rocks:[
  L("🌋 🏜️ 🏛️","Three kinds of rock."),
  S("Which rock type?",["Igneous","Sedimentary","Metamorphic"],[["basalt (cooled lava)",0],["sandstone (layers)",1],["marble (heat and pressure)",2]]),
  P("Where are fossils often found?",[["Sedimentary rock","Yes! Layers bury them."],["Igneous rock","Melted rock would destroy them."]],0)
 ],
 magnets:[
  L("🧲 N S","Opposite poles attract. Same poles repel."),
  S("Attract or repel?",["Attract","Repel"],[["N and S",0],["S and N",0],["N and N",1],["S and S",1]]),
  P("Can a magnet work through paper?",[["Yes","Yes! Through paper, cloth and water."],["No","Try it with a fridge note."]],0)
 ],
 fairtest5:[
  L("✈️📏","Change one thing. Measure one thing. Keep the rest the same."),
  S("Paper plane test. Which variable?",["Change (independent)","Measure (dependent)","Keep same (controlled)"],[["type of paper",0],["distance flown",1],["throw strength",2],["where you stand",2]]),
  P("Why repeat a test?",[["More reliable results","Yes!"],["To change more things","Only change one thing."]],0)
 ]
});

K.add("5.hass",{
 colonies:[
  L("🗺️","First Nations peoples lived across Australia before British colonies."),
  R("Questions historians ask.",["Who made the decisions?","Whose land was affected?","How did different people experience the change?"]),
  P("What does dispossession mean here?",[["People forced from control of their land","Yes."],["Moving house by choice","Dispossession was forced."]],0)
 ],
 democracy:[
  L("🗳️","Voters elect representatives to make decisions."),
  S("Is it a civic action?",["Civic action","Not civic"],[["vote",0],["sign a petition",0],["write to your council",0],["watch cartoons",1]]),
  P("What happens in a representative democracy?",[["People elect representatives","Yes!"],["One person decides everything","That is not democracy."]],0)
 ],
 weather:[
  L("🌊🔥☀️","Floods, bushfires and drought affect places."),
  S("Safe or unsafe?",["Safe choice","Unsafe"],[["follow official warnings",0],["make an emergency plan",0],["drive into floodwater",1],["ignore fire warnings",1]]),
  P("Floodwater covers a road. What do you do?",[["Stay out and follow official advice","Yes!"],["Walk through","Floodwater is dangerous."]],0)
 ],
 resources:[
  L("🌳👷🔧","Natural, human and capital resources."),
  S("A bakery. Which resource?",["Natural","Human","Capital"],[["flour from wheat",0],["timber",0],["baker's skills",1],["oven",2],["tractor",2]])
 ],
 gridmaps:[
  L("🗺️ B3","A grid reference is a letter and a number."),
  R("Find B3.",["Go across to column B.","Go up to row 3.","You are at B3."]),
  S("Which map part?",["Key","Scale","Grid reference"],[["what symbols mean",0],["real distances",1],["C2",2]])
 ],
 biomes:[
  L("🏜️🌴🌾🏖️","Australia has many environments."),
  S("Which environment?",["Desert","Rainforest","Coast"],[["dry and hot",0],["Central Australia",0],["lots of rain, tall trees",1],["northern Queensland",1],["where land meets sea",2]])
 ],
 capitals:[
  L("🇦🇺","Each state and territory has a capital."),
  S("Match the capital.",["Queensland","Victoria","Western Australia","Whole nation"],[["Brisbane",0],["Melbourne",1],["Perth",2],["Canberra",3]]),
  P("What is the capital of Tasmania?",[["Hobart","Yes!"],["Sydney","Sydney is in New South Wales."]],0)
 ],
 goldrush:[
  L("⛏️✨","Gold was found in NSW and Victoria in the 1850s."),
  R("What happened next.",["People came from around the world.","Towns like Ballarat grew fast.","Work was hard.","The land changed. First Nations peoples were affected."]),
  P("When was the gold rush?",[["The 1850s","Yes!"],["The 1990s","Much earlier."]],0)
 ],
 lawmaking:[
  L("🏛️","Australia has three levels of government."),
  S("Which level?",["Local council","State","Federal"],[["parks",0],["rubbish",0],["schools",1],["hospitals",1],["defence",2]]),
  P("Where are laws made?",[["Parliament","Yes!"],["The shops","Laws are made in parliament."]],0)
 ],
 consumer:[
  L("💵","Needs come first. Wants are extras."),
  S("Need or want?",["Need","Want"],[["food",0],["water",0],["shelter",0],["toy",1],["game",1]]),
  B("You have $10. Spend it on things that fit.",10,[["🎮","game $8",8],["🍎","snack $3",3],["🥤","drink $2",2]],[0,2],{total:"${n}",done:"Game + drink = $10. You could not also buy the snack."})
 ],
 trade:[
  L("🚢⬅️➡️","Exports go out. Imports come in."),
  S("Australia: export or import?",["Export (sold out)","Import (bought in)"],[["iron ore",0],["coal",0],["wheat",0],["many cars",1],["many phones",1]])
 ],
 landuse:[
  L("🚜⛏️🏙️🌲","People use land in different ways."),
  S("Which land use?",["Farming","Mining","City","Forest"],[["grow wheat",0],["dig minerals",1],["homes and work",2],["timber and animal homes",3]]),
  P("Why care for land?",[["So it can be used a long time","Yes!"],["It does not matter","Land needs care."]],0)
 ]
});

K.add("5.technologies",{
 binary:[
  L("0️⃣1️⃣","Binary uses only 0 and 1."),
  R("101 in binary. Places are 4, 2, 1.",["1 in the 4s place = 4","0 in the 2s place = 0","1 in the 1s place = 1","4 + 0 + 1 = 5"]),
  B("Make 6 in binary. Tap the places you switch on.",6,[["4️⃣","4s place",4],["2️⃣","2s place",2],["1️⃣","1s place",1]],[0,1],{done:"4 + 2 = 6. That is 110!"})
 ],
 loops:[
  L("🔁","A loop repeats. A variable stores a value."),
  R("score = 0. Repeat 3 times: add 2.",["Start: score = 0","Loop 1: score = 2","Loop 2: score = 4","Loop 3: score = 6"]),
  B("Repeat 'add 3' four times from 0. Run the loop.",12,[["🔁","add 3",3]],[0,0,0,0],{total:"score = {n}",done:"4 loops of 3 = 12!"})
 ],
 "app-design":[
  L("📱👧","A user story says who needs something and why."),
  S("Helpful or unhelpful design?",["Helpful","Unhelpful"],[["high-contrast text",0],["clear big buttons",0],["labels with icons",0],["tiny grey text",1],["icons with no words",1]])
 ],
 "sustainable-design":[
  L("🍶⚖️","Design criteria are checks. Good design weighs several."),
  S("Good criterion for a lunchbox?",["Useful criterion","Not useful"],[["safe",0],["durable",0],["repairable",0],["cheapest no matter what",1]]),
  P("Why might the cheapest design not be best?",[["It could wear out sooner","Yes! Trade-offs matter."],["Cheap is always best","Think about how long it lasts."]],0)
 ],
 debugprog:[
  L("🐞🔍","Trace each step to find the bug."),
  R("It should show 6 but shows 4.",["score = 0","repeat 2 times: add 2","After loop: 4","Bug! The repeat should be 3."]),
  P("After a fix, you should...",[["Test again","Yes! Check it works."],["Delete it","Test it first."]],0)
 ],
 spreadsheet:[
  L("📊 A B C","A spreadsheet is a grid of cells."),
  R("=B2+B3",["B2 holds 5.","B3 holds 3.","The formula adds them.","The cell shows 8."]),
  S("Column or row?",["Column (up and down)","Row (across)"],[["A",0],["B",0],["1",1],["2",1]])
 ],
 internet:[
  L("💻🌐🖥️","The internet is connected computers."),
  R("Open a website.",["Your browser asks the server.","The server finds the page.","It sends small packets.","Your browser shows the page."]),
  S("What is it?",["Server","Browser","Wi-Fi"],[["stores websites",0],["asks for a page",1],["connects without cables",2]])
 ],
 passwords:[
  L("🔐","Strong passwords are long and hard to guess."),
  S("Strong or weak?",["Strong","Weak"],[["Purple!Fox7Moon",0],["Tree#Rocket42",0],["password",1],["your name",1],["123456",1]]),
  P("A message asks for your password. What do you do?",[["Do not share it. Tell an adult","Yes!"],["Send it","Never share it."]],0)
 ],
 structures:[
  L("🔺🌉","Triangles and wide bases make strong structures."),
  S("Strong or weak?",["Stronger","Weaker"],[["triangle frame",0],["wide base",0],["steel",0],["narrow base",1],["paper bridge",1]]),
  P("A load on a bridge pushes...",[["Down","Yes!"],["Up","Weight pushes down."]],0)
 ],
 nutrition:[
  L("🏷️","A food label shows what is inside."),
  R("Read an ingredients list.",["The first ingredient is the main one.","Check sugar per 100 g.","Check salt per 100 g.","Compare two foods the same way."]),
  P("Drink A: 20 g sugar per 100 mL. Drink B: 5 g. Which has less sugar?",[["Drink B","Yes! 5 g is less."],["Drink A","20 g is more."]],0)
 ],
 flowchart:[
  L("⬭ ▭ ◇","Flowcharts use shapes and arrows."),
  S("Which shape?",["Rounded (start/end)","Rectangle (action)","Diamond (question)"],[["Start",0],["End",0],["take umbrella",1],["Is it raining?",2]]),
  P("What do arrows show?",[["The order of steps","Yes!"],["Colours","Arrows show order."]],0)
 ],
 robots:[
  L("🤖","Sense. Think. Act."),
  R("A robot vacuum.",["Sense: it feels a wall.","Think: the program says turn.","Act: motors move it away."]),
  S("Sense, think or act?",["Sense","Think","Act"],[["light sensor",0],["touch sensor",0],["program decides",1],["motors move",2]])
 ]
});
})();
