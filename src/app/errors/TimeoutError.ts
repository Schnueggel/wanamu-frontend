
import BaseError = require('./BaseError');

export class TimeoutError extends BaseError.BaseError {
    public name: string = 'TimeoutError';
}
