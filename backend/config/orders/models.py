from django.db import models
from django.contrib.auth import get_user_model

from products.models import Product
# Create your models here.
User = get_user_model()

class Order(models.Model):
    user = models.ForeignKey(User,on_delete=models.DO_NOTHING,related_name='user_orders')
    product = models.ForeignKey(Product,on_delete=models.DO_NOTHING)
    submit_date = models.DateTimeField()
    delivery_date = models.DateTimeField(blank=True)