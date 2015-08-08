/**
 * @namespace dialogs
 */
export class LoginDialogController {

    /**
     * @scopevar
     * @viewvar
     */

    constructor(public $mdDialog : angular.material.MDDialogService) {}

    /**
     * @viewhelper
     * @param date
     */
    ok(date : Date) {
        this.$mdDialog.hide();
    }

    /**
     * @viewhelper
     */
    cancel() {
        this.$mdDialog.cancel();
    }
}
