'use strict';
/**
 * Created by Christian on 5/23/2015.
 */

/*global window, Modernizr, Event*/
module.exports = angular.module('panel', [])
    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('panel', {
                abstract: true,
                controller: 'PanelCtrl as panel',
                template: require('./panel.html'),
                role: 'public'
            })
            .state('panel.view', {

                views: {
                    'header@panel': {
                        controller: 'HeaderCtrl as Header',
                        template: require('./header.html')
                    }
                }
            });
}])
    .controller('PanelCtrl', [function () {
        console.log('Panel');
}]). controller('HeaderCtrl', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {

        var Header = this;
        // ==========================================================================
        // If client come to the menu with a deeplink we mark the menu as open
        // ==========================================================================
        Header.menuopen = $state.current.name === 'panel.view.menu';
        // ==========================================================================
        // Incase the is no from state we set last state todos
        // ==========================================================================
        Header.laststate = 'panel.view.todos';

        // ==========================================================================
        // We listen to stateChange events to store the last state.
        // This should perhaps go into a service to make it  reusable
        // ==========================================================================
        var off = $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
            if (to.name !== 'panel.view.menu') {
                Header.laststate = 'panel.view.menu';
                Header.menuopen = false;
            } else {
                Header.laststate = from.name + '(' + JSON.stringify(fromParams) + ')';
                Header.menuopen = true;
            }
        });

        //Destroy the listener if this $scope dies to prevent multiple listener
        // Normally this should not happend
        $scope.$on('$destroy', off);
    }]);
