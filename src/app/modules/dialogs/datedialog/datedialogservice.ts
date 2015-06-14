/**
 * Created by Schnueggel on 14.06.2015.
 */
'use strict';

import {DateDialogController} from './datedialog';

/**
 * Service for opening the Dialog
 */
export class DateDialogService implements wanamu.dialogs.DateDialogService {

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

        var opts : angularmaterial.MDDialogOptions = <angularmaterial.MDDialogOptions>{
            template : require('./datedialog.html'),
            parent: this.$document[0].body,
            targetEvent : ev,
            controller: DateDialogController,
            bindToController: true,
            locals : {
                date : date,
                allowpast : false,
                changed : () => {console.log('hund');}
            },
            controllerAs : 'DateDialog',
            clickOutsideToClose: true,
            escapeToClose : true,
        };

        return this.$mdDialog.show(opts);
    }
}
