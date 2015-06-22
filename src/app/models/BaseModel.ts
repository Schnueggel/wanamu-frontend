import { Log } from '../decorators/decorators';
import _ = require('lodash');

export class BaseModel {

    private _dirty: boolean = false;
    onDirty : Function;
    moment : moment.MomentStatic = require('moment');
    toJSON : Function;

    static defaultTimeFormat : string = 'YYYY-MM-DD HH:mm:ss';

    public get dirty():boolean {
        return this._dirty;
    }
    public set dirty(value:boolean) {
        this._dirty = value;
    }
}
