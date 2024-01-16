'use strict';

let eventFilterHtml = '<div class="row mb-3">'+
'    <label class="text-center col-md-2 col-sm-2 col-xs-12">Their</label>'+
'    <div class="select-multi-stage col-md-8 col-sm-8 col-xs-12">'+
'        <div class="col-md-5 col-sm-5 col-xs-5 float-left">'+
'            <select class="form-select select2-single data-table-yaml">'+
'            </select>'+
'        </div>'+
'        <label class="text-center col-md-1 col-sm-1 col-xs-12 float-left">is</label>'+
'        <div class="col-md-6 col-sm-6 col-xs-12 float-left segment" >'+
'            <select class="form-select second-stage"> </select>'+
'        </div>'+
'        <div class="row md-3 col-sm-6 col-sm-6 col-xs-12 datetimepicker" style="display: none;">'+
'            <div class="input-group date date1">'+
'                <input type="text" class="form-control datepicker-datetime" >'+
'                <span class="input-group-addon">'+
'                    <span class="glyphicon glyphicon-calendar"></span>'+
'                </span>'+
'            </div>'+
'            <div class="input-group date date2">'+
'                <input type="text" class="form-control datepicker-datetime" >'+
'                <span class="input-group-addon">'+
'                    <span class="glyphicon glyphicon-calendar"></span>'+
'                </span>'+
'            </div>'+
'        </div>'+
'        <div class="row col-md-6 col-sm-6 col-xs-12 intRange" style="display: none;">'+
'            <div class="col-md-5 col-sm-5 col-xs-5">'+
'                <input type="text" class="form-control event-min " placeholder="MIN">'+
'            </div>'+
'            <div class="col-md-1 col-sm-1 col-xs-1" style="float:left; line-height:33px;">-</div>'+
'            <div class="col-md-5 col-sm-5 col-xs-5">'+
'                <input type="text" class="form-control event-min " placeholder="MAX">'+
'            </div>'+
'        </div>'+
'    </div>'+
'    <div class="col-sm-2 col-sm-2 col-xs-12">'+
'        <i class="fa fa-plus-circle eventFilter-add" style="padding-right:7px;" aria-hidden="true"></i>'+
'        <i class="fa fa-minus-circle eventFilter-remove" style="display:none;padding-right:7px;" aria-hidden="true"></i>'+
'    </div>'+
'</div>'

let cohortHtml = '<div class="event-container">'+
'    <div class="row mb-4">'+
'        <label class="col-sm-offset-2 control-label birthEvent-label">Event </label>'+
'        <i class="fa fa-minus-circle event-remove" style="display:none;padding-left:7px;" aria-hidden="true"></i>'+
'    </div>'+
'    <div class="row mb-4">'+
'        <label class="control-label col-md-1 col-sm-1 col-xs-12">Event:</label>'+
'        <div class="col-md-9 multi-eventFilters eventSelection" >'+ eventFilterHtml +
'        </div>'+
'    </div>'+
'    <div class="row mb-4">'+
'        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="min_freq">Minimal Frequency:</label>'+
'        <div class="col-md-5 col-sm-5 col-xs-5">'+
'            <input type="text" id="min_freq" required="required" class="form-control col-md-2 col-xs-2 min" placeholder="1">'+
'        </div>'+
'        <div class="col-md-1 col-sm-1 col-xs-3" style="float:left; line-height:33px;">time(s)</div>'+
'    </div>'+
'</div>';


// Add event.
function handleNewUserEvent() {
    var added = $(cohortHtml);
    $("#users-events-container").append(added);
    EventSelect2(added.find(".data-table-yaml"));
    // added.find(".select2-multiple-remote").select2({
    //     multiple: true,
    //     placeholder: gettext('Select some events'),
    //     data: djangoData.events
    // });
    var eventsContainer = $("#users-events-container");
    eventsContainer.find('.event-remove.fa-minus-circle').show();
    updateEventLabelNumbering();
};

// Add event.
function handleNewEvent() {
    var added = $(cohortHtml);
    $("#events-container").append(added);
    EventSelect2(added.find(".data-table-yaml"));
    // added.find(".select2-multiple-remote").select2({
    //     multiple: true,
    //     placeholder: gettext('Select some events'),
    //     data: djangoData.events
    // });
    var eventsContainer = $("#events-container");
    eventsContainer.find('.event-remove.fa-minus-circle').show();
    updateEventLabelNumbering();
}


// Remove event.
$(document.body).on('click', '.event-remove.fa-minus-circle', function(d) {
    var eventContainer = $(this).parents(".event-container");
    var eventsContainer = $(this).parents(".events-container");
    eventContainer.remove();
    if(eventsContainer.children(".event-container").length <= 1) {
        eventsContainer.find('.event-remove.fa-minus-circle').hide();
    }
    updateEventLabelNumbering();
});

function updateEventLabelNumbering() {
    var $userLabels = $("#users-events-container").find(".birthEvent-label");
    var $cohortLabels = $("#events-container").find(".birthEvent-label");

    $userLabels.each(function(i) { $(this).html("Event " + ++i); });
    $cohortLabels.each(function(i) { $(this).html("Event " + ++i); });
}





