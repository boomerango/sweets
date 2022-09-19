from django.db import models

DEFAULT_CHAR_LENGTH = 500
# Create your models here.
class Departments(models.Model):
    DepartmentId = models.AutoField(primary_key=True)
    DepartmentName = models.CharField(max_length=DEFAULT_CHAR_LENGTH)

class SweetProducts(models.Model):
    ProductID = models.AutoField(primary_key = True)
    ProductName = models.CharField(max_length=DEFAULT_CHAR_LENGTH)
    ProductType = models.CharField(max_length=DEFAULT_CHAR_LENGTH)
    ProductPhotoLink = models.CharField(max_length=DEFAULT_CHAR_LENGTH)
    ProductWeight = models.DecimalField(max_digits=12,decimal_places=2)
    ProductPortions = models.IntegerField(max_length=24)
    ProductPrice = models.DecimalField(max_digits=12,decimal_places=2)
    ProductDescription = models.CharField(max_length= 2048)

class SweetsList(models.Model):
    IdOfPiece = models.AutoField(primary_key = True)
    DateOfManufacture = models.DateField(auto_now=True)
    DateOfExpiration = models.DateField()
    IDOfSweet = models.ForeignKey(SweetProducts, on_delete=models.CASCADE)

class SweetOrders(models.Model):
    OrderId = models.AutoField(primary_key = True)
    Customer = models.CharField(max_length=DEFAULT_CHAR_LENGTH)
    ListOfOrders = models.ForeignKey(SweetsList, on_delete=models.DO_NOTHING)
    NumberOfSweets = models.CharField(max_length=DEFAULT_CHAR_LENGTH)
    IDOfSweet = models.ForeignKey(SweetProducts,on_delete=models.CASCADE)
    OrderStatus = models.CharField(max_length=DEFAULT_CHAR_LENGTH)
    Price = models.DecimalField(max_digits=12,decimal_places=2,default = None)
