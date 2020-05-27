import json

import plaid
from django.db.models import F
from django.http import HttpResponse
from django.shortcuts import render
from django.views import View

from account.utils import create_new_cred_plaid, get_client_plaid
from django_ec2_project.settings import PLAID_PRODUCTS, PLAID_COUNTRY_CODES, DEFAULT_ENV_PLAID
from transaction.models import Person, Account
from transaction.utils import update_plaid_transactions


class AccountInfo(View):

    def get(self, request):
        pass

    def post(self, request):
        # need to retrieve person, banks and accounts
        body = json.loads(request.body)
        environment = body.get("environment", DEFAULT_ENV_PLAID)
        try:
            person = Person.objects.get(token=body["token"])
        except (KeyError, Person.DoesNotExist):
            return HttpResponse("No Token or Invalid Token", status=400)

        acc = Account.objects.annotate(institution=F('credentials__bank'),
                                       firstName=F('credentials__person__firstName'))

        acc_val = acc.filter(credentials__person__personGroup=person.personGroup,
                             credentials__environment=environment). \
            values('accountId', 'accountName', 'accountType', 'institution',
                   'firstName').order_by('firstName', 'credentials__bank')

        return HttpResponse(json.dumps(list(acc_val)))


# http://127.0.0.1:8000/account/create?personEmail=amal.salim@gmail.com&environment=sandbox
def new_item_token(request):
    person_email = request.GET.get("personEmail")
    environment = request.GET.get("environment", DEFAULT_ENV_PLAID)
    print ("here is the person email", person_email)
    print("here is the environment", )
    context = {
        "plaid_public_key": "8363dece5a87445f66fe9efbb7a682",
        "plaid_environment": environment,
        "plaid_products": PLAID_PRODUCTS,
        "plaid_country_codes": PLAID_COUNTRY_CODES,
        "person_email": person_email
    }
    return render(request, 'index.ejs', context)


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

