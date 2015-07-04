import { BaseController } from '../../wanamu/wanamu';
import { Controller, InjectC } from '../../decorators/decorators';

@Controller('MenuController')
@InjectC('$state')
export class MenuController extends BaseController {

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
