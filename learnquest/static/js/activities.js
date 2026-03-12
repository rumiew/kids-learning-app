/* ═══════════════════════════════════════════════
   ACTIVITIES — all world renderers
═══════════════════════════════════════════════ */

/* ──────────────────────────────
   SHARED HELPERS
────────────────────────────── */
function setHint(msg) {
  document.getElementById('hint-msg').textContent = msg;
}
function setProgress(pct) {
  document.getElementById('act-prog').style.width = Math.min(100, pct) + '%';
}
function getBody() { return document.getElementById('act-body'); }

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function filterByGrade(arr) {
  return arr.filter(x => x.grade <= G.grade);
}

function renderFeedback(isOk, rightMsg, wrongMsg) {
  return `<div class="fb ${isOk?'ok':'err'}">
    <span class="fb-em">${isOk?'🎉':'🤔'}</span>
    <div>${isOk ? rightMsg : wrongMsg}</div>
  </div>`;
}

function disableOpts() {
  document.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);
}

/* ──────────────────────────────
   WORD VALLEY
────────────────────────────── */
const WordActivity = {
  pool: [],
  idx: 0,
  mode: 'browse',   // 'browse' | 'quiz'

  start() {
    this.pool  = shuffle(filterByGrade(WORDS)).slice(0, 10);
    this.idx   = 0;
    this.mode  = 'browse';
    document.getElementById('act-title').textContent = '📚 Word Valley';
    setHint('Tap a word to learn it, then take the quiz!');
    setProgress(0);
    this.renderBrowse();
  },

  renderBrowse() {
    const body = getBody();
    const grade = G.grade;
    const pool  = this.pool;
    body.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:16px">
        ${pool.map((w,i) => `
          <div class="world-tile wt-words" style="cursor:pointer" onclick="WordActivity.openWord(${i})">
            <span class="wt-icon">${w.emoji}</span>
            <div class="wt-name">${w.word}</div>
            ${G.wordsLearned.includes(w.word) ? '<div style="color:#6BCB77;font-size:12px;font-weight:800">✓ Learned</div>' : ''}
          </div>`).join('')}
      </div>
      <button class="btn-primary full-w" onclick="WordActivity.startQuiz()">🎯 Test Myself!</button>
    `;
  },

  openWord(i) {
    const w = this.pool[i];
    // fill modal
    document.getElementById('mw-emoji').textContent   = w.emoji;
    document.getElementById('mw-word').textContent    = w.word;
    document.getElementById('mw-meaning').textContent = w.meaning;
    document.getElementById('mw-example').textContent = `"${w.example}"`;
    document.getElementById('mw-learn').onclick = () => {
      this.markLearned(w.word);
      closeWordModal();
      this.renderBrowse();
    };
    document.getElementById('modal-word').style.display = 'flex';
    Speech.speakWord(w.word);
  },

  markLearned(word) {
    if (!G.wordsLearned.includes(word)) {
      G.wordsLearned.push(word);
      G.stars += 1;
      G.coins += 2;
      API.addWord(G.userId, word);
      saveState();
      refreshHeader();
      FX.toast('📚 Word learned: ' + word);
      checkBadges();
    }
  },

  startQuiz() {
    this.mode = 'quiz';
    this.idx  = 0;
    this.renderQ();
  },

  renderQ() {
    if (this.idx >= this.pool.length) {
      FX.showCompletion({ emoji:'📚', title:'Word Master!', msg:`You learned ${G.wordsLearned.length} words!`, onMore: () => WordActivity.start() });
      return;
    }
    setProgress((this.idx / this.pool.length) * 100);
    const w      = this.pool[this.idx];
    const others = shuffle(WORDS.filter(x => x.word !== w.word)).slice(0, 3);
    const opts   = shuffle([w, ...others]);
    const body   = getBody();
    setHint('Look at the picture and choose the correct word!');
    body.innerHTML = `
      <div class="q-card" id="qc">
        <div class="q-label">Question ${this.idx+1} of ${this.pool.length}</div>
        <span class="q-img">${w.emoji}</span>
        <div class="q-text">Which word matches this picture?</div>
        <div class="opts-2">
          ${opts.map(o => `<button class="opt-btn" onclick="WordActivity.checkAns(this,'${o.word}','${w.word}')">${o.word}</button>`).join('')}
        </div>
        <div id="fb"></div>
      </div>
    `;
    Speech.speakWord(w.word);
  },

  checkAns(btn, chosen, correct) {
    disableOpts();
    const ok = chosen === correct;
    btn.classList.add(ok ? 'right' : 'wrong');
    if (!ok) {
      document.querySelectorAll('.opt-btn').forEach(b => { if (b.textContent.trim() === correct) b.classList.add('right'); });
    }
    document.getElementById('fb').innerHTML = renderFeedback(ok,
      `Correct! "${correct}" goes with this picture!`,
      `The correct word is "${correct}". Let's try again!`);
    if (ok) { G.stars += 2; G.coins += 1; FX.starBurst(btn); saveState(); refreshHeader(); checkBadges(); this.markLearned(correct); }
    else    { G.lives = Math.max(0, G.lives - 1); updateHearts(); }
    setTimeout(() => { this.idx++; this.renderQ(); }, 1500);
  },
};

function closeWordModal() {
  document.getElementById('modal-word').style.display = 'none';
}

