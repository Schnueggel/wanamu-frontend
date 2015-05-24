/**
 * Created by Christian on 4/30/2015.
 */
require('angular');
require('angular-i18n/angular-locale_de-de');
require('angular-ui-router');
require('angular-translate');
require('angular-messages');
require('angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files');
require('angular-touch');
require('angular-animate');

var ngModule = require ('./components');

require('../styles/index.scss');

require('./services')(ngModule);
