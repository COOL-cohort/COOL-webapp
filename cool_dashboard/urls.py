"""cool_dashboard URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.contrib.auth.decorators import login_required

from .views import *

urlpatterns = [
    # default page
    path('', login_required(dashboard.Dashboard.as_view()), name="Dashboard"),
    path('dashboard/', login_required(dashboard.Dashboard.as_view()), name="Dashboard"),
    path('upload/', login_required(Upload.as_view()), name='Upload'),
    path('return_columns/', analyze_columns, name='return the columns'),
    path('dataset/<int:set_id>', DatasetDetail.as_view(), name="illustrate a dataset"),
    path('dataset-show/', login_required(DatasetShow.as_view()), name='Show datasets'),
    path('error-500/', test_error_500, name='Test internal system error'),
    path('request/', test_request, name='test request'),
    path('test/', test, name='test function'),

    # API for the pratical system
    path('login/', login.webLogin, name="Login"),
    path('register/', register.Register.as_view(), name="Login"),
    path('logout/', login.webLogout, name="Logout"),
    path('accounts/login/', login.webLogin, name="Login"),

    path('admin/', admin.site.urls),
]
