# Generated by Django 4.1.1 on 2022-10-15 05:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Items', '0004_remove_items_info_offer_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='items_info',
            name='offer_status',
            field=models.IntegerField(default=1),
        ),
    ]
