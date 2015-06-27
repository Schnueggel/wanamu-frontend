/**
 * Created by Schnueggel on 07.06.2015.
 */

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

    interface IUserData {
        id : number;
        firstname : string;
        lastname : string;
        email: string;
        TodoLists : Array<ITodoListData>
        Setting: ISettingData;
        DefaultTodoListId : number;

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

        interface IRequestTodoData {
            data : Array<ITodoData>;
        }

        interface IUserResponseData extends IResponseData{
            data : Array<IUserData>;
        }
    }
}
