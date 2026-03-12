from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
    id            = db.Column(db.Integer, primary_key=True)
    name          = db.Column(db.String(80), nullable=False)
    avatar        = db.Column(db.String(10), default='🦊')
    outfit        = db.Column(db.String(10), default='🦊')
    stars         = db.Column(db.Integer, default=0)
    coins         = db.Column(db.Integer, default=0)
    grade         = db.Column(db.Integer, default=1)
    current_world = db.Column(db.String(50), default='words')
    current_level = db.Column(db.Integer, default=1)
    created_at    = db.Column(db.DateTime, default=datetime.utcnow)

    progress = db.relationship('Progress', backref='user', uselist=False)
    badges   = db.relationship('Badge', backref='user')
    words    = db.relationship('WordLearned', backref='user')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'avatar': self.avatar,
            'outfit': self.outfit,
            'stars': self.stars,
            'coins': self.coins,
            'grade': self.grade,
            'current_world': self.current_world,
            'current_level': self.current_level,
            'created_at': self.created_at.isoformat(),
        }


class Progress(db.Model):
    __tablename__ = 'progress'
    id              = db.Column(db.Integer, primary_key=True)
    user_id         = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    words_score     = db.Column(db.Integer, default=0)
    spelling_score  = db.Column(db.Integer, default=0)
    sentence_score  = db.Column(db.Integer, default=0)
    reading_score   = db.Column(db.Integer, default=0)
    math_score      = db.Column(db.Integer, default=0)
    concept_score   = db.Column(db.Integer, default=0)
    grammar_score   = db.Column(db.Integer, default=0)
    creative_score  = db.Column(db.Integer, default=0)
    science_score   = db.Column(db.Integer, default=0)
    geography_score = db.Column(db.Integer, default=0)
    daily_streak    = db.Column(db.Integer, default=0)
    total_sessions  = db.Column(db.Integer, default=0)
    last_active     = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {c.name: getattr(self, c.name)
                for c in self.__table__.columns
                if c.name not in ('id',)}


class Badge(db.Model):
    __tablename__ = 'badges'
    id         = db.Column(db.Integer, primary_key=True)
    user_id    = db.Column(db.Integer, db.ForeignKey('users.id'))
    badge_id   = db.Column(db.String(50))
    earned_at  = db.Column(db.DateTime, default=datetime.utcnow)


class WordLearned(db.Model):
    __tablename__ = 'words_learned'
    id         = db.Column(db.Integer, primary_key=True)
    user_id    = db.Column(db.Integer, db.ForeignKey('users.id'))
    word       = db.Column(db.String(50))
    learned_at = db.Column(db.DateTime, default=datetime.utcnow)


class Session(db.Model):
    __tablename__ = 'sessions'
    id         = db.Column(db.Integer, primary_key=True)
    user_id    = db.Column(db.Integer, db.ForeignKey('users.id'))
    world      = db.Column(db.String(50))
    score      = db.Column(db.Integer, default=0)
    duration   = db.Column(db.Integer, default=0)   # seconds
    started_at = db.Column(db.DateTime, default=datetime.utcnow)
