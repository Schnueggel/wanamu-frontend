
declare module wanamu {
    module model {
        interface ITodo {
            id : number;
            title : string;
            alarm : string;
            description : string;
            order : number;
            repeat : string;
            deleted : boolean;
            color : string;
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
             *
             * @param color
             * @returns {String}
             */
            color(color:string) : string
        }

        interface IUser {

        }
    }
}
