from flask.cli import AppGroup
from .users import seed_users, undo_users
from .album_reviews import seed_album_reviews, undo_album_reviews
from .albums import seed_albums, undo_albums
from .artists import seed_artists, undo_artists
from .playlist_review import seed_playlist_reviews, undo_playlist_reviews
from .playlist import seed_playlists, undo_playlists
from .songs import seed_songs, undo_songs
# from .playlist_songs import seed_playlist_songs, undo_playlist_songs

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        # undo_playlist_songs()
        undo_playlist_reviews()
        undo_album_reviews()
        undo_playlists()
        undo_songs()
        undo_albums()
        undo_artists()
        undo_users()
    seed_users()
    seed_artists()
    seed_albums()
    song_list = seed_songs()
    seed_playlists(song_list)
    seed_album_reviews()
    seed_playlist_reviews()
    # seed_playlist_songs()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # undo_playlist_songs()
    undo_playlist_reviews()
    undo_album_reviews()
    undo_playlists()
    undo_songs()
    undo_albums()
    undo_artists()
    undo_users()
    # Add other undo functions here
