/* ═══════════════════════════════
   API  — Flask backend calls
═══════════════════════════════ */
const API = {
  base: '',          // same origin; Flask serves everything

  async get(path) {
    try {
      const r = await fetch(this.base + path);
      if (!r.ok) return null;
      return r.json();
    } catch { return null; }
  },

  async post(path, data) {
    try {
      const r = await fetch(this.base + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!r.ok) return null;
      return r.json();
    } catch { return null; }
  },

  async put(path, data) {
    try {
      const r = await fetch(this.base + path, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!r.ok) return null;
      return r.json();
    } catch { return null; }
  },

  // ── User ──────────────────────────────────────
  async registerUser(name, avatar, grade) {
    return this.post('/api/register', { name, avatar, grade });
  },
  async loginUser(name) {
    return this.post('/api/login', { name });
  },
  async listUsers() {
    return this.get('/api/users');
  },
  async getProfile(uid) {
    return this.get(`/api/profile?user_id=${uid}`);
  },
  async updateProfile(data) {
    return this.put('/api/profile', data);
  },

  // ── Progress ──────────────────────────────────
  async getProgress(uid) {
    return this.get(`/api/progress?user_id=${uid}`);
  },
  async saveProgress(data) {
    return this.post('/api/progress', data);
  },

  // ── Words ─────────────────────────────────────
  async getWords(uid) {
    return this.get(`/api/words?user_id=${uid}`);
  },
  async addWord(uid, word) {
    return this.post('/api/words', { user_id: uid, word });
  },

  // ── Badges ────────────────────────────────────
  async getBadges(uid) {
    return this.get(`/api/badges?user_id=${uid}`);
  },
  async addBadge(uid, badge_id) {
    return this.post('/api/badges', { user_id: uid, badge_id });
  },

  // ── Leaderboard ───────────────────────────────
  async leaderboard() {
    return this.get('/api/leaderboard');
  },
};
