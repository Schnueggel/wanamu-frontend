declare module wanamu {
    module model {

        interface  IDirty extends wu.IDirty {
            __orgValues : {[index:string] : { value : any, dirty : boolean}};
            dirty : boolean;
        }

        interface IBaseModel extends IDirty {
            [index: string] : any;
            toJSON : Function;
            fromJSON : (data: any) => void;
        }
        interface ITodo extends IBaseModel {
            id : number;
            TodoListId: number,
            title : string;
            alarm : string;
            alarmDate : Date;
            description : string;
            order : number;
            repeat : boolean;
            finished : boolean;
            deletedAt : string;
            color : string;
            createdOnClient: string,
            updatedOnClient: string
            repeatWeekly  : string[];
            repeatMonthly : string[];
            repeatYearly  : string[];
            /**
             * Maps the data to the model. this will not trigger the dirty flag
             * @param data
             */
            fromJSON(data:ITodoData) : void
        }

        interface IFriend {
            id: number;
            Profile : IProfile;
            Friends : IFriendsData;
        }

        interface IFriendsData {
            accepted : boolean;
        }

        interface IColor {
            color1 : string;
            color2 : string;
            color3 : string;
            color4 : string;
            color5 : string;
        }

        interface ITodoList {
            id : number;
            name : string;
            Todos : Array<ITodo>;
            addNewTodo(todo: model.ITodo) : void;
        }

        interface IProfile extends datasource.IProfileData, IBaseModel {
            fromJSON( data : datasource.IProfileData ) : void;
        }

        interface ISetting extends IBaseModel,IColor {
            id : number;

            /**
             * Returns all colors as an array
             * @returns {{}}
             */
            colors() : IColor;

            /**
             * Returns a single color with its value e.g.: rgba(0,0,0,0)
             * @param string color e.g.: color1, color2 ... color5
             * @returns {String} e.g.: rgba(0,0,0,0)
             */
            color(color:string) : string
        }

        interface IUser extends IBaseModel {
            password : string;
            id : number;
            email: string;
            TodoLists : Array<ITodoList>
            Setting: ISetting;
            Profile : IProfile;
            DefaultTodoListId : number;
            defaulttodolist : ITodoList;
            usertype : string;

            todos(id?: number) : Array<model.ITodo>;
            addNewTodo( todo : model.ITodo, todolist?: model.ITodoList ) : void;
            fromJSON( data : datasource.IUserData ) : void;
        }
    }
}
