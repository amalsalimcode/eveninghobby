import db

from flask import Flask, request, jsonify, render_template
from werkzeug.security import generate_password_hash, check_password_hash
from forms.forms import RegistrationForm, LoginForm, ResetPasswordForm
from common import gen_jwt_token, verify_user
from flask_wtf.csrf import CSRFProtect

import json

server = Flask(__name__)
csrf = CSRFProtect(server)

@server.route("/")
def user_list():
    return json.dumps(db.get_users_all())


@server.route("/register", methods=['POST', 'GET'])
def register():
    f = RegistrationForm(request.form)
    if request.method == "POST" and f.validate_on_submit():
        return register_user(f.username.data, f.password.data)
    else:
        return render_template('register.html', form=f)


def register_user(username, password):
    """helper function to register a user"""
    if db.user_exists(username):
        return "User already exists", 409

    hashed_pass = generate_password_hash(password)
    db.create_user(username, hashed_pass)
    return "User Created", 200


@server.route('/login', methods=['POST', 'GET'])
def login():
    f = LoginForm(request.form)
    if request.method == "POST" and f.validate_on_submit():
        return login_user(f.username.data, f.password.data)
    else:
        return render_template('login.html', form=f)


def login_user(username, password):
    """helper function to login a user"""
    if verify_user(username, password):
        token = gen_jwt_token()
        return jsonify({'token': token}), 200
    else:
        return jsonify({'error': 'Incorrect credentials or invalid user'}), 401


@server.route('/resetpassword', methods=['GET', 'POST'])
def resetpassword():
    f = ResetPasswordForm(request.form)
    if request.method == "POST":
        username, o_passwd, n_passwd = \
            f.username.data, f.old_password.data, f.new_password.data
        return reset_passwd(username, o_passwd, n_passwd)
    else:
        return render_template('resetpassword.html', form=f)


def reset_passwd(username, o_passwd, n_passwd):
    """helper function to reset password"""
    if not verify_user(username, o_passwd):
        return jsonify({'error': 'User or password are incorrect'}), 401

    hashed_pass = generate_password_hash(n_passwd)
    db.update_credentials(username, hashed_pass)

    return jsonify({'ok': 'password changed'}), 200


if __name__ == "__main__":
    db.create_credentials_table()
    server.config['SECRET_KEY'] = 'ELSA#@#SECRETKEY$%@999'

    csrf.init_app(server)
    server.run(host='0.0.0.0')

