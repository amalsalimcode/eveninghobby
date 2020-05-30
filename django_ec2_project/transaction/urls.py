from django.contrib import admin
from django.urls import path

from transaction.views import RetrieveTransaction, TotalSpent, RetrieveAccount

admin.autodiscover()

urlpatterns = [
    path('', RetrieveTransaction.as_view()),
    path('totalSpent', TotalSpent.as_view()),
    path('retrieveAccount', RetrieveAccount.as_view())
]
