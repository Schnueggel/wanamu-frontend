import { AuthModule } from '../auth/Auth';
import { PanelModule } from '../panel/PanelModule';
import { MenuModule } from '../menu/Menu';
import { DataSourceModule } from '../datasources/DataSourceModule';
import Todos = require ('../todos/Todos');
import { DateTimePickerModule } from '../datetimepicker/datetimepicker';
import { DialogsModule } from '../dialogs/dialogs';
import HttpInterceptor = require('./services/HttpInterceptor');

export class WanamuModule {
    public name  : string;
    public ngModule : angular.IModule;

    constructor() {
        this.ngModule = angular.module(this.name, []);
    }
}

module wanamu {
    export var wanamuModule = angular.module('wanamu', [
        'ui.router',
        'ngAnimate',
        'ngTouch',
        'ngMessages',
        'config',
        'ngMaterial',
        new DataSourceModule().name,
        new PanelModule().name,
        AuthModule.name,
        Todos.name,
        new MenuModule().name,
        DateTimePickerModule.name,
        DialogsModule.name,
        'pascalprecht.translate'
    ]);

    /**
     * Application config
     * @param $urlRouterProvider
     * @param $translateProvider
     * @param $logProvider
     * @param $mdThemingProvider
     * @param $httpProvider
     */
    export function config ($urlRouterProvider : any,
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

        configMaterialStyle($mdThemingProvider);

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
    config.$inject = ['$urlRouterProvider', '$translateProvider', '$logProvider', '$mdThemingProvider', '$httpProvider'];

    /**
     * Configure the material style
     * @param $mdThemingProvider
     */
    export function configMaterialStyle($mdThemingProvider: any){
        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('grey')
            .warnPalette('red');

        //var wanamuMap = $mdThemingProvider.extendPalette('blue', {
        //    '500': 'rgb(80, 94, 110);'
        //});
        //var wanamuAccentMap = $mdThemingProvider.extendPalette('blue', {
        //    '500':'rgb(116, 127, 144)',
        //
        //});
        //
        ////$http.defaults.headers.common.WithCredentials = 'true';
        //
        //// Register the new color palette map with the name <code>neonRed</code>
        //$mdThemingProvider.definePalette('wanamu', wanamuMap);
        //$mdThemingProvider.definePalette('wanamuAccent', wanamuAccentMap);
        //
        //// Use that theme for the primary intentions
        //$mdThemingProvider.theme('default')
        //    .primaryPalette('wanamu', {
        //        'default': '500'
        //    })
        //    .accentPalette('wanamuAccent', {
        //        'default': '500'
        //    });
    }

    wanamuModule
        .config(config)
        .run([ function () {}]);

    wanamuModule.service('httpInterceptor', HttpInterceptor);
}
