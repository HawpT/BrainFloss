from django.contrib import admin

from .models import Student
from .models import Teacher

admin.site.register(Teacher)
admin.site.register(Student)

# Register your models here.
