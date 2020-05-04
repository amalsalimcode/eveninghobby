import json
import pprint
from datetime import datetime

from django.http import HttpResponse
import xmltodict


def hello_test(request):

    output = [{"TRNTYPE": "DEBIT", "DTPOSTED": "20180504000000.000[-7:MST]", "TRNAMT": "-14.95", "FITID": "320181240289356665",
               "REFNUM": "320181240289356665", "NAME": "Audible audible.com NJ", "MEMO": "S85LVQ0UKLT AUDIO BOOKS", "year": 2018,
               "month": 5, "day": 4},
              {"TRNTYPE": "DEBIT", "DTPOSTED": "20180505000000.000[-7:MST]", "TRNAMT": "-4.24", "FITID": "320181250299745477",
               "REFNUM": "320181250299745477", "NAME": "UBER *TRIP A63AY HELP.UBER.COM", "MEMO": "87EGTNKE HELP.UBER.COM",
               "year": 2018, "month": 5, "day": 5}]

    x = json.dumps(output)
    return HttpResponse(x)


def hello(request):

    from ofxtools.Client import CcStmtRq, OFXClient

    url = 'https://online.americanexpress.com/myca/ofxdl/desktop/desktopDownload.do?request_type=nl_ofxdownload'
    user_id = "asali005"
    client_uid = "fba0c15d-5eda-4960-9002-73a11058eb28"
    amex_acc_id = "MXN9H8ZEJMXQBNP|68001"
    amex_passwd = "4Kzindagi"

    client = OFXClient(
        url=url,
        userid=user_id, clientuid=client_uid, org='AMEX', fid='3101', version=211, appid='QWIN',
        appver='2700', language='ENG', prettyprint=False, close_elements=True, bankid=None, brokerid=None)

    stmtrq = [CcStmtRq(acctid=amex_acc_id, dtstart="20180101", dtend="20180601", inctran=True)]
    statements = client.request_statements(amex_passwd, *stmtrq).read().decode()
    stmt = xmltodict.parse(statements)
    stmt = stmt['OFX']['CREDITCARDMSGSRSV1']['CCSTMTTRNRS']['CCSTMTRS']['BANKTRANLIST']['STMTTRN']

    for idx in range(0, len(stmt)):
        dt_posted = stmt[idx]["DTPOSTED"]
        dt_frmt = datetime.strptime(dt_posted[0:8:1], "%Y%m%d")
        stmt[idx]["year"] = dt_frmt.year
        stmt[idx]["month"] = dt_frmt.month
        stmt[idx]["day"] = dt_frmt.day

    output = [stmt[0], stmt[1]]
    pprint.pprint(output)
    return HttpResponse(json.dumps(output))



def wellsfargo(request):
    from ofxtools.Client import StmtRq, OFXClient
    import datetime
    import ofxtools
    client_uid = "e6342626-8c5c-11ea-b50b-e30b45fe477e"
    client = OFXClient("https://ofxdc.wellsfargo.com/ofx/process.ofx", userid="asali004",
                       org="WF", fid="3000", clientuid=client_uid,
                       bankid="121042882")
    dtstart = datetime.datetime(2020, 1, 1, tzinfo=ofxtools.utils.UTC)
    dtend = datetime.datetime(2020, 1, 31, tzinfo=ofxtools.utils.UTC)
    s0 = StmtRq(acctid="1418811491", accttype="CHECKING", dtstart=dtstart, dtend=dtend)
    response = client.request_statements("4Kzindagi", s0)
    return HttpResponse(response.read())