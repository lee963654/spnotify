from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


user_artist_follow = db.Table(
    "user_artist_follow",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("artist_id", db.Integer, db.ForeignKey(add_prefix_for_prod("artists.id")))
)

if environment == 'production':
    user_artist_follow.schema = SCHEMA


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)


    # relationships
    follows_artist = db.relationship("Artist", secondary=user_artist_follow, back_populates="user_followers")
    user_album_reviews = db.relationship("AlbumReview", back_populates="user")
    playlists = db.relationship("Playlist", back_populates="user_playlist")
    playlist_review = db.relationship("PlaylistReview", back_populates="user_playlist_review")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "password": self.password,
            "following": [follow.to_dict() for follow in self.follows_artist],
            "album_reviews": [review.to_dict() for review in self.user_album_reviews],
            "playlists": [playlist.to_dict() for playlist in self.playlists],
            "playlist_reviews": [review.to_dict() for review in self.playlist_review]
        }
