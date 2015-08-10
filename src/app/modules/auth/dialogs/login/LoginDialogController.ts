import { LoginScopeModel } from '../../components/login/login';

/**
 * @namespace modules.auth.dialogs
 * @alias LoginDialog
 */
export class LoginDialogController {

    static $inject = ['$mdDialog', 'wuAuthService'];
    public loginScopeModel : LoginScopeModel;
    public loading: boolean = false;
    public errorMessage: string = null;

    /**
     *
     * @param $mdDialog
     * @param auth
     */
    constructor(public $mdDialog : angular.material.MDDialogService,public auth : wu.auth.IAuthService) {
        this.loginScopeModel = new LoginScopeModel();
    }

    /**
     * @viewhelper
     */
    ok() {

        if (this.loginScopeModel.loginform.$valid) {
            //Set state loading
            this.loading = true;
            const logpromise = this.auth.login( this.loginScopeModel.username, this.loginScopeModel.password );
            logpromise.then( this.onLoginSuccess );
            logpromise.catch( this.onLoginError );
            logpromise.finally( () => {
                this.loading = false;
            });
        }
    }

    /**
     * Handles login success
     * @param user
     */
    private onLoginSuccess = ( user: wu.model.IUser ) => {
        this.$mdDialog.hide(user);
    };

    /**
     * Handles login Error
     * @param err
     */
    private onLoginError = ( err : wu.errors.BaseError ) => {
        this.errorMessage = err.message;
    };

    /**
     * @viewhelper
     */
    cancel() {
        this.$mdDialog.cancel();
    }

}
