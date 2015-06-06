/// <reference path="../../libs/angular/angular.d.ts" />
'use strict';
/**
 * This Module create a Service named auth and a directive named tdIsAuth
 * @param {Object} ngModule
 */

import UserDataSource = require('../../datasources/UserDataSource');
import User = require ('../../models/User');
import _ = require('lodash');

/**
 * AuthService
 */
export class AuthService {

    private currentuser : any;
    //Dependencies
    static $inject = ['$q', '$http', '$window', 'constants', 'userDataSource'];

    constructor(public $q:angular.IQService,
                public $http:angular.IHttpService,
                public $window:angular.IWindowService,
                public constants : any,
                public userDataSource : UserDataSource.UserDataSource
    ) {

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

        return this.userDataSource
        .getUser(user.id)
            .then(function(user : User.User){
            that.currentuser = user;
        }).catch(function(err){
            that.currentuser = null;
        });
    }

    /**
     * Logs the current user in
     * @param username
     * @param password
     * @returns {IPromise<any>}
     */
    public login(username:String, password:String) : angular.IPromise<any> {
        var that = this;
        return this.userDataSource.login(username, password)
            .then(function(user : User.User){
                that.currentuser = user;
                that.$window.localStorage.setItem('user', JSON.stringify(that.currentuser));
        }).catch(function(err){
                console.log(err);
                that.currentuser = null;
        });
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
        if (this.currentuser) {
            return true;
        }
        return false;
    }
}
