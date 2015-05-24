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
                role: 'public',
                views: {
                    '@panel': {
                        controller: 'LoginCtrl as Login',
                        template: require('./login.html')
                    },
                    'header@panel': {
                        template: ''
                    }
                }
            });
    }])
    .controller('LoginCtrl', ['$scope', 'auth',  function ($scope, auth) {
        var Login = this;

        Login.pattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;

        Login.form = {
            submitted: false
        };

        Login.login = function(){
            if ($scope.loginform.$valid){
                auth.login(Login.form.username, Login.form.password);
            }
        }
    }]);
