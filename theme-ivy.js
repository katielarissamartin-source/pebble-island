/* Ivy's themed lessons: unicorns, fairies, princesses and magic. No snails.
   Same curriculum codes and lesson ids as the standard lessons; only the words change.
   Short sentences, small numbers, picture words. Key = "year.area.lessonId". */
(function(){
const Q=(prompt,choices,correct,explain,hint)=>({prompt,choices,correct,explain,hint});
const L=(icon,title,goal,teach,example,tryIt,questions)=>({icon,title,goal,teach,example,tryIt,questions});
const T={};

T["2.science.sky"]=L("🦄","Unicorn sky watch","Notice patterns in the sky.",
"Earth spins round and round. This makes the Sun seem to move across the sky. The Sun is up in the day. At night, our side of Earth faces away from the Sun. Luna the unicorn watches the sky from her tower.",
"Morning: the Sun is low. Midday: the Sun is high. Evening: the Sun is low again. Luna draws it in her sky diary. Never look straight at the Sun.",
"Be a sky detective. Draw the sky two times today. Ask a grown-up to help.",[
Q("Luna sees the Sun cross the sky. Why does it seem to move?",["Earth is spinning","The Sun runs around the castle","A cloud pushes it"],0,"Earth spins, so the Sun seems to move.","Think about Earth, not the Sun."),
Q("Luna wants to find a sky pattern. What should she do?",["Look one time","Write down what she sees on many days","Guess"],1,"A pattern shows up when you look again and again.","Patterns need more than one look."),
Q("When is it dark at the castle?",["Midday","Morning","Night"],2,"At night our side of Earth faces away from the Sun.","The Sun is not in the sky."),
Q("What goes in Luna's sky diary?",["How loud a pencil is","The Moon's shape each night","Her favourite cake"],1,"A sky diary is for the sky: the Sun, Moon and stars.","It is about the sky."),
Q("What should Luna never do?",["Draw the Moon","Count the stars","Look straight at the Sun"],2,"The Sun can hurt your eyes. Never look straight at it.","Think safe.")]);

T["2.science.sounds"]=L("🔔","Magic bell sounds","Learn how sounds begin.",
"Sound starts with a wobble. The wobble is called a vibration. A fairy bell wobbles when it rings. A harp string wobbles when you pluck it. No wobble means no sound.",
"Tap a ruler on the edge of a desk. Watch it wobble. Hear the sound.",
"With a grown-up, tap a spoon on a cushion. Then tap it on a table. Which is louder?",[
Q("A harp string makes a sound. What is it doing?",["Freezing","Wobbling (vibrating)","Vanishing"],1,"Sound starts with a wobble.","Sound starts with a wobble."),
Q("A fairy taps a drum. What does the drum skin do?",["Wobbles","Turns into water","Stays still"],0,"The skin vibrates and makes the sound.","It moves very fast."),
Q("Which can make a sound with no batteries?",["A picture of a bell","A drum you tap","A drawing of a harp"],1,"Tapping makes a real wobble. A picture cannot wobble.","Pick the real one."),
Q("How does bell sound reach your ears?",["Sunshine carries it","The bell's colour carries it","Wobbles travel through the air"],2,"The wobble travels through the air to your ears.","Air carries it."),
Q("Touch your throat and hum. What do you feel?",["A wobble","Nothing","Rain"],0,"Your voice makes a wobble you can feel.","Try it!")]);

T["2.science.materials"]=L("🧚","Fairy clay shapes","Explore how materials change shape.",
"You can squash, stretch, bend, twist and fold some things. The shape changes. The material stays the same. Clay is still clay. Paper is still paper.",
"A paper crown is still paper. A clay unicorn is still clay.",
"Fold paper into a crown. Unfold it. Is it still paper?",[
Q("A folded paper crown is made from...",["Metal","Paper","Glass"],1,"Folding changes the shape, not the paper.","It started as a flat sheet."),
Q("Which action stretches something?",["Pulling an elastic band longer","Looking at an elastic band","Naming its colour"],0,"Stretching means pulling longer.","Think pull."),
Q("How can you change a clay ball?",["Counting it","Naming it","Squashing it"],2,"Squashing changes the shape.","Use your hands."),
Q("You twist a soft pipe cleaner wand. What changes?",["Its age","Its shape","The weather"],1,"Twisting changes the shape.","Look at the wand."),
Q("A clay unicorn is squashed flat. It is still...",["Clay","Paper","Water"],0,"The material stays the same.","Same stuff, new shape.")]);

T["2.science.science-test"]=L("🔍","Which unicorn slides farthest?","Make a guess, test it and compare.",
"Scientists ask a question. Then they make a guess. A guess is called a prediction. Then they test it and write down what happens. A fair test changes only one thing.",
"Which toy unicorn slides farthest? Use the same ramp for both. Only change the toy.",
"Slide two toys down a book ramp. Which went farther? Draw what happened.",[
Q("You test two towels. What should stay the same?",["The size of the towel pieces","Your guess","The towel colour only"],0,"A fair test keeps things the same.","Same size, same water."),
Q("The test is different from your prediction. What now?",["Hide it","Pretend you were right","Write down what happened"],2,"Scientists record what really happens.","Be honest."),
Q("What do scientists write after a test?",["What they really saw","Only what they hoped","A made-up result"],0,"They write what they saw.","Be true."),
Q("You test which toy slides farther. What is a good first step?",["Change everything","Guess which will slide farther","Say they are the same"],1,"Start with a prediction.","Guess first."),
Q("For a fair test, how many things should you change?",["One","All of them","None, ever"],0,"Change just one thing.","Just one.")]);

T["2.hass.places"]=L("🏰","Places in the kingdom","Know why local places matter.",
"A place can matter because of what people do there. A library, a park or a market can matter. Different people love different places for different reasons.",
"A library matters because people can borrow books, learn and meet.",
"Ask someone which place matters to them. Ask why.",[
Q("Why does a library matter?",["It is the oldest building","People can learn and borrow books","Nobody uses it"],1,"Libraries help people learn.","Think of books."),
Q("Why might two people love the same place differently?",["They have different memories","Only one can be right","Places have no history"],0,"People have different experiences.","Memories differ."),
Q("A park is special to one family. Why?",["Parks never change","Only scientists visit","They have happy memories there"],2,"Happy memories make a place special.","Think feelings."),
Q("Which question helps you learn why a place matters?",["What do people do there?","Is it the same as everywhere?","Can we ignore it?"],0,"Asking what people do helps you learn.","Ask about people."),
Q("The village market is where people meet. What does it do?",["Keeps people apart","Brings people together","Stops talking"],1,"A market brings people together.","Think community.")]);

T["2.hass.technology-past"]=L("📜","Royal messages then and now","See how inventions change life.",
"Long ago, people sent letters. A rider might carry a letter for days. Later came telephones. Now a message can arrive in a second.",
"A letter takes days to arrive. A text can arrive straight away.",
"Ask a grown-up how they talked to friends when they were young.",[
Q("Long ago, how did news often travel?",["By letter","By video call","By chat app"],0,"Letters were common before phones.","Paper and a stamp."),
Q("How have messages changed?",["Everyone stopped talking","They can arrive much faster","No jobs are left"],1,"New technology makes messages faster.","Think speed."),
Q("What can an old photo show us?",["How people lived","Tomorrow's weather","Next week's winner"],0,"Old photos show the past.","Look back in time."),
Q("Which pair shows communication changing?",["Two pencils","A chair and a table","Postcards and instant messages"],2,"Postcards changed into instant messages.","Think messages."),
Q("A letter takes days. A text takes seconds. Which is faster?",["The letter","The text","Same"],1,"Seconds are much faster than days.","Seconds are tiny.")]);

T["2.hass.map-zoom"]=L("🗺️","Zoom out from the castle","Understand places big and small.",
"Your street is in a suburb or town. That is in a state. Queensland is a state. Australia is a country. A map can zoom in or zoom out.",
"Brisbane is a city in Queensland. Queensland is in Australia.",
"With a grown-up, find your suburb, Queensland and Australia on a map.",[
Q("Which is a state of Australia?",["Queensland","Brisbane","The Pacific Ocean"],0,"Queensland is a state.","It starts with Q."),
Q("Which map shows more street detail?",["A map of the world","A map of one suburb","A map of space"],1,"A small area shows more detail.","Zoom in."),
Q("Brisbane is in which state?",["Tasmania","Queensland","Victoria"],1,"Brisbane is in Queensland.","Think Q."),
Q("A map of Australia shows...",["Every crack in the path","States and territories","One bedroom"],1,"It shows states and territories.","Zoom out."),
Q("Which is the biggest place?",["The suburb","The state","The country"],2,"A country holds states, and states hold suburbs.","Biggest on the map.")]);

T["2.technologies.steps"]=L("🤖","Magic robot steps","Use order, choices and repeats.",
"An algorithm is a set of steps. Order matters. Some steps repeat. Some steps use if: if this, then that. A robot unicorn follows each step.",
"If it is raining, take an umbrella. Repeat: wave the wand 3 times.",
"Give a grown-up simple steps to draw a castle.",[
Q("What is the best order to make a sandwich?",["Get bread, add filling, put the slices together","Eat it, then get bread","Throw the bread away first"],0,"Steps must be in order.","Bread first."),
Q("'Repeat: wave the wand 3 times.' How many waves?",["1","3","0"],1,"Repeat 3 means do it 3 times.","Count to 3."),
Q("'If it is raining, take an umbrella.' It is raining. What do you do?",["Leave it","Take a sunhat","Take an umbrella"],2,"The if is true, so do the step.","Is it raining?"),
Q("A robot unicorn: 'If the light is red, stop.' This is a...",["Decision rule","Map","Song"],0,"If rules help robots decide.","If this, then that."),
Q("Why does order matter?",["It does not","Steps in the wrong order may not work","Robots like noise"],1,"Wrong order can break the plan.","Try socks after shoes.")]);

T["2.technologies.data"]=L("🦄","Count the unicorn herd","Show information with pictures.",
"Data is information. We can show data with pictures, numbers or words. A picture chart helps us compare. Each picture stands for one thing.",
"If 🦄 means one unicorn, then 🦄🦄🦄 means three.",
"Make a picture chart of the fruit in your kitchen.",[
Q("🦄 means 1 unicorn. How many is 🦄🦄🦄🦄?",["2","4","6"],1,"Count each picture.","Count one by one."),
Q("A chart has 3 unicorn pictures and 1 dragon picture. Which has more?",["Dragons","Unicorns","They are the same"],1,"3 is more than 1.","Count each row."),
Q("Why add labels to a picture chart?",["So people know what each picture means","To hide it","To erase numbers"],0,"Labels explain the pictures.","Words help."),
Q("To compare favourite fairy colours, use...",["A random guess","A blank page","A picture chart"],2,"A chart shows and compares.","Pick the chart."),
Q("How many is ⭐⭐⭐⭐⭐?",["5","3","6"],0,"Count them: 5.","Count slowly.")]);

T["2.technologies.privacy"]=L("🔐","Keep castle secrets safe","Keep private details private.",
"Some apps and websites save what you type. Names, photos and addresses are private. Ask a trusted grown-up before you share. Your password is the key to your castle.",
"A game that asks for your home address is asking for a private secret.",
"With a grown-up, point out things that should stay private.",[
Q("A website asks for your home address. What do you do?",["Type it in","Ask a trusted grown-up","Post it for everyone"],1,"Always ask a grown-up first.","Stop and ask."),
Q("Can websites remember what you type?",["Yes","Never","Only with music"],0,"Sometimes they save it.","Be careful."),
Q("Ask a grown-up first before sharing...",["Your favourite colour","What 2 + 2 is","A photo showing your street sign"],2,"Photos can show where you live.","Think private."),
Q("Someone online asks for your password. What do you do?",["Send it","Don't share. Tell a grown-up","Post it"],1,"Never share your password.","Keep the key safe."),
Q("Your password is a key to your castle. Who can have it?",["Only you and a trusted grown-up","Everyone in the game","Any stranger"],0,"Keep it secret.","Few people.")]);

T["2.technologies.design"]=L("🎒","Design a unicorn lunchbox","Design useful things.",
"People design things for a reason. Good design is safe, easy to use and makes less waste. A designer thinks about the person who will use it.",
"A bottle you can refill helps you carry water without a new bottle each time.",
"Draw a lunchbox with one feature that makes it easier to use.",[
Q("A drink bottle is for...",["Carrying a drink","Making noise","Covering a book"],0,"A bottle holds a drink.","Think water."),
Q("Which cuts down waste?",["A new bottle each hour","Throwing bottles away","A bottle you can refill"],2,"Refilling means less rubbish.","Use it again."),
Q("Who should a designer think of first?",["The person who will use it","Only the colour","Nobody"],0,"Design is for people.","Think of the user."),
Q("Which lunchbox part helps a small child?",["A sharp edge","An easy-to-open clasp","A broken lid"],1,"Easy to open helps.","Easy and safe."),
Q("A designer makes a saddle bag for a unicorn. It should be...",["Heavy and scratchy","Hard to carry","Safe and comfy"],2,"Safe and comfy is good design.","Think of the user.")]);

T["2.maths.to1000"]=L("💎","Treasure chest numbers","Read and order numbers to 1000.",
"A chest holds 100 gems. A bag holds 10 gems. One gem is 1. Look at the chests first. The most chests wins. 3 chests, 2 bags and 6 gems make 326.",
"407 is 4 chests, 0 bags and 7 gems.",
"Pick 3 chests, 2 bags and 5 gems. What number is it?",[
Q("Which treasure pile is biggest?",["540 gems","504 gems","450 gems"],0,"Compare chests first: 5 beats 4. Then bags.","Look at the first digit."),
Q("3 chests, 2 bags and 6 gems. Which number?",["326","362","236"],0,"3 hundreds, 2 tens, 6 ones.","Chests first."),
Q("Which number comes right after 699?",["698","700","690"],1,"After 699 comes 700.","Count up one."),
Q("Which pile is the smallest?",["530","350","305"],2,"305 has the fewest bags.","Smallest first digit, then next."),
Q("5 chests, 0 bags and 9 gems. Which number?",["509","590","95"],0,"5 hundreds, 0 tens, 9 ones.","Zero bags.")]);

T["2.maths.regroup"]=L("👛","Gem bag swap","Swap tens and hundreds.",
"Ten bags can swap for one chest. Ten gems can swap for one bag. The treasure stays the same. Only the packing changes.",
"130 gems is 1 chest and 3 bags. Or it is 13 bags.",
"Show 120 gems with bags of 10.",[
Q("How many bags swap for 1 chest?",["10","5","100"],0,"10 tens make 100.","Ten."),
Q("200 + 40 + 3 = ?",["234","243","423"],1,"2 hundreds, 4 tens, 3 ones.","Hundreds first."),
Q("In 405, what does the 0 mean?",["No bags (0 tens)","No gems (0 ones)","No chests"],0,"The 0 is in the tens place.","Middle digit."),
Q("120 gems. How many bags of 10?",["2","12","10"],1,"12 tens make 120.","10 bags is 100, add 2 more."),
Q("1 chest and 3 bags. Which number?",["103","130","13"],1,"1 hundred and 3 tens is 130.","Chest then bags.")]);

T["2.maths.facts"]=L("🧚","Fairy fact families","Use adding to help taking away.",
"Adding and taking away are a team. They undo each other. 7 + 5 = 12. So 12 − 5 = 7. Three numbers make a family.",
"Family 8, 4, 12: 8 + 4 = 12. 4 + 8 = 12. 12 − 4 = 8. 12 − 8 = 4.",
"Make a family with 3, 5 and 8.",[
Q("9 + 6 = 15. So 15 − 6 = ?",["9","6","8"],0,"Take away undoes adding.","Look at the sum."),
Q("13 − 8 = ?",["6","5","4"],1,"8 + 5 = 13.","Add up from 8."),
Q("Which fact checks 18 − 7 = 11?",["11 − 7 = 18","18 + 7 = 11","11 + 7 = 18"],2,"Add back to check.","Add back."),
Q("5 unicorns play. 4 more come. How many?",["9","1","10"],0,"5 + 4 = 9.","Add."),
Q("12 stars. 5 fall. How many are left?",["8","7","17"],1,"12 − 5 = 7.","Take away.")]);

T["2.maths.fractions"]=L("🍰","Rainbow cake shares","Halves and quarters.",
"A half is 1 of 2 equal parts. Cut each half again. Now there are 4 equal parts. Each part is a quarter.",
"A round cake cut into 4 equal slices. Each slice is a quarter.",
"Fold paper into 2 equal parts. Fold again. Count 4.",[
Q("How many quarters make 1 whole cake?",["2","4","8"],1,"4 quarters make a whole.","Four."),
Q("Which slice is bigger?",["One quarter","They are the same","One half"],2,"A half is bigger than a quarter.","Fewer parts means bigger."),
Q("2 quarters are shaded. What is shaded?",["One half","One quarter","A whole"],0,"2 quarters equal a half.","Two quarters."),
Q("Two princesses share a cake equally. Each gets...",["A quarter","A half","A whole"],1,"2 equal parts are halves.","Two people."),
Q("Four friends share a cake equally. Each gets...",["A half","A quarter","A third"],1,"4 equal parts are quarters.","Four people.")]);

T["2.english.characters"]=L("👑","Fairy tale feelings","Use clues to know how characters feel.",
"A reader can use clues. Look at what a character says and does. These clues show how they feel.",
"'The princess smiled when she saw her friend.' She feels happy.",
"Read a story. Find a clue to how a character feels.",[
Q("The little fairy hid behind a flower in the storm. How does she feel?",["Frightened","Bored","Hungry"],0,"Hiding shows fear.","Why hide?"),
Q("The queen shared her cake with everyone. She is...",["Mean","Generous","Careless"],1,"Sharing is generous.","Think kind."),
Q("The unicorn cheered when the team won. She feels...",["Sleepy","Excited","Angry"],1,"Cheering shows excitement.","Cheers are happy."),
Q("The prince dropped his crown and stamped his foot. He might feel...",["Cross","Calm","Sleepy"],0,"Stamping shows he is cross.","Stamp!"),
Q("Mila hugged her sick unicorn tight and cried. How does she feel?",["Proud","Bored","Worried"],2,"Crying and hugging show worry.","She cares.")]);

T["2.english.compound"]=L("✨","Join the magic ideas","Join two ideas with a word.",
"A compound sentence joins two whole ideas. Use joining words like and, but and so.",
"'The rain stopped, and we played outside.' Both parts make sense on their own.",
"Join two ideas about your day with but.",[
Q("I wanted to ride the unicorn, ___ it was raining.",["because","but","under"],1,"But shows the plan changed.","Pick the joining word."),
Q("Which has two whole ideas?",["The fairy flew, and the elf waved.","Because in the garden","Under the bridge"],0,"Two whole ideas joined with and.","Each part makes sense."),
Q("It was cold, ___ the princess wore a cloak.",["or","than","so"],2,"So shows the result.","Cold, so..."),
Q("The dragon was big, ___ it was kind.",["under","but","and the"],1,"But shows a surprise.","Big but kind."),
Q("Which sentence uses and to join two ideas?",["Jumped over.","The unicorn jumped and the fairy clapped.","The unicorn jumped."],1,"Two ideas, one sentence.","Look for and.")]);

T["2.english.purpose"]=L("📖","Why was it written?","Know what a text is for.",
"Some texts entertain. Stories do this. Some texts inform. Fact sheets do this. Some texts persuade. Posters often do this.",
"A poster saying 'Please keep the fairy garden clean!' tries to persuade.",
"Find one text that informs and one story that entertains.",[
Q("A fact sheet about how horses live is written to...",["Inform","Sell shoes","Tell a made-up story"],0,"Facts inform.","Facts."),
Q("A story about a unicorn and a princess is written to...",["List bus times","Entertain","Warn about weather"],1,"Stories entertain.","Fun."),
Q("A poster says 'Please keep the fairy garden clean!' It tries to...",["Retell a story","Measure","Persuade"],2,"Posters ask you to do something.","Please..."),
Q("A book of true facts about stars is to...",["Inform","Persuade you to buy","Make you laugh with a joke"],0,"True facts inform.","True facts."),
Q("A rhyme about a dancing unicorn is mainly to...",["Entertain","Give directions","Sell something"],0,"Rhymes entertain.","Fun.")]);

T["2.english.wordparts"]=L("🔤","Magic word families","Use word parts to read new words.",
"A base word can gain an ending like -s, -ed or -ing. Look for the part you know.",
"Jump becomes jumped when we add -ed.",
"Make a word family with play.",[
Q("What is the base word in jumping?",["jump","ing","umping"],0,"Take off the -ing.","Cover the ending."),
Q("Which word means it already happened?",["walks","walked","walking"],1,"-ed shows the past.","Past."),
Q("What is the plural of unicorn?",["unicorns","unicorned","unicorning"],0,"Add s for more than one.","More than one."),
Q("Add -ed to play. You get...",["plays","playing","played"],2,"play + ed = played.","Add the ending."),
Q("What is the base word in sparkled?",["spark","sparkle","led"],1,"Take off -d to get sparkle.","Take off the -d.")]);

window.PEBBLE_THEMES=window.PEBBLE_THEMES||{};
window.PEBBLE_THEMES[0]=Object.assign(window.PEBBLE_THEMES[0]||{},T);
})();