let globalFilterHtml = '<div class="row mb-4 global-filter select-multi-stage">'+
'    <div class="col-md-4 col-sm-4 col-xs-4">'+
'        <select class="form-select select2-single data-table-yaml"> </select>'+
'    </div>'+
'    <div class="row col-md-6 col-sm-6 col-xs-6 segment" >'+
'        <select class="form-select select2-single second-stage">'+
'        </select>'+
'    </div>'+
'    <div class="row col-md-6 col-sm-6 col-xs-6 datetimepicker" style="display: none;">'+
'        <div class="input-group date date1">'+
'            <input type="text" class="form-control" />'+
'            <span class="input-group-addon">'+
'                <span class="glyphicon glyphicon-calendar"></span>'+
'            </span>'+
'        </div>'+
'        <div class="input-group date date2">'+
'            <input type="text" class="form-control" />'+
'            <span class="input-group-addon">'+
'                <span class="glyphicon glyphicon-calendar"></span>'+
'            </span>'+
'        </div>'+
'    </div>'+
'    <div class="row col-md-6 col-sm-6 col-xs-6 intRange" style="display: none;">'+
'        <div class="col-md-5 col-sm-5 col-xs-5 ">'+
'            <input type="text" class="form-control min " placeholder="MIN">'+
'        </div>'+
'        <div class="col-md-1 col-sm-1 col-xs-1 text-center" style="float:left; line-height:33px;">-</div>'+
'        <div class="col-md-5 col-sm-5 col-xs-5">'+
'            <input type="text" class="form-control max " placeholder="MAX">'+
'        </div>'+
'    </div>'+
'    <div class="col-sm-2 col-sm-2 col-xs-1">'+
'        <i class="fa fa-plus-circle globalFilter-add" style="padding-right:7px;" aria-hidden="true"></i>'+
'        <i class="fa fa-minus-circle globalFilter-remove" style="padding-right:7px;" aria-hidden="true"></i>'+
'    </div>'+
'</div>';


$(document.body).on('click', '.globalFilter-add.fa-plus-circle', function(d) {
    var filterContainer = $("#global-filters-container");
    var added = $(globalFilterHtml);
    filterContainer.append(added);
    EventSelect2(added.find(".data-table-yaml"));
    $(".globalFilter-empty-btn").hide();
});

$(document.body).on('click', '.globalFilter-remove.fa-minus-circle', function(d) {
    var globalFiltersContainer = $("#global-filters-container");
    $(this).parents(".global-filter").remove();
    if(globalFiltersContainer.children(".global-filter").length < 1) {
        $(".globalFilter-empty-btn").show();
    } else {
        $(".globalFilter-empty-btn").hide();
    }

});



// Add eventFilter.
$(document.body).on('click', '.eventFilter-add.fa-plus-circle', function(d) {
    var container = $(this).parents(".multi-eventFilters");
    var added = $(eventFilterHtml);
    container.append(added);
    EventSelect2(added.find(".data-table-yaml"));

    // If going from 1 to 2, show del btn
    container.find(".eventFilter-remove").show();
});

// Remove eventFilter.
$(document.body).on('click', '.eventFilter-remove.fa-minus-circle', function(d) {
    var container = $(this).parents(".multi-eventFilters");
    $(this).parent().parent().remove();

    // If only 1 left, hide del btn
    if(container.children().length < 2) {
        container.find(".eventFilter-remove").hide();
    }
});




// Show/Hide Filter Users.
$("#filter-users-checkbox").on('change', function(d) {
    if($(this).is(':checked')) {
        $("#cohort-container").show();

    } else {
        $("#cohort-container").hide();
    }
});

// Show/Hide Filter Users.
$("#group-users-checkbox").on('change', function(d) {
    if($(this).is(':checked')) {
        $("#groupby-container").show();

    } else {
        $("#groupby-container").hide();
    }
});


// // Show/Hide Advanced options.
// $(document.body).on('click', '.advanced-checkbox', function(d) {
//     // console.log($(this).parent().parents('.advanced-check').siblings())
//     var advancedForm = $(this).parents('.advanced-check').children(".advanced-container");
//     if($(this).is(':checked')) {
//         advancedForm.show();
//     } else {
//         advancedForm.hide();
//     }
// });


