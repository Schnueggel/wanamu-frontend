/**
 * Created by Christian on 06.06.2015.
 */
'use strict';

import _ = require('lodash');
import Setting = require('./Setting');
import TodoList = require('./TodoList');
import Todo = require('./Todo');
import Base = require('./Base');

export class User extends Base.Base {

    public id : number;
    public username : string;
    public email : string;
    public firstname : string;

    public lastname : string;

    public defaulttodolist : TodoList.TodoList;

    public settings : Setting.Setting;

    public todolists : {[s: number]: TodoList.TodoList;} = <any>{};

    private _todos : {[s: number]: Todo.Todo;} = null;

    /**
     *
     * @param id
     * @returns {TodoList.TodoList}
     */
    public todolist (id : number) {
        if (this.todolists[id]  instanceof TodoList.TodoList) {
            return this.todolists[id];
        }
        return null;
    }
    /**
     *
     * @param id
     * @returns {TodoList.TodoList}
     */
    public todo (id : number) {

        if (this._todos == null) {
            this.loadTodos();
        }

        if (this._todos[id] instanceof Todo.Todo) {
            return this._todos[id];
        }

        return null;
    }

    /**
     *
     * @returns {{[s: number]: Todo}}
     */
    public todos() : {[s: number]: Todo.Todo;} {
        return this._todos;
    }

    /**
     *
     * @param todolists
     */
    public setTodoLists(todolists : TodoList.TodoList[]) : void {
        var todolist : TodoList.TodoList;
        for(var i = 0; i < todolists.length; i++) {
            todolist = todolists[i];
            if (todolist instanceof TodoList.TodoList){
                this.todolists[todolist.id] = todolist;
            }
        }
    }

    /**
     * Extracts all todos from the todolists and put them in the todomap
     */
    protected loadTodos () : void {
        var todos : Todo.Todo[];

        this._todos = <any>{};

        for (var todolist in this.todolists) {
            todos = todolist.todos();
            for(var i = 0; i < todos.length; i++) {
                this._todos[todos[i].id] = todos[i];
            }
        }
    }
}
