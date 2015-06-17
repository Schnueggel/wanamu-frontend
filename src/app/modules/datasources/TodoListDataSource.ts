import { TodoList } from '../../models/TodoList';
import { TodoDataSource } from './TodoDataSource';
import { InjectC } from '../../decorators/decorators';

@InjectC('$http', '$q', 'constants')
export class TodoListDataSource {

    public constructor(
        public $http : angular.IHttpService,
        public $q : angular.IQService,
        public constants : any
    ){

    }
    /**
     * Checks if the result from server is a valid user
     * @param user
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
