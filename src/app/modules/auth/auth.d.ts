declare module wanamu {
    module auth {
        interface ILoginForm extends angular.IFormController {
            username : angular.INgModelController;
            password : angular.INgModelController;
        }

        interface IAuthService {
            isLoggedIn : boolean;

            login(username : string, password : string) : angular.IPromise<any>;
            logout() : angular.IPromise<any>;
            storeUser() : void;
            currentUser() : wanamu.model.IUser;
            queryCurrentUser() : ng.IPromise<wanamu.model.IUser>;
            queryIsLoggedIn () : ng.IPromise<wanamu.model.IUser>;
        }

        interface ILoginSuccessCallback {
            (user: model.IUser) : void
        }


        interface IAuthScope extends ng.IScope {
            auth : wu.auth.IAuthService
        }
    }
}
