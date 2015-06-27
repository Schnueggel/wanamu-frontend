import _ = require('lodash');
import { Todo } from '../../../models/Todo';
import { InjectC } from '../../../decorators/decorators';
import { BaseController } from '../../../wanamu/wanamu';
import { DateTimePickerOptions } from '../../datetimepicker/datetimepicker/datetimepickeroptions';
import { RepeatDirectiveOptions } from '../../repeatpicker/RepeatDirectiveOptions';
/**
 * This Controller manages a single TodoDirective
 * @alias Todo
 * @namespace todo
 */
@InjectC('panelService', 'wuTodosHeaderService', 'wuTodosService')
export class TodoController extends BaseController {

    public static currentInEdit : TodoController = null;

    private edit : boolean = false;
    public todo : Todo;
    public editcolors : boolean;
    public colors : wu.model.IColor;
    public setting : wu.model.ISetting;
    public currentColor : {};

    public moment : moment.MomentStatic = require('moment');

    constructor(
        public panelService: wu.module.panel.IPanelService,
        public wuTodosHeaderService : wu.todos.TodosHeaderService,
        public wuTodosService : wu.todos.ITodosService
    ) {
        super();
        this.edit = false;
        this.editcolors = false;
        this.colors = this.setting.colors();
        this.setColor(this.todo.color);

        // If a new Todo is added we put it in edit mode
        // New Todos dont have and ID
        if (!_.isNumber(this.todo.id) || this.todo.id < 1) {
            this.editTodo(true);
        }

        console.log('TodoController');
    }

    /**
     * Set the color of the todo
     * @param color
     */
    setColor (color : string) : void {
        this.currentColor =  this.setting.color(color) || 'white';
    }

    /**
     * @viewhelper
     */
    done() : void  {
        this.editTodo(false);
        if (this.todo) {
            this.syncTodo();
        }
    }

    /**
     * Selects a color for this todo by the color name e.g.: color1
     * @viewhelper
     * @param color
     */
    selectColor = (color : string) : void => {
        this.todo.color = color;
        this.setColor(color);
        this.editcolors = false;
    };



    /**
     * Set the edit mode of this Directive and cancels the editmode of other directives
     * @param edit
     */
    editTodo = (edit : boolean) : void => {
        if (edit === true) {
            this.wuTodosService.inEditTodoId = this.todo.id;
        }
        this.edit = edit;
    };

    /**
     * @viewhelper
     * @returns {boolean}
     */
    isInEditMode () : boolean {
        return this.wuTodosService.inEditTodoId === this.todo.id;
    }
    /**
     * @viewhelper
     * @param ev
     */
    setRepeat(ev : MouseEvent) {
        var inopts = new RepeatDirectiveOptions();
        inopts.monthly =  this.todo.repeatMonthly;
        inopts.yearly = this.todo.repeatYearly;
        inopts.weekly = this.todo.repeatWeekly;
        inopts.repeat = this.todo.repeat;

        this.wuTodosHeaderService.showAddTodoButton = false;

        this.panelService
            .showRepeatPicker(inopts)
            .then((opts : RepeatDirectiveOptions ) => this.onRepeatDialogSuccess(opts) )
            .finally(()=>{
                this.wuTodosHeaderService.showAddTodoButton = true;
            });
    }

    /**
     * TODO support for montly and yearly
     * @callback
     * @param opts
     */
    onRepeatDialogSuccess = (opts : RepeatDirectiveOptions) : void => {
        this.todo.repeatWeekly = opts.weekly || [];
        this.todo.repeat = opts.repeat;
        this.todo.repeatMonthly = opts.monthly || [];
        this.todo.repeatYearly = opts.yearly || [];
    };

    /**
     * @viewhelper
     * @param ev
     */
    setAlarm (ev : MouseEvent) {

        let opts = new DateTimePickerOptions(this.todo.alarmDate || new Date());

        this.wuTodosHeaderService.showAddTodoButton = false;

        this.panelService
            .showDateTimePicker(opts)
            .then((alarm : Date) => {
                this.todo.alarm = this.moment(alarm).format('YYYY-MM-DD HH:mm:ss');
                this.todo.alarmDate = alarm;
            })
            .finally(()=>{
                this.wuTodosHeaderService.showAddTodoButton = true;
            });
    }

    isShowDone(): boolean {
        return this.isInEditMode() && this.todo.title.length > 0;
    }
    /**
     * Deletes this todo
     * @returns {any}
     */
    deleteTodo(): ng.IPromise<wanamu.model.ITodo> {
        return this.wuTodosService.deleteTodo(this.todo);
    }
    /**
     *
     * @returns {IPromise<TResult>}
     */
    syncTodo () : ng.IPromise<wanamu.model.ITodo> {
       return this.wuTodosService.syncTodo(this.todo);
    }
}
