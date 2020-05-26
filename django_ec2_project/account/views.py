import json

import plaid
from django.http import HttpResponse
from django.shortcuts import render

from account.utils import create_new_cred_plaid, get_client_plaid
from django_ec2_project.settings import PLAID_PRODUCTS, PLAID_COUNTRY_CODES, DEFAULT_ENV_PLAID
from transaction.models import Person
from transaction.utils import update_plaid_transactions


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
    update_plaid_transactions(cred, environment)

    return HttpResponse(exchange_response)

