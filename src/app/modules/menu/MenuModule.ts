import { MenuController } from './MenuController';
import { BaseModule } from '../../wanamu/wanamu';
import { Config, Module } from '../../decorators/decorators';

@Module('menu', {
    modules : ['panel'],
    controller : [MenuController],
    services: [], directives: []
})
export class MenuModule extends BaseModule {

    public static mname : string = 'menu';

    @Config('$stateProvider')
    config($stateProvider : angular.ui.IStateProvider) {
        $stateProvider.state('panel.view.menu', {
            url: '/menu', role: 'public', views: {
                '@panel': {
                    controller: 'MenuController as Menu',
                    template: require('../menu/content.html')
                }
            }
        })
    }
}

