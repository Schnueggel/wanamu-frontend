/// <reference path="../../libs/angular/angular.d.ts" />
/**
 * Created by Christian on 5/23/2015.
 */
'use strict';

import {AuthService} from '../auth/services/AuthService';

export var name = 'panel';

//TODO Moveout the Controller Code

/**
 * Controls the Panel
 */
export class PanelController  {
    constructor() {
        console.log('Panel');
    }
}
/**
 * Controls the Header Toolbar
 */
export class HeaderController {

    static $inject = ['$rootScope', '$scope', '$state', 'auth'];

    public menuopen : boolean ;
    public laststate : String = 'panel.view.todos';
    public hideHeaderLogo : boolean;
    public off : Function;
    public user : any;

    /**
     *
     * @param $rootScope
     * @param $scope
     * @param $state
     * @param auth
     */
    constructor(
        public $rootScope : angular.IRootScopeService,
        public $scope : angular.IScope,
        public $state : any,
        public auth : AuthService
    ) {
        // ==========================================================================
        // If client come to the menu with a deeplink we mark the menu as open
        // ==========================================================================
        this.menuopen = $state.current.name === 'panel.view.menu';
        // ==========================================================================
        // Incase the is no from state we set last state todos
        // ==========================================================================
        this.hideHeaderLogo = 'panel.view.login' === $state.current.name;
        // ==========================================================================
        // We listen to stateChange events to store the last state.
        // This should perhaps go into a service to make it  reusable
        // ==========================================================================
        this.off = <Function>$rootScope.$on('$stateChangeSuccess', this.onStateChange);

        //Destroy the listener if this $scope dies to prevent multiple listener
        //Normally this should not happend as the header is fixed
        $scope.$on('$destroy', this.onDestroy);

        this.user = auth.currentUser();
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
    }
}

export function config($stateProvider : ngui.IStateProvider) {

    $stateProvider.state('panel', {
        abstract: true,
        controller: 'PanelCtrl as panel',
        template: require('./panel.html'),
        role: 'public'
    }).state('panel.view', {
        views: {
            'header@panel': {
                controller: 'HeaderCtrl as Header',
                template: require('./header.html'),
            },
        }
    });
}

config.$inject = ['$stateProvider'];

export var ngmodule = angular.module('panel', [])
    .config(config)
    .controller('PanelCtrl', PanelController)
    .controller('HeaderCtrl', HeaderController);

