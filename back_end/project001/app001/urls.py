from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(),name='token_refresh'),
    path('api/clients/', client_registration, name = 'client_api'),
    path('api/clients/<int:pk>/',client_detail, name = 'client_detail'),
    path('verify-email/<str:uidb64>/<str:token>/', verify_email, name='verify_email'),
    path('api/users/', user_registration, name = 'user_registration'),
    path('api/users/<int:pk>/', get_user, name = 'user_detail'),
    path('api/farmers/', farmer_register, name = 'farmer_register'),
    path('api/products/', get_products, name = 'product_api'),
    path('api/products/<int:pk>/',product_details, name = 'product_details'),
    path('api/client_orders/<int:pk>/', client_orders, name = 'client_orders'),
    path('api/client_orders/<int:pk>/<int:pk2>/', order_details, name = 'orders_details'),
    path('api/special_delete_order/<int:pk>/<int:pk2>/',special_delete_order, name='special_delete_order'),
    path('api/orders/', get_orders, name= 'get_orders'),
    path('api/orders/<int:pk>/', get_special_order, name= 'get_special_order'),
    path('password/reset/', PasswordResetRequestView.as_view(), name='password_reset'),
    path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]