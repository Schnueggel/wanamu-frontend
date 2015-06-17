'use strict';

import _ = require('lodash');

export function datetimepicker() {
    return  {
        scope: true,
        restrict: 'EA',
        bindToController: {
            date: '=',
            yearrange: '=?',
            allowpast : '=?'
        },
        controllerAs: 'DateTimePicker',
        template: require('./datetimepicker.html'),
        controller : DateTimePickerController
    }
}

export class DateTimePickerController {
    /**
     * @scopevar
     */
    public date:Date;

    /**
     * @scopevar
     */
    public allowpast: boolean;
    /**
     * @scopevar
     */
    public yearrange: wanamu.dateTimePicker.YearRange;

    constructor() {

        if (!(this.date instanceof Date)) {
            this.date = new Date();
        }
        //We dont support seconds
        this.date.setSeconds(0);
    }
}