/* ──────────────────────────────
   SPELLING HARBOR
────────────────────────────── */
const SpellActivity = {
  pool: [], idx: 0, attempt: [], allTiles: [],

  start() {
    this.pool = shuffle(filterByGrade(SPELLING)).slice(0, 8);
    this.idx  = 0;
    document.getElementById('act-title').textContent = '✏️ Spelling Harbor';
    setHint('Listen to the word and tap the letters to spell it!');
    setProgress(0);
    this.renderQ();
  },

  renderQ() {
    if (this.idx >= this.pool.length) {
      FX.showCompletion({ emoji:'✏️', title:'Spelling Star!', msg:'Great spelling work!', onMore: () => SpellActivity.start() });
      return;
    }
    setProgress((this.idx / this.pool.length) * 100);
    const sp = this.pool[this.idx];
    this.attempt  = [];
    const wordLetters = sp.word.split('');
    const extras = 'abcdefghijklmnopqrstuvwxyz'.split('').filter(l => !sp.word.includes(l));
    const distractors = shuffle(extras).slice(0, Math.min(4, 26 - wordLetters.length));
    this.allTiles = shuffle([...wordLetters, ...distractors]);
    setHint(sp.hint + ' Spell the word!');

    const body = getBody();
    body.innerHTML = `
      <div class="q-card">
        <div class="q-label">Spell word ${this.idx+1} of ${this.pool.length}</div>
        <span class="q-img">${sp.emoji}</span>
        <button class="btn-speak" onclick="Speech.speakWord('${sp.word}')">🔊 Hear the word</button>
        <div class="spell-target" id="spell-target">
          <span class="spell-placeholder">Tap letters below ↓</span>
        </div>
        <div class="letter-bank" id="letter-bank">
          ${this.allTiles.map((l,i) => `<button class="letter-tile" id="lt-${i}" data-i="${i}" onclick="SpellActivity.addLetter(this,'${sp.word}')">${l.toUpperCase()}</button>`).join('')}
        </div>
        <div id="spell-fb"></div>
        <button class="btn-clear mt-8" onclick="SpellActivity.clearAttempt('${sp.word}')">🗑️ Clear</button>
      </div>
    `;
    Speech.speakWord(sp.word);
  },

  addLetter(tile, correctWord) {
    if (tile.classList.contains('used')) return;
    tile.classList.add('used');
    this.attempt.push({ tile, letter: tile.textContent.toLowerCase() });
    this.renderTarget(correctWord);
  },

  renderTarget(correctWord) {
    const tgt = document.getElementById('spell-target');
    if (!this.attempt.length) {
      tgt.innerHTML = `<span class="spell-placeholder">Tap letters below ↓</span>`;
      return;
    }
    tgt.innerHTML = this.attempt.map((a, i) =>
      `<div class="letter-slot" onclick="SpellActivity.removeLetter(${i},'${correctWord}')">${a.letter.toUpperCase()}</div>`
    ).join('');

    if (this.attempt.length === correctWord.length) {
      const typed = this.attempt.map(a => a.letter).join('');
      const fb = document.getElementById('spell-fb');
      if (typed === correctWord) {
        fb.innerHTML = renderFeedback(true, `Perfect! You spelled <b>${correctWord}</b>!`, '');
        G.stars += 2; G.coins += 2;
        G.scores.spelling = (G.scores.spelling || 0) + 1;
        FX.confetti(20);
        refreshHeader(); saveState(); checkBadges();
        Speech.speakWord(correctWord);
        setTimeout(() => { this.idx++; this.renderQ(); }, 2000);
      } else {
        fb.innerHTML = renderFeedback(false, '', `Not quite! The correct spelling is <b>${correctWord}</b>.`);
        G.lives = Math.max(0, G.lives - 1);
        updateHearts();
        setTimeout(() => this.clearAttempt(correctWord), 2000);
      }
    }
  },

  removeLetter(i, correctWord) {
    this.attempt[i].tile.classList.remove('used');
    this.attempt.splice(i, 1);
    this.renderTarget(correctWord);
  },

  clearAttempt(correctWord) {
    this.attempt.forEach(a => a.tile.classList.remove('used'));
    this.attempt = [];
    document.getElementById('spell-fb').innerHTML = '';
    this.renderTarget(correctWord);
  },
};

