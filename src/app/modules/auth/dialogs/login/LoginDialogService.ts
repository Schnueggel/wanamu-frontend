import { LoginDialogController } from './LoginDialogController';

/**
 * Service for opening the Login Dialog
 */
export class LoginDialogService implements wu.auth.dialogs.login.ILoginDialogService {

    static $inject = ['$mdDialog', '$document'];

    constructor(public $mdDialog : angular.material.MDDialogService, public $document : angular.IDocumentService) {
        console.log($document);
    }

    /**
     *
     * @param ev
     * @returns {Promise}
     */
    public show (ev : MouseEvent) : ng.IPromise<any> {

        const doc : Document = <any>this.$document[0];

        const opts : angular.material.MDDialogOptions = <angular.material.MDDialogOptions>{
            template : require('./logindialog.html'),
            parent: <HTMLElement>doc.body,
            targetEvent : ev,
            controller: LoginDialogController,
            bindToController: true,
            locals : {
            },
            controllerAs : 'LoginDialog',
            clickOutsideToClose: true,
            escapeToClose : true,
        };
        return this.$mdDialog.show(opts);
    }
}
