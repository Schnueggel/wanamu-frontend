import _ = require('lodash');

export function Dirty (target : wanamu.IDirty, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) : void {
    if (_.isFunction(descriptor.value)) {
        let orgmethod = descriptor.value;
        descriptor.value = (...args: any[]) => {
            orgmethod.apply(target, args);
            target.dirty = true;
        }
    } else {
        let setter = descriptor.set;
        let getter = descriptor.get;

        descriptor.set = function(val : any) {
            if (getter() !== val) {
                setter.call(target, val);
                target.dirty = true;
            }
        };
    }
}
