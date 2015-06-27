import { BaseError } from  './BaseError';

export class UnkownError extends BaseError {
    public name: string = 'UnkownError';
    public message : string = 'An undefined error happend';
}
