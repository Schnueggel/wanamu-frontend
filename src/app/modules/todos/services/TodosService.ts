/**
 * Created by Schnueggel on 09.06.2015.
 */
'use strict';

import { Todo } from '../../../models/models';
import { AuthService } from '../../auth/services/AuthService';
import { User } from '../../../models/models';
import { TodoList } from '../../../models/models';

export class TodosService {

    static $inject = ['auth', '$rootScope'];

    public static EVENT_ADD_TODO : string = 'EVENT_ADD_TODO';

    public lastAddedTodo : Todo = null;
    public user : User = null;
    public selectedTodoList : TodoList = null;

    constructor(public auth : AuthService, public $rootScope : angular.IRootScopeService){
        console.log(auth.currentUser());
        this.selectedTodoList = auth.currentUser().defaulttodolist;
    }

    /**
     * Adds a listener to the given scope
     * @param $scope
     * @param listener
     */
    onAddNewTodo ($scope : angular.IRootScopeService, listener : (todo : Todo) => any){
        $scope.$on(TodosService.EVENT_ADD_TODO, <any>listener);
    }

    /**
     * Adds a new todo
     * @event {TodoService.EVENT_ADD_TODO, Todo}
     */
    addNewTodo() : void {
        var todo : Todo = new Todo();
        this.lastAddedTodo = todo;
        this.auth.currentUser().addNewTodo(todo, this.selectedTodoList);
        this.$rootScope.$broadcast(TodosService.EVENT_ADD_TODO, todo);
    }
}
