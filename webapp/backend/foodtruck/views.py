from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from .models import Item

def item_list(request):
    items = Item.objects.all()
    data = [{'name': item.name, 'description': item.description} for item in items]
    return JsonResponse(data, safe=False)

