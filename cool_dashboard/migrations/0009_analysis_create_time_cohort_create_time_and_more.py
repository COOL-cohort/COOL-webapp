# Generated by Django 4.1.7 on 2023-06-15 17:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cool_dashboard', '0008_query_query_mode_alter_query_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='analysis',
            name='create_time',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='cohort',
            name='create_time',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='dataset',
            name='create_time',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='query',
            name='create_time',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
