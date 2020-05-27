import json

import pytz
from django.db.models import F
from django.http import HttpResponse
from django.views import View
from dateutil import parser
from django.db.models import Sum

from account.utils import create_update_amex_cred
from django_ec2_project.settings import DEFAULT_ENV_PLAID
from transaction.models import BankCred, Transaction, Person

import datetime
from transaction.utils import update_plaid_transactions


class TransactionView(View):
    request = person = environment = None
    st_dt = end_dt = diff_days = None
    kwargs = {}

    def parse_request_data(self):
        data = json.loads(self.request.body)
        self.person = Person.objects.get(email=data.get("email"))
        self.environment = data.get("environment", DEFAULT_ENV_PLAID)

        self.st_dt = parser.parse(data.get("start_date"))
        self.diff_days = int(data.get("days"))
        self.end_dt = self.st_dt + datetime.timedelta(days=self.diff_days)

    def setup_kwargs(self):
        self.kwargs = {'date__gte': self.st_dt, 'date__lt': self.end_dt, 'amount__gt': 0,
                       'account__credentials__person__personGroup': self.person.personGroup}
        self.request_args_to_kwargs("account__credentials__environment", "environment", DEFAULT_ENV_PLAID)

    def request_args_to_kwargs(self, query_param, key, default_val=None):
        try:
            self.kwargs[query_param] = json.loads(self.request.body)[key]
        except (TypeError, AttributeError, KeyError):
            if default_val:
                self.kwargs[query_param] = default_val


class TotalSpent(TransactionView):

    def get(self, request):
        pass

    def post(self, request):
        self.request = request
        self.parse_request_data()

        self.setup_kwargs()
        self.request_args_to_kwargs("account__credentials__bank__in", "institution")
        self.request_args_to_kwargs("account__accountId", "accountId")
        self.request_disabled_days_to_kwargs(self.st_dt)

        tr = Transaction.objects.filter(**self.kwargs)

        each_day_expense = []
        for days in range(0, self.diff_days):
            tr_each = tr.filter(date=self.st_dt + datetime.timedelta(days=days))
            try:
                tr_rounded = float("{:.2f}".format(
                    tr_each.aggregate(Sum('amount'))["amount__sum"] or 0
                ))
            except TypeError:
                tr_rounded = 0
            each_day_expense.append(tr_rounded)

        return HttpResponse(json.dumps(each_day_expense))

    def request_disabled_days_to_kwargs(self, start_date: datetime):
        try:
            data = json.loads(self.request.body)
            disabled_days = data["disabledDays"]
        except (KeyError, AttributeError):
            return
        exclude_dates = []
        for day in disabled_days:
            exclude_dates.append(start_date + datetime.timedelta(days=day))
        self.kwargs['date__ne'] = exclude_dates


class RetrieveTransaction(TransactionView):
    person = None
    environment = None
    request = None

    def post(self, request):
        self.request = request
        self.parse_request_data()

        days_since_last_update = (datetime.datetime.now().replace(tzinfo=pytz.UTC) -
                                  self.person.personGroup.lastUpdatedAt).days
        if days_since_last_update >= 1:
            self.update_transactions()

        self.setup_kwargs()
        tr = Transaction.objects.annotate(accountId=F('account__accountId'),
                                          institution=F('account__credentials__bank'),
                                          charge=F('amount'))
        transactions = tr.filter(**self.kwargs).values('charge', 'name', 'date',
                                                       'accountId', 'institution')
        trans = []
        for tr in transactions:
            # put transaction date as indices eg: day 0
            tr["diff"] = (tr["date"] - self.st_dt.date()).days

            # put in formatted date of purchase
            tr["date"] = '{:%Y-%m-%d}'.format(tr["date"])
            trans.append(tr)

        return HttpResponse(json.dumps(trans))

    def update_transactions(self):
        credentials = BankCred.objects.filter(person__personGroup=self.person.personGroup,
                                              environment=self.environment)
        last_updated_transaction = self.person.personGroup.lastUpdatedAt
        for cred in credentials:
            if cred.bank == "AMEX" and cred.username and cred.userpass:
                create_update_amex_cred(last_updated_transaction)
            elif cred.plaidCode:
                update_plaid_transactions(cred, last_updated_transaction)
