from django.urls import path
from .views import get_consumers

urlpatterns = [
    path('consumers/', get_consumers, name='get_consumers'),
]