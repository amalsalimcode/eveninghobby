from django.contrib import admin
from django.urls import path

from account.views import new_item_token, get_access_token, AccountInfo

admin.autodiscover()

urlpatterns = [
    path('', AccountInfo.as_view()),
    path('create', new_item_token),
    path('getAccessToken', get_access_token),
]
