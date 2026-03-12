/* ═══════════════════════════════════════════════
   MAIN — app controller
═══════════════════════════════════════════════ */

// ─── GLOBAL STATE ─────────────────────────────
let G = {
  userId:        null,
  playerName:    'Explorer',
  avatar:        '🦊',
  outfit:        '🦊',
  grade:         1,
  stars:         0,
  coins:         0,
  lives:         3,
  wordsLearned:  [],
  badges:        [],
  scores: {
    words:0, spelling:0, sentence:0, reading:0, math:0,
    concept:0, grammar:0, science:0, creative:0, geography:0,
  },
  dailyBonusClaimed: false,
  selectedGrade:     1,
  selectedAvatar:    '🦊',
};

// ─── BADGES ───────────────────────────────────
const BADGE_DEFS = [
  { id:'first_word',     emoji:'📚', name:'First Word!',      desc:'Learned your first word',       cond: ()=> G.wordsLearned.length >= 1 },
  { id:'word5',          emoji:'🌟', name:'Word Star',         desc:'Learned 5 words',               cond: ()=> G.wordsLearned.length >= 5 },
  { id:'word20',         emoji:'📖', name:'Bookworm',          desc:'Learned 20 words',              cond: ()=> G.wordsLearned.length >= 20 },
  { id:'spell3',         emoji:'✏️', name:'Speller',           desc:'Got 3 spellings right',         cond: ()=> (G.scores.spelling||0) >= 3 },
  { id:'spell10',        emoji:'🏅', name:'Spelling Champ',    desc:'Got 10 spellings right',        cond: ()=> (G.scores.spelling||0) >= 10 },
  { id:'sent2',          emoji:'💬', name:'Sentence Builder',  desc:'Built 2 sentences',             cond: ()=> (G.scores.sentence||0) >= 2 },
  { id:'math5',          emoji:'🔢', name:'Math Wizard',       desc:'Solved 5 math problems',        cond: ()=> (G.scores.math||0) >= 5 },
  { id:'math15',         emoji:'🧮', name:'Number Ninja',      desc:'Solved 15 math problems',       cond: ()=> (G.scores.math||0) >= 15 },
  { id:'reading3',       emoji:'📗', name:'Reader',            desc:'Answered 3 reading questions',  cond: ()=> (G.scores.reading||0) >= 3 },
  { id:'reading10',      emoji:'📚', name:'Story Lover',       desc:'Answered 10 reading questions', cond: ()=> (G.scores.reading||0) >= 10 },
  { id:'star10',         emoji:'⭐', name:'Star Collector',    desc:'Earned 10 stars',               cond: ()=> G.stars >= 10 },
  { id:'star50',         emoji:'🌟', name:'Star Champion',     desc:'Earned 50 stars',               cond: ()=> G.stars >= 50 },
  { id:'grammar3',       emoji:'🖊️', name:'Grammar Star',     desc:'Got 3 grammar answers right',   cond: ()=> (G.scores.grammar||0) >= 3 },
  { id:'science3',       emoji:'🔬', name:'Scientist',         desc:'Got 3 science answers right',   cond: ()=> (G.scores.science||0) >= 3 },
  { id:'creative1',      emoji:'✍️', name:'Creative Writer',  desc:'Completed first creative task', cond: ()=> (G.scores.creative||0) >= 1 },
  { id:'geo3',           emoji:'🌍', name:'World Explorer',    desc:'Got 3 geography questions right',cond:()=> (G.scores.geography||0)>=3 },
  { id:'thinker3',       emoji:'🧠', name:'Big Thinker',       desc:'Got 3 concept questions right', cond: ()=> (G.scores.concept||0) >= 3 },
  { id:'daily_done',     emoji:'⚡', name:'Daily Champion',    desc:'Completed a daily challenge',   cond: ()=> G.dailyBonusClaimed },
];

