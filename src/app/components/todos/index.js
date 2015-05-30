/**
 * Created by Christian on 4/30/2015.
 */
'use strict';

module.exports = angular.module('todos', [
    require('../panel').name
]).config(['$stateProvider', function ($stateProvider) {
        // States/Routes
        $stateProvider
            .state('panel.view.todos', {
                url: '/todos',
                role: 'public',
                views: {
                    '@panel': {
                        controller: 'TodolistCtrl as Todolist',
                        template: require('./content.html')
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
    }])
    .controller('TodolistCtrl', ['$state','auth', function ($state, auth) {

        if (!auth.isLoggedIn()){
            $state.go('panel.view.login');
            return;
        }

        var Todo = this;

        Todo.list = auth.currentUser().TodoLists[0].Todos;
    }])
    .controller('TodoCtrl', ['$state','auth', '$scope', function ($state, auth, $scope) {

        if (!auth.isLoggedIn()){
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

        for(var i = 0; i < Todo.list.length; i++) {

           if ( Todo.list[i].id === $state.params.id ) {
               Todo.todo = Todo.list[i];
           }
        }

        if (!Todo.todo){
            $state.go('panel.view.todos');
            // TODO show message Todo not found
            return;
        }

        Todo.submit = function(){
            //Prevent submit multiple times
            if (Todo.loading === true) {
                return;
            }
            //Reset errors
            Todo.form.$error = {};

            if ($scope.todoform.$valid){
                //Set state loading
                Todo.loading = true;

                //TODO do submit todo
            } else {

            }
        }

    }]);
