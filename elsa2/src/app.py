from flask import Flask, request, jsonify, render_template
from flask_socketio import SocketIO, emit
import _thread
import db
import json
from flask_cors import CORS, cross_origin

from common import encode_auth_token

from common import is_event_type_unknown, check_auth

server = Flask(__name__)
socketio = SocketIO(server)
CORS(server)


values = {
    # 'slider1': 25,
    # 'slider2': 0,
    'token': 'test'
}

# have imei be sent as get request, and then return html with token
# the connect from the html should send in the token. only then respond
# then talk via sockets

@server.route("/login", methods=['GET'])
def index():
    return render_template('index.html', **values)


@server.route("/", methods=['POST', 'GET'])
def main():

    if request.method == "POST":
        post_data = json.loads(request.data.decode('ascii'))

        type = post_data.get("type", "").lower()
        if type == "login":
            imei = post_data.get("imei")

            token = encode_auth_token(imei)
            return render_template("index.html", **token)

        resp, status = check_auth(request)
        if status != 200:
            return resp, status

        imei = resp

        if type == "alarm":
            alarm_type = post_data.get("alarm_type")
            if is_event_type_unknown(alarm_type):
                return jsonify({"error": "unknown alarm type"}), 400

            al_id = db.create_alarm(imei, alarm_type, post_data.get("alarm_time", ""),
                            post_data.get("latitude", ""), post_data.get("longitude"))

            for file_name in post_data.get("file_list"):
                x = db.create_file(al_id, file_name)
                print("here is the fileid", x)

            return 'Done', 200

        elif type == "location":
            db.create_location(imei, post_data.get("time"), post_data.get("lat"), post_data.get("long"))
            return 'Done', 200


@socketio.on('connect')
def test_connect():
    print("ok we have a request", request.args.get('token'))
    emit('after connect',  {'data': 'Lets dance'})


@socketio.on('location update')
def value_changed(message):
    values[message['who']] = message['data']
    emit('update value', message, broadcast=True)


if __name__ == "__main__":
    server.config['SECRET_KEY'] = 'ELSA#@#SECRETKEY$%@999'
    db.init_table()
    _thread.start_new_thread(lambda: socketio.run(server), ())
    server.run(port=5005)
