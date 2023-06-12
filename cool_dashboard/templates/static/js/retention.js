'use strict';

let cohortUserHtml = '<div class="event-container">'+
'    <div class="row mb-4">'+
'        <label class="col-sm-offset-2 control-label birthEvent-label">Event </label>'+
'        <i class="fa fa-minus-circle event-remove" style="display:none;padding-left:7px;" aria-hidden="true"></i>'+
'    </div>'+
'    <div class="row mb-4">'+
'        <label class="control-label col-md-1 col-sm-1 col-xs-12">Event:</label>'+
'        <div class="col-md-9 multi-eventFilters userSelection" >'+
'            <div class="row mb-3">'+
'                <label class="text-center col-md-2 col-sm-2 col-xs-12">Their</label>'+
'                <div class="select-multi-stage col-md-8 col-sm-8 col-xs-12">'+
'                    <div class="col-md-5 col-sm-5 col-xs-5 float-left">'+
'                        <select class="form-select select2-single data-table-yaml">'+
'                        </select>'+
'                    </div>'+
'                    <label class="text-center col-md-1 col-sm-1 col-xs-12 float-left">is</label>'+
'                    <div class="col-md-6 col-sm-6 col-xs-12 float-left segment" >'+
'                        <select class="form-select second-stage"> </select>'+
'                    </div>'+
'                    <div class="row md-3 col-sm-6 col-sm-6 col-xs-12 datetimepicker" style="display: none;">'+
'                        <div class="input-group date date1">'+
'                            <input type="text" class="form-control datepicker-datetime" >'+
'                            <span class="input-group-addon">'+
'                                <span class="glyphicon glyphicon-calendar"></span>'+
'                            </span>'+
'                        </div>'+
'                        <div class="input-group date date2">'+
'                            <input type="text" class="form-control datepicker-datetime" >'+
'                            <span class="input-group-addon">'+
'                                <span class="glyphicon glyphicon-calendar"></span>'+
'                            </span>'+
'                        </div>'+
'                    </div>'+
'                    <div class="row col-md-6 col-sm-6 col-xs-12 intRange" style="display: none;">'+
'                        <div class="col-md-5 col-sm-5 col-xs-5">'+
'                            <input type="text" class="form-control event-min " placeholder="1">'+
'                        </div>'+
'                        <div class="col-md-1 col-sm-1 col-xs-1" style="float:left; line-height:33px;">-</div>'+
'                        <div class="col-md-5 col-sm-5 col-xs-5">'+
'                            <input type="text" class="form-control event-min " placeholder="100">'+
'                        </div>'+
'                    </div>'+
'                </div>'+
'                <div class="col-sm-2 col-sm-2 col-xs-12">'+
'                    <i class="fa fa-plus-circle eventFilter-add" style="padding-right:7px;" aria-hidden="true"></i>'+
'                    <i class="fa fa-minus-circle eventFilter-remove" style="display:none;padding-right:7px;" aria-hidden="true"></i>'+
'                </div>'+
'            </div>'+
'        </div>'+
'    </div>'+
'    <div class="row mb-4">'+
'        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="min_user_freq">Minimal Frequency:</label>'+
'        <div class="col-md-5 col-sm-5 col-xs-5">'+
'            <input type="text" id="min_user_freq" required="required" class="form-control col-md-2 col-xs-2 min" placeholder="1">'+
'        </div>'+
'        <div class="col-md-1 col-sm-1 col-xs-3" style="float:left; line-height:33px;">time(s)</div>'+
'    </div>'+
'</div>';

let cohortEventHtml = '<div class="event-container">' +
    '    <div class="row mb-4">' +
    '        <label class="col-sm-offset-2 control-label birthEvent-label">Event </label>' +
    '        <i class="fa fa-minus-circle event-remove" style="display:none;padding-left:7px;" aria-hidden="true"></i>' +
    '    </div>' +
    '    <div class="row mb-4">' +
    '        <label class="control-label col-md-2 col-sm-2 col-xs-12">Event:</label>' +
    '        <div class="col-md-9 multi-eventFilters eventSelection" >' +
