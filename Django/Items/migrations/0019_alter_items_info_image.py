# Generated by Django 4.1.1 on 2022-10-29 14:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Items', '0018_alter_items_info_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='items_info',
            name='image',
            field=models.ImageField(upload_to='product/'),
        ),
    ]
