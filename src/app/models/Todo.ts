import { BaseModel }  from './BaseModel';
import _ = require ('lodash');

export class Todo extends BaseModel implements wanamu.ITodo {

    public id : number;
    public title : string = '';
    public alarm : string = null;
    public description : string = '';
    public repeat : string = null;
    public order : number = 1;
    public color : string = null;
    public deleted : boolean = false;

    constructor( data?: wanamu.ITodoData) {
        super();
        if (_.isPlainObject(data)){
            this.fromJSON(data);
        }
    }

    public fromJSON (data: wanamu.ITodoData) {
        var data = data || <wanamu.ITodoData>{};

        this.id = data.id;
        this.title = data.title;
        this.alarm = data.alarm;
        this.description = data.description;
        this.repeat = data.repeat;
        this.color = data.color;
        this.order = _.isNumber(data.order) ? data.order : this.order;
        this.deleted = data.deleted;
    }
}
