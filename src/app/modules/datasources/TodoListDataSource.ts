import { TodoList } from '../../models/TodoList';
import { TodoDataSource } from './TodoDataSource';
import { BaseDataSource } from './BaseDataSource';
import { Service, InjectC } from '../../decorators/decorators';
import { InvalidResponseDataError } from '../../errors/errors';
var _ = require('lodash');

@Service('todolistDataSource')
@InjectC('$http', '$q')
export class TodoListDataSource extends BaseDataSource implements wu.datasource.ITodolistDataSource {

    private  constants : wu.IConstants = require('../../../../package.json').wanamu;

    public constructor(
        public $http : ng.IHttpService,
        public $q : ng.IQService
    ){
        super();
    }

    /**
     *
     * @param id
     * @returns {IPromise<Todolist>}
     */
    public getTodolist(id : number) : ng.IPromise<wu.model.ITodoList> {
        let deferred = this.$q.defer();
        let promise = deferred.promise;

        this.$http.get(this.constants.apiurl +'/todolist/' + id, { withCredentials: true })
            .success( (data: wu.datasource.ITodolistResponseData, status: number) => {

                if (!this.isValidTodoListData(data)) {
                    deferred.reject(new InvalidResponseDataError());
                } else {
                    let model = new TodoList(data.data[0]);
                    deferred.resolve(model);
                }
            }).error( (data : wu.datasource.IUserResponseData, status : number) => {
                deferred.reject(this.getDefaultResponseErrors(data, status));
            });
        return promise;
    }

    /**
     * Checks if the result from server is a valid user
     * @param data
     * @returns {boolean}
     */
    public isValidTodoListData(data : wu.datasource.ITodolistResponseData) : boolean {
        return _.isObject(data) &&
            _.isArray(data.data) &&
            data.data.length === 1 &&
            _.isNumber(data.data[0].id) &&
            data.data[0].id > 0;
    }
}
