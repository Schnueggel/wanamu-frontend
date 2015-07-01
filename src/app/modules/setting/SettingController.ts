import { BaseController } from '../../wanamu/wanamu';
import { InjectC, Controller } from '../../decorators/decorators';
import { AuthError } from '../../errors/errors';

import _ = require('lodash');

/**
 * @alias Setting
 */
@Controller('SettingController')
@InjectC('$state', '$q', 'wuAuthService', 'userDataSource', 'settingDataSource', 'panelService')
export class SettingController extends BaseController {

    public settingform : wu.setting.ISettingForm;
    public user : wu.model.IUser;
    public setting : wu.model.ISetting;

    private isSaving : boolean = false;

    /**
     *
     * @param $state
     * @param $q
     * @param auth
     * @param userDatasource
     * @param settingDatasource
     * @param panelService
     */
    constructor(
        public $state: ng.ui.IStateService,
        public $q : ng.IQService,
        public auth : wu.auth.IAuthService,
        public userDatasource : wu.datasource.IUserDataSource,
        public settingDatasource : wu.datasource.ISettingDataSource,
        public panelService : wu.module.panel.IPanelService
    ){
        super();
        auth.queryCurrentUser().then( this.onUserLoaded );
    }

    /**
     * On user loaded event handler
     * @param user
     */
    public onUserLoaded = ( user: wu.model.IUser ) => {
        this.user = user;
        this.setting = user.Setting;
    };

    /**
     * saves the user profile
     * @viewhelper
     */
    public save() {
        this.isSaving = true;
        if (!this.settingform.$dirty || !this.settingform.$valid) {
            this.panelService.showSimpleErrorToast('Please check your input');
            return;
        }
        let ppromise = this.settingDatasource.sync(this.user.Setting);

        ppromise.then((setting : wu.model.ISetting) => {
            this.panelService.showSimpleToast('Setting successful updated');
        });

        ppromise.catch( ( err : wu.errors.BaseError ) => {
            if ( err instanceof AuthError ) {
               let loginpromise = this.panelService.showLogin();
                loginpromise.then( (user : wu.model.IUser) => {
                    this.user = user;
                    this.setting = user.Setting;
                    this.save();
                });
            }

            this.panelService.showSimpleErrorToast(err.message);
        });
    }

    /**
     * @viewhelper
     * @returns {boolean}
     */
    public isReadyForSave() : boolean {
        return !this.isSaving && this.settingform.$dirty;
    }
}