// function showFigures() {
//        var line_chart = echarts.init(document.getElementById("line"));
//     var option_0 = {
//         title: {
//             text: 'demo(line map)'
//         },
//         tooltip: {
//             trigger: 'axis',
//             axisPointer: {
//                 type: 'shadow'        // 'line' | 'shadow'
//             }
//         },
//         toolbox: {
//             show: true,
//             feature: {
//                 dataZoom: {
//                     yAxisIndex: 'none'
//                 },
//                 dataView: {
//                     readOnly: false
//                 },
//                 magicType: {
//                     type: ['line', 'bar']
//                 },
//                 restore: {},
//                 saveAsImage: {
//                     show: true
//                 }
//             }
//         },
//         legend: {
//             data: ['(1950, 1960]', '(1960, 1970]', '(1970, 1980]', '(1980, 1990]', '(1990, inf)'],
//             top: "6%"
//         },
//         xAxis: {
//             data: [0, 1, 2, 3, 4, 5, 6, 7]
//         },
//         yAxis: {},
//         series: [
//
//                 {
//                     name: '(1950, 1960]',
//                     type: 'line',
//                     data: [[7, 6], [6, 8], [5, 14], [4, 13], [3, 9], [2, 19], [1, 12], [0, 231]],
//                     label: {
//                         show: true
//                     },
//                 },
//
//                 {
//                     name: '(1960, 1970]',
//                     type: 'line',
//                     data: [[7, 9], [6, 16], [5, 18], [4, 13], [3, 16], [2, 15], [1, 19], [0, 393]],
//                     label: {
//                         show: true
//                     },
//                 },
//
//                 {
//                     name: '(1970, 1980]',
//                     type: 'line',
//                     data: [[7, 13], [6, 8], [5, 18], [4, 21], [3, 30], [2, 39], [1, 35], [0, 654]],
//                     label: {
//                         show: true
//                     },
//                 },
//
//                 {
//                     name: '(1980, 1990]',
//                     type: 'line',
//                     data: [[7, 7], [6, 13], [5, 15], [4, 28], [3, 36], [2, 38], [1, 50], [0, 681]],
//                     label: {
//                         show: true
//                     },
//                 },
//
//                 {
//                     name: '(1990, inf)',
//                     type: 'line',
//                     data: [[7, 5], [6, 7], [5, 7], [4, 8], [3, 11], [2, 17], [1, 20], [0, 407]],
//                     label: {
//                         show: true
//                     },
//                 },
//
//         ]
//     };
//         var heatmap_chart = echarts.init(document.getElementById("heat"));
//         var option_1 = {
//             title: {
//                 text: 'demo(heat map)'
//             },
//             tooltip: {
//                 position: 'top'
//             },
//             animation: false,
//             grid: {
//                 height: '50%',
//                 top: '10%'
//             },
//             xAxis: {
//                 type: 'category',
//                 data: [0, 1, 2, 3, 4, 5, 6, 7],
//                 splitArea: {
//                     show: true
//                 }
//             },
//             yAxis: {
//                 type: 'category',
//                 data: ['(1950, 1960]', '(1960, 1970]', '(1970, 1980]', '(1980, 1990]', '(1990, inf)'],
//                 splitArea: {
//                     show: true
//                 }
//             },
//             visualMap: {
//                 min: 0,
//                 max: 100,
//                 calculable: true,
//                 orient: 'horizontal',
//                 left: 'center',
//                 bottom: '25%'
//             },
//             series: [{
//                 name: 'value',
//                 type: 'heatmap',
//                 data: [[0, 0, 100], [1, 0, 5], [2, 0, 8], [3, 0, 3], [4, 0, 5], [5, 0, 6], [6, 0, 3], [7, 0, 2], [0, 1, 100], [1, 1, 4], [2, 1, 3], [3, 1, 4], [4, 1, 3], [5, 1, 4], [6, 1, 4], [7, 1, 2], [0, 2, 100], [1, 2, 5], [2, 2, 5], [3, 2, 4], [4, 2, 3], [5, 2, 2], [6, 2, 1], [7, 2, 1], [0, 3, 100], [1, 3, 7], [2, 3, 5], [3, 3, 5], [4, 3, 4], [5, 3, 2], [6, 3, 1], [7, 3, 1], [0, 4, 100], [1, 4, 4], [2, 4, 4], [3, 4, 2], [4, 4, 1], [5, 4, 1], [6, 4, 1], [7, 4, 1]],
//                 label: {
//                     show: true
//                 },
//                 emphasis: {
//                     itemStyle: {
//                         shadowBlur: 10,
//                         shadowColor: 'rgba(0, 0, 0, 0.5)'
//                     }
//                 }
//             }]
//         };
//
//         var range_chart = echarts.init(document.getElementById("range"));
//         var option_2 = {
//             tooltip: {
//                 trigger: 'axis',
//                 axisPointer: {
//                     type: 'shadow'        // 'line' | 'shadow'
//                 }
//             },
//             title: {
//                 text: 'demo(range map)'
//             },
//             legend: {
//                 data: ['(1950, 1960]_max', '(1950, 1960]_min', '(1950, 1960]_avg', '(1960, 1970]_max', '(1960, 1970]_min', '(1960, 1970]_avg', '(1970, 1980]_max', '(1970, 1980]_min', '(1970, 1980]_avg', '(1980, 1990]_max', '(1980, 1990]_min', '(1980, 1990]_avg', '(1990, inf)_max', '(1990, inf)_min', '(1990, inf)_avg'],
//                 orient: 'horizontal',
//                  y: '5%',
//             },
//             grid:{
//                 top:'30%',
//             },
//             xAxis: {},
//             yAxis: {},
//             series: [
//                         {
//                             type: 'custom',
//                             name: '(1950, 1960]_max',
//                             renderItem: renderItem,
//                             data: [[0, 76.0, 54.78], [1, 64.0, 54.6], [2, 81.0, 59.38], [3, 72.0, 57.3], [4, 79.0, 56.62], [5, 55.0, 50.33], [6, 67.0, 56.1], [7, 78.0, 58.38]],
//                             z:3,
//                         },
//
//
//
//                         {
//                             type: 'custom',
//                             name: '(1950, 1960]_min',
//                             renderItem: renderItem,
//                             data: [[0, 45.0, 54.78], [1, 47.0, 54.6], [2, 47.0, 59.38], [3, 47.0, 57.3], [4, 45.0, 56.62], [5, 45.0, 50.33], [6, 46.0, 56.1], [7, 47.0, 58.38]],
//                             z:3,
//                         },
//
//
//
//                         {
//                             type: 'line',
//                             name: '(1950, 1960]_avg',
//                             data: [[0, 54.78], [1, 54.6], [2, 59.38], [3, 57.3], [4, 56.62], [5, 50.33], [6, 56.1], [7, 58.38]],
//                             label: {
//                                 show: true
//                             },
//                         },
//             ]
//         };
//
//     line_chart.setOption(option_0);
//     heatmap_chart.setOption(option_1);
//     range_chart.setOption(option_2)
//
//     $("#line").css("height", "450px");
//     $("#line").show();
//     line_chart.resize();
//
//     $("#heat").css("height", "450px");
//     heatmap_chart.resize();
//     $("#heat").show();
//     heatmap_chart.resize();
//
//     $("#range").css("height", "450px");
//     range_chart.resize();
//     $("#heat").show();
//     range_chart.resize();
//
//     $("#line").focus();
// }

