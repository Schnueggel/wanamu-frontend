
declare module wanamu {

    interface CacheService extends wu.setting.ISettingService {

        sidenavOpen : boolean;

        /**
         *
         * @returns {ng.angularcache.ICache}
         */
        getAppCache () : ng.angularcache.ICache;
    }

}
