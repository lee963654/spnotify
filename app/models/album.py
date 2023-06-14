from .db import db, environment, SCHEMA, add_prefix_for_prod

class Album(db.Model):
    __tablename__ = "albums"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("artist.id")), nullable=False)
    album_picture = db.Column(db.String(255), nullable=False)

    # relationships
    artist = db.relationship("Artist", backpopulates="albums")
    album_reviews = db.relationship("AlbumReview", backpopulates="album")
    songs = db.relationship("Song", backpopulates="album")


    def to_dict(self):
        return {
            "name": self.name,
            "artist_id": self.artist_id,
            "album_picture": self.album_picture,
            "artist": self.artist.to_dict(),
            "album_reviews": [review.to_dict() for review in self.album_reviews],
            "songs": [song.to_dict() for song in self.songs]
        }
