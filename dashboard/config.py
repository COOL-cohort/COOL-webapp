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