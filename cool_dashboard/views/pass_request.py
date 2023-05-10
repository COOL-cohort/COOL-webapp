import requests
import json
from ..config import *

headers = {
    'Connection': 'keep-alive',
    'Cookie': '',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.132 Safari/537.36',
    'Content-Type': 'application/json',
    'Accept': '*/*'
}

logger = logging.getLogger('django')

def pass_load(query):
    url = SERVER + '/load'
    logger.info("pass load: " + url)
    r = requests.post(url, headers=headers, data=json.dumps(query))
    return r.text