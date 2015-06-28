/**
 * This class is a angular service to use it add it as service
 */
import _  = require('lodash');
import { User } from '../../models/User';
import { InvalidResponseDataError, AuthError, ServerError, TimeoutError, UnkownError, AccessError, CustomError } from '../../errors/errors';
import { TodoListDataSource } from './TodoListDataSource';
import { SettingDataSource } from './SettingDataSource';
import { BaseDataSource } from './BaseDataSource';
import { Service, InjectC } from '../../decorators/decorators';

@Service('userDataSource')
@InjectC('$http', '$q')
export class UserDataSource extends BaseDataSource implements wu.datasource.IUserDataSource {

    private constants : wu.IConstants = require('../../../../package.json').wanamu;

    public constructor(
        public $http : ng.IHttpService,
        public $q : ng.IQService
    ){
        super();
    }

    /**
     *
     * @param id
     * @returns {IPromise<User>}
     */
    public getUser(id : number) : angular.IPromise<User> {
        var deferred = this.$q.defer();
        var promise = deferred.promise;

        this.$http.get(this.constants.apiurl +'/user/' + id, { withCredentials: true })
            .success(function (data: any, status: number) {

                if (!UserDataSource.isValidUserData(data)) {
                    deferred.reject(new InvalidResponseDataError());
                } else {
                    var user = new User(data.data[0]);
                    deferred.resolve(user);
                }
            }).error( (data : wu.datasource.IUserResponseData, status : number) => {
                deferred.reject(this.getDefaultResponseErrors(data, status));
            });
        return promise;
    }

    /**
     *
     * @param username
     * @param password
     * @returns {IPromise<User>}
     */
    public login(username : string, password : string) : ng.IPromise<User> {
        let deferred = this.$q.defer();
        let promise = deferred.promise;

        this.$http.post(this.constants.loginurl, {
            username: username, password: password
        }).success(function (data: any, status: number) {
            if (!UserDataSource.isValidUserData(data)) {
                deferred.reject({
                    name: 'Unkown', message: 'Invalid data received from server'
                });
            } else {
                let user = new User(data.data[0]);
                deferred.resolve(user);
            }
        }).error(function (data : wu.datasource.IUserResponseData, status: number) {
            deferred.reject(this.getDefaultResponseErrors(data, status));
        });

        return promise;
    }

    /**
     * Checks if the result from server is a valid user
     * @param data
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
