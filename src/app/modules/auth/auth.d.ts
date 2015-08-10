declare module wanamu {

    module auth {
        module components {
            module login {
                interface ILoginForm extends ng.IFormController {
                    username : ng.INgModelController;
                    password : ng.INgModelController;
                }

                interface IScopeModel {
                    username: string;
                    password: string;
                    loginform: ng.IFormController;
                }
            }
        }

        module dialogs {
            module login {
                interface ILoginDialogService {
                    $mdDialog : ng.material.MDDialogService;
                    show (ev?: MouseEvent) : ng.IPromise<any>;
                }
            }
        }

        interface ILoginForm extends ng.IFormController {
            username : ng.INgModelController;
            password : ng.INgModelController;
        }

        interface IAuthService {
            isLoggedIn : boolean;

            login(username : string, password : string) : ng.IPromise<any>;
            logout() : ng.IPromise<any>;
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

        interface ILoginStateParams extends ng.ui.IStateParamsService {
            confirmation? : boolean
        }

        interface ILoginStateService extends ng.ui.IStateService {
            params : ILoginStateParams
        }
    }
}
