
export class RepeatDirectiveOptions {
    /**
     * Set day in year
     * @scopevar
     * @type {boolean}
     */
    public yearly : string = '';

    /**
     * Day in Month
     * @scopevar
     * @type {boolean}
     */
    public monthly : string = '';

    /**
     * Enable or Disable Repeating
     * @scopevar
     * @type {boolean}
     */
    public repeat : boolean = false;

    /**
     * 1-31
     * @scopevar
     * @type {Array}
     */
    public daysInMonth : Array<string> = [];
    /**
     * Mo, Tu, We, Th, Fr, Sa, Su
     * Set week if you want a weekly  repeat
     * @scopevar
     */
    public weekly : Array<string> = [];
}
