/**
 * Created by Christian on 5/24/2015.
 */

module.exports = function(ngModule){

    ngModule.factory('auth', function(){

        return {
            login: function(username, password) {
                console.log(username, password);
            }
        }
    });
};
