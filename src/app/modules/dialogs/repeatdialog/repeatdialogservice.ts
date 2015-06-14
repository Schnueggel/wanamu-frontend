/**
 * Created by Schnueggel on 14.06.2015.
 */
'use strict';

import {RepeatDialogController} from './repeatdialog';

/**
 * Service for opening the Dialog
 */
export class RepeatDialogService implements wanamu.dialogs.RepeatDialogService {

    static $inject = ['$mdDialog', '$document'];

    constructor(public $mdDialog : angularmaterial.MDDialogService, public $document : angular.IDocumentService) {
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

        var opts : angularmaterial.MDDialogOptions = <angularmaterial.MDDialogOptions>{
            template : require('./repeatdialog.html'),
            parent: <HTMLElement>doc.body,
            targetEvent : ev,
            controller: RepeatDialogController,
            bindToController: true,
            locals : {
                selected : date,
                changed : () => {}
            },
            controllerAs : 'DateDialog',
            clickOutsideToClose: true,
            escapeToClose : true,
        };
        return this.$mdDialog.show(opts);
    }
}
