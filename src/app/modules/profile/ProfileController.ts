import { BaseController } from '../../wanamu/wanamu';
import { InjectC, Controller } from '../../decorators/decorators';
import _ = require('lodash');

/**
 * @alias Profile
 */
@Controller('ProfileController')
@InjectC('$state', 'wuAuthService')
export class ProfileController extends BaseController {

    public salutations : Array<string> = ['mr', 'mrs', 'human', 'neutrum'];
    public userform : wu.profile.IUserForm;
    public user : wu.model.IUser;
    public password : string = '';
    public passwordrepeat : string = '';
    /**
     *
     * @param $state
     * @param auth
     */
    constructor(
        public $state: ng.ui.IStateService,
        public auth : wu.auth.IAuthService
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
        console.log(this.user);
    };

    /**
     * saves the user profile
     */
    public save() {
        //Todo save
    }

    /**
     * Checks if the form is valid
     * @returns {boolean}
     */
    public isUserFormValid() {
        let uform = this.userform;
        if ( uform.password.$dirty && uform.password.$viewValue !== uform.passwordrepeat.$viewValue ) {
            uform.passwordrepeat.$error['equal'] = true;
        } else {
            uform.passwordrepeat.$error['equal'] = false;
        }

        return uform.$valid;
    }

    /**
     * Checks if the profile can be saved
     * @returns {boolean}
     */
    public isReadyToSave() {
        return this.userform.$dirty && this.isUserFormValid();
    }
}
