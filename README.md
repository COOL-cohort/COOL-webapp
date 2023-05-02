 
<h1 align="center">COOL for COVID19 Demo App

  <p align="center"><a href="https://www.comp.nus.edu.sg/~dbsystem/cool/#/"><img src="https://www.comp.nus.edu.sg/~dbsystem/cool/cool_banner.png" alt="Cool" class="center"></a></p>
</h1>

# Introduction
COOL is a cohort online analytical processing system that processes both cohort queries and conventional OLAP queries with superb performance.  

As an integrated system with the support of several newly proposed operators on top of a sophisticated storage layer, it processes both cohort queries and conventional OLAP queries with superb performance.  

For more information, you can refer to the [paper](https://www.comp.nus.edu.sg/~ooibc/icde20cool.pdf).

In this project, COOL is applied to Covid19 analysis and we also provide a demo video [here](https://www.comp.nus.edu.sg/~dbsystem/cool/#/demo).

# Set up
* Docker is required to set up the application's dependencies and can be installed [here](https://www.docker.com/get-started).


# Quick Start
You can get the application up and running on your local dev environment with these steps 
* Change current working directory to project directory
* Pre-install the docker environment first, by building and running the required docker containers
```
sh docker.sh start
```
* restart the containers of the COOL system
```
sh docker.sh restart
```
* Stop the containers of the COOL system
```
sh docker.sh stop
```
* clean the containers and images of the COOL system
```
sh docker.sh clean
```
* manually load docker (if you are running offline). [download](https://www.dropbox.com/sh/pvkrychaf29nebc/AADdjOFhpPFoCwPS9N01rwOGa?dl=0)
```
docker load --input cool-front.zip
docker load --input cool-backend.zip
```

* The application is now running at `http://127.0.0.1:8201/`

* For an example user login, use the following details
```
User ID: admin
Password: 123456
```

# Requirements for uploaded datasets:

1. CSV file with "," as delimiter (typically dumped from a database table)

2. Preferably includes `id`, `time`, `event`,`value`,`time` columns, appropriately named

3. The columns of events in the dataset should match to elements in the `event` column  

4. `time` column should follow "YYYY-MM-DD" format

5. All of the demographic columns (such as age, gender, race) should be corresponding to the `value` attributes.

6. `Value` Columns only accept integer (Int32) values. 

6. Fill the columns of events with `None`

7. Remove all the events with no `value`

* Example dataset: [here](example/example.csv).  
* Example video: [here](https://www.comp.nus.edu.sg/~dbsystem/cool/#/demo).


# Directory Descriptions

* __cool_backend__ & __cool_front__:
These two directories contain settings of dockers for the COOL system.
* __cool_dashboard__:
The ```cool_dashboard``` directory contains settings for Django server.
* __dashboard__:
The ```dashboard``` directory contains the Main Django Application.

# Dataset Preparation
## Table.yaml

This section describes the schema of the dataset used in data compacting and query processing.

* Example file: [here](/example/example-table.yaml).


### For data compacting

When compacting data, "table.yaml" defines the exact schema of the dataset:

> For column i of the dataset, the i-th entry of the schema file describes the meta-data of the column

Each entry has three attributes, i.e., name, fieldType and dataType.

1. The name attribute is a unique string representing the respective column names.

2. For fieldType attribute, there are five possible values: "UserKey", "Action", "ActionTime", "Segment" and "Metric".

    * "UserKey", "Action" and "ActionTime" indicates that the respective column contains the user id, event and event time. These three columns jointly compose the primary key of the dataset, and must be preesnt in the dataset.
    
    * "Segment" indicates that the respective column contains String values.
    
    * "Metric" indicates that the respective column contains Int32 values.

3. The dataType attribute only has two possible values: String or Int32.

>Note: ActionTime is treated as Int32, althought it may follow a timestamp format.  

### For query processing

Users can add more entries (used as cohort selection attributes in the query processing) to "table.yaml".

Each entry defines an aggregate function and hence, has two additional attributes, "baseField" and "aggregator" apart from those defined in the original schema file.  

* "name" is specified by user and should be different from the name of other entries.

* "fieldType" and "dataType" of such entries are fixed and take the value of Metric and Aggregate, respectively.

* "baseField" indicates which column of the original schema will be aggregated and takes the name attribute of the that column as its value.

* "aggregator" indicates the aggregate function to apply. For now, it can be **RETENTION**. More aggregate functions are being developed.
  

## Cube.yaml

For cube.yaml, there are two parts: dimensions and measures.

For now, dimensions is not used and can be omitted.

For each entry in the measures part, it contains three attributes: "aggregator", "name" and "tableFieldName".

* "aggregator" and "name" has the same meaning as the schema file Table.yaml

* "tableFieldName" is the same as the baseField attribute of the schema file. The entries of the measures part provides the metrics that can be specified in cohort queries.  

* Example file: [here](/example/example-cube.yaml).

# Literature References

* [1] Z. Xie, H. Ying, C. Yue, M. Zhang, G. Chen, B. C. Ooi. [Cool: a COhort OnLine analytical processing system](https://www.comp.nus.edu.sg/~ooibc/icde20cool.pdf) IEEE International Conference on Data Engineering, 2020
* [2] Q. Cai, Z. Xie, M. Zhang, G. Chen, H.V. Jagadish and B.C. Ooi. [Effective Temporal Dependence Discovery in Time Series Data](http://www.comp.nus.edu.sg/~ooibc/cohana18.pdf) International Conference on Very Large Data Bases (VLDB), 2018
* [3] Z. Xie, Q. Cai, F. He, G.Y. Ooi, W. Huang, B.C. Ooi. [Cohort Analysis with Ease](https://dl.acm.org/doi/10.1145/3183713.3193540) SIGMOD Proceedings of the 2018 International Conference on Management of Data
* [4] D. Jiang, Q. Cai, G. Chen, H. V. Jagadish, B. C. Ooi, K.-L. Tan, and A. K. H. Tung. [Cohort Query Processing](http://www.vldb.org/pvldb/vol10/p1-ooi.pdf) International Conference on Very Large Data Bases (VLDB), 2016

# Contact

* Dr Zhongle Xie (backend): zhongle@comp.nus.edu.sg.
* Dr Qingpeng Cai (frontend): qingpeng@comp.nus.edu.sg
