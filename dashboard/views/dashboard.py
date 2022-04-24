from django.views          import View
from django.shortcuts      import render, redirect
from dashboard.models import *
import json
import yaml

from .                      import lang
from dashboard.config import *

def strTotime(name):
    return name[:4] + "/" + name[4:6] + "/" + name[6:8]

class Dashboard( View ):
    def get(self, request):
        if request.user.is_superuser:
            all_users = User.objects.count()
            all_figures = analysis.objects.count()
            all_datasets = csv_file.objects.count()
            all_storage = 0
            root_flag =True
            for db in csv_file.objects.all():
                all_storage += db.file_size

        databases = {}
        count = 0
        selected_datasets = csv_file.objects.filter(user_id=request.user.id)
        sel_datasets = selected_datasets.count()
        sel_figures = 0
        sel_storage = 0

        figures = {}
        figure_index = 0
        for dataset in selected_datasets:
            databases[count] = {}
            databases[count]["name"] = dataset.file_name
            databases[count]['date'] = strTotime(dataset.file_save)
            databases[count]['num_ids'] = dataset.num_ids
            databases[count]['num_records'] = dataset.num_records
            databases[count]['involved_dates'] = dataset.involved_dates

            sel_figures += analysis.objects.filter(file_id=dataset.file_id).count()
            sel_storage += dataset.file_size

            with open(data_path + dataset.file_save + "/demographic.yaml", 'r') as stream:
                demographic_info = yaml.load(stream)

            databases[count]['figures'] = []

            figures[figure_index] = {
                "title": demographic_info['Event']['name'],
                "type": 'pie',
                "y_label": list(demographic_info['Event']['data'].keys()),
                "data": demographic_info['Event']['data'],

            }
            databases[count]['figures'].append(figure_index)
            figure_index += 1

            for value in demographic_info['Value']:
                if value['type'] == 'pie':
                    figures[figure_index] = {
                        "title": value['name'],
                        "type": 'pie',
                        "y_label": [str(i) for i in list(value['data'].keys())],
                        "data": value['data'],

                    }
                elif value['type'] == 'bar':
                    figures[figure_index] = {
                        "title": value['name'],
                        "type": 'bar',
                        "y_label": value['data']['y'],
                        "data": value['data']['x'],
                    }
                databases[count]['figures'].append(figure_index)
                figure_index += 1

            count += 1

        template = 'dashboard' + lang.getTemplateByLanguage(request)
        return render(request, template, locals())
