from django.urls import path
from .views import OrderListCreateView,UserOrdersView

urlpatterns = [
    path('',OrderListCreateView.as_view()),
    path('self/',UserOrdersView.as_view()),
]