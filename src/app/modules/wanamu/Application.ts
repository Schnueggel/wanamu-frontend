/// <reference path="../../libs/angular/angular.d.ts" />

import Auth = require('../auth/Auth');
import Menu = require('../menu/Menu');
import Panel = require('../panel/Panel');
import Todos = require ('../todos/Todos');
import AuthService = require('./AuthService');
import WuAuthDirective = require('./AuthDirective');

module wanamu {
    'use strict';

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


    wanamuModule.config([
        '$urlRouterProvider',
        '$translateProvider',
        '$logProvider',
        '$mdThemingProvider',
        function ($urlRouterProvider : any,
                  $translateProvider : any,
                  $logProvider : angular.ILogProvider,
                  $mdThemingProvider :any) {
            /*
             * $log provider enable disable on dev environment
             */
            $logProvider.debugEnabled(true);

            // Fallback on unknown state/route
            $urlRouterProvider.otherwise('/login');

            $mdThemingProvider.theme('default')
                .primaryPalette('blue');

            var wanamuMap = $mdThemingProvider.extendPalette('blue', {
                '500': '4990E2'
            });
            // Register the new color palette map with the name <code>neonRed</code>
            $mdThemingProvider.definePalette('wanamu', wanamuMap);
            // Use that theme for the primary intentions
            $mdThemingProvider.theme('default')
                .primaryPalette('wanamu')
                .accentPalette('blue');

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
    ])
    .run([ function () {
   }]);

    wanamuModule.service('auth', AuthService.AuthService);
    wanamuModule.directive('tdIsAuth', WuAuthDirective.wuIsAuthDirective);
}
