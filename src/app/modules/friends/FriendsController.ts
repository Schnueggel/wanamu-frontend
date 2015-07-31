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
@InjectC('$scope',  '$rootScope', 'wuAuthService','panelService', 'friendsDataSource')
export class FriendsController extends BaseController {

    public list: Array<wu.model.IFriend>;

    public user: wu.model.IUser;

    /**
     *
     * @param $scope
     * @param $rootScope
     * @param auth
     * @param panelService
     * @param friendsDatasource
     */
    constructor(public $scope: ng.IScope,
                public $rootScope: ng.IRootScopeService,
                public auth: wu.auth.IAuthService,
                public panelService: wu.module.panel.IPanelService,
                public friendsDatasource: wu.datasource.IFriendDataSource
    ) {
        super();

        auth.queryCurrentUser().then(this.onUserLoaded.bind(this));

        // =============================================================================================
        // Listen to actions in the headertoolbar
        // =============================================================================================
        let addFriendListener = $rootScope.$on(EVENT_HEADER_ADD_NEW_FRIEND, ()=> this.onAddNewFriend() );
        let addGroupListener = $rootScope.$on(EVENT_HEADER_ADD_NEW_GROUP, ()=> this.onAddNewGroup() );
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
        this.loadFriends();
    };

    /**
     * Load friends list from server
     */
    public loadFriends () {
        this.panelService.addToSyncPool(this);
        this.friendsDatasource.getFriends(false)
            .then( this.onFriendsLoadedSuccess.bind(this) )
            .catch( this.onFriendsLoadedError.bind(this) )
            .finally( () => this.panelService.removeFromSyncPool(this) );
    }

    /**
     * @see loadFriends
     * @param err
     */
    private onFriendsLoadedError (err: Error) {
        if (err instanceof UnauthorizedError) {
            this.panelService.showLogin().then( this.loadFriends.bind(this) );
        } else {
            this.panelService.showSimpleErrorToast(err.message);
        }
    }

    /**
     * @see loadFriends
     * @param friends
     */
    private onFriendsLoadedSuccess(friends: Array<wu.model.IFriend>) {
        this.list = friends;
    }

    private onAddNewFriend() {

    }

    private onAddNewGroup() {
    }

}
