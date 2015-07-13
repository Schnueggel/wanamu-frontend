import { BaseController } from '../../../wanamu/wanamu';
import { InjectC, Controller } from '../../../decorators/decorators';

/**
 * Event that get triggered on the rootscope when add new friend is pressed
 * @type {string}
 */
export const EVENT_HEADER_ADD_NEW_FRIEND = 'HEADER_ADD_NEW_FRIEND';

/**
 * Event that get triggered on the rootscope when add new group is pressed
 * @type {string}
 */
export const EVENT_HEADER_ADD_NEW_GROUP = 'HEADER_ADD_NEW_GROUP';


/**
 * @alias Ctrl
 */
@Controller('FriendsHeaderController')
@InjectC('$rootScope', '$scope')
export class FriendsHeaderController extends BaseController {

    constructor(
        public $rootScope : angular.IRootScopeService,
        public $scope : ng.IScope
    ){
        super();

    }

    addNewFriend() {
        this.$rootScope.$emit(EVENT_HEADER_ADD_NEW_FRIEND);
    }

    addNewGroup() {
        this.$rootScope.$emit(EVENT_HEADER_ADD_NEW_GROUP);
    }
}
