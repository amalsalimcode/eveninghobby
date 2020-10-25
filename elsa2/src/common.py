import jwt
import time
from src.db import get_password
from werkzeug.security import generate_password_hash, check_password_hash

def gen_jwt_token():
    return jwt.encode({'timestamp': time.time()}, '$elsa721', algorithm='HS256').decode('ascii')

def verify_user(username, password):
    hashed_pass = get_password(username)
    if hashed_pass is None:
        return False
    else:
        return check_password_hash(hashed_pass, password)
