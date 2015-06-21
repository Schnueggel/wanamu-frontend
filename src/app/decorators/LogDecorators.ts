/**
 * Created by Schnueggel on 16.06.2015.
 */
import _ = require('lodash');

export function Log (target : Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any> ) : void{
    let originalMethod = descriptor.value; // save a reference to the original method

    let log = (...args: any[]) => {
        let result = originalMethod.apply(target, args);
        let constr  = <any>target.constructor;

        let name = constr.name || 'Unkown';
        console.log( `Call: ${name}.${propertyKey}(${JSON.stringify(args)}) => ${result}`);
    };
    if (_.isFunction(descriptor.set)) {
        originalMethod = descriptor.set;
        descriptor.set = log;

    } else {
        descriptor.value = log;
    }
}
