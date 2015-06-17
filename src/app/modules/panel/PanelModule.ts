import { Module, InjectM, Controller, Service } from '../../decorators/decorators';
import { PanelController } from './Panel';
import { HeaderController } from './header/HeaderController';
import { PanelService } from './PanelService';

/**
 * Panel Module is the Basis for the Layout
 */
@Module('panel')
@Controller('PanelCtrl', PanelController)
@Controller('HeaderCtrl', HeaderController)
@Service ('PanelService', PanelService)
export class PanelModule {

    public name : string = 'panel';
    public ngModule : angular.IModule;

    constructor (...args : any[]) {
        this.ngModule = angular.module(this.name, args);
        this.ngModule.config(this.config);
    }

    @InjectM('$stateProvider')
    config($stateProvider : ngui.IStateProvider) {

        $stateProvider.state('panel', {
            abstract: true,
            controller: 'PanelCtrl as Panel',
            template: require('./panel.html'),
            role: 'public'
        }).state('panel.view', {
            views: {
                'header@panel': {
                    controller: 'HeaderCtrl as Header',
                    template: require('./header/header.html'),
                }
            }
        });
    }
}
