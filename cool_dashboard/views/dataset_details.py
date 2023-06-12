import yaml
from django.views import View
from django.shortcuts import render, redirect
from django.forms.models import model_to_dict
from .pass_request import *

from ..config import *
from ..models import Dataset, Cohort

logger = logging.getLogger('django')
class DatasetDetail(View):
    def get(self, request, set_id):
        context = {}
        cube = Dataset.objects.filter(user_id=request.user.id, set_id=set_id)
        # cube.values()
        if not cube.exists():
            return render(request, "error-500.html", {'error': "Could not find the dataset under this account."})
        cube = cube[0]
        # logger.info(cube)

        tableYaml = os.path.join(data_path, str(cube.cube_name), "table.yaml")
        # logger.info(yaml.load(open(tableYaml), Loader=yaml.Loader))
        if os.path.exists(tableYaml):
            tableYaml = yaml.load(open(tableYaml), Loader=yaml.Loader)
            context['tableYaml'] = tableYaml['fields']

        context['set_id'] = cube.set_id
        context['set_name'] = cube.set_name
        context['storage_size'] = cube.cube_size
        context['set_records'] = cube.num_records
        context['set_ids'] = cube.num_ids
        context['set_details'] = cube.set_details

        context['set_info'] = model_to_dict(cube)
        context['set_info'].pop('set_id')
        context['set_info'].pop('user_id')
        context['set_info'].pop('cube_size')

        context['cohorts'] = {}
        cohorts = Cohort.objects.filter(user_id=request.user.id)
        for index, cohort in enumerate(cohorts):
            subset = {}
            subset['cohort_id'] = cohort.cohort_id
            subset['cohort_name'] = cohort.cohort_name
            subset['cohort_size'] = cohort.cohort_size
            subset['user_name'] = cohort.user_id.username
            subset['set_name'] = cohort.set_id.set_name
            subset['save_time'] = cohort.save_time
            subset['query_name'] = cohort.query_id.query_name
            context['cohorts'][index] = subset

        return render(request, "dataset-show.html", context)