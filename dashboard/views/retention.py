from django.views           import View
from django.shortcuts       import render
import json
import yaml
import threading
from .                      import request_bypass
from . import lang


class Retention( View ):
    def get(self, request):
        file = request.session['file_save']
        events = []

        djangoData = {
            "table.yaml": yaml.load( open( './cohana/'+file+"/table.yaml" ) ),
            "cube.yaml":  yaml.load( open( './cohana/'+file+"/cube.yaml" ) ),
            "events": events,
            "datasource": file
        }
        djangoData = json.dumps( djangoData, indent=4 )

        def reload():
            request_bypass.pass_reload(file)
        t1 = threading.Thread(target=reload)
        t1.start()

        template = 'retention' + lang.getTemplateByLanguage(request)
        return render( request, template, locals() )
