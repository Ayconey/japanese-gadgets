from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserSerializer
# Create your views here.

# @api_view(['POST'])
# def user_register_view(request):
#     if request.method == "POST":
#         try:
#             username = request.data['username']
#             password1 = request.data['password1']
#             password2 = request.data['password2']
#         except:
#             return Response(status=status.HTTP_400_BAD_REQUEST,data={"message_log" : "some of the fields are not provided" })
#
#     return Response(status=200,data={'message':'ok'})