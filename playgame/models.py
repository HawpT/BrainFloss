#from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Scores(models.Model):
	student_id = models.IntegerField()
	score = models.IntegerField()
	
	def __str__ (self):
		return self.student_id  #do I need this?

class Level_One(models.Model):
	score = models.IntegerField()

class Level_Two(models.Model):
	score = models.IntegerField()

class Student(models.Model):
	first_name = models.CharField(max_length = 30)
	last_name = models.CharField(max_length = 30)

class Teacher(models.Model):
	first_name = models.CharField(max_length = 30)
	last_name = models.CharField(max_length = 30)


