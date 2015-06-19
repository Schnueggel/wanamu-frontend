import {InvalidArgumentError} from '../../../errors/errors';

export class DateTimePickerOptions {

    public date: Date;
    public yearrange : wanamu.dateTimePicker.YearRange;
    public allowpast : boolean = false;

    /**
     *
     * @param {Date} date
     * @throws InvalidArugmentError
     */
    constructor(date : Date) {
        if ( !(date instanceof Date) ) {
            throw new InvalidArgumentError('DatePickerOptions expecting instance of Date');
        } else {
            this.date = date;
        }
    }
}
