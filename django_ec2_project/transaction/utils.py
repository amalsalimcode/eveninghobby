import json
import xmltodict

from account.utils import get_client_plaid
from transaction.models import BankCred, Transaction, Account, Receipt

from ofxtools.Client import StmtRq, OFXClient
import ofxtools

import datetime


def update_plaid_transactions(cred: BankCred, st_dt: datetime = None):
    client = get_client_plaid(cred.environment)
    plaid_accounts = client.Auth.get(cred.plaidCode)['accounts']
    accounts = {}
    for acc in plaid_accounts:
        acct_id = acc["account_id"]
        accounts[acct_id], _ = \
            Account.objects.get_or_create(accountId=acc["account_id"],
                                          credentials=cred, accountName=acc["name"],
                                          accountType=acc["subtype"])

    if new_account_found(cred, client) or st_dt is None:
        st_dt = datetime.datetime.now() + datetime.timedelta(-30 * 12 * 2)
    start_date = '{:%Y-%m-%d}'.format(st_dt)
    end_date = '{:%Y-%m-%d}'.format(datetime.datetime.now())
    transactions_response = client.Transactions.get(cred.plaidCode, start_date, end_date)

    transactions = transactions_response['transactions']

    for single_trans in transactions:
        s = single_trans
        acct_id = s["account_id"]
        Transaction.objects.get_or_create(account=accounts[acct_id], transactionId=s["transaction_id"],
                                          amount=s["amount"], name=s["name"], date=s["date"], receipt=Receipt.objects.last(),
                                          extra_data=json.dumps(s))

    # datetime on when trans. were retrieved is updated
    cred.person.personGroup.save()


def new_account_found(cred: BankCred, client):
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
