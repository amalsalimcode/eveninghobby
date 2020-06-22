from django.contrib import admin
from django.urls import path

from account.views import get_access_token, AccountInfo, CreateAccount, DeleteAccount

admin.autodiscover()

urlpatterns = [
    path('', AccountInfo.as_view()),
    path('create', CreateAccount.as_view()),
    path('getAccessToken', get_access_token),
    path('delete', DeleteAccount.as_view())
]
