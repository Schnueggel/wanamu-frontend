import _ = require('lodash');
import { Controller, InjectC } from '../../decorators/decorators'
import { BaseController } from '../../wanamu/wanamu';

/**
 * @namespace colorpicker
 * @alias Picker
 */
@Controller('ColorpickerController')
@InjectC('$scope')
export class ColorpickerController extends BaseController {
    /**
     * Config object
     */
    public colorOpts : wu.colorpicker.IColorpickerOpts;
    /**
     * The outputcolor
     */
    public spColor : string;

    constructor(public $scope : ng.IScope) {
        super();

        if (!this.colorOpts) {
           this.colorOpts = {
                color : ''
           };
        }
    }
}
