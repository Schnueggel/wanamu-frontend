declare module wanamu {

    interface ITodoForm extends angular.IFormController {
        title : angular.INgModelController;
        alarm : angular.INgModelController;
        description : angular.INgModelController;
    }

    interface ITodoScope extends angular.IScope {
        edit : boolean;
        repeat : string;
        alarm : string;
        done : Function;
        editTodo : Function;
        selectColor : Function;
        todo : model.ITodo;
        setting : model.ISetting;
        editcolors : boolean;
        currentColor : any;
        colors : model.IColor;
        deleteAt : string;
    }

    module todos {
        interface ITodosService {
            lastAddedTodo : model.ITodo;
            lastDeletedTodo: model.ITodo;
            inEditTodoId : number;

            addNewTodo() : model.ITodo;
            deleteTodo(todo : model.ITodo) : ng.IPromise<wu.model.ITodo>;
            syncTodo (todo: model.ITodo) : ng.IPromise<wu.model.ITodo>;
        }

        interface TodosHeaderService {
            showAddTodoButton : boolean;
        }
    }
}
