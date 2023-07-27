from ast import Mod
from django.db import models
from django.forms import IntegerField
from datetime import datetime
# Create your models here.
#class Order_info(models.Model):
    
    
class Order_info(models.Model):
    customer_id = models.IntegerField() 
    payment_status = models.IntegerField(default=0)  
    #order shows customer dining way -- to go or eat here        
    Dining_way = models.IntegerField(default=1)   
    table_number = models.IntegerField(default=1)  
    
    
    
class Order_total(models.Model):
    order_id = models.ForeignKey("Order_info", on_delete=models.CASCADE)
    product_id = models.IntegerField()
    product_name = models.CharField(max_length=50)
    price = models.FloatField()
    quantity = models.IntegerField()
    status = models.IntegerField(default=0)
    total_price = models.FloatField(default=0)  
    create_at = models.DateTimeField(default=datetime.now)   
    #update_at = models.DateTimeField(default=datetime.now)

