from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
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
            if p.count <=0:
                return Response(status=400)
            p.count -= tmp.quantity
            p.save()
        return super().perform_create(serializer)


class UserOrdersView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = ShowOnlyOrderSerializer

    def get_queryset(self):
        q = Order.objects.all().filter(user=self.request.user)
        return q


class OrdersForAdmin(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = ShowOnlyOrderSerializer
    permission_classes = [IsAdminUser]