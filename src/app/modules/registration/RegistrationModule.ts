import { RegistrationService } from './RegistrationService';
import { RegistrationController } from './RegistrationController';
import { Module, Config } from '../../decorators/decorators';
import { BaseModule } from '../../wanamu/BaseModule';

@Module('registration', {
    controller: [RegistrationController],
    services: [RegistrationService],
    modules: ['panel'],
    directives: []
})
export class RegistrationModule extends BaseModule {
    public static mname: string = 'registration';

    @Config('$stateProvider')
    config ($stateProvider: ng.ui.IStateProvider) {
        // States/Routes
        $stateProvider
            .state('panel.view.registration', {
                url: '/registration',
                role: 'public',
                views: {
                    '@panel': {
                        controller: 'RegistrationController as Registration',
                        template: require('./registration.html')
                    }
                }
            });
    }
}
