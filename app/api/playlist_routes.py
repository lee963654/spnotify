from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, db, Artist, Album, Song, Playlist
from app.forms import PlaylistForm


playlist_routes = Blueprint("playlists", __name__)


@playlist_routes.route("/user")
@login_required
def get_user_playlists():
    """
    Getting all user playlists
    """

    playlists = Playlist.query.filter(Playlist.user_id == current_user.id)

    res = {current_user.id : [playlist.to_dict() for playlist in playlists]}

    return res


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


@playlist_routes.route("/")
@login_required
def get_all_playlist():
    """
    Getting all playlists
    """
    playlists = Playlist.query.all()

    return {playlist.id : playlist.to_dict() for playlist in playlists}
