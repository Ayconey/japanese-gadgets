# Generated by Django 4.0.5 on 2022-06-29 15:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_alter_cart_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartitem',
            name='quantity',
            field=models.IntegerField(null=True),
        ),
    ]