const OUTFITS = [
  { emoji:'🦊', name:'Fox',        unlock:0  },
  { emoji:'🐼', name:'Panda',      unlock:0  },
  { emoji:'🦉', name:'Owl',        unlock:0  },
  { emoji:'🤖', name:'Robot',      unlock:0  },
  { emoji:'🐯', name:'Tiger',      unlock:0  },
  { emoji:'🦋', name:'Butterfly',  unlock:0  },
  { emoji:'🧙', name:'Wizard',     unlock:8  },
  { emoji:'🦸', name:'Hero',       unlock:15 },
  { emoji:'👑', name:'Royalty',    unlock:25 },
  { emoji:'🚀', name:'Astronaut',  unlock:40 },
  { emoji:'🦄', name:'Unicorn',    unlock:60 },
  { emoji:'🐉', name:'Dragon',     unlock:80 },
];

// ─── BOOT ─────────────────────────────────────
window.addEventListener('DOMContentLoaded', async () => {
  // Avatar picker events
  document.getElementById('avatar-picker').querySelectorAll('.av-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.av-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      G.selectedAvatar = btn.dataset.av;
    });
  });

  // Grade picker events
  document.getElementById('grade-picker').querySelectorAll('.grade-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.grade-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      G.selectedGrade = parseInt(btn.dataset.g);
    });
  });

  // Load existing profiles
  const users = await API.listUsers();
  if (users && users.length) {
    renderProfiles(users);
    document.getElementById('profiles-section').style.display = 'block';
    document.getElementById('new-profile-section').style.display = 'none';
  }
});

function showNewProfile() {
  document.getElementById('profiles-section').style.display = 'none';
  document.getElementById('new-profile-section').style.display = 'block';
}

function renderProfiles(users) {
  const list = document.getElementById('profiles-list');
  list.innerHTML = users.map(u => `
    <div class="profile-chip" onclick="loadProfile(${u.id})">
      <div class="profile-chip-av">${u.avatar}</div>
      <div class="profile-chip-info">
        <h4>${u.name}</h4>
        <span>Grade ${u.grade} · ⭐ ${u.stars} stars</span>
      </div>
    </div>
  `).join('');
}

async function loadProfile(uid) {
  const [user, progress, words, badges] = await Promise.all([
    API.getProfile(uid),
    API.getProgress(uid),
    API.getWords(uid),
    API.getBadges(uid),
  ]);
  if (!user) return;
  G.userId      = uid;
  G.playerName  = user.name;
  G.avatar      = user.avatar;
  G.outfit      = user.outfit || user.avatar;
  G.grade       = user.grade;
  G.stars       = user.stars;
  G.coins       = user.coins || 0;
  G.wordsLearned = words || [];
  G.badges      = badges || [];
  if (progress) {
    G.scores.spelling  = progress.spelling_score  || 0;
    G.scores.sentence  = progress.sentence_score  || 0;
    G.scores.reading   = progress.reading_score   || 0;
    G.scores.math      = progress.math_score      || 0;
    G.scores.concept   = progress.concept_score   || 0;
    G.scores.grammar   = progress.grammar_score   || 0;
    G.scores.science   = progress.science_score   || 0;
    G.scores.creative  = progress.creative_score  || 0;
    G.scores.geography = progress.geography_score || 0;
  }
  enterHome();
}

async function createProfile() {
  const name = document.getElementById('inp-name').value.trim();
  if (!name) {
    document.getElementById('inp-name').style.borderColor = 'var(--coral)';
    document.getElementById('inp-name').focus();
    return;
  }
  const user = await API.registerUser(name, G.selectedAvatar, G.selectedGrade);
  if (!user) {
    // Offline fallback
    G.userId = null;
    G.playerName = name;
    G.avatar  = G.selectedAvatar;
    G.outfit  = G.selectedAvatar;
    G.grade   = G.selectedGrade;
    G.stars   = 0;
  } else {
    G.userId     = user.id;
    G.playerName = user.name;
    G.avatar     = user.avatar;
    G.outfit     = user.outfit || user.avatar;
    G.grade      = user.grade;
    G.stars      = 0;
  }
  enterHome();
}

