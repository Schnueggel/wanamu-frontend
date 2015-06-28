
declare module wanamu {
    module profile {
        interface IProfileService {

        }
        interface IUserForm extends ng.IFormController {
            firstname : ng.INgModelController;
            lastname : ng.INgModelController;
            salutation : ng.INgModelController;
            password : ng.INgModelController;
            passwordrepeat : ng.INgModelController;
            email : ng.INgModelController;
        }

    }
}
