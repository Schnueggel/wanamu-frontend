import { AuthService } from '../auth/AuthService';
import { BaseController } from '../../wanamu/wanamu';
import { InjectC, Controller } from '../../decorators/decorators';
import _ = require('lodash');

/**
 * @alias Settings
 */
@Controller('SettingsController')
@InjectC('$state', 'wuAuthService')
export class SettingsController extends BaseController {

    /**
     *
     * @param $state
     * @param auth
     */
    constructor(
        public $state: ng.ui.IStateService,
        public auth : AuthService
    ){
        super();

    }
}
