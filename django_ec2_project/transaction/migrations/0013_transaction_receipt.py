# Generated by Django 3.0.5 on 2020-06-28 04:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0012_auto_20200628_0239'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='receipt',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.SET_DEFAULT, to='transaction.Receipt'),
        ),
    ]