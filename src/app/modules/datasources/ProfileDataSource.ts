import _  = require('lodash');
import { Profile } from '../../models/Profile';
import { BaseService } from '../../wanamu/wanamu';
import { Service, InjectC } from '../../decorators/decorators';

@Service('profileDataSource')
@InjectC('$http', '$q')
export class ProfileDataSource extends BaseService implements wu.datasource.IProfileDatasource {

    private  constants : wu.IConstants = require('../../../../package.json').wanamu;

    public constructor(
        public $http : ng.IHttpService,
        public $q : ng.IQService
    ){
        super();
    }

    /**
     * Checks if the result from server is a valid user
     * @param data
     * @returns {boolean}
     */
    public static isValidSettingsData(data : any) : boolean {
        return _.isObject(data) &&
            _.isArray(data.data) &&
            data.data.length === 1 &&
            _.isNumber(data.data[0].id) &&
            data.data[0].id > 0;
    }
}