/* ──────────────────────────────
   SENTENCE CITY  (fixed logic)
────────────────────────────── */
const SentActivity = {
  pool: [], idx: 0, chosen: [],

  start() {
    this.pool = shuffle(filterByGrade(SENTENCES)).slice(0, 6);
    this.idx  = 0;
    document.getElementById('act-title').textContent = '💬 Sentence City';
    setHint('Tap the words in the correct order to build the sentence!');
    setProgress(0);
    this.renderQ();
  },

  renderQ() {
    if (this.idx >= this.pool.length) {
      FX.showCompletion({ emoji:'💬', title:'Sentence Builder!', msg:'Brilliant sentences!', onMore: () => SentActivity.start() });
      return;
    }
    setProgress((this.idx / this.pool.length) * 100);
    const s = this.pool[this.idx];
    this.chosen = [];
    const shuffledWords = shuffle(s.words);

    setHint('Tap the words in the correct order to build the sentence!');
    const body = getBody();
    body.innerHTML = `
      <div class="q-card" id="sent-card">
        <div class="q-label">Sentence ${this.idx+1} of ${this.pool.length}</div>
        <span class="q-img">${s.img}</span>
        <div class="q-text">Build the sentence:</div>
        <div class="sent-zone" id="sent-zone">
          <span style="color:#9D8DF1;font-size:14px;font-weight:700;">Tap words to place them here</span>
        </div>
        <div class="word-bank" id="word-bank">
          ${shuffledWords.map((w, i) =>
            `<button class="wb-chip" id="wb-${i}" data-word="${w}" data-i="${i}" onclick="SentActivity.addWord(this)">${w}</button>`
          ).join('')}
        </div>
        <div id="sent-fb"></div>
        <button class="btn-check mt-14" onclick="SentActivity.checkSentence()">✅ Check My Sentence!</button>
        <button class="btn-clear" onclick="SentActivity.clearSentence()">🗑️ Clear</button>
      </div>
    `;
  },

  addWord(chip) {
    if (chip.classList.contains('used')) return;
    chip.classList.add('used');
    this.chosen.push({ chip, word: chip.dataset.word });
    this.renderZone();
  },

  renderZone() {
    const zone = document.getElementById('sent-zone');
    if (!this.chosen.length) {
      zone.innerHTML = `<span style="color:#9D8DF1;font-size:14px;font-weight:700;">Tap words to place them here</span>`;
      return;
    }
    zone.innerHTML = this.chosen.map((c, i) =>
      `<div class="w-chip" onclick="SentActivity.removeWord(${i})">${c.word}</div>`
    ).join('');
  },

  removeWord(i) {
    this.chosen[i].chip.classList.remove('used');
    this.chosen.splice(i, 1);
    this.renderZone();
  },

  clearSentence() {
    this.chosen.forEach(c => c.chip.classList.remove('used'));
    this.chosen = [];
    document.getElementById('sent-fb').innerHTML = '';
    this.renderZone();
  },

  checkSentence() {
    const fb = document.getElementById('sent-fb');
    if (!this.chosen.length) {
      fb.innerHTML = renderFeedback(false, '', 'Tap words first to build your sentence!');
      return;
    }

    const s       = this.pool[this.idx];
    const typed   = this.chosen.map(c => c.word).join(' ');

    // ── Strict correct-order check ──
    // Strip trailing punctuation from the stored correct sentence for comparison
    const cleanCorrect = s.correct.replace(/[.!?]$/, '').trim();
    const ok = typed === cleanCorrect;

    if (ok) {
      fb.innerHTML = renderFeedback(true, `Perfect! "${typed}" ✅`, '');
      Speech.speakSentence(s.correct);
      setTimeout(() => {
        fb.innerHTML += `<div class="fb ok" style="margin-top:8px;"><span class="fb-em">💡</span><div>${s.meaning}</div></div>`;
      }, 800);
      G.stars += 2; G.coins += 2;
      G.scores.sentence = (G.scores.sentence || 0) + 1;
      FX.confetti(15);
      refreshHeader(); saveState(); checkBadges();
      setTimeout(() => { this.idx++; this.renderQ(); }, 3200);
    } else {
      fb.innerHTML = renderFeedback(false, '',
        `Not quite! Check the order. Correct: <b>"${s.correct}"</b>`);
      G.lives = Math.max(0, G.lives - 1);
      updateHearts();
      // Don't advance — let them retry
      setTimeout(() => {
        this.clearSentence();
        document.getElementById('sent-fb').innerHTML = '';
      }, 2500);
    }
  },
};

/* ──────────────────────────────
   READING RIVER
────────────────────────────── */
const ReadActivity = {
  pool: [], idx: 0, qIdx: 0,

  start() {
    this.pool = shuffle(filterByGrade(STORIES));
    this.idx  = 0;
    document.getElementById('act-title').textContent = '📖 Reading River';
    setHint('Read the story carefully, then answer the questions!');
    setProgress(0);
    this.renderStory();
  },

  renderStory() {
    if (this.idx >= this.pool.length) {
      FX.showCompletion({ emoji:'📖', title:'Reading Champion!', msg:'Excellent reading skills!', onMore: () => ReadActivity.start() });
      return;
    }
    const s = this.pool[this.idx];
    setProgress((this.idx / this.pool.length) * 100);
    const body = getBody();
    // Wrap each word for click-to-speak
    const wordSpans = s.text.split(' ').map(w =>
      `<span class="story-word" onclick="Speech.speakWord('${w.replace(/[^a-z]/gi,'')}')">${w}</span>`
    ).join(' ');
    body.innerHTML = `
      <div class="story-box">
        <div class="story-title">📖 ${s.title}</div>
        <span class="story-scene">${s.scene}</span>
        <div class="story-text">${wordSpans}</div>
        <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">
          <button class="btn-speak" onclick="Speech.speakSentence(\`${s.text}\`)">🔊 Listen to Story</button>
          <button class="btn-speak green" onclick="ReadActivity.startQuiz()">❓ Answer Questions</button>
        </div>
      </div>
    `;
  },

  startQuiz() {
    this.qIdx = 0;
    this.renderQ();
  },

  renderQ() {
    const s = this.pool[this.idx];
    if (this.qIdx >= s.questions.length) {
      G.stars += 3; refreshHeader(); saveState();
      FX.showCompletion({ emoji:'📚', title:'Story Complete!', msg:`You answered all ${s.questions.length} questions!`, onMore: () => { this.idx++; this.renderStory(); } });
      return;
    }
    const q = s.questions[this.qIdx];
    setHint('Think carefully about the story!');
    getBody().innerHTML = `
      <div class="q-card" id="rq-card">
        <div class="q-label">Question ${this.qIdx+1} of ${s.questions.length}</div>
        <div class="q-text">${q.q}</div>
        <div class="opts-1">
          ${q.opts.map((o, i) => `<button class="opt-btn" onclick="ReadActivity.checkAns(this,${i},${q.ans})">${o}</button>`).join('')}
        </div>
        <div id="rq-fb"></div>
      </div>
      <button class="btn-ghost full-w mt-8" onclick="ReadActivity.renderStory()">← Re-read Story</button>
    `;
  },

  checkAns(btn, chosen, correct) {
    disableOpts();
    const ok = chosen === correct;
    btn.classList.add(ok ? 'right' : 'wrong');
    if (!ok) document.querySelectorAll('.opt-btn')[correct].classList.add('right');
    document.getElementById('rq-fb').innerHTML = renderFeedback(ok, 'Correct! Great reading!', 'Not quite — re-read that part!');
    if (ok) { G.stars += 2; G.scores.reading = (G.scores.reading||0)+1; FX.starBurst(btn); refreshHeader(); saveState(); checkBadges(); }
    else    { G.lives = Math.max(0,G.lives-1); updateHearts(); }
    setTimeout(() => { this.qIdx++; this.renderQ(); }, 1500);
  },
};

