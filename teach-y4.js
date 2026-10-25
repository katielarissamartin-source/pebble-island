(function(){
const K=window.PEBBLE_TEACH_KIT;if(!K)return;
const {L,R,S,P,B,H,HS}=K;

K.add("4.maths",{
 decimal:[
  L("2️⃣ . 4️⃣ 6️⃣","After the point come tenths, then hundredths.","2.46 is 2 ones, 4 tenths and 6 hundredths."),
  B("Build 0.35. Tap tenths and hundredths.",35,[["🟩","0.1",10],["🟡","0.01",1]],[0,0,0,1,1,1,1,1],{total:"{n} hundredths",done:"3 tenths and 5 hundredths. 0.35!"}),
  P("In 3.08, which digit is in the hundredths place?",[["8","Yes! Second place after the point."],["0","0 is in the tenths place."],["3","3 is the ones."]],0)
 ],
 fractions:[
  L("🍕 1/2 = 2/4","Equivalent fractions are the same amount."),
  R("Make 1/2 into quarters.",["1/2","Multiply top and bottom by 2.","1 × 2 = 2. 2 × 2 = 4.","1/2 = 2/4"]),
  P("Which is equivalent to 2/3?",[["4/6","Yes! Double the top and the bottom."],["2/6","Only the bottom changed."],["3/4","That is a different amount."]],0)
 ],
 "place-power":[
  L("34 ➡️ 340","Times 10 makes each digit worth ten times as much."),
  R("34 × 10.",["The 3 tens become 3 hundreds.","The 4 ones become 4 tens.","A 0 fills the ones.","34 × 10 = 340"]),
  P("70 ÷ 10 = ?",[["7","Yes! Divide does the reverse."],["700","That multiplied."],["70","Dividing changes it."]],0)
 ],
 money:[
  L("💵","Multiply for equal prices. Subtract for change."),
  B("Three notebooks at $4 each. Tap a notebook.",12,[["📓","$4",4]],[0,0,0],{total:"${n}",done:"3 × $4 = $12!"}),
  P("You pay $20 for $12 of notebooks. Change?",[["$8","Yes! $20 − $12 = $8."],["$32","That adds."],["$12","That is the cost."]],0)
 ],
 times4:[
  L("✖️","Use facts you know to find new ones."),
  R("6 × 7 the easy way.",["5 × 7 = 35","Add one more 7.","35 + 7 = 42","6 × 7 = 42"]),
  P("8 × 6 = ?",[["48","Yes! Double 4 × 6 = 24. 24 + 24 = 48."],["42","That is 6 × 7."],["54","That is 9 × 6."]],0)
 ],
 divide4:[
  L("🍪🍪🍪🍪 🍪🍪🍪🍪 🍪🍪🍪🍪 🍪🍪","A remainder is what is left over."),
  R("Share 14 cookies into groups of 4.",["Group 1: 4 used","Group 2: 8 used","Group 3: 12 used","2 left. Not enough for a group.","14 ÷ 4 = 3 remainder 2"]),
  P("13 ÷ 4 = ?",[["3 remainder 1","Yes! 4 × 3 = 12. 1 left."],["3","There is 1 left over."],["4 remainder 1","4 × 4 = 16. Too many."]],0)
 ],
 fracadd:[
  L("2/8 + 3/8","Same bottom number? Add the tops. Keep the bottom."),
  B("2/8 + 3/8. Tap eighths to build it.",5,[["🍰","1/8",1]],[0,0,0,0,0],{total:"{n}/8",done:"2/8 + 3/8 = 5/8!"}),
  P("4/5 − 1/5 = ?",[["3/5","Yes! 4 − 1 = 3. Keep the 5."],["3/0","Keep the bottom number."],["5/5","That adds."]],0)
 ],
 decimals4:[
  L("0.5 = 1/2","The first place after the point is tenths."),
  S("Tenths or hundredths in 4.36?",["Tenths place","Hundredths place"],[["3",0],["6",1]]),
  P("Which is bigger?",[["0.7","Yes! 7 tenths."],["0.07","Only 7 hundredths."]],0)
 ],
 area4:[
  L("🟦🟦🟦🟦🟦\n🟦🟦🟦🟦🟦\n🟦🟦🟦🟦🟦","Area is the squares inside. Length × width."),
  B("A 5 by 3 rectangle. Tap a row of 5 squares.",15,[["🟦","row of 5",5]],[0,0,0],{total:"{n} squares",done:"5 × 3 = 15 square units!"}),
  P("Perimeter of a 5 by 3 rectangle?",[["16","Yes! 5 + 3 + 5 + 3."],["15","15 is the area."],["8","Count all 4 sides."]],0)
 ],
 angles4:[
  L("📐","A right angle is 90°. A straight line is 180°."),
  S("Acute or obtuse?",["Acute (under 90°)","Obtuse (90° to 180°)"],[["30°",0],["45°",0],["120°",1],["150°",1]]),
  P("A right angle is...",[["90 degrees","Yes!"],["180 degrees","That is a straight line."]],0)
 ],
 time4:[
  L("🕒 ➡️ 15:00","After noon, add 12.","3 pm is 15:00."),
  R("14:30 to 15:10. How long?",["14:30 to 15:00 is 30 minutes.","15:00 to 15:10 is 10 minutes.","30 + 10 = 40 minutes."]),
  P("18:00 is...",[["6 pm","Yes! 18 − 12 = 6."],["8 pm","8 pm is 20:00."]],0)
 ],
 data4:[
  L("📊","Read the bar against the scale."),
  B("A scale goes up in 2s. A bar reaches 3 steps. Tap a step.",6,[["⬆️","2",2]],[0,0,0],{done:"2 + 2 + 2 = 6!"}),
  P("Votes: 4, 7, 2. The total is...",[["13","Yes! 4 + 7 + 2."],["7","That is the biggest."],["11","Add all three."]],0)
 ]
});

K.add("4.english",{
 fact:[
  L("📏 💖","Facts can be checked. Opinions are feelings."),
  S("Fact or opinion?",["Fact","Opinion"],[["A koala is a marsupial.",0],["A week has seven days.",0],["Rainy days are the best.",1],["That was amazing.",1]]),
  H("Tap the opinion word.","It was a wonderful game.",["wonderful"],"Which word shows a feeling?")
 ],
 clauses:[
  L("🧩 + 🧩","A main clause stands alone. A dependent clause cannot."),
  H("Tap the word that shows a reason.","We stayed inside because it rained.",["because"],"Which joining word gives a reason?"),
  P("_____ it was cold, we went swimming.",[["Although","Yes! It shows a surprise."],["Because","Cold is not a reason to swim."],["So","So does not fit at the start."]],0)
 ],
 infer:[
  L("🔍","Clues plus what you know help you infer."),
  HS("Tap the clue that shows a storm is coming.",["Max ate lunch.","Thunder rolled and the sky grew dark.","Max wore red shoes."],[1],"Which detail is about the weather?"),
  P("The puppy waited by its empty bowl and whined. It wants...",[["Food","Yes! Empty bowl is the clue."],["A bath","No clue about a bath."]],0)
 ],
 tension:[
  L("😬","Problems and delays make a story tense."),
  HS("Tap the sentence with an obstacle.",["Noor walked to the park.","The gate was locked when Noor arrived."],[1],"Which sentence stops Noor?"),
  P("A story's resolution is...",[["How the problem is worked out","Yes!"],["The first page","That is the beginning."]],0)
 ],
 apostrophe:[
  L("do not ➡️ don't","An apostrophe shows missing letters or belonging."),
  S("Missing letters or belonging?",["Missing letters","Belonging"],[["can't",0],["it's",0],["the dog's bone",1],["the cat's toy",1]]),
  P("The girls' room means...",[["Room of many girls","Yes! s' means many owners."],["Room of one girl","One girl would be girl's."]],0)
 ],
 adverbs4:[
  L("🏃 ⏰ 📍","Adverbs tell how, when or where."),
  H("Tap the adverb.","He spoke quietly.",["quietly"],"Which word tells how he spoke?"),
  S("How, when or where?",["How","When","Where"],[["slowly",0],["after lunch",1],["tomorrow",1],["under the bridge",2]])
 ],
 paragraph4:[
  L("📄","Topic sentence. Detail sentences. Closing sentence."),
  HS("Tap the topic sentence.",["They are friendly.","Dogs make good pets.","They love walks."],[1],"Which one gives the main idea?"),
  P("Start a new paragraph...",[["For a new idea","Yes!"],["After every sentence","Group sentences about one idea."]],0)
 ],
 persuade4:[
  L("📣","Persuasive writing wants the reader to agree."),
  R("A persuasive plan.",["Opinion: We need more trees.","Reason: Trees give shade.","Reason: Birds live in them.","Ask: Please plant a tree!"]),
  P("A closing sentence should...",[["Ask the reader to act","Yes!"],["Change the topic","Finish with a clear request."]],0)
 ],
 setting4:[
  L("👀👂👃✋👅","The setting is where and when. Use the senses."),
  S("Which sense?",["Hearing","Smell"],[["Water dripped.",0],["The wind creaked.",0],["It smelled of wet stone.",1],["Smoke filled the air.",1]]),
  P("Which is more descriptive?",[["The ancient forest creaked in the wind.","Yes! You can see and hear it."],["There was a forest.","Few details."]],0)
 ],
 vocab4:[
  L("un + happy","A prefix goes at the start. A suffix goes at the end."),
  S("Prefix or suffix?",["Prefix","Suffix"],[["un-",0],["re-",0],["-ful",1],["-less",1]]),
  P("Hopeless means...",[["Without hope","Yes! -less means without."],["Full of hope","That is hopeful."]],0)
 ],
 simile4:[
  L("🦁","A simile uses like or as. A metaphor says one thing is another."),
  S("Simile or metaphor?",["Simile","Metaphor"],[["as quiet as a mouse",0],["ran like the wind",0],["The classroom was a zoo.",1],["Her smile was sunshine.",1]]),
  H("Tap the simile word.","He ran like the wind.",["like"],"Look for like or as.")
 ],
 nonfiction4:[
  L("📚","Non-fiction has headings, an index and a glossary."),
  S("Which part helps?",["Index","Glossary"],[["find the page for volcano",0],["find a page fast",0],["what a hard word means",1],["explains tricky words",1]]),
  P("A caption goes with a...",[["Picture","Yes!"],["Page number","Captions explain pictures."]],0)
 ]
});

K.add("4.science",{
 foodchain4:[
  L("🌱 ➡️ 🐇 ➡️ 🦊","A food chain shows who eats what."),
  R("Follow the arrows.",["Grass makes food from sunlight. A producer.","The rabbit eats grass. A herbivore.","The fox eats the rabbit. A carnivore.","Arrows show energy moving."]),
  S("Producer, herbivore or carnivore?",["Producer","Herbivore","Carnivore"],[["grass",0],["rabbit",1],["fox",2]])
 ],
 classify4:[
  L("❓✅❌","A key sorts living things with yes or no questions."),
  S("Does it have feathers?",["Yes","No"],[["sparrow",0],["kookaburra",0],["koala",1],["frog",1]]),
  P("Which is a good key question?",[["Does it have feathers?","Yes! You can see it."],["Is it nice?","That is an opinion."]],0)
 ],
 envchange4:[
  L("🔥🌊☀️","Habitats can change because of fire, flood, drought or people."),
  R("After a bushfire.",["The fire burns the bush.","Some animals move away.","Rain falls.","New green shoots grow. 🌱"]),
  P("People can help by...",[["Planting trees","Yes!"],["Leaving rubbish","Keep rubbish out of nature."]],0)
 ],
 lifecycle4:[
  L("🥚 🐛 🫘 🦋","A life cycle is the stages of a life."),
  R("A butterfly's life.",["Egg 🥚","Caterpillar 🐛","Pupa","Adult butterfly 🦋"]),
  P("A tadpole grows into a...",[["Froglet","Yes! Then an adult frog."],["Butterfly","Caterpillars become butterflies."]],0)
 ],
 gravity4:[
  L("⚽⬇️🌍","Gravity pulls things toward Earth."),
  R("Drop a ball.",["You let go.","Gravity pulls it.","It falls down.","Nothing touched it."]),
  P("Gravity works...",[["Without touching","Yes!"],["Only with a push","It pulls without touching."]],0)
 ],
 friction4:[
  L("🛹","Friction slows things when surfaces rub."),
  S("More or less friction?",["More friction","Less friction"],[["rough carpet",0],["grass",0],["smooth tiles",1],["ice",1]]),
  P("Why do shoes have grip?",[["To give friction","Yes! So you do not slip."],["To look nice","Grip stops slipping."]],0)
 ],
 magnets4:[
  L("🧲","Opposite poles attract. Same poles repel."),
  S("Attract or repel?",["Attract","Repel (push apart)"],[["N and S",0],["S and N",0],["N and N",1],["S and S",1]]),
  P("A magnet picks up...",[["Iron","Yes!"],["Wood","Wood is not magnetic."]],0)
 ],
 erosion4:[
  L("🌬️🌊🧊","Wind, water and ice slowly wear away rock."),
  R("A river makes a valley.",["Water flows over rock.","Tiny bits wash away.","This goes on for a long time.","A valley forms."]),
  P("Which can cause erosion?",[["Water and wind","Yes!"],["Sunlight only","Water and wind wear rock away."]],0)
 ],
 volcano4:[
  L("🌋","Plates move. Hot melted rock escapes."),
  S("Magma or lava?",["Magma (underground)","Lava (on the surface)"],[["melted rock deep down",0],["rock under the crust",0],["flows down the volcano",1],["glows on the ground",1]]),
  P("Earthquakes happen when...",[["Plates slip","Yes!"],["It rains","Moving plates cause them."]],0)
 ],
 rocks4:[
  L("🪨","Igneous, sedimentary and metamorphic rocks."),
  S("Which rock?",["Igneous","Sedimentary"],[["cooled lava",0],["cooled magma",0],["sandstone",1],["has fossils",1]]),
  P("A fossil shows...",[["Life from long ago","Yes!"],["Tomorrow's weather","Fossils are from the past."]],0)
 ],
 solids4:[
  L("🧽🧥","Materials have properties."),
  S("Absorbent or waterproof?",["Absorbent","Waterproof"],[["sponge",0],["towel",0],["raincoat",1],["umbrella",1]]),
  P("To compare strength you should...",[["Test them","Yes!"],["Guess","Testing is fair."]],0)
 ],
 test4:[
  L("❓🔮🧪📋","Ask. Predict. Test fairly. Record."),
  S("Ramp test. Change or keep the same?",["Change","Keep the same"],[["ramp height",0],["the toy car",1],["where it starts",1]]),
  P("Results are best recorded in...",[["A table","Yes!"],["Your head","Write it in a table."]],0)
 ]
});

K.add("4.hass",{
 country4:[
  L("🏞️ 💧 ☁️","Aboriginal and Torres Strait Islander Peoples have cared for Country for tens of thousands of years."),
  R("Caring for Country includes.",["Looking after land and waters.","Looking after plants and animals.","Looking after stories.","Elders pass on this knowledge."]),
  P("Who passes on traditional knowledge?",[["Elders","Yes."],["Tourists","Elders pass it on."]],0)
 ],
 firstcontact4:[
  L("🗺️","Before 1788, many First Nations peoples lived across Australia.","Each had their own languages and laws."),
  R("What happened.",["In 1788 the First Fleet came from Britain.","A colony began at Sydney Cove.","Colonisation took land.","It harmed many First Nations people.","First Nations cultures continue today."]),
  P("The First Fleet arrived in...",[["1788","Yes."],["1988","It was 200 years earlier."]],0)
 ],
 explorers4:[
  L("⛵🧭⭐","Explorers used maps, compasses and stars."),
  R("1770.",["James Cook sailed along the east coast.","He drew maps.","First Nations people already lived there.","The land was not new to them."]),
  P("Maps change because...",[["People learn more","Yes!"],["Land moves every day","We learn more over time."]],0)
 ],
 mapscale4:[
  L("🗺️ 1 cm = 1 km","A scale shows real distance."),
  B("1 cm = 2 km. A path is 4 cm. Tap each cm.",8,[["📏","1 cm",2]],[0,0,0,0],{total:"{n} km",done:"4 cm is 8 km!"}),
  P("Grid square B3 uses...",[["A letter and a number","Yes!"],["Two letters","One letter, one number."]],0)
 ],
 environ4:[
  L("🌴🏜️🏔️🌊","Australia has many environments."),
  S("Which environment?",["Rainforest","Desert"],[["the Daintree",0],["lots of rain",0],["very dry",1],["red sand",1]]),
  P("Different environments have different...",[["Plants and animals","Yes!"],["Sky colours","They have different living things."]],0)
 ],
 steward4:[
  L("♻️💧💡","Small actions add up."),
  S("Helps or harms?",["Helps","Harms"],[["recycling",0],["reusable bottle",0],["saving water",0],["dropping litter",1]]),
  P("Who can look after the environment?",[["Everyone","Yes!"],["Only councils","Families and schools help too."]],0)
 ],
 rules4:[
  L("⚖️","Laws keep people safe and fair."),
  S("Who does it?",["Parliament","Courts"],[["makes laws",0],["changes laws",0],["decide if a law was broken",1]]),
  P("A seatbelt law helps to...",[["Keep people safe","Yes!"],["Slow cars down","It keeps people safe."]],0)
 ],
 vote4:[
  L("🗳️","In a democracy people have a say."),
  B("Cat has 3 votes. Fish has 5. Tap to count the fish votes.",5,[["✋","1 vote",1]],[0,0,0,0,0],{total:"{n} votes",done:"5 votes beat 3. Fish wins!"}),
  P("A secret ballot means...",[["Nobody sees your vote","Yes!"],["Everyone sees it","It is secret."]],0)
 ],
 business4:[
  L("🥖 💇","Goods are things. Services are things people do."),
  S("Good or service?",["Good","Service"],[["bread",0],["shoes",0],["haircut",1],["dog walking",1]]),
  P("Profit is...",[["Money left after costs","Yes!"],["All money taken","Costs come off first."]],0)
 ],
 choices4:[
  L("💰📋","A budget is a plan for money."),
  S("Income or expense?",["Income (in)","Expense (out)"],[["pocket money",0],["birthday gift money",0],["buying lunch",1],["a toy",1]]),
  P("You spend $5 on a toy, not a book. The book is your...",[["Opportunity cost","Yes! It is what you gave up."],["Income","Income is money coming in."]],0)
 ],
 asia4:[
  L("🌏","Australia is close to many Asian countries."),
  S("Asian neighbour or not?",["Asian neighbour","Not in Asia"],[["Indonesia",0],["Japan",0],["Vietnam",0],["Brazil",1]]),
  P("Indonesia is...",[["A neighbour to the north","Yes!"],["In Europe","It is just north of Australia."]],0)
 ],
 timeline4:[
  L("⬅️ older · newer ➡️","Older events go on the left."),
  B("A century is how many years? Tap decades.",100,[["🔟","1 decade",10]],[0,0,0,0,0,0,0,0,0,0],{total:"{n} years",done:"10 decades make a century. 100 years!"}),
  P("A decade is...",[["10 years","Yes!"],["100 years","That is a century."]],0)
 ]
});

K.add("4.technologies",{
 branch4:[
  L("🔀","If true, do one thing. Else, do another."),
  S("If score is above 10, star. Else heart.",["⭐ Star","❤️ Heart"],[["score 12",0],["score 15",0],["score 3",1],["score 8",1]]),
  P("Else means...",[["If not","Yes!"],["Always","Else only runs if not true."]],0)
 ],
 variable4:[
  L("📦 score = 0","A variable is a named box that holds a value."),
  B("Score is 3. Add 2. Tap +1 points.",5,[["⭐","+1",1]],[0,0,0,0,0],{total:"score = {n}",done:"3 + 2 = 5!"}),
  P("Why use variables?",[["To remember things","Yes!"],["To make noise","They store values."]],0)
 ],
 loop4:[
  L("🔁","A counted loop repeats a set number of times."),
  R("Repeat 4: forward, turn right.",["➡️ ↪️ side 1","⬇️ ↪️ side 2","⬅️ ↪️ side 3","⬆️ ↪️ side 4","A square! ⬜"]),
  P("A forever loop...",[["Keeps repeating","Yes! Until stopped."],["Runs once","That is not a loop."]],0)
 ],
 event4:[
  L("👆 ▶️","An event triggers code."),
  R("When the button is pressed, play a sound.",["The code waits.","You press the button.","The event happens.","🔊 The sound plays."]),
  S("Event or not?",["Event","Not an event"],[["key pressed",0],["screen tapped",0],["timer ends",0],["nothing happens",1]])
 ],
 decompose4:[
  L("🧩","Break a big problem into small parts."),
  R("Make a sandwich.",["Get bread.","Add filling.","Cut it.","Serve it."]),
  P("Which is one part of 'bake a cake'?",[["Mix the batter","Yes!"],["Wash the car","That is a different job."]],0)
 ],
 debug4:[
  L("🐞","Test code. Trace steps. Fix one thing at a time."),
  HS("Score should add 1. Tap the bug.",["score = 0","Point won.","score = score + 2","Show score."],[2],"Which step adds the wrong amount?"),
  P("After a fix, you...",[["Test again","Yes!"],["Delete it","Test to check."]],0)
 ],
 sensor4:[
  L("👁️ 💡 🌡️","A sensor detects things in the world."),
  S("Which sensor?",["Light sensor","Motion sensor"],[["night light",0],["street light",0],["automatic door",1],["security light when you walk",1]]),
  P("A smart thermostat uses a...",[["Temperature sensor","Yes!"],["Sound sensor","It senses heat."]],0)
 ],
 data4t:[
  L("📊 📈","Bar charts compare. Line charts show change over time."),
  S("Bar or line chart?",["Bar chart","Line chart"],[["favourite fruit votes",0],["pets in class",0],["temperature each day",1],["plant height each week",1]]),
  P("Why label axes?",[["So people can read it","Yes!"],["To make it longer","Labels explain the chart."]],0)
 ],
 privacy4:[
  L("🔐","A strong password is long and hard to guess."),
  P("Which is stronger?",[["purple-tiger-bridge-7","Yes! Long random words."],["1234","Very easy to guess."]],0),
  P("Who can you share a password with?",[["A trusted adult","Yes!"],["Your best friend","Only a trusted adult."]],0)
 ],
 kind4:[
  L("💬💛","Be kind online. Think before you post."),
  R("Someone is rude in a game chat.",["Do not reply.","Take a screenshot.","Block them.","Tell a trusted adult."]),
  P("Before sharing a friend's photo you...",[["Ask first","Yes!"],["Just post it","Always ask."]],0)
 ],
 design4:[
  L("💡✏️🔨🧪","Problem, ideas, plan, make, test, improve."),
  R("A pencil holder.",["Find the problem.","Brainstorm ideas.","Make a cardboard prototype.","Test it and improve."]),
  P("A prototype is...",[["A first model","Yes!"],["The final shop version","It is a test model."]],0)
 ],
 fibre4:[
  L("🐑 🌿 🏭","Fibres can be natural or synthetic."),
  S("Natural or synthetic?",["Natural","Synthetic"],[["wool",0],["cotton",0],["nylon",1],["polyester",1]]),
  P("Wool comes from...",[["Sheep","Yes!"],["A factory","Nylon is from a factory."]],0)
 ]
});
})();
