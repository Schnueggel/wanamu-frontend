/**
 * Created by Schnueggel on 08.06.2015.
 */
'use strict';
import _ = require('lodash');
import Todo = require('../../../models/Todo');

/**
 * This Controller manages a single TodoDirective
 */
export class TodoController {
    static $inject : Array<string> = ['wuDateDialog'];

    public static currentInEdit : TodoController = null;

    public edit : boolean = false;
    public todo : Todo;
    public editcolors : boolean;
    public colors : wanamu.IColor;
    public setting : wanamu.ISetting;
    public currentColor : {};
    public alarm : Date;

    constructor(public wuDateDialog: wanamu.dialogs.DateDialogService ) {
        this.edit = false;
        this.editcolors = false;
        this.colors = this.setting.colors();
        this.setColor(this.todo.color);

        // If a new Todo is added we put it in edit mode
        // New Todos dont have and ID
        if (!_.isNumber(this.todo.id)) {
            this.editTodo(true);
        }
    }

    /**
     * Set the color of the todo
     * @param color
     */
    setColor = (color : string) : void => {
        this.currentColor = {'background-color': this.setting.color(color) || 'white'};
    };

    done = () : void => {
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

    /**
     * Set the edit mode of this Directive and cancels the editmode of other directives
     * @param edit
     */
    editTodo = (edit : boolean) : void => {
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

    /**
     * @viewfunction
     * @param ev
     */
    setAlarm (ev : MouseEvent) {
        var alarm : Date;
        if ( !(this.alarm instanceof Date) ) {
            alarm = new Date();
        }
        else {
            alarm = this.alarm;
        }

        this.wuDateDialog.show(alarm, ev).then((alarm : Date) => {
            this.alarm = alarm;
        });
    }
}
