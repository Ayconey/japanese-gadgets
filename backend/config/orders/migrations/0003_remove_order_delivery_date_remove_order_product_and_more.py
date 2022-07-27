# Generated by Django 4.0.5 on 2022-07-21 09:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0009_alter_product_image'),
        ('orders', '0002_order_delivery_date_order_submit_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='delivery_date',
        ),
        migrations.RemoveField(
            model_name='order',
            name='product',
        ),
        migrations.AddField(
            model_name='order',
            name='completed',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='order',
            name='products',
            field=models.ManyToManyField(to='products.cartitem'),
        ),
    ]