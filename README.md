# 🌟 LearnQuest — Grade 1→5 Interactive Learning App

## 📁 FOLDER STRUCTURE

```
learnquest/
├── app.py                          ← Flask app + all API routes
├── models.py                       ← SQLAlchemy database models
├── requirements.txt                ← Python dependencies
├── learnquest.db                   ← SQLite database (auto-created on first run)
│
├── templates/
│   └── index.html                  ← Main SPA template (all screens)
│
└── static/
    ├── css/
    │   └── main.css                ← Complete stylesheet (all screens, components)
    │
    └── js/
        ├── data.js                 ← All Grade 1–5 content (words, math, stories, etc.)
        ├── api.js                  ← Flask API wrapper (fetch calls)
        ├── speech.js               ← Web Speech API (text-to-speech)
        ├── effects.js              ← Confetti, star bursts, toasts, modals
        ├── activities.js           ← All activity renderers (10 worlds)
        ├── map.js                  ← Canvas world map renderer
        └── main.js                 ← App controller, state, profiles, badges
```

---

## 🚀 SETUP & RUN

### 1. Install Python dependencies
```bash
pip install -r requirements.txt
```

### 2. Run the Flask server
```bash
python app.py
```

### 3. Open in browser
```
http://localhost:5000
```

---

## 🌍 10 LEARNING WORLDS

| World            | Skills                              | Unlocks At |
|------------------|-------------------------------------|------------|
| 📚 Word Valley    | Vocabulary, meanings, word quiz     | 0 ⭐       |
| ✏️ Spelling Harbor| Drag-letter spelling                | 0 ⭐       |
| 🔢 Math Mountain  | Add, subtract, multiply, word problems | 0 ⭐    |
| 💬 Sentence City  | Word-order sentence building        | 4 ⭐       |
| 🧠 Think Land     | Heavy/light, big/small, concepts    | 4 ⭐       |
| 📖 Reading River  | Stories + comprehension questions   | 8 ⭐       |
| 🖊️ Grammar Garden | Nouns, verbs, tenses, punctuation   | 10 ⭐      |
| ✍️ Creative Cove  | Free writing prompts                | 14 ⭐      |
| 🔬 Science Station| Plants, solar system, forces        | 16 ⭐      |
| 🌍 Geography Grove| Continents, oceans, capitals        | 22 ⭐      |

---

## 🔌 API ENDPOINTS

| Method | Route              | Description              |
|--------|--------------------|--------------------------|
| POST   | /api/register      | Create new user profile  |
| POST   | /api/login         | Log in existing user     |
| GET    | /api/users         | List all users           |
| GET    | /api/profile       | Get user profile         |
| PUT    | /api/profile       | Update stars/outfit/etc  |
| GET    | /api/progress      | Get learning progress    |
| POST   | /api/progress      | Save learning progress   |
| GET    | /api/words         | Get learned words        |
| POST   | /api/words         | Add a learned word       |
| GET    | /api/badges        | Get earned badges        |
| POST   | /api/badges        | Add a badge              |
| GET    | /api/leaderboard   | Top 10 learners          |
| GET    | /                  | Serve the frontend       |

---

## 🎯 CONTENT SUMMARY

- **80 vocabulary words** — Grade 1 to Grade 5, with meanings + example sentences
- **60 spelling words** — Sorted by grade difficulty
- **21 sentences** to build — From simple (Grade 1) to complex (Grade 5)
- **7 illustrated stories** — With 3 comprehension questions each
- **30+ math problems** — Addition, subtraction, multiplication, division, fractions, word problems
- **14 concept pairs** — Heavy/light, hot/cold, living/non-living, etc.
- **16 grammar questions** — Nouns, verbs, plurals, tenses, punctuation, passive voice
- **10 science facts + questions** — Plants, water cycle, solar system, forces, body
- **9 creative writing prompts**
- **8 geography questions**
- **18 achievement badges**
- **12 unlockable avatar outfits**

---

## ✅ BUGS FIXED FROM v1

1. **Sentence checker**: Now uses strict word-order comparison. Previously accepted any permutation as correct.
2. **Grammar fill-in**: Case-insensitive, trims spaces.
3. **Math compare**: Properly normalises `&gt;` / `&lt;` HTML entities before comparison.
4. **Lives system**: Fixed hearts display (filled hearts vs black hearts).
5. **Word quiz**: Correct answer highlighted if player answers wrong.
6. **Speech**: Every question, hint, feedback, and word meaning is read aloud via Web Speech API.

---

## 🔊 VERBAL EXPLANATIONS

Every screen has voice support:
- **Word meanings** — tap 🔊 to hear the word, its meaning, and example sentence
- **Story reading** — tap each word to hear it, or listen to the full story
- **Hints** — avatar hint strip reads aloud on every question
- **Correct/wrong feedback** — spoken after every answer
- **Sentence meanings** — explained verbally after correct sentence building
- **Grammar explanations** — spoken when revealing the correct rule
