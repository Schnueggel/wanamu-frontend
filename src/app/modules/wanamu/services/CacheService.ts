import { BaseService } from '../../../wanamu/wanamu';
import { InjectC, Service } from '../../../decorators/decorators';
var _ = require('lodash');

@InjectC('CacheFactory')
@Service('wuCacheService' )
export class CacheService extends BaseService implements wu.ICacheService {

    static APP_CACHE_NAME = 'wanamu';

    private cache : ng.angularcache.ICache;

    private _sidenavOpen : boolean;

    /**
     *
     * @param cacheFactory
     */
    constructor(public cacheFactory  : ng.angularcache.ICacheFactory
    ){
        super();
    }

    /**
     *
     * @returns {ng.angularcache.ICache}
     */
    public getAppCache () {
        if (!this.cache) {
            this.cache = this.cacheFactory.createCache(CacheService.APP_CACHE_NAME, {
                deleteOnExpire: 'aggressive',
                recycleFreq: 60000,
                storageMode: 'localStorage'
            });
        }
        return this.cache;
    }

    /**
     *
     * @param value
     */
    public set sidenavOpen ( value: boolean ){
        this.getAppCache().put('sidenavOpen', value);
        this._sidenavOpen = value;
    }

    /**
     *
     * @returns {boolean}
     */
    public get sidenavOpen () : boolean {
        this._sidenavOpen = _.isBoolean(this._sidenavOpen) ? this._sidenavOpen : this.getAppCache().get('sidenavOpen');
        return this._sidenavOpen;
    }
}
