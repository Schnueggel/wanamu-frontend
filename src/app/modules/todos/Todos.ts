/**
 * Created by Christian on 4/30/2015.
 */
'use strict';

import AuthService = require('../wanamu/AuthService');

/**
 * Module name
 * @type {string}
 */
export var name = 'todos';

export var todosModule = angular.module('todos', [
    'panel'
]);

export function config ($stateProvider: ngui.IStateProvider) {
    // States/Routes
    $stateProvider
        .state('panel.view.todos', {
            url: '/todos',
            role: 'public',
            views: {
                '@panel': {
                    controller: 'TodolistCtrl as Todolist',
                    template: require('../todos/content.html')
                }
            }
        })
        .state('panel.view.todos.todo', {
            url: '/todo/{id:int}',
            role: 'public',
            views: {
                '@panel': {
                    controller: 'TodoCtrl as Todo',
                    template: require('../todos/details.html')
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
    public list : any [];

    constructor(
        public $state: ngui.IStateService,
        public auth : AuthService.AuthService
    ){
        if (!auth.isLoggedIn()) {
            console.log('Not authed');
            $state.go('panel.view.login');
            return;
        }

        this.list = auth.currentUser().TodoLists[0].Todos;
    }
}

/**
 * Controls a singnle todo
 */
export class TodoController {
    //angular injects
    static $inject : any =  ['$state', 'auth', '$scope'];

    public loading : boolean;
    public list : any[];
    public form : any = {
        error : {}
    }

    public todoform : wanamu.TodoForm;

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

        var Todo = this;
        Todo.loading = false;
        Todo.list = auth.currentUser().TodoLists[0].Todos;
        Todo.form = {
            error: {}
        };
        Todo.todo = null;

        for (var i = 0; i < Todo.list.length; i++) {

            if (Todo.list[i].id === $state.params.id) {
                Todo.todo = Todo.list[i];
            }
        }

        if (!Todo.todo) {
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
    .controller('TodoCtrl', TodoController);

