import { TodoDirective } from './todo/TodoDirective';
import { TodoListController } from './todolist/TodoListController';
import { TodosHeaderController } from './headertoolbar/TodosHeaderController';
import { TodosService } from './services/TodosService';
import { TodosHeaderService } from './headertoolbar/TodosHeaderService';
import { Module, Config } from '../../decorators/decorators';
import { BaseModule } from '../../wanamu/BaseModule';

@Module('todo', {
    controller: [TodoListController, TodosHeaderController],
    services: [TodosService, TodosHeaderService],
    modules: ['panel'],
    directives: [TodoDirective]
})
export class TodosModule extends BaseModule {
    public static mname: string = 'todo';

    @Config('$stateProvider')
    config ($stateProvider: angular.ui.IStateProvider) {
        // States/Routes
        $stateProvider
            .state('panel.view.todos', {
                url: '/todos',
                role: 'public',
                views: {
                    '@panel': {
                        controller: 'TodoListController as Todolist',
                        template: require('./todolist/content.html')
                    },
                    'headertoolbar@panel.view' : {
                        controller: 'TodosHeaderController as Ctrl',
                        template: require('./headertoolbar/todosheadertoolbar.html')
                    }
                }
            });
    }
}
