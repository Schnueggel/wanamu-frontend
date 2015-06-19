import _ = require('lodash');
import '../wanamu/wanamu';

enum TYPE {
    SERVICE,
    CONTROLLER,
    MODULE
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
}

/**
 * Registry for Controller and Services
 */
export class Registry {
    public static moduleServices : {[moduleName : string] : Array<Function> } = {};
    public static services : ServiceOptions[] = [];
    public static moduleArgs : {[modulename: string] : ModuleOptions} = {};

    public static modules : {[modulename: string] : angular.IModule} = {};

    /**
     *
     * @param moduleClass
     * @param name
     * @returns {any}
     */
    public static bootstrap (moduleClass: any, name : string) : angular.IModule {

        if (!_.isUndefined(Registry.modules[name])) {
            return Registry.modules[name];
        }

        let moduleargs : ModuleOptions = Registry.moduleArgs[name];
        let module = <wanamu.IModule>new moduleClass();
        let ngModule = angular.module(name, moduleargs.modules);
        ngModule.config(module.config);
        module.ngModule = ngModule;

        //Bootstrap services
        moduleargs.controller.forEach((serviceClass : Function) => {
            Registry.services.forEach((serviceOpts : ServiceOptions) => {
                if (serviceClass === serviceOpts.serviceClass) {
                    ngModule.controller(serviceOpts.serviceName, serviceClass);
                }
            })
        });

        moduleargs.services.forEach((serviceClass : Function) => {
            Registry.services.forEach((serviceOpts : ServiceOptions) => {
                if (serviceClass === serviceOpts.serviceClass) {
                    ngModule.service(serviceOpts.serviceName, serviceClass);
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

    return function (target : any) : any {
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

    return function(target : any) {
        let opts : ServiceOptions = <ServiceOptions>{
            type: TYPE.CONTROLLER,
            serviceName: controllerName,
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

