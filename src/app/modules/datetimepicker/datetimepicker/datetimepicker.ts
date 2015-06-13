/**
 * Created by Schnueggel on 13.06.2015.
 */
'use strict';

export function datetimepicker() {
    return  {
        scope: true,
        restrict: 'EA',
        bindToController: {
            date: '=date'
        },
        controllerAs: 'DateTimePicker',
        template: require('./datetimepicker.html'),
        controller : DateTimePickerController
    }
}

export class DateTimePickerController {

}
