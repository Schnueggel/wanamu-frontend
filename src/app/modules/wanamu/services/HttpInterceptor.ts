import { Service, InjectC } from '../../../decorators/decorators';
import { BaseService } from '../../../wanamu/wanamu';
/**
 * This Module create a Service named auth and a directive named tdIsAuth
 * @param {Object} ngModule
 */
/**
 * We make this class Singleton even noramly services it angular are used as singleton.
 * But it seems that the methods of this class are used without binding inside angular
 */
@Service('httpInterceptor')
@InjectC('$q', '$injector')
export class HttpInterceptor extends BaseService {
    //Dependencies
    constructor(
        public $q : angular.IQService,
        public $injector : angular.auto.IInjectorService
    ) {
        super();
    }

    // optional method
     request = (config: angular.IRequestConfig) => {
        // do something on success
        return config;
     }

    // optional method
    requestError = (rejection : any) => {
        return this.$q.reject(rejection);
    }


    // optional method
    response = (response : any) => {
        // do something on success
        return response;
    }

    // optional method
    responseError = (rejection: any) : angular.IPromise<any> =>  {
        if (rejection.status === 401 || rejection.status === 403 ) {
            var $state = this.$injector.get('$state');
            if ($state.current.name !== 'panel.view.login'){
                $state.go('panel.view.login');
            }
        }
        return this.$q.reject(rejection);
    }
}
