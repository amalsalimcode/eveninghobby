import base64
import io
import json
import sys

import plaid
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db.models import F
from django.http import HttpResponse
from django.shortcuts import render
from django.views import View

from account.utils import create_new_cred_plaid, get_client_plaid
from django_ec2_project.settings import PLAID_PRODUCTS, PLAID_COUNTRY_CODES, DEFAULT_ENV_PLAID
from transaction.models import Person, Account, Receipt
from transaction.utils import update_plaid_transactions


class AccountInfo(View):

    def get(self, request):
        pass

    def post(self, request):
        # need to retrieve person, banks and accounts
        body = json.loads(request.body)
        environment = body.get("environment", DEFAULT_ENV_PLAID)
        try:
            person = Person.objects.get(email=body["email"])
        except (KeyError, Person.DoesNotExist):
            return HttpResponse("No Token or Invalid Token", status=400)

        acc = Account.objects.annotate(institution=F('credentials__bank'),
                                       firstName=F('credentials__person__firstName'),
                                       email=F('credentials__person__email'))

        acc_val = acc.filter(credentials__person__personGroup=person.personGroup,
                             credentials__environment=environment). \
            values('accountId', 'accountName', 'accountType', 'institution',
                   'firstName', 'email', 'restricted', 'extraData').order_by('firstName',
                                                                             'credentials__bank')

        return HttpResponse(200, json.dumps(list(acc_val)))


# http://127.0.0.1:8000/account/create?personEmail=amal.salim@gmail.com&environment=sandbox
class CreateAccount(View):

    def get(self, request):
        return HttpResponse("Not allowed", status=400)

    def post(self, request):
        person_email = request.POST.get("personEmail")
        environment = request.POST.get("environment", DEFAULT_ENV_PLAID)
        context = {
            "plaid_public_key": "8363dece5a87445f66fe9efbb7a682",
            "plaid_environment": environment,
            "plaid_products": PLAID_PRODUCTS,
            "plaid_country_codes": PLAID_COUNTRY_CODES,
            "person_email": person_email
        }
        return render(request, 'index.ejs', context)


class DeleteAccount(View):

    def get(self, request):
        return HttpResponse("Not allowed", status=400)

    def post(self, request):
        body = json.loads(request.body)
        Account.objects.get(accountId=body["accountId"]).delete()
        return HttpResponse(status=200)


def get_access_token(request):
    public_token = request.POST.get("public_token")
    environment = request.POST.get("environment", DEFAULT_ENV_PLAID)
    client = get_client_plaid(environment)

    try:
        exchange_response = client.Item.public_token.exchange(public_token)
        access_token = exchange_response["access_token"]
    except (plaid.errors.PlaidError, KeyError) as e:
        return HttpResponse(e)

    try:
        person = Person.objects.get(email=request.POST.get('person-email'))
    except Person.DoesNotExist:
        return HttpResponse("No person with this email exists", status=400)

    cred = create_new_cred_plaid(access_token, person, DEFAULT_ENV_PLAID)
    update_plaid_transactions(cred)

    return HttpResponse(exchange_response)

