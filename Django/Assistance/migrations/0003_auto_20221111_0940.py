# Generated by Django 2.1.5 on 2022-11-11 09:40

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Assistance', '0002_auto_20221110_0446'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assistance_info',
            name='create_time',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 11, 9, 40, 44, 658473)),
        ),
    ]