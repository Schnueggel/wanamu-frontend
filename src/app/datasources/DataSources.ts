/**
 * Created by Christian on 06.06.2015.
 */
'use strict';

import UserDataSourceModule = require('./UserDataSource');

import u = UserDataSourceModule.UserDataSource;

export module C {
    export var UserDataSource = u;
}
