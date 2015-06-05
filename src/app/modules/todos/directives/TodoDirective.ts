/// <reference path="../../../libs/angular/angular.d.ts" />

// Store the current in edit todo $scope
// this is static
export var currentInEdit = null;
/**
 *
 * @param auth
 */
export function wuTodo(): angular.IDirective {
    return {
        scope: {
            todo: '=todo'
        },
        link: function ($scope: angular.IScope, element: JQuery, attributes : any) {
            $scope.edit = false;
            $scope.repeat = '';

            $scope.editTodo = function(edit) {
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

            $scope.done = function() {
                $scope.editTodo(false);
                if ($scope.todo.$dirty) {
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

