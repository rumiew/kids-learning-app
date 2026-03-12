/* ═══════════════════════════════════════════════
   LEARNQUEST DATA — Grade 1→5 Content
═══════════════════════════════════════════════ */

// ─── WORLD DEFINITIONS ─────────────────────────
const WORLDS = [
  { id:'words',     icon:'📚', name:'Word Valley',      grade:1, unlock:0,  color:'teal',     desc:'Learn new words & meanings' },
  { id:'spelling',  icon:'✏️', name:'Spelling Harbor',  grade:1, unlock:0,  color:'orange',   desc:'Spell words correctly' },
  { id:'sentences', icon:'💬', name:'Sentence City',    grade:1, unlock:4,  color:'purple',   desc:'Build amazing sentences' },
  { id:'reading',   icon:'📖', name:'Reading River',    grade:2, unlock:8,  color:'blue',     desc:'Read stories & understand them' },
  { id:'math',      icon:'🔢', name:'Math Mountain',    grade:1, unlock:0,  color:'red',      desc:'Numbers, adding & word problems' },
  { id:'concepts',  icon:'🧠', name:'Think Land',       grade:1, unlock:4,  color:'green',    desc:'Heavy/light, big/small & more' },
  { id:'grammar',   icon:'🖊️', name:'Grammar Garden',  grade:2, unlock:10, color:'pink',     desc:'Nouns, verbs, adjectives & more' },
  { id:'science',   icon:'🔬', name:'Science Station',  grade:3, unlock:16, color:'cyan',     desc:'Plants, animals, weather & more' },
  { id:'creative',  icon:'✍️', name:'Creative Cove',   grade:3, unlock:14, color:'yellow',   desc:'Write stories & poems' },
  { id:'geography', icon:'🌍', name:'Geography Grove',  grade:4, unlock:22, color:'dkgreen',  desc:'Countries, maps & oceans' },
];

