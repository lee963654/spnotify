from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Album, AlbumReview, db, Song


song_routes = Blueprint("songs", __name__)


@song_routes.route("/")
def get_all_songs():
    """
    Getting all songs
    """

    songs = Song.query.all()
    songs_dict = {song.id : song.to_dict() for song in songs}
    return songs_dict
