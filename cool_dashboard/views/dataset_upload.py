import os

import yaml
import datetime
import pandas as pd
import shutil

from django.contrib.auth.models import User
from django.views import View
from django.shortcuts import render, redirect
from .pass_request import *

from ..config import *
from ..models import upload_history, Dataset

logger = logging.getLogger('django')

class Upload(View):
    def get(self, request):
        return render(request, "dataset-upload.html")

    def post(self, request):
        filename = request.POST.get("filename")
        setname = request.POST.get("setname")
        details = request.POST.get("details")
        columns = request.session['columns']
        # columns = request.POST.get("columns")
        size = request.POST.get("size")
        if filename == None:
            return render(request, "error-500.html", {'error': "Please upload a csv file."})

        if not os.path.exists(os.path.join(upload_path, "%s.csv" % filename)):
            return render(request, "error-500.html", {'error': "The csv file is missing. Please reload again. %s"%filename})

        # data = pd.read_csv(upload_path + filename + ".csv", header=0)
        # columns = list(data.columns)

        new_path = os.path.join(data_path, filename)
        if not os.path.exists(new_path):
            os.mkdir(new_path)

        # logger.info(columns)
        # for col in columns:
        #     logger.info(request.POST.get(col))

        # is_null = pd.isna(data)
        # if is_null.any():
        #     return render(request, "error-500.html",
        #                   {'error': "There are null values in the csv file."})

        # save the table.yaml file
        with open(os.path.join(new_path, 'table.yaml'), 'w') as f:
            fields = []
            for field in columns:
                fields.append({
                    "name": field.replace('\r', ''),
                    "fieldType": fieldTypes[request.POST.get(field)]['type'],
                    # "dataType": fieldTypes[request.POST.get(field)]['datatype'],
                    "invariantField": fieldTypes[request.POST.get(field)]['invariantField'],
                })
                # if fieldTypes[request.POST.get(field)]['type'] == "ActionTime":
                #     data[field] = pd.to_datetime(data[field])
                #     data[field] = data[field].dt.strftime("%Y-%m-%d")
                #     data.to_csv(os.path.join(upload_path, "%s.csv" % filename), index=False)

            f.write(yaml.dump({'fields': fields, 'charset': 'utf-8'}, default_flow_style=False))

        query = {
            "dataFileType": "CSV",
            # filename e.g.,20230504153543eTQCiLZ3
            "cubeName": "%s" % filename,
            # path to the table yaml
            "schemaPath": os.path.join(back_data_path, filename, 'table.yaml'),
            "dataPath": os.path.join(back_upload_path, "%s.csv" % filename),
            "outputPath": "./%s/" % repo_name
        }
        logger.info(query)
        out = pass_load(query)
        if out.status_code != 200:
            return render(request, "error-500.html", {'error': out.text})
        else:
            version = out.text

        # save the original csv file
        # shutil.copyfile(os.path.join(upload_path, "%s.csv" % filename),
        #                 os.path.join(new_path, "%s.csv" % filename))
        shutil.copyfile(os.path.join(new_path, 'table.yaml'),
                        os.path.join(new_path, version, 'table.yaml'))

        # remove all previous csv files
        his_all = []
        for his in upload_history.objects.all():
            his_all.append(his.file_save)

        files = os.listdir(upload_path)
        for file in files:
            if file[:-4] not in his_all:
                os.remove(os.path.join(upload_path, file))

        results = self.get_demo_info(filename, fields)
        with open(os.path.join(new_path, 'demographic.yaml'), 'w') as f:
            f.write(yaml.dump(results, default_flow_style=False))

        logger.info(results)
        # logger.info(results['Details'][results['UserKey'][0]])

        user = User.objects.get(id=request.user.id)
        new_file = Dataset(
            user_id=user,
            set_name=setname,
            set_details=details,
            cube_name=filename,
            cube_size=getFoldSize(os.path.join(new_path, version)),
            num_ids=results['Details'][results['UserKey'][0]]['size'],
            num_records=size,
            start_time=results['Details'][results['ActionTime'][0]]['start'],
            end_time=results['Details'][results['ActionTime'][0]]['end'],
        )
        new_file.save()

        # return render(request, "dataset-upload.html")
        return redirect("/dashboard/")

    def get_demo_info(self, cubename, fields):
        base_time = datetime.datetime.strptime(base_day, "%Y-%m-%d %H:%M:%S")
        results = {
            "UserKey": [],
            "ActionTime": [],
            "Action": [],
            "Action Related": [],
            "Segment": [],
            "Metric": [],  # Metric == int
            "Float": [],
            "Fields": [],
            "Details": {}
        }
        for fid, field in enumerate(fields):
            query = {
                "cube": cubename,
                "col": field['name']
            }
            out = pass_read_col(query)
            # logger.info(out.text)
            out = eval(out.text)
            out['name'] = field['name']
            out['invariant'] = field['invariantField']

            if out['type'] == 'UserKey':
                out['size'] = len(out['values'])
                out.pop('values')
                results['UserKey'].append(field['name'])
            elif out['type'] == 'Segment' and not out['invariant']:
                out['size'] = len(out['values'])
                results['Segment'].append(field['name'])
            elif out['type'] == 'Metric' and not out['invariant']:
                results['Metric'].append(field['name'])
            elif out['type'] == 'Float' and not out['invariant']:
                results['Float'].append(field['name'])
            elif out['type'] == 'Action':
                results['Action'].append(field['name'])
                results['Action Related'] = out['values']
            elif out['type'] == 'ActionTime':
                results['ActionTime'].append(field['name'])
                # min_day = base_time + datetime.timedelta(days=int(out['min']))
                # max_day = base_time + datetime.timedelta(days=int(out['max']))
                # out['start'] = min_day.strftime("%Y-%m-%d %H:%M:%S")
                # out['end'] = max_day.strftime("%Y-%m-%d %H:%M:%S")
                out['start'] = base_time + datetime.timedelta(seconds=int(out['min']))
                out['end'] = base_time + datetime.timedelta(seconds=int(out['max']))
            results['Fields'].append(field['name'])
            results['Details'][field['name']] = out
        return results


def get_FileSize(filePath):
    fsize = os.path.getsize(str(filePath))
    fsize = fsize / float(1024 * 1024)
    return round(fsize, 2)


def getFoldSize(foldPath, size=0):
    for root, dirs, files in os.walk(foldPath):
        for f in files:
            size += get_FileSize(os.path.join(root, f))
    return size

