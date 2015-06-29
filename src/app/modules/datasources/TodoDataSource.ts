/**
 * This class is a angular service to use it add it as service
 */
import _  = require('lodash');
import { BaseDataSource } from './BaseDataSource';
import { Todo } from '../../models/models';
import { Service, InjectC } from '../../decorators/decorators';
import { InvalidResponseDataError, AuthError, ServerError, InvalidArgumentError } from '../../errors/errors';

@Service('todoDataSource')
@InjectC('$http', '$q', '$log', 'wuAuthService')
export class TodoDataSource extends BaseDataSource implements wu.datasource.ITodoDataSource {

    private deleteDeferred : {[index : number]: ng.IDeferred<wu.model.ITodo>} = {};

    private constants : wu.IConstants = require('../../../../package.json').wanamu;

    public constructor(
        public $http : ng.IHttpService,
        public $q : ng.IQService,
        public $log : ng.ILogService,
        public authService : wu.auth.IAuthService
    ){
        super();
    }

    /**
     * Checks if the result from server is a valid user
     * @param data
     * @returns {boolean}
     */
    public static isValidTodoData(data : any) : boolean {
        return _.isObject(data) &&
            _.isArray(data.data) &&
            data.data.length === 1 &&
            _.isNumber(data.data[0].id) &&
            data.data[0].id > 0;
    }

    /**
     * Sync a Todo Model with the database. And maps the result to the model
     * @param todo
     * @returns {IPromise<T>}
     */
    public sync(todo: wu.model.ITodo): ng.IPromise<wu.model.ITodo> {
        let deferred = this.$q.defer();
        let promise = deferred.promise;
        let data : wu.datasource.ITodoRequestData  = {
            data: todo.toJSON()
        };

        let httpPromise : ng.IHttpPromise<wu.datasource.ITodoResponseData>;

        if (todo.id) {
            httpPromise = this.$http.put(this.constants.apiurl + '/todo/' + todo.id, data );
        } else {
            httpPromise = this.$http.post(this.constants.apiurl + '/todo', data);
        }

        httpPromise
            .success((data : wu.datasource.ITodoResponseData) => this.resolveSyncSuccess(deferred, todo, data))
            .error((data : wu.datasource.ITodoResponseData, status : number) => {
                deferred.reject(this.getDefaultResponseErrors(data, status));
            });

        return promise;
    }

    /**
     * Deletes a given todo
     * @param todo
     * @returns {IPromise<T>}
     */
    public delete(todo: wu.model.ITodo) : ng.IPromise<wu.model.ITodo> {

        let deferred = this.deleteDeferred[todo.id];

        if (!deferred) {
            deferred = this.deleteDeferred[todo.id] = this.$q.defer();
        }
        else {
            return deferred.promise;
        }

        let promise = deferred.promise;

        if (!(todo instanceof Todo)) {
            this.$log.warn('Only instance of Todo can be deleted');
            deferred.reject( new InvalidArgumentError('Could not find Todo for deletion') );
            return promise;
        }

        let httpPromise : ng.IHttpPromise<wu.datasource.ITodoResponseData>;

        httpPromise = this.$http.delete( this.constants.apiurl + '/todo/' + todo.id );

        httpPromise.success((data : wu.datasource.ITodoResponseData) => this.resolveSyncSuccess(deferred, todo, data));
        httpPromise.error((data : wu.datasource.ITodoResponseData, status : number) => {
                deferred.reject(this.getDefaultResponseErrors(data, status));
        });
        httpPromise.finally( () => this.deleteDeferred[todo.id] = null);

        return promise;
    }
    /**
     *
     * @param deferred
     * @param todo
     * @param data
     */
    private resolveSyncSuccess(deferred: ng.IDeferred<wu.model.ITodo>, todo: wu.model.ITodo, data : wu.datasource.ITodoResponseData) {
        if (!TodoDataSource.isValidTodoData(data)) {
            return deferred.reject( new InvalidResponseDataError() );
        }
        todo.fromJSON(data.data[0]);
        todo.dirty = false;
        this.authService.storeUser();

        deferred.resolve(todo);
    }

}
