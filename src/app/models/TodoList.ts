/**
 * Created by Christian on 06.06.2015.
 */
import _ = require('lodash');
import Todo = require('./Todo');
import Base = require('./Base');

export class TodoList extends Base.Base implements wanamu.ITodoList {

    public id : number;
    public name : string;
    public Todos : Todo.Todo[];

    /**
     *
     * @param data
     */
    constructor(data : wanamu.ITodoListData){
        this.fromJSON(data);
    }

    /**
     *
     * @param data
     */
    public fromJSON (data: wanamu.ITodoListData) : void {
        var data = data || {};

        this.Todos = [];
        this.id = data.id;
        this.name = data.name;

        if (_.isArray(data.Todos)) {
            for(var i = 0; i < data.Todos.length; i++){
                this.addTodo(new Todo.Todo(data.Todos[i]));
            }
        }
    }
    /**
     *
     * @param id
     * @returns {Todo}
     */
    public todo(id : number) : wanamu.ITodo {

        for(var i = 0; i < this.Todos.length; i++){
            if (this.Todos[i].id === id){
                return this.Todos[i];
            }
        }

        return null;
    }

    /**
     *
     * @param todo
     */
    public addTodo(todo : Todo.Todo) : void {
        if (todo instanceof Todo.Todo) {
            this.Todos.push(todo);
        }
    }

    /**
     *
     * @param todos
     */
    public addTodos(todos : Todo.Todo[]) : void {
        var todos = todos || [];

        for(var i = 0; i < todos.length; i++){
            this.addTodo(todos[i]);
        }
    }

    /**
     *
     * @returns {Todo[]}
     */
    public todos() {
        return this.Todos;
    }
}
