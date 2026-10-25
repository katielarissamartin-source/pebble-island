/* Hayden's themed lessons: dinosaurs and block-building.
   Same curriculum codes and lesson ids as the standard lessons; only the words change.
   Short sentences, small numbers, concrete pictures. Key = "year.area.lessonId". */
(function(){
const Q=(prompt,choices,correct,explain,hint)=>({prompt,choices,correct,explain,hint});
const L=(icon,title,goal,teach,example,tryIt,questions)=>({icon,title,goal,teach,example,tryIt,questions});
const T={};

T["5.science.adapt"]=L("🦖","Built to survive","Explain how living things suit their homes.",
"An adaptation is a feature or a behaviour that helps a living thing survive. Ankylosaurus had thick armour and a tail like a club. That helped protect it from hunters. Brachiosaurus had a very long neck to reach high leaves.",
"Today, a cactus has a waxy skin that saves water. An echidna has spines for protection. Mangrove trees have special roots for wet, low-oxygen mud.",
"Pick a block-world creature or a dinosaur. Draw one feature that helps it survive. Say why.",[
Q("How did armour help Ankylosaurus?",["It protected it from hunters","It made it rain","It turned it into a bird"],0,"Armour is an adaptation for protection.","Think safe from hunters."),
Q("Why did Brachiosaurus have a long neck?",["To reach high leaves","To swim underground","To dig tunnels"],0,"A long neck reaches food other animals cannot.","Think food high up."),
Q("Which is a plant adaptation for dry places?",["Roots that never touch soil","Waxy skin that saves water","Holes that leak water"],1,"Waxy skin keeps water in.","Think a desert cactus."),
Q("Bats are nocturnal. What does that mean?",["Active mostly at night","Active only in winter","Made of stone"],0,"Nocturnal animals are active at night. It is a behavioural adaptation.","Noc = night."),
Q("Why do some mangroves have special roots?",["To cope with wet, low-oxygen mud","To make the sea salty","To fly"],0,"The roots help the tree breathe and stand in mud.","Think wet mud.")]);

T["5.science.erosion"]=L("⛏️","Canyon builders","Tell apart weathering, erosion and deposition.",
"Weathering breaks rock into smaller bits. Erosion carries the bits away with water, wind or ice. Deposition is when the bits settle somewhere new. Over a very long time, layers of sand and mud can bury dinosaur bones.",
"A river carries sand downstream. When the water slows, the sand settles. That is deposition. Think of a block-world canyon made by water over a long time.",
"Look at a creek or a pile of soil after rain. Where did the soil go? Where did it settle?",[
Q("A river carries sand downstream. What is this?",["Erosion","Sunshine","Making metal"],0,"Moving material away is erosion.","The sand is on the move."),
Q("The river slows and the sand settles. What is this?",["Deposition","Evaporation","Magnetism"],0,"Settling in a new place is deposition.","The sand is dropped."),
Q("A rock cracks into smaller pieces but stays put. What is this?",["Weathering","Deposition","Photosynthesis"],0,"Breaking up in place is weathering.","It did not move."),
Q("Wind drops sand into a dune. What is this?",["Refraction","Deposition","Evaporation"],1,"The wind dropped the sand. That is deposition.","Dropped."),
Q("How can a dinosaur bone become buried?",["Layers of sand and mud settle on it","It floats into space","It turns into water"],0,"Deposition can bury bones over a long time.","Think layers.")]);

T["5.science.light"]=L("🔦","Light in the cave","Explain shadows, reflection and refraction.",
"Light travels in straight lines. An opaque thing blocks light and makes a shadow. Reflection is light bouncing off a surface. Refraction is light bending when it goes between materials, like air and water.",
"A torch in a dark cave makes shadows on the wall. A pencil in a glass of water looks bent. That is refraction.",
"In a dim room, use a torch and a toy. Make a big shadow and a small shadow.",[
Q("Why does an opaque thing make a shadow?",["It blocks some light","It makes more sunlight","It soaks up sound"],0,"The light cannot pass through, so there is a dark shape.","Light cannot get through."),
Q("A mirror changes light's direction by...",["Reflection","Deposition","Freezing"],0,"Bouncing light is reflection.","Light bounces."),
Q("A straw looks bent in a glass of water. Why?",["Light bends between water and air","The straw really breaks","Sound bends it"],0,"That bending is refraction.","Think refraction."),
Q("Which makes a clear, dark shadow?",["An opaque thing","A fully see-through thing","An invisible thing"],0,"Opaque things block light.","Block the light."),
Q("Light from a torch travels in...",["Straight lines","Zigzags only","Circles only"],0,"Light travels in straight lines.","Straight.")]);

T["5.science.particles"]=L("🧊","Inside matter","Use particles to explain solids, liquids and gases.",
"Matter is made of tiny particles. In a solid, particles stay in place and wiggle, like blocks in a tight grid. In a liquid, particles are close but slide past each other. In a gas, particles are far apart and move freely.",
"Water can be ice, liquid or steam. It is still water in every state. Only the particles' movement changes.",
"Make a grid of blocks for a solid. Slide them for a liquid. Spread them out for a gas.",[
Q("Which model shows a gas?",["Particles far apart, moving freely","Particles locked in a grid","No particles at all"],0,"Gas particles are spread out.","Far apart."),
Q("What do particles do in a liquid?",["Slide past one another","All stop","Turn into light"],0,"Liquid particles are close but can move.","Think flowing."),
Q("Why can a liquid flow but a solid keeps its shape?",["Liquid particles can slide","Liquids have no particles","Solids disappear"],0,"Sliding particles let a liquid flow.","Slide or stay."),
Q("Ice, water and steam are all...",["Water","Rock","Metal"],0,"The same stuff, different states.","Same stuff."),
Q("Which statement about water vapour is correct?",["It is a gas made of water","It has no matter","It is made of tiny stones"],0,"Water vapour is water as a gas.","Gas.")]);

T["5.hass.democracy"]=L("🗳️","Your voice matters","Understand voting and working together.",
"In a representative democracy, people vote for someone to speak and decide for them in parliament. People can also work together, like making a petition to fix a local park.",
"Imagine a game server. Players vote on a new rule. Most votes wins. That is a way of making a shared choice.",
"Make a class vote on one question. Count the votes. What won?",[
Q("What happens in a representative democracy?",["People vote for representatives","One person decides forever","Elections are banned"],0,"Voters choose people to decide for them.","Voting."),
Q("What is a way for people to act together?",["Start a petition","Ignore everyone","Break a playground"],0,"A petition shows many people agree.","Together."),
Q("How can people influence their representatives?",["Write to them about an issue","Keep problems secret","Pretend laws do not exist"],0,"They can contact them.","Speak up."),
Q("Why might a school hold a vote?",["To make a shared choice","To stop people speaking","To hide opinions"],0,"A vote helps decide together.","Together."),
Q("On a server, 7 players vote yes and 3 vote no. What wins?",["Yes","No","Nothing"],0,"7 is more than 3.","Which is more?")]);

T["5.hass.weather"]=L("🌊","Caring for places","See how communities prepare for hazards.",
"Floods, bushfires and drought can affect people and places. Communities get ready with plans, warnings and looking after the land. Listen to the official warnings.",
"In Queensland, flood warnings help people stay away from dangerous water. In your block world you build a safe base. In real life you make a safety plan.",
"Make a family safety plan. Where would you meet? What would you pack?",[
Q("Floodwater covers a road. What is safest?",["Stay out and follow official advice","Walk through it","Assume shallow water is safe"],0,"Floodwater can hide dangers.","Stay out."),
Q("How can planning help in a bushfire?",["Be ready and follow warnings","Ignore fire danger","Block the exits"],0,"Preparing helps keep people safe.","Be ready."),
Q("Where do you find storm warnings?",["Official weather and emergency services","A made-up story","An old advert"],0,"Use official sources.","Official."),
Q("What lowers risk from hazards?",["Emergency plans and clear warnings","Ignoring advice","Driving through floodwater"],0,"Plans and warnings keep people safe.","Plan."),
Q("Why do communities share warnings early?",["So people have time to get safe","To scare people","To hide the weather"],0,"Early warnings give time.","Time.")]);

T["5.hass.resources"]=L("⛏️","Needs, wants and resources","Know the kinds of resources.",
"Natural resources come from nature, like wood and stone. Human resources are people's skills and work. Capital resources are tools and machines that help make things.",
"In your block world: wood and iron ore are natural resources. Your building skill is a human resource. A pickaxe and a furnace are capital resources.",
"Pick something you made. List its natural, human and capital resources.",[
Q("Wood from a tree is a...",["Natural resource","Capital resource","Human resource"],0,"It comes from nature.","From nature."),
Q("A builder's skill is a...",["Human resource","Capital machine","Natural forest"],0,"Skills belong to people.","People."),
Q("A pickaxe is a...",["Capital resource","Natural resource","Human resource"],0,"Tools help make things. They are capital resources.","A tool."),
Q("A bakery oven is a...",["Capital resource","Natural resource","Human resource"],0,"An oven is equipment.","Equipment."),
Q("A farm tractor is a...",["Capital resource","Worker's skill","Weather pattern"],0,"A tractor is a machine.","Machine.")]);

T["5.technologies.binary"]=L("💡","Redstone lamps: on or off","Understand how computers store information.",
"Computers use bits. A bit is 0 or 1. Think of a redstone lamp. Off is 0. On is 1. A row of lamps can store a number. The places are worth 4, 2 and 1.",
"101 means lamp on, off, on. That is 4 + 0 + 1 = 5.",
"Make three paper lamps. Show the number 6 with on and off.",[
Q("Which digits does binary use?",["0 and 1","1 and 9","2 and 8"],0,"Binary uses only 0 and 1.","Two digits."),
Q("What is 101 in binary?",["Five","One hundred and one","Ten"],0,"4 + 0 + 1 = 5.","Places 4, 2, 1."),
Q("What number is 110 in binary?",["6","110","3"],0,"4 + 2 + 0 = 6.","4 + 2."),
Q("What is binary 11 in ordinary numbers?",["3","11","2"],0,"2 + 1 = 3.","2 + 1."),
Q("A bit is...",["A 0 or a 1","A letter only","A colour"],0,"A bit is 0 or 1.","Two choices.")]);

T["5.technologies.loops"]=L("🧱","Build a mini program","Use loops, choices and variables.",
"A loop repeats steps. A variable holds a value that can change. An if chooses what to do. Together they make a program.",
"Diamonds start at 0. Repeat 3 times: add 2. Diamonds is now 6. If night, place a torch.",
"Write a program for building a 4-block wall. Use a loop.",[
Q("Score starts at 0. A loop adds 2, 3 times. Final score?",["6","3","2"],0,"2 + 2 + 2 = 6.","Add three times."),
Q("What is a variable?",["A named value that can change","A picture that never loads","A button colour"],0,"A variable stores a value.","Stores a value."),
Q("A loop repeats 'add 3' four times from 0. Total?",["12","7","4"],0,"3 + 3 + 3 + 3 = 12.","Four threes."),
Q("What does an if statement do?",["Chooses actions when a condition is true","Repeats forever","Deletes variables"],0,"If decides.","Decides."),
Q("If it is night, place a torch. It is day. What happens?",["No torch","Place a torch","Delete the world"],0,"The condition is false.","Is it night?")]);

T["5.technologies.app-design"]=L("📱","Design a dino-finder app","Design an app around the user.",
"A user story says who needs something and why. Good designers make clear buttons and high-contrast words. Then they test with a real user.",
"User story: As a dinosaur fan, I want a big, clear map so I can find the fossil room.",
"Sketch a dino-finder app screen with 3 big buttons.",[
Q("What helps a child read a game screen?",["High-contrast text and clear buttons","Tiny pale letters","No labels"],0,"Clear design helps.","Easy to see."),
Q("What does a user story describe?",["Who needs something and why","Only colours","A password"],0,"It shows the need.","Who and why."),
Q("What is good feedback from a test?",["A user cannot find the next button","The designer likes blue","It was opened on Tuesday"],0,"Real problems help improve it.","Real problems."),
Q("Why add labels as well as icons?",["People may not know the icons","Labels slow apps","Icons must be tiny"],0,"Words explain icons.","Words help."),
Q("Why test an app with real users?",["To find what is hard to use","To make it slower","To hide problems"],0,"Testing finds problems.","Find problems.")]);

T["5.technologies.sustainable-design"]=L("🏗️","Design with care","Judge a design with criteria.",
"Criteria are checks for a good design. They can be safety, strength, price, repair and effects on nature. Good choices compare more than one thing.",
"A base built to last may be better than a cheap one that breaks. Think about cost and materials too.",
"List 3 criteria for a good tree house.",[
Q("Which is a useful criterion for a school lunchbox?",["Safe and strong","Hard to open and leaks","Impossible to clean"],0,"Safe and strong makes sense.","Safe."),
Q("Why compare more than one criterion?",["Designs involve trade-offs","Every design is perfect","Only colour matters"],0,"Often you must balance things.","Balance."),
Q("Which feature helps a device last longer?",["Parts that can be repaired","A glued battery","A casing that breaks easily"],0,"Repairable parts help.","Repair."),
Q("Why might the cheapest design not be best?",["It may wear out or be unsafe","Price is the only thing that matters","All materials are equal"],0,"Cheap can cost more later.","Think later."),
Q("A base made of dirt or stone: which is stronger?",["Stone","Dirt","Same"],0,"Stone is stronger in the game.","Strong.")]);

T["5.maths.percentage"]=L("🧱","Percent of the build","Link percent, fractions and decimals.",
"Percent means out of 100. Imagine a wall of 100 blocks. 50 of them is 50%. That is half, or 0.5. 25% is one quarter.",
"25% of 80 blocks is 20 blocks. 25% is one quarter, and 80 ÷ 4 = 20.",
"Colour 25 squares on a 100 grid. What percent is it? What fraction?",[
Q("Which fraction equals 50%?",["1/2","1/3","1/5"],0,"50 out of 100 is a half.","Half."),
Q("What is 25% of 80?",["20","40","25"],0,"80 ÷ 4 = 20.","Quarter."),
Q("Which decimal equals 75%?",["0.75","7.5","0.075"],0,"75 out of 100 is 0.75.","Hundredths."),
Q("What is 10% of 50?",["5","10","50"],0,"50 ÷ 10 = 5.","Divide by 10."),
Q("A herd has 100 dinosaurs. 20 are babies. What percent are babies?",["20%","2%","80%"],0,"20 out of 100 is 20%.","Out of 100.")]);

T["5.maths.fractions"]=L("🥚","Fractions of the dino nest","Add fractions with related parts.",
"When the bottom numbers match, add the top numbers. 1/4 + 2/4 = 3/4. If the bottoms are different but related, change one so they match. 1/2 is the same as 2/4.",
"1/2 + 1/4 = 2/4 + 1/4 = 3/4.",
"Fold a paper into quarters. Colour 1/2 and 1/4. How much is coloured?",[
Q("1/5 + 2/5 = ?",["3/5","3/10","2/5"],0,"Add the tops: 1 + 2 = 3.","Same bottoms."),
Q("1/2 + 1/4 = ?",["3/4","2/6","1/8"],0,"1/2 = 2/4, so 2/4 + 1/4 = 3/4.","Match bottoms."),
Q("3/8 − 1/8 = ?",["1/4","2/16","1/8"],0,"3/8 − 1/8 = 2/8 = 1/4.","Take away tops."),
Q("A nest has 4 eggs. 1/4 hatch. How many hatch?",["1","2","3"],0,"1/4 of 4 is 1.","Quarter of 4."),
Q("1/3 + 1/3 = ?",["2/3","2/6","1/3"],0,"Add the tops.","Same bottoms.")]);

T["5.maths.multiply"]=L("🦕","Multiply bigger numbers","Use smart multiplying.",
"Split a big number into tens and ones. Multiply each part. Then add. 24 × 3 = (20 × 3) + (4 × 3) = 72.",
"4 nests with 23 eggs each: (20 × 4) + (3 × 4) = 80 + 12 = 92.",
"A pack has 15 blocks. How many in 6 packs? Split 15 into 10 and 5.",[
Q("23 × 4 = ?",["92","82","96"],0,"80 + 12 = 92.","Split 23."),
Q("15 × 6 = ?",["90","75","95"],0,"60 + 30 = 90.","10 × 6 and 5 × 6."),
Q("120 × 3 = ?",["360","123","320"],0,"12 × 3 = 36, so 360.","12 × 3."),
Q("Each dinosaur eats 12 plants. 5 dinosaurs eat?",["60","17","50"],0,"10 × 5 = 50, 2 × 5 = 10, 50 + 10 = 60.","Split 12."),
Q("What is 10 × 7?",["70","17","107"],0,"Ten sevens is 70.","Add a zero.")]);

T["5.maths.estimates"]=L("🎯","Check the answer","Use estimates to check.",
"Round numbers first to make an estimate. Then you can tell if an answer looks sensible. 48 × 6 is about 50 × 6 = 300.",
"If a builder says 99 × 4 = 40, you can see it is too small because 100 × 4 is about 400.",
"Estimate 29 + 31. Then add them. Were they close?",[
Q("Best estimate for 49 × 5?",["250","25","2500"],0,"50 × 5 = 250.","Round to 50."),
Q("About how much is $19 + $21 + $18?",["$60","$20","$120"],0,"20 + 20 + 20 = 60.","Round to 20."),
Q("A student says 99 × 4 = 40. What is true?",["It is much too small","It is a good estimate","It is too large"],0,"100 × 4 is about 400.","Round 99."),
Q("Estimate 31 + 29.",["About 60","About 30","About 600"],0,"30 + 30 = 60.","Round both."),
Q("Why estimate?",["To check an answer makes sense","To make it slower","To avoid numbers"],0,"Estimates catch mistakes.","Check.")]);

T["5.english.perspective"]=L("🦖","Who tells the story?","See how the narrator's view changes the story.",
"The narrator is who tells the story. First person uses I and me. Other stories use he, she or they. Two characters can see the same event differently.",
"'I ducked as the T. rex roared.' This is first person.",
"Tell a short event twice: as the dinosaur, and as the ranger.",[
Q("Which sentence uses first person?",["I opened the door.","She opened the door.","They opened the door."],0,"I means first person.","I."),
Q("Why might two characters describe one event differently?",["They have different experiences","It happened twice","Only one has feelings"],0,"Everyone sees things differently.","Different eyes."),
Q("'He thought the forest was safe, but she was afraid.' This shows...",["Different points of view","Identical opinions","No feelings"],0,"Two different views.","Two views."),
Q("Which sentence is first person?",["I roared at the sky.","The dino roared.","He roared."],0,"I.","I."),
Q("A story told with 'she' and 'he' is...",["Not first person","First person","A recipe"],0,"First person uses I.","Look for I.")]);

T["5.english.imagery"]=L("🌋","Word pictures","Know similes, metaphors and personification.",
"A simile compares with like or as. A metaphor says one thing is another. Personification gives a human feeling to a non-human thing.",
"'The T. rex was as loud as thunder.' simile. 'The cave was a mouth.' metaphor. 'The volcano grumbled.' personification.",
"Write one simile about a dinosaur. Use like or as.",[
Q("Which is a simile?",["As quiet as a mouse","The moon is a lamp","The stars winked"],0,"As compares.","Like or as."),
Q("'The classroom was a zoo.' This is a...",["Metaphor","Fact","Recipe"],0,"It says one thing is another.","Is."),
Q("'The wind whispered through the leaves.' This is...",["Personification","A number fact","A quote"],0,"Wind cannot whisper.","Human act."),
Q("'The volcano grumbled.' This is...",["Personification","A simile","A fact only"],0,"Volcanoes cannot grumble.","Human."),
Q("'Her teeth were like knives.' This is a...",["Simile","Metaphor","Personification"],0,"Like compares.","Like.")]);

T["5.english.evidence"]=L("🔎","Reasons and sources","Back up an idea with reasons.",
"A strong argument gives reasons and good evidence. A good source can be a scientist, museum or official site. An opinion alone is not enough.",
"Instead of 'Dinosaurs are cool', say 'Fossils show how they lived, and museum scientists study them.'",
"Pick an opinion. Give one reason and one source.",[
Q("Which best supports 'Our school needs more trees'?",["Trees provide shade on hot days","Trees have names","I like T"],0,"A real reason.","Reason."),
Q("Best source for an official storm warning?",["The Bureau of Meteorology","An old story","A guess"],0,"An official source.","Official."),
Q("Which is a reason based on evidence?",["A survey found most students walk to school.","Everyone agrees because I say so.","Blue is my favourite."],0,"A survey is evidence.","Facts."),
Q("Where could you check a dinosaur fact?",["A museum or scientist","A made-up story","A rumour"],0,"Experts know.","Experts."),
Q("Why is 'I just like it' not enough?",["It is an opinion with no evidence","It is always wrong","It is too long"],0,"Evidence is needed.","Evidence.")]);

T["5.english.structure"]=L("📝","Build better paragraphs","Link ideas across paragraphs.",
"The first sentence tells the main idea. Linking words guide readers from one point to the next.",
"'Another reason to protect rivers is...' adds a new idea.",
"Write a paragraph about your favourite dinosaur. Start with the main idea.",[
Q("Which phrase adds another point?",["Furthermore,","On the other hand,","Yesterday at 6 am,"],0,"It adds more.","Add."),
Q("Which is a strong start for a paragraph about recycling?",["Recycling can reduce the amount of rubbish sent to landfill.","This is a nice thing.","And then this happened."],0,"It says the main idea.","Main idea."),
Q("Which signals a different idea?",["However,","For example,","Similarly,"],0,"However shows contrast.","Contrast."),
Q("What does a first sentence do?",["Tells the main idea","Hides the idea","Ends the story"],0,"It sets up the topic.","Topic."),
Q("Which phrase gives an example?",["For example,","However,","Meanwhile,"],0,"It introduces an example.","Example.")]);

window.PEBBLE_THEMES=window.PEBBLE_THEMES||{};
window.PEBBLE_THEMES[1]=Object.assign(window.PEBBLE_THEMES[1]||{},T);
})();
