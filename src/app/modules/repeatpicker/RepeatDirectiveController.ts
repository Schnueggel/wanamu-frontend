import _ = require('lodash');
import { Controller } from '../../decorators/decorators'
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
export class RepeatDirectiveController extends BaseController {

    static FIRST : string = 'first';
    static LAST : string = 'last';

    /**
     * @viewvar
     */
    public weekdays : wanamu.dialogs.WeekDays = {
        mo : false,
        tu : false,
        we : false,
        th : false,
        fr : false,
        sa : false,
        su : false
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

    constructor() {
        super();

        if (!(this.opts instanceof RepeatDirectiveOptions)) {
            this.opts = new RepeatDirectiveOptions();
        }

        if (_.isArray(this.opts.weekly) && this.opts.weekly.length > 0) {
            this.opts.weekly.forEach((val : string) => {
                if (this.weekdays.hasOwnProperty(val)) {
                    this.weekdays[val] = true;
                }
            });
        }

        this.setupDaysInMonth();
        console.log(this);
    }

    /**
     * Helper Method
     */
    setupDaysInMonth() : void {

        this.daysInMonth.push(RepeatDirectiveController.FIRST);

        for (var i= 1; i < 31; i++) {
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
    selectMonthly(day : string) {
        if (this.isInMonthly(day)) {
            _.pull(this.opts.monthly, day);
        } else {
            this.opts.monthly.push(day);
        }
    }
}
