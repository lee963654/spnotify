from .db import db, environment, SCHEMA, add_prefix_for_prod


# songs_in_playlist = db.Table(
#     "songs_in_playlist",
#     db.Model.metadata,
#     db.Column("playlist_id", db.Integer, db.ForeignKey(add_prefix_for_prod("playlists.id"))),
#     db.Column("song_id", db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")))
# )

# if environment == 'production':
#     songs_in_playlist.schema = SCHEMA


class Playlist(db.Model):
    __tablename__ = "playlists"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    private = db.Column(db.Boolean, default=True)


    # relationship
    user_playlist = db.relationship("User", back_populates="playlists")
    # playlist_songs = db.relationship("Song", secondary=songs_in_playlist, back_populates="playlist")
    songs_on_playlist = db.relationship("PlaylistSongs", back_populates="playlist")
    playlist_review = db.relationship("PlaylistReview", back_populates="playlist", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "private": self.private,
            "user_playlist": self.user_playlist.to_dict(),
            # "songs_in_playlist": [song.to_dict() for song in self.playlist_songs],
            "playlist_reviews": [review.to_dict() for review in self.playlist_review]
        }
