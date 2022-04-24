from django.views           import View
from django.shortcuts       import render
import json
import yaml
import threading
from .                      import request_bypass
from . import lang

from dashboard.config import *

class Retention( View ):
    def get(self, request):
        file = request.session['file_save']
        analysis_name = request.session['analysis_name']

        djangoData = {
            "table.yaml": yaml.load(open("%s/%s/table.yaml"%(data_path, file) )),
            # "cube.yaml": yaml.load(open("%s/%s/cube.yaml" % (data_path, file))),
            "datasource": file,
            'measure': request.session['measure'],
            'analysis_name': request.session['analysis_name']
        }
        djangoData = json.dumps(djangoData, indent=4)

        def reload():
            logger.info(request_bypass.pass_reload(file))
        t1 = threading.Thread(target=reload)
        t1.start()

        template = 'retention' + lang.getTemplateByLanguage(request)
        return render( request, template, locals() )
