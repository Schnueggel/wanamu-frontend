/**
 * Created by Schnueggel on 14.06.2015.
 */

declare module wanamu {
    module dialogs {

        interface DateDialogService {
            $mdDialog : angular.material.MDDialogService,

            show (date: Date, ev?: MouseEvent) : angular.IPromise<Date>;
        }
    }
}
