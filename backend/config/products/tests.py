from django.test import TestCase
from django.contrib.auth import get_user_model
from products.models import Product,CartItem
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
# Create your tests here.

User = get_user_model()


class ProductTestCast(TestCase):
    def setUp(self) -> None:
        self.p1 = Product(title='test',body='test',price=10,count=10)
        self.u1 = User.objects.create(username='test', email='test@gmail.com', password='test')
        self.token = Token.objects.create(user=self.u1)
        self.u1.save()
        self.p1.save()
        self.token.save()

    def test_product_exist(self):
        self.assertTrue(self.p1)

    def test_adding_cart_item(self):
        ci1 = CartItem(product=self.p1,quantity=10)
        ci1.save()
        self.assertEqual(Product.objects.count(),1)

    def test_check_data_response(self):
        headers = {
            'content-type': 'application/json',
            'Authorization': f'Bearer {self.token}'
        }
        print(headers)
        data = {
                'headers':headers,
                "title": "test",
                "body": "test",
                "price": 5,
                "count": 5,
                "image": "",
                }

        response = self.client.post('/api/products/',data,headers=headers,follow=True)
        print(response.data)
        self.assertEqual(response.status_code,200)