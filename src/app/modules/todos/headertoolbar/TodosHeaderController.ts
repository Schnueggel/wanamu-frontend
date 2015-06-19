/**
 * Created by Schnueggel on 08.06.2015.
 */
import { TodosService } from '../services/TodosService';
import { BaseController } from '../../../wanamu/wanamu';
import { InjectC, Controller } from '../../../decorators/decorators';

@Controller('TodosHeaderController')
@InjectC('$rootScope', 'todosService')
export class TodosHeaderController extends BaseController{
    constructor(
        public $rootScope : angular.IRootScopeService,
        public todoService : TodosService
    ){
        super();
    }

    triggerAddNewTodo() {
        this.todoService.addNewTodo();
    }
}
