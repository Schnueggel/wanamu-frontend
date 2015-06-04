/**
 * Created by Christian on 4/30/2015.
 */
'use strict';

module.exports = angular.module('home', [
    'panel'
]).config(['$stateProvider', function ($stateProvider) {
        // States/Routes
        $stateProvider
            .state('panel.view.login', {
                url: '/imprint',
                role: 'public',
                views: {
                    '@panel': {
                        template: require('./imprint.html')
                    },
                    'header@panel': {
                        template: ''
                    }
                }
            });
    }]);
