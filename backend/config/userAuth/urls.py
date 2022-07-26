from django.urls import path
from .views import UserListView,UserDetailView,get_user_data

urlpatterns = [
    path('',UserListView.as_view()),
    path('<int:pk>/',UserDetailView.as_view()),
    path('self/',get_user_data)
]