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

    constructor(public $mdDialog : angular.material.MDDialogService, public $document : angular.IDocumentService) {
    }

    /**
     *
     * @param date
     * @param ev
     * @returns {Promise}
     */
    public show (repeatopts : wanamu.dialogs.RepeatOptions , ev : MouseEvent) : angular.IPromise<wanamu.dialogs.RepeatOptions> {

        var doc : Document = <any>this.$document[0];

        var opts : angular.material.MDDialogOptions = <angular.material.MDDialogOptions>{
            template : require('./repeatdialog.html'),
            parent: <HTMLElement>doc.body,
            targetEvent : ev,
            controller: RepeatDialogController,
            bindToController: true,
            controllerAs : 'RepeatDialog',
            clickOutsideToClose: true,
            escapeToClose : true,
        };

        opts.locals = repeatopts;

        return this.$mdDialog.show(opts);
    }
}
