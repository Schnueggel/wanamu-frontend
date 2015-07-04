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

    public color : string;

    constructor(public $scope : ng.IScope) {
        super();
    }
}
