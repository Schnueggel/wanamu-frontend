/**
 * Created by Schnueggel on 16.06.2015.
 */
import _ = require('lodash');

export function log (target : Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any> ) : any{
    var originalMethod = descriptor.value; // save a reference to the original method

    descriptor.value = function(...args: any[]) {
        var result = originalMethod.apply(this, args);
        var constr  = <any>target.constructor;
        var name = _.isUndefined(constr) ? constr.name : '';
        console.log( `Call: ${name}${propertyKey}(${JSON.stringify(args)} => ${result})`);
    };

    return descriptor;
}
