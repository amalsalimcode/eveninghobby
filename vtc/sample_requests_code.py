from __future__ import print_function
import time
from src.apis.authorization_decision_api import AuthorizationDecisionApi
from src.configuration import Configuration
config = Configuration()
config.username = '<visa_username>'
config.password = '<visa_password>'
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
username = '<visa_username>'
password = '<visa_password>'

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


client_id = '<amex_client_id>'
client_pass = '<amex_password>'

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
r = s.post(url, body)


== Command to compile and execute java code ==

javac io/aexp/api/client/core/security/authentication/*.java; javac -cp ".:jar/*" SpendControlVaultClient.java; java -cp ".:jar/*" SpendControlVaultClient



== Command to work with OfxClient ==

from ofxtools.scripts.ofxget import request_stmt
from collections import col

# _request_acctinfo() is the function responsible to get the account number ['MXN9H8ZEJMXQBNP|68001']

args = collections.ChainMap({'server': 'amex', 'verbose': 0, 'dtstart': '20180101', 'dtend': '20180630', 'request': 'stmt'}, {'ofxhome': '424', 'url': 'https://online.americanexpress.com/myca/ofxdl/desktop/desktopDownload.do?request_type=nl_ofxdownload', 'version': 211, 'org': 'AMEX', 'fid': '3101', 'user': '<amex_user_id>', 'creditcard': ['MXN9H8ZEJMXQBNP|68001'], 'clientuid': 'fba0c15d-5eda-4960-9002-73a11058eb28'}, {'url': 'https://online.americanexpress.com/myca/ofxdl/desktop/desktopDownload.do?request_type=nl_ofxdownload', 'org': 'AMEX', 'fid': '3101', 'brokerid': None}, {'verbose': 0, 'server': '', 'url': '', 'ofxhome': '', 'version': 203, 'org': '', 'fid': '', 'appid': '', 'appver': '', 'language': '', 'bankid': '', 'brokerid': '', 'unclosedelements': False, 'pretty': False, 'user': '', 'clientuid': '', 'checking': [], 'savings': [], 'moneymrkt': [], 'creditline': [], 'creditcard': [], 'investment': [], 'dtstart': '', 'dtend': '', 'dtasof': '', 'inctran': True, 'incbal': True, 'incpos': True, 'incoo': False, 'all': False, 'years': [], 'acctnum': '', 'recid': '', 'dryrun': False, 'unsafe': False, 'write': False, 'savepass': False})

== Command to request credit card statements ==

from ofxtools.Client import CcStmtRq, OFXClient

client = OFXClient(url='https://online.americanexpress.com/myca/ofxdl/desktop/desktopDownload.do?request_type=nl_ofxdownload',
                   userid='asali005', clientuid="fba0c15d-5eda-4960-9002-73a11058eb28",
                   org='AMEX', fid='3101', version=211, appid='QWIN', appver='2700',
                   language='ENG', prettyprint='False', close_elements='True',
                   bankid='None', brokerid='None')

stmtrq = [CcStmtRq(acctid="MXN9H8ZEJMXQBNP|68001", dtstart="20200415", dtend="20200430", inctran=True)]
response = client.request_statements('4Kzindagi', *stmtrq).read().decode()

vim ~/Library/Preferences/ofxtools/ofxget.cfg



from ofxtools.Client import OFXClient, StmtRq, CcStmtRq, OFXClient
import datetime
import ofxtools
client_uid = "e6342626-8c5c-11ea-b50b-e30b45fe477e"
client = OFXClient("https://ofxdc.wellsfargo.com/ofx/process.ofx", userid="asali004",
                   org="WF", fid="3000", clientuid=client_uid,
                   bankid="121042882", language="ENG", prettyprint=True)
dtstart = datetime.datetime(2020, 1, 1, tzinfo=ofxtools.utils.UTC)
dtend = datetime.datetime(2020, 1, 31, tzinfo=ofxtools.utils.UTC)
s0 = StmtRq(acctid="1418811491", accttype="CHECKING", dtstart=dtstart, dtend=dtend)
response = client.request_statements("4Kzindagi", s0).read().decode()





[DEFAULT]
clientuid = fba0c15d-5eda-4960-9002-73a11058eb28

[amex]
user = asali005
creditcard = MXN9H8ZEJMXQBNP|68001

[myfi]
url = https://online.americanexpress.com/myca/ofxdl/desktop/desktopDownload.do?request_type=nl_ofxdownload
ofxhome = 424
org = AMEX
fid = 3101


# to retrieve example configuration
~/Desktop/projects/venv/lib/python3.7/site-packages/ofxtools/config >  vim ofxget_example.cfg
