(function(){
const Q=(prompt,choices,correct,explain,hint)=>({prompt,choices,correct,explain,hint});
const L=(icon,title,goal,teach,example,tryIt,questions)=>({icon,title,goal,teach,example,tryIt,questions});
const T={};
T["0.maths.numbers"]=L("🦄","Unicorn counting","Count and order numbers from 0 to 20.",
"Numbers tell us how many. Touch each unicorn once. Say one number for each. The last number is how many.",
"Count four unicorns: 1, 2, 3, 4. There are four unicorns.",
"Count five toys at home. Then add one more and count again.",[
Q("What number comes after 7?",["6","8","10"],1,"One more than 7 is 8.","Say the numbers in order."),
Q("Which number comes between 11 and 13?",["10","14","12"],2,"12 sits between 11 and 13.","Count 11, then what?"),
Q("How many unicorns? 🦄 🦄 🦄 🦄",["4","3","5"],0,"Each of the four unicorns gets one count.","Touch each one as you count.")]);
T["0.maths.compare"]=L("🧚","More fairies or fewer?","Compare groups using counting.",
"Count both groups. The bigger number has more. The smaller number has fewer. Same number means equal.",
"Three fairies are fewer than five fairies.",
"Put two groups of toys side by side. Which group has more?",[
Q("Which group has more: 6 fairies or 4 fairies?",["4 fairies","6 fairies","They are equal"],1,"Six is more than four.","Count both groups."),
Q("Which group has fewer: 2 dragons or 5 dragons?",["2 dragons","5 dragons","They are equal"],0,"Two is smaller than five.","Which number is smaller?"),
Q("4 crowns and 4 wands. There are...",["More crowns","More wands","Equal amounts"],2,"Four is the same as four.","Count both groups.")]);
T["0.maths.parts"]=L("💎","Gems make a whole","Split a number into two parts.",
"Two small groups can make one big group. Each small group is a part. Together they make the whole.",
"Three pink gems and two blue gems make five gems.",
"Make 6 with blocks of two colours.",[
Q("2 gems and 3 gems make how many?",["4","5","6"],1,"Two and three make five.","Put the groups together."),
Q("One way to make 6 is 4 and...",["2","3","1"],0,"Four and two make six.","Count on from 4 to 6."),
Q("5 is 2 and what other part?",["4","2","3"],2,"Two and three make five.","Count on from 2 to 5.")]);
T["0.maths.patterns"]=L("🌈","Rainbow patterns","Recognise and continue repeating patterns.",
"A pattern repeats. Find the part that comes again. Then say what comes next.",
"Pink, purple, pink, purple. Next is pink.",
"Make a pattern with socks or blocks.",[
Q("What is next? 🔴 🔵 🔴 🔵 ...",["🔵","🔴","🟢"],1,"Red and blue take turns, so red is next.","Find the part that repeats."),
Q("Finish it: star, moon, star, moon, ...",["moon","sun","star"],2,"Star and moon repeat, so star is next.","Say it out loud."),
Q("What comes next? 1, 2, 1, 2, ...",["1","3","2"],0,"1 and 2 take turns.","Find the part that repeats.")]);
T["0.english.rhyming"]=L("🎀","Fairy rhyme time","Hear sounds that match at the ends of words.",
"Rhyming words end with the same sound. Cat rhymes with hat. The starts are different. The ends match.",
"Say cat and hat. Both end in -at.",
"Say three words that rhyme with sun.",[
Q("Which word rhymes with cat?",["dog","hat","cup"],1,"Cat and hat both end in -at.","Listen to the end."),
Q("Which word rhymes with tree?",["tap","fish","bee"],2,"Tree and bee both end in ee.","Listen to the end."),
Q("Which word rhymes with sun?",["fun","sit","map"],0,"Sun and fun both end in -un.","Listen to the end.")]);
T["0.english.sounds"]=L("🪄","Magic first sounds","Hear the first sound in a simple word.",
"Words are made of sounds. Say a word slowly. Listen to the very first sound.",
"Say sun slowly. The first sound is /s/.",
"Think of a word that starts like moon.",[
Q("What is the first sound in map?",["/p/","/m/","/t/"],1,"Map starts with /m/.","Say it slowly."),
Q("Which word starts with /s/?",["dog","pen","sun"],2,"Sun starts with /s/.","Listen to the start."),
Q("Which two words start the same?",["moon and mouse","sun and cat","hat and dog"],0,"Moon and mouse both start with /m/.","Say each pair slowly.")]);
T["0.english.blend"]=L("✨","Sparkle blending","Put sounds together to say words.",
"Say each sound. Then push the sounds close together. They make a word.",
"Say /c/ /a/ /t/ faster and faster: cat.",
"Ask someone to say /s/ /u/ /n/. You blend it.",[
Q("Blend /m/ /a/ /p/. Which word?",["mop","man","map"],2,"/m/ /a/ /p/ makes map.","Say the sounds faster."),
Q("Blend /s/ /u/ /n/. Which word?",["sun","sit","sonic"],0,"Those three sounds make sun.","Say the sounds faster."),
Q("Blend /p/ /e/ /n/. Which word?",["pan","pen","pin"],1,"The middle /e/ makes pen.","Listen to the middle sound.")]);
T["0.english.story"]=L("👑","Princess story clues","Recognise characters, settings and events.",
"A character is who is in the story. The setting is where it happens. An event is what happens.",
"The unicorn flew over the castle. The unicorn is the character. The castle is the setting.",
"Tell a tiny story with a character, a place and something that happens.",[
Q("'Ava found a crown in the garden.' Who is the character?",["The garden","Ava","The sky"],1,"Ava is the person in the story.","Who is it about?"),
Q("'A fairy flew over the lake.' Where is the setting?",["In a shop","On the Moon","At the lake"],2,"The lake tells us where.","Where does it happen?"),
Q("Which is the event in 'Ben opened the box'?",["Ben opened the box","Ben is a boy","A box is a thing"],0,"An event is something that happens.","What happened?")]);
T["1.maths.numbers"]=L("🏰","Castle counting to 120","Recognise and order larger numbers.",
"Counting keeps going past 20. A number line shows the order. Each number is one more than the last.",
"After 49 comes 50. After 99 comes 100.",
"Count from 36 up to 45 out loud.",[
Q("Which comes after 59?",["58","69","60"],2,"One more than 59 is 60.","Count up one."),
Q("Which is greatest: 73, 37 or 70?",["73","37","70"],0,"73 is more than 70 and 37.","Look at the tens first."),
Q("Which number is just before 100?",["101","99","90"],1,"99 comes just before 100.","Count back one.")]);
T["1.maths.tens"]=L("💎","Gem bags","Understand two-digit place value.",
"Ten gems fit in one bag. A bag is one ten. Loose gems are ones. The left digit shows the bags.",
"34 is 3 bags and 4 loose gems. That is 30 and 4.",
"Make 2 tens and 5 ones with small things at home.",[
Q("4 bags of ten and 2 gems. What number?",["24","42","402"],1,"Four tens is 40, plus 2 is 42.","Bags go on the left."),
Q("How many bags of ten in 56?",["5","6","56"],0,"The 5 in 56 means five tens.","Look at the left digit."),
Q("Which split makes 73?",["7 + 3","30 + 7","70 + 3"],2,"Seven tens and three ones make 73.","Seven bags is 70.")]);
T["1.maths.adding"]=L("🧚","Fairy add and take away","Solve addition and subtraction up to 20.",
"Adding puts groups together. Taking away makes a group smaller. Count on to add. Count back to take away.",
"9 + 3 is 12. Start at 9. Count 10, 11, 12.",
"Make 10 with beads. Then take 4 away.",[
Q("What is 8 + 5?",["12","13","14"],1,"Eight plus five is thirteen.","Start at 8 and count on 5."),
Q("What is 16 - 6?",["11","9","10"],2,"Sixteen take away six is ten.","Take away the 6 ones."),
Q("You have 7 stickers and get 4 more. How many?",["11","10","12"],0,"Seven plus four is eleven.","Start at 7 and count on 4.")]);
T["1.maths.skip"]=L("🦄","Unicorn hops","Count in twos, fives and tens.",
"A unicorn hops the same size each time. That is skip counting. It helps count groups fast.",
"2, 4, 6, 8 hops by twos.",
"Count 5, 10, 15, 20 on your fingers.",[
Q("What is next? 2, 4, 6, 8, ...",["9","10","12"],1,"8 plus 2 is 10.","How big is each hop?"),
Q("Hop by fives: 5, 10, 15, ...",["16","25","20"],2,"15 plus 5 is 20.","Each hop is 5."),
Q("Hop by tens: 30, 40, 50, ...",["60","55","70"],0,"50 plus 10 is 60.","Each hop is 10.")]);
T["1.english.digraphs"]=L("✨","Two letters, one magic sound","Read common consonant digraphs.",
"Some letter pairs make one sound. Sh, ch and th are pairs like this.",
"Shine starts with sh. Chair starts with ch.",
"Find three things at home with sh, ch or th.",[
Q("Which word starts with /sh/?",["cat","ship","thin"],1,"The sh in ship says /sh/.","Listen to the first sound."),
Q("Which word starts with /ch/?",["fish","sun","chair"],2,"Chair starts with /ch/.","Listen to the first sound."),
Q("Which word has the letters th?",["thin","ship","chat"],0,"Thin starts with th.","Look at the first two letters.")]);
T["1.english.sentence"]=L("📜","Royal sentences","Use capital letters and ending punctuation.",
"A sentence starts with a capital letter. It ends with a full stop, question mark or exclamation mark.",
"'Where is my crown?' asks something. So it ends with a question mark.",
"Write one question and one telling sentence about a pet.",[
Q("Which sentence is written correctly?",["the fairy sleeps","The fairy sleeps.","The fairy sleeps"],1,"It has a capital and a full stop.","Check the start and the end."),
Q("Which mark ends a question?",["!",";","?"],2,"A question mark shows it asks.","Which one looks like a hook?"),
Q("Which sentence asks something?",["Where are we going?","We are going home.","The birds sing."],0,"It asks for an answer.","Look for the question mark.")]);
T["1.english.retell"]=L("📖","Fairy tale order","Retell a simple story in order.",
"Stories have a beginning, a middle and an end. The beginning starts things. The end tells how it works out.",
"'Jo lost her wand, looked for it, then found it.' That is beginning, middle and end.",
"Tell a short story in three sentences.",[
Q("Which comes first?",["A flower blooms","Mia plants a seed","Mia picks a flower"],1,"Planting the seed starts it all.","What must happen first?"),
Q("'The pony ran off, Sam looked, Sam found the pony.' What happens last?",["The pony runs off","Sam starts looking","Sam finds the pony"],2,"The end tells how it worked out.","What happens at the end?"),
Q("Which is a story character?",["A brave rabbit","Under a bridge","Yesterday"],0,"The rabbit is someone in the story.","Who could be in a story?")]);
T["1.english.nouns"]=L("🦋","Naming and doing words","Spot naming words and action words.",
"Nouns name people, places, animals and things. Verbs are doing words.",
"'The fairy flies.' Fairy is a noun. Flies is a verb.",
"Pick three toys. Say what each one can do.",[
Q("Which word is a noun?",["jump","castle","quickly"],1,"Castle names a thing.","Which one can you point to?"),
Q("Which word is a verb?",["table","blue","dance"],2,"Dance is a doing word.","Which one can you do?"),
Q("'The unicorn runs.' Which word is the action?",["runs","unicorn","the"],0,"Runs is the doing word.","What does the unicorn do?")]);
T["3.maths.large"]=L("💎","Treasure past ten thousand","Read and compare larger whole numbers.",
"Places go ones, tens, hundreds, thousands, then ten-thousands. Compare the biggest place first.",
"12 405 is twelve thousand, four hundred and five.",
"Write five numbers bigger than 10 000. Put them in order.",[
Q("Which treasure is bigger: 12 500 or 12 050 gems?",["12 050","12 500","Equal"],1,"Both have 12 thousand. 500 beats 50.","Compare the hundreds."),
Q("What is the 3 worth in 34 210?",["3 000","300","30 000"],2,"The 3 is in the ten-thousands place.","Count the places from the right."),
Q("Which is smallest: 9 900, 10 100 or 10 010?",["9 900","10 100","10 010"],0,"9 900 is under 10 000.","Which has fewer digits?")]);
T["3.maths.regroup"]=L("🪄","Wand splitting sums","Add and subtract using place value.",
"Split numbers into hundreds, tens and ones. Work one part at a time. Ten ones make one ten.",
"126 + 35. First add 30 to get 156. Then add 5 to get 161.",
"Show how you could split 248 + 30.",[
Q("What is 124 + 30?",["127","154","144"],1,"Add three tens to 124 to get 154.","Add the tens only."),
Q("What is 256 - 40?",["296","252","216"],2,"Take four tens from 256 to get 216.","Take away the tens only."),
Q("What is 178 + 22?",["200","190","210"],0,"178 plus 2 is 180. Then 20 more is 200.","Make a ten first.")]);
T["3.maths.multiples"]=L("🧚","Fairy groups","Use multiplication and division facts.",
"Times counts equal groups. Sharing splits into equal groups. They are linked.",
"4 groups of 3 fairies make 12. So 12 fairies in groups of 3 make 4 groups.",
"Share 15 buttons into three equal groups.",[
Q("What is 4 × 5?",["9","20","25"],1,"Four groups of five make twenty.","Count 5, 10, 15, 20."),
Q("How many groups of 3 in 18?",["5","9","6"],2,"18 shared into threes makes 6 groups.","Count by threes to 18."),
Q("What is 7 × 3?",["21","24","18"],0,"Seven threes make twenty-one.","Count by threes seven times.")]);
T["3.maths.measure"]=L("📏","Measuring the castle","Choose and use familiar metric units.",
"We measure length in centimetres and metres. Small things use centimetres. Big things use metres.",
"A wand is easy to measure in centimetres, not kilometres.",
"Measure a book with a ruler. Write its length in centimetres.",[
Q("Which unit suits the length of a pencil?",["kilometres","centimetres","litres"],1,"A pencil is small, so centimetres fit.","Think small."),
Q("100 centimetres is...",["10 metres","100 metres","1 metre"],2,"There are 100 centimetres in one metre.","How many cm in a metre?"),
Q("Which is about 2 metres tall?",["A doorway","A pencil","An ant"],0,"A door is about two metres tall.","Think of things taller than you.")]);
T["3.english.purpose"]=L("📜","Who is the scroll for?","Recognise audience and purpose.",
"Writers write for a reader. They write to entertain, to inform or to persuade.",
"A castle safety sign is for people who visit the castle.",
"Find a poster. Say who it is talking to.",[
Q("A letter asking the council to fix a park is mainly...",["Imaginative","Persuasive","A recipe"],1,"It asks the council to do something.","What does the writer want?"),
Q("A science report on volcanoes is mainly...",["An advertisement","A fairy tale","Informative"],2,"Reports explain facts.","Does it teach facts?"),
Q("A story told by a fox is mainly...",["Imaginative","A bus timetable","A measuring chart"],0,"It tells a made-up story.","Is it pretend?")]);
T["3.english.paragraph"]=L("🦄","One idea at a time","Group related sentences in paragraphs.",
"A paragraph is a group of sentences. They are all about one main idea. A new idea starts a new paragraph.",
"Unicorn food goes in one paragraph. Unicorn homes go in another.",
"Write two short paragraphs: your pet, then its home.",[
Q("Which two sentences fit a paragraph about whales?",["I like bikes. The toast is ready.","Whales breathe air. Whales live in oceans.","The moon is bright. We ate lunch."],1,"Both sentences are about whales.","Find the shared topic."),
Q("Start a new paragraph when you...",["Write another word","Add a comma","Start a new main idea"],2,"Paragraphs keep ideas apart.","Think about big ideas."),
Q("Which is a good first sentence about bees?",["Bees help flowers grow.","My shoes are red.","I finished my homework."],0,"It tells the main idea.","Which one is about bees?")]);
T["3.english.inference"]=L("🔮","Crystal ball clues","Use clues to infer meaning.",
"Writers do not tell us everything. We use clues in the words. We add what we know. Then we work it out.",
"'Water dripped off Kai's coat.' Kai was probably in the rain.",
"Read a sentence. Say which words helped your guess.",[
Q("'Sana grabbed an umbrella as dark clouds gathered.' What is likely?",["It is sunny","Rain is coming","It is snowing inside"],1,"Dark clouds and an umbrella mean rain.","Look at the clouds."),
Q("'Tom pulled up his blanket and shivered.' How might Tom feel?",["Too hot","Hungry","Cold"],2,"Shivering is a clue for cold.","Why do we shiver?"),
Q("'The crowd stood and clapped at the end.' What happened?",["A show ended","The shops opened","A storm began"],0,"Clapping at the end follows a show.","When do people clap?")]);
T["3.english.figurative"]=L("🧚","Fairy sound words","Explore onomatopoeia and rhythmic word choices.",
"Some words sound like the noise they name. Bang, buzz and splash are sound words. This is called onomatopoeia.",
"'Splash!' helps us hear water hitting something.",
"Make up a comic sound for a closing door.",[
Q("Which word is a sound word?",["green","buzz","quietly"],1,"Buzz sounds like a bee.","Say each word out loud."),
Q("Which sound fits a balloon popping?",["whisper","drift","POP!"],2,"Pop sounds like the balloon.","Which one is quick and loud?"),
Q("What does 'crash' help you imagine?",["A loud bump","A sweet smell","A soft feel"],0,"Crash sounds like things hitting.","Is it a sound, smell or feel?")]);
T["4.maths.decimal"]=L("💎","Gem decimals","Read and represent tenths and hundredths.",
"Place value keeps going after the decimal point. The first place is tenths. The second place is hundredths. 2.46 is 2 ones, 4 tenths and 6 hundredths.",
"0.35 is 3 tenths and 5 hundredths. That is also 35 hundredths.",
"Draw a 10 by 10 grid. Colour 25 squares to show 0.25.",[
Q("What is 0.6 as a fraction?",["6/100","6/10","6/1"],1,"Six tenths is 6/10.","The 6 is in the tenths place."),
Q("What is 0.25 in hundredths?",["2 hundredths","25 tenths","25 hundredths"],2,"0.25 is 25 parts out of 100.","Two places means hundredths."),
Q("In 3.08, which digit is in the hundredths place?",["8","0","3"],0,"Hundredths is the second digit after the point.","Count two places after the point."),
Q("Which number equals ten hundredths?",["0.01","0.10","1.00"],1,"Ten hundredths is one tenth, 0.10.","Ten hundredths make one tenth."),
Q("Which is larger?",["0.65","They are equal","0.7"],2,"0.7 is 70 hundredths. 70 beats 65.","Write 0.7 as 0.70.")]);
T["4.maths.fractions"]=L("🎂","Fairy cake fractions","Recognise equivalent fractions and their links to decimals.",
"Equivalent fractions are the same amount. Times the top and bottom by the same number. The amount stays the same. Some fractions can be decimals too.",
"Half a fairy cake is the same as two quarters. 1/2 = 2/4 = 0.5.",
"Fold paper in half, then in quarters. Two quarters cover one half.",[
Q("Which fraction equals 1/2?",["1/4","2/4","2/3"],1,"Double the top and bottom of 1/2 to get 2/4.","Same amount, not same numbers."),
Q("What is 3/6 in simplest form?",["1/3","2/3","1/2"],2,"Three out of six parts is one half.","Is 3 half of 6?"),
Q("Which fraction matches 0.5?",["5/10","5/100","1/5"],0,"Five tenths is 0.5.","0.5 is five tenths."),
Q("Which fraction equals 2/3?",["3/4","4/6","2/6"],1,"Double the top and bottom to get 4/6.","Times top and bottom by 2."),
Q("What is another way to write 1/4?",["4/10","10/25","25/100"],2,"A quarter is 25 out of 100.","A quarter of 100 is what?")]);
T["4.maths.place-power"]=L("🪄","Magic wand times ten","Multiply and divide whole numbers by 10 and 100.",
"Times 10 makes each digit worth ten times more. Times 100 makes it a hundred times more. Dividing goes back the other way.",
"34 × 10 = 340. Check: 340 ÷ 10 = 34.",
"Use cards to show 23 changing when it is times 10.",[
Q("What is 34 × 10?",["44","340","3400"],1,"34 tens make 340.","Each digit moves up one place."),
Q("What is 70 ÷ 10?",["70","700","7"],2,"There are seven tens in 70.","How many tens in 70?"),
Q("What is 46 × 100?",["4600","460","146"],0,"46 hundreds is 4600.","Times 100 moves two places."),
Q("What is 150 ÷ 10?",["1500","15","105"],1,"150 has fifteen tens.","How many tens in 150?"),
Q("What is 6 × 30?",["36","60","180"],2,"Six lots of 3 tens is 18 tens, or 180.","Do 6 × 3, then times 10.")]);
T["4.maths.money"]=L("👑","Princess market money","Model money problems and check whether answers are reasonable.",
"Write a number sentence for the cost. Times for items with the same price. Take away to find change. Round to check your answer.",
"Three ribbons at $4 each cost 3 × $4 = $12. Pay $20 and get $8 change.",
"Plan a pretend shop of three items. Work out the cost and change.",[
Q("Three tiaras cost $4 each. What is the total?",["$7","$12","$16"],1,"Three lots of $4 is $12.","Times, not add."),
Q("You buy two $7 wands and pay $20. What is your change?",["$13","$7","$6"],2,"2 × $7 is $14. $20 take away $14 is $6.","Find the total first."),
Q("About how much is $198 + $203?",["$400","$40","$4,000"],0,"Both are about $200, so about $400.","Round each one first."),
Q("What is $3.60 + $2.20?",["$5.60","$5.80","$6.20"],1,"$3 + $2 is $5. 60c + 20c is 80c.","Add dollars, then cents."),
Q("Four tickets cost $8 each. What is the total?",["$12","$48","$32"],2,"Four lots of $8 is $32.","Count by eights four times.")]);
T["4.english.fact"]=L("🦄","Fact or feeling?","Distinguish factual reporting from opinions and feelings.",
"A fact can be checked. An opinion is what someone thinks or feels. Word choice can change how readers feel about a topic.",
"'A horse has four legs' is a fact. 'Unicorns are the prettiest' is an opinion.",
"Find one fact and one opinion on a poster or box.",[
Q("Which is an opinion?",["Water can fall as rain.","Rainy days are the best.","Rain falls from clouds."],1,"'The best' is a personal view.","Can it be checked?"),
Q("Which is a fact you can check?",["Monday is the nicest day.","Weekends feel too short.","A week has seven days."],2,"You can count the days in a week.","Can you prove it?"),
Q("Which word usually shows an opinion?",["Wonderful","Measured","Recorded"],0,"'Wonderful' is a judgement.","Which is a feeling word?"),
Q("A news report says 'The match lasted 70 minutes'. This is...",["A feeling","Objective information","A personal preference"],1,"The time can be checked.","Could you check it?"),
Q("Which sentence uses opinion words?",["The concert began at 7 pm.","The band played five songs.","That was an amazing show."],2,"'Amazing' is someone's view.","Look for a feeling word.")]);
T["4.english.clauses"]=L("🧚","Linking fairy ideas","Recognise a main clause and a dependent clause in a complex sentence.",
"A main clause makes sense on its own. A dependent clause needs the main clause. Words like because, although and when join them.",
"'We stayed inside because it rained.' 'We stayed inside' is the main clause. 'Because it rained' gives the reason.",
"Say one sentence with 'because' and one with 'although'.",[
Q("Which sentence has a dependent clause?",["The bus was late.","We waited because the bus was late.","We waited quietly."],1,"'Because the bus was late' cannot stand alone.","Look for a joining word."),
Q("Which word shows a reason?",["although","meanwhile","because"],2,"'Because' tells why.","Which word answers why?"),
Q("'_____ it was cold, we went swimming.'",["Although","And","Or"],0,"'Although' shows a surprise contrast.","Cold, but still swimming."),
Q("'When the bell rang, we packed up.' Which is the main clause?",["When the bell rang","we packed up","When the"],1,"'We packed up' makes sense alone.","Which part stands alone?"),
Q("Which sentence gives a reason with a dependent clause?",["I drank water and ate lunch.","I drank water.","I drank water because I was thirsty."],2,"'Because I was thirsty' gives the reason.","Look for because.")]);
T["4.english.infer"]=L("🔮","Fairy detective clues","Use textual evidence to infer, predict and summarise.",
"Readers use clues and what they know. They can guess what is happening. They can predict what comes next. They change their guess when new clues appear.",
"'Maya zipped her coat and grabbed an umbrella.' She probably expects wet weather.",
"Read a short paragraph. Write one guess and underline the clue.",[
Q("'Maya grabbed an umbrella as clouds darkened.' What does she expect?",["A heatwave","Rain","A party"],1,"Umbrella and dark clouds point to rain.","Use the clues."),
Q("'The puppy waited by its empty bowl and whined.' What does it want?",["A new collar","A walk","Food"],2,"An empty bowl and whining mean hunger.","Look at the bowl."),
Q("'After three hours of walking, Luca sat and drank water.' What makes sense?",["Luca may be tired and thirsty.","Luca is learning to drive.","Luca dislikes all exercise."],0,"A long walk and water show tiredness and thirst.","Which one do the clues prove?"),
Q("Which detail best shows a storm is coming?",["The garden was full of flowers.","Thunder rolled and the sky grew dark.","The room had new chairs."],1,"Thunder and dark sky are storm clues.","Which is about weather?"),
Q("Best summary: 'Ella planted seeds, watered them daily, and saw seedlings appear.'",["Ella bought new shoes.","Ella went to the beach.","Ella cared for seeds until they sprouted."],2,"It covers planting, caring and growing.","Which tells the whole story?")]);
T["4.english.tension"]=L("🏰","Fairy tale wondering","Explore how character, setting and plot tension engage readers.",
"Characters want things. Problems get in the way. Writers make us wonder what happens next. A tricky problem or a new place builds tension.",
"'The fog grew thick, and the princess could not see the path.' We want to know if she finds it.",
"Tell a three-sentence fairy tale: character, problem, fix. Add one wondering detail.",[
Q("What makes readers most curious?",["The hero likes blue.","The bridge wobbles as the hero crosses.","The hero owns three pencils."],1,"A wobbly bridge makes us wonder what happens.","Which one has a problem?"),
Q("Which detail shows what a character wants?",["Lila wore a green hat.","The park had four benches.","Lila searched everywhere for her lost pony."],2,"Searching for the pony shows her goal.","Who is trying to do something?"),
Q("Why set a scene in a misty, unknown forest?",["To make readers wonder","To show a maths timetable","To promise no problems"],0,"A strange place makes us wonder what comes next.","How does a new place feel?"),
Q("What is a story's resolution?",["The first sentence only","How the main problem is fixed","A list of names"],1,"The resolution shows how the problem is solved.","Think of the ending."),
Q("Which sentence shows a problem for a character?",["Noor liked yellow flowers.","Noor's room had a desk.","The castle gate was locked when Noor arrived."],2,"A locked gate stops Noor getting in.","What gets in the way?")]);
T["5.science.adapt"]=L("🦄","Magic survival gifts","Explain how living things suit their habitats.",
"An adaptation is a special feature or behaviour. It helps a living thing survive. It also helps it have young. A mangrove has special roots. They help it live in wet, low-oxygen mud.",
"The fairy garden echidna has spines. They help protect it from predators. Its long snout finds ants and termites.",
"Find two plants near home. How do their parts help them live there?",[
Q("How can an echidna's spines help it survive?",["Making rain fall","Protection from predators","Turning into a bird"],1,"Spines help the echidna defend itself.","Think about staying safe."),
Q("Why do some mangroves have special roots?",["To make the ocean salty","To float up to the stars","To cope with wet, low-oxygen mud"],2,"Special roots help mangroves get oxygen and stay steady.","Imagine growing in very wet soil."),
Q("Which plant gift helps in dry places?",["Waxy leaves that keep water in","Holes that always leak water","Roots that never reach the soil"],0,"A waxy coat helps some plants hold their water.","Think about saving water."),
Q("A moon pony is awake mostly at night. This is...",["A rock type","A source of electricity","A behavioural adaptation"],2,"Being active at a certain time is something it does to survive.","Is it something the animal does?")]);
T["5.science.erosion"]=L("🏰","The changing castle shore","Distinguish weathering, erosion and deposition.",
"Weathering breaks rock into smaller pieces. Erosion carries pieces away. Water, wind or ice can carry them. Deposition is when pieces settle somewhere new.",
"After heavy rain, a fairy stream carries loose soil. Where the water slows, it leaves the soil behind.",
"With an adult, look where water flows after rain. Never go near floodwater.",[
Q("A river carries sand downstream. What is happening?",["Erosion and moving","The sand turns to metal","The river makes sunlight"],0,"Moving water carries sand away.","The sand is being moved."),
Q("The river slows and sand settles. This is called...",["Evaporation","Deposition","Magnetism"],1,"Deposition is when carried sand is dropped.","Where does the sand end up?"),
Q("A castle rock cracks into pieces but stays put. This is...",["Deposition","Photosynthesis","Weathering"],2,"Weathering breaks rock without moving it.","Breaking and moving are different."),
Q("Wind drops sand into a dune by the castle. This is...",["Deposition","Evaporation","Refraction"],0,"Carried sand that settles is deposition.","The sand is left in a new place.")]);
T["5.science.light"]=L("✨","Fairy light paths","Explain shadows, reflection and refraction.",
"Light travels in straight lines. Opaque things block light and make shadows. Reflection is light bouncing off a surface. Refraction is light changing direction between materials.",
"A wand in a glass of water looks bent. Light changes direction where water meets air.",
"With an adult, shine a torch on a toy. Move it closer to the wall and watch the shadow.",[
Q("Why does an opaque crown make a shadow?",["It makes extra sunlight","It blocks some light","It soaks up all sound"],1,"The crown blocks the straight path of light.","What happens to light behind it?"),
Q("A magic mirror changes the direction of light by...",["Deposition","Freezing","Reflection"],2,"Light reflects off a mirror.","Think of light bouncing."),
Q("Why can a wand look bent in water?",["Light changes direction between water and air","The wand always breaks","Sound bends the wand"],0,"Refraction changes the direction of light.","Light moves differently in water and air."),
Q("What kind of object makes a clear shadow?",["Fully see-through","Opaque","Invisible"],1,"An opaque object stops light passing through.","Which one stops the light?")]);
T["5.science.particles"]=L("🧊","Tiny sparkle particles","Model solids, liquids and gases using particles.",
"Matter is made of tiny particles. In a solid, they stay in place and wiggle. In a liquid, they stay close but slide past each other. In a gas, they are far apart and move freely.",
"An ice palace can melt to water, then turn to vapour. It is still water in each state.",
"Draw dots for a solid, a liquid and a gas. Show how spread out they are.",[
Q("Which model shows a gas?",["Particles fixed tight in a grid","No particles at all","Particles far apart, moving freely"],2,"Gas particles have lots of space and move freely.","Which state spreads to fill its jar?"),
Q("What do particles in a liquid do?",["They slide past each other","They all stop moving","They turn into sunlight"],0,"This lets liquids flow and take a container's shape.","Liquids can pour."),
Q("Why can a potion pour but a crystal keeps its shape?",["Potions have no particles","Liquid particles slide past each other","Crystal particles vanish"],1,"Liquid particles stay close but move around each other.","Both still have particles."),
Q("Which is true about water vapour?",["It is made of no matter","It is made of tiny stones","It is a gas made of water particles"],2,"Water vapour is water as a gas, spread far apart.","It is still water, in another state.")]);
T["5.hass.democracy"]=L("👑","The kingdom council","Understand representation and collective action.",
"In Australia, voters choose representatives. Representatives make decisions in parliament. People can also work together for their community. They might ask for a better park.",
"Fairy village folk want a safer crossing. They write to the council and sign a petition.",
"Ask a family member what they would vote to make better nearby.",[
Q("What happens in a representative democracy?",["One ruler chooses forever","Voting is banned","People elect representatives"],2,"Voters choose people to make decisions for them.","Who picks the representatives?"),
Q("Which is something people can do together?",["Start a community petition","Ignore everyone's views","Break the playground"],0,"People can team up to ask for change.","Pick the helpful action."),
Q("How can people tell representatives their ideas between votes?",["Keep worries secret","Write to them about an issue","Pretend laws do not exist"],1,"People can send their concerns to representatives.","How could a representative hear you?"),
Q("Why might a unicorn school hold a vote?",["To stop anyone talking","To erase everyone's ideas","To make a group choice"],2,"A vote helps a group decide together.","It counts everyone's choices.")]);
T["5.hass.weather"]=L("🌈","Keeping the kingdom safe","See how communities manage environmental risks.",
"Floods, bushfires and drought can affect places and people. Communities plan ahead. They share warnings. They care for the land. They listen to emergency advice.",
"In Queensland, flood warnings help people know which areas to avoid.",
"Ask a trusted adult where your family gets emergency warnings. Never go in floodwater.",[
Q("Floodwater covers the road. What is safest?",["Try to walk through","Stay out and follow official advice","Guess shallow water is fine"],1,"Floodwater can hide strong currents.","Never go in floodwater."),
Q("How can planning reduce bushfire danger?",["Ignore fire danger","Block all the exits","Be prepared and follow fire warnings"],2,"Planning and warnings lower the risk.","Which choice helps people get ready?"),
Q("Before a big storm, where should you get warnings?",["Official weather and emergency services","A made-up story","An old advert"],0,"Official services give warnings using current facts.","Who checks the weather right now?"),
Q("What can lower risk from natural hazards?",["Ignoring advice","Driving into floodwater","Emergency plans and clear warnings"],2,"Plans and warnings help people make safe choices.","Think about getting ready.")]);
T["5.hass.resources"]=L("🧚","The fairy bakery's helpers","Identify resources that help meet needs.",
"Natural resources come from nature, like timber. Human resources are people's work and skills. Capital resources are tools and machines. We use them all to meet needs and wants.",
"The fairy bakery uses flour (natural), the baker's skills (human) and an oven (capital).",
"Pick a shop you know. Name one natural, one human and one capital resource.",[
Q("A builder's skills are an example of...",["A capital machine","Human resources","A natural forest"],1,"People's work and skills are human resources.","It is something a person can do."),
Q("The fairy bakery's oven is an example of...",["A capital resource","A natural resource","A human resource"],0,"A tool used to make goods is capital.","It is a tool, not a person."),
Q("Which natural resource makes a princess's wooden chair?",["A carpenter's skills","A factory saw","Timber"],2,"Wood comes from nature and can become furniture.","Which comes from trees?"),
Q("A farm tractor is best called...",["A worker's skill","A capital resource","A weather pattern"],1,"Machines used to make goods are capital.","It is a piece of equipment.")]);
T["5.technologies.binary"]=L("🔮","Crystal code","See how computers represent information.",
"Computers store data using bits. A bit is 0 or 1. Think of a crystal: dark is 0, glowing is 1. Groups of bits make numbers, words, pictures and sound.",
"In binary, 101 means 4 + 0 + 1 = 5. The place values are 4, 2 and 1.",
"Write every two-bit pattern: 00, 01, 10 and 11.",[
Q("Which two digits does binary use?",["1 and 9","0 and 1","2 and 8"],1,"Binary uses only zeros and ones.","Think of a crystal: off or on."),
Q("What is 101 in binary?",["One hundred and one","Ten","Five"],2,"Place values 4, 2, 1 give 4 + 1 = 5.","Add the place values 4 and 1."),
Q("In binary, what number is 110?",["6","110","3"],0,"Place values 4, 2, 1 give 4 + 2 = 6.","Add the first two places."),
Q("What is binary 11 as a normal number?",["11","2","3"],2,"Binary 11 is 2 + 1 = 3.","The two place values are 2 and 1.")]);
T["5.technologies.loops"]=L("🪄","Spell loops","Use repetition, choices and variables.",
"A loop repeats instructions. A variable stores a value that can change. An 'if' chooses an action when something is true. Together they make programs work.",
"Sparkles start at 0. Repeat 3 times: add 2 sparkles. Now there are 6 sparkles.",
"Write steps for a toy fairy to repeat a dance until a timer ends.",[
Q("Sparkles start at 0. A loop adds 2 three times. How many?",["3","6","2"],1,"0 + 2 + 2 + 2 = 6.","Add 2 three times."),
Q("What is a variable in a program?",["A picture that never loads","A button colour","A named value that can change"],2,"Variables remember things like a score.","It stores a value."),
Q("A spell adds 3 gems four times from 0. Total?",["12","7","4"],0,"3 + 3 + 3 + 3 = 12.","Four lots of 3."),
Q("What does an 'if' do in a program?",["Repeats forever","Chooses an action when something is true","Deletes every variable"],1,"An 'if' lets the program pick what to do.","The program has to decide.")]);
T["5.technologies.app-design"]=L("📱","Apps for every princess","Design an interface around users' needs.",
"A user story says what a person needs and why. Designers then make clear layouts and easy buttons. They add helpful feedback. Then they test with a real person.",
"User story: As a child who finds small text hard, I want big, clear words so I can read.",
"Draw a screen. Ask someone to find the main button.",[
Q("What helps a child read a game screen?",["Tiny pale letters","Buttons with no labels","Strong contrast and clear buttons"],2,"Contrast and labels make screens easier.","Can someone see and understand it?"),
Q("What does a user story describe?",["Who needs something and why","Only the app's colours","A secret password"],0,"User stories keep design about the person's goal.","Think about the user's task."),
Q("Which is useful feedback when testing?",["The designer likes pink","A user can't find the next button","It was opened on Tuesday"],1,"Real trouble shows what to fix.","Look for what the user found hard."),
Q("Why add words as well as icons?",["Icons should always be tiny","Words make apps slower","People may not understand icons alone"],2,"Words make buttons easier to understand.","Some icons are new to people.")]);
T["5.technologies.sustainable-design"]=L("♻️","Caring castle designs","Evaluate designs using agreed criteria.",
"Design criteria are checks for how well something works. We can check safety and how long it lasts. We can check price and if it can be fixed. We can check its effect on nature. Good choices weigh many checks.",
"A water bottle that lasts years may beat one that breaks fast. Also check the materials and cost.",
"Pick three checks for a magical lunchbox. Draw it and test it against them.",[
Q("Which is a good check for a lunchbox?",["Hard to open and leaks","Safe and long-lasting","Impossible to clean"],1,"Designs are judged on what users need.","What matters to the person using it?"),
Q("Why use more than one design check?",["Every design is perfect","Only colour matters","A design can have trade-offs"],2,"Something can be cheap but break easily.","Think about cost, use and nature."),
Q("Which helps a device last longer?",["Parts that can be fixed","A glued-in battery","A case that breaks easily"],0,"Fixing parts keeps it working longer.","Can it be fixed, not thrown out?"),
Q("Why might the cheapest wand not be best?",["Price is all that matters","It might break sooner or be less safe","All materials are the same"],1,"Good choices think about safety and lasting too.","Many checks matter, not just price.")]);
T["5.maths.percentage"]=L("💯","Unicorn percent","Connect percentages, fractions and decimals.",
"Percent means out of a hundred. 50% is 50 out of 100. That is one half, or 0.5.",
"25% is 25 out of 100. That is one quarter.",
"Line up ten toys. Find 50% of them.",[
Q("What fraction is the same as 50%?",["1/3","1/2","1/5"],1,"50 out of 100 is one half.","Percent means out of 100."),
Q("A unicorn has 80 gems. What is 25% of 80?",["40","25","20"],2,"One quarter of 80 is 20.","25% is one quarter."),
Q("What decimal is the same as 75%?",["0.75","7.5","0.075"],0,"75% is 75 hundredths, or 0.75.","Percent means out of 100.")]);
T["5.maths.fractions"]=L("🍰","Fairy cake fractions","Add fractions with related denominators.",
"To add fractions with the same bottom number, add the top numbers. If the bottoms are related, make same-size parts first.",
"1/4 + 2/4 = 3/4. And 1/2 is the same as 2/4.",
"Draw two cakes. Cut one into quarters and one into halves.",[
Q("What is 1/5 + 2/5?",["3/10","2/5","3/5"],2,"One fifth plus two fifths is three fifths.","The parts are already the same size."),
Q("What is 1/2 + 1/4?",["3/4","2/6","1/8"],0,"One half is two quarters. Add one more quarter.","Make the parts the same size first."),
Q("A fairy cake has 3/8 left. A fairy eats 1/8. How much is left?",["1/8","1/4","2/16"],1,"3/8 - 1/8 = 2/8, which is one quarter.","Take away the top numbers.")]);
T["5.maths.multiply"]=L("✖️","Magic multiplying","Use efficient strategies for multiplication.",
"Split big numbers into tens and ones. Multiply each part. Then add the parts together.",
"24 × 3 = (20 × 3) + (4 × 3) = 60 + 12 = 72.",
"Multiply 14 by 3 using tens and ones.",[
Q("What is 23 × 4?",["82","92","96"],1,"20 × 4 = 80 and 3 × 4 = 12, so 92.","Split 23 into tens and ones."),
Q("Each of 15 unicorns has 6 ribbons. How many ribbons?",["75","95","90"],2,"10 × 6 = 60 and 5 × 6 = 30, so 90.","Split 15 into tens and ones."),
Q("What is 120 × 3?",["360","123","320"],0,"12 tens times 3 is 36 tens, or 360.","Split the first number into parts.")]);
T["5.maths.estimates"]=L("🧠","Wizard's quick guess","Estimate to see if a calculation makes sense.",
"Rounding helps you estimate. Estimate before or after you work it out. A good estimate spots a wrong digit.",
"48 × 6 is close to 50 × 6 = 300.",
"Find three things that cost about $20 each. Estimate the total.",[
Q("What is the best estimate for 49 × 5?",["25","2500","250"],2,"Round 49 to 50. 50 × 5 = 250.","Round to friendly numbers first."),
Q("About how much is $19 + $21 + $18 for three crowns?",["$60","$20","$120"],0,"Each is close to $20, so about $60.","Round to friendly numbers first."),
Q("A pixie says 99 × 4 = 40. What is true?",["It is a good estimate","It is much too small","It is too big"],1,"100 × 4 is about 400, not 40.","Round to friendly numbers first.")]);
T["5.english.perspective"]=L("👀","Whose fairy tale?","Explore how a narrator's viewpoint shapes meaning.",
"One event can feel different to two characters. A first-person narrator uses I and me. Other viewpoints use he, she or they.",
"'I rushed to hide the magic letter' shows the speaker's own view.",
"Tell one event twice, as two different characters.",[
Q("Which sentence uses first-person narration?",["She opened the castle door.","They opened the castle door.","I opened the castle door."],2,"The speaker uses 'I' about their own action.","Look for who is speaking."),
Q("Why might two characters tell one event differently?",["They had different experiences","It happened twice","Only one character has feelings"],0,"People understand events in different ways.","Think about what each one knows."),
Q("'The prince thought the forest was safe, but the princess felt worried.' This shows...",["Two matching opinions","Different points of view","No feelings at all"],1,"They each see the forest differently.","Look at what each one thinks.")]);
T["5.english.imagery"]=L("🌈","Magic word pictures","Recognise similes, metaphors and personification.",
"A simile compares using like or as. A metaphor says one thing is another thing. Personification gives human actions to things that are not human.",
"'The trees danced in the wind' is personification.",
"Make up a simile about a cloud.",[
Q("Which is a simile?",["The moon is a lamp","As quiet as a mouse","The stars winked"],1,"'As' starts a comparison.","Look for like or as."),
Q("'The castle hall was a zoo' is a...",["Recipe","Literal fact","Metaphor"],2,"It says the hall is a zoo.","Does it say one thing is another?"),
Q("'The wind whispered through the leaves' is...",["Personification","A number fact","A real person's words"],0,"Whispering is a human action given to wind.","Can wind really whisper?")]);
T["5.english.evidence"]=L("🔍","Proving it, princess style","Support a claim with reasons and reliable evidence.",
"A strong argument says why a claim makes sense. It uses evidence you can trust. An opinion alone is not enough.",
"Don't just say 'More shade is good'. Explain that shade helps people stay cool.",
"Write a claim about your school. Give one reason.",[
Q("Which best supports 'Our school needs more trees'?",["Trees have names","I like the letter T","Trees give shade on hot days"],2,"Shade is a real reason to plant trees.","Find a reason that backs it up."),
Q("Where should you check an official storm warning?",["The Bureau of Meteorology","An old fairy story","A random guess"],0,"Official warnings come from the weather experts.","Who studies the weather?"),
Q("Which is an evidence-based reason?",["Everyone agrees because I say so.","The survey found most students walk to school.","My favourite word is blue."],1,"A survey result can be checked.","Which one could you check?")]);
T["5.english.structure"]=L("🧱","Building story towers","Link ideas clearly across paragraphs.",
"The start of a paragraph can show its main idea. Linking words guide readers to the next point.",
"'Another reason to protect rivers is...' adds a new idea.",
"Write two linked paragraphs about a favourite animal.",[
Q("Which phrase adds another supporting point?",["On the other hand,","Furthermore,","Yesterday at 6 am,"],1,"Furthermore adds another idea.","Which words say 'and also'?"),
Q("Which is a strong start to a paragraph about recycling?",["This is a nice thing.","And then this happened.","Recycling can reduce rubbish sent to landfill."],2,"It clearly says what the paragraph is about.","Which sentence names the topic?"),
Q("Which phrase shows a different idea?",["However,","For example,","Similarly,"],0,"However shows a change or contrast.","Which word means 'but'?")]);
T["6.maths.integers"]=L("❄️","Frosty fairy numbers","Compare and calculate with positive and negative numbers.",
"Numbers can go below zero. The Ice Fairy's land is very cold. Picture a number line. Right means bigger. Left means smaller.",
"The ice palace warms from -3°C to 2°C. Count 3 steps to zero, then 2 more. That is 5 degrees.",
"Draw a number line from -10 to 10. Hop a toy unicorn along it.",[
Q("Which number is smallest?",["-2","-8","3"],1,"-8 is farthest left on the number line.","Picture the numbers in a row."),
Q("A unicorn starts at -5 and hops 9 right. What is -5 + 9?",["-14","14","4"],2,"Nine steps right from -5 lands on 4.","Hop right to add."),
Q("A fairy is at 4 and flies 7 left. What is 4 - 7?",["-3","3","11"],0,"Seven steps left from 4 lands on -3.","Hop left to take away."),
Q("Which ice cave is warmer?",["-6°C","-1°C","They are equal"],1,"-1 is greater than -6.","Which is closer to zero?"),
Q("A castle lift goes from floor -2 to floor 4. How many floors up?",["2","4","6"],2,"Count six steps from -2 to 4.","Count every step past zero.")]);
T["6.maths.prime"]=L("🔮","Magic number spells","Identify prime, composite and square numbers.",
"A prime number has exactly two factors. They are 1 and itself. A composite number has more factors. A square number is a number times itself. The wizard uses these in spells.",
"17 only splits into 1 × 17, so it is prime. 21 is 3 × 7, so it is composite. 36 is 6 × 6, so it is square.",
"Lay out buttons in rows. Can 12 buttons make a square? Can 9?",[
Q("Which spell number is prime?",["15","17","21"],1,"17 has only 1 and 17 as factors.","Find the factors first."),
Q("Which is a square number?",["54","42","49"],2,"7 × 7 = 49.","Is it a number times itself?"),
Q("Why is 1 not a prime number?",["It has only one factor.","It is even.","It has three factors."],0,"Primes need exactly two factors.","Count its factors."),
Q("Which magic number is composite?",["23","27","19"],1,"27 splits into 1, 3, 9 and 27.","Try dividing by 3."),
Q("What is the only even prime?",["4","6","2"],2,"2 has only 1 and 2 as factors.","Try the smallest even number.")]);
T["6.maths.compare"]=L("🧁","Fairy cake fractions","Compare and order equivalent fractions.",
"Fractions are parts of a whole. To compare them, make the bottom numbers match. Or place them on a number line. Equivalent fractions show the same amount.",
"The princess has 3/4 of a cake. That is the same as 6/8. 6/8 is more than 5/8.",
"Fold paper to show 1/2, 2/3 and 3/4. Which piece is biggest?",[
Q("Which piece of fairy cake is bigger?",["5/8","3/4","They are equal"],1,"3/4 is 6/8, so it is bigger.","Make the bottom numbers match."),
Q("Which fraction equals 2/3?",["6/12","4/9","8/12"],2,"Times top and bottom by four.","Make twelfths."),
Q("Which is the smallest slice?",["1/4","1/2","3/4"],0,"A quarter is less than a half.","Picture the cake cut up."),
Q("Compare 5/6 and 3/4. Which is bigger?",["3/4","5/6","They are equal"],1,"10/12 is more than 9/12.","Change both to twelfths."),
Q("Where does 7/8 sit on the line?",["Below 1/4","At 1/2","Between 3/4 and 1"],2,"7/8 is between 6/8 and 8/8.","Change 3/4 to eighths.")]);
T["6.maths.fraction-sums"]=L("🧚","Fairy potion fractions","Add and subtract fractions with related denominators.",
"The fairy mixes potions in parts. Change the parts so they match. Then add or take away the top numbers. The bottom number stays the same.",
"1/2 + 1/4. Change 1/2 into 2/4. Then 2/4 + 1/4 = 3/4.",
"Draw a bar with 12 parts. Colour in two potion sums.",[
Q("1/2 + 1/4 = ?",["2/6","3/4","1/6"],1,"2/4 plus 1/4 is 3/4.","Make the parts match."),
Q("5/6 - 1/3 = ?",["4/3","2/6","1/2"],2,"5/6 - 2/6 = 3/6 = 1/2.","Change thirds to sixths."),
Q("2/3 + 1/6 = ?",["5/6","3/9","1/2"],0,"4/6 + 1/6 = 5/6.","Change thirds to sixths."),
Q("7/8 - 1/4 = ?",["6/4","5/8","3/8"],1,"7/8 - 2/8 = 5/8.","Change quarters to eighths."),
Q("3/4 + 1/8 = ?",["4/12","1/2","7/8"],2,"6/8 + 1/8 = 7/8.","Change quarters to eighths.")]);
T["6.maths.decimals"]=L("👑","Royal market decimals","Add, subtract and estimate with decimals.",
"The princess shops at the royal market. Line up the decimal points first. Then add or take away. Round the numbers to check your answer makes sense.",
"2.45 + 1.30 = 3.75. Check: 2 + 1 = 3. That is close, so it makes sense.",
"Price three toys with pretend tags. Guess the total, then add it.",[
Q("3.45 + 2.30 = ?",["5.48","5.75","5.15"],1,"Line up the columns and add.","Line up the decimal points."),
Q("8.00 - 2.65 = ?",["6.65","5.45","5.35"],2,"8.00 take away 2.65 is 5.35.","Line up the decimal points."),
Q("Guess 19.80 + 4.25.",["24","15","240"],0,"Round to about 20 plus 4.","Round each number first."),
Q("0.7 + 0.08 = ?",["0.15","0.78","0.708"],1,"0.70 + 0.08 = 0.78.","Write 0.7 as 0.70."),
Q("6.2 - 0.75 = ?",["5.55","6.55","5.45"],2,"6.20 - 0.75 = 5.45.","Write 6.2 as 6.20.")]);
T["6.maths.powers"]=L("✨","Magic wand times ten","Multiply and divide decimals by multiples of 10.",
"The magic wand makes numbers grow or shrink. Times 10 moves each digit one place bigger. Divide by 10 moves each digit one place smaller. 100 moves two places.",
"4.5 × 100: move the digits two places bigger. That makes 450.",
"Measure a toy in metres. Change it into centimetres.",[
Q("3.42 × 10 = ?",["3.420","34.2","342"],1,"Each digit moves one place bigger.","Should it grow or shrink?"),
Q("0.56 × 100 = ?",["5.6","0.0056","56"],2,"Two places bigger makes 56.","Should it grow or shrink?"),
Q("48 ÷ 100 = ?",["0.48","4.8","4800"],0,"Two places smaller makes 0.48.","Should it grow or shrink?"),
Q("7.8 ÷ 10 = ?",["78","0.78","7.08"],1,"One place smaller makes 0.78.","Should it grow or shrink?"),
Q("0.09 × 1000 = ?",["9","900","90"],2,"Three places bigger makes 90.","Should it grow or shrink?")]);
T["6.maths.discount"]=L("🛍️","Princess shop sale","Calculate familiar percentages and discounts.",
"Percent means out of 100. 10% is one tenth. 25% is one quarter. 50% is one half. The princess shop uses these for sales.",
"A $80 crown has 25% off. A quarter of $80 is $20. So the crown costs $60.",
"Make a pretend shop sale. Work out three sale prices.",[
Q("25% of 80 = ?",["25","40","20"],2,"One quarter of 80 is 20.","25% is one quarter."),
Q("A $60 dress is 50% off. The sale price is...",["$30","$10","$50"],0,"Half of $60 is $30.","50% is one half."),
Q("10% of 350 = ?",["3.5","35","3500"],1,"Divide 350 by 10.","10% is one tenth."),
Q("A $40 unicorn toy is 20% off. The saving is...",["$12","$20","$8"],2,"20% of 40 is 8.","Find 10% first, then double."),
Q("75% is the same as...",["1/4","3/4","1/2"],1,"75 out of 100 is three quarters.","Think of three quarters.")]);
T["6.maths.equations"]=L("🗝️","Secret castle codes","Find unknown numbers in equations using brackets.",
"A castle door has a secret number. You need to find it. Undo each step in reverse order. Keep both sides equal.",
"3 × (x + 2) = 18. First 18 ÷ 3 = 6. Then 6 - 2 = 4. So x = 4.",
"Make a missing-number puzzle for someone at home.",[
Q("If 4 × (x + 1) = 20, x = ?",["5","4","6"],1,"20 ÷ 4 = 5, then take away 1.","Undo one step at a time."),
Q("7 + □ = 23. What is missing?",["30","14","16"],2,"23 - 7 = 16.","Undo the adding."),
Q("2 × (3 + y) = 16. Find y.",["5","8","13"],0,"16 ÷ 2 = 8, then 8 - 3 = 5.","Undo one step at a time."),
Q("Which code equals 18?",["3 × 4 + 2","3 × (4 + 2)","(3 + 4) × 2"],1,"3 × 6 = 18.","Do the brackets first."),
Q("z ÷ 5 = 7. Find z.",["12","2","35"],2,"7 × 5 = 35.","Undo the dividing.")]);
T["6.maths.coordinates"]=L("🗺️","Enchanted map points","Plot and locate ordered pairs with negatives.",
"A map point is written (x, y). Start at the middle, called the origin. Move across with x first. Then move up or down with y. Negative means left or down.",
"(-3, 2) means 3 steps left, then 2 steps up.",
"Draw a grid with four parts. Hide a fairy gem on it.",[
Q("(4, -2) is in which part?",["Top right","Bottom right","Top left"],1,"Positive x and negative y is bottom right.","First number is across, second is up or down."),
Q("Three left and five up is...",["(3, -5)","(5, -3)","(-3, 5)"],2,"Left is negative x. Up is positive y.","First number is across."),
Q("The origin is...",["(0, 0)","(1, 1)","(-1, 0)"],0,"The lines meet at zero.","Where do the lines cross?"),
Q("Move (2, 3) four steps left. Where now?",["(6, 3)","(-2, 3)","(2, -1)"],1,"Take 4 from x.","Left changes the first number."),
Q("Which point is top left?",["(4, -6)","(-4, -6)","(-4, 6)"],2,"Negative x and positive y.","Left is negative, up is positive.")]);
T["6.maths.measurement"]=L("🧪","Potion measuring","Convert length, mass and capacity using decimals.",
"1 kilometre is 1000 metres. 1 kilogram is 1000 grams. 1 litre is 1000 millilitres. The fairy uses place value to change units.",
"2.5 kg times 1000 is 2500 g. 750 mL divided by 1000 is 0.75 L.",
"Read labels on food in the kitchen. Change one into a new unit.",[
Q("The unicorn trots 2.4 kilometres. How many metres?",["240","2400","24"],1,"Times by 1000.","Smaller units need more of them."),
Q("750 mL of potion = ? litres",["7.5","75","0.75"],2,"Divide by 1000.","Litres are bigger units."),
Q("1.25 kg of stardust = ? grams",["1250","125","12 500"],0,"Times by 1000.","Smaller units need more of them."),
Q("3.6 m of ribbon = ? centimetres",["36","360","3600"],1,"Times by 100.","There are 100 cm in a metre."),
Q("Which is heavier?",["950 g","Same mass","1.2 kg"],2,"1200 g is more than 950 g.","Change both to grams.")]);
T["6.maths.angles"]=L("🌟","Star wand angles","Use angle relationships to find unknowns.",
"Angles on a straight line add to 180°. Angles around a point add to 360°. When two lines cross, opposite angles are equal.",
"A wand makes 65° on a straight line. The other angle is 180 - 65 = 115°.",
"Cross two pencils. Look at the angles across from each other.",[
Q("On a straight line, 73° and ?",["117°","107°","73°"],1,"180 - 73 = 107.","A straight line is 180°."),
Q("Around a point: 90°, 120° and ?",["130°","60°","150°"],2,"360 - 210 = 150.","All the way round is 360°."),
Q("The angle opposite 48° is...",["48°","132°","90°"],0,"Opposite angles are equal.","Look across the cross."),
Q("A unicorn spins a full turn. That is...",["180°","360°","90°"],1,"A full turn is 360 degrees.","Spin all the way round."),
Q("Two equal angles on a straight line are...",["45° each","180° each","90° each"],2,"180 ÷ 2 = 90.","Halve 180.")]);
T["6.maths.probability"]=L("🎲","Wishing well chances","Express chance as fractions, decimals and percentages.",
"Chance goes from 0 to 1. Zero means it cannot happen. One means it will happen. Count the outcomes to make a fraction.",
"A magic coin has heads and tails. Heads is 1 out of 2. That is 1/2, 0.5 or 50%.",
"Toss a coin 20 times. Count the heads. Is it close to 10?",[
Q("A fair magic coin. Chance of heads?",["25%","50%","100%"],1,"One heads side out of two.","Count the sides."),
Q("2 pink gems and 6 purple gems. Chance of pink?",["3/4","1/2","1/4"],2,"2 out of 8 is a quarter.","Count all the gems."),
Q("A chance of zero means...",["Impossible","Certain","Even chance"],0,"Zero means it cannot happen.","Think of the start of the scale."),
Q("A chance of 0.2 is the same as...",["2%","20%","200%"],1,"0.2 times 100 is 20%.","Times by 100."),
Q("Chance of a 6 on a fair dice?",["1/3","1/2","1/6"],2,"One 6 out of six faces.","Count the faces.")]);
T["6.maths.patterns"]=L("🌈","Rainbow bead patterns","Identify patterns and explain their rules.",
"A pattern can grow by the same amount. It can also follow a rule. Look at how each number changes. Then test your rule.",
"The fairy threads 3, 7, 11, 15 beads. Each time it grows by 4.",
"Make a bead or block pattern. Ask someone to find the rule.",[
Q("What comes after 5, 9, 13, 17?",["20","21","24"],1,"The rule adds 4 each time.","Find the gap between numbers."),
Q("Which rule matches 2, 6, 10, 14?",["Times 4","Add 2 each step","Add 4 each step"],2,"Each number is 4 more.","Find the gap between numbers."),
Q("What comes after 1/2, 1, 1 1/2, 2?",["2 1/2","3","2 1/4"],0,"Each step adds one half.","Find the gap between numbers."),
Q("The pattern triples: 2, 6, 18, ... What is next?",["24","54","36"],1,"18 × 3 = 54.","Times by 3."),
Q("Which rule makes 4, 7, 10, 13?",["Start at 4 and times 3","Start at 4 and take 3","Start at 4 and add 3"],2,"The gap is 3 each time.","Find the gap between numbers.")]);
T["6.maths.timetable"]=L("🚂","Fairy train timetable","Interpret departure times and calculate durations.",
"A timetable shows when trains leave and arrive. To find how long, count to the next hour. Then add the minutes left.",
"The fairy train leaves at 14:25. It is 35 minutes to 15:00. Then 10 more to 15:10. That is 45 minutes.",
"Plan a pretend train trip to a castle. Add travel and wait times.",[
Q("09:40 to 10:15 takes...",["25 minutes","35 minutes","75 minutes"],1,"20 minutes to 10:00, then 15 more.","Count to the next hour."),
Q("16:30 in 12-hour time is...",["6:30 pm","4:30 am","4:30 pm"],2,"After noon, take 12 from the hour.","Take away 12."),
Q("Leave at 11:55 and ride 50 minutes. Arrive at...",["12:45 pm","12:05 pm","1:05 pm"],0,"5 minutes to noon, then 45 more.","Count to the next hour."),
Q("Arrive 14:10. The coach leaves 14:25. How long to wait?",["25 minutes","15 minutes","35 minutes"],1,"14:25 take away 14:10 is 15.","Count on from 14:10."),
Q("Two rides of 35 and 50 minutes take...",["1 hour 15 minutes","2 hours","1 hour 25 minutes"],2,"35 + 50 = 85 minutes.","60 minutes is one hour.")]);
T["6.maths.area"]=L("🏰","Castle garden area","Calculate areas of rectangles.",
"Area is the space a flat shape covers. For a rectangle, times length by width. Area uses square units, like m².",
"The castle garden is 6 m by 4 m. 6 × 4 = 24. So the area is 24 m².",
"Measure a table or mat. Work out its area.",[
Q("Area of a 6 m × 4 m garden?",["20 m²","24 m²","10 m²"],1,"6 × 4 = 24 square metres.","Times length by width."),
Q("A 5 cm × 3 cm fairy card has area...",["8 cm²","16 cm²","15 cm²"],2,"5 × 3 = 15.","Times length by width."),
Q("A 7 m × 2 m ballroom floor has area...",["14 m²","9 m²","18 m²"],0,"7 × 2 = 14.","Times length by width."),
Q("A rug has area 30 cm² and width 5 cm. Its length is...",["25 cm","6 cm","150 cm"],1,"30 ÷ 5 = 6.","Divide the area by the width."),
Q("Which unit measures area?",["km/h","litres","m²"],2,"Area uses square units.","Look for the little 2.")]);
T["6.maths.statistics"]=L("📊","Unicorn data","Compare sets of numerical data using range and mode.",
"The mode is the number that shows up most. The range is the biggest number take away the smallest. Use them to compare groups.",
"Unicorn jumps: 2, 4, 4, 7. The mode is 4. The range is 7 - 2 = 5.",
"Count your steps each day for a week. Make a dot plot.",[
Q("What is the mode of 2, 3, 3, 5, 8?",["8","3","5"],1,"3 shows up twice.","Which number repeats?"),
Q("Range of 4, 6, 9, 12?",["12","4","8"],2,"12 - 4 = 8.","Biggest take away smallest."),
Q("Which herd has the bigger range: A = 1, 5, 9; B = 3, 4, 5?",["Herd A","Herd B","They are equal"],0,"A has range 8. B has range 2.","Find each range."),
Q("In 7, 7, 8, 8, 9, which is true?",["9 is the only mode","7 and 8 are both modes","There is one mode, 8"],1,"7 and 8 both show up twice.","Count each number."),
Q("Why compare two sets of data?",["To prove all numbers match","To skip the results","To notice differences in patterns and spread"],2,"Comparing shows how the groups differ.","What do we learn?")]);
T["6.english.objective"]=L("📜","Royal news scrolls","Find objective statements, opinions and bias.",
"A fact can be checked. An opinion is what someone thinks. Biased writing only shows one side. It may leave other views out.",
"'The castle has two towers' can be checked. 'Our castle is the best' is an opinion.",
"Read two stories about one topic. Find strong feeling words.",[
Q("Which is a fact?",["This is the best library!","The library closes at 5 pm.","Everyone loves books."],1,"A closing time can be checked.","Can you check it?"),
Q("Which phrase shows bias?",["The survey asked 80 people.","The meeting lasted an hour.","Only a fool would disagree."],2,"Insulting people who disagree shows bias.","Is it fair to everyone?"),
Q("'This game is boring' is...",["An opinion","A measurement","A timetable"],0,"'Boring' is what someone thinks.","Can you check it?"),
Q("Which question helps find bias?",["Is the title colourful?","Whose views are missing?","How long is the headline?"],1,"Missing views can show bias.","Think about other sides."),
Q("'Nine in ten fairies liked the snack' needs...",["More exclamation marks","An opinion with no data","Proof from a fair survey"],2,"Number claims need a trusted source.","How would you check it?")]);
T["6.english.persuade"]=L("📣","Royal speeches","Analyse how writers persuade their audience.",
"Persuasive writing tries to change minds. It uses a claim, reasons and evidence. It may use feeling words. Check that the evidence fits the claim.",
"'Plant shade trees' is the claim. 'Trees cool the playground' is a reason.",
"Write one claim about your garden. Add two reasons.",[
Q("Which is a persuasive claim?",["There are four trees outside.","Our kingdom should plant more trees.","The garden has a gate."],1,"'Should' asks for an action.","Look for 'should'."),
Q("What is good evidence for a health claim?",["A silly joke","The size of the poster","Results of a trusted study"],2,"Evidence must fit the claim.","Find the reasons."),
Q("What is a counterargument?",["A different view treated fairly","A spelling mistake","A repeated sentence"],0,"It looks at another side.","Think about the other side."),
Q("Which phrase uses loaded language?",["A choice on Tuesday","A disastrous choice","A choice after lunch"],1,"'Disastrous' makes strong feelings.","Find the strong feeling word."),
Q("What should a persuasive ending do?",["Add a new topic","Remove all evidence","Repeat the request and main reasons"],2,"An ending ties the claim and reasons together.","Think about the claim.")]);
T["6.english.structures"]=L("📖","Spell book layouts","Recognise how structures match the purpose of texts.",
"Different texts have different shapes. Instructions use steps. Explanations show causes and effects. Reports group facts under headings.",
"A potion recipe lists what you need. Then it gives steps in order.",
"Look at a recipe book and a story book. How are they set out?",[
Q("A potion recipe is best set out as...",["Random sentences","Ingredients then steps in order","A diary"],1,"Readers need clear steps.","What does the reader need to do?"),
Q("An explanation of floods should show...",["A shopping list","Only talking","Causes and effects"],2,"Explanations show how and why.","Think how and why."),
Q("Why use subheadings in a report?",["To group facts together","To hide facts","To stop reading"],0,"Subheadings sort the facts.","What does the reader need?"),
Q("A comparing text should explain...",["Only a made-up ending","Same and different things","A list of ingredients"],1,"Comparing looks at what is alike and different.","Think alike and different."),
Q("What does an ending often do?",["Add new facts","Remove the main idea","Bring the main points together"],2,"Endings wrap up the main points.","Think about wrapping up.")]);
T["6.english.cohesion"]=L("🔗","Fairy thread words","Link ideas clearly across sentences and paragraphs.",
"Good sentences link together like a fairy thread. Words like 'it' and 'this' point back. Linking words join ideas. They help readers follow along.",
"'The unicorn is gentle. This animal is kind to all.' Both phrases mean the unicorn.",
"Write three sentences about a pet. Link them with 'it' or 'this'.",[
Q("'The pegasus flew away. It was tired.' What is 'It'?",["The sky","The pegasus","The narrator"],1,"'It' means the pegasus.","What did 'it' point back to?"),
Q("Which word shows a different idea?",["Similarly","For example","However"],2,"'However' brings a different idea.","Which one turns the idea around?"),
Q("What fits after 'Birds nest in this forest'?",["These animals need safe nests.","My bike is blue.","Yesterday I ate pasta."],0,"'These animals' means the birds.","Stay on the same topic."),
Q("Why repeat a topic word in a report?",["To make every sentence the same","To keep the main idea clear","To stop explaining"],1,"Repeating links ideas.","Think about the main idea."),
Q("Which phrase shows a result?",["In contrast","Beforehand","As a result"],2,"'As a result' shows what happened next.","Look for 'result'.")]);
T["6.english.complex"]=L("🏰","Castle sentence builders","Understand dependent and embedded clauses.",
"A dependent clause adds extra detail. It cannot usually stand alone. A main clause is a full idea. A complex sentence joins the two. Words like because, although and which start dependent clauses.",
"'Although the moat was wide, the unicorn leapt across.' 'Although the moat was wide' is the dependent clause. 'The unicorn leapt across' is the main clause.",
"Tell a fairy story aloud. Use 'because', 'although' and 'which' once each.",[
Q("Which uses a dependent clause?",["The moon rose.","Because it rained, the fairies stayed inside.","Owls hooted."],1,"'Because it rained' needs the main clause to make sense.","Find the full idea, then the extra detail."),
Q("Which adds information about a tower?",["the tall tower","a high castle","which stood on the cliff"],2,"A 'which' clause adds extra detail about the tower.","Look for a word that links to the tower."),
Q("Complete 'Although the forest path was steep, ...'",["the princess reached the top.","because the path.","while climbing"],0,"The main clause finishes the thought.","Which one is a full idea?"),
Q("What often starts a reason clause?",["Or","And","Because"],2,"'Because' explains why something happened.","Which word answers 'why?'"),
Q("'When the bell chimed, the fairies flew home.' The dependent clause is...",["the fairies flew home","When the bell chimed","the fairies"],1,"The opening clause tells when.","Which part cannot stand alone?")]);
T["6.english.imagery"]=L("🌈","Magic word pictures","Identify figurative language and its effect.",
"A simile compares using 'like' or 'as'. A metaphor says one thing is another. Personification gives human actions to non-human things. Hyperbole is a big exaggeration. These make writing more magical.",
"'The clouds were candy floss' says clouds are candy floss. There is no 'like' or 'as'. So it is a metaphor.",
"Look out the window. Describe the sky with a simile and personification.",[
Q("Which is a simile?",["The lake was a mirror.","The lake sparkled like glass.","The lake whispered."],1,"'Like' makes a comparison.","Look for 'like' or 'as'."),
Q("Which shows personification?",["The wind blew.","The wind measured 20 km/h.","The wind whispered through the fairy trees."],2,"Whispering is a human action.","Which thing acts like a person?"),
Q("Which is a metaphor?",["The ballroom was a beehive.","The ballroom was like a beehive.","A bee flew into the ballroom."],0,"A metaphor says one thing is another.","No 'like' or 'as' here."),
Q("Which is hyperbole?",["I said it twice.","I've brushed my unicorn a million times!","I called after lunch."],1,"'A million times' is an exaggeration.","Which one could not really be true?"),
Q("Why use vivid imagery?",["To prove all facts","To remove the setting","To help readers imagine a scene"],2,"Vivid details help readers picture the scene.","Think about the reader's mind.")]);
T["6.english.infer"]=L("🔮","Crystal ball clues","Use text evidence to infer and compare meaning.",
"An inference is a smart guess. You join clues from the text with what you know. Good inferences point to real details. They are not just wild guesses.",
"'Rosa grabbed her cloak as grey clouds gathered.' Clue: cloak and clouds. So Rosa expects cold or rain.",
"Read a short fairy tale. Find three clues about how a character feels.",[
Q("'Mina packed an umbrella as clouds gathered.' She expects...",["Hot sand","Rain","Snow indoors"],1,"An umbrella and clouds suggest rain.","What are umbrellas for?"),
Q("'The castle door creaked. Ari held their breath.' Ari feels...",["Nervous","Hungry","Bored"],0,"Holding your breath after a creak shows worry.","What does holding your breath show?"),
Q("What suggests the fairy trail was muddy?",["The sun set.","The map was folded.","Boots sank into wet ground."],2,"Sinking into wet ground shows mud.","Which clue is about the ground?"),
Q("Two scrolls disagree about a flood. What should you do?",["Believe the loudest one","Compare reliable sources and evidence","Ignore the details"],1,"Checking evidence helps you understand.","Look at more than one source."),
Q("Why say 'The text suggests...'?",["To avoid reading","To prove every guess correct","To link an inference to evidence"],2,"It shows your idea comes from the text.","Think about evidence.")]);
T["6.english.styles"]=L("📖","Storybook spells","Compare how stories handle themes and style.",
"A theme is a big idea in a story. Two stories can share a theme. They may use different characters, places and moods. Compare them using real examples from each.",
"Courage can be a unicorn rescuing a foal. It can also be a princess saying sorry.",
"Pick two books about friendship. Talk about how the friends act in each.",[
Q("A theme is...",["Only the cover colour","An important idea in a story","The number of paragraphs"],1,"Themes include courage and friendship.","Think big ideas."),
Q("Two stories show friendship. What could you compare?",["Which book is heavier","The titles' letter counts","How each character shows loyalty"],2,"You compare how writers show the theme.","Think about the characters."),
Q("What shows an author's style?",["Word choice and sentence rhythm","Paper thickness","Book price"],0,"Authors have their own way with words.","Think about the writing itself."),
Q("Which creates suspense?",["There were three cupcakes.","Footsteps echoed in the empty castle hall.","A poster was on the wall."],1,"An empty, echoing hall feels tense.","Which one makes you wonder what's next?"),
Q("Why compare stories on one topic?",["To prove only one is right","To ignore the stories","To see different views and techniques"],2,"Different writers make different choices.","Think about different points of view.")]);
T["6.english.commas"]=L("🧚","Fairy comma sparkles","Use commas in complex sentences, lists and dialogue.",
"Commas help readers pause. Put one after an opening dependent clause. Use them to split items in a list. Use one before speech in quote marks.",
"'After the rain stopped, the fairies flew out.' The opening clause ends after 'stopped'. So the comma goes there.",
"Write five fairy sentences on paper. Add the commas with a coloured pencil.",[
Q("Which is punctuated correctly?",["Before, we left we packed lunch.","Before we left we, packed lunch.","Before we left, we packed lunch."],2,"The comma follows the opening clause.","Where does the opening clause end?"),
Q("Which list is punctuated correctly?",["The unicorn ate apples, carrots and oats.","The unicorn ate, apples carrots and oats.","The, unicorn ate apples carrots."],0,"Commas separate list items.","Look between the list items."),
Q("'Although it was late we kept reading.' Where does the comma go?",["After 'we'","After 'late'","After 'reading'"],1,"The opening clause ends after 'late'.","Find the end of the 'although' part."),
Q("Which dialogue is punctuated clearly?",["Sam said 'Lets go'.","Sam, said Lets go.","Sam said, 'Let's go.'"],2,"A comma can come before quoted speech.","Look before the quote marks."),
Q("'If you agree, wave your wand.' Why is the comma there?",["To separate the condition from the main clause","To mark a question","To replace a full stop"],0,"The comma ends the 'if' clause.","What does the 'if' part do?")]);
T["6.english.roots"]=L("🪄","Word spell parts","Decode and spell unfamiliar words using roots and affixes.",
"Long words are built from parts. A prefix goes at the start. A suffix goes at the end. Each part has a meaning. Knowing parts helps you read and spell.",
"'Predict' has 'pre-', meaning before. 'Rewrite' has 're-', meaning again.",
"Pick 'act' or 'port'. Make a word family on paper, like action and actor.",[
Q("Which prefix means 'before'?",["un-","pre-","dis-"],1,"Pre- often means before.","Think of 'preview'."),
Q("Which word is spelled correctly?",["neccessary","necesary","necessary"],2,"Necessary has one c and two s letters.","One collar, two sleeves."),
Q("In 'rewrite', 're-' means...",["Again","Against","Without"],0,"Rewrite means write again.","Think of 'redo'."),
Q("Which suffix turns 'create' into a noun?",["-ly","-ion","-est"],1,"Creation is a noun.","Which one makes a thing?"),
Q("Which prefix means 'not' in 'impossible'?",["pre-","re-","im-"],2,"Im- gives the word a 'not' meaning.","Look at the start of the word.")]);
T["6.english.editing"]=L("✉️","Royal letter writing","Plan and edit texts for purpose and audience.",
"Good writing suits its reader. First decide who will read it and why. Plan your paragraphs. Then edit word choice, sentences, spelling and punctuation.",
"A letter to the queen uses clear, polite reasons. A fairy story uses description and imagination.",
"Write a short plan to make a park better. Read it again and fix one thing.",[
Q("What should you decide before writing?",["Only the font colour","Audience and purpose","The fastest typing speed"],1,"Audience and purpose guide your choices.","Who reads it, and why?"),
Q("What helps organise a long explanation?",["One long sentence","Unrelated headings","Paragraphs with connected ideas"],2,"Paragraphs group ideas.","Think about grouping ideas."),
Q("Which fits a polite letter to the council?",["I would like to suggest...","You never do anything right!","Do it now!"],0,"A polite request suits the reader.","Which sounds respectful?"),
Q("Which edit adds precise description?",["The pegasus did a thing.","The pegasus darted across the sky.","It was stuff."],1,"'Darted' is a more precise verb.","Which verb paints a picture?"),
Q("Why reread a draft?",["To avoid the reader","To guarantee instant perfection","To improve clarity and find errors"],2,"Rereading makes writing stronger.","What can you catch the second time?")]);
T["6.science.habitats"]=L("🌸","Enchanted habitats","Explain how habitat conditions affect survival.",
"Living things need the right conditions. These include water, temperature and sunlight. If conditions change, living things can be affected. Growth, babies and survival can change.",
"A drought means less water in the fairy pond. Frogs and pond plants have less water to use.",
"Look at a garden spot on two days. Write down what changed.",[
Q("Which is a habitat's physical condition?",["A favourite story","Water availability","The colour of a notebook"],1,"Water affects living things.","Which one is part of nature?"),
Q("A long drought may cause wetland plants to...",["Always grow faster","Turn into animals","Have less available water"],2,"Less water may slow growth.","What does a drought take away?"),
Q("Removing shade trees can affect plants through...",["More direct sunlight","A different street name","A shorter map"],0,"Shade changes the light plants get.","What do trees block?"),
Q("Why observe over several days?",["To make all notes the same","To spot patterns and changes","To avoid evidence"],1,"Repeated looks show patterns.","What can you see over time?"),
Q("Which is a supported conclusion?",["Every frog dislikes rain.","Water never affects animals.","Fewer frogs were seen after the pond dried up."],2,"The observation and condition are linked.","Which one is based on what was seen?")]);
T["6.science.solar"]=L("🌙","Sun, moon and seasons","Distinguish rotation, revolution and axial tilt.",
"Earth spins once each day. This makes day and night. Earth also travels around the Sun once a year. Earth is tilted. The tilt and the orbit cause the seasons.",
"In December, the Southern Hemisphere tilts towards the Sun. So Australia gets longer days.",
"Use a ball and a safe lamp with an adult. Spin the ball to show day and night.",[
Q("What causes day and night?",["The Sun circling Earth each day","Earth turning on its axis","Cloud shadows alone"],1,"Spinning changes which side faces the Sun.","Daily means spinning."),
Q("What mainly explains the seasons?",["The Moon's shape","Cloud colour","Earth's tilted axis as it orbits"],2,"Tilt changes sunlight and day length.","Think about the tilt."),
Q("One orbit of the Sun takes about...",["One year","One day","One month"],0,"Earth goes around the Sun in about 365 days.","Orbits are yearly."),
Q("Why are summer days longer?",["Earth stops spinning.","Your hemisphere tilts toward the Sun.","The Moon makes extra daylight."],1,"Tilt keeps the Sun up for longer.","Which way are we leaning?"),
Q("Which is an Australian summer month?",["July","August","January"],2,"January is summer in the Southern Hemisphere.","Think of Christmas holidays.")]);
T["6.science.circuits"]=L("✨","Sparkle circuits","Explain electrical energy transfer and circuit components.",
"A circuit needs a path and an energy source, like a battery. A closed loop can power a light. Conductors let electricity flow. Insulators block it.",
"A battery torch is like a fairy lantern. It turns electrical energy into light.",
"With an adult, draw a battery, LED and switch circuit. Never use power points.",[
Q("An open switch makes the circuit...",["Create energy without a source","Stop flowing through the break","Always brighter"],1,"A break in the path stops the current.","Is the loop still joined?"),
Q("Which material conducts well?",["Dry plastic","Rubber band","Copper wire"],2,"Copper is used in electrical wires.","Which one is metal?"),
Q("An LED changes electrical energy mainly into...",["Light","Food","Gravity"],0,"An LED gives off light.","What does a lantern do?"),
Q("What insulates wires to protect them?",["Bare copper","Plastic coating","A metal key"],1,"Plastic blocks electric current.","Which one is not metal?"),
Q("What is safe for exploring circuits?",["Opening a wall socket","Connecting wires to mains power","A low-voltage kit with an adult"],2,"Small kits with an adult avoid dangerous mains power.","Think small and supervised.")]);
T["6.science.changes"]=L("🧁","Magic kitchen changes","Distinguish reversible and irreversible changes.",
"Some changes can be undone. Melting ice can freeze again. Other changes make a new substance. Cooking and rusting are like this. They are hard or impossible to undo.",
"Ice melts, then freezes again, so it is reversible. A baked fairy cake cannot turn back into batter.",
"With an adult, melt an ice cube. Then put the water back in the freezer.",[
Q("Which is reversible?",["Iron rusting","Ice melting then refreezing","Bread toasting"],1,"Melting and freezing are physical changes.","Can you get the start back?"),
Q("Which is usually irreversible?",["Freezing water","Melting an ice cube","Cooking an egg"],2,"Cooking makes lasting chemical changes.","Can a cooked egg go back?"),
Q("Sugar dissolved in water can be recovered by...",["Evaporation under safe conditions","Turning it into metal","Giving it a new name"],0,"Sugar crystals form when the water evaporates.","What if the water goes away?"),
Q("Rust forms when iron goes through...",["Only freezing","A chemical reaction","No change"],1,"Rust is a new substance.","Is something new made?"),
Q("What suggests a chemical change?",["Folding paper","Moving a cup","A new substance forming"],2,"Chemical changes make new materials.","Look for something new.")]);
T["6.hass.federation"]=L("👑","Australia becomes a nation","Understand Federation and its consequences.",
"In 1901, six British colonies joined together. They formed the Commonwealth of Australia. This changed how Australia was governed. But not all Australians had equal rights.",
"Federation made a national government. The states kept some of their own powers.",
"Draw a timeline on paper. Start at 1901 and add later rights milestones.",[
Q("Federation began in...",["1788","1901","1967"],1,"The Commonwealth formed on 1 January 1901.","Think early 1900s."),
Q("How many colonies federated?",["Three","Nine","Six"],2,"Six colonies became the first states.","Count the original states."),
Q("Federation created...",["A national government","Australia's first people","Instant equality for everyone"],0,"A national government began, but unfairness remained.","What new thing was set up?"),
Q("What is a fair history question?",["Did everyone have the same experience?","Whose rights changed and who was left out?","Can we ignore First Nations histories?"],1,"Good history looks at unequal impacts.","Think about whose voices were missing."),
Q("What makes a claim about Federation stronger?",["One unsupported statement","A random number","Comparing reliable historical sources"],2,"Sources give evidence of events.","Think evidence.")]);
T["6.hass.migration"]=L("🕊️","Migration journeys","Investigate causes and impacts of migration.",
"People move countries for family, work, study or safety. Laws and history shape these moves. Every migrant has their own story. Migrants help communities grow and change.",
"Some families move for jobs. Others move to find safety.",
"With an adult, find a shared migration story. Talk about why the family moved.",[
Q("Which is a reason people may migrate?",["A change in the alphabet","Joining their family","A longer month"],1,"Family is a reason to move.","Think about people they love."),
Q("Why compare migration stories?",["Every migrant has the same story","One voice speaks for all","People's experiences differ"],2,"Migration happens for many reasons.","Are all stories the same?"),
Q("A government law about who can enter is...",["Migration policy","A weather report","A grammar rule"],0,"Migration policies shape who can move.","Which one is a law?"),
Q("Which is a firsthand source?",["An invented rumour","A migrant's recorded interview","An unrelated cartoon"],1,"An interview shares real experience.","Who was really there?"),
Q("How can migration change a community?",["Guarantee no change","Make all cultures the same","Bring new cultural connections"],2,"Migration can add languages, food and friendships.","Think about what people bring.")]);
T["6.hass.asia"]=L("🗺️","Kingdoms of the Asia-Pacific","Identify links between Australia and other places.",
"Countries connect through trade, travel, migration, learning and culture. These links can bring good things. They can also bring challenges.",
"Food in an Australian shop may be grown in one country. Then it is shipped from another.",
"Check labels on five things at home. Find where each was made on a map.",[
Q("Which is an international connection?",["A student walking into class","Australian students sharing ideas with students in Japan","Turning a page"],1,"Student exchanges link countries.","Which one involves two countries?"),
Q("What is trade?",["A type of cloud","A form of poetry","Buying and selling goods and services"],2,"Trade moves products between places.","Think shops and money."),
Q("Which region has many of Australia's island neighbours?",["The Pacific","The Arctic","Northern Europe"],0,"Pacific countries are close neighbours.","Which one is near us?"),
Q("Tourism can lead to...",["No local changes","Income and pressure on nature","Only bad effects"],1,"Tourism has benefits and costs.","Look for good and bad together."),
Q("Which evidence shows international connections?",["An unrelated joke","A shop sign colour","Migration and trade data"],2,"Movement of people and goods can be measured.","Which one can be counted?")]);
T["6.hass.government"]=L("🏛️","Kingdom of democracy","Explore democratic values and government responsibilities.",
"Australia is a representative democracy. Parliament makes laws. The government carries them out. Courts interpret them. Local, state and federal governments do different jobs.",
"Councils collect rubbish. States run public schools. The federal government manages immigration.",
"Make a chart on paper. Sort jobs into local, state and federal.",[
Q("Representative democracy means...",["Only one person decides laws","People elect representatives","Every voter makes every law"],1,"Citizens choose representatives in elections.","Think about voting."),
Q("Local rubbish collection is usually run by...",["Only federal government","The United Nations","Local government"],2,"Councils handle many local services.","Who looks after your street?"),
Q("Immigration is mainly a job for the...",["Federal government","School principal","Local sports club"],0,"The federal government sets immigration law.","Which level handles the whole country?"),
Q("A court's main job includes...",["Running every school","Interpreting and applying law","Writing all laws alone"],1,"Courts decide legal cases.","Think about judges."),
Q("Rule of law means...",["Leaders can ignore laws","Only children follow laws","Leaders and citizens must follow laws"],2,"Laws apply to everyone, even leaders.","Does anyone get to skip the rules?")]);
T["6.hass.economics"]=L("💰","Treasure choices","Consider resources and responsible consumer decisions.",
"People have limited money and resources. They choose based on needs, price, ads and the planet. Every choice gives something up. This is a trade-off.",
"A reusable bottle may cost more at first. But you buy fewer plastic bottles later.",
"Compare two things at home. Think about price, use and waste.",[
Q("Which is usually a need?",["A collectible unicorn toy","Safe drinking water","A fancy logo"],1,"Water is needed for health.","What can't you live without?"),
Q("What should buyers compare?",["Only bright packaging","Only an ad slogan","Price, use and how long it lasts"],2,"Useful details help you decide.","Think beyond how it looks."),
Q("Advertising often aims to...",["Influence what people buy","Prove every claim is true","Stop all spending"],0,"Ads try to persuade.","Why do shops make ads?"),
Q("Why might being repairable matter?",["Nothing will ever break","It can cut waste and last longer","It makes everything free"],1,"Repairs keep things useful longer.","What happens when you fix something?"),
Q("A trade-off means...",["Having unlimited treasure","All options are equal","Giving up one good thing to get another"],2,"Choices mean picking between good things.","What do you give up?")]);
T["6.technologies.computer"]=L("📱","Inside the magic tablet","Identify major components of a digital system.",
"The processor follows instructions. Memory holds what you are doing now. Storage keeps your files. Touchscreens, microphones and speakers bring information in and out.",
"You tap a tablet screen. The processor works out what to do. The display shows the result.",
"Draw a tablet on paper. Label processor, memory, input, output and storage.",[
Q("A processor mainly...",["Stores paper books","Carries out instructions","Makes a case bigger"],1,"The processor follows instructions.","Think of the tablet's brain."),
Q("What keeps files when a device turns off?",["Only working memory","A touchscreen's glass","Storage"],2,"Storage keeps saved data.","Where do saved things live?"),
Q("A touchscreen is...",["An input and output surface","Only a battery","A network cable"],0,"Touch goes in and the display shows output.","You tap it and you see it."),
Q("RAM holds...",["Printed pages","Information being used now","An outside case"],1,"Working memory helps tasks running now.","Think 'right now'."),
Q("A tablet battery...",["Stores the whole internet","Replaces the processor","Supplies electrical energy"],2,"Batteries power the device.","What keeps it running?")]);
T["6.technologies.binary"]=L("💡","Fairy light codes","Represent data using binary states.",
"Binary uses only 0 and 1. Think of fairy lights: on is 1, off is 0. Patterns of these show numbers, pictures and words. Four binary place values are 8, 4, 2 and 1.",
"101 in binary: 4 is on, 2 is off, 1 is on. 4 + 0 + 1 = 5.",
"Draw four fairy lights labelled 8, 4, 2, 1. Colour some on and add them up.",[
Q("Binary uses which digits?",["2 and 3","0 and 1","A and B"],1,"Binary uses only two digits.","Think on and off."),
Q("Binary 10 is what in decimal?",["10","1","2"],2,"A 1 in the twos place means 2.","Which place is the 1 in?"),
Q("Binary 101 equals...",["5","7","3"],0,"4 + 0 + 1 = 5.","Add the lights that are on."),
Q("An off light can be shown as...",["2","0","9"],1,"Off is shown as zero.","Off means nothing."),
Q("Binary 111 equals...",["3","11","7"],2,"4 + 2 + 1 = 7.","All three lights are on.")]);
T["6.technologies.code-loops"]=L("🦄","Unicorn quest code","Design algorithms with decisions and repetition.",
"An algorithm is step-by-step instructions. IF statements choose between actions. Loops repeat actions. Variables hold values that can change.",
"IF it rains, bring a raincoat. OTHERWISE, take a sunhat.",
"Write rules for a unicorn collecting three crystals. Use a counter to keep track.",[
Q("IF statements are used to...",["End every program","Choose based on a condition","Draw unrelated pictures"],1,"IF creates different paths.","Think 'if this, then that'."),
Q("Which instruction repeats an action?",["Stop now","Write once","Repeat five times"],2,"A loop repeats actions.","Which word means again and again?"),
Q("Why use a loop to draw six stars?",["To avoid writing the same steps six times","To stop errors forever","To change screen size"],0,"Loops cut out repeated steps.","Think about saving work."),
Q("A variable is...",["A sticker that never changes","A named value that can change","A tablet case"],1,"Variables keep track of values.","Its value can vary."),
Q("How do you test an algorithm?",["Assume it always works","Delete the instructions","Try different inputs and check results"],2,"Testing finds problems.","Try it out lots of ways.")]);
T["6.technologies.footprint"]=L("🛡️","Fairy footprints online","Understand digital footprints and personal privacy.",
"What you do online can leave a trail. Think before sharing personal details. Use a long, different passphrase for each account. Ask before sharing someone else's photo.",
"Your home address is personal information. A long, unique passphrase helps keep an account safe.",
"Sit with a trusted adult. Look at what an app asks for, and talk about why.",[
Q("A digital footprint is...",["A sandy shoe print","Information left by online activity","A mouse cursor"],1,"Online actions can leave records.","Think about trails online."),
Q("Why use a different passphrase for each account?",["So passwords can be public","To stop updates","If one account is hacked, the others stay safer"],2,"Reusing passwords puts more accounts at risk.","What if one gets found out?"),
Q("What should not be posted publicly?",["Your home address","A story about a unicorn","A picture of a fairy island"],0,"A home address is private.","Which one shows where you live?"),
Q("Before sharing someone's photo, you should...",["Post it straight away","Ask permission, and an adult if needed","Send it to strangers"],1,"Asking first respects privacy.","How would you want to be treated?"),
Q("What is safest to believe about online posts?",["Deleted posts can never be copied","No one can take screenshots","Copies may remain after deleting"],2,"Online information can stay around.","Can someone save it first?")]);
window.PEBBLE_THEMES=window.PEBBLE_THEMES||{};
window.PEBBLE_THEMES[0]=Object.assign(window.PEBBLE_THEMES[0]||{},T);
})();
