import logging
import os
import random
from datetime import datetime
import string
import yaml
import pandas as pd

from django.views import View
from django.shortcuts import render, redirect
from ..models import User, upload_history

from ..config import *

logger = logging.getLogger('django')

import requests

class Upload(View):
    def get(self, request):
        return render(request, "dataset-upload.html")

    def post(self, request):
        filename = request.POST.get("filename")
        setname = request.POST.get("setname")
        details = request.POST.get("details")
        if filename == None:
            return render(request, "error-500.html", {'error': "Please upload a csv file."})

        if not os.path.exists(os.path.join(upload_path, "%s.csv" % filename)):
            return render(request, "error-500.html", {'error': "The csv file is missing. Please reload again. %s"%filename})

        user = User.objects.get(id=request.user.id)
        upload_history.objects.create(user_id=user, file_save=filename)

        data = pd.read_csv(upload_path + filename + ".csv", header=0)
        columns = list(data.columns)

        new_path = os.path.join(data_path, filename)
        if not os.path.exists(new_path):
            os.mkdir(new_path)

        # for col in columns:
        #     logger.info(request.POST.get(col))

        with open(os.path.join(new_path, 'table.yaml'), 'w') as f:
            fields = []
            for field in columns:
                fields.append({
                    "name": field.replace('\r', ''),
                    "fieldType": fieldTypes[request.POST.get(field)]['type'],
                    "dataType": fieldTypes[request.POST.get(field)]['datatype'],
                })
                if fieldTypes[request.POST.get(field)]['type'] == "ActionTime":
                    data[field] = pd.to_datetime(data[field])
                    data[field] = data[field].dt.strftime("%Y-%m-%d")
                    data.to_csv(os.path.join(upload_path,"%s.csv"%filename), index=False)

            f.write(yaml.dump({'fields': fields, 'charset': 'utf-8'}, default_flow_style=False))

        # his_all = []
        # for his in upload_history.objects.all():
        #     his_all.append(his.file_save)
        #
        # files = os.listdir(upload_path)
        # for file in files:
        #     if file[:-4] not in his_all:
        #         os.remove(upload_path + file)

        # return redirect("/column_list/")
        return render(request, "dataset-upload.html")


def get_FileSize(filePath):
    fsize = os.path.getsize(str(filePath))
    fsize = fsize / float(1024 * 1024)
    return round(fsize, 2)


def getFoldSize(foldPath, size=0):
    for root, dirs, files in os.walk(foldPath):
        for f in files:
            size += os.path.getsize(os.path.join(root, f))
    return size
