#from __future__ import unicode_literals

from django.db import models
from django.conf import settings
# Create your models here.  models are tables

class Score(models.Model):
	
	fscore = models.IntegerField()
	
	def __str__ (self):
		return self.fscore  #every class neeeds return
	def get_final_score(self):
		return "Your Final score is :" + self.fscore
	
class Level_One(models.Model):
	#new_field = models.CharField(max_length=140, default='SOME STRING')
	add_score1 = models.IntegerField(blank=True, null=True)
	sub_score1 = models.IntegerField(blank=True, null=True)
	
	def __str__ (self):
		return "Add Score:" + self.add_score + "Sub Score:" + sub_score
	
	def a_score1 (self):
		return "Level one Addition SCORE:" + self.add_score1
		
	def s_score1 (self):
		return "Level One Subtraction SCORE:" + self.sub_score1

class Level_Two(models.Model):
	add_score2 = models.IntegerField(blank=True, null=True)
	#sub_score2 = models.IntegerField(blank=True, null=True)
	
	def __str__ (self):
		return "Add Score:" + self.add_score + "Sub Score:" + sub_score
	
	def a_score2 (self):
		return "Level two Addition SCORE:" + self.add_score2
		
	def s_score2 (self):
		return "Level two Subtraction SCORE:" + self.sub_score2
		
class Level_Three(models.Model):
	add_score3 = models.IntegerField(blank=True, null=True)
	sub_score3 = models.IntegerField(blank=True, null=True)
	
	def add_score3 (self):
		return "Level three Addition SCORE:" + self.add_score3
		
	def sub_score3 (self):
		return "Level three Subtraction SCORE:" + self.sub_score3

class Student(models.Model):
	user = models.OneToOneField(settings.AUTH_USER_MODEL) #user object
	#lev3 = models.OneToManyField(Level_Three) #user.student.lev3 to call

	first_name = models.CharField(max_length = 30)
	last_name = models.CharField(max_length = 30)
	student_id = models.IntegerField(blank=True, null=True)
	#logged_in = models.BooleanField
	
	def get_student_fname (self):
		return self.first_name
	
	def get_student_lname (self):
		return self.last_name
	
	def get_student_id (self):
		return self.student_id
	
class Teacher(models.Model):
	first_name = models.CharField(max_length = 30)
	last_name = models.CharField(max_length = 30)
	teach_id = models.IntegerField(blank=True, null=True)
	
	def teach_fname (self):
		return self.first_name
	
	def teach_lname (self):
		return self.last_name
	
	def teach_id (self):
		return self.teach_id


