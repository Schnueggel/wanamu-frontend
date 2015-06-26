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
@InjectC('panelService', 'wuTodosHeaderService', 'todoDataSource', '$scope', '$interval')
export class TodoController extends BaseController {

    public static currentInEdit : TodoController = null;

    private edit : boolean = false;
    public todo : Todo;
    public editcolors : boolean;
    public colors : wanamu.model.IColor;
    public setting : wanamu.model.ISetting;
    public currentColor : {};

    public moment : moment.MomentStatic = require('moment');

    constructor(
        public panelService: wu.module.panel.PanelService,
        public wuTodosHeaderService : wu.todos.TodosHeaderService,
        public todoDataSource : wu.datasource.ITodoDataSource,
        public $scope: ng.IScope,
        public $interval: ng.IIntervalService
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
    }

    /**
     * Set the color of the todo
     * @param color
     */
    setColor (color : string) : void {
        this.currentColor =  this.setting.color(color) || 'white';
    }

    /**
     * @viewfunction
     */
    done() : void  {
        this.editTodo(false);
        if (this.todo) {
            this.syncTodo();
        }
    }

    /**
     * Selects a color for this todo by the color name e.g.: color1
     * @viewfunction
     * @param color
     */
    selectColor = (color : string) : void => {
        this.todo.color = color;
        this.setColor(color);
        this.editcolors = false;
        this.syncTodo();
    };

    /**
     * @viewfunction
     * @param todo
     */
    delete(){
        this.todoDataSource.delete(this.todo).then (() => {
            this.panelService.showSimpleToast('Todo Deleted');
        }).catch((err: wu.errors.BaseError ) => {
            this.panelService.showSimpleToast(err.message);
        });
    }


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
     * @viewfunction
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

    /**
     *
     * @returns {IPromise<TResult>}
     */
    syncTodo () : ng.IPromise<wanamu.model.ITodo> {
        let promise = this.todoDataSource.sync(this.todo);

        promise.then (() => {
            this.panelService.showSimpleToast('Todo Saved');
        }).catch((err: wu.errors.BaseError ) => {
            this.panelService.showSimpleToast(err.message);
        });

        return promise;
    }
}
