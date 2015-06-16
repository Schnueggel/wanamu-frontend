
export function dirty (target : Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) : any {
    let setter = descriptor.set;

    descriptor.set = function(val) {
        if (target[propertyKey] !== val) {
            target['dirty'] = true;
        }
        setter.call(this, val);
    }
}
