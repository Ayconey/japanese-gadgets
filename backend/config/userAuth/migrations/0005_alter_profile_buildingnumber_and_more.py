# Generated by Django 4.0.5 on 2022-06-28 09:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userAuth', '0004_rename_buldingnumber_profile_buildingnumber'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='buildingNumber',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='houseNumber',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
