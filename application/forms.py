from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length
from flask_bootstrap import Bootstrap

class LoginForm(FlaskForm):
    username = StringField('Username *', validators =[InputRequired(), Length(min = 4, max = 15)])
    password = PasswordField('Password *', validators = [InputRequired(), Length(min = 8, max = 80)])