(function(){
const K=window.PEBBLE_TEACH_KIT;if(!K)return;
const {L,R,S,P,B,H,HS}=K;

K.add("3.maths",{
 large:[
  L("🔟🏛️ 🏛️ 💯 🔟 1️⃣","Places go ones, tens, hundreds, thousands, ten-thousands.","12 405 is twelve thousand, four hundred and five."),
  R("Read 34 210 place by place.",["3 is 3 ten-thousands: 30 000","4 is 4 thousands: 4 000","2 is 2 hundreds: 200","1 is 1 ten: 10"]),
  P("Which is greater?",[["12 500","Yes! 5 hundreds beats 0 hundreds."],["12 050","Only 0 hundreds. 12 500 has 5."]],0)
 ],
 regroup:[
  L("🟩🟩🟩 + 🟡","Split a number into tens and ones to add."),
  R("Let's do 126 + 35.",["126 + 30 = 156","156 + 5 = 161","So 126 + 35 = 161."]),
  P("124 + 30 = ?",[["154","Yes! Add 3 tens. 12 tens becomes 15 tens."],["127","That added 3 ones."],["424","That added 3 hundreds."]],0)
 ],
 multiples:[
  L("🍓🍓🍓 🍓🍓🍓 🍓🍓🍓 🍓🍓🍓","4 groups of 3 is 12."),
  B("Make 4 groups of 5. Tap a group of 5.",20,[["🖐️","5",5]],[0,0,0,0],{done:"4 × 5 = 20!"}),
  P("How many groups of 3 are in 18?",[["6","Yes! 6 × 3 = 18."],["3","3 is the size of each group."],["9","9 groups of 2 make 18."]],0)
 ],
 measure:[
  L("📏","We measure length in centimetres and metres.","100 centimetres is 1 metre."),
  S("Which unit fits best?",["Centimetres","Metres"],[["pencil",0],["eraser",0],["doorway",1],["pool",1]]),
  P("Which is about 2 metres tall?",[["A doorway","Yes!"],["A cup","A cup is a few centimetres."],["A pencil","A pencil is about 15 cm."]],0)
 ],
 addsub1000:[
  L("💯 🔟 1️⃣","Line up hundreds, tens and ones."),
  R("Let's do 246 + 130.",["Ones: 6 + 0 = 6","Tens: 40 + 30 = 70","Hundreds: 200 + 100 = 300","300 + 70 + 6 = 376"]),
  B("Build 320 + 150. Tap hundreds and tens.",470,[["🟦","100",100],["🟩","10",10]],[0,0,0,0,1,1,1,1,1,1,1],{done:"4 hundreds and 7 tens. 470!"})
 ],
 times:[
  L("🍎🍎🍎🍎🍎 ×3","Multiplying is adding equal groups.","3 × 5 = 5 + 5 + 5 = 15."),
  B("Make 3 × 5. Tap a group of 5.",15,[["🖐️","5",5]],[0,0,0],{done:"5 + 5 + 5 = 15!"}),
  P("5 × 3 is the same as...",[["3 × 5","Yes! Swap the order. Same answer."],["5 + 3","That adds. It is not times."],["53","That is just the digits."]],0)
 ],
 share:[
  L("🍬🍬🍬 | 🍬🍬🍬 | 🍬🍬🍬","Dividing is sharing equally."),
  R("Share 12 between 3 friends. Deal one each.",["🍬 🍬 🍬 (3 used)","🍬 🍬 🍬 (6 used)","🍬 🍬 🍬 (9 used)","🍬 🍬 🍬 (12 used)","Each friend has 4."]),
  P("3 × 5 = 15. So 15 ÷ 3 = ?",[["5","Yes! Times and divide are a team."],["3","3 is how many groups."],["15","15 is the total."]],0)
 ],
 fractions3:[
  L("🍕","A unit fraction is one equal part.","More parts means each part is smaller."),
  B("Make a whole pizza. Tap quarters.",4,[["🍕","1/4",1]],[0,0,0,0],{total:"{n} quarters",done:"4 quarters make 1 whole!"}),
  P("Which is bigger?",[["1/2","Yes! 2 big parts beat 4 small parts."],["1/4","1/4 is cut into more parts. Each is smaller."]],0)
 ],
 time3:[
  L("🕞","The long hand shows minutes. Count by 5s.","Each number is 5 minutes."),
  R("The long hand is on 6. Count by 5s.",["1 → 5","2 → 10","3 → 15","4 → 20","5 → 25","6 → 30 minutes past"]),
  P("Half past 4 is...",[["4:30","Yes! 30 minutes past 4."],["4:15","That is quarter past."],["4:45","That is quarter to 5."]],0)
 ],
 shapes3:[
  L("📐","A right angle is a square corner."),
  S("Right angle or acute?",["Right angle","Acute (smaller)"],[["book corner",0],["square corner",0],["pizza slice tip",1],["sharp tip of a triangle",1]]),
  P("How many right angles in a rectangle?",[["4","Yes! Every corner is square."],["2","Count all corners."],["0","Its corners are square corners."]],0)
 ],
 data3:[
  L("||||/ |","A tally line counts one. Four lines and a line across is five."),
  B("Show 6 votes. Tap tally groups.",6,[["||||/","5",5],["|","1",1]],[0,1],{total:"{n} votes",done:"5 and 1 more is 6!"}),
  P("Votes: red 5, blue 8, green 3. Which has the most?",[["Blue","Yes! 8 is the most."],["Red","5 is less than 8."],["Green","3 is the least."]],0)
 ],
 perimeter:[
  L("⬜","Perimeter is the distance around the edge."),
  R("A rectangle 4 cm by 2 cm. Walk round it.",["4 cm","2 cm","4 cm","2 cm","4 + 2 + 4 + 2 = 12 cm"]),
  B("A square has 5 cm sides. Tap each side.",20,[["📏","5 cm",5]],[0,0,0,0],{total:"{n} cm",done:"5 + 5 + 5 + 5 = 20 cm!"})
 ]
});

K.add("3.english",{
 purpose:[
  L("📖 📋 📣","Writers entertain, inform or persuade."),
  S("What is it for?",["Persuade","Inform","Entertain"],[["letter asking to fix a park",0],["report about volcanoes",1],["story told by a fox",2]]),
  P("A safety sign at school is for...",[["People at the school","Yes! That is its audience."],["People on the Moon","It is for people who use the school."]],0)
 ],
 paragraph:[
  L("📄","A paragraph is sentences about one main idea."),
  HS("Tap the 2 sentences about whales.",["Whales breathe air.","Bees make honey.","Whales live in oceans."],[0,2],"Find the sentences that talk about whales."),
  P("Start a new paragraph when you...",[["Start a new main idea","Yes!"],["Use a long word","New idea, new paragraph."]],0)
 ],
 inference:[
  L("🔍","Use clues and what you know to work things out."),
  HS("Tap the clue that shows rain is coming.",["Sana went outside.","Dark clouds gathered.","Sana had a red bag."],[1],"Which detail is about the weather?"),
  P("Tom pulled up his blanket and shivered. How does Tom feel?",[["Cold","Yes! Shivering is a clue."],["Hungry","There is no food clue."]],0)
 ],
 figurative:[
  L("💥 🐝 💦","Some words sound like the noise they name.","That is onomatopoeia."),
  H("Tap the sound word.","The bee went buzz near the flower.",["buzz"],"Which word sounds like a noise?"),
  P("Which sound suits a balloon popping?",[["POP!","Yes!"],["Moo","A cow says moo."],["Hiss","Hiss is a slow leak."]],0)
 ],
 verbtense:[
  L("⏪ ▶️ ⏩","Past: jumped. Present: jumps. Future: will jump."),
  S("When did it happen?",["Past","Present","Future"],[["She baked a cake.",0],["I walked.",0],["I walk.",1],["We will visit the zoo.",2]]),
  P("The past tense of play is...",[["played","Yes! Add -ed."],["plays","That is now."],["will play","That is later."]],0)
 ],
 sentences3:[
  L("🔠 ... .","A sentence has a subject and a verb.","It starts with a capital and ends with a mark."),
  H("Tap the subject. Who did it?","Mia ran home.",["Mia"],"Who ran?"),
  HS("Tap the complete sentence.",["The dog barked.","Barked at the."],[0],"Which one has who and what they did?")
 ],
 adjectives3:[
  L("🌳 🏃","Adjectives describe nouns. Adverbs describe verbs.","a tall tree, ran quickly"),
  H("Tap the adjective.","The shiny coin fell.",["shiny"],"Which word tells about the coin?"),
  H("Tap the adverb.","She spoke softly.",["softly"],"Which word tells how she spoke?")
 ],
 spelling3:[
  L("📦📦","Add -s or -es to make more than one.","box ends in x, so boxes."),
  S("Add -s or -es?",["-s","-es"],[["cat",0],["dog",0],["box",1],["dish",1]]),
  P("Which word has magic e?",[["cake","Yes! The e makes a say its name."],["cat","No e on the end."]],0)
 ],
 dialogue:[
  L("💬","Speech marks go around the exact words someone says."),
  HS("Tap the sentence written correctly.",["Tom said, \"Come here.\"","Tom said, Come here."],[0],"Look for speech marks around the words."),
  H("\"Run!\" shouted Lee. Tap who is speaking.","\"Run!\" shouted Lee.",["Lee"],"Who shouted?")
 ],
 storyplan:[
  L("🗺️","Beginning. Middle. End."),
  S("Where does it go in the story?",["Beginning","Middle","End"],[["A boy finds a map.",0],["He gets lost.",1],["He finds his way home.",2]]),
  P("Where is the problem?",[["In the middle","Yes!"],["At the beginning","The beginning sets things up."],["At the end","The end solves it."]],0)
 ],
 report3:[
  L("📰","A report gives facts. Facts can be checked."),
  S("Fact or opinion?",["Fact","Opinion"],[["Frogs lay eggs.",0],["Frogs eat insects.",0],["Pizza is the tastiest food.",1],["Frogs are the best.",1]]),
  P("A heading...",[["Tells what a part is about","Yes!"],["Is always a question","A heading names the part."]],0)
 ],
 rhyme3:[
  L("🐱🎩🦇","Rhyming words end with the same sound."),
  S("Rhymes with moon or hop?",["moon","hop"],[["spoon",0],["tune",0],["top",1],["mop",1]]),
  B("Twin-kle, twin-kle. Tap a clap for each beat.",4,[["👏","clap",1]],[0,0,0,0],{total:"{n} beats",done:"Twin-kle twin-kle. 4 beats!"})
 ]
});

K.add("3.science",{
 groups:[
  L("🦴","Animals with a backbone are vertebrates.","Animals without one are invertebrates."),
  S("Backbone or no backbone?",["Vertebrate","Invertebrate"],[["fish",0],["sparrow",0],["butterfly",1],["spider",1],["worm",1]]),
  P("Why do scientists group animals?",[["To see what they share","Yes!"],["To give them names only","Grouping shows what they share."]],0)
 ],
 vertebrates:[
  L("🐟 🐸 🦎 🐦 🐋","There are five vertebrate groups."),
  S("Which group?",["Mammal","Bird","Amphibian"],[["whale",0],["dog",0],["parrot",1],["frog",2]]),
  P("A snake has dry scales. It is a...",[["Reptile","Yes!"],["Mammal","Mammals have fur or hair."]],0)
 ],
 plants3:[
  L("🌱☀️💧","Plants need light, water, air and space."),
  S("Needed or not?",["Plant needs","Not needed"],[["light",0],["water",0],["air",0],["chocolate",1]]),
  P("What do roots do?",[["Take in water","Yes!"],["Catch light","Leaves catch light."]],0)
 ],
 heat:[
  L("☀️🔥","Heat moves from hot things to cold things."),
  R("Hold a hot cup with cold hands.",["The cup is hot.","Your hands are cold.","Heat moves into your hands.","Your hands get warm."]),
  S("Heat source or not?",["Makes heat","Does not"],[["Sun",0],["stove",0],["rubbing hands",0],["ice cube",1]])
 ],
 daynight:[
  L("🌍☀️","Earth spins once every 24 hours."),
  R("Earth spins.",["Your side faces the Sun. Day ☀️","Earth keeps spinning.","Your side faces away. Night 🌙","One spin takes 24 hours."]),
  P("Day and night happen because...",[["Earth spins","Yes!"],["The Sun goes round Earth","It only looks that way."]],0)
 ],
 states:[
  L("🧊 💧 ♨️","Solids keep their shape. Liquids flow. Gases spread out."),
  S("Solid, liquid or gas?",["Solid","Liquid","Gas"],[["rock",0],["ice",0],["water",1],["milk",1],["steam",2]]),
  P("A liquid takes the shape of its...",[["Container","Yes! Pour juice in a cup."],["Lid","It fills the container."]],0)
 ],
 melting:[
  L("🍦☀️","Heating melts. Cooling freezes."),
  S("Heat or cool?",["Melt (heat)","Freeze (cool)"],[["chocolate in the sun",0],["ice cream on a hot day",0],["water in the freezer",1],["juice into an ice block",1]]),
  P("Water freezes at about...",[["0 degrees","Yes! 0 degrees Celsius."],["100 degrees","That is when water boils."]],0)
 ],
 soil:[
  L("🪨🍂💧💨","Soil is rock bits, dead plants, water and air."),
  S("Gritty or sticky?",["Sandy (gritty)","Clay (sticky)"],[["feels rough",0],["falls apart",0],["feels smooth and sticky",1],["rolls into a ball",1]]),
  P("Why is soil useful?",[["Plants grow in it","Yes!"],["It is shiny","Soil helps plants grow."]],0)
 ],
 fairtest3:[
  L("✈️✈️","A fair test changes only one thing."),
  S("Paper plane test. Change or keep the same?",["Change","Keep the same"],[["type of paper",0],["how hard you throw",1],["where you stand",1],["plane shape",1]]),
  P("Why repeat a test?",[["To check the result","Yes!"],["To change everything","Keep it the same and check."]],0)
 ],
 observe3:[
  L("👀✋👃👂🔍","Scientists use their senses. A magnifying glass shows small details."),
  R("Look at a leaf with a magnifying glass.",["The edges.","The veins.","The stalk.","Draw and label them."]),
  P("Which sense needs an adult to say it is safe?",[["Taste","Yes! Never taste unless an adult says so."],["Sight","Looking is safe."]],0)
 ],
 adapt3:[
  L("🐻‍❄️🐫🐸","Adaptations help an animal live in its habitat."),
  S("What does it help with?",["Stay warm","Swim"],[["polar bear's thick fur",0],["penguin's fat layer",0],["frog's webbed feet",1],["duck's webbed feet",1]]),
  P("A habitat is...",[["Where an animal lives","Yes!"],["What it eats","A habitat is its home."]],0)
 ],
 forces3:[
  L("🫸 🫷 🧲","A push moves away. A pull brings closer."),
  S("Push or pull?",["Push","Pull"],[["a swing going away",0],["kicking a ball",0],["a magnet on iron",1],["opening a drawer",1]]),
  P("Friction on a rough surface...",[["Slows things","Yes!"],["Speeds things up","Rough surfaces slow things."]],0)
 ]
});

K.add("3.hass",{
 community:[
  L("🏘️ 🏫 ⚽","A community shares a place or an interest."),
  S("Community or not?",["Community","Not a community"],[["a school",0],["a sports club",0],["a suburb",0],["one rock",1]]),
  P("How do people help a community?",[["By sharing and caring","Yes!"],["By staying apart","Communities share."]],0)
 ],
 pastpresent:[
  L("📷 ➡️ 📱","Places change over time."),
  S("Then or now?",["Then","Now"],[["dirt road",0],["horse and cart",0],["sealed street",1],["electric car",1]]),
  P("How can we learn about the past?",[["Old photos and stories","Yes!"],["Guessing","Photos and stories tell us."]],0)
 ],
 diversity3:[
  L("🧑🏽👩🏻🧑🏿👨🏼","People come from many places and cultures."),
  R("One street.",["One family speaks Greek.","One speaks Vietnamese.","One speaks English.","Everyone is treated with respect."]),
  P("Diversity means...",[["Many different people and cultures","Yes!"],["Everyone is the same","Diversity means different."]],0)
 ],
 commem:[
  L("📅","Communities have days to remember or celebrate."),
  S("Which day?",["Anzac Day","NAIDOC Week"],[["25 April",0],["dawn services",0],["celebrates Aboriginal and Torres Strait Islander cultures",1]]),
  P("Why have special days?",[["To remember and celebrate","Yes!"],["To skip school","They help us remember."]],0)
 ],
 country3:[
  L("🏞️ 💧 ☁️","Aboriginal and Torres Strait Islander Peoples have lived in Australia for more than 60,000 years."),
  R("What Country means.",["Land.","Waters.","Sky.","All living things and their stories."]),
  P("How can we show respect?",[["Listen and learn","Yes."],["Make up stories","We listen and learn."]],0)
 ],
 maps3:[
  L("🧭","A compass rose shows north, south, east and west."),
  R("Never Eat Soggy Weetbix.",["N is north ⬆️","E is east ➡️","S is south ⬇️","W is west ⬅️"]),
  P("What does a map key show?",[["What symbols mean","Yes!"],["Where you live","The key explains symbols."]],0)
 ],
 weather3:[
  L("☀️🌧️❄️","Weather changes daily. Climate is usual weather over many years."),
  S("Hot or cold weather?",["Hot","Cold"],[["hat",0],["light clothes",0],["coat",1],["beanie",1]]),
  P("Climate is...",[["The usual weather over many years","Yes!"],["Today's weather","That is weather."]],0)
 ],
 localgov:[
  L("🏛️","A council is the local government."),
  S("Council job or not?",["Council job","Not council"],[["empty bins",0],["mow parks",0],["run libraries",0],["make your bed",1]]),
  P("People choose council members by...",[["Voting","Yes!"],["Picking names from a hat","They vote."]],0)
 ],
 rules3:[
  L("🚦","Rules keep us safe and fair. Laws are rules for everyone."),
  S("Rule or law?",["Home or school rule","Law for everyone"],[["tidy your room",0],["hands up to talk",0],["stop at a red light",1],["wear a seatbelt",1]]),
  P("A law is a rule for...",[["Everyone in a country","Yes!"],["Just one family","That is a home rule."]],0)
 ],
 needs3:[
  L("💧🍞🏠","Needs keep us alive. Wants are nice to have."),
  S("Need or want?",["Need","Want"],[["water",0],["food",0],["shelter",0],["new toy",1],["treats",1]]),
  P("Saving money helps you...",[["Buy something later","Yes!"],["Spend it now","Saving is for later."]],0)
 ],
 jobs3:[
  L("🧑‍⚕️ 🧑‍🏫 🧑‍🌾 👷","Many jobs help a community."),
  S("What does the job do?",["Keeps us healthy","Grows food"],[["nurse",0],["doctor",0],["farmer",1],["fruit grower",1]]),
  P("Jobs change over time because...",[["New tools and needs appear","Yes!"],["People forget","New tools change jobs."]],0)
 ],
 neighbours3:[
  L("🇦🇺 🌏","Australia is a country and a continent."),
  S("Australia's neighbour or far away?",["Near neighbour","Far away"],[["New Zealand",0],["Papua New Guinea",0],["Indonesia",0],["Canada",1]]),
  P("Places are connected by...",[["Trade and travel","Yes!"],["Nothing","We share trade, food and travel."]],0)
 ]
});

K.add("3.technologies",{
 algo3:[
  L("📋","An algorithm is a list of steps in order."),
  R("Make toast.",["Put bread in.","Push the lever.","Wait.","Take it out."]),
  P("Steps in the wrong order means...",[["The job may fail","Yes!"],["It works better","Order matters."]],0)
 ],
 loops3:[
  L("🔁","A loop repeats steps."),
  B("Repeat 2: jump, spin. Tap each move.",4,[["🦘","jump",1],["🌀","spin",1]],[0,1,0,1],{total:"{n} moves",done:"Jump, spin, jump, spin. 4 moves!"}),
  P("'Repeat 4: clap' means clap...",[["4 times","Yes!"],["1 time","It repeats 4 times."]],0)
 ],
 ifthen3:[
  L("🌧️☂️ / ☀️🧢","If it is true, do this. If not, do that."),
  S("If raining take an umbrella. Otherwise a hat.",["Umbrella","Hat"],[["🌧️ raining",0],["☀️ sunny",1],["⛅ cloudy, dry",1]]),
  P("'If hungry, eat.' You are not hungry. You...",[["Do not eat","Yes!"],["Eat","The condition is not true."]],0)
 ],
 debug3:[
  L("🐞","A bug is a mistake in the steps."),
  HS("Tap the step in the wrong place.",["Put toast in.","Push the lever.","Put butter on.","Wait."],[2],"Can you butter toast before it is done?"),
  P("After a fix you should...",[["Test again","Yes!"],["Stop","Test to check."]],0)
 ],
 inout3:[
  L("⌨️➡️💻➡️🖥️","Input goes in. Output comes out."),
  S("Input or output?",["Input","Output"],[["keyboard",0],["mouse",0],["microphone",0],["speaker",1],["printer",1]]),
  P("A touchscreen can be...",[["Input and output","Yes! You tap it. It shows things."],["Only output","You also tap it."]],0)
 ],
 pixels3:[
  L("🟨🟨🟨\n🟨⬛🟨\n🟨🟨🟨","A digital picture is tiny squares called pixels."),
  B("Build a 3 by 3 pixel grid. Tap a pixel.",9,[["🟨","1 pixel",1]],[0,0,0,0,0,0,0,0,0],{total:"{n} pixels",done:"9 pixels. A little picture!"}),
  P("More pixels give...",[["More detail","Yes!"],["Less detail","More squares, more detail."]],0)
 ],
 files3:[
  L("📁📄","A folder keeps files together."),
  P("Which is a clear file name?",[["Dinosaur drawing","Yes! You can tell what it is."],["Untitled","That says nothing."]],0),
  P("Why save often?",[["So you do not lose work","Yes!"],["To make it slow","Saving keeps work safe."]],0)
 ],
 network3:[
  L("📱📶💻","A network joins devices to share information."),
  R("Send a message.",["It breaks into small pieces.","The pieces travel.","They are put back together.","The message arrives."]),
  P("Wi-Fi joins devices...",[["Without wires","Yes!"],["With string","No wires needed."]],0)
 ],
 safe3:[
  L("🔒","Keep private details private."),
  S("Okay to share or private?",["Okay","Private"],[["favourite colour",0],["full name",1],["home address",1],["password",1]]),
  P("A stranger messages you. You...",[["Tell a trusted adult","Yes!"],["Reply","Do not reply. Tell an adult."]],0)
 ],
 design3:[
  L("✏️🔨🧪","Designers start with a problem."),
  R("Pencils roll off the desk.",["Problem: pencils roll.","Sketch ideas.","Make a pencil cup.","Test it and improve."]),
  P("A good design is...",[["Safe and useful","Yes!"],["Hard to use","Good designs are easy to use."]],0)
 ],
 material3:[
  L("🧥🌉☕","Choose a material that suits the job."),
  S("Which property does it need?",["Waterproof","Strong"],[["raincoat",0],["umbrella",0],["bridge",1],["ladder",1]]),
  P("To compare materials you should...",[["Test them","Yes!"],["Guess","Testing tells us."]],0)
 ],
 food3:[
  L("🌾➡️🥖","Food is grown, picked, packed, moved and sold."),
  R("From wheat to bread.",["Wheat grows on a farm. 🌾","It is milled into flour.","Flour is baked into bread. 🍞","Trucks take it to shops. 🚚"]),
  P("We can reduce food waste by...",[["Planning meals","Yes!"],["Buying lots extra","Plan what you need."]],0)
 ]
});
})();
