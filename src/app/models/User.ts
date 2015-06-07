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

    public static TYPE_GUEST = 'guest';
    public static TYPE_USER = 'user';

    public id : number;
    public email : string;
    public firstname : string = 'Guest';
    public lastname : string;

    public DefaultTodoListId : number;

    public TodoLists : wanamu.ITodoList[];

    public defaulttodolist : wanamu.ITodoList;

    public setting : wanamu.ISetting;

    public usertype : string  = User.TYPE_GUEST;

    /**
     *
     * @param data
     */
    constructor(data: wanamu.IUserData){
        this.fromJSON(data);
    }

    /**
     *
     * @param data
     */
    public fromJSON(data: wanamu.IUserData) {
        var data = data || {},
            todolist : wanamu.ITodoList;

        this.id = data.id;
        this.email = data.email;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.DefaultTodoListId = data.DefaultTodoListId;
        this.setting = new Setting.Setting(data.Setting);

        this.TodoLists = [];

        if (_.isArray(data.TodoLists)) {
            for (var i = 0; i < data.TodoLists.length; i++) {
                todolist = new TodoList.TodoList(data.TodoLists[i]);
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
    public todolist (id : number) : wanamu.ITodoList {
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
        var todolist : wanamu.ITodoList;
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
     *
     * @param  {number} id TodoListId
     * @returns {wanamu.ITodo[]}
     */
    public todos(id?: number) : wanamu.ITodo[] {

        var todolist : wanamu.ITodoList,
            todos : wanamu.ITodo[] = [];

        for(var i = 0; i < this.TodoLists.length; i++){
            todolist = this.TodoLists[i];
            if (id && todolist.id !== id) {
                continue;
            }

            for(var t = 0; t < todolist.Todos.length; t++){
                todos.push(todolist.Todos[t]);
            }
        }
        return todos;
    }
}
