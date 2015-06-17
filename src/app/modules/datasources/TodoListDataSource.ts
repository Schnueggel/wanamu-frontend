/**
 * Created by Christian on 06.06.2015.
 */
'use strict';

/**
 * This class is a angular service to use it add it as service
 */
import _  = require('lodash');
import {TodoList} from '../models/TodoList';
import Errors = require('../errors/errors');
import TodoDataSource = require('./TodoDataSource');

export class TodoListDataSource {
    static $inject  = ['$http', '$q', 'constants'];

    public constructor(
        public $http : angular.IHttpService,
        public $q : angular.IQService,
        public constants : any
    ){

    }
    /**
     * Checks if the result from server is a valid user
     * @param user
     * @returns {boolean}
     */
    public isValidTodoListData(data : any) : boolean {
        return _.isObject(data) &&
            _.isArray(data.data) &&
            data.data.length === 1 &&
            _.isNumber(data.data[0].id) &&
            data.data[0].id > 0;
    }
}
