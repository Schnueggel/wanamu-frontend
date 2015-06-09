/**
 * Created by Schnueggel on 08.06.2015.
 */
import {TodosService} from '../services/TodosService';

export class HeaderToolbarController {
    static $inject = ['$rootScope', 'todosService'];

    constructor(
        public $rootScope : angular.IRootScopeService,
        public todoService : TodosService
    ){

    }

    triggerAddNewTodo() {
        this.todoService.addNewTodo();
    }
}
