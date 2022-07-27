# Generated by Django 4.0.5 on 2022-07-25 08:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_remove_order_delivery_date_remove_order_product_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='full_price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=2),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='payment_method',
            field=models.CharField(default='blik', max_length=40),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='DeliveryInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=200)),
                ('name', models.CharField(blank=True, max_length=100)),
                ('surname', models.CharField(blank=True, max_length=100)),
                ('country', models.CharField(blank=True, max_length=100)),
                ('city', models.CharField(blank=True, max_length=100)),
                ('street', models.CharField(blank=True, max_length=100)),
                ('buildingNumber', models.IntegerField(blank=True, null=True)),
                ('houseNumber', models.IntegerField(blank=True, null=True)),
                ('post_code', models.CharField(blank=True, max_length=100)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.order')),
            ],
        ),
    ]