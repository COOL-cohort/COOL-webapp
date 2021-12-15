'use strict';

var eventFilterHtml = ' <div class="form-group row">' +
    '<label class="control-label col-md-1 col-sm-1 col-xs-12">' + gettext("Their") + '</label>' +
    '<div class="select-multi-stage col-md-10 col-sm-10 col-xs-12">' +
    '<div class="col-md-5 col-sm-5 col-xs-11 width">' +
    '<select class="form-control select2-single data-table-yaml">' +
    '</select>' +
    '</div>' +
    '<label class="control-label float-left">' + gettext("is") + '</label>' +
    '<div class="col-md-6 col-sm-6 col-xs-12 width">' +
    '<select class="form-control second-stage"> </select>' +
    '</div>' +
    '<div class="col-sm-6 col-sm-6 col-xs-12 datetimepicker" style="display: none;">' +
    '<div class="input-group date date1">' +
    '<input type="text" class="form-control" />' +
    '<span class="input-group-addon">' +
    '<span class="glyphicon glyphicon-calendar"></span>' +
    '</span>' +
    '</div>' +
    '<div class="input-group date date2">' +
    '<input type="text" class="form-control" />' +
    '<span class="input-group-addon">' +
    '<span class="glyphicon glyphicon-calendar"></span>' +
    '</span>' +
    '</div>' +
    '</div>' +
    '<div class="col-sm-6 col-sm-6 col-xs-12 intRange" style="display: none;">' +
    '<div class="col-md-5 col-sm-5 col-xs-5">' +
    '<input type="text" class="form-control event-min " placeholder="1">' +
    '</div>' +
    '<div style="float:left; line-height:33px;">-</div>' +
    '<div class="col-md-5 col-sm-5 col-xs-5">' +
    '<input type="text" class="form-control event-max " placeholder="100">' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<i class="fa fa-plus-circle eventFilter-add" style="padding-right:7px;" aria-hidden="true"></i>' +
    '<i class="fa fa-minus-circle eventFilter-remove" style="display:none;padding-right:7px;" aria-hidden="true"></i>' +
    '</div>;';

var cohortEventHtml = '<div class="event-container">' +
    '<div class="form-group">' +
    '<label class="col-sm-offset-2 control-label birthEvent-label">' + gettext("Event") + ' </label>' +
    '<i class="fa fa-minus-circle event-remove" style="display:none;padding-left:7px;" aria-hidden="true"></i>' +
    '</div>' +
    '<div class="form-group">' +
    '<div class="row">' +
    '<label class="control-label col-md-3 col-sm-3 col-xs-12">' + gettext("Event:") + '</label>' +
    '<div class="col-md-9 multi-eventFilters eventSelection" >' +
    '<div class="form-group row">' +
    '<label class="control-label col-md-1 col-sm-1 col-xs-12">' + gettext("Their") + '</label>' +
    '<div class="select-multi-stage col-md-10 col-sm-10 col-xs-12">' +
    '<div class="col-md-5 col-sm-5 col-xs-11 width">' +
    '<select class="form-control select2-single data-table-yaml">' +
    '</select>' +
    '</div>' +
    '<label class="control-label float-left">' + gettext("is") + '</label>' +
    '<div class="col-md-6 col-sm-6 col-xs-12 width">' +
    '<select class="form-control second-stage"> </select>' +
    '</div>' +
    '<div class="col-sm-6 col-sm-6 col-xs-12 datetimepicker" style="display: none;">' +
    '<div class="input-group date date1">' +
    '<input type="text" class="form-control" />' +
    '<span class="input-group-addon">' +
    '<span class="glyphicon glyphicon-calendar"></span>' +
    '</span>' +
    '</div>' +
    '<div class="input-group date date2">' +
    '<input type="text" class="form-control" />' +
    '<span class="input-group-addon">' +
    '<span class="glyphicon glyphicon-calendar"></span>' +
    '</span>' +
    '</div>' +
    '</div>' +
    '<div class="col-sm-6 col-sm-6 col-xs-12 intRange" style="display: none;">' +
    '<div class="col-md-5 col-sm-5 col-xs-5">' +
    '<input type="text" class="form-control event-min " placeholder="1">' +
    '</div>' +
    '<div style="float:left; line-height:33px;">-</div>' +
    '<div class="col-md-5 col-sm-5 col-xs-5">' +
    '<input type="text" class="form-control event-max " placeholder="100">' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<i class="fa fa-plus-circle eventFilter-add" style="padding-right:7px;" aria-hidden="true"></i>' +
    '<i class="fa fa-minus-circle eventFilter-remove" style="display:none;padding-right:7px;" aria-hidden="true"></i>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="form-group">' +
    '<label class="control-label col-md-3 col-sm-3 col-xs-12" for="min">' + gettext("Frequency") + ':</label>' +
    '<div class="col-md-1 col-sm-1 col-xs-5">' +
    '<input type="text" name="min" required="required" class="form-control col-md-2 col-xs-2 min" placeholder="1">' +
    '</div>' +
    '<div style="float:left; line-height:33px;">-</div>' +
    '<div class="col-md-1 col-sm-1 col-xs-5">' +
    '<input type="text" name="max" required="required" class="form-control col-md-2 col-xs-2 max" placeholder="∞">' +
    '</div>' +
    '<div style="float:left; line-height:33px;">' + gettext("time(s)") + '</div>' +
    '</div>' +
    '<div class="form-group">' +
    '<label class="control-label col-md-3 col-sm-3 col-xs-12">' + gettext("Group by") + ':</label>' +
    '<div class="col-md-3 col-sm-3 col-xs-12">' +
    '<select class="form-control select2-single data-table-yaml groupby">' +
    '</select>' +
    '</div>' +
    '<div class="col-md-3 col-sm-3 col-xs-12">' +
    '<label class="control-label float-left">' + gettext("Advanced") + ':</label>' +
    '<div class="float-left">' +
    '<input style="margin-top:12px; margin-left: 8px;" class="advanced-checkbox adv" type="checkbox" name="" >' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="form-group advanced-container">' +
    '<div class="row">' +
    '<label class="control-label col-md-offset-1 col-md-3 col-sm-3 col-xs-12 ">' + gettext("Min") + ':</label>' +
    '<div class="col-md-1 col-sm-1 col-xs-12">' +
    '<input type="text" placeholder="0" class="form-control adv1" placeholder="">' +
    '</div>' +
    '<label class="control-label col-md-1 col-sm-1 col-xs-12 ">' + gettext("Max") + ':</label>' +
    '<div class="col-md-1 col-sm-1 col-xs-12">' +
    '<input type="text" placeholder="10" class="form-control adv2" placeholder="">' +
    '</div>' +
    '</div>' +
    '<div class="row" style="margin-top:6px">' +
    '<label class="control-label col-md-offset-1 col-md-3 col-sm-3 col-xs-12 ">' + gettext("Interval") + ':</label>' +
    '<div class="col-md-1 col-sm-1 col-xs-12">' +
    '<input type="text" placeholder="20" class="form-control adv3" placeholder="">' +
    '</div>' +
    '<label class="control-label col-md-1 col-sm-1 col-xs-12 ">' + gettext("Log Scale") + ':</label>' +
    '<div class="col-md-1 col-sm-1 col-xs-12">' +
    '<input style="margin-top:12px;" class="adv4" type="checkbox" name="" >' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>;';

