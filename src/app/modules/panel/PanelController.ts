import { Controller, InjectC } from '../../decorators/decorators'
import { BaseController } from '../../wanamu/wanamu';
import { PanelService } from './PanelService';
/**
 * Controls the Panel
 * @alias Panel
 */
@Controller('PanelController')
@InjectC('panelService')
export class PanelController  extends  BaseController {

    constructor(public panelService : PanelService) {
        super();
    }

    public rejectRepeatPicker() {
        this.panelService.rejectRepeatPicker();
    }

    public resolveRepeatPicker() {
        this.panelService.resolveRepeatPicker();
    }

    public rejectDateTimePicker() {
        this.panelService.rejectDateTimePicker();
    }
    public resolveDateTimePicker() {
        this.panelService.resolveDateTimePicker();
    }

    public isLoginOpen() {
        return this.panelService.isLoginOpen;
    }

    /**
     * Checks iof the datetimepicker should be open
     * @returns {boolean}
     */
    public isDateTimePickerOpen() {
        return this.panelService.isDateTimePickerOpen;
    }
    /**
     * Checks if the repeat picker should be visible
     * @returns {boolean}
     */
    public isRepeatPickerOpen() {
        return this.panelService.isRepeatPickerOpen;
    }
    /**
     * Check if any component os open
     * @returns {boolean}
     */
    public isComponentOpen() :boolean {
        return this.panelService.isComponentOpen;
    }
}