/* ──────────────────────────────
   MATH MOUNTAIN
────────────────────────────── */
const MathActivity = {
  pool: [], idx: 0,

  start() {
    this.pool = shuffle(filterByGrade(MATH)).slice(0, 8);
    this.idx  = 0;
    document.getElementById('act-title').textContent = '🔢 Math Mountain';
    setHint('Solve the math problem!');
    setProgress(0);
    this.renderQ();
  },

  renderQ() {
    if (this.idx >= this.pool.length) {
      FX.showCompletion({ emoji:'🔢', title:'Math Wizard!', msg:'Incredible number skills!', onMore: () => MathActivity.start() });
      return;
    }
    setProgress((this.idx / this.pool.length) * 100);
    const p = this.pool[this.idx];
    if (p.type === 'word')    this.renderWord(p);
    else if (p.type === 'compare') this.renderCompare(p);
    else if (p.type === 'frac')    this.renderFrac(p);
    else                      this.renderEq(p);
  },

  renderEq(p) {
    const opMap = { add:'+', sub:'−', mult:'×', div:'÷' };
    const op    = opMap[p.type];
    const vis   = p.a <= 12 ? Array(p.a).fill(p.emoji).join(' ') : '';
    setHint(p.type === 'add' || p.type === 'mult' ? 'Add them together!' : 'Take away the second group!');
    getBody().innerHTML = `
      <div class="q-card">
        <div class="q-label">Math Problem ${this.idx+1} of ${this.pool.length}</div>
        ${vis ? `<div class="math-vis">${vis}</div>` : ''}
        <div class="math-eq">
          <span>${p.a}</span><span>${op}</span><span>${p.b}</span><span>=</span>
          <input class="math-inp" type="number" id="math-inp" placeholder="?" min="0" max="9999" />
        </div>
        <div id="math-fb"></div>
        <button class="btn-check" onclick="MathActivity.checkNum(${p.ans})">✅ Check!</button>
      </div>
    `;
    document.getElementById('math-inp').addEventListener('keydown', e => { if(e.key==='Enter') MathActivity.checkNum(p.ans); });
  },

  renderWord(p) {
    setHint('Read the problem carefully, then solve it!');
    const opLabel = { '+':'Add', '-':'Subtract', '×':'Multiply', '÷':'Divide' };
    getBody().innerHTML = `
      <div class="q-card">
        <div class="q-label">Word Problem ${this.idx+1} of ${this.pool.length}</div>
        <span class="q-img">${p.emoji}</span>
        <div style="background:linear-gradient(135deg,#FFFBEE,#FFF5D0);border-radius:16px;padding:16px;margin-bottom:14px;font-size:18px;font-weight:700;color:var(--navy);line-height:1.7;border:3px solid var(--sun);">
          ${p.story}
        </div>
        <div class="q-text">${p.question}</div>
        <button class="btn-speak" style="margin-bottom:12px;" onclick="Speech.speakSentence('${p.story} ${p.question}')">🔊 Read the problem</button>
        <div class="math-eq">
          <span>${p.a}</span><span>${p.op}</span><span>${p.b}</span><span>=</span>
          <input class="math-inp" type="number" id="math-inp" placeholder="?" min="0" max="9999"/>
        </div>
        <div id="math-fb"></div>
        <button class="btn-check" onclick="MathActivity.checkNum(${p.ans})">✅ Solve It!</button>
      </div>
    `;
    document.getElementById('math-inp').addEventListener('keydown', e => { if(e.key==='Enter') MathActivity.checkNum(p.ans); });
    Speech.speakSentence(p.story + ' ' + p.question);
  },

  renderCompare(p) {
    setHint('Which sign goes between these numbers?');
    getBody().innerHTML = `
      <div class="q-card">
        <div class="q-label">Compare Numbers ${this.idx+1} of ${this.pool.length}</div>
        <div class="math-eq" style="font-size:52px">${p.a} <span style="color:#9D8DF1">?</span> ${p.b}</div>
        <div class="opts-1">
          <button class="opt-btn" onclick="MathActivity.checkCompare(this,'&gt;','${p.ans}')">› Greater than  ( ${p.a} > ${p.b} )</button>
          <button class="opt-btn" onclick="MathActivity.checkCompare(this,'&lt;','${p.ans}')">‹ Less than     ( ${p.a} < ${p.b} )</button>
          <button class="opt-btn" onclick="MathActivity.checkCompare(this,'=','${p.ans}')">= Equal to      ( ${p.a} = ${p.b} )</button>
        </div>
        <div id="math-fb"></div>
      </div>
    `;
  },

  renderFrac(p) {
    setHint('Think about the fraction — part out of total!');
    setHint(p.story);
    getBody().innerHTML = `
      <div class="q-card">
        <div class="q-label">Fractions ${this.idx+1} of ${this.pool.length}</div>
        <div style="background:linear-gradient(135deg,#FFFBEE,#FFF5D0);border-radius:16px;padding:16px;margin-bottom:14px;font-size:18px;font-weight:700;color:var(--navy);line-height:1.7;border:3px solid var(--sun);">${p.story}</div>
        <div class="q-text">${p.question}</div>
        <div class="opts-2">
          ${p.choices.map((c,i) => `<button class="opt-btn" style="font-size:22px;font-weight:800;" onclick="MathActivity.checkFrac(this,${i},${p.ans})">${c}</button>`).join('')}
        </div>
        <div id="math-fb"></div>
      </div>
    `;
  },

  checkNum(correct) {
    const inp = document.getElementById('math-inp');
    const val = parseFloat(inp.value);
    const fb  = document.getElementById('math-fb');
    if (inp.value === '' || isNaN(val)) {
      fb.innerHTML = renderFeedback(false,'','Type your answer first!');
      return;
    }
    const ok = Math.abs(val - correct) < 0.01;
    fb.innerHTML = renderFeedback(ok, `Correct! The answer is ${correct}! 🎉`, `Not quite! The answer is ${correct}. Try again!`);
    inp.style.borderColor = ok ? 'var(--grass)' : 'var(--coral)';
    if (ok) { G.stars += 2; G.scores.math=(G.scores.math||0)+1; FX.confetti(20); refreshHeader(); saveState(); checkBadges(); }
    else    { G.lives=Math.max(0,G.lives-1); updateHearts(); }
    setTimeout(() => { this.idx++; this.renderQ(); }, 1800);
  },

  checkCompare(btn, chosen, correct) {
    disableOpts();
    // Normalise HTML entities
    const c = chosen.replace('&gt;','>').replace('&lt;','<');
    const ok = c === correct;
    btn.classList.add(ok?'right':'wrong');
    if (!ok) document.querySelectorAll('.opt-btn').forEach(b => {
      const bc = b.getAttribute('onclick').match(/'([<>=])'/);
      if (bc && bc[1] === correct) b.classList.add('right');
    });
    document.getElementById('math-fb').innerHTML = renderFeedback(ok,'Correct comparison!','Not quite — try again!');
    if (ok) { G.stars+=2; G.scores.math=(G.scores.math||0)+1; FX.starBurst(btn); refreshHeader(); saveState(); checkBadges(); }
    else    { G.lives=Math.max(0,G.lives-1); updateHearts(); }
    setTimeout(() => { this.idx++; this.renderQ(); }, 1500);
  },

  checkFrac(btn, chosen, correct) {
    disableOpts();
    const ok = chosen === correct;
    btn.classList.add(ok?'right':'wrong');
    if (!ok) document.querySelectorAll('.opt-btn')[correct].classList.add('right');
    document.getElementById('math-fb').innerHTML = renderFeedback(ok,'Correct fraction!','Not quite! Think about the part out of the whole.');
    if (ok) { G.stars+=3; G.scores.math=(G.scores.math||0)+1; FX.confetti(15); refreshHeader(); saveState(); checkBadges(); }
    else    { G.lives=Math.max(0,G.lives-1); updateHearts(); }
    setTimeout(() => { this.idx++; this.renderQ(); }, 1500);
  },
};

