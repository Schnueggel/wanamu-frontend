/**
 * Created by Schnueggel on 08.06.2015.
 */
'use strict';
import Todo = require('../../../models/Todo');

class TodoController {
    public static currentInEdit : TodoController = null;

    public edit : boolean = false;
    public todo : Todo;
    public editcolors : boolean;
    public colors : wanamu.IColor;
    public setting : wanamu.ISetting;
    public currentColor : {};

    constructor() {
        this.edit = false;
        this.editcolors = false;
        this.colors = this.setting.colors();

        this.setColor(this.todo.color);
    }

    setColor = (color : string) =>{
        this.currentColor = {'background-color': this.setting.color(color) || 'white'};
    }

    done = () :void => {
        this.editTodo(false);
        if (this.todo) {
            //TODO start sync
        }
    };

    selectColor = (color : string) : void => {
        this.todo.color = color;
        this.setColor(color);
        this.editcolors = false;
    };

    delete = (todo: wanamu.ITodo) => {
        console.log(todo);
    };

    selectColor = (color : string) : void =>{
        this.todo.color = color;
        this.setColor(color);
        this.editcolors = false;
    };

    editTodo = (edit : boolean) :void => {
        if (edit === true) {
            if (TodoController.currentInEdit !== null) {
                TodoController.currentInEdit.edit = false;
            }
            TodoController.currentInEdit = this;
        } else {
            TodoController.currentInEdit = null;
        }
        this.edit = edit;
    };
}

export = TodoController;
