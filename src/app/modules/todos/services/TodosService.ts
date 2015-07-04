import { Todo } from '../../../models/models';
import { AuthService } from '../../auth/AuthService';
import { TodoList } from '../../../models/models';
import { BaseService } from '../../../wanamu/wanamu';
import { InjectC, Service } from '../../../decorators/decorators';

export const NEGATIVE_ID_PREFIX = 'n';

export const NEGATIVE_ID_REGEX = new RegExp(`/^${NEGATIVE_ID_PREFIX}[0-9]+$/`);

@InjectC('$q', 'wuAuthService', 'panelService', 'todoDataSource')
@Service('wuTodosService' )
export class TodosService extends BaseService implements wu.todos.ITodosService {

    public lastAddedTodo : wu.model.ITodo = null;
    public lastDeletedTodo: wu.model.ITodo = null;
    public newTodoIdCount = 0;
    /**
     * @scopevar
     */
    public inEditTodoId : number;

    /**
     *
     * @param $q
     * @param auth
     * @param panelService
     * @param todoDataSource
     */
    constructor(public $q : ng.IQService,
                public auth : AuthService,
                public panelService : wu.module.panel.IPanelService,
                public todoDataSource : wu.datasource.ITodoDataSource
    ){
        super();
        auth.queryCurrentUser().then(this.onUserLoaded);
    }

    /**
     * Gets triggered when user is loaded
     * @param user
     */
    private onUserLoaded = (user: wu.model.IUser) : void => {};

    /**
     * Adds a new todo
     */
    addNewTodo() : Todo {
        let todo : Todo = new Todo(<wanamu.ITodoData>{id: --this.newTodoIdCount});
        this.lastAddedTodo = todo;
        this.auth.queryCurrentUser().then( (user: wu.model.IUser) => user.addNewTodo(todo));
        return todo;
    }

    /**
     * @viewhelper
     * @param todo
     */
    deleteTodo(todo : wu.model.ITodo) : ng.IPromise<wu.model.ITodo> {
        // If todo is not stored in backend we just mark it as deleted by setting deletedAt
        if (!todo.id || todo.id < 1) {
            let deferred = this.$q.defer();
            todo.deletedAt = new Date().toISOString();
            deferred.resolve(todo);
            return deferred.promise;
        }
        else {
            let promise = this.todoDataSource.delete(todo);
            promise.then (() => {
                this.panelService.showSimpleToast('Todo Deleted');
            });
            promise.catch((err: wu.errors.BaseError ) => {
                this.panelService.showSimpleErrorToast(err.message);
            });
            return promise;
        }
    }

    /**
     *
     * @returns {IPromise<TResult>}
     */
    syncTodo (todo : wu.model.ITodo) : ng.IPromise<wanamu.model.ITodo> {
        let promise = this.todoDataSource.sync(todo);

        return promise;
    }
}
