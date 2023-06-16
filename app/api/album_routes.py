from flask import Blueprint
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Album, AlbumReview
from flask_login import current_user


album_routes = Blueprint("albums", __name__)


@album_routes.route("/<int:album_id>/reviews")
def get_artist_albums(album_id):
    """
    Getting all reviews for an album
    """
    album_reviews = AlbumReview.query.filter(AlbumReview.album_id == album_id).all()

    res_reviews = {review.id : review.to_dict() for review in album_reviews}
    print("_++________________+__+_+_+_+_+__++_+ res reviews", res_reviews)
    return res_reviews


@album_routes.route("/")
def get_albums():
    """
    Getting all albums
    """
    albums = Album.query.all()

    all_albums = {
        album.id : album.to_dict() for album in albums
    }

    return all_albums
