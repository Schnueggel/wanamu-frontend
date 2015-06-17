/// <reference path="../../../libs/moment/moment-node.d.ts" />
'use strict';
import _  = require('lodash');
import moment = require('moment');

/**
 * Class that controller the timepicker template
 */
export class TimePickerController {

    static $inject : Array<string> = ['$document'];

    /**
     * @scopevar
     */
    public date : Date;

    public minutemarker : SVGGElement = null;
    public hourmarker : SVGGElement = null;

    /**
     * @viewvar
     */
    public daytime : string;

    public static AM : string = 'am';
    public static PM : string  = 'pm';

    /**
     * @viewvar
     */
    public currentMoment : momentM.Moment;

    /**
     * @viewvar
     * @type {boolean}
     */
    public isam : boolean = false;
    /**
     * @viewvar
     * @type {boolean}
     */
    public ispm : boolean = false;

    /**
     * SVG rotation for the minute hand
     * @type {{0: number, 5: number, 10: number, 15: number, 20: number, 25: number, 30: number, 35: number, 40: number, 45: number, 50: number, 55: number}}
     */
    protected minrots : {[s:string] : number} =  {
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

    /**
     * SVG rotations for the hour hand
     * @type {{12: number, 1: number, 2: number, 3: number, 4: number, 5: number, 6: number, 7: number, 8: number, 9: number, 10: number, 11: number}}
     */
    protected hourrots : {[s:string] : number} =  {
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
        if ( !(this.date instanceof Date)) {
            this.date = new Date();
        }

        //Round the date to the nearest next 5 minute tick
        var coeff = 1000 * 60 * 5;
        var rounded = new Date(Math.ceil(this.date.getTime() / coeff) * coeff);

        this.currentMoment = moment(rounded);

        this.setDaytime(this.currentMoment.format('a'));

        $document.ready(() =>{
            this.selectMinute( _.parseInt(this.currentMoment.format('m')) );
            this.selectHour(  _.parseInt(this.currentMoment.format('h')) );
        });

    }

    /**
     * @viewfunction
     * @param min
     */
    selectMinute(min : number) {
        if (this.minrots.hasOwnProperty(min.toString())) {
            this.currentMoment.minute(min);
            this.date.setMinutes(this.currentMoment.minute());
            this.setMarkerRot(this.getMinuteMarker(), this.minrots[min.toString()]);
        } else {
            console.warn('Timepicker no rotation found for minute: ' + min);
        }
    }

    /**
     * @viewfunction
     * @param hour
     */
    selectHour(hour : number) {
        if (this.hourrots.hasOwnProperty(hour.toString())) {
            var hour24 : number;

            if (this.ispm) {
                hour24 = hour + 12;
                if (hour24 === 24){
                    hour24 = 12;
                }
            } else {
                if (hour === 12) {
                    hour24 = 0;
                }
            }
            console.log(hour24);
            this.currentMoment.hour(hour24);
            this.date.setHours(this.currentMoment.hours());

            this.setMarkerRot(this.getHourMarker(), this.hourrots[hour.toString()]);
        } else {
            console.warn('Timepicker no rotation found for hour: ' + hour);
        }
    }
    /**
     * @param {SVGGElement} markerelement
     * @param {number} rot
     */
    setMarkerRot(markerelement : SVGGElement, rot : number) {
        var transforms = markerelement.transform.baseVal;
        this.rotateTransforms(transforms, rot);
    }

    /**
     * Set daytime am or pm
     * @param daytime
     */
    setDaytime(daytime : string) : void {
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

    /**
     * @viewfunction
     */
    setAM () {
        this.setDaytime(TimePickerController.AM);
    }

    /**
     * @viewfunction
     */
    setPM () {
        this.setDaytime(TimePickerController.PM);
    }

    getMinuteMarker () : SVGGElement {
        if (this.minutemarker === null) {
            this.minutemarker = <any>document.getElementById('background-minute');
        }

        return this.minutemarker;
    }

    getHourMarker () : SVGGElement {
        if (this.hourmarker === null) {
            this.hourmarker = <any>document.getElementById('background-hour');
        }

        return this.hourmarker;
    }

    /**
     * Rotate the first rotation transform in a transformlist the specified roation
     */
     rotateTransforms(transforms : SVGTransformList, rot : number) {
        var len = transforms.numberOfItems,
            item : SVGTransform;

        for( var i = 0; i < len; i++ ) {
            item = transforms.getItem(i);
            if (item.type === 4 ){
                item.setRotate(rot, 0, 0);
                break;
            }
        }
    }
}
