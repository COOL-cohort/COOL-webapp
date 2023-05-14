from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class upload_history(models.Model):
    # last upload file
    user_id = models.ForeignKey(User,on_delete=models.CASCADE)
    file_save = models.CharField(max_length=50)
    save_time = models.DateTimeField(auto_now=True)

class cube_details(models.Model):
    file_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User,on_delete=models.CASCADE)
    cube_size = models.FloatField()
    set_name = models.CharField(max_length=50)
    cube_name = models.CharField(max_length=50)
    set_details = models.CharField(max_length=500)
    num_records = models.IntegerField(default=0)
    num_ids = models.IntegerField(default=0)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    save_time = models.DateTimeField(auto_now=True)

class analysis(models.Model):
    analysis_id = models.AutoField(primary_key=True)
    analysis_name = models.CharField(max_length=50)
    analysis_save = models.CharField(max_length=50)
    file_id = models.ForeignKey(cube_details,on_delete=models.CASCADE)
    analysis_type = models.CharField(max_length=50)
    save_time = models.DateTimeField(auto_now=True)