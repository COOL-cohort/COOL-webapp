from django.shortcuts       import render, redirect
from django.views           import View

from dashboard.models import *
import shutil, os, yaml

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
upload_path = "upload/"
data_path = "cohana/"

def strTotime(name):
    return name[:4] + "/" + name[4:6] + "/" + name[6:8] + " " + name[8:10] + ":" + name[10:12] + ":" + name[12:14]

class Database(View):
    def get(self, request):
        result = {}
        files = csv_file.objects.filter(user_id=request.user.id)
        if files.exists():
            result['files'] = {}
            for index, file in enumerate(files):
                result['files'][index] = {
                    "index": index + 1,
                    "file_name": file.file_name,
                    "file_save": file.file_save,
                    "num_ids": file.num_ids,
                    "num_records": file.num_records,
                    "involved_dates": file.involved_dates,
                    "file_date": strTotime(file.file_save),
                    "file_size": file.file_size,
                }
        return render(request, "database.html", result)

    def post( self,request ):
        file_operation = request.POST.get('file_operation')
        file_save = request.POST.get('file_save')

        if file_operation == "delete":
            if csv_file.objects.filter(file_save=file_save).exists():
                csv_file.objects.filter(file_save=file_save).delete()
                if os.path.exists(data_path + file_save):
                    shutil.rmtree(data_path + file_save)
                if os.path.exists(upload_path + file_save + ".csv"):
                    os.remove(upload_path + file_save + ".csv")

            return redirect("/database")
        else:
            request.session['file_save'] = file_save

            columns = []
            with open(data_path + '/%s/table.yaml' % file_save, 'r') as f:
                data = yaml.load(f.read())
                for col in data['fields']:
                    columns.append(col['name'])

            request.session['columns'] = columns

            return redirect('/figure_design/')