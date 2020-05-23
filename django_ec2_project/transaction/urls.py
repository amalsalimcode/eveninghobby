from django.contrib import admin
from django.urls import path
from . import views

admin.autodiscover()

urlpatterns = [
    path('', views.RetrieveTransaction.as_view()),
    path('totalSpent', views.TotalSpent.as_view()),
]
