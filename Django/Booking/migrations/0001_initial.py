# Generated by Django 4.1.1 on 2022-11-03 10:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Booking_info',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('party_size', models.IntegerField()),
                ('book_date', models.IntegerField()),
                ('seating_area', models.CharField(max_length=100)),
                ('book_time', models.IntegerField()),
            ],
        ),
    ]
