/**
 * Created by Christian on 4/30/2015.
 */
'use strict';

module.exports = angular.module('todos', [
    require('../panel').name
]).config(['$stateProvider', function ($stateProvider) {
        // States/Routes
        $stateProvider
            .state('panel.view.todos', {
                url: '/todos',
                role: 'public',
                views: {
                    '@panel': {
                        controller: 'TodoCtrl as Todo',
                        template: require('./content.html')
                    }
                }
            });
    }])
    .controller('TodoCtrl', ['$state','auth', function ($state, auth) {

        if (!auth.isLoggedIn()){
            $state.go('panel.view.login');
        }
    }]);
