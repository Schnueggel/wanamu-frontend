
export function Dirty (target : wanamu.IDirty, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) : any {
    let setter = descriptor.set;
    let getter = descriptor.get;

    descriptor.set = function(val : any) {
        if (getter() !== val) {
            setter.call(target, val);
            target.dirty = true;
        }
    };
    return descriptor;
}
