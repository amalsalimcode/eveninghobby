import pytest
from db import create_user, user_exists, get_password

from src.db import update_credentials


def test_create_exists_user():
    create_user('test', 'test_pass')
    assert user_exists('test') is True

def test_exists_user_negative():
    assert user_exists('noexist') is False

def test_get_password():
    create_user('test', 'test_pass')
    assert get_password('test') == "test_pass"

def test_get_password_negative():
    assert get_password('noexist') is None

def test_get_users_all():
    create_user('testp1', 'test_pass')
    update_credentials('testp1', 'test2_pass')
    assert get_password('testp1') == 'test2_pass'
