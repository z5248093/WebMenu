# Generated by Django 4.1.2 on 2022-11-11 06:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Booking', '0004_booking_info_phone_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking_info',
            name='book_name',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]
