from rest_framework import serializers

from .models import Order,DeliveryInfo


class DeliveryInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryInfo
        fields = ('name','surname','country','city','street','buildingNumber','houseNumber','post_code')


class OrderSerializer(serializers.ModelSerializer):
    delivery_info = DeliveryInfoSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ('user','products','submit_date','payment_method','full_price','completed','delivery_info')
        read_only_fields = ['user']