import { Todo } from '../../../models/Todo';
import { BaseController } from '../../../wanamu/wanamu';
import { UnauthorizedError } from '../../../errors/errors';
import { InjectC, Controller } from '../../../decorators/decorators';
import { EVENT_HEADER_ADD_NEW_TODO } from '../headertoolbar/TodosHeaderController';
import _ = require('lodash');
var Rx = require('rx');

/**
 * @alias TodoList
 */
@Controller('TodoListController')
@InjectC('$state', '$rootScope', 'wuAuthService', 'wuTodosService','todolistDataSource', '$scope')
export class TodoListController extends BaseController {

    public list : wu.model.ITodoList;
    public setting : wu.model.ISetting;
    public user: wu.model.IUser;
    public currentTodoListId : number = null;
    public currentTodoId : number = null;
    public showFinished : boolean = false;
    public showDeleted : boolean = false;
    public isLoadingTodos : boolean = false;

    /**
     *
     * @param $state
     * @param $rootScope
     * @param auth
     * @param wuTodosService
     * @param todolistDataSource
     * @param $scope
     */
    constructor(
        public $state: ng.ui.IStateService,
        public $rootScope: ng.IRootScopeService,
        public auth : wu.auth.IAuthService,
        public wuTodosService: wu.todos.ITodosService,
        public todolistDataSource : wu.datasource.ITodolistDataSource,
        public $scope: ng.IScope
    ){
        super();

        const removeAddTodoListener = $rootScope.$on(EVENT_HEADER_ADD_NEW_TODO, this.addNewTodo.bind(this));
        $scope.$on('$destroy', () => removeAddTodoListener() );

        this.loadTodoList();
    }

    /**
     * @viewhelper
     * @returns {boolean}
     */
    hasVisibleTodos () : boolean {
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
     * @viewhelper
     */
    showNoTodosInfo() : boolean {
        return !this.isLoadingTodos && !this.hasVisibleTodos();
    }

    /**
     * @viewhelper
     */
    showTodoList() : boolean {
        return !this.isLoadingTodos && !_.isUndefined(this.list) && this.list.Todos.length > 0;
    }
    /**
     * Adds a new todo to the todolist
     * @viewhelper
     */
    addNewTodo() {
        const todo = this.wuTodosService.createNewTodo();
        this.list.addNewTodo(todo);
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
        if (this.isLoadingTodos) {
            return;
        }
        this.isLoadingTodos = true;
        const delay = new Date(Date.now()  + 1000);
        const observable = Rx.Observable.defer( () => this.auth.queryCurrentUser() )
            .flatMapLatest( (user: wu.model.IUser) => {
                this.user = user;
                return Rx.Observable.fromPromise(this.todolistDataSource.getTodolist(user.DefaultTodoListId));
            })
            .map( (todolist: wu.model.ITodoList) => {
                return todolist;
            })
            .delay(delay)
            .map( (todolist: wu.model.ITodoList) => {
                this.list = todolist;
                this.$scope.$apply();
            });

        observable.subscribe(
            () => {},
            this.onTodolistLoadError.bind(this),
            () => {
                this.isLoadingTodos = false;
                this.$scope.$apply();
            }
        )
    }

    /**
     *
     * @param err
     */
    onTodolistLoadError( err : Error) {
        this.isLoadingTodos = false;
        if ( err instanceof UnauthorizedError) {
            this.$state.go('panel.view.login');
        }
        this.$scope.$apply();
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
