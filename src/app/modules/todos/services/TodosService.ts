import { Todo } from '../../../models/models';
import { AuthService } from '../../auth/AuthService';
import { User } from '../../../models/models';
import { TodoList } from '../../../models/models';
import { BaseService } from '../../../wanamu/wanamu';
import { InjectC, Service } from '../../../decorators/decorators';

@InjectC('wuAuthService', '$rootScope')
@Service('todosService')
export class TodosService extends BaseService {

    public static EVENT_ADD_TODO : string = 'EVENT_ADD_TODO';

    public lastAddedTodo : Todo = null;
    public lastDeletedTodo: wu.model.ITodo = null;
    public user : User = null;
    public selectedTodoList : wu.model.ITodoList = null;

    constructor(public auth : AuthService, public $rootScope : angular.IRootScopeService){
        super();
        this.selectedTodoList = auth.currentUser().defaulttodolist;
    }

    /**
     * Adds a new todo
     * @event {TodoService.EVENT_ADD_TODO, Todo}
     * @deprecated
     */
    addNewTodo() : void {
        var todo : Todo = new Todo();
        this.lastAddedTodo = todo;
        this.auth.currentUser().addNewTodo(todo, this.selectedTodoList);
    }
}
