declare module wanamu {

    interface ITodoForm extends angular.IFormController {
        title : angular.INgModelController;
        alarm : angular.INgModelController;
        description : angular.INgModelController;
    }

    interface ITodoScope extends angular.IScope{
        edit : boolean;
        repeat : string;
        alarm : string;
        done : Function;
        editTodo : Function;
        selectColor : Function;
        todo : ITodo;
        setting : ISetting;
        editcolors : boolean;
        currentColor : any;
        colors : IColor;
        delete : Function;
    }
}
