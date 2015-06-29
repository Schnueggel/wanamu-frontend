declare module wanamu {
    module model {
        interface IBaseModel {
            dirty : boolean,
            toJSON : Function
            onDirty : Function
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
            Todos : ITodo[];
            addNewTodo(todo: model.ITodo) : void;
        }

        interface IProfile extends wu.datasource.IProfileData {}

        interface ISetting extends IColor {
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

        interface IUser {
            id : number;
            email : string;
            password : string;
            DefaultTodoListId : number;
            TodoLists : Array<model.ITodoList>;
            defaulttodolist : ITodoList;
            Setting : ISetting;
            Profile : IProfile;
            usertype : string;
            todos(id?: number) : Array<model.ITodo>;
            addNewTodo(todo : model.ITodo, todolist?: model.ITodoList) : void;
        }
    }
}
