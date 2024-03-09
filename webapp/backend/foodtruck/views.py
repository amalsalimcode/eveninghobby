import json
from django.shortcuts import render
from math import sin, cos, sqrt, atan2, radians


# Create your views here.
from django.http import JsonResponse
from .models import FoodVendor

def item_list(request):

    # for backend, we require the fields to be set
    if 'latitude' not in request.GET or 'longitude' not in request.GET or 'radius' not in request.GET:
        return JsonResponse({'error': 'Latitude, longitude, and radius are required fields.'}, status=400)


    lat1 = radians(float(request.GET['latitude']))
    lon1 = radians(float(request.GET['longitude']))
    given_distance_km = float(request.GET['radius'])

    R = 6371.0

    fv = FoodVendor.objects.filter(status="APPROVED")
    ans = []
    for vendor in fv:

        lat2 = radians(vendor.latitude)
        lon2 = radians(vendor.longitude)

        dlon = lon2 - lon1
        dlat = lat2 - lat1
    
        a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))


        if R * c < given_distance_km:
            ans += [{'lat': float(vendor.latitude), 'lon': float(vendor.longitude), 'address': vendor.address,
                     'name': vendor.applicant, 'food_items': json.loads(vendor.food_items), 'days_hours': vendor.days_hours,
                     'distance': R*c, 'permit': vendor.permit, 'expiration_date': vendor.expiration_date}]

    return JsonResponse(sorted(ans, key=lambda x: x['distance']), safe=False)
