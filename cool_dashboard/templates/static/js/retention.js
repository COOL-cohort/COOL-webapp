'use strict';

let cohortUserHtml = '<div class="event-container">'+
'    <div class="row mb-4">'+
'        <label class="col-sm-offset-2 control-label birthEvent-label">Event</label>'+
'        <i class="fa fa-minus-circle event-remove" style="display:none;padding-left:7px;" aria-hidden="true"></i>'+
'    </div>'+
'    <div class="row mb-4">'+
'        <label class="control-label col-md-2 col-sm-2 col-xs-12"> Event: </label>'+
'        <div class="col-md-9 multi-eventFilters userSelection" >'+
'            <div class="row">'+
'                <label class="text-center col-md-1 col-sm-1 col-xs-12">Their</label>'+
'                <div class="select-multi-stage col-md-10 col-sm-10 col-xs-12">'+
'                    <div class="col-md-3 col-sm-3 col-xs-5 float-left">'+
'                        <select class="form-select select2-single data-table-yaml">'+
'                        </select>'+
'                    </div>'+
'                    <label class="text-center col-md-1 col-sm-1 col-xs-12 float-left">is</label>'+
'                    <div class="col-md-6 col-sm-6 col-xs-12 float-left">'+
'                        <select class="form-select second-stage"> </select>'+
'                    </div>'+
'                    <div class="col-sm-6 col-sm-6 col-xs-12 datetimepicker" style="display: none;">'+
'                        <div class="input-group date date1">'+
'                            <input type="text" class="form-control" />'+
'                            <span class="input-group-addon">'+
'                                <span class="glyphicon glyphicon-calendar"></span>'+
'                            </span>'+
'                        </div>'+
'                        <div class="input-group date date2">'+
'                            <input type="text" class="form-control" />'+
'                            <span class="input-group-addon">'+
'                                <span class="glyphicon glyphicon-calendar"></span>'+
'                            </span>'+
'                        </div>'+
'                    </div>'+
'                    <div class="col-sm-6 col-sm-6 col-xs-12 intRange" style="display: none;">'+
'                        <div class="col-md-5 col-sm-5 col-xs-5">'+
'                            <input type="text" class="form-control event-min " placeholder="1">'+
'                        </div>'+
'                        <div style="float:left; line-height:33px;">-</div>'+
'                        <div class="col-md-5 col-sm-5 col-xs-5">'+
'                            <input type="text" class="form-control event-min " placeholder="100">'+
'                        </div>'+
'                    </div>'+
'                </div>'+
'                <div class="col-sm-1 col-sm-1 col-xs-1">'+
'                    <i class="fa fa-plus-circle eventFilter-add" style="padding-right:7px;" aria-hidden="true"></i>'+
'                    <i class="fa fa-minus-circle eventFilter-remove" style="display:none;padding-right:7px;" aria-hidden="true"></i>'+
'                </div>'+
'            </div>'+
'        </div>'+
'    </div>'+
'    <div class="row mb-4">'+
'        <label class="control-label col-md-3 col-sm-3 col-xs-12" >Frequency:</label>'+
'        <div class="col-md-1 col-sm-1 col-xs-5">'+
'            <input type="text"  required="required" class="form-control col-md-2 col-xs-2 min" placeholder="1">'+
'        </div>'+
'        <div class="col-md-1 col-sm-1 col-xs-3" style="float:left; line-height:33px;">-</div>'+
'        <div class="col-md-1 col-sm-1 col-xs-5">'+
'            <input type="text"  required="required" class="form-control col-md-2 col-xs-2 max" placeholder="∞">'+
'        </div>'+
'        <div class="col-md-1 col-sm-1 col-xs-3" style="float:left; line-height:33px;">time(s)</div>'+
'    </div>'+
'    <div class="row mb-4">'+
'        <label class="control-label col-md-3 col-sm-3 col-xs-12" >In the </label>'+
'        <div class="col-md-2 col-sm-2 col-xs-5 float-left">'+
'            <select class="form-select select2-single range-select first">'+
'                <option>first</option>'+
'                <option>any</option>'+
'            </select>'+
'        </div>'+
'        <div class="col-md-1 col-sm-1 col-xs-5">'+
'            <input type="text"  required="required" class="form-control col-md-2 col-xs-2 day" placeholder="7">'+
'        </div>'+
'        <div class="col-md-1 col-sm-1 col-xs-3" style="float:left; line-height:33px; font-weight: 800;">day(s)</div>'+
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
    '            <div class="form-group row">' +
    '                <label class="text-center col-md-1 col-sm-1 col-xs-12">Their</label>' +
    '                <div class="select-multi-stage col-md-10 col-sm-10 col-xs-12">' +
    '                    <div class="col-md-5 col-sm-5 col-xs-11 float-left">' +
    '                        <select class="form-select select2-single data-table-yaml">' +
    '                        </select>' +
    '                    </div>' +
    '                    <label class="text-center col-md-1 col-sm-1 col-xs-12 float-left">is</label>' +
    '                    <div class="col-md-6 col-sm-6 col-xs-12 float-left">' +
    '                        <select class="form-select second-stage"> </select>' +
    '                    </div>' +
    '                    <div class="col-sm-6 col-sm-6 col-xs-12 datetimepicker" style="display: none;">' +
    '                        <div class="input-group date date1">' +
    '                            <input type="text" class="form-control" />' +
    '                            <span class="input-group-addon">' +
    '                                <span class="glyphicon glyphicon-calendar"></span>' +
    '                            </span>' +
    '                        </div>' +
    '                        <div class="input-group date date2">' +
    '                            <input type="text" class="form-control" />' +
    '                            <span class="input-group-addon">' +
    '                                <span class="glyphicon glyphicon-calendar"></span>' +
    '                            </span>' +
    '                        </div>' +
    '                    </div>' +
    '                    <div class="col-sm-6 col-sm-6 col-xs-12 intRange" style="display: none;">' +
    '                        <div class="col-md-5 col-sm-5 col-xs-5">' +
    '                            <input type="text" class="form-control event-min " placeholder="1">' +
    '                        </div>' +
    '                        <div style="float:left; line-height:33px;">-</div>' +
    '                        <div class="col-md-5 col-sm-5 col-xs-5">' +
    '                            <input type="text" class="form-control event-max " placeholder="100">' +
    '                        </div>' +
    '                    </div>' +
    '                </div>' +
    '                <div class="col-md-1 col-sm-1 col-xs-1">' +
    '                    <i class="fa fa-plus-circle eventFilter-add" style="padding-right:7px;" aria-hidden="true"></i>' +
    '                    <i class="fa fa-minus-circle eventFilter-remove" style="display:none;padding-right:7px;" aria-hidden="true"></i>' +
    '                </div>' +
    '            </div>' +
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

