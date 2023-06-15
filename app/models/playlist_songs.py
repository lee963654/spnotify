from .db import db, environment, SCHEMA, add_prefix_for_prod

class PlaylistSongs(db.Model):
    __tablename__ = "playlist_songs"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("playlists.id")))
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")))

    #relationship
    playlist = db.relationship("Playlist", back_populates="songs_on_playlist")
    song = db.relationship("Song", back_populates="playlist")

    def to_dict(self):
        return {
            "id": self.id,
            "playlist_id": self.playlist_id,
            "song_id": self.song_id
        }
