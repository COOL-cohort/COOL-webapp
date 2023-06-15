import datetime
import os

import numpy as np
import copy
import yaml
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views import View
from django.shortcuts import render, redirect
from django.forms.models import model_to_dict
from .pass_request import *

from ..config import *
from ..models import Dataset, Cohort, Query
import time

logger = logging.getLogger('django')

class CohortAnalysis(View):
    def get(self, request, set_id):
        context = {}
        cube = Dataset.objects.filter(user_id=request.user.id, set_id=set_id)
        # cube.values()
        if not cube.exists():
            return render(request, "error-500.html", {'error': "Could not find the dataset under this account."})
        cube = cube[0]
        # logger.info(cube)

        tableYaml = os.path.join(data_path, str(cube.cube_name), "table.yaml")
        # logger.info(yaml.load(open(tableYaml), Loader=yaml.Loader))
        if os.path.exists(tableYaml):
            tableYaml = yaml.load(open(tableYaml), Loader=yaml.Loader)
            context['tableYaml'] = tableYaml['fields']

        context['set_id'] = cube.set_id
        context['set_name'] = cube.set_name
        context['set_size'] = cube.cube_size
        context['set_records'] = cube.num_records
        context['set_ids'] = cube.num_ids
        context['set_details'] = cube.set_details

        context['set_info'] = model_to_dict(cube)
        context['set_info'].pop('set_id')
        context['set_info'].pop('user_id')
        context['set_info'].pop('cube_size')

        return render(request, "cohort-analysis.html", context)

    def post(self, request, set_id):
        res = {}
        logger.info(request.POST)
        user = User.objects.get(id=request.user.id)
        cube = Dataset.objects.get(user_id=request.user.id, set_id=set_id)
        assert request.POST['mode'] == 'CohortAnalysis'
        query = request.POST['query']
        query = json.loads(query)
        # query = QUERY

        if query['queryName'] in list(Query.objects.filter(user_id=user, set_id=cube).values_list('query_name', flat=True)):
            res["status_code"] = 500
            res['text'] = "[x] Query name is already used in the system: %s" % query['queryName']
            return JsonResponse(res, safe=False)

        save_flag = query.pop('saveQuery')
        demoYaml = os.path.join(data_path, cube.cube_name, "demographic.yaml")
        if os.path.exists(demoYaml):
            demoYaml = yaml.load(open(demoYaml), Loader=yaml.Loader)
        else:
            raise FileNotFoundError("[*] Could not found the demographic yaml file.")

        start = time.time()
        # funcs = query['valueSelector']['function']
        # funcs = sorted(funcs)
        # funcs = ['AVERAGE','MIN','MAX','DISTINCT']
        out_data = {}
        observedSchema = query['valueSelector']['observedSchema']
        logger.info(query)
        for obs in observedSchema:
            results = {}
            new_q = copy.deepcopy(query)
            new_q['valueSelector']['observedSchema'] = obs
            if obs in demoYaml['Float'] or obs in demoYaml['Metric']:
                for func in ['AVERAGE','MIN','MAX']:
                    new_q['valueSelector']['function'] = func
                    out = pass_cohort_analysis(new_q)
                    res["status_code"] = out.status_code
                    res['text'] = out.text
                    if out.status_code != 200:
                        return JsonResponse(res, safe=False)
                    else:
                        results[func] = json.loads(out.text)
            elif obs in demoYaml['UserKey']:
                for func in ['DISTINCT']:
                    new_q['valueSelector']['function'] = func
                    out = pass_cohort_analysis(new_q)
                    res["status_code"] = out.status_code
                    res['text'] = out.text
                    if out.status_code != 200:
                        return JsonResponse(res, safe=False)
                    else:
                        results[func] = json.loads(out.text)
            out_data[obs] = transfer_plot_data(results, query['queryName'], obs)
        exe_time = time.time()-start
        res['text'] = out_data
        # logger.info(out_data)
        # logger.info(res)

        if save_flag:
            q = Query(
                user_id=user,
                set_id=cube,
                query_name=query['queryName'],
                query_mode='CA',
                exe_time=exe_time,
            )
            q.save()

            out = pass_get_version({'cube': cube.cube_name})
            version = eval(out.text)
            save_path = os.path.join(data_path, cube.cube_name, version[-1], 'cohort', query['queryName'])

            f = open(os.path.join(save_path,'query_chart.json'), 'w')
            f.write(json.dumps(out_data))
            f.close()



        #
        # if query['saveCohort']:
        #     for c in res['text']['cohortResList']:
        #         cohort = Cohort(
        #             user_id=user,
        #             set_id=cube,
        #             cohort_size=c['cohortSize'],
        #             cohort_name=c['cohortName'],
        #             query_id=q,
        #         )
        #         cohort.save()
        return JsonResponse(res, safe=False)


