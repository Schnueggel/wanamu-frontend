/**
 * Created by Christian on 5/24/2015.
 */

module.exports = function(ngModule) {
    require('./auth')(ngModule);
    // ==========================================================================
    // This file will be generated be the build process
    // ==========================================================================
    require('./constants');
};
