/**
 * Created by Schnueggel on 08.06.2015.
 */
import _ = require('lodash');
import { Todo } from '../../../models/Todo';
import {log, dirty} from '../../../decorators/decorators';

'use strict';
/**
 * This Controller manages a single TodoDirective
 */
export class TodoController {

    static $inject : Array<string> = ['wuDateDialog', 'wuRepeatDialog'];

    public static currentInEdit : TodoController = null;

    private _edit : boolean = false;
    public todo : Todo;
    public editcolors : boolean;
    public colors : wanamu.IColor;
    public setting : wanamu.ISetting;
    public currentColor : {};
    public alarm : Date;

    public repeat : boolean;
    public yearly : string;
    public monthly : string;
    public weekly : Array<string>;

    constructor(public wuDateDialog: wanamu.dialogs.DateDialogService,
                public wuRepeatDialog: wanamu.dialogs.RepeatDialogService ) {

        this.edit = false;
        this.editcolors = false;
        this.colors = this.setting.colors();
        this.setColor(this.todo.color);

        // If a new Todo is added we put it in edit mode
        // New Todos dont have and ID
        if (!_.isNumber(this.todo.id)) {
            this.editTodo(true);
        }

        if ( !_.isArray(this.weekly)) {
            this.weekly = [];
        }

        if ( !_.isBoolean(this.repeat)) {
            this.repeat = false;
        }
    }

    /**
     * Set the color of the todo
     * @param color
     */
    @log
    setColor (color : string) : void {
        this.currentColor = {'background-color': this.setting.color(color) || 'white'};
    }
    @dirty
    get edit () : boolean { return this._edit;}
    set edit (val : boolean) {this._edit = val}

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

    delete = (todo: Todo) => {
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

    setRepeat(ev : MouseEvent) {
        var inopts : wanamu.dialogs.RepeatOptions = {
            monthly: this.monthly,
            yearly: this.yearly,
            weekly: this.weekly,
            repeat: this.repeat
        };
        this.wuRepeatDialog.show(inopts, ev)
            .then(this.onRepeatDialogSuccess);
    }

    /**
     * @callback
     * @param opts
     */
    onRepeatDialogSuccess = (opts : wanamu.dialogs.RepeatOptions) : void => {
        _.assign(this, opts);
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
