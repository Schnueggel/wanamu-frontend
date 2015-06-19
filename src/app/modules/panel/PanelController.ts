import { Controller, InjectC } from '../../decorators/decorators'
import { BaseController } from '../../wanamu/wanamu';
import { PanelService } from './PanelService';
/**
 * Controls the Panel
 */
@Controller('PanelController')
@InjectC('panelService')
export class PanelController  extends  BaseController {

    constructor(public panelService : PanelService) {
        super();

    }
}
