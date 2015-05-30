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
}]). controller('HeaderCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {

        var Header = this;
        Header.menuopen = false;
        Header.laststate = 'panel.view.login';

        var off = $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
            if (to.name !== 'panel.view.menu') {
                Header.laststate = 'panel.view.menu';
                Header.menuopen = false;
            } else {
                Header.laststate = from.name;
                Header.menuopen = true;
            }
        });
        $scope.$on('$destroy', off);
    }]);
