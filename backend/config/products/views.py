from django.shortcuts import render
from rest_framework import generics,permissions

from .models import Product
from .serializers import ProductSerializer
# Create your views here.


class ProductMixinView():
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ProductListView(ProductMixinView,generics.ListCreateAPIView):
    pass


class ProductDetailView(ProductMixinView,generics.RetrieveUpdateDestroyAPIView):
    pass