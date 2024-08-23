from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Farmer(models.Model):
    name = models.CharField(max_length = 50)
    phone = models.CharField(max_length = 20)
    date_of_birth = models.DateField(verbose_name = "Date of Birth")
    nationality = models.CharField(max_length = 30)
    username = models.ForeignKey(User, on_delete = models.CASCADE)
    created_on = models.DateTimeField(auto_now_add = True)
    updated_on = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Farmer"
        verbose_name_plural = "Farmers"
        db_table = "Farmers"


class Client(models.Model):
    name = models.CharField(max_length = 50)
    phone = models.CharField(max_length = 20)
    address = models.CharField(max_length = 200)
    username = models.ForeignKey(User, on_delete = models.CASCADE)
    created_on = models.DateTimeField(auto_now_add = True)
    updated_on = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Client"
        verbose_name_plural = "Clients"
        db_table = "Clients"


class Product(models.Model):
    name = models.CharField(max_length = 50)
    unit_price = models.FloatField()
    quantity = models.PositiveIntegerField()
    CATEGORY_CHOICES = (
        ('Fruits', 'Fruits'),
        ('Vegetables', 'Vegetables'),
        ('Juices', 'Juices'),
        ('Dried', 'Dried'),
    )

    category = models.CharField(choices = CATEGORY_CHOICES, max_length = 20)
    description = models.CharField(max_length = 200)
    image = models.ImageField(upload_to = 'static/', blank= True)
    created_on = models.DateTimeField(auto_now_add = True)
    updated_on = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"
        db_table = "Products"


class Order(models.Model):
    client = models.ForeignKey(Client, on_delete = models.CASCADE)
    date_order = models.DateField(verbose_name = "Date order", auto_now_add= True)
    PAYMENT_CHOICES = (
        ('Visa Card', 'Visa Card'),
        ('Pay Pal', 'Pay Pal'),
        ('Credit Card', 'Credit Card'),
    )

    type_of_payment = models.CharField(choices = PAYMENT_CHOICES, max_length = 12, verbose_name = "Type of payment")
    created_on = models.DateTimeField(auto_now_add = True)
    updated_on = models.DateTimeField(auto_now = True)

    def __str__(self):
        return f"order id: {self.id} by client {self.client.name}"
    
    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"
        db_table = "Orders"


class DetailsOrder(models.Model):
    order = models.ForeignKey(Order, on_delete = models.CASCADE)
    product = models.ForeignKey(Product, on_delete = models.CASCADE)
    quantity = models.PositiveIntegerField()
    created_on = models.DateTimeField(auto_now_add = True)
    updated_on = models.DateTimeField(auto_now = True)

    def __str__(self):
        return f"details of {self.order}"
    
    class Meta:
        verbose_name = "Detail order"
        verbose_name_plural = "Details orders"
        db_table = "Details orders"