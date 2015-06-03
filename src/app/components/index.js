'use strict';

/*global window*/
var ngModule = angular.module('todoit', [
    'ui.router',
    'ngAnimate',
    'ngTouch',
    'ngMessages',
    'config',
    'ngMaterial',
    require('./panel').name,
    require('./auth').name,
    require('./todos').name,
    require('./menu').name,
    'pascalprecht.translate'
]);

ngModule.config([
    '$provide',
    '$stateProvider',
    '$urlRouterProvider',
    '$translateProvider',
    '$httpProvider',
    '$logProvider',
    '$mdThemingProvider',
    function ($provide, $stateProvider, $urlRouterProvider, $translateProvider, $httpProvider, $logProvider, $mdThemingProvider) {
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
            .accentPalette('light-blue');

        /*
         * translate settings
         */
        $translateProvider.useStaticFilesLoader({
            prefix: 'l10n/locale-',
            suffix: '.json'
        });

        $translateProvider.determinePreferredLanguage(function () {
            var preferredLangKey = 'en';
            // array result
            if (angular.isArray(window.navigator.languages)) {
                preferredLangKey = window.navigator.languages[0].replace(/[^a-z]+/g, '');
            }

            // string result
            if (angular.isString(window.navigator.languages)) {
                preferredLangKey = window.navigator.languages.replace(/[^a-z]+/g, '');
            }

            return preferredLangKey;
        });

        $translateProvider.fallbackLanguage('en');
    }
])
.run(['$rootScope',  '$state',
    function ($rootScope, $state) {

    }]);


module.exports = ngModule;
