from flask import Blueprint
from app.models import User, db, Artist
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
