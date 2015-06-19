import _ = require('lodash');
import { RepeatDirectiveController } from './RepeatDirectiveController';
import { BaseDirective, BaseController } from '../../wanamu/wanamu';
import { Directive } from '../../decorators/decorators';
import { RepeatDirectiveOptions } from './RepeatDirectiveOptions';

@Directive('wuRepeat')
export class RepeatDirective extends BaseDirective {
    public scope: boolean = true;
    public bindToController: Object = {
        repeatOpts: '='
    };
    controllerAs: string = 'Repeat';
    controller: typeof RepeatDirectiveController = RepeatDirectiveController;
    template: string = require('./repeat.html');
    restrict: string = "E";
}
