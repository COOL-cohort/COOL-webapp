#!/usr/bin/python
from django.http            import HttpResponseRedirect

from django.shortcuts       import render, redirect
from django.views           import View

import os, yaml

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
upload_path = "upload/"
data_path = "cohana/"

class Figure_design(View):
    def get(self, request):
        result = {}

        result['columns'] = []
        sub_path = data_path + "/%s" % request.session['file_save']
        with open(sub_path+"/table.yaml", 'r') as stream:
            spec = yaml.load(stream)
        for col in spec['fields']:
            if col['fieldType'] == "UserKey":
                result['columns'].append(col['name'])

        return render(request, "figure_design.html", result)

    def post( self,request ):
        sub_path = data_path + "/%s" % request.session['file_save']
        agg = request.POST.get("aggregator")
        analysis_name = request.POST.get("name")
        table_name = request.POST.get("tableFieldName")
        if agg == "RETENTION":
            with open(sub_path + '/cube.yaml', 'w') as f:
                fields = []
                fields.append({
                    "aggregator": agg,
                    "name": analysis_name,
                    "tableFieldName": table_name,
                })
                f.write(yaml.dump({'measures': fields}, default_flow_style=False))

        elif agg == "RANGE":
            pass

        request.session['analysis_name'] = analysis_name
        request.session['agg'] = agg

        return HttpResponseRedirect('/retention/advance')