import _ = require('lodash');
import { BaseDirective, BaseController } from '../../../wanamu/wanamu';
import { Directive, InjectM, InjectC } from '../../../decorators/decorators';

@InjectC('wuAuthService')
@Directive('wuIsAuth')
export class IsAuthDirective extends BaseDirective {

    public auth : wanamu.auth.IAuthService;

    constructor() {
        super();
        this.directiveOptions.restrict = 'A';
        this.directiveOptions.link = this.link;
    }

    @InjectM('wuAuthService')
    public init(auth : wanamu.auth.IAuthService) : angular.IDirective {
        this.auth = auth;
        return this.directiveOptions;
    }

    /**
     * Use arrow function here to keep the scope to the Class
     * @param $scope
     * @param element
     * @param attributes
     */
    public link = ($scope: angular.IScope, element: JQuery, attributes : any) => {
        /**
         * Hides or shows the element
         * @param {boolean} show
         */
        function visisible(show : boolean) {
            if (show) {
                element.removeClass('ng-hide');
            } else {
                element.addClass('ng-hide');
            }
        }

        visisible(this.auth.isLoggedIn());

        $scope.$watch(this.auth.isLoggedIn,
            function (newValue : boolean, oldValue : boolean) {
                visisible(newValue);
            }
        );
    }
}