$(document).ready(function (){
    // MeasureSelect2($(".select2-single.data-cube-yaml"));
    MeasureSelect2($("#measure"));
    FunctionSelect2($("#function"));
    EventSelect2($(".select2-single.data-table-yaml"));
    CohortSelect2($(".cohort-select"));
    GroupBySelect2($("#groupby"));
    flatpickr(".datepicker-datetime",{enableTime:!0,dateFormat:"m-d-Y H:i",defaultDate:new Date});
    updateEventLabelNumbering();

    $("#line").hide();
    $("#heat").hide();
    $("#range").hide();
    $("#loading").hide();
    $('#cohort-analysis').hide();
    // showFigures();
})



//process measure selectors
function MeasureSelect2(jqObj){
    jqObj.append('<option></option>'); // for select2 placeholder
    let formdata = new FormData();
    // formdata.append('cube_id', $("#cube_id").val());
    formdata.append('cube_id', cubeName);
    formdata.append('csrfmiddlewaretoken', $('[name="csrfmiddlewaretoken"]').val());
    jqObj.empty().select2({
        // minimumResultsForSearch: 5,
        placeholder: 'Select an option',
        ajax: {
            url: '/return_measure/',
            type: 'post',
            dataType: 'json',
            processData: false,
            contentType: false,
            delay: 250,
            data: formdata,
            processResults: function (data) {
                // console.log(data[0])
                // return {results: [{id: String(data['id']), text: String(data['text'])}]};
                return {results: data};
            },
            cache: true
        },
         multiple: true,
         cache: true
    });
}

//process function selectors
function FunctionSelect2(jqObj){
    jqObj.append('<option></option>'); // for select2 placeholder
    let formdata = new FormData();
    // formdata.append('cube_id', $("#cube_id").val());
    formdata.append('csrfmiddlewaretoken', $('[name="csrfmiddlewaretoken"]').val());
    jqObj.empty().select2({
        // minimumResultsForSearch: 5,
        placeholder: 'Select an option',
        ajax: {
            url: '/return_function/',
            type: 'post',
            dataType: 'json',
            processData: false,
            contentType: false,
            delay: 250,
            data: formdata,
            processResults: function (data) {
                return {results: data};
            },
            cache: true
        },
        multiple: true,
        cache: true,
    });
}

//process measure selectors
function CohortSelect2(jqObj){
    jqObj.append('<option></option>'); // for select2 placeholder
    let formdata = new FormData();
    // formdata.append('cube_id', $("#cube_id").val());
    formdata.append('cube_id', cubeName);
    formdata.append('csrfmiddlewaretoken', $('[name="csrfmiddlewaretoken"]').val());
    jqObj.select2({
        // minimumResultsForSearch: 5,
        placeholder: 'Select an option',
        ajax: {
            url: '/return_cohorts/',
            type: 'post',
            dataType: 'json',
            processData: false,
            contentType: false,
            delay: 250,
            data: formdata,
            processResults: function (data) {
                // console.log(data[0])
                // return {results: [{id: String(data['id']), text: String(data['text'])}]};
                return {results: data};
            },
            cache: true
        },
    });
}


//process groupby selectors
function GroupBySelect2(jqObj){
    jqObj.append('<option></option>'); // for select2 placeholder
    let formdata = new FormData();
    // formdata.append('cube_id', $("#cube_id").val());
    formdata.append('cube_id', cubeName);
    formdata.append('csrfmiddlewaretoken', $('[name="csrfmiddlewaretoken"]').val());
    jqObj.select2({
        // minimumResultsForSearch: 5,
        placeholder: 'Select an option',
        ajax: {
            url: '/return_groupby/',
            type: 'post',
            dataType: 'json',
            processData: false,
            contentType: false,
            delay: 250,
            data: formdata,
            processResults: function (data) {
                // console.log(data)
                // return {results: [{id: String(data['id']), text: String(data['text'])}]};
                return {results: data};
            },
            cache: true
        },
    }).on('change', function(d) {
        var idx = $(this).val();
        var obj = tableYaml[idx];
        var advancedForm = $('.advanced-check').children(".advanced-container");
        let formdata = new FormData();
        formdata.append('cube_id', cubeName);
        formdata.append('csrfmiddlewaretoken', $('[name="csrfmiddlewaretoken"]').val());
        if(obj.fieldType === 'Metric' || obj.fieldType === 'Float' ){
            $.ajax({
                type: "POST",
                dataType: 'json',
                processData: false,
                contentType: false,
                delay: 250,
                data: formdata,
                url: "/return_field_detail/"+set_id+'/'+idx+'/',
                success: function (response) {
                    // console.log(response)
                    var adv1 = advancedForm.find('.adv1')[0]
                    adv1.value=""+response['min']
                    var adv2 = advancedForm.find('.adv2')[0]
                    adv2.value=response['max']
                    var adv3 = advancedForm.find('.adv3')[0]
                    adv3.value=response['interval']
                }
            })
            advancedForm.show()
        }else{
            advancedForm.hide()
        }
    });
}

