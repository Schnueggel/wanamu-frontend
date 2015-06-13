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
    public date : Date;

    constructor(){
        this.date.setSeconds(0);
    }

    changed () {
        console.log(this.date);
    }
}
DateTimePickerController.$inject = ['$timeout'];