function enterHome() {
  G.lives = 3;
  refreshHeader();
  renderWorldsGrid();
  goTo('home');
  setTimeout(() => {
    const greets = [
      `Hi <b>${G.playerName}</b>! Ready for your learning adventure today? 🚀`,
      `Welcome back, <b>${G.playerName}</b>! Let's discover something new! 🌟`,
      `Hey <b>${G.playerName}</b>! Your worlds are waiting for you! 🗺️`,
    ];
    document.getElementById('greet-text').innerHTML = greets[Math.floor(Math.random()*greets.length)];
    Speech.speakSentence(`Hi ${G.playerName}! Ready to learn today?`);
  }, 300);
  renderDailyChallenge();
}

// ─── NAVIGATION ───────────────────────────────
function goTo(page) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('s-' + page)?.classList.add('active');
  document.querySelectorAll('.bnav').forEach(b => {
    b.classList.toggle('active', b.dataset.page === page);
  });
  if (page === 'map')         renderMap();
  if (page === 'progress')    renderProgressScreen();
  if (page === 'rewards')     renderRewardsScreen();
  if (page === 'leaderboard') renderLeaderboard();
  if (page === 'daily')       renderDailyChallenge();
}

// ─── WORLDS GRID ──────────────────────────────
function renderWorldsGrid() {
  const grid = document.getElementById('worlds-grid');
  grid.innerHTML = WORLDS.map(w => {
    const locked  = G.stars < w.unlock;
    const score   = w.id === 'words' ? G.wordsLearned.length : (G.scores[w.id] || 0);
    const maxScore= w.id === 'words' ? WORDS.length : 20;
    const pct     = Math.min(100, Math.round(score / maxScore * 100));
    return `
      <div class="world-tile wt-${w.id} ${locked?'locked':''}" onclick="${locked?'showLockedMsg()':'startWorld(\''+w.id+'\')'}" title="${locked?'Unlock at '+w.unlock+' ⭐':w.name}">
        ${locked?`<div class="wt-lock">🔒</div>`:''}
        <span class="wt-icon">${w.icon}</span>
        <div class="wt-name">${w.name}</div>
        <div class="wt-bar"><div class="wt-fill" style="width:${pct}%"></div></div>
        <div class="wt-stars">${locked?`🔒 Need ${w.unlock}⭐`:`⭐ ${score}`}</div>
      </div>
    `;
  }).join('');
}

function showLockedMsg() {
  FX.toast('Keep earning stars to unlock this world! ⭐');
  Speech.speak('Keep earning stars to unlock this world!');
}

// ─── START WORLD ──────────────────────────────
function startWorld(type) {
  G.lives = 3;
  updateHearts();
  const actMap = {
    words:     () => WordActivity.start(),
    spelling:  () => SpellActivity.start(),
    sentences: () => SentActivity.start(),
    reading:   () => ReadActivity.start(),
    math:      () => MathActivity.start(),
    concepts:  () => ConceptActivity.start(),
    grammar:   () => GrammarActivity.start(),
    science:   () => ScienceActivity.start(),
    creative:  () => CreativeActivity.start(),
    geography: () => GeoActivity.start(),
    daily:     () => goTo('daily'),
  };
  goTo('activity');
  if (actMap[type]) actMap[type]();
}

// ─── HEADER REFRESH ───────────────────────────
function refreshHeader() {
  document.getElementById('hdr-name').textContent  = G.playerName;
  document.getElementById('hdr-grade').textContent = `Grade ${G.grade}`;
  document.getElementById('hdr-av').textContent    = G.outfit;
  document.getElementById('greet-av').textContent  = G.outfit;
  document.getElementById('hdr-stars').textContent = G.stars;
  document.getElementById('hdr-coins').textContent = G.coins;
  const streak = G.scores.streak || 0;
  document.getElementById('hdr-streak').textContent = streak;
  renderWorldsGrid();
}

function updateHearts() {
  const h = document.getElementById('hearts');
  if (h) h.innerHTML = '❤️'.repeat(Math.max(0,G.lives)) + '🖤'.repeat(Math.max(0,3-G.lives));
}

