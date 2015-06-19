
export class BaseModule implements wanamu.IModule {

    public static mname : string = 'baseModule';
    public ngModule : angular.IModule;

    constructor() {}

    public config(...any : any []){}
}