//process event selectors
function EventSelect2(jqObj){
    jqObj.append('<option></option>'); // for select2 placeholder
    jqObj.parents(".select-multi-stage").find(".second-stage").select2({
        placeholder: 'Select an option',
        disabled: true
    });
    let formdata = new FormData();
    formdata.append('cube_id', cubeName);
    formdata.append('csrfmiddlewaretoken', $('[name="csrfmiddlewaretoken"]').val());
    jqObj.select2({
        minimumResultsForSearch: 5,
        placeholder: 'Select an option',
        // data: tableYaml.map(function(d,i) {
        //     return { id: String(i), text: d.name };
        // })
        ajax: {
            url: '/return_fields/',
            type: 'post',
            dataType: 'json',
            processData: false,
            contentType: false,
            delay: 250,
            data: formdata,
            processResults: function (data) {
                return {results: data};
            },
            cache: true
        },
    }).on('change', function(d) {
        var idx = $(this).val();
        var obj = tableYaml[idx];
        // console.log(idx)
        // console.log(obj)
        if(obj.fieldType === 'Segment' || obj.fieldType === 'Action'){
            var datetimepicker = $(this).parents(".select-multi-stage").find(".datetimepicker");
            $(datetimepicker).hide();
            var intRange = $(this).parents(".select-multi-stage").find(".intRange");
            $(intRange).hide();
            var segment = $(this).parents(".select-multi-stage").find(".segment");
            $(segment).show();
            var secondStage = $(this).parents(".select-multi-stage").find(".second-stage");
            secondStage.show();

            let formdata = new FormData();
            formdata.append('cube_id', cubeName);
            formdata.append('field_id', idx);
            formdata.append('csrfmiddlewaretoken', $('[name="csrfmiddlewaretoken"]').val());
            secondStage.select2('destroy').empty().select2({
                multiple: true,
                ajax: {
                    url: '/return_field_detail/'+set_id+'/'+idx+'/',
                    type: 'post',
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    data: formdata,
                    processResults: function(res) {
                        return {results: res}
                    },
                    delay: 500
                },
                cache: true,
                disabled: false
            });
        }else if(obj.fieldType === 'Metric' || obj.fieldType === 'Float'){
            var secondStage = $(this).parents(".select-multi-stage").find(".second-stage");
            secondStage.select2('destroy').empty().select2({
                placeholder: 'Select an option',
                disabled: true
            });
            $(secondStage).hide();
            var segment = $(this).parents(".select-multi-stage").find(".segment");
            $(segment).hide();
            var datetimepicker = $(this).parents(".select-multi-stage").find(".datetimepicker");
            $(datetimepicker).hide();
            var intRange = $(this).parents(".select-multi-stage").find(".intRange");
            $(intRange).show();
        }else if(obj.fieldType === 'ActionTime'){
            var secondStage = $(this).parents(".select-multi-stage").find(".second-stage");
            secondStage.select2('destroy').empty().select2({
                placeholder: 'Select an option',
                disabled: true
            });
            var secondStageContainer = $(this).parents(".select-multi-stage").find(".select2-container--disabled");
            $(secondStage).hide();
            $(secondStageContainer).hide();
            var intRange = $(this).parents(".select-multi-stage").find(".intRange");
            $(intRange).hide();
            var datetimepicker = $(this).parents(".select-multi-stage").find(".datetimepicker");
            $(datetimepicker).show();

            // // The following codes cannot be used.
            // let formdata = new FormData();
            // formdata.append('cube_id', cubeName);
            // formdata.append('field_id', idx);
            // formdata.append('csrfmiddlewaretoken', $('[name="csrfmiddlewaretoken"]').val());
            // $.ajax({
            //     url: '/return_field_detail/',
            //     type: 'post',
            //     dataType: 'json',
            //     processData: false,
            //     contentType: false,
            //     data: formdata,
            //     success: function (res){
            //         var result = JSON.parse(data).results[0].split("|");
            //         var start = result[0] + " 00:00:00";
            //         var end = result[1] + " 23:59:59";
            //         $($(datetimepicker).find(".input-group.date1")).datetimepicker({
            //             format: 'YYYY/MM/DD HH:mm:ss',
            //             minDate: start,
            //             maxDate: end,
            //             defaultDate: start
            //         });
            //         $($(datetimepicker).find(".input-group.date2")).datetimepicker({
            //             format: 'YYYY/MM/DD HH:mm:ss',
            //             minDate: start,
            //             maxDate: end,
            //             defaultDate: end
            //         });
            //         $($(datetimepicker).find(".input-group.date1")).on("dp.change", function (e) {
            //             $($(datetimepicker).find(".input-group.date2")).data("DateTimePicker").minDate(e.date);
            //         });
            //         $($(datetimepicker).find(".input-group.date2")).on("dp.change", function (e) {
            //             $($(datetimepicker).find(".input-group.date1")).data("DateTimePicker").maxDate(e.date);
            //         });
            //         },
            //     // error: function (res){}
            // })
        }
    });
}





function QueryCheck() {
    // console.log($('#query-name')[0].value)
    if ($('#query-name')[0].value === "") {
        alert("Please input the name of the query.");
        return false;
    }

    var selects = $(".select2-single.data-table-yaml");
    // console.log("selects1", selects.length)
    for(var i = 0; i < selects.length; i++){
        if($(selects[i]).is(":visible")){
            // console.log($(selects[i]).val())
            if($(selects[i]).val() === "" ){
                alert("Please select an option for event.");
                $(selects[i]).focus();
                return false;
            }
        }
    }

    var selects = $(".second-stage");
    // console.log("selects2", selects.length)
    for(var i = 0; i < selects.length; i++){
        if($(selects[i]).is(":visible")){
            // console.log($(selects[i]).val())
            if($(selects[i]).val().length === 0){
                alert("Please select at least one value for event.");
                $(selects[i]).focus();
                return false;
            }
        }
    }
    return true;
}



