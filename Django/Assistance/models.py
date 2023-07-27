from datetime import datetime
from django.db import models

# Create your models here.
class assistance_info(models.Model):
    table_number = models.IntegerField()
    customer_id = models.IntegerField()
    create_time = models.DateTimeField(default = datetime.now())
    is_completed = models.BooleanField(default = False)