// ─── SAVE STATE ───────────────────────────────
async function saveState() {
  if (!G.userId) return;
  // Update user stars/coins
  await API.updateProfile({
    user_id: G.userId,
    stars:   G.stars,
    coins:   G.coins,
    outfit:  G.outfit,
  });
  // Save progress scores
  await API.saveProgress({
    user_id:        G.userId,
    spelling_score:  G.scores.spelling  || 0,
    sentence_score:  G.scores.sentence  || 0,
    reading_score:   G.scores.reading   || 0,
    math_score:      G.scores.math      || 0,
    concept_score:   G.scores.concept   || 0,
    grammar_score:   G.scores.grammar   || 0,
    science_score:   G.scores.science   || 0,
    creative_score:  G.scores.creative  || 0,
    geography_score: G.scores.geography || 0,
  });
}

// ─── BADGES ───────────────────────────────────
function checkBadges() {
  BADGE_DEFS.forEach(b => {
    if (!G.badges.includes(b.id) && b.cond()) {
      G.badges.push(b.id);
      if (G.userId) API.addBadge(G.userId, b.id);
      showBadgeToast(b);
    }
  });
}

function showBadgeToast(b) {
  FX.toast(`${b.emoji} New Badge: ${b.name}!`, 3500);
  Speech.speak(`You earned a new badge: ${b.name}!`);
}

// ─── PROGRESS SCREEN ──────────────────────────
function renderProgressScreen() {
  const stats = [
    { icon:'📚', label:'Words Learned',    val: G.wordsLearned.length, max: WORDS.length,  color:'linear-gradient(90deg,#4ECDC4,#95E1D3)' },
    { icon:'✏️', label:'Spelling Correct', val: G.scores.spelling||0,  max: 30,            color:'linear-gradient(90deg,#FFA663,#FFD166)' },
    { icon:'💬', label:'Sentences Built',  val: G.scores.sentence||0,  max: 15,            color:'linear-gradient(90deg,#9D8DF1,#C3AED6)' },
    { icon:'📖', label:'Reading Answers',  val: G.scores.reading||0,   max: 30,            color:'linear-gradient(90deg,#4A9FD4,#87CEEB)' },
    { icon:'🔢', label:'Math Solved',      val: G.scores.math||0,      max: 40,            color:'linear-gradient(90deg,#FF5C5C,#FF8E53)' },
    { icon:'🧠', label:'Concept Score',    val: G.scores.concept||0,   max: 20,            color:'linear-gradient(90deg,#6BCB77,#95E1D3)' },
    { icon:'🖊️', label:'Grammar Score',   val: G.scores.grammar||0,   max: 20,            color:'linear-gradient(90deg,#F368E0,#FF9FF3)' },
    { icon:'🔬', label:'Science Score',    val: G.scores.science||0,   max: 20,            color:'linear-gradient(90deg,#00B4D8,#90E0EF)' },
    { icon:'✍️', label:'Creative Tasks',  val: G.scores.creative||0,  max: 10,            color:'linear-gradient(90deg,#FF9B44,#FFD166)' },
    { icon:'🌍', label:'Geography Score',  val: G.scores.geography||0, max: 20,            color:'linear-gradient(90deg,#2DC653,#7BC67E)' },
  ];
  const body = document.getElementById('prog-body');
  body.innerHTML = `
    <div style="padding:16px">
      <div class="prog-hero">
        <div class="prog-hero-av">${G.outfit}</div>
        <div class="prog-hero-name">${G.playerName}</div>
        <div class="prog-hero-sub">Grade ${G.grade} · ${BADGE_DEFS.filter(b=>b.cond()).length}/${BADGE_DEFS.length} Badges</div>
        <div class="prog-chips">
          <div class="prog-chip">⭐ ${G.stars} Stars</div>
          <div class="prog-chip">🪙 ${G.coins} Coins</div>
          <div class="prog-chip">📚 ${G.wordsLearned.length} Words</div>
        </div>
      </div>

      ${stats.map(s => {
        const pct = Math.min(100, Math.round(s.val/s.max*100));
        return `
          <div class="prog-stat">
            <div class="ps-icon">${s.icon}</div>
            <div class="ps-info">
              <h4>${s.label}</h4>
              <div class="ps-bar"><div class="ps-fill" style="width:${pct}%;background:${s.color}"></div></div>
            </div>
            <div class="ps-val">${s.val}</div>
          </div>
        `;
      }).join('')}

      ${G.wordsLearned.length ? `
        <h3 style="font-family:var(--font-head);font-size:18px;color:var(--navy);margin:16px 0 8px">📝 Words I Know</h3>
        <div class="words-chips">${G.wordsLearned.map(w=>`<span class="word-chip-sm">${w}</span>`).join('')}</div>
      ` : ''}
    </div>
  `;
}

