from django.contrib import admin
from .models import Order,DeliveryInfo
# Register your models here.

admin.site.register(Order)
admin.site.register(DeliveryInfo)