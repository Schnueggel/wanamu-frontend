/// <reference path="../../../libs/moment/moment-node.d.ts" />
'use strict';
import _  = require('lodash');
import moment = require('moment');

declare interface RotConfig {
    id : string;
    rot : number;
    type : string;
}

/**
 * Class that controller the timepicker template
 */
export class TimePickerController {

    static $inject = ['$document'];

    public date : Date;
    public minutemarker : SVGGElement = null;
    public hourmarker : SVGGElement = null;

    public daytime : string;
    public static AM : string = 'am';
    public static PM : string  = 'pm';

    public currentMoment : momentM.Moment;

    public changed : Function;

    public isam : boolean = false;
    public ispm : boolean = false;

    public minrots : {[s:string] : number} =  {
            '0': 90,
            '5'  : 120,
            '10'  : 150,
            '15'  : 180,
            '20'  : 210,
            '25' : 240,
            '30' : 270,
            '35' : 300,
            '40' : 330,
            '45' : 0,
            '50' : 30,
            '55' : 60
    };

    public hourrots : {[s:string] : number} =  {
        '12': 90,
        '1' : 120,
        '2': 150,
        '3': 180,
        '4': 210,
        '5' : 240,
        '6' : 270,
        '7' : 300,
        '8' : 330,
        '9' : 0,
        '10' : 30,
        '11' : 60
    };

    /**
     *
     */
    constructor($document : angular.IDocumentService) {
        if ( !(this.date instanceof Date)){
            this.date = new Date();
        }

        if (!_.isFunction(this.changed)){
            this.changed = function(){};
        }

        //Round the date to the nearest next 5 minute tick
        var coeff = 1000 * 60 * 5;
        var rounded = new Date(Math.ceil(this.date.getTime() / coeff) * coeff);

        this.currentMoment = moment(rounded);

        this.setDaytime(this.currentMoment.format('a'));

        $document.ready(function(){
            this.selectMinute(  this.currentMoment.format('m') );
            this.selectHour( this.currentMoment.format('h') );
        }.bind(this));

    }

    selectMinute(min : number) {
        if (this.minrots.hasOwnProperty(min.toString())) {
            this.currentMoment.minute(min);
            this.date.setMinutes(this.currentMoment.minute());
            this.changed();
            this.setMarkerRot(this.getMinuteMarker(), this.minrots[min.toString()]);
        }
    }

    selectHour(hour : number) {
        if (this.hourrots.hasOwnProperty(hour.toString())) {
            var hour24 = this.ispm ? hour +12 : hour;

            if (hour24 === 24) {
                hour24 = 0;
            }

            this.currentMoment.hour(hour24);
            this.date.setHours(this.currentMoment.hours());
            this.changed();

            this.setMarkerRot(this.getHourMarker(), this.hourrots[hour.toString()]);
        }
    }
    /**
     * @param {string} id
     * @param {number} rot
     */
    setMarkerRot(markerelement : SVGGElement, rot : number) {
        var transforms = markerelement.transform.baseVal;
        this.rotateTransforms(transforms, rot);
    }

    setDaytime(daytime) : void {
        this.daytime = daytime;

        var hour = this.currentMoment.hour();

        if (this.daytime === TimePickerController.AM) {
            this.isam = true;
            this.ispm = false;
            if (hour >= 12) {
                this.currentMoment.hour(hour-12);
            }
        }
        if (this.daytime === TimePickerController.PM) {
            this.isam = false;
            this.ispm = true;
            if (hour < 12) {
                this.currentMoment.hour(hour+12);
            }
        }
    }

    setAM () {
        this.setDaytime(TimePickerController.AM);
    }

    setPM () {
        this.setDaytime(TimePickerController.PM);
    }

    getMinuteMarker () : SVGGElement {
        if (this.minutemarker === null) {
            this.minutemarker = <SVGGElement>document.getElementById('background-minute');
        }

        return this.minutemarker;
    }

    getHourMarker () : SVGGElement {
        if (this.hourmarker === null) {
            this.hourmarker = <SVGGElement>document.getElementById('background-hour');
        }

        return this.hourmarker;
    }

    /**
     * Rotate the first rotation transform in a transformlist the specified roation
     */
     rotateTransforms(transforms : SVGTransformList, rot : number) {
        var len = transforms.numberOfItems,
            item;

        for( var i = 0; i < len; i++ ) {
            item = transforms.getItem(i);
            if (item.type === 4 ){
                item.setRotate(rot, 0, 0);
                break;
            }
        }
    }
}
