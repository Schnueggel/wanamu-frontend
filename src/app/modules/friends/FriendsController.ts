import { BaseController } from '../../wanamu/wanamu';
import { InjectC, Controller } from '../../decorators/decorators';
import { UnauthorizedError } from '../../errors/errors';
import { EVENT_HEADER_ADD_NEW_FRIEND, EVENT_HEADER_ADD_NEW_GROUP } from './headertoolbar/FriendsHeaderController';
var rx = require('rx');
import _ = require('lodash');

/**
 * @alias Setting
 */
@Controller('FriendsController')
@InjectC('$scope',  '$rootScope', 'wuAuthService','panelService')
export class FriendsController extends BaseController {

    public list: Array<wu.model.IFriend>;

    public user: wu.model.IUser;


    /**
     *
     * @param $scope
     * @param $rootScope
     * @param auth
     * @param panelService
     */
    constructor(public $scope: ng.IScope,
                public $rootScope: ng.IRootScopeService,
                public auth:wu.auth.IAuthService,
                public panelService:wu.module.panel.IPanelService) {
        super();

        auth.queryCurrentUser().then(this.onUserLoaded);

        // =============================================================================================
        // Listen to actions in the headertoolbar
        // =============================================================================================
        let addFriendListener = $rootScope.$on(EVENT_HEADER_ADD_NEW_FRIEND, this.onAddNewFriend.bind(this) );
        let addGroupListener = $rootScope.$on(EVENT_HEADER_ADD_NEW_GROUP, this.onAddNewGroup.bind(this));
        // =============================================================================================
        // Remove the listener when this scope get destroyed
        // =============================================================================================
        $scope.$on('$destroy', ()=> {
            addFriendListener();
            addGroupListener();
        });
    }

    /**
     * On user loaded event handler
     * @param user
     */
    public onUserLoaded = (user:wu.model.IUser) => {
        this.user = user;
    };

    private onAddNewFriend() {

    }

    private onAddNewGroup(){

    }
}
