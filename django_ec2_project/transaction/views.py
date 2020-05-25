import json

import pytz
from django.db.models import F
from django.http import HttpResponse
from django.views import View
from dateutil import parser
from django.db.models import Sum

from transaction.models import BankCred, Transaction, Person

import datetime
from transaction.utils import create_update_amex_cred, update_plaid_transactions


class TotalSpent(View):
    person = None
    request = None
    kwargs = {}

    def get(self, request):
        pass

    def post(self, request):
        self.request = request
        data = json.loads(request.body)

        self.person = Person.objects.get(email=data.get("email"))
        self.request = request

        st_dt = parser.parse(data.get("start_date"))
        diff_days = int(data.get("days"))
        end_dt = st_dt + datetime.timedelta(days=diff_days)

        self.kwargs = {'date__gte': st_dt, 'date__lt': end_dt, 'amount__gt': 0}
        self.request_args_to_kwargs("account__credentials__bank__in", "institution")
        self.request_args_to_kwargs("account__accountId", "accountId")
        self.request_disabled_days_to_kwargs(st_dt)

        tr = Transaction.objects.filter(**self.kwargs)

        each_day_expense = []
        for days in range(0, diff_days):
            tr_each = tr.filter(date=st_dt + datetime.timedelta(days=days))
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
            disabled_days = self.request.GET.get("disabledDays").split(',')
        except AttributeError:
            return

        exclude_dates = []
        for day in disabled_days:
            exclude_dates.append(start_date + datetime.timedelta(days=day))
        self.kwargs['date__ne'] = exclude_dates

    def request_args_to_kwargs(self, query_param, key):
        try:
            self.kwargs[query_param] = json.loads(self.request.body)[key]
        except (TypeError, AttributeError, KeyError):
            pass


class RetrieveTransaction(View):
    person = None

    def get(self, request):
        self.person = Person.objects.get(email=request.GET.get("email"))
        st_dt = parser.parse(request.GET.get("start_date"))
        diff_days = int(request.GET.get("days"))
        end_dt = st_dt + datetime.timedelta(days=diff_days)

        days_since_last_update = (datetime.datetime.now().replace(tzinfo=pytz.UTC) -
                                  self.person.personGroup.lastUpdatedAt).days
        if days_since_last_update >= 1:
            self.update_transactions()

        # if the amount is negative, make it positive, gte=0 is placeholder
        tr = Transaction.objects.annotate(accountId=F('account__accountId'),
                                          institution=F('account__credentials__bank'),
                                          charge=F('amount')
                                          )

        transactions = tr.filter(account__credentials__person=self.person, date__gte=st_dt,
                                 date__lt=end_dt, amount__gt=0).values('charge', 'name', 'date', 'accountId',
                                                                       'institution')
        trans = []
        for tr in transactions:
            # put transaction date as indices eg: day 0
            tr["diff"] = (tr["date"] - st_dt.date()).days

            # put in formatted date of purchase
            tr["date"] = '{:%Y-%m-%d}'.format(tr["date"])
            trans.append(tr)

        return HttpResponse(json.dumps(trans))

    def update_transactions(self):
        credentials = BankCred.objects.filter(person=self.person)
        last_updated_transaction = self.person.personGroup.lastUpdatedAt
        for cred in credentials:
            if cred.bank == "AMEX" and cred.username and cred.userpass:
                create_update_amex_cred(last_updated_transaction)
            elif cred.plaidCode:
                update_plaid_transactions(cred, last_updated_transaction)
