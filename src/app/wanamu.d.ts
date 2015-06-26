/// <reference path="../../typings/angular-material/angular-material.d.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts"/>
/// <reference path="../../typings/lodash/lodash.d.ts"/>
/// <reference path="../../typings/moment/moment.d.ts"/>
/// <reference path="../../typings/requirejs/require.d.ts"/>
/// <reference path="../../libs/reflect-metadata.d.ts"/>

/**
 * Collapse wanamu into wu
 */
import wu = wanamu;

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
