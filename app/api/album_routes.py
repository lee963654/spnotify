from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Album, AlbumReview, db
from app.forms import AlbumReviewForm
from flask_login import current_user


album_routes = Blueprint("albums", __name__)


@album_routes.route("/<int:album_id>/reviews/new", methods=["POST"])
@login_required
def create_album_review(album_id):
    """
    Create a new review for an album
    """

    form = AlbumReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        user_id = current_user.id
        new_album_review = AlbumReview(
            review = form.data["review"],
            star_review = form.data["star_review"],
            album_id = album_id,
            user_id = int(user_id)
        )
        db.session.add(new_album_review)
        album = Album.query.get(album_id)
        album.album_reviews.append(new_album_review)
        db.session.commit()
        return new_album_review.to_dict()
    else:
        errors = form.errors
        return errors

@album_routes.route("/reviews/<int:review_id>/update", methods=["PUT"])
@login_required
def update_album_review(review_id):
    """
    Update a review for an album
    """
    review = AlbumReview.query.get(review_id)
    form = AlbumReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        review.review = form.data["review"]
        review.star_review = form.data["star_review"]
        db.session.commit()
        return review.to_dict()
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}


@album_routes.route("/<int:review_id>/delete", methods=["DELETE"])
@login_required
def delete_album_review(review_id):
    """
    Delete a review for an album
    """
    deleted_album_review = AlbumReview.query.get(review_id)
    deleted_dict = deleted_album_review.to_dict()
    user_id = current_user.id
    if deleted_dict["user_id"] == user_id:
        db.session.delete(deleted_album_review)
        db.session.commit()
        return deleted_dict
    else:
        return {"message": "Album review was not deleted"}



@album_routes.route("/<int:album_id>/reviews")
def get_artist_albums(album_id):
    """
    Getting all reviews for an album
    """
    album_reviews = AlbumReview.query.filter(AlbumReview.album_id == album_id).all()

    res_reviews = {review.id : review.to_dict() for review in album_reviews}

    return res_reviews


@album_routes.route("/reviews")
def get_all_album_reviews():
    """
    Getting all reviews for all albums
    """
    all_album_reviews = AlbumReview.query.all()
    res_album_reviews = {review.id : review.to_dict() for review in all_album_reviews}
    return res_album_reviews


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
