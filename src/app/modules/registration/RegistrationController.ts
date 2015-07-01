import { BaseController } from '../../wanamu/wanamu';
import { InjectC, Controller } from '../../decorators/decorators';
import { AuthError } from '../../errors/errors';
import { Salutations, User, Profile } from '../../models/models'
import _ = require('lodash');

/**
 * @alias Registration
 */
@Controller('RegistrationController')
@InjectC('$state', '$q', 'wuAuthService', 'userDataSource', 'panelService')
export class RegistrationController extends BaseController {

    public salutations : Array<string> = Salutations.salutations;
    public registrationform : wu.registration.IRegistrationForm;
    public password : string = '';
    public passwordrepeat : string = '';
    public user : wu.model.IUser;
    private isSaving : boolean = false;

    /**
     *
     * @param $state
     * @param $q
     * @param auth
     * @param userDatasource
     * @param panelService
     */
    constructor(
        public $state: ng.ui.IStateService,
        public $q : ng.IQService,
        public auth : wu.auth.IAuthService,
        public userDatasource : wu.datasource.IUserDataSource,
        public panelService : wu.module.panel.IPanelService
    ){
        super();
        this.user = new User();
        this.user.Profile = new Profile();
    }

    /**
     * saves the user registration
     * @viewhelper
     */
    public save() {
        this.isSaving = true;
        if (!this.registrationform.$dirty || !this.isFormValid()) {
            this.panelService.showSimpleErrorToast('Please check your input');
            return;
        }
        let ppromise = this.userDatasource.create(this.user);

        ppromise.then((user : wu.model.IUser) => {
            this.panelService.showSimpleToast('Registration successful updated');
        });

        ppromise.catch( ( err : wu.errors.BaseError ) => {
            this.panelService.showSimpleErrorToast(err.message);
        });
    }

    /**
     * Checks if the form is valid
     * @returns {boolean}
     */
    public isFormValid() :boolean {

        let uform = this.registrationform;
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
        return !this.isSaving && this.registrationform.$dirty && this.isFormValid();
    }

}
