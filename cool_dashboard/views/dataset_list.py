import yaml
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views import View
from django.shortcuts import render, redirect
from django.forms.models import model_to_dict
from .pass_request import *

from ..config import *
from ..models import Dataset
import shutil

logger = logging.getLogger('django')

class DatasetList(View):
    def get(self, request):
        context = {}
        context['datasets'] = {}
        cubes = Dataset.objects.filter(user_id=request.user.id)
        for index, cube in enumerate(cubes):
            subset = {}
            subset['set_id'] = cube.set_id
            subset['set_name'] = cube.set_name
            subset['storage_size'] = cube.cube_size
            subset['upload_time'] = cube.save_time
            subset['set_detail'] = cube.set_details
            subset['num_records'] = cube.num_records
            context['datasets'][index] = subset
        # logger.info(context)
        return render(request, "dataset-list.html", context)

class DatasetRemove(View):
    def get(self, request, set_id):
        cube = Dataset.objects.get(set_id=set_id)
        cube.delete()
        shutil.rmtree(os.path.join(data_path, str(cube.cube_name)))
        return redirect('/dataset-show/')
