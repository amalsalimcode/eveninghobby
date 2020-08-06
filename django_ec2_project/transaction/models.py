import uuid

from django.db import models
from django.db.models import DateTimeField

from smartfields import fields
from smartfields.dependencies import FileDependency
from smartfields.processors import ImageProcessor

from django_ec2_project.settings import DEFAULT_ENV_PLAID


class PersonGroup(models.Model):
    name = models.CharField(max_length=30, unique=True)
    lastUpdatedAt: DateTimeField = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{}'.format(self.name)


class Person(models.Model):
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    email = models.CharField(max_length=30, unique=True)
    token = models.TextField()
    personGroup = models.ForeignKey(PersonGroup, default=None, on_delete=models.SET_DEFAULT)
    avatarId = models.CharField(max_length=35)

    def __str__(self):
        return '{}'.format(self.email)


class BankCred(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    bank = models.CharField(max_length=30)
    plaidCode = models.TextField()
    username = models.TextField()
    userpass = models.TextField()
    environment = models.CharField(default=DEFAULT_ENV_PLAID, max_length=30)

    def __str__(self):
        return '{} {}'.format(self.bank, self.plaidCode)


class Account(models.Model):
    credentials = models.ForeignKey(BankCred, on_delete=models.CASCADE)
    restricted = models.BooleanField(default=False)
    accountId = models.TextField(unique=True)
    accountName = models.TextField()
    accountType = models.CharField(max_length=30)
    extraData = models.TextField()

    def __str__(self):
        return '{} {}'.format(self.accountId, self.credentials.bank)


class Receipt(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4)
    store = models.CharField(max_length=50, default=None, null=True)
    memo = models.CharField(max_length=200, default=None, null=True)
    image = models.ImageField(upload_to='images/')
    amount = models.FloatField(null=True)
    createdAt = models.DateTimeField(auto_now_add=True, auto_created=True)
    purchasedAt = models.DateTimeField(default=None)


class Transaction(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    receipt = models.ForeignKey(Receipt, default=None, on_delete=models.SET_DEFAULT)
    transactionId = models.TextField()
    amount = models.FloatField()
    date = models.DateField()
    name = models.TextField()
    extra_data = models.TextField()

    unique_together = [transactionId, account]

    def __str__(self):
        return '{} {} ${}'.format(self.date, self.name, self.amount)