function generateBirthEvent(){
    var eventSelectSize = $(".event-container .eventSelection").length;
    // console.log("eventSelectSize:", eventSelectSize)
    var eventSelects = [];
    for(var h = 0; h < eventSelectSize; h++){
        var eventDiv = $($($(".event-container .eventSelection")[h]).parent('div').parent('div')[0]);
        var eventSize = $($(".event-container .eventSelection")[h]).find(".row .data-table-yaml").length;
        // console.log("eventSize:", eventSize)
        var events = [];
        for(var i = 0; i < eventSize; i++){
            // var event = JSON.parse(eventTemplate);
            var event = {};
            var index = $($($(".event-container .eventSelection")[h]).find(".row .data-table-yaml")[i]).val();
            // console.log("index", index)
            var obj = tableYaml[index];
            // console.log("obj", obj)
            event['fieldSchema'] = obj.name;
            if(obj.fieldType === "Segment"){
                event['type'] = 'SET'
                event['acceptValue'] = $($($(".event-container .eventSelection")[h]).find(".row .second-stage")[i]).val();
                // events.push(event);
            }
            // else if(obj.fieldType === 'ActionTime'){
            //     var v1 = $($($(".event-container .eventSelection")[h]).find(".row .date1")[i]).find('input').val();
            //     var v2 = $($($(".event-container .eventSelection")[h]).find(".row .date2")[i]).find('input').val();
            //     var range = v1 + "|" + v2;
            //     var value = [];
            //     value.push(range);
            //     event['fieldValue']['values'] = value;
            // }
            else{
                var v1 = parseInt($($($(".event-container .eventSelection")[h]).find(".row .event-min")[i]).val());
                var v2 = parseInt($($($(".event-container .eventSelection")[h]).find(".row .event-max")[i]).val());
                v1 = Number.isInteger(v1)?v1:'MIN';
                v2 = Number.isInteger(v2)?v2:'MAX';
                if(Number.isInteger(v1) && Number.isInteger(v2)){
                    if (v2 < v1){
                        v2 = 'MAX';
                    }
                }
                var range = v1 + "-" + v2;
                var value = [];
                value.push(range);
                event['type'] = 'RANGE'
                event['acceptValue'] = value;
            }
            events.push(event);
            // console.log("events", events)
        }
        var eventSelect = {};
        eventSelect['filters'] = events
        var min_freq = parseInt($(eventDiv.find('.min')[0]).val());
        min_freq = Number.isInteger(min_freq)?min_freq:1;
        eventSelect['frequency'] = min_freq

        eventSelects.push(eventSelect);
    }
    return eventSelects
}


var loyalTemplate = '{"birthSelector":{"birthEvents":[]},"outputCohort":"all"}';
function buildCohortCreateQuery(){
    var query = JSON.parse(loyalTemplate);
    query['dataSource'] = cubeName;
    query['queryName'] = $("#query-name")[0].value;

    if($('#save-cohort-checkbox')[0].checked){
        query['saveCohort'] = true
    } else {
        query['saveCohort'] = false
    }

    // step 1
    query['birthSelector']['birthEvents'] = generateBirthEvent();


    // step 2
    if($('#group-users-checkbox')[0].checked){
        var cohortSelector = {}
        var idx = $($('#groupby-container').find(".groupby")[0]).val();
        var obj = tableYaml[idx];
        // console.log(idx, obj)
        cohortSelector['fieldSchema'] = obj.name
       if(obj.fieldType === "Segment"){
            cohortSelector['type'] = "SET"
        } else if (obj.fieldType === "Metric" ) {
           cohortSelector['type'] = "RANGE"
           cohortSelector['min'] = parseInt($($('.advanced-container').find(".adv1")[0])[0].value);
           cohortSelector['max'] = parseInt($($('.advanced-container').find(".adv2")[0])[0].value);
           cohortSelector['interval'] = parseInt($($('.advanced-container').find(".adv3")[0])[0].value);
       } else if (obj.fieldType === "Float" ) {
           cohortSelector['type'] = "RANGE"
           cohortSelector['min'] = parseFloat($($('.advanced-container').find(".adv1")[0])[0].value);
           cohortSelector['max'] = parseFloat($($('.advanced-container').find(".adv2")[0])[0].value);
           cohortSelector['interval'] = parseFloat($($('.advanced-container').find(".adv3")[0])[0].value);
       }
       query['cohortSelector'] = cohortSelector
    }

    return query;
}

function processCohortCreateQuery(query){
    $("#loading").show();
    let formdata = new FormData();
    formdata.append('cube_id', cubeName);
    formdata.append('mode', 'CreateCohort');
    formdata.append('query', JSON.stringify(query));
    formdata.append('csrfmiddlewaretoken', $('[name="csrfmiddlewaretoken"]').val());

    $.ajax({
        type: "POST",
        dataType: 'json',
        processData: false,
        contentType: false,
        delay: 250,
        data: formdata,
        url: "/dataset/"+set_id+"/cohort-create/",
        success: function(response) {
            // console.log(response)
            if(response.status_code === 200){
                $("#loading").hide();
                // document.getElementById("cohortResults").innerHTML = JSON.stringify(response.text, null, 4);
                // $(".generate-cohort")[0].style.visibility = 'visible'
                var obj = response.text['cohortResList']
                var tbody=$('tbody');
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
                $("#generate-cohort").show();
                if(query['saveCohort']){
                    $("#not_save_flag").hide();
                    $("#save_flag").show();
                } else {
                    $("#save_flag").hide();
                    $("#not_save_flag").show();
                }

                $("#generate-cohort")[0].scrollIntoView();
            } else {
                $("#loading").hide();
                alert("Errors: "+response.text);
            }
        },
        error: function(response) {
            $("#loading").hide();
            alert("Invalid Query: "+response.text);
        }
    });
}

