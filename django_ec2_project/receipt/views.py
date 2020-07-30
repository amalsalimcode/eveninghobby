import base64
import json

from PIL import Image
from django.db.models import TextField, Func, F, Value, CharField
from django.db.models.functions import Cast, ExtractMonth, ExtractDay, ExtractYear, Concat
from django.http import HttpResponse
from django.views import View

from transaction.models import Receipt


class RetrieveReceipt(View):

    def get(self, request):
        pass

    def post(self, request):
        args = json.loads(request.body)
        if args.get("uuid"):
            img = Receipt.objects.get(uuid=args["uuid"]).image
            x = open(img.path, mode='rb').read()
            image_data = base64.b64encode(x).decode('utf-8')
            # content_type, encoding = guess_type(img)
            final_img = "data:image/jpg;base64,%s" %(image_data)
            return HttpResponse(json.dumps({'image': final_img}), status=200)
        else:
            x = list(Receipt.objects.annotate(uuid_str=Cast('uuid', output_field=TextField()),
                                              month=Cast(ExtractMonth('createdAt'), CharField()),
                                              day=Cast(ExtractDay('createdAt'), CharField()),
                                              year=Cast(ExtractYear('createdAt'), CharField()),
                                              createdAt_str=Concat(
                                                  Value(''), 'month', Value('/'), 'day',
                                                  Value('/'), 'year',
                                                  output_field=CharField()
                                              )).\
                     values('uuid_str', 'name', 'createdAt_str', 'amount', 'image').order_by('-createdAt'))

            for receipt in x:
                image_data = base64.b64encode(open(receipt['image'], mode='rb').read()).decode('utf-8')
                receipt['image_fill'] = "data:image/jpg;base64,%s" %(image_data)
        return HttpResponse(json.dumps(x), status=200)


class UploadReceipt(View):

    def get(self, request):
        return HttpResponse('Not Allowed', status=400)

    # this code is not called
    def post(self, request):
        x = request.FILES['image']
        Receipt.objects.create(image=x, amount=0)
        return HttpResponse(status=200)
