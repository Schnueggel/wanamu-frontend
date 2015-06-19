import { Controller } from '../../decorators/decorators'
import { BaseController } from '../../wanamu/wanamu';
/**
 * Controls the Panel
 */
@Controller('PanelController')
export class PanelController  extends  BaseController {

    constructor() {
        super();
    }
}
