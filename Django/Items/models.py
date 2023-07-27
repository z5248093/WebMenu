import datetime
from unittest.util import _MAX_LENGTH
from django.db import models


# Create your models here.

#Category
class items_category(models.Model):
    name = models.CharField(max_length = 80)
    # create_time = models.DateTimeField(default = datetime.now()) 
    # update_time = models.DateTimeField(default = datetime.now())

#Items
class items_info(models.Model):
    #item name
    name = models.CharField(max_length = 80, unique = True)
    #item price
    price = models.FloatField(default = 0)
    #item image
    image = models.ImageField(upload_to='product/', max_length = 1000)
    #item category
    category = models.ForeignKey("items_category", on_delete=models.CASCADE)
    #item description
    description = models.CharField(max_length = 1000)
    #item ingredients 
    ingredients = models.CharField(max_length = 1000)
    #item status
    offer_status = models.BooleanField(default = True)    
    create_time = models.DateTimeField(auto_now_add = True) 
    update_time = models.DateTimeField(auto_now = True)
    

    
