from wtforms import Form, BooleanField, StringField, PasswordField, validators, SubmitField
from flask_wtf import FlaskForm


class RegistrationForm(FlaskForm):
    username = StringField('Username', [validators.Length(min=4, max=25),
                                        validators.DataRequired()])
    password = PasswordField('New Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords must match')
    ])
    confirm = PasswordField('Repeat Password')
    submit = SubmitField('Sign In')


class LoginForm(FlaskForm):
    username = StringField('Username', [validators.Length(min=4, max=25),
                                        validators.DataRequired()])
    password = PasswordField('Password')
    submit = SubmitField('Login')


class ResetPasswordForm(FlaskForm):
    username = StringField('Username', [validators.Length(min=4, max=25),
                                        validators.DataRequired()])
    old_password = PasswordField('Old Password')
    new_password = PasswordField('New Password')
    submit = SubmitField('Reset Password')
