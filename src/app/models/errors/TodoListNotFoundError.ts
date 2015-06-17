/**
 * Created by Christian on 06.06.2015.
 */
'use strict';

import BaseError = require('../../errors/BaseError');

export class TodoListNotFoundError extends BaseError.BaseError {
    public name: string = 'TodoListNotFoundError';
    public message : string = 'No valid TodoList could be found';
}

