import { TodosService } from '../services/TodosService';
import { BaseController } from '../../../wanamu/wanamu';
import { InjectC, Controller } from '../../../decorators/decorators';


/**
 * Event that get triggered on the rootscope when add new todo is pressed
 * @type {string}
 */
export const EVENT_HEADER_ADD_NEW_TODO = 'HEADER_ADD_NEW_TODO';

/**
 * @alias Ctrl
 */
@Controller('TodosHeaderController')
@InjectC('$rootScope', 'wuTodosHeaderService')
export class TodosHeaderController extends BaseController {

    constructor(
        public $rootScope : angular.IRootScopeService,
        public wuTodosHeaderService : wanamu.todos.TodosHeaderService
    ){
        super();
    }

    triggerAddNewTodo() {
        this.$rootScope.$emit(EVENT_HEADER_ADD_NEW_TODO);
    }
}
