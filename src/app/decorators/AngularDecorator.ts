import _ = require('lodash');
export class ServiceOptions {
    serviceName : string;
    serviceClass : Function;
    moduleClass : Function;
}

/**
 * Registry for Controller and Services
 */
export class Registry {
    public static controller :  ServiceOptions[] = [];
    public static services : ServiceOptions[] = [];
    public static moduleArgs : {[modulename: string] : any[]} = {};
    public static modules : {[modulename: string] : angular.IModule} = {};

    public static bootstrap (moduleClass: Function, name : string) {

        if (!_.isUndefined(Registry.modules[name])) {
            return Registry.modules[name];
        }

        let moduleargs : string[] = [];

        if (_.isArray(Registry.moduleArgs[name])) {

            Registry.moduleArgs[name].forEach((mod) => {
                if (_.isString(mod)) {
                    moduleargs.push(mod);
                } else if (_.isFunction(mod)){

                    moduleargs.push(mod().name);
                } else {
                    throw Error('Invalid module type. Expect string or class');
                }
            });
        }

        var o = Object.create(moduleClass.prototype);
        moduleClass.apply(o, moduleargs);
        var module = o.ngModule;

        //Bootstrap controller
        Registry.controller.forEach((opts : ServiceOptions) => {
            if (opts.moduleClass === moduleClass) {
                module.controller(opts.serviceName, opts.serviceClass);
            }
        });

        //Bootstrap services
        Registry.services.forEach((opts : ServiceOptions) => {
            if (opts.moduleClass === moduleClass) {
                module.service(opts.serviceName, opts.serviceClass);
            }
        });

        Registry.modules[name] = module;

        return module;
    }
}

/**
 * Declara class to module
 * @param name
 * @param args dependend modules string or class
 * @returns {function(Function): any}
 * @constructor
 */
export function Module (name : string, ...args : any[]) {

    Registry.moduleArgs[name] = args;

    return function (target : Function) : any {

        //If module get instantiated we bootstrap all registered services, controller aso
        return function (...args : any[]) {
            return Registry.bootstrap(target, name);
        }
    };
}

/**
 * Declare class to angular Controller
 * @param controllerName
 * @param controllerClass
 * @returns {function(Function): any}
 * @constructor
 */
export function Controller (controllerName : string, controllerClass : Function) {

    return function(target : Function) {
        var opts : ServiceOptions = {
            moduleClass : target,
            serviceName  : controllerName,
            serviceClass: controllerClass
        };
        Registry.controller.push(opts);

        return target;
    }
}
/**
 * Declare class to angular Service
 * @param serviceName
 * @param serviceClass
 * @returns {function(Function): any}
 * @constructor
 */
export function Service (serviceName : string, serviceClass : Function) {

    return function(target : Function) {
        var opts : ServiceOptions = {
            moduleClass : target,
            serviceName  : serviceName,
            serviceClass: serviceClass
        };
        Registry.services.push(opts);

        return target;
    }
}
