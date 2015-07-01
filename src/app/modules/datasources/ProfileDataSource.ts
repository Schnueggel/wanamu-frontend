import _  = require('lodash');
import { Profile } from '../../models/Profile';
import { BaseDataSource } from './BaseDataSource';
import { Service, InjectC } from '../../decorators/decorators';
import { InvalidArgumentError } from '../../errors/errors';

@Service('profileDataSource')
@InjectC('$http', '$q')
export class ProfileDataSource extends BaseDataSource implements wu.datasource.IProfileDataSource {

    private  constants : wu.IConstants = require('../../../../package.json').wanamu;

    public constructor(
        public $http : ng.IHttpService,
        public $q : ng.IQService
    ){
        super();
    }

    /**
     *
     * @param profile
     * @returns {IPromise<T>}
     */
    public sync(profile : wu.model.IProfile) {
        let deferred = this.$q.defer();
        let promise = deferred.promise;

        if (!(profile instanceof Profile)) {
            deferred.reject(new InvalidArgumentError('Application error profile could not be found'));
            console.error('profile param must be of type wu.model.IUser');
            return promise;
        }

        this.$http.put(this.constants.apiurl + '/profile/' + profile.id, {
            data:profile.toJSON()
        }).success( (data: wu.datasource.IResponseDataModel<wu.datasource.IProfileData>, status: number) => {
            if (!ProfileDataSource.isValidResponseData(data)) {
                deferred.reject({
                    name: 'Unkown', message: 'Invalid data received from server'
                });
            } else {
                profile.fromJSON(data.data[0]);
                deferred.resolve(profile);
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
        return _.isObject(data) &&
            _.isArray(data.data) &&
            data.data.length === 1 &&
            _.isNumber(data.data[0].id) &&
            data.data[0].id > 0;
    }
}
