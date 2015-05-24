/**
 * Created by Christian on 5/24/2015.
 */

module.exports = function(ngModule){

    ngModule.factory('auth', ['constants', function(constants){

        var currentuser;

        return {
            login: function(username, password) {
            },
            logout: function() {

            },
            currentUser: function(){
                return currentuser;
            },
            isLoggedIn: function() {
                if (currentuser){
                    return true;
                }
                return false;
            }
        }
    }]);
};
