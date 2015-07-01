
declare module wanamu {

    interface ISettingData {
        id : number;
        color1: string;
        color2: string;
        color3: string;
        color4: string;
        color5: string;
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
            email: string;
            TodoLists : Array<ITodoListData>
            Setting: ISettingData;
            Profile : IProfileData;
            DefaultTodoListId : number;
        }

        interface IProfileData {
            id : number;
            firstname : string;
            lastname : string;
            salutation : string;
            face : string;
        }

        interface IProfileDataSource {
            sync( profile : model.IProfile ) : ng.IPromise<model.IProfile>
        }
        interface ISettingDataSource {
            sync( setting : model.ISetting ) : ng.IPromise<model.ISetting>
        }

        interface IError {
            type : string,
            message : string
        }
        // =============================================================================================
        // TODO We can make this more generic, but there are perhaps specializations
        // =============================================================================================
        interface IResponseData {
            error : IError;
            success : boolean;
        }

        // =============================================================================================
        // FIXME User this as replacement for Response data
        // =============================================================================================
        interface IResponseDataModel<T> extends IResponseData{
            data : Array<T>;
        }

        interface IProfileResponseData extends  IResponseData {
            data : Array<IProfileData>;
        }

        interface ITodoResponseData extends  IResponseData {
            data : Array<ITodoData>;
        }

        interface ITodoDataSource {
            sync( todo: model.ITodo ) : angular.IPromise<model.ITodo>;
            delete(todo: wu.model.ITodo) : ng.IPromise<wanamu.model.ITodo>;
        }

        interface IUserDataSource {
            getUser(id : number) : angular.IPromise<model.IUser>;
            login(username : string, password : string) : ng.IPromise<model.IUser>;
            sync( user : model.IUser ) : ng.IPromise<model.IUser>;
            create( user : model.IUser ) : ng.IPromise<model.IUser>;
        }

        interface ITodoRequestData {
            data : Array<ITodoData>;
        }

        interface IUserResponseData extends IResponseData{
            data : Array<IUserData>;
        }
    }
}
