from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class upload_history(models.Model):
    # last upload file
    user_id = models.ForeignKey(User,on_delete=models.CASCADE)
    file_save = models.CharField(max_length=50)

class csv_file(models.Model):
    file_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User,on_delete=models.CASCADE)
    file_size = models.FloatField()
    file_name = models.CharField(max_length=50)
    file_save = models.CharField(max_length=50)
    num_records = models.IntegerField(default=0)
    num_ids = models.IntegerField(default=0)
    involved_dates = models.CharField(max_length=15,default="")

class analysis(models.Model):
    analysis_id = models.AutoField(primary_key=True)
    analysis_name = models.CharField(max_length=50)
    analysis_save = models.CharField(max_length=50)
    file_id = models.ForeignKey(csv_file,on_delete=models.CASCADE)
    analysis_type = models.CharField(max_length=50)