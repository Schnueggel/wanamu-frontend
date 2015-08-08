
declare module wanamu {
    module decorators {
        interface IFilterOption {
            [index:string]:Function
        }
        interface IModuleOptions {
            services? : Array<Function> ;
            controller? : Array<Function>;
            modules? : Array<string>;
            directives? : Array<Function|Object>;
            filter? :  Array<IFilterOption>;
        }
    }
}
