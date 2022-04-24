from django.shortcuts       import render, redirect
from django.views           import View
from datetime               import datetime

import logging
import os
import json
import yaml
import pandas as pd
import numpy as np
import string
import random
from dashboard.models import *
from dashboard.config import *
from dashboard.views.preprocess import preprocessor
import requests
import sqlite3

logger = logging.getLogger('django')

fieldTypes = {
    'User ID':{
        'type': "UserKey",
        "datatype": "String"
    },
    'Event':{
        'type': "Action",
        "datatype": "String"
    },
    'Event Related':{
        'type': "Segment",
        "datatype": "String"
    },
    'Time':{
        'type': "ActionTime",
        "datatype": "Int32"
    },
    'Value':{
        'type': "Metric",
        "datatype": "Int32"
    },
    'String':{
        'type': "Segment",
        "datatype": "String"
    }
}

class Upload( View ):

    def get(self, request):
        return render(request, "upload.html")

    def post( self,request ):
        errors = {
            "type": "Uploading data",
            "advice": "Please upload your data!",
        }

        # without a CSV file
        if "csv_file" not in request.FILES:
            errors['details'] = ["No dataset is uploaded!"]
            return render(request, "error.html", errors)

        # without a file name
        if request.POST.get("name") == "":
            errors['details'] = ["Please input a name"]
            return render(request, "error.html", errors)

        csv_file_content = request.FILES["csv_file"]
        file_name = request.POST.get("name")

        # get the new file name
        rand_str = ''.join(random.sample(string.ascii_letters + string.digits, 8))
        file_save = datetime.now().strftime('%Y%m%d%H%M%S') + rand_str

        # load new file
        f = open(upload_path + file_save + ".csv", 'wb')
        for chunk in csv_file_content.chunks():
            f.write(chunk)
        f.close()

        # store necessary information
        request.session['csv_name'] = file_name
        request.session['csv_save'] = file_save

        user = User.objects.get(id=request.user.id)
        try:
            his = upload_history.objects.get(user_id=user)
            his.file_save=file_save
            his.save()
        except:
            upload_history.objects.create(user_id=user, file_save=file_save)

        his_all = []
        for his in upload_history.objects.all():
            his_all.append(his.file_save)

        files = os.listdir(upload_path)
        for file in files:
            if file[:-4] not in his_all:
                os.remove(upload_path+file)

        return redirect("/column_list/")


def get_FileSize(filePath):
    fsize = os.path.getsize(str(filePath))
    fsize = fsize/float(1024*1024)
    return round(fsize,2)

def getFoldSize(foldPath, size=0):
    for root, dirs, files in os.walk(foldPath):
        for f in files:
            size += os.path.getsize(os.path.join(root, f))
    return size


