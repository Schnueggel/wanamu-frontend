/**
 * Created by Schnueggel on 09.06.2015.
 */

import {datepicker} from './DatepickerDirective';

export var DatepickerModule = angular.module('datepicker', []);

DatepickerModule.directive('wuDatepicker', datepicker);
