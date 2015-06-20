
import { Todo } from '../../../models/Todo';
import { AuthService } from '../../auth/services/AuthService';
import { BaseController } from '../../../wanamu/wanamu';
import { InjectC, Controller } from '../../../decorators/decorators';

@Controller('TodoListController')
@InjectC('$state', 'auth')
export class TodoListController extends BaseController{

    public list : Todo[];
    public setting : wanamu.ISetting;
    public currentTodoListId : number = null;

    constructor(
        public $state: angular.ui.IStateService,
        public auth : AuthService
    ){
        super();
        if (!auth.isLoggedIn()) {
            $state.go('panel.view.login');
            return;
        }

        this.loadTodoList();
        this.setting = auth.currentUser().Setting;
    }

    /**
     * Load todolist
     */
    loadTodoList () : void {
        this.list = this.auth.currentUser().todos(this.currentTodoListId);
    }

    /**
     * View Method
     */
    addNewTodo() : void {
        var todo = new Todo();
        console.log('hund');
    }
}
