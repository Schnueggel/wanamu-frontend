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
        Todos : ITodoData [];
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
        interface ITodoResponseData {
            error : string;
            data : Array<ITodoData>;
        }

        interface ITodoDataSource {
            sync(todo: model.ITodo) : angular.IPromise<model.ITodo>;
        }

        interface IRequestTodoData {
            data : Array<ITodoData>;
        }
    }
}
