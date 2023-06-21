import os, logging

# define global variables
repo_name = "cool_storage"
data_path = "./cool_backend/%s/" % repo_name
upload_path = os.path.join(data_path, "cache")
back_data_path = "./%s/" % repo_name
back_upload_path = os.path.join(back_data_path, "cache")

SERVER = 'http://cool-backend:9998'
# SERVER = 'http://127.0.0.1:9998'
# SERVER = 'http://127.0.0.1:8080'
# SERVER = 'http://127.0.0.1:8200'

base_day = "1970-01-01 00:00:00"

if not os.path.exists(data_path):
    os.mkdir(data_path)

if not os.path.exists(upload_path):
    os.mkdir(upload_path)

fieldTypes = {
    'User ID':{
        'type': "UserKey",
        # "datatype": "String",
        "invariantField": False,
    },
    'Event':{
        'type': "Action",
        # "datatype": "String",
        "invariantField": False,
    },
    'Event Related':{
        'type': "Segment",
        # "datatype": "String",
        "invariantField": False,
    },
    'Time':{
        'type': "ActionTime",
        # "datatype": "Int",
        "invariantField": False,
    },
    'IntValue':{
        'type': "Metric",
        # "datatype": "Int",
        "invariantField": False,
    },
    'IntValue(Invariant)': {
        'type': "Metric",
        # "datatype": "Int",
        "invariantField": True,
    },
    'FloatValue': {
        'type': "Float",
        # "datatype": "Float",
        "invariantField": False,
    },
    'FloatValue(Invariant)': {
        'type': "Float",
        # "datatype": "Float",
        "invariantField": True,
    },
    'String':{
        'type': "Segment",
        # "datatype": "String",
        "invariantField": False,

    },
    'String(Invariant)': {
        'type': "Segment",
        # "datatype": "String",
        "invariantField": True,
    },
}

Functions = {
    "DISTINCT": "DISTINCT",
    "COUNT": "COUNT",
    "MIN": "MIN",
    "MAX": "MAX",
    # "SUM": "SUM",
    "AVERAGE": "AVERAGE",
}

true=True

QUERY = {
    "birthSelector": {
        "birthEvents": [
            {
                "filters": [
                    {
                        "fieldSchema": "prescribe",
                        "type": "SET",
                        "acceptValue": [
                            "Medicine-A"
                        ]
                    }
                ],
                "frequency": 1
            }
        ]
    },
    "outputCohort": "all",
    "dataSource": "20230615161708C0H2dfUQ",
    "queryName": "demo",
    "inputCohort": "test/all.cohort",
    "cohortSelector": {
        "fieldSchema": "birthyear",
        "type": "RANGE",
        "min": 1950,
        "max": 2000,
        "interval": 10
    },
    "saveCohort": True,
    "valueSelector": {
        "filters": [
            {
                "fieldSchema": "labtest",
                "type": "SET",
                "acceptValue": [
                    "Labtest-C"
                ]
            },
            {
                "fieldSchema": "value",
                "type": "RANGE",
                "acceptValue": [
                    "MIN to MAX"
                ]
            }
        ],
        "observedSchema": [
            "id",
            "value"
        ]
    },
    "ageSelector": {
        "unit": "DAY",
        "min": 0,
        "max": 7,
        "interval": 1
    }
}