import { PanelModule } from '../panel/PanelModule';
import { AuthModule } from '../auth/Auth';
import { MenuModule } from '../menu/MenuModule';
import { DataSourceModule } from '../datasources/DataSourceModule';
import Todos = require ('../todos/Todos');
import { DateTimePickerModule } from '../datetimepicker/datetimepicker';
import { DialogsModule } from '../dialogs/dialogs';
import { HttpInterceptor } from  './services/HttpInterceptor';
import { BaseModule } from '../../wanamu/wanamu';
import { Module, InjectM, ModuleOptions } from '../../decorators/decorators';

@Module('wanamu',
    <ModuleOptions>{
        modules : ['ui.router', 'ngAnimate', 'ngTouch', 'ngMessages','config', 'ngMaterial', 'pascalprecht.translate',
            DataSourceModule.mname,
            PanelModule.mname,
            AuthModule.name,
            Todos.name,
            MenuModule.mname,
            DateTimePickerModule.name,
            DialogsModule.name],
        services : [HttpInterceptor],
        controller : []
    }
)
export class WanamuModule extends BaseModule {

    public static mname  : string = 'wanamu';

    @InjectM('$urlRouterProvider', '$translateProvider', '$logProvider', '$mdThemingProvider', '$httpProvider')
    config ($urlRouterProvider : any,
            $translateProvider : any,
            $logProvider : angular.ILogProvider,
            $mdThemingProvider :any,
            $httpProvider : angular.IHttpProvider) : any {

        $httpProvider.defaults.withCredentials = true;
        $httpProvider.interceptors.push('httpInterceptor');

        /*
         * $log provider enable disable on dev environment
         */
        $logProvider.debugEnabled(true);

        // Fallback on unknown state/route
        $urlRouterProvider.otherwise('/login');

        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('grey')
            .warnPalette('red');


        /*
         * translate settings
         */
        $translateProvider.useStaticFilesLoader({
            prefix: 'l10n/locale-',
            suffix: '.json'
        });

        $translateProvider.determinePreferredLanguage(function () {

            var preferredLangKey = 'en';

            return preferredLangKey;
        });

        $translateProvider.fallbackLanguage('en');
    }
}
