# Generated by Django 4.1.1 on 2022-10-29 05:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Items', '0007_items_info_image_alter_items_info_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='items_info',
            old_name='image',
            new_name='url',
        ),
    ]
