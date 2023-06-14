from .db import db, environment, SCHEMA, add_prefix_for_prod

class AlbumReview(db.Model):
    __tablename__ = "album_reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("album.id")), nullable=False)
    review = db.Column(db.String, nullable=False)
    star_review = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("user.id")), nullable=False)

    # relationships
    user = db.relationship("User", backpopulates="user_album_reviews")
    album = db.relationship("Album", backpopulates="album_reviews")

    def to_dict(self):
        return {
            "album_id": self.album_id,
            "review": self.review,
            "star_review": self.star_review,
            "user_id": self.user_id,
            "reviewed_album": self.album.to_dict(),
            "review_user": self.user.to_dict()
        }