/* ──────────────────────────────
   THINK LAND (Concepts)
────────────────────────────── */
const ConceptActivity = {
  pool: [], idx: 0,

  start() {
    this.pool = shuffle(filterByGrade(CONCEPTS)).slice(0, 6);
    this.idx  = 0;
    document.getElementById('act-title').textContent = '🧠 Think Land';
    setHint('Think carefully and choose the correct answer!');
    setProgress(0);
    this.renderQ();
  },

  renderQ() {
    if (this.idx >= this.pool.length) {
      FX.showCompletion({ emoji:'🧠', title:'Big Thinker!', msg:'Your thinking skills are amazing!', onMore: () => ConceptActivity.start() });
      return;
    }
    setProgress((this.idx/this.pool.length)*100);
    const c = this.pool[this.idx];
    setHint(c.q);
    Speech.speakHint(c.q);
    getBody().innerHTML = `
      <div class="q-card">
        <div class="q-label">${c.concept}</div>
        <div class="q-text">${c.q}</div>
        <div class="cmp-grid">
          <div class="cmp-box cmp-a" onclick="ConceptActivity.check(this,${c.a.ok},'${c.a.lb}')">
            <span class="cmp-em">${c.a.em}</span>
            <div class="cmp-lbl">${c.a.lb}</div>
          </div>
          <div class="cmp-box cmp-b" onclick="ConceptActivity.check(this,${c.b.ok},'${c.b.lb}')">
            <span class="cmp-em">${c.b.em}</span>
            <div class="cmp-lbl">${c.b.lb}</div>
          </div>
        </div>
        <div id="con-fb"></div>
      </div>
    `;
  },

  check(el, ok, label) {
    document.querySelectorAll('.cmp-box').forEach(b => b.style.pointerEvents='none');
    el.style.border = `4px solid ${ok?'var(--grass)':'var(--coral)'}`;
    el.style.background = ok ? 'linear-gradient(135deg,#E8FFF0,#C8FFD8)' : 'linear-gradient(135deg,#FFF0F0,#FFD8D8)';
    document.getElementById('con-fb').innerHTML = renderFeedback(ok,
      `Yes! "${label}" is correct! 🌟`,
      `Not quite! Look at both options again.`);
    if (ok) {
      Speech.speak(`Yes! ${label} is correct!`);
      G.stars+=2; G.scores.concept=(G.scores.concept||0)+1; FX.confetti(15); refreshHeader(); saveState(); checkBadges();
    } else {
      G.lives=Math.max(0,G.lives-1); updateHearts();
    }
    setTimeout(() => { this.idx++; this.renderQ(); }, 1800);
  },
};

