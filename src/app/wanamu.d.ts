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
