# Generated by Django 3.0.5 on 2020-05-26 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0005_auto_20200521_0747'),
    ]

    operations = [
        migrations.AddField(
            model_name='bankcred',
            name='environment',
            field=models.CharField(default='sandbox', max_length=30),
        ),
    ]
