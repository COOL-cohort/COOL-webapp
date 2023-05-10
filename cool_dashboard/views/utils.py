from django.http import JsonResponse
import random
from datetime import datetime
import string
import pandas as pd
from .pass_request import pass_load

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

        with open(upload_path + file_save + ".csv", 'r') as f:
            title = f.readline()

        # columns = str(title, 'utf-8')[:-1].split(",")
        columns = title[:-1].split(",")
        logger.info(columns)

        rawdata = pd.read_csv(upload_path + file_save + ".csv")
        columns = list(rawdata.columns)
        column_types = rawdata.dtypes.to_dict()

        result = {}
        for col in columns:
            low_col = col.lower().strip()
            if low_col[-2:] == 'id':
                result[col] = "User ID"
            elif low_col[-4:] == 'time':
                result[col] = "Time"
            elif "event" in low_col and str(column_types[low_col]) == 'object':
                result[col] = "Event"
                event_related = list(rawdata[low_col].unique())
            elif str(column_types[low_col]) == 'object':
                result[col] = "String"
            else:
                result[col] = "Value"

        for col in event_related:
            result[col] = "Event Related"

        res = {}
        res['columns'] = columns
        res['filename'] = file_save
        res['setname'] = request.POST['dataset_name']
        res['details'] = request.POST['dataset_details']
        res['col_type'] = result
        res['types'] = list(fieldTypes.keys())
        return JsonResponse(res)


def test_request(request):
    query = {
        "dataFileType": "CSV",
        "cubeName": "health_raw",
        "schemaPath": "datasets/health_raw/table.yaml",
        "dataPath": "datasets/health_raw/data.csv",
        "outputPath": "%s/%s"%(data_path, "20230504153543eTQCiLZ3")
    }
    out = pass_load(query)
    logger.info(out)
    return JsonResponse({"test": 123})
