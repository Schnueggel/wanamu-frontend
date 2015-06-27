import _ = require('lodash');
import { TodoController } from './TodoController';
import { BaseDirective, BaseController } from '../../../wanamu/wanamu';
import { Directive } from '../../../decorators/decorators';

@Directive('wuTodoItem')
export class TodoDirective extends BaseDirective {

    public directiveOptions  : angular.IDirective = {
        scope: true,
        bindToController: {
            todo: '=todo',
            setting :'=setting',
            inEditTodoId: '=inEditTodoId'
        },
        controllerAs: 'Todo',
        controller: TodoController,
        template: require('./todo.html'),
        restrict: "E"
    };

    constructor() {
        super();
    }
}
