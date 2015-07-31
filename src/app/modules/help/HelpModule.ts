import { HelpController } from './HelpController';
import { Module, Config } from '../../decorators/decorators';
import { BaseModule } from '../../wanamu/BaseModule';

@Module('help', <wu.decorators.IModuleOptions>{
    controller: [HelpController],
    modules: ['help']
})
export class HelpModule extends BaseModule {
    public static mname: string = 'help';

    @Config('$stateProvider')
    config ($stateProvider: ng.ui.IStateProvider) {
        // States/Routes
        $stateProvider
            .state('panel.view.help', {
                url: '/help',
                role: 'public',
                views: {
                    '@panel': {
                        controller: 'HelpController as Help',
                        template: require('./help.html')
                    }
                },
                data : {
                    pagename : 'Help'
                }
            });
    }
}
