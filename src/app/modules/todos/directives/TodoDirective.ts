/// <reference path="../../../libs/angular/angular.d.ts" />
'use strict';

import _ = require('lodash');

// this is static
export var currentInEdit : wanamu.ITodoScope = null;

/**
 *
 * @param auth
 */
export function wuTodo(): angular.IDirective {
    return {
        scope: {
            todo: '=todo',
            setting :'=setting'
        },
        link: function ($scope: wanamu.ITodoScope, element: JQuery, attributes : any) {
            $scope.edit = false;
            $scope.repeat = '';
            $scope.editcolors = false;
            $scope.colors = $scope.setting.colors();

            function setColor(color : string){
                $scope.currentColor = {'background-color': $scope.setting.color(color) || 'white'};
            }

            setColor($scope.todo.color);

            $scope.editTodo = function(edit : boolean) {
                if (edit === true) {
                    if (currentInEdit !== null) {
                        currentInEdit.edit = false;
                    }
                    currentInEdit = $scope;
                } else {
                    currentInEdit = null;
                }
                $scope.edit = edit;
            };

            $scope.done = function() :void {
                $scope.editTodo(false);
                if ($scope.todo) {
                    //TODO start sync
                }
            };

            $scope.selectColor = function(color : string) : void {
                $scope.todo.color = color;
                setColor(color);
                $scope.editcolors = false;
            };

            $scope.delete = (todo: wanamu.ITodo) => {
                console.log(todo);
            };
        },
        template : require('./todo.html'),
        restrict: "E"
    }
}

//Inject services
wuTodo.$inject = [];

