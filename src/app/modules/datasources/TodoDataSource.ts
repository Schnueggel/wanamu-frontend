/**
 * This class is a angular service to use it add it as service
 */
import _  = require('lodash');
import { BaseService } from '../../wanamu/wanamu';
import { Service, InjectC } from '../../decorators/decorators';
import { InvalidResponseDataError, AuthError, ServerError } from '../../errors/errors';

@Service('todoDataSource')
@InjectC('$http', '$q', 'constants', 'wuAuthService')
export class TodoDataSource extends BaseService implements wu.datasource.ITodoDataSource {

    private constants : wu.IConstants;

    public constructor(
        public $http : ng.IHttpService,
        public $q : ng.IQService,
        public constants : wu.IConstants,
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
    public sync(todo: wanamu.model.ITodo): ng.IPromise<wanamu.model.ITodo> {
        let deferred = this.$q.defer();
        let promise = deferred.promise;
        let data : wanamu.datasource.IRequestTodoData  = {
            data: todo.toJSON()
        };

        let httpPromise : ng.IHttpPromise<wanamu.datasource.ITodoResponseData>;
        if (todo.id) {
            httpPromise = this.$http.put(this.constants.apiurl + '/todo/' + todo.id, data );
        } else {
            httpPromise = this.$http.post(this.constants.apiurl + '/todo', data);
        }

        httpPromise
            .success((data : wanamu.datasource.ITodoResponseData) => this.resolveSyncSuccess(deferred, todo, data))
            .error((err : wanamu.datasource.ITodoResponseData, status : number) => this.resolveSyncError (deferred, err, status));

        return promise;
    }

    /**
     * Deletes a given todo
     * @param todo
     * @returns {IPromise<T>}
     */
    public delete(todo: wu.model.ITodo) : ng.IPromise<wanamu.model.ITodo> {
        let deferred = this.$q.defer();
        let promise = deferred.promise;

        let httpPromise : ng.IHttpPromise<wanamu.datasource.ITodoResponseData>;

        httpPromise = this.$http.delete( this.constants.apiurl + '/todo/' + todo.id );

        httpPromise
            .success((data : wu.datasource.ITodoResponseData) => {
                deferred.resolve(todo);
            })
            .error((err : wanamu.datasource.ITodoResponseData, status : number) => this.resolveSyncError (deferred, err, status));
        return promise;
    }
    /**
     *
     * @param deferred
     * @param todo
     * @param data
     */
    private resolveSyncSuccess(deferred: ng.IDeferred<wanamu.model.ITodo>, todo: wanamu.model.ITodo, data : wanamu.datasource.ITodoResponseData) {
        if (!TodoDataSource.isValidTodoData(data)) {
            return deferred.reject( new InvalidResponseDataError() );
        }
        todo.fromJSON(data.data[0]);
        todo.dirty = false;
        this.authService.storeUser();

        deferred.resolve(todo);
    }

    /**
     *
     * @param deferred
     * @param err
     * @param status
     */
    private resolveSyncError(deferred : ng.IDeferred<wanamu.errors.BaseError>, err : wanamu.datasource.ITodoResponseData, status: number ) {
        if (status === 401 || status == 403) {
            deferred.reject( new AuthError('You need to authenticate') );
        } else if (status === 500) {
            deferred.reject(new ServerError());
        } else if (err && _.isString(err.error)) {
            deferred.reject(new ServerError(err.error));
        } else {
            deferred.reject(new ServerError('Invalid data received from server or server did not respond'));
        }
    }
}
