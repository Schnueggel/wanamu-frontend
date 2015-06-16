require('angular');
require('angular-i18n/angular-locale_de-de');
require('angular-ui-router');
require('angular-translate');
require('angular-messages');
require('angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files');
require('angular-touch');
require('angular-material');
require('angular-animate');


/// <reference path="./modules/Application.ts"/>
/// <reference path="./services/AuthService.ts />

require('./services/constants');

//We require a js file this is what it will be when its Typescript is compiled
var module = require('./modules/wanamu/Application.js');

require("../../node_modules/angular-material/angular-material.css");
require('../styles/index.scss');
