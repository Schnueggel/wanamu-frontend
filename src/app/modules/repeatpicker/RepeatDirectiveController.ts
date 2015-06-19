import { Controller } from '../../decorators/decorators'
import { BaseController } from '../../wanamu/wanamu';
import { RepeatDirectiveOptions } from './RepeatDirectiveOptions';

export enum MONTHLY {
    FIRST = 0,
    LAST = 1,
}
/**
 * Controls the Panel
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
     * @viewvar
     * @type {boolean}
     */
    public isMonthly : boolean = false;

    /**
     * Days to display
     * @viewvar
     * @type {Array}
     */
    public daysInMonth : Array<string> = [];

    /**
     * @scopevar
     */
    public repeatOpts : RepeatDirectiveOptions;

    constructor() {
        super();

        if (!(this.repeatOpts instanceof RepeatDirectiveOptions)) {
            this.repeatOpts = new RepeatDirectiveOptions();
        }

        if (_.isArray(this.repeatOpts.weekly) && this.repeatOpts.weekly.length > 0) {
            this.repeatOpts.weekly.forEach((val : string) => {
                if (this.weekdays.hasOwnProperty(val)) {
                    this.weekdays[val] = true;
                }
            });
        }

        if(_.isString(this.repeatOpts.monthly) && this.repeatOpts.monthly.length > 0) {
            this.isMonthly = true;
        }

        this.setupDaysInMonth();
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
     * @viewfunction
     * Toggles a weekday selection
     * @param day
     */
    selectWeekly(day : string) : void {
        if (this.weekdays.hasOwnProperty(day)) {
            this.weekdays[day] = !this.weekdays[day];

            if (this.weekdays[day]) {
                this.repeatOpts.weekly.push(day);
                this.repeatOpts.weekly =  _.uniq(this.repeatOpts.weekly);
            } else {
                this.repeatOpts.weekly = _.pull(this.repeatOpts.weekly, day);
            }
        }
    }

    onIsMonthly(ismonthly : boolean) {
        if (ismonthly && !this.repeatOpts.monthly) {
            this.repeatOpts.monthly = RepeatDirectiveController.FIRST;
        } else {
            this.repeatOpts.monthly = '';
        }
    }

    selectMonthly(day : string) {
        this.isMonthly = true;
        this.repeatOpts.monthly = day;
    }
}
