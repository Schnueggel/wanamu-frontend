/**
 * Created by Christian on 4/30/2015.
 */
'use strict';

import TodoDirective = require('./todo/TodoDirective');
import TodoListController = require('./todolist/TodoListController');
import {HeaderToolbarController} from './headertoolbar/HeaderToolbarController';
import {TodosService} from './services/TodosService';

/**
 * Module name
 * @type {string}
 */
export var name = 'todos';

export var todosModule = angular.module('todos', [
    'panel'
]);

/**
 * Config for this module states
 * @param $stateProvider
 */
export function config ($stateProvider: ngui.IStateProvider) {
    // States/Routes
    $stateProvider
        .state('panel.view.todos', {
            url: '/todos',
            role: 'public',
            views: {
                '@panel': {
                    controller: 'TodolistCtrl as Todolist',
                    template: require('./todolist/content.html')
                },
                'headertoolbar@panel.view' : {
                    controller: 'TodoHeaderCtrl as Ctrl',
                    template: require('./headertoolbar/headertoolbar.html')
                }
            }
        });
}
config.$inject = ['$stateProvider'];

todosModule.config(config)
    .controller('TodoHeaderCtrl', HeaderToolbarController)
    .service('todosService',TodosService)
    .controller('TodolistCtrl', TodoListController)
    .directive('wuTodoItem', TodoDirective.wuTodo);
