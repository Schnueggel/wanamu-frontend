/// <reference path="../../libs/angular/angular.d.ts" />
'use strict';
import Auth = require('../auth/Auth');
import Menu = require('../menu/Menu');
import Panel = require('../panel/Panel');
import Todos = require ('../todos/Todos');
import HttpInterceptor = require('./services/HttpInterceptor');
import UserDataSource = require('../../datasources/UserDataSource');

module wanamu {

    export var wanamuModule = angular.module('wanamu', [
        'ui.router',
        'ngAnimate',
        'ngTouch',
        'ngMessages',
        'config',
        'ngMaterial',
        Panel.name,
        Auth.name,
        Todos.name,
        Menu.name,
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
            .primaryPalette('blue');

        var wanamuMap = $mdThemingProvider.extendPalette('blue', {
            '500': 'rgb(80, 94, 110);'
        });
        var wanamuAccentMap = $mdThemingProvider.extendPalette('blue', {
            '500':'rgb(116, 127, 144)',

        });

        //$http.defaults.headers.common.WithCredentials = 'true';

        // Register the new color palette map with the name <code>neonRed</code>
        $mdThemingProvider.definePalette('wanamu', wanamuMap);
        $mdThemingProvider.definePalette('wanamuAccent', wanamuAccentMap);

        // Use that theme for the primary intentions
        $mdThemingProvider.theme('default')
            .primaryPalette('wanamu', {
                'default': '500'
            })
            .accentPalette('wanamuAccent', {
                'default': '500'
            });
    }

    wanamuModule
        .config(config)
        .run([ function () {}]);

    wanamuModule.service('httpInterceptor', HttpInterceptor);
    wanamuModule.service('userDataSource', UserDataSource.UserDataSource);
}
