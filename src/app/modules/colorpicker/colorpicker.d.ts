/**
 * Created by Schnueggel on 04.07.2015.
 */


declare module wanamu {
    module colorpicker {
        interface IColorpickerOpts {
            chooseText : string
        }

        interface ISpectrumColor {
            toRgbString () : string;
        }

        interface IColorpickerScope extends ng.IScope {
            Colorpicker : { color : string};
        }

        interface IJquerySpectrum extends JQuery{
            spectrum ( options :{[index:string]: any}| string, val? : any);
        }
    }
}
