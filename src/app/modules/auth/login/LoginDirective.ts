import _ = require('lodash');
import { LoginController } from './LoginController';
import { BaseDirective } from '../../../wanamu/wanamu';
import { Directive } from '../../../decorators/decorators';

@Directive('wuAuthLogin')
export class LoginDirective extends BaseDirective {

    constructor() {
        super();
    }

    public directiveOptions  : angular.IDirective = {
        scope: true,
        bindToController:{
            loginSuccessCallback: '='
        },
        controllerAs: 'Login',
        controller: LoginController,
        template: require('./login.html'),
        restrict: "E"
    };
}
