import {DatePickerController} from './datepickercontroller';

export function datepicker() {
    return  {
        scope: true,
        restrict: 'EA',
        bindToController: {
            date: '=',
            allowpast: '=?',
            yearrange: '=?'
        },
        controllerAs: 'DatePicker',
        template : require('./datepicker.html'),
        controller : DatePickerController
    }
}
