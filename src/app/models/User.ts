///<reference path="./model.d.ts"/>
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

    public setting : Setting.Setting;

    public todolists : {[s: number]: TodoList.TodoList;} = <any>{};

    public _todos : {[s: number]: Todo.Todo;} = null;

    /**
     *
     * @param id
     * @returns {TodoList|null}
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
     * @returns {TodoList}
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
     * @returns {{}}
     */
    public todos() : {[s: number]: Todo.Todo;} {
        if (this._todos == null) {
            this.loadTodos();
        }
        return this._todos;
    }

    /**
     *
     * @returns {any[]}
     */
    public todosAsArray() : Todo.Todo[] {
        return _.values(this.todos());
    }

    /**
     * Sets the todolists. This will delete all todolists
     * @param todolists
     */
    public setTodoLists(todolists : TodoList.TodoList[]) : void {
        this.todolists = <any>{};
        var todolist : TodoList.TodoList;

        for(var i = 0; i < todolists.length; i++) {
            todolist = todolists[i];
            if (todolist instanceof TodoList.TodoList){
                this.todolists[todolist.id] = todolist;
            }
        }

        this.loadTodos();
    }

    /**
     *
     * @param setting
     */
    public setSetting(setting : Setting.Setting) : void {
        this.setting = setting;
    }

    /**
     * Extracts all todos from the todolists and put them in the todomap
     */
    protected loadTodos () : void {
        var todos : Todo.Todo[];

        this._todos = <any>{};

        for (var todolist in this.todolists) {
            if (this.todolists[todolist] instanceof TodoList.TodoList){
                todos = this.todolists[todolist].todos();

                for(var i = 0; i < todos.length; i++) {
                    this._todos[todos[i].id] = todos[i];
                }
            }
        }
    }

}
