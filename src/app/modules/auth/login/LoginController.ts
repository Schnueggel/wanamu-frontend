import { InjectC } from '../../../decorators/decorators';
import { Controller } from '../../../decorators/decorators';
import { NotFoundError, AlreadyConfirmedError, NotConfirmedError, PreConditionFailedError, UnauthorizedError } from '../../../errors/errors';
import { LoginScopeModel } from '../components/login/login';

/**
 * @alias Login
 */
@Controller('LoginController')
@InjectC('$state', 'wuAuthService', 'panelService', 'registrationDataSource')
export class LoginController {

    public loading : boolean = false;
    public pattern : RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
    public confirmation : boolean = false;

    public loginScopeModel : LoginScopeModel;

    /**
     * If this is set the Login is used as directive and hence will not forward to defined state
     * but trigger this callback
     */
    public loginSuccessCallback : wu.auth.ILoginSuccessCallback;

    /**
     *
     * @param $state
     * @param auth
     * @param panelService
     * @param registrationDataSource
     */
    constructor(
        public $state : wu.auth.ILoginStateService,
        public auth : wu.auth.IAuthService,
        public panelService : wu.module.panel.IPanelService,
        public registrationDataSource : wu.datasource.IRegistrationDataSource
    ) {
        if ($state.params.confirmation) {
            this.confirmation = true;
        }

        this.loginScopeModel = new LoginScopeModel();
    }

    /**
     * Go to register page
     */
    public register () {
        this.$state.go('panel.view.registration');
    }

    /**
     * Performs a login
     * @viewhelper
     */
    public login () {
        if (this.loading === true) {
            return;
        }

        if (this.loginScopeModel.loginform.$valid) {
            //Set state loading
            this.loading = true;
            // Add sync Model to syncpool to show that we are loading
            this.panelService.addToSyncPool(this.loginScopeModel);
            let logpromise = this.auth.login( this.loginScopeModel.username, this.loginScopeModel.password );
            logpromise.then( this.onLoginSuccess );
            logpromise.catch( this.onLoginError );
            logpromise.finally( () => {
                this.loading = false;
                // We are done remove sync model from sync pool
                this.panelService.removeFromSyncPool(this.loginScopeModel);
            });
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
        this.confirmation = false;
        if (err instanceof NotConfirmedError ) {
            this.confirmation = true;
        } else if (err instanceof UnauthorizedError) {
            this.panelService.showSimpleErrorToast('Please check your Credentials');
        }
        else {
            this.panelService.showSimpleErrorToast(err.message);
        }

    };

    /**
     * Resends the confirmation mail
     */
    public resendConfirmation (){
        if (this.loginScopeModel.loginform.$valid) {
            this.registrationDataSource
                .resendConfirmation(this.loginScopeModel.username, this.loginScopeModel.password)
                .then( this.onResendConfirmationSuccess.bind(this) )
                .catch( this.onResendConfirmationError.bind(this) )
        } else {
            this.panelService.showSimpleErrorToast('Please type your username and password');
        }
    }

    /**
     * @see resendConfirmation
     */
    private onResendConfirmationSuccess () {
        this.panelService.showSimpleToast('We send you an confirmation email. Please check your email account');
        this.confirmation = false;
    }

    /**
     * @see resendConfirmation
     * @param err
     */
    private onResendConfirmationError(err : Error) {
        if (err instanceof NotFoundError ) {
            this.panelService.showSimpleErrorToast('Login failed please try again');
        }
        else if (err instanceof PreConditionFailedError ) {
            this.panelService.showSimpleErrorToast('Please check your Credentials');
        }
        else if ( err instanceof AlreadyConfirmedError) {
            this.confirmation = false;
            this.panelService.showSimpleErrorToast('Account already confirmed please login');
        }
        else {
            this.panelService.showSimpleErrorToast(err.message);
        }
    }
}
