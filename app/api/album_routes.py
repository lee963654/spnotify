from flask import Blueprint
from app.models import Album


album_routes = Blueprint("albums", __name__)


@album_routes.route("/")
def get_albums():
    """
    Getting all albums
    """
    albums = Album.query.all()
    print("++++++++++++ALBUMS", albums, "+++++++++++++++++++++")

    res = {
        album.id : album.to_dict() for album in albums
    }

    return res
