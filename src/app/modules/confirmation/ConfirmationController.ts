import { BaseController } from '../../wanamu/wanamu';
import { InjectC, Controller } from '../../decorators/decorators';
import { NotFoundError } from '../../errors/errors';
var Rx = require('rx');
import _ = require('lodash');

/**
 * @alias Confirmation
 */
@Controller('ConfirmationController')
@InjectC('$state', '$q', 'registrationDataSource', 'panelService')
export class ConfirmationController extends BaseController {

    public confirmed : boolean = false;

    /**
     *
     * @param $state
     * @param $q
     * @param registrationDataSource
     * @param panelService
     */
    constructor(
        public $state: ng.ui.IStateService,
        public $q : ng.IQService,
        public registrationDataSource : wu.datasource.IRegistrationDataSource,
        public panelService : wu.module.panel.IPanelService
    ){
        super();
        this.confirm($state.params['hash']);
    }

    /**
     * Confirm the account
     * @param hash
     */
    confirm (hash : string) {
        const observable = Rx.Observable.defer( () => this.registrationDataSource.confirmRegistration(hash) );

        observable.subscribe(
            () => {},
            this.onConfirmError.bind(this),
            this.onConfirmSuccess.bind(this)
        );
    }

    /**
     * @see confirm
     */
    onConfirmSuccess () {
        this.confirmed = true;
        this.$state.go('panel.view.login');
        this.panelService.showSimpleToast('Confirmation successful please login');
    }

    /**
     * @see confirm
     * @param err
     */
    onConfirmError(err : Error) {
        if (err instanceof NotFoundError) {
            this.panelService.showSimpleErrorToast('The requested resource could not be found');
        } else {
            this.panelService.showSimpleErrorToast(err.message);
        }
        this.confirmed = true;
    }
}

