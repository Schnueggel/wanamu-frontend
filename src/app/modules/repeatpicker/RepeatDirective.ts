import _ = require('lodash');
import { RepeatDirectiveController } from './RepeatDirectiveController';
import { BaseDirective, BaseController } from '../../wanamu/wanamu';
import { Directive } from '../../decorators/decorators';
import { RepeatDirectiveOptions } from './RepeatDirectiveOptions';

@Directive('wuRepeat')
export class RepeatDirective extends BaseDirective {

    constructor() {
        super();
    }

    public directiveOptions  : angular.IDirective = {
        scope: true,
        bindToController:{
            opts: '='
        },
        controllerAs: 'Repeat',
        controller: RepeatDirectiveController,
        template: require('./repeat.html'),
        restrict: "E"
    };
}
