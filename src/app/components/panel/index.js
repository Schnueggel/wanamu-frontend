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
                    'footer@panel': {
                        template: require('./footer.html')
                    },
                    'header@panel': {
                        template: require('./header.html')
                    }
                }
            });
}])
    .controller('PanelCtrl', [function () {

}]);
