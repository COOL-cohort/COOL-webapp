from django.views           import View
from django.http            import HttpResponse
import json
import sys
import traceback
import sqlite3

PAGE_LENGTH = 10

class Dim( View ):

    def get(self, request):

        table = request.session['file_save']
        
        col = request.GET.get("col", "")
        response = {}
        try:
            conn = sqlite3.connect('dim.db')
            c = conn.cursor()
            if col != "":
                term = request.GET.get("term", "")
                if term == "":
                    index = request.GET.get("page", "1")
                    limit = PAGE_LENGTH
                    offset = int(index)*PAGE_LENGTH-PAGE_LENGTH
                    data = []
                    for row in c.execute('SELECT value FROM "%s" WHERE col="%s" ORDER BY col DESC LIMIT %d OFFSET %d;' 
                        % (table, col, limit, offset)):
                        data.append(row[0])
                    response['results'] = data
                    response['pagination'] = {}

                    if len(data) < PAGE_LENGTH:
                        response['pagination']['more'] = "false"
                    else:
                        # check if there is a next page
                        nextoffset = (int(index)+1)*PAGE_LENGTH-PAGE_LENGTH
                        c.execute('SELECT value FROM "%s" WHERE col="%s" ORDER BY col DESC LIMIT %d OFFSET %d;' 
                            % (table, col, limit, nextoffset))
                        response['pagination']['more'] = "true" if len(c.fetchall()) > 0 else "false"
                else:
                    data = []
                    for row in c.execute('SELECT value FROM "%s" WHERE col="%s" AND value LIKE "%\%s%" ORDER BY col DESC LIMIT 100' % (table, col, term)):
                        data.append(row[0])
                    response['results'] = data
                    response['pagination'] = {}
                    response['pagination']['more'] = "false"


                response['message'] = "OK"
                return HttpResponse(json.dumps(response))
            else:
                response['code'] = 500
                response['message'] = "Empty Colume Name"
                return HttpResponse(json.dumps(response))
        except Exception as e:
            exc_info = sys.exc_info()
            traceback.print_exception(*exc_info)
            response['code'] = 500
            response['message'] = "Internal Error: " + str(e)
            return HttpResponse(json.dumps(response))
