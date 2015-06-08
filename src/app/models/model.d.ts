/**
 * Created by Christian on 07.06.2015.
 */

declare module wanamu {
    interface Base extends angular.INgModelController {
        $render():void;

        $setValidity(validationErrorKey:string, isValid:boolean):void;

        // Documentation states viewValue and modelValue to be a string but other
        // types do work and it's common to use them.
        $setViewValue(value:any, trigger?:string):void;

        $setPristine():void;

        $setDirty():void;

        $validate():void;

        $setTouched():void;

        $setUntouched():void;

        $rollbackViewValue():void;

        $commitViewValue():void;

        $isEmpty(value:any):boolean;

        $viewValue:any;

        $modelValue:any;

        $parsers:angular.IModelParser[];
        $formatters:angular.IModelFormatter[];
        $viewChangeListeners:angular.IModelViewChangeListener[];
        $error:any;
        $name:string;

        $touched:boolean;
        $untouched:boolean;

        $validators:angular.IModelValidators;
        $asyncValidators:angular.IAsyncModelValidators;

        $pending:any;
        $pristine:boolean;
        $dirty:boolean;
        $valid:boolean;
        $invalid:boolean;
    }

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
}