// ─── VOCABULARY — 80 words across grades 1–5 ────
const WORDS = [
  // Grade 1
  { word:'apple',    emoji:'🍎', meaning:'A round sweet fruit that grows on trees.',         example:'I eat an apple every day.',             grade:1 },
  { word:'ball',     emoji:'⚽', meaning:'A round object used in games and sports.',          example:'Kick the ball into the goal.',          grade:1 },
  { word:'cat',      emoji:'🐱', meaning:'A soft furry animal that meows and purrs.',         example:'The cat sat on the mat.',               grade:1 },
  { word:'dog',      emoji:'🐶', meaning:'A friendly animal that barks and wags its tail.',  example:'My dog likes to run in the park.',      grade:1 },
  { word:'egg',      emoji:'🥚', meaning:'An oval object laid by birds that contains a baby bird inside.', example:'The hen laid an egg.',     grade:1 },
  { word:'fish',     emoji:'🐟', meaning:'An animal that lives in water and has fins to swim.', example:'The fish swam in the clear river.',  grade:1 },
  { word:'hat',      emoji:'🎩', meaning:'A covering you wear on your head.',                 example:'She wore a red hat.',                   grade:1 },
  { word:'ice',      emoji:'🧊', meaning:'Water that has frozen solid and become very cold.', example:'Put ice in the drink.',                grade:1 },
  { word:'jar',      emoji:'🫙', meaning:'A glass container with a wide mouth used to store food.', example:'The jar is full of honey.',       grade:1 },
  { word:'kite',     emoji:'🪁', meaning:'A toy with a frame and paper that flies in the wind on a string.', example:'We flew a kite at the beach.', grade:1 },
  { word:'moon',     emoji:'🌙', meaning:'The large round object that shines in the sky at night.', example:'The moon is bright tonight.',     grade:1 },
  { word:'nest',     emoji:'🪺', meaning:'A small home built by birds using twigs and grass.', example:'The bird sat in its nest.',           grade:1 },
  { word:'owl',      emoji:'🦉', meaning:'A bird with big eyes that is awake at night.',      example:'The owl said hoo in the dark.',        grade:1 },
  { word:'pen',      emoji:'🖊️', meaning:'A tool you use to write with ink.',                 example:'Write your name with a pen.',           grade:1 },
  { word:'queen',    emoji:'👑', meaning:'A woman who rules a country or kingdom.',           example:'The queen wore a golden crown.',        grade:1 },
  { word:'rain',     emoji:'🌧️', meaning:'Water that falls from clouds in the sky.',          example:'We need an umbrella in the rain.',      grade:1 },
  { word:'sun',      emoji:'☀️', meaning:'The large bright star that gives us light and heat.',example:'The sun rises in the morning.',        grade:1 },
  { word:'tree',     emoji:'🌳', meaning:'A tall plant with a thick trunk, branches, and leaves.',example:'The bird sat on the tree.',         grade:1 },
  { word:'umbrella', emoji:'☂️', meaning:'A folding cover you hold to stay dry in rain.',     example:'Take your umbrella — it may rain.',    grade:1 },
  { word:'van',      emoji:'🚐', meaning:'A large vehicle used to carry people or goods.',    example:'We rode in the school van.',            grade:1 },

  // Grade 2
  { word:'bridge',   emoji:'🌉', meaning:'A structure built over water so you can cross it.', example:'We walked across the old stone bridge.', grade:2 },
  { word:'camera',   emoji:'📷', meaning:'A device you use to take pictures or photos.',      example:'She took a photo with her camera.',     grade:2 },
  { word:'desert',   emoji:'🏜️', meaning:'A very dry area with lots of sand and very little rain.', example:'Camels live in the desert.',      grade:2 },
  { word:'elephant', emoji:'🐘', meaning:'The largest land animal, with a long nose called a trunk.', example:'The elephant drank from the river.', grade:2 },
  { word:'flower',   emoji:'🌸', meaning:'The colorful part of a plant that attracts bees.',   example:'She picked a beautiful flower.',       grade:2 },
  { word:'garden',   emoji:'🌻', meaning:'An area outside where plants, flowers, or vegetables grow.', example:'Mum waters the garden every day.', grade:2 },
  { word:'honey',    emoji:'🍯', meaning:'A sweet golden liquid made by bees from flowers.',   example:'I put honey on my bread.',             grade:2 },
  { word:'island',   emoji:'🏝️', meaning:'A piece of land that is completely surrounded by water.', example:'We sailed to a small island.',    grade:2 },
  { word:'jungle',   emoji:'🌴', meaning:'A thick forest in a hot, wet place full of wild animals.', example:'Tigers live deep in the jungle.', grade:2 },
  { word:'kitchen',  emoji:'🍳', meaning:'The room in a house where food is prepared and cooked.', example:'Mum is cooking in the kitchen.',  grade:2 },
  { word:'ladder',   emoji:'🪜', meaning:'A set of steps you climb to reach a higher place.',   example:'He climbed the ladder to fix the roof.', grade:2 },
  { word:'market',   emoji:'🏪', meaning:'A place where people buy and sell goods.',            example:'We bought fruit at the market.',       grade:2 },
  { word:'neighbor', emoji:'🏘️', meaning:'A person who lives near or next to your home.',      example:'Our neighbor has a friendly dog.',     grade:2 },
  { word:'ocean',    emoji:'🌊', meaning:'A very large, deep area of salt water covering much of the Earth.', example:'Whales swim in the ocean.', grade:2 },
  { word:'pencil',   emoji:'✏️', meaning:'A thin stick of wood with graphite inside, used for writing.', example:'Sharpen your pencil before writing.', grade:2 },
  { word:'rabbit',   emoji:'🐰', meaning:'A small furry animal with long ears that hops quickly.', example:'The rabbit hopped into its burrow.', grade:2 },
  { word:'school',   emoji:'🏫', meaning:'A building where children go to learn from teachers.', example:'I walk to school every morning.',    grade:2 },
  { word:'teacher',  emoji:'👩‍🏫', meaning:'A person whose job is to help others learn new things.', example:'My teacher explains things clearly.', grade:2 },
  { word:'village',  emoji:'🏘️', meaning:'A small community of homes in the countryside.',     example:'Grandma lives in a quiet village.',   grade:2 },
  { word:'window',   emoji:'🪟', meaning:'An opening in a wall, usually with glass, that lets in light.', example:'Open the window to let in fresh air.', grade:2 },

  // Grade 3
  { word:'adventure', emoji:'🗺️', meaning:'An exciting journey or experience that involves some danger or the unknown.', example:'The explorers went on a great adventure.', grade:3 },
  { word:'ancient',   emoji:'🏺', meaning:'Something very, very old, often from thousands of years ago.', example:'We saw ancient ruins on the trip.', grade:3 },
  { word:'beautiful', emoji:'🌺', meaning:'Very pleasing to look at or hear; having great beauty.', example:'The sunset was truly beautiful.', grade:3 },
  { word:'curious',   emoji:'🔭', meaning:'Very eager to know or learn about something.',       example:'She was curious about how planes fly.', grade:3 },
  { word:'dangerous', emoji:'⚠️', meaning:'Likely to cause harm, injury, or problems.',         example:'It is dangerous to swim in that river.', grade:3 },
  { word:'enormous',  emoji:'🐳', meaning:'Extremely large in size or amount.',                  example:'The whale was enormous.',              grade:3 },
  { word:'festival',  emoji:'🎪', meaning:'A special time of celebration with events and fun activities.', example:'The town holds a music festival each year.', grade:3 },
  { word:'grateful',  emoji:'🙏', meaning:'Feeling or showing thanks for something kind done for you.', example:'I am grateful for your help.', grade:3 },
  { word:'harvest',   emoji:'🌾', meaning:'The time when crops are gathered from fields after growing.', example:'Farmers work hard during the harvest.', grade:3 },
  { word:'invisible', emoji:'👻', meaning:'Not able to be seen; hidden from sight.',             example:'The gas was invisible but had a smell.', grade:3 },
  { word:'journey',   emoji:'🚂', meaning:'A long trip from one place to another.',              example:'The journey took three days by train.', grade:3 },
  { word:'knowledge', emoji:'📕', meaning:'Facts, information, and skills learned through study and experience.', example:'Reading gives you knowledge.', grade:3 },
  { word:'lightning', emoji:'⚡', meaning:'A sudden bright flash of electricity in the sky during a storm.', example:'Lightning lit up the night sky.', grade:3 },
  { word:'mysterious', emoji:'🕵️', meaning:'Difficult to understand or explain; full of mystery.', example:'A mysterious package arrived at the door.', grade:3 },
  { word:'patience',   emoji:'⏳', meaning:'The ability to wait calmly without getting upset.',  example:'Learning to read requires patience.',  grade:3 },

  // Grade 4
  { word:'accomplish',  emoji:'🏅', meaning:'To successfully complete or achieve something difficult.', example:'She accomplished her goal of reading 20 books.', grade:4 },
  { word:'communicate', emoji:'📡', meaning:'To share information, ideas, or feelings with others.',   example:'We communicate using phones and letters.', grade:4 },
  { word:'democracy',   emoji:'🗳️', meaning:'A system of government where people vote to choose their leaders.', example:'In a democracy, every adult can vote.', grade:4 },
  { word:'environment', emoji:'🌿', meaning:'The natural world of land, water, air, and living things around us.', example:'We must protect the environment.', grade:4 },
  { word:'experiment',  emoji:'🧪', meaning:'A scientific test done to discover or prove something.', example:'We did an experiment with vinegar and baking soda.', grade:4 },
  { word:'friction',    emoji:'🔥', meaning:'The force that slows things down when two surfaces rub against each other.', example:'Friction stops a sliding book.', grade:4 },
  { word:'government',  emoji:'🏛️', meaning:'The group of people who make laws and run a country.',  example:'The government built new roads.', grade:4 },
  { word:'hypothesis',  emoji:'🤔', meaning:'An educated guess about what will happen in a scientific test.', example:'My hypothesis was that the plant needs sunlight.', grade:4 },
  { word:'immigration',emoji:'✈️', meaning:'Moving from one country to live permanently in another.', example:'His family came through immigration from another country.', grade:4 },
  { word:'justice',     emoji:'⚖️', meaning:'Fair and right treatment of everyone according to the law.', example:'The judge fought for justice.', grade:4 },

  // Grade 5
  { word:'abundance',   emoji:'🌽', meaning:'A very large amount of something, more than enough.',  example:'There was an abundance of food at the feast.', grade:5 },
  { word:'catastrophe', emoji:'🌋', meaning:'A sudden disaster or very bad event causing great damage.', example:'The earthquake was a catastrophe.', grade:5 },
  { word:'dedicate',    emoji:'🎯', meaning:'To give your time and effort fully to something or someone.', example:'She dedicated herself to helping others.', grade:5 },
  { word:'eloquent',    emoji:'🎤', meaning:'Using clear, impressive, and well-chosen words when speaking or writing.', example:'His eloquent speech moved the crowd.', grade:5 },
  { word:'fundamental', emoji:'🧱', meaning:'Being a basic and essential part of something.',       example:'Respect is fundamental to friendship.', grade:5 },
  { word:'generosity',  emoji:'🎁', meaning:'The quality of being kind and giving freely to others.', example:'Her generosity touched everyone\'s hearts.', grade:5 },
  { word:'independence', emoji:'🦅', meaning:'The state of being free and not controlled by others.', example:'The country celebrates its independence each year.', grade:5 },
  { word:'perspective', emoji:'👁️', meaning:'A particular way of thinking about or looking at something.', example:'Try to see it from a different perspective.', grade:5 },
  { word:'revolution',  emoji:'⚙️', meaning:'A dramatic change in ideas, society, or government.',  example:'The Industrial Revolution changed how things were made.', grade:5 },
  { word:'significant', emoji:'📌', meaning:'Important or large enough to be noticed or have an effect.', example:'It was a significant discovery.', grade:5 },
];

