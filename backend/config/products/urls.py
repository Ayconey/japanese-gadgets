from django.urls import path
from .views import ProductListView,ProductDetailView,add_cart_item,get_cart_items,update_cart


urlpatterns = [
    path('',ProductListView.as_view()),
    path('<int:pk>/',ProductDetailView.as_view()),
    path('cart/',get_cart_items),
    path('cart_add/',add_cart_item), # require product_id,quantity
    path('cart_update/',update_cart),
]