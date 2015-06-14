/**
 * Created by Schnueggel on 13.06.2015.
 */
'use strict';

import _ = require('lodash');

export function datetimepicker() {
    return  {
        scope: true,
        restrict: 'EA',
        bindToController: {
            date: '=',
            yearrange: '&?',
            changed : '&?',
            allowpast : '&?'
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
    public changed:Function;
    /**
     * @scopevar
     */
    public allowpast:boolean;
    /**
     * @scopevar
     */
    public yearrange:YearRange

    constructor() {
        if (!(this.date instanceof Date)) {
            this.date = new Date();
        }
        //We dont support seconds
        this.date.setSeconds(0);
    }
}
