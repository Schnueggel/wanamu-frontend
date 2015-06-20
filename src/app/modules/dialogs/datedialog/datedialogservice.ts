import {DateDialogController} from './datedialog';

/**
 * Service for opening the Dialog
 */
export class DateDialogService implements wanamu.dialogs.DateDialogService {

    static $inject = ['$mdDialog', '$document'];

    constructor(public $mdDialog : angular.material.MDDialogService, public $document : angular.IDocumentService) {
    }

    /**
     *
     * @param date
     * @param ev
     * @returns {Promise}
     */
    public show (date : Date, ev : MouseEvent) : angular.IPromise<Date> {

        if ( !(date instanceof  Date) ) {
            console.error('DateDialog expect a Date Object');
            return;
        }
        var doc : Document = <any>this.$document[0];

        var opts : angular.material.MDDialogOptions = <angular.material.MDDialogOptions>{
            template : require('./datedialog.html'),
            parent: <HTMLElement>doc.body,
            targetEvent : ev,
            controller: DateDialogController,
            bindToController: true,
            locals : {
                date : date,
                allowpast : false,
                changed : () => {}
            },
            controllerAs : 'DateDialog',
            clickOutsideToClose: true,
            escapeToClose : true,
        };
        return this.$mdDialog.show(opts);
    }
}
