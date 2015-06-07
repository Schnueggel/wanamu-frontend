/**
 * Created by Christian on 4/30/2015.
 */
'use strict';

import AuthService = require('../wanamu/AuthService');
import TodoDirective = require('./directives/TodoDirective');
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

/**
 * Controls the TodoList
 */
export class TodoListController {

    static $inject : any = ['$state', 'auth'];
    public list : wanamu.ITodo[];
    public setting : wanamu.ISetting;

    constructor(
        public $state: ngui.IStateService,
        public auth : AuthService.AuthService
    ){
        if (!auth.isLoggedIn()) {
            console.log('Not authed');
            $state.go('panel.view.login');
            return;
        }

        this.list = auth.currentUser().todos();
        console.log(auth.currentUser());
        this.setting = auth.currentUser().setting;
    }
}

/**
 * Controls a single todo
 */
export class TodoController {
    //angular injects
    static $inject : any =  ['$state', 'auth', '$scope'];

    public loading : boolean;
    public list : any[];
    public form : any = {
        error : {}
    }

    public todoform : wanamu.ITodoForm;

    public todo : any = null;

    constructor(
        public $state : ngui.IStateService,
        public auth : AuthService.AuthService,
        public $scope : angular.IScope
    ){
        if (!auth.isLoggedIn()) {
            $state.go('panel.view.login');
            return;
        }

        var TodoCtrl = this;
        TodoCtrl.loading = false;
        TodoCtrl.list = auth.currentUser().todos();
        TodoCtrl.form = {
            error: {}
        };
        TodoCtrl.todo = null;

        for (var i = 0; i < TodoCtrl.list.length; i++) {

            if (TodoCtrl.list[i].id === $state.params.id) {
                TodoCtrl.todo = TodoCtrl.list[i];
            }
        }

        if (!TodoCtrl.todo) {
            $state.go('panel.view.todos');
            // TODO show message Todo not found
            return;
        }
    }

    /**
     * Submits a todo to the backend
     */
    public submit (): void {
        //Prevent submit multiple times
        if (this.loading === true) {
            return;
        }
        //Reset errors
        this.form.$error = {};

        if (this.todoform.$valid) {
            //Set state loading
            this.loading = true;

            //TODO do submit todo
        } else {

        }
    }
}

todosModule.config(config)
    .controller('TodolistCtrl', TodoListController)
    .controller('TodoCtrl', TodoController)
    .directive('wuTodoItem', TodoDirective.wuTodo);