// ─── SPELLING WORDS (grade 1-5) ─────────────────
const SPELLING = [
  { word:'cat',      emoji:'🐱', hint:'A furry pet that meows.',                 grade:1 },
  { word:'dog',      emoji:'🐶', hint:'A friendly pet that barks.',              grade:1 },
  { word:'sun',      emoji:'☀️', hint:'It gives us light and heat.',              grade:1 },
  { word:'hat',      emoji:'🎩', hint:'You wear it on your head.',               grade:1 },
  { word:'bed',      emoji:'🛏️', hint:'You sleep in this.',                       grade:1 },
  { word:'cup',      emoji:'☕', hint:'You drink from this.',                    grade:1 },
  { word:'fish',     emoji:'🐟', hint:'It swims in water.',                      grade:1 },
  { word:'bird',     emoji:'🐦', hint:'It has wings and can fly.',               grade:1 },
  { word:'frog',     emoji:'🐸', hint:'It hops and says ribbit.',               grade:1 },
  { word:'star',     emoji:'⭐', hint:'It shines in the night sky.',             grade:1 },
  { word:'book',     emoji:'📚', hint:'You read stories in this.',               grade:1 },
  { word:'rain',     emoji:'🌧️', hint:'Water that falls from clouds.',            grade:1 },
  { word:'tree',     emoji:'🌳', hint:'It has leaves and a trunk.',              grade:1 },
  { word:'duck',     emoji:'🦆', hint:'A bird that quacks.',                     grade:1 },
  { word:'milk',     emoji:'🥛', hint:'A white drink from cows.',               grade:1 },
  { word:'clock',    emoji:'🕐', hint:'It tells you the time.',                  grade:2 },
  { word:'bread',    emoji:'🍞', hint:'You eat this at breakfast.',              grade:2 },
  { word:'dream',    emoji:'💭', hint:'What you see when you sleep.',            grade:2 },
  { word:'grass',    emoji:'🌿', hint:'Green plants covering the ground.',       grade:2 },
  { word:'honey',    emoji:'🍯', hint:'Sweet food made by bees.',               grade:2 },
  { word:'juice',    emoji:'🧃', hint:'A drink made from fruit.',               grade:2 },
  { word:'lemon',    emoji:'🍋', hint:'A sour yellow fruit.',                   grade:2 },
  { word:'nurse',    emoji:'👩‍⚕️', hint:'Helps patients in a hospital.',            grade:2 },
  { word:'ocean',    emoji:'🌊', hint:'A very large body of salt water.',        grade:2 },
  { word:'pencil',   emoji:'✏️', hint:'You write with this.',                    grade:2 },
  { word:'purple',   emoji:'💜', hint:'A color mixing red and blue.',           grade:2 },
  { word:'school',   emoji:'🏫', hint:'Where children go to learn.',            grade:2 },
  { word:'bridge',   emoji:'🌉', hint:'You walk over it to cross water.',        grade:2 },
  { word:'castle',   emoji:'🏰', hint:'A large stone building where kings lived.',grade:2 },
  { word:'flower',   emoji:'🌸', hint:'It has petals and smells nice.',         grade:2 },
  { word:'blanket',  emoji:'🛌', hint:'Keeps you warm when you sleep.',         grade:3 },
  { word:'captain',  emoji:'⚓', hint:'Leader of a ship or team.',              grade:3 },
  { word:'diamond',  emoji:'💎', hint:'A precious sparkling gem.',              grade:3 },
  { word:'feather',  emoji:'🪶', hint:'A light thing from a bird.',             grade:3 },
  { word:'general',  emoji:'🎖️', hint:'A high-ranking military leader.',         grade:3 },
  { word:'kitchen',  emoji:'🍳', hint:'Room where food is cooked.',             grade:3 },
  { word:'library',  emoji:'📚', hint:'A place with many books to borrow.',     grade:3 },
  { word:'machine',  emoji:'⚙️', hint:'A device with moving parts.',            grade:3 },
  { word:'natural',  emoji:'🌿', hint:'Coming from nature, not made by people.',grade:3 },
  { word:'perfect',  emoji:'✅', hint:'Without any mistakes at all.',           grade:3 },
  { word:'quarter',  emoji:'🪙', hint:'One of four equal parts.',              grade:4 },
  { word:'receive',  emoji:'📬', hint:'To get something given to you.',         grade:4 },
  { word:'science',  emoji:'🔬', hint:'Study of the natural world.',            grade:4 },
  { word:'through',  emoji:'🚪', hint:'Going from one side to the other.',      grade:4 },
  { word:'unusual',  emoji:'🦄', hint:'Not normal or common.',                  grade:4 },
  { word:'vegetable',emoji:'🥦', hint:'A plant we eat such as carrot or peas.', grade:4 },
  { word:'whether',  emoji:'❓', hint:'Expressing a doubt or choice.',          grade:4 },
  { word:'ancient',  emoji:'🏺', hint:'Very, very old.',                        grade:4 },
  { word:'beautiful',emoji:'🌺', hint:'Very pleasing to see.',                  grade:4 },
  { word:'building', emoji:'🏢', hint:'A structure with walls and a roof.',     grade:4 },
  { word:'accomplish', emoji:'🏅', hint:'To achieve something.',                grade:5 },
  { word:'campaign',   emoji:'📢', hint:'Organized effort to achieve a goal.',  grade:5 },
  { word:'encourage',  emoji:'🤝', hint:'To give support and confidence.',      grade:5 },
  { word:'frequency',  emoji:'📶', hint:'How often something happens.',         grade:5 },
  { word:'guarantee',  emoji:'📋', hint:'A firm promise.',                      grade:5 },
  { word:'horizontal', emoji:'↔️', hint:'Going across from left to right.',      grade:5 },
  { word:'imaginary',  emoji:'🌈', hint:'Not real, only in the mind.',          grade:5 },
  { word:'knowledge',  emoji:'📕', hint:'Information and skills you have learned.',grade:5 },
  { word:'necessary',  emoji:'✔️', hint:'Something that must be done.',          grade:5 },
  { word:'opportunity',emoji:'🚀', hint:'A good chance to do something.',       grade:5 },
];

