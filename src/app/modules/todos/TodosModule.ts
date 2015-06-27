import { TodoDirective } from './todo/TodoDirective';
import { TodoListController } from './todolist/TodoListController';
import { TodoEditController } from './edit/TodoEditController';
import { TodosHeaderController } from './headertoolbar/TodosHeaderController';
import { TodosService } from './services/TodosService';
import { TodosHeaderService } from './headertoolbar/TodosHeaderService';
import { Module, Config } from '../../decorators/decorators';
import { BaseModule } from '../../wanamu/BaseModule';

@Module('todo', {
    controller: [TodoListController, TodosHeaderController, TodoEditController],
    services: [TodosService, TodosHeaderService],
    modules: ['panel'],
    directives: [TodoDirective]
})
export class TodosModule extends BaseModule {
    public static mname: string = 'todo';

    @Config('$stateProvider')
    config ($stateProvider: ng.ui.IStateProvider) {
        // States/Routes
        $stateProvider
            .state('panel.view.todos', {
                url: '/todos',
                role: 'public',
                views: {
                    '@panel': {
                        controller: 'TodoListController as TodoList',
                        template: require('./todolist/content.html')
                    },
                    'headertoolbar@panel.view': {
                        controller: 'TodosHeaderController as Ctrl',
                        template: require('./headertoolbar/todosheadertoolbar.html')
                    }
                }
            })
            .state('panel.view.todos.edit', {
                url: '/todos/:id',
                controller: TodoEditController
            });
    }
}
