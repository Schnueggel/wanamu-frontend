import { DateTimePickerOptions } from '../datetimepicker/datetimepicker/datetimepickeroptions';
import { Service, InjectC } from '../../decorators/decorators';
import { BaseService } from '../../wanamu/wanamu';
import { RepeatDirectiveOptions } from '../repeatpicker/RepeatDirectiveOptions';
/**
 * Service to Control the global datepicker and repeatpicker element
 * @alias panelService
 * @namespace panel
 */
@Service('panelService')
@InjectC('$q', '$mdToast')
export class PanelService extends BaseService implements wu.module.panel.IPanelService {

    private _isDateTimePickerOpen : boolean = false;
    private _isRepeatPickerOpen : boolean = false;
    private _isLoginOpen : boolean = false;
    private _isComponentOpen : boolean = false;

    private dtpdefer : ng.IDeferred<Date> = null;
    private repeatdefer : ng.IDeferred<RepeatDirectiveOptions> = null;
    private logindeferred : ng.IDeferred<wu.model.IUser> = null;

    public repeatopts : RepeatDirectiveOptions;
    public dtpopts : DateTimePickerOptions;
    public loginSuccessCallback : wu.auth.ILoginSuccessCallback;

    constructor(private $q : angular.IQService, private $mdToast : ng.material.MDToastService) {
        super();
    }

    /**
     * Shows a simple toast at the right bottom of the page
     * @param msg
     */
    public showSimpleToast(msg : string): void {
        this.$mdToast.show({
            template : `<md-toast class="simple-toast"><p>${msg}</p></md-toast>`,
            position: 'top right'
        });
    }

    /**
     * Shows a warning toast with warn color background
     * @param msg
     */
    public showSimpleErrorToast (msg : string) : void {
        this.$mdToast.show({
            template : `<md-toast class="simple-toast wu-bg md-warn"><p>${msg}</p></md-toast>`,
            position: 'top right'
        });
    }

    /**
     *
     * @param opts
     */
    public showDateTimePicker (opts : DateTimePickerOptions) : angular.IPromise<Date>{
        this.dtpdefer = this.$q.defer<Date>();
        let promise = this.dtpdefer.promise;

        if (!this.isDateTimePickerOpen) {
            this.dtpopts = opts;
            this.isDateTimePickerOpen = true;
            this.isRepeatPickerOpen = false;
        } else {
            this.dtpdefer.reject('Datepicker is already open');
            console.warn('DateTimePicker is already open and cannot be opend again');
        }

        return promise;
    }

    /**
     * Shows the Login Tab
     */
    public showLogin () : angular.IPromise<wu.model.IUser>{

        if (this.logindeferred === null) {
            this.logindeferred = this.$q.defer<wu.model.IUser>();
        } else {
            return this.logindeferred.promise;
        }

        let promise = this.logindeferred.promise;

        if (!this.isLoginOpen) {
            if (!this.loginSuccessCallback) {
                this.loginSuccessCallback = (user : wu.model.IUser) => {
                    this.resolveLogin(user);
                }
            } else {
                // If there is already a callback we add a new one
                let callback : wu.auth.ILoginSuccessCallback = this.loginSuccessCallback;
                this.loginSuccessCallback = (user : wu.model.IUser) => {
                    callback(user);
                    this.resolveLogin(user);
                }
            }
            this.hideAll();
            this.isLoginOpen = true;
        }

        return promise;
    }

    /**
     * Resolve and active login to make this work showLogin must be called
     * @param user
     */
    public resolveLogin(user : wu.model.IUser) {
        if (this.logindeferred !== null) {
            this.logindeferred.resolve(user);
            this.logindeferred = null;
        }
        this.isLoginOpen = false;
        this.loginSuccessCallback = null;
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

    /**
     * Shows the RepeatPicker if it is not already visible
     * @param opts
     * @returns {IPromise<Date>}
     */
    public showRepeatPicker (opts : RepeatDirectiveOptions) : angular.IPromise<RepeatDirectiveOptions>{
        this.repeatdefer = this.$q.defer<RepeatDirectiveOptions>();
        let promise = this.repeatdefer.promise;

        if (!this.isRepeatPickerOpen) {
            this.repeatopts = opts;
            this.isRepeatPickerOpen = true;
            this.isDateTimePickerOpen = false;
        } else {
            this.repeatdefer.reject('RepeatPicker is already open');
            console.warn('RepeatPicker is already open and cannot be opend again');
        }

        return promise;
    }

    /**
     * Resolve an open repeatpicker request
     * @param date
     */
    public resolveRepeatPicker() {
        if (this.repeatdefer !== null) {
            this.repeatdefer.resolve(this.repeatopts);
            this.repeatdefer = null;
        } else {
            console.warn('Could not resolve RepeatPicker as no valid deferred was found');
        }
        this.isRepeatPickerOpen = false;
    }

    /**
     * Reject an open repeatpicker request
     * @param msg
     */
    public rejectRepeatPicker(msg?: string) {
        if (this.repeatdefer !== null){
            this.repeatdefer.reject(msg);
            this.repeatdefer = null;
        } else {
            console.warn('Could not resolve RepeatPicker as no valid deferred was found');
        }
        this.isRepeatPickerOpen = false;
    }

    public get isDateTimePickerOpen():boolean {
        return this._isDateTimePickerOpen;
    }

    public set isDateTimePickerOpen(value:boolean) {
        this._isDateTimePickerOpen = value;
    }

    public get isRepeatPickerOpen():boolean {
        return this._isRepeatPickerOpen;
    }

    public set isRepeatPickerOpen(value:boolean) {
        this._isRepeatPickerOpen = value;
    }

    public get isLoginOpen():boolean {
        return this._isLoginOpen;
    }

    public set isLoginOpen(value:boolean) {
        this._isLoginOpen = value;
    }

    /**
     * Hides all open elements
     */
    public hideAll() {
        this.isLoginOpen = false;
        this.isDateTimePickerOpen = false;
        this.isRepeatPickerOpen = false;
    }


    public get isComponentOpen(): boolean {
        this.isComponentOpen = this.isDateTimePickerOpen || this.isRepeatPickerOpen || this.isLoginOpen;
        return this._isComponentOpen;
    }

    public set isComponentOpen(value:boolean) {
        this._isComponentOpen = value;
    }
}
