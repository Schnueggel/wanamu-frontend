/**
 * Created by Christian on 06.06.2015.
 */
'use strict';

/**
 * This class is a angular service to use it add it as service
 */
import _  = require('lodash');
import Setting = require('../models/Setting');

export class SettingDataSource {
    static $inject  = ['$http', '$q', 'constants'];

    public constructor(
        public $http : angular.IHttpService,
        public $q : angular.IQService,
        public constants : any
    ){}

    /**
     *
     * @param values
     * @returns {Setting}
     */
    public static mapData(values : wanamu.ISettingData) : Setting.Setting {
        var setting = new Setting.Setting();

        setting.color1 = values.color1;
        setting.color2 = values.color2;
        setting.color3 = values.color3;
        setting.color4 = values.color4;
        setting.color5 = values.color5;
        setting.face = values.face;

        return setting;
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
