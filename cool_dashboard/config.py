import os, logging

# define global variables
upload_path = "./upload/"
repo_name = "cool_storage"
data_path = "./%s/" % repo_name

SERVER = 'http://cool-backend:9998'
# SERVER = 'http://127.0.0.1:8200'

logger = logging.getLogger('django')

if not os.path.exists(upload_path):
    os.mkdir(upload_path)

if not os.path.exists(data_path):
    os.mkdir(data_path)

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