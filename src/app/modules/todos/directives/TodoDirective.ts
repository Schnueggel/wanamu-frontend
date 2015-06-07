/// <reference path="../../../libs/angular/angular.d.ts" />

// this is static
export var currentInEdit : wanamu.ITodoScope = null;


/**
 *
 * @param auth
 */
export function wuTodo(): angular.IDirective {
    return {
        scope: {
            todo: '=todo'
        },
        link: function ($scope: wanamu.ITodoScope, element: JQuery, attributes : any) {
            $scope.edit = false;
            $scope.repeat = '';

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
            }
        },
        template : require('./todo.html'),
        restrict: "E"
    }
}

//Inject services
wuTodo.$inject = [];

