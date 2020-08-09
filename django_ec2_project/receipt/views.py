import base64
import datetime
import io
import json
import sys

from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db.models import TextField, Func, F, Value, CharField, DateField
from django.db.models.functions import Cast, ExtractMonth, ExtractDay, ExtractYear, Concat, TruncDate
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
            final_img = "data:image/jpg;base64,%s" % (image_data)
            return HttpResponse(json.dumps({'image': final_img}), status=200)
        else:
            batch = 20
            batch_count_min = args.get("initLen")
            batch_count_max = batch_count_min + batch

            if batch_count_min >= Receipt.objects.all().count():
                return HttpResponse(status=400)
            x = list(Receipt.objects.annotate(uuid_str=Cast('uuid', output_field=TextField()),
                                              month=Cast(ExtractMonth('createdAt'), CharField()),
                                              day=Cast(ExtractDay('createdAt'), CharField()),
                                              year=Cast(ExtractYear('createdAt'), CharField()),
                                              purchasedAt_str=Concat(
                                                  Value(''), 'month', Value('/'), 'day',
                                                  Value('/'), 'year',
                                                  output_field=CharField()
                                              )).\
                     values('uuid_str', 'store', 'purchasedAt_str', 'amount', 'image').
                     order_by('-purchasedAt'))[batch_count_min:batch_count_max]

            for receipt in x:
                image_data = base64.b64encode(open(receipt['image'], mode='rb').read()).decode('utf-8')
                receipt['image_fill'] = "data:image/jpg;base64,%s" % (image_data)
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
            arg = request.POST

            amount = arg.get('amount')
            if len(amount) > 1:
                amount_parsed = float(amount[1: len(amount)])
            else:
                amount_parsed = float(amount)

            dt = json.loads(arg.get('purchaseDate'))
            print("here is the date receipved", dt)
            dt_datetime = datetime.datetime(dt['year'], dt['month'] + 1, dt['date'],
                                            dt['hour'], dt['minute'])

            r = Receipt.objects.create(image=thumb_file, amount=amount_parsed,
                                       store=arg.get('store'), memo=arg.get('memo'),
                                       purchasedAt=dt_datetime)
            print("I just created a receipt", r)
            dt = r.purchasedAt.date()
            new_receipt = {"uuid_str": str(r.uuid), "amount": r.amount, "store": r.store, "memo": r.memo,
                           "purchasedAt_str": str(str(dt.month) + "/" + str(dt.day) + "/" + str(dt.year)),
                           "image_fill": img_to_response(r.image)}
            print("new date for receipt", r.purchasedAt)
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
