from django.conf.urls import url, include
from . import views
from .views import IndexView
from django.contrib import admin
#playgame url


urlpatterns = [
	url(r'^admin/', include(admin.site.urls)),
	#url(r'^$', views.index, name = 'indexed'), #extra
	#url(r'^/', include('mygame.urls')), #extra
	
	url(r'^$', IndexView.as_view(), name='index'),
	url(r'^$', views.home, name='home'),
	url(r'^$', views.stats, name='stats'),
	#url(r'^$', views.game, name='base'), #extra


]
