import { BaseController } from '../../wanamu/wanamu';
import { InjectC, Controller } from '../../decorators/decorators';
import { UnauthorizedError } from '../../errors/errors';
import { Salutations, User, Profile } from '../../models/models';
var Rx = require('rx');
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
    private saveObservable : Rx.Observable<any>;

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
        this.panelService.hideAll();
    }

    /**
     * saves the user registration
     * @viewhelper
     */
    public save() {

        if (this.isSaving) {
            return;
        }

        this.getSaveObservable().subscribe(
            () => {},
            this.onSaveError.bind(this),
            this.onSaveSuccess.bind(this)
        )
    }

    /**
     * Does this make sense
     * @returns {Rx.Observable<any>}
     */
    private getSaveObservable() : Rx.Observable<any> {

        if (_.isUndefined(this.saveObservable)) {

            this.saveObservable = Rx.Observable.start( () => {
                this.isSaving = true;
                if (!this.registrationform.$dirty || !this.isFormValid()) {
                    return Rx.Observable.throw(new Error('Please check your input'));
                }
            }).flatMapLatest( () => {
                return Rx.Observable.fromPromise(this.userDatasource.create(this.user));
            }).map( () => {
                this.isSaving = false;
                this.$state.go('panel.view.login');
            });
        }
        return this.saveObservable;
    }
    /**
     * Checks if the form is valid
     * @returns {boolean}
     */
    public isFormValid() : boolean {

        let uform = this.registrationform;
        if ( uform.password.$dirty && uform.password.$viewValue !== uform.passwordrepeat.$viewValue ) {
            uform.passwordrepeat.$error['equal'] = true;
        } else {
            delete uform.passwordrepeat.$error['equal'];
        }
        uform.passwordrepeat.$validate();
        return uform.$valid;
    }


    /**
     * @viewhelper
     * @returns {boolean}
     */
    public isReadyForSave() : boolean {
        return !this.isSaving && this.registrationform.$dirty && this.isFormValid();
    }

    private onSaveSuccess(){console.log('completed');
        this.panelService.showSimpleToast('Registration successful');
    }
    /**
     *
     * @param err
     */
    private onSaveError(err : wu.errors.BaseError){ console.log('save error');
        if (err instanceof UnauthorizedError){
            this.panelService.showLogin(). then( () => this.save() );
        } else {
            this.panelService.showSimpleErrorToast(err.message);
        }
        this.isSaving = false;
    }
}
