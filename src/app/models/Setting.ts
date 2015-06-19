import { BaseModel }  from './BaseModel';

export class Setting extends BaseModel implements wanamu.ISetting {

    public id : number;
    public color1 : string;
    public color2 : string;
    public color3 : string;
    public color4 : string;
    public color5 : string;
    public face : string;

    /**
     *
     * @param data
     */
    constructor(data : wanamu.ISettingData){
        super();
        this.fromJSON(data);
    }

    /**
     *
     * @param data
     */
    public fromJSON(data : wanamu.ISettingData) : void {
        var data = data || <wanamu.ISettingData>{};

        this.id = data.id;
        this.color1 = data.color1;
        this.color2 = data.color2;
        this.color3 = data.color3;
        this.color4 = data.color4;
        this.color5 = data.color5;
        this.face = data.face;
    }
    /**
     * Returns all colors as an array
     * @returns {{}}
     */
    public colors() : wanamu.IColor {
        return {
            color1: this.color1,
            color2: this.color2,
            color3: this.color3,
            color4: this.color4,
            color5: this.color5
        };
    }

    /**
     *
     * @param color
     * @returns {String}
     */
    public color(color : string) : string {
        if(color === 'color1'){
           return this.color1;
        }
        else if(color === 'color2'){
            return this.color2;
        }
        else if (color === 'color3'){
            return this.color3;
        }
        else if(color === 'color4'){
            return this.color4;
        }
        else if(color === 'color5'){
            return this.color5;
        }
        else {
            console.warn('Invalid color field selected: ' + this.color1);
            return this.color1;
        }
    }
}