// ─── LEADERBOARD ──────────────────────────────
async function renderLeaderboard() {
  const body = document.getElementById('lb-body');
  body.innerHTML = `<div style="text-align:center;padding:30px;font-size:24px;">Loading...</div>`;
  const data = await API.leaderboard();
  const ranks = ['gold','silver','bronze'];
  const medals = ['🥇','🥈','🥉'];
  if (!data || !data.length) {
    body.innerHTML = `<div style="padding:24px;text-align:center;font-weight:700;color:var(--navy)">No players yet! You're first! 🌟</div>`;
    return;
  }
  body.innerHTML = `
    <div style="padding:16px">
      <div class="prog-hero" style="margin-bottom:16px">
        <div style="font-size:52px">🏆</div>
        <div style="font-family:var(--font-head);font-size:24px;color:var(--sun)">Top Learners</div>
      </div>
      ${data.map((u,i) => `
        <div class="lb-item ${u.name===G.playerName?'me':''}">
          <div class="lb-rank ${ranks[i]||''}">${medals[i]||i+1}</div>
          <div class="lb-av">${u.avatar}</div>
          <div class="lb-info">
            <h4>${u.name} ${u.name===G.playerName?'(You)':''}</h4>
            <span>Grade ${u.grade}</span>
          </div>
          <div class="lb-stars">⭐ ${u.stars}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// ─── REWARDS ──────────────────────────────────
function renderRewardsScreen() {
  const earnedB = BADGE_DEFS.filter(b => b.cond());
  const lockedB = BADGE_DEFS.filter(b => !b.cond());
  const body = document.getElementById('rew-body');
  body.innerHTML = `
    <div style="padding:16px">
      <div class="prog-hero" style="margin-bottom:16px">
        <div style="font-size:72px">${G.outfit}</div>
        <div style="font-family:var(--font-head);font-size:24px;color:var(--sun)">${G.playerName}</div>
        <div class="prog-chips">
          <div class="prog-chip">⭐ ${G.stars}</div>
          <div class="prog-chip">🪙 ${G.coins}</div>
          <div class="prog-chip">🏅 ${earnedB.length}/${BADGE_DEFS.length}</div>
        </div>
      </div>

      <h3 style="font-family:var(--font-head);font-size:20px;color:var(--navy);margin-bottom:12px">🎭 My Avatar</h3>
      <div class="outfit-grid" style="margin-bottom:24px">
        ${OUTFITS.map(o => {
          const locked = G.stars < o.unlock;
          return `
            <div class="outfit-tile ${G.outfit===o.emoji?'active':''} ${locked?'locked':''}" onclick="${locked?'':'changeOutfit(\''+o.emoji+'\')'}" title="${locked?'Need '+o.unlock+' ⭐':o.name}">
              ${o.emoji}
              <div class="outfit-nm">${locked?`🔒${o.unlock}⭐`:o.name}</div>
            </div>
          `;
        }).join('')}
      </div>

      <h3 style="font-family:var(--font-head);font-size:20px;color:var(--navy);margin-bottom:12px">🏅 Badges</h3>
      <div class="badges-grid">
        ${[...earnedB,...lockedB].map(b => `
          <div class="badge-tile ${b.cond()?'earned':'locked'}">
            <span class="badge-em">${b.emoji}</span>
            <div class="badge-name">${b.name}</div>
            <div style="font-size:10px;color:#999;margin-top:2px;font-weight:600">${b.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function changeOutfit(emoji) {
  G.outfit = emoji;
  refreshHeader();
  saveState();
  renderRewardsScreen();
  FX.toast('🎭 New outfit equipped!');
}
