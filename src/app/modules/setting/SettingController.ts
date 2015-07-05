import { BaseController } from '../../wanamu/wanamu';
import { InjectC, Controller } from '../../decorators/decorators';
import { UnauthorizedError } from '../../errors/errors';
var rx = require('rx');
import _ = require('lodash');

/**
 * @alias Setting
 */
@Controller('SettingController')
@InjectC('$state', '$q', 'wuAuthService', 'settingDataSource', 'panelService')
export class SettingController extends BaseController {

    public settingform:wu.setting.ISettingForm;
    public user:wu.model.IUser;
    public setting:wu.model.ISetting;

    private isSaving:boolean = false;
    public rgbPattern:RegExp = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;

    /**
     *
     * @param $state
     * @param $q
     * @param auth
     * @param settingDatasource
     * @param panelService
     */
    constructor(public $state:ng.ui.IStateService,
                public $q:ng.IQService,
                public auth:wu.auth.IAuthService,
                public settingDatasource:wu.datasource.ISettingDataSource,
                public panelService:wu.module.panel.IPanelService) {
        super();
        auth.queryCurrentUser().then(this.onUserLoaded);
    }

    /**
     * On user loaded event handler
     * @param user
     */
    public onUserLoaded = (user:wu.model.IUser) => {
        this.user = user;
        this.setting = user.Setting;
    };

    /**
     * saves the user settings
     * @viewhelper
     */
    public save() {
        if (this.isSaving) {
            this.panelService.showSimpleErrorToast('Please waiting we try to save your data');
            return;
        }
        if (!this.setting.dirty || !this.settingform.$valid) {
            this.panelService.showSimpleErrorToast('Please check your input');
            return;
        }

        const deferred = () => this.settingDatasource.sync(this.setting);
        const observable = Rx.Observable.defer(deferred);

        observable.subscribe(
            () => {},
            this.onSaveError.bind(this),
            this.onSaveSuccess.bind(this)
        );
    }

    /**
     * helper
     */
    private onSaveSuccess() {
        this.isSaving = false;
        this.panelService.showSimpleToast('Settings successful saved');
    }

    /**
     * helper
     * @param err
     */
    private onSaveError(err:Error) {
        if (err instanceof UnauthorizedError) {
            this.loginAndSave();
        } else {
            this.panelService.showSimpleErrorToast(err.message);
            this.isSaving = false;
        }
    }

    /**
     *  Opens the login and starts save afterwards
     */
    public loginAndSave() {
        const deferred = () => this.panelService.showLogin();
        const observable = Rx.Observable
            .defer(deferred)
            .map((user:wu.model.IUser) => {
                this.setting = user.Setting;
            });

        observable.subscribe(
            () => {},
            this.onLoginAndSaveError.bind(this),
            this.onLoginAndSaveSuccess.bind(this)
        )
    }

    /**
     * helper
     * @param err
     */
    private onLoginAndSaveError(err:Error) {
        this.panelService.showSimpleErrorToast(err.message);
        this.isSaving = true;
    }

    /**
     * helper
     */
    private onLoginAndSaveSuccess() {
        this.isSaving = false;
        this.save();
    }

    /**
     * @viewhelper
     * @param colorProperty
     */
    pickColor(colorProperty:string) {

        if (this.setting && !_.isUndefined(this.setting[colorProperty])) {
            let promise = this.panelService.showColorPicker(this.setting[colorProperty]);
            promise.then((color:string) => {
                if (_.isString(color) && color.match(this.rgbPattern)) {
                    this.setting[colorProperty] = color;
                } else {
                    this.panelService.showSimpleErrorToast('Invalid color created');
                }
            });
        }
    }

    /**
     * @viewhelper
     * @returns {boolean}
     */
    public isReadyForSave():boolean {
        return !this.isSaving && this.setting && this.setting.dirty;
    }
}
