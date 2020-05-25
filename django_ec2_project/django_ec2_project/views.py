import json

from django.http import HttpResponse

def hello_test(request):

    with open('django_ec2_project/data.json') as f:
        data = json.load(f)

    x = json.dumps(data)
    return HttpResponse(x)


def wells_test(request):

    with open('django_ec2_project/wells.json') as f:
        stmt = json.load(f)

    return HttpResponse(json.dumps(stmt))

