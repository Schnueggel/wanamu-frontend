import _ = require('lodash');
import { BaseDirective, BaseModule, BaseController, BaseService } from '../wanamu/wanamu';

export enum TYPE {
    SERVICE,
    CONTROLLER,
    MODULE,
    DIRECTIVE
}
export class ServiceOptions {
    type : TYPE;
    serviceName : string;
    serviceClass : Function;
}

export class ModuleOptions {
    services : Array<Function> = [];
    controller : Array<Function> = [];
    modules : Array<string> = [];
    directives : Array<Function> = [];
}
/**
 * Registry for Controller and Services
 */
export class Registry {
    public static services : ServiceOptions[] = [];
    public static moduleArgs : {[modulename: string] : ModuleOptions} = {};

    public static modules : {[modulename: string] : angular.IModule} = {};

    /**
     *
     * @param moduleClass
     * @param name
     * @returns {any}
     */
    public static bootstrap(moduleClass: {new(): BaseModule}, name : string) : angular.IModule {

        if (!_.isUndefined(Registry.modules[name])) {
            return Registry.modules[name];
        }

        let moduleargs : ModuleOptions = Registry.moduleArgs[name];
        let module = new moduleClass();
        let ngModule = angular.module(name, moduleargs.modules);
        ngModule.config(module.config);
        module.ngModule = ngModule;

        moduleargs.controller = moduleargs.controller || [];

        //Bootstrap services
        moduleargs.controller.forEach((serviceClass : Function) => {
            Registry.services.forEach((serviceOpts : ServiceOptions) => {
                if (serviceClass === serviceOpts.serviceClass) {
                    ngModule.controller(serviceOpts.serviceName, serviceClass);
                }
            })
        });

        moduleargs.services = moduleargs.services || [];

        moduleargs.services.forEach((serviceClass : Function) => {
            Registry.services.forEach((serviceOpts : ServiceOptions) => {
                if (serviceClass === serviceOpts.serviceClass) {
                    ngModule.service(serviceOpts.serviceName, serviceClass);
                }
            })
        });

        moduleargs.directives = moduleargs.directives || [];

        moduleargs.directives.forEach((serviceClass :{new(): BaseDirective}) => {
            Registry.services.forEach((serviceOpts : ServiceOptions) => {
                if (serviceClass === serviceOpts.serviceClass) {
                    ngModule.directive(serviceOpts.serviceName, () => new serviceClass());
                }
            })
        });
        Registry.modules[name] = ngModule;

        return ngModule;
    }
}

/**
 * Declara class to module
 * @param name
 * @param data
 * @returns {function(Function): any}
 * @constructor
 */
export function Module (name : string, data? : ModuleOptions) {

    if (!data) {
        data = new ModuleOptions();
    }
    Registry.moduleArgs[name] = data;

    return function<T extends typeof BaseModule>(target : T) : T {
        Registry.bootstrap(target, name);
        return target;
    };
}

/**
 * Declare class to angular Controller
 * @param controllerName
 * @returns {function(Function): any}
 * @constructor
 */
export function Controller (controllerName: string) {

    return function<T extends BaseController>(target : {new(): T}) {
        let opts : ServiceOptions = {
            type: TYPE.CONTROLLER,
            serviceName: controllerName,
            serviceClass: target
        };
        Registry.services.push(opts);

        return target;
    }
}

/**
 * Declare a class as Directive.
 * @param directiveName
 * @returns {function(any): *}
 * @constructor
 */
export function Directive (directiveName: string) {
    return function<T extends BaseDirective>(target : { new() : T }) {
        let opts : ServiceOptions = <ServiceOptions>{
            type: TYPE.DIRECTIVE,
            serviceName: directiveName,
            serviceClass: target
        };
        Registry.services.push(opts);

        return target;
    }
}
/**
 * Declare class to angular Service
 * @param serviceName
 * @returns {function(Function): any}
 * @constructor
 */
export function Service (serviceName : string) {

    return function(target : any) {
        let opts : ServiceOptions = <ServiceOptions>{
            type: TYPE.SERVICE,
            serviceName: serviceName,
            serviceClass: target
        };
        Registry.services.push(opts);

        return target;
    }
}

