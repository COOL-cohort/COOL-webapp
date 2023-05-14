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
        logger.info(request.POST['dataset_name'])
        logger.info(request.POST['dataset_details'])
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
        logger.info(columns)
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


def test_request(request):
    # query = {
    #     "dataFileType": "CSV",
    #     "cubeName": "20230504153543eTQCiLZ3",
    #     # "schemaPath": "/Users/peng/Documents/codeRepo/KimballCai/COOL-engine/datasets/health_raw/table.yaml",
    #     "schemaPath": "/Users/peng/Documents/codeRepo/KimballCai/COOL-engine/datasets/health_raw/error_table.yaml",
    #     "dataPath": "/Users/peng/Documents/codeRepo/KimballCai/COOL-engine/datasets/health_raw/data.csv",
    #     "outputPath": "./%s/" % repo_name
    # }

    query = {'dataFileType': 'CSV', 'cubeName': '20230514144609aART2H1o',
             'schemaPath': './cool_storage/20230514144609aART2H1o/table.yaml',
             # "schemaPath": "/Users/peng/Documents/codeRepo/KimballCai/COOL-webapp/sample_data/example-table.yaml",
             # 'dataPath': '.././cache/20230514144609aART2H1o.csv',
             # 'dataPath': '/Users/peng/Documents/codeRepo/KimballCai/COOL-webapp/sample_data/example2.csv',
             "dataPath": "/Users/peng/Documents/codeRepo/KimballCai/COOL-engine/datasets/health_raw/data.csv",
             'outputPath': './cool_storage/'}
    out = pass_load(query)

    # query = {
    #     "cube": "20230504153543eTQCiLZ3",
    #     "col": "birthyear",
    # }
    # out = pass_read_col(query)

    logger.info(out)
    logger.info(out.text)
    logger.info(out.status_code)
    return JsonResponse({"query": query})


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