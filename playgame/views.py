from django.core import serializers
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import TemplateView
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.shortcuts import redirect
from django.http import HttpResponse
from django.http import JsonResponse
from .forms import Level_One
from .forms import SubmitScores
from .forms import Student


def logout_view(request):
    logout(request)


# def playgame(request):
# return render(request, "base.html") #extra


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

            student = form.save(commit=False)
            student.student_id = Student.objects.get(user=request.user).student_id
            student.save()
            return JsonResponse(response_data)
        else:
            response_data = {}
            response_data['msg'] = 'Post was unsuccessful. Invalid form.'
            return JsonResponse(response_data)

    else:
        form = SubmitScores()
        return render(request, 'play.html', {'form': form})


@login_required(login_url="login/")
@csrf_exempt
def stats(request):
    if request.method == 'GET':
        s = Student.objects.filter(user=request.user)
        a = Level_One.objects.all()
        return render(request, "stats.html", {'studentform': s, 'scoreform': a})
    elif request.method == 'POST':

        return JsonResponse()


@login_required(login_url="login/")
def teacherdash(request):
    return render(request, "teacherdash.html")


@login_required(login_url="login/")
@csrf_exempt
def teacherstats(request):
    s = Student.objects.all()
    a = Level_One.objects.all()
    return render(request, "teacherstats.html", {'studentform': s, 'scoreform': a})


class IndexView(TemplateView):
    template_name = 'home.html'


@login_required(login_url="login/")
@csrf_exempt
def ReturnData(request):
    if request.method == 'GET':
        json = request.GET
        s = Student.objects.filter(first_name=json['fname']).filter(last_name=json['lname']).values('student_id')
        a = Level_One.objects.filter(student_id__in=s)
        a_serialized = serializers.serialize('json',a, fields=('op1', 'op2', 'student_answer', 'problem_type', 'problem_level', 'student_id'))
        return JsonResponse({'studentdata': a_serialized}, safe=False)

