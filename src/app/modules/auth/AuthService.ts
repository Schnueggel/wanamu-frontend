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
@InjectC('$q','$http', 'userDataSource', 'CacheFactory', 'panelService')
export class AuthService extends BaseService implements wanamu.auth.IAuthService {

    private currentuser : any;
    private userCache : any;

    static USER_CACHE_KEY : string  = 'wanamu.user.cache';
    static USER_KEY : string = 'user';
    static USER_CACHE_MAX_AGE = 1000 * 60 * 60 // 1 Hour;

    public isLoggedIn : boolean = false;

    public userdeferred : ng.IDeferred<wu.model.IUser> = null;
    public logindeferred : ng.IDeferred<wu.model.IUser> = null;
    private constants : wu.IConstants = require('../../../../package.json').wanamu;

    constructor(public $q: ng.IQService,
                public $http: ng.IHttpService,
                public userDataSource : UserDataSource,
                public cacheFactory : ng.angularcache.ICacheFactory,
                public panelService : wu.module.panel.IPanelService
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
        let promise = this.userDataSource.login(username, password);
            promise.then((user : User) => {
                this.currentuser = user;
                this.storeUser();
                this.isLoggedIn = true;
            });
            promise.catch((err) => {
                this.currentuser = null;
            });
        return promise;
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
            if (_.isObject(data) && data.success) {
                deferred.resolve();
                return;
            }

            deferred.reject( new UnkownError('Logging out from server failed') );

        }).catch( (data) => {
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

        // If a query is already running we return the same promise.
        if (this.userdeferred === null) {
            this.userdeferred = this.$q.defer();
        } else {
            return this.userdeferred.promise;
        }

        let promise = this.userdeferred.promise;
        let user = this.currentUser();

        if (user instanceof User) {
            this.resolveUser(user);
            return promise;
        }

        // We try to get the current user from the backend
        let upromise = this.queryIsLoggedIn();

        upromise.then( (user: wu.model.IUser) => {
            this.resolveUser(user);
        });

        upromise.catch( (err : Error) =>{
            if (err instanceof AuthError || err instanceof AccessError) {
                console.log('Open Login');
                let lpromise =  this.panelService.showLogin();
                lpromise.then( (user: wu.model.IUser) => this.resolveUser(user) );
                lpromise.catch( () => this.rejectUser( new UnkownError() ) );

            } else {
                this.rejectUser(err);
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

        // If a query is already running we return the same promise.
        if (this.logindeferred === null) {
            this.logindeferred = this.$q.defer();
        } else {
            return this.logindeferred.promise;
        }

        let promise = this.logindeferred.promise;
        let user = this.currentUser();

        if (user instanceof User) {
            this.resolveLogin(user);
            return promise;
        }

        // We try to get the current user from the backend
        let upromise = this.userDataSource.getUser(0);

        upromise.then((user : wu.model.IUser) => {
            this.isLoggedIn = true;
            this.currentuser = user;
            this.resolveLogin(user);
        });

        upromise.catch( (err : wu.errors.BaseError) => this.rejectLogin(err) );

        return promise;
    }

    /**
     * Resolves the login deferred
     * @param user
     */
    private resolveLogin(user : wu.model.IUser) {
        this.logindeferred.resolve(user);
        this.logindeferred = null;
    }

    /**
     * Reject the login deferred
     * @param err
     */
    private rejectLogin(err : wu.errors.BaseError) {
        this.logindeferred.reject(err);
        this.logindeferred = null;
    }

    /**
     * Resolves the user deferred
     * @param user
     */
    private resolveUser(user : wu.model.IUser) {
        this.userdeferred.resolve(user);
        this.userdeferred = null;
    }

    /**
     * Rejects the user deferred
     * @param err
     */
    private rejectUser(err : wu.errors.BaseError) {
        this.userdeferred.reject(err);
        this.userdeferred = null;
    }
}
