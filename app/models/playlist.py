from .db import db, environment, SCHEMA, add_prefix_for_prod
from .playlist_song import playlist_songs

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
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    private = db.Column(db.Boolean, default=True)
    playlist_picture = db.Column(db.String(1000), default="https://spnotify.s3.us-east-2.amazonaws.com/defaultPlaylistImage.png")


    # relationship
    user_playlist = db.relationship("User", back_populates="playlists")
    # playlist_songs = db.relationship("Song", secondary=songs_in_playlist, back_populates="playlist")
    songs = db.relationship("Song", secondary=playlist_songs, back_populates="playlist")
    playlist_review = db.relationship("PlaylistReview", back_populates="playlist", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "private": self.private,
            "user_playlist": self.user_playlist.to_dict(),
            # "songs_in_playlist": [song.to_dict() for song in self.songs_on_playlist],
            "songs_in_playlist": {song.id : song.to_dict() for song in self.songs},
            "playlist_reviews": [review.to_dict() for review in self.playlist_review],
            "playlist_picture": self.playlist_picture
        }
