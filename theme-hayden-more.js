(function(){
const Q=(prompt,choices,correct,explain,hint)=>({prompt,choices,correct,explain,hint});
const L=(icon,title,goal,teach,example,tryIt,questions)=>({icon,title,goal,teach,example,tryIt,questions});
const T={};
T["0.maths.numbers"]=L("🥚","Count the dino eggs","Count and order numbers from 0 to 20.",
"Numbers tell us how many. Count each dino egg once. Touch it as you count. The last number is the total.",
"Count four eggs in a nest: 1, 2, 3, 4. There are four eggs.",
"Line up five toy blocks. Count them. Then add one more and count again.",[
Q("What number comes after 7?",["6","8","10"],1,"One more than 7 is 8.","Say the counting numbers in order."),
Q("Which number comes between 11 and 13?",["14","10","12"],2,"12 sits between 11 and 13.","Count up from 11."),
Q("How many dino eggs? 🥚 🥚 🥚 🥚",["4","3","5"],0,"Each of the four eggs gets one count.","Touch each egg as you count.")]);
T["0.maths.compare"]=L("🦕","Bigger herd?","Compare groups using counting.",
"A group with more has a bigger number. Count both herds. Then compare the totals.",
"Three dinosaurs are fewer than five dinosaurs. 3 is less than 5.",
"Make two piles of blocks side by side. Which pile has more?",[
Q("Which herd has more: 6 dinosaurs or 4 dinosaurs?",["4 dinosaurs","6 dinosaurs","They are equal"],1,"Six is more than four.","Count both herds, then compare."),
Q("Which pile has fewer: 2 blocks or 5 blocks?",["5 blocks","They are equal","2 blocks"],2,"Two is less than five.","Count both piles, then compare."),
Q("Compare 4 dirt blocks and 4 stone blocks. There are...",["Equal amounts","More dirt blocks","More stone blocks"],0,"Four is the same as four.","Count both piles, then compare.")]);
T["0.maths.parts"]=L("🧱","Blocks make a build","Split a number into two parts.",
"You can make a number from two smaller groups. Put the two groups together. This is part, part, whole.",
"Three red blocks and two blue blocks make five blocks.",
"Build a tower of 6 using two colours of blocks.",[
Q("2 blocks and 3 blocks make how many?",["4","6","5"],2,"Two and three together make five.","Put the two groups together."),
Q("One way to make 6 is 4 and...",["2","3","1"],0,"Four and two make six.","How many more to get to 6?"),
Q("5 blocks is 2 blocks and some more. How many more?",["4","3","2"],1,"Two and three make five.","Count up from 2 to 5.")]);
T["0.maths.patterns"]=L("🟫","Block patterns","Recognise and continue repeating patterns.",
"A repeating pattern has a part that comes again. Like grass, stone, grass, stone. Find the part that repeats.",
"Dirt, stone, dirt, stone. The next block is dirt.",
"Make a pattern with socks or toy blocks. Ask someone what comes next.",[
Q("What is next? 🟫 ⬜ 🟫 ⬜ ...",["⬜","🟫","🟩"],1,"Brown and white repeat together.","Find the part that repeats."),
Q("Finish the pattern: pick, shovel, pick, shovel, ...",["shovel","axe","pick"],2,"The pattern starts again with pick.","Find the part that repeats."),
Q("What comes next? 1, 2, 1, 2, ...",["1","3","2"],0,"The pattern goes 1, 2 again and again.","Find the part that repeats.")]);
T["0.english.rhyming"]=L("🎵","Dino rhymes","Hear sounds that match at the ends of words.",
"Rhyming words end with the same sound. Cat rhymes with hat. They start differently but end the same.",
"Say cat and hat out loud. Listen for the -at at the end.",
"Say three words that rhyme with sun.",[
Q("Which word rhymes with cat?",["dog","hat","cup"],1,"Cat and hat end with the same sound.","Listen to the ending sounds."),
Q("Which word rhymes with tree?",["tap","fish","bee"],2,"Tree and bee both end in ee.","Listen to the ending sounds."),
Q("Which word rhymes with sun?",["fun","sit","map"],0,"Sun and fun end with the same sound.","Listen to the ending sounds.")]);
T["0.english.sounds"]=L("👂","First sounds","Hear the first sound in a simple word.",
"Words are made of sounds. Listen to the start of a word. That is the first sound.",
"Say dino slowly. The first sound is /d/.",
"Think of a word that starts with the same sound as moon.",[
Q("What is the first sound in map?",["/p/","/m/","/t/"],1,"Map starts with /m/.","Say the word slowly and listen at the start."),
Q("Which word starts with the /s/ sound?",["dog","pen","sun"],2,"Sun starts with /s/.","Say each word slowly."),
Q("Which two words start with the same sound?",["moon and mouse","sun and cat","hat and dog"],0,"Moon and mouse both start with /m/.","Say each pair slowly.")]);
T["0.english.blend"]=L("🔤","Blend the sounds","Put sounds together to say words.",
"Blending means pushing sounds together. Say each sound. Then say them faster. You hear a word.",
"Say /c/ /a/ /t/. Now say it fast: cat.",
"Ask someone to say /d/ /i/ /g/. Blend the sounds into a word.",[
Q("Blend /m/ /a/ /p/. Which word?",["mop","map","man"],1,"The sounds /m/ /a/ /p/ make map.","Say the sounds in order, a little faster."),
Q("Blend /s/ /u/ /n/. Which word?",["sit","sock","sun"],2,"Those three sounds make sun.","Say the sounds in order, a little faster."),
Q("Blend /p/ /e/ /n/. Which word?",["pen","pan","pin"],0,"The middle /e/ sound makes pen.","Listen to the middle sound.")]);
T["0.english.story"]=L("📖","Story clues","Recognise characters, settings and events.",
"A character is who is in the story. The setting is where it happens. An event is what happens.",
"'The dinosaur dug in the sand.' The dinosaur is the character. The sand is the setting.",
"Tell someone a tiny story. Use a character, a place and something that happens.",[
Q("In 'Rex found a fossil by the river', who is the character?",["The river","Rex","The fossil"],1,"Rex is who the sentence is about.","Who is in the story?"),
Q("Where is the setting? 'A pterosaur flew above the lake.'",["In a shop","On the Moon","At the lake"],2,"The lake tells us where it happens.","Where does it happen?"),
Q("Which is an event in 'Max opened the chest'?",["Max opened the chest","Max is a boy","A chest is a box"],0,"An event is something that happens.","What happened?")]);
T["1.maths.numbers"]=L("🔢","Counting to 120","Recognise and order larger numbers.",
"Counting keeps going past 20. A number line shows the order. Each step is one more.",
"After 49 comes 50. After 99 comes 100.",
"Count blocks by ones from 36 up to 45.",[
Q("Which comes after 59?",["58","60","69"],1,"The next number after 59 is 60.","One more means the next number."),
Q("Which is greatest: 73, 37 or 70?",["37","70","73"],2,"73 is more than 70 and 37.","Look at the tens first."),
Q("Which number is before 100?",["99","101","90"],0,"99 comes just before 100.","One less means go back one.")]);
T["1.maths.tens"]=L("🧱","Stacks of ten","Understand two-digit place value.",
"Ten blocks make one stack of ten. A two-digit number shows stacks and single blocks. The left digit is tens. The right digit is ones.",
"34 means 3 stacks of ten and 4 single blocks. That is 30 plus 4.",
"Make 2 stacks of ten and 5 single blocks with Lego or coins.",[
Q("What is 4 tens and 2 ones?",["24","42","402"],1,"Four tens is 40. Plus 2 is 42.","Tens go on the left."),
Q("How many tens are in 56?",["6","56","5"],2,"The 5 in 56 means five tens.","Look at the left digit."),
Q("Which split makes 73?",["70 + 3","7 + 3","30 + 7"],0,"Seven tens and three ones make 73.","Tens first, then ones.")]);
T["1.maths.adding"]=L("➕","Add and mine away","Solve addition and subtraction up to 20.",
"Adding puts groups together. Taking away removes some. Count on to add. Count back to take away.",
"9 + 3 is 12. Start at 9 and count 10, 11, 12.",
"Make 10 with blocks. Take away 4. How many are left?",[
Q("What is 8 + 5?",["12","13","14"],1,"Eight plus five is thirteen.","Start at 8 and count on 5."),
Q("You mine 16 blocks and use 6. How many are left?",["11","9","10"],2,"16 take away 6 is 10.","Count back 6 from 16."),
Q("You have 7 dino stickers and get 4 more. How many?",["11","10","12"],0,"Seven plus four is eleven.","Start at 7 and count on 4.")]);
T["1.maths.skip"]=L("🐾","Dino footprints","Count in twos, fives and tens.",
"Skip counting jumps the same amount each time. It is faster than counting one by one. Dino steps can jump by 2, 5 or 10.",
"2, 4, 6, 8 counts by twos. Each step jumps 2.",
"Count 5, 10, 15, 20 using the fingers on your hands.",[
Q("What is next? 2, 4, 6, 8, ...",["9","10","12"],1,"8 plus 2 is 10.","How big is each jump?"),
Q("Count by fives: 5, 10, 15, ...",["16","25","20"],2,"15 plus 5 is 20.","How big is each jump?"),
Q("Count by tens: 30, 40, 50, ...",["60","55","70"],0,"Each jump adds ten.","How big is each jump?")]);
T["1.english.digraphs"]=L("🔠","Two letters, one sound","Read common consonant digraphs.",
"Some letter pairs make one sound. Sh, ch and th are pairs like this.",
"Shovel starts with sh. Chest starts with ch.",
"Find three words at home with sh, ch or th in them.",[
Q("Which word starts with the /sh/ sound?",["cat","ship","thin"],1,"The sh in ship makes /sh/.","Listen to the first sound."),
Q("Which word starts with the /ch/ sound?",["fish","sun","chest"],2,"Chest starts with /ch/.","Listen to the first sound."),
Q("Which word has the letters th?",["thin","ship","chat"],0,"Thin starts with th.","Look at the first two letters.")]);
T["1.english.sentence"]=L("✏️","Sentence punctuation","Use capital letters and ending punctuation.",
"A sentence starts with a capital letter. It ends with a full stop, question mark or exclamation mark.",
"'Where is my pickaxe?' asks something. So it ends with a question mark.",
"Write one question and one statement about a dinosaur.",[
Q("Which sentence is written correctly?",["the dino sleeps","The dino sleeps.","The dino sleeps"],1,"It starts with a capital and ends with a full stop.","Check the start and the end."),
Q("Which mark ends a question?",["!",";","?"],2,"A question mark shows a sentence asks something.","Which mark asks?"),
Q("Which sentence asks something?",["Where are we digging?","We are digging here.","The dino roars."],0,"A question asks for an answer.","Does it tell or ask?")]);
T["1.english.retell"]=L("📚","Beginning, middle, end","Retell a simple story in order.",
"Stories have a beginning, a middle and an end. The beginning starts things off. The end shows how it worked out.",
"'Jo lost a pickaxe, looked for it, then found it.' That is beginning, middle and end.",
"Tell a short story in three sentences. Use first, then, last.",[
Q("Which event should come first?",["The tree grows tall","Mia plants a seed","Mia picks an apple"],1,"Planting the seed starts it all.","What has to happen first?"),
Q("'The dino wandered off, Sam searched, Sam found the dino.' What happens last?",["The dino wanders off","Sam starts searching","Sam finds the dino"],2,"The ending tells how it worked out.","What happens at the end?"),
Q("Which is a story character?",["A brave dinosaur","Under a bridge","Yesterday afternoon"],0,"The dinosaur is someone in the story.","Who, not where or when.")]);
T["1.english.nouns"]=L("📝","Nouns and verbs","Spot naming words and action words.",
"Nouns name people, places, animals and things. Verbs are action words.",
"In 'The dino stomps', dino is a noun. Stomps is a verb.",
"Pick three objects at home. Say what each one can do.",[
Q("Which word is a noun?",["jump","pickaxe","quickly"],1,"Pickaxe is the name of a thing.","Which word names a thing?"),
Q("Which word is a verb?",["table","blue","dig"],2,"Dig is an action.","Which word can you do?"),
Q("In 'The raptor runs', which word tells the action?",["runs","raptor","the"],0,"Runs is the verb.","What is it doing?")]);
T["3.maths.large"]=L("🔢","Huge block counts","Read and compare larger whole numbers.",
"Place value goes ones, tens, hundreds, thousands, ten thousands. Big builds need big numbers. Compare the biggest place first.",
"12 405 is twelve thousand, four hundred and five.",
"Write five numbers bigger than 10 000. Put them in order.",[
Q("Which build has more blocks: 12 500 or 12 050?",["12 050","12 500","Equal"],1,"Both have 12 thousand. 500 is more than 50.","Compare the biggest place first."),
Q("What is the value of the 3 in 34 210?",["3 000","300","30 000"],2,"The 3 is in the ten thousands place.","Count the places from the right."),
Q("Which is smallest: 9 900, 10 100 or 10 010?",["9 900","10 100","10 010"],0,"9 900 is less than 10 000.","Which has fewer digits?")]);
T["3.maths.regroup"]=L("🧮","Regroup the blocks","Add and subtract using place value.",
"Split numbers into hundreds, tens and ones. Work on each part. Swap ten ones for one ten when you need to.",
"126 + 35. First 126 + 30 = 156. Then 156 + 5 = 161.",
"Use blocks to show how you could split 248 + 30.",[
Q("You have 124 blocks and mine 30 more. How many now?",["127","154","144"],1,"Add three tens to 124 to get 154.","Add the tens."),
Q("What is 256 - 40?",["296","252","216"],2,"Take four tens from 256 to get 216.","Take away the tens."),
Q("What is 178 + 22?",["200","190","210"],0,"178 plus 2 is 180. 20 more is 200.","Make a ten first.")]);
T["3.maths.multiples"]=L("✖️","Equal herds","Use multiplication and division facts.",
"Multiplying counts equal groups. Dividing shares into equal groups. They are linked.",
"4 nests of 3 eggs is 12 eggs. So 12 eggs in nests of 3 makes 4 nests.",
"Sort 15 buttons into three equal groups.",[
Q("What is 4 × 5?",["9","20","25"],1,"Four groups of five make twenty.","Count the groups and how many in each."),
Q("18 eggs go in nests of 3. How many nests?",["5","9","6"],2,"18 divided by 3 is 6.","How many threes make 18?"),
Q("What is 7 × 3?",["21","24","18"],0,"Seven threes make twenty-one.","Count by threes seven times.")]);
T["3.maths.measure"]=L("📏","Measure the dino","Choose and use familiar metric units.",
"We measure length in centimetres and metres. Small things use centimetres. Big things use metres.",
"A dino tooth is easy to measure in centimetres. Kilometres would be far too big.",
"Measure a book with a ruler. Write its length in centimetres.",[
Q("Which unit is best for the length of a pencil?",["kilometres","centimetres","litres"],1,"A pencil is small, so centimetres fit.","Pick a unit for small lengths."),
Q("100 centimetres equals...",["10 metres","100 metres","1 metre"],2,"There are 100 centimetres in one metre.","Think of a metre ruler."),
Q("Which is most likely about 2 metres tall?",["A doorway","A pencil","An ant"],0,"A doorway is about two metres tall.","Picture each one next to you.")]);
T["3.english.purpose"]=L("📰","Who is this for?","Recognise audience and purpose.",
"Writers write for a reader and a reason. The reason can be to entertain, inform or persuade.",
"A museum sign about fossils is for people visiting the museum. It informs them.",
"Find a poster or box. Say who it is talking to.",[
Q("A letter asking council to fix a park is mainly...",["Imaginative","Persuasive","A recipe"],1,"It asks the council to do something.","What does the writer want?"),
Q("A report about how dinosaurs lived is mainly...",["An advert","A fairy tale","Informative"],2,"Reports explain facts.","What does the writer want?"),
Q("A story told by a T. rex is mainly...",["Imaginative","A bus timetable","A measuring chart"],0,"It tells a made-up story.","Is it real or made up?")]);
T["3.english.paragraph"]=L("📝","One idea at a time","Group related sentences in paragraphs.",
"A paragraph is a group of sentences about one main idea. A new idea starts a new paragraph.",
"A paragraph about what dinosaurs ate goes apart from one about where they lived.",
"Write two short paragraphs. One about a dinosaur. One about its home.",[
Q("Which two sentences belong in a paragraph about stegosaurus?",["I like bikes. The toast is ready.","Stegosaurus had plates. Stegosaurus ate plants.","The moon is bright. We ate lunch."],1,"Both sentences are about stegosaurus.","Find sentences with the same topic."),
Q("A new paragraph is useful when you...",["Write another word","Add a comma","Start a new main idea"],2,"Paragraphs keep different ideas apart.","Think about ideas, not words."),
Q("Which is a good topic sentence for a paragraph about bees?",["Bees help plants grow.","My shoes are red.","I finished my homework."],0,"It tells the main idea about bees.","Which one is about bees?")]);
T["3.english.inference"]=L("🕵️","Read between the lines","Use clues to infer meaning.",
"Writers do not say everything. Use clues in the text. Add what you already know. Then work out what is likely.",
"'Water dripped off Kai's coat.' Kai was probably out in the rain.",
"Read a sentence. Say your guess and which words helped.",[
Q("'Sana grabbed an umbrella as dark clouds gathered.' What is likely?",["It is a sunny morning","Rain is coming","It is snowing indoors"],1,"Dark clouds and an umbrella mean rain.","Use a clue from the sentence."),
Q("'Tom pulled up his blanket and shivered.' How might Tom feel?",["Too hot","Hungry","Cold"],2,"Shivering is a clue for cold.","What makes you shiver?"),
Q("'The crowd stood and clapped at the end.' What probably happened?",["A show finished","The shops opened","A storm began"],0,"People clap when a show ends.","Why do people clap?")]);
T["3.english.figurative"]=L("💥","Roar and crunch","Explore onomatopoeia and rhythmic word choices.",
"Onomatopoeia is a word that sounds like its noise. Roar, crunch and splash are examples.",
"'Crunch!' helps you hear a dino stepping on leaves.",
"Write a comic-style sound for a block being placed.",[
Q("Which word is onomatopoeia?",["green","buzz","quietly"],1,"Buzz sounds like a bee.","Which word sounds like its noise?"),
Q("Which sound fits a balloon popping?",["whisper","drift","POP!"],2,"Pop copies the popping sound.","Which word sounds like its noise?"),
Q("What does 'crash' help a reader imagine?",["A loud bump","A sweet smell","A smooth feel"],0,"Crash is the noise of things hitting.","Say the word out loud.")]);
T["4.maths.decimal"]=L("🔟","Decimal blocks","Read and represent tenths and hundredths.",
"Place value keeps going after the decimal point. The first place is tenths. The second place is hundredths. 2.46 is 2 ones, 4 tenths and 6 hundredths.",
"0.35 is 3 tenths and 5 hundredths. That is 35 hundredths.",
"Draw a 10 by 10 grid like a block floor. Shade 25 squares to show 0.25.",[
Q("What is 0.6 as a fraction?",["6/100","6/10","6/1"],1,"Six tenths is 6/10.","Is the 6 in tenths or hundredths?"),
Q("What is 0.25 as hundredths?",["2 hundredths","25 tenths","25 hundredths"],2,"0.25 is 25 out of 100.","Look at both digits after the point."),
Q("In 3.08, what digit is in the hundredths place?",["8","0","3"],0,"Hundredths is the second digit after the point.","Count two places after the point."),
Q("Which number equals ten hundredths?",["0.01","0.10","1.00"],1,"Ten hundredths is one tenth, or 0.10.","Ten hundredths make one tenth."),
Q("Which number is larger?",["0.65","They are equal","0.7"],2,"0.7 is 70 hundredths. 70 is more than 65.","Write both as hundredths.")]);
T["4.maths.fractions"]=L("🦴","Equal fraction digs","Recognise equivalent fractions and their links to decimals.",
"Equivalent fractions show the same amount. Multiply the top and bottom by the same number. The value stays the same. Some fractions can be decimals too.",
"Half a dig site is the same as two quarters. 1/2 = 2/4 = 0.5.",
"Fold paper into halves, then quarters. See how two quarters cover one half.",[
Q("Which fraction is equivalent to 1/2?",["1/4","2/4","2/3"],1,"Double the top and bottom of 1/2 to get 2/4.","Same amount, not just similar numbers."),
Q("What is 3/6 in simplest form?",["1/3","2/3","1/2"],2,"Three out of six parts is one half.","Divide the top and bottom by 3."),
Q("Which fraction matches the decimal 0.5?",["5/10","5/100","1/5"],0,"Five tenths is 0.5.","The 5 is in the tenths place."),
Q("Which fraction is equivalent to 2/3?",["3/4","4/6","2/6"],1,"Double the top and bottom to get 4/6.","Multiply top and bottom by 2."),
Q("What is another way to write 1/4?",["4/10","10/25","25/100"],2,"A quarter is 25 out of 100.","How many in a quarter of 100?")]);
T["4.maths.place-power"]=L("✖️","Ten times the blocks","Multiply and divide whole numbers by 10 and 100.",
"Times 10 makes each digit worth ten times more. Times 100 makes it worth one hundred times more. Dividing does the reverse.",
"34 × 10 = 340. Check it: 340 ÷ 10 = 34.",
"Use place-value cards to show what happens to 23 times 10.",[
Q("What is 34 × 10?",["44","340","3400"],1,"34 groups of ten make 340.","Each digit moves up one place."),
Q("70 blocks go in stacks of 10. How many stacks?",["70","700","7"],2,"There are seven tens in seventy.","How many tens in 70?"),
Q("What is 46 × 100?",["4600","460","146"],0,"46 hundreds is 4600.","Each digit moves up two places."),
Q("What is 150 ÷ 10?",["1500","15","105"],1,"150 split into tens is 15 groups.","How many tens in 150?"),
Q("What is 6 × 30?",["36","60","180"],2,"Six lots of three tens is 18 tens, or 180.","Do 6 × 3, then times 10.")]);
T["4.maths.money"]=L("🪙","Trading post","Model money problems and check whether answers are reasonable.",
"Write a number sentence for the problem. Multiply for items that cost the same. Subtract to find change. Estimate to check your answer.",
"Three dino figures at $4 each cost 3 × $4 = $12. Pay $20 and get $8 change.",
"Plan a pretend shop trip with three items. Work out the total and the change.",[
Q("Three dino books cost $4 each. How much in total?",["$7","$12","$16"],1,"Three lots of $4 is $12.","Which operation fits?"),
Q("You buy two $7 items and pay $20. What is your change?",["$13","$7","$6"],2,"2 × $7 is $14. $20 take away $14 is $6.","Find the total first."),
Q("About how much is $198 + $203?",["$400","$40","$4,000"],0,"Both round to about $200. Together about $400.","Round each one first."),
Q("What is $3.60 + $2.20?",["$5.60","$5.80","$6.20"],1,"$3 + $2 is $5. 60c + 20c is 80c.","Add dollars, then cents."),
Q("Four museum tickets cost $8 each. How much for four?",["$12","$48","$32"],2,"Four lots of $8 is $32.","Which operation fits?")]);
T["4.english.fact"]=L("📰","Fact or opinion?","Distinguish factual reporting from opinions and feelings.",
"A fact can be checked. An opinion is a feeling or what someone likes. Word choices can change how readers feel.",
"'T. rex was a meat eater' is a fact. 'T. rex is the coolest dinosaur' is an opinion.",
"Find one fact and one opinion on a poster or cereal box.",[
Q("Which statement is an opinion?",["Water can fall as rain.","Rainy days are the best.","Rain falls from clouds."],1,"'The best' is a personal feeling.","Can it be checked?"),
Q("Which statement is a fact?",["Monday is the nicest day.","Weekends feel too short.","A week has seven days."],2,"You can check the days in a week.","Can it be checked?"),
Q("Which word usually shows an opinion?",["Wonderful","Measured","Recorded"],0,"'Wonderful' is a judgement.","Which word is a feeling?"),
Q("A news report says 'The match lasted 70 minutes'. This is...",["A personal preference","Objective information","A feeling"],1,"The time can be checked.","Can it be checked?"),
Q("Which sentence uses opinion words?",["The concert began at 7 pm.","The band played five songs.","That was an amazing show."],2,"'Amazing' is a personal view.","Look for a feeling word.")]);
T["4.english.clauses"]=L("🔗","Linking ideas","Recognise a main clause and a dependent clause in a complex sentence.",
"A complex sentence has a main clause. It makes sense alone. It also has a dependent clause. That part cannot stand alone. Words like because, although and when join them.",
"'We stayed inside because it rained.' 'We stayed inside' is the main clause. 'Because it rained' gives the reason.",
"Write one sentence with 'because'. Write another with 'although'.",[
Q("Which sentence has a dependent clause?",["The bus was late.","We waited because the bus was late.","We waited quietly."],1,"'Because the bus was late' cannot stand alone.","Find the part that needs help."),
Q("Which word shows a reason?",["although","meanwhile","because"],2,"'Because' tells why.","Which word answers why?"),
Q("Complete it: '_____ it was cold, we went swimming.'",["Although","And","Or"],0,"'Although' shows a surprise contrast.","Cold and swimming do not match."),
Q("In 'When the bell rang, we packed up', which is the main clause?",["When the bell rang","we packed up","When the"],1,"'We packed up' makes sense alone.","Which part works alone?"),
Q("Which sentence gives a reason with a dependent clause?",["I drank water and ate lunch.","I drank water.","I drank water because I was thirsty."],2,"'Because I was thirsty' gives the reason.","Look for because.")]);
T["4.english.infer"]=L("🔎","Fossil clues","Use textual evidence to infer, predict and summarise.",
"Readers use clues like a fossil hunter. Mix text clues with what you know. Predict what may happen. Change your idea if new clues appear.",
"'Maya zipped her coat and grabbed an umbrella.' She probably expects wet or cold weather.",
"Read a short paragraph. Write one prediction. Underline the clue that helped.",[
Q("'Maya grabbed an umbrella as clouds darkened.' What is she expecting?",["A heatwave","Rain","A birthday party"],1,"The umbrella and dark clouds point to rain.","Use the clues, not just guesses."),
Q("'The puppy waited by its empty bowl and whined.' What does it want?",["A new collar","A walk in the rain","Food"],2,"An empty bowl and whining point to hunger.","What is the bowl for?"),
Q("'After three hours of hiking, Luca sat and drank water.' What is likely?",["Luca may be tired and thirsty.","Luca is learning to drive.","Luca dislikes all exercise."],0,"A long hike and water point to tired and thirsty.","Use the clues, not just guesses."),
Q("Which detail best shows a storm is coming?",["The garden was full of flowers.","Thunder rolled and the sky grew dark.","The classroom had new chairs."],1,"Thunder and dark skies are storm clues.","Which detail is about weather?"),
Q("Best summary: 'Ella planted seeds, watered them daily, and saw seedlings appear'?",["Ella bought new shoes.","Ella went to the beach.","Ella cared for seeds until they sprouted."],2,"It covers planting, care and growth.","A summary keeps the main events.")]);
T["4.english.tension"]=L("🎭","Story tension","Explore how character, setting and plot tension engage readers.",
"Characters have goals and problems. That makes a story matter. Writers build tension with a problem or a wait. A strange setting adds to it.",
"'The mine tunnel grew darker. Sam could not find the way out.' Readers want to know what happens next.",
"Write a three-sentence adventure. Character, problem, solution. Add one detail that builds suspense.",[
Q("What creates the most tension in a story?",["The hero likes blue.","The bridge wobbles as the hero crosses.","The hero owns three pencils."],1,"A wobbly bridge makes readers unsure what happens.","Look for a problem or a worry."),
Q("Which detail tells us what a character wants?",["Lila wore a green hat.","The park had four benches.","Lila searched everywhere for her lost dog."],2,"Searching shows Lila's goal.","What is she trying to do?"),
Q("Why might a writer set a scene in a dark, unknown cave?",["To build suspense","To give a maths timetable","To make sure nothing happens"],0,"A dark, unknown place makes readers wonder.","How does a dark place feel?"),
Q("What is a story's resolution?",["The first sentence only","How the main problem is solved","A list of names"],1,"The resolution shows how the problem works out.","Think about the end."),
Q("Which sentence shows an obstacle?",["Noor liked yellow flowers.","Noor's room had a desk.","The gate was locked when Noor arrived."],2,"A locked gate blocks Noor's way.","What gets in the way?")]);
T["2.science.sky"]=L("🌞","Sky over the dino valley","Find patterns in our sky.",
"Earth is a planet that turns. As Earth spins, the Sun seems to cross the sky. Dinosaurs saw this every day too. We can watch the Moon and stars as well.",
"In the morning, the Sun is low on one side. Later it is high, then low on the other side. Never look straight at the Sun.",
"Keep a sky diary for two days, like a block world explorer's log. Sketch the Moon if you see it.",[
Q("Why does the Sun seem to cross the sky over the dino valley?",["The Sun circles Earth each day","Earth turns","Clouds push the Sun"],1,"Earth spins once in about 24 hours, so the Sun seems to move.","Think about what our planet is doing."),
Q("What would help a dino scientist find a sky pattern?",["Look just once","Guess without looking","Record what you see on several days"],2,"Looking many times helps scientists spot patterns.","A pattern needs more than one look."),
Q("Your side of Earth faces away from the Sun. What time is it?",["Night","Noon","Morning"],0,"Facing away from the Sun means no sunlight, so it is night.","Does sunlight reach your side?"),
Q("What goes in a block world sky diary?",["Only your favourite foods","Moon shapes seen on different nights","How loud your pencil is"],1,"Recording Moon shapes helps us find a pattern.","A sky diary is for the sky.")]);
T["2.science.sounds"]=L("🦖","Dino roar science","Understand how sounds begin.",
"Sound starts when something vibrates. Vibrate means it moves back and forth very fast. A drum skin can vibrate. A string can vibrate. A dinosaur's roar starts with its throat vibrating.",
"Hold a ruler over the edge of a desk. Gently tap the end. Watch it wobble and listen to the sound.",
"With an adult, tap a wooden spoon on a cushion, then on a table. Which sound is louder?",[
Q("A dino band plays a guitar. What does the string do to make sound?",["It freezes","It disappears","It vibrates"],2,"The string moves back and forth and makes sound.","Does it move or stay still?"),
Q("Which could make a sound without electricity?",["A picture of a drum","A tapped drum","A silent drawing"],1,"Tapping makes the drum skin vibrate.","Which one can really move?"),
Q("A dinosaur gently taps a drum. What does the drum skin do?",["Vibrates","Turns into water","Stays perfectly still"],0,"The drum skin vibrates, and that makes sound.","Watch a drum skin while it makes a sound."),
Q("A bell rings in the block village. What carries the sound to your ears?",["Sunlight only","The bell's colour","Vibrations travelling through air"],2,"The bell vibrates, and the vibration travels through air.","Sound has to travel from the bell to you.")]);
T["2.science.materials"]=L("🧱","Reshape the blocks","Explore physical changes to materials.",
"You can bend, fold, stretch, twist and cut some materials. Changing the shape does not change what it is made of. A crafted paper plane is still paper.",
"Fold a piece of paper into a plane. It is still paper. Only the shape changed.",
"Ask an adult for spare paper. Fold it into a dinosaur shape, then unfold it.",[
Q("What is a folded paper plane made from?",["Plastic","Paper","Metal"],1,"Folding changes the shape, not the material.","What was it before you folded it?"),
Q("Which action stretches a material?",["Watching an elastic band","Naming its colour","Pulling an elastic band longer"],2,"Stretching changes the shape by pulling.","Which action changes its shape?"),
Q("You are crafting a clay dinosaur egg. Which action changes its shape?",["Squashing it","Naming it","Counting it"],0,"Squashing really changes the clay's shape.","Which action means touching and moving the clay?"),
Q("You twist a pipe cleaner into a dino tail. What changes?",["Its age","Its shape","The weather"],1,"Twisting changes the shape of some materials.","It is still the same material.")]);
T["2.science.science-test"]=L("🔬","Dino lab tests","Make predictions and compare what happens.",
"Scientists ask questions they can test. They make a prediction first. Then they watch and record results. A fair test changes only one thing.",
"Which paper towel soaks up more water? Use pieces the same size. Use the same amount of water. Ask an adult to help.",
"Slide two toy dinosaurs down two different surfaces. Watch which one slides better.",[
Q("You compare two towels in the dino lab. What should stay the same?",["The brands must match","The size of the towel pieces","Your guess must be right"],1,"Same-sized pieces make the test fair.","Change the towel brand, not everything."),
Q("Your result is different from your prediction. What now?",["Record what happened","Hide the result","Pretend you were right"],0,"Scientists record what really happens, even surprises.","Real results are useful."),
Q("What should scientists write down after a test?",["Only what they hoped for","A made-up result","What they really saw"],2,"Honest notes let us compare predictions with evidence.","A surprise can still teach us something."),
Q("You test which toy dinosaur slides farther. What is a good first step?",["Say both are the same without testing","Change every part at once","Predict which will slide farther"],2,"A prediction gives you something to compare with your results.","What do you think will happen?")]);
T["2.hass.places"]=L("🏛️","Special places in the village","Recognise why local places are important.",
"Some places matter to a community. A library, park or hall can be special. It may have history. People do things there together. Different people may value the same place for different reasons.",
"A library matters because people borrow books there. They learn and meet there too. Like a village hall in a block world.",
"Ask someone which place in your area matters to them, and why.",[
Q("What is a good reason a local library matters?",["Every library is the oldest building","People can learn and borrow books","Nobody uses libraries"],1,"A place matters when it helps its community.","Think about what people do there."),
Q("Why might two people value the same place differently?",["Only one person can be right","Places have no history","They have different experiences"],2,"People bring different memories to places.","People do not all have the same memories."),
Q("Why might a dinosaur museum be special to one family?",["They have happy memories there","Museums never change","Only scientists visit"],0,"Places can matter because of what people did there.","Think about memories and activities."),
Q("Which question helps you learn why a place matters?",["Is it the same as every place?","What do people use it for?","Can we ignore the community?"],1,"How people use a place helps explain why it matters.","Ask about the people and the place.")]);
T["2.hass.technology-past"]=L("📻","Old tools, new tools","Explore how inventions change everyday life.",
"Long ago, people sent letters by post. They used landline phones. Now we have smartphones. New tools also change how people work and travel.",
"A letter can take days to arrive. A text message arrives almost straight away.",
"Ask an adult how they talked to friends when they were young.",[
Q("What did people often use to send news before mobile phones?",["Video calls","Chat apps","Letters"],2,"Writing letters was an important way to share news.","Think about paper sent by post."),
Q("How did new technology change messages?",["Messages can travel faster","Everyone stopped talking","All jobs disappeared"],0,"Many messages now reach people in seconds.","Compare a posted letter with a text."),
Q("What can an old photo help us find out?",["What happens tomorrow","How people lived in the past","The future weather"],1,"Photos are clues about life in the past.","A photo shows a moment in time."),
Q("Which shows communication technology changing?",["Two identical pencils","A chair and a table","Postcards and instant messages"],2,"Messages went from paper to digital.","Look for two ways of sending messages.")]);
T["2.hass.map-zoom"]=L("🗺️","Zoom out on the world map","Understand places at different scales.",
"Your street is part of a suburb or town. That town is part of a state or territory. Australia is a country. Maps can show a small area or a big region. It is like zooming out on a block world map.",
"Brisbane is a city. It is in Queensland. Queensland is a state of Australia.",
"With an adult, find your suburb, Queensland and Australia on a map.",[
Q("Which is a state of Australia?",["Brisbane","Queensland","The Pacific Ocean"],1,"Queensland is a state. Brisbane is a city.","One is a state. One is a city."),
Q("Which map would show more street detail?",["A map of the whole world","A map of the solar system","A map of one suburb"],2,"A small-area map can show roads and buildings.","A small area can be shown close up."),
Q("Brisbane is in which Australian state?",["Queensland","Tasmania","Victoria"],0,"Brisbane is the capital city of Queensland.","Think about the north-east state."),
Q("A map of Australia helps show...",["Every crack in your footpath","States and territories","Only one bedroom"],1,"A country map shows big areas like states.","This is a big-area map.")]);
T["2.technologies.steps"]=L("🤖","Robot dino instructions","Use sequence, decisions and repetition.",
"An algorithm is a set of steps. The order matters! Some steps use 'if' to choose. Some steps repeat. Crafting recipes work like this.",
"If it is raining, take an umbrella. If not, wear a sunhat.",
"Give a family member simple steps to draw a block house.",[
Q("Which step comes first when brushing teeth?",["Put the brush away","Put toothpaste on the brush","Rinse after brushing"],1,"Good algorithms put steps in an order that works.","Start before you clean your teeth."),
Q("A robot dino reads 'repeat stomp 3 times'. What does it do?",["Stomp once","Do not stomp","Stomp three times"],2,"Repeating a step is called iteration.","The number tells you how many times."),
Q("Which algorithm works for making a sandwich?",["Get bread, add filling, put pieces together","Eat first, then buy food","Throw the food away first"],0,"The steps are in an order that works.","What do you need before you make it?"),
Q("A robot dino follows: 'If the light is red, stop.' This is a...",["Random noise","Decision rule","Map of Australia"],1,"The 'if' tells the robot what to choose.","It chooses based on a condition.")]);
T["2.technologies.data"]=L("📊","Dino picture charts","Represent information using symbols.",
"Data is information. We can show data with pictures, numbers, words or symbols. A chart helps us compare amounts.",
"One 🦕 means one dinosaur. So 🦕🦕🦕 means three dinosaurs.",
"Make a picture chart of the fruit in your kitchen.",[
Q("If 🥚 means one dino egg, how many are 🥚🥚🥚🥚?",["2","6","4"],2,"There are four symbols, so there are four eggs.","Count one for each picture."),
Q("What could help compare favourite dinosaurs in a class?",["A random guess","A picture chart","An unrelated drawing"],1,"A chart makes results easy to compare.","We need a way to show counts."),
Q("A chart has 3 T-rex pictures and 1 Stegosaurus picture. Which has more?",["T-rex","Stegosaurus","They are equal"],0,"Three symbols is more than one symbol.","Count the pictures in each group."),
Q("Why do we label pictures on a chart?",["To make it hard to read","So numbers disappear","So people know what each picture means"],2,"Labels make the data clear.","A chart should make sense to others.")]);
T["2.technologies.privacy"]=L("🔐","Guard your block base","Learn that apps may collect personal data.",
"Some apps and websites store things like names or photos. Your details are like your secret base. Ask a trusted adult before you type personal details. Ask before you share anything online.",
"A block game asks for your home address. That is private information. Do not type it.",
"With an adult, point out information that should stay private.",[
Q("A strange website asks for your home address. What do you do?",["Share it right away","Ask a trusted adult","Post it for everyone"],1,"A trusted adult can help decide what is safe.","Do not send private details to strangers."),
Q("Can websites sometimes save what you type?",["Never","Only if a game has music","Yes"],2,"Websites can store information, so be careful what you share.","Information can stay online."),
Q("Which should you ask an adult about before sharing online?",["A photo showing where you live","Your favourite dinosaur in a private drawing","A number in a maths question"],0,"Photos can show private details like where you live.","Look for clues about where you live."),
Q("Someone in a game chat asks for your password. What is best?",["Send it straight away","Post it in the chat","Do not share it and tell a trusted adult"],2,"Passwords are private and keep accounts safe.","It protects your account.")]);
T["2.technologies.design"]=L("🛠️","Craft for a purpose","Design useful products and think about waste.",
"People design things to meet needs. A good design is safe and useful. It can be comfy too. It can also make less waste.",
"A reusable drink bottle carries water. You fill it again and again. You do not throw away a new bottle each time.",
"Sketch a lunchbox with one feature that makes it easier to use. Maybe add a dinosaur handle.",[
Q("What is the main job of a drink bottle?",["To make a loud noise","To cover a book","To carry a drink"],2,"Design starts with what a person needs.","What job should it do?"),
Q("Which choice makes less single-use waste?",["A refillable bottle","A new bottle every hour","Throwing away a good bottle"],0,"Using the same strong bottle again makes less waste.","Can it be used again?"),
Q("Who should a designer think about first?",["Only the colour","The person who will use it","Nobody at all"],1,"Good design meets people's needs.","Who needs this thing?"),
Q("Which lunchbox feature could help a younger child?",["A broken lid","A sharp edge","An easy-to-open clasp"],2,"Good design makes things easier and safer to use.","Imagine opening it at school.")]);
T["2.maths.to1000"]=L("🧱","Block stacks to 1000","Read and order numbers up to 1000.",
"Hundreds, tens and ones tell us what each digit is worth. Think of big stacks of 100 blocks, rows of 10 and single blocks. To compare, look at the hundreds first.",
"407 blocks is 4 hundreds, 0 tens and 7 ones.",
"Make a three-digit number with groups of hundreds, tens and ones using pasta or toy blocks.",[
Q("Which pile of blocks is greatest: 540, 504 or 450?",["504","540","450"],1,"540 and 504 both have 5 hundreds. 540 has more tens.","Compare the hundreds first."),
Q("Which number is 3 hundreds, 2 tens and 6 ones?",["362","236","326"],2,"300 + 20 + 6 = 326.","Hundreds, then tens, then ones."),
Q("A dinosaur counts to 699. What number comes next?",["700","698","690"],0,"One more than 699 is 700.","Add one more.")]);
T["2.maths.regroup"]=L("⛏️","Regroup the mined blocks","Rename numbers as hundreds, tens and ones.",
"A hundred is ten tens. You can split a number into different groups. The amount stays the same.",
"130 blocks is 1 hundred and 3 tens. It is also 13 tens.",
"Show 120 using groups of 10 coins or pegs.",[
Q("How many stacks of ten blocks make 100?",["5","10","100"],1,"Ten groups of ten make one hundred.","Ten tens make one hundred."),
Q("What is 200 + 40 + 3?",["234","423","243"],2,"Put the parts together to make 243.","Hundreds, then tens, then ones."),
Q("In 405, the zero means...",["0 tens","0 ones","0 hundreds"],0,"The middle place is the tens place.","Which place is in the middle?")]);
T["2.maths.facts"]=L("🦕","Dino fact families","Use addition facts to help subtraction.",
"Adding and taking away undo each other. If 7 + 5 = 12, then 12 - 5 = 7.",
"A herd has 7 dinosaurs. 5 more join, so there are 12. Then 5 walk away. 7 are left: 12 - 5 = 7.",
"Make a fact family with 8, 4 and 12 using toy dinosaurs or blocks.",[
Q("If 9 + 6 = 15, what is 15 - 6?",["6","9","8"],1,"Taking away six undoes adding six.","Do the opposite."),
Q("A dinosaur has 13 eggs. 8 hatch. How many have not hatched? (13 - 8)",["6","4","5"],2,"8 + 5 = 13, so 13 - 8 = 5.","Check with adding."),
Q("Which fact proves 18 - 7 = 11?",["11 + 7 = 18","11 - 7 = 18","18 + 7 = 11"],0,"Adding back 7 to 11 gives 18.","Do the opposite.")]);
T["2.maths.fractions"]=L("🍕","Halves and quarters of the cake","Recognise equal parts of a whole.",
"A half is one of two equal parts. Split each half again. Now you have four quarters.",
"Cut a paper circle into four equal pieces. Each piece is one quarter.",
"Fold paper into two equal parts, then four.",[
Q("A dino birthday cake is cut into quarters. How many quarters make the whole cake?",["2","4","8"],1,"Four quarters fit together to make one whole.","Equal parts must be the same size."),
Q("Which is bigger for the same-sized pizza?",["One quarter","They are equal","One half"],2,"A half is two quarters, so it is bigger.","Fewer parts means bigger parts."),
Q("Two quarters of a block wall are coloured. What fraction is coloured?",["One half","One quarter","One whole"],0,"Two out of four equal parts is one half.","Two quarters fit together.")]);
T["2.english.characters"]=L("🎭","Dino character clues","Use story clues to understand characters.",
"A reader can use what characters say and do. These clues show how they might feel.",
"'Rex smiled when he saw his friend.' Smiling is a clue. Rex was pleased.",
"Read a story and find one clue about how a character feels.",[
Q("'Tops hid in the cave during the storm.' How might Tops feel?",["Bored","Hungry","Worried"],2,"Hiding from a storm is a clue he felt worried.","Look at what he did."),
Q("'Dina shared her berries with a friend.' Which word fits?",["Generous","Careless","Cruel"],0,"Sharing shows she is generous.","Look at what she did."),
Q("'Mo cheered when his block tower was finished.' Mo probably feels...",["Sleepy","Excited","Angry"],1,"Cheering is a clue that Mo feels excited.","Look at what he did.")]);
T["2.english.compound"]=L("🔗","Join two blocks of ideas","Recognise compound sentences.",
"A compound sentence joins two full ideas. It often uses and, but or so. Each part can stand alone, like two blocks joined together.",
"'The rain stopped, and we played outside.' Both parts make sense by themselves.",
"Join two ideas about your day using but.",[
Q("Which word best joins: 'I wanted to build, ___ it was bedtime.'",["because","but","under"],1,"But shows the two ideas are different.","Check both parts can stand alone."),
Q("Which sentence has two complete ideas?",["Because in the cave","At the dig site","I mined some stone, and Dad cooked."],2,"Both parts of that sentence make sense alone.","Check both parts can stand alone."),
Q("Choose the best join: 'It was cold, ___ I wore a jumper.'",["so","or","than"],0,"So shows what happened because of the cold.","What happened because of the cold?")]);
T["2.english.purpose"]=L("📰","Why was it written?","Recognise different text purposes.",
"Some texts entertain us with stories. Some inform us with facts. Persuasive texts try to make us agree or act.",
"A poster says 'Please recycle paper!' It wants you to do something. So it persuades.",
"Find a dinosaur fact book that informs and a story that entertains.",[
Q("A fact sheet about Triceratops is mainly written to...",["Entertain with a made-up story","Inform","Persuade you to buy shoes"],1,"Fact sheets give information.","Entertain, inform or persuade?"),
Q("A story about a dragon in a block world is mainly written to...",["List bus times","Give a weather warning","Entertain"],2,"Made-up stories are mostly for enjoyment.","Entertain, inform or persuade?"),
Q("A poster saying 'Save water!' is mainly trying to...",["Persuade","Measure distance","Retell a fairy tale"],0,"The poster wants readers to act.","Entertain, inform or persuade?")]);
T["2.english.wordparts"]=L("🔎","Dig out the base word","Use smaller word parts to read new words.",
"A base word can get endings like -s, -ed or -ing. Dig for the part you already know. Like a fossil hidden in rock.",
"Dig becomes digging when we add -ing. Jump becomes jumped when we add -ed.",
"Make a word family with play: plays, played, playing.",[
Q("What is the base word in playing?",["ing","play","laying"],1,"Playing is play with -ing added.","Find the word inside the longer word."),
Q("Which word means the action happened before now?",["walking","walks","walked"],2,"The ending -ed can show the past.","Which ending shows the past?"),
Q("Which word means more than one dinosaur?",["dinosaurs","dinosaured","dinosauring"],0,"Add -s to show more than one.","Which ending means more than one?")]);
T["6.maths.integers"]=L("⛏️","Mining below zero","Compare and calculate with positive and negative numbers.",
"Integers can go below zero. Picture a mine shaft. Ground level is zero. Up is positive. Down is negative. Right on a number line means greater.",
"You dig from level -3 up to level 2. Count the steps: -3 to 0 is 3, then 0 to 2 is 2. That is 5 levels.",
"Draw a ladder on paper from -10 to 10. Move a toy block up and down it.",[
Q("Which mine level is smallest?",["-2","-8","3"],1,"-8 is farthest left on the number line.","Picture the numbers in order."),
Q("A miner is at level -5 and climbs 9 levels. What is -5 + 9?",["-14","14","4"],2,"Move nine places right from -5 to reach 4.","Climbing up moves right."),
Q("A dinosaur starts at 4 and digs down 7. What is 4 - 7?",["-3","3","11"],0,"Move seven places left from 4 to reach -3.","Digging down moves left."),
Q("Which cave is warmer?",["-6°C","-1°C","They are equal"],1,"-1 is greater than -6, so it is warmer.","Closer to zero is warmer here."),
Q("A mine cart goes from level -2 to level 4. How many levels up?",["2","4","6"],2,"Count six steps from -2 to 4.","Count to zero first.")]);
T["6.maths.prime"]=L("🦖","Prime and square fossils","Identify prime, composite and square numbers.",
"Prime numbers have exactly two factors: 1 and itself. Composite numbers have more than two. Square numbers come from a number times itself. You can build a square from blocks for a square number.",
"17 blocks only make one row of 17. So 17 is prime. 21 makes 3 rows of 7, so it is composite. 36 makes a 6 by 6 square.",
"Use Lego or coins. Try to make rectangles from 2 up to 30 pieces.",[
Q("Which fossil number is prime?",["15","21","17"],2,"17 has only 1 and 17 as factors.","Find the factors first."),
Q("Which number of blocks makes a square?",["49","54","42"],0,"7 × 7 = 49.","Try a number times itself."),
Q("Why is 1 not prime?",["It is even.","It has only one factor.","It has three factors."],1,"Prime numbers need exactly two factors.","Count its factors."),
Q("Which is composite?",["23","27","19"],1,"27 can be split by 1, 3, 9 and 27.","Can it make a rectangle?"),
Q("What is the only even prime?",["4","6","2"],2,"2 has only 1 and 2 as factors.","Think of the smallest even numbers.")]);
T["6.maths.compare"]=L("🍖","Fraction feeding line","Compare and order equivalent fractions.",
"To compare fractions, make the bottom numbers match. Or put them on a number line. Equivalent fractions are the same amount. They just look different.",
"Turn 3/4 into eighths: multiply top and bottom by 2. That gives 6/8. 6/8 is more than 5/8.",
"Fold paper strips into halves, thirds and quarters. Line them up to compare.",[
Q("Which dinosaur ate more of its leaves?",["5/8","3/4","They are equal"],1,"3/4 is 6/8, so it is greater.","Find a common denominator."),
Q("Which equals 2/3?",["6/12","4/9","8/12"],2,"Multiply top and bottom by four.","What times 3 makes 12?"),
Q("Which is smallest?",["1/4","1/2","3/4"],0,"A quarter is less than a half.","Picture a block cut into parts."),
Q("Compare 5/6 and 3/4. Which is greater?",["3/4","They are equal","5/6"],2,"10/12 is more than 9/12.","Use twelfths."),
Q("Where is 7/8 on the line?",["Below 1/4","Between 3/4 and 1","At 1/2"],1,"7/8 is between 6/8 and 8/8.","Change it all to eighths.")]);
T["6.maths.fraction-sums"]=L("🧩","Crafting with fractions","Add and subtract fractions with related denominators.",
"Make the pieces the same size before you add or take away. Then add the top numbers. Keep the bottom number the same.",
"1/2 + 1/4. Change 1/2 into 2/4. Then 2/4 + 1/4 = 3/4.",
"Draw a bar split into 12 parts. Colour pieces to show two sums.",[
Q("1/2 + 1/4 = ?",["2/6","3/4","1/6"],1,"2/4 plus 1/4 is 3/4.","Use same-size pieces."),
Q("A crafting stack is 5/6 full. You use 1/3. 5/6 - 1/3 = ?",["4/3","2/6","1/2"],2,"5/6 - 2/6 = 3/6 = 1/2.","Change thirds to sixths."),
Q("2/3 + 1/6 = ?",["5/6","3/9","1/2"],0,"4/6 + 1/6 = 5/6.","Change thirds to sixths."),
Q("7/8 - 1/4 = ?",["6/4","3/8","5/8"],2,"7/8 - 2/8 = 5/8.","Change quarters to eighths."),
Q("3/4 + 1/8 = ?",["4/12","7/8","1/2"],1,"6/8 + 1/8 = 7/8.","Change quarters to eighths.")]);
T["6.maths.decimals"]=L("💎","Gem trader decimals","Add, subtract and estimate with decimals.",
"Line up the decimal points. Then add or take away each column. Round first to check your answer makes sense.",
"2.45 + 1.30 = 3.75. Check: 2 + 1 = 3. 3.75 is close to 3, so it makes sense.",
"Write prices for three snacks. Estimate the total, then add them exactly.",[
Q("A trader has 3.45 kg of gems and gets 2.30 kg more. 3.45 + 2.30 = ?",["5.48","5.75","5.15"],1,"Add hundredths, tenths, then ones to get 5.75.","Line up the points."),
Q("8.00 - 2.65 = ?",["6.65","5.45","5.35"],2,"8.00 minus 2.65 equals 5.35.","Line up the points."),
Q("Estimate 19.80 + 4.25.",["24","15","240"],0,"Round to about 20 plus 4.","Round to whole numbers."),
Q("0.7 + 0.08 = ?",["0.15","0.708","0.78"],2,"0.70 + 0.08 = 0.78.","Write 0.7 as 0.70."),
Q("6.2 - 0.75 = ?",["5.45","5.55","6.55"],0,"6.20 - 0.75 = 5.45.","Write 6.2 as 6.20.")]);
T["6.maths.powers"]=L("⚡","Times ten blocks","Multiply and divide decimals by multiples of 10.",
"Times by 10 moves each digit one place bigger. Divide by 10 moves each digit one place smaller. 100 moves two places. 1000 moves three.",
"4.5 × 100: move digits two places bigger. That makes 450. 36 ÷ 100 moves two places smaller. That makes 0.36.",
"Measure a few things in metres. Change them to centimetres by times 100.",[
Q("3.42 × 10 = ?",["3.420","34.2","342"],1,"Each digit moves one place bigger.","Should it grow or shrink?"),
Q("0.56 × 100 = ?",["5.6","0.0056","56"],2,"Move digits two places bigger to get 56.","Should it grow or shrink?"),
Q("48 blocks shared into 100 parts. 48 ÷ 100 = ?",["0.48","4.8","4800"],0,"Move digits two places smaller to get 0.48.","Should it grow or shrink?"),
Q("7.8 ÷ 10 = ?",["78","0.78","7.08"],1,"Move digits one place smaller to get 0.78.","Should it grow or shrink?"),
Q("0.09 × 1000 = ?",["9","900","90"],2,"Nine hundredths times a thousand is 90.","Move three places.")]);
T["6.maths.discount"]=L("🛒","Trading post sale","Calculate familiar percentages and discounts.",
"Percent means out of 100. 10% is one tenth. 25% is one quarter. 50% is one half.",
"A dino figure costs $80. 25% off means a quarter off. $80 ÷ 4 = $20. So it now costs $60.",
"Make a pretend shop with toys. Set a sale and work out three new prices.",[
Q("25% of 80 = ?",["25","20","40"],1,"One quarter of 80 is 20.","Start with a quarter."),
Q("A $60 block set is 50% off. The sale price is...",["$10","$50","$30"],2,"Half of $60 is $30.","Start with a half."),
Q("10% of 350 = ?",["35","3.5","3500"],0,"Divide 350 by 10 to get 35.","Start with a tenth."),
Q("A $40 game is 20% off. How much do you save?",["$12","$8","$20"],1,"20% of 40 is 8.","Find 10% first, then double."),
Q("75% is the same as...",["1/4","1/2","3/4"],2,"75 out of 100 is three quarters.","Think of quarters.")]);
T["6.maths.equations"]=L("🔐","Locked chest equations","Find unknown numbers in equations using brackets.",
"An unknown is a hidden number. Undo the steps in reverse order. Keep both sides equal, like a balanced scale.",
"3 × (x + 2) = 18. Undo times 3: 18 ÷ 3 = 6. Undo plus 2: 6 - 2 = 4. So x = 4.",
"Hide some blocks under a cup. Make a missing-number puzzle for someone at home.",[
Q("To open the chest: 4 × (x + 1) = 20. x = ?",["5","4","6"],1,"20 ÷ 4 = 5, then take away 1.","Undo one step at a time."),
Q("7 + □ = 23. What is missing?",["30","14","16"],2,"23 - 7 = 16.","Undo the adding."),
Q("2 × (3 + y) = 16. Find y.",["5","8","13"],0,"16 ÷ 2 = 8, then 8 - 3 = 5.","Undo one step at a time."),
Q("Which equals 18?",["3 × 4 + 2","3 × (4 + 2)","(3 + 4) × 2"],1,"Brackets first: 3 × 6 = 18.","Do brackets first."),
Q("z ÷ 5 = 7. Find z.",["12","2","35"],2,"Multiply 7 by 5 to get 35.","Undo the dividing.")]);
T["6.maths.coordinates"]=L("🗺️","Four-quadrant world map","Plot and locate ordered pairs with negatives.",
"Coordinates (x, y) start at the origin, (0, 0). Move across with x first. Then move up or down with y. Negative means left or down.",
"(-3, 2): go 3 left, then 2 up. That is your spawn point.",
"Draw a grid with four parts on paper. Hide a dinosaur egg and give its coordinates.",[
Q("(4, -2) is in which quadrant?",["Top right","Bottom right","Top left"],1,"Positive x and negative y is bottom right.","First across, then up or down."),
Q("Three left and five up is...",["(3, -5)","(5, -3)","(-3, 5)"],2,"Left is negative x, up is positive y.","First across, then up or down."),
Q("The origin of the world map is...",["(0, 0)","(1, 1)","(-1, 0)"],0,"The axes meet at zero.","Where the lines cross."),
Q("Your base is at (2, 3). Move four left. New point?",["(6, 3)","(-2, 3)","(2, -1)"],1,"Take 4 from x: 2 - 4 = -2.","Left changes x."),
Q("Which point is top left?",["(4, -6)","(-4, -6)","(-4, 6)"],2,"Negative x and positive y is top left.","Left is negative, up is positive.")]);
T["6.maths.measurement"]=L("📏","Block world measuring","Convert length, mass and capacity using decimals.",
"1 kilometre is 1000 metres. 1 kilogram is 1000 grams. 1 litre is 1000 millilitres. Use place value to convert.",
"2.5 kg × 1000 = 2500 g. 750 mL ÷ 1000 = 0.75 L.",
"Read food labels in the pantry. Change grams to kilograms.",[
Q("A tunnel is 2.4 kilometres long. How many metres?",["240","2400","24"],1,"Multiply by 1000.","Smaller units means more of them."),
Q("750 mL = ? litres",["7.5","75","0.75"],2,"Divide by 1000.","Bigger units means fewer of them."),
Q("A dinosaur egg is 1.25 kg. How many grams?",["1250","125","12 500"],0,"Multiply by 1000.","Smaller units means more of them."),
Q("3.6 m = ? centimetres",["36","3600","360"],2,"Multiply by 100.","There are 100 cm in a metre."),
Q("Which block is heavier?",["950 g","1.2 kg","Same mass"],1,"1.2 kg is 1200 g, more than 950 g.","Change both to grams.")]);
T["6.maths.angles"]=L("📐","Angle builders","Use angle relationships to find unknowns.",
"Angles on a straight line add to 180°. Angles around a point add to 360°. Vertically opposite angles are equal.",
"A straight wall has 65° on one side. 180 - 65 = 115. The other angle is 115°.",
"Lay two pencils across each other. Find the matching angles.",[
Q("On a straight line: 73° and ?",["73°","107°","117°"],1,"180 - 73 = 107.","A straight line is 180°."),
Q("Around a point: 90°, 120° and ?",["130°","60°","150°"],2,"90 + 120 = 210, and 360 - 210 = 150.","Around a point is 360°."),
Q("Vertically opposite 48° is...",["48°","132°","90°"],0,"Vertically opposite angles are equal.","Look across the cross."),
Q("A full turn is...",["180°","360°","90°"],1,"A full turn is 360 degrees.","Spin all the way round."),
Q("Two equal angles on a straight line are...",["45° each","180° each","90° each"],2,"180 ÷ 2 = 90.","Split 180 in half.")]);
T["6.maths.probability"]=L("🎲","Loot chest chances","Express chance as fractions, decimals and percentages.",
"Chance goes from 0 to 1. 0 means impossible. 1 means certain. Count the outcomes to make a fraction.",
"A coin has 2 sides. Heads is 1 of them. So the chance is 1/2, which is 0.5 or 50%.",
"Toss a coin 20 times. Count the heads. Is it close to 10?",[
Q("A fair coin has what chance of heads?",["25%","50%","100%"],1,"There is one heads side out of two.","Count both sides."),
Q("A chest has 2 green gems and 6 blue gems. Chance of green?",["3/4","1/2","1/4"],2,"2 out of 8 is a quarter.","Count all the gems."),
Q("A chance of zero means...",["Impossible","Certain","Even chance"],0,"Zero means it cannot happen.","The smallest chance."),
Q("A chance of 0.2 is...",["2%","20%","200%"],1,"0.2 × 100 = 20%.","Times by 100."),
Q("Chance of a 6 on a fair six-sided die?",["1/3","1/2","1/6"],2,"One 6 out of six faces.","How many faces?")]);
T["6.maths.patterns"]=L("🌱","Growing block towers","Identify patterns and explain their rules.",
"A pattern can grow by the same amount each time. Or it can follow a rule. Find the change each step. Then test your rule.",
"A tower grows 3, 7, 11, 15. Each step adds 4 blocks.",
"Build towers with blocks that grow by a rule. Ask someone to guess it.",[
Q("What comes after 5, 9, 13, 17?",["20","21","24"],1,"The rule adds four each time.","Find the gap between numbers."),
Q("Which rule matches 2, 6, 10, 14?",["Multiply by 4","Add 2 each step","Add 4 each step"],2,"Each number is four more than the last.","Find the gap between numbers."),
Q("What comes after 1/2, 1, 1 1/2, 2?",["2 1/2","3","2 1/4"],0,"Each step adds one half.","Find the gap between numbers."),
Q("A dinosaur herd triples: 2, 6, 18, ... What is next?",["24","36","54"],2,"18 × 3 = 54.","Times by 3."),
Q("Which rule makes 4, 7, 10, 13?",["Start at 4 and multiply by 3","Start at 4 and add 3","Start at 4 and take away 3"],1,"Each step goes up by three.","Find the gap between numbers.")]);
T["6.maths.timetable"]=L("🚂","Mine cart timetable","Interpret departure times and calculate durations.",
"A timetable shows when trips start and end. To find how long a trip takes, count to the next hour. Then add the minutes left.",
"A mine cart leaves at 14:25 and arrives at 15:10. 35 minutes to 15:00, then 10 more. That is 45 minutes.",
"Plan a pretend train trip. Write leave times, travel times and wait times.",[
Q("09:40 to 10:15 takes...",["25 minutes","35 minutes","75 minutes"],1,"20 minutes to 10:00, then 15 more.","Count to the hour first."),
Q("16:30 in 12-hour time is...",["6:30 pm","4:30 am","4:30 pm"],2,"After noon, take 12 from the hour.","16 - 12 = ?"),
Q("The cart leaves at 11:55 and travels 50 minutes. It arrives at...",["12:45 pm","12:05 pm","1:05 pm"],0,"5 minutes to noon, then 45 more.","Count to noon first."),
Q("You reach the station at 14:10. The cart leaves at 14:25. How long do you wait?",["25 minutes","15 minutes","35 minutes"],1,"14:25 minus 14:10 is 15 minutes.","Same hour, so just minutes."),
Q("Two trips take 35 and 50 minutes. Together that is...",["1 hour 15 minutes","2 hours","1 hour 25 minutes"],2,"35 + 50 = 85 minutes, which is 1 hour 25 minutes.","60 minutes is 1 hour.")]);
T["6.maths.area"]=L("🟩","Floor space builder","Calculate areas of rectangles.",
"Area is how much flat space a shape covers. For a rectangle, area = length × width. We measure it in square units.",
"A dinosaur pen is 6 m by 4 m. 6 × 4 = 24. Its area is 24 square metres.",
"Measure a table or mat. Multiply length by width to find its area.",[
Q("A base floor is 6 m × 4 m. What is its area?",["20 m²","24 m²","10 m²"],1,"6 × 4 = 24 square metres.","Multiply length by width."),
Q("A 5 cm × 3 cm card has area...",["8 cm²","16 cm²","15 cm²"],2,"5 × 3 = 15.","Multiply length by width."),
Q("A 7 m × 2 m floor has area...",["14 m²","9 m²","18 m²"],0,"7 × 2 = 14.","Multiply length by width."),
Q("A rectangle has area 30 cm² and width 5 cm. Its length is...",["25 cm","6 cm","150 cm"],1,"30 ÷ 5 = 6.","What times 5 makes 30?"),
Q("Which unit measures area?",["km/h","litres","m²"],2,"Area uses square units.","Look for the little 2.")]);
T["6.maths.statistics"]=L("📊","Dino data compare","Compare sets of numerical data using range and mode.",
"The mode is the value that shows up most. The range is the biggest value take away the smallest. These help you compare two sets of data.",
"Dino eggs found: 2, 4, 4, 7. The mode is 4. The range is 7 - 2 = 5.",
"Count your steps or play minutes each day for a week. Make a dot plot.",[
Q("What is the mode of 2, 3, 3, 5, 8?",["8","3","5"],1,"3 shows up twice, more than the others.","Which number repeats?"),
Q("Range of 4, 6, 9, 12?",["12","4","8"],2,"12 - 4 = 8.","Biggest take away smallest."),
Q("Which herd has the wider range: A = 1, 5, 9; B = 3, 4, 5?",["Herd A","Herd B","They are equal"],0,"A has range 8 and B has range 2.","Find each range."),
Q("In 7, 7, 8, 8, 9, which is true?",["9 is the only mode","7 and 8 are both modes","There is one mode, 8"],1,"7 and 8 both show up twice.","Count each number."),
Q("Why compare two data sets?",["To prove all numbers are the same","To skip looking at results","To notice differences in patterns and spread"],2,"Comparing shows how the sets are different.","What can you learn?")]);
T["6.english.objective"]=L("📰","Fact, opinion and bias","Find objective statements, opinions and bias.",
"Objective statements can be checked with evidence. Opinions are what someone thinks or feels. Biased writing favours one side. It may leave out other views.",
"'The museum has three dinosaur skeletons' can be checked. 'Our museum is the best' is an opinion.",
"Find two short articles about one topic. Underline words that show feelings.",[
Q("Which statement is objective?",["This is the best museum!","The museum closes at 5 pm.","Everyone loves fossils."],1,"A closing time can be checked.","Can you check it?"),
Q("Which phrase shows bias?",["The survey had 80 people.","The meeting lasted an hour.","Only a fool would disagree."],2,"Insulting people who disagree shows bias.","Is one side being unfair?"),
Q("'This block game is boring' is...",["An opinion","A measurement","A timetable"],0,"'Boring' is what someone thinks.","Can you check it?"),
Q("Which question helps find bias?",["Is the title colourful?","Whose views are missing?","How long is the headline?"],1,"Looking for missing views helps find bias.","Think about who is left out."),
Q("'Nine in ten kids liked the snack' needs...",["More exclamation marks","An opinion with no data","Evidence from a good survey"],2,"Number claims need a trusted source.","How would you know it is true?")]);
T["6.english.persuade"]=L("📣","Claims and arguments","Analyse how writers persuade their audience.",
"Persuasive writing uses claims, reasons, evidence and strong words. Ask if the evidence backs up the claim. Ask if other views are treated fairly.",
"'Build a dinosaur garden at school' is the claim. 'Plants help cool the playground' is a reason.",
"Write one claim about your room or yard. Add two reasons.",[
Q("Which is a persuasive claim?",["There are four trees outside.","Our school should plant more trees.","The playground has a gate."],1,"'Should' asks for an action.","Look for 'should'."),
Q("What is good evidence for a health claim?",["A joke about something else","The size of the poster","Results of a reliable study"],2,"Evidence must fit the claim.","Which one is proof?"),
Q("What is a counterargument?",["Another view treated fairly","A spelling mistake","A repeated sentence"],0,"It looks at the other side.","Think 'counter' means against."),
Q("Which phrase uses loaded language?",["A decision on Tuesday","A disastrous decision","A decision after lunch"],1,"'Disastrous' makes a strong feeling.","Which word has big feelings?"),
Q("What should a persuasive ending do?",["Add a new topic","Remove the evidence","Repeat the request and main reasons"],2,"An ending links the request and reasons.","Wrap it up.")]);
T["6.english.structures"]=L("🧱","Text blueprints","Recognise how structures match the purpose of texts.",
"Different texts are built in different ways. Instructions use steps. Explanations show causes and effects. Reports group facts under headings.",
"A crafting recipe lists the materials first. Then it gives the steps in order.",
"Look at a recipe and a report. Compare how each one is set out.",[
Q("A recipe is best set out as...",["Random sentences","Ingredients then ordered steps","A diary entry"],1,"Readers need clear steps in order.","What does the reader need to do?"),
Q("An explanation of floods should show...",["A shopping list","Only talking","Causes and effects"],2,"Explanations show how and why things happen.","Think how and why."),
Q("Why use subheadings in a report?",["To group related facts","To hide facts","To stop reading"],0,"Subheadings sort information.","How do headings help?"),
Q("A comparison text should explain...",["Only a story ending","Ways things are the same and different","A list of ingredients"],1,"Comparisons show what is alike and different.","Think 'compare'."),
Q("What does a conclusion often do?",["Add facts that do not fit","Remove the main idea","Bring the main points together"],2,"A conclusion wraps up the ideas.","Think about endings.")]);
T["6.english.cohesion"]=L("🔗","Link the blocks","Link ideas clearly across sentences and paragraphs.",
"Cohesion means sentences fit together like blocks. Words like 'it' and 'these' point back to ideas. Linking words help readers follow along.",
"'The fossil bed is old. This site needs care.' 'This site' points back to the fossil bed.",
"Write three sentences about a dinosaur. Link them with 'it', 'this' or 'also'.",[
Q("'The dinosaur stomped away. It was sleepy.' What is 'It'?",["The ground","The dinosaur","The narrator"],1,"'It' points back to the dinosaur.","What does 'it' point back to?"),
Q("Which linking word shows a contrast?",["Similarly","For example","However"],2,"'However' brings in a different idea.","Which word means 'but'?"),
Q("What fits after 'Birds nest in this forest'?",["These animals need safe nesting sites.","My bike is blue.","Yesterday I ate pasta."],0,"'These animals' points back to the birds.","Which one stays on topic?"),
Q("Why repeat a topic word in a report?",["To make every sentence the same","To keep the main idea clear","To stop explaining"],1,"Careful repeats link ideas together.","Think about the main idea."),
Q("Which phrase shows a result?",["In contrast","Beforehand","As a result"],2,"'As a result' shows what happened next.","Look for the outcome.")]);
T["6.english.complex"]=L("🦖","Complex sentence builders","Understand dependent and embedded clauses.",
"A main clause can stand alone. A dependent clause adds extra detail. It cannot usually stand alone. A complex sentence joins the two. Think of a main block with an add-on block.",
"'Although the cave was dark, the miner kept digging.' The opening clause cannot stand alone. 'The miner kept digging' is the main clause.",
"Say three sentences about your day using 'because', 'although' and 'which'.",[
Q("Which uses a dependent clause?",["The T. rex roared.","Because it rained, the dinosaurs stayed in the cave.","Birds sang."],1,"'Because it rained' relies on the main clause.","Find the main idea, then the extra detail."),
Q("Which adds information about a tower?",["the tall tower","a high block build","which stood on the cliff"],2,"A 'which' clause adds extra detail.","Find the main idea, then the extra detail."),
Q("Complete 'Although the path was steep, ...'",["we reached the top.","because the path.","while climbing"],0,"The main clause finishes the thought.","Find the main idea, then the extra detail."),
Q("What word often starts a reason clause?",["Or","Because","And"],1,"'Because' explains why something happened.","Which word answers 'why'?"),
Q("'When the sun rose, the herd woke up.' The dependent clause is...",["the herd woke up","the herd","When the sun rose"],2,"The opening clause tells when.","Find the main idea, then the extra detail.")]);
T["6.english.imagery"]=L("🦕","Metaphors and meaning","Identify figurative language and its effect.",
"A simile compares using 'like' or 'as'. A metaphor says one thing is another. Personification gives human actions to things. Hyperbole is a big exaggeration.",
"'The volcano was a giant chimney.' It says the volcano is a chimney. So it is a metaphor.",
"Describe a rainstorm out loud. Use one simile and one personification.",[
Q("Which is a simile?",["The lake was a mirror.","The lake glittered like glass.","The lake whispered."],1,"'Like' makes a comparison.","Look for 'like' or 'as'."),
Q("Which shows personification?",["The wind blew.","The wind measured 20 km/h.","The wind whispered through the ferns."],2,"Whispering is a human action.","Can wind really do that?"),
Q("Which is a metaphor?",["The block world was a beehive.","The block world was like a beehive.","A bee flew into the block world."],0,"A metaphor calls one thing another.","No 'like' or 'as'."),
Q("Which is hyperbole?",["I dug two tunnels.","I've dug a million tunnels!","I dug after lunch."],1,"'A million' is an exaggeration.","Which one is too big to be true?"),
Q("Why use vivid imagery?",["To prove all facts","To remove the setting","To help readers imagine a scene"],2,"Vivid details help you picture it.","Think about the reader's mind.")]);
T["6.english.infer"]=L("🔍","Clues and inferences","Use text evidence to infer and compare meaning.",
"An inference uses clues plus what you already know. Good inferences point to details in the text. They are not just guesses.",
"'Max grabbed a torch before entering the cave.' Clue: a torch. Inference: Max expects it to be dark.",
"Pick a short story. Find three clues that support one inference.",[
Q("'Mina packed an umbrella as clouds gathered.' She expects...",["Snow indoors","Rain","Hot sand"],1,"An umbrella and clouds suggest rain.","Point to the clues."),
Q("'The cave door creaked. Ari held their breath.' Ari feels...",["Nervous","Hungry","Bored"],0,"Holding your breath after a creak shows tension.","Point to the clues."),
Q("What suggests the dino trail was muddy?",["The sun set.","The map was folded.","Boots sank into wet ground."],2,"Wet, soft ground supports the inference.","Point to the clues."),
Q("Two reports disagree about a flood. What should you do?",["Believe the loudest headline","Compare reliable sources and evidence","Ignore the details"],1,"Checking evidence helps you understand.","Which choice uses evidence?"),
Q("Why say 'The text suggests...'?",["To prove every guess correct","To avoid reading","To link an inference to evidence"],2,"It connects your idea to the text.","Think about clues.")]);
T["6.english.styles"]=L("📚","Stories and author choices","Compare how stories handle themes and style.",
"A theme is a big idea in a story. Two stories can share a theme. They may use different characters, settings and moods. Compare details from both.",
"Courage could appear in a dinosaur rescue. It could also appear in a hard apology. Same theme, different stories.",
"Pick two books about friendship. Say how the characters act in each.",[
Q("A theme is...",["Only its cover colour","An important idea in a text","The number of paragraphs"],1,"Themes include courage and friendship.","Think big idea."),
Q("Two stories show friendship. What could you compare?",["How each character shows loyalty","Which book is heavier","The titles' letter counts"],0,"You can compare how writers show the theme.","Name one same and one different."),
Q("What shows an author's style?",["Paper thickness","Book price","Word choice and sentence rhythm"],2,"Authors make recognisable language choices.","Think about the words."),
Q("Which creates suspense?",["There were three sandwiches.","Footsteps echoed in the empty mine tunnel.","A poster was on the wall."],1,"An empty, echoing tunnel feels tense.","Which one makes you wonder what's next?"),
Q("Why compare stories on one topic?",["To prove only one is right","To ignore the texts","To see different views and techniques"],2,"Different writers make different choices.","Name one same and one different.")]);
T["6.english.commas"]=L("✍️","Punctuation and clarity","Use commas in complex sentences, lists and dialogue.",
"Commas help readers. Put one after an opening dependent clause. Use them to split items in a list. Use one before speech.",
"'After the rain stopped, the dinosaurs went outside.' The opening clause ends at 'stopped'. So the comma goes there.",
"Write five short sentences. Add the commas in a different colour.",[
Q("Which is punctuated correctly?",["Before we left, we packed lunch.","Before, we left we packed lunch.","Before we left we, packed lunch."],0,"The comma follows the opening clause.","Find where the opening clause ends."),
Q("Which list is correctly punctuated?",["We mined, coal iron and gold.","We, mined coal iron.","We mined coal, iron and gold."],2,"Commas separate the items.","Look for the list."),
Q("'Although it was late we kept building.' Where is the comma?",["After 'we'","After 'late'","After 'building'"],1,"The opening clause ends after 'late'.","Find where the opening clause ends."),
Q("Which dialogue is punctuated clearly?",["Sam said 'Lets go'.","Sam, said Lets go.","Sam said, 'Let's go.'"],2,"A comma can introduce speech.","Look before the speech marks."),
Q("'If you agree, raise your hand.' Why is the comma there?",["To separate the condition from the main clause","To mark a question","To replace a full stop"],0,"The comma ends the opening 'if' clause.","Look at the opening part.")]);
T["6.english.roots"]=L("🧱","Spelling from word parts","Decode and spell unfamiliar words using roots and affixes.",
"Long words are built from parts, like blocks. A prefix goes at the start. A suffix goes at the end. Knowing the parts helps you read and spell.",
"'Rebuild' is 're-' plus 'build'. 'Re-' means again. So rebuild means build again.",
"Build a word family from 'act' or 'port'. Write each word on paper.",[
Q("Which prefix means 'before'?",["un-","pre-","dis-"],1,"Pre- often means before.","Think of 'preview'."),
Q("Which word is spelled correctly?",["neccessary","necesary","necessary"],2,"Necessary has one c and two s.","Count the c's and s's."),
Q("In 'rewrite', 're-' means...",["Again","Against","Without"],0,"Rewrite means write again.","Think of 'rebuild'."),
Q("Which suffix turns 'create' into a noun?",["-ly","-ion","-est"],1,"Creation is a noun.","Which ending makes a thing?"),
Q("Which prefix means 'not' in 'impossible'?",["pre-","re-","im-"],2,"Im- makes it mean not possible.","Break the word into parts.")]);
T["6.english.editing"]=L("📝","Write for your reader","Plan and edit texts for purpose and audience.",
"Good writing suits its readers. First plan your paragraphs. Then edit your words and sentences. Check spelling and punctuation last.",
"A letter to council uses polite, clear reasons. A dino story uses description and imagination.",
"Write a short plan to improve a playground. Then reread and fix it.",[
Q("What should you decide before writing?",["Only the font colour","Audience and purpose","The fastest typing speed"],1,"Audience and purpose guide your choices.","Who will read it?"),
Q("What helps organise a long explanation?",["Paragraphs with connected ideas","One long sentence","Unrelated headings"],0,"Paragraphs group ideas.","Think about building in sections."),
Q("Which fits a respectful letter to a council?",["You never do anything right!","Do it now!","I would like to suggest..."],2,"A polite request suits the reader.","Which sounds kind and clear?"),
Q("Which edit adds precise description?",["The raptor did a thing.","The raptor darted across the path.","It was stuff."],1,"'Darted' is a precise verb.","Which verb paints a picture?"),
Q("Why reread a draft?",["To guarantee instant perfection","To avoid the reader","To improve clarity and find errors"],2,"Revising makes writing stronger.","What can you find on a second look?")]);
T["6.science.habitats"]=L("🌿","Habitats and change","Explain how habitat conditions affect survival.",
"Living things need the right conditions. These include water, temperature and sunlight. If conditions change, living things may struggle to grow.",
"In a drought, a swamp dries up. Frogs and water plants get less water. Fewer may survive there.",
"Look at a spot outside on two days. Write down what changed.",[
Q("Which is a habitat's physical condition?",["A favourite story","Water availability","The colour of a notebook"],1,"Water affects living things.","Think water, light, heat."),
Q("A long drought may cause swamp plants to...",["Always grow faster","Turn into animals","Have less water"],2,"Less water may slow growth.","What does drought take away?"),
Q("Removing shade trees can affect plants through...",["More direct sunlight","A different street name","A shorter map"],0,"Shade changes the light plants get.","What do trees block?"),
Q("Why observe over several days?",["To make all observations the same","To find patterns and changes","To avoid evidence"],1,"Repeated checks show patterns.","One day or many?"),
Q("Which is a supported conclusion?",["Every frog dislikes rain.","Water never affects animals.","Fewer frogs were seen after the pond dried up."],2,"The observation and the change are linked.","Which one has evidence?")]);
T["6.science.solar"]=L("🪐","Earth, Sun and seasons","Distinguish rotation, revolution and axial tilt.",
"Earth spins once a day. This makes day and night. Earth orbits the Sun once a year. Its tilt causes the seasons.",
"In December, the south tilts towards the Sun. So Australia gets longer days. That is summer.",
"Use a ball and a safe lamp. Spin the ball to show day and night.",[
Q("What causes day and night?",["The Sun circling Earth each day","Earth spinning on its axis","Cloud shadows"],1,"Spinning changes which side faces the Sun.","Daily means spinning."),
Q("What mainly explains the seasons?",["Earth's tilt as it orbits","The Moon's shape","Cloud colour"],0,"Tilt changes sunlight and day length.","Think about the lean."),
Q("One orbit of the Sun takes about...",["One day","One month","One year"],2,"Earth orbits in about 365 days.","Yearly means orbit."),
Q("Why are summer days longer?",["Earth stops spinning.","Your half of Earth tilts toward the Sun.","The Moon makes extra daylight."],1,"Tilt keeps the Sun up longer.","Think about the tilt."),
Q("Which is an Australian summer month?",["July","August","January"],2,"January is summer in the south.","Think of Christmas holidays.")]);
T["6.science.circuits"]=L("🔌","Circuit builders","Explain electrical energy transfer and circuit components.",
"A circuit needs a power source and a full loop. A closed loop can power a device. Conductors let electricity flow. Insulators block it.",
"A torch has a battery and a closed loop. Energy flows to the bulb. It turns into light.",
"Draw a circuit with a battery, LED and switch. Ask an adult to check it. Never use mains power.",[
Q("An open switch makes the circuit...",["Create energy without a source","Stop flowing at the break","Always brighter"],1,"A break in the loop stops current.","Is the loop complete?"),
Q("Which material conducts well?",["Dry plastic","Rubber band","Copper wire"],2,"Copper is used in wires.","Think metal."),
Q("An LED changes electrical energy mainly into...",["Light","Food","Gravity"],0,"An LED gives off light.","What does it do when on?"),
Q("What insulates wires?",["Bare copper","Plastic coating","A metal key"],1,"Plastic blocks current.","Which one is not metal?"),
Q("What is safe for exploring circuits?",["Opening a wall socket","Connecting wires to mains power","A low-voltage kit with an adult"],2,"Small supervised kits avoid mains power.","Which keeps you safe?")]);
T["6.science.changes"]=L("🧪","Changes to materials","Distinguish reversible and irreversible changes.",
"Some changes can be undone. Ice can melt and freeze again. Other changes make a new material. Cooking and rusting cannot easily be undone.",
"Ice melts into water. Freeze it, and it is ice again. A cooked egg cannot go back to raw.",
"With an adult, melt an ice cube. Then freeze the water again.",[
Q("Which is reversible?",["Iron rusting","Ice melting then refreezing","Bread toasting"],1,"Melting and freezing can be undone.","Can you get it back?"),
Q("Which is usually irreversible?",["Freezing water","Melting an ice cube","Cooking an egg"],2,"Cooking makes lasting changes.","Can you get it back?"),
Q("Sugar dissolved in water can be recovered by...",["Evaporating the water safely","Turning it into metal","Naming it differently"],0,"Sugar crystals stay when water dries up.","Where does the water go?"),
Q("Rust forms when iron has...",["Only freezing","No change","A chemical reaction"],2,"Rust is a new substance.","Is something new made?"),
Q("What suggests a chemical change?",["Only folding paper","A new substance forms","Moving a cup"],1,"New materials mean a chemical change.","Is something new made?")]);
T["6.hass.federation"]=L("🏛️","Australia becomes a nation","Understand Federation and its consequences.",
"In 1901, six British colonies joined together. They formed the Commonwealth of Australia. This changed how government worked. But not everyone got equal rights.",
"Federation made a national government. The states kept some of their own powers.",
"Make a paper timeline. Start at 1901 and add later rights milestones.",[
Q("Federation began in...",["1788","1901","1967"],1,"Australia federated on 1 January 1901.","Start of the 1900s."),
Q("How many colonies federated?",["Three","Nine","Six"],2,"Six colonies became the first states.","Count the states."),
Q("Federation created...",["A national government","Australia's first people","Instant equality for everyone"],0,"A national government began, but unfairness stayed.","Think about government."),
Q("What is a fair history question?",["Did everyone have the same experience?","Whose rights changed and who was left out?","Can we ignore First Nations histories?"],1,"History looks at unequal impacts.","Whose voices were left out?"),
Q("What makes a claim about Federation stronger?",["One unsupported statement","A random number","Comparing reliable sources"],2,"Sources give evidence.","Think evidence.")]);
T["6.hass.migration"]=L("🧳","Migration stories","Investigate causes and impacts of migration.",
"People move countries for family, work, study or safety. Laws and history shape who moves. Every migrant has their own story. Migrants help change communities.",
"Some families move for jobs. Others move to find safety.",
"With an adult, find a shared migration story. Talk about why they moved.",[
Q("Which is a reason people may migrate?",["A change in the alphabet","Family reunion","A longer month"],1,"Being with family is a reason to move.","Why might people move?"),
Q("Why compare migration stories?",["Every migrant has the same story","One voice speaks for all","People's experiences differ"],2,"Migration happens for many reasons.","Are all stories the same?"),
Q("A government law about entering a country is...",["Migration policy","A weather report","A grammar rule"],0,"Policies shape who can move.","Who makes the rules?"),
Q("Which is a firsthand source?",["An invented rumour","A migrant's recorded interview","An unrelated cartoon"],1,"An interview records real experience.","Who was really there?"),
Q("How can migration change a community?",["Guarantee no change","Make all cultures the same","Bring new cultural connections"],2,"Migration adds languages and connections.","What do newcomers bring?")]);
T["6.hass.asia"]=L("🌏","Australia and the Asia-Pacific","Identify links between Australia and other places.",
"Countries connect through trade, travel, migration, school and culture. These links can help. They can also cause problems.",
"Food in an Australian shop may be grown in one country. It may be shipped from another.",
"Check labels on five things at home. Find where each was made on a map.",[
Q("Which is an international connection?",["A student entering a classroom","Turning a page","Australian students sharing ideas with students in Japan"],2,"School exchanges connect countries.","Look for two countries."),
Q("What is trade?",["Buying and selling goods and services","A type of cloud","A form of poetry"],0,"Trade moves products between places.","Think buying and selling."),
Q("Which region includes many of Australia's island neighbours?",["The Arctic","The Pacific","Northern Europe"],1,"Pacific countries are close neighbours.","Look near Australia."),
Q("Tourism can lead to...",["No local changes","Only bad effects","Income and pressure on nature"],2,"Tourism has benefits and costs.","Think good and bad."),
Q("Which evidence shows international connections?",["Migration and trade data","An unrelated joke","A shop sign colour"],0,"Movement of people and goods can be measured.","Look for data.")]);
T["6.hass.government"]=L("🗳️","Democracy and civic life","Explore democratic values and government responsibilities.",
"Australia is a representative democracy. Parliament makes laws. The government puts them into action. Courts decide what laws mean. Local, state and federal governments do different jobs.",
"Councils collect rubbish. States run public schools. The federal government manages immigration.",
"Draw three columns: local, state, federal. List jobs for each.",[
Q("Representative democracy means...",["Only one person decides laws","People elect representatives","Every voter makes every law"],1,"Citizens vote for representatives.","Who do we vote for?"),
Q("Local rubbish collection is usually run by...",["Only federal government","The United Nations","Local government"],2,"Councils handle local services.","Think close to home."),
Q("Immigration is mainly the job of...",["Federal government","A school principal","A local sports club"],0,"The federal government sets immigration law.","Which level covers the whole country?"),
Q("A court's main job includes...",["Running every school","Interpreting and applying law","Writing all laws alone"],1,"Courts decide legal cases.","What do judges do?"),
Q("Rule of law means...",["Leaders can ignore laws","Only children follow laws","Leaders and citizens must follow laws"],2,"Laws apply to everyone, even leaders.","Who must follow laws?")]);
T["6.hass.economics"]=L("💎","Smart choices and resources","Consider resources and responsible consumer decisions.",
"Resources are limited, like gems in a mine. People choose based on needs, price, ads and waste. Every choice has a trade-off.",
"A reusable bottle costs more at first. But you buy fewer plastic bottles later.",
"Compare two things at home. Think about price, use and waste.",[
Q("Which is usually a need?",["A collectable toy","Safe drinking water","A fancy logo"],1,"Water is essential for health.","What do you need to live?"),
Q("What should buyers compare?",["Price, use and how long it lasts","Only bright packaging","Only an ad slogan"],0,"Useful criteria help decisions.","What really matters?"),
Q("Advertising often aims to...",["Guarantee every claim is true","End all spending","Change what people buy"],2,"Ads try to persuade.","Why do ads exist?"),
Q("Why might being repairable matter?",["It means nothing breaks","It can cut waste and last longer","It makes things free"],1,"Repair keeps things useful longer.","Fix or throw away?"),
Q("A trade-off means...",["Having unlimited resources","All options are equal","Giving up one thing to gain another"],2,"Choices mean giving something up.","Think swapping.")]);
T["6.technologies.computer"]=L("💻","Inside a digital device","Identify major components of a digital system.",
"The processor follows instructions. Memory holds what you are using now. Storage keeps saved files. Touchscreens and microphones take input. Screens and speakers give output.",
"You tap a tablet to place a block. The processor handles it. The screen shows the new block.",
"Draw a tablet. Label the processor, memory, storage, input and output.",[
Q("A processor mainly...",["Stores paper books","Carries out instructions","Makes a case bigger"],1,"The processor runs instructions.","Match the part to its job."),
Q("What keeps saved worlds when a device turns off?",["Storage","Only working memory","The screen's glass"],0,"Storage keeps saved data.","Match the part to its job."),
Q("A touchscreen is...",["Only a battery","A network cable","An input and output surface"],2,"Touch is input; the display is output.","You touch it and see it."),
Q("RAM holds...",["Printed pages","Information being used now","An outside case"],1,"Working memory helps tasks running now.","Think right now."),
Q("A tablet battery...",["Stores all the internet","Replaces the processor","Supplies electrical energy"],2,"Batteries power the device.","Match the part to its job.")]);
T["6.technologies.binary"]=L("🔢","Zero and one machines","Represent data using binary states.",
"Binary uses only 0 and 1. Think of blocks that are off or on. Patterns of 0s and 1s show numbers, pictures and text. Four place values are 8, 4, 2 and 1.",
"101 in binary: a 4, no 2, and a 1. 4 + 0 + 1 = 5.",
"Draw four switches labelled 8, 4, 2, 1. Turn some on and add them.",[
Q("Binary uses which digits?",["2 and 3","A and B","0 and 1"],2,"Binary uses only two digits.","Off and on."),
Q("Binary 10 is what in decimal?",["10","2","1"],1,"1 in the twos place means 2.","Add the place values that are on."),
Q("Binary 101 equals...",["5","7","3"],0,"4 + 0 + 1 = 5.","Add the place values that are on."),
Q("An off switch can be shown by...",["2","0","9"],1,"Off is written as zero.","Off and on."),
Q("Binary 111 equals...",["3","11","7"],2,"4 + 2 + 1 = 7.","Add the place values that are on.")]);
T["6.technologies.code-loops"]=L("🛠️","Choices and loops","Design algorithms with decisions and repetition.",
"An algorithm is step-by-step instructions. An IF statement picks between actions. A loop repeats actions. A variable holds a value that can change.",
"IF it is night, place a torch. OTHERWISE keep mining.",
"Write rules for collecting three gems. Use a counter to track them.",[
Q("IF statements are used to...",["End every program","Choose based on a condition","Draw random pictures"],1,"IF makes a choice.","Look for a decision."),
Q("Which instruction repeats an action?",["Stop now","Write once","Repeat five times"],2,"A loop repeats actions.","Look for repeating."),
Q("Why use a loop to place six blocks?",["To avoid writing the same steps six times","To stop errors forever","To change screen size"],0,"Loops cut repeated steps.","Look for repeating."),
Q("A variable is...",["A sticker that never changes","A named value that can change","A tablet case"],1,"Variables keep track of values.","Think of a gem counter."),
Q("How do you test an algorithm?",["Assume it always works","Delete the instructions","Try different inputs and check results"],2,"Tests show problems.","How would you check it?")]);
T["6.technologies.footprint"]=L("🔒","Privacy and online choices","Understand digital footprints and personal privacy.",
"Online actions can leave records. Think before sharing personal details. Use a different passphrase for each account. Ask before sharing someone's photo.",
"Your home address is private. A long, unique passphrase keeps an account safe.",
"Ask a trusted adult what data an app asks for, and why.",[
Q("A digital footprint is...",["A dinosaur track in mud","Information left by online activity","A mouse pointer"],1,"Online actions create records.","Who could see it later?"),
Q("Why use a different passphrase for each account?",["So passwords can be public","To stop updates","A leak on one account won't open the others"],2,"Reusing passwords raises the risk.","What if one gets out?"),
Q("What should not be posted publicly?",["Your home address","A story about a dinosaur","A picture of a block island"],0,"A home address is private.","Who could see it?"),
Q("Before sharing someone's photo, you should...",["Post it straight away","Ask permission, and an adult if needed","Send it to strangers"],1,"Consent and privacy matter.","Think about their feelings."),
Q("What is safest to assume about online posts?",["Deleted posts can never be copied","No one can take screenshots","Copies may stay after you delete"],2,"Digital information can last.","Who could save it?")]);
window.PEBBLE_THEMES=window.PEBBLE_THEMES||{};
window.PEBBLE_THEMES[1]=Object.assign(window.PEBBLE_THEMES[1]||{},T);
})();
