from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError

class PlaylistForm(FlaskForm):
    name = StringField("Playlist Name", validators=[])
    private = BooleanField("Private")
    user_id = IntegerField("User", validators=[])
