from .db import db, environment, SCHEMA, add_prefix_for_prod

class Artist(db.Model):
    __tablename__ = "artists"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    about = db.Column(db.String, nullable=False)
    artist_picture = db.Column(db.String(255))
    about_picture = db.Column(db.String(255))


    # relationships
    user_followers = db.relationship("User", secondary="user_artist_follow", back_populates="follows_artist")
    albums = db.relationship("Album", back_populates="artist")

    def to_dict(self):
        return {
            "name": self.name,
            "about": self.about,
            "artist_picture": self.artist_picture,
            "about_picture": self.about_picture,
            "users_following": [user.to_dict() for user in self.user_followers],
            "albums": [album.to_dict() for album in self.albums]
        }
