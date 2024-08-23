from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_superuser', 'is_staff', 'is_active']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.is_active=False
        user.save()
        return user
    

class FarmerSerializer(serializers.ModelSerializer):
    verification_token = serializers.SerializerMethodField(read_only=True)
    username = UserSerializer()

    class Meta:
        model = Farmer
        fields = ['id', 'username', 'name', 'phone', 'date_of_birth', 'nationality', 'verification_token']

    def create(self, validated_data):
        user_data = validated_data.pop('username')
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user.is_staff = True
            user = user_serializer.save()
            farmer = Farmer.objects.create(username=user, **validated_data)
            return farmer
        
    def get_verification_token(self, obj):
        return default_token_generator.make_token(obj.username)
    

class ClientSerializer(serializers.ModelSerializer):
    verification_token = serializers.SerializerMethodField(read_only=True)
    username = UserSerializer()

    class Meta:
        model = Client
        fields = ['id', 'username', 'name', 'phone', 'address', 'verification_token']

    def create(self, validated_data):
        user_data = validated_data.pop('username')
        user_serializer = UserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)  # Raise an exception if the UserSerializer is not valid
        user = user_serializer.save()
        client = Client.objects.create(username=user, **validated_data)
        return client
        
    def get_verification_token(self, obj):
        return default_token_generator.make_token(obj.username)
    

class ProductSerializer(serializers.ModelSerializer):
    # image = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    # def get_image(self, obj):
    #     return obj.image.name if obj.image else None

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

    class Meta:
        model = Product
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'client', 'date_order', 'type_of_payment']


class DetailsOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetailsOrder
        fields = ['id', 'order', 'product', 'quantity']


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    uidb64 = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField()
    re_new_password = serializers.CharField()