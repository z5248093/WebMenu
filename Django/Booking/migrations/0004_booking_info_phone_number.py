# Generated by Django 4.1.2 on 2022-11-10 03:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Booking', '0003_alter_booking_info_book_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking_info',
            name='phone_number',
            field=models.IntegerField(default=0),
        ),
    ]
