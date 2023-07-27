from ast import Mod
from django.db import models
from django.forms import IntegerField

class Booking_info(models.Model):
    party_size = models.IntegerField()
    book_date = models.CharField(max_length = 100)
    seating_area = models.CharField(max_length = 100)
    book_time = models.CharField(max_length = 100)
    phone_number = models.IntegerField(default=0)
    customer_id = models.IntegerField()
    book_name = models.CharField(max_length =100)
