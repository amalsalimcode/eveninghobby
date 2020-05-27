from django.db import models
from django.db.models import DateTimeField

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
    accountId = models.TextField(unique=True)
    accountName = models.TextField()
    accountType = models.CharField(max_length=30)
    extraData = models.TextField()

    def __str__(self):
        return '{} {}'.format(self.accountId, self.credentials.bank)


class Transaction(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    transactionId = models.TextField()
    amount = models.FloatField()
    date = models.DateField()
    name = models.TextField()
    extra_data = models.TextField()

    unique_together = [transactionId, account]

    def __str__(self):
        return '{} {} ${}'.format(self.date, self.name, self.amount)
