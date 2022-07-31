from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import generics,status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserSerializer
from .models import Profile
# Create your views here.
User = get_user_model()


class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get(self,*args,**kwargs):
        pk = kwargs.get('pk')
        if pk == 9999999999:
            kwargs['pk'] = self.request.user.id
        return self.retrieve(self,*args,**kwargs)


@api_view(['GET'])
def get_user_data(request):
    us = request.user
    serializer = UserSerializer(us)
    return Response(status=200,data=serializer.data)


@api_view(['GET'])
def is_admin_user(request):
    if request.user.is_superuser:
        return Response(status=200)
    return Response(status=403)