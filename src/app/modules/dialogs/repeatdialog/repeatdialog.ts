/**
 * Created by Schnueggel on 14.06.2015.
 */
export class RepeatDialogController {

    /**
     * @scopevar
     * @viewvar
     */
    public selected : Date;
    public changed : Function;

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
