/**
 * Created by Schnueggel on 09.06.2015.
 */

import {datepicker} from './DatepickerDirective';

export var DatepickerModule = angular.module('datepicker', []);

DatepickerModule.directive('wuDatepicker', datepicker);
DatepickerModule.filter('lpad', function() {
    return function(input, len, pad){
        input = input.toString();
        if(input.length >= len) return input;
        else{
            pad = (pad || 0).toString();
            return new Array(1 + len - input.length).join(pad) + input;
        }
    };
});
