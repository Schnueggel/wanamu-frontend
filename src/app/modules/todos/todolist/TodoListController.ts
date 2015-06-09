/**
 * Created by Schnueggel on 08.06.2015.
 */

import Todo = require('../../../models/Todo');
import AuthService = require('../../auth/services/AuthService')
/**
 * Controls the TodoList
 */
class TodoListController {

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

export = TodoListController;
