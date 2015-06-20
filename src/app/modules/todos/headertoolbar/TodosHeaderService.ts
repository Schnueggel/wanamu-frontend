import { BaseService } from '../../../wanamu/wanamu';
import { InjectC, Service } from '../../../decorators/decorators';

@Service('wuTodosHeaderService')
export class TodosHeaderService extends BaseService {

    private _showAddTodoButton : boolean = true;

    constructor(){
        super();
    }

    public get showAddTodoButton():boolean {
        return this._showAddTodoButton;
    }

    public set showAddTodoButton(value:boolean) {
        this._showAddTodoButton = value;
    }
}
