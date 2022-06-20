from django.db import models

# Create your models here.

class Product(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    price = models.FloatField()
    # image = models.ImageField()
    count = models.IntegerField() # number of that exact product

    def __str__(self):
        return self.title + ' c.' + str(self.count)
