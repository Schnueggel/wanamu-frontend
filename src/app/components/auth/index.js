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
        Login.loading = false;

        Login.pattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;

        Login.form = {
            error: {}
        };

        Login.login = function(){

            if (Login.loading === true) {
                return;
            }
            //Reset errors
            Login.form.$error = {};
            $scope.loginform.username.$untouched = true;
            $scope.loginform.password.$untouched = true;

            if ($scope.loginform.$valid){
                //Set state loading
                Login.loading = true;

                auth.login(Login.form.username, Login.form.password)
                    .then(function(user){
                        $state.go('panel.view.todos');
                }).catch(function(err){
                        Login.form.error.error = true;
                        Login.form.error.message = err.message;
                }).finally(function(){
                        Login.loading = false;
                });
            } else {

            }
        }
    }]);
