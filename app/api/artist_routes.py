from flask import Blueprint
from app.models import User, db, Artist, Album, Song
from app.forms import LoginForm
from app.forms import SignUpForm

artist_routes = Blueprint('artists', __name__)

@artist_routes.route("/")
def get_artists():
    """
    Getting all artists
    """
    artists = Artist.query.all()
    print("++++++==========++++++ ARTISTS", artists)

    # res = [artist.to_dict() for artist in artists]
    res = {artist.id : artist.to_dict() for artist in artists}


    return res

@artist_routes.route("/<int:artist_id>")
def get_single_artist(artist_id):
    """
    Getting a single artist
    """

    artist = Artist.query.get(artist_id)
    albums = Album.query.filter(Album.artist_id == artist_id)


    album_res = [album.to_dict() for album in albums]
    print("=================albums for artist==================", album_res)

    res = artist.to_dict()
    print("++++++++++++++++++SINGLE ARTIST+++++++++++++++++++++", res)

    res["albums"] = album_res
    print("+++++++++++++++++++FINAL RES++++++++++++++++++++++", res)

    return res
