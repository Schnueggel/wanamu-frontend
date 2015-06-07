///<reference path="../../libs/angular/angular.d.ts" />
///<reference path="./Todos.ts" />

declare module wanamu {

    interface ITodoForm extends angular.IFormController {
        title : angular.INgModelController;
        alarm : angular.INgModelController;
        description : angular.INgModelController;
    }
    interface ITodo {
        id : number;
        title : string;
        alarm : string;
        description : string;
        repeat : string;
        deleted : boolean;
    }

    interface ITodoScope extends angular.IScope{
        edit : boolean;
        repeat : string;
        alarm : string;
        done : Function;
        editTodo : Function;
        todo : ITodo;
    }
}
