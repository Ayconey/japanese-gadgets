# Generated by Django 4.0.5 on 2022-06-29 09:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userAuth', '0006_cart'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Cart',
        ),
    ]