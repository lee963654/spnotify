from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User, db, Artist, Album, Song, Playlist


playlist_routes = Blueprint("playlists", __name__)


@playlist_routes.route("/")
@login_required
def get_user_playlists():
    """
    Getting all user playlists
    """

    playlists = Playlist.query.filter(Playlist.user_id == current_user.id)

    res = {current_user.id : [playlist.to_dict() for playlist in playlists]}


    return res
