import json
import xmltodict

from transaction.models import BankCred, Transaction, Account, PersonGroup, Person
from django_ec2_project.settings import client_dev, client_sandbox, DEFAULT_ENV_PLAID

from ofxtools.Client import OFXClient
from ofxtools.Client import CcStmtRq

import datetime


def create_new_cred_plaid(access_token: str = None, person: Person = None,
                          environment: str = DEFAULT_ENV_PLAID):

    if environment == DEFAULT_ENV_PLAID:
        access_token = "access-sandbox-27bdc8e8-1ecb-464e-af03-cbea5e80c77c"
    else:
        access_token = access_token or "access-development-44688e6d-bacd-4654-b340-89d9ed54bd8f"

    client = get_client_plaid(environment)

    if not person:
        # should happen only when resetting db
        person_group, _ = PersonGroup.objects.get_or_create(name="amal")
        person, _ = Person.objects.get_or_create(firstName="amal", lastName="salim",
                                                 email="amal.salim@gmail.com", personGroup=person_group)

    item_response = client.Item.get(access_token)
    bank_name = client.Institutions.get_by_id(item_response['item']['institution_id'])['institution']['name']
    cred, _ = BankCred.objects.get_or_create(person=person, plaidCode=access_token,
                                             bank=bank_name, environment=environment)
    return cred


def create_update_amex_cred(start_dt):
    url = 'https://online.americanexpress.com/myca/ofxdl/desktop/desktopDownload.do?request_type=nl_ofxdownload'
    user_id = "asali005"
    client_uid = "fba0c15d-5eda-4960-9002-73a11058eb28"
    amex_acc_id = "MXN9H8ZEJMXQBNP|68001"
    amex_passwd = "4Kzindagi"

    client_amex = OFXClient(url=url, userid=user_id, clientuid=client_uid, org='AMEX', fid='3101',
                            version=211, appid='QWIN', appver='2700', language='ENG', prettyprint=False,
                            close_elements=True, bankid=None, brokerid=None)

    # if no start date is provided, take 2years back from today
    start_date = '{:%Y%m%d}'.format(start_dt or (datetime.datetime.now() -
                                                 datetime.timedelta(-30 * 12 * 2)))
    end_date = '{:%Y%m%d}'.format(datetime.datetime.now())

    # noinspection PyTypeChecker
    stmtrq = [CcStmtRq(acctid=amex_acc_id, dtstart=start_date, dtend=end_date, inctran=True)]
    statements = xmltodict.parse(client_amex.request_statements(amex_passwd, *stmtrq).read().decode())
    stmt_lst = statements['OFX']['CREDITCARDMSGSRSV1']['CCSTMTTRNRS']['CCSTMTRS']['BANKTRANLIST']['STMTTRN']

    person_group, _ = PersonGroup.objects.get_or_create(name="amal")
    person, _ = Person.objects.get_or_create(firstName="amal", lastName="salim",
                                             email="amal.salim@gmail.com", personGroup=person_group)
    cred, _ = BankCred.objects.get_or_create(person=person, bank="AMEX", username=user_id,
                                             userpass=amex_passwd)

    account, _ = Account.objects.get_or_create(credentials=cred, accountId=amex_acc_id,
                                               accountName="AMEX", accountType="credit card")

    for stmt in stmt_lst:
        dt_post = stmt["DTPOSTED"]
        dt_frmt = datetime.strptime(dt_post[0:8:1], "%Y%m%d")
        Transaction.objects.get_or_create(account=account, transactionId=stmt['FITID'], name=stmt['NAME'],
                                          amount=stmt['TRNAMT'], date=dt_frmt, extra_data=json.dumps(dict(stmt)))


def get_client_plaid(env: str = DEFAULT_ENV_PLAID):
    env_mapping = {"development": client_dev,
                   "sandbox": client_sandbox}
    return env_mapping[env]
