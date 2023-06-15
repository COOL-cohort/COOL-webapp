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
    path('return_measure/', return_measures, name='return the measure'),
    path('return_function/', return_functions, name='return the function'),
    path('return_groupby/', return_groupby, name='return the groupby'),
    path('return_fields/', return_fields, name='return the fields'),
    path('return_seg_field_detail/', return_seg_field_detail, name='return the contents of the field'),
    path('return_field_detail/<int:set_id>/<int:f_id>/', return_field_detail, name='return the contents of the field'),
    path('return_cohorts/', return_cohorts, name='return the cohorts'),
    path('save_query_page/<int:set_id>/', save_query_page, name='save the query page'),
    path('load_query_page/<int:set_id>/<int:query_id>/', load_query_page, name='load the query page'),

    path('dataset-show/', login_required(DatasetList.as_view()), name='Show datasets'),
    path('dataset-remove/<int:set_id>/', DatasetRemove.as_view(), name="remove a dataset"),
    path('dataset/<int:set_id>/', DatasetDetail.as_view(), name="illustrate a dataset"),
    path('dataset/<int:set_id>/cohort-create/', CohortCreateInDataset.as_view(), name="create cohort"),
    path('dataset/<int:set_id>/cohort-analysis/', CohortAnalysis.as_view(), name="cohort analysis"),

    path('cohort-show/', login_required(CohortList.as_view()), name='Show cohorts'),

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
