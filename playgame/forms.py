from django.contrib.auth.forms import AuthenticationForm
from django.forms import ModelForm
from models import *
from django import forms


# If you don't do this you cannot use Bootstrap CSS
class LoginForm(AuthenticationForm):
    username = forms.CharField(
        label="Username",
        max_length=30,
        widget=forms.TextInput(attrs={'class': 'form-control', 'name': 'username'})
    )
    password = forms.CharField(
        label="Password",
        max_length=30,
        widget=forms.PasswordInput(attrs={'class': 'form-control', 'name': 'password'})
    )


class SubmitScoresLevel1(ModelForm):
    class Meta:
        model = Level_One
        fields = ['operand1', 'operand2', 'student_answer', 'problem_type']


