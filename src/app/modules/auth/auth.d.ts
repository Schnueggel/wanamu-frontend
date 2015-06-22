declare module wanamu {
    module auth {
        interface ILoginForm extends angular.IFormController {
            username : angular.INgModelController;
            password : angular.INgModelController;
        }

        interface IAuthService {
            login(username : string, password : string) : angular.IPromise<any>;
            logout() : angular.IPromise<any>;
            isLoggedIn() : boolean;
            storeUser() : void;
            currentUser() : wanamu.model.IUser;
        }
    }
}
