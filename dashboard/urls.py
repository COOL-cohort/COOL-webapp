from django.conf.urls                   import url, include
from django.contrib.auth.decorators     import login_required
from django.shortcuts                   import redirect


from . import views

index_redirect = lambda request: redirect( '/en/dashboard' )

urlpatterns = [
	url(r'^$',						index_redirect , name='index' ),
	url(r'^register/$', 			views.Register.as_view(), name='register'),
	url(r'^api/v1',					login_required(views.Api.as_view()), name='api'),
	url(r'^dashboard',				login_required(views.Dashboard.as_view()), name='dashboard'),
	url(r'^upload',					login_required(views.Upload.as_view()), name='Upload'),
	url(r'^column_list',			login_required(views.Column_list.as_view()), name='Column list'),
	url(r'^database',				login_required(views.Database.as_view()), name='Database'),
	url(r'^figure_design',			login_required(views.Figure_design.as_view()), name='figure_design'),
	url(r'^figure_detail', 			login_required(views.Figure_detail.as_view()), name='figure_detail'),
	url(r'^figure',					login_required(views.Figure.as_view()), name='Figure'),
	url(r'^retention/advance', 		login_required(views.Retention.as_view()), name='retention'),

	url(r'^',						include('django.contrib.auth.urls') ),


	# url(r'^.*/$',					index_redirect, name='index'),

]
