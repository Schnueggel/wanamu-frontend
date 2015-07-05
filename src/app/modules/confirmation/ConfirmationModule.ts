import { ConfirmationController } from './ConfirmationController';
import { Module, Config } from '../../decorators/decorators';
import { BaseModule } from '../../wanamu/BaseModule';

@Module('confirmation', {
    controller: [ConfirmationController],
    modules: ['panel'],
    directives: []
})
export class ConfirmationModule extends BaseModule {
    public static mname: string = 'confirmation';

    @Config('$stateProvider')
    config ($stateProvider: ng.ui.IStateProvider) {
        // States/Routes
        $stateProvider
            .state('panel.view.confirmation', {
                url: '/confirmation/:hash',
                role: 'public',
                views: {
                    '@panel': {
                        controller: 'ConfirmationController as Confirmation',
                        template: require('./confirmation.html')
                    }
                }
            });
    }
}
