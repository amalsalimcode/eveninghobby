# Generated by Django 3.0.5 on 2024-03-06 19:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foodtruck', '0002_auto_20240306_1950'),
    ]

    operations = [
        migrations.AlterField(
            model_name='foodvendor',
            name='NOISent',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='foodvendor',
            name='dayshours',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
