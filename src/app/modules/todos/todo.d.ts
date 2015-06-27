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
        todo : model.ITodo;
        setting : model.ISetting;
        editcolors : boolean;
        currentColor : any;
        colors : model.IColor;
        deleteAt : string;
    }

    module todos {
        interface ITodoService {
            lastAddedTodo : model.ITodo;
            lastDeletedTodo: model.ITodo;
            user : model.IUser;
            selectedTodoList : wu.model.ITodoList;
            inEditTodoId : number;

            addNewTodo() : model.ITodo;
        }
        interface TodosHeaderService {
            showAddTodoButton : boolean;
        }
    }
}