var cohortUserHtml = '<div class="event-container">' +
    '<div class="form-group">' +
    '<label class="col-sm-offset-2 control-label birthEvent-label">' + gettext("Event") + ' </label>' +
    '<i class="fa fa-minus-circle event-remove" style="display:none;padding-left:7px;" aria-hidden="true"></i>' +
    '</div>' +
    '<div class="form-group">' +
    '<div class="row">' +
    '<label class="control-label col-md-3 col-sm-3 col-xs-12">' + gettext("Event:") + '</label>' +
    '<div class="col-md-9 multi-eventFilters userSelection" >' +
    '<div class="form-group row">' +
    '<label class="control-label col-md-1 col-sm-1 col-xs-12">' + gettext("Their") + '</label>' +
    '<div class="select-multi-stage col-md-10 col-sm-10 col-xs-12">' +
    '<div class="col-md-5 col-sm-5 col-xs-11 width">' +
    '<select class="form-control select2-single data-table-yaml">' +
    '</select>' +
    '</div>' +
    '<label class="control-label float-left">' + gettext("is") + '</label>' +
    '<div class="col-md-6 col-sm-6 col-xs-12 width">' +
    '<select class="form-control second-stage"> </select>' +
    '</div>' +
    '<div class="col-sm-6 col-sm-6 col-xs-12 datetimepicker" style="display: none;">' +
    '<div class="input-group date date1">' +
    '<input type="text" class="form-control" />' +
    '<span class="input-group-addon">' +
    '<span class="glyphicon glyphicon-calendar"></span>' +
    '</span>' +
    '</div>' +
    '<div class="input-group date date2">' +
    '<input type="text" class="form-control" />' +
    '<span class="input-group-addon">' +
    '<span class="glyphicon glyphicon-calendar"></span>' +
    '</span>' +
    '</div>' +
    '</div>' +
    '<div class="col-sm-6 col-sm-6 col-xs-12 intRange" style="display: none;">' +
    '<div class="col-md-5 col-sm-5 col-xs-5">' +
    '<input type="text" class="form-control event-min " placeholder="1">' +
    '</div>' +
    '<div style="float:left; line-height:33px;">-</div>' +
    '<div class="col-md-5 col-sm-5 col-xs-5">' +
    '<input type="text" class="form-control event-min " placeholder="100">' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<i class="fa fa-plus-circle eventFilter-add" style="padding-right:7px;" aria-hidden="true"></i>' +
    '<i class="fa fa-minus-circle eventFilter-remove" style="display:none;padding-right:7px;" aria-hidden="true"></i>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="form-group">' +
    '<label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">' + gettext("Frequency") + ':</label>' +
    '<div class="col-md-1 col-sm-1 col-xs-5">' +
    '<input type="text" required="required" class="form-control col-md-2 col-xs-2 min" placeholder="1">' +
    '</div>' +
    '<div style="float:left; line-height:33px;">-</div>' +
    '<div class="col-md-1 col-sm-1 col-xs-5">' +
    '<input type="text" required="required" class="form-control col-md-2 col-xs-2 max" placeholder="∞">' +
    '</div>' +
    '<div style="float:left; line-height:33px;">' + gettext("time(s)") + '</div>' +
    '</div>' +
    '<div class="form-group">' +
    '<label class="control-label col-md-3 col-sm-3 col-xs-12" for="last-name">' + gettext("In the") + '  </label>' +
    '<div style="width: 80px; float:left; line-height:33px;">' +
    '<select class="form-control select2-single range-select first">' +
    '<option>' + gettext("first") + '</option>' +
    '<option>' + gettext("any") + '</option>' +
    '</select>' +
    '</div>' +
    '<div class="col-md-1 col-sm-1 col-xs-5">' +
    '<input type="text" required="required" class="form-control col-md-2 col-xs-2 day" placeholder="7">' +
    '</div>' +
    '<div style="float:left; line-height:33px; font-weight: 800;">' + gettext("day(s)") + '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

