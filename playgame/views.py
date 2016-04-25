from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import TemplateView
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.shortcuts import redirect
from django.http import HttpResponse
from django.http import JsonResponse
from .forms import SubmitScores


def logout_view(request):
    logout(request)


# def playgame(request):
# return render(request, "base.html") #extra

@login_required(login_url="login/")
def home(request):
    return render(request, "home.html")


@login_required(login_url="login/")
@csrf_exempt
def play(request):
    if request.method == 'POST':
        form = SubmitScores(request.POST)
        if form.is_valid():
            response_data = {}
            response_data['msg'] = 'Post was successful.'
            print("Post success.")
            return JsonResponse(response_data)
        else:
            response_data = {}
            response_data['msg'] = 'Post was unsuccessful. Invalid form.'
            return JsonResponse(response_data)

    else:
        form = SubmitScores()
        return render(request, 'play.html', {'form': form})


@login_required(login_url="login/")
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
