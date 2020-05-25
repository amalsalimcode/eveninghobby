import json
import xmltodict

from transaction.models import BankCred, Transaction, Account, PersonGroup, Person
from django_ec2_project.settings import client

from ofxtools.Client import StmtRq, OFXClient
from ofxtools.Client import CcStmtRq
import ofxtools

import datetime


def create_new_cred(access_token="access-development-44688e6d-bacd-4654-b340-89d9ed54bd8f",
                    group_name="amal", person_first_name="amal",
                    person_last_name="salim", person_email="amal.salim@gmail.com"):
    person_group, _ = PersonGroup.objects.get_or_create(name=group_name)
    person, _ = Person.objects.get_or_create(firstName=person_first_name, lastName=person_last_name,
                                             email=person_email, personGroup=person_group)
    item_response = client.Item.get(access_token)
    bank_name = client.Institutions.get_by_id(item_response['item']['institution_id'])['institution']['name']
    cred, _ = BankCred.objects.get_or_create(person=person, plaidCode=access_token, bank=bank_name)

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


def update_plaid_transactions(cred: BankCred, st_dt: datetime = None):
    plaid_accounts = client.Auth.get(cred.plaidCode)['accounts']
    accounts = {}
    for acc in plaid_accounts:
        acct_id = acc["account_id"]
        accounts[acct_id], _ = \
            Account.objects.get_or_create(accountId=acc["account_id"],
                                          credentials=cred, accountName=acc["name"],
                                          accountType=acc["subtype"])

    if new_account_found(cred) or st_dt is None:
        st_dt = datetime.datetime.now() + datetime.timedelta(-30 * 12 * 2)
    start_date = '{:%Y-%m-%d}'.format(st_dt)
    end_date = '{:%Y-%m-%d}'.format(datetime.datetime.now())
    transactions_response = client.Transactions.get(cred.plaidCode, start_date, end_date)

    transactions = transactions_response['transactions']

    for single_trans in transactions:
        s = single_trans
        acct_id = s["account_id"]
        Transaction.objects.get_or_create(account=accounts[acct_id], transactionId=s["transaction_id"],
                                          amount=s["amount"], name=s["name"], date=s["date"],
                                          extra_data=json.dumps(s))

    # datetime on when trans. were retrieved is updated
    cred.person.personGroup.save()


def new_account_found(cred: BankCred):
    accounts = client.Auth.get(cred.plaidCode)['accounts']
    all_acct_id = [acct_id["account_id"] for acct_id in accounts]
    db_accounts = Account.objects.filter(accountId__in=all_acct_id, credentials=cred).count()
    online_accounts = len(all_acct_id)
    if db_accounts != online_accounts:
        return True
    return False


def wells_fargo() -> str:
    client_uid = "e6342626-8c5c-11ea-b50b-e30b45fe477e"
    client_wells = OFXClient("https://ofxdc.wellsfargo.com/ofx/process.ofx", userid="asali004",
                             org="WF", fid="3000", clientuid=client_uid,
                             bankid="121042882")
    dtstart = datetime.datetime(2020, 1, 1, tzinfo=ofxtools.utils.UTC)
    dtend = datetime.datetime(2020, 1, 31, tzinfo=ofxtools.utils.UTC)
    s0 = StmtRq(acctid="1418811491", accttype="CHECKING", dtstart=dtstart, dtend=dtend)
    response = client_wells.request_statements("4Kzindagi", s0)
    resp_dict = xmltodict.parse(response)

    stmt = resp_dict['OFX']['BANKMSGSRSV1']['STMTTRNRS']['STMTRS']['BANKTRANLIST']['STMTTRN']

    for idx in range(0, len(stmt)):
        dt_posted = stmt[idx]["DTPOSTED"]
        dt_frmt = datetime.strptime(dt_posted[0:8:1], "%Y%m%d")
        stmt[idx]["year"] = dt_frmt.year
        stmt[idx]["month"] = dt_frmt.month
        stmt[idx]["day"] = dt_frmt.day

    return json.dumps(stmt)
