import json
from django.shortcuts import render
from django.core import serializers
from django.db.models import F, Func, FloatField, ExpressionWrapper
from math import sin, cos, sqrt, atan2, radians
from django.utils import timezone


# Create your views here.
from django.http import JsonResponse
from .models import FoodVendor

def item_list(request):
    lat1 = radians(float(request.GET.get('latitude', '0')))
    lon1 = radians(float(request.GET.get('longitude', '0')))

    given_distance_km = 2.0
    R = 6371.0

    ans = []

    fv = FoodVendor.objects.filter(ExpirationDate__gt=timezone.now().date(),
                                   Status='APPROVED')
    for vendor in fv:
        lat2 = radians(vendor.Latitude)
        lon2 = radians(vendor.Longitude)

        dlon = lon2 - lon1
        dlat = lat2 - lat1
    
        a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))

        if R * c < given_distance_km:
            ans += [{'lat': float(vendor.Latitude), 'lon': float(vendor.Longitude), 'address': vendor.Address,
                     'name': vendor.Applicant, 'items': vendor.FoodItems, 'dayshours': vendor.dayshours}]

    print(len(ans))
    return JsonResponse(ans, safe=False)
