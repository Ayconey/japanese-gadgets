from django.shortcuts import render
from rest_framework import generics

from .models import Order
from products.models import CartItem
from .serializers import OrderSerializer,ShowOnlyOrderSerializer
# Create your views here.


class OrderListCreateView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        products = self.request.data.get('products',[])
        for i in products:
            tmp = CartItem.objects.get(pk=i)
            p = tmp.product
            p.count -= tmp.quantity
            p.save()
        return super().perform_create(serializer)


class UserOrdersView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = ShowOnlyOrderSerializer

    def get_queryset(self):
        q = Order.objects.all().filter(user=self.request.user)
        return q