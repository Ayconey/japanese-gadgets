from django.urls import path,include


urlpatterns = [
    path('products/',include('products.urls')),
    path('users/',include('userAuth.urls')),
    path('orders/',include('orders.urls'))
]