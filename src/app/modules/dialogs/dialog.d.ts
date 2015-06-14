/**
 * Created by Schnueggel on 14.06.2015.
 */

declare module wanamu {
    module dialogs {
        interface DateDialogService {
            $mdDialog : angularmaterial.MDDialogService,

            show (date: Date, ev?: MouseEvent) : angular.IPromise<Date>;
        }
        interface RepeatDialogService {
            $mdDialog : angularmaterial.MDDialogService,

            show (date: Date, ev?: MouseEvent) : angular.IPromise<Date>;
        }
    }
}
