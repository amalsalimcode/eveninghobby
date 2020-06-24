# Generated by Django 3.0.5 on 2020-06-23 00:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0007_person_token'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='avatarId',
            field=models.CharField(default='default', max_length=35),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='person',
            name='extraData',
            field=models.TextField(default='asdf'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='person',
            name='restricted',
            field=models.BooleanField(default=False),
        ),
    ]
