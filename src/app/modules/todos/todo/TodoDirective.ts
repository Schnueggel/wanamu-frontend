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
        controllerAs: 'Todo',
        controller : TodoController ,
        template : require('./todo.html'),
        restrict: "E"
    }
}

//Inject services
wuTodo.$inject = [];

