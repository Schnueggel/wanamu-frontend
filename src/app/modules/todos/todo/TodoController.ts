import _ = require('lodash');
import { Todo } from '../../../models/Todo';
import { InjectC } from '../../../decorators/decorators';
import { BaseController } from '../../../wanamu/wanamu';
import { UnauthorizedError } from '../../../errors/errors';
import { DateTimePickerOptions } from '../../datetimepicker/datetimepicker/datetimepickeroptions';
import { RepeatDirectiveOptions } from '../../repeatpicker/RepeatDirectiveOptions';
let Rx = require('rx');
/**
 * This Controller manages a single TodoDirective
 * @alias Todo
 * @namespace todo
 */
@InjectC('panelService', 'wuTodosHeaderService', 'wuTodosService')
export class TodoController extends BaseController {

    public static currentInEdit : TodoController = null;

    private edit : boolean = false;
    /**
     * Delay in millisencds
     * @type {number}
     */
    private syncDelay : number = 5000;
    private syncDelaySubccription : Rx.IDisposable;
    private waitForSync: boolean = false;

    public todo : Todo;
    public editcolors : boolean;
    public colors : wu.model.IColor;
    public setting : wu.model.ISetting;
    public currentColor : {};

    public moment : moment.MomentStatic = require('moment');
    public isSyncing : boolean = false;

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

        /**
         * We remove the add button
         * @type {boolean}
         */
        this.wuTodosHeaderService.showAddTodoButton = false;

        this.stopDelayedSyncing();

        this.panelService
            .showRepeatPicker(inopts)
            .then( ( opts : RepeatDirectiveOptions ) => this.onRepeatDialogSuccess(opts) )
            .finally( ()=> {
                this.startDelayedSyncing();
                this.wuTodosHeaderService.showAddTodoButton = true;
            });
    }
    /**
     * Finish the Todo
     */
    finish () {
        this.todo.finished = true;
        this.startDelayedSyncing();
    }

    /**
     * Restores the Todo
     */
    restore () {
        this.todo.finished = false;
        this.todo.deletedAt = null;
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

        this.stopDelayedSyncing();

        this.panelService
            .showDateTimePicker(opts)
            .then((alarm : Date) => {
                this.todo.alarm = this.moment(alarm).format('YYYY-MM-DD HH:mm:ss');
                this.todo.alarmDate = alarm;
            })
            .finally(()=>{
                this.wuTodosHeaderService.showAddTodoButton = true;
                this.startDelayedSyncing();
            });
    }

    /**
     * Deletes this todo
     * @returns {any}
     */
    deleteTodo(): void {
        if (this.isSyncing) {
            return null;
        } else {
            this.isSyncing = true;
            let final = () => this.isSyncing = false;
            this.wuTodosService
                .deleteTodo(this.todo)
                .finally( final );
        }
    }

    /**
     * Starts the syncing proccess with a delay. If an old syncing process exist that is not completed yet
     * it will cancel this process
     */
    startDelayedSyncing() {
        const observable : Rx.IObservable<any> = Rx.Observable.timer(this.syncDelay);

        this.panelService.addToSyncPool(this.todo);

        this.stopDelayedSyncing();

        this.syncDelaySubccription = observable.subscribeOnCompleted( this.syncTodo.bind(this) );
    }

    /**
     * Stops syncing process while its  in the preparation phase
     */
    stopDelayedSyncing() {
        if (this.syncDelaySubccription) {
            this.syncDelaySubccription.dispose();
        }
    }

    /**
     *
     * @returns {IPromise<TResult>}
     */
    syncTodo () : void {
        if (this.isSyncing) {
            this.waitForSync = true;
        } else {

            this.isSyncing = true;

            const observable = Rx.Observable
                .defer( () =>this.wuTodosService.syncTodo(this.todo) );

            observable.subscribe(
                () => {},
                this.onSyncError.bind(this),
                this.onSyncTodoSuccess.bind(this)
            );
        }
    }

    /**
     * Helper for syncTodo
     * @param err
     */
    private onSyncError(err : wu.errors.BaseError) {
        this.isSyncing = false;
        this.panelService.removeFromSyncPool(this.todo);

        if (err instanceof UnauthorizedError) {
            this.waitForSync = false;
            this.panelService.showLogin().then( () => {
                this.syncTodo();
            });
        } else {
            this.panelService.showSimpleErrorToast(err.message);
        }

        if (this.waitForSync) {
            this.waitForSync = false;
            this.syncTodo();
        }
    }

    /**
     * Helper for syncTodo
     */
    private onSyncTodoSuccess () {
        this.isSyncing = false;
        this.panelService.removeFromSyncPool(this.todo);
        if (this.waitForSync) {
            this.syncTodo();
        }
    }
}
