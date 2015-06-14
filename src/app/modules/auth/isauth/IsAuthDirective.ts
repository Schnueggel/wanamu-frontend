/// <reference path="../../../libs/angular/angular.d.ts" />
'use strict';
import {AuthService} from '../services/AuthService';

/**
 *
 * @param auth
 */
var IsAuthDirective = (auth: AuthService): angular.IDirective => {
    return {
        link: function ($scope: angular.IScope, element: JQuery, attributes : any) {

            /**
             * Hides or shows the element
             * @param {boolean} show
             */
            function visisible(show : boolean) {
                console.log('isVisible', show);
                if (show) {
                    element.removeClass('ng-hide');
                } else {
                    element.addClass('ng-hide');
                }
            }

            visisible(auth.isLoggedIn());

            $scope.$watch(auth.isLoggedIn,
                function (newValue : boolean, oldValue : boolean) {
                    visisible(newValue);
                }
            );
        },
        restrict: "A"
    }
}

//Inject service
IsAuthDirective.$inject = ['auth'];

export = IsAuthDirective;

