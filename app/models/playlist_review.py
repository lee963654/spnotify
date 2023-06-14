from .db import db, environment, SCHEMA, add_prefix_for_prod

class PlaylistReview(db.Model):
    __tablename__ = "playlist_reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String(1000), nullable=False)
    star_review = db.Column(db.Integer, nullable=False)
    playlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("playlists.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    # relationship
    playlist = db.relationship("Playlist", back_populates="playlist_review")
    user_playlist_review = db.relationship("User", back_populates="playlist_review")

    def to_dict(self):
        return {
            "id": self.id,
            "review": self.review,
            "star_review": self.star_review,
            "playlist_id": self.playlist_id,
            "playlist": self.playlist.to_dict(),
            "user_playlist_review": self.user_playlist_review.to_dict()
        }
