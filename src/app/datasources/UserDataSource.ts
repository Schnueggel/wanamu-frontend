/**
 * Created by Christian on 06.06.2015.
 */
'use strict';

/**
 * This class is a angular service to use it add it as service
 */
import _  = require('lodash');
import User = require('../models/User');
import Errors = require('../errors/Errors');
import TodoListDataSource = require('./TodoListDataSource');

export class UserDataSource {
    static $inject  = ['$http', '$q', 'constants'];

    public constructor(
        public $http : angular.IHttpService,
        public $q : angular.IQService,
        public constants : any
    ){}

    /**
     *
     * @param id
     * @returns {IPromise<User>}
     */
    public getUser(id : number) : angular.IPromise<User.User> {
        var deferred = this.$q.defer();
        var promise = deferred.promise;

        this.$http.get(this.constants.apiurl +'/user/' + id, { withCredentials: true })
            .success(function (data: any, status: number) {

                if (!UserDataSource.isValidUserData(data)) {
                    deferred.reject(new Errors.InvalidResponseDataError());
                    return;
                } else {
                    var user = UserDataSource.mapData(data.data[0]);
                    deferred.resolve(user);
                }

            }).error(function (data, status) {
                if (status === 401 || status == 403) {
                    deferred.reject(new Errors.AuthError('You need to to login'));
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
     *
     * @param username
     * @param password
     * @returns {IPromise<User>}
     */
    public login(username : string, password : string) : angular.IPromise<User.User> {
        var that = this;
        var deferred = this.$q.defer();
        var promise = deferred.promise;
        this.$http.post(this.constants.loginurl, {
            username: username, password: password
        }).success(function (data:any, status:number) {

            if (!UserDataSource.isValidUserData(data)) {
                deferred.reject({
                    name: 'Unkown', message: 'Invalid data received from server'
                });
                return;
            } else {
                var user = UserDataSource.mapData(data.data[0]);
                deferred.resolve(user);
            }
        }).error(function (data, status) {
            if (status === 401 || status == 403) {
                deferred.reject( new Errors.AuthError( 'Login failed. Please check your login data'));
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
     *
     * @param values
     * @returns {User}
     */
    public static mapData(values : any) : User.User {
        var user = new User.User();

        user.id = values.id;
        user.firstname = values.firstname;
        user.lastname = values.lastname;
        user.email = values.email;
        user.setTodoLists();
        return user;
    }

    /**
     * Checks if the result from server is a valid user
     * @param user
     * @returns {boolean}
     */
    public static isValidUserData(data : any) : boolean {
        return _.isObject(data) &&
            _.isArray(data.data) &&
            data.data.length === 1 &&
            _.isNumber(data.data[0].id) &&
            data.data[0].id > 0;
    }
}
