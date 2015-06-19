import { TodoList } from '../../models/TodoList';
import { TodoDataSource } from './TodoDataSource';
import { BaseService } from '../../wanamu/wanamu';
import { Service, InjectC } from '../../decorators/decorators';

@Service('todolistDataSource')
@InjectC('$http', '$q', 'constants')
export class TodoListDataSource extends BaseService{

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
    public isValidTodoListData(data : any) : boolean {
        return _.isObject(data) &&
            _.isArray(data.data) &&
            data.data.length === 1 &&
            _.isNumber(data.data[0].id) &&
            data.data[0].id > 0;
    }
}
