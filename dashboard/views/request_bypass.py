import logging
import requests
import re
import json

SERVER = 'http://cool-backend:9998'

logger = logging.getLogger('django')

def pass_reload(datasource, server=SERVER):
    headers = { \
            'Connection':'keep-alive', \
            'Cookie':'', \
            'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.132 Safari/537.36', \
            'Content-Type':'application/json', \
            'Accept' :'*/*'
            }
    url = server+'/v1/reload?cube='+datasource
    logger.info("pass reload: " + url)
    r = requests.get(server+'/v1/reload?cube='+datasource, headers = headers)
    return json.loads(r.text)

def pass_request(query, server=SERVER):
    headers = { \
            'Connection':'keep-alive', \
            'Cookie':'', \
            'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.132 Safari/537.36', \
            'Content-Type':'application/json', \
            'Accept' :'*/*'
            }
    url = server+'/v1/cohort/analysis'
    logger.info("pass request: " + url)
    logger.info("pass request: " + json.dumps(query))
    r = requests.post(server+'/v1/cohort/analysis',data = json.dumps(query), headers = headers)
    # logger.info(r.text)
    return json.loads(r.text)

def pass_create_request(query, server=SERVER):
    headers = { \
            'Connection':'keep-alive', \
            'Cookie':'', \
            'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.132 Safari/537.36', \
            'Content-Type':'application/json', \
            'Accept' :'*/*'
            }
    url = server+'/v1/cohort/manage/create'
    logger.info("pass create request: " + url)
    logger.info("pass create request data:" + json.dumps(query))
    r = requests.post(server+'/v1/cohort/manage/create', data = json.dumps(query), headers = headers)
    # logger.info("pass create response:" + r.text)
    return json.loads(r.text)

def removeCohort(cohort, server=SERVER):
    url = server+'/v1/cohort/manage/remove/' + cohort
    logger.info("Remove cohort: "+url)
    r = requests.get(url)
    return r.status_code


import numpy as np
def get_plotdata_chart(result):
    rawResult = result[u'result']
    col = []
    data = {}
    series = []
    heat = []

    for r in rawResult:
        cohort = r['cohort'][1:-1]
        if cohort not in col:
            col.append(cohort)
            data[cohort] = []

    for r in rawResult:
        cohort = r['cohort'][1:-1]
        if cohort in col:
            age = r[u'age']
            pair = []
            pair.append(age)
            pair.append(r[u'measure'])
            pair.append(r[u'max'])
            pair.append(r[u'min'])
            if float(r[u'num']) == 0.:
                pair.append(0.0)
            else:
                pair.append(float(r[u'sum']) / r[u'num'])
            pair.append(r[u'num'])
            data[cohort].append(pair)

    range_dict = {}
    range_dict['series'] = []
    range_dict['cols'] = []
    for cohort in col:
        line = {}
        line['name'] = cohort
        line['type'] = 'line'
        line['data'] = np.array(data[cohort])[:, :2].astype(int).tolist()
        series.append(line)
        index = col.index(cohort)
        data0 = sorted(data[cohort], key=lambda x: x[0])

        for x in data0:
            heat.append([x[0], index, int((x[1] + 1e-10) / (data0[0][1] + 1e-10) * 100)])

        range_dict['cols'].append("%s_max" % (cohort))
        tem = {}
        tem['name'] = "%s_max" % (cohort)
        tem['type'] = "custom"
        tem['data'] = [[x[0], x[2], round(x[4], 2)] for x in data0]
        range_dict['series'].append(tem)

        range_dict['cols'].append("%s_min" % (cohort))
        tem = {}
        tem['name'] = "%s_min" % (cohort)
        tem['type'] = "custom"
        tem['data'] = [[x[0], x[3], round(x[4], 2)] for x in data0]
        range_dict['series'].append(tem)

        range_dict['cols'].append("%s_%s" % (cohort, "avg"))
        tem = {}
        tem['name'] = "%s_avg" % (cohort)
        tem['type'] = "line"
        tem['data'] = [[x[0], round(x[4], 2)] for x in data0]
        range_dict['series'].append(tem)

    ret = {'values': series, 'columes': col, 'heatmap': heat, 'range': range_dict}
    return ret