# Generated by Django 2.1.5 on 2022-11-12 04:18

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Assistance', '0009_auto_20221112_0413'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assistance_info',
            name='create_time',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 12, 4, 18, 53, 509261)),
        ),
    ]