// ─── SENTENCES (grade 1→5) ──────────────────────
const SENTENCES = [
  // Grade 1 - simple
  { words:['The','cat','runs','fast'],     correct:'The cat runs fast.',     img:'🐱', grade:1, meaning:'A cat is moving quickly.' },
  { words:['I','drink','cold','milk'],     correct:'I drink cold milk.',     img:'🥛', grade:1, meaning:'The speaker is drinking cold milk.' },
  { words:['She','reads','a','book'],      correct:'She reads a book.',      img:'📖', grade:1, meaning:'A girl is reading a book.' },
  { words:['The','dog','jumps','high'],    correct:'The dog jumps high.',    img:'🐶', grade:1, meaning:'A dog is jumping up high.' },
  { words:['He','eats','an','apple'],      correct:'He eats an apple.',      img:'🍎', grade:1, meaning:'A boy is eating an apple.' },
  { words:['The','sun','is','bright'],     correct:'The sun is bright.',     img:'☀️', grade:1, meaning:'The sun is giving a lot of light.' },
  { words:['I','love','my','mum'],         correct:'I love my mum.',         img:'👩', grade:1, meaning:'The speaker has strong love for their mother.' },
  { words:['The','ball','is','red'],       correct:'The ball is red.',       img:'🔴', grade:1, meaning:'A ball has the color red.' },
  // Grade 2 - descriptive
  { words:['The','big','brown','dog','runs','fast'],  correct:'The big brown dog runs fast.',  img:'🐕', grade:2, meaning:'A large brown-colored dog is running at high speed.' },
  { words:['She','rides','a','blue','bike'],          correct:'She rides a blue bike.',        img:'🚲', grade:2, meaning:'A girl is riding her blue-colored bicycle.' },
  { words:['The','tiny','bird','sings','sweetly'],    correct:'The tiny bird sings sweetly.',  img:'🐦', grade:2, meaning:'A small bird is making beautiful music.' },
  { words:['We','play','in','the','green','park'],    correct:'We play in the green park.',    img:'🌳', grade:2, meaning:'A group of children are playing in a park with green grass.' },
  { words:['The','cold','wind','blows','hard'],       correct:'The cold wind blows hard.',     img:'💨', grade:2, meaning:'A very cold wind is blowing with great force.' },
  // Grade 3 - compound
  { words:['He','finished','his','homework','and','went','outside'], correct:'He finished his homework and went outside.', img:'📚', grade:3, meaning:'A boy completed his homework and then went to play outside.' },
  { words:['The','flowers','are','blooming','because','it','rained'], correct:'The flowers are blooming because it rained.', img:'🌸', grade:3, meaning:'Rain caused the flowers to open and grow.' },
  { words:['She','was','tired','but','she','kept','studying'], correct:'She was tired but she kept studying.', img:'😴', grade:3, meaning:'Despite feeling tired, she continued to study hard.' },
  // Grade 4
  { words:['The','ancient','ruins','were','discovered','by','archaeologists'], correct:'The ancient ruins were discovered by archaeologists.', img:'🏺', grade:4, meaning:'Scientists who study history found very old buildings.' },
  { words:['Although','it','was','cold','the','children','played','outside'], correct:'Although it was cold, the children played outside.', img:'❄️', grade:4, meaning:'Despite the cold weather, the children still went out to play.' },
  // Grade 5
  { words:['The','scientist','carefully','analyzed','the','experimental','results'], correct:'The scientist carefully analyzed the experimental results.', img:'🔬', grade:5, meaning:'A scientist looked closely and thoughtfully at the results of their test.' },
  { words:['Despite','the','challenges','she','remained','determined','to','succeed'], correct:'Despite the challenges, she remained determined to succeed.', img:'💪', grade:5, meaning:'Even though things were difficult, she did not give up and kept trying to reach her goal.' },
];

