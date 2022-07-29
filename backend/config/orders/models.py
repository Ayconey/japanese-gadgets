from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from products.models import Product,CartItem
# Create your models here.
User = get_user_model()


class Order(models.Model):
    user = models.ForeignKey(User,on_delete=models.DO_NOTHING,related_name='user_orders')
    products = models.ManyToManyField(CartItem)
    submit_date = models.DateTimeField(auto_now=True)
    payment_method = models.CharField(max_length=40)
    full_price = models.DecimalField(decimal_places=2,max_digits=20)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username + ' ' + str(self.submit_date)


class DeliveryInfo(models.Model):
    order = models.OneToOneField(Order,on_delete=models.CASCADE,related_name='delivery_info')
    # user's info
    email = models.EmailField(max_length=200)
    name = models.CharField(max_length=100, blank=True)
    surname = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    street = models.CharField(max_length=100, blank=True)
    buildingNumber = models.IntegerField(blank=True, null=True)
    houseNumber = models.IntegerField(blank=True, null=True)
    post_code = models.CharField(max_length=100, blank=True)

    @receiver(post_save, sender=Order)
    def create_order_deliveryinfo(sender, instance, created, **kwargs):
        if created:
            instance.user.cart.items.clear()
            DeliveryInfo.objects.create(order=instance,
                                        email=instance.user.email,
                                        name=instance.user.profile.name,
                                        surname=instance.user.profile.surname,
                                        country=instance.user.profile.country,
                                        city=instance.user.profile.city,
                                        street=instance.user.profile.street,
                                        buildingNumber=instance.user.profile.buildingNumber,
                                        houseNumber=instance.user.profile.houseNumber,
                                        post_code=instance.user.profile.post_code
                                        )

    @receiver(post_save, sender=Order)
    def save_order_deliveryinfo(sender, instance, **kwargs):
        instance.delivery_info.save()
