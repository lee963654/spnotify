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


@song_routes.route("/<int:song_id>")
@login_required
def play_song(song_id):
    """
    Getting one song to play
    """

    song = Song.query.get(song_id)
    albums = Album.query.filter(Album.id == song.album_id)
    albums_dict = {album.id : album.to_dict() for album in albums}
    song_dict = song.to_dict()
    song_dict["albums"] = albums_dict

    return song_dict
