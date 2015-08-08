import LoginController from './LoginController';
/**
 * Login Directive offers a simple login with callbacks on the triggered buttons
 */
export function loginDirective () {

   return <ng.IDirective>{
        scope: true,
        bindToController: {
            /**
             * @kind boolean
             */
            showCancel: '=',
            /**
             * @kind boolean
             */
            showRegister: '=',
            /**
             * @kind Function
             */
            onLogin: '=',
            /**
             * @kind Function
             */
            onRegister: '=',
            /**
             * @kind Function
             */
            onCancel: '='
        },
        controllerAs: 'Login',
        controller: LoginController,
        template: require('./login.html'),
        restrict: "E"
    };
}
