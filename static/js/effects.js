/* ═══════════════════════════════
   EFFECTS — visual candy
═══════════════════════════════ */
const FX = {
  confetti(count = 35) {
    const colors = ['#FF5C5C','#FFD166','#4ECDC4','#6BCB77','#9D8DF1','#FFA663','#87CEEB','#F368E0'];
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const p = document.createElement('div');
        p.className = 'confetti-p';
        const size = 8 + Math.random() * 10;
        p.style.cssText = `
          left:${Math.random()*100}vw;
          top:-20px;
          width:${size}px;
          height:${size}px;
          background:${colors[Math.floor(Math.random()*colors.length)]};
          transform:rotate(${Math.random()*360}deg);
          animation-delay:${Math.random()*0.6}s;
          animation-duration:${1.2+Math.random()*1}s;
          border-radius:${Math.random()>.5?'50%':'3px'};
        `;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 2600);
      }, i * 40);
    }
  },

  starBurst(el) {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    ['⭐','✨','🌟'].forEach((s, i) => {
      const sp = document.createElement('div');
      sp.className = 'star-pop';
      sp.textContent = s;
      sp.style.cssText = `left:${cx + (Math.random()-0.5)*80}px;top:${cy}px;animation-delay:${i*0.1}s;`;
      document.body.appendChild(sp);
      setTimeout(() => sp.remove(), 1200);
    });
  },

  toast(msg, dur = 3000) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.style.display = 'block';
    clearTimeout(t._timer);
    t._timer = setTimeout(() => { t.style.display = 'none'; }, dur);
  },

  showCompletion({ emoji='🎉', title='Well Done!', stars=3, msg='Great work!', onMore, worldType }) {
    const m = document.getElementById('modal-complete');
    document.getElementById('mc-emoji').textContent = emoji;
    document.getElementById('mc-title').textContent = title;
    document.getElementById('mc-stars').textContent = '⭐'.repeat(Math.max(1,Math.min(5,stars)));
    document.getElementById('mc-msg').textContent   = msg;
    const moreBtn = document.getElementById('mc-more');
    moreBtn.onclick = () => {
      m.style.display = 'none';
      if (onMore) onMore();
    };
    m.style.display = 'flex';
    FX.confetti(50);
  },

  closeCompletion() {
    document.getElementById('modal-complete').style.display = 'none';
  },
};
