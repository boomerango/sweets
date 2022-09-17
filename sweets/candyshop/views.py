from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.http import Http404

from candyshop.models import Departments, SweetProducts, SweetsList, SweetOrders
from candyshop.serializers import DepartmentSerializer,SweetProductSerializer,SweetListSerializer,SweetOrdersSerializer

from django.core.files.storage import default_storage

# Create your views here.

@csrf_exempt
def departmentApi(request,id=0):
    if request.method=='GET':
        departments = Departments.objects.all()
        departments_serializer=DepartmentSerializer(departments,many=True)
        return JsonResponse(departments_serializer.data,safe=False)
    elif request.method=='POST':
        department_data=JSONParser().parse(request)
        departments_serializer=DepartmentSerializer(data=department_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        department_data=JSONParser().parse(request)
        department=Departments.objects.get(DepartmentId=department_data['DepartmentId'])
        departments_serializer=DepartmentSerializer(department,data=department_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        department=Departments.objects.get(DepartmentId=id)
        department.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def sweetProductsApi(request, id=0):
    if request.method =='GET':
        sweetProducts = SweetProducts.objects.all()
        sweetProducts_serializer = SweetProductSerializer(sweetProducts, many=True)
        return JsonResponse(sweetProducts_serializer.data, safe=False)
    elif request.method == 'POST':
        sweet_product_data = JSONParser().parse(request)
        sweet_products_serializer = SweetProductSerializer(data=sweet_product_data)
        if sweet_products_serializer.is_valid():
            sweet_products_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        sweet_product_data = JSONParser().parse(request)
        sweet_product = SweetProducts.objects.get(ProductID=sweet_product_data['ProductID'])
        sweet_products_serializer = SweetProductSerializer(sweet_product, data=sweet_product_data)
        if sweet_products_serializer.is_valid():
            sweet_products_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        sweets = SweetProducts.objects.get(ProductID=id)
        sweets.delete()
        return JsonResponse("Deleted Successfully", safe=False)

@csrf_exempt
def sweetListApi(request,id=0):
    if request.method =='GET':
        sweetList = SweetsList.objects.all()
        sweet_list_serializer = SweetListSerializer(sweetList, many=True)
        return JsonResponse(sweet_list_serializer.data, safe=False)
    elif request.method == 'POST':
        sweet_list_data = JSONParser().parse(request)
        sweet_list_serializer = SweetListSerializer(data=sweet_list_data)
        if sweet_list_serializer.is_valid():
            sweet_list_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PATCH':
        sweet_list_data = JSONParser().parse(request)
        sweet_list = SweetsList.objects.get(IdOfPiece=sweet_list_data['IdOfPiece'])
        sweet_list_serializer = SweetListSerializer(sweet_list, data=sweet_list_data)
        if sweet_list_serializer.is_valid():
            sweet_list_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        sweets = SweetsList.objects.get(IdOfPiece=id)
        sweets.delete()
        return JsonResponse("Deleted Successfully", safe=False)

@csrf_exempt
def sweetOrdersApi(request, id=0):
    if request.method =='GET':
        try:
            sweetOrders = SweetOrders.objects.all()
            sweet_order_serializer = SweetOrdersSerializer(sweetOrders, many=True)
        except 'ImproperlyConfigured':
            raise Http404("orders does not exist")
        return JsonResponse(sweet_order_serializer.data, safe=False)
    elif request.method == 'POST':
        sweet_order_data = JSONParser().parse(request)
        sweet_order_serializer = SweetOrdersSerializer(data=sweet_order_data)
        if sweet_order_serializer.is_valid():
            sweet_order_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PATCH':
        sweet_order_data = JSONParser().parse(request)
        sweet_order = SweetOrders.objects.get(OrderId=sweet_order_data['OrderId'])
        sweet_order_serializer = SweetOrdersSerializer(sweet_order, data=sweet_order_data)
        if sweet_order_serializer.is_valid():
            sweet_order_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        sweets = SweetOrders.objects.get(OrderId=id)
        sweets.delete()
        return JsonResponse("Deleted Successfully", safe=False)

@csrf_exempt
def SaveFile(request):
    try:
        file=request.FILES['file']
        file_name=default_storage.save(file.name,file)
        return JsonResponse(file_name,safe=False)
    except Exception as e:
        raise Http404("orders does not exist: ", e)