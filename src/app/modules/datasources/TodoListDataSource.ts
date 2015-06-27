import { TodoList } from '../../models/TodoList';
import { TodoDataSource } from './TodoDataSource';
import { BaseService } from '../../wanamu/wanamu';
import { Service, InjectC } from '../../decorators/decorators';

@Service('todolistDataSource')
@InjectC('$http', '$q')
export class TodoListDataSource extends BaseService{

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
    public isValidTodoListData(data : any) : boolean {
        return _.isObject(data) &&
            _.isArray(data.data) &&
            data.data.length === 1 &&
            _.isNumber(data.data[0].id) &&
            data.data[0].id > 0;
    }
}
