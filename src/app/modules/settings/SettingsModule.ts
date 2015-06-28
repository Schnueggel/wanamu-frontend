import { SettingsService } from './SettingsService';
import { SettingsController } from './SettingsController';
import { Module, Config } from '../../decorators/decorators';
import { BaseModule } from '../../wanamu/BaseModule';

@Module('settings', {
    controller: [SettingsController],
    services: [SettingsService],
    modules: ['panel'],
    directives: []
})
export class SettingsModule extends BaseModule {
    public static mname: string = 'settings';

    @Config('$stateProvider')
    config ($stateProvider: ng.ui.IStateProvider) {
        // States/Routes
        $stateProvider
            .state('panel.view.settings', {
                url: '/settings',
                role: 'public',
                views: {
                    '@panel': {
                        controller: 'SettingsController as Settings',
                        template: require('./settings.html')
                    }
                }
            });
    }
}
