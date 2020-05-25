from django.contrib import admin
from django.urls import path
from . import views

admin.autodiscover()

urlpatterns = [
    path('create', views.new_item_token),
    path('getAccessToken', views.get_access_token),
]
