from django.shortcuts       import render, redirect
from django.views           import View

from dashboard.models import *
import os, json

upload_path = "upload/"
data_path = "cohana/"

def strTotime(name):
    return name[:4] + "/" + name[4:6] + "/" + name[6:8] + " " + name[8:10] + ":" + name[10:12] + ":" + name[12:14]


class Figure(View):
    def get(self, request):
        result = {}
        files = csv_file.objects.filter(user_id=request.user.id)
        count = 0
        if files.exists():
            for file in files:
                alys = analysis.objects.filter(file_id=file)
                if alys.exists():
                    for aly in alys:
                        result[count] = {}
                        result[count]["index"] = count+1
                        result[count]["name"] = aly.analysis_name
                        result[count]["type"] = aly.analysis_type
                        result[count]["date"] = strTotime(aly.analysis_save)
                        result[count]["database"] = file.file_name
                        result[count]["file_save"] = aly.analysis_save
                        count += 1

        return render(request, "figure.html", {"Analysises": result})

    def post( self,request ):
        file_operation = request.POST.get('file_operation')
        analysis_save = request.POST.get('analysis_save')

        if file_operation == "delete":
            if analysis.objects.filter(analysis_save=analysis_save).exists():
                aly = analysis.objects.get(analysis_save=analysis_save)
                csv = csv_file.objects.get(file_id=aly.file_id.file_id)
                analysis.objects.filter(analysis_save=analysis_save).delete()
                if os.path.exists(data_path + csv.file_save + "/" + analysis_save +".dat"):
                    os.remove(data_path + csv.file_save + "/" + analysis_save +".dat")

            return redirect("/figure")
        else:
            request.session['analysis_save'] = analysis_save

            return redirect('/figure_detail')

class Figure_detail(View):
    def get(self, request):
        result = {}

        analysis_save = request.session['analysis_save']

        aly = analysis.objects.get(analysis_save=analysis_save)
        files = csv_file.objects.filter(user_id=request.user.id)

        count = 0
        for file in files:
            if file.file_id == aly.file_id.file_id:
                with open(data_path + "%s/%s.dat" % (file.file_save, aly.analysis_save)) as f:
                    data = json.load(f)
                if aly.analysis_type == "RETENTION":
                    result[count] = self.to_line(data)
                    result[count]['title'] = aly.analysis_name + "(line map)"
                    result[count]['type'] = "line"
                    count += 1
                    result[count] = self.to_heatmap(data)
                    result[count]['title'] = aly.analysis_name + "(heat map)"
                    result[count]['type'] = "heatmap"
                    count += 1
                    result[count] = self.to_range(data)
                    result[count]['title'] = aly.analysis_name + "(range map)"
                    result[count]['type'] = "range"
                    count += 1

        return render(request, "figure_detail.html", {"figures": result})

    def to_line(self, data):
        result = {}
        result['y_label'] = data['data']['columes']

        result['data'] = {}
        lens = []
        for sub_data in data['data']["values"]:
            sub = sub_data['data']
            sub.reverse()
            lens.append(len(sub_data['data']))
            result['data'][sub_data['name']] = sub

        result['x_label'] = list(range(max(lens)))
        return result

    def to_heatmap(self,data):
        result = {}
        result['y_label'] = data['data']['columes']
        lens = []
        for sub_data in data['data']['heatmap']:
            lens.append(sub_data[0])
        # print(lens)
        # print(max(lens))
        result['x_label'] = list(range(max(lens)+1))
        result['data'] = data['data']['heatmap']
        result['min'] = 0
        result['max'] = 100
        return result

    def to_range(self, data):
        data = data['data']['range']
        result = {}
        result['cols'] = data['cols']
        result['series'] = data['series']
        return result