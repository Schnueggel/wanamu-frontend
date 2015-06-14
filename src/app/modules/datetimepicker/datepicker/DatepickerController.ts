/**
 * Created by Schnueggel on 10.06.2015.
 */
/// <reference path="../../../libs/moment/moment-node.d.ts" />
'use strict';
import _  = require('lodash');
import moment = require('moment');

export class DatepickerController {

    static $inject = ['$scope', '$mdDialog', 'currentDate', '$mdMedia'];

    public datedata:datepicker.DataModel = <any>{};
    public year: number;
    public yearOptions: number;
    public weekDays: any;
    public currentMoment: momentM.Moment;
    public yearsOptions:Array = [];

    constructor(public $scope:angular.IScope, public $mdDialog: any, public currentDate:any, public $mdMedia: any) {
        this.currentMoment = moment(this.datedata.date);
        this.weekDays = moment.weekdaysMin();
        this.yearsOptions = [];

        for (var i = this.currentMoment.year(); i <= (this.currentMoment.year() + 3); i++) {
            this.yearsOptions.push(i);
        }
        this.year = this.currentMoment.year();
    }

    setYear() {
        this.currentMoment.year(this.year);
    }

    selectDate(dom : number) {
        console.log(dom);
        this.currentMoment.date(dom);
    }

    cancel() {
        this.$mdDialog.cancel();
    }

    confirm() {
        this.$mdDialog.hide(this.currentMoment.toDate());
    }

    getDaysInMonth() {
        var days = this.currentMoment.daysInMonth(),
            firstDay = moment(this.currentMoment).date(1).day();

        var arr = [];
        for (var i = 1; i <= (firstDay + days); i++)
            arr.push(i > firstDay ? (i - firstDay) : false);

        return arr;
    }

    nextMonth() {
        this.currentMoment.add(1, 'months');
        this.year = this.currentMoment.year();
    }

    prevMonth() {
        this.currentMoment.subtract(1, 'months');
        this.year = this.currentMoment.year();
    }
}
