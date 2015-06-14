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
