declare module wanamu {
    module components {
        module login {
            interface ILoginForm extends angular.IFormController {
                username : angular.INgModelController;
                password : angular.INgModelController;
            }
        }
    }
}
