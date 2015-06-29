import { BaseModel }  from './BaseModel';
import { Dirty, Json, OnDirty } from '../decorators/decorators';

export class Profile extends BaseModel implements wu.model.IProfile {

    private _id : number;
    private _firstname : string;
    private _lastname : string;
    private _face : string;
    private _salutation : string;

    /**
     *
     * @param data
     */
    constructor(data : wu.datasource.IProfileData){
        super();
        this.fromJSON(data);
    }

    /**
     *
     * @param data
     */
    public fromJSON(data : wu.datasource.IProfileData) : void {
        var data = data || <wu.datasource.IProfileData>{};

        this._id = data.id;
        this._firstname = data.firstname;
        this._lastname = data.lastname;
        this._salutation = data.salutation;
        this._face = data.face;
    }

    @Json
    public get id():number {
        return this._id;
    }

    public set id(value:number) {
        console.warn('Field id is readonly');
    }

    @Dirty
    @Json
    public get firstname():string {
        return this._firstname;
    }

    public set firstname(value:string) {
        this._firstname = value;
    }
    @Dirty
    @Json
    public get lastname():string {
        return this._lastname;
    }

    public set lastname(value:string) {
        this._lastname = value;
    }
    @Dirty
    @Json
    public get salutation():string {
        return this._salutation;
    }

    public set salutation(value:string) {
        this._salutation = value;
    }
    @Dirty
    @Json
    public get face():string {
        return this._face;
    }

    public set face(value:string) {
        this._face = value;
    }
}
