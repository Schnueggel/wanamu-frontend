import _ = require('lodash');
import 'reflect-metadata';
import { InjectMetadataKeys } from './InjectDecorator';
import { BaseDirective, BaseModule, BaseController, BaseService } from '../wanamu/wanamu';

/**
 * Registry for Controller and Services
 */
export class Registry {

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

        let module = new moduleClass();
        let dependendModules : string [] = Reflect.getMetadata(AngularMetaKeys.Modules, moduleClass) || [];
        let ngModule = angular.module(name, dependendModules);

        let config : any[] = Reflect.getMetadata(InjectMetadataKeys.AngularMethodInjects, module, 'config') || [];
        config.push(module.config);
        ngModule.config(config);

        //Get the services for this module
        let controller = Reflect.getMetadata(AngularMetaKeys.ModuleController, moduleClass) || [];
        let directives = Reflect.getMetadata(AngularMetaKeys.ModuleDirective, moduleClass) || [];
        let services = Reflect.getMetadata(AngularMetaKeys.ModuleService, moduleClass) || [];

        Registry.bootstrapController(controller, ngModule);
        Registry.bootstrapServices(services, ngModule);
        Registry.bootstrapDirectives(directives, ngModule);

        Registry.modules[name] = ngModule;

        return ngModule;
    }

    /**
     *
     * TODO optimize to use Reflect. Perhaps we should allow naming of Controller within the module decorator options
     * @param services
     * @param ngModule
     */
    static bootstrapServices(services : Function[], ngModule: angular.IModule){
        services.forEach((serviceClass : Function) => {
            let name : string = Reflect.getMetadata(AngularMetaKeys.Service, serviceClass);
            let args = Reflect.getMetadata(InjectMetadataKeys.AngularServiceInjects, serviceClass) || [];
            args.push(serviceClass);
            ngModule.service(name, args);
        });
    }

    /**
     * @param controller
     * @param ngModule
     */
    static bootstrapController(controller : Function[], ngModule: angular.IModule){

        controller.forEach((serviceClass :{new(): BaseDirective}) => {
            let name : string = Reflect.getMetadata(AngularMetaKeys.Controller, serviceClass);
            let args = Reflect.getMetadata(InjectMetadataKeys.AngularServiceInjects, serviceClass) || [];
            args.push(serviceClass);
            ngModule.controller(name, args);
        });
    }

    /**
     * @param directives
     * @param ngModule
     */
    static bootstrapDirectives(directives : Function[], ngModule: angular.IModule){
        directives.forEach((serviceClass :{new(): BaseDirective}) => {
            let name : string = Reflect.getMetadata(AngularMetaKeys.Directive, serviceClass);
            let args = Reflect.getMetadata(InjectMetadataKeys.AngularServiceInjects, serviceClass) || [];
            let directive = new serviceClass();
            //We need to bind the init function to the directive to keep the scope
            args.push(directive.init.bind(directive));
            ngModule.directive(name, args);
        });
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

    return function<T extends typeof BaseModule>(target : T) : T {

        Reflect.defineMetadata(AngularMetaKeys.ModuleController, data.controller, target);
        Reflect.defineMetadata(AngularMetaKeys.ModuleService, data.services, target);
        Reflect.defineMetadata(AngularMetaKeys.ModuleDirective, data.directives, target);
        Reflect.defineMetadata(AngularMetaKeys.Modules, data.modules, target);

        //We immediatly create module on its definition. Which means when require('module') is called we come here and create the module
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
        Reflect.defineMetadata(AngularMetaKeys.Controller, controllerName, target);

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
        Reflect.defineMetadata(AngularMetaKeys.Directive, directiveName, target);
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
        Reflect.defineMetadata(AngularMetaKeys.Service, serviceName, target);
        return target;
    }
}

/**
 * Defines a config method for a angular module
 * @param inject
 * @returns {function(Object, string, TypedPropertyDescriptor<any>): any}
 * @constructor
 */
export function Config (...inject : string[]) {
    return function (target : Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) : any {
        Reflect.defineMetadata(InjectMetadataKeys.AngularMethodInjects, inject, target, propertyKey);
        return descriptor;
    };
}

/**
 * Lookup Keys
 */
export class AngularMetaKeys {
    static ModuleService : string = 'ModuleService';
    static ModuleController : string = 'ModuleController';
    static ModuleDirective : string = 'ModuleDirective';
    static Modules : string = 'Modules';
    static Controller : string = 'Controller';
    static Directive : string = 'Directive';
    static Service : string = 'Service';
}

/**
 * Modsule Decorator Options
 */
export class ModuleOptions {
    services : Array<Function> = [];
    controller : Array<Function> = [];
    modules : Array<string> = [];
    directives : Array<Function> = [];
}
