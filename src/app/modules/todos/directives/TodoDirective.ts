/// <reference path="../../../libs/angular/angular.d.ts" />

/**
 *
 * @param auth
 */
export function wuTodo(): angular.IDirective {
    return {
        scope: {
            title: '= title'
        },
        link: function ($scope: angular.IScope, element: JQuery, attributes : any) {

        },
        template : require('./todo.html'),
        restrict: "E"
    }
}

//Inject services
wuTodo.$inject = [];

