require('angular');
require('angular-i18n/angular-locale_de-de');
require('angular-ui-router');
require('angular-translate');
require('angular-messages');
require('angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files');
require('angular-touch');
require('angular-material');
require('angular-animate');
require('angular-cache');
require('moment');
require("../../node_modules/angular-material/angular-material.min.css");
// Start app
import { WanamuModule }  from './modules/wanamu/WanamuModule';
var wanamu = new WanamuModule();


require('../styles/index.scss');
