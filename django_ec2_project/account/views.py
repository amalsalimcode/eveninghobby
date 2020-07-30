import base64
import io
import json
import sys
from io import StringIO
from mimetypes import guess_type

import plaid
from PIL import Image
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db.models import F
from django.http import HttpResponse, FileResponse
from django.shortcuts import render, redirect
from django.views import View

from account.utils import create_new_cred_plaid, get_client_plaid
from django_ec2_project.settings import PLAID_PRODUCTS, PLAID_COUNTRY_CODES, DEFAULT_ENV_PLAID
from transaction.models import Person, Account, Receipt
from transaction.utils import update_plaid_transactions
from django.core.files.storage import default_storage


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

        return HttpResponse(json.dumps(list(acc_val)))


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


class ReceiptUpload(View):

    def get(self, request):
        print("im here in backend")

        img = Receipt.objects.last().image
        print(img.url)
        x = open(img.path, mode='rb').read()
        return HttpResponse(x, content_type="image/png", status=200)

    def post(self, request):
        # x = request.body.split("\r")[0][2:]
        # print("here is the body", request.body)
        # f = open("demofile2.jpg", "w")
        # f.write(request.body)
        # f.close()
        print("i got a request")
        if request.FILES.get("image"):
            output = io.BytesIO()
            image = Image.open(request.FILES['image'])
            image.save(output, format='JPEG', quality=100).thumbnail((50, 50), Image.ANTIALIAS).seek(0)
            thumb_file = InMemoryUploadedFile(output, 'ImageField', "test.jpg",
                                              'image/jpeg', sys.getsizeof(output), None)
            Receipt.objects.create(image=thumb_file, amount=0)
            print("i think i created")
            return HttpResponse(status=200)
        else:
            img = Receipt.objects.last().image
            x = open(img.path, mode='rb').read()
            image_data = base64.b64encode(x).decode('utf-8')
            # content_type, encoding = guess_type(img)
            final_img = "data:image/jpg;base64,%s" % (image_data)
            # print(image_data)
            return HttpResponse(json.dumps({'image': final_img}), status=200)
