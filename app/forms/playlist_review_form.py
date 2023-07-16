from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError

class PlaylistReviewForm(FlaskForm):
    review = StringField("Review")
