import json

import pytz
from django.http import HttpResponse
from django.views import View
from dateutil import parser

from transaction.models import BankCred, Transaction, Person

import datetime

from transaction.utils import create_update_amex_cred, update_plaid_transactions


class RetrieveTransaction(View):

    person = None

    def get(self, request):
        self.person = Person.objects.get(email=request.GET.get("email"))
        st_dt = parser.parse(request.GET.get("start_date"))
        end_dt = parser.parse(request.GET.get("end_date"))

        days_since_last_update = (datetime.datetime.now().replace(tzinfo=pytz.UTC) -
                                  self.person.personGroup.lastUpdatedAt).days
        if days_since_last_update >= 1:
            self.update_transactions()

        transactions = Transaction.objects.filter(account__credentials__person=self.person, date__gt=st_dt,
                                                  date__lt=end_dt).values_list('extra_data',
                                                                               'account__credentials__bank')

        return HttpResponse(json.dumps(list(transactions)))

    def update_transactions(self):
        credentials = BankCred.objects.filter(person=self.person)
        last_updated_transaction = self.person.personGroup.lastUpdatedAt
        for cred in credentials:
            if cred.bank == "AMEX" and cred.username and cred.userpass:
                create_update_amex_cred(last_updated_transaction)
            elif cred.plaidCode:
                update_plaid_transactions(cred, last_updated_transaction)
