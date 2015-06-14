///<reference path="../../libs/angularjs/angular.d.ts" />

declare module wanamu {
    interface LoginForm extends angular.IFormController {
        username : angular.INgModelController;
        password : angular.INgModelController;
    }
}
