import _  = require('lodash');
import { Setting } from '../../models/Setting';
import { BaseService } from '../../wanamu/wanamu';
import { Service, InjectC } from '../../decorators/decorators';

@Service('settingDataSource')
@InjectC('$http', '$q')
export class SettingDataSource extends BaseService implements wu.datasource.ISettingsDatasource {

    private  constants : wu.IConstants = require('../../../../package.json').wanamu;

    public constructor(
        public $http : angular.IHttpService,
        public $q : angular.IQService
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
