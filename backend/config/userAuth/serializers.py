from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
from .models import Profile
from products.models import Cart
from products.serializers import CartSerializer
User = get_user_model()


class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ('name','surname','country','city','street','buildingNumber','houseNumber','post_code')


class UserSerializer(ModelSerializer):
    profile = UserProfileSerializer()
    class Meta:
        model = User
        fields = ('id','username','email','profile')

    def update(self, instance, validated_data):
        data = validated_data.get('profile')
        user_profile = Profile.objects.filter(pk=instance.profile.id)
        user_profile.update(name = data['name'],
                            surname = data['surname'],
                            country = data['country'],
                            city = data['city'],
                            street = data['street'],
                            buildingNumber = data.get('buildingNumber',0),
                            houseNumber = data.get('houseNumber',0),
                            post_code = data['post_code'],
                            )
        return instance