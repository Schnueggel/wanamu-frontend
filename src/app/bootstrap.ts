require('angular');
require('angular-i18n/angular-locale_de-de');
require('angular-ui-router');
require('angular-translate');
require('angular-messages');
require('angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files');
require('angular-touch');
require('angular-material');
require('angular-animate');
require('moment');

//TODO remove this at some point
// Use environment-config-webpack-loader module just require the package json and access the wanamu namepsace
require('./services/constants');

// Start app
import { WanamuModule }  from './modules/wanamu/WanamuModule';
var wanamu = new WanamuModule();

require("../../node_modules/angular-material/angular-material.css");
require('../styles/index.scss');
