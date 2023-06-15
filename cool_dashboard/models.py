from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class upload_history(models.Model):
    # last upload file
    user_id = models.ForeignKey(User,on_delete=models.CASCADE)
    file_save = models.CharField(max_length=50)
    save_time = models.DateTimeField(auto_now=True)

class Dataset(models.Model):
    set_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User,on_delete=models.CASCADE)
    set_name = models.CharField(max_length=50)
    set_details = models.CharField(max_length=500)
    # for cube
    cube_name = models.CharField(max_length=50)
    cube_size = models.FloatField()
    num_records = models.IntegerField(default=0)
    num_ids = models.IntegerField(default=0)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    save_time = models.DateTimeField(auto_now=True)

class Query(models.Model):
    query_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    set_id = models.ForeignKey(Dataset,on_delete=models.CASCADE)
    query_name = models.CharField(max_length=50)
    CC = 'CC'
    CA = 'CA'
    OS = "OS"
    MODE_CHOICES = [
        (CC, 'Cohort-Create'),
        (CA, 'Cohort-Analysis'),
        (OS, 'Others'),
    ]
    query_mode = models.CharField(
        max_length=2,
        choices=MODE_CHOICES,
        default=OS,
    )
    save_time = models.DateTimeField(auto_now=True)
    exe_time = models.FloatField()
    class Meta:
        unique_together = [['query_name', 'user_id', 'set_id'], ]

class Cohort(models.Model):
    cohort_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User,on_delete=models.CASCADE)
    set_id = models.ForeignKey(Dataset,on_delete=models.CASCADE)
    query_id = models.ForeignKey(Query,on_delete=models.CASCADE)
    cohort_size = models.FloatField()
    cohort_name = models.CharField(max_length=20)
    save_time = models.DateTimeField(auto_now=True)

class Analysis(models.Model):
    analysis_id = models.AutoField(primary_key=True)
    analysis_name = models.CharField(max_length=50)
    analysis_save = models.CharField(max_length=50)
    set_id = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    analysis_type = models.CharField(max_length=50)
    save_time = models.DateTimeField(auto_now=True)