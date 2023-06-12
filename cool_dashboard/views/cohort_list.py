import yaml
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views import View
from django.shortcuts import render, redirect
from django.forms.models import model_to_dict
from .pass_request import *

from ..config import *
from ..models import Cohort, User, Dataset
import shutil

logger = logging.getLogger('django')

class CohortList(View):
    def get(self, request):
        context = {}
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
            subset['query_name'] = cohort.query_name
            context['cohorts'][index] = subset
        # logger.info(context)
        return render(request, "cohort-list.html", context)

# class CohortRemove(View):
#     def get(self, request, cohort_id):
#         cohort = Cohort.objects.get(cohort_id=cohort_id)
#         cube_name = cohort.set_id.cube_name
#         shutil.rmtree(os.path.join(data_path, str(cube_name), 'cohort', cohort.query_name))
#         cohort.delete()
#         return redirect('/cohort-show/')
