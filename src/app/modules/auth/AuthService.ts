import { UserDataSource } from '../datasources/datasources';
import { User } from '../../models/User';
import _ = require('lodash');
import { AuthError, AccessError, UnkownError } from '../../errors/errors';
import { Service, InjectC } from '../../decorators/decorators';
import { BaseService } from '../../wanamu/wanamu';

/**
 * @alias authService
 */
@Service('wuAuthService')
@InjectC('$q','$http', 'constants', 'userDataSource', 'CacheFactory', 'panelService')
export class AuthService extends BaseService implements wanamu.auth.IAuthService {

    private currentuser : any;
    private userCache : any;

    static USER_CACHE_KEY : string  = 'wanamu.user.cache';
    static USER_KEY : string = 'user';
    static USER_CACHE_MAX_AGE = 1000 * 60 * 60 // 1 Hour;

    public isLoggedIn : boolean = false;

    constructor(public $q: ng.IQService,
                public $http: ng.IHttpService,
                public constants : any,
                public userDataSource : UserDataSource,
                public cacheFactory : ng.angularcache.ICacheFactory,
                public panelService : wu.module.panel.PanelService
    ) {
        super();
    }

    /**
     * Logs the current user in
     * @param username
     * @param password
     * @returns {IPromise<any>}
     */
    public login(username: string, password: string) : angular.IPromise<any> {
        return this.userDataSource.login(username, password)
            .then((user : User) => {
                this.currentuser = user;
                this.storeUser();
                this.isLoggedIn = true;
        }).catch((err) => {
                this.currentuser = null;
        });
    }

    /**
     * Logs the current user out
     * @returns {IPromise<T>}
     */
    public logout() : angular.IPromise<any> {
        let deferred = this.$q.defer();
        let promise = deferred.promise;
        this.clearUserCache();
        this.currentuser = null;
        this.isLoggedIn = false;

        this.$http.post(this.constants.logouturl, {}).success(function (data: any, status: number) {
            // ==========================================================================
            // If the was no logged in user we are good anyway
            // ==========================================================================
            if (status === 403) {
                deferred.resolve();
                return;
            }

            // ==========================================================================
            // We are logged out
            // ==========================================================================
            if (angular.isObject(data) && data.success) {
                deferred.resolve();
                return;
            }

            deferred.reject( new UnkownError('Logging out from server failed') );

        }).error(function (data) {
            if (data && data.error) {
                deferred.reject(data.error);
            } else {
                deferred.reject( new UnkownError('Logging out from server failed. Because of a Server error') );
            }
        });

        return promise;
    }

    /**
     * Stores the user in the localstorage
     */
    public storeUser() {
        if ( this.currentuser instanceof User ) {
            console.log('Storing user');
            this.getUserCache().put(AuthService.USER_KEY, JSON.stringify(this.currentuser));
        }
    }

    /**
     * Trys to restore the user from the session cache
     */
    public restoreUser() : wu.model.IUser {
        let user: wu.model.IUser;
        /**
         * We try to load the user from cache
         */
        try{
            console.log(this.getUserCache().get(AuthService.USER_KEY));
            let userdata = JSON.parse(this.getUserCache().get(AuthService.USER_KEY));
            //Reload userdata in background
            if (_.isPlainObject(userdata) && _.isNumber(userdata.id)) {
                 user = new User(userdata);
            }

        } catch (err) {
            console.error(err);
            user = null;
        }

        return  user;
    }

    /**
     * Clears user from cache
     */
    public clearUserCache() {
        this.getUserCache().remove(AuthService.USER_KEY);
    }
    /**
     *
     * @returns {any}
     */
    public getUserCache() : ng.angularcache.ICache {

        if (!this.userCache) {
            this.userCache = this.cacheFactory.get(AuthService.USER_CACHE_KEY);
            if (!this.userCache) {
                console.info('Create new User Cache');
                this.userCache = this.cacheFactory.createCache(AuthService.USER_CACHE_KEY, {
                    maxAge: AuthService.USER_CACHE_MAX_AGE,
                    storageMode: 'localStorage'
                });
            }
        }
        return this.userCache;
    }

    /**
     * Get the current user or try to restore it from session
     * @returns {any|null}
     */
    public currentUser() : wu.model.IUser {
        return this.currentuser;
    }

    /**
     * Try to get user from session
     * @returns {IPromise<T>}
     */
    public queryCurrentUser() : ng.IPromise<wu.model.IUser> {

        let deferred = this.$q.defer();
        let promise = deferred.promise;
        let user = this.currentUser();

        if (user instanceof User) {
            deferred.resolve(user);
            return promise;
        }

        // We try to get the current user from the backend
        let upromise = this.queryIsLoggedIn();

        upromise.then( (user: wu.model.IUser) => deferred.resolve(user) );

        upromise.catch( (err : Error) =>{
            if (err instanceof AuthError || err instanceof AccessError) {
                console.log('Open Login');
                let lpromise =  this.panelService.showLogin();
                lpromise.then( (user: wu.model.IUser) => deferred.resolve(user) );
                lpromise.catch( () => deferred.reject( new UnkownError() ) );
            } else {
                deferred.reject(err);
            }
        });

        return promise;
    }

    /**
     * Returns promise that resolve when use is logged in with user or rejects if user is not loggged in or error occured
     * The Promise reject with parameter of type BaseError
     * @returns {IPromise<T>}
     */
    public queryIsLoggedIn() : ng.IPromise<wu.model.IUser> {
        let deferred = this.$q.defer();
        let promise = deferred.promise;
        let user = this.currentUser();

        if (user instanceof User) {
            deferred.resolve(user);
            return promise;
        }

        // We try to get the current user from the backend
        let upromise = this.userDataSource.getUser(0);

        upromise.then((user : wu.model.IUser) => {
            this.isLoggedIn = true;
            this.currentuser = user;
            deferred.resolve(this.currentuser);
        });

        upromise.catch( (err : wu.errors.BaseError) => deferred.reject(err) );

        return promise;
    }
}
