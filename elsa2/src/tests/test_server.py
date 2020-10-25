import json


def test_index(app, client):
    res = client.get('/')
    print("here is the response", res)
    # assert res.status_code == 200
