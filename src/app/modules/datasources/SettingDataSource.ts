import _  = require('lodash');
import { Setting } from '../../models/Setting';
import { BaseDataSource } from './BaseDataSource';
import { Service, InjectC } from '../../decorators/decorators';
import { InvalidArgumentError, InvalidResponseDataError } from '../../errors/errors';

@Service('settingDataSource')
@InjectC('$http', '$q')
export class SettingDataSource extends BaseDataSource implements wu.datasource.ISettingDataSource {

    private  constants : wu.IConstants = require('../../../../package.json').wanamu;

    public constructor(
        public $http : ng.IHttpService,
        public $q : ng.IQService
    ){
        super();
    }

    /**
     *
     * @param setting
     * @returns {IPromise<T>}
     */
    public sync(setting : wu.model.ISetting) {
        let deferred = this.$q.defer();
        let promise = deferred.promise;

        if (!(setting instanceof Setting)) {
            deferred.reject(new InvalidArgumentError('Application error!Setting could not be found'));
            console.error('Setting param must be of type wu.model.IUser');
            return promise;
        }

        // =============================================================================================
        // There should be no user without setting so we always expect an ip and never do a post
        // =============================================================================================
        this.$http.put(this.constants.apiurl + '/setting/' + setting.id, {
            data:setting.toJSON()
        }).success( (data: wu.datasource.IResponseDataModel<wu.datasource.ISettingData>, status: number) => {
            if (!SettingDataSource.isValidResponseData(data)) {
                deferred.reject( new InvalidResponseDataError());
            } else {
                setting.fromJSON(data.data[0]);
                deferred.resolve(setting);
            }
        }).error( (data : wu.datasource.IUserResponseData, status: number) => {
            deferred.reject( this.getDefaultResponseErrors(data, status) );
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
