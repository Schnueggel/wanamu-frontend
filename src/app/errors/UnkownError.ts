import { BaseError } from  './BaseError';

export class UnkownError extends BaseError {
    public name: string = 'UnkownError';
    public message : string = 'Undefined error happend';
}
