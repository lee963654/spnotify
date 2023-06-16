from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError

class AlbumReviewForm(FlaskForm):
    review = StringField("Review", validators=[DataRequired])
    star_review = IntegerField("Stars")
