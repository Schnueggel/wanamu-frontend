/**
 * Created by Schnueggel on 04.07.2015.
 */


declare module wanamu {
    module colorpicker {
        interface IColorpickerOpts {
            color : string
        }

        interface ISpectrumColor {
            toRgbString () : string;
        }

        interface IColorpickerScope extends ng.IScope {
            Colorpicker : {
                /**
                 * Config Object
                 */
                colorOpts : IColorpickerOpts;
                /**
                 * The output color
                 */
                spColor: string;
            };

        }

        interface IJquerySpectrum extends JQuery{
            spectrum ( options :{[index:string]: any}| string, val? : any) : any;
        }

    }
}
