
export function dirty (target : wanamu.IDirty, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) : any {
    let setter = descriptor.set;
    let getter = descriptor.get;

    descriptor.set = function(val : any) {
        if (getter() !== val) {
            target.dirty = true;
        }
        setter.call(this, val);
    }
}
