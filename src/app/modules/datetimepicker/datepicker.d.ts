/**
 * Created by Schnueggel on 14.06.2015.
 */

declare module wanamu {
     module  dateTimePicker {
        interface YearRange {
            min : number,
            max : number
        }

        interface DayConf {
            valid : boolean;
            disabled : boolean;
            day : number
        }
        interface DateTimePickerOptions {
             date: Date;
             yearrange : YearRange;
             allowpast : boolean ;
        }
    }
}
