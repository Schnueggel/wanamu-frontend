
declare module wanamu {

    interface ISettingData {
        id : number;
        color1: string;
        color2: string;
        color3: string;
        color4: string;
        color5: string;
        face: string;
    }

    interface ITodoListData {
        id : number;
        name : string;
        Todos : Array<ITodoData>;
    }

    interface ITodoData {
        id : number;
        TodoListId: number;
        title : string;
        description : string;
        alarm : string;
        repeat : boolean;
        repeatWeekly: string[];
        repeatMonthly: string[];
        repeatYearly: string[];
        order : number;
        deletedAt: string;
        color: string;
    }

    module datasource {
        interface IUserData {
            id : number;
            firstname : string;
            lastname : string;
            salutation : string;
            email: string;
            TodoLists : Array<ITodoListData>
            Setting: ISettingData;
            DefaultTodoListId : number;

        }

        interface ISettingsDatasource {

        }
        interface IError {
            type : string,
            message : string
        }
        interface IResponseData {
            error : IError;
        }
        interface ITodoResponseData extends  IResponseData {
            data : Array<ITodoData>;
        }

        interface ITodoDataSource {
            sync(todo: model.ITodo) : angular.IPromise<model.ITodo>;
            delete(todo: wu.model.ITodo) : ng.IPromise<wanamu.model.ITodo>;
        }

        interface IUserDataSource {
            getUser(id : number) : angular.IPromise<model.IUser>;
            login(username : string, password : string) : ng.IPromise<model.IUser>
        }

        interface IRequestTodoData {
            data : Array<ITodoData>;
        }

        interface IUserResponseData extends IResponseData{
            data : Array<IUserData>;
        }
    }
}
