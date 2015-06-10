/**
 * Created by Schnueggel on 10.06.2015.
 */
'use strict';
import _  = require('lodash');

export class DatepickerController {

    public year: number;
    public month: number;
    public day: number;
    public maxyear : number;
    public hour24 : number;
    public hour : number;
    public minute : number;
    public daytime : string;
    public daytiles : Array = [];

    public days : Array = <any>[];

    public date : Date;
    public minutes : Array<number> = [];
    public hours : Array<number> = [];

    public datedata : datepicker.DataModel = <any>{};

    constructor() {

        if (this.datedata.date) {
            this.date = this.datedata.date;
        } else {
            this.datedata.date = new Date();
        }
        this.setFromDate(this.datedata.date);
        this.createDayTiles();

        for (var i = 1; i < 13; i++) {
            this.hours.push(i);
        }
        for (var i = 0; i < 60; i= i+5) {
            this.minutes.push(i);
        }
        console.log(this);
    }

    createDayTiles() {
        var daytiles = [],
            date = this.datedata.date,
            daysinmonth =  new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();

        for (var i = 1; i <= daysinmonth; i++){
            daytiles.push({
                value : i
            });
        }
        this.daytiles = daytiles;
    }

    setFromDate(date: Date){
        this.year = date.getFullYear();
        this.maxyear = this.year +3;
        this.month = date.getMonth()+1;
        this.day = date.getDate();
        this.hour24 = date.getHours();
        this.minute = date.getMinutes();
        this.daytime = this.hour24 >= 12 ? 'pm' : 'am';
        this.hour = this.hour24 % 12 || 12;
        this.minute = Math.ceil(this.minute/5)*5;

        this.minute = this.minute === 60 ? 0 : this.minute;

        if (this.minute === 0){
            this.hour = (this.hour24+1) % 12 || 12;
            this.hour24 = (this.hour24+1) % 24;
        }
    }

    changeDaytime(daytime: string){
        if (daytime === 'pm'){
            this.daytime = 'pm';
        } else {
            this.daytime = 'am';
        }
        this.calcDate();
    }

    changeMinute(minute: number){
        this.minute = minute
        this.calcDate();
    }

    calcDate(){
        if (this.daytime === 'pm'){
            this.hour24 = this.hour + 12;
        }
        this.datedata.date.setFullYear(this.year);
        this.datedata.date.setHours(this.hour24);
        this.datedata.date.setMinutes(this.minute);
        this.datedata.date.setMonth(this.month);
        this.datedata.date.setDate(this.day);
    }
}
