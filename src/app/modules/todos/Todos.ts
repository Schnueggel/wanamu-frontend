/**
 * Created by Christian on 4/30/2015.
 */
'use strict';

import AuthService = require('../wanamu/AuthService');
import TodoDirective = require('./directives/TodoDirective');
import TodoListController = require('./controllers/TodoListController');
import TodoHeaderController = require('./controllers/TodoHeaderController');
import TodosVars = require('./services/TodosVars');
import Todo = require('../../models/Todo');

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
                    template: require('./content.html')
                },
                'headertoolbar@panel.view' : {
                    controller: 'TodoHeaderCtrl as HeaderCtrl',
                    template: require('./headertoolbar.html')
                }
            }
        })
        .state('panel.view.todos.todo', {
            url: '/todo/{id:int}',
            role: 'public',
            views: {
                '@panel': {
                    controller: 'TodoCtrl as Todo',
                    template: require('./details.html')
                }
            }
        });
}
config.$inject = ['$stateProvider'];

todosModule.config(config)
    .controller('TodoHeaderCtrl', TodoHeaderController)
    .controller('TodolistCtrl', TodoListController)
    .directive('wuTodoItem', TodoDirective.wuTodo);
