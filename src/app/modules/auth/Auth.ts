///<reference path="./auth.d.ts" />
'use strict';

import {AuthService} from './services/AuthService';
import IsAuthDirective = require('./isauth/IsAuthDirective');
/**
 * Module name
 * @type {string}
 */
export var name = 'auth';

export function config($stateProvider : ngui.IStateProvider) {
    // States/Routes
    $stateProvider
        .state('panel.view.login', {
            url: '/login',
            role: 'public',
            views: {
                '@panel': {
                    controller: 'LoginCtrl as Login',
                    template: require('./login.html')
                }
            }
        }).state('panel.view.logout', {
            url: '/logout',
            role: 'public',
            views: {
                '@panel': {
                    controller: 'LogoutCtrl as Logout'
                }
            },
            cache: false
        });
}
config.$inject = ['$stateProvider'];

/**
 * Controller for Login
 */
export class LoginController {
    //angular inject
    static $inject = ['$scope', '$state', 'auth'];

    public loginform : wanamu.LoginForm;

    public loading : boolean = false;
    public pattern : RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;

    public form : any = {
        error: {}
    };

    /**
     *
     * @param $scope
     * @param $state
     * @param auth
     */
    constructor(
        public $scope : angular.IScope,
        public $state : ngui.IStateService,
        public auth : AuthService
    ) {

        if (auth.isLoggedIn()) {
            $state.go('panel.view.todos');
            return;
        }
    }

    public login () {
        var that = this;
        if (this.loading === true) {
            return;
        }
        //Reset errors
        this.form.$error = {};
        this.loginform.username.$untouched = true;
        this.loginform.password.$untouched = true;

        if (this.loginform.$valid) {
            //Set state loading
            this.loading = true;

            this.auth.login(this.form.username, this.form.password)
                .then(function () {
                    that.$state.go('panel.view.todos');
                }).catch(function (err : any) {
                    that.form.error.error = true;
                    that.form.error.message = err.message;
                }).finally(function () {
                    that.loading = false;
                });
        }
    }
}

export class LogoutController {
    constructor (
        public $state : ngui.IStateService,
        public auth : AuthService
    ){
        auth
            .logout()
            .then(function () {})
            .catch(function (err : any) {
                console.log(err);
            }).finally(function () {
                $state.go('panel.view.login');
            });
    }
}
export var authModule = angular.module('auth', [
    'panel'
]);


authModule
    .config(config)
    .controller('LoginCtrl', LoginController)
    .directive('wuIsAuth', IsAuthDirective)
    .service('auth', AuthService)
    .controller('LogoutCtrl', LogoutController);

