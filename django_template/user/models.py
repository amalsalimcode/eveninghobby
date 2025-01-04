from django.db import models

# Create your models here.

class Group(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name


class Company(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self) -> str:
        return self.name


class User(models.Model):
    age = models.IntegerField(default=0)
    name = models.CharField(max_length=200)
    email = models.EmailField(null=True)
    alive = models.BooleanField(default=False)
    pub_date = models.DateTimeField("date published", null=True, auto_created=True)
    company = models.ForeignKey(Company, null=True, on_delete=models.SET_NULL)
    groups = models.ManyToManyField(Group)

    def __str__(self) -> str:
        return self.name

