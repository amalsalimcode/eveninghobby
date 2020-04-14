from __future__ import print_function
import time
from src.apis.authorization_decision_api import AuthorizationDecisionApi
from src.configuration import Configuration
config = Configuration()
config.username = 'NMYDWL6L5U9QYXW32XC521ngSwC3bI63mEO8Jq-yPtlcNqrPY'
config.password = 'XfwywU6BA2G41gX72Ttzeb8BzJP'
config.cert_file = '/Users/amalsalim/.ssh/cert.pem'
config.key_file = '/Users/amalsalim/.ssh/key_d4411dc7-56a6-425e-ae19-4654fe5d6590.pem'
config.csCertPath = '/Users/amalsalim/.ssh/VDPCA-SBX.pem'

api_instance = AuthorizationDecisionApi()

decision_id = 'decision_id_example'
api_response = api_instance.getdecision_request_actions(decision_id)


import requests
url = "https://sandbox.api.visa.com/vdp/helloworld"
verify_ca = '/Users/amalsalim/.ssh/VDPCA-SBX.pem'
private_key = '/Users/amalsalim/.ssh/key_d4411dc7-56a6-425e-ae19-4654fe5d6590.pem'
client_cert = '/Users/amalsalim/.ssh/cert.pem'
username = 'NMYDWL6L5U9QYXW32XC521ngSwC3bI63mEO8Jq-yPtlcNqrPY'
password = 'XfwywU6BA2G41gX72Ttzeb8BzJP'

r = requests.get(url, verify=(verify_ca), cert=(client_cert, private_key), auth=(username, password))



url = "https://sandbox.api.visa.com/vctc/customerrules/v1/consumertransactioncontrols"
r.headers["Content-Type"] = "application/json"
body = '{"primaryAccountNumber": "4514170000000001"}'

out = requests.post(url, verify=(verify_ca), cert=(client_cert, private_key), auth=(username, password), data=body, headers=r.headers)



url = "https://sandbox.api.visa.com/vctc/customerrules/v1/consumertransactioncontrols"
body = '{"primaryAccountNumber": "4234320079530001", "alertsEnrollmentDetails":' \
	'{"userIdentifier": "49007868-5024-4189-9699-cc9f82109c41", "preferredLanguage": "en-us", "countryCode": "USA", "firstName": "jon", "lastName": "smith",' \
	'"defaultAlertsPreferences": [{"contactType": "Email", "contactValue": "amal.salim@gmail.com"}]}}'

out = requests.post(url, verify=(verify_ca), cert=(client_cert, private_key), auth=(username, password), data=body, headers=r.headers)



url = "https://sandbox.api.visa.com/vctc/customerrules/v1/consumertransactioncontrols/ctc-vd-060b5166-0e97-4412-ba58-53a10edd9d1e/rules"
r = requests.get(url, verify=(verify_ca), cert=(client_cert, private_key), auth=(username, password))

control =  '{"globalControls": [{"isControlEnabled": true, "shouldAlertOnDecline": false, "shouldDeclineAll": false,' \
	   '"userIdentifier": "abhi-539d-4f93-ba00-77ef9ff873a2", "alertThreshold": 15}]}'


==AMEX==

import requests
import datetime
from requests import Session
import time
import hmac
import hashlib
from itertools import count
import uuid
import base64
from python_hmac_auth import HmacAuth


client_id = 'nxSQlrNk4eghDO3gSsKRNPiHsjfZIxuU'
client_pass = '3FlQh2dDY35c3NK3kHMPABeoxPc5r4KU'

ts = str(round(time.time() * 1000))
resource = '/payments/digital/v1/token/spend_controls'
body = '{}'

body_hash_bytes = hmac.new(bytes(client_pass, 'utf-8'), bytes(body, 'utf-8'), digestmod=hashlib.sha256).digest()
body_str = base64.b64encode(body_hash_bytes).decode("utf-8")

nonce = str(uuid.uuid1())
host = 'api.qasb.americanexpress.com'

mac = ts + "\n" + str(nonce) + "\n" + "POST" + "\n" + resource + "\n" + host + "\n" + "443" + "\n" + body_str + "\n"
mac_bytes = hmac.new(bytes(client_pass, 'utf-8'), bytes(mac, 'utf-8'), digestmod=hashlib.sha256).digest()
mac_str = base64.b64encode(mac_bytes).decode("utf-8")

auth = 'MAC id="{}",ts="{}",nonce="{}",bodyhash="{}",mac="{}"'.\
                format(client_id, ts, nonce, body_str, mac_str)

s = requests.Session()
s.headers["x-amex-api-key"] = client_id
s.headers["Authorization"] = auth
s.headers["x-amex-request-id"] = str(uuid.uuid1())

url = "https://api.qasb.americanexpress.com/payments/digital/v1/token/spend_controls"
r = s.post(url, data=body)



====




import requests
import datetime
from requests import Session
import time
import hmac
import hashlib
from itertools import count
import uuid
import base64
from python_hmac_auth import HmacAuth


client_id = 'nxSQlrNk4eghDO3gSsKRNPiHsjfZIxuU'
client_pass = '3FlQh2dDY35c3NK3kHMPABeoxPc5r4KU'

ts = str(round(time.time() * 1000))
resource = '/payments/digital/v1/token/spend_controls/inquiry_results'
body = '{"spend_control_identifier": "011111111111111"}'

body_hash_bytes = hmac.new(bytes(client_pass, 'utf-8'), bytes(body, 'utf-8'), digestmod=hashlib.sha256).digest()
body_str = base64.b64encode(body_hash_bytes).decode("utf-8")

nonce = str(uuid.uuid1())
host = 'api.qasb.americanexpress.com'

mac = ts + "\n" + str(nonce) + "\n" + "POST" + "\n" + resource + "\n" + host + "\n" + "443" + "\n" + body_str + "\n"
mac_bytes = hmac.new(bytes(client_pass, 'utf-8'), bytes(mac, 'utf-8'), digestmod=hashlib.sha256).digest()
mac_str = base64.b64encode(mac_bytes).decode("utf-8")

auth = 'MAC id="{}",ts="{}",nonce="{}",bodyhash="{}",mac="{}"'.\
                format(client_id, ts, nonce, body_str, mac_str)

s = requests.Session()
s.headers["x-amex-api-key"] = client_id
s.headers["Authorization"] = auth
s.headers["x-amex-request-id"] = str(uuid.uuid1())

url = "https://api.qasb.americanexpress.com/payments/digital/v1/token/spend_controls/inquiry_results"
r = s.post(url, data=body)


== Command to compile and execute java code ==
javac io/aexp/api/client/core/security/authentication/*.java; javac -cp ".:jar/*" SpendControlVaultClient.java; java -cp ".:jar/*" SpendControlVaultClient