// ─── STORIES ────────────────────────────────────
const STORIES = [
  {
    title:'The Lost Kitten', scene:'🐱', grade:1,
    text:'A boy named Ali found a small lost kitten near a tree. The kitten was very hungry. Ali gave the kitten some milk to drink. The kitten followed Ali all the way home. Now they are best friends!',
    questions:[
      { q:'Who found the kitten?',            opts:['A girl named Sara','A boy named Ali','A farmer'],     ans:1 },
      { q:'What did Ali give the kitten?',     opts:['Water','Bread','Milk'],                               ans:2 },
      { q:'Where did Ali find the kitten?',    opts:['In the school','Near a tree','In the river'],         ans:1 },
    ]
  },
  {
    title:'A Rainy Day', scene:'🌧️', grade:1,
    text:'It was raining outside. Sara looked out of the window. She saw big puddles on the road. She put on her yellow raincoat and red boots. She jumped in the puddles and laughed. Rain can be so much fun!',
    questions:[
      { q:'What did Sara see outside?',        opts:['Snow','Sunshine','Big puddles'],                       ans:2 },
      { q:"What color was Sara's raincoat?",   opts:['Red','Blue','Yellow'],                                ans:2 },
      { q:'How did Sara feel?',                opts:['Sad','Scared','Happy and playful'],                   ans:2 },
    ]
  },
  {
    title:'The Magic Garden', scene:'🌱', grade:2,
    text:'Rania planted a tiny seed in her garden. She watered it every day and made sure it got plenty of sunlight. After two weeks, a beautiful sunflower had grown taller than Rania herself! She learned that patience and care make things grow. She called it her "sunshine flower".',
    questions:[
      { q:'What did Rania plant?',             opts:['A tree','A tiny seed','A vegetable'],                 ans:1 },
      { q:'What did the seed grow into?',      opts:['A rose','A sunflower','An oak tree'],                 ans:1 },
      { q:'What lesson did Rania learn?',      opts:['Seeds need darkness','Patience and care make things grow','You should never water plants'], ans:1 },
    ]
  },
  {
    title:'The Brave Firefighter', scene:'🚒', grade:2,
    text:'Omar was a brave firefighter. One day a large fire broke out in an old building. Omar and his team rushed to the scene. They worked together, spraying water on the flames. They rescued two children who were trapped inside. Everyone cheered. Omar said, "Teamwork is what saved us today."',
    questions:[
      { q:'What was Omar\'s job?',             opts:['Teacher','Doctor','Firefighter'],                     ans:2 },
      { q:'How did they put out the fire?',    opts:['Using sand','Spraying water','By waiting'],           ans:1 },
      { q:'What did Omar say about teamwork?', opts:['It is overrated','It saved them','It was not needed'], ans:1 },
    ]
  },
  {
    title:'Journey to the Stars', scene:'🚀', grade:3,
    text:'Astronaut Leila had dreamed of space her whole life. After years of training, she finally launched into space. As the rocket soared above the clouds, she gazed at Earth below — a beautiful blue marble in the darkness. She conducted experiments in zero gravity and spoke to children back home. "Never give up on your dreams," she told them. The universe is waiting.',
    questions:[
      { q:'How long had Leila dreamed of space?', opts:['A few months','Her whole life','Just one year'],    ans:1 },
      { q:'What did Earth look like from space?', opts:['Like a yellow star','Like a blue marble','Like a red planet'], ans:1 },
      { q:'What message did she send to children?', opts:['Space is scary','Study hard only','Never give up on your dreams'], ans:2 },
    ]
  },
  {
    title:'The River and the Ocean', scene:'🌊', grade:4,
    text:'A small river once complained to the earth, "I am so tiny. What purpose do I serve?" The earth replied, "You carry water from the mountains to villages. You give fish a home. You turn into the ocean." The river was puzzled. "I turn into the ocean?" "Yes," said the earth, "every ocean began as a tiny drop." The river flowed on with newfound pride, understanding that small things can become something immense.',
    questions:[
      { q:'What did the river complain about?',     opts:['Being too wide','Being too tiny','Being too loud'],     ans:1 },
      { q:'What does the river give fish?',         opts:['Food only','A home','Wings'],                           ans:1 },
      { q:'What lesson does the story teach?',      opts:['Rivers are useless','Small things can become great','Oceans are bigger than rivers'], ans:1 },
    ]
  },
  {
    title:'The Power of Reading', scene:'📚', grade:5,
    text:'In a small town, a girl named Hana had no toys or television. Her only companion was the town library. Every evening she read about explorers, scientists, and dreamers. While other children grew bored, Hana grew curious. At sixteen she won a national science award. At her speech she said, "Every book I read was a door to a new world. Behind each door was a version of me I hadn\'t met yet." She became a reminder that knowledge has no limits.',
    questions:[
      { q:'What was Hana\'s only companion?',        opts:['A pet cat','The town library','A television'],         ans:1 },
      { q:'What did Hana win at sixteen?',           opts:['A sports trophy','A singing contest','A national science award'], ans:2 },
      { q:'What does Hana compare books to?',        opts:['Windows','Doors to new worlds','Maps'],                ans:1 },
    ]
  },
];

