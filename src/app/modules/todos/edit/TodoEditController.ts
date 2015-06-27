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
        public wuTodoService : wu.todos.ITodosService
    ){
        super();
        wuTodoService.inEditTodoId = $stateParams['id'];
        console.log('hun')
    }
}
