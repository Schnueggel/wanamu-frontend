/**
 * Created by Christian on 4/30/2015.
 */
'use strict';

module.exports = angular.module('home', [
    require('../panel').name
]).config(['$stateProvider', function ($stateProvider) {
        // States/Routes
        $stateProvider
            .state('panel.view.login', {
                url: '/login',
                controller: 'HomeCtrl as Home',
                role: 'public',
                views: {
                    '@panel': {
                        template: require('./home.html')
                    }
                }
            });
    }])
    .controller('HomeCtrl', ['$scope',  function ($scope) {
        var home = this;
        console.log('hund');
    }]);
