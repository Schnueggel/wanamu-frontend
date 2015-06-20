import { TodosService } from '../services/TodosService';
import { BaseController } from '../../../wanamu/wanamu';
import { InjectC, Controller } from '../../../decorators/decorators';

/**
 * @alias Ctrl
 */
@Controller('TodosHeaderController')
@InjectC('$rootScope', 'todosService', 'wuTodosHeaderService')
export class TodosHeaderController extends BaseController {

    constructor(
        public $rootScope : angular.IRootScopeService,
        public todoService : TodosService,
        public wuTodosHeaderService : wanamu.todos.TodosHeaderService
    ){
        super();
    }

    triggerAddNewTodo() {
        this.todoService.addNewTodo();
    }
}
