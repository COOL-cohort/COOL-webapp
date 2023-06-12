import os
import yaml

from django.http import JsonResponse
import random
from datetime import datetime
import string
import pandas as pd
from ..models import User, upload_history
from .pass_request import *

from ..config import *

logger = logging.getLogger('django')


def get_FileSize(filePath):
    fsize = os.path.getsize(str(filePath))
    fsize = fsize/float(1024*1024)
    return round(fsize,2)

def analyze_columns(request):
    if request.method == 'POST':
        # logger.info(request.POST['dataset_name'])
        # logger.info(request.POST['dataset_details'])
        file = request.FILES.get('csv_file')

        # get the new file name
        rand_str = ''.join(random.sample(string.ascii_letters + string.digits, 8))
        file_save = datetime.now().strftime('%Y%m%d%H%M%S') + rand_str

        # load new file
        f = open(upload_path + file_save + ".csv", 'wb')
        for chunk in file.chunks():
            f.write(chunk)
        f.close()

        user = User.objects.get(id=request.user.id)
        upload_history.objects.create(user_id=user, file_save=file_save)

        with open(upload_path + file_save + ".csv", 'r') as f:
            title = f.readline()

        # columns = str(title, 'utf-8')[:-1].split(",")
        columns = title[:-1].split(",")
        # logger.info(columns)
        request.session['columns'] = columns

        rawdata = pd.read_csv(upload_path + file_save + ".csv")
        columns = list(rawdata.columns)
        column_types = rawdata.dtypes.to_dict()

        col_types = {}
        for col in columns:
            low_col = col.lower().strip()
            if low_col[-2:] == 'id':
                col_types[col] = "User ID"
            elif low_col[-4:] == 'time':
                col_types[col] = "Time"
            elif "event" in low_col and str(column_types[low_col]) == 'object':
                col_types[col] = "Event"
                event_related = list(rawdata[low_col].unique())
            elif str(column_types[low_col]) == 'object':
                col_types[col] = "String"
            else:
                col_types[col] = "Value"

        for col in event_related:
            col_types[col] = "Event Related"

        res = {}
        res['columns'] = columns
        res['filename'] = file_save
        res['setname'] = request.POST['dataset_name']
        res['details'] = request.POST['dataset_details']
        res['col_type'] = col_types
        res['size'] = len(rawdata)
        res['types'] = list(fieldTypes.keys())
        return JsonResponse(res)


def return_measures(request):
    if request.method == 'POST':
        cube_id = request.POST['cube_id']
        # logger.info(cube_id)

        demoYaml = os.path.join(data_path, cube_id, "demographic.yaml")
        if os.path.exists(demoYaml):
            demoYaml = yaml.load(open(demoYaml), Loader=yaml.Loader)
        else:
            raise FileNotFoundError("[*] Could not found the demographic yaml file.")
        # logger.info(demoYaml)
        res = []
        for key in demoYaml['UserKey']:
            name = demoYaml['Details'][key]['name']
            res.append({"id": name, "text": name})
        logger.info(res)
        return JsonResponse(res, safe=False)

def return_groupby(request):
    if request.method == 'POST':
        cube_id = request.POST['cube_id']
        # logger.info(cube_id)

        demoYaml = os.path.join(data_path, cube_id, "demographic.yaml")
        if os.path.exists(demoYaml):
            demoYaml = yaml.load(open(demoYaml), Loader=yaml.Loader)
        else:
            raise FileNotFoundError("[*] Could not found the demographic yaml file.")
        # logger.info(demoYaml)
        res = []
        for i in range(len(demoYaml['Fields'])):
            if demoYaml['Details'][i]['invariant']:
                res.append({"id": i, "text": demoYaml['Details'][i]['name']})
        # logger.info(res)
        return JsonResponse(res, safe=False)


def return_fileds(request):
    if request.method == 'POST':
        cube_id = request.POST['cube_id']
        logger.info(cube_id)

        demoYaml = os.path.join(data_path, cube_id, "demographic.yaml")
        if os.path.exists(demoYaml):
            demoYaml = yaml.load(open(demoYaml), Loader=yaml.Loader)
        else:
            raise FileNotFoundError("[*] Could not found the demographic yaml file.")

        # logger.info(demoYaml)
        res = []
        for i, field in enumerate(demoYaml['Fields']):
            if demoYaml['Details'][i]['type'] in ['UserKey', 'ActionTime']:
                continue
            if demoYaml['Details'][i]['invariant']:
                continue
            res.append({"id": i, "text": field})
        # logger.info(res)
        return JsonResponse(res, safe=False)

