import { BaseModel }  from './BaseModel';
import _ = require ('lodash');
import { Dirty, Json, OnDirty } from '../decorators/decorators';

export class Todo extends BaseModel implements wanamu.model.ITodo {

    private _id : number;
    private _TodoListId: number;
    private _title : string = '';
    private _alarm : string = null;
    private _alarmDate : Date = null;
    private _description : string = '';
    private _repeat : string = null;
    private _order : number = 1;
    private _color : string = null;
    private _deletedAt : boolean = false;
    private _updatedOnClient : string;
    private _createdOnClient : string;

    constructor( data?: wanamu.ITodoData ) {
        super();
        if (_.isPlainObject(data)){
            this.fromJSON(data);
        } else {
            this.createdOnClient = this.moment().format(BaseModel.defaultTimeFormat);
        }
    }

    /**
     * @param data
     */
    public fromJSON (data: wanamu.ITodoData) {
        var data = data || <wanamu.ITodoData>{};
        this._id = data.id;
        this._TodoListId = data.TodoListId;
        this._title = data.title;
        this._alarm = data.alarm;
        this._description = data.description;
        this._repeat = data.repeat;
        this._color = data.color;
        this._order = _.isNumber(data.order) ? data.order : this._order;
        this._deletedAt = data.deletedAt;

        if (this._alarm) {
            this._alarmDate = this.moment(this._alarm, BaseModel.defaultTimeFormat).toDate();
        }
    }

    @Json
    public get id():number {
        return this._id;
    }

    public set id(value : number) {
        console.warn('Field id is readonly');
    }

    @Dirty
    @Json
    public get TodoListId():number {
        return this._TodoListId;
    }

    public set TodoListId(value:number) {
        this._TodoListId = value;
    }

    @Dirty
    @Json
    public get title():string {
        return this._title;
    }
    public set title(value:string) {
        this._title = value;
    }

    @Dirty
    @Json
    public get alarm():string {
        return this._alarm;
    }

    public set alarm( value: string ) {
        if (value && value.length > 0 ){
            this._alarmDate = this.moment(value).toDate();
        }
        this._alarm = value;
    }

    @Dirty
    @Json
    public get description():string {
        return this._description;
    }


    public set description(value:string) {
        this._description = value;
    }
    @Dirty
    @Json
    public get repeat():string {
        return this._repeat;
    }

    public set repeat(value:string) {
        this._repeat = value;
    }
    @Dirty
    @Json
    public get order():number {
        return this._order;
    }

    public set order(value:number) {
        this._order = value;
    }
    @Dirty
    @Json
    public get color():string {
        return this._color;
    }
    public set color(value:string) {
        this._color = value;
    }
    @Dirty
    @Json
    public get deletedAt():boolean {
        return this._deletedAt;
    }
    public set deletedAt(value:boolean) {
        this._deletedAt = value;
    }

    @Json
    public get updatedOnClient():string {
        return this._updatedOnClient;
    }

    public set updatedOnClient(value:string) {
        this._updatedOnClient = value;
    }

    @Json
    public get createdOnClient():string {
        return this._createdOnClient;
    }

    public set createdOnClient(value:string) {
        this._createdOnClient = value;
    }
    @OnDirty
    private updated() {
        this._updatedOnClient = this.moment().format(BaseModel.defaultTimeFormat);
    }

    public get alarmDate():Date {
        return this._alarmDate;
    }

    public set alarmDate(value: Date) {
        if (value instanceof Date){
            this._alarm = this.moment(value).format(BaseModel.defaultTimeFormat);
        }
        this._alarmDate = value;
    }
}
