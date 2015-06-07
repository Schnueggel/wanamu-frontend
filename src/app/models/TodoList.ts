/**
 * Created by Christian on 06.06.2015.
 */
import _ = require('lodash');
import Todo = require('./Todo');
import Base = require('./Base');

export class TodoList extends Base.Base{

    public id : number;
    public name : string;

    private _todos : {[s: number]: Todo.Todo;} = <any>{};

    /**
     *
     * @param id
     * @returns {Todo}
     */
    public todo(id : number) {

        if (this._todos[id] instanceof Todo.Todo){
            return this._todos[id];
        }
        return null;
    }

    /**
     *
     * @param todo
     */
    public addTodo(todo : Todo.Todo) {
        if (todo instanceof Todo.Todo) {
            this._todos[todo.id] = todo;
        }
    }

    /**
     *
     * @returns {Todo[]}
     */
    public todos() {
        return _.values(this.todos);
    }
}
