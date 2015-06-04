///<reference path="../../libs/angular/angular.d.ts" />

declare module wanamu {
    interface TodoForm extends angular.IFormController {
        title : angular.INgModelController;
        alarm : angular.INgModelController;
        description : angular.INgModelController;
    }
}
