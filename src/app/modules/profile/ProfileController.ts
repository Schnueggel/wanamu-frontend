import { BaseController } from '../../wanamu/wanamu';
import { InjectC, Controller } from '../../decorators/decorators';
import { AuthError } from '../../errors/errors';

import _ = require('lodash');

/**
 * @alias Profile
 */
@Controller('ProfileController')
@InjectC('$state', '$q', 'wuAuthService', 'userDataSource', 'profileDataSource', 'panelService')
export class ProfileController extends BaseController {

    public salutations : Array<string> = ['mr', 'mrs', 'human', 'neutrum'];
    public profileform : wu.profile.IProfileForm;
    public user : wu.model.IUser;
    public password : string = '';
    public passwordrepeat : string = '';

    private isSaving : boolean = false;

    /**
     *
     * @param $state
     * @param $q
     * @param auth
     * @param userDatasource
     * @param profileDatasource
     * @param panelService
     */
    constructor(
        public $state: ng.ui.IStateService,
        public $q : ng.IQService,
        public auth : wu.auth.IAuthService,
        public userDatasource : wu.datasource.IUserDataSource,
        public profileDatasource : wu.datasource.IProfileDataSource,
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
    };

    /**
     * saves the user profile
     * @viewhelper
     */
    public save() {
        this.isSaving = true;
        if (!this.profileform.$dirty || !this.isUserFormValid()) {
            this.panelService.showSimpleErrorToast('Please check your input');
            return;
        }
        let all : Array<any> = [];
        let ppromise = this.profileDatasource.sync(this.user.Profile);
        all.push(ppromise);

        ppromise.then((profile : wu.model.IProfile) => {
            this.panelService.showSimpleToast('Profile successful updated');
        });

        ppromise.catch( ( err : wu.errors.BaseError ) => {
            if ( err instanceof AuthError ) {
               let loginpromise = this.panelService.showLogin();
                loginpromise.then( (user : wu.model.IUser) => {
                    this.user = user;
                    this.save();
                });
            }

            this.panelService.showSimpleErrorToast(err.message);
        });


        // =============================================================================================
        // We store the password extra and only when it was changed because it belongs to the user
        // =============================================================================================
        if (this.profileform.password.$dirty) {
            let promise = this.getPasswordPromise();
            all.push(promise);
        }

        let allpromise = this.$q.all(all);
        allpromise.then( () => this.profileform.$setPristine() );
        allpromise.finally( () => this.isSaving = false );
    }

    /**
     * Checks if the form is valid
     * @returns {boolean}
     */
    public isUserFormValid() :boolean {

        let uform = this.profileform;
        if ( uform.password.$dirty && uform.password.$viewValue !== uform.passwordrepeat.$viewValue ) {
            uform.passwordrepeat.$error['equal'] = true;
        } else {
            delete uform.passwordrepeat.$error['equal'];
            uform.passwordrepeat.$validate();
        }
        return uform.$valid;
    }

    /**
     * @viewhelper
     * @returns {boolean}
     */
    public isReadyForSave() : boolean {
        return !this.isSaving && this.profileform.$dirty && this.isUserFormValid();
    }

    /**
     *
     * @returns {ng.IPromise<model.IUser>}
     */
    public getPasswordPromise() : ng.IPromise<wu.model.IUser> {
        this.user.password = this.password;
        let promise = this.userDatasource.sync(this.user);

        promise.then( (user : wu.model.IUser) => {
            this.panelService.showSimpleToast('Password successful updated');
            this.passwordrepeat = '';
            this.password = '';
        });
        promise.catch( ( err : wu.errors.BaseError ) => {
            this.panelService.showSimpleErrorToast(err.message);
        });

        return promise;
    }
}
