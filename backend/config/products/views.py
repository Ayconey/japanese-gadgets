from django.shortcuts import render
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
# Create your views here.


class ProductMixinView():
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductListView(ProductMixinView,generics.ListCreateAPIView):
    pass


class ProductDetailView(ProductMixinView,generics.RetrieveUpdateDestroyAPIView):
    pass