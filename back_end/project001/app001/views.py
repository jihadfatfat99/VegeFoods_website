from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.views import APIView
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth import get_user_model
from django.shortcuts import redirect
from .serializers import *
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        if user.is_superuser and user.is_staff and user.is_active:
            token['type'] = "admin"
            token['id'] = user.id
        elif not user.is_superuser and user.is_staff and user.is_active:
            token['type'] = "farmer"
            farmer = Farmer.objects.get(username= user)
            token['id'] = farmer.id
        elif not user.is_superuser and not user.is_staff and user.is_active:
            token['type'] = 'client'
            client = Client.objects.get(username= user)
            token['id'] = client.id
        # token['username'] = user.username
        # client = Client.objects.get(username=user)
        # token['client'] = client.id
        # ...
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

def verify_email(request, uidb64, token):
    try:
        # uid = urlsafe_base64_decode(uidb64).decode()
        uid = force_str(urlsafe_base64_decode(uidb64).decode())
        User = get_user_model()
        user = User.objects.get(pk=uid)
        if default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return redirect(to='http://localhost:3000/login')
        else:
            return Response(data='message Invalid token', status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response(data='message Invalid user', status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
@api_view(['GET', 'POST'])  # Allow both GET and POST requests
def client_registration(request):
    if request.method == 'GET':
        queryset = Client.objects.all()
        serializer = ClientSerializer(queryset, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ClientSerializer(data=request.data)

        if serializer.is_valid():
            client = serializer.save()
            current_site = get_current_site(request)
            uid = urlsafe_base64_encode(force_bytes(client.username.pk))
            token = default_token_generator.make_token(client.username)
            verification_url = reverse('verify_email', args=[uid, token])
            verification_link = f'http://{current_site.domain}{verification_url}'
            subject = "Verify Your Account"
            message = render_to_string('verification_email.html', {
                'client': client,
                'verification_link': verification_link,
            })
            email = EmailMessage(subject=subject, body=message, to=[client.username.email])
            email.send()
            # send_mail(subject, message, 'your-email@example.com', [client.username.email])
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'PUT', 'DELETE'])  # Allow GET, PUT, and DELETE requests
@permission_classes([IsAuthenticated])
def client_detail(request, pk):
    try:
        client = Client.objects.get(id = pk)
    except Client.DoesNotExist:
        return Response({"error": "Client not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ClientSerializer(client)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ClientSerializer(client, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        client.delete()
        return Response({"message": "Client deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_registration(request):
    if request.method == "GET":
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many = True)
        return Response(serializer.data)
    
    else:
        serializer = UserSerializer(data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def get_user(request, pk):
    try:
        user = User.objects.get(id = pk)
    except User.DoesNotExist:
        return Response({"message": "User is not found!!"}, status= status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    elif request.method == "PUT":
        serializer = UserSerializer(user, data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        user.delete()
        return Response({"message": "User deleted successfully!!"}, status= status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def farmer_register(request):
    if request.method == "GET":
        queryset = Farmer.objects.all()
        serializer = FarmerSerializer(queryset, many = True)
        return Response(serializer.data)
    
    else:
        serializer = FarmerSerializer(data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def get_products(request):
    if request.method == "GET":
        queryset = Product.objects.all()
        serializer = ProductSerializer(queryset, many = True, context= {'request': request})
        return Response(serializer.data)
    elif request.method == "POST":
        product = ProductSerializer(data= request.data, context= {'request': request})
        if product.is_valid():
            product.save()
            return Response(product.data, status= status.HTTP_201_CREATED)
        return Response(product.errors, status= status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'PUT', 'DELETE'])
def product_details(request, pk):
    try:
        product = Product.objects.get(id=pk)
    except Product.DoesNotExist:
        return Response({"message": "product is not found!!"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = ProductSerializer(product, context={'request': request})
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = ProductSerializer(product, data=request.data, context={'request': request}, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        product.delete()
        return Response({"message": "product deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def client_orders(request, pk):
    try:
        client = Client.objects.get(id = pk)
        details_orders = DetailsOrder.objects.filter(order__client=client)
    except Client.DoesNotExist:
        return Response({"message": "client does not exist!"}, status= status.HTTP_400_BAD_REQUEST)
    
    if request.method == "GET":
        serialized_details_orders = []
        for detail_order in details_orders:
            detail_data = DetailsOrderSerializer(detail_order, context={'request': request}).data
            product_data = detail_order.product  # Assuming product is a ForeignKey to Product model
            detail_data['product'] = ProductSerializer(product_data, context={'request': request}).data
            serialized_details_orders.append(detail_data)
        
        return Response(serialized_details_orders)
    
    elif request.method == "POST":
        serializer = DetailsOrderSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            detail_order = serializer.save()  # Save the detail order first

            # Now update the associated product's quantity
            product = detail_order.product
            if product.quantity >= detail_order.quantity:
                product.quantity -= detail_order.quantity
                product.save()  # Save the updated product quantity

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                detail_order.delete()  # Delete the detail order if product quantity is insufficient
                return Response({"message": "Insufficient product quantity"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def order_details(request, pk, pk2):
    try:
        client = Client.objects.get(id = pk)
        order = DetailsOrder.objects.get(id = pk2)
    except DetailsOrder.DoesNotExist:
        return Response({"message": "error in data request!!"}, status= status.HTTP_400_BAD_REQUEST)
    
    if request.method == "GET":
        serializer = DetailsOrderSerializer(order, context= {'request': request})
        return Response(serializer.data)
    
    elif request.method == "PUT":
        serializer = DetailsOrderSerializer(order, data= request.data, context= {'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "DELETE":
        order.delete()
        return Response({"message": "order deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
    

@api_view(['GET', 'DELETE'])
@permission_classes([IsAuthenticated])
def special_delete_order(request, pk, pk2):
    try:
        client = Client.objects.get(id= pk)
        order = DetailsOrder.objects.get(id= pk2)
    except DetailsOrder.DoesNotExist:
        return Response({"message": "error in data request!!"}, status= status.HTTP_400_BAD_REQUEST)
    
    if request.method == "GET":
        serializer = DetailsOrderSerializer(order, context= {'request': request})
        return Response(serializer.data)
    
    elif request.method == "DELETE":
        product = order.product
        product.quantity += order.quantity  # Increment the product's quantity
        product.save()  # Save the updated product quantity
        
        order.delete()
        return Response({"message": "order deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_orders(request):
    if request.method == "GET":
        queryset = Order.objects.all()
        serializer = OrderSerializer(queryset, many = True, context= {'request': request})
        return Response(serializer.data)
    elif request.method == "POST":
        order = OrderSerializer(data= request.data, context= {'request': request})
        if order.is_valid():
            order.save()
            return Response(order.data, status= status.HTTP_201_CREATED)
        print(order.errors)
        return Response(order.errors, status= status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def get_special_order(request, pk):
    try:
        order = Order.objects.get(id= pk)
    except Order.DoesNotExist:
        return Response({"message": "order is not found!!"}, status= status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = OrderSerializer(order, context= {'request': request})
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = OrderSerializer(order, data=request.data, context= {'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors.message)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        order.delete()
        return Response({"message": "order deleted successfully!"}, status= status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetRequestView(APIView):
    def post(self, request, format=None):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.filter(email=email).first()
            if user:
                token = default_token_generator.make_token(user)
                uid = urlsafe_base64_encode(force_bytes(user.pk))
                reset_link = f"http://localhost:3000/reset_password/confirm/{uid}/{token}/"
                subject = "Reset password"
                message = render_to_string("reset_password.html", {
                    'username': user.username,
                    'reset_link': reset_link,
                })
                email = EmailMessage(subject= subject, body=message, to=[user.email])
                email.send()
                return Response({"message": "Password reset email sent"}, status=status.HTTP_200_OK)
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

class PasswordResetConfirmView(APIView):
    def post(self, request, format=None):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            uid = serializer.validated_data['uidb64']
            uid = urlsafe_base64_decode(uid).decode('utf-8')
            user = User.objects.get(pk=uid)
            if user and default_token_generator.check_token(user, serializer.validated_data['token']):
                new_password = serializer.validated_data['new_password']
                user.set_password(new_password)
                user.save()
                return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)
        return Response({"message": "Invalid token or user"}, status=status.HTTP_400_BAD_REQUEST)
