from django.contrib import admin

from .models import Student
from .models import Teacher
from .models import Level_One

admin.site.register(Teacher)
admin.site.register(Student)
admin.site.register(Level_One)

# Register your models here.
