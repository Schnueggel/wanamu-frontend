import { Log } from '../decorators/decorators';

export class BaseModel implements wanamu.IDirty {

    private _dirty: boolean = false;

    public toDataJSON() : Object;

    @Log
    public get dirty():boolean {
        return this._dirty;
    }
    public set dirty(value:boolean) {
        this._dirty = value;
    }
}
