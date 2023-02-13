from flask import Flask, request

import hmac
import hashlib
import json

app = Flask(__name__)

@app.route("/verify", methods=["POST"])
def verify_signature():
    computed_sign = hmac.new(request.get_data(), "secret".encode(), hashlib.sha256).hexdigest()
    d = {'computed_signature': computed_sign}

    if computed_sign == request.headers.get('X-Marqeta-Signature'):
        d["success"] = True
        resp_code = 200
    else:
        d["success"] = False
        resp_code = 403

    return json.dumps(d), resp_code, {'ContentType': 'application/json'}


if __name__ == '__main__':
    app.run()
