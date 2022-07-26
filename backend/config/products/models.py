from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
User = get_user_model()


# unique type of product
class Product(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    price = models.FloatField()
    image = models.ImageField(upload_to='products/',default='products/default.jpg')
    count = models.IntegerField() # number of that exact product in warehouse
    
    def __str__(self):
        return self.title + ' c.' + str(self.count)


# combination of product itself and number of it
class CartItem(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.IntegerField(null=True)

    @property
    def price(self):
        return self.product.price * self.quantity

# user's cart
class Cart(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name='cart')
    items = models.ManyToManyField(CartItem)

    @property
    def price_of_items(self):
        items = self.items.all()
        price = 0
        for item in items:
            tmp_price = item.product.price * item.quantity
            price+=tmp_price
        return price

    @receiver(post_save, sender=User)
    def create_user_cart(sender, instance, created, **kwargs):
        if created:
            Cart.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_cart(sender, instance, **kwargs):
        instance.cart.save()
