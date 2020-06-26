from django import forms

from transaction.models import Hotel


class HotelForm(forms.ModelForm):
    class Meta:
        model = Hotel
        fields = ['name', 'hotel_Main_Img']