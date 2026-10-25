(function(){
const K=window.PEBBLE_TEACH_KIT;if(!K)return;
const {L,R,S,P,B,H,HS}=K;

K.add("1.maths",{
 numbers:[
  L("4️⃣8️⃣ 4️⃣9️⃣ 5️⃣0️⃣","Numbers keep going past 20.","After 49 comes 50."),
  R("Count on from 97.",["97","98","99","100","After 99 comes 100!"]),
  P("What comes after 59?",[["60","Yes! 59, then 60."],["58","58 comes before 59."],["50","50 is smaller than 59."]],0)
 ],
 tens:[
  L("🟩🟩🟩 🟡🟡🟡🟡","Ten ones make one ten.","34 is 3 tens and 4 ones."),
  B("Build 42. Tap tens and ones.",42,[["🟩","10",10],["🟡","1",1]],[0,0,0,0,1,1],{done:"4 tens and 2 ones. 42!"}),
  P("How many tens are in 56?",[["5","Yes! 56 is 5 tens and 6 ones."],["6","6 is the ones."],["56","56 is the whole number."]],0)
 ],
 adding:[
  L("🍎🍎🍎 + 🍎🍎","Adding puts groups together."),
  R("Let's do 9 + 3. Start at 9. Count on 3.",["10","11","12","9 + 3 = 12"]),
  B("You have 7 stickers. Get 4 more. Tap to add stickers.",11,[["⭐","1 sticker",1]],[0,0,0,0,0,0,0,0,0,0,0],{total:"{n} stickers",done:"7 + 4 = 11 stickers!"})
 ],
 skip:[
  L("🦘 2 · 4 · 6 · 8","Skip counting jumps the same each time."),
  R("Jump by 5s.",["5","10","15","20"]),
  P("2, 4, 6, 8, ... What is next?",[["10","Yes! Jump 2 more."],["9","That jumps only 1."],["12","That jumps 4."]],0)
 ],
 sub1:[
  L("🍪🍪🍪🍪🍪🍪🍪","Taking away means some go."),
  R("Let's do 7 − 2. Start at 7. Count back 2.",["6","5","7 − 2 = 5"]),
  P("10 − 4 = ?",[["6","Yes! Count back 4 from 10: 9, 8, 7, 6."],["14","That adds."],["4","4 is what we took away."]],0)
 ],
 teens1:[
  L("🟩 🟡🟡🟡","A teen number is one ten and some ones.","13 is 10 and 3."),
  B("Build 16. Tap a ten and some ones.",16,[["🟩","10",10],["🟡","1",1]],[0,1,1,1,1,1,1],{done:"10 and 6 is 16!"}),
  P("How many ones are in 13?",[["3","Yes! 13 is 10 and 3."],["1","1 is the ten."],["13","That is the whole number."]],0)
 ],
 shapes1:[
  L("🔺 ⬛ ⚪","Sides are straight edges. Corners are where sides meet."),
  R("Count the triangle's corners.",["🔺 Corner 1","Corner 2","Corner 3","3 corners!"]),
  P("Which shape has no corners?",[["⚪","Yes! A circle is round. No corners."],["🔺","A triangle has 3."],["⬛","A square has 4."]],0)
 ],
 length1:[
  L("✏️ = 🧱🧱🧱🧱🧱🧱","Measure with blocks the same size. No gaps."),
  B("The book is 5 blocks long. Tap blocks to measure.",5,[["🧱","1 block",1]],[0,0,0,0,0],{total:"{n} blocks",done:"5 blocks long!"}),
  P("Where do we start measuring?",[["At one end","Yes! Start right at the end."],["In the middle","Then we miss a bit."]],0)
 ],
 time1:[
  L("🕒","The short hand shows the hour. The long hand shows minutes."),
  S("Where is the long hand?",["Long hand on 12","Long hand on 6"],[["3 o'clock",0],["half past 3",1],["8 o'clock",0],["half past 8",1]]),
  P("Which is longer?",[["An hour","Yes! An hour is 60 minutes."],["A minute","A minute is short."]],0)
 ],
 money1:[
  L("5c 10c 20c 50c $1 $2","Coins have values."),
  B("Make 10c. Tap 5c coins.",10,[["🪙","5c",5]],[0,0],{money:true,done:"5c + 5c = 10c!"}),
  B("Make 20c. Tap 10c coins.",20,[["🪙","10c",10]],[0,0],{money:true,done:"10c + 10c = 20c!"})
 ],
 graph1:[
  L("🍎🍎🍎\n🍌🍌","Each picture is one. The longest row is the most."),
  P("🍎🍎🍎 and 🍌🍌. Which has the most?",[["Apples","Yes! 3 apples. Only 2 bananas."],["Bananas","Count again. 2 bananas, 3 apples."]],0),
  P("🐱🐱 and 🐟🐟🐟🐟. How many more fish?",[["2","Yes! 4 take away 2 is 2."],["4","4 is all the fish."],["6","That adds them."]],0)
 ],
 halves1:[
  L("🍕","A half is one of two equal parts.","A quarter is one of four equal parts."),
  R("Share 8 strawberries in half.",["🍓🍓🍓🍓 | 🍓🍓🍓🍓","Each side has 4.","Half of 8 is 4."]),
  B("Make one whole. Tap halves.",2,[["🌗","1 half",1]],[0,0],{total:"{n} halves",done:"Two halves make a whole!"})
 ]
});

K.add("1.english",{
 digraphs:[
  L("🚢 🪑","Sh, ch and th are two letters with one sound."),
  S("Which sound does it start with?",["sh","ch"],[["ship",0],["shop",0],["chair",1],["chip",1]]),
  P("Which word has th?",[["thin","Yes! t and h say th."],["tin","Just t."],["shin","That is sh."]],0)
 ],
 sentence:[
  L("🔠 ... .","A sentence starts with a capital letter. It ends with a mark."),
  HS("Tap the sentence written correctly.",["the cat sleeps","The cat sleeps."],[1],"Look for a capital letter and a full stop."),
  P("Which mark ends a question?",[["?","Yes! A question mark."],[".","A full stop ends a telling sentence."],["!","That shows a strong feeling."]],0)
 ],
 retell:[
  L("1️⃣ 2️⃣ 3️⃣","Stories have a beginning, a middle and an end."),
  R("Jo's kite story.",["Beginning: Jo lost a kite.","Middle: Jo looked for it.","End: Jo found it."]),
  P("The dog ran away. Sam searched. Sam found the dog. What happens last?",[["Sam finds the dog","Yes! That is the end."],["The dog runs away","That is the beginning."]],0)
 ],
 nouns:[
  L("🐦 ➡️ 🪽","Nouns name things. Verbs are actions."),
  H("Tap the verb. It is the action.","The puppy runs.",["runs"],"What does the puppy do?"),
  S("Noun or verb?",["Noun","Verb"],[["bicycle",0],["bird",0],["dance",1],["jump",1]])
 ],
 blends1:[
  L("🐸 ⭐","A blend is two sounds said fast together.","fr in frog. st in star."),
  S("Which blend does it start with?",["fr","st"],[["frog",0],["free",0],["star",1],["stop",1]]),
  P("Which word starts with bl?",[["blue","Yes! b-l, bl."],["boo","Just b."],["glue","That is gl."]],0)
 ],
 punct1:[
  L("🔠 .","Capital at the start. Full stop at the end."),
  HS("Tap the sentence written well.",["the dog ran","The dog ran."],[1],"Find the capital letter and the full stop."),
  P("A question ends with a...",[["Question mark","Yes! Like this: ?"],["Full stop","A full stop ends a telling sentence."]],0)
 ],
 sight1:[
  L("👀","Some words do not sound how they look. Learn them by sight.","said, they, was, have"),
  H("Tap the word said.","They said hello.",["said"],"Look for s-a-i-d."),
  P("Which word is they?",[["they","Yes! t-h-e-y."],["then","That is then."],["the","That is the."]],0)
 ],
 describing1:[
  L("🔴⚽","Describing words tell more about a noun.","A big red ball."),
  H("Tap the 2 describing words.","A big red ball.",["big","red"],"Which words tell about the ball?"),
  P("A cold drink. Which word tells how it feels?",[["cold","Yes! Cold tells how it feels."],["drink","Drink is the noun."]],0)
 ],
 instruct1:[
  L("🍞➡️🔥➡️🧈","Instructions use order words: first, next, then, last."),
  R("Make toast.",["First get bread.","Next put it in the toaster.","Then wait.","Last add butter."]),
  P("Which word is for the end?",[["Last","Yes! Last is the final step."],["First","First is the start."],["Next","Next is in the middle."]],0)
 ],
 rhyme1:[
  L("🐱 🎩","Rhyming words end with the same sound.","cat and hat"),
  S("Which does it rhyme with?",["cat","dog"],[["hat",0],["mat",0],["log",1],["frog",1]]),
  P("Which rhymes with moon?",[["spoon","Yes! moon, spoon."],["man","It does not end in oon."],["star","star rhymes with car."]],0)
 ],
 charact1:[
  L("🐷🏠","A character is who. A setting is where."),
  S("Who or where?",["Character (who)","Setting (where)"],[["a girl",0],["a pig",0],["a forest",1],["a house",1]]),
  P("A forest in a story is a...",[["Setting","Yes! It is where it happens."],["Character","A character is who is in it."]],0)
 ],
 report1:[
  L("🐟💧","A fact is true. A fact can be checked."),
  S("Fact or made up?",["Fact","Made up"],[["Fish live in water.",0],["Dogs have four legs.",0],["Dogs can fly.",1],["Fish wear hats.",1]]),
  P("A fact can be...",[["Checked","Yes! We can look it up."],["Made up","Made-up things are not facts."]],0)
 ]
});

K.add("1.science",{
 features1:[
  L("🐦 🐟 🐶","Animals have different body parts."),
  S("Whose feature is it?",["Bird","Fish"],[["wings",0],["feathers",0],["fins",1],["scales",1]]),
  P("A dog has...",[["Fur","Yes! Dogs have fur."],["Fins","Fish have fins."],["Wings","Birds have wings."]],0)
 ],
 needs1:[
  L("🌱☀️💧","Plants need water, air and light.","Animals need food, water, air and shelter."),
  S("Who needs it?",["Plants need","Animals need"],[["light",0],["sunshine",0],["food",1],["shelter",1]]),
  P("Without water living things...",[["Cannot grow well","Yes! Water is a need."],["Grow faster","Water is needed to grow."]],0)
 ],
 move1:[
  L("🐦 🐟 🐸 🐛","Animals move in different ways."),
  S("How does it move?",["Fly or swim","Hop or crawl"],[["bird",0],["fish",0],["frog",1],["caterpillar",1]]),
  P("A frog...",[["Hops","Yes! Strong back legs help it hop."],["Swims only","Frogs hop on land."],["Flies","Frogs have no wings."]],0)
 ],
 daily1:[
  L("☀️ 🌙","Day is light and warm. Night is dark and cool."),
  S("Day or night?",["Day","Night"],[["light sky",0],["Sun up",0],["dark sky",1],["Moon and stars",1]]),
  P("When are shadows shortest?",[["Noon","Yes! The Sun is high up."],["Morning","Morning shadows are long."]],0)
 ],
 season1:[
  L("☀️ 🍂 ❄️ 🌸","Seasons change the weather."),
  S("Match the season.",["Summer","Winter"],[["hot day",0],["light clothes",0],["cold day",1],["coat",1]]),
  P("In spring flowers...",[["Grow","Yes! Spring flowers grow."],["Fall","Leaves fall in autumn."]],0)
 ],
 props1:[
  L("🪨 🧺 🧥","Materials have properties."),
  S("Hard or soft?",["Hard","Soft"],[["rock",0],["brick",0],["towel",1],["pillow",1]]),
  P("A raincoat is...",[["Waterproof","Yes! Water rolls off."],["Stretchy","A rubber band is stretchy."]],0)
 ],
 sound1:[
  L("🥁〰️👂","Sounds are made when things shake.","That shake is a vibration."),
  R("Hit a drum.",["The drum shakes.","The air shakes.","The sound reaches your ears."]),
  S("Loud or quiet?",["Loud","Quiet"],[["drum",0],["siren",0],["mouse squeak",1],["whisper",1]])
 ],
 light1:[
  L("☀️ 💡 🔦","Light helps us see. A light source makes light."),
  S("Makes light or not?",["Light source","Not a light source"],[["Sun",0],["lamp",0],["torch",0],["book",1],["rock",1]]),
  P("Never look straight at the...",[["Sun","Yes! It can hurt your eyes."],["Book","Books are safe to look at."]],0)
 ],
 shadow1:[
  L("🔦 🧍 ⬛","A shadow forms when something blocks light."),
  R("Make a shadow.",["Shine a torch.","Put your hand in the light.","Your hand blocks the light.","A dark shape appears!"]),
  P("You need what to make a shadow?",[["Light","Yes! No light, no shadow."],["Water","Water does not make shadows."]],0)
 ],
 soil1:[
  L("🪨🍂 = 🟫","Soil is tiny bits of rock and old plants."),
  S("What lives or grows in soil?",["In soil","Not in soil"],[["worms",0],["plant roots",0],["fish",1],["clouds",1]]),
  P("Soil holds...",[["Water","Yes! Soil soaks up water."],["Fire","Soil holds water."]],0)
 ],
 bugs1:[
  L("🐜 🐝 🦋","Insects have six legs."),
  B("Give the ant its legs. Tap a leg.",6,[["🦵","1 leg",1]],[0,0,0,0,0,0],{total:"{n} legs",done:"6 legs. An insect!"}),
  P("Which is an insect?",[["A bee 🐝","Yes! 6 legs."],["A dog 🐶","A dog has 4 legs."],["A fish 🐟","A fish has fins."]],0)
 ],
 recycle1:[
  L("♻️🗑️","Reduce. Reuse. Recycle."),
  S("Where does it go?",["Recycle bin","Rubbish bin"],[["paper",0],["can",0],["glass jar",0],["used tissue",1]]),
  P("Reuse means...",[["Use again","Yes! Like a jar for pencils."],["Throw away","That is not reusing."]],0)
 ],
 pushpull1:[
  L("🫸 🫷","A push moves things away. A pull brings things closer."),
  S("Push or pull?",["Push","Pull"],[["kick a ball",0],["shut a door",0],["open a drawer",1],["tug a rope",1]]),
  P("A strong push makes a ball go...",[["Further","Yes! Strong push, far and fast."],["Less far","A gentle push goes less far."]],0)
 ],
 shapeforce1:[
  L("🫸🟠 ➡️ 🟠","Pushes and pulls can change shape."),
  S("Squash (push) or stretch (pull)?",["Push","Pull"],[["squash play dough",0],["squeeze a sponge",0],["stretch a rubber band",1],["pull a hair tie",1]]),
  P("A bigger squash makes a...",[["Bigger change","Yes! More force, more change."],["Smaller change","More force means more change."]],0)
 ]
});

K.add("1.hass",{
 past1:[
  L("⬅️ 📍 ➡️","Past is before now. Present is now. Future is after now."),
  S("Past or future?",["Past","Future"],[["yesterday",0],["an old photo",0],["tomorrow",1],["next week",1]]),
  P("Today is...",[["The present","Yes! Today is now."],["The past","Yesterday is the past."]],0)
 ],
 famtree1:[
  L("👵👴\n👩👨\n🧒","A family tree shows who is in a family."),
  R("Go down the family tree.",["Grandparents at the top.","Then parents.","Then me."]),
  P("My grandma is my mum's...",[["Mum","Yes! A grandparent is the parent of our parent."],["Sister","That is an aunt."]],0)
 ],
 toys1:[
  L("🪀 🧸 🎮","Long ago toys were wood, cloth or tin.","Today many are plastic or have screens."),
  S("Long ago or today?",["Long ago","Today"],[["wooden top",0],["cloth doll",0],["tablet game",1],["plastic car",1]]),
  P("Which game is the same then and now?",[["Hide and seek","Yes! Kids still play it."],["Tablet game","Long ago there were no tablets."]],0)
 ],
 celebr1:[
  L("🎂 🎄 🪔 🏮","People mark special days in many ways."),
  R("Some special days.",["Birthdays","Christmas, Eid, Diwali","Lunar New Year","NAIDOC Week celebrates First Nations cultures."]),
  P("To know why a day matters we...",[["Ask and learn","Yes!"],["Guess","Asking is better."]],0)
 ],
 place1:[
  L("🏠 🏫 🏞️ 🏖️","Places can be special to people."),
  S("What do we do there?",["Play","Learn"],[["park",0],["beach",0],["school",1],["library",1]]),
  P("We look after...",[["Places we love","Yes!"],["Nothing","We care for places."]],0)
 ],
 map1:[
  L("🌏 🗺️","A globe is round. A map is flat."),
  S("On a globe, what colour?",["Blue","Not blue"],[["water",0],["ocean",0],["land",1]]),
  P("A map is...",[["Flat","Yes! A globe is round."],["Round","A globe is round."]],0)
 ],
 feature1:[
  L("⛰️ 🏖️ 🌉 🏢","Nature makes some features. People build others."),
  S("Natural or built?",["Natural","Built"],[["mountain",0],["river",0],["beach",0],["bridge",1],["road",1],["school",1]]),
  P("A bridge is...",[["Built","Yes! People made it."],["Natural","People built the bridge."]],0)
 ],
 care1:[
  L("🗑️ 🌳 💧","We can look after places."),
  S("Helps or harms?",["Helps","Harms"],[["plant a tree",0],["save water",0],["pick up litter",0],["drop rubbish",1]]),
  P("Litter can hurt...",[["Animals","Yes! Animals can eat it."],["Nobody","Litter can hurt animals."]],0)
 ],
 rule1:[
  L("🛑 🚶","Rules help people stay safe."),
  R("At the crossing.",["Wait for the walk sign.","Look both ways.","Cross the road."]),
  P("A stop sign tells drivers to...",[["Stop","Yes!"],["Go fast","That would not be safe."]],0)
 ],
 choose1:[
  L("🪙 🛍️ 🐷 🤝","We can spend, save or share money."),
  S("Need or want?",["Need","Want"],[["food",0],["water",0],["toy",1],["lollies",1]]),
  P("You spend all your money. Now you...",[["Have none left","Yes! It cannot be spent twice."],["Have more","Spending makes money go."]],0)
 ],
 work1:[
  L("👩‍🍳 👷 🧑‍🏫 🧑‍⚕️","Many jobs use tools."),
  S("Whose tool?",["Chef","Builder"],[["pan",0],["knife",0],["hammer",1],["saw",1]]),
  P("A vet looks after...",[["Animals","Yes! A vet uses a stethoscope."],["Cars","A mechanic fixes cars."]],0)
 ],
 country1:[
  L("🏞️ 💧 ☁️","Country means land, waters, sky and living things.","Aboriginal and Torres Strait Islander Peoples have strong connections to Country."),
  R("When an Elder shares a story.",["Elders share stories about Country.","These stories are passed on for many generations.","We listen with respect.","We ask permission before we share a story."]),
  P("Before sharing someone's story we...",[["Ask permission","Yes. That shows respect."],["Tell everyone","We ask first."]],0)
 ]
});

K.add("1.technologies",{
 instr1:[
  L("🤖 ⬆️ ↩️ ↪️","Instructions are steps in order."),
  R("Robot steps.",["⬆️ Forward","⬆️ Forward","↪️ Turn right","⬆️ Forward"]),
  P("To go straight a robot goes...",[["Forward","Yes!"],["Turn left","That turns it."]],0)
 ],
 repeat1:[
  L("👏👏👏 = 🔁3 👏","A repeat does steps again. It is called a loop."),
  B("Repeat 3 times: clap. Tap to clap.",3,[["👏","clap",1]],[0,0,0],{total:"{n} claps",done:"3 claps!"}),
  P("Repeat 2 times: jump. How many jumps?",[["2","Yes!"],["1","It repeats 2 times."],["3","Count again."]],0)
 ],
 debug1:[
  L("🐞","A bug is a mistake in the steps."),
  HS("Wash hands. Tap the step in the wrong place.",["Soap.","Wet hands.","Dry hands."],[0],"Soap should come after we wet our hands."),
  P("After fixing we...",[["Test again","Yes! Check it works."],["Stop","Test to check."]],0)
 ],
 sortt1:[
  L("❓ ✅ ❌","Yes or no questions sort things into groups."),
  S("Does it have wings?",["Yes","No"],[["bird",0],["bee",0],["dog",1],["fish",1]]),
  P("A yes or no question is answered with...",[["Yes or no","Yes!"],["A colour","Just yes or no."]],0)
 ],
 chart1:[
  L("||||/","One line for each. The fifth line goes across."),
  B("Make 5 with tally marks. Tap a line.",5,[["|","1 line",1]],[0,0,0,0,0],{total:"{n} lines",done:"4 lines and one across. 5!"}),
  P("||| means...",[["3","Yes! 3 lines."],["5","5 has a line across."]],0)
 ],
 safe1t:[
  L("🔒","A password is a secret word."),
  S("Okay or keep private?",["Okay to share","Keep private"],[["a kind word",0],["a smile emoji",0],["password",1],["where I live",1]]),
  P("We tell our password to...",[["A trusted grown-up only","Yes!"],["Friends","Keep it secret from friends."]],0)
 ],
 keys1:[
  L("⌨️ 🖱️","A keyboard has letters, numbers and a space bar."),
  S("Keyboard or mouse?",["Keyboard","Mouse"],[["type letters",0],["space bar",0],["point",1],["click",1]]),
  P("The space bar makes a...",[["Gap","Yes! A space between words."],["Picture","It makes a gap."]],0)
 ],
 plan1:[
  L("✏️📄","A plan is a drawing before we make."),
  R("Make a bridge.",["Draw the plan.","Label the parts.","Make it.","Ask: does it work?"]),
  P("If it does not work we...",[["Change it","Yes! Then test again."],["Give up","We can change it."]],0)
 ],
 pattern1:[
  L("🔴🔵🔴🔵","A pattern repeats."),
  P("🔴 🔵 🔴 🔵 🔴 ... What comes next?",[["🔵","Yes! Red, blue, red, blue."],["🔴","Red was just there."],["🟢","Green is not in this pattern."]],0),
  P("Clap, stomp, clap, stomp, clap, ...",[["stomp","Yes!"],["clap","Clap was just there."]],0)
 ],
 garden1:[
  L("🌰🟫💧☀️","Food plants need seeds, soil, water and light."),
  R("Grow a carrot.",["Plant the seed.","Water it.","It grows.","Pick it when ready. 🥕"]),
  P("Carrots grow...",[["Under the ground","Yes! We pull them up."],["On trees","Apples grow on trees."]],0)
 ],
 build1:[
  L("🔺 🏗️","A wide base and triangles make things strong."),
  P("Which tower is stronger?",[["Wide base","Yes! A wide base keeps it standing."],["Tall and thin","Tall thin towers fall easily."]],0),
  P("To test a structure we...",[["Push gently","Yes!"],["Kick it","Push it gently."]],0)
 ],
 devices1:[
  L("📱 📷 🔊","Devices follow instructions."),
  S("What does it do?",["Takes photos","Plays sound"],[["camera",0],["phone camera",0],["speaker",1],["headphones",1]]),
  P("We tap to tell a device...",[["What to do","Yes! Then it answers."],["Our name","We tap to give instructions."]],0)
 ]
});
})();
