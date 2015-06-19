import _ = require('lodash');
import { TodoController } from './TodoController';
import { BaseDirective, BaseController } from '../../../wanamu/wanamu';
import { Directive } from '../../../decorators/decorators';

@Directive('wuTodoItem')
export class TodoDirective extends BaseDirective {
    public scope: boolean = true;
    public bindToController: Object ={
        todo: '=todo',
        setting :'=setting'
    };
    controllerAs: string = 'Todo';
    controller: typeof TodoController = TodoController;
    template: string = require('./todo.html');
    restrict: string = "E";
}
