import { PanelModule } from '../panel/PanelModule';
import { AuthModule } from '../auth/AuthModule';
import { MenuModule } from '../menu/MenuModule';
import { DataSourceModule } from '../datasources/DataSourceModule';
import { TodosModule } from '../todos/TodosModule';
import { DateTimePickerModule } from '../datetimepicker/datetimepicker';
import { DialogsModule } from '../dialogs/dialogs';
import { HttpInterceptor } from  './services/HttpInterceptor';
import { BaseModule } from '../../wanamu/wanamu';
import { Module, Config } from '../../decorators/decorators';

@Module('wanamu',
    {
        modules : ['ui.router', 'ngAnimate', 'ngTouch', 'ngMessages','config', 'ngMaterial', 'pascalprecht.translate',
            DataSourceModule.mname,
            PanelModule.mname,
            AuthModule.mname,
            TodosModule.mname,
            MenuModule.mname,
            DialogsModule.name],
        services : [HttpInterceptor],
        controller : [],
        directives: []
    }
)
export class WanamuModule extends BaseModule {
    /**
     * @type {string}
     */
    public static mname  : string = 'wanamu';

    @Config('$urlRouterProvider', '$translateProvider', '$logProvider', '$mdThemingProvider', '$httpProvider')
    config ($urlRouterProvider : any,
            $translateProvider : any,
            $logProvider : angular.ILogProvider,
            $mdThemingProvider :any,
            $httpProvider : angular.IHttpProvider) : any {

        //We need credentials on xhr requests
        $httpProvider.defaults.withCredentials = true;

        $httpProvider.interceptors.push('httpInterceptor');

        /*
         * $log provider enable disable on dev environment
         */
        $logProvider.debugEnabled(true);

        // Fallback on unknown state/route
        $urlRouterProvider.otherwise('/login');

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
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
