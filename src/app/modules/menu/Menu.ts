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

