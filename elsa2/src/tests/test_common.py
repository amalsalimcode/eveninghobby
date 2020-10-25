import db
from unittest.mock import MagicMock
from common import gen_jwt_token, verify_user
from werkzeug import security


def test_jwt_token_len():
    token = gen_jwt_token()
    assert len(token) > 100

def test_jwt_token():
    assert gen_jwt_token() is not None

def test_verify_password_negative():
    db.get_password = MagicMock(return_value=None)
    assert verify_user("test", "test_pass") is False

def test_verify_password():
    db.get_password = MagicMock(return_value="test_pass_hashed")
    security.check_password_hash = MagicMock(return_value=True)
    assert verify_user("test", "test_pass") is True
