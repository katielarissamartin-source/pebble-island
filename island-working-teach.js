(function(){
"use strict";
const ODD="Which one doesn't belong? Look carefully!|";
const PUN="Which sentence has the capital letters and full stop in the right places?|";
window.PEBBLE_IW_TEACH={
 [ODD+"🚗"]:["Apple, banana and grapes are all fruit.","A car is not a fruit.","So the car is the odd one out."],
 [ODD+"🐟"]:["Dog, cat and cow live on land.","A fish lives in water.","So the fish is the odd one out."],
 [ODD+"🍕"]:["You can draw with a pencil, a crayon and a pen.","You can't draw with pizza.","So the pizza is the odd one out."],
 [ODD+"✈️"]:["Car, bus and bike go on the road.","A plane flies in the sky.","So the plane is the odd one out."],
 [ODD+"7"]:["2, 4 and 8 are even.","7 is odd.","So 7 is the odd one out."],
 [ODD+"🔵"]:["The triangle and the two squares have corners.","The circle has no corners.","So the circle is the odd one out."],
 [ODD+"🍔"]:["Sun, rain and snow are all weather.","A burger is food, not weather.","So the burger is the odd one out."],
 [ODD+"35"]:["10, 20 and 40 all end in 0.","35 ends in 5.","So 35 is the odd one out."],
 [ODD+"🐘"]:["Bee, butterfly and ladybird are all bugs.","An elephant is not a bug.","So the elephant is the odd one out."],
 [ODD+"🍦"]:["Carrot, broccoli and corn are vegetables.","Ice cream is not a vegetable.","So the ice cream is the odd one out."],

 "Listen. Milo the puppy found a red ball in the garden. He ran to show Sam. Sam threw the ball and Milo chased it. What colour was the ball?":["Find the part about the ball.","It says: a red ball.","So the ball was red."],
 "Listen. Zara packed her bag for the beach. She took a hat, a towel and a bucket. She was so excited to build a sandcastle. What did Zara want to build?":["Find the word build.","It says: to build a sandcastle.","So Zara wanted to build a sandcastle."],
 "Listen. It was raining, so Leo stayed inside. He built a big tower with blocks. Then his sister knocked it over by mistake. Why did Leo stay inside?":["Find the word so.","It says: It was raining, so Leo stayed inside.","So he stayed inside because it was raining."],
 "Listen. The koala slept in the gum tree all day. At night it woke up and ate leaves. Koalas sleep for a very long time. When did the koala eat?":["Find the part about eating.","It says: At night it woke up and ate leaves.","So the koala ate at night."],
 "Listen. Mia lost her tooth at school. She put it under her pillow. In the morning she found a shiny gold coin. Where did Mia put her tooth?":["Find the part about the tooth.","It says: She put it under her pillow.","So the tooth went under her pillow."],
 "Listen. Ben's kite got stuck in a tree. He felt grumpy. His dad got a ladder and helped him get it down. Ben smiled again. How did Ben feel when the kite got stuck?":["Find the part about the kite in the tree.","It says: He felt grumpy.","So Ben felt grumpy."],

 "I have blank dogs. Which spelling is right?":["two means the number 2.","I have 2 dogs.","So it is two."],
 "We are going blank the park. Which spelling is right?":["to tells us where we are going.","We are going to the park.","So it is to."],
 "Can I come blank? Which spelling is right?":["too can mean also.","Can I come as well?","So it is too."],
 "The cat licked blank paw. Which spelling is right?":["The paw belongs to the cat.","its means it owns something.","So it is its, with no apostrophe."],
 "blank coming to my party. Which spelling is right?":["They're is short for they are.","They are coming to my party.","So it is They're."],
 "Put the box over blank. Which spelling is right?":["there means a place.","Put the box over in that place.","So it is there."],
 "I blank a big dog. Which spelling is right?":["saw means I looked with my eyes.","sore means it hurts.","So it is saw."],
 "The wind blank hard. Which spelling is right?":["blew is what the wind did.","blue is a colour.","So it is blew."],
 "My shirt is blank. Which spelling is right?":["blue is a colour.","blew is what the wind does.","So it is blue."],
 "I can blank the ocean. Which spelling is right?":["see means look with your eyes.","sea is the ocean.","So it is see."],

 "Yesterday I blank to the park. Which word fits?":["Yesterday means it already happened.","Past words often end in ed.","Yesterday I walked to the park."],
 "Right now she is blank. Which word fits?":["Right now means it is happening now.","After is, we use the ing word.","Right now she is jumping."],
 "Last night we blank a movie. Which word fits?":["Last night already happened.","Past words often end in ed.","Last night we watched a movie."],
 "Tomorrow I will blank my bike. Which word fits?":["Tomorrow has not happened yet.","After will, we use the plain word.","Tomorrow I will ride my bike."],
 "Every day he blank his teeth. Which word fits?":["Every day means it happens again and again.","For he, we add es to brush.","Every day he brushes his teeth."],
 "Last week they blank a cake. Which word fits?":["Last week already happened.","Past words often end in ed.","Last week they baked a cake."],

 [PUN+"My dog is called Max."]:["A sentence starts with a capital letter: My.","Names start with a capital too: Max.","It ends with a full stop.","So it is: My dog is called Max."],
 [PUN+"We went to Melbourne on Sunday."]:["Start with a capital: We.","Places and days get capitals: Melbourne, Sunday.","End with a full stop.","So it is: We went to Melbourne on Sunday."],
 [PUN+"Where is my hat?"]:["Start with a capital: Where.","It asks something, so it ends with a question mark.","So it is: Where is my hat?"],
 [PUN+"Wow, that is amazing!"]:["Start with a capital: Wow.","It is a big feeling, so it ends with an exclamation mark.","So it is: Wow, that is amazing!"],
 [PUN+"Ivy and Hayden like pizza."]:["Start with a capital: Ivy.","Names get capitals: Ivy and Hayden.","End with a full stop.","So it is: Ivy and Hayden like pizza."],

 "Sam has an umbrella and wet boots. What is the weather like?":["Clue: Sam has an umbrella.","Clue: his boots are wet.","We use umbrellas when it rains. So it is rainy."],
 "Lily is yawning and rubbing her eyes. How does Lily feel?":["Clue: Lily is yawning.","Clue: she is rubbing her eyes.","We do that when we are tired. So Lily is tired."],
 "There are candles, balloons and a big cake. What is happening?":["Clue: candles and balloons.","Clue: a big cake.","These are for a birthday party."],
 "Jack's plate is empty and he is smiling. Did Jack like his dinner?":["Clue: Jack's plate is empty.","Clue: he is smiling.","He ate it all and smiled. So yes, he liked it."],
 "The dog is wagging its tail and jumping up. How does the dog feel?":["Clue: the tail is wagging.","Clue: the dog is jumping up.","Dogs do this when they are happy."],
 "Everyone is wearing coats, beanies and gloves. What is the weather like?":["Clue: coats, beanies and gloves.","We wear these to keep warm.","So the weather is cold."],
 "The milk smells funny and is lumpy. What has happened to the milk?":["Clue: the milk smells funny.","Clue: it is lumpy.","Old milk does this. It has gone off."],

 "Mia leaves her ice cream in the hot sun. What will probably happen next?":["The sun is hot.","Ice cream melts when it gets warm.","So it will melt."],
 "The block tower is very tall and wobbly. What will probably happen next?":["The tower is tall and wobbly.","Wobbly things are not steady.","So it might fall over."],
 "Dark grey clouds are filling the sky. What will probably happen next?":["The clouds are dark and grey.","Dark clouds often bring rain.","So it will rain."],
 "Tom forgot to water his plant for two weeks. What will probably happen next?":["Plants need water to live.","Tom forgot to water it for two weeks.","So the plant will droop."],
 "Zoe drops a glass on the hard floor. What will probably happen next?":["Glass can break easily.","The floor is hard.","So it might break."],
 "Leo hasn't eaten anything since breakfast and it's dinnertime. What will probably happen next?":["Leo has not eaten since breakfast.","Now it is dinnertime. That is a long time.","So he will be very hungry."],

 "Dogs have four legs. Is that a fact or an opinion?":["Can we check it? Yes. Count a dog's legs.","Things we can check are facts.","So it is a fact."],
 "Dogs are the best pets. Is that a fact or an opinion?":["Best is what someone thinks.","Other people may like cats best.","So it is an opinion."],
 "Melbourne is in Australia. Is that a fact or an opinion?":["Can we check it? Yes, on a map.","So it is a fact."],
 "Pizza is the yummiest food. Is that a fact or an opinion?":["Yummiest is what someone feels.","Not everyone thinks the same.","So it is an opinion."],
 "Ice is cold. Is that a fact or an opinion?":["Can we check it? Yes. Touch some ice.","So it is a fact."],
 "Maths is boring. Is that a fact or an opinion?":["Boring is a feeling.","Some people love maths.","So it is an opinion."],
 "A week has seven days. Is that a fact or an opinion?":["Can we check it? Yes. Count the days.","Monday to Sunday is 7 days.","So it is a fact."],
 "Blue is the prettiest colour. Is that a fact or an opinion?":["Prettiest is what someone thinks.","Other people like a different colour.","So it is an opinion."],
 "Koalas eat gum leaves. Is that a fact or an opinion?":["Can we check it? Yes. Watch a koala eat.","So it is a fact."],
 "Winter is the worst season. Is that a fact or an opinion?":["Worst is what someone feels.","Some people love winter.","So it is an opinion."],

 "Listen. Ava looked out the window and frowned. She put on her raincoat instead of her sunhat. What was the weather like?":["Clue: she frowned at the window.","Clue: she chose a raincoat, not a sunhat.","So the weather was rainy."],
 "Listen. Noah's tummy rumbled loudly. He kept looking at the clock. Lunch was in ten minutes. How was Noah feeling?":["Clue: his tummy rumbled.","Clue: he kept looking at the clock for lunch.","So Noah was hungry."],
 "Listen. Grace practised her song every day for a month. At the concert she sang without one mistake. Why did Grace sing so well?":["Clue: she practised every day for a month.","Practice helps us get better.","So she sang well because she practised a lot."],
 "Listen. Ruby hugged her old teddy and wouldn't let go. Her family was moving to a new house tomorrow. How might Ruby feel about moving?":["Clue: she hugged her teddy and would not let go.","Clue: she was moving tomorrow.","So Ruby might feel worried."],
 "Listen. Oscar tiptoed past his baby sister's room and shut the door very slowly. Why did Oscar tiptoe?":["Clue: he walked past the baby's room.","Clue: he shut the door very slowly.","He was quiet so he didn't wake the baby."],

 "Tom says 6 + 6 = 66. Is that right?":["Tom put 6 and 6 side by side.","But 6 + 6 means add.","6 + 6 = 12. So no, it's 12."],
 "Lily says a square has 3 sides. Is that right?":["Count the sides of a square.","1, 2, 3, 4.","No, it has 4."],
 "Max says ½ is smaller than ¼ because 2 is smaller than 4. Is that right?":["Cut one pizza into 2. Cut one into 4.","Fewer pieces means bigger pieces.","No, ½ is bigger."],
 "Ella says 40 is an odd number. Is that right?":["40 ends in 0.","Numbers that end in 0 are even.","No, it's even."],
 "Ben says 3 × 4 is 7. Is that right?":["Ben added: 3 + 4 = 7.","But × means groups. 3 groups of 4.","4, 8, 12. No, it's 12."],
 "Jess says Monday comes after Tuesday. Is that right?":["The week goes Monday, then Tuesday.","So Monday is first.","No, it comes before."]
};
})();
