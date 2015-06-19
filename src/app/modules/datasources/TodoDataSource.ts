
/**
 * This class is a angular service to use it add it as service
 */
import _  = require('lodash');
import { Todo } from '../../models/Todo';
import { BaseService } from '../../wanamu/wanamu';
import { Service, InjectC } from '../../decorators/decorators';

@Service('todoDataSource')
@InjectC('$http', '$q', 'constants')
export class TodoDataSource extends BaseService {
    static $inject  = ['$http', '$q', 'constants'];

    public constructor(
        public $http : angular.IHttpService,
        public $q : angular.IQService,
        public constants : any
    ){
        super();
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
