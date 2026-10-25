(function(){
"use strict";
const B=window.PEBBLE_QCAA_LESSONS;if(!B)return;
const rows=[
[0,"maths","numbers","Number explorers","🔢","AC9MFN01","Count and order numbers from 0 to 20.","Numbers tell us how many things we have. Count each object once, and the last number is the total.","If you count four shells: 1, 2, 3, 4, there are four shells.","Count five objects at home. Then count one more.","Say the counting numbers in order.",[
["What number comes after 7?","8","6","10","Counting one more after 7 gives 8."],
["Which number comes between 11 and 13?","12","14","10","12 sits between 11 and 13."],
["How many shells? 🐚 🐚 🐚 🐚","4","3","5","Each of the four shells gets one count."]]],
[0,"maths","compare","More or fewer?","⚖️","AC9MFN03","Compare groups using counting.","A group with more objects has a bigger quantity. You can count both groups to compare.","Three pebbles are fewer than five pebbles.","Put two groups of toys side by side. Which has more?","Count both groups, then compare totals.",[
["Which group has more: 6 birds or 4 birds?","6 birds","4 birds","They are equal","Six is greater than four."],
["Which group has fewer: 2 frogs or 5 frogs?","2 frogs","5 frogs","They are equal","Two is smaller than five."],
["Compare 4 apples and 4 oranges. There are...","Equal amounts","More apples","More oranges","Four is the same total as four."]]],
[0,"maths","parts","Parts make a whole","🧩","AC9MFN04","Split a number into two parts.","You can make one number by putting two smaller groups together. This is called part–part–whole.","Three red blocks and two blue blocks make five blocks.","Build 6 using two different colours of blocks.","Add the two groups to see the whole.",[
["2 shells and 3 shells make how many?","5","4","6","Two and three together make five."],
["One way to make 6 is 4 and...","2","3","1","Four plus two makes six."],
["If 5 is 2 and another part, the other part is...","3","4","2","Two and three make five."]]],
[0,"maths","patterns","Pattern detectives","🟠","AC9MFA01","Recognise and continue repeating patterns.","A repeating pattern has a unit that comes around again, such as red, blue, red, blue.","A B A B means the next letter is A.","Make a pattern with socks or blocks.","Find the smallest repeating chunk.",[
["What is next? 🔴 🔵 🔴 🔵 ...","🔴","🔵","🟢","Red and blue repeat together."],
["Finish the pattern: star, moon, star, moon, ...","star","sun","moon","The two-word pattern begins again with star."],
["What comes next? 1, 2, 1, 2, ...","1","3","2","The pattern alternates 1 and 2."]]],
[0,"english","rhyming","Rhyme time","🎵","AC9EFLY09","Hear sounds that match at the ends of words.","Rhyming words end with similar sounds. Cat rhymes with hat, even though they start differently.","Say cat and hat aloud. Listen to the matching -at sound.","Say three words that rhyme with sun.","Listen to the ending sounds.",[
["Which word rhymes with cat?","hat","dog","cup","Cat and hat end in the same sound."],
["Which word rhymes with tree?","bee","tap","fish","Tree and bee share the long ee sound."],
["Which word rhymes with sun?","fun","sit","map","Sun and fun have a matching ending sound."]]],
[0,"english","sounds","First sounds","👂","AC9EFLY10","Hear the first sound in a simple word.","Words are made of speech sounds. We can listen for the first sound of a word.","Say sun slowly. The first sound is /s/.","Think of a word that begins with the same sound as moon.","Say the word slowly and listen at the start.",[
["What is the first sound in map?","/m/","/p/","/t/","Map starts with the /m/ sound."],
["Which word starts with the /s/ sound?","sun","dog","pen","Sun begins with /s/."],
["Which two words begin with the same sound?","moon and mouse","sun and cat","hat and dog","Moon and mouse both start with /m/."]]],
[0,"english","blend","Blend the sounds","🔤","AC9EFLY10","Put sounds together to say words.","When we blend speech sounds, we push them together to make a word.","Say /c/ /a/ /t/ close together: cat.","Ask someone to say /s/ /u/ /n/. Blend the sounds.","Say the sounds in order, a little faster.",[
["Blend /m/ /a/ /p/. Which word?","map","mop","man","The sounds /m/ /a/ /p/ make map."],
["Blend /s/ /u/ /n/. Which word?","sun","sit","sonic","Those three sounds make sun."],
["Blend /p/ /e/ /n/. Which word?","pen","pan","pin","The middle /e/ sound makes pen."]]],
[0,"english","story","Story clues","📖","AC9EFLE03","Recognise characters, settings and events.","A character is someone in a story. A setting is where it happens. An event is something that happens.","'The koala climbed a tree.' Koala is the character and the tree is part of the setting.","Tell someone a tiny story with a character, setting and event.","Think: who, where, and what happened?",[
["In 'Ava found a shell on the beach', who is the character?","Ava","The beach","The sky","Ava is the person in the sentence."],
["Where is the setting? 'A bird flew above the lake.'","At the lake","In a shop","On the Moon","The lake tells us where it happens."],
["Which is an event in 'Ben opened the box'?","Ben opened the box","Ben is a boy","A box is an object","An event is something that happened."]]],
[1,"maths","numbers","Counting to 120","🔢","AC9M1N01","Recognise and order larger numbers.","Counting continues beyond 20. We can use number charts and number lines to see order.","After 49 comes 50; after 99 comes 100.","Count by ones from 36 up to 45.","One more means the next counting number.",[
["Which comes after 59?","60","58","69","The next number after 59 is 60."],
["Which is greatest: 73, 37 or 70?","73","37","70","73 is greater than 70 and 37."],
["Which number is before 100?","99","101","90","99 comes immediately before 100."]]],
[1,"maths","tens","Tens and ones","🧱","AC9M1N02","Understand two-digit place value.","Ten ones can be grouped into one ten. A two-digit number tells us how many tens and ones.","34 means 3 tens and 4 ones: 30 plus 4.","Make 2 tens and 5 ones using small objects.","Look at the left digit for tens.",[
["What is 4 tens and 2 ones?","42","24","402","Four tens is 40; plus 2 is 42."],
["How many tens are in 56?","5","6","56","The 5 in 56 stands for five tens."],
["Which split makes 73?","70 + 3","7 + 3","30 + 7","Seven tens and three ones make 73."]]],
[1,"maths","adding","Add and take away","➕","AC9M1N04","Solve addition and subtraction up to 20.","Adding puts groups together. Subtracting takes a group away. Counting on and back can help.","9 + 3 is 12. Start at 9 and count 10, 11, 12.","Make 10 with beads, then take away 4.","Try counting on for adding and backwards for taking away.",[
["What is 8 + 5?","13","12","14","Eight plus five is thirteen."],
["What is 16 - 6?","10","11","9","Sixteen minus six leaves ten."],
["If you have 7 stickers and get 4 more, how many?","11","10","12","Seven plus four is eleven."]]],
[1,"maths","skip","Skip-count patterns","🐾","AC9M1A01","Count in twos, fives and tens.","Skip counting jumps the same amount each time. It helps count groups efficiently.","2, 4, 6, 8 counts by twos.","Count 5, 10, 15, 20 with fingers.","Look at the size of each jump.",[
["What is next? 2, 4, 6, 8, ...","10","9","12","Add two to 8 to get 10."],
["Count by fives: 5, 10, 15, ...","20","16","25","Fifteen plus five is twenty."],
["Count by tens: 30, 40, 50, ...","60","55","70","The number grows by ten each time."]]],
[1,"english","digraphs","Two letters, one sound","🔠","AC9E1LY11","Read common consonant digraphs.","Some pairs of letters stand for a single sound. Sh, ch and th are common examples.","Ship starts with sh. Chair starts with ch.","Find three words containing sh, ch or th.","Listen for the sound made by the letter pair.",[
["Which word begins with the /sh/ sound?","ship","cat","thin","The sh in ship makes /sh/."],
["Which word begins with the /ch/ sound?","chair","fish","sun","Chair begins with the /ch/ sound."],
["Which word includes the letters th?","thin","ship","chat","Thin begins with the letters th."]]],
[1,"english","sentence","Sentence punctuation","✏️","AC9E1LA10","Use capital letters and ending punctuation.","A written sentence usually starts with a capital letter and ends with a full stop, question mark or exclamation mark.","'Where is my hat?' is a question, so it ends with a question mark.","Write a question and a statement about a pet.","Read the sentence and ask if it tells, asks or exclaims.",[
["Which sentence is written correctly?","The cat sleeps.","the cat sleeps","The cat sleeps","A statement starts with a capital and ends with a full stop."],
["Which mark ends a question?","?","!",";","A question mark shows the sentence asks something."],
["Which sentence asks something?","Where are we going?","We are going home.","The birds sing.","A question asks for an answer."]]],
[1,"english","retell","Beginning, middle, end","📚","AC9E1LE03","Retell a simple story in order.","Stories usually have a beginning that introduces things, events in the middle and an ending.","'Jo lost a kite, looked for it, then found it.' That is a beginning, middle and end.","Tell a short story in three sentences.","Look for what starts the events and what happens last.",[
["Which event should come first?","Mia plants a seed","A flower blooms","Mia picks a flower","Planting the seed begins the sequence."],
["'The dog ran away, Sam searched, Sam found the dog.' What happens last?","Sam finds the dog","The dog runs away","Sam starts searching","The ending tells how things worked out."],
["Which is a story character?","A brave rabbit","Under a bridge","Yesterday afternoon","The rabbit is someone in the story."]]],
[1,"english","nouns","Nouns and verbs","📝","AC9E1LA07","Spot naming words and action words.","Nouns name people, places, animals and things. Verbs describe actions or states.","In 'The bird flies', bird is a noun and flies is a verb.","Pick three objects and say what each can do.","Ask what is being named and what happens.",[
["Which word is a noun?","bicycle","jump","quickly","Bicycle is the name of a thing."],
["Which word is a verb?","dance","table","blue","Dance describes an action."],
["In 'The puppy runs', which word tells the action?","runs","puppy","the","Runs is the verb."]]],
[2,"maths","to1000","Numbers to 1000","🔟","AC9M2N01","Read and order numbers up to 1000.","Hundreds, tens and ones tell us the value of each digit. Compare the hundreds first.","407 is 4 hundreds, 0 tens and 7 ones.","Make a three-digit number using hundreds, tens and ones.","Compare the hundreds before the other digits.",[
["Which is greatest: 540, 504 or 450?","540","504","450","Both 540 and 504 have 5 hundreds; 540 has more tens."],
["Which number is 3 hundreds, 2 tens and 6 ones?","326","362","236","300 + 20 + 6 = 326."],
["Which number comes just after 699?","700","698","690","One more than 699 is 700."]]],
[2,"maths","regroup","Place-value puzzles","🧮","AC9M2N02","Rename numbers as hundreds, tens and ones.","A hundred is ten tens. You can rename a number into different groups without changing its value.","130 is 1 hundred and 3 tens, or 13 tens.","Represent 120 using groups of 10.","Ten tens make one hundred.",[
["How many tens equal 100?","10","5","100","There are ten groups of ten in a hundred."],
["What is 200 + 40 + 3?","243","234","423","Add each place-value part to make 243."],
["In 405, the zero means...","0 tens","0 ones","0 hundreds","The middle position is the tens place."]]],
[2,"maths","facts","Add and subtract facts","➖","AC9M2A02","Use addition facts to help subtraction.","Addition and subtraction undo one another. If 7 + 5 = 12, then 12 - 5 = 7.","Think of three numbers that form a fact family.","Make an addition and subtraction family with 8, 4 and 12.","Check by doing the opposite operation.",[
["If 9 + 6 = 15, what is 15 - 6?","9","6","8","Subtracting six undoes adding six."],
["What is 13 - 8?","5","6","4","Eight plus five is thirteen."],
["Which fact proves 18 - 7 = 11?","11 + 7 = 18","11 - 7 = 18","18 + 7 = 11","An addition fact can check a subtraction answer."]]],
[2,"maths","fractions","Halves and quarters","🍕","AC9M2N03","Recognise equal parts of a whole.","A half is one of two equal parts. Split each half again to get four quarters.","Cut a paper circle into four equal pieces. Each piece is one quarter.","Fold paper into two equal parts, then four.","Equal parts must have the same size.",[
["How many quarters make one whole?","4","2","8","Four quarters fit together to form one whole."],
["Which is larger for the same-sized pizza?","One half","One quarter","They are equal","A half is two quarters, so it is larger."],
["If two quarters are shaded, what fraction is shaded?","One half","One quarter","One whole","Two out of four equal parts is one half."]]],
[2,"english","characters","Character clues","🎭","AC9E2LY05","Use story clues to understand characters.","A reader can use what characters say or do to work out how they might feel.","'Zara smiled when she saw her friend.' This suggests Zara was pleased.","Read a story and find a clue to a character feeling.","Look at the action as evidence.",[
["'Ben hid behind the door during the storm.' How might Ben feel?","Frightened","Bored","Hungry","Hiding from a storm suggests he might be frightened."],
["'Ari shared her snack with a friend.' Which trait fits?","Generous","Careless","Cruel","Sharing can show generosity."],
["'Mo cheered when the team scored.' Mo probably feels...","Excited","Sleepy","Angry","Cheering is a clue that Mo feels excited."]]],
[2,"english","compound","Join two ideas","🔗","AC9E2LA06","Recognise compound sentences.","A compound sentence joins two complete ideas, often with and, but or so.","'The rain stopped, and we played outside.' Both parts make sense.","Join two ideas about your day with but.","Check that both parts can stand as sentences.",[
["Which word best joins: 'I wanted to play, ___ it was raining.'","but","because","under","But shows a contrast between the ideas."],
["Which sentence has two complete ideas?","I read a book, and Dad cooked.","Because in the kitchen","At the garden","Both parts of the first sentence make sense alone."],
["Choose the best join: 'It was cold, ___ I wore a jumper.'","so","or","than","So shows the result of the cold weather."]]],
[2,"english","purpose","Why was it written?","📰","AC9E2LY03","Recognise different text purposes.","Some texts entertain with stories. Others inform with facts. Persuasive texts try to convince us.","A poster saying 'Please recycle paper!' tries to persuade.","Find a text that informs and a story that entertains.","Ask if the author wants to entertain, inform or persuade.",[
["A fact sheet about frogs is mainly written to...","Inform","Entertain with a made-up story","Persuade you to buy shoes","Fact sheets provide information."],
["A story about a dragon is mainly written to...","Entertain","List bus times","Give a weather warning","Imaginative stories are often for enjoyment."],
["A poster saying 'Save water!' is mainly trying to...","Persuade","Measure distance","Retell a fairy tale","The poster encourages readers to act."]]],
[2,"english","wordparts","Word families","🔎","AC9E2LY12","Use smaller word parts to read new words.","A base word can gain endings such as -s, -ed or -ing. Look for the part you already know.","Jump becomes jumped when we add -ed.","Make a word family with play.","Spot the base word inside the longer word.",[
["What is the base word in playing?","play","ing","laying","Playing is play with the ending -ing."],
["Which word means the action happened before now?","walked","walking","walks","The ending -ed can show past time."],
["Which is the plural of book?","books","booked","booking","Add -s to show more than one book."]]]
];
function make(row){
 const [year,area,id,title,icon,code,goal,teach,example,tryIt,hint,items]=row;
 const lessons=B[year]||(B[year]={});
 const list=lessons[area]||(lessons[area]=[]);
 if(list.some(l=>l.id===id))return;
 const questions=items.map(([prompt,correct,w1,w2,explain])=>({prompt,choices:[correct,w1,w2],correct:0,explain,hint}));
 list.push({id,title,icon,code,goal,teach,example,tryIt,questions,unit:area==="maths"?"Numeracy foundation":"Literacy foundation",learningStage:"pilot",estimatedMinutes:5});
}
rows.forEach(make);
window.PEBBLE_PATHWAY_VERSION="2026.10.23-1";
})();