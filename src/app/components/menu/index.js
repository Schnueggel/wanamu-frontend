'use strict';
/**
 * Created by Christian on 5/23/2015.
 */

/*global window, Modernizr, Event*/
module.exports = angular.module('menu', [
    require('../panel').name
])
    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('panel.view.menu', {
                url: '/menu',
                role: 'public',
                views: {
                    '@panel': {
                        controller: 'MenuCtrl as Menu',
                        template: require('./content.html')
                    }
                }
            })
}])
    .controller('MenuCtrl', [function () {
}]);
