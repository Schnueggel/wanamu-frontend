'use strict';

/*global window*/
var ngModule = angular.module('todoit', [
    'ui.router',
    'ngAnimate',
    'ngTouch',
    'ngMessages',
    'config',
    require('./panel').name,
    require('./home').name,
    'pascalprecht.translate'
]);

ngModule.config([
    '$provide',
    '$stateProvider',
    '$urlRouterProvider',
    '$translateProvider',
    '$httpProvider',
    '$logProvider',
    function ($provide, $stateProvider, $urlRouterProvider, $translateProvider, $httpProvider, $logProvider) {
        /*
         * $log provider enable disable on dev environment
         */
        $logProvider.debugEnabled(true);

        // Fallback on unknown state/route
        $urlRouterProvider.otherwise('/login');

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

        $rootScope.$state = $state;
    }]);

module.exports = ngModule;