var globalFilterHtml = '<div class="global-filter select-multi-stage row pad-bottom">' +
    '<div class="col-md-3 col-sm-3 col-xs-6"> <select class="form-control select2-single data-table-yaml"> </select> </div>' +
    '<div class="col-md-6 col-sm-6 col-xs-6"> <select class="form-control select2-single second-stage"> </select> </div>' +
    '<div class="col-sm-6 col-sm-6 col-xs-6 datetimepicker" style="display: none;">' +
    '<div class="input-group date date1"><input type="text" class="form-control" /><span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span></div>' +
    '<div class="input-group date date2"><input type="text" class="form-control" /><span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span></div>' +
    '</div>' +
    '<div class="col-sm-6 col-sm-6 col-xs-6 intRange" style="display: none;">' +
    '<div class="col-md-5 col-sm-5 col-xs-5"><input type="text" class="form-control min " placeholder="1"></div>' +
    '<div style="float:left; line-height:33px;">-</div>' +
    '<div class="col-md-5 col-sm-5 col-xs-5"><input type="text" class="form-control max " placeholder="100"></div>' +
    '</div>' +
    '<i class="fa fa-plus-circle globalFilter-add" style="padding-right:7px;" aria-hidden="true"></i> <i class="fa fa-minus-circle globalFilter-remove" style="padding-right:7px;" aria-hidden="true"></i> ' +
    '</div>';

var queryTemplate = '{"appKey":"fd1ec667-75a4-415d-a250-8fbb71be7cab","birthSequence":{ "birthEvents":[]}}';
var eventSelectionTemplate = '{"eventSelection":[{"fieldValue":{"type":"AbsoluteValue","values":["LAUNCH"],"baseField":null,"baseEvent":-1},"cubeField":"ACTION","filterType":"Set"}],"cohortFields":[{"numLevel":10,"minLevel":0,"logScale":"false","scale":20}]}';
var eventTemplate = '{"fieldValue":{"type":"AbsoluteValue","values":["LAUNCH"],"baseField":null,"baseEvent":-1},"cubeField":"ACTION","filterType":"Set"}';
var loyalTemplate = '{"birthSequence":{"birthEvents":[]},"outputCohort":"loyal"}';
var loyalSelectionTemplate = '{"eventSelection":[],"timeWindow":{"length":7,"slice":"false","unit":"DAY"}}';

var maxAge = 0;

$(document).ready(function() {
    $(".range-select").select2({
        //placeholder: 'Select some events',
        minimumResultsForSearch: 999,
    }).on('change', function() {
        if($(this).val() === "events") {
            $(".range-others").show();
        } else {
            $(".range-others").hide();
        }
    });
    $(".select2-multiple-remote").select2({
        multiple: true,
        placeholder: 'Select some events',
        data: djangoData.events
    });

    initCubeYamlSelect2($(".select2-single.data-cube-yaml"));
    initTableYamlSelect2($(".select2-single.data-table-yaml"));
    initSpecialTableYamlSelect2($(".select2-single2.data-table-yaml"));
    updateEventLabelNumbering();
    $("#line").hide();
    $("#heat").hide();
    $("#loading").hide();
});

function updateEventLabelNumbering() {
    var $userLabels = $("#users-events-container").find(".birthEvent-label");
    var $cohortLabels = $("#events-container").find(".birthEvent-label");

    $userLabels.each(function(i) { $(this).html(gettext("Event ") + ++i); });
    $cohortLabels.each(function(i) { $(this).html(gettext("Event ") + ++i); });
}

function initCubeYamlSelect2(jqObj) {
    jqObj.append('<option></option>'); // for select2 placeholder
    jqObj.select2({
        minimumResultsForSearch: 5,
        placeholder: gettext('Select an option'),
        data: djangoData['cube.yaml']['measures'].map(function(d,i) {
            return { id: String(d.name), text: d.name};
        })
    });
}

function initTableYamlSelect2(jqObj) {
    jqObj.append('<option></option>'); // for select2 placeholder
    jqObj.parents(".select-multi-stage").find(".second-stage").select2({
        placeholder: gettext('Select an option'),
        disabled: true
    });
    jqObj.select2({
        minimumResultsForSearch: 5,
        placeholder: gettext('Select an option'),
        data: djangoData['table.yaml']['fields'].map(function(d,i) {
            return { id: String(i), text: d.name };
        })
    }).on('change', function(d) {
        var idx = $(this).val();
        var obj = djangoData['table.yaml']['fields'][idx];
        if(obj.dataType === 'String'){
            var datetimepicker = $(this).parents(".select-multi-stage").find(".datetimepicker");
            $(datetimepicker).hide();
            var intRange = $(this).parents(".select-multi-stage").find(".intRange");
            $(intRange).hide();
            var secondStage = $(this).parents(".select-multi-stage").find(".second-stage");
            secondStage.show();
            secondStage.select2('destroy').empty().select2({
                multiple: true,
                ajax: {
                    url: '/dim/v1/?col=' + obj.name,
                    dataType: 'json',
                    data: function(params) {
                        return {
                            term: params.term || '',
                            page: params.page || 1
                        }
                    },
                    processResults: function(resp) {
                        resp.results = resp.results.map(function(d,i) {
                            return { id: d, text: d };
                        });
                        resp.pagination.more = (resp.pagination.more === "true");
                        return resp;
                    },
                    delay: 500
                },
                cache: true,
                disabled: false
            });
        }else if(obj.fieldType === 'ActionTime'){
            var secondStage = $(this).parents(".select-multi-stage").find(".second-stage");
            secondStage.select2('destroy').empty().select2({
                placeholder: gettext('Select an option'),
                disabled: true
            });
            var secondStageContainer = $(this).parents(".select-multi-stage").find(".select2-container--disabled");
            $(secondStage).hide();
            $(secondStageContainer).hide();
            var intRange = $(this).parents(".select-multi-stage").find(".intRange");
            $(intRange).hide();
            var datetimepicker = $(this).parents(".select-multi-stage").find(".datetimepicker");
            $(datetimepicker).show();

            $.get( '/dim/v1/?col=' + obj.name, function( data ) {
                var result = JSON.parse(data).results[0].split("|");
                var start = result[0] + " 00:00:00";
                var end = result[1] + " 23:59:59";
                $($(datetimepicker).find(".input-group.date1")).datetimepicker({
                    format: 'YYYY/MM/DD HH:mm:ss',
                    minDate: start,
                    maxDate: end,
                    defaultDate: start
                });
                $($(datetimepicker).find(".input-group.date2")).datetimepicker({
                    format: 'YYYY/MM/DD HH:mm:ss',
                    minDate: start,
                    maxDate: end,
                    defaultDate: end
                });
                $($(datetimepicker).find(".input-group.date1")).on("dp.change", function (e) {
                    $($(datetimepicker).find(".input-group.date2")).data("DateTimePicker").minDate(e.date);
                });
                $($(datetimepicker).find(".input-group.date2")).on("dp.change", function (e) {
                    $($(datetimepicker).find(".input-group.date1")).data("DateTimePicker").maxDate(e.date);
                });
            });
        }else{
            var secondStage = $(this).parents(".select-multi-stage").find(".second-stage");
            secondStage.select2('destroy').empty().select2({
                placeholder: gettext('Select an option'),
                disabled: true
            });
            var secondStageContainer = $(this).parents(".select-multi-stage").find(".select2-container--disabled");
            $(secondStage).hide();
            $(secondStageContainer).hide();
            var datetimepicker = $(this).parents(".select-multi-stage").find(".datetimepicker");
            $(datetimepicker).hide();
            var intRange = $(this).parents(".select-multi-stage").find(".intRange");
            $(intRange).show();
        }

    });
}

