import { Module, Config, } from '../../decorators/decorators';
import { PanelController } from './PanelController';
import { HeaderController } from './header/HeaderController';
import { SidebarController } from './sidebar/SidebarController';
import { PanelService } from './PanelService';
import { BaseModule } from '../../wanamu/BaseModule';
import { DateTimePickerModule } from '../datetimepicker/datetimepicker';
import { RepeatModule } from '../repeatpicker/RepeatModule';
/**
 * Panel Module is the Basis for the Layout
 */
@Module('panel', {
    controller: [PanelController, HeaderController, SidebarController],
    modules : [ DateTimePickerModule.name, RepeatModule.mname ],
    directives: [],
    services  : [PanelService]
})
export class PanelModule extends BaseModule {

    public static mname : string = 'panel';

    @Config('$stateProvider')
    config($stateProvider : angular.ui.IStateProvider) {

        $stateProvider.state('panel', {
            abstract: true,
            controller: 'PanelController as Panel',
            template: require('./panel.html'),
            role: 'public'
        }).state('panel.view', {
            views: {
                'header@panel': {
                    controller: 'HeaderController as Header',
                    template: require('./header/header.html'),
                }
            }
        });
    }
}
