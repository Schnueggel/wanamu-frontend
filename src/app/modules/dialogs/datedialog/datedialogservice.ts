/**
 * Created by Schnueggel on 14.06.2015.
 */
'use strict';

export class DateDialogController {

    /**
     * @scopevar
     * @viewvar
     */
    public date : Date;

    constructor(public $scope : angular.IScope, public $mdDialog : angularmaterial.MDDialogService) {}

    /**
     * @viewfunction
     * @param date
     */
    ok(date : Date) {
        this.$mdDialog.hide(date);
    }

    /**
     * @viewfunction
     */
    cancel() {
        this.$mdDialog.cancel();
    }
}

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
    public show (date : Date, ev : ng.IAngularEvent) : angular.IPromise {

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
                date : date
            },
            controllerAs : 'DateDialog',
            clickOutsideToClose: true,
            escapeToClose : true,
        };


        console.log(opts);

        return this.$mdDialog.show(opts);
    }
}