def transfer_plot_data(indata, title, obs):
    out = {}
    # out['types'] = list(indata.keys())
    for key, value in indata.items():
        if key in ['DISTINCT', 'COUNT']:
            line_chart = {
                "title": "Query:%s Feature:%s line-chart " % (title, obs),
                "legend": list(value['results'].keys()),
                "xdata": np.arange(value['format']['min'], value['format']['max']+1, value['format']['interval']).tolist(),
                'size': value['format']['size'],
                "series": []
            }
            for ck, cv in value['results'].items():
                line_chart['series'].append({
                    "name": ck,
                    'type': 'line',
                    'data': [[i, cv[i]] for i in range(line_chart['size'])],
                    'label': {"show": True}
                })

            heat_chart = {
                "title": "Query:%s Feature:%s heatmap " % (title, obs),
                "legend": list(value['results'].keys()),
                "xdata": np.arange(value['format']['min'], value['format']['max']+1, value['format']['interval']).tolist(),
                "series": []
            }
            for ck, cv in value['results'].items():
                for t_idx in heat_chart['xdata']:
                    if t_idx == 0:
                        base = cv[0]*1.
                        heat_chart['series'].append([t_idx, ck, "%.2f"%100.])
                    else:
                        heat_chart['series'].append([t_idx, ck, "%.2f"%(cv[t_idx]/base*100.)])

            out[key] = {
                "line": line_chart,
                "heat": heat_chart
            }
        elif key in ['MIN', 'MAX', 'AVERAGE']:
            if key == "MIN":
                pat = 'min'
            elif key == 'MAX':
                pat = 'max'
            else:
                pat = 'avg'
            legend = list(value['results'].keys())
            legend = ["%s_%s"%(legend[i], pat) for i in range(len(legend))]

            if 'RANGE' not in out.keys():
                out['RANGE'] = {
                    "title": "Query:%s Feature:%s line-chart " % (title, obs),
                    "legend": legend,
                    "xdata": np.arange(value['format']['min'], value['format']['max']+1, value['format']['interval']).tolist(),
                    'size': value['format']['size'],
                    "series": []
                }
            else:
                out['RANGE']['legend'].extend(legend)

            if key == 'AVERAGE':
                for ck, cv in value['results'].items():
                    out['RANGE']['series'].append({
                        "type": "line",
                        "name": "%s_avg"%ck,
                        "data": [[i, cv[i]] for i in range(out['RANGE']['size'])],
                        "label": {"show":True}
                    })
            else:
                for ck, cv in value['results'].items():
                    cdata = []
                    if 'AVERAGE' in indata.keys():
                        for i in range(out['RANGE']['size']):
                            cdata.append([i, cv[i], indata['AVERAGE']['results'][ck][i]])
                    else:
                        for i in range(out['RANGE']['size']):
                            cdata.append([i, cv[i], None])

                    out['RANGE']['series'].append({
                        "type": "custom",
                        "name": "%s_min"%ck if key=='MIN' else "%s_max"%ck,
                        "data": cdata,
                        "z": 3,
                    })
    return out