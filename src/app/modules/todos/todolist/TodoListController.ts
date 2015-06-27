import { Todo } from '../../../models/Todo';
import { AuthService } from '../../auth/AuthService';
import { BaseController } from '../../../wanamu/wanamu';
import { InjectC, Controller } from '../../../decorators/decorators';
import _ = require('lodash');

/**
 * @alias TodoList
 */
@Controller('TodoListController')
@InjectC('$state', 'wuAuthService', 'wuTodosService', '$scope')
export class TodoListController extends BaseController {

    public list : wu.model.ITodo[];
    public setting : wu.model.ISetting;
    public currentTodoListId : number = null;
    public currentTodoId : number = null;

    /**
     *
     * @param $state
     * @param auth
     * @param wuTodosService
     */
    constructor(
        public $state: ng.ui.IStateService,
        public auth : AuthService,
        public wuTodosService: wu.todos.ITodoService,
        public $scope: ng.IScope
    ){
        super();
        this.loadTodoList();

        $scope.$watch( this.editedTodoId, ( newvalue : number ) => {
            if (newvalue) {
                console.log('Go Todo id ' + newvalue);
                this.$state.go('panel.view.todos.edit', {id : newvalue});
            }
        });
    }

    /**
     * Returns the current edited todo id
     * @returns {number}
     */
    editedTodoId = () : number => {
        return this.wuTodosService.inEditTodoId;
    };

    /**
     * Load todolist
     */
    loadTodoList () : void {
        console.log('Load TodoList');

        let promise = this.auth.queryCurrentUser();

        promise.then((user : wu.model.IUser) => {
            this.list = user.todos(this.currentTodoListId);
            this.setting = user.Setting;
            console.log(this.list);
        });
        promise.catch(() => this.$state.go('panel.view.login'));
    }

    /**
     * View Method
     */
    addNewTodo() : void {
        let todo = new Todo();
        console.log('New Todo');
    }
}
