from rest_framework import serializers
from candyshop.models import Departments,SweetProducts, SweetsList,SweetOrders

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Departments
        fields=('DepartmentId','DepartmentName')

class SweetProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = SweetProducts
        fields = ('ProductID','ProductName', 'ProductType','ProductPhotoLink',
                   'ProductWeight','ProductPortions','ProductPrice','ProductDescription')

class SweetListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SweetsList
        fields=('IdOfPiece', 'DateOfManufacture','DateOfExpiration','IDOfSweet')

class SweetOrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = SweetProducts
        fields = ('OrderId','Customer','ListOfOrders','NumberOfSweets','IDOfSweet',
                'OrderStatus')