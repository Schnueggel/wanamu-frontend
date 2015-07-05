
import { BaseService } from '../../wanamu/wanamu';
import { InvalidResponseDataError, UnauthorizedError, ServerError, TimeoutError, UnkownError, AccessError, CustomError,
    NotFoundError, NotConfirmedError, PreConditionFailedError } from '../../errors/errors';
import _ = require('lodash');

export class BaseDataSource extends BaseService {

    constructor(){
        super();
    }

    public getDefaultResponseErrors(data : wu.datasource.IResponseData, status : number ) : wu.errors.BaseError {
        let error : wu.errors.BaseError;
        if (status === 401) {
            error = new UnauthorizedError();
        }
        else if (status === 403) {
            error = new AccessError();
        }
        else if (status === 500) {
            error = new ServerError();
        }
        else if ( status === 408 ) {
            error = new TimeoutError();
        }
        else if ( status === 404) {
            error = new NotFoundError();
        }
        else if ( status === 424) {
            error = new NotConfirmedError();
        }
        else if ( status === 412) {
            error = new PreConditionFailedError();
        }
        else if (_.isPlainObject(data) && _.isPlainObject(data.error)) {
            error = new CustomError(data.error.message);
        }
        else {
            error = new UnkownError('Invalid data received from server or server did not respond')
        }
        return error;
    }
}