// ─── MATH PROBLEMS (grade 1-5) ──────────────────
const MATH = [
  // Grade 1 - basic counting & addition
  { type:'add',    a:3,  b:4,  emoji:'🍎', ans:7,  grade:1 },
  { type:'add',    a:5,  b:2,  emoji:'⭐', ans:7,  grade:1 },
  { type:'add',    a:4,  b:6,  emoji:'🐝', ans:10, grade:1 },
  { type:'sub',    a:9,  b:3,  emoji:'🍊', ans:6,  grade:1 },
  { type:'sub',    a:8,  b:5,  emoji:'🌟', ans:3,  grade:1 },
  { type:'word', story:'Ali has 3 apples. He buys 4 more.',     question:'How many apples does Ali have now?',       a:3, b:4, op:'+', ans:7,  emoji:'🍎', grade:1 },
  { type:'word', story:'Sara had 9 candies. She gave 3 away.',  question:'How many candies does Sara have left?',    a:9, b:3, op:'-', ans:6,  emoji:'🍬', grade:1 },
  { type:'word', story:'There are 5 red birds and 4 blue birds.',question:'How many birds are there altogether?',    a:5, b:4, op:'+', ans:9,  emoji:'🐦', grade:1 },
  // Grade 2
  { type:'add',  a:15, b:8,  emoji:'🎈', ans:23, grade:2 },
  { type:'add',  a:24, b:17, emoji:'⚽', ans:41, grade:2 },
  { type:'sub',  a:30, b:12, emoji:'🦋', ans:18, grade:2 },
  { type:'sub',  a:45, b:19, emoji:'🎀', ans:26, grade:2 },
  { type:'compare', a:34, b:27, ans:'>',  grade:2 },
  { type:'compare', a:18, b:25, ans:'<',  grade:2 },
  { type:'word', story:'Tom has 24 stickers. He gives 9 to his sister.',    question:'How many stickers does Tom have left?',   a:24, b:9,  op:'-', ans:15, emoji:'⭐', grade:2 },
  { type:'word', story:'A baker makes 18 loaves in the morning and 15 more in the afternoon.', question:'How many loaves in total?', a:18, b:15, op:'+', ans:33, emoji:'🍞', grade:2 },
  // Grade 3
  { type:'mult', a:6,  b:7,  emoji:'🍕', ans:42, grade:3 },
  { type:'mult', a:8,  b:9,  emoji:'🔴', ans:72, grade:3 },
  { type:'div',  a:36, b:6,  emoji:'🍫', ans:6,  grade:3 },
  { type:'div',  a:48, b:8,  emoji:'🌮', ans:6,  grade:3 },
  { type:'word', story:'Each box holds 6 eggs. There are 7 boxes.',  question:'How many eggs are there in total?', a:6, b:7, op:'×', ans:42, emoji:'🥚', grade:3 },
  { type:'word', story:'40 children are divided equally into 8 groups.', question:'How many children are in each group?', a:40, b:8, op:'÷', ans:5, emoji:'👦', grade:3 },
  // Grade 4
  { type:'frac', story:'A pizza was cut into 8 equal slices. Rania ate 3 slices.', question:'What fraction of the pizza did Rania eat?', choices:['3/8','3/5','5/8','1/3'], ans:0, grade:4 },
  { type:'frac', story:'There are 12 flowers. 4 of them are red.', question:'What fraction of the flowers are red?', choices:['1/3','1/4','3/4','2/3'], ans:0, grade:4 },
  { type:'word', story:'A train travels 120 km in 2 hours.', question:'How many kilometres does it travel per hour?', a:120, b:2, op:'÷', ans:60, emoji:'🚂', grade:4 },
  { type:'word', story:'A shop sold 145 items on Monday and 238 items on Tuesday.', question:'How many items were sold in total?', a:145, b:238, op:'+', ans:383, emoji:'🛍️', grade:4 },
  { type:'compare', a:456, b:465, ans:'<', grade:4 },
  // Grade 5
  { type:'word', story:'A rectangle has a length of 12 cm and a width of 8 cm.', question:'What is the area of the rectangle? (Area = length × width)', a:12, b:8, op:'×', ans:96, emoji:'📐', grade:5 },
  { type:'word', story:'A student scored 78 out of 100 in English and 85 out of 100 in Math.', question:'What is the total score?', a:78, b:85, op:'+', ans:163, emoji:'📊', grade:5 },
  { type:'word', story:'A car uses 6 litres of fuel every 100 km. It needs to travel 350 km.', question:'How many litres of fuel are needed? (Hint: 3.5 × 6)', a:3.5, b:6, op:'×', ans:21, emoji:'⛽', grade:5 },
];

