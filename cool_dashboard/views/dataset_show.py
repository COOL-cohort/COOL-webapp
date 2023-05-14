from django.contrib.auth.models import User
from django.views import View
from django.shortcuts import render, redirect
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
        logger.info(context)
        return render(request, "dataset-show.html", context)

