/// <reference path="../../libs/angular/angular.d.ts" />
'use strict';
/**
 * This Module create a Service named auth and a directive named tdIsAuth
 * @param {Object} ngModule
 */
/**
 * AuthService
 */
export class AuthService {

    private currentuser : any;
    //Dependencies
    static $inject = ['$q', '$http', '$window', 'constants'];

    constructor(public $q:angular.IQService,
                public $http:angular.IHttpService,
                public $window:angular.IWindowService,
                public constants : any) {

        console.log('AuthService', 'logout');
        this.currentuser = null;

        /**
         * We try to load the user from localstorage
         */
        try{
            this.currentuser = JSON.parse($window.localStorage.getItem('user'));
            //Reload userdata in background
            if (this.currentuser) {
                this.reloadUser(this.currentuser);
            }
        } catch (err) {
            console.error(err);
            this.currentuser = null;
        }

        this.$window = $window;
    }

    /**
     * Reloads the user data from the server
     * @param user
     * @returns {IPromise<T>}
     */
    public reloadUser(user : any) {
        var that = this;
        var deferred = this.$q.defer();
        var promise = deferred.promise;

        this.$http.get(this.constants.apiurl +'/user/' + user.id, { withCredentials: true })
            .success(function (data: any, status: number) {
            var isObject = angular.isObject(data);

            if (!isObject || !angular.isArray(data.data) || data.data.length !== 1 || !angular.isNumber(data.data[0].id)) {
                deferred.reject({
                    name: 'unkown', message: 'Invalid data received from server'
                });
                return;
            } else {
                that.currentuser = data.data[0];
                that.$window.localStorage.setItem('user', JSON.stringify(that.currentuser));

                deferred.resolve(that.currentuser);
            }

        }).error(function (data, status) {
            if (status === 401 || status == 403) {
                deferred.reject({
                    name: 'AuthError', message: 'Not authicated. Please login'
                });
            } else if (status === 500) {
                deferred.reject({
                    name: 'ServerError', message: 'The anwser from the server was invalid. Please try again'
                });
            } else if (data && data.error) {
                deferred.reject(data.error);
            } else {
                deferred.reject({
                    name: 'UnkownError',
                    message: 'Invalid data received from server or server did not respond'
                });
            }
        });
        return promise;
    }

    /**
     * Logs the current user in
     * @param username
     * @param password
     * @returns {IPromise<any>}
     */
    public login(username:String, password:String):angular.IPromise<any> {

        var that = this;
        var deferred = this.$q.defer();
        var promise = deferred.promise;

        this.$http.post(this.constants.loginurl, {
            username: username, password: password
        }).success(function (data:any, status:number) {

            var isObject = angular.isObject(data);

            if (!isObject || !angular.isArray(data.data) || data.data.length !== 1 || !angular.isNumber(data.data[0].id)) {
                deferred.reject({
                    name: 'unkown', message: 'Invalid data received from server'
                });
                return;
            } else {
                that.currentuser = data.data[0];
                that.$window.localStorage.setItem('user', JSON.stringify(that.currentuser));

                deferred.resolve(that.currentuser);
            }

        }).error(function (data, status) {
            if (status === 401 || status == 403) {
                deferred.reject({
                    name: 'AuthError', message: 'Login failed. Please check your login data'
                });
            } else if (status === 500) {
                deferred.reject({
                    name: 'ServerError', message: 'The anwser from the server was invalid. Please try again'
                });
            } else if (data && data.error) {
                deferred.reject(data.error);
            } else {
                deferred.reject({
                    name: 'UnkownError',
                    message: 'Invalid data received from server or server did not respond'
                });
            }
        });

        return promise;
    }

    /**
     * Logs the current user out
     * @returns {IPromise<T>}
     */
    public logout() : angular.IPromise<any> {
        var deferred = this.$q.defer();
        var promise = deferred.promise;
        this.currentuser = null;

        // ==========================================================================
        // Remove user from localstorage in any case
        // ==========================================================================
        this.$window.localStorage.removeItem('user');


        this.$http.post(this.constants.logouturl, {}).success(function (data:any, status:number) {
            // ==========================================================================
            // If the was no logged in user we are good anyway
            // ==========================================================================
            if (status === 403) {
                deferred.resolve();
                return;
            }

            // ==========================================================================
            // We are logged out
            // ==========================================================================
            if (angular.isObject(data) && data.success) {
                deferred.resolve();
                return;
            }

            deferred.reject({
                name: 'unkown', message: 'Logging out from server failed'
            });

        }).error(function (data) {
            if (data && data.error) {
                deferred.reject(data.error);
            } else {
                deferred.reject({
                    name: 'unkown', message: 'Logging out from server failed. Because of a Server error'
                });
            }
        });

        return promise;
    }

    /**
     * Get the current user or null
     * @returns {any|null}
     */
    public currentUser() : any {
        return this.currentuser;
    }

    /**
     * Checks if the user is loggind
     * @returns {boolean}
     */
    public isLoggedIn() : boolean {
        console.log(this.currentuser);
        if (this.currentuser) {
            return true;
        }
        return false;
    }
}
