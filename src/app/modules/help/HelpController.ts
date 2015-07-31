import { BaseController } from '../../wanamu/wanamu';
import { InjectC, Controller } from '../../decorators/decorators';
import _ = require('lodash');

/**
 * @alias Help
 */
@Controller('HelpController')
@InjectC('$scope',  '$rootScope', 'panelService')
export class HelpController extends BaseController {

    /**
     *
     * @param $scope
     * @param $rootScope
     * @param panelService
     */
    constructor(public $scope: ng.IScope,
                public $rootScope: ng.IRootScopeService,
                public panelService: wu.module.panel.IPanelService
    ) {
        super();


    }
}
