import pytest

# from src import server as flask_app
from src.app import server as flask_app


print("here is the flask_app", flask_app)


@pytest.fixture
def app():
    yield flask_app


@pytest.fixture
def client(app):
    return app.test_client()
