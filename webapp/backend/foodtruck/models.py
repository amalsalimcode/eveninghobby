from django.db import models

from django.db import models

class FoodVendor(models.Model):
    locationid = models.IntegerField()
    Applicant = models.CharField(max_length=255)
    FacilityType = models.CharField(max_length=100)
    cnn = models.IntegerField()
    LocationDescription = models.CharField(max_length=255)
    Address = models.CharField(max_length=255)
    blocklot = models.CharField(max_length=255)
    block = models.CharField(max_length=255)
    lot = models.CharField(max_length=255)
    permit = models.CharField(max_length=100)
    Status = models.CharField(max_length=100)
    FoodItems = models.TextField()
    X = models.FloatField(null=True)
    Y = models.FloatField(null=True)
    Latitude = models.FloatField()
    Longitude = models.FloatField()
    Schedule = models.CharField(max_length=255)
    dayshours = models.CharField(max_length=255, blank=True)
    NOISent = models.CharField(max_length=255, blank=True)
    Approved = models.CharField(max_length=100)
    Received = models.CharField(max_length=100)
    PriorPermit = models.CharField(max_length=100)
    ExpirationDate = models.DateField()
    Location = models.CharField(max_length=255)
    FirePreventionDistricts = models.IntegerField(null=True)
    PoliceDistricts = models.IntegerField(null=True)
    SupervisorDistricts = models.IntegerField(null=True)
    ZipCodes = models.IntegerField(null=True)
    Neighborhoods = models.CharField(max_length=255)

    def __str__(self):
        return self.Applicant

class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

