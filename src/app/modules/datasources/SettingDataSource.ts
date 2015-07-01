import _  = require('lodash');
import { Setting } from '../../models/Setting';
import { BaseDataSource } from './BaseDataSource';
import { Service, InjectC } from '../../decorators/decorators';
import { InvalidArgumentError } from '../../errors/errors';

@Service('settingDataSource')
@InjectC('$http', '$q')
export class SettingDataSource extends BaseDataSource implements wu.datasource.ISettingDataSource {

    private  constants : wu.IConstants = require('../../../../package.json').wanamu;

    public constructor(
        public $http : angular.IHttpService,
        public $q : angular.IQService
    ){
        super();
    }


    public sync(profile : wu.model.IProfile) {
        let deferred = this.$q.defer();
        let promise = deferred.promise;

        if (!(profile instanceof Setting)) {
            deferred.reject(new InvalidArgumentError('Application error profile could not be found'));
            console.error('profile param must be of type wu.model.IUser');
            return promise;
        }

        this.$http.put(this.constants.apiurl + '/profile/' + profile.id, {
            data:profile.toJSON()
        }).success( (data: wu.datasource.IResponseDataModel<wu.datasource.IProfileData>, status: number) => {
            if (!SettingDataSource.isValidResponseData(data)) {
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
