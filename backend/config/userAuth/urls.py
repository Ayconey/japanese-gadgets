from django.urls import path
from .views import UserListView,UserDetailView,get_user_data,is_admin_user

urlpatterns = [
    path('',UserListView.as_view()),
    path('<int:pk>/',UserDetailView.as_view()),
    path('self/',get_user_data),
    path('is_admin/',is_admin_user),
]