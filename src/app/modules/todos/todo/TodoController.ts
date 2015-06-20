import _ = require('lodash');
import { Todo } from '../../../models/Todo';
import { InjectC } from '../../../decorators/decorators';
import { BaseController } from '../../../wanamu/wanamu';
import { PanelService } from '../../panel/PanelService';
import { DateTimePickerOptions } from '../../datetimepicker/datetimepicker/datetimepickeroptions';
import { RepeatDirectiveOptions } from '../../repeatpicker/RepeatDirectiveOptions';
/**
 * This Controller manages a single TodoDirective
 * @alias Todo
 * @namespace todo
 */
@InjectC('wuRepeatDialog', 'panelService', 'wuTodosHeaderService')
export class TodoController extends BaseController {

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

    constructor(
        public wuRepeatDialog: wanamu.dialogs.RepeatDialogService,
        public panelService: PanelService,
        public wuTodosHeaderService : wanamu.todos.TodosHeaderService
    ) {
        super();
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
    setColor (color : string) : void {
        this.currentColor = {'background-color': this.setting.color(color) || 'white'};
    }

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
        var inopts = new RepeatDirectiveOptions();
        inopts.monthly =  this.monthly;
        inopts.yearly = this.yearly;
        inopts.weekly = this.weekly;
        inopts.repeat = this.repeat;

        this.wuTodosHeaderService.showAddTodoButton = false;

        this.panelService
            .showRepeatPicker(inopts)
            .then(this.onRepeatDialogSuccess)
            .finally(()=>{
                this.wuTodosHeaderService.showAddTodoButton = true;
            });
    }

    /**
     * @callback
     * @param opts
     */
    onRepeatDialogSuccess = (opts : RepeatDirectiveOptions) : void => {
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

        let opts = new DateTimePickerOptions(alarm);

        this.wuTodosHeaderService.showAddTodoButton = false;

        this.panelService
            .showDateTimePicker(opts)
            .then((alarm : Date) => {
                this.alarm = alarm;
            })
            .finally(()=>{
                this.wuTodosHeaderService.showAddTodoButton = true;
            });
    }
}
