import { InjectC } from '../../../decorators/decorators';
import { Controller } from '../../../decorators/decorators';

@Controller('LoginController')
@InjectC('$scope', '$state', 'wuAuthService')
export class LoginController {

    public loginform : wu.auth.ILoginForm;

    public loading : boolean = false;
    public pattern : RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;

    public form : any = {
        error: {}
    };

    /**
     * If this is set the Login is used as directive and hence will not forward to defined state
     * but trigger this callback
     */
    public loginSuccessCallback : wu.auth.ILoginSuccessCallback;

    /**
     *
     * @param $scope
     * @param $state
     * @param auth
     */
    constructor(
        public $scope : ng.IScope,
        public $state : ng.ui.IStateService,
        public auth : wu.auth.IAuthService
    ) {
        //auth.queryIsLoggedIn().then( () =>  $state.go('panel.view.todos') );
    }

    public login () {
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

            let logpromise = this.auth.login( this.form.username, this.form.password );
            logpromise.then( this.onLoginSuccess );
            logpromise.catch( this.onLoginError );
            logpromise.finally( () => this.loading = false );
        }
    }

    /**
     * Handles login success
     * @param user
     */
    private onLoginSuccess = ( user: wu.model.IUser ) => {
        //Check if there is a callback and this controller controls a directive
        if (this.loginSuccessCallback) {
            this.loginSuccessCallback( user );
        } else {
            this.$state.go('panel.view.todos');
        }
    };

    /**
     * Handles login Error
     * @param err
     */
    private onLoginError = ( err : wu.errors.BaseError ) => {
        this.form.error.error = true;
        this.form.error.message = err.message;
    };
}
