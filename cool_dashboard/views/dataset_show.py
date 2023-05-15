from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views import View
from django.shortcuts import render, redirect
from django.forms.models import model_to_dict
from .pass_request import *

from ..config import *
from ..models import cube_details

logger = logging.getLogger('django')

class DatasetShow(View):
    def get(self, request):
        context = {}
        context['datasets'] = {}
        cubes = cube_details.objects.filter(user_id=request.user.id)
        for index, cube in enumerate(cubes):
            subset = {}
            subset['set_id'] = cube.file_id
            subset['set_name'] = cube.set_name
            subset['file_size'] = cube.cube_size
            subset['upload_time'] = cube.save_time
            subset['set_detail'] = cube.set_details
            subset['num_records'] = cube.num_records
            context['datasets'][index] = subset
        # logger.info(context)
        return render(request, "dataset-show.html", context)

class DatasetDetail(View):
    def get(self, request, set_id):
        context = {}
        cube = cube_details.objects.filter(user_id=request.user.id, file_id=set_id)
        cube.values()
        if not cube.exists():
            return render(request, "error-500.html", {'error': "Could not find the dataset under this account."})
        cube = cube[0]
        logger.info(cube)
        context['set_id'] = cube.file_id
        context['set_name'] = cube.set_name
        context['set_size'] = cube.cube_size
        context['set_records'] = cube.num_records
        context['set_ids'] = cube.num_ids
        context['set_details'] = cube.set_details

        context['set_info'] = model_to_dict(cube)
        context['set_info'].pop('file_id')
        context['set_info'].pop('user_id')
        context['set_info'].pop('cube_size')
        return render(request, "dataset-analysis.html", context)