'            <div class="row mb-3">'+
'                <label class="text-center col-md-2 col-sm-2 col-xs-12">Their</label>'+
'                <div class="select-multi-stage col-md-8 col-sm-8 col-xs-12">'+
'                    <div class="col-md-5 col-sm-5 col-xs-5 float-left">'+
'                        <select class="form-select select2-single data-table-yaml">'+
'                        </select>'+
'                    </div>'+
'                    <label class="text-center col-md-1 col-sm-1 col-xs-12 float-left">is</label>'+
'                    <div class="col-md-6 col-sm-6 col-xs-12 float-left segment" >'+
'                        <select class="form-select second-stage"> </select>'+
'                    </div>'+
'                    <div class="row md-3 col-sm-6 col-sm-6 col-xs-12 datetimepicker" style="display: none;">'+
'                        <div class="input-group date date1">'+
'                            <input type="text" class="form-control datepicker-datetime" >'+
'                            <span class="input-group-addon">'+
'                                <span class="glyphicon glyphicon-calendar"></span>'+
'                            </span>'+
'                        </div>'+
'                        <div class="input-group date date2">'+
'                            <input type="text" class="form-control datepicker-datetime" >'+
'                            <span class="input-group-addon">'+
'                                <span class="glyphicon glyphicon-calendar"></span>'+
'                            </span>'+
'                        </div>'+
'                    </div>'+
'                    <div class="row col-md-6 col-sm-6 col-xs-12 intRange" style="display: none;">'+
'                        <div class="col-md-5 col-sm-5 col-xs-5">'+
'                            <input type="text" class="form-control event-min " placeholder="1">'+
'                        </div>'+
'                        <div class="col-md-1 col-sm-1 col-xs-1" style="float:left; line-height:33px;">-</div>'+
'                        <div class="col-md-5 col-sm-5 col-xs-5">'+
'                            <input type="text" class="form-control event-min " placeholder="100">'+
'                        </div>'+
'                    </div>'+
'                </div>'+
'                <div class="col-sm-2 col-sm-2 col-xs-12">'+
'                    <i class="fa fa-plus-circle eventFilter-add" style="padding-right:7px;" aria-hidden="true"></i>'+
'                    <i class="fa fa-minus-circle eventFilter-remove" style="display:none;padding-right:7px;" aria-hidden="true"></i>'+
'                </div>'+
'            </div>'+
    '        </div>' +
    '    </div>' +
    '    <div class="row mb-4">' +
    '        <label class="control-label col-md-3 col-sm-3 col-xs-12" >Frequency:</label>' +
    '        <div class="col-md-1 col-sm-1 col-xs-5">' +
    '            <input type="text"  required="required" class="form-control col-md-2 col-xs-2 min" placeholder="1">' +
    '        </div>' +
    '        <div class="col-md-1 col-sm-1 col-xs-1" style="float:left; line-height:33px;">-</div>' +
    '        <div class="col-md-1 col-sm-1 col-xs-5">' +
    '            <input type="text"  required="required" class="form-control col-md-2 col-xs-2 max" placeholder="∞">' +
    '        </div>' +
    '        <div class="col-md-1 col-sm-1 col-xs-1" style="float:left; line-height:33px;">time(s)</div>' +
    '    </div>' +
    '</div>';


// Add event.
function handleNewUserEvent() {
    var added = $(cohortUserHtml);
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

// Add event.
function handleNewEvent() {
    var added = $(cohortEventHtml);
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
'            <input type="text" class="form-control min ">'+
'        </div>'+
'        <div class="col-md-1 col-sm-1 col-xs-1 text-center" style="float:left; line-height:33px;">-</div>'+
'        <div class="col-md-5 col-sm-5 col-xs-5">'+
'            <input type="text" class="form-control max ">'+
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
'                <input type="text" class="form-control event-min " placeholder="1">'+
'            </div>'+
'            <div class="col-md-1 col-sm-1 col-xs-1" style="float:left; line-height:33px;">-</div>'+
'            <div class="col-md-5 col-sm-5 col-xs-5">'+
'                <input type="text" class="form-control event-min " placeholder="100">'+
'            </div>'+
'        </div>'+
'    </div>'+
'    <div class="col-sm-2 col-sm-2 col-xs-12">'+
'        <i class="fa fa-plus-circle eventFilter-add" style="padding-right:7px;" aria-hidden="true"></i>'+
'        <i class="fa fa-minus-circle eventFilter-remove" style="display:none;padding-right:7px;" aria-hidden="true"></i>'+
'    </div>'+
'</div>'


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
        $("#users-events-container").show();
        $(".users-add-event-btn").show();

    } else {
        $("#users-events-container").hide();
        $(".users-add-event-btn").hide();
    }
});


// Show/Hide Advanced options.
$(document.body).on('click', '.advanced-checkbox', function(d) {
    // console.log($(this).parent().parents('.advanced-check').siblings())
    var advancedForm = $(this).parents('.advanced-check').children(".advanced-container");
    if($(this).is(':checked')) {
        advancedForm.show();
    } else {
        advancedForm.hide();
    }
});







