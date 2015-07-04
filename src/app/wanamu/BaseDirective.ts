import { BaseController } from './BaseController';
import _ = require('lodash');

export class BaseDirective {
    directiveOptions  : angular.IDirective = {};

    public init(...args : any[]) : angular.IDirective {
        return this.directiveOptions;
    }

    public compile = (tElement : ng.IAugmentedJQuery, attributes: ng.IAttributes , transclude: ng.ITranscludeFunction) => {};
}
