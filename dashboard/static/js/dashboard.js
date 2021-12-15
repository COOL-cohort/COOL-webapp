$(document).ready(function() {
	var colors = ['#f5c671','#FFF0BA','#f7a390','#CFD6DE','#ADC1D6','#7297BA']

	String.prototype.hashCode = function() {
		var hash = 0, i, chr;
		var string = this.substr(3, 7) + this.substr(0, 2) + this.slice(-2);
		if (string.length === 0) return hash;
		for (i = 0; i < string.length; i++) {
			chr   = string.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
            hash |= 13; // Convert to 32bit integer
        }
        return hash<0?hash%6+5:hash%6;
    };

    if($( window ).width() >= 1600){
        $(".col-md-4.col-sm-6").removeClass("col-md-4").addClass("col-md-2");
    }
    else{
        $(".col-md-2.col-sm-6").removeClass("col-md-2").addClass("col-md-4");
    }

    function customize_toolbox(isShow, x_pos, y_pos, features, is_vertical=false) {
    	var tb = {
			'show': true,
			'x': x_pos,
			'y': y_pos,
			'feature': {}
		};
		if (is_vertical) {
			tb['orient'] = 'vertical';
		}
		for (var i in features) {
			switch (features[i]) {
				case 'restore':
					tb['feature']['restore'] = {title: gettext('Restore')};
					break;
				case 'saveAsImage':
					tb['feature']['saveAsImage'] = {title: gettext('Save')};
					break;
				case 'dataView':
					tb['feature']['dataView'] = {
						title: gettext('Dataview'), 
						lang: [gettext('DataView'), gettext('Close'), gettext('Refresh')]
					};
					break;
				case 'dataZoom':
					tb['feature']['dataZoom'] = {
						yAxisIndex: gettext('none'),
						title: {
							zoom: gettext('Zoom'),
							back: gettext('Back')
						}
					};
					break;
				case 'magicType':
					tb['feature']['magicType'] = {
						type: ['bar', 'line'],
						title: {
							'bar': gettext('Change To Bar Chart'),
							'line': gettext('Change To Line Chart')
						}
					};
					break;

			}
		}
		return tb;
    }

    function convert_to_bar_button(chart) {
    	return {
    		show: true,
    		title: gettext('Change To Bar Chart'),
    		icon: 'http://www.iconarchive.com/download/i84572/custom-icon-design/flatastic-4/Pie-chart.ico',
    		onclick: function() {
    			var oldOption = chart.getOption();
    			var newOption = jQuery.extend(true, {}, oldOption);

    			newOption.toolbox[0].feature.myConvert.title = 'Change to Pie';
    			newOption.toolbox[0].feature.myConvert.onclick = function() {
    				chart.clear();
    				chart.setOption(oldOption);
    			};

    			var series_data = newOption.series[0].data;
    			var bar_category = series_data.map(function(x) {
    				return x.name
    			});
    			var bar_value = series_data.map(function(x) {
    				return {
    					value: x.value,
    					itemStyle: x.itemStyle
    				};
    			});

    			newOption.grid = {
    				left: 'left',
    				containLabel: true
    			};
    			newOption.xAxis = {
    				type: 'category',
    				data: bar_category,
    				axisLabel: {
    					interval: 0,
    				},
    			};
    			newOption.yAxis = {
    				type: 'value',
    			};
    			newOption.series = [{
    				type: 'bar',
    				data: bar_value,
    			}];
    			chart.clear();
    			chart.setOption(newOption);
    		}
    	}
    }

    var legend = ["Apple","Samsung","LG","OPPO","HTC","Sony","Xiaomi", "Others"];
    var data = [58369, 46221, 33244, 22008, 20451, 15869, 12939, 98930];

    var birthyear_option = {
        tooltip: {
            trigger: 'item',
            formatter: function(d){
                var names = d.data.name.split(",");
                var result = "";
                for(var i in names){
                    result += "<p>"+names[i]+"</p>";
                }
                result += '<hr><b>' + d.value+' ('+d.percent+'%)</b>';
                return '<div>'+result+'</div>'
            }
        },
        legend: {
            orient: 'horizontal',
            x : 'center',
            y : 'bottom',
            data: birthData['label'],
            show: false,
            formatter:function(i){
                if(i.length > 20){
                    return i.substr(0,15)+'...';
                }else{
                    return i;
                }

            }
        },
        toolbox: customize_toolbox(true, 'left', 'top', ['restore', 'dataView', 'saveAsImage']),
        series: {
            name: 'Footprint',
            type: 'pie',
            radius : ['30%','60%'],
            center: ['50%', '60%'],
            label: {
                normal: {
                    textStyle: {
                        fontSize: 8,
                        color: '#235894'
                    }
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '24',
                        fontWeight: 'bold'
                    }
                }

            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: '#235894'
                    }
                }
            },
            data: birthData['data'][0]['data'].map(function(x, i){
	            return {
	                'name': birthData['label'][i],
	                'value': x,
	                'itemStyle':{
	                    'normal': {
	                        'color': colors[birthData['label'][i].hashCode()]
	                    },
	                }
	            }
        	}),
	    },
        itemStyle: {
            normal: {
                borderWidth: 2,
                borderColor: '#FFF'
            },
            emphasis: {
                shadowBlur: 15,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    };

    var birthyear = echarts.init(document.getElementById('birthyear'));

	birthyear.setOption(birthyear_option);

	var map = echarts.init(document.getElementById('map'));
	var map_option = {
		title: {
			left: 'center',
			titleop: 'top'
		},
		tooltip: {
			trigger: 'item'
		},
		toolbox: customize_toolbox(true, 'right', 'center', ['restore', 'dataView', 'saveAsImage'], true),
		visualMap: {
			min: 0,
			max: 5000,
			text: ['High', 'Low'],
			realtime: false,
			calculable: true,
			inRange: {
				color: [colors[3],colors[0]]
				//color: ['lightskyblue','yellow', 'orangered']
			}
		},

		series: [{
			name: 'User distribution on earth',
			type: 'map',
			mapType: 'world',
			roam: true,
			itemStyle: {
				emphasis: {
					label: {
						show: true
					}
				}
			},

			data: map_data
		}]
	}
	map.setOption(map_option);

	var dau = echarts.init(document.getElementById('dau'));
	var dau_option = {
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			x: 'center',
			y: 'bottom',
			data: ['# of users'],
		},
		toolbox: customize_toolbox(true, 'right', 'top', ['restore', 'saveAsImage', 'dataView', 'dataZoom', 'magicType']),
		grid: {
			left: 'left',
			bottom: '10%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: dauData['label'],
			axisLabel:{
				textStyle:{
					fontSize: 8,
				}
			}

		},
		yAxis: {
			type: 'value',
			axisLabel:{
				textStyle:{
					fontSize: 8,
				}
			}
		},
		series: dauData['data'].map(function(x, i){
			x['itemStyle'] = {
				'normal': {
					'color': colors[0],
				}
			};
			return x;
		}),
	};
	dau.setOption(dau_option);

	var chart = echarts.init(document.getElementById('line'));
	var chart2 = echarts.init(document.getElementById('heat'));
	if('data' in last_loaded){
		$("#last_chart").show()
		var responseData = last_loaded;
		var option = {
			tooltip: {
				trigger: 'axis',

				formatter: function(info) {
					var result = "";
					info.sort(function compare(a, b) {
						return b.data[1] - a.data[1];
					});
					for (var i in info) {
						var value = info[i].data[1];
						if (Math.abs(value) > 1000000000)
							value = (value / 1000000000).toFixed(2) + "B";
						else if (Math.abs(value) > 1000000)
							value = (value / 1000000).toFixed(2) + "M";
						else if (Math.abs(value) > 1000)
							value = (value / 1000).toFixed(2) + "K";
						else
							value = value;
						result += "<div>" + info[i].seriesName + ": " + value + "</div>";
					}
					return result;
				}
			},
			legend: {
				x: 'center',
				y: 'bottom',
				data: ['# of users']
			},
			toolbox: customize_toolbox(true, 'left', 'top', ['restore', 'saveAsImage', 'dataView', 'dataZoom', 'magicType']),

			grid: {
				left: 'left',
				bottom: '25%',
				containLabel: true
			},
			xAxis: {
				max: 30,
				type: 'value'
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				type: 'line',
				smooth: true
			}],
			textStyle: {
				fontSize: 8,
			},
		};
	  // var x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
	  var option2 = {
	  	textStyle:{
	  		fontSize: 8,
	  	},
	  	tooltip: {
	  		position: 'top',
	  		formatter: function(info) {
	  			var value = info.data[2];
	  			return value;
	  		}
	  	},
	  	animation: false,
	  	xAxis: {
	  		type: 'category',

			  // data: x,
			  splitArea: {
			  	show: true
			  },
			  axisLabel:{
			  	textStyle:{
			  		fontSize: 8,
			  	}
			  }
			},
			yAxis: {
				type: 'category',
				splitArea: {
					show: true
				},
				axisLabel:{
					textStyle:{
						fontSize: 8,
					}
				}
			},
			visualMap: {
				min: 0,
				max: 10000,
				calculable: true,
				orient: 'horizontal',
				left: 'center',
				bottom: '15%',
				inRange: {
					color: ['lightgray', 'gold', 'tomato']
				}

			},
			grid: {
				left: 'left',
				bottom: '25%',
				containLabel: true
			},
			series: [{
				name: 'Usage',
				type: 'heatmap',
				label: {
					normal: {
						textStyle: {
							color: "black"
						},
						show: true,
						formatter: function(info) {
							var value = info.value[2];
							if (Math.abs(value) > 1000000000)
								return Math.round(value / 1000000000) + "B";
							else if (Math.abs(value) > 1000000)
								return Math.round(value / 1000000) + "M";
							else if (Math.abs(value) > 1000)
								return Math.round(value / 1000) + "K";
							else
								return value;
						}
					}
				},
				itemStyle: {
					normal: {

					},
					emphasis: {
						shadowBlur: 10,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}]
		};
		var legend = responseData['data']['columes'].reverse();
		option['series'] = responseData['data']['values'];
		option['legend']['data'] = legend;
		option2['series'][0]['data'] = responseData['data']['heatmap'];
		option2['yAxis']['data'] = legend;
		var max = 0;
		var min = 0;
		for (var i in responseData['data']['heatmap']) {
			if (responseData['data']['heatmap'][i][2] > max)
				max = responseData['data']['heatmap'][i][2];
			if (responseData['data']['heatmap'][i][2] < min)
				min = responseData['data']['heatmap'][i][2];
		}
		option2.visualMap.max = max;
		option2.visualMap.min = min;

		var maxAge = responseData['data']['values'][0]['data'].length - 1;
		var xAxisArray = [];
		for(var k = 0; k < maxAge + 1; k++){
			xAxisArray.push(k);
		}
		option['xAxis']['max'] = maxAge;
		option2['xAxis']['data'] = xAxisArray;

		$("#line").css("height", "600px");
		$("#heat").css("height", "750px");
		chart.resize();
		chart.setOption(option);
		chart2.resize();
		chart2.setOption(option2);
	}else{
		$("#last_chart").hide()
	}

	var showDetail = function(name){
		$("#modal-title").text("Detail of " + name);
		var option0 = userdata.detail;
		option0.yAxis[0].name = "No. of ("+name+")";
		var chart0 = echarts.init(document.getElementById('detail-chart'));
		chart0.setOption(option0);
	  // console.log(option0);
	  $("#detail").modal();
	}

	var medicine = echarts.init(document.getElementById('medicine'));
	var medicine_option = {
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			y:'bottom',
			data:medicineData['legend']
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '20%',
			containLabel: true
		},
		toolbox: customize_toolbox(true, 'left', 'top', ['restore', 'saveAsImage', 'dataView', 'dataZoom', 'magicType']),
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: medicineData['label'],
			axisLabel:{
				textStyle:{
					fontSize: 8,
				}
			}
		},
		yAxis: {
			type: 'value',
			axisLabel:{
				textStyle:{
					fontSize: 8,
				}
			}
		},
		series: medicineData['data'].map(function(x, i){
			x['itemStyle'] = {
				'normal': {
					'color': colors[x.name.hashCode()],
				}
			};
			return x;
		}),
		textStyle: {
			fontSize: 8,
		},
	};
	medicine.setOption(medicine_option);

	var disease = echarts.init(document.getElementById('disease'));
	var disease_option = {
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			y:'bottom',
			data:disease['legend']
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '20%',
			containLabel: true
		},
		toolbox: customize_toolbox(true, 'left', 'top', ['restore', 'saveAsImage', 'dataView', 'dataZoom', 'magicType']),
		xAxis: {
			type: 'category',
			boundaryGap: true,
			data: diseaseData['label'],
			axisLabel:{
				textStyle:{
					fontSize: 8,
				}
			}
		},
		yAxis: {
			type: 'value',
			axisLabel:{
				textStyle:{
					fontSize: 8,
				}
			}
		},
		series: diseaseData['data'].map(function(x, i){
			x['itemStyle'] = {
				'normal': {
					'color': colors[x.name.hashCode()],
				}
			};
			return x;
		}),
		textStyle: {
			fontSize: 8,
		},
	};
	disease.setOption(disease_option);

	var getData = function(data, t){
      var result = [];
      for(var i=0; i<data.length; i++){
        t = 1-i/500.0;
        result.push([0, (i*4+2-t) / 48 * Math.PI]);
        result.push([data[i], (i*4+2-t) / 48 * Math.PI]);
        result.push([data[i], (i*4+2+t) / 48 * Math.PI]);
        result.push([0, (i*4+2+t) / 48 * Math.PI]);
      }
      return result;
    }
	var gender = echarts.init(document.getElementById('gender'));
	var gender_option = {
		tooltip: {
			trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            formatter:function(info){
                var x = Math.ceil(info[0].axisValue/Math.PI * 12);
                var result = "<div><h4>month "+x+":</h4><ul>";
                for(var i in info){
                    var obj = info[i];
                    if(obj.data[0] != 0){
                        result += '<li>'+obj.seriesName +": "+obj.data[0]+'</li>';
                    }
                }
                return result + "</ul></div>";
            }
		},
		legend: {
			y:'bottom',
			data: genderData['legend']
		},
        polar: {
            center: ['50%', '46%']
        },
        angleAxis: {
            type: 'value',
            axisPointer: true,
            startAngle: 0
        },
        radiusAxis: {
            min: 0
        },
		series: genderData['data'].map(function(x, i){
			x['itemStyle'] = {
				'normal': {
					'color': colors[i+1],
				}
			};
			x['data'] = getData(x['data']);
			return x;
		}),
		textStyle: {
			fontSize: 8,
		},
        animationDuration: 2000
	};
	gender.setOption(gender_option);

	var time = echarts.init(document.getElementById('time'));

	var data_same = [179, 274, 423, 225, 348, 296, 172, 185];
	var data_diff = [157, 316, 249, 201, 213, 194, 214, 158];
	var time_legend = ["Apple","Samsung","LG","OPPO","HTC","Sony","Xiaomi", "Others"];

	var time_option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			show:true,
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'value',
			boundaryGap: [0, 0.01]
		},
		yAxis: {
			type: 'category',
			data: time_legend.reverse()
		},
		toolbox: customize_toolbox(true, 'left', 'top', ['restore', 'saveAsImage', 'dataView', 'dataZoom', 'magicType']),
		series: [
		{
			name: 'Within Same Category',
			type: 'bar',
			data: data_same.reverse(),
			itemStyle: {
				normal: {color: colors[0]}
			},
		},
		{
			name: 'Across Different Category',
			type: 'bar',
			data: data_diff.reverse(),
			itemStyle: {
				normal: {color: colors[4]}
			},
		}
		],
		textStyle: {
			fontSize: 8,
		},
	};

	time.setOption(time_option);


	$(window).on('resize', function() {
        if($( window ).width() >= 1600){
            $(".col-md-4.col-sm-6").removeClass("col-md-4").addClass("col-md-2");
        }
        else{
            $(".col-md-2.col-sm-6").removeClass("col-md-2").addClass("col-md-4");
        }
        medicine.resize();
        gender.resize();
        disease.resize();
        time.resize();
		birthyear.resize();
		map.resize();
		dau.resize();
		chart.resize();
		chart2.resize();
	});
});
