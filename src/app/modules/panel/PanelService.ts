import { DateTimePickerOptions } from '../datetimepicker/datetimepicker/datetimepickeroptions';
import { Service, InjectC } from '../../decorators/decorators';
import { BaseService } from '../../wanamu/wanamu';
/**
 * Service to Control the global datepicker and repeatpicker element
 * @alias panelService
 */
@Service('panelService')
@InjectC('$q')
export class PanelService extends BaseService {

    private _opendatepicker : boolean = false;
    private _openrepeatpicker : boolean = false;

    private _datetimepickerdefer : angular.IDeferred<Date> = null;

    public repeatopts : wanamu.dialogs.RepeatOptions;
    public datetimepickeropts : DateTimePickerOptions;

    constructor(public $q : angular.IQService) {
        super();
    }

    /**
     *
     * @param opts
     */
    public showDateTimePicker (opts : DateTimePickerOptions) : angular.IPromise<Date>{
        this._datetimepickerdefer = this.$q.defer<Date>();
        var promise = this._datetimepickerdefer.promise;

        if (!this.opendatepicker) {
            this.datetimepickeropts = opts;
            this.openrepeatpicker = false;
        } else {
            this._datetimepickerdefer.reject('Datepicker is already open');
            console.warn('DateTimePicker is already open and cannot be opend again');
        }

        return promise;
    }

    /**
     * Resolve an open datetimepicker request
     * @param date
     */
    public resolveDateTimePicker(date : Date) {
        if (this._datetimepickerdefer !== null) {
            this._datetimepickerdefer.resolve(date);
            this._datetimepickerdefer = null;
        } else {
            console.warn('Could not resolve datetimepicker as no valid deferred was found');
        }
    }

    /**
     * Reject an open datetimepicker request
     * @param msg
     */
    public rejectDateTimePicker(msg?: string) {
        if (this._datetimepickerdefer !== null){
            this._datetimepickerdefer.reject(msg);
            this._datetimepickerdefer = null;
        } else {
            console.warn('Could not resolve datetimepicker as no valid deferred was found');
        }
    }
    /**
     * Hide the datepicker
     */
    public hideDateTimePicker () {
        this.opendatepicker = false;
    }

    public hideRepeatPicker() {
        this.openrepeatpicker = false;
    }

    public showRepeatPicker (opts : wanamu.dialogs.RepeatOptions) {

    }

    public get opendatepicker():boolean {
        return this._opendatepicker;
    }

    public set opendatepicker(value:boolean) {
        this._opendatepicker = value;
    }

    public get openrepeatpicker():boolean {
        return this._openrepeatpicker;
    }

    public set openrepeatpicker(value:boolean) {
        this._openrepeatpicker = value;
    }

    /**
     * Hides all open elements
     */
    public hideAll() {
        this.opendatepicker = false;
        this.openrepeatpicker = false;
    }
}
