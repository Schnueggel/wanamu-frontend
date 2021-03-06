import { AuthService } from '../../auth/AuthService';
import { InjectC } from '../../../decorators/decorators';
import { Controller } from '../../../decorators/decorators';
import  _ = require('lodash');

/**
 * Controls the Header Toolbar
 * @alias Header
 */
@InjectC('$rootScope', '$scope', '$state', '$mdSidenav', 'panelService')
@Controller('HeaderController')
export class HeaderController {
    public menuopen : boolean ;
    public laststate : String = 'panel.view.todos';
    public hideHeaderLogo : boolean;
    public off : Function;
    public syncpool : any[];

    /**
     *
     * @param $rootScope
     * @param $scope
     * @param $state
     * @param $mdSidenav
     * @param panelService
     */
    constructor(
        public $rootScope : ng.IRootScopeService,
        public $scope : ng.IScope,
        public $state : ng.ui.IStateService,
        public $mdSidenav : ng.material.MDSidenavService,
        public panelService : wu.module.panel.IPanelService
    ) {

        this.syncpool = panelService.syncpool;
        // ==========================================================================
        // If client come to the menu with a deeplink we mark the menu as open
        // ==========================================================================
        this.menuopen = $state.current.name === 'panel.view.menu';
        // ==========================================================================
        // In case there is no from state we set last state todos
        // ==========================================================================
        this.hideHeaderLogo = 'panel.view.login' === $state.current.name;
        // ==========================================================================
        // We listen to stateChange events to store the last state.
        // This should perhaps go into a service to make it  reusable
        // ==========================================================================
        this.off = <Function>$rootScope.$on('$stateChangeSuccess', this.onStateChange);

        //Destroy the listener if this $scope dies to prevent multiple listener
        //Normally this should not happend as the header is fixed
        $scope.$on('$destroy', () => this.onDestroy());
    }

    /**
     *
     * @param ev
     * @param to
     * @param toParams
     * @param from
     * @param fromParams
     */
    onStateChange = (ev : any, to : any, toParams :any, from :any, fromParams : any) : void =>  {
        if (to.name !== 'panel.view.menu') {
            this.laststate = 'panel.view.menu';
            this.menuopen = false;
        } else {
            this.laststate = from.name + '(' + JSON.stringify(fromParams) + ')';
            this.menuopen = true;
        }
        this.hideHeaderLogo = to.name === 'panel.view.login';
    };

    /**
     * will be callend when this Controller gets destroyed
     */
    onDestroy = () => {
        this.off();
    };

    /**
     * Opens the sidebar
     * @viewhelper
     */
    public openSidenav() {
        this.$mdSidenav('left').open();
    }

    /**
     * Get the current pagename if set
     * @returns {any}
     */
    public pageName() : string {
        return _.get(this.$state.current, 'data.pagename', '');
    }
}
