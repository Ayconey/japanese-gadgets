# Generated by Django 4.0.5 on 2022-07-02 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0008_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(default='products/default.jpg', upload_to='products/'),
        ),
    ]
