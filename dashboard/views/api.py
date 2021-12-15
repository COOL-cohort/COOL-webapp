from django.views           import View
from django.http            import HttpResponse
from django.shortcuts       import render, redirect
import json
import sys
import traceback
from . import request_bypass
from dashboard.models import *
import string,random
from datetime import datetime

upload_path = "upload/"
data_path = "cohana/"

class Api( View ):
    def get(self, request):
        response = {}
        response['code'] = 500
        response['message'] = "ERROR"
        return HttpResponse(json.dumps(response))

    def post(self, request):
        mode = request.POST.get("mode", "funnel")
        print(mode)

        analysis_name = request.session['analysis_name']
        agg = request.session['agg']
        file_save = request.session['file_save']

        print(analysis_name)

        rand_str = ''.join(random.sample(string.ascii_letters + string.digits, 8))
        analysis_save = datetime.now().strftime('%Y%m%d%H%M%S') + rand_str

        response = {}
        try:
            if mode == "cohort":
                response['code'] = 200
                query = request.POST.get("data", "")
                if query == "":
                    response['message'] = "no Query"
                    return HttpResponse(json.dumps(response))

                cohort = json.loads(query)
                # pprint.pprint(cohort)
                try:
                    raw_response = request_bypass.pass_request(cohort)
                except Exception as e:
                    raise Exception("Invalid Query")
                response['data'] = request_bypass.get_plotdata_chart(raw_response)
                response['message'] = "OK"
                with open(data_path+'/%s/%s.dat'%(file_save,analysis_save), 'w') as jsonFile:
                    json.dump(response, jsonFile)
                # return HttpResponse(json.dumps(response))
            elif mode == "loyal-cohort":
                response['code'] = 200
                query2 = request.POST.get("data2", "")
                if query2 == "":
                    response['message'] = "no create query"
                    return HttpResponse(json.dumps(response))

                loyal2 = json.loads(query2)
                request_bypass.removeCohort("loyal")
                result = request_bypass.pass_create_request(loyal2)

                query1 = request.POST.get("data1", "")
                if query1 == "":
                    response['message'] = "no loyal query"
                    return HttpResponse(json.dumps(response))

                loyal1 = json.loads(query1)
                try:
                    raw_response = request_bypass.pass_request(loyal1)
                except Exception as e:
                    raise Exception("Invalid Query")
                response['data'] = request_bypass.get_plotdata_chart(raw_response)

                with open(data_path+'/%s/%s.dat'%(file_save,analysis_save), 'w') as jsonFile:
                    json.dump(response, jsonFile)

                request_bypass.removeCohort("loyal")
                response['message'] = "OK"

            else:
                response['code'] = 500
                response['message'] = "Unsupported Mode"

            file = csv_file.objects.get(file_save=file_save)
            new_analysis = analysis(
                file_id=file,
                analysis_type=agg,
                analysis_name=analysis_name,
                analysis_save=analysis_save
            )
            new_analysis.save()

            return HttpResponse(json.dumps(response))

        except Exception as e:
            exc_info = sys.exc_info()
            traceback.print_exception(*exc_info)
            response['code'] = 500
            response['message'] = "Internal Error: " + str(e)
            return HttpResponse(json.dumps(response))
