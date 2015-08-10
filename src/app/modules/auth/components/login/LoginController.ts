const _ = require('lodash');

/**
 * @alias Login
 */
export default class LoginController {

    public loading : boolean = false;
    public pattern : RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;

    /**
     * @scopevar
     */
    public loginModel : wu.auth.components.login.IScopeModel;

    constructor() { }
}
