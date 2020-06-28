import json

from django.http import HttpResponse
from django.views import View

from transaction.models import Receipt


class RetrieveReceipt(View):

    def get(self, request):
        pass

    def post(self, request):
        Receipt.objects.all()
        return HttpResponse(json.dumps({'image': "image_resp"}), status=200)