// $('#query-form')[0].onsubmit = function() {
// $('#generate').click = function() {
// $('#submit').click = function() {
function CohortCreate() {
    if (QueryCheck()===false){
        return false
    }
    // console.log(tableYaml)
    var cohortCreateQuery = buildCohortCreateQuery();
    document.getElementById("generateQuery").innerHTML=JSON.stringify(cohortCreateQuery, null, 4)
    // $("#generateQuery")[0].innerHTML=JSON.stringify(cohortCreateQury, null, 4);
    // console.log(cohortCreateQury)

    processCohortCreateQuery(cohortCreateQuery);
    return false;
}


function buildAnalysisQuery(){
    var query = JSON.parse(loyalTemplate);
    query['dataSource'] = cubeName;
    query['queryName'] = $("#query-name")[0].value;

    // step 1
    if($('#filter-users-checkbox')[0].checked){
        var cohort = $($('#cohort-container').find(".cohort-select")[0]).val();
        // console.log(cohort)
        if(cohort !== "-1"){
            query['inputCohort'] = cohort
        }
    }

    // step 2
    if($('#group-users-checkbox')[0].checked){
        var cohortSelector = {}
        var idx = $($('#groupby-container').find(".groupby")[0]).val();
        var obj = tableYaml[idx];
        // console.log(idx, obj)
        cohortSelector['fieldSchema'] = obj.name
       if(obj.fieldType === "Segment"){
            cohortSelector['type'] = "SET"
        } else if (obj.fieldType === "Metric" ) {
           cohortSelector['type'] = "RANGE"
           cohortSelector['min'] = parseInt($($('.advanced-container').find(".adv1")[0])[0].value);
           cohortSelector['max'] = parseInt($($('.advanced-container').find(".adv2")[0])[0].value);
           cohortSelector['interval'] = parseInt($($('.advanced-container').find(".adv3")[0])[0].value);
       } else if (obj.fieldType === "Float" ) {
           cohortSelector['type'] = "RANGE"
           cohortSelector['min'] = parseFloat($($('.advanced-container').find(".adv1")[0])[0].value);
           cohortSelector['max'] = parseFloat($($('.advanced-container').find(".adv2")[0])[0].value);
           cohortSelector['interval'] = parseFloat($($('.advanced-container').find(".adv3")[0])[0].value);
       }
       query['cohortSelector'] = cohortSelector
    }

    // step 3
    query['birthSelector']['birthEvents'] = generateBirthEvent();
    if($('#save-query-checkbox')[0].checked){
        query['saveQuery'] = true;
    } else {
        query['saveQuery'] = false;
    }

    // step 4
    var valueSelector = {};
    var gFilterSize = $("#global-filters-container").find('.data-table-yaml').length;
    var filters = [];
    for (var i = 0; i < gFilterSize; i++) {
        var filter = {};
        var index = $($("#global-filters-container").find('.data-table-yaml')[i]).val();
        var obj = tableYaml[index];
        filter['fieldSchema'] = obj.name;
        if (obj.fieldType === 'Segment' || obj.fieldType === 'Action') {
            filter['type'] = "SET";
            filter['acceptValue'] = $($("#global-filters-container").find('.second-stage')[i]).val();
        }
        // else if (obj.fieldType === 'ActionTime') {
        //     var v1 = $($("#global-filters-container").find('.date1')[i]).find('input').val();
        //     var v2 = $($("#global-filters-container").find('.date2')[i]).find('input').val();
        //     var range = v1 + "|" + v2;
        //     var value = [];
        //     value.push(range);
        //     filter['fieldValue']['values'] = value;
        // }
        else if (obj.fieldType === 'Float' || obj.fieldType === 'Metric' ){
            filter['type'] = "RANGE";
            if (obj.fieldType === 'Float'){
                var v1 = parseFloat($($("#global-filters-container").find('.min')[i]).val());
                var v2 = parseFloat($($("#global-filters-container").find('.max')[i]).val());
            } else {
                var v1 = parseInt($($("#global-filters-container").find('.min')[i]).val());
                var v2 = parseInt($($("#global-filters-container").find('.max')[i]).val());
            }
            v1 = Number.isNaN(v1) ? 'MIN': v1;
            v2 = Number.isNaN(v2) ? 'MAX': v2;
            if (v2 !== 'MAX' && v1 !== 'MIN') {
                if (v2<v1){
                    v2 = 'MAX'
                }
            }
            var range = v1 + " to " + v2;
            var value = [];
            value.push(range);
            filter['acceptValue'] = value;
        }
        filters.push(filter);
    }
    valueSelector['filters'] = filters
    valueSelector['observedSchema'] = $("#measure").val();
    valueSelector['function'] = $("#function").val();
    query['valueSelector'] = valueSelector

    var ageSelector = {};
    ageSelector['unit'] = $($("#cohort-metrix-container").find(".range-select")[0]).val();
    var minAge = parseInt(document.getElementById("min-age").value)
    ageSelector['min'] = Number.isNaN(minAge)?0:minAge;
    var maxAge = parseInt(document.getElementById("max-age").value)
    ageSelector['max'] = Number.isNaN(maxAge)?30:maxAge;
    var intervalAge = parseInt(document.getElementById("interval-age").value)
    ageSelector['interval'] = Number.isNaN(intervalAge)?1:intervalAge;
    query['ageSelector'] = ageSelector

    return query;
}




