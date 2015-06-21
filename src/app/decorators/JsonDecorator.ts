
interface ToJSON extends Object {
    toJSON: Function;
    ___tojsonprops: string[];
    [s:string]: any
}

export function Json <T extends ToJSON> (target : T, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) : void {
    let setter = descriptor.set;
    let getter = descriptor.get;

    if (!target.hasOwnProperty('___tojsonprops')) {
        target.___tojsonprops = [propertyKey];
        target.toJSON = function() {
            let result: any = {};
            this.___tojsonprops.forEach((v: string) => {
                result[v] = this[v];
            });
            return result;
        }
    } else {
        target.___tojsonprops.push(propertyKey);
    }
}
