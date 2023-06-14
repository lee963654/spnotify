from .db import db, environment, SCHEMA, add_prefix_for_prod

class Song(db.Model):
    __tablename__ = "songs"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("albums.id")), nullable=False)
    lyrics = db.Column(db.String, nullable=False)
    song_url = db.Column(db.String)
    num_of_plays = db.Column(db.Integer, default=0)


    # relationships
    album = db.relationship("Album", back_populates="songs")
    playlist = db.relationship("Playlist", secondary="songs_in_playlist", back_populates="playlist_songs")

    def to_dict(self):
        return {
            "name": self.name,
            "album_id": self.album_id,
            "lyrics": self.lyrics,
            "song_url": self.song_url,
            "num_of_plays": self.num_of_plays,
            "album": self.album.to_dict(),
            "playlist": [lst.to_dict() for lst in self.playlist]

        }