def return_field_detail(request):
    if request.method == 'POST':
        cube_id = request.POST['cube_id']
        field_id = int(request.POST['field_id'])
        logger.info(cube_id)

        demoYaml = os.path.join(data_path, cube_id, "demographic.yaml")
        if os.path.exists(demoYaml):
            demoYaml = yaml.load(open(demoYaml), Loader=yaml.Loader)
        else:
            raise FileNotFoundError("[*] Could not found the demographic yaml file.")

        # logger.info(demoYaml)
        field_type = demoYaml['Details'][field_id]['type']

        if field_type in ["Segment", "Action"]:
            res = []
            for i, value in enumerate(demoYaml['Details'][field_id]['values']):
                res.append({"id": value, "text": value})

        # logger.info(res)
        return JsonResponse(res, safe=False)

def test_request(request):
    ## test load query
    # query = {
    #     "dataFileType": "CSV",
    #     "cubeName": "20230504153543eTQCiLZ3",
    #     # "schemaPath": "/Users/peng/Documents/codeRepo/KimballCai/COOL-engine/datasets/health_raw/table.yaml",
    #     "schemaPath": "/Users/peng/Documents/codeRepo/KimballCai/COOL-engine/datasets/health_raw/error_table.yaml",
    #     "dataPath": "/Users/peng/Documents/codeRepo/KimballCai/COOL-engine/datasets/health_raw/data.csv",
    #     "outputPath": "./%s/" % repo_name
    # }
    # query = {'dataFileType': 'CSV', 'cubeName': '20230514144609aART2H1o',
    #          'schemaPath': './cool_storage/20230514144609aART2H1o/table.yaml',
    #          # "schemaPath": "/Users/peng/Documents/codeRepo/KimballCai/COOL-webapp/sample_data/example-table.yaml",
    #          # 'dataPath': '.././cache/20230514144609aART2H1o.csv',
    #          # 'dataPath': '/Users/peng/Documents/codeRepo/KimballCai/COOL-webapp/sample_data/example2.csv',
    #          "dataPath": "/Users/peng/Documents/codeRepo/KimballCai/COOL-engine/datasets/health_raw/data.csv",
    #          'outputPath': './cool_storage/'}
    # out = pass_load(query)

    ## test read col query
    # query = {
    #     "cube": "20230504153543eTQCiLZ3",
    #     "col": "birthyear",
    # }
    # out = pass_read_col(query)

    ## test pass_create_cohort
    query = {"birthSelector":{"birthEvents":[{"filters":[{"fieldSchema":"diagnose","type":"SET","acceptValue":["Disease-B"]}],"frequency":1}]},"outputCohort":"all","dataSource":"20230518202539EbwyTIsN","queryName":"test","saveCohort":True}
    out = pass_create_cohort(query)

    logger.info(out)
    logger.info(out.text)
    logger.info(out.status_code)
    return JsonResponse({"query": query,"out":out.text})


def test(request):
    import yaml
    import datetime
    def get_demo_info(cubename, fields):
        base_time = datetime.datetime.strptime(base_day, "%Y-%m-%d %H:%M:%S")
        results = {}
        for field in fields:
            query = {
                "cube": cubename,
                "col": field['name']
            }
            out = pass_read_col(query)
            # logger.info(out.text)
            out = eval(out.text)
            if out['type'] == 'UserKey':
                out['size'] = len(out['values'])
                results['UserKey'] = field['name']
            elif out['type'] == 'Segment':
                out['size'] = len(out['values'])
            elif out['type'] == 'ActionTime':
                min_day = base_time + datetime.timedelta(days=int(out['min']))
                max_day = base_time + datetime.timedelta(days=int(out['max']))
                out['start'] = min_day.strftime("%Y-%m-%d %H:%M:%S")
                out['end'] = max_day.strftime("%Y-%m-%d %H:%M:%S")
            results[field['name']] = out
        return results

    fs = open("/Users/peng/Documents/codeRepo/KimballCai/COOL-engine/datasets/health_raw/table.yaml")
    fields = yaml.load(fs, Loader=yaml.Loader)
    cubename = "20230504153543eTQCiLZ3"
    fields = fields['fields']
    results = get_demo_info(cubename, fields)
    return JsonResponse(results)