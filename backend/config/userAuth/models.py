from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.
User = get_user_model()

# data of some user
class Profile(models.Model):
    user = models.ForeignKey(User,related_name='user_profile',on_delete=models.CASCADE)
    name = models.CharField(max_length=100,blank=True)
    surname = models.CharField(max_length=100,blank=True)
    country = models.CharField(max_length=100,blank=True)
    city = models.CharField(max_length=100,blank=True)
    street = models.CharField(max_length=100,blank=True)
    post_code = models.CharField(max_length=100,blank=True)