function processCohortAnalysisQuery(query) {
    $("#loading").show();
    let formdata = new FormData();
    formdata.append('cube_id', cubeName);
    formdata.append('mode', 'CohortAnalysis');
    formdata.append('query', JSON.stringify(query));
    formdata.append('csrfmiddlewaretoken', $('[name="csrfmiddlewaretoken"]').val());

    $.ajax({
        type: "POST",
        dataType: 'json',
        processData: false,
        contentType: false,
        delay: 250,
        data: formdata,
        url: "/dataset/"+set_id+"/cohort-analysis/",
        success: function(response) {
            console.log(response)
            if(response.status_code === 200){
                $("#loading").hide();

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
                    title: {
                        text: ''
                    },
                    legend: {
                        data: [],
                        orient: 'horizontal',
                         y: '5%',
                    },
                    grid:{
                        top:'30%',
                    },
                    xAxis: {},
                    yAxis: {},
                    series: []
                };

                var context = response.text
                $('#cohort-analysis').show();
                for (var obs in context){
                    for (var func in context[obs]) {
                        if (func === 'DISTINCT' || func === 'COUNT'){
                            $(".cohort-analysis-figures").append('<div id=\"line'+obs+func+'\" style=\"height:0px\"></div>')
                            var line_chart = echarts.init(document.getElementById("line"+obs+func));
                            var new_op = option_line;
                            new_op['title']['text'] = context[obs][func]['line']['title']
                            new_op['legend']['data'] = context[obs][func]['line']['legend']
                            new_op['xAxis']['data'] = context[obs][func]['line']['xdata']
                            new_op['series'] = context[obs][func]['line']['series']
                            $("#line"+obs+func).css("height", "450px");
                            $("#line"+obs+func).show();
                            line_chart.resize();
                            line_chart.setOption(new_op);

                            $(".cohort-analysis-figures").append('<div id=\"heat'+obs+func+'\" style=\"height:0px\"></div>')
                            var heatmap_chart = echarts.init(document.getElementById("heat"+obs+func));
                            var new_op = option_heat;
                            new_op['title']['text'] = context[obs][func]['heat']['title']
                            new_op['xAxis']['data'] = context[obs][func]['heat']['xdata']
                            new_op['yAxis']['data'] = context[obs][func]['heat']['legend']
                            new_op['series'][0]['data'] = context[obs][func]['heat']['series']
                            $("#heat"+obs+func).css("height", "450px");
                            $("#heat"+obs+func).show();
                            heatmap_chart.resize();
                            heatmap_chart.setOption(new_op);
                        }
                        else if (func === 'RANGE'){
                            $(".cohort-analysis-figures").append('<div id=\"range'+obs+func+'\" style=\"height:0px\"></div>')
                            var range_chart = echarts.init(document.getElementById("range"+obs+func));
                            var new_op = option_range;
                            new_op['title']['text'] = context[obs][func]['title']
                            new_op['xAxis']['data'] = context[obs][func]['xdata']
                            new_op['legend']['data'] = context[obs][func]['legend']
                            for (var i=0; i<context[obs][func]['series'].length; i++) {
                                 if (context[obs][func]['series'][i]['type'] === 'custom') {
                                     context[obs][func]['series'][i]['renderItem'] = renderItem
                                 }
                            }
                            new_op['series'] = context[obs][func]['series']
                            $("#range"+obs+func).css("height", "450px");
                            $("#range"+obs+func).show();
                            range_chart.resize();
                            range_chart.setOption(option_range)
                        }
                    }
                }

                if(query['saveQuery']){
                    $("#not_save_flag").hide();
                    $("#save_flag").show();
                } else {
                    $("#save_flag").hide();
                    $("#not_save_flag").show();
                }

                $("#cohort-analysis")[0].scrollIntoView();
                // document.getElementById("cohortResults").innerHTML = JSON.stringify(response.text, null, 4);

            } else {
                $("#loading").hide();
                alert("Errors: "+response.text);
            }
        },
        error: function(response) {
            $("#loading").hide();
            alert("Invalid Query: "+response.text);
        }
    });
}

function CohortAnalysis() {
    if (QueryCheck()===false){
        return false
    }
    // console.log(tableYaml)
    var cohortAnalysisQuery = buildAnalysisQuery();
    document.getElementById("generateQuery").innerHTML=JSON.stringify(cohortAnalysisQuery, null, 4)
    $("#generateQuery")[0].innerHTML=JSON.stringify(cohortAnalysisQuery, null, 4);
    // console.log(cohortAnalysisQuery)

    // var cohortAnalysisQuery = {}
    processCohortAnalysisQuery(cohortAnalysisQuery);
    return false;
}

function SavePage() {
    var content = $('.container-fluid').innerHTML()
    console.log(content)
    let formdata = new FormData();
    formdata.append('content', content);
    formdata.append('queryName', $("#query-name")[0].value);
    formdata.append('csrfmiddlewaretoken', $('[name="csrfmiddlewaretoken"]').val());
    $.ajax({
        type: "POST",
        dataType: 'json',
        processData: false,
        contentType: false,
        delay: 250,
        data: formdata,
        url: "/save_query_page/"+set_id+'/',
        success: function (response) {
            // console.log(response)
            if (response.code == 200){
                 alert(response.text)
            } else {
                alert("Errors: "+response.text);
            }
        },
        error: function(response) {
            alert("Invalid Query: "+response.text);
        }
    })
}

function LoadPage() {
    let formdata = new FormData();
    // formdata.append('content', content);
    // formdata.append('queryName', $("#query-name")[0].value);
    formdata.append('csrfmiddlewaretoken', $('[name="csrfmiddlewaretoken"]').val());
    $.ajax({
        type: "GET",
        dataType: 'json',
        processData: false,
        contentType: false,
        delay: 250,
        data: formdata,
        url: "/load_query_page/"+set_id+'/' +'1/',
        success: function (response) {
            // console.log(response)
            if (response.code == 200){
                 // alert(response.text)
                var content = $('.container-fluid')
                content.empty()
                content.append(response.text)
            } else {
                alert("Errors: "+response.text);
            }
        },
        error: function(response) {
            alert("Invalid Query: "+response.text);
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
