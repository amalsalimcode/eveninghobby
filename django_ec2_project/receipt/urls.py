from django.contrib import admin
from django.urls import path

from receipt.views import RetrieveReceipt

admin.autodiscover()

urlpatterns = [
    path('', RetrieveReceipt.as_view()),
]
