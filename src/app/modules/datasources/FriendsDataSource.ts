import _  = require('lodash');
import { Friend } from '../../models/Friend';
import { BaseDataSource } from './BaseDataSource';
import { Service, InjectC } from '../../decorators/decorators';
import { InvalidArgumentError } from '../../errors/errors';

@Service('friendsDataSource')
@InjectC('$http', '$q')
export class FriendsDataSource extends BaseDataSource implements wu.datasource.IFriendDataSource {

    private  constants : wu.IConstants = require('../../../../package.json').wanamu;

    public friends : Array<wu.model.IFriend> = [];

    public constructor(
        public $http : ng.IHttpService,
        public $q : ng.IQService
    ){
        super();
    }

    /**
     *
     * @returns {IPromise<T>}
     */
    public getFriends(forcereload : boolean = false) : ng.IPromise<Array<wu.model.IFriend>>  {

        let deferred = this.$q.defer();
        let promise = deferred.promise;

        if (!forcereload && this.friends.length > 0) {
            deferred.resolve(this.friends);
            return promise;
        }

        this.$http.get(this.constants.apiurl + '/friend', {})
            .success( (data: wu.datasource.IResponseDataModel<wu.datasource.IFriendData>, status: number) => {
            if (!FriendsDataSource.isValidResponseData(data)) {
                deferred.reject({
                    name: 'Unkown', message: 'Invalid data received from server'
                });
            } else {
                this.friends.length = 0;
                data.data.forEach((friendata : wu.datasource.IFriendData) => {
                    this.friends.push(new Friend(friendata));
                });
                deferred.resolve(this.friends);
            }
        }).error( (data : wu.datasource.IUserResponseData, status: number) => {
            deferred.reject(this.getDefaultResponseErrors(data, status));
        });

        return promise;
    }

    /**
     * Checks if the result from server is a valid user
     * @param data
     * @returns {boolean}
     */
    public static isValidResponseData(data : any) : boolean {
        return _.isPlainObject(data) &&
            _.isArray(data.data);
    }
}
