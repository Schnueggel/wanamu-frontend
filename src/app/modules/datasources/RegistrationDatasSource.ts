import _  = require('lodash');
import { BaseDataSource } from './BaseDataSource';
import { Service, InjectC } from '../../decorators/decorators';
import { InvalidArgumentError, AlreadyConfirmedError } from '../../errors/errors';

@Service('registrationDataSource')
@InjectC('$http', '$q')
export class RegistrationDataSource extends BaseDataSource implements wu.datasource.IRegistrationDataSource {

    private  constants : wu.IConstants = require('../../../../package.json').wanamu;

    public constructor(
        public $http : ng.IHttpService,
        public $q : ng.IQService
    ){
        super();
    }

    /**
     *
     * @param hash
     * @returns {IPromise<T>}
     */
    public confirmRegistration(hash : string) {
        let deferred = this.$q.defer();
        let promise = deferred.promise;

        if (!_.isString(hash)) {
            deferred.reject(new InvalidArgumentError('Application error need valid confirmation hash'));
            console.error('Application error need valid confirmation hash');
            return promise;
        }

        this.$http.get(this.constants.apiurl + '/confirmation/' + hash, {})
            .success( (data: any, status: number) => {
                deferred.resolve();
        }).error( (data : wu.datasource.IUserResponseData, status: number) => {
            deferred.reject(this.getDefaultResponseErrors(data, status));
        });

        return promise;
    }


    /**
     *
     * @param username
     * @param password
     * @returns {IPromise<T>}
     */
    public resendConfirmation(username : string, password: string) {
        let deferred = this.$q.defer();
        let promise = deferred.promise;

        let requestdata : wu.datasource.IConfirmRequestData = {
            data : {
                email: username,
                password: password
            }
        };

        this.$http.post(this.constants.apiurl + '/confirmation',  requestdata)
            .success( (data: any, status: number) => {
                if (status === 208) {
                    deferred.reject(new AlreadyConfirmedError());
                } else {
                    deferred.resolve();
                }
            }).error( (data : wu.datasource.IUserResponseData, status: number) => {
                deferred.reject(this.getDefaultResponseErrors(data, status));
            });

        return promise;
    }

}
