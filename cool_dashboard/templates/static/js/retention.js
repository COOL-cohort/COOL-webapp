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
    '    <div class="row mb-4">' +
    '        <label class="control-label col-md-3 col-sm-3 col-xs-12">Group by:</label>' +
    '        <div class="col-md-3 col-sm-3 col-xs-12">' +
    '            <select class="form-select select2-single data-table-yaml groupby">' +
    '            </select>' +
    '        </div>' +
    '        <div class="col-md-3 col-sm-3 col-xs-12">' +
    '            <label class="control-label float-left">Advanced:</label>' +
    '            <div class="float-left">' +
    '                <input style="margin-top:12px; margin-left: 8px;" class="advanced-checkbox adv" type="checkbox" name="" >' +
    '            </div>' +
    '        </div>' +
    '    </div>' +
    '    <div class="form-group advanced-container">' +
    '        <div class="row">' +
    '            <label class="control-label col-md-offset-1 col-md-3 col-sm-3 col-xs-12 ">Min:</label>' +
    '            <div class="col-md-1 col-sm-1 col-xs-12">' +
    '                <input type="text" placeholder="0" class="form-control adv1" placeholder="">' +
    '            </div>' +
    '            <label class="control-label col-md-1 col-sm-1 col-xs-12 ">Max:</label>' +
    '            <div class="col-md-1 col-sm-1 col-xs-12">' +
    '                <input type="text" placeholder="10" class="form-control adv2" placeholder="">' +
    '            </div>' +
    '        </div>' +
    '        <div class="row" style="margin-top:6px">' +
    '            <label class="control-label col-md-offset-1 col-md-3 col-sm-3 col-xs-12 ">Interval:</label>' +
    '            <div class="col-md-1 col-sm-1 col-xs-12">' +
    '                <input type="text" placeholder="20" class="form-control adv3" placeholder="">' +
    '            </div>' +
    '            <label class="control-label col-md-1 col-sm-1 col-xs-12 ">Log Scale:</label>' +
    '            <div class="col-md-1 col-sm-1 col-xs-12">' +
    '                <input style="margin-top:12px;" class="adv4" type="checkbox" name="" >' +
    '            </div>' +
    '        </div>' +
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