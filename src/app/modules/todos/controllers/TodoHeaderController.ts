/**
 * Created by Schnueggel on 08.06.2015.
 */
import TodoVars = require('../services/TodosVars');

class TodoHeaderController {
    static $inject = ['$rootScope'];

    constructor(public $rootScope : angular.IRootScopeService){}

    onAddClick (){
        this.$rootScope.$broadcast(TodoVars.EVENT_TODO_ADD);
    }
}

export = TodoHeaderController;
