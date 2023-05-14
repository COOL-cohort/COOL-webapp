import os, logging

# define global variables
upload_path = "./cache/"
repo_name = "cool_storage"
data_path = "./cool_backend/%s/" % repo_name
back_data_path = "./%s/" % repo_name

# SERVER = 'http://cool-backend:9998'
SERVER = 'http://127.0.0.1:8080'

base_day = "1970-01-01 00:00:00"

if not os.path.exists(upload_path):
    os.mkdir(upload_path)

# if not os.path.exists(data_path):
#     os.mkdir(data_path)

fieldTypes = {
    'User ID':{
        'type': "UserKey",
        "datatype": "String",
        "invariantField": False,
    },
    'Event':{
        'type': "Action",
        "datatype": "String",
        "invariantField": False,
    },
    'Event Related':{
        'type': "Segment",
        "datatype": "String",
        "invariantField": False,
    },
    'Time':{
        'type': "ActionTime",
        "datatype": "Int32",
        "invariantField": False,
    },
    'Value':{
        'type': "Metric",
        "datatype": "Int32",
        "invariantField": False,
    },
    'Value(Invariant)': {
        'type': "Metric",
        "datatype": "Int32",
        "invariantField": True,
    },
    'String':{
        'type': "Segment",
        "datatype": "String",
        "invariantField": False,

    },
    'String(Invariant)': {
        'type': "Segment",
        "datatype": "String",
        "invariantField": True,
    },
}