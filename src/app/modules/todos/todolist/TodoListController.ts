import { Todo } from '../../../models/Todo';
import { AuthService } from '../../auth/AuthService';
import { BaseController } from '../../../wanamu/wanamu';
import { InjectC, Controller } from '../../../decorators/decorators';
import _ = require('lodash');

/**
 * @alias TodoList
 */
@Controller('TodoListController')
@InjectC('$state', 'wuAuthService', 'wuTodosService', '$scope')
export class TodoListController extends BaseController {

    public list : wu.model.ITodoList;
    public setting : wu.model.ISetting;
    public user: wu.model.IUser;
    public currentTodoListId : number = null;
    public currentTodoId : number = null;

    /**
     *
     * @param $state
     * @param auth
     * @param wuTodosService
     * @param $scope
     */
    constructor(
        public $state: ng.ui.IStateService,
        public auth : AuthService,
        public wuTodosService: wu.todos.ITodosService,
        public $scope: ng.IScope
    ){
        super();

        this.loadTodoList();

        $scope.$watch( this.editedTodoId, ( newvalue : number ) => {
            if (_.isNumber(newvalue)) {
                console.log('Go Todo id ' + newvalue);
                let id : string;
                if (newvalue < 0) {
                    id = 'n' + Math.abs(newvalue);
                } else {
                    id = newvalue.toString();
                }
                this.$state.go('panel.view.todos.edit', {id : id});
            }
        });
    }

    /**
     * Returns the current edited todo id
     * @returns {number}
     */
    editedTodoId = () : number => {
        return this.wuTodosService.inEditTodoId;
    };

    /**
     * Load todolist
     */
    loadTodoList () : void {
        console.log('Load TodoList');

        let promise = this.auth.queryCurrentUser();

        promise.then((user : wu.model.IUser) => {
            this.list = user.defaulttodolist;
            this.setting = user.Setting;
            this.user = user;
            console.log(this.list);
        });
        promise.catch(() => this.$state.go('panel.view.login'));
    }
}