$(document).ready(function (){
    // MeasureSelect2($(".select2-single.data-cube-yaml"));
    MeasureSelect2($("#measure"));
    EventSelect2($(".select2-single.data-table-yaml"));
    GroupBySelect2($("#groupby"));
    flatpickr(".datepicker-datetime",{enableTime:!0,dateFormat:"m-d-Y H:i",defaultDate:new Date});
    updateEventLabelNumbering();

    $("#line").hide();
    $("#heat").hide();
    $("#loading").hide();
})



//process measure selectors
function MeasureSelect2(jqObj){
    jqObj.append('<option></option>'); // for select2 placeholder
    let formdata = new FormData();
    // formdata.append('cube_id', $("#cube_id").val());
    formdata.append('cube_id', cubeID);
    formdata.append('csrfmiddlewaretoken', $('[name="csrfmiddlewaretoken"]').val());
    jqObj.select2({
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
    });
}


//process groupby selectors
function GroupBySelect2(jqObj){
    jqObj.append('<option></option>'); // for select2 placeholder
    let formdata = new FormData();
    // formdata.append('cube_id', $("#cube_id").val());
    formdata.append('cube_id', cubeID);
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
    formdata.append('cube_id', cubeID);
    formdata.append('csrfmiddlewaretoken', $('[name="csrfmiddlewaretoken"]').val());
    jqObj.select2({
        minimumResultsForSearch: 5,
        placeholder: 'Select an option',
        // data: tableYaml.map(function(d,i) {
        //     return { id: String(i), text: d.name };
        // })
        ajax: {
            url: '/return_fileds/',
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
            formdata.append('cube_id', cubeID);
            formdata.append('field_id', idx);
            formdata.append('csrfmiddlewaretoken', $('[name="csrfmiddlewaretoken"]').val());
            secondStage.select2('destroy').empty().select2({
                multiple: true,
                ajax: {
                    url: '/return_field_detail/',
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
        }else if(obj.fieldType === 'Metric'){
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
            // formdata.append('cube_id', cubeID);
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

var loyalTemplate = '{"birthSelector":{"birthEvents":[]},"outputCohort":"all"}';
function buildCohort(){
    var query = JSON.parse(loyalTemplate);
    query['dataSource'] = cubeID;
    query['queryName'] = $("#query-name")[0].value;

    var eventSelectSize = $(".event-container .userSelection").length;
    // console.log("eventSelectSize:", eventSelectSize)
    var eventSelects = [];
    for(var h = 0; h < eventSelectSize; h++){
        var eventDiv = $($($(".event-container .userSelection")[h]).parent('div').parent('div')[0]);
        var eventSize = $($(".event-container .userSelection")[h]).find(".row .data-table-yaml").length;
        // console.log("eventSize:", eventSize)
        var events = [];
        for(var i = 0; i < eventSize; i++){
            // var event = JSON.parse(eventTemplate);
            var event = {};
            var index = $($($(".event-container .userSelection")[h]).find(".row .data-table-yaml")[i]).val();
            // console.log("index", index)
            var obj = tableYaml[index];
            // console.log("obj", obj)
            event['fieldSchema'] = obj.name;
            if(obj.fieldType === "Segment"){
                event['type'] = 'SET'
                event['acceptValue'] = $($($(".event-container .userSelection")[h]).find(".row .second-stage")[i]).val();
                // events.push(event);
            }
            // else if(obj.fieldType === 'ActionTime'){
            //     var v1 = $($($(".event-container .userSelection")[h]).find(".row .date1")[i]).find('input').val();
            //     var v2 = $($($(".event-container .userSelection")[h]).find(".row .date2")[i]).find('input').val();
            //     var range = v1 + "|" + v2;
            //     var value = [];
            //     value.push(range);
            //     event['fieldValue']['values'] = value;
            // }
            else{
                var v1 = parseInt($($($(".event-container .userSelection")[h]).find(".row .event-min")[i]).val());
                var v2 = parseInt($($($(".event-container .userSelection")[h]).find(".row .event-max")[i]).val());
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
    query['birthSelector']['birthEvents'] = eventSelects;
    if($('#save-cohort-checkbox')[0].checked){
        query['saveCohort'] = true
    }
    return query;
}



// $('#query-form')[0].onsubmit = function() {
// $('#generate').click = function() {
// $('#submit').click = function() {
function CohortCreate() {
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

    // console.log(tableYaml)
    var cohortCreateQury = buildCohort();
    document.getElementById("generateQuery").innerHTML=JSON.stringify(cohortCreateQury, null, 4)
    // $("#generateQuery")[0].innerHTML=JSON.stringify(cohortCreateQury, null, 4);
    // console.log(cohortCreateQury)

    processCohortCreateQuery(cohortCreateQury);
    return false;
}

function processCohortCreateQuery(query){
    $("#loading").show();
    let formdata = new FormData();
    formdata.append('cube_id', cubeID);
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