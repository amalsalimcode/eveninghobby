from django.db import models

from django.db import models

class FoodVendor(models.Model):
    location_id = models.IntegerField()
    applicant = models.CharField(max_length=255)
    facility_type = models.CharField(max_length=100)
    location_description = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    permit = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    food_items = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    days_hours = models.CharField(max_length=255, blank=True)
    approved = models.CharField(max_length=100)
    received = models.CharField(max_length=100)
    prior_permit = models.CharField(max_length=100)
    expiration_date = models.DateField()
    zip_codes = models.IntegerField(null=True)


    def __str__(self):
        return self.applicant

