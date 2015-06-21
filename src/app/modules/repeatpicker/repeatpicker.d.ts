declare module wanamu.repeatpicker {
    interface RepeatDirectiveOptions {
        /**
         * Set day in year
         * @scopevar
         * @type {boolean}
         */
        yearly : string ;

        /**
         * Day in Month
         * @scopevar
         * @type {boolean}
         */
        monthly : string;

        /**
         * Enable or Disable Repeating
         * @scopevar
         * @type {boolean}
         */
        repeat : boolean;

        /**
         * 1-31
         * @scopevar
         * @type {Array}
         */
        daysInMonth : Array<string> ;
        /**
         * Mo, Tu, We, Th, Fr, Sa, Su
         * Set week if you want a weekly  repeat
         * @scopevar
         */
        weekly : Array<string>;
    }
}