function initSpecialTableYamlSelect2(jqObj) {
    jqObj.append('<option></option>'); // for select2 placeholder
    jqObj.parents(".select-multi-stage").find(".second-stage").select2({
        placeholder: gettext('Select an option'),
        disabled: true
    });
    var data = [];
    for(var i in djangoData['table.yaml']['fields']){
        var obj = djangoData['table.yaml']['fields'][i];
        if(obj.dataType === 'String'){
            data.push({ id: String(i), text: obj.name });
        }
    }
    jqObj.select2({
        minimumResultsForSearch: 5,
        placeholder: gettext('Select an option'),
        data: data
    }).on('change', function(d) {
        var idx = $(this).val();
        var obj = djangoData['table.yaml']['fields'][idx];
        var secondStage = $(this).parents(".select-multi-stage").find(".second-stage");
        secondStage.show();
        secondStage.select2('destroy').empty().select2({
            multiple: true,
            ajax: {
                url: '/dim/v1/?col=' + obj.name,
                dataType: 'json',
                data: function(params) {
                    return {
                        term: params.term || '',
                        page: params.page || 1
                    }
                },
                processResults: function(resp) {
                    resp.results = resp.results.map(function(d,i) {
                        return { id: d, text: d };
                    });
                    resp.pagination.more = (resp.pagination.more === "true");
                    return resp;
                },
                delay: 500
            },
            cache: true,
            disabled: false
        });

    });
}

$(document.body).on('click', '.globalFilter-add.fa-plus-circle', function(d) {
    var filterContainer = $("#global-filters-container");
    var added = $(globalFilterHtml);
    filterContainer.append(added);
    initTableYamlSelect2(added.find(".data-table-yaml"));
    $(".globalFilter-empty-btn").hide();
});

$(document.body).on('click', '.globalFilter-remove.fa-minus-circle', function(d) {
    var globalFiltersContainer = $("#global-filters-container");
    $(this).parents(".global-filter").remove();
    if(globalFiltersContainer.children(".global-filter").size() < 1) {
        $(".globalFilter-empty-btn").show();
    } else {
        $(".globalFilter-empty-btn").hide();
    }

});

// Add event.
function handleNewUserEvent() {
    var added = $(cohortUserHtml);
    $("#users-events-container").append(added);
    initTableYamlSelect2(added.find(".data-table-yaml"));
    added.find(".select2-multiple-remote").select2({
        multiple: true,
        placeholder: gettext('Select some events'),
        data: djangoData.events
    });
    var eventsContainer = $("#users-events-container");
    eventsContainer.find('.event-remove.fa-minus-circle').show();
    updateEventLabelNumbering();
}

// Add event.
function handleNewEvent() {
    var added = $(cohortEventHtml);
    $("#events-container").append(added);
    initTableYamlSelect2(added.find(".data-table-yaml"));
    added.find(".select2-multiple-remote").select2({
        multiple: true,
        placeholder: gettext('Select some events'),
        data: djangoData.events
    });
    var eventsContainer = $("#events-container");
    eventsContainer.find('.event-remove.fa-minus-circle').show();
    updateEventLabelNumbering();
}
// Remove event.
$(document.body).on('click', '.event-remove.fa-minus-circle', function(d) {
    var eventContainer = $(this).parents(".event-container");
    var eventsContainer = $(this).parents(".events-container");
    eventContainer.remove();
    if(eventsContainer.children(".event-container").size() <= 1) {
        eventsContainer.find('.event-remove.fa-minus-circle').hide();
    }
    updateEventLabelNumbering();
});

// Add eventFilter.
$(document.body).on('click', '.eventFilter-add.fa-plus-circle', function(d) {
    var container = $(this).parents(".multi-eventFilters");
    var added = $(eventFilterHtml);
    container.append(added);
    initTableYamlSelect2(added.find(".data-table-yaml"));

    // If going from 1 to 2, show del btn
    container.find(".eventFilter-remove").show();
});
// Remove eventFilter.
$(document.body).on('click', '.eventFilter-remove.fa-minus-circle', function(d) {
    var container = $(this).parents(".multi-eventFilters");
    $(this).parent().remove();

    // If only 1 left, hide del btn
    if(container.children().size() < 2) {
        container.find(".eventFilter-remove").hide();
    }
});

