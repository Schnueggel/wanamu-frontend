import LoginController from './LoginController';
/**
 * Login Directive offers a simple login with callbacks on the triggered buttons
 * @namespace module.auth.components
 */
export function loginDirective() {

    return <ng.IDirective>{
        scope: {},
        transclude: true,
        bindToController: {
            loginModel: '='
        },
        controllerAs: 'Login',
        controller: LoginController,
        template: require('./login.html'),
        restrict: "E"
    };
}

/**
 * @namespace module.auth.components
 */
export class LoginScopeModel implements wu.auth.components.login.IScopeModel {

    username:string;
    password:string;
    /**
     * This will be accessable after rendering the view
     */
    loginform: ng.IFormController;
}
