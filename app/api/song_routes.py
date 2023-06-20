from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Album, AlbumReview, db, Song, Artist, Playlist


song_routes = Blueprint("songs", __name__)


@song_routes.route("/playlist/<int:playlist_id>")
@login_required
def play_playlist_songs(playlist_id):
    """
    Play all songs in a playlist
    """
    playlist = Playlist.query.filter(Playlist.id == playlist_id)
    playlist_dict = playlist.to_dict()
    playlist_dict_res = [song.to_dict() for song in playlist_dict["songs_in_playlist"].values()]
    for song in playlist_dict_res:
        artist = Artist.query.filter(Artist.id == song.artist_id)
        artist_dict = artist.to_dict()
        album = Album.query.filter(Album.id == song.album_id)
        album_dict = album.to_dict()
        song["album"] = album_dict
        song["artist"] = artist_dict
    return playlist_dict_res


@song_routes.route("/artist/<int:artist_id>")
@login_required
def play_artist_songs(artist_id):
    """
    Play all songs by artist
    """

    songs = Song.query.filter(Song.artist_id == artist_id)
    artist = Artist.query.filter(Artist.id == artist_id)
    artist_dict = artist.to_dict()
    songs_dict = [song.to_dict() for song in songs]
    for song in songs_dict:
        album = Album.query.filter(Album.id == song.album_id)
        album_dict = album.to_dict()
        song["album"] = album_dict
        song["artist"] = artist_dict
    return songs_dict


@song_routes.route("/album/<int:album_id>")
@login_required
def play_album_songs(album_id):
    """
    Play all songs on an album
    """
    songs = Song.query.filter(Song.album_id == album_id)
    album = Album.query.filter(Album.id == album_id)
    artist = Artist.query.filter(Artist.id == album.artist_id)
    album_dict = album.to_dict()
    artist_dict = artist.to_dict()
    songs_dict = [song.to_dict() for song in songs]
    for song in songs_dict:
        song["album"] = album_dict
        song["artist"] = artist_dict
    return songs_dict


@song_routes.route("/<int:song_id>")
@login_required
def play_song(song_id):
    """
    Play one song
    """

    song = Song.query.get(song_id)
    album = Album.query.filter(Album.id == song.album_id)
    artist = Artist.query.filter(Artist.id == song.artist_id)
    artist_dict = artist.to_dict()
    album_dict = album.to_dict()
    song_dict = song.to_dict()
    song_dict["album"] = album_dict
    song_dict["artist"] = artist_dict

    return song_dict


@song_routes.route("/")
def get_all_songs():
    """
    Getting all songs
    """

    songs = Song.query.all()
    songs_dict = {song.id : song.to_dict() for song in songs}
    return songs_dict
