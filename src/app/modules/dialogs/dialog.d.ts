/**
 * Created by Schnueggel on 14.06.2015.
 */

declare module wanamu {
    declare module dialogs {
        interface DateDialogService {
            $mdDialog : any,
            show (date:Date, ev?:angular.IAngularEvent);
        }
    }
}
