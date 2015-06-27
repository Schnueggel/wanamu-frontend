import { BaseController } from '../../../wanamu/wanamu';
import { InjectC, Controller } from '../../../decorators/decorators';

@Controller('wuTodoEditController')
@InjectC('$stateParams', 'wuTodosService' )
export class TodoEditController extends BaseController {

    /**
     *
     * @param $stateParams
     * @param todoService
     */
    constructor(
        public $stateParams: ng.ui.IStateParamsService,
        public todoService : wu.todos.ITodoService
    ){
        super();
        todoService.inEditTodoId = $stateParams['id'];
        console.log('todo.edit');
    }
}
