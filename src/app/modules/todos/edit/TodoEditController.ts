import { BaseController } from '../../../wanamu/wanamu';
import { InjectC, Controller } from '../../../decorators/decorators';
import _ = require('lodash');
import { NEGATIVE_ID_PREFIX, NEGATIVE_ID_REGEX } from '../services/TodosService';

@Controller('wuTodoEditController')
@InjectC('$stateParams', 'wuTodosService' )
export class TodoEditController extends BaseController {

    /**
     *
     * @param $stateParams
     * @param wuTodoService
     */
    constructor(
        public $stateParams: ng.ui.IStateParamsService,
        public wuTodoService : wu.todos.ITodosService
    ){
        super();

        if ( _.isString($stateParams['id']) && $stateParams['id'].match( NEGATIVE_ID_REGEX ) ) {
            wuTodoService.inEditTodoId = _.parseInt(_.trimLeft($stateParams['id'], NEGATIVE_ID_PREFIX)) * -1;
        } else if ( _.isNumber($stateParams['id']) ) {
            wuTodoService.inEditTodoId = $stateParams['id'];
        } else {
            console.warn('Invalid stateparam found for TodoEditor. Found: ' + $stateParams['id']);
        }
    }
}
