from django.shortcuts import render
from rest_framework import generics,permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product,Cart,CartItem
from .serializers import ProductSerializer,CartSerializer
# Create your views here.


# help functions
def get_or_create_cart_item(product_id,quantity):
    product = Product.objects.get(pk=int(product_id))
    item = CartItem.objects.filter(product=product, quantity=quantity)
    if not item:
        item = CartItem.objects.create(product=product, quantity=quantity)
        item.save()
    else:
        item = item[0]
    return item


class ProductMixinView():
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ProductListView(ProductMixinView,generics.ListCreateAPIView):
    pass


class ProductDetailView(ProductMixinView,generics.RetrieveUpdateDestroyAPIView):
    pass


@api_view(["POST"]) # requires product_id,quantity
def add_cart_item(request):
    product = Product.objects.get(pk=int(request.data.get('product_id')))
    quantity = request.data['quantity']
    item = get_or_create_cart_item(product.id,quantity)

    cart = request.user.cart
    old_item = cart.items.filter(product=product)
    if old_item:
        cart.items.remove(old_item[0].id)
    cart.items.add(item.id)
    return Response(status=200)


# @api_view(["POST"]) # requires product_id,quantity
# def remove_item_from_cart(request):
#     product = Product.objects.get(pk=request.data['product_id'])
#     quantity = request.data['quantity']
#     if quantity
#     pass

@api_view(['GET'])
def get_cart_items(request):
    serializer = CartSerializer(request.user.cart)
    return Response(status=200,data=serializer.data)

@api_view(['POST'])  # requires a list of (product_id,quantity) pair
def update_cart(request):
    passed_list = request.data['products']
    cart = request.user.cart
    for id,q in passed_list: #q is none sometimes
        if q is not None:
            q = int(q)
            item = get_or_create_cart_item(id,q)
            product = Product.objects.get(pk=id)
            old_item = cart.items.filter(product=product)
            for i in old_item:
                cart.items.remove(i.id)
            if q > 0:
                cart.items.add(item)
    return Response(status=200)