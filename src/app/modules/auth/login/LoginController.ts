import { InjectC } from '../../../decorators/decorators';
import { Controller } from '../../../decorators/decorators';

@Controller('LoginController')
@InjectC('$scope', '$state', 'wuAuthService')
export class LoginController {

    public loginform : wanamu.auth.ILoginForm;

    public loading : boolean = false;
    public pattern : RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;

    public form : any = {
        error: {}
    };

    /**
     *
     * @param $scope
     * @param $state
     * @param auth
     */
    constructor(
        public $scope : angular.IScope,
        public $state : angular.ui.IStateService,
        public auth : wanamu.auth.IAuthService
    ) {

        if (auth.isLoggedIn()) {
            $state.go('panel.view.todos');
        }
    }

    public login () {
        var that = this;
        if (this.loading === true) {
            return;
        }
        //Reset errors
        this.form.$error = {};
        this.loginform.username.$untouched = true;
        this.loginform.password.$untouched = true;

        if (this.loginform.$valid) {
            //Set state loading
            this.loading = true;

            this.auth.login(this.form.username, this.form.password)
                .then(function () {
                    that.$state.go('panel.view.todos');
                }).catch(function (err : any) {
                    that.form.error.error = true;
                    that.form.error.message = err.message;
                }).finally(function () {
                    that.loading = false;
                });
        }
    }
}
