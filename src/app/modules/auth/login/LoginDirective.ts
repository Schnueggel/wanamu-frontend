import _ = require('lodash');
import { BaseDirective } from '../../../wanamu/wanamu';
import { Directive } from '../../../decorators/decorators';

@Directive('wuLogin')
export class LoginDirective extends BaseDirective {

    constructor() {
        super();
    }

    public directiveOptions  : ng.IDirective = {
        scope: true,
        bindToController:{
            loginSuccessCallback: '='
        },
        controllerAs: 'Login',
        controller: 'LoginController',
        template: require('./login.html'),
        restrict: "E"
    };
}
