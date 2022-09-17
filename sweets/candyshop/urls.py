from django.urls import re_path
from candyshop import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    re_path(r'^department$',views.departmentApi),
    re_path(r'^department/([0-9]+)$',views.departmentApi),
    re_path(r'^products$',views.sweetProductsApi),
    re_path(r'^products/([0-9]+)$',views.sweetProductsApi),
    re_path(r'^list$', views.sweetListApi),
    re_path(r'^tlist/([0-9]+)$', views.sweetListApi),
    re_path(r'^orders$', views.sweetOrdersApi),
    re_path(r'^orders/([0-9]+)$', views.sweetOrdersApi),
    re_path(r'^product/savefile', views.SaveFile)
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)