class Column_list( View ):
    def get(self, request):
        # if request.session['csv_save'] == "error":
        #     return redirect("/upload/")

        file_save = request.session['csv_save']

        rawdata = pd.read_csv(upload_path + file_save + ".csv")
        columns = list(rawdata.columns)
        column_types = rawdata.dtypes.to_dict()

        # f = open(upload_path + file_save + ".csv", "r")
        # columns = f.readline()
        # columns = columns[:-1].split(",")
        # f.close()

        result = {}
        request.session['columns'] = columns

        result['columns'] = columns
        result['options'] = fieldTypes

        result['column_type'] = {}
        event_related = []

        for col in columns:
            low_col = col.lower().strip()
            if low_col[-2:] == 'id':
                result['column_type'][col] = "User ID"
            elif low_col[-4:] == 'time':
                result['column_type'][col] = "Time"
            elif "event" in low_col and str(column_types[low_col])=='object':
                result['column_type'][col] = "Event"
                event_related = list(rawdata[low_col].unique())
            elif str(column_types[low_col])=='object':
                result['column_type'][col] = "Segment"
            else:
                result['column_type'][col] = "Value"

        for col in event_related:
            result['column_type'][col] = "Event Related"

        return render(request, "column_list.html", result)

    def post( self,request ):
        errors = {
            "type": "Loading data",
            "advice": "Please check your data format!",
        }

        file_save = request.session['csv_save']

        # if request.session['csv_save'] == "error":
        #     return redirect("/upload/")
        # else:
        data = pd.read_csv(upload_path + file_save + ".csv")

        # check the format of the dataset
        check_list = ['User ID', 'Time', 'Event']
        for check in check_list:
            check_cols = []
            for field in request.session['columns']:
                if request.POST.get(field) == check:
                    check_cols.append(field)

            if len(check_cols)>1 or len(check_cols) == 0:
                if len(check_cols)>1:
                    errors['details'] = ["More than one columns denote the %s: %s" % (check,str(check_cols))]
                if len(check_cols) == 0:
                    errors['details'] = ["No column denotes the %s!" %(check)]
                return render(request, "error.html", errors)

        # if "value" not in request.session['columns']:
        #     errors["details"]= ["No column names value!"]
        #     return render(request, "error.html", errors)

        # events = list(data['event'].unique())
        # for field in request.session['columns']:
        #     if field not in events and fieldTypes[request.POST.get(field)]['type'] == "Segment":
        #         errors["details"] = ["%s is not an event, please check again!" %(field)]
        #         return render(request, "error.html", errors)

        # preprocess the dataset
        sub_path = data_path + "/%s" % request.session['csv_save']
        if not os.path.exists(sub_path):
            os.mkdir(sub_path)

        with open(sub_path + '/table.yaml', 'w') as f:
            fields = []
            for field in request.session['columns']:
                fields.append({
                    "name": field.replace('\r', ''),
                    "fieldType": fieldTypes[request.POST.get(field)]['type'],
                    "dataType": fieldTypes[request.POST.get(field)]['datatype'],
                })
                if fieldTypes[request.POST.get(field)]['type'] == "ActionTime":
                    data['time'] = pd.to_datetime(data['time'])
                    data['time'] = data['time'].dt.strftime("%Y-%m-%d")

            f.write(yaml.dump({'fields': fields, 'charset': 'utf-8'}, default_flow_style=False))

        data.to_csv(data_path + "%s/data.csv" % file_save, index=False)

        preprocessor(file_save)

        # return_info = subprocess.Popen('utils/preprocess.sh '+ str(request.session['csv_save']), shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        #
        # sh_results = []
        # for next_line in return_info.stdout:
        #     sh_results.append(next_line.decode("utf-8", "ignore"))
        # if sh_results[-1][:19]!= "Loading Finished in":
        #     for next_line in sh_results:
        #         logger.info(next_line)
        #
        #     shutil.rmtree(data_path + file_save)
        #     os.remove(upload_path + file_save + ".csv")
        #
        #     request.session['csv_save'] = "error"
        #
        #     errors = {
        #         "type": "Loading data",
        #         "advice": "Please check your data format!",
        #         "details": sh_results,
        #     }
        #     return render(request, "error.html", errors)

        query = {
            "dataFileType": "CSV",
            "cubeName": file_save,
            "schemaPath": data_path + "%s/table.yaml" % file_save,
            "dataPath": data_path + "%s/data.csv" % file_save,
            "outputPath": data_path[:-1],
        }

        out = requests.post(SERVER + "/v1/load", data=json.dumps(query))

        if out.status_code != 200:
            errors['details'] = ["ErrorCode[%d] %s" % (out.status_code, out.text)]
            return render(request, "error.html", errors)

        logger.info("[*] Loading data successfully.")
        os.remove(upload_path + file_save + ".csv")

        demographic_info = self.get_demographic_info(request, data)
        with open(sub_path + '/demographic.yaml', 'w') as f:
            f.write(yaml.dump(demographic_info, default_flow_style=False))

        user = User.objects.get(id=request.user.id)
        new_file = csv_file(
            user_id=user,
            file_name=request.session['csv_name'],
            file_save=request.session['csv_save'],
            file_size=get_FileSize(data_path + file_save + "/data.csv"),
            num_ids=demographic_info['User ID']['data'],
            num_records=len(data),
            involved_dates= "%s to %s" %(demographic_info['Time']['data'][0], demographic_info['Time']['data'][1])
        )
        new_file.save()

        self.clean_dim()

        return redirect("/database/")


    def value_partition(self, col):
        start = min(col)
        end = max(col)
        interval = int((end - start) / 8 + 0.5)
        sub_col = {}

        sub_col['y'] = []
        sub_col['x'] = []

        for i in range(9):
            sub_col['y'].append("[%s,%s)" % (start + interval * i, min(start + interval * (i + 1) - 1, end)))
            sub_col['x'].append(0)
        for i in col:
            sub_col['x'][int((i - start) / interval)] += 1
        return sub_col

    def get_demographic_info(self, request, df):

        cols = df.columns
        events = list(df['event'].unique())
        results = {}
        results['Value'] = []
        value_cols = []
        unique_id = ""

        for col in cols:
            if request.POST.get(col) == "User ID":
                sub_col = {
                    "name": col,
                    "data": len(df[col].unique()),
                }
                results['User ID'] = sub_col
                unique_id = col
                value_cols.append(col)
            elif request.POST.get(col) == "Time":
                sub_col = {
                    "name": col,
                    "data": [np.min(df['time']), np.max(df['time'])],
                }
                results['Time'] = sub_col
            elif request.POST.get(col) == "Event":
                sub_col = {
                    "name": col,
                    "data": dict(df[col].value_counts()),
                }
                results['Event'] = sub_col
            elif col != "value" and col not in events:
                value_cols.append(col)

        temp = df[value_cols]
        temp = temp.drop_duplicates()
        value_cols.remove(unique_id)

        for col in value_cols:
            lens = len(temp[col].unique())
            if lens <= 8:
                sub_col = {
                    "name": col,
                    "type": "pie",
                    "data": dict(temp[col].value_counts())
                }
            else:
                sub_col = {
                    "name": col,
                    "type": "bar",
                    "data": self.value_partition(temp[col])
                }

            results['Value'].append(sub_col)
        return results

    def clean_dim(self):
        conn = sqlite3.connect('dim.db')
        cur = conn.cursor()
        cur.execute("select * from sqlite_master;")
        files_list = os.listdir(data_path)

        for table in cur.fetchall():
            if table[1] not in files_list:
                cur.execute("DROP TABLE '%s';" % table[1])

