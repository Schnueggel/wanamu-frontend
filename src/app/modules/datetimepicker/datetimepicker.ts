'use strict';

require('./datetimepicker.scss');

import {datepicker} from './datepicker/datepicker';
import {datetimepicker} from './datetimepicker/datetimepicker';
import {timepicker} from './timepicker/timepicker';

export var DateTimePickerModule = angular.module('datetimepicker', []);

DateTimePickerModule.directive('wuDatePicker', datepicker);
DateTimePickerModule.directive('wuTimePicker', timepicker);
DateTimePickerModule.directive('wuDateTimePicker', datetimepicker);

