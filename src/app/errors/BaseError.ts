/**
 * Created by Christian on 06.06.2015.
 */
'use strict';

declare class Error {
    public name: string;
    public message: string;
    public stack: string;
    constructor(message?: string);
}

export class BaseError extends Error {
    public name: string = 'Error';
    constructor(public message: string) {
        super(message);
        this.message = message;
        this.stack = '';
    }
    toString() {
        return this.name + ': ' + this.message;
    }
}
