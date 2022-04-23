import yaml
import csv
import pandas as pd
from time import time
import io
import sqlite3


class preprocessor():
    def __init__(self, file_name):
        self.file_name = file_name
        self.output_path = "./cool_storage/%s" % file_name
        self.input_file_path = self.output_path + "/data.csv"

        self.yaml_input = self.output_path + "/table.yaml"
        self.dim_output = self.output_path + "/dim.csv"

        t0 = time()
        print("Preprocessing Started")
        self.simpleRead()
        self.create_dim()
        print("Preprocessing Finished in " + str(time() - t0))


    def simpleRead(self):
        rawdata = pd.read_csv(self.input_file_path)
        rawdata.fillna("null", inplace=True)
        # rawdata.to_csv(raw_output, header=False, index=False)
        # print("raw save finished")
        spec = {}
        with open(self.yaml_input, 'r') as stream:
            try:
                spec = yaml.load(stream)
            except yaml.YAMLError as exc:
                print(exc)

        with open(self.dim_output, 'w') as csvfile:
            dimwriter = csv.writer(csvfile)
            for field in spec['fields']:
                if field['dataType'] == 'String':
                    for key in rawdata[field['name']].astype('str').unique():
                        try:
                            dimwriter.writerow([field['name'], key])
                        except Exception:
                            pass

                elif field['fieldType'] == 'ActionTime':
                    dimwriter.writerow(
                        [field['name'], str(rawdata[field['name']].min()) + '|' + str(rawdata[field['name']].max())])
                elif field['dataType'] == 'Int32':
                    dimwriter.writerow([field['name'], str(int(rawdata[field['name']].min())) + '|' + str(
                        int(rawdata[field['name']].max()))])
                else:
                    pass

    def create_dim(self):
        table = self.file_name
        conn = None
        print('creating dim...')
        try:
            conn = sqlite3.connect('dim.db')
            c = conn.cursor()

            sql = 'select name from sqlite_master where type = "table" and name = "%s";' % table
            if all(t[0] != table for t in c.execute(sql)):
                sql = 'create table "%s" (col VARCHAR(200), value VARCHAR(200));' % table
                c.execute(sql)
                print('table "%s" created' % table)
            else:
                sql = 'delete from "%s"' % table
                c.execute(sql)
                print('table "%s" deleted' % table)

            insert_sql = 'INSERT INTO "%s" (col, value) VALUES ' % table
            sql = insert_sql
            i = 0
            with io.open(self.dim_output) as ifile:
                while ifile.readable():
                    line = ifile.readline().strip('\n').split(',')
                    if len(line) < 2:
                        break
                    sql += '("%s", "%s"),' % (line[0], line[1])
                    i += 1
                    if i == 200:
                        c.execute(sql.rstrip(',') + ';')
                        sql = insert_sql
                        i = 0
            c.execute(sql.rstrip(',') + ';')
            print('value inserted')

            conn.commit()
            conn.close()

        except Exception as e:
            conn.close()
            raise e

