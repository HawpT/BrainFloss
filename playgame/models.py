# from __future__ import unicode_literals

from django.db import models
from django.conf import settings


# Create your models here.  models are tables
class Level_One(models.Model):
    op1 = models.IntegerField(blank=False, null=False, default=0)
    op2 = models.IntegerField(blank=True, null=True, default=0)
    student_answer = models.IntegerField(blank=False, null=False, default=0)
    problem_type = models.IntegerField(blank=False, null=False, default=1)
    problem_level = models.IntegerField(blank=False, null=False, default=1)
    student_id = models.IntegerField(blank=False, null=False, default=0)

    def __str__(self):
        stu_ref = Student.objects.get(student_id=self.student_id)  # student who answered this problem
        if self.problem_type == 1:
            return "L" + str(self.problem_level) + " Add Problem: " + str(self.op1) \
                   + " + " + str(self.op2) + " = " + str(self.student_answer) + \
                   "  @user: " + str(stu_ref.first_name) + " " + str(stu_ref.last_name)
        elif self.problem_type == 2:
            return "L" + str(self.problem_level) + " Sub Problem: " + str(self.op1) \
                   + " - " + str(self.op2) + " = " + str(self.student_answer) + \
                   "  @user: " + str(stu_ref.first_name) + " " + str(stu_ref.last_name)
        elif self.problem_type == 3:
            return "L" + str(self.problem_level) + " Num Problem: " + str(self.op1) \
                   + " is in the " + str(self.student_answer) + "'s place." + \
                   "  @user: " + str(stu_ref.first_name) + " " + str(stu_ref.last_name)

    def score(self):
        if int(self.problem_type) == 1:
            if (int(self.op1) + int(self.op2)) == int(self.student_answer):
                return 1
            else:
                return 0
        elif int(self.problem_type) == 2:
            if (int(self.op1) - int(self.op2)) == int(self.student_answer):
                return 1
            else:
                return 0
        elif int(self.problem_type) == 3:
            return "Level " + str(self.problem_level) + " Digits Problem: " + str(self.op1) \
                   + " is in the " + str(self.student_answer) + "'s place."


class Student(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    student_id = models.IntegerField(blank=False, null=True)

    def __str__(self):
        return " Name: " + str(self.first_name) + " " + str(self.last_name) + " ID: " + str(self.student_id)

    def get_student_fname(self):
        return self.first_name

    def get_student_lname(self):
        return self.last_name

    def get_student_id(self):
        return self.student_id


class Teacher(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    teach_id = models.IntegerField(blank=False, null=True)

    def teach_fname(self):
        return self.first_name

    def teach_lname(self):
        return self.last_name

    def t_id(self):
        return self.teach_id
