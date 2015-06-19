
import { Todo } from '../../../models/Todo';
import { AuthService } from '../../auth/services/AuthService';
/**
 * Controls the TodoList
 */
export class TodoListController {

    static $inject : any = ['$state', 'auth'];
    public list : Todo[];
    public setting : wanamu.ISetting;
    public currentTodoListId : number = null;

    constructor(
        public $state: ngui.IStateService,
        public auth : AuthService
    ){
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
