/**
 * Created by Schnueggel on 14.06.2015.
 */

declare module wanamu {
    module dialogs {
        interface DateDialogService {
            $mdDialog : angular.material.MDDialogService,

            show (date: Date, ev?: MouseEvent) : angular.IPromise<Date>;
        }
        interface RepeatDialogService {
            $mdDialog : angular.material.MDDialogService,

            show (repeatoptions : RepeatOptions, ev?: MouseEvent) : angular.IPromise<RepeatOptions>;
        }

        interface RepeatOptions {
            [index: string]: any;
            yearly: string;
            monthly : string;
            repeat : boolean;
            weekly : Array<string>;
        }

        interface WeekDays {
            [index: string]: string;
            mo : string;
            tu : string;
            we : string;
            th : string;
            fr : string;
            sa : string;
            su : string;
        }
    }
}
