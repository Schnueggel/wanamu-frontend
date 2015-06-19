import { DateTimePickerOptions } from '../datetimepicker/datetimepicker/datetimepickeroptions';
import { Service, InjectC } from '../../decorators/decorators';
import { BaseService } from '../../wanamu/wanamu';
/**
 * Service to Control the global datepicker and repeatpicker element
 * @alias panelService
 * @namespace panel
 */
@Service('panelService')
@InjectC('$q')
export class PanelService extends BaseService {

    private _isDateTimePickerOpen : boolean = false;
    private _isOpenRepeatPicker : boolean = false;
    private _isComponentOpen : boolean = false;

    private dtpdefer : angular.IDeferred<Date> = null;

    public repeatopts : wanamu.dialogs.RepeatOptions;

    public dtpopts : DateTimePickerOptions;

    constructor(public $q : angular.IQService) {
        super();
    }

    /**
     *
     * @param opts
     */
    public showDateTimePicker (opts : DateTimePickerOptions) : angular.IPromise<Date>{
        this.dtpdefer = this.$q.defer<Date>();
        var promise = this.dtpdefer.promise;

        if (!this.isDateTimePickerOpen) {
            this.dtpopts = opts;
            this.isDateTimePickerOpen = true;
            this.isOpenRepeatPicker = false;
        } else {
            this.dtpdefer.reject('Datepicker is already open');
            console.warn('DateTimePicker is already open and cannot be opend again');
        }

        return promise;
    }

    /**
     * Resolve an open datetimepicker request
     * @param date
     */
    public resolveDateTimePicker() {
        if (this.dtpdefer !== null) {
            this.dtpdefer.resolve(this.dtpopts.date);
            this.dtpdefer = null;
        } else {
            console.warn('Could not resolve datetimepicker as no valid deferred was found');
        }
        this.isDateTimePickerOpen = false;
    }

    /**
     * Reject an open datetimepicker request
     * @param msg
     */
    public rejectDateTimePicker(msg?: string) {
        if (this.dtpdefer !== null){
            this.dtpdefer.reject(msg);
            this.dtpdefer = null;
        } else {
            console.warn('Could not resolve datetimepicker as no valid deferred was found');
        }
        this.isDateTimePickerOpen = false;
    }

    public showRepeatPicker (opts : wanamu.dialogs.RepeatOptions) {

    }

    public get isDateTimePickerOpen():boolean {
        return this._isDateTimePickerOpen;
    }

    public set isDateTimePickerOpen(value:boolean) {
        this._isDateTimePickerOpen = value;
    }

    public get isOpenRepeatPicker():boolean {
        return this._isOpenRepeatPicker;
    }

    public set isOpenRepeatPicker(value:boolean) {
        this._isOpenRepeatPicker = value;
    }

    /**
     * Hides all open elements
     */
    public hideAll() {
        this.isDateTimePickerOpen = false;
        this.isOpenRepeatPicker = false;
    }


    public get isComponentOpen():boolean {
        this.isComponentOpen = this.isDateTimePickerOpen || this.isOpenRepeatPicker;
        return this._isComponentOpen;
    }

    public set isComponentOpen(value:boolean) {
        this._isComponentOpen = value;
    }
}
