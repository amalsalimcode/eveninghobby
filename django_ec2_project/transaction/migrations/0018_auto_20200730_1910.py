# Generated by Django 3.0.5 on 2020-07-30 19:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0017_auto_20200728_2348'),
    ]

    operations = [
        migrations.AlterField(
            model_name='receipt',
            name='image',
            field=models.ImageField(upload_to='images/'),
        ),
    ]
