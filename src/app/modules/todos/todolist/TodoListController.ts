import { Todo } from '../../../models/Todo';
import { BaseController } from '../../../wanamu/wanamu';
import { InjectC, Controller } from '../../../decorators/decorators';
import _ = require('lodash');

/**
 * @alias TodoList
 */
@Controller('TodoListController')
@InjectC('$state', 'wuAuthService', 'wuTodosService', '$scope')
export class TodoListController extends BaseController {

    public list : wu.model.ITodoList;
    public setting : wu.model.ISetting;
    public user: wu.model.IUser;
    public currentTodoListId : number = null;
    public currentTodoId : number = null;
    public showFinished : boolean = false;
    public showDeleted : boolean = false;

    /**
     *
     * @param $state
     * @param auth
     * @param wuTodosService
     * @param $scope
     */
    constructor(
        public $state: ng.ui.IStateService,
        public auth : wu.auth.IAuthService,
        public wuTodosService: wu.todos.ITodosService,
        public $scope: ng.IScope
    ){
        super();

        this.loadTodoList();

        $scope.$watch( this.editedTodoId, ( newvalue : number ) => {
            if (_.isNumber(newvalue)) {
                let id : string;
                if (newvalue < 0) {
                    id = 'n' + Math.abs(newvalue);
                } else {
                    id = newvalue.toString();
                }
                this.$state.go('panel.view.todos.edit', {id : id});
            }
        });
    }

    /**
     * @viewhelper
     * @returns {boolean}
     */
    hasVisibleTodos () {
        let hastodo = false;
        if (this.list && this.list.Todos.length > 0 ) {
            _.forEach(this.list.Todos, ( v : wu.model.ITodo) => {
                if (_.isUndefined(v.deletedAt) || _.isNull(v.deletedAt)){
                    hastodo = true;
                    return false;
                }
            });
        }
        return hastodo;
    }
    /**
     * Adds a new todo to the todolist
     * @viewhelper
     */
    addNewTodo() {
        this.wuTodosService.addNewTodo();
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

        let promise = this.auth.queryCurrentUser();

        promise.then((user : wu.model.IUser) => {
            this.list = user.defaulttodolist;
            this.setting = user.Setting;
            this.user = user;
            console.log(this.list);
        });
        promise.catch(() => this.$state.go('panel.view.login'));
    }

    /**
     *
     * @param todo
     * @returns {boolean}
     */
    shouldBeVisible(todo: wu.model.ITodo) : boolean {
        if ( this.showFinished ) {
            return todo.finished;
        }

        if ( this.showDeleted ) {
            return _.isString(todo.deletedAt) && todo.deletedAt.length > 0;
        }

        return !todo.finished && !_.isString(todo.deletedAt);
    }
}
