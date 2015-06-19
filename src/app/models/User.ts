///<reference path="./model.d.ts"/>
/**
 * Created by Christian on 06.06.2015.
 */
'use strict';

import _ = require('lodash');
import { Setting } from './Setting';
import { TodoList } from './TodoList';
import { TodoListNotFoundError } from './errors/TodoListNotFoundError';
import { Todo } from './Todo';
import { BaseModel }  from './BaseModel';

export class User extends BaseModel {

    public static TYPE_GUEST = 'guest';
    public static TYPE_USER = 'user';

    public id : number;
    public email : string;
    public firstname : string = 'Guest';
    public lastname : string;

    public DefaultTodoListId : number;

    public TodoLists : TodoList[];

    public defaulttodolist : TodoList;

    public Setting : wanamu.ISetting;

    public usertype : string  = User.TYPE_GUEST;

    /**
     *
     * @param data
     */
    constructor(data: wanamu.IUserData){
        super();
        this.fromJSON(data);
    }

    /**
     *
     * @param data
     */
    public fromJSON(data: wanamu.IUserData) {
        var data = data || <wanamu.IUserData>{},
            todolist : TodoList;

        this.id = data.id;
        this.email = data.email;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.DefaultTodoListId = data.DefaultTodoListId;
        this.Setting = new Setting(data.Setting);

        this.TodoLists = [];

        if (_.isArray(data.TodoLists)) {
            for (var i = 0; i < data.TodoLists.length; i++) {
                todolist = new TodoList(data.TodoLists[i]);
                if (todolist.id === this.DefaultTodoListId){
                    this.defaulttodolist = todolist;
                }
                this.TodoLists.push(todolist);
            }
        }

        if (this.id){
            this.usertype = User.TYPE_USER;
        }
    }
    /**
     *
     * @param id
     * @returns {TodoList|null}
     */
    public todolist (id : number) : TodoList {
        for(var i = 0; i < this.TodoLists.length; i++){
            if (this.TodoLists[i].id === id) {
                return this.TodoLists[i];
            }
        }

        return null;
    }

    /**
     *
     * @param id
     * @returns {TodoList}
     */
    public todo (id : number) {
        var todolist : TodoList;
        for(var i = 0; i < this.TodoLists.length; i++){
            todolist = this.TodoLists[i];

            for(var t = 0; t < todolist.Todos.length; t++){
                if (todolist.Todos[t].id === id){
                    return todolist.Todos[t];
                }
            }
        }
        return null;
    }

    /**
     * Adds a new TodoITem to the todolist. If no todolistId is given the default TodoList will be used.
     * If no TodoList could be found at all a TodoListNotFoundError will be thrown.
     * @param todo
     * @param id
     * @throws TodoListNotFoundError
     */
    public addNewTodo(todo : Todo, todolist?: TodoList) : void {
        console.log(todolist instanceof TodoList);
        if (todo instanceof Todo) {
            if (!(todolist instanceof TodoList) && this.defaulttodolist instanceof TodoList) {
                todolist = this.defaulttodolist;
            }
            if (!todolist) {
                throw new TodoListNotFoundError();
            }
            todolist.addNewTodo(todo);
        } else {
            console.warn('New Todo must be of type Todo');
        }
    }

    /**
     * Returns the todos from a
     * @param  {number} id TodoListId
     * @returns {Todo[]}
     * @throws TodoListNotFoundError
     */
    public todos(id?: number) : Todo[] {

        var todolist : TodoList = null;

        if (id) {
            todolist = this.todolist(id);
        }

        if (todolist === null) {
            todolist = this.defaulttodolist;
        }

        if (todolist instanceof TodoList) {
            return todolist.todos();
        } else {
            throw new TodoListNotFoundError();
        }
    }
}
