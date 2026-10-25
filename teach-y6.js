(function(){
const K=window.PEBBLE_TEACH_KIT;if(!K)return;
const {L,R,S,P,B,H,HS}=K;

K.add("6.maths",{
 integers:[
  L("🌡️ −3 … 0 … 2","Below zero is negative. Right is bigger. Left is smaller."),
  R("From −3°C to 2°C.",["−3 to 0 is 3 steps.","0 to 2 is 2 steps.","3 + 2 = 5 degrees warmer."]),
  B("A lift goes from floor −2 to floor 4. Tap one floor at a time.",6,[["⬆️","1 floor",1]],[0,0,0,0,0,0],{total:"{n} floors",done:"6 floors up!"}),
  P("Which is smallest?",[["−8","Yes! It is furthest left."],["−2","−2 is to the right of −8."],["3","3 is above zero."]],0)
 ],
 prime:[
  L("7 = 1 × 7","A prime has exactly 2 factors: 1 and itself."),
  S("Prime or composite?",["Prime","Composite"],[["2",0],["17",0],["11",0],["21",1],["27",1],["9",1]]),
  P("Which is a square number?",[["49","Yes! 7 × 7 = 49."],["40","No whole number times itself makes 40."],["14","7 + 7 is 14. Square means 7 × 7."]],0)
 ],
 compare:[
  L("3/4 = 6/8","Make the bottoms the same. Then compare the tops."),
  R("3/4 or 5/8?",["Change 3/4 into eighths.","3/4 = 6/8.","6/8 is more than 5/8.","So 3/4 is greater."]),
  P("Which equals 2/3?",[["8/12","Yes! 2 × 4 = 8 and 3 × 4 = 12."],["6/12","6/12 is one half."],["2/6","2/6 is one third."]],0)
 ],
 "fraction-sums":[
  L("½ + ¼","Make the bottoms match. Add the tops."),
  R("1/2 + 1/4.",["1/2 = 2/4.","2/4 + 1/4.","2 + 1 = 3.","So 3/4."]),
  B("2/3 + 1/6. 2/3 is 4/6. Add 1/6. Tap sixths.",5,[["🟦","1 sixth",1]],[0,0,0,0,0],{total:"{n}/6",done:"4/6 + 1/6 = 5/6!"}),
  P("7/8 − 1/4 = ?",[["5/8","Yes! 1/4 = 2/8. 7 − 2 = 5."],["6/8","1/4 is 2 eighths, not 1."],["6/4","Keep the bottom number the same."]],0)
 ],
 decimals:[
  L("2.45 + 1.30","Line up the decimal points."),
  R("3.45 + 2.30.",["Hundredths: 5 + 0 = 5","Tenths: 4 + 3 = 7","Ones: 3 + 2 = 5","5.75"]),
  P("Estimate 19.80 + 4.25.",[["About 24","Yes! 20 + 4 = 24."],["About 2","Too small. Round each number."],["About 60","Too big. 20 + 4."]],0)
 ],
 powers:[
  L("4.5 × 100 = 450","× 10 makes each digit worth 10 times more."),
  R("3.42 × 10.",["Each digit moves one place left.","3 ones becomes 3 tens.","3.42 becomes 34.2."]),
  P("48 ÷ 100 = ?",[["0.48","Yes! Two places to the right."],["4.8","That is ÷ 10."],["4800","That multiplies."]],0)
 ],
 discount:[
  L("50% = ½ · 25% = ¼ · 10% = 1/10","Percent means out of 100."),
  R("25% off an $80 game.",["25% is one quarter.","$80 ÷ 4 = $20 off.","$80 − $20 = $60."]),
  B("Find 10% of 350. Tap tens.",35,[["🔟","10",10],["🟡","1",1]],[0,0,0,1,1,1,1,1],{done:"350 ÷ 10 = 35!"}),
  P("A $60 shirt is 50% off. Sale price?",[["$30","Yes! Half of $60 is $30."],["$10","That is too much off."],["$50","50% is half, not $10 off."]],0)
 ],
 equations:[
  L("3 × (x + 2) = 18","Undo the steps in reverse order."),
  R("3 × (x + 2) = 18.",["Undo × 3: 18 ÷ 3 = 6.","So x + 2 = 6.","Undo + 2: 6 − 2 = 4.","x = 4."]),
  B("7 + □ = 23. Build the missing number.",16,[["🔟","10",10],["🟡","1",1]],[0,1,1,1,1,1,1],{done:"7 + 16 = 23!"}),
  P("z ÷ 5 = 7. Find z.",[["35","Yes! Undo ÷ 5 with × 5."],["12","That adds."],["2","That takes away."]],0)
 ],
 coordinates:[
  L("(x, y)","Across first, then up or down. Negative is left or down."),
  R("Find (−3, 2).",["Start at (0, 0).","Go 3 left.","Go 2 up.","You are at (−3, 2)."]),
  P("(4, −2) is in which part?",[["Bottom right","Yes! Right 4, down 2."],["Top left","That needs negative x and positive y."],["Top right","−2 means down."]],0)
 ],
 measurement:[
  L("1 km = 1000 m","kilo means 1000."),
  R("2.5 kg in grams.",["1 kg = 1000 g.","2.5 × 1000 = 2500.","So 2500 g."]),
  S("Same amount?",["Equals 1 litre","Not 1 litre"],[["1000 mL",0],["1 L",0],["100 mL",1],["750 mL",1]]),
  P("750 mL = ? L",[["0.75","Yes! 750 ÷ 1000."],["7.5","That is ÷ 100."],["75","That is ÷ 10."]],0)
 ],
 angles:[
  L("📏 180° · ⭕ 360°","A straight line is 180°. Around a point is 360°."),
  R("Next to 65° on a straight line.",["The line is 180°.","180 − 65 = 115.","The other angle is 115°."]),
  B("Around a point: 90° and 120°. Build the missing angle.",150,[["📐","100°",100],["📐","50°",50],["📐","10°",10]],[0,1],{total:"{n}°",done:"90 + 120 + 150 = 360!"}),
  P("Vertically opposite 48° is…",[["48°","Yes! Opposite angles are equal."],["132°","That is next to it on a line."]],0)
 ],
 probability:[
  L("🪙","Chance goes from 0 (impossible) to 1 (certain)."),
  S("Where on the scale?",["Impossible (0)","Even (½)","Certain (1)"],[["roll a 7 on a 1–6 dice",0],["heads on a coin",1],["the Sun rises tomorrow",2]]),
  P("2 green 🟢 and 6 blue 🔵. Chance of green?",[["1/4","Yes! 2 out of 8 is 1/4."],["1/3","Count all 8 counters."],["2/6","2 out of 8, not 6."]],0)
 ],
 patterns:[
  L("3 · 7 · 11 · 15","Find how each number changes."),
  R("5, 9, 13, 17 …",["9 − 5 = 4.","It adds 4 each time.","17 + 4 = 21."]),
  P("Rule for 4, 7, 10, 13?",[["Start at 4, add 3","Yes! Each jump is 3."],["Add 4","7 − 4 is 3, not 4."],["Double it","4 doubled is 8, not 7."]],0)
 ],
 timetable:[
  L("🚌 14:25 → 15:10","Count to the next hour. Then add."),
  R("09:40 to 10:15.",["09:40 to 10:00 is 20 min.","10:00 to 10:15 is 15 min.","20 + 15 = 35 min."]),
  B("Arrive 14:10. Bus leaves 14:25. Wait time?",15,[["⏱️","5 min",5],["⏱️","10 min",10]],[1,0],{total:"{n} minutes",done:"15 minutes!"}),
  P("16:30 in 12-hour time?",[["4:30 pm","Yes! 16 − 12 = 4."],["6:30 pm","16 − 12 is 4."],["4:30 am","After 12:00 is pm."]],0)
 ],
 area:[
  L("⬜⬜⬜⬜⬜⬜","Area = length × width."),
  B("A 6 by 4 garden. Tap rows of 6.",24,[["🟩","row of 6",6]],[0,0,0,0],{total:"{n} m²",done:"4 rows of 6 = 24 m²!"}),
  P("Area 30 cm², width 5 cm. Length?",[["6 cm","Yes! 30 ÷ 5 = 6."],["25 cm","That takes away."],["150 cm","That multiplies."]],0)
 ],
 statistics:[
  L("2, 4, 4, 7","Mode: most common. Range: biggest − smallest."),
  H("Find the mode. Tap each number that comes most often.","2 3 3 5 8",["3"],"Which number is there twice?"),
  R("Range of 4, 6, 9, 12.",["Biggest: 12.","Smallest: 4.","12 − 4 = 8."]),
  P("Which group has the wider range?",[["A: 1, 5, 9","Yes! 9 − 1 = 8."],["B: 3, 4, 5","5 − 3 is only 2."]],0)
 ]
});

K.add("6.english",{
 objective:[
  L("✅ fact · 💭 opinion","A fact can be checked. An opinion is a judgement."),
  S("Fact or opinion?",["Fact","Opinion"],[["The park has two courts.",0],["The library closes at 5 pm.",0],["Our park is the best.",1],["This game is boring.",1]]),
  P("Which phrase shows bias?",[["Only a fool would disagree.","Yes. It attacks other views."],["Some people disagree.","That is fair and calm."]],0)
 ],
 persuade:[
  L("📣","Claim. Reasons. Evidence."),
  S("Claim or reason?",["Claim","Reason"],[["Our school should plant more trees.",0],["Trees cool the playground.",1],["Shade protects us from sun.",1]]),
  H("Tap the loaded word.","It was a disastrous decision.",["disastrous"],"Which word has strong feeling?")
 ],
 structures:[
  L("📋","Different texts are built in different ways."),
  S("Which text type?",["Instructions","Explanation"],[["Ingredients then steps",0],["1. Mix. 2. Bake.",0],["Rain falls, so rivers rise",1],["Causes and effects",1]]),
  P("Why use subheadings in a report?",[["To group information","Yes! Like facts go together."],["To make it longer","They help the reader find things."]],0)
 ],
 cohesion:[
  L("🔗","Link words help sentences fit together."),
  H("Tap the word that means the turtle.","The turtle swam away. It was tired.",["It"],"Which word stands for the turtle?"),
  S("What does it signal?",["Contrast","Result"],[["However",0],["But",0],["As a result",1],["So",1]])
 ],
 complex:[
  L("Although it rained, we played.","A dependent clause cannot stand alone."),
  HS("Tap the dependent clause.",["When the bell rang,","the class left."],[0],"Which part cannot stand alone?"),
  P("Finish: Although the path was steep, …",[["we reached the top.","Yes! A main clause finishes it."],["because it was steep.","That is another dependent clause."]],0)
 ],
 imagery:[
  L("☁️ = cotton wool","A metaphor says one thing is another."),
  S("Which type?",["Simile","Metaphor","Personification","Hyperbole"],[["The sea glittered like glass.",0],["The classroom was a beehive.",1],["The wind whispered.",2],["I told you a million times!",3]]),
  H("Tap the word that makes it a simile.","The sea glittered like glass.",["like"],"Similes use like or as.")
 ],
 infer:[
  L("🔍 + 🧠","Clue + what you know = inference."),
  HS("Mina expects rain. Tap the clues.",["Mina packed an umbrella.","Clouds gathered.","She ate toast."],[0,1],"What tells us rain may come?"),
  P("The door creaked. Ari held their breath. Ari feels…",[["Nervous","Yes! Holding breath is a clue."],["Bored","The creak builds tension."]],0)
 ],
 styles:[
  L("📖📖","Two stories can share one theme."),
  P("A theme is…",[["An important idea in a text","Yes! Like courage or friendship."],["The title","The title names the book."]],0),
  HS("Tap the sentence that builds suspense.",["Footsteps echoed in the empty corridor.","We had toast for breakfast."],[0],"Which one makes you feel tense?")
 ],
 commas:[
  L(",","A comma goes after an opening clause."),
  H("Where does the comma go? Tap the word just before it.","Although it was late we kept reading.",["late"],"Where does the opening clause end?"),
  P("Which is correct?",[["Before we left, we packed lunch.","Yes! The comma ends the opening clause."],["Before, we left we packed lunch.","The comma is in the wrong place."]],0)
 ],
 roots:[
  L("pre + dict","Prefix at the front. Suffix at the end."),
  S("What does the prefix mean?",["before","again","not"],[["pre-view",0],["pre-dict",0],["re-write",1],["re-do",1],["im-possible",2]]),
  P("Which suffix turns create into a noun?",[["-ion","Yes! creation."],["-ly","-ly makes adverbs."],["-ed","-ed shows past."]],0)
 ],
 editing:[
  L("✏️👀","Choose words for your reader."),
  R("Edit a draft.",["Who is the reader?","What is the purpose?","Check the paragraphs.","Fix spelling and punctuation."]),
  P("Which adds precise description?",[["The bird darted across the path.","Yes! darted is precise."],["The bird went across the path.","went is vague."]],0)
 ],
 speech6:[
  L("💬","Direct speech: exact words in speech marks."),
  S("Direct or indirect?",["Direct","Indirect"],[["Tia said, \"I like soccer.\"",0],["Sam said, \"I will help.\"",0],["Tia said that she liked soccer.",1],["Sam said that he would help.",1]]),
  P("Change: Ali said, \"I am tired.\"",[["Ali said that he was tired.","Yes! No speech marks. I becomes he."],["Ali said that I am tired.","Change I to he."]],0)
 ]
});

K.add("6.science",{
 habitats:[
  L("🐸💧","Living things need water, warmth and light."),
  S("Physical condition or living thing?",["Physical condition","Living thing"],[["water",0],["temperature",0],["sunlight",0],["frog",1],["reed",1]]),
  P("The pond dried up. What is supported?",[["Fewer frogs were seen.","Yes! It matches what was seen."],["Frogs moved to the Moon.","No evidence for that."]],0)
 ],
 solar:[
  L("🌍🔄☀️","Earth spins: day and night. Earth orbits: one year."),
  R("Why seasons?",["Earth is tilted.","It orbits the Sun.","In December, the south tilts to the Sun.","Longer days. Summer!"]),
  P("Which is an Australian summer month?",[["January","Yes!"],["July","July is winter here."]],0)
 ],
 circuits:[
  L("🔋➖💡","A circuit needs a closed loop."),
  S("Conductor or insulator?",["Conductor","Insulator"],[["copper wire",0],["foil",0],["plastic",1],["rubber",1],["wood",1]]),
  P("An open switch…",[["Breaks the loop","Yes! The light goes off."],["Makes it brighter","No path, no current."]],0)
 ],
 changes:[
  L("🧊 ↔ 💧 · 🥚 → 🍳","Some changes undo. Some do not."),
  S("Reversible or irreversible?",["Reversible","Irreversible"],[["ice melting",0],["chocolate melting",0],["cooking an egg",1],["iron rusting",1]]),
  P("A sign of a chemical change is…",[["A new substance","Yes!"],["Changing shape","Shape change is physical."]],0)
 ],
 adapt6:[
  L("🐪","Wide feet stop a camel sinking in sand."),
  S("Structural or behavioural?",["Structural (body)","Behavioural (action)"],[["thick fur",0],["wide feet",0],["sharp claws",0],["migrating",1],["hunting at night",1]]),
  P("Adaptations develop…",[["Over many generations","Yes! Very slowly."],["Overnight","It takes a very long time."]],0)
 ],
 light6:[
  L("🔦➡️","Light travels in straight lines."),
  S("How much light gets through?",["Transparent","Translucent","Opaque"],[["clear glass",0],["baking paper",1],["frosted glass",1],["wood",2],["a book",2]]),
  P("A mirror shows an image by…",[["Reflecting light","Yes! Light bounces off."],["Making light","A mirror is not a light source."]],0)
 ],
 energy6:[
  L("🔌 → 💡🔥","Energy changes form. It is not used up."),
  R("A lamp.",["Electrical energy goes in.","Light comes out.","Heat comes out too."]),
  S("Renewable or not?",["Renewable","Not renewable"],[["☀️ sunlight",0],["💨 wind",0],["coal",1],["petrol",1]])
 ],
 moon6:[
  L("🌑🌒🌓🌔🌕","The Moon reflects sunlight."),
  R("The Moon orbits Earth.",["🌑 New moon","🌒 Crescent","🌓 Quarter","🌔 Gibbous","🌕 Full moon"]),
  P("Phases repeat about every…",[["29.5 days","Yes! About a month."],["1 day","Earth spins in 1 day."],["1 year","Earth orbits the Sun in 1 year."]],0)
 ],
 mixtures6:[
  L("🧂💧","A mixture can be separated."),
  S("How to separate?",["Magnet 🧲","Sieve","Evaporate"],[["iron from sand",0],["rocks from sand",1],["salt from water",2]]),
  P("Filtering separates…",[["Solids from liquids","Yes! Like sand from water."],["Salt from water","Salt dissolves. Use evaporation."]],0)
 ],
 reaction6:[
  L("🫧","Bubbles can mean a new substance."),
  S("Chemical change or not?",["Chemical","Not chemical"],[["baking a cake",0],["iron rusting",0],["fizzing soda and vinegar",0],["cutting paper",1],["ice melting",1]]),
  P("Chemical changes are often…",[["Hard to reverse","Yes! You cannot unbake a cake."],["Easy to undo","Melting is easy to undo. Baking is not."]],0)
 ],
 variables6:[
  L("🚁","Change one thing. Measure one thing. Keep the rest the same."),
  S("Paper helicopter test.",["Change","Measure","Keep the same"],[["wing length",0],["fall time",1],["paper size",2],["drop height",2]]),
  P("Why repeat trials?",[["To check results","Yes! It makes results reliable."],["To change the answer","We repeat to check."]],0)
 ],
 habitat6b:[
  L("🌿 → 🐛 → 🐸 → 🐍","A food web joins food chains."),
  S("What job?",["Producer","Consumer","Decomposer"],[["🌿 grass",0],["🌳 tree",0],["🐸 frog",1],["🦅 eagle",1],["🍄 fungi",2],["🪱 worm",2]]),
  P("If frogs disappear, insects may…",[["Increase","Yes! Fewer frogs eat them."],["Vanish too","Frogs eat insects. Fewer frogs, more insects."]],0)
 ]
});

K.add("6.hass",{
 federation:[
  L("1901","Six colonies joined. Australia became one nation."),
  R("Federation.",["6 British colonies.","Joined on 1 January 1901.","A national government began.","States kept some powers."]),
  P("A fair history question is…",[["Who was left out?","Yes. Not everyone had equal rights."],["Was it the best day ever?","That is an opinion."]],0)
 ],
 migration:[
  L("✈️🏡","People move for family, work, study or safety."),
  S("Reason to move?",["Family or work","Safety"],[["join a parent",0],["a new job",0],["escape war",1],["escape danger",1]]),
  P("A firsthand source is…",[["A migrant's recorded interview","Yes! Their own words."],["A guess on a website","That is not firsthand."]],0)
 ],
 asia:[
  L("🇦🇺🌏","Countries link through trade, travel and culture."),
  S("Trade or culture?",["Trade","Culture"],[["selling wheat",0],["buying cars",0],["festival food",1],["language classes",1]]),
  P("Trade means…",[["Buying and selling","Yes! Goods and services."],["Flying a plane","That is transport."]],0)
 ],
 government:[
  L("🏛️","Parliament makes laws. Courts apply them."),
  S("Which level?",["Local","State","Federal"],[["rubbish collection",0],["public schools",1],["immigration",2]]),
  P("Rule of law means…",[["Everyone must follow laws","Yes! Leaders too."],["Leaders can ignore laws","No one is above the law."]],0)
 ],
 economics:[
  L("💰⚖️","We choose. Each choice has a trade-off."),
  S("Need or want?",["Need","Want"],[["safe drinking water",0],["shelter",0],["new game",1],["lollies",1]]),
  P("A trade-off means…",[["Giving up one thing to get another","Yes!"],["Getting everything","Resources are limited."]],0)
 ],
 referendum6:[
  L("🗳️ 1967","A referendum is a vote to change the Constitution."),
  R("The 1967 referendum.",["Australians voted on changes about Aboriginal and Torres Strait Islander Peoples.","About 90 percent voted Yes.","The Commonwealth could make laws for them.","They were counted in the census."]),
  P("Was it the end of the work for equal rights?",[["No, it was one step","Yes. The work continued."],["Yes, it was the end","It was an important step, not the end."]],0)
 ],
 people6:[
  L("🇦🇺","Some people changed Australia by taking action."),
  S("Match the person.",["Edith Cowan","Vincent Lingiari","Eddie Mabo"],[["first woman in an Australian parliament, 1921",0],["Wave Hill walk-off, 1966",1],["native title High Court case, 1992",2]]),
  P("The Mabo decision recognised…",[["Rights to land before colonisation","Yes. This is native title."],["A new state","It was about land rights."]],0)
 ],
 goldrush6:[
  L("⛏️ 1851","Gold was found. People came from many countries."),
  R("The gold rushes.",["Gold found in 1851.","Towns grew fast.","Miners paid a licence fee.","1854: the Eureka Stockade protest."]),
  P("The Eureka Stockade was…",[["A protest by miners","Yes. It helped lead to more democratic rights."],["A gold mine","It was a protest at Ballarat."]],0)
 ],
 rights6:[
  L("⚖️","Rights and responsibilities go together."),
  S("Right or responsibility?",["Right","Responsibility"],[["to learn",0],["to be safe",0],["follow laws",1],["respect others",1]]),
  P("You have the right to learn. Your responsibility is…",[["Let others learn too","Yes!"],["Talk over others","That stops others learning."]],0)
 ],
 sustain6:[
  L("♻️","Meet our needs without harming the future."),
  S("Sustainable or not?",["Sustainable","Not sustainable"],[["solar panels",0],["planting trees",0],["reusing a bottle",0],["leaving lights on",1],["dropping litter",1]]),
  P("Reduce, reuse and…",[["Recycle","Yes!"],["Replace","The third one is recycle."]],0)
 ],
 global6:[
  L("🍌🚚🛒","A banana grown in Queensland travels to a shop."),
  S("Benefit or challenge?",["Benefit","Challenge"],[["new ideas",0],["more jobs",0],["pollution",1],["unfair work",1]]),
  P("Goods travel by…",[["Ship, plane and truck","Yes!"],["Email","Email moves messages, not goods."]],0)
 ],
 mapping6:[
  L("🌐","Latitude: north or south. Longitude: east or west."),
  S("Latitude or longitude?",["Latitude","Longitude"],[["the equator, 0°",0],["lines run east-west",0],["prime meridian, 0°",1],["lines run north-south",1]]),
  P("Australia is in the…",[["Southern Hemisphere","Yes! South of the equator."],["Northern Hemisphere","We are below the equator."]],0)
 ]
});

K.add("6.technologies",{
 computer:[
  L("📱","Processor. Memory. Storage."),
  S("Which part?",["Processor","RAM (now)","Storage (keeps)"],[["follows instructions",0],["the app you are using now",1],["saved photos",2]]),
  P("What keeps files when the device is off?",[["Storage","Yes!"],["RAM","RAM forgets when off."]],0)
 ],
 binary:[
  L("8 · 4 · 2 · 1","Binary uses 0 and 1."),
  R("101 in binary.",["1 in the 4s place: 4","0 in the 2s place: 0","1 in the 1s place: 1","4 + 0 + 1 = 5"]),
  B("Make 7 in binary. Tap each place value once.",7,[["4️⃣","4",4],["2️⃣","2",2],["1️⃣","1",1]],[0,1,2],{done:"4 + 2 + 1 = 7. That is 111!"})
 ],
 "code-loops":[
  L("🔁 ❓","A loop repeats. IF chooses."),
  S("Loop or IF?",["Loop","IF"],[["repeat 5 times",0],["draw 6 stars",0],["if it rains, take a coat",1],["if score > 10, win",1]]),
  P("A variable is…",[["A named value that can change","Yes! Like score."],["A picture","A variable stores a value."]],0)
 ],
 footprint:[
  L("👣💻","What you post can stay online."),
  S("Okay to share publicly?",["Okay","Keep private"],[["your favourite colour",0],["your home address",1],["your password",1]]),
  P("Before sharing a friend's photo…",[["Ask permission","Yes! And ask an adult if unsure."],["Just post it","Always ask first."]],0)
 ],
 algo6:[
  L("⬭ ▭ ◇","Oval: start or end. Rectangle: action. Diamond: decision."),
  R("Trace with 15.",["Input: 15.","Is 15 > 10?","Yes.","Say 'big'."]),
  P("Trace with 4. It says…",[["small","Yes! 4 is not more than 10."],["big","4 is less than 10."]],0)
 ],
 vars6:[
  L("❤️ lives = 3","A variable stores a value that can change."),
  B("lives = 3. Hit once: lives − 1. Tap hearts to show lives now.",2,[["❤️","1 life",1]],[0,0],{total:"lives = {n}",done:"3 − 1 = 2 lives!"}),
  P("score = 8. Is score > 10 true?",[["False","Yes! 8 is not more than 10."],["True","8 is less than 10."]],0)
 ],
 spread6:[
  L("📊 A1 B1","Columns are letters. Rows are numbers."),
  R("=A1+A2",["A1 = 4","A2 = 3","= adds them.","The cell shows 7."]),
  P("Cell B3 is in column…",[["B","Yes! Letter first."],["3","3 is the row."]],0)
 ],
 cyber6:[
  L("🎣📧","Phishing tries to trick you."),
  S("Safe or suspicious?",["Safe","Suspicious"],[["long unique passphrase",0],["two-factor code",0],["'Click now or lose your account!'",1],["a stranger asks for your password",1]]),
  P("Not sure about a link?",[["Do not click. Ask an adult.","Yes!"],["Click to check","Do not click."]],0)
 ],
 internet6:[
  L("📦📦📦","Data travels in small packets."),
  R("Open a website.",["Your device asks a server.","The page is split into packets.","Routers send them along.","Packets join up again."]),
  P("A server…",[["Stores websites","Yes!"],["Sends packets the right way","That is a router."]],0)
 ],
 ai6:[
  L("🤖📸","AI finds patterns in lots of data."),
  S("True about AI?",["True","False"],[["AI can make mistakes",0],["people decide how AI is used",0],["AI is always right",1]]),
  P("When should you check AI answers?",[["When they are important","Yes!"],["Never","AI can be wrong."]],0)
 ],
 systems6:[
  L("➡️⚙️➡️","Input. Process. Output."),
  S("Thermostat.",["Input","Process","Output"],[["senses temperature",0],["compares to set value",1],["turns heater on",2]]),
  P("An automatic light turns on. That is the…",[["Output","Yes!"],["Input","Sensing the dark is the input."]],0)
 ],
 project6:[
  L("🐦🏠","Criteria tell us if a design works."),
  R("Bird feeder project.",["Set criteria: weatherproof, easy to fill.","Sketch ideas.","Make it.","Test it against the criteria."]),
  P("Evaluating means…",[["Judging how well it worked","Yes!"],["Buying materials","That is part of the plan."]],0)
 ]
});
})();
