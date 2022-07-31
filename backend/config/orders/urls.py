from django.urls import path
from .views import OrderListCreateView,UserOrdersView,OrdersForAdmin

urlpatterns = [
    path('',OrderListCreateView.as_view()),
    path('self/',UserOrdersView.as_view()),
    path('admin/',OrdersForAdmin.as_view())
]