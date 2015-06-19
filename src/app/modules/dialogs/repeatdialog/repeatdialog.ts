'use strict';

import _ = require('lodash');

export enum MONTHLY {
    FIRST = 0,
    LAST = 1,
}

export class RepeatDialogController {

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
     * @scopevar
     * @type {boolean}
     */
    public yearly : string;
    /**
     * @viewvar
     * @scopevar
     * @type {boolean}
     */
    public monthly : string;

    /**
     * @viewvar
     * @type {boolean}
     */
    public isMonthly : boolean = false;
    /**
     * @scopevar
     * @viewvar
     * @type {boolean}
     */
    public repeat : boolean;

    /**
     * @viewvar
     * @type {Array}
     */
    public daysInMonth : Array<string> = [];
    /**
     * @viewvar
     * @scopevar
     */
    public weekly : Array<string>;

    constructor(public $scope : angular.IScope, public $mdDialog : angularmaterial.MDDialogService) {

        if (_.isArray(this.weekly) && this.weekly.length > 0) {
            this.weekly.forEach((val : string) => {
                if (this.weekdays.hasOwnProperty(val)) {
                    this.weekdays[val] = true;
                }
            });
        }

        if(_.isString(this.monthly) && this.monthly.length > 0) {
            this.isMonthly = true;
        }

        this.setupDaysInMonth();
    }

    /**
     * Helper Method
     */
    setupDaysInMonth() : void {

        this.daysInMonth.push(RepeatDialogController.FIRST);

        for (var i= 1; i < 31; i++) {
            this.daysInMonth.push(i.toString());
        }

        this.daysInMonth.push(RepeatDialogController.LAST);
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
                this.weekly.push(day);
                this.weekly =  _.uniq(this.weekly);
            } else {
                this.weekly = _.pull(this.weekly, day);
            }
        }
    }

    onIsMonthly(ismonthly : boolean) {
        if (ismonthly && !this.monthly) {
            this.monthly = RepeatDialogController.FIRST;
        } else {
            this.monthly = '';
        }
    }

    selectMonthly(day : string) {
        this.isMonthly = true;
        this.monthly = day;
    }

    /**
     * @viewfunction
     * @param date
     */
    ok() {

        this.$mdDialog.hide({
            yearly : this.yearly,
            monthly : this.monthly,
            weekly : this.weekly,
            repeat: this.repeat
        });
    }

    /**
     * @viewfunction
     */
    cancel() {
        this.$mdDialog.cancel();
    }
}
