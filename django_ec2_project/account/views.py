import json

import plaid
from django.http import HttpResponse
from django.shortcuts import render

client = plaid.Client(client_id="5eaf6d01c2fef80013fabb95", secret="48a2ab145fc210e1a58b175fc083ff",
                      public_key="8363dece5a87445f66fe9efbb7a682", environment="sandbox", api_version='2019-05-29')

# We store the access_token in memory - in production, store it in a secure
# persistent data store.
access_token = None


# http://127.0.0.1:8000/account/create?personName=johnny
def new_item_token(request):
    person_name = request.GET.get("personName")
    print ("here is the person name", person_name)
    context = {
        "plaid_public_key": "8363dece5a87445f66fe9efbb7a682",
        "plaid_environment": "sandbox",
        "plaid_products": "transactions",
        "plaid_country_codes": "US",
        "person_name": person_name
    }
    return render(request, 'index.ejs', context)


def get_access_token(request):
    public_token = request.POST.get("public_token")
    try:
        exchange_response = client.Item.public_token.exchange(public_token)
    except plaid.errors.PlaidError as e:
        return HttpResponse(e)

    import pprint
    print("im in get access token!")
    pprint.pprint(request.POST)
    access_token = exchange_response['access_token']
    return HttpResponse(exchange_response)

