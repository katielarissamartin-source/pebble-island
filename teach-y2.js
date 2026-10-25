(function(){
const K=window.PEBBLE_TEACH_KIT;if(!K)return;
const {L,R,S,P,B,H,HS}=K;

K.add("2.maths",{
 to1000:[
  L("💯🔟1️⃣","Big numbers have hundreds, tens and ones.","407 is 4 hundreds, 0 tens and 7 ones."),
  B("Build 326. Tap hundreds, tens and ones.",326,[["🟦","100",100],["🟩","10",10],["🟡","1",1]],[0,0,0,1,1,2,2,2,2,2,2],{done:"3 hundreds, 2 tens and 6 ones. 326!"}),
  P("Which is the biggest? Look at the hundreds first.",[["540","5 hundreds. That is the most hundreds."],["504","5 hundreds too, but only 0 tens. 540 has 4 tens."],["450","Only 4 hundreds."]],0,"540 is the greatest.")
 ],
 regroup:[
  L("🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩 = 🟦","Ten tens make one hundred."),
  B("Make 100 using only tens. How many tens?",100,[["🟩","10",10]],[0,0,0,0,0,0,0,0,0,0],{done:"10 tens make 100!"}),
  R("130 can be split two ways.",["130 = 1 hundred and 3 tens.","130 = 13 tens.","Same number. Different groups."])
 ],
 facts:[
  L("7 ➕ 5 = 12","Adding and taking away undo each other."),
  R("Watch the fact family for 7, 5 and 12.",["7 + 5 = 12","5 + 7 = 12","12 − 5 = 7","12 − 7 = 5"]),
  P("9 + 6 = 15. So what is 15 − 6?",[["9","Yes! Take the 6 back off and 9 is left."],["6","6 is the part we took away."],["21","That adds. We need to take away."]],0)
 ],
 fractions:[
  L("🍕","A half is one of two equal parts.","Cut each half again. Now there are four quarters."),
  B("Build one whole pizza with quarters.",4,[["🍕","1 quarter",1]],[0,0,0,0],{total:"{n} quarters",done:"4 quarters make one whole!"}),
  P("Same pizza. Which piece is bigger?",[["One half","Yes. 2 pieces are bigger than 4 pieces."],["One quarter","A quarter is half of a half. It is smaller."]],0)
 ],
 skipcount:[
  L("🦘 2 · 4 · 6 · 8","Skip counting means counting in jumps."),
  R("Jump by 5s.",["5","10","15","20","25"]),
  P("Count by 10s: 10, 20, 30, ... What comes next?",[["40","Yes! 30 plus 10 is 40."],["31","That only adds 1."],["50","That jumps 20."]],0)
 ],
 add100:[
  L("🟩🟩🟩 🟡🟡 + 🟩🟩 🟡🟡🟡🟡🟡","Split into tens and ones."),
  R("Let's do 32 + 25.",["Tens: 30 + 20 = 50","Ones: 2 + 5 = 7","50 + 7 = 57"]),
  B("Now build 23 + 14. Tap tens and ones to make the answer.",37,[["🟩","10",10],["🟡","1",1]],[0,0,0,1,1,1,1,1,1,1],{done:"3 tens and 7 ones. 37!"})
 ],
 sub100:[
  L("4️⃣7️⃣ − 1️⃣3️⃣","Take away the tens first. Then the ones."),
  R("Let's do 47 − 13.",["47 − 10 = 37","37 − 3 = 34","So 47 − 13 = 34."]),
  P("58 − 20. Take away 2 tens.",[["38","Yes! 5 tens take away 2 tens is 3 tens. 38."],["56","That took away 2 ones, not 2 tens."],["78","That added."]],0)
 ],
 groups:[
  L("🍇🍇 🍇🍇 🍇🍇","Equal groups have the same number in each.","3 groups of 2 is 6."),
  B("Make 4 plates with 5 grapes each. Tap a plate of 5.",20,[["🍽️","5 grapes",5]],[0,0,0,0],{total:"{n} grapes",done:"5 + 5 + 5 + 5 = 20!"}),
  P("2 groups of 10. How many in all?",[["20","Yes! 10 + 10 = 20."],["12","That is 10 + 2."],["10","That is just one group."]],0)
 ],
 share:[
  L("🍪🍪🍪 | 🍪🍪🍪","Sharing equally means each gets the same.","6 shared between 2 is 3 each."),
  R("Share 8 stars between 2 friends. Deal them one at a time.",["⭐ for A, ⭐ for B. (2 used)","⭐ for A, ⭐ for B. (4 used)","⭐ for A, ⭐ for B. (6 used)","⭐ for A, ⭐ for B. (8 used)","A has 4. B has 4. Fair!"]),
  P("So 8 shared between 2 is...",[["4 each","Yes! Each friend got 4."],["2 each","That is only 4 stars."],["8 each","That would need 16 stars."]],0)
 ],
 clock:[
  L("🕒","The short hand shows the hour. The long hand shows the minutes."),
  S("Where is the long hand? Sort the times.",["Long hand on 12","Long hand on 6"],[["3 o'clock",0],["half past 3",1],["7 o'clock",0],["half past 7",1]]),
  P("The long hand is on 3. What time word is that?",[["Quarter past","Yes! A quarter of the way round."],["Half past","Half past is the long hand on 6."],["O'clock","O'clock is the long hand on 12."]],0)
 ],
 money:[
  L("5c 10c 20c 50c $1 $2","These are Australian coins."),
  B("Make $1 with 10c coins.",100,[["🪙","10c",10]],[0,0,0,0,0,0,0,0,0,0],{money:true,done:"Ten 10c coins make $1!"}),
  B("Make 30c.",30,[["🪙","10c",10],["🪙","20c",20]],[1,0],{money:true,done:"20c + 10c = 30c!"})
 ],
 shapes:[
  L("🔺 ⬛ ⚪   🧊 ⚽ 🍦","Flat shapes are 2D. Solid shapes are 3D."),
  S("Flat or solid? Sort them.",["2D flat","3D solid"],[["triangle",0],["square",0],["circle",0],["cube",1],["sphere",1],["cone",1]]),
  P("How many sides does a triangle have?",[["3","Yes! Tri means three."],["4","A square has 4."],["5","Count again: 1, 2, 3."]],0,"","🔺")
 ]
});

K.add("2.english",{
 characters:[
  L("😊","What characters do gives us clues about how they feel."),
  HS("Tap the clue. How do we know Zara was pleased?",["Zara saw her friend.","Zara smiled."],[1],"Look for what Zara did with her face."),
  P("Ben hid behind the door in the storm. How did he feel?",[["Frightened","Yes! Hiding is a clue he was scared."],["Bored","Bored people do not hide."],["Proud","Hiding does not show pride."]],0)
 ],
 compound:[
  L("🧩 + 🧩","A compound sentence joins two ideas with and, but or so."),
  R("Watch two ideas join.",["The rain stopped.","We played outside.","The rain stopped, and we played outside."]),
  P("I wanted to play, ___ it was raining.",[["but","Yes! But shows a problem."],["so","So means because of that. It does not fit."],["and","And just adds. But fits better."]],0)
 ],
 purpose:[
  L("📖 📋 📣","Stories entertain. Facts inform. Posters can persuade."),
  S("Why was it written? Sort them.",["Entertain","Inform","Persuade"],[["A dragon story",0],["A fact sheet about frogs",1],["Save water!",2],["A funny poem",0],["How bees make honey",1],["Please recycle!",2]])
 ],
 wordparts:[
  L("jump ➡️ jumped","A base word can get an ending like -s, -ed or -ing."),
  H("Tap the word that has the base word play.","She is playing outside today",["playing"],"Look for p-l-a-y inside a word."),
  S("Sort by the ending.",["-ed (already happened)","-s (more than one)"],[["walked",0],["jumped",0],["books",1],["cats",1]])
 ],
 syllables:[
  L("👏","A syllable is one beat. Clap as you say it."),
  R("Clap butterfly.",["but 👏","ter 👏","fly 👏","3 beats!"]),
  S("Clap each word. How many beats?",["1 beat","2 beats","3 beats"],[["dog",0],["cat",0],["rabbit",1],["pencil",1],["butterfly",2]])
 ],
 fullstops:[
  L("T . . . .","A sentence starts with a capital letter and ends with a full stop."),
  P("Which one is correct?",[["The cat sat.","Yes! Capital T and a full stop."],["the cat sat.","It needs a capital letter."],["The cat sat","It needs a full stop at the end."]],0),
  H("Names need capitals too. Tap the name.","Yesterday Mia went to the park.",["Mia"],"A name is a person's name.")
 ],
 nouns:[
  L("👧 🏞️ ⚽","A noun names a person, place or thing."),
  H("Tap the 2 nouns.","The boy kicked the ball.",["boy","ball"],"Which words name a person or a thing?"),
  S("Person, place or thing?",["Person","Place","Thing"],[["teacher",0],["girl",0],["park",1],["school",1],["ball",2],["cup",2]])
 ],
 verbs:[
  L("🏃 🦘 🍎","A verb is a doing word."),
  H("Tap the verb. What does the bird do?","The bird flies.",["flies"],"Which word is the action?"),
  S("Can you do it? Sort the words.",["Verb (doing)","Not a verb"],[["run",0],["jump",0],["eat",0],["table",1],["cup",1]])
 ],
 adjectives:[
  L("🐶 big · 🔴 red","An adjective describes a noun."),
  H("Tap the 2 describing words.","The tall tree has green leaves.",["tall","green"],"Which words tell what the tree and leaves are like?"),
  P("Which word describes a lemon?",[["sour","Yes! Lemons taste sour."],["run","Run is a doing word."],["shop","Shop is a place."]],0,"","🍋")
 ]
 ,punctuation:[
  L(". ? !","Full stop tells. Question mark asks. Exclamation mark shows a big feeling."),
  S("Which mark goes at the end?",["?","!","."],[["Where is my hat",0],["What is your name",0],["Wow",1],["That is amazing",1],["I found it",2]])
 ],
 sequence:[
  L("1️⃣ 2️⃣ 3️⃣","First, next, then and last show the order."),
  R("Mia's morning, in order.",["First, Mia woke up.","Next, she brushed her teeth.","Then, she packed her bag.","Last, she walked to school."]),
  P("Sam planted a seed. Then he watered it. What happened last?",[["A plant grew","Yes! Growing comes after planting and watering."],["He bought a seed","That would come first."]],0,"","🌱")
 ],
 mainidea:[
  L("🐝","The main idea is what a text is mostly about. Details tell us more."),
  HS("Tap each sentence that is about bees.",["Bees make honey.","Bees live in hives.","Bees visit flowers."],[0,1,2],"Every sentence is about bees. So bees is the main idea."),
  S("Main idea or detail?",["Main idea","Detail"],[["Bees",0],["make honey",1],["live in hives",1],["visit flowers",1]])
 ]
});

K.add("2.science",{
 sky:[
  L("🌍🔄☀️","Earth turns. So the Sun seems to move across our sky."),
  R("Watch one day.",["Morning: the Sun is low.","Midday: the Sun is high.","Evening: the Sun is low again.","Night: our side faces away from the Sun."]),
  P("Why does the Sun seem to cross the sky?",[["Earth turns","Yes! We spin, so the Sun looks like it moves."],["The Sun walks","The Sun does not walk."]],0,"Never look right at the Sun.")
 ],
 sounds:[
  L("🥁〰️","Sound starts when something vibrates. It wobbles back and forth fast."),
  R("Tap a ruler on a desk.",["Hold one end down.","Flick the other end.","It wobbles. That is a vibration.","The wobble makes a sound."]),
  P("What does a guitar string do when it makes a sound?",[["It vibrates","Yes! It wobbles very fast."],["It melts","Strings do not melt."],["It disappears","It stays there."]],0,"","🎸")
 ],
 materials:[
  L("📄 ➡️ ✈️","Changing the shape does not change what it is made from."),
  S("Shape changed. What is it made from?",["Paper","Clay"],[["paper plane",0],["folded card",0],["squashed ball",1],["clay snake",1]]),
  P("A folded paper plane is made from...",[["Paper","Yes! Still paper, new shape."],["Plastic","It started as paper."]],0)
 ],
 "science-test":[
  L("🧪","Scientists predict, test and look at what happens."),
  R("Test two paper towels fairly.",["Predict: which soaks more?","Same size pieces.","Same amount of water.","Look and write what happened."]),
  S("Keep the same, or change?",["Keep the same","The thing we test"],[["size of pieces",0],["amount of water",0],["kind of towel",1]])
 ],
 living:[
  L("🐶💧🌬️🏠","Living things need food, water, air and a safe home."),
  S("Living or not living?",["Living","Not living"],[["rabbit",0],["tree",0],["puppy",0],["pebble",1],["toy car",1]]),
  P("A plant needs light, water and...",[["Air","Yes! Plants need air too."],["Toys","Plants do not need toys."]],0,"","🌱")
 ],
 habitats:[
  L("🐨🌳","A habitat is where an animal lives. It has food, water and shelter."),
  S("Match the animal to its home.",["Water","Desert","Gum tree"],[["fish 🐟",0],["camel 🐪",1],["koala 🐨",2]])
 ],
 plantparts:[
  L("🌻","Roots, stem, leaves and flower each do a job."),
  R("Tap up the plant.",["Roots: drink water and hold on.","Stem: holds the plant up.","Leaves: catch sunlight.","Flower: makes seeds."]),
  P("Which part takes in water?",[["Roots","Yes! Roots drink from the soil."],["Leaves","Leaves catch sunlight."],["Flower","Flowers make seeds."]],0)
 ],
 lifecycle:[
  L("🥚🐛🫘🦋","A life cycle shows how a living thing grows and changes."),
  R("A butterfly life cycle.",["Egg 🥚","Caterpillar 🐛","Pupa","Butterfly 🦋"]),
  P("What hatches from a hen's egg?",[["A chick","Yes! The chick grows into a hen."],["A caterpillar","That is a butterfly egg."]],0,"","🥚")
 ],
 forces:[
  L("👉🚪 👈🗄️","A force is a push or a pull."),
  S("Push or pull?",["Push","Pull"],[["open a door",0],["kick a ball",0],["open a drawer",1],["pull a wagon",1]]),
  P("A ball rolls slower on rough grass. Why?",[["Rough ground slows it","Yes! Rough ground pushes back."],["The ball is tired","Balls do not get tired."]],0)
 ],
 shadows:[
  L("☀️🧍⬛","A shadow forms when something blocks light."),
  S("Long or short shadow?",["Long shadow","Short shadow"],[["morning",0],["afternoon",0],["midday",1]]),
  P("Which is a light source?",[["The Sun","Yes! It gives out light."],["A book","A book only blocks light."]],0)
 ],
 weather:[
  L("☀️☁️🌧️💨⛈️","Weather can be sunny, cloudy, rainy, windy or stormy."),
  S("Match the clothes to the weather.",["Rainy","Sunny"],[["raincoat",0],["gumboots",0],["sunhat",1],["sunscreen",1]]),
  P("A thermometer measures...",[["How hot or cold","Yes!"],["Rain","A rain gauge measures rain."]],0,"","🌡️")
 ],
 solids:[
  L("🧊 💧","A solid keeps its shape. A liquid takes the shape of its cup."),
  S("Solid or liquid?",["Solid","Liquid"],[["ice",0],["rock",0],["juice",1],["water",1],["milk",1]]),
  P("Which one can you pour?",[["A liquid","Yes! Liquids flow."],["A solid","Solids keep their shape."]],0)
 ],
 moonphase:[
  L("☀️➡️🌕","The Moon has no light of its own. The Sun lights it up."),
  R("Watch the Moon over a month.",["🌑 New Moon","🌒 Crescent","🌓 Half","🌕 Full","Then it starts again."]),
  P("Which is a full Moon?",[["🌕","Yes! A round, bright circle."],["🌒","That thin curve is a crescent."]],0)
 ],
 sunpath:[
  L("🌅 ☀️ 🌇","The Sun rises in the east and sets in the west."),
  R("Follow the Sun.",["Morning: east.","Midday: high in the sky.","Evening: west."]),
  P("When is your shadow shortest?",[["Midday","Yes! The Sun is high."],["Morning","The Sun is low. Shadows are long."]],0)
 ],
 solarsys:[
  L("☀️🌍","Earth is a planet. It goes around the Sun."),
  S("Sort them.",["Planet","Star"],[["Earth",0],["Mars",0],["Jupiter",0],["the Sun",1]]),
  P("How many planets go around our Sun?",[["8","Yes! Earth is one of 8."],["3","There are more."]],0)
 ],
 pitch:[
  L("🐦 🎵 🥁","High or low sound is called pitch."),
  S("High or low?",["High","Low"],[["bird tweet",0],["whistle",0],["big drum",1],["lion roar",1]]),
  P("Fast vibrations make a...",[["High sound","Yes!"],["Low sound","Slow vibrations make low sounds."]],0)
 ],
 loudsoft:[
  L("🔊 🔈","A hard hit is loud. A gentle tap is soft."),
  S("Loud or soft?",["Loud","Soft"],[["hard drum hit",0],["shout",0],["gentle tap",1],["whisper",1]]),
  P("Which muffles sound best?",[["A cushion","Yes! Soft things make sound quieter."],["A metal tray","Hard things can make it louder."]],0)
 ],
 bendstretch:[
  L("〰️ ➡️ ➰","Bend, twist or stretch changes the shape. Not the material."),
  S("What did we do?",["Bend","Twist","Stretch"],[["fold a straw",0],["twist a pipe cleaner",1],["pull a rubber band",2]]),
  P("A stretched rubber band is still...",[["Rubber","Yes! Same material, new shape."],["Paper","It was rubber before."]],0)
 ],
 breakup:[
  L("🍎🔪","Cutting makes smaller pieces. Each piece is the same material."),
  S("Can it go back together?",["Yes","No"],[["building blocks",0],["puzzle",0],["torn paper",1],["broken biscuit",1]]),
  P("Torn paper is still...",[["Paper","Yes!"],["Wood","It is still paper."]],0)
 ],
 magnets:[
  L("🧲","A magnet pulls some metals, like iron and steel."),
  S("Will the magnet pull it?",["Yes","No"],[["steel fridge",0],["iron nail",0],["wood block",1],["plastic spoon",1],["paper",1]]),
  P("Two magnets can...",[["Pull together or push apart","Yes! It depends which ends meet."],["Only pull","They can push too."]],0)
 ]
});

K.add("2.hass",{
 places:[
  L("📚🌳🏛️","Places matter because of what people do there."),
  S("What do people do there?",["Library","Park"],[["borrow books",0],["learn",0],["play",1],["have picnics",1]]),
  P("Why might two people love the same park for different reasons?",[["They have different experiences","Yes! Different memories."],["Parks are all the same","Each person sees it their way."]],0)
 ],
 "technology-past":[
  L("✉️ ➡️ 📱","People used letters and phones before smartphones."),
  S("Long ago or now?",["Long ago","Now"],[["letter",0],["landline phone",0],["text message",1],["video call",1]]),
  P("What is one way messages changed?",[["They travel faster","Yes! A letter took days."],["They stopped","We still send messages."]],0)
 ],
 "map-zoom":[
  L("🏠➡️🏙️➡️🗺️","Small places are inside bigger places."),
  R("Zoom out.",["My street","My suburb","My state: Queensland","My country: Australia"]),
  P("Which map shows more street detail?",[["A map of one suburb","Yes! It is zoomed in."],["A map of Australia","That is zoomed out."]],0)
 ],
 country:[
  L("🏞️","Aboriginal and Torres Strait Islander Peoples have deep connections to Country and Place."),
  R("Connection to Country can include...",["Land","Waterways","Culture and language","Caring for places"]),
  P("How can we learn about local Country respectfully?",[["Listen to local Traditional Owners","Yes. They hold that knowledge."],["Guess","It is better to listen and learn."]],0)
 ],
 family:[
  L("👵👨‍👩‍👧","Families can look different. Families change over time."),
  S("Old photo or new photo?",["Long ago","Now"],[["black and white photo",0],["wooden toys",0],["tablet",1],["phone camera",1]]),
  P("Who can you ask about the past?",[["A grandparent","Yes! They remember long ago."],["A baby","Babies are too new to remember."]],0)
 ],
 celebrations:[
  L("🎂🏮🎉","People celebrate special days in different ways."),
  S("Is it a celebration?",["Celebration","Not a celebration"],[["birthday party",0],["festival",0],["brushing teeth",1],["doing homework",1]]),
  P("Do all families celebrate the same way?",[["No, ways can be different","Yes. Lanterns, meals, songs."],["Yes, always the same","Families and cultures differ."]],0)
 ],
 compass:[
  L("🧭","The four directions are north, south, east and west."),
  R("Go around the compass.",["N: north is at the top.","E: east is on the right.","S: south is at the bottom.","W: west is on the left."]),
  P("Where does the Sun rise?",[["East","Yes!"],["West","The Sun sets in the west."]],0,"","🌅")
 ],
 features:[
  L("🏞️ 🌉","Nature makes natural features. People make built features."),
  S("Natural or built?",["Natural","Built"],[["river",0],["hill",0],["beach",0],["bridge",1],["road",1],["school",1]])
 ],
 rules:[
  L("🚦","Rules keep people safe and fair."),
  S("Is it a safety rule?",["Safe rule","Not a rule"],[["wear a bike helmet",0],["stop at a red light",0],["walk in the corridor",0],["eat a sandwich",1]]),
  P("A red light means...",[["Stop","Yes!"],["Go","Green means go."]],0,"","🔴")
 ],
 jobs:[
  L("👩‍⚕️👨‍🚒👩‍🏫👨‍🌾","People do jobs to help others."),
  S("Match the helper.",["Helps sick people","Grows food","Helps in a fire"],[["nurse",0],["farmer",1],["firefighter",2]]),
  P("Who makes bread for the town?",[["A baker","Yes!"],["A pilot","Pilots fly planes."]],0,"","🍞")
 ],
 caring:[
  L("🗑️💧🌳","We can care for places."),
  S("Helps our places or hurts them?",["Helps","Hurts"],[["rubbish in the bin",0],["turn off the tap",0],["plant a tree",0],["drop litter",1],["leave the tap running",1]])
 ],
 symbols:[
  L("🇦🇺","A symbol stands for a place or idea."),
  R("Symbols of Australia.",["The Australian flag.","The Aboriginal flag.","The Torres Strait Islander flag.","Kangaroo and emu on the coat of arms.","Wattle is the floral emblem."]),
  P("Which plant is Australia's floral emblem?",[["Wattle","Yes! Golden wattle."],["Rose","Not ours."]],0,"","🌼")
 ]
});

K.add("2.technologies",{
 steps:[
  L("🤖📋","An algorithm is a set of steps. Order matters!"),
  R("Brush teeth, step by step.",["1. Get the brush.","2. Put toothpaste on.","3. Brush.","4. Rinse."]),
  P("'If the light is red, stop.' What is this?",[["A decision rule","Yes! If... then..."],["A repeat","Repeat does a step again."]],0)
 ],
 data:[
  L("📘📘📘","Data is information. Pictures can show data."),
  B("One 🍎 means one apple. Show 4 apples.",4,[["🍎","1 apple",1]],[0,0,0,0],{total:"{n} apples"}),
  P("3 dogs 🐶🐶🐶 and 1 cat 🐱. Which has more?",[["Dogs","Yes! 3 is more than 1."],["Cats","Only 1 cat."]],0)
 ],
 privacy:[
  L("🔒","Ask a trusted adult before sharing details online."),
  S("OK to share, or ask an adult first?",["Ask an adult first","Fine to share"],[["home address",0],["password",0],["photo of your house",0],["favourite colour",1]]),
  P("A strange website asks for your address. What do you do?",[["Ask a trusted adult","Yes!"],["Type it in","It is private. Ask first."]],0)
 ],
 design:[
  L("🍶","People design things to meet a need."),
  S("Good design or wasteful?",["Good choice","Wasteful"],[["refill bottle",0],["easy-open lunchbox",0],["throw-away cup every day",1]]),
  P("Who should a designer think about first?",[["The person who uses it","Yes!"],["Nobody","Design is for people."]],0)
 ],
 debug:[
  L("🐞","A bug is a mistake in the steps."),
  HS("Toast steps. Tap the step in the wrong place.",["1. Get bread.","2. Put butter on.","3. Put it in the toaster.","4. Press down."],[1],"Can you butter bread before it is toast?"),
  R("Fix it.",["1. Get bread.","2. Put it in the toaster.","3. Press down.","4. Put butter on."])
 ],
 sorting:[
  L("🔴🔵","Sorting puts things in groups by a rule."),
  S("Rule: colour. Sort the buttons.",["Red","Blue"],[["🔴",0],["🔵",1],["🔴 ",0],["🔵 ",1]]),
  P("Which could be a sorting rule?",[["Size","Yes! Big and small."],["Sleep","That is not a rule."]],0)
 ],
 devices:[
  L("⌨️➡️🖥️","Input goes in. Output comes out."),
  S("Input or output?",["Input","Output"],[["keyboard",0],["microphone",0],["tapping a screen",0],["screen picture",1],["speaker",1]])
 ],
 kindonline:[
  L("💬💛","Be kind online. Tell an adult if something feels wrong."),
  S("Kind or unkind?",["Kind","Unkind"],[["Great job!",0],["Thanks!",0],["You are silly",1]]),
  P("A strange link pops up. What do you do?",[["Ask an adult first","Yes!"],["Click it","Strange links can be unsafe."]],0)
 ],
 materials:[
  L("☔🛏️🌉","Pick a material that suits the job."),
  S("Match the material.",["Waterproof","Soft","Strong"],[["raincoat plastic",0],["pillow",1],["steel bridge",2]]),
  P("Why choose different materials?",[["They suit different jobs","Yes!"],["They look the same","They have different features."]],0)
 ],
 makesteps:[
  L("📝🔨🧪🔧","Plan. Make. Test. Improve."),
  R("Make a paper boat.",["Plan it.","Make it.","Test: does it float?","Improve it."]),
  P("What comes first?",[["Plan","Yes! Think before you make."],["Test","You test after making."]],0)
 ],
 foodtech:[
  L("🥕🍎🍚🥛","Healthy food gives us energy."),
  S("Sort the food.",["Vegetable","Fruit"],[["carrot",0],["broccoli",0],["apple",1],["banana",1]]),
  P("Which is a healthy drink?",[["Water","Yes!"],["Soft drink","That is a sometimes drink."]],0)
 ],
 sensors:[
  L("🚪👀","A sensor notices things like movement, light or heat."),
  R("An automatic door.",["You walk close.","The sensor notices you.","The door opens."]),
  P("A night light turns on in the dark. What does it sense?",[["Light","Yes! It notices the light is gone."],["Sound","It is watching light."]],0)
 ]
});
})();
