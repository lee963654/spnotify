from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import User, db, Artist, Album, Song, Playlist, PlaylistReview
from app.forms import PlaylistForm, PlaylistReviewForm


playlist_routes = Blueprint("playlists", __name__)



@playlist_routes.route("/reviews/<int:playlist_id>/delete", methods=["DELETE"])
@login_required
def delete_playlist_review(playlist_id):
    """
    Delete a review for a playlist
    """
    deleted_playlist_review = PlaylistReview.query.get(playlist_id)
    db.session.delete(deleted_playlist_review)
    db.session.commit()
    return deleted_playlist_review.to_dict()



@playlist_routes.route("/reviews/edit/<int:review_id>", methods = ["PUT"])
@login_required
def update_playlist_review(review_id):
    """
    Update a playlist review
    """
    review = PlaylistReview.query.get(review_id)
    form = PlaylistReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    print("THIS IS THE PLAYLIST REVIEW+++++++++++++++++++++++", review.review)
    print("this is the form=======================", form.data)
    if form.validate_on_submit():

        review.review = form.data["review"]
        db.session.commit()
        return review.to_dict()
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}



@playlist_routes.route("/reviews/all")
@login_required
def get_all_playlist_reviews():
    """
    Getting all playlist reviews
    """
    playlist_reviews = PlaylistReview.query.all()
    res_playlist_reviews = {review.id: review.to_dict() for review in playlist_reviews}
    return res_playlist_reviews




@playlist_routes.route("/<int:playlist_id>/<int:song_id>", methods=["POST", "DELETE"])
@login_required
def add_song_to_playlist(playlist_id, song_id):
    """
    Add or remove a song from a playlist
    """
    playlist = Playlist.query.get(playlist_id)
    song = Song.query.get(song_id)
    if request.method == "POST":
        playlist.songs.append(song)
        db.session.commit()
        return playlist.to_dict()
    if request.method == "DELETE":
        playlist.songs.remove(song)
        db.session.commit()
        return playlist.to_dict()


@playlist_routes.route("/reviews/<int:playlist_id>", methods=["POST"])
@login_required
def create_playlist_review(playlist_id):
    """
    Create a new review for a playlist
    """
    form = PlaylistReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        user_id = current_user.id
        new_playlist_review = PlaylistReview(
            review = form.data["review"],
            playlist_id = playlist_id,
            user_id = int(user_id)
        )
        db.session.add(new_playlist_review)
        curr_playlist = Playlist.query.get(playlist_id)
        curr_playlist.playlist_review.append(new_playlist_review)
        db.session.commit()
        return new_playlist_review.to_dict()
    else:
        errors = form.errors
        return errors



@playlist_routes.route("/<int:playlist_id>/update", methods = ["PUT"])
@login_required
def update_playlist(playlist_id):
    """
    Update a playlist
    """
    playlist = Playlist.query.get(playlist_id)
    form = PlaylistForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    user_id = current_user.id
    if playlist.user_id != user_id:
        return {"Not Authorized"}
    if form.validate_on_submit():
        playlist.name = form.data["name"]
        playlist.private = form.data["private"]
        db.session.commit()
        return playlist.to_dict()
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}




@playlist_routes.route("/<int:playlist_id>", methods=["DELETE"])
@login_required
def delete_users_playlist(playlist_id):
    """
    Deleting a single playlist
    """
    deleted_playlist = Playlist.query.get(playlist_id)
    deleted_dict = deleted_playlist.to_dict()
    user_id = current_user.id

    if deleted_dict["user_id"] == user_id:
        db.session.delete(deleted_playlist)
        db.session.commit()
        return deleted_dict
    else:
        return {"message": "Playlist was not deleted"}



@playlist_routes.route("/user")
@login_required
def get_user_playlists():
    """
    Getting all user playlists
    """

    playlists = Playlist.query.filter(Playlist.user_id == current_user.id)

    user_playlists = {playlist.id : playlist.to_dict() for playlist in playlists}

    return user_playlists



@playlist_routes.route("/", methods=["POST"])
@login_required
def create_a_playlist():
    """
    Creating a playlist
    """

    form = PlaylistForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        user_id = current_user.id
        new_playlist = Playlist(
            name = form.data["name"],
            private = form.data["private"],
            user_id = int(user_id),
        )

        db.session.add(new_playlist)
        db.session.commit()
        return new_playlist.to_dict()
    else:
        errors = form.errors
        return errors




@playlist_routes.route("/")
def get_all_playlist():
    """
    Getting all playlists
    """
    playlists = Playlist.query.all()

    return {playlist.id : playlist.to_dict() for playlist in playlists}
