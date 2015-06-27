import { Todo } from '../../../models/models';
import { AuthService } from '../../auth/AuthService';
import { User } from '../../../models/models';
import { TodoList } from '../../../models/models';
import { BaseService } from '../../../wanamu/wanamu';
import { InjectC, Service } from '../../../decorators/decorators';

@InjectC('wuAuthService', '$rootScope')
@Service('wuTodosService')
export class TodosService extends BaseService implements wu.todos.ITodoService {

    public lastAddedTodo : wu.model.ITodo = null;
    public lastDeletedTodo: wu.model.ITodo = null;
    public user : User = null;
    public selectedTodoList : wu.model.ITodoList = null;
    public inEditTodoId : number;

    constructor(public auth : AuthService, public $rootScope : ng.IRootScopeService){
        super();
        auth.queryCurrentUser().then(this.onUserLoaded);
    }

    /**
     * Gets triggered when user is loaded
     * @param user
     */
    private onUserLoaded = (user: wu.model.IUser) : void => {
        this.selectedTodoList = user.defaulttodolist;
    };
    /**
     * Adds a new todo
     * @event {TodoService.EVENT_ADD_TODO, Todo}
     * @deprecated
     */
    addNewTodo() : wu.model.ITodo {
        var todo : Todo = new Todo();
        this.lastAddedTodo = todo;
        this.auth.currentUser().addNewTodo(todo, this.selectedTodoList);
        return todo;
    }
}
