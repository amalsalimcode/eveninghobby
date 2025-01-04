

# Create your views here.
from django.http import Http404, HttpResponse
from django.http import HttpResponseBadRequest
from django.http import HttpResponseForbidden
from django.http import HttpResponseNotFound
from django.core.serializers import serialize

import json

from user.models import User


def user(request):

    if request.method == "GET":
        us = User.objects.filter(name="amal")
        return HttpResponse(content=serialize('json', User.objects.all()), status=200)

    else:
        return HttpResponseBadRequest()
