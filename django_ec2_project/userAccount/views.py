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


class TotalSpent(View):
    person = None

    def get(self, request):
        pass

    def post(self, request):
        pass

