/**
 * Created by Schnueggel on 08.06.2015.
 */
import Todo = require('../../../models/Todo');
import TodoVars = require('../services/TodosVars');
/**
 * Controls the TodoList
 */
class TodoListController {

    static $inject : any = ['$state', 'auth', '$rootScope'];
    public list : wanamu.ITodo[];
    public setting : wanamu.ISetting;
    public currentTodoListId : number = null;

    constructor(
        public $state: ngui.IStateService,
        public auth : AuthService.AuthService,
        public $rootScope : angular.IRootScopeService
    ){
        if (!auth.isLoggedIn()) {
            $state.go('panel.view.login');
            return;
        }

        var that = this;

        var removeAddTodoListener = $rootScope.$on(TodoVars.EVENT_TODO_ADD, () => that.addNewTodo() );
        $rootScope.$on('destroy', () => removeAddTodoListener());

        this.loadTodoList();
        this.setting = auth.currentUser().Setting;

    }

    loadTodoList () : void {
        this.list = this.auth.currentUser().todos(this.currentTodoListId);
    }

    addNewTodo() : void {
        var todo = new Todo();
        this.auth.currentUser().addNewTodo(todo, this.currentTodoListId);
    }
}

export = TodoListController;
