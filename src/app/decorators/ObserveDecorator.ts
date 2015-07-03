import _ = require('lodash');
let Rx = require('rx');

/**
 * The decorated method will trigger the Observer for a streamlined Rx.Observable
 *
 * observableDecorator Will be called within scope of descriptor value functions scope
 *
 * The Observable decorator must call subscribe in the end to make this work
 *
 * observableDecorator function will be called with observable param like:
 *
 * observableDecorator(obs: Rx.Observable<any>)
 *
 * Example:
 *
 *
 * @param observableDecorator method of target
 * @returns {function(Object, string, TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any>}
 * @constructor
 */
export function Observe (observableDecorator : string) {

    return function(target : Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {

        let orgMethod = descriptor.value;
        let observable : Rx.Observable<any>;
        let isDecorated : boolean = false;
        let observer :  Rx.Observer<any>;

        let subscriber = function(obs: Rx.Observer<any>)  {
            observer = obs;
        };

        descriptor.value = function(...args: any[]){

            // =============================================================================================
            // We create the observable only once on the first run of this method.
            // We do this here because we need the this scope to call the observableDecorator Function
            // =============================================================================================
            if (!isDecorated && _.isFunction(target[observableDecorator])) {
                observable = Rx.Observable.create(subscriber).publish().refCount();
                target[observableDecorator].call(this, observable);
                isDecorated = true;
            }
            orgMethod.apply( this, args );

            if (args.length === 1) {
                observer.onNext(args[0]);
            } else if (args.length === 0) {
                observer.onNext(undefined);
            }  else {
                observer.onNext(args);
            }
        };


        return descriptor;
    }
}

