from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Artist, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route("/follow/<int:artist_id>", methods=["POST"])
@login_required
def follow_artist(artist_id):
    """
    Follow an artist
    """
    user = User.query.get(current_user.id)
    artist = Artist.query.get(artist_id)
    user.follows_artist.append(artist)
    db.session.commit()
    return user.to_dict()


@user_routes.route("/unfollow/<int:artist_id>", methods=["DELETE"])
@login_required
def unfollow_artist(artist_id):
    """
    unfollow an artist
    """
    user = User.query.get(current_user.id)
    artist = Artist.query.get(artist_id)
    user.follows_artist.remove(artist)
    db.session.commit()
    return user.to_dict()
