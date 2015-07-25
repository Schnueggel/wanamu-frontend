/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../../libs/reflect-metadata.d.ts"/>

/**
 * Collapse wanamu into wu
 */
import wu = wanamu;
declare var packageJson : wanamu.IConstants;

declare module 'package.json' {
    export = packageJson;
}

declare module wanamu {
    interface IDirty {
        dirty : boolean;
    }

    interface IConstants {
        apiurl: string,
        loginurl: string,
        logouturl: string
    }
    interface IndexableObject extends Object {
        [index: string]: any;
    }
}

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

declare module Rx {
    export interface Observable<T> {
        start<T>( func : Function ) : Rx.Observable<T>
    }
}
