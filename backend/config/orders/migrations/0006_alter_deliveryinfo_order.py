# Generated by Django 4.0.5 on 2022-07-25 10:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0005_alter_deliveryinfo_order_alter_order_full_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deliveryinfo',
            name='order',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='delivery_info', to='orders.order'),
        ),
    ]
