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
    public deleted : boolean;
}
