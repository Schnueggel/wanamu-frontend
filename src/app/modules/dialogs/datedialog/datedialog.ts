/**
 * Created by Schnueggel on 14.06.2015.
 */
export class DateDialogController {

    /**
     * @scopevar
     * @viewvar
     */
    public date : Date;
    public changed : Function;
    public allowpast : boolean;

    constructor(public $scope : angular.IScope, public $mdDialog : angular.material.MDDialogService) {}

    /**
     * @viewhelper
     * @param date
     */
    ok(date : Date) {
        this.$mdDialog.hide(date);
    }

    /**
     * @viewhelper
     */
    cancel() {
        this.$mdDialog.cancel();
    }
}
