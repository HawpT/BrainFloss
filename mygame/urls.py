"""mygame URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
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
#mygame url
from django.conf.urls import include, url
from django.contrib import admin

from django.contrib.auth import views
from playgame.forms import LoginForm

urlpatterns = [
    url(r'^playgame/', include('playgame.urls')),
    url(r'^home/', include('playgame.urls')),
    url(r'^stats/', include('playgame.urls')),
    
    url(r'^login/$', views.login, {'template_name': 'login.html', 'authentication_form': LoginForm}),
   url(r'^logout/$', views.logout, {'next_page': '/login'}),
   url(r'^admin/', admin.site.urls),
    url(r'', include('playgame.urls')),
    
    
]
