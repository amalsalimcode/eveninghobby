from django.contrib import admin
from django.urls import path

from receipt.views import RetrieveReceipt, UploadReceipt, DeleteReceipt

admin.autodiscover()

urlpatterns = [
    path('', RetrieveReceipt.as_view()),
    path('upload', UploadReceipt.as_view()),
    path('delete', DeleteReceipt.as_view())
]
