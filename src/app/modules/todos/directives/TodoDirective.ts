/// <reference path="../../../libs/angular/angular.d.ts" />

module todos {
    /**
     *
     * @param auth
     */
    export function todo(): angular.IDirective {
        return {
            link: function ($scope: angular.IScope, element: JQuery, attributes : any) {

            },
            restrict: "E"
        }
    }

    //Inject services
    todo.$inject = [];
}
