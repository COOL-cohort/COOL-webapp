'use strict';


$(document).ready(function () {
    $("#loading").show();
    get_query_data();
    show_results();
    $('#cohort-query')[0].scrollIntoView()
})


function get_query_data() {
    let formdata = new FormData();
    formdata.append('csrfmiddlewaretoken', $('[name="csrfmiddlewaretoken"]').val());
    $.ajax({
        type: "GET",
        dataType: 'json',
        processData: false,
        contentType: false,
        delay: 250,
        data: formdata,
        async: false,
        url: "/return_query/" + queryID + '/',
        success: function (response) {
            // console.log(response)
            if (response.code == 200) {
                var query = response.text
                // show_query_data
                document.getElementById("generateQuery").innerHTML = JSON.stringify(query, null, 4)
                // console.log(query)
            } else {
                alert("Errors: " + response.text);
            }
        },
        error: function (response) {
            alert("Invalid Query: " + response.text);
        }
    })
}

function renderItem(params, api) {
    var xValue = api.value(0);
    var highPoint = api.coord([xValue, api.value(1)]);
    var lowPoint = api.coord([xValue, api.value(2)]);
    var halfWidth = 10;
    var style = api.style({
        stroke: api.visual('color'),
        fill: null
    });

    return {
        type: 'group',
        children: [
            {
                type: 'line',
                shape: {
                    x1: highPoint[0] - halfWidth, y1: highPoint[1],
                    x2: highPoint[0] + halfWidth, y2: highPoint[1]
                },
                style: style
            },
            {
                type: 'line',
                shape: {
                    x1: highPoint[0], y1: highPoint[1],
                    x2: lowPoint[0], y2: lowPoint[1]
                },
                style: style
            },
        ]
    };
}


function show_results() {
    let formdata = new FormData();
    formdata.append('csrfmiddlewaretoken', $('[name="csrfmiddlewaretoken"]').val());
    var query = "";
    $.ajax({
        type: "GET",
        dataType: 'json',
        processData: false,
        contentType: false,
        delay: 250,
        data: formdata,
        async: false,
        url: "/return_query_results/" + queryID + '/',
        success: function (response) {
            // console.log(response)
            $("#loading").hide();
            if (response.code == 200) {
                var results = response.text

                if (results.type === 'Cohort-Analysis') {
                    var option_line = {
                        title: {
                            text: ''
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'        // 'line' | 'shadow'
                            }
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataZoom: {
                                    yAxisIndex: 'none'
                                },
                                dataView: {
                                    readOnly: false
                                },
                                magicType: {
                                    type: ['line', 'bar']
                                },
                                restore: {},
                                saveAsImage: {
                                    show: true
                                }
                            }
                        },
                        legend: {
                            data: [],
                            top: "6%"
                        },
                        xAxis: {
                            data: []
                        },
                        yAxis: {},
                        series: []
                    };
                    var option_heat = {
                        title: {
                            text: ''
                        },
                        tooltip: {
                            position: 'top',
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                saveAsImage: {
                                    show: true
                                }
                            }
                        },
                        animation: false,
                        grid: {
                            height: '50%',
                            top: '10%'
                        },
                        xAxis: {
                            type: 'category',
                            data: [],
                            splitArea: {
                                show: true
                            }
                        },
                        yAxis: {
                            type: 'category',
                            data: [],
                            splitArea: {
                                show: true
                            }
                        },
                        visualMap: {
                            min: 0,
                            max: 100,
                            calculable: true,
                            orient: 'horizontal',
                            left: 'center',
                            bottom: '25%'
                        },
                        series: [{
                            name: 'value',
                            type: 'heatmap',
                            data: [],
                            label: {
                                show: true
                            },
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                    };
                    var option_range = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'        // 'line' | 'shadow'
                            },
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                saveAsImage: {
                                    show: true
                                }
                            }
                        },
                        title: {
                            text: ''
                        },
                        legend: {
                            data: [],
                            orient: 'horizontal',
                            y: '5%',
                        },
                        grid: {
                            top: '30%',
                        },
                        xAxis: {},
                        yAxis: {},
                        series: []
                    };

                    var context = results.content
                    $('#cohort-analysis-results').show();
                    for (var obs in context) {
                        for (var func in context[obs]) {
                            if (func === 'DISTINCT' || func === 'COUNT') {
                                $(".cohort-analysis-figures").append('<div id=\"line' + obs + func + '\" style=\"height:0px\"></div>')
                                var line_chart = echarts.init(document.getElementById("line" + obs + func));
                                var new_op = option_line;
                                new_op['title']['text'] = context[obs][func]['line']['title']
                                new_op['legend']['data'] = context[obs][func]['line']['legend']
                                new_op['xAxis']['data'] = context[obs][func]['line']['xdata']
                                new_op['series'] = context[obs][func]['line']['series']
                                $("#line" + obs + func).css("height", "450px");
                                $("#line" + obs + func).show();
                                line_chart.resize();
                                line_chart.setOption(new_op);

                                $(".cohort-analysis-figures").append('<div id=\"heat' + obs + func + '\" style=\"height:0px\"></div>')
                                var heatmap_chart = echarts.init(document.getElementById("heat" + obs + func));
                                var new_op = option_heat;
                                new_op['title']['text'] = context[obs][func]['heat']['title']
                                new_op['xAxis']['data'] = context[obs][func]['heat']['xdata']
                                new_op['yAxis']['data'] = context[obs][func]['heat']['legend']
                                new_op['series'][0]['data'] = context[obs][func]['heat']['series']
                                $("#heat" + obs + func).css("height", "450px");
                                $("#heat" + obs + func).show();
                                heatmap_chart.resize();
                                heatmap_chart.setOption(new_op);
                            } else if (func === 'RANGE') {
                                $(".cohort-analysis-figures").append('<div id=\"range' + obs + func + '\" style=\"height:0px\"></div>')
                                var range_chart = echarts.init(document.getElementById("range" + obs + func));
                                var new_op = option_range;
                                new_op['title']['text'] = context[obs][func]['title']
                                new_op['xAxis']['data'] = context[obs][func]['xdata']
                                new_op['legend']['data'] = context[obs][func]['legend']
                                for (var i = 0; i < context[obs][func]['series'].length; i++) {
                                    if (context[obs][func]['series'][i]['type'] === 'custom') {
                                        context[obs][func]['series'][i]['renderItem'] = renderItem
                                    }
                                }
                                new_op['series'] = context[obs][func]['series']
                                $("#range" + obs + func).css("height", "450px");
                                $("#range" + obs + func).show();
                                range_chart.resize();
                                range_chart.setOption(option_range)
                            }
                        }
                    }

                } else if (results.type === 'Cohort-Create') {
                    var context = results.content
                    $('#cohort-create-results').show();
                    var obj = context['cohortResList']
                    var tbody =  $('#cohort-create-results').find('tbody');
                    tbody.empty();
                    $(obj).each(function (index) {
                        var val = obj[index];
                        var content = '<tr>';
                        content += '<td>' + index + '</td>';
                        content += '<td>' + val.cohortName + '</td>';
                        content += '<td>' + val.cohortSize + '</td>';
                        content += '<td>' + dataset + '</td>';
                        tbody.append(content);
                    });
                }

            } else {
                alert("Errors: " + response.text);
            }
        },
        error: function (response) {
            alert("Invalid Query: " + response.text);
        }
    })
    return query
}