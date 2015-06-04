/// <reference path="../../libs/angular/angular.d.ts" />
/// <reference path="../../libs/angular/angular-ui-router.d.ts" />
/**
 * Created by Christian on 5/23/2015.
 */

'use strict';
export var name = 'menu';

export function config($stateProvider : ngui.IStateProvider) {
    $stateProvider.state('panel.view.menu', {
        url: '/menu', role: 'public', views: {
            '@panel': {
                controller: 'MenuCtrl as Menu',
                template: require('../menu/content.html')
            }
        }
    })
}
config.$inject = ['$stateProvider'];

export class MenuController {

}
/*global window, Modernizr, Event*/
export var menuModule = angular.module('menu', ['panel'])
    .config(config)
    .controller('MenuCtrl', MenuController);

