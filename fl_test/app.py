from flask import Flask, request
from flask_socketio import SocketIO, emit


app = Flask(__name__, static_folder='')
io = SocketIO(app)

clients = []

@app.route('/')
def index():
    return app.send_static_file('client.html')

@io.on('connect')
def connect():
    import pdb; pdb.set_trace()
    clients.append(request.namespace)

@io.on('disconnect')
def disconnect():
    print(request.namespace.socket.sessid)
    clients.remove(request.namespace)

def hello_to_random_client():
    import random
    from datetime import datetime
    if clients:
        k = random.randint(0, len(clients)-1)
        print("sending hi")
        print(clients[k].socket.sessid)
        clients[k].emit('message', "Hello at %s" % (datetime.now()))

if __name__ == '__main__':
    import _thread, time
    _thread.start_new_thread(lambda: io.run(app), ())

    while True:
        time.sleep(1)
        hello_to_random_client()
