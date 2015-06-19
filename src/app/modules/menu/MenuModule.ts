import { MenuController } from './MenuController';
import { BaseModule } from '../../wanamu/wanamu';
import { InjectM, Module } from '../../decorators/decorators';

@Module('menu', {
    modules : ['panel'],
    controller : [MenuController],
    services: [], directives: []
})
export class MenuModule extends BaseModule{

    public static mname : string = 'menu';

    @InjectM('$stateProvider')
    config($stateProvider : ngui.IStateProvider) {
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