$(document).ready(function (){
    updateEventLabelNumbering();
})

// Add event.
function handleNewUserEvent() {
    var added = $(cohortUserHtml);
    $("#users-events-container").append(added);
    // initTableYamlSelect2(added.find(".data-table-yaml"));
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
    // initTableYamlSelect2(added.find(".data-table-yaml"));
    // added.find(".select2-multiple-remote").select2({
    //     multiple: true,
    //     placeholder: gettext('Select some events'),
    //     data: djangoData.events
    // });
    var eventsContainer = $("#events-container");
    eventsContainer.find('.event-remove.fa-minus-circle').show();
    updateEventLabelNumbering();
}






let globalFilterHtml = '<div class="row global-filter">'+
'    <div class="col-md-3 col-sm-3 col-xs-4">'+
'        <select class="form-select select2-single data-table-yaml"> </select>'+
'    </div>'+
'    <div class="col-md-6 col-sm-6 col-xs-6">'+
'        <select class="form-select select2-single second-stage">'+
'        </select>'+
'    </div>'+
'    <div class="col-sm-6 col-sm-6 col-xs-6 datetimepicker" style="display: none;">'+
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
'    <div class="col-sm-6 col-sm-6 col-xs-6 intRange" style="display: none;">'+
'        <div class="col-md-5 col-sm-5 col-xs-5">'+
'            <input type="text" class="form-control min ">'+
'        </div>'+
'        <div style="float:left; line-height:33px;">-</div>'+
'        <div class="col-md-5 col-sm-5 col-xs-5">'+
'            <input type="text" class="form-control max ">'+
'        </div>'+
'    </div>'+
'    <div class="col-sm-1 col-sm-1 col-xs-1">'+
'        <i class="fa fa-plus-circle globalFilter-add" style="padding-right:7px;" aria-hidden="true"></i>'+
'        <i class="fa fa-minus-circle globalFilter-remove" style="padding-right:7px;" aria-hidden="true"></i>'+
'    </div>'+
'</div>';


$(document.body).on('click', '.globalFilter-add.fa-plus-circle', function(d) {
    var filterContainer = $("#global-filters-container");
    var added = $(globalFilterHtml);
    filterContainer.append(added);
    // initTableYamlSelect2(added.find(".data-table-yaml"));
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




let eventFilterHtml = '<div class="row">'+
'    <label class="text-center col-md-1 col-sm-1 col-xs-12">Their</label>'+
'    <div class="select-multi-stage col-md-10 col-sm-10 col-xs-12">'+
'        <div class="col-md-5 col-sm-5 col-xs-11 float-left">'+
'            <select class="form-select select2-single data-table-yaml">'+
'            </select>'+
'        </div>'+
'        <label class="text-center col-md-1 col-sm-1 col-xs-12 float-left">is</label>'+
'        <div class="col-md-6 col-sm-6 col-xs-12 float-left">'+
'            <select class="form-select second-stage"> </select>'+
'        </div>'+
'        <div class="col-sm-6 col-sm-6 col-xs-12 datetimepicker" style="display: none;">'+
'            <div class="input-group date date1">'+
'                <input type="text" class="form-control" />'+
'                <span class="input-group-addon">'+
'                    <span class="glyphicon glyphicon-calendar"></span>'+
'                </span>'+
'            </div>'+
'            <div class="input-group date date2">'+
'                <input type="text" class="form-control" />'+
'                <span class="input-group-addon">'+
'                    <span class="glyphicon glyphicon-calendar"></span>'+
'                </span>'+
'            </div>'+
'        </div>'+
'        <div class="col-sm-6 col-sm-6 col-xs-12 intRange" style="display: none;">'+
'            <div class="col-md-5 col-sm-5 col-xs-5">'+
'                <input type="text" class="form-control event-min " placeholder="1">'+
'            </div>'+
'            <div style="float:left; line-height:33px;">-</div>'+
'            <div class="col-md-5 col-sm-5 col-xs-5">'+
'                <input type="text" class="form-control event-max " placeholder="100">'+
'            </div>'+
'        </div>'+
'    </div>'+
'    <div class="col-md-1 col-sm-1 col-xs-1">'+
'        <i class="fa fa-plus-circle eventFilter-add" style="padding-right:7px;" aria-hidden="true"></i>'+
'        <i class="fa fa-minus-circle eventFilter-remove" style="display:none;padding-right:7px;" aria-hidden="true"></i>'+
'    </div>'+
'</div>'


// Add eventFilter.
$(document.body).on('click', '.eventFilter-add.fa-plus-circle', function(d) {
    var container = $(this).parents(".multi-eventFilters");
    var added = $(eventFilterHtml);
    container.append(added);
    // initTableYamlSelect2(added.find(".data-table-yaml"));

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