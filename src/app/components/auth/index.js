/**
 * Created by Christian on 4/30/2015.
 */
'use strict';

module.exports = angular.module('auth', [
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
                    },
                    'footer@panel': {
                        template: require('../panel/footer.html')
                    }
                }
            });
    }])
    .controller('LoginCtrl', ['$scope', '$state', 'auth',  function ($scope, $state, auth) {
        if (auth.isLoggedIn()){
            $state.go('panel.view.todos');
            return;
        }
        var Login = this;

        Login.pattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;

        Login.form = {
            submitted: false
        };

        Login.login = function(){
            if ($scope.loginform.$valid){
                auth.login(Login.form.username, Login.form.password).then(function(user){
                    $state.go('panel.view.todos');
                }, function(err){
                    console.log(err);
                });
            }
        }
    }]);
