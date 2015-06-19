
declare module wanamu {
    interface IController {

    }
    interface IService {

    }
    interface IModule {
        ngModule : angular.IModule;
        config (...args : any[]) : void;
    }
}

