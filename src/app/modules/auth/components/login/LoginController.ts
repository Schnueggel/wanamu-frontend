const _ = require('lodash');

/**
 * @alias Login
 */
export default class LoginController {

    public loginform : wanamu.components.login.ILoginForm;

    public loading : boolean = false;
    public pattern : RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;

    /**
     * @scopevar
     */
    public username : string;
    /**
     * @scopevar
     */
    public password: string;

    /**
     * @scopevar
     */
    public onLogin : Function;
    /**
     * @scopevar
     */
    public onRegister: Function;
    /**
     * @scopevar
     */
    public onCancel: Function;
    /**
     * @scopevar
     */
    public showRegister: boolean;
    /**
     * @scopevar
     */
    public showCancel: boolean;
    /**
     *
     */
    constructor() {

        if (_.isUndefined(this.onLogin)) {
            this.onLogin = () => {};
        }
    }

    /**
     * Performs a login
     * @viewhelper
     */
    public login () {
        if (this.loading === true) {
            return;
        }

        this.loginform.username.$untouched = true;
        this.loginform.password.$untouched = true;

        if (this.loginform.$valid) {
            //Set state loading
            this.onLogin();
        }
    }
}
