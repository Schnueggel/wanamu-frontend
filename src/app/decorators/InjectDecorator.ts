/**
 * Inject Decorator for methods
 * @param args
 * @returns {function(Object, string, TypedPropertyDescriptor<any>): any}
 */
export function InjectM (...args : string[]) {
    return function (target : Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) : any {
        let method = descriptor.value;
        descriptor.value.$inject = args;
        return descriptor;
    };
}
/**
 * Inject Decorator for classes
 * @param args
 * @returns {function(Function): any}
 */
export function InjectC (...args : string[]) {
    return function (target : Function) : any {
        target.$inject = args;
        return target;
    };
}
