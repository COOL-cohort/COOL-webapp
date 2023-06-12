import yaml
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views import View
from django.shortcuts import render, redirect
from django.forms.models import model_to_dict
from .pass_request import *

from ..config import *
from ..models import Dataset, Cohort, Query
import time

logger = logging.getLogger('django')

class CohortAnalysis(View):
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
        context['set_size'] = cube.cube_size
        context['set_records'] = cube.num_records
        context['set_ids'] = cube.num_ids
        context['set_details'] = cube.set_details

        context['set_info'] = model_to_dict(cube)
        context['set_info'].pop('set_id')
        context['set_info'].pop('user_id')
        context['set_info'].pop('cube_size')

        return render(request, "cohort-analysis.html", context)

    def post(self, request, set_id):
        res = {}
        logger.info(request.POST)
        user = User.objects.get(id=request.user.id)
        cube = Dataset.objects.get(user_id=request.user.id, set_id=set_id)
        assert request.POST['mode'] == 'CreateCohort'
        query = request.POST['query']
        query = json.loads(query)
        start = time.time()
        out = pass_create_cohort(query)
        exe_time = time.time()-start
        res["status_code"] = out.status_code
        res['text'] = out.text
        if res["status_code"] == 200:
            res['text'] = json.loads(res['text'])
            q = Query(
                user_id=user,
                set_id=cube,
                query_name=query['queryName'],
                exe_time=exe_time
            )
            q.save()

            if query['saveCohort']:
                for c in res['text']['cohortResList']:
                    cohort = Cohort(
                        user_id=user,
                        set_id=cube,
                        cohort_size=c['cohortSize'],
                        cohort_name=c['cohortName'],
                        query_id=q,
                    )
                    cohort.save()
        return JsonResponse(res, safe=False)

