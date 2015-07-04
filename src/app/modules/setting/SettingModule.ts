import { SettingService } from './SettingService';
import { SettingController } from './SettingController';
import { Module, Config } from '../../decorators/decorators';
import { BaseModule } from '../../wanamu/BaseModule';

@Module('setting', {
    controller: [SettingController],
    services: [SettingService],
    modules: ['panel'],
    directives: []
})
export class SettingModule extends BaseModule {
    public static mname: string = 'setting';

    @Config('$stateProvider')
    config ($stateProvider: ng.ui.IStateProvider) {
        // States/Routes
        $stateProvider
            .state('panel.view.setting', {
                url: '/settings',
                role: 'public',
                views: {
                    '@panel': {
                        controller: 'SettingController as Setting',
                        template: require('./setting.html')
                    }
                }
            });
    }
}
