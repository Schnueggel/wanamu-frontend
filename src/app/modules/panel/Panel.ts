/// <reference path="../../libs/angular/angular.d.ts" />
/**
 * Created by Christian on 5/23/2015.
 */
module panel {
    'use strict';
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

        static $inject = ['$rootScope', '$scope', '$state'];

        public menuopen : boolean ;
        public laststate : String = 'panel.view.todos';
        public hideHeaderLogo : boolean;
        public off : Function;

        constructor(
            public $rootScope : angular.IRootScopeService,
            public $scope : angular.IScope,
            public $state : any
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
            var that = this;
            this.off = $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
                if (to.name !== 'panel.view.menu') {
                    that.laststate = 'panel.view.menu';
                    that.menuopen = false;
                } else {
                    that.laststate = from.name + '(' + JSON.stringify(fromParams) + ')';
                    that.menuopen = true;
                }
                that.hideHeaderLogo = to.name === 'panel.view.login';
            });

            //Destroy the listener if this $scope dies to prevent multiple listener
            // Normally this should not happend
            $scope.$on('$destroy', function(event : angular.IAngularEvent){
                that.off();
            });
        }
    }

    export function config($stateProvider : ngui.IStateProvider) {

        $stateProvider.state('panel', {
            abstract: true,
            controller: 'PanelCtrl as panel',
            template: require('../panel/panel.html'),
            role: 'public'
        }).state('panel.view', {

            views: {
                'header@panel': {
                    controller: 'HeaderCtrl as Header',
                    template: require('../panel/header.html')
                }
            }
        });
    }

    config.$inject = ['$stateProvider'];

    export var panelModule = angular.module('panel', [])
        .config(config)
        .controller('PanelCtrl', PanelController)
        .controller('HeaderCtrl', HeaderController);
}
