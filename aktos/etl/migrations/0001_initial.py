# Generated by Django 3.0.5 on 2024-02-22 18:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Consumer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('client_reference_no', models.CharField(max_length=100)),
                ('balance', models.DecimalField(decimal_places=2, max_digits=10)),
                ('status', models.CharField(max_length=50)),
                ('name', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=255)),
                ('ssn', models.CharField(max_length=20)),
            ],
        ),
    ]
