/**
 * Created by Christian on 06.06.2015.
 */
'use strict';

/**
 * This class is a angular service to use it add it as service
 */
import _  = require('lodash');
import TodoList = require('../models/TodoList');
import Errors = require('../errors/Errors');

export class TodoListDataSource {
    static $inject  = ['$http', '$q', 'constants'];

    public constructor(
        public $http : angular.IHttpService,
        public $q : angular.IQService,
        public constants : any
    ){

    }

    /**
     *
     * @param values
     * @returns {User}
     */
    public static mapData(values : any) : TodoList.TodoList {
        var todolist = new TodoList.TodoList();

        todolist.id = values.id;
        todolist.name = values.firstname;

        return todolist;
    }

    /**
     *
     * @param values
     * @returns {TodoList.TodoList[]}
     */
    public static mapDataList(values : any[]) : TodoList.TodoList[] {
        var result : TodoList.TodoList[] = [],
            values = values || [];

        for(var i = 0; i < values.length; i++) {
            if (_.isPlainObject(values[i])) {
                result.push(TodoListDataSource.mapData(values[i]));
            }
        }

        return result;
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
