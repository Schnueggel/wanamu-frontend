/// <reference path="../../libs/angular/angular.d.ts" />

/**
 * This Module create a Service named auth and a directive named tdIsAuth
 * @param {Object} ngModule
 */

    'use strict';

    export class HttpInterceptor {
        //Dependencies
        static $inject = ['$q', '$injector'];

        constructor(
            public $q : angular.IQService,
            public $injector : angular.auto.IInjectorService
        ) {}

        // optional method
         request (config: angular.IRequestConfig) {
            // do something on success
            return config;
         }

        // optional method
        requestError (rejection : any) {
            return this.$q.reject(rejection);
        }


        // optional method
        response (response : any) {
            // do something on success
            return response;
        }

        // optional method
        responseError (rejection: any) {
            if (rejection.status === 401 || rejection.status === 403 ) {
                var $state = this.$injector.get('$state');
                if ($state.current.name !== 'panel.view.login'){
                    $state.go('panel.view.login');
                }
            }
            return this.$q.reject(rejection);
        }
    }
