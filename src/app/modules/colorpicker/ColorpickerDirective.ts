import _ = require('lodash');
import { ColorpickerController } from './ColorpickerController';
import { BaseDirective, BaseController } from '../../wanamu/wanamu';
import { Directive } from '../../decorators/decorators';

var $ = require('jquery');
var spectrum = require('spectrum-colorpicker/spectrum.js')($);
require('spectrum-colorpicker/spectrum.css');

@Directive('wuColorpicker')
export class ColorpickerDirective extends BaseDirective {

    public directiveOptions  : angular.IDirective = {
        scope: true,
        bindToController:{
            color: '='
        },
        controllerAs: 'Colorpicker',
        controller: ColorpickerController,
        template: require('./colorpicker.html'),
        restrict: "E"
    };

    constructor() {
        super();
        this.directiveOptions.link = this.link;
    }

    public link = ($scope: wu.colorpicker.IColorpickerScope, element: ng.IAugmentedJQuery, attributes : ng.IAttributes) =>{
        let picker : wu.colorpicker.IJquerySpectrum = (<wu.colorpicker.IJquerySpectrum>$('.colorpicker input'));
        picker.spectrum({
            flat: true,
            showInitial: true,
            showButtons: false,
            containerClassName: 'md-whiteframe-z1',
            color: $scope.Colorpicker.color
        });
        // =============================================================================================
        // We set the color on drag end to the input field
        // =============================================================================================
        picker.on("dragstop.spectrum", (e : any, color : wu.colorpicker.ISpectrumColor) => {
            picker.spectrum('set', color);
            $scope.Colorpicker.color = color.toRgbString();
            $scope.$apply();
        });
    };

}
