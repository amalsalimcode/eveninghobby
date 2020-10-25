import jwt
import db
import time
from werkzeug import security

def gen_jwt_token():
    """generate a session token that can be used for authentication purposes"""
    return jwt.encode({'timestamp': time.time()}, '$elsa721', algorithm='HS256').decode('ascii')

def verify_user(username, password):
    """check if the credentials provided are valid"""
    hashed_pass = db.get_password(username)
    if hashed_pass is None:
        return False
    else:
        return security.check_password_hash(hashed_pass, password)
