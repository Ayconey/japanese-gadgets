from django.test import TestCase
from django.contrib.auth import get_user_model
from products.models import CartItem,Product
# Create your tests here.

User = get_user_model()


class UserTestCast(TestCase):

    def setUp(self):
        user_1 = User(username='testuser',email='testuser@gmail.com')
        user_1.is_staff = True
        user_1.is_superuser = True
        user_1.set_password('password_123')
        user_1.save()
        self.user_1 = user_1

    def test_user_exists(self):
        self.assertEqual(User.objects.count(),1)

    def test_user_password(self):
        self.assertTrue(self.user_1.check_password('password_123'))

    # user.cart tests

    def test_cart_default(self):
        self.assertTrue(self.user_1.cart is not None)
        items = self.user_1.cart.items.all()
        self.assertFalse(items.exists())

