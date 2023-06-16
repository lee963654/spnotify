from flask import Blueprint
from app.models import Album


album_routes = Blueprint("albums", __name__)


# @album_routes.route("/<int:album_id>")
# @login_required
# def get_artist_albums():
#     """
#     Getting all artists albums
#     """


@album_routes.route("/")
def get_albums():
    """
    Getting all albums
    """
    albums = Album.query.all()
    # print("++++++++++++ALBUMS", albums, "+++++++++++++++++++++")

    all_albums = {
        album.id : album.to_dict() for album in albums
    }

    return all_albums
