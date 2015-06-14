/**
 * Created by Schnueggel on 14.06.2015.
 */

declare module  dateTimePicker {
    interface YearRange {
        min : number,
        max : number
    }

    interface DayConf {
        valid : boolean;
        disabled : boolean;
        day : number
    }
}
