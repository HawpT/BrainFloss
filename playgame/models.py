#from __future__ import unicode_literals

from django.db import models
from django.conf import settings
# Create your models here.  models are tables


class Score(models.Model):
    fscore = models.IntegerField()

    def __str__ (self):
        return self.fscore

    def get_final_score(self):
        return "Your Final score is :" + self.fscore[1]


class Level_One(models.Model):
    operand1 = models.IntegerField(blank=True, null=False)
    operand2 = models.IntegerField(blank=True, null=True)
    student_answer = models.IntegerField(blank=True, null=False)
    problem_type = models.IntegerField(blank=True, null=False)

    def __str__(self):
        if self.problem_type[0] == "1":
            return "Level One Addition Problem: " + self.operand1[0] + "+" + self.operand2[0] + "=" + self.student_answer[0]
        elif self.problem_type[0] == "2":
            return "Level One Addition Problem: " + self.operand1[0] + "-" + self.operand2[0] + "=" + self.student_answer[0]
        elif self.problem_type[0] == "3":
            return "Level One Addition Problem: " + self.operand1[0] + " is in the " + self.student_answer[0] + "'s place."

    def score(self):
        if self.problem_type[0] == "1":
            if (int(self.operand1[0]) + int(self.operand2[0])) == int(self.student_answer[0]):
                return 1
            else:
                return 0
        elif self.problem_type[0] == "2":
            if (int(self.operand1[0]) - int(self.operand2[0])) == int(self.student_answer[0]):
                return 1
            else:
                return 0
        elif self.problem_type[0] == "3":
            return "Level One Digits Problem: " + self.operand1[0] + " is in the " + self.student_answer[0] + "'s place."



class Level_Two(models.Model):
    add_score2 = models.IntegerField(blank=True, null=True)
    sub_score2 = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return "Add Score:" + self.add_score2[1] + "Sub Score:" + self.sub_score2[1]

    def a_score2(self):
        return "Level two Addition SCORE:" + self.add_score2[1]

    def s_score2(self):
        return "Level two Subtraction SCORE:" + self.sub_score2[1]


class Level_Three(models.Model):
    add_score3 = models.IntegerField(blank=True, null=True)
    sub_score3 = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return "Add Score:" + self.add_score3[1] + "Sub Score:" + self.sub_score3[1]

    def a_score3(self):
        return "Level three Addition SCORE:" + self.add_score3[1]

    def s_score3(self):
        return "Level three Subtraction SCORE:" + self.sub_score3[1]


class Student(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL)

    first_name = models.CharField(max_length = 30)
    last_name = models.CharField(max_length = 30)
    student_id = models.IntegerField(blank=True, null=True)

    def get_student_fname(self):
        return self.first_name

    def get_student_lname(self):
        return self.last_name

    def get_student_id(self):
        return self.student_id


class Teacher(models.Model):
    first_name = models.CharField(max_length = 30)
    last_name = models.CharField(max_length = 30)
    teach_id = models.IntegerField(blank=True, null=True)

    def teach_fname(self):
        return self.first_name

    def teach_lname(self):
        return self.last_name

    def t_id(self):
        return self.teach_id


