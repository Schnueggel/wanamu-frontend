import _ = require('lodash');
import { Controller, InjectC } from '../../decorators/decorators'
import { BaseController } from '../../wanamu/wanamu';
import { RepeatDirectiveOptions } from './RepeatDirectiveOptions';

export enum MONTHLY {
    FIRST = 0,
    LAST = 1,
}
/**
 * @namespace repeatpicker
 * @alias Repeat
 */
@Controller('RepeatDirectiveController')
@InjectC('$scope')
export class RepeatDirectiveController extends BaseController {

    static FIRST : string = 'first';
    static LAST : string = 'last';

    /**
     * @viewvar
     * @type {boolean}
     */
    public isMonthly = false;

    /**
     * @viewvar
     */
    public weekdays : wanamu.repeatpicker.IWeekDays = {
        mo : 'Mo',
        tu : 'Tu',
        we : 'We',
        th : 'Th',
        fr : 'Fr',
        sa : 'Sa',
        su : 'Su'
    };

    /**
     * Days to display
     * @viewvar
     * @type {Array}
     */
    public daysInMonth : Array<string> = [];

    /**
     * @scopevar
     */
    public opts : RepeatDirectiveOptions;

    constructor(public $scope : ng.IScope) {
        super();

        if (!(this.opts instanceof RepeatDirectiveOptions)) {
            this.opts = new RepeatDirectiveOptions();
        }

        $scope.$watch('Repeat.opts', () => this.newOpts());

        this.setupDaysInMonth();
    }

    /**
     * Triggers when new opts come
     */
    newOpts() {
        if (this.opts.monthly.length > 0) {
            this.isMonthly = true;
        }
    }
    /**
     * Helper Method
     */
    setupDaysInMonth() : void {

        this.daysInMonth.push(RepeatDirectiveController.FIRST);

        for (var i= 2; i < 31; i++) {
            this.daysInMonth.push(i.toString());
        }

        this.daysInMonth.push(RepeatDirectiveController.LAST);
    }
    /**
     * @viewhelper
     * @param n
     * @returns {boolean}
     */
    isInMonthly(n : string) : boolean {
        return this.opts.monthly.indexOf(n) !== -1;
    }

    /**
     * Check if day is selected in weekly
     * @param n
     * @returns {boolean}
     */
    isInWeekly(n : string) : boolean {
        return this.opts.weekly.indexOf(n) !== -1
    }
    /**
     * @viewhelper
     * Toggles a weekday selection
     * @param day
     */
    selectWeekly(day : string) : void {
        if (this.isInWeekly(day)) {
            _.pull(this.opts.weekly, day);
        } else {
            this.opts.weekly.push(day);
        }
    }

    /**
     * @viewhelper
     * @method onIsMonthlyChanged
     * @param ismonthly
     */
    onIsMonthlyChanged(ismonthly : boolean) {
        if (ismonthly && !this.opts.monthly) {
            this.opts.monthly.push(RepeatDirectiveController.FIRST);
        } else {
            this.opts.monthly = [];
        }
    }

    /**
     * @viewhelper
     * @param day
     */
    selectMonthly(day : string) {console.log('Monthly:' + day);
        if (this.isInMonthly(day)) {
            _.pull(this.opts.monthly, day);
        } else {
            this.opts.monthly.push(day);
        }
    }
}
