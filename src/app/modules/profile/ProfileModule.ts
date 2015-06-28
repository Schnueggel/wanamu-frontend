import { ProfileService } from './ProfileService';
import { ProfileController } from './ProfileController';
import { Module, Config } from '../../decorators/decorators';
import { BaseModule } from '../../wanamu/BaseModule';

@Module('profile', {
    controller: [ProfileController],
    services: [ProfileService],
    modules: ['panel'],
    directives: []
})
export class ProfileModule extends BaseModule {
    public static mname: string = 'profile';

    @Config('$stateProvider')
    config ($stateProvider: ng.ui.IStateProvider) {
        // States/Routes
        $stateProvider
            .state('panel.view.profile', {
                url: '/profile',
                role: 'public',
                views: {
                    '@panel': {
                        controller: 'ProfileController as Profile',
                        template: require('./profile.html')
                    }
                }
            });
    }
}
