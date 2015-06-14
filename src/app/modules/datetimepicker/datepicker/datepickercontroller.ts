/// <reference path="../../../libs/moment/moment-node.d.ts" />
'use strict';
import _  = require('lodash');
import moment = require('moment');

export class DatePickerController {

    static $inject : Array<string> = [];
    /**
     * @viewvar
     */
    public year: number;
    /**
     * @viewvar
     */
    public weekDays: Array<string>;
    /**
     * Moment wrapper for currentdate
     * @viewvar
     */
    public currentMoment: momentM.Moment;
    /**
     * @viewvar
     * @type {Array}
     */
    public yearsOptions: Array<number> = [];
    /**
     * @viewvar
     * @type {boolean}
     */
    public hasprevmonth: boolean = true;
    /**
     * @viewvar
     */
    public daysInMonth : Array<any>;

    /**
     * @scopevar
     */
    public date : Date;
    /**
     * @scopevar
     * @type {boolean}
     */
    public allowpast : boolean;
    /**
     * @scopevar
     */
    public yearrange : wanamu.dateTimePicker.YearRange;
    /**
     * Callback function triggered on date change
     * @scopevar
     */
    public changed : Function;

    /**
     * Now
     */
    protected nowMoment : momentM.Moment;

    /**
     * DatePickerController
     */
    constructor() {

        if (!(this.date instanceof Date)) {
            this.date = new Date();
        }

        this.currentMoment = moment(this.date);
        this.nowMoment = moment();

        this.weekDays = moment.weekdaysMin();

        //unwrap
        if (_.isFunction(this.changed)){
            this.changed = this.changed();
        } else {
            this.changed = () =>{};
        }

        if (!_.isPlainObject(this.yearrange)) {
            this.yearrange = {min: 3, max: 3};
        }

        if (!_.isBoolean(this.allowpast)) {
            this.allowpast = true;
        }

        this.year = this.currentMoment.year();

        this.calcYearOptions();
        this.setYear();
    }

    /**
     * Check if prev month is allowed and if prev month is in the past
     * @returns {boolean}
     */
    hasPrevMonth() : boolean  {

        return !(!this.allowpast && this.currentMoment.month() === this.nowMoment.month() && this.currentMoment.year() === this.nowMoment.year());
    }

    /**
     * Calculate the options for the year selection
     */
    calcYearOptions() {
        var max : number, min : number;

        this.yearsOptions = [];

        if (!this.allowpast) {
            min = this.nowMoment.year();
        } else {
            min = this.nowMoment.year() - this.yearrange.min;
        }
        max = this.nowMoment.year() + this.yearrange.max;

        for (var i = min; i <= max; i++) {
            this.yearsOptions.push(i);
        }
    }
    /**
     * Sets the current year
     * @viewfunction
     */
    setYear() {
        this.currentMoment.year(this.year);
        this.calcMonth();
        this.date.setFullYear(this.year);
        this.changed();
    }

    /**
     * Sets the current day
     * @viewfunction
     * @param dom
     */
    selectDate(dom : wanamu.dateTimePicker.DayConf) :void {
        this.currentMoment.date(dom.day);
        this.date.setDate(dom.day);
        this.changed();
    }

    /**
     * Calculates the days in the month
     * @returns {Array<number>}
     */
    getDaysInMonth() : Array<number> {
        var days : number = this.currentMoment.daysInMonth(),
            firstDay : number  = moment(this.currentMoment).date(1).day(),
            arr : Array<any> = [],
            minday : number = 0,
            dayconf : wanamu.dateTimePicker.DayConf;

        if (!this.hasprevmonth) {
            minday = this.nowMoment.date();
        }

        for (var i = 1; i <= (firstDay + days); i++) {
            dayconf = {day: (i - firstDay), disabled : false, valid: true};
            arr.push(dayconf);

            if (i > firstDay ) {
                // Allow past days
                if (dayconf.day < minday) {
                    dayconf.disabled = true;
                }
            } else {
                // If a weekday belongs to the old we make this day invalid
                dayconf.valid = false;
            }
        }

        return arr;
    }

    /**
     * Calcs the days in month and check if prev month is allowed
     */
    calcMonth () {
        this.hasprevmonth = this.hasPrevMonth();
        this.daysInMonth = this.getDaysInMonth();
    }

    /**
     * @viewfunction
     */
    nextMonth() {
        this.currentMoment.add(1, 'months');
        this.year = this.currentMoment.year();
        this.calcMonth()
    }

    /**
     * @viewfunction
     */
    prevMonth() {
        this.currentMoment.subtract(1, 'months');
        this.year = this.currentMoment.year();
        this.calcMonth();
    }
}
