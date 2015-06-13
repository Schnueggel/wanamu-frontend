import {TimePickerController} from './timepickercontroller';
export var clocksvg = require('./clock.svg');
import moment = require('moment');

export function timepicker($templateCache : angular.ITemplateCacheService) {

    $templateCache.put('clock.svg', clocksvg);

    return  {
        scope: true,
        restrict: 'EA',
        bindToController: {
            date: '=date',
            changed: '&'
        },
        controllerAs: 'TimePicker',
        template : require('./timepicker.html'),
        controller : TimePickerController
    }
}

timepicker.$inject = ['$templateCache'];
