import _ = require('lodash');

interface  IDirty extends wanamu.IDirty {
    __onDirty : Array<Function>
}

export function Dirty (target : IDirty, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) : void {

    if (_.isFunction(descriptor.value)) {   //If its a normal method we go here
        let orgmethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            orgmethod.apply(this, args);
            this.dirty = true;
            if (_.isArray(this.__onDirty)) {
                this.__onDirty.forEach((v: Function) => v.call(this));
            }
        }

    } else {   //If its a setter we go here
        let setter = descriptor.set;
        let getter = descriptor.get;

        descriptor.set = function(val : any) {
            if (getter() !== val) {
                setter.call(this, val);
                this.dirty = true;
                if (_.isArray(this.__onDirty)) {
                    this.__onDirty.forEach((v : Function) => v.call(this));
                }
            }
        };
    }
}

export function OnDirty <T extends IDirty> (target : T, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    target.__onDirty = target.__onDirty || [];
    target.__onDirty.push(descriptor.value);
}