// ─── CONCEPTS ───────────────────────────────────
const CONCEPTS = [
  { concept:'HEAVY vs LIGHT',   q:'Which is HEAVIER?',       a:{em:'🪨',lb:'Rock',   ok:true},  b:{em:'🪶',lb:'Feather',  ok:false}, grade:1 },
  { concept:'BIG vs SMALL',     q:'Which is BIGGER?',        a:{em:'🐘',lb:'Elephant',ok:true}, b:{em:'🐭',lb:'Mouse',    ok:false}, grade:1 },
  { concept:'FAST vs SLOW',     q:'Which is FASTER?',        a:{em:'🐢',lb:'Turtle', ok:false}, b:{em:'🐆',lb:'Cheetah', ok:true},  grade:1 },
  { concept:'HOT vs COLD',      q:'Which one is HOT?',       a:{em:'🔥',lb:'Fire',   ok:true},  b:{em:'🧊',lb:'Ice',     ok:false}, grade:1 },
  { concept:'FULL vs EMPTY',    q:'Which is FULL?',          a:{em:'🍷',lb:'Full glass',ok:true},b:{em:'🫙',lb:'Empty jar',ok:false}, grade:1 },
  { concept:'TALL vs SHORT',    q:'Which is TALLER?',        a:{em:'🦒',lb:'Giraffe',ok:true},  b:{em:'🐇',lb:'Rabbit', ok:false}, grade:1 },
  { concept:'INSIDE vs OUTSIDE',q:'Which is INSIDE a house?',a:{em:'🛋️',lb:'Sofa',   ok:true},  b:{em:'🌳',lb:'Tree',   ok:false}, grade:1 },
  { concept:'MORE vs FEWER',    q:'Which group has MORE?',   a:{em:'🍎🍎🍎🍎🍎',lb:'5 apples',ok:true},b:{em:'🍎🍎',lb:'2 apples',ok:false}, grade:1 },
  { concept:'BEFORE vs AFTER',  q:'What comes AFTER morning?',a:{em:'🌙',lb:'Night', ok:false}, b:{em:'☀️',lb:'Afternoon',ok:true}, grade:2 },
  { concept:'ROUGH vs SMOOTH',  q:'Which feels SMOOTHER?',   a:{em:'🪨',lb:'Rock',   ok:false}, b:{em:'🪞',lb:'Mirror',  ok:true},  grade:2 },
  { concept:'LOUD vs QUIET',    q:'Which is LOUDER?',        a:{em:'🎺',lb:'Trumpet',ok:true},  b:{em:'🖊️',lb:'Writing', ok:false}, grade:2 },
  { concept:'LIQUID vs SOLID',  q:'Which one is a LIQUID?',  a:{em:'💧',lb:'Water',  ok:true},  b:{em:'🧱',lb:'Brick',   ok:false}, grade:3 },
  { concept:'PUSH vs PULL',     q:'Opening a door — is it PUSH or PULL?', a:{em:'👋',lb:'Push (toward)',ok:false},b:{em:'🤚',lb:'Pull (toward you)',ok:true}, grade:3 },
  { concept:'LIVING vs NON-LIVING',q:'Which is a LIVING thing?',a:{em:'🌱',lb:'Plant',ok:true}, b:{em:'🪑',lb:'Chair',  ok:false}, grade:3 },
];

// ─── GRAMMAR (grade 2–5) ────────────────────────
const GRAMMAR = [
  // Nouns
  { type:'identify', q:'Which word is a NOUN (person, place, or thing)?', opts:['run','happy','school','quickly'], ans:2, explanation:'A noun is a word for a person, place, or thing. "School" is a place.', grade:2 },
  { type:'identify', q:'Which word is a VERB (action word)?', opts:['beautiful','elephant','jump','slowly'], ans:2, explanation:'A verb is an action word. "Jump" describes what someone does.', grade:2 },
  { type:'identify', q:'Which word is an ADJECTIVE (describing word)?', opts:['run','table','bright','she'], ans:2, explanation:'An adjective describes a noun. "Bright" describes how something looks.', grade:2 },
  // Plurals
  { type:'fill', template:'One cat, two ___.',        answer:'cats',      hint:'Add -s to most nouns.', grade:2 },
  { type:'fill', template:'One box, three ___.',      answer:'boxes',     hint:'Add -es when the word ends in x.', grade:2 },
  { type:'fill', template:'One baby, four ___.',      answer:'babies',    hint:'Change -y to -ies.', grade:2 },
  { type:'fill', template:'One child, many ___.',     answer:'children',  hint:'This is an irregular plural.', grade:3 },
  // Tense
  { type:'identify', q:'Which sentence uses PAST tense?', opts:['She runs fast.','He will swim.','They ate dinner.','I am happy.'], ans:2, explanation:'Past tense describes something that already happened. "Ate" is the past form of "eat".', grade:3 },
  { type:'identify', q:'Which sentence uses FUTURE tense?', opts:['He ate bread.','She reads books.','We will visit them.','The dog barked.'], ans:2, explanation:'Future tense uses "will" + verb to describe what will happen.', grade:3 },
  // Punctuation
  { type:'choose',  q:'Which sentence uses correct punctuation?', opts:['where are you going','Where are you going?','where are you going?','Where are you going'], ans:1, explanation:'A question always begins with a capital letter and ends with a question mark (?).', grade:3 },
  { type:'choose',  q:'Which sentence is correctly capitalised?', opts:['ali lives in karachi.','Ali lives in karachi.','ali lives in Karachi.','Ali lives in Karachi.'], ans:3, explanation:'Names of people and places always start with a capital letter.', grade:4 },
  // Compound / complex
  { type:'choose',  q:'Choose the correct conjunction to join: "She was tired ___ she kept going."', opts:['because','but','so','and'], ans:1, explanation:'"But" shows contrast — two opposite ideas joined together.', grade:4 },
  { type:'choose',  q:'Which sentence is COMPLEX (has a main clause + dependent clause)?', opts:['The dog ran.','She sang a song.','Although it rained, we played outside.','He ate and slept.'], ans:2, explanation:'A complex sentence has a main clause and a dependent clause joined by a subordinating conjunction like "although".', grade:4 },
  // Grade 5
  { type:'choose',  q:'Identify the SUBJECT of: "The tall mountains fascinated the young climbers."', opts:['fascinated','the young climbers','The tall mountains','young'], ans:2, explanation:'The subject is who or what the sentence is about. "The tall mountains" is what fascinated.', grade:5 },
  { type:'choose',  q:'Which sentence is in PASSIVE voice?', opts:['The chef cooked dinner.','Dinner was cooked by the chef.','She baked a cake.','He read a book.'], ans:1, explanation:'Passive voice: the action is done TO the subject. "Dinner was cooked" — dinner received the action.', grade:5 },
];

