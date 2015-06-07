/**
 * Created by Christian on 06.06.2015.
 */
'use strict';

/**
 * This class is a angular service to use it add it as service
 */
import _  = require('lodash');
import Todo = require('../models/Todo');

export class TodoDataSource {
    static $inject  = ['$http', '$q', 'constants'];

    public constructor(
        public $http : angular.IHttpService,
        public $q : angular.IQService,
        public constants : any
    ){}

    /**
     *
     * @param values
     * @returns {Todo}
     */
    public static mapData(values : wanamu.ITodoData) : Todo.Todo {
        var todo = new Todo.Todo();

        todo.id = values.id;
        todo.title = values.title;
        todo.alarm = values.alarm;
        todo.description = values.description;
        todo.repeat = values.repeat;
        todo.deleted = values.deleted;

        return todo;
    }
    /**
     *
     * @param values
     * @returns {Todo}
     */
    public static mapDataList(values : wanamu.ITodoData[]) : Todo.Todo[] {
        var result : Todo.Todo[] = [];

        for(var i = 0; i < values.length; i++){
            result.push(TodoDataSource.mapData(values[i]));
        }
        return result;
    }
    /**
     * Checks if the result from server is a valid user
     * @param user
     * @returns {boolean}
     */
    public static isValidUserData(data : any) : boolean {
        return _.isObject(data) &&
            _.isArray(data.data) &&
            data.data.length === 1 &&
            _.isNumber(data.data[0].id) &&
            data.data[0].id > 0;
    }
}
