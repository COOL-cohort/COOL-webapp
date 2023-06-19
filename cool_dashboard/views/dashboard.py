from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

from django.views import View
from ..models import *
from ..config import *

import os
import yaml

# def dashboard(request):
#     if request.method == "GET":
#         context = {}
#         context['username'] = request.user
#         context['last_user'] = 'peng'
#         context['last_dataset'] = 'AKI3269'
#         context['storage'] = 400
#         context['num_datasets'] = 1
#         context['num_users'] = 1
#         # print(request.user.email)
#         # user = User.objects.get(username=request.user)
#         return render(request, "dashboard.html", context)

def strTotime(name):
    return name[:4] + "/" + name[4:6] + "/" + name[6:8]


class Dashboard(View):
    # @login_required
    def get(self, request):
        # logging.info(request.user)
        if request.user.is_superuser:
            all_users = User.objects.count()
            all_queries = Query.objects.count()
            all_datasets = Dataset.objects.count()
            all_cohorts = Cohort.objects.count()
            all_storage = 0
            root_flag =True
            for db in Dataset.objects.all():
                all_storage += db.cube_size

        databases = {}
        count = 0
        selected_datasets = Dataset.objects.filter(user_id=request.user.id)
        user_datasets = selected_datasets.count()
        selected_query = Query.objects.filter(user_id=request.user.id)
        user_queries = selected_query.count()
        selected_cohorts = Cohort.objects.filter(user_id=request.user.id)
        user_cohorts = selected_cohorts.count()
        user_storage = 0
        last_dataset = ""

        figures = {}
        figure_index = 0
        for dataset in selected_datasets:
            databases[count] = {}
            databases[count]["id"] = dataset.set_id
            databases[count]["name"] = dataset.set_name
            last_dataset = dataset.set_name
            databases[count]['date'] = strTotime(dataset.cube_name)
            databases[count]['num_ids'] = dataset.num_ids
            databases[count]['num_records'] = dataset.num_records
            sub_queries = Query.objects.filter(set_id=dataset)
            databases[count]['num_queries'] = sub_queries.count()
            databases[count]['start'] = dataset.start_time.strftime('%Y-%m-%d %H:%M:%S')
            databases[count]['end'] = dataset.end_time.strftime('%Y-%m-%d %H:%M:%S')

            # user_figures += Analysis.objects.filter(set_id=dataset.set_id).count()
            user_storage += dataset.cube_size

            with open(data_path + dataset.cube_name + "/demographic.yaml", 'r') as stream:
                demographic_info = yaml.load(stream, Loader=yaml.Loader)

            databases[count]['figures'] = []

            # figures[figure_index] = {
            #     "title": demographic_info['Event']['name'],
            #     "type": 'pie',
            #     "y_label": list(demographic_info['Event']['data'].keys()),
            #     "data": demographic_info['Event']['data'],
            #
            # }
            # databases[count]['figures'].append(figure_index)
            # figure_index += 1
            #
            # for value in demographic_info['Value']:
            #     if value['type'] == 'pie':
            #         figures[figure_index] = {
            #             "title": value['name'],
            #             "type": 'pie',
            #             "y_label": [str(i) for i in list(value['data'].keys())],
            #             "data": value['data'],
            #
            #         }
            #     elif value['type'] == 'bar':
            #         figures[figure_index] = {
            #             "title": value['name'],
            #             "type": 'bar',
            #             "y_label": value['data']['y'],
            #             "data": value['data']['x'],
            #         }
            #     databases[count]['figures'].append(figure_index)
            #     figure_index += 1

            count += 1

        return render(request, "dashboard.html", locals())