// ─── SCIENCE (grade 3–5) ────────────────────────
const SCIENCE = [
  { topic:'Plants', fact:'Plants need sunlight, water, and soil to grow. They make their own food through a process called photosynthesis.', scene:'🌱',
    q:'What do plants use to make their own food?', opts:['Moonlight and rain','Sunlight, water and soil','Only water','Darkness'], ans:1, grade:3 },
  { topic:'Water Cycle', fact:'Water evaporates from oceans, rises as vapour, forms clouds, and falls again as rain or snow — completing the water cycle.',scene:'💧',
    q:'What is the process called when water turns to vapour and rises?', opts:['Condensation','Evaporation','Precipitation','Irrigation'], ans:1, grade:3 },
  { topic:'Animals', fact:'Animals can be grouped as mammals, birds, reptiles, amphibians, and fish. Mammals give birth to live young and feed them milk.', scene:'🐾',
    q:'Which of these is a mammal?', opts:['Eagle','Crocodile','Dolphin','Salmon'], ans:2, grade:3 },
  { topic:'States of Matter', fact:'Everything around us is made of matter. Matter exists in three states: solid (like ice), liquid (like water), and gas (like steam).', scene:'🧊',
    q:'What state of matter is steam?', opts:['Solid','Liquid','Gas','Plasma'], ans:2, grade:3 },
  { topic:'Solar System', fact:'Our solar system has eight planets orbiting the Sun. Earth is the third planet. Mars is called the Red Planet because of its reddish soil.', scene:'🪐',
    q:'What is the third planet from the Sun?', opts:['Mars','Venus','Earth','Jupiter'], ans:2, grade:4 },
  { topic:'Food Chain', fact:'A food chain shows how energy passes from one living thing to another. It starts with a plant (producer), then a herbivore, then a carnivore.', scene:'🌿',
    q:'In a food chain, what comes FIRST?', opts:['A carnivore','A herbivore','A producer (plant)','A decomposer'], ans:2, grade:4 },
  { topic:'Forces', fact:'A force is a push or pull. Gravity is a force that pulls objects toward the Earth. Friction is a force that slows moving objects.', scene:'🔭',
    q:'What force pulls objects towards Earth?', opts:['Friction','Magnetism','Gravity','Air resistance'], ans:2, grade:4 },
  { topic:'Human Body', fact:'The human body has systems that work together. The digestive system breaks down food. The circulatory system pumps blood using the heart.', scene:'🫀',
    q:'Which organ pumps blood through the body?', opts:['Lungs','Brain','Stomach','Heart'], ans:3, grade:5 },
  { topic:'Ecosystems', fact:'An ecosystem is a community of living and non-living things in an area. Forests, oceans, and deserts are different ecosystems.', scene:'🌍',
    q:'Which of these is an ecosystem?', opts:['A shopping mall','A coral reef','A parking lot','A factory'], ans:1, grade:5 },
  { topic:'Electricity', fact:'Electricity flows through conductors like copper wire. Insulators like rubber stop electricity from flowing and keep us safe.', scene:'⚡',
    q:'Which material is an electrical CONDUCTOR?', opts:['Rubber','Plastic','Copper wire','Wood'], ans:2, grade:5 },
];

// ─── CREATIVE WRITING PROMPTS ───────────────────
const CREATIVE = [
  { prompt:'Write 2-3 sentences about your favourite animal and why you like it.',      grade:1, minWords:5 },
  { prompt:'Describe what you did this morning in 3 sentences.',                        grade:1, minWords:5 },
  { prompt:'Write a short story about a dog who finds a treasure box. Use at least 4 sentences.', grade:2, minWords:15 },
  { prompt:'Imagine you have a superpower. Write 4–5 sentences describing what it is and how you use it.', grade:2, minWords:15 },
  { prompt:'Write a story about a child who visits a magical forest. Include a problem and a solution. (5–7 sentences)', grade:3, minWords:25 },
  { prompt:'Write a persuasive paragraph convincing your teacher to give less homework. Give 3 reasons.', grade:4, minWords:30 },
  { prompt:'Write a story from the perspective of a fish living in the ocean. What does it see? What does it fear? (1 paragraph)', grade:4, minWords:35 },
  { prompt:'Write a short essay describing the most important invention in history and explain WHY it is important. (2 paragraphs)', grade:5, minWords:50 },
  { prompt:'Write a persuasive speech arguing that students should have longer lunch breaks. Use evidence and examples.', grade:5, minWords:50 },
];

// ─── GEOGRAPHY (grade 4–5) ──────────────────────
const GEOGRAPHY = [
  { q:'Which is the largest continent in the world?', opts:['Africa','Asia','Europe','South America'], ans:1, fact:'Asia is the largest continent, covering about 30% of the Earth\'s land area.', scene:'🌏', grade:4 },
  { q:'Which ocean is the largest?', opts:['Atlantic','Indian','Arctic','Pacific'], ans:3, fact:'The Pacific Ocean is the largest and deepest ocean, covering more than 30% of Earth\'s surface.', scene:'🌊', grade:4 },
  { q:'What is the capital city of France?', opts:['Berlin','Madrid','Paris','Rome'], ans:2, fact:'Paris is the capital of France, known as the "City of Light" and famous for the Eiffel Tower.', scene:'🗼', grade:4 },
  { q:'Which desert is the largest in the world?', opts:['Gobi','Sahara','Arabian','Antarctic'], ans:3, fact:'The Antarctic Desert is actually the largest desert — it is cold and extremely dry!', scene:'🏔️', grade:4 },
  { q:'On which continent is Egypt located?', opts:['Asia','Europe','Africa','South America'], ans:2, fact:'Egypt is in northeastern Africa and is famous for the Pyramids of Giza.', scene:'🏺', grade:4 },
  { q:'What is the longest river in the world?', opts:['Amazon','Congo','Nile','Mississippi'], ans:2, fact:'The Nile in Africa is considered the world\'s longest river at about 6,650 km.', scene:'🏞️', grade:5 },
  { q:'Which country has the most people in the world?', opts:['USA','China','Russia','India'], ans:3, fact:'India recently surpassed China to become the most populated country with over 1.4 billion people.', scene:'👥', grade:5 },
  { q:'What is the smallest country in the world?', opts:['Monaco','Vatican City','Liechtenstein','San Marino'], ans:1, fact:'Vatican City, inside Rome, is the world\'s smallest country at just 44 hectares.', scene:'🏛️', grade:5 },
];
