from django.db import models

class Consumer(models.Model):
    client_reference_no = models.CharField(max_length=100)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(max_length=50, default='')
    name = models.CharField(max_length=100, default='')
    address = models.CharField(max_length=255, default='')
    ssn = models.CharField(max_length=20, default='')