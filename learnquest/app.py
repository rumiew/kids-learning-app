from flask import Flask, render_template, request, jsonify, session
from flask_cors import CORS
import json, os, uuid
from datetime import datetime
from models import db, User, Progress, Badge, WordLearned, Session as LearningSession

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'learnquest-secret-2024')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///learnquest.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
db.init_app(app)

with app.app_context():
    db.create_all()


# ─────────────────────────────────────────
#  USER / PROFILE
# ─────────────────────────────────────────
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name', '').strip()
    avatar = data.get('avatar', '🦊')
    grade = data.get('grade', 1)
    if not name:
        return jsonify({'error': 'Name required'}), 400
    user = User(name=name, avatar=avatar, grade=grade)
    db.session.add(user)
    db.session.commit()
    session['user_id'] = user.id
    return jsonify(user.to_dict())


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(name=data.get('name', '')).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    session['user_id'] = user.id
    return jsonify(user.to_dict())


@app.route('/api/users', methods=['GET'])
def list_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users])


@app.route('/api/profile', methods=['GET'])
def get_profile():
    uid = request.args.get('user_id') or session.get('user_id')
    if not uid:
        return jsonify({'error': 'Not logged in'}), 401
    user = User.query.get(uid)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify(user.to_dict())


@app.route('/api/profile', methods=['PUT'])
def update_profile():
    uid = request.json.get('user_id') or session.get('user_id')
    user = User.query.get(uid)
    if not user:
        return jsonify({'error': 'Not found'}), 404
    for field in ['avatar', 'outfit', 'stars', 'coins', 'grade', 'current_world', 'current_level']:
        if field in request.json:
            setattr(user, field, request.json[field])
    db.session.commit()
    return jsonify(user.to_dict())


# ─────────────────────────────────────────
#  PROGRESS
# ─────────────────────────────────────────
@app.route('/api/progress', methods=['GET'])
def get_progress():
    uid = request.args.get('user_id') or session.get('user_id')
    prog = Progress.query.filter_by(user_id=uid).first()
    if not prog:
        return jsonify({})
    return jsonify(prog.to_dict())


@app.route('/api/progress', methods=['POST'])
def save_progress():
    data = request.json
    uid = data.get('user_id') or session.get('user_id')
    prog = Progress.query.filter_by(user_id=uid).first()
    if not prog:
        prog = Progress(user_id=uid)
        db.session.add(prog)
    for field in ['words_score', 'spelling_score', 'sentence_score',
                  'reading_score', 'math_score', 'concept_score',
                  'grammar_score', 'creative_score', 'science_score',
                  'geography_score', 'daily_streak', 'total_sessions']:
        if field in data:
            setattr(prog, field, data[field])
    prog.last_active = datetime.utcnow()
    db.session.commit()
    return jsonify(prog.to_dict())


# ─────────────────────────────────────────
#  WORDS LEARNED
# ─────────────────────────────────────────
@app.route('/api/words', methods=['GET'])
def get_words():
    uid = request.args.get('user_id') or session.get('user_id')
    words = WordLearned.query.filter_by(user_id=uid).all()
    return jsonify([w.word for w in words])


@app.route('/api/words', methods=['POST'])
def add_word():
    data = request.json
    uid = data.get('user_id') or session.get('user_id')
    word = data.get('word', '').lower()
    existing = WordLearned.query.filter_by(user_id=uid, word=word).first()
    if not existing:
        wl = WordLearned(user_id=uid, word=word)
        db.session.add(wl)
        db.session.commit()
    return jsonify({'status': 'ok', 'word': word})


# ─────────────────────────────────────────
#  BADGES
# ─────────────────────────────────────────
@app.route('/api/badges', methods=['GET'])
def get_badges():
    uid = request.args.get('user_id') or session.get('user_id')
    badges = Badge.query.filter_by(user_id=uid).all()
    return jsonify([b.badge_id for b in badges])


@app.route('/api/badges', methods=['POST'])
def add_badge():
    data = request.json
    uid = data.get('user_id') or session.get('user_id')
    bid = data.get('badge_id')
    existing = Badge.query.filter_by(user_id=uid, badge_id=bid).first()
    if not existing:
        b = Badge(user_id=uid, badge_id=bid)
        db.session.add(b)
        db.session.commit()
    return jsonify({'status': 'ok'})


# ─────────────────────────────────────────
#  LEADERBOARD
# ─────────────────────────────────────────
@app.route('/api/leaderboard', methods=['GET'])
def leaderboard():
    users = User.query.order_by(User.stars.desc()).limit(10).all()
    return jsonify([{'name': u.name, 'stars': u.stars, 'avatar': u.avatar, 'grade': u.grade} for u in users])


# ─────────────────────────────────────────
#  SERVE FRONTEND
# ─────────────────────────────────────────
@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True, port=5000)
