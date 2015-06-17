import {InjectM, Controller, Module} from '../../decorators/decorators';

export var name = 'menu';

export function config($stateProvider : ngui.IStateProvider) {
    $stateProvider.state('panel.view.menu', {
        url: '/menu', role: 'public', views: {
            '@panel': {
                controller: 'MenuCtrl as Menu',
                template: require('../menu/content.html')
            }
        }
    })
}
config.$inject = ['$stateProvider'];

export class MenuController {

}

@Module('menu', 'panel')
@Controller('MenuCtrl', MenuController)
export class MenuModule {
    public name : string = 'menu';
    public ngModule : angular.IModule;

    constructor (...modules : any []) {
        console.log(modules);
        this.ngModule = angular.module('menu', modules);
        this.ngModule.config(this.config);
    }

    @InjectM('$stateProvider')
    config($stateProvider : ngui.IStateProvider) {
        $stateProvider.state('panel.view.menu', {
            url: '/menu', role: 'public', views: {
                '@panel': {
                    controller: 'MenuCtrl as Menu',
                    template: require('../menu/content.html')
                }
            }
        })
    }
}

