import {DatePickerController} from './datepickercontroller';

import moment = require('moment');

export function datepicker() {
    return  {
        scope: true,
        restrict: 'EA',
        bindToController: {
            date: '=',
            changed:  '&'
        },
        controllerAs: 'DatePicker',
        template : require('./datepicker.html'),
        controller : DatePickerController
    }
}
