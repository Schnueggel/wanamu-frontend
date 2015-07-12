
declare module wanamu {

    interface ICacheService extends wu.setting.ISettingService {

        sidenavOpen : boolean;

        /**
         *
         * @returns {ng.angularcache.ICache}
         */
        getAppCache () : ng.angularcache.ICache;
    }

}
