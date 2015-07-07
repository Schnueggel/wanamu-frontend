import { BaseController } from '../../../wanamu/wanamu';
import { Controller, InjectC } from '../../../decorators/decorators';

@Controller('SidebarController')
@InjectC('$state')
export class SidebarController extends BaseController {

    constructor(public $state : ng.ui.IStateService) {
        super();

    }

    /**
     * @viewhelper
     * @param route
     */
    goTo(route : string) {
        this.$state.go(route);
    }
}
