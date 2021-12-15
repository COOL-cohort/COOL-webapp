"""cool_dashboard URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin

from django.conf.urls.i18n              import i18n_patterns
from django.views.i18n                  import javascript_catalog
from django.contrib.auth.decorators     import login_required
from dashboard import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    # url(r'^', include('dashboard.urls')),
    url(r'^', include('favicon.urls')),
    url(r'^api/v1',                 login_required(views.Api.as_view()), name='api'),
    url(r'^dim/v1',                 login_required(views.Dim.as_view()), name='dim'),
]

urlpatterns += i18n_patterns(
    url(r'^', include('dashboard.urls')),
)

js_info_dict = {}

urlpatterns += i18n_patterns(
    url(r'^jsi18n/$', javascript_catalog, name='javascript-catalog'),
)