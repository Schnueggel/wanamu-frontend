
declare module wanamu {
    module registration {
        interface IRegistrationService {

        }
        interface IRegistrationForm extends ng.IFormController {
            firstname : ng.INgModelController;
            lastname : ng.INgModelController;
            salutation : ng.INgModelController;
            password : ng.INgModelController;
            passwordrepeat : ng.INgModelController;
            email : ng.INgModelController;
        }

    }
}
