import base64
import io
import json
import sys

from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
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

    def get(self):
        return HttpResponse(status=400)

    def post(self, request):
        if request.FILES.get("image"):
            output = io.BytesIO()
            image = Image.open(request.FILES['image'])
            image.thumbnail((50, 50), Image.ANTIALIAS)
            image.save(output, format='JPEG', quality=100)
            output.seek(0)
            thumb_file = InMemoryUploadedFile(output, 'ImageField', "test.jpg",
                                              'image/jpeg', sys.getsizeof(output), None)
            r = Receipt.objects.create(image=thumb_file, amount=0)
            print("I just created a receipt", r)
            dt = r.createdAt.date()
            new_receipt = {"uuid_str": str(r.uuid), "amount": r.amount, "name": r.name,
                           "createdAt_str": str(str(dt.month) + "/" + str(dt.day) + "/" + str(dt.year)),
                           "image_fill": img_to_response(r.image)}
            return HttpResponse(status=200, content=json.dumps(new_receipt))
        else:
            return HttpResponse(status=400)


class DeleteReceipt(View):

    def get(self):
        pass

    def post(self, request):
        if not len(json.loads(request.body)):
            return HttpResponse(status=200)

        args = json.loads(request.body)
        print("going to delete uuids", args)
        Receipt.objects.filter(uuid__in=args).delete()
        return HttpResponse(status=200)


def img_to_response(img):
    x = open(img.path, mode='rb').read()
    image_data = base64.b64encode(x).decode('utf-8')
    # content_type, encoding = guess_type(img)
    final_img = "data:image/jpg;base64,%s" % (image_data)
    # print(image_data)
    return final_img
