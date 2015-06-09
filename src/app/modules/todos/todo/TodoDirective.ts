/// <reference path="../../../libs/angular/angular.d.ts" />
'use strict';

import _ = require('lodash');
import {TodoController} from './TodoController';

/**
 *
 * @param auth
 */
export function wuTodo(): angular.IDirective {
    return {
        scope: true,
        bindToController: {
            todo: '=todo',
            setting :'=setting'
        },
        controllerAs: 'Ctrl',
        controller : TodoController ,
        template : require('./todo.html'),
        restrict: "E"
    }
}

//Inject services
wuTodo.$inject = [];

