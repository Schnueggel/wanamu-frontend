import { TodoDirective } from './todo/TodoDirective';
import { TodoListController } from './todolist/TodoListController';
import { TodosHeaderController } from './headertoolbar/TodosHeaderController';
import { TodosService } from './services/TodosService';
import { Module, InjectM } from '../../decorators/decorators';
import { BaseModule } from '../../wanamu/BaseModule';

@Module('todo', {
    controller: [TodoListController, TodosHeaderController],
    services: [TodosService],
    modules: ['panel'],
    directives: [TodoDirective]
})
export class TodosModule extends BaseModule {
    public static mname: string = 'todo';

    @InjectM('$stateProvider')
    config ($stateProvider: ngui.IStateProvider) {
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
                        template: require('./headertoolbar/todoheadertoolbar.html')
                    }
                }
            });
    }
}
