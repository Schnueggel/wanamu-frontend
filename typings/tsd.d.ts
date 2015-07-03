
/// <reference path="angularjs/angular.d.ts" />
/// <reference path="jquery/jquery.d.ts" />
/// <reference path="angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="angular-material/angular-material.d.ts" />
/// <reference path="angularjs/angular-route.d.ts" />
/// <reference path="lodash/lodash.d.ts" />
/// <reference path="moment/moment-node.d.ts" />
/// <reference path="moment/moment.d.ts" />
/// <reference path="requirejs/require.d.ts" />
/// <reference path="rx/rx-lite.d.ts" />
/// <reference path="rx/rx.d.ts" />

declare module angular.angularcache {

    interface ICacheFactory {

        createCache ( key: string, options: {[index: string] : any}) : ICache;

        info() : { [index : string] : any };

        get(chacheId: string) : ICache;

        keySet(): {[index : string] : Object}

        keys() : Array<string>;

        destroy(chacheId: string) : void;

        destroyAll() : void;

        clearAll() : void;

        removeExpiredFromAll() : {[index:string] : ICache};

        enableAll() : void;

        disableAll() : void;

        touchAll() : void;
    }

    interface ICache {
        put ( key: string , value : any) : void;
        get ( key: string ) : any;
        remove ( key : string ) : void;
    }
}
