(function(){
const K=window.PEBBLE_TEACH_KIT;if(!K)return;
const {L,R,S,P,B,H,HS}=K;

K.add("0.maths",{
 numbers:[
  L("🐟🐟🐟🐟","Touch each one. Say a number.","1, 2, 3, 4. There are 4."),
  B("Make 3 fish. Tap a fish.",3,[["🐟","fish",1]],[0,0,0],{total:"{n} fish",done:"1, 2, 3. Three fish!"}),
  P("What comes after 7?",[["8","Yes! 7, then 8."],["6","6 comes before 7."],["9","9 comes after 8."]],0)
 ],
 compare:[
  L("🐦🐦🐦🐦🐦🐦 · 🐦🐦🐦🐦","Count both groups. The bigger number is more."),
  P("Which group has more?",[["🐸🐸🐸🐸🐸","Yes! 5 is more than 2."],["🐸🐸","2 is fewer."]],0),
  P("🍎🍎🍎🍎 and 🍊🍊🍊🍊. Which is true?",[["Same","Yes! 4 and 4 are the same."],["More apples","Count again. Both have 4."],["More oranges","Count again. Both have 4."]],0)
 ],
 parts:[
  L("🔴🔴🔴 + 🔵🔵","3 and 2 make 5."),
  B("Make 5. Use red and blue.",5,[["🔴","red",1],["🔵","blue",1]],[0,0,0,1,1],{total:"{n} blocks",done:"Two parts make 5!"}),
  P("4 and how many make 6?",[["2","Yes! 4 and 2 make 6."],["1","4 and 1 make 5."],["3","4 and 3 make 7."]],0)
 ],
 patterns:[
  L("🔴🔵🔴🔵","Red, blue. It comes again."),
  R("Say the pattern.",["🔴 red","🔵 blue","🔴 red","🔵 blue","🔴 red comes next!"]),
  P("⭐🌙⭐🌙 … What is next?",[["⭐","Yes! Star comes back."],["🌙","Moon was last. Star is next."]],0)
 ],
 count20:[
  L("🍎🍎🍎🍎🍎","Touch each one once.","1, 2, 3, 4, 5. The last number is how many."),
  B("Make 7. Tap an apple.",7,[["🍎","apple",1]],[0,0,0,0,0,0,0],{total:"{n} apples",done:"7 apples!"}),
  P("What comes before 10?",[["9","Yes! 9, then 10."],["11","11 comes after 10."],["8","8 comes before 9."]],0)
 ],
 shapes0:[
  L("⚪ 🔺 🟥","Round. Three sides. Four sides."),
  S("Sort the shapes.",["Round","Has corners"],[["⚪",0],["🕐",0],["🔺",1],["🟥",1]]),
  P("Which shape has 3 sides?",[["🔺","Yes! A triangle has 3 sides."],["⚪","A circle is round. No sides."],["🟦","A square has 4 sides."]],0)
 ],
 length0:[
  L("✏️ 🖍️","Line them up at one end. The longer one sticks out."),
  P("Which is taller?",[["🦒","Yes! A giraffe is taller than a cat."],["🐈","A cat is shorter."]],0),
  S("Long or short?",["Long","Short"],[["🐍 snake",0],["🐋 whale",0],["🐜 ant",1],["🐞 ladybird",1]])
 ],
 days0:[
  L("🌅 ☀️ 🌙","Morning. Afternoon. Night."),
  R("The week has 7 days.",["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]),
  P("When do you sleep?",[["🌙 Night","Yes! We sleep at night."],["☀️ Afternoon","Night is for sleep."]],0)
 ],
 coins0:[
  L("🪙","Coins buy things at a shop."),
  S("Gold or silver?",["Gold","Silver"],[["$1",0],["$2",0],["5c",1],["50c",1]]),
  P("Which is worth more?",[["$2","Yes! $2 is more than $1."],["$1","$1 is less than $2."]],0)
 ],
 addstory0:[
  L("🐦🐦🐦 + 🐦🐦","3 birds. 2 more come. Now 5."),
  B("2 birds. Add 1 more. Make 3.",3,[["🐦","bird",1]],[0,0,0],{total:"{n} birds",done:"2 and 1 more make 3!"}),
  P("4 🍎. Eat 1. How many left?",[["3","Yes! 4 take away 1 is 3."],["5","That adds 1."],["4","1 was eaten."]],0)
 ],
 position0:[
  L("🎩🙂","The hat is on the head."),
  P("🐟 in the bowl. Where is the fish?",[["In","Yes! The fish is in the bowl."],["Under","Look again. It is inside."]],0),
  P("☀️ above 🌳. Where is the Sun?",[["Above","Yes! Up over the trees."],["Below","Below means under."]],0)
 ],
 sort0:[
  L("🔴🔴 · 🔵🔵","Same colour goes together."),
  S("Sort by colour.",["Red","Blue"],[["🍎",0],["🍓",0],["🫐",1],["💙",1]]),
  P("Red, blue, green, ⬛ square. Which does not belong?",[["⬛ square","Yes! It is a shape. The rest are colours."],["blue","Blue is a colour."]],0)
 ],
 tens0:[
  L("🖐️🖐️","10 fingers. That is one ten."),
  B("Make 12. Tap a ten, then ones.",12,[["🔟","ten",10],["🟡","one",1]],[0,1,1],{done:"10 and 2 more is 12!"}),
  P("Which is bigger?",[["15","Yes! 1 ten and 5 ones."],["9","9 is less than 10."]],0)
 ]
});

K.add("0.english",{
 rhyming:[
  L("🐈 🎩","cat · hat. The ends sound the same."),
  P("Which rhymes with cat?",[["hat","Yes! c-at, h-at."],["dog","dog ends with og."],["sun","sun ends with un."]],0),
  S("Rhymes with tree?",["Rhymes","Does not"],[["bee",0],["see",0],["cup",1],["ball",1]])
 ],
 sounds:[
  L("☀️","sun. The first sound is /s/."),
  P("First sound in map?",[["/m/","Yes! mmm-ap."],["/p/","/p/ is at the end."],["/a/","/a/ is in the middle."]],0),
  S("Starts with /m/?",["/m/","Not /m/"],[["🌙 moon",0],["🐭 mouse",0],["☀️ sun",1],["🐟 fish",1]])
 ],
 blend:[
  L("/c/ /a/ /t/","Push the sounds together. cat!"),
  R("Blend s-u-n.",["/s/","/u/","/n/","sun ☀️"]),
  P("Blend /p/ /e/ /n/.",[["pen","Yes! p-e-n, pen."],["pin","pin has /i/."],["ten","ten starts with /t/."]],0)
 ],
 story:[
  L("🐨🌳","The koala climbed a tree.","Koala is the character. The tree is the setting."),
  H("Tap the character.","Ava found a shell on the beach.",["Ava"],"Who is in the story?"),
  P("A bird flew above the lake. Where?",[["At the lake","Yes! That is the setting."],["The bird","That is the character."]],0)
 ],
 letters0:[
  L("🍎 a · ⚽ b","a says /a/. b says /b/."),
  P("Which letter does sun start with?",[["s","Yes! s says /s/."],["n","n is at the end."],["u","u is in the middle."]],0),
  S("Starts with b?",["b","Not b"],[["⚽ ball",0],["🛏️ bed",0],["🐈 cat",1],["🐶 dog",1]])
 ],
 upper0:[
  L("A a · B b","Big letter. Little letter."),
  P("Big form of b?",[["B","Yes! B is big b."],["d","d is a different letter."],["P","P is a different letter."]],0),
  H("Tap the big letter.","Mia ran to the park.",["Mia"],"Names start with a big letter.")
 ],
 sight0:[
  L("👀","Some words we know by looking.","the · a · is · I · can · see"),
  H("Tap the word see.","I can see the cat.",["see"],"Find s-ee."),
  H("Tap each word the.","The dog and the cat.",["the"],"Find t-h-e. There are 2.")
 ],
 words0:[
  L("🐶","d-o-g says dog."),
  R("Slide c-a-t.",["c","a","t","cat 🐈"]),
  P("b-e-d says…",[["bed","Yes! b-e-d."],["bad","bad has /a/."],["red","red starts with /r/."]],0)
 ],
 listen0:[
  L("👀👂","Look at the speaker. Listen."),
  S("Good listening?",["Yes","No"],[["👀 look at them",0],["🤫 keep quiet",0],["✋ ask a question",0],["🗣️ talk over them",1]]),
  P("Taking turns means…",[["One at a time","Yes! One talks. Then the next."],["All at once","Then we cannot hear."]],0)
 ],
 books0:[
  L("📕","A book has a cover, a title and pages."),
  R("Read a book.",["Start at the front.","Turn one page gently.","Look at the pictures.","Beginning, middle, end."]),
  P("Where is the title?",[["Cover","Yes! The title is on the cover."],["Last page","The title is on the front."]],0)
 ],
 describe0:[
  L("🔴⚽","The ball is red. Red tells more."),
  H("Tap the describing word.","The cat is soft.",["soft"],"How does the cat feel?"),
  P("An elephant is…",[["🐘 Big","Yes! Big tells its size."],["🐜 Tiny","An ant is tiny."]],0)
 ],
 write0:[
  L("✏️","Start at the top. Leave a space."),
  R("Write cat.",["Say /c/. Write c.","Say /a/. Write a.","Say /t/. Write t.","Leave a space."]),
  P("Names start with a…",[["Big letter","Yes! Like M in Mia."],["Little letter","Names start big."]],0)
 ]
});

K.add("0.science",{
 senses0:[
  L("👀👂👃👅✋","We have 5 senses."),
  S("Which sense?",["See 👀","Hear 👂"],[["🌈 rainbow",0],["⭐ stars",0],["🥁 drum",1],["🔔 bell",1]]),
  P("We smell with our…",[["👃 Nose","Yes! We smell with our nose."],["👂 Ears","Ears hear."],["👀 Eyes","Eyes see."]],0)
 ],
 living0:[
  L("🐶 ⚽","A dog grows and eats. A ball does not."),
  S("Living or not living?",["Living","Not living"],[["🐈 cat",0],["🌻 plant",0],["🪨 rock",1],["🧸 toy",1]]),
  P("Living things need…",[["Food and water","Yes! To live and grow."],["Toys","Toys are fun, but not needed."]],0)
 ],
 animals0:[
  L("🐦 🐟 🐶","Feathers. Water. Fur."),
  S("Feathers or fur?",["Feathers","Fur"],[["🦜",0],["🦆",0],["🐶",1],["🐻",1]]),
  P("An insect has how many legs?",[["6","Yes! 6 legs."],["4","A dog has 4 legs."],["8","A spider has 8."]],0)
 ],
 plants0:[
  L("🌻","Roots, stem, leaves, flower."),
  R("Tap up the plant.",["Roots drink water.","The stem holds it up.","Leaves catch sunlight.","Flowers make seeds."]),
  P("Leaves catch…",[["☀️ Sunlight","Yes! Leaves catch sunlight."],["💧 Water","Roots drink the water."]],0)
 ],
 weather0:[
  L("☀️ 🌧️ 💨 ☁️","Sunny. Rainy. Windy. Cloudy."),
  S("What do we use?",["Sunny ☀️","Rainy 🌧️"],[["🧢 hat",0],["🕶️ sunglasses",0],["☂️ umbrella",1],["🥾 gumboots",1]]),
  P("Wind makes a kite…",[["🪁 Fly","Yes! Wind pushes it up."],["Sleep","Kites fly in the wind."]],0)
 ],
 daynight0:[
  L("☀️ · 🌙⭐","Day: the Sun. Night: the Moon and stars."),
  S("Day or night?",["Day","Night"],[["☀️ Sun",0],["🏫 school",0],["🌙 Moon",1],["⭐ stars",1]]),
  P("Never look straight at the…",[["☀️ Sun","Yes! It can hurt your eyes."],["🌙 Moon","The Moon is safe to look at."]],0)
 ],
 push0:[
  L("🚪 👐","Push sends away. Pull brings closer."),
  S("Push or pull?",["Push","Pull"],[["swing",0],["shopping trolley",0],["wagon rope",1],["open a drawer",1]]),
  P("A pull brings things…",[["Closer","Yes! Pull brings it to you."],["Away","A push sends it away."]],0)
 ],
 materials0:[
  L("🪵 🥄 🪟","Wood. Metal. Glass."),
  S("Hard or soft?",["Hard","Soft"],[["🪨 rock",0],["🥄 spoon",0],["🧸 teddy",1],["🧣 scarf",1]]),
  P("A window is made of…",[["Glass","Yes! We can see through it."],["Wood","Wood is not see-through."]],0)
 ],
 water0:[
  L("💧","Water is a liquid. It pours."),
  R("Water can change.",["💧 Water","🥶 Cold: ice 🧊","🔥 Hot: steam ♨️"]),
  P("Cold water can become…",[["🧊 Ice","Yes! Ice is frozen water."],["♨️ Steam","Steam is hot."]],0)
 ],
 body0:[
  L("🙂","Head, arms, legs, hands, feet."),
  P("We walk on our…",[["🦶 Feet","Yes! Feet help us walk."],["✋ Hands","Hands wave and hold."]],0),
  S("Healthy or not?",["Healthy","Not healthy"],[["😴 sleep",0],["🍎 fruit",0],["🥕 vegies",0],["📱 screen all night",1]])
 ],
 seasons0:[
  L("☀️ 🍂 ❄️ 🌸","4 seasons. Summer, autumn, winter, spring."),
  S("Hot or cold?",["Hot ☀️","Cold ❄️"],[["🏖️ beach",0],["🍦 ice cream",0],["🧤 gloves",1],["🧥 coat",1]]),
  P("Leaves fall in…",[["🍂 Autumn","Yes! Leaves fall in autumn."],["🌸 Spring","Flowers grow in spring."]],0)
 ],
 habitat0:[
  L("🐦 🪺","A bird lives in a nest."),
  S("Where do they live?",["Water 🌊","Nest 🪺"],[["🐟 fish",0],["🐬 dolphin",0],["🐦 bird",1],["🦜 parrot",1]]),
  P("A bear lives in a…",[["Den","Yes! A den is a bear home."],["Nest","Birds live in nests."]],0)
 ]
});

K.add("0.hass",{
 family0:[
  L("👨‍👩‍👧 👩‍👦 👵👧","Families are all different."),
  R("Families…",["can be big.","can be small.","care for each other.","help us feel safe."]),
  P("Families care for…",[["Each other","Yes! They look after each other."],["Nobody","Families care."]],0)
 ],
 home0:[
  L("🏠 🏢 ⛺","Homes keep us safe and dry."),
  S("Which room?",["Bedroom 🛏️","Kitchen 🍳"],[["😴 sleep",0],["📖 bedtime story",0],["🥣 cook",1],["🍽️ wash dishes",1]]),
  P("A home keeps us…",[["Safe and dry","Yes! A home is shelter."],["Wet","Homes keep rain out."]],0)
 ],
 past0:[
  L("📷 then · 📱 now","The past already happened. Now is today."),
  S("Long ago or now?",["Long ago","Now"],[["☎️ old phone",0],["🐎 horse and cart",0],["📱 tablet",1],["🚗 car",1]]),
  P("To learn about the past, ask…",[["👵 An older person","Yes! Ask about when they were little."],["A baby","A baby was not there."]],0)
 ],
 belong0:[
  L("👨‍👩‍👧 🏫 ⚽","Family. Class. Team. We belong to groups."),
  S("Is it a group?",["Group","Not a group"],[["my class",0],["my team",0],["my family",0],["one pencil",1]]),
  P("In a group we…",[["Help each other","Yes! Groups help."],["Push others","That is not kind."]],0)
 ],
 places0:[
  L("🏫 🛝 🛒 📚 🏥","Each place has a job."),
  S("What do we do there?",["Play 🛝","Learn 🏫"],[["park",0],["playground",0],["school",1],["kinder",1]]),
  P("We borrow books at a…",[["📚 Library","Yes!"],["🏥 Hospital","A hospital helps sick people."]],0)
 ],
 map0:[
  L("🗺️","A map shows a place from above."),
  R("A park map.",["🛝 = slide","🌳 = tree","🚻 = toilet","The key tells us what they mean."]),
  P("A map shows a place from…",[["⬆️ Above","Yes! Like a bird sees it."],["Under the ground","Maps look down from above."]],0)
 ],
 rules0:[
  L("🚦","Rules keep us safe and fair."),
  P("A red light means…",[["🛑 Stop","Yes! Red means stop."],["Go","Green means go."]],0),
  S("Safe or not safe?",["Safe","Not safe"],[["🤝 hold hands at the road",0],["✋ hand up at school",0],["🏃 run on the road",1]])
 ],
 jobs0:[
  L("👩‍⚕️ 👨‍🏫 🧑‍🚒 🧑‍🌾","People help us with their jobs."),
  S("Who helps?",["Doctor 👩‍⚕️","Firefighter 🧑‍🚒"],[["🤒 sick",0],["🩹 hurt knee",0],["🔥 fire",1],["🚒 big red truck",1]]),
  P("A farmer grows…",[["🥕 Food","Yes! Farmers grow food."],["🏠 Houses","A builder builds houses."]],0)
 ],
 celebrate0:[
  L("🎂 🎄 🪔 🏮","People celebrate in different ways."),
  R("At a celebration we may share…",["🍰 food","🎵 music","🎁 gifts","🤗 time together"]),
  P("A birthday often has a…",[["🎂 Cake","Yes! And singing."],["🧹 Broom","Cake is more like it."]],0)
 ],
 country0:[
  L("🌏","Aboriginal and Torres Strait Islander Peoples are the First Peoples of Australia."),
  R("Country means…",["land","water","sky","everything that lives there"]),
  P("An Acknowledgement of Country shows…",[["Respect","Yes. It says thank you to the Traditional Owners."],["A game","It is a way to show respect."]],0),
  P("We learn about Country by…",[["Listening to Elders","Yes. Elders share their knowledge."],["Guessing","We listen and learn."]],0)
 ],
 needs0:[
  L("💧 🧸","Water is a need. A toy is a want."),
  S("Need or want?",["Need","Want"],[["💧 water",0],["🍎 food",0],["🏠 home",0],["🧸 toy",1],["🍭 lolly",1]]),
  P("A home is a…",[["Need","Yes! We must have shelter."],["Want","We need a home."]],0)
 ],
 share0:[
  L("🛝","We share the swing. Each child has a turn."),
  R("Taking turns.",["Mia has a turn.","Then Leo has a turn.","Then Mia again.","Fair for everyone."]),
  P("If it is not fair, we say so…",[["Kindly","Yes! Calm, kind words."],["By yelling","Kind words work better."]],0)
 ]
});

K.add("0.technologies",{
 steps0:[
  L("🧼🙌","Steps go in order."),
  R("Wash hands.",["1. Wet 💧","2. Soap 🧼","3. Scrub 🙌","4. Rinse 💦","5. Dry 🧻"]),
  P("What comes last?",[["🧻 Dry","Yes! Dry is the last step."],["🧼 Soap","Soap comes near the start."]],0)
 ],
 sort0t:[
  L("🧦🧦🧦","Sort into groups. Then count."),
  S("Sort by colour.",["Red","Blue"],[["🔴",0],["🟥",0],["🔵",1],["🟦",1]]),
  P("🔴🔴🔵. Which group has the most?",[["Red","Yes! 2 reds. 1 blue."],["Blue","Only 1 blue."]],0)
 ],
 devices0:[
  L("📱 💻 📺","Digital devices."),
  S("Device or not?",["Device","Not a device"],[["📱 tablet",0],["💻 computer",0],["📺 TV",0],["🥄 spoon",1],["📚 book",1]]),
  P("We look after devices by…",[["Being gentle","Yes! Gentle hands."],["Dropping them","That can break them."]],0)
 ],
 safe0:[
  L("🧑 📱","Ask a grown-up first."),
  S("Okay or ask a grown-up?",["Okay","Ask a grown-up"],[["⏸️ take a screen break",0],["😟 something upsets me",1],["🏠 a stranger asks where I live",1]]),
  P("Something online upsets you. You…",[["Tell a grown-up","Yes. A grown-up can help."],["Keep it secret","Tell a grown-up."]],0)
 ],
 pattern0t:[
  L("👏👏👏","Clap, clap, clap. A loop repeats."),
  R("Repeat 3 times: clap.",["👏 1","👏 2","👏 3","Done!"]),
  P("🔴🔵🔴 … what is next?",[["🔵","Yes! Blue comes again."],["🔴","Red was just there."]],0)
 ],
 draw0:[
  L("👆🎨","Draw with a finger."),
  R("Draw a house.",["Pick a colour 🎨","Draw with your finger 👆","Oops? Tap undo ↩️","Save it with a name 💾"]),
  P("Undo takes back a…",[["Mistake","Yes! Undo fixes a mistake."],["Colour","Undo takes back the last thing."]],0)
 ],
 tools0:[
  L("🔨 ✂️ 🥄","Tools help us do jobs."),
  S("What does it do?",["Cut","Hit"],[["✂️ scissors",0],["🔪 knife",0],["🔨 hammer",1]]),
  P("For sharp tools we ask a…",[["Grown-up","Yes! Safe and careful."],["Friend","Ask a grown-up."]],0)
 ],
 build0:[
  L("🧱","Think. Choose. Build. Check."),
  R("Make a tower.",["💭 Think what to make.","🧱 Choose blocks.","🏗️ Build it.","✅ Check it stands up."]),
  P("After building we…",[["Check it works","Yes! Does it stand?"],["Think what to make","That comes first."]],0)
 ],
 inout0:[
  L("👆 📱","I tap. The picture changes."),
  S("In or out?",["Tap in 👆","Comes out 📢"],[["👆 tap",0],["🔘 button",0],["🔊 sound",1],["🖼️ picture",1]]),
  P("A speaker gives…",[["🔊 Sound","Yes!"],["🖼️ Pictures","The screen shows pictures."]],0)
 ],
 food0:[
  L("🍎🌳 · 🥛🐄","Food comes from plants and animals."),
  S("Plant or animal?",["Plant 🌱","Animal 🐄"],[["🍎 apple",0],["🍞 bread",0],["🥛 milk",1],["🥚 egg",1]]),
  P("Milk comes from a…",[["🐄 Cow","Yes!"],["🌳 Tree","Apples grow on trees."]],0)
 ],
 material0t:[
  L("🧥💧","A raincoat is waterproof."),
  S("Best for the job?",["Paper 📄","Cloth 👕"],[["✏️ drawing",0],["✂️ cutting shapes",0],["👗 clothes",1],["🧣 scarf",1]]),
  P("A raincoat should be…",[["Waterproof","Yes! It keeps rain out."],["Paper","Paper gets soggy."]],0)
 ],
 design0:[
  L("📝✂️","Draw a plan first."),
  R("Make a paper hat.",["1. Draw a plan 📝","2. Choose materials 📄","3. Make it ✂️","4. Look at it 👀"]),
  P("A plan is drawn…",[["Before making","Yes! Plan first."],["After making","The plan comes first."]],0)
 ]
});
})();
