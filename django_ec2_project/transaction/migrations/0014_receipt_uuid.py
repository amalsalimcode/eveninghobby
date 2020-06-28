# Generated by Django 3.0.5 on 2020-06-28 04:52

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0013_transaction_receipt'),
    ]

    operations = [
        migrations.AddField(
            model_name='receipt',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, editable=False),
        ),
    ]
