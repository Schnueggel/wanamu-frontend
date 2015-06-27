import _ = require('lodash');
import { BaseDirective, BaseController } from '../../../wanamu/wanamu';
import { Directive, InjectM, InjectC } from '../../../decorators/decorators';

@InjectC('wuAuthService')
@Directive('wuIsAuth')
export class IsAuthDirective extends BaseDirective {

    public auth : wu.auth.IAuthService;

    constructor() {
        super();
        this.directiveOptions.restrict = 'A';
        this.directiveOptions.link = this.link;
    }

    @InjectM('wuAuthService')
    public init(auth : wu.auth.IAuthService) : ng.IDirective {
        this.auth = auth;
        return this.directiveOptions;
    }

    /**
     * Use arrow function here to keep the scope to the Class
     * @param $scope
     * @param element
     * @param attributes
     */
    public link = ($scope: wu.auth.IAuthScope, element: JQuery, attributes : any) => {
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
        this.auth.queryIsLoggedIn()
            .then( () => visisible(true))
            .catch( () => visisible(false));

        $scope.auth = this.auth;

        $scope.$watch('auth.isLoggedIn', (newvalue) => visisible(newvalue));
    }
}
