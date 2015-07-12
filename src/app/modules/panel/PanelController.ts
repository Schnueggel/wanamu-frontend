import { Controller, InjectC } from '../../decorators/decorators'
import { BaseController } from '../../wanamu/wanamu';
import { PanelService } from './PanelService';

/**
 * Controls the Panel
 * @alias Panel
 */
@Controller('PanelController')
@InjectC('$templateCache', 'panelService', 'wuCacheService', '$state')
export class PanelController  extends  BaseController {


    public sidenavOpen : boolean = false;

    constructor(public $templateCache : ng.ITemplateCacheService, public panelService : PanelService, public cacheService : wu.ICacheService, public $state : ng.ui.IStateService) {
        super();
        $templateCache.put('sidebar/sidebar.html', require('./sidebar/sidebar.html'));
        this.sidenavOpen = cacheService.sidenavOpen;

    }

    public rejectRepeatPicker() {
        this.panelService.rejectRepeatPicker();
    }

    public resolveRepeatPicker() {
        this.panelService.resolveRepeatPicker();
    }

    public rejectColorPicker() {
        this.panelService.rejectColorPicker();
    }

    public resolveColorPicker() {
        this.panelService.resolveColorPicker();
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

    public collapseSidenav() {
        this.cacheService.sidenavOpen = this.sidenavOpen;
    }
}
