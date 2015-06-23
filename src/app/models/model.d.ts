
declare module wanamu {
    module model {
        interface IBaseModel {
            dirty : boolean,
            toJSON : Function
            onDirty : Function
        }
        interface ITodo extends IBaseModel{
            id : number;
            TodoListId: number,
            title : string;
            alarm : string;
            alarmDate : Date;
            description : string;
            order : number;
            repeat : string[];
            deletedAt : boolean;
            color : string;
            createdOnClient: string,
            updatedOnClient: string
            /**
             * Maps the data to the model. this will not trigger the dirty flag
             * @param data
             */
            fromJSON(data : ITodoData) : void

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
        }
        interface ISetting extends IColor {
            id : number;
            face : string;

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
            color(color : string) : string
        }

        interface IUser {

        }
    }
}
