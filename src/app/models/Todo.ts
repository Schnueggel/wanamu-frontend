/**
 * Created by Christian on 06.06.2015.
 */
import Base = require('./Base');

export class Todo extends Base.Base implements wanamu.ITodo {

    public id : number;
    public title : string;
    public alarm : string;
    public description : string;
    public repeat : string;
    public color : string;
    public deleted : boolean;

    constructor( data: wanamu.ITodoData) {
        this.fromJSON(data);
    }

    public fromJSON (data: wanamu.ITodoData) {
        var data = data || {};

        this.id = data.id;
        this.title = data.title;
        this.alarm = data.alarm;
        this.description = data.description;
        this.repeat = data.repeat;
        this.color = data.color;
        this.deleted = data.deleted;
    }
}
