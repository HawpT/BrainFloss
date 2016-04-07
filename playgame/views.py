from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.shortcuts import redirect
from django.http import HttpResponse

def logout_view(request):
	logout(request)
	
#def playgame(request):
	#return render(request, "base.html") #extra


@login_required(login_url="login/")
def home(request):
	return render(request, "home.html")

def play(request):
	return render(request, "play.html")

def stats(request):
	return render(request, "stats.html")

@login_required(login_url="login/")
def teacherdash(request):
	return render(request, "teacherdash.html")

@login_required(login_url="login/")
def teacherstats(request):
	return render(request, "teacherstats.html")

class IndexView(TemplateView):
	template_name = 'home.html'
	


	