// Show/Hide Advanced options.
//$(".advanced-checkbox").on('change', function(d) {
$(document.body).on('click', '.advanced-checkbox', function(d) {
    var advancedForm = $(this).parents('.form-group').siblings(".advanced-container");
    if($(this).is(':checked')) {
        advancedForm.show();
    } else {
        advancedForm.hide();
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
function buildLoyal(){
    var query = JSON.parse(loyalTemplate);
    query['dataSource'] = djangoData['datasource'];

    var eventSelectSize = $(".event-container .userSelection").size();
    var eventSelects = [];
    for(var h = 0; h < eventSelectSize; h++){
        var eventDiv = $($($(".event-container .userSelection")[h]).parent('div').parent('div')[0]);
        var eventSize = $($(".event-container .userSelection")[h]).find(".row").size();
        var events = [];
        for(var i = 0; i < eventSize; i++){
            var event = JSON.parse(eventTemplate);
            var index = $($($(".event-container .userSelection")[h]).find(".row .data-table-yaml")[i]).val();

            var obj = djangoData["table.yaml"]['fields'][index];
            event['cubeField'] = obj.name;
            if(obj.dataType === 'String'){
                event['fieldValue']['values'] = $($($(".event-container .userSelection")[h]).find(".row .second-stage")[i]).val();
                // events.push(event);
            }else if(obj.fieldType === 'ActionTime'){
                var v1 = $($($(".event-container .userSelection")[h]).find(".row .date1")[i]).find('input').val();
                var v2 = $($($(".event-container .userSelection")[h]).find(".row .date2")[i]).find('input').val();
                var range = v1 + "|" + v2;
                var value = [];
                value.push(range);
                event['fieldValue']['values'] = value;
            }else{
                var v1 = parseInt($($($(".event-container .userSelection")[h]).find(".row .event-min")[i]).val());
                var v2 = parseInt($($($(".event-container .userSelection")[h]).find(".row .event-max")[i]).val());
                v1 = Number.isInteger(v1)?v1:0;
                v2 = Number.isInteger(v2)?v2:100;
                if(v2 < v1){
                    v2 = v1+1;
                }
                var range = v1 + "|" + v2;
                var value = [];
                value.push(range);
                event['fieldValue']['values'] = value;
            }
            events.push(event);

        }
        var eventSelect = JSON.parse(loyalSelectionTemplate);

        var min = parseInt($(eventDiv.find('.min')[0]).val());
        var max = parseInt($(eventDiv.find('.max')[0]).val());
        eventSelect['minTrigger'] = Number.isInteger(min)?min:1;
        eventSelect['maxTrigger'] = Number.isInteger(max)?max:-1;

        eventSelect['eventSelection'] = events;
        var day = parseInt(eventDiv.find('.day').val());
        eventSelect['timeWindow']['length'] = Number.isInteger(day)?day:7;
        eventSelect['timeWindow']['slice'] = (eventDiv.find('.first').val()==='any');
        eventSelects.push(eventSelect);
    }

    query['birthSequence']['birthEvents'] = eventSelects;
    return query;
}

function buildQuery(){
    var query = JSON.parse(queryTemplate);
    query['dataSource'] = djangoData['datasource'];
    var measure = $('#measure').val();
    query['measure'] = measure;

    var eventSelectSize = $(".event-container .eventSelection").size();
    var eventSelects = [];
    for(var h = 0; h < eventSelectSize; h++){
        var eventDiv = $($($(".event-container .eventSelection")[h]).parent('div').parent('div')[0]);
        var eventSize = $($(".event-container .eventSelection")[h]).find(".row").size();
        var events = [];
        for(var i = 0; i < eventSize; i++){
            var event = JSON.parse(eventTemplate);
            var index = $($($(".event-container .eventSelection")[h]).find(".row .data-table-yaml")[i]).val();

            var obj = djangoData["table.yaml"]['fields'][index];
            event['cubeField'] = obj.name;
            if(obj.dataType === 'String'){
                event['fieldValue']['values'] = $($($(".event-container .eventSelection")[h]).find(".row .second-stage")[i]).val();
            }else if(obj.fieldType === 'ActionTime'){
                var v1 = $($($(".event-container .eventSelection")[h]).find(".row .date1")[i]).find('input').val();
                var v2 = $($($(".event-container .eventSelection")[h]).find(".row .date2")[i]).find('input').val();
                var range = v1 + "|" + v2;
                var value = [];
                value.push(range);
                event['fieldValue']['values'] = value;
            }else{
                var v1 = parseInt($($($(".event-container .eventSelection")[h]).find(".row .event-min")[i]).val());
                var v2 = parseInt($($($(".event-container .eventSelection")[h]).find(".row .event-max")[i]).val());
                v1 = Number.isInteger(v1)?v1:0;
                v2 = Number.isInteger(v2)?v2:100;
                if(v2 < v1){
                    v2 = v1+1;
                }
                var range = v1 + "|" + v2;
                var value = [];
                value.push(range);
                event['fieldValue']['values'] = value;
            }
            events.push(event);
        }
        var eventSelect = JSON.parse(eventSelectionTemplate);
        eventSelect['eventSelection'] = events;
        var min = parseInt($(eventDiv.find('.min')[0]).val());
        var max = parseInt($(eventDiv.find('.max')[0]).val());
        eventSelect['minTrigger'] = Number.isInteger(min)?min:1;
        eventSelect['maxTrigger'] = Number.isInteger(max)?max:-1;
        var index = $(eventDiv.find('.groupby')[0]).val();
        eventSelect['cohortFields'][0]['field'] = djangoData["table.yaml"]['fields'][index]['name'];
        if(eventDiv.find('.adv').is(":checked")){
            var v1 = parseInt(eventDiv.find('.adv1').val());
            var v2 = parseInt(eventDiv.find('.adv2').val());
            var v3 = parseInt(eventDiv.find('.adv3').val());
            var min = Number.isInteger(v1)?v1:0;
            var max = Number.isInteger(v2)?v2:0;
            var i = Number.isInteger(v3)?v3:20;
            eventSelect['cohortFields'][0]['minLevel'] = Math.round(min/i);
            eventSelect['cohortFields'][0]['numLevel'] = Math.round((max-min)/i)+((max-min)%i>0?1:0);
            eventSelect['cohortFields'][0]['scale'] = i;
            eventSelect['cohortFields'][0]['logScale'] = eventDiv.find('.adv4').is(":checked");
        }
        eventSelects.push(eventSelect);
    }
    query['birthSequence']['birthEvents'] = eventSelects;

    var minage = parseInt($("#min-age").val());
    var maxage = parseInt($("#max-age").val());
    maxage = Number.isInteger(maxage)?maxage:30;
    var ageRange = (Number.isInteger(minage)?minage:'0') + '|' + (Number.isInteger(maxage)?maxage:'30');

    maxAge = maxage;

    var ageField = {};
    ageField['range'] = [];
    ageField['range'].push(ageRange);
    query['ageField'] = ageField;
    var ageType = $("#age-type").val();
    var timeCol = '';
    for(var i in djangoData["table.yaml"]["fields"]){
        if(djangoData["table.yaml"]['fields'][i]["fieldType"] === "ActionTime")
            timeCol = djangoData["table.yaml"]['fields'][i]['name'];
    }
    if(ageType === 'days'){
        ageField['ageInterval'] = 1;
        ageField['field'] = timeCol;
    }else if(ageType === 'weeks'){
        ageField['ageInterval'] = 7;
        ageField['field'] = timeCol;
    }else if(ageType === 'months'){
        ageField['ageInterval'] = 30;
        ageField['field'] = timeCol;
    }else if(ageType === 'years'){
        ageField['ageInterval'] = 365;
        ageField['field'] = timeCol;
    }else{
        ageField['ageInterval'] = $("#occur").val();
        var index = $("#occurCol").val();
        ageField['field'] = djangoData["table.yaml"]['fields'][index]['name'];
        var events = [];
        event = JSON.parse(eventTemplate);
        var obj = djangoData["table.yaml"]['fields'][index];
        event['cubeField'] = obj.name;
        if(obj.dataType === 'String'){
            event['fieldValue']['values'] = $("#occurVal").val();
        }else if(obj.fieldType === 'ActionTime'){
            var v1 = $($($(".event-container .eventSelection")[h]).find(".row .date1")[i]).find('input').val();
            var v2 = $($($(".event-container .eventSelection")[h]).find(".row .date2")[i]).find('input').val();
            var range = v1 + "|" + v2;
            var value = [];
            value.push(range);
            event['fieldValue']['values'] = value;
        }else{
            var v1 = parseInt($($($(".event-container .eventSelection")[h]).find(".row .min")[i]).val());
            var v2 = parseInt($($($(".event-container .eventSelection")[h]).find(".row .max")[i]).val());
            v1 = Number.isInteger(v1)?v1:0;
            v2 = Number.isInteger(v2)?v2:100;
            if(v2 < v1){
                v2 = v1+1;
            }
            var range = v1 + "|" + v2;
            var value = [];
            value.push(range);
            event['fieldValue']['values'] = value;
        }
        events.push(event);
        ageField['eventSelection'] = events;
    }

    var gFilterSize = $("#global-filters-container").find('.data-table-yaml').size();
    var filters = [];
    for (var i = 0; i < gFilterSize; i++) {
        var filter = JSON.parse(eventTemplate);
        var index = $($("#global-filters-container").find('.data-table-yaml')[i]).val();
        var obj = djangoData["table.yaml"]['fields'][index];
        filter['cubeField'] = obj.name;
        if (obj.dataType === 'String') {
            filter['fieldValue']['values'] = $($("#global-filters-container").find('.second-stage')[i]).val();
        } else if (obj.fieldType === 'ActionTime') {
            var v1 = $($("#global-filters-container").find('.date1')[i]).find('input').val();
            var v2 = $($("#global-filters-container").find('.date2')[i]).find('input').val();
            var range = v1 + "|" + v2;
            var value = [];
            value.push(range);
            filter['fieldValue']['values'] = value;
        } else {
            var v1 = parseInt($($("#global-filters-container").find('.min')[i]).val());
            var v2 = parseInt($($("#global-filters-container").find('.max')[i]).val());
            v1 = Number.isInteger(v1) ? v1 : 0;
            v2 = Number.isInteger(v2) ? v2 : 100;
            if (v2 < v1) {
                v2 = v1 + 1;
            }
            var range = v1 + "|" + v2;
            var value = [];
            value.push(range);
            filter['fieldValue']['values'] = value;
        }
        filters.push(filter);
    }
    query['ageSelection'] = filters;
    return query;
}

$('#query-form')[0].onsubmit = function(){
    if($('#measure').val() === ""){
        alert(gettext("Please select measure."));
        return false;
    }

    var selects = $(".select2-single.data-table-yaml");
    for(var i = 0; i < selects.size(); i++){
        if($(selects[i]).is(":visible")){
            if($(selects[i]).val() === "" ){
                alert(gettext("Please select an option."));
                $(selects[i]).focus();
                return false;
            }
        }
    }
    var selects = $(".second-stage");
    for(var i = 0; i < selects.size(); i++){
        if($(selects[i]).is(":visible")){
            if($(selects[i]).val() === null){
                alert(gettext("Please select at least one value."));
                $(selects[i]).focus();
                return false;
            }
        }
    }

    if($('#filter-users-checkbox').is(":checked")){
        var loyalCreate = buildLoyal();
        var query = buildQuery();
        query['inputCohort'] = 'loyal';
        loyalQuery(query, loyalCreate);
    }else{
        var query = buildQuery();
        singleQuery(query);
    }

    return false;
}

function singleQuery(query){
    $("#line").hide();
    $("#heat").hide();
    $("#range").hide();
    $("#loading").show();
    $.ajax({
        type: "POST",
        data: { mode: "cohort", csrfmiddlewaretoken: CSRF_TOKEN, data: JSON.stringify(query) },
        url: "/api/v1",
        success: function(response) {
            var responseData = JSON.parse(response);
            if(responseData.message == "OK"){
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (info) {
                            var result = "";
                            info.sort(function compare(a, b) {
                                return b.data[1] - a.data[1];
                            });
                            for(var i in info){
                                var value = info[i].data[1];
                                if(Math.abs(value) > 1000000000)
                                    value = (value/1000000000).toFixed(2)+"B";
                                else if(Math.abs(value) > 1000000)
                                    value = (value/1000000).toFixed(2)+"M";
                                else if(Math.abs(value) > 1000)
                                    value = (value/1000).toFixed(2)+"K";
                                else
                                    value = value;
                                result += "<div>" + info[i].seriesName+": "+ value + "</div>";
                            }
                            return result;
                        }
                    },
                    legend: {
                        x: 'center',
                        y: 'bottom',
                        data:['# of users']
                    },
                    toolbox:{
                        show:true,
                        x : 'left',
                        y : 'top',
                        feature: {
                            restore:{
                                title: gettext('Restore')
                            },
                            saveAsImage:{
                                title: gettext('Save')
                            },
                            dataView: {
                                title: gettext('Dataview'),
                                lang: ['DataView', 'Close', 'Refresh']
                            },
                            dataZoom: {
                                yAxisIndex: 'none',
                                title:
                                    {
                                        zoom: 'Zoom',
                                        back: 'Back'
                                    }
                            },
                            magicType: {
                                type: ['bar', 'line'],
                                title:
                                    {
                                        'bar' : 'Change To Bar Chart',
                                        'line' : 'Change To Line Chart'
                                    }
                            }		}
                    },
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
                    }]
                };
                var option2 = {
                    tooltip: {
                        position: 'top',
                        formatter: function (info) {
                            var value = info.data[2];
                            return value;
                        }
                    },
                    animation: false,
                    grid: {
                        left: 'left',
                        bottom: '25%',
                        containLabel: true
                    },
                    xAxis: {
                        data: [],
                    },
                    yAxis: {
                        type: 'category',
                        splitArea: {
                            show: true
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
                    series: [{
                        name: 'Usage',
                        type: 'heatmap',
                        label: {
                            normal: {
                                textStyle:{
                                    color:"black"
                                },
                                show: true,
                                formatter: function (info) {
                                    var value = info.value[2];
                                    return value+"%";
                                }
                            }
                        },
                        itemStyle: {
                            normal:{

                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                };
                var option3 = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        }
                    },
                    legend: {
                        data: [],
                        orient: 'horizontal',
                    },
                    xAxis: {},
                    yAxis: {},
                    series: [],
                };

                var cols = responseData['data']['columes'];
                option['series'] = responseData['data']['values'];
                option['legend']['data'] = cols;
                option2['series'][0]['data'] = responseData['data']['heatmap'];
                option2['yAxis']['data'] = cols;

                option3['legend']['data'] = responseData['data']['range']['cols'];
                for(var i_range in responseData['data']['range']['series']){
                    if(responseData['data']['range']['series'][i_range]['type'] === "line")
                        option3['series'].push({
                            name: responseData['data']['range']['series'][i_range]['name'],
                            type: 'line',
                            data: responseData['data']['range']['series'][i_range]['data'],
                            label: {
                                show: true
                            },
                        });
                    if(responseData['data']['range']['series'][i_range]['type'] === "custom")
                        option3['series'].push({
                            name: responseData['data']['range']['series'][i_range]['name'],
                            type: 'custom',
                            renderItem: renderItem,
                            data: responseData['data']['range']['series'][i_range]['data'],
                            z:3,
                        });
                }

                var chart = echarts.init(document.getElementById('line'));
                var chart2 = echarts.init(document.getElementById('heat'));
                var chart3 = echarts.init(document.getElementById('range'));
                var max = 0;
                var min = 0;
                for(var i_heatmap in responseData['data']['heatmap']){
                    if(responseData['data']['heatmap'][i_heatmap][2] > max)
                        max = responseData['data']['heatmap'][i_heatmap][2];
                    if(responseData['data']['heatmap'][i_heatmap][2] < min)
                        min = responseData['data']['heatmap'][i_heatmap][2];
                }
                option2.visualMap.max = max;
                option2.visualMap.min = min;

                var xAxisArray = [];
                for(var k = 0; k < maxAge + 1; k++){
                    xAxisArray.push(k);
                }
                option['xAxis']['max'] = maxAge;
                option2['xAxis']['data'] = xAxisArray;
                $("#line").css("height", "450px");
                $("#heat").css("height", "750px");
                $("#range").css("height", "450px");
                $("#loading").hide();
                $("#line").show();
                $("#heat").show();
                $("#range").show();
                chart.resize();
                chart.setOption(option);
                chart2.resize();
                chart2.setOption(option2);
                chart3.resize();
                chart3.setOption(option3);
                $('html, body').animate({
                    scrollTop: $("#line").offset().top
                }, 500);

                $(window).on('resize', function() {
                    chart.resize();
                    chart2.resize();
                    chart3.resize();
                });
            }else{
                $("#loading").hide();
                alert(responseData.message);
            }
        },
        error: function(response) {
            $("#loading").hide();
            alert(gettext("Invalid Query"));
        }
    });
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

function loyalQuery(query1, query2){
    $("#line").hide();
    $("#heat").hide();
    $("#range").hide();
    $("#loading").show();
    $.ajax({
        type: "POST",
        data: { mode: "loyal-cohort", csrfmiddlewaretoken: CSRF_TOKEN, data1: JSON.stringify(query1), data2: JSON.stringify(query2) },
        url: "/api/v1",
        success: function(response) {
            var responseData = JSON.parse(response);
            if(responseData.message == "OK"){
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (info) {
                            var result = "";
                            info.sort(function compare(a, b) {
                                return b.data[1] - a.data[1];
                            });
                            for(var i in info){
                                var value = info[i].data[1];
                                if(Math.abs(value) > 1000000000)
                                    value = (value/1000000000).toFixed(2)+"B";
                                else if(Math.abs(value) > 1000000)
                                    value = (value/1000000).toFixed(2)+"M";
                                else if(Math.abs(value) > 1000)
                                    value = (value/1000).toFixed(2)+"K";
                                else
                                    value = value;
                                result += "<div>" + info[i].seriesName+": "+ value + "</div>";
                            }
                            return result;
                        }
                    },
                    legend: {
                        x: 'center',
                        y: 'bottom',
                        data:['# of users']
                    },
                    toolbox:{
                        show:true,
                        x : 'left',
                        y : 'top',
                        feature: {
                            restore:{
                                title: gettext('Restore')
                            },
                            saveAsImage:{
                                title: gettext('Save')
                            },
                            dataView: {
                                title: gettext('Dataview'),
                                lang: ['DataView', 'Close', 'Refresh']
                            },
                            dataZoom: {
                                yAxisIndex: 'none',
                                title:
                                    {
                                        zoom: 'Zoom',
                                        back: 'Back'
                                    }
                            },
                            magicType: {
                                type: ['bar', 'line'],
                                title:
                                    {
                                        'bar' : 'Change To Bar Chart',
                                        'line' : 'Change To Line Chart'
                                    }
                            }		}
                    },
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
                    }]
                };
                var option2 = {
                    tooltip: {
                        position: 'top',
                        formatter: function (info) {
                            var value = info.data[2];
                            return value;
                        }
                    },
                    animation: false,
                    grid: {
                        left: 'left',
                        bottom: '25%',
                        containLabel: true
                    },
                    xAxis: {
                        data: [],
                    },
                    yAxis: {
                        type: 'category',
                        splitArea: {
                            show: true
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
                    series: [{
                        name: 'Usage',
                        type: 'heatmap',
                        label: {
                            normal: {
                                textStyle:{
                                    color:"black"
                                },
                                show: true,
                                formatter: function (info) {
                                    var value = info.value[2];
                                    return value+"%";
                                }
                            }
                        },
                        itemStyle: {
                            normal:{

                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                };
                var option3 = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                        }
                    },
                    legend: {
                        data: [],
                        orient: 'horizontal',
                    },
                    xAxis: {},
                    yAxis: {},
                    series: [],
                };

                var cols = responseData['data']['columes'];
                option['series'] = responseData['data']['values'];
                option['legend']['data'] = cols;
                option2['series'][0]['data'] = responseData['data']['heatmap'];
                option2['yAxis']['data'] = cols;

                option3['legend']['data'] = responseData['data']['range']['cols'];
                for(var i_range in responseData['data']['range']['series']){
                    if(responseData['data']['range']['series'][i_range]['type'] === "line")
                        option3['series'].push({
                            name: responseData['data']['range']['series'][i_range]['name'],
                            type: 'line',
                            data: responseData['data']['range']['series'][i_range]['data'],
                            label: {
                                show: true
                            },
                        });
                    if(responseData['data']['range']['series'][i_range]['type'] === "custom")
                        option3['series'].push({
                            name: responseData['data']['range']['series'][i_range]['name'],
                            type: 'custom',
                            renderItem: renderItem,
                            data: responseData['data']['range']['series'][i_range]['data'],
                            z:3,
                        });
                }

                var chart = echarts.init(document.getElementById('line'));
                var chart2 = echarts.init(document.getElementById('heat'));
                var chart3 = echarts.init(document.getElementById('range'));
                var max = 0;
                var min = 0;
                for(var i_heatmap in responseData['data']['heatmap']){
                    if(responseData['data']['heatmap'][i_heatmap][2] > max)
                        max = responseData['data']['heatmap'][i_heatmap][2];
                    if(responseData['data']['heatmap'][i_heatmap][2] < min)
                        min = responseData['data']['heatmap'][i_heatmap][2];
                }
                option2.visualMap.max = max;
                option2.visualMap.min = min;

                var xAxisArray = [];
                for(var k = 0; k < maxAge + 1; k++){
                    xAxisArray.push(k);
                }
                option['xAxis']['max'] = maxAge;
                option2['xAxis']['data'] = xAxisArray;
                $("#line").css("height", "450px");
                $("#heat").css("height", "750px");
                $("#range").css("height", "450px");
                $("#loading").hide();
                $("#line").show();
                $("#heat").show();
                $("#range").show();
                chart.resize();
                chart.setOption(option);
                chart2.resize();
                chart2.setOption(option2);
                chart3.resize();
                chart3.setOption(option3);
                $('html, body').animate({
                    scrollTop: $("#line").offset().top
                }, 500);

                $(window).on('resize', function() {
                    chart.resize();
                    chart2.resize();
                    chart3.resize();
                });
            }else{
                $("#loading").hide();
                alert(responseData.message);
            }
        },
        error: function(response) {
            $("#loading").hide();
            alert(gettext("Invalid Query"));
        }
    });
}

function advancedCADetect( query, query2 ){
    if(query2 === null){
        singleQuery(query);
    }else{
        loyalQuery(query, query2);
    }
}