/* ──────────────────────────────
   GRAMMAR GARDEN
────────────────────────────── */
const GrammarActivity = {
  pool: [], idx: 0,

  start() {
    this.pool = shuffle(filterByGrade(GRAMMAR)).slice(0, 7);
    this.idx  = 0;
    document.getElementById('act-title').textContent = '🖊️ Grammar Garden';
    setHint('Choose the correct grammar answer!');
    setProgress(0);
    this.renderQ();
  },

  renderQ() {
    if (this.idx >= this.pool.length) {
      FX.showCompletion({ emoji:'🖊️', title:'Grammar Pro!', msg:'Excellent grammar skills!', onMore: () => GrammarActivity.start() });
      return;
    }
    setProgress((this.idx/this.pool.length)*100);
    const g = this.pool[this.idx];
    setHint(g.explanation || 'Choose carefully!');

    if (g.type === 'fill') {
      this.renderFill(g);
    } else {
      this.renderChoose(g);
    }
  },

  renderChoose(g) {
    Speech.speakSentence(g.q);
    getBody().innerHTML = `
      <div class="q-card">
        <div class="q-label">Grammar ${this.idx+1} of ${this.pool.length}</div>
        <div class="q-text">${g.q}</div>
        <button class="btn-speak" style="margin-bottom:12px" onclick="Speech.speakSentence('${g.q}')">🔊 Read Question</button>
        <div class="opts-1">
          ${g.opts.map((o,i)=>`<button class="opt-btn" onclick="GrammarActivity.checkOpt(this,${i},${g.ans},'${(g.explanation||'').replace(/'/g,"\\'")}'">${o}</button>`).join('')}
        </div>
        <div id="gram-fb"></div>
      </div>
    `;
  },

  renderFill(g) {
    Speech.speakSentence(g.template);
    getBody().innerHTML = `
      <div class="q-card">
        <div class="q-label">Fill in the blank ${this.idx+1} of ${this.pool.length}</div>
        <div class="q-text">${g.template}</div>
        <div class="hint-bubble" style="background:#FFF8E0;border:2px solid var(--sun);border-radius:14px;padding:12px;margin:10px 0;font-size:15px;font-weight:700;color:var(--navy);">
          💡 Hint: ${g.hint}
        </div>
        <button class="btn-speak" onclick="Speech.speakSentence('${g.template}')">🔊 Read</button>
        <input type="text" id="fill-inp" class="big-input mt-12" placeholder="Type your answer..." autocomplete="off" autocorrect="off" />
        <div id="gram-fb"></div>
        <button class="btn-check mt-8" onclick="GrammarActivity.checkFill('${g.answer}','${(g.explanation||'').replace(/'/g,"\\'")}')">✅ Check!</button>
      </div>
    `;
    document.getElementById('fill-inp').addEventListener('keydown', e => {
      if (e.key==='Enter') GrammarActivity.checkFill(g.answer, g.explanation||'');
    });
  },

  checkOpt(btn, chosen, correct, explanation) {
    disableOpts();
    const ok = chosen === correct;
    btn.classList.add(ok?'right':'wrong');
    if (!ok) document.querySelectorAll('.opt-btn')[correct].classList.add('right');
    const expHtml = explanation ? `<div class="fb ok" style="margin-top:8px"><span class="fb-em">💡</span><div>${explanation}</div></div>` : '';
    document.getElementById('gram-fb').innerHTML = renderFeedback(ok,'Correct!','Not quite — see the explanation:') + expHtml;
    if (explanation) Speech.speakSentence(explanation);
    if (ok) { G.stars+=2; G.scores.grammar=(G.scores.grammar||0)+1; FX.starBurst(btn); refreshHeader(); saveState(); checkBadges(); }
    else    { G.lives=Math.max(0,G.lives-1); updateHearts(); }
    setTimeout(() => { this.idx++; this.renderQ(); }, 2200);
  },

  checkFill(correct, explanation) {
    const inp = document.getElementById('fill-inp');
    const val = (inp.value || '').trim().toLowerCase();
    const ok  = val === correct.toLowerCase();
    const expHtml = explanation ? `<div class="fb ok" style="margin-top:8px"><span class="fb-em">💡</span><div>${explanation}</div></div>` : '';
    document.getElementById('gram-fb').innerHTML = renderFeedback(ok,
      `Correct! The answer is "${correct}"`,
      `The correct answer is "${correct}".`) + expHtml;
    inp.style.borderColor = ok ? 'var(--grass)' : 'var(--coral)';
    if (explanation && !ok) Speech.speakSentence(explanation);
    if (ok) { G.stars+=2; G.scores.grammar=(G.scores.grammar||0)+1; FX.confetti(15); refreshHeader(); saveState(); checkBadges(); }
    else    { G.lives=Math.max(0,G.lives-1); updateHearts(); }
    setTimeout(() => { this.idx++; this.renderQ(); }, 2200);
  },
};

/* ──────────────────────────────
   SCIENCE STATION
────────────────────────────── */
const ScienceActivity = {
  pool: [], idx: 0,

  start() {
    this.pool = shuffle(filterByGrade(SCIENCE)).slice(0, 6);
    this.idx  = 0;
    document.getElementById('act-title').textContent = '🔬 Science Station';
    setHint('Read the science fact, then answer the question!');
    setProgress(0);
    this.renderQ();
  },

  renderQ() {
    if (this.idx >= this.pool.length) {
      FX.showCompletion({ emoji:'🔬', title:'Scientist!', msg:'Brilliant science knowledge!', onMore: () => ScienceActivity.start() });
      return;
    }
    setProgress((this.idx/this.pool.length)*100);
    const s = this.pool[this.idx];
    setHint('Read the fact carefully!');
    Speech.speakSentence(s.fact);
    getBody().innerHTML = `
      <div class="sci-fact">
        <span class="sci-fact-icon">${s.scene}</span>
        <div style="font-family:var(--font-head);font-size:17px;color:var(--navy);margin-bottom:6px">${s.topic}</div>
        <div class="sci-fact-text">${s.fact}</div>
        <button class="btn-speak mt-8" onclick="Speech.speakSentence('${s.fact}')">🔊 Read the Fact</button>
      </div>
      <div class="q-card" id="sci-qcard">
        <div class="q-label">Question ${this.idx+1} of ${this.pool.length}</div>
        <div class="q-text">${s.q}</div>
        <div class="opts-1">
          ${s.opts.map((o,i)=>`<button class="opt-btn" onclick="ScienceActivity.checkAns(this,${i},${s.ans})">${o}</button>`).join('')}
        </div>
        <div id="sci-fb"></div>
      </div>
    `;
  },

  checkAns(btn, chosen, correct) {
    disableOpts();
    const ok = chosen === correct;
    btn.classList.add(ok?'right':'wrong');
    if (!ok) document.querySelectorAll('.opt-btn')[correct].classList.add('right');
    document.getElementById('sci-fb').innerHTML = renderFeedback(ok,'Correct! 🔬 Science star!','Not quite — re-read the fact!');
    if (ok) { G.stars+=2; G.scores.science=(G.scores.science||0)+1; FX.starBurst(btn); refreshHeader(); saveState(); checkBadges(); }
    else    { G.lives=Math.max(0,G.lives-1); updateHearts(); }
    setTimeout(() => { this.idx++; this.renderQ(); }, 1600);
  },
};

/* ──────────────────────────────
   CREATIVE COVE
────────────────────────────── */
const CreativeActivity = {
  pool: [], idx: 0,

  start() {
    this.pool = shuffle(filterByGrade(CREATIVE)).slice(0, 3);
    this.idx  = 0;
    document.getElementById('act-title').textContent = '✍️ Creative Cove';
    setHint('Use your imagination and write!');
    setProgress(0);
    this.renderQ();
  },

  renderQ() {
    if (this.idx >= this.pool.length) {
      FX.showCompletion({ emoji:'✍️', title:'Creative Writer!', msg:'Amazing imagination!', onMore: () => CreativeActivity.start() });
      return;
    }
    setProgress((this.idx/this.pool.length)*100);
    const c = this.pool[this.idx];
    setHint('Write your answer below. There are no wrong answers here!');
    Speech.speakSentence(c.prompt);
    getBody().innerHTML = `
      <div class="creative-prompt">
        <div style="font-size:40px;margin-bottom:10px;">✍️</div>
        <p>${c.prompt}</p>
        <button class="btn-speak mt-8" onclick="Speech.speakSentence('${c.prompt.replace(/'/g,"\\'")}')">🔊 Read prompt</button>
      </div>
      <textarea class="big-textarea" id="creative-text" placeholder="Start writing here..." rows="5"></textarea>
      <div id="cre-fb"></div>
      <button class="btn-check mt-14" onclick="CreativeActivity.submit(${c.minWords})">✅ Submit My Writing!</button>
    `;
  },

  submit(minWords) {
    const text = (document.getElementById('creative-text').value || '').trim();
    const wc   = text.split(/\s+/).filter(Boolean).length;
    const fb   = document.getElementById('cre-fb');
    if (wc < 3) {
      fb.innerHTML = renderFeedback(false,'','Write at least a few words first!');
      return;
    }
    fb.innerHTML = `<div class="fb ok"><span class="fb-em">🎉</span><div>Great writing! You wrote <b>${wc} words</b>! Keep it up!</div></div>`;
    Speech.speakSentence(text);
    G.stars += wc >= minWords ? 3 : 2;
    G.scores.creative = (G.scores.creative||0)+1;
    FX.confetti(20);
    refreshHeader(); saveState(); checkBadges();
    setTimeout(() => { this.idx++; this.renderQ(); }, 3000);
  },
};

/* ──────────────────────────────
   GEOGRAPHY GROVE
────────────────────────────── */
const GeoActivity = {
  pool: [], idx: 0,

  start() {
    this.pool = shuffle(filterByGrade(GEOGRAPHY)).slice(0, 6);
    this.idx  = 0;
    document.getElementById('act-title').textContent = '🌍 Geography Grove';
    setHint('Learn about the world around you!');
    setProgress(0);
    this.renderQ();
  },

  renderQ() {
    if (this.idx >= this.pool.length) {
      FX.showCompletion({ emoji:'🌍', title:'World Explorer!', msg:'You know so much about the world!', onMore: () => GeoActivity.start() });
      return;
    }
    setProgress((this.idx/this.pool.length)*100);
    const g = this.pool[this.idx];
    setHint('Read the fact, then answer!');
    Speech.speakSentence(g.fact);
    getBody().innerHTML = `
      <div class="sci-fact">
        <span class="sci-fact-icon">${g.scene}</span>
        <div class="sci-fact-text">${g.fact}</div>
        <button class="btn-speak mt-8" onclick="Speech.speakSentence('${g.fact.replace(/'/g,"\\'")}')">🔊 Read Fact</button>
      </div>
      <div class="q-card">
        <div class="q-label">Question ${this.idx+1} of ${this.pool.length}</div>
        <div class="q-text">${g.q}</div>
        <div class="opts-2">
          ${g.opts.map((o,i)=>`<button class="opt-btn" onclick="GeoActivity.checkAns(this,${i},${g.ans})">${o}</button>`).join('')}
        </div>
        <div id="geo-fb"></div>
      </div>
    `;
  },

  checkAns(btn, chosen, correct) {
    disableOpts();
    const ok = chosen === correct;
    btn.classList.add(ok?'right':'wrong');
    if (!ok) document.querySelectorAll('.opt-btn')[correct].classList.add('right');
    document.getElementById('geo-fb').innerHTML = renderFeedback(ok,'Correct! 🌍 World Explorer!','Not quite — re-read the fact!');
    if (ok) { G.stars+=2; G.scores.geography=(G.scores.geography||0)+1; FX.starBurst(btn); refreshHeader(); saveState(); checkBadges(); }
    else    { G.lives=Math.max(0,G.lives-1); updateHearts(); }
    setTimeout(() => { this.idx++; this.renderQ(); }, 1600);
  },
};

/* ──────────────────────────────
   DAILY CHALLENGE
────────────────────────────── */
function renderDailyChallenge() {
  const tasks = [
    { id:'words',    label:'Learn 4 new words',      icon:'📚', done: G.wordsLearned.length >= 4,     action:()=>startWorld('words') },
    { id:'spelling', label:'Spell 3 words correctly', icon:'✏️', done: (G.scores.spelling||0) >= 3,   action:()=>startWorld('spelling') },
    { id:'sentence', label:'Build 2 sentences',       icon:'💬', done: (G.scores.sentence||0) >= 2,   action:()=>startWorld('sentences') },
    { id:'math',     label:'Solve 3 math problems',   icon:'🔢', done: (G.scores.math||0) >= 3,       action:()=>startWorld('math') },
    { id:'reading',  label:'Answer 3 reading Qs',     icon:'📖', done: (G.scores.reading||0) >= 3,    action:()=>startWorld('reading') },
  ];
  const allDone = tasks.every(t => t.done);
  const body = document.getElementById('daily-body');
  body.innerHTML = `
    <div style="padding:16px">
      <div class="prog-hero" style="margin-bottom:16px">
        <div style="font-size:52px">${allDone?'🏆':'⚡'}</div>
        <div style="font-family:var(--font-head);font-size:24px;color:var(--sun);">${allDone?'Daily Challenge Complete!':'Daily Challenge'}</div>
        <div style="font-size:14px;opacity:.7;margin-top:4px">${allDone?'Amazing! You did everything today!':'Complete all tasks for bonus rewards!'}</div>
      </div>
      ${tasks.map(t => `
        <div class="prog-stat" style="cursor:pointer;background:${t.done?'#F0FFF5':'white'};border:3px solid ${t.done?'var(--grass)':'transparent'}" onclick="${t.done?'':'('+t.action.toString()+'())'}" >
          <div class="ps-icon">${t.icon}</div>
          <div class="ps-info">
            <h4>${t.label}</h4>
          </div>
          <div style="font-size:28px">${t.done?'✅':'▶️'}</div>
        </div>`).join('')}
      ${allDone ? `<div class="fb ok mt-14"><span class="fb-em">🏆</span><div>You earned <b>10 bonus stars</b>! Keep it up every day!</div></div>` : ''}
    </div>
  `;
  if (allDone && !G.dailyBonusClaimed) {
    G.dailyBonusClaimed = true;
    G.stars += 10; G.coins += 10;
    refreshHeader(); saveState(); checkBadges();
    FX.confetti(60);
  }
  // update header daily dots
  const ddIds = ['dd0','dd1','dd2','dd3'];
  [tasks[0],tasks[1],tasks[2],tasks[3]].forEach((t,i) => {
    const el = document.getElementById(ddIds[i]);
    if (el) el.classList.toggle('done', t.done);
  });
  const sub = document.getElementById('daily-sub');
  if (sub) sub.textContent = `${tasks.filter(t=>t.done).length}/${tasks.length} tasks done`;
}
