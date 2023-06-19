import yaml
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views import View
from django.shortcuts import render, redirect
from django.forms.models import model_to_dict
from .pass_request import *

from ..config import *
from ..models import *
import shutil

logger = logging.getLogger('django')

class QueryList(View):
    def get(self, request):
        context = {}
        context['query'] = {}
        query = Query.objects.filter(user_id=request.user.id)
        for idx, q in enumerate(query):
            subset = {}
            subset['query_id'] = q.query_id
            subset['query_name'] = q.query_name
            subset['query_mode'] = MODE_CHOICES(q.query_mode).label
            subset['user_name'] = q.user_id.username
            subset['set_name'] = q.set_id.set_name
            subset['cube_name'] = q.set_id.cube_name
            subset['save_time'] = q.save_time
            subset['set_id'] = q.set_id.set_id
            context['query'][idx] = subset
        # logger.info(context)
        return render(request, "query-list.html", context)

class QueryRemove(View):
    def get(self, request, query_id):
        q = Query.objects.get(query_id=query_id)
        cube = q.set_id
        out = pass_get_version({'cube': cube.cube_name})
        version = eval(out.text)
        save_path = os.path.join(data_path, cube.cube_name, version[-1], 'cohort', q.query_name)
        shutil.rmtree(save_path)
        q.delete()
        return redirect('/query-show/')

class QueryDetail(View):
    def get(self, request, query_id):
        context = {}
        q = Query.objects.get(query_id=query_id)

        cube = q.set_id
        # tableYaml = os.path.join(data_path, str(cube.cube_name), "table.yaml")
        # # logger.info(yaml.load(open(tableYaml), Loader=yaml.Loader))
        # if os.path.exists(tableYaml):
        #     tableYaml = yaml.load(open(tableYaml), Loader=yaml.Loader)
        #     context['tableYaml'] = tableYaml['fields']

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
        context['query_id'] = query_id

        return render(request, "query-show.html", context)

