from django.shortcuts import render
from rest_framework import generics

from .models import Order
from .serializers import OrderSerializer
# Create your views here.


class OrderListCreateView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        return super().perform_create(serializer)
