/* ═══════════════════════════════
   SPEECH — Web Speech API wrapper
═══════════════════════════════ */
const Speech = {
  supported: 'speechSynthesis' in window,

  speak(text, opts = {}) {
    if (!this.supported) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate  = opts.rate  ?? 0.82;
    u.pitch = opts.pitch ?? 1.05;
    u.lang  = opts.lang  ?? 'en-US';
    if (opts.onend) u.onend = opts.onend;
    window.speechSynthesis.speak(u);
  },

  speakWord(word) {
    this.speak(word, { rate: 0.75, pitch: 1.1 });
  },

  speakSentence(text) {
    this.speak(text, { rate: 0.80 });
  },

  speakMeaning(text) {
    this.speak('This word means: ' + text, { rate: 0.82 });
  },

  speakExample(text) {
    this.speak('Example sentence: ' + text, { rate: 0.82 });
  },

  speakHint(msg) {
    this.speak(msg, { rate: 0.85, pitch: 1.1 });
  },

  cancel() {
    if (this.supported) window.speechSynthesis.cancel();
  }
};

// Convenience globals used in onclick attributes
function speakText(t)    { Speech.speak(t); }
function speakHint()     { Speech.speak(document.getElementById('hint-msg')?.textContent || ''); }
function speakWordDetail() {
  const w = document.getElementById('mw-word')?.textContent;
  if (w) Speech.speakWord(w);
}
function speakMeaning() {
  const m = document.getElementById('mw-meaning')?.textContent;
  if (m) Speech.speakMeaning(m);
}
function speakExample() {
  const e = document.getElementById('mw-example')?.textContent;
  if (e) Speech.speakExample(e);